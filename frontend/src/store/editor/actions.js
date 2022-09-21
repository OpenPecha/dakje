
export function updateContent ({ commit, dispatch }, html) {
    commit('setContentHTML', html)
    commit('setLastChange', new Date())
}

export function newFile ({ commit, dispatch }) {
    dispatch('updateContent', '')
    commit('setFilename', 'masterpiece.html')
    commit('setLastSave')
    commit("profiler/toggleProfileMode", false, { root: true })
}

export function loadFile ({ commit, dispatch }, file = {}) {
    commit('setFilename', file.name)
    dispatch('updateContent', file.html)
    dispatch('saveFile')
    commit("profiler/toggleProfileMode", false, { root: true })
}

export function saveFile ({ commit }) {
    commit('saveContentHTML')
    commit('setLastSave')
}
