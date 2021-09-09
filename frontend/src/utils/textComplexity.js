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


const LevelColors = [
    "maroon",
    "green",
    "navy",
    "cornflowerblue",
    "chocolate",
    "dodgerblue"
]
class LevelList {
    constructor(url, label, color) {
        this.url = url
        this.label = label
        this.color = color
        this.words = []
        this.hits = 0
        this.miss = 0
    }

    async loadWords() {
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
      response.data.forEach((levelFile, i) => {
          const levelLabel = levelFile.name.replace(".txt", "")
          const levelList = new LevelList(levelFile.url, levelLabel, LevelColors[i])
          this.levelLists.push(levelList)
      })

      // add unlisted level
      const unListedLevel = new LevelList("", "Unlisted", "black")
      this.levelLists.push(unListedLevel)
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
