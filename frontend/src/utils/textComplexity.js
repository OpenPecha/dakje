import { axios } from "src/boot/axios"

export class VocabProfiler {
    constructor(tokens, wordLists) {
        this.tokens = tokens
        this.wordLists = wordLists
    }

    async profile(wordListName) {
        await this.wordLists[wordListName].loadLevels()
        console.log(this.wordLists[wordListName])
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

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
class LevelList {
    constructor(url, label) {
        this.url = url
        this.label = label
        this.words = []
    }

    async loadWords() {
        const response = await axios.get(this.url)
        const content = b64_to_utf8(response.data.content)
        this.words = content.split("\r\n")
    }
}
class WordList {
    constructor(url) {
        this.url = url
        this.levelLists = []
        this.init()
    }

    async init() {
      const response = await axios.get(this.url)
      response.data.forEach((levelFile) => {
          const levelLabel = levelFile.name.replace(".txt", "")
          this.levelLists.push(new LevelList(levelFile.url, levelLabel))
      })
    }

    async loadLevels() {
        this.levelLists.forEach((level) => {
            level.loadWords()
        })
    }
}
export class WordLists {
    constructor() {
        this.url = 'https://api.github.com/repos/Esukhia/word-lists/contents',
        this.wordLists = {}
        this.init()
    }
    async init() {
      const response = await axios.get(this.url)
      response.data.forEach((content) => {
          if (content.type === "dir") {
              this.wordLists[content.name] = new WordList(content.url)
          }
      })
    }
}
