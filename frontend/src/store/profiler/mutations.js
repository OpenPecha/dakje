export function setContentTokens(state, tokens) {
    state.contentTokens = tokens
}

export function toggleProfileMode(state, payload) {
    console.log(payload)
    if (payload !== null) {
        state.profileModeOn = payload
    } else {
        state.profileModeOn = !state.profileModeOn
    }
}

export function setWordLists(state, wordLists) {
    state.wordLists = wordLists
    console.log(state.wordLists)
}
