export function updateContent({ commit, dispatch}, html) {
    commit('setContentHTML', html)
    commit('setLastChange', new Date())
}

export function newFile({ commit, dispatch}) {
    dispatch('updateContent', 'Type your masterpiece here...')
    commit('setFilename', 'masterpiece.html')
    commit('setLastSave')
}

export function saveFile({ commit }) {
    commit('saveContentHTML')
    commit('setLastSave')
}
