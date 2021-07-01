<template>
<div class="container">
  <div class="sidepanel">
    <div class="title"> Tibetan Spellchecker</div>
    <input class="btn-upload" type="file" ref="myFile" @change="upload" data-test="upload">
    <download />
  </div>
  <div class="content">
    <text-editor @paste="onPaste" id="typearea" classname="typearea" data-test="typearea"/>

    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
        <!-- request finished -->
    </div>

    <button class="check" @click="check" data-test="check">Check</button>
  </div>
  <div class="suggestion" data-test="suggestion">
    <suggestion v-for="s in suggestions" :key=s :name=s />
    <br>
  </div>
</div>
</template>

<script>
import Suggestion from "../components/Suggestion";
import Download from '../components/Download.vue';
import TextEditor from '../components/TextEditor.vue';

export default {
  name: 'App',

components: {
  Suggestion,
  Download,
  TextEditor,
},
  data() {
    return {
      suggestions:[
        "N/A"
      ],
      sentence: "",
      highlightedSentence: "",
      loading: false,
    }
  },

  methods: {
    onPaste (evt) {
      this.sentence = evt.clipboardData.getData('text');
    },

    upload() {
      console.log("file uploading");
      let file = this.$refs.myFile.files[0];
      if(!file || file.type !== 'text/plain') return;

      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = evt => {
        console.log(evt.target.result);
        document.getElementById('typearea').innerHTML = evt.target.result;
      }
      reader.onerror = evt => {
        console.error(evt);
      }
    },

    async check() {
      console.log("check for correction");
      this.suggestions = [];
      this.sentence = document.getElementById('typearea').innerHTML;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept" },
        body: JSON.stringify({ text: this.sentence})
      };
      this.loading = true;
      const response = await fetch("http://localhost:8000/api/spellcheck", requestOptions);
      const data = await response.json();

      // const data = {
      //   "text": "text containng spelling mistakes",
      //   "tokens": ["text", "containng", "speling", "mistakes"],
      //   "suggestions":
      //     {
      //           "1": {"candidates": ["containing"]},
      //           "2": {"candidates": ["spelling"]}
      //       }
      // }

      this.wordTokens = data;
      this.loading = false;
      this.highlightedSentence = "";
      for (var i = 0; i < data.tokens.length; i++) {
        if (!data.suggestions.hasOwnProperty(i)) {
          this.highlightedSentence+=data.tokens[i] + " ";
        }
        else {
          this.highlightedSentence += "<span style ='background-color: red'>" + data.tokens[i] + "</span> ";
          this.suggestions.push(data.suggestions[i].candidates);
        }
      }
      document.getElementById('typearea').innerHTML = this.highlightedSentence;
    },
  }
}
</script>
