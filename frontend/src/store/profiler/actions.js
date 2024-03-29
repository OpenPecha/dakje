import { api, axios } from "boot/axios";
import { Loading } from "quasar";
import { unlistedColor, WordLists } from "src/utils/textComplexity";

export async function setupWordLists({ commit, state }) {
  if (!state.wordLists) {
    const wordLists = new WordLists();
    commit("setWordLists", wordLists.wordLists);
  }
}

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}


export async function loadLevelLists({ state, commit, dispatch }, wordListName) {
  console.log("loadLevelLists");
  Loading.show()
  const levelList = state.wordLists[wordListName].levelLists;
  for (var i = 0; i < levelList.length; i++) {
    const levelList = state.wordLists[wordListName].levelLists[i];
    if (levelList.url) {
      const response = await axios.get(levelList.url);
      const content = b64_to_utf8(response.data.content);
      const cleanedContent = content.replaceAll("\r", "");
      const words = cleanedContent.split("\n");
      commit("setLevelListWords", { wordListName, words, levelIdx: i });
    }
  }
}

export function tokenizeContent({ rootGetters, commit }) {
  console.log("tokenizeContent");
  Loading.show()
  const text = rootGetters["editor/contentInnerText"];
  api.post("/tokenize", { content: text }).then((response) => {
    console.log("tokenizeContent response", response.data);
    commit("setContentWords", response.data.words);
    commit("setContentSentences", response.data.sentences);
    commit("toggleProfileMode", true);
  });
}

export function computeVocabStatistic({ state, commit, getters }, wordListName) {
  console.log("computeVocabStatistic");
  const statistic = { totalHit: 0, totalMiss: 0, levels: {} };
  state.wordLists[wordListName].levelLists.forEach((level) => {
    statistic.levels[level.label] = {
      count: level.count,
      percent: ((level.count / getters.totalWords) * 100).toFixed(1),
      color: level.color
    };
    statistic.totalHit += level.count;
  });
  statistic.totalMiss = getters.totalWords - statistic.totalHit;
  statistic.levels[unlistedColor.label].count = statistic.totalMiss,
  statistic.levels[unlistedColor.label].percent = ((statistic.totalMiss / getters.totalWords) * 100).toFixed(1),
  commit("setVocabStatistic", statistic);
  console.log("computeVocabStatistic", state.vocabStatistic)
  Loading.hide()
}

function inLevelList(word, list) {
  // skip punctuation
  if (word.pos.length < 1) {
    return false
  }

  const lastChar = word.form.at(-1)
  if (lastChar === "་" || lastChar === "།") {
    const cleanedWord = word.form.slice(0, -1)
    return list.includes(cleanedWord)
  } else {
    return list.includes(word.form)
  }
}

export async function profileContent({ state, commit}, wordListName) {
  console.log("profileContent");
  Loading.show()
  commit("resetContentWordsLevel")
  commit("resetVocabStatistic", wordListName)
  for (var wordIdx = 0; wordIdx < state.contentWords.length; wordIdx++) {
    const word = state.contentWords[wordIdx]
    var isFound = false
    state.wordLists[wordListName].levelLists.forEach((level, i) => {
      if (inLevelList(word, level.words)) {
        isFound = true
        commit("incrementVocabHit", { wordListName, levelIdx: i });
        commit("appendWordToContentWordsLevel", {...word, color: level.color})
      }
    });

    if (!isFound) {
      commit("appendWordToContentWordsLevel", {...word, color: unlistedColor.code })
    }
  }
}
