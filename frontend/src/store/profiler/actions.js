import { api } from "boot/axios"
import { WordLists } from "src/utils/textComplexity"

export async function setupWordLists({ commit, state }) {
    if (!state.wordLists) {
        const wordLists = new WordLists()
        commit("setWordLists", wordLists)
    }
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
