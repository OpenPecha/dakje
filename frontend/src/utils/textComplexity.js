export class VocabProfiler {
    constructor(tokens) {
        this.tokens = tokens
    }

    encodeText() {
        console.log(this.tokens)
    }

    computeStatistic() {
        console.log(this.tokens.length)
    }
}

export class SentenceProfiler {
    constructor(tokens) {
        this.tokens = tokens
    }

    computeStatistic() {
        console.log(this.tokens.length)
    }
}
