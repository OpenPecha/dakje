import { api } from "boot/axios"

export function updateContent({ commit, dispatch}, html) {
    commit('setContentHTML', html)
    commit('setLastChange', new Date())
}

export function newFile({ commit, dispatch}) {
    dispatch('updateContent', 'Type your masterpiece here...')
    commit('setFilename', 'masterpiece.html')
    commit('setLastSave')
    commit("toggleProfileMode")
}

export function loadFile({ commit, dispatch }, file={}) {
    commit('setFilename', file.name)
    dispatch('updateContent', file.html)
    dispatch('saveFile')
    commit("toggleProfileMode")
}

export function saveFile({ commit }) {
    commit('saveContentHTML')
    commit('setLastSave')
}

export async function fetchWordLists({ commit }) {
    //
}

export async function profileContent({ state, dispatch, commit }) {
    const response = await api.post("/token",
        {content: state.content}
    )
    commit('setContentTokens', response.data)
    commit("toggleProfileMode")

    // const vocabProfiler = new VocabProfiler(tokens)
    // const sentenceProfiler = new SentenceProfiler(sentences)

    // const vocabEncodedText = vocabProfiler.encodeText()
    // const vocabProfileStatistic = vocabProfiler.computeStatistic()

    // const sentenceProfileStatistic = sentenceProfiler.computeStatistic()

    // commit('updateContent', vocabEncodedText)
    // commit('updateVocabStatistic', vocabProfileStatistic)

    // commit('updateSentenceStatistic', sentenceProfileStatistic)
}
