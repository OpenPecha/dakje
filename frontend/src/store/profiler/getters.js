/*
export function someGetter (state) {
}
*/
export function totalWords(state) {
    return state.contentWords.length
}

export function totalNumSentences(state) {
    return state.contentSentences.length
}

export function avgSentenceLength(state) {
    var totalLength = 0
    for (const sentence of state.contentSentences) {
        totalLength += sentence.length
    }
    return (totalLength / state.contentSentences.length).toFixed(0)
}
