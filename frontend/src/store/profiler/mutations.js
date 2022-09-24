
export function setContentWords(state, words) {
    state.contentWords = words
}

export function setContentSentences(state, sentences) {
    state.contentSentences = sentences
}

export function toggleProfileMode(state, payload) {
    state.profileModeOn = payload
}

export function setWordLists(state, wordLists) {
    state.wordLists = wordLists
}

export function loadLevelList(state, wordListName) {
    state.wordLists[wordListName].loadLevels()
}

export function setLevelListWords(state, {wordListName, levelIdx, words}) {
    state.wordLists[wordListName].levelLists[levelIdx].words = words
}

export function incrementVocabHit(state, {wordListName, levelIdx}) {
    state.wordLists[wordListName].levelLists[levelIdx].count++
}

export function setLevelWordsLoaded(state, payload) {
    state.levelWordsLoaded = payload
}

export function setVocabStatistic(state, statistic) {
    state.vocabStatistic = statistic
}

export function resetVocabStatistic(state, wordListName) {
    console.log("resetVocabStatistic");
    state.vocabStatistic = {}
    if (wordListName in state.wordLists) {
        console.log("resetVocabStatistic", wordListName);
        state.wordLists[wordListName].levelLists.forEach((level) => {
                level.reset()
        });
    }
}

export function resetContentWordsLevel (state) {
    state.contentWordsLevel = []
}

export function appendWordToContentWordsLevel(state, word) {
    state.contentWordsLevel.push(word)
}
