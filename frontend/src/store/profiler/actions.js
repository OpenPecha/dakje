import { api, axios } from "boot/axios";
import { WordLists } from "src/utils/textComplexity";

export async function setupWordLists({ commit, state }) {
    if (!state.wordLists) {
        const wordLists = new WordLists()
        commit("setWordLists", wordLists.wordLists)
    }
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

export async function loadLevelWords({commit, state}, {wordListName, levelIdx}) {
    const levelList = state.wordLists[wordListName].levelLists[levelIdx]
    const response = await axios.get(levelList.url)
    const content = b64_to_utf8(response.data.content)
    const words = content.split("\r\n")
    commit("setLevelListWords", {wordListName, levelIdx, words})
}

export function loadLevelLists({ state, dispatch }, wordListName) {
    state.wordLists[wordListName].levelLists.forEach((level, i) => {
        if (level.url) {
            dispatch("loadLevelWords", {wordListName, levelIdx: i})
        }
    })
}

export async function profileContent({ rootState, dispatch, commit }, wordListName="general") {
    const response = await api.post("/token",
        {content: rootState.editor.content}
    )
    commit('setContentTokens', response.data)
    commit("toggleProfileMode", true)

    // const tokens = []
    // const vocabProfiler = new VocabProfiler(tokens, state.wordLists.wordLists)
    // vocabProfiler.profile(wordListName)
    // const sentenceProfiler = new SentenceProfiler(sentences)

    // const vocabEncodedText = vocabProfiler.encodeText()
    // const vocabProfileStatistic = vocabProfiler.computeStatistic()

    // const sentenceProfileStatistic = sentenceProfiler.computeStatistic()

    // commit('updateContent', vocabEncodedText)
    // commit('updateVocabStatistic', vocabProfileStatistic)

    // commit('updateSentenceStatistic', sentenceProfileStatistic)
}
