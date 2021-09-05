import { api } from "boot/axios"

export function updateContent({ commit, dispatch}, html) {
    commit('setContentHTML', html)
    commit('setLastChange', new Date())
}

export function newFile({ commit, dispatch}) {
    dispatch('updateContent', 'Type your masterpiece here...')
    commit('setFilename', 'masterpiece.html')
    commit('setLastSave')
}

export function loadFile({ commit, dispatch }, file={}) {
    commit('setFilename', file.name)
    dispatch('updateContent', file.html)
    dispatch('saveFile')
}

export function saveFile({ commit }) {
    commit('saveContentHTML')
    commit('setLastSave')
}

export async function tokenizeContent({ commit, state }) {
    console.log(state.contentHTML)
    const response = await api.post("/tokens/",
        {content: state.contentHTML}
    )
    console.log(response.data)
}
