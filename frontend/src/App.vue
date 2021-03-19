<template>
<div class="container">
  <div class="sidepanel">
    <div class="title"> Tibetan Spellchecker</div>
    <button class="btn-upload" @click="upload">Upload File</button>
  </div>
  <div class="content">
    <textarea name="text" class="textarea">Here is the text</textarea>
    <button @click="check">Check</button>
  </div>
  <div class="suggestion">
    <suggestion v-for="s in suggestions" :key=s :name=s />
    <br>
  </div>
</div>
</template>

<script>
import Suggestion from "./components/Suggestion"
export default {
  name: 'App',

components: {
  Suggestion
},
  data() {
    return {
      suggestions: [
        {id: 1},
        {id: 2},
        {id: 3},
      ]
    }
  },

  methods: {
    upload() {
      console.log("file uploading")
    },

    check() {
      console.log("check for correction")
      this.suggestions.push({id: 4})
    }
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eeeeee
}

.container {
  display: grid;
  grid-template-columns: 18rem auto 18rem;
  grid-template-rows: 100vh;
  grid-template-areas: "sidepanel content suggestion";
}

.sidepanel {
  grid-area: sidepanel;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  background-color: #323439;
}

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #eeeeee
}

.btn-upload {
  margin-top: 3rem;
}


.content {
  grid-area: content;
  margin-left: 1rem;
}

.textarea {
  width: 100%;
  height: 80%
}

.suggestion {
  grid-area: suggestion;
  margin-left: 1rem;
}
</style>
