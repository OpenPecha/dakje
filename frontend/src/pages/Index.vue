<template>
  <q-page padding class="row justify-center">
    <div class="col-6">
      <text-editor id="typearea" classname="typearea" data-test="typearea" @paste="onPaste"/>

      <div v-if="loading">
        Loading...
      </div>

      <button class="check" data-test="check" @click="check">Check</button>
    </div>

    <div class="col-2" data-test="suggestion">
      <suggestion v-for="s in suggestions" :id="s[1]" :key=s :candidates="s" :name="data.tokens[s[1]]" @selectCorrection="acceptSuggestion" />
    </div>
  </q-page>
</template>

<script>
import Suggestion from "../components/Suggestion";
import TextEditor from '../components/TextEditor.vue';

export default {
  name: 'App',
components: {
  Suggestion,
  TextEditor,
},
  data() {
    return {
      suggestions:[],
      sentence: "",
      highlightedSentence: "",
      loading: false,
      data: [],
    }
  },
  methods: {
    onPaste (evt) {
      this.sentence = evt.clipboardData.getData('text');
    },

    async acceptSuggestion(correction) {
      console.log(correction)
      //correction[0]: index of suggestion
      //correction[1]: index of candidate
      this.highlightedSentence = "";
      this.suggestions=[];
      for (var i = 0; i < this.data.tokens.length; i++) {
        if (i == correction[0]){
          this.highlightedSentence += this.data.suggestions[i].candidates[correction[1]] + " ";
          this.data.tokens[i] = this.data.suggestions[i].candidates[correction[1]];
          delete this.data.suggestions[i];
        } else if (!this.data.suggestions.hasOwnProperty(i)) {
          this.highlightedSentence+=this.data.tokens[i] + " ";
        } else {
          this.highlightedSentence += "<span style ='background-color: red'>" + this.data.tokens[i] + "</span> ";
          this.suggestions.push([this.data.suggestions[i].candidates,i]);
        }
      }
      document.getElementById('typearea').innerHTML = this.highlightedSentence;
    },

    async check() {
      console.log("check for correction");
      this.suggestions = [];
      this.sentence = document.getElementById('typearea').innerHTML;
      // const requestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept" },
      //   body: JSON.stringify({ text: this.sentence})
      // };
      // this.loading = true;
      // const response = await fetch("http://localhost:8000/api/spellcheck", requestOptions);
      // const data = await response.json();
      const data = {
        "text": "text containng spelling mistakes",
        "tokens": ["text", "containng", "speling", "mistakes"],
        "suggestions":
          {
                "1": {"candidates": ["containing"]},
                "2": {"candidates": ["spelling", "spellling"]}
            }
      }
      this.data = data;
      this.loading = false;
      this.highlightedSentence = "";
      for (var i = 0; i < data.tokens.length; i++) {
        if (!data.suggestions.hasOwnProperty(i)) {
          this.highlightedSentence+=data.tokens[i] + " ";
        }
        else {
          this.highlightedSentence += "<span style ='background-color: red'>" + data.tokens[i] + "</span> ";
          this.suggestions.push([data.suggestions[i].candidates,i]);
        }
      }
      document.getElementById('typearea').innerHTML = this.highlightedSentence;
    },
  }
}
</script>
