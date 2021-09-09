export function setContentTokens(state, tokens) {
    state.contentTokens = tokens
}

export function toggleProfileMode(state, payload) {
    state.profileModeOn = payload
}

export function setWordLists(state, wordLists) {
    state.wordLists = wordLists
    console.log(state.wordLists)
}

export function loadLevelList(state, wordListName) {
    state.wordLists[wordListName].loadLevels()
}

export function setLevelListWords(state, {wordListName, levelIdx, words}) {
    state.wordLists[wordListName].levelLists[levelIdx].words = words
}
