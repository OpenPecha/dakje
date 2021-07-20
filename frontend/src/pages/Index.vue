<template>
  <q-page padding class="row wrap">
    <div class="q-pl-xl q-pt-md col-20">
      <text-editor classname="typearea" data-test="typearea" :sentence="sentence" @paste="onPaste"/>
      <button class="check" data-test="check" @click="check">Check</button>
    </div>


    <div class="col-2" data-test="suggestion">
      <div>
        ({{suggestions.length}}) All Suggestions
      </div>
      <suggestion v-for="s in suggestions" :id="s[2]" :suggestionIndex="s[1]" :key=s :candidates="s" :name="data.tokens[s[1]]" @selectCorrection="acceptSuggestion" />
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
      data: null
    }
  },

  methods: {
    onPaste (evt) {
      this.sentence = evt.clipboardData.getData('text');
    },

    async acceptSuggestion(correction) {

      //when I accept suggestions, call API and redo everything
      this.check();

      //find index of word in sentence
      let temp = "";
      for (var i = 0; i < this.data.tokens.length; i++) {
        if (i == correction[2]){
          correction[0] = temp.length;
        } else {
          temp += this.data.tokens[i];
        }
      }

      //replace word using indices and substring

      //correction[0]: index of suggestion in string
      //correction[1]: index of candidate in suggestions
      //correction[2]: index of word in suggestions

      let s1 = this.sentence.substring(0, correction[0]);
      let s2 = this.sentence.substring(correction[0]);

      let index = s2.search("</mark>") + 7;

      this.highlightedSentence = s1 + this.data.suggestions[correction[2]].candidates[correction[1]] + s2.substring(index);

      this.suggestions=[];
      for (var i = 0; i < this.data.tokens.length; i++) {
        if (i == correction[2]){
          this.data.tokens[i] = this.data.suggestions[i].candidates[correction[1]];
          delete this.data.suggestions[i];
        } else if (this.data.suggestions.hasOwnProperty(i)) {
          this.suggestions.push([this.data.suggestions[i].candidates,i]);
        }
      }
      this.sentence = this.highlightedSentence;
    },

    async check() {
      this.suggestions = [];
      this.sentence = document.getElementById('typearea').innerText;

      this.loading = true;
      // const response = await this.$api.post("/spellcheck/", {
      //   content: this.sentence
      // });
      // this.data = response.data
      // console.log(this.data)

      const data = {
        "text": "text containng spelling mistakes",
        "tokens": ["text", "containng", "speling", "mistakes"],
        "suggestions":
          {
                "1": {"candidates": ["containing"]},
                "2": {"candidates": ["spelling", "spellling"]}
            }
      }
      this.data=data;

      this.loading = false;

      this.highlightedSentence = "";
      for (var i = 0; i < this.data.tokens.length; i++) {
        if (!data.suggestions.hasOwnProperty(i)) {
          this.highlightedSentence+=this.data.tokens[i] + " ";
        }
        else {
          let wordIndex = this.highlightedSentence.length;
          this.highlightedSentence += "<mark>" + data.tokens[i] + "</mark> ";
          this.suggestions.push([this.data.suggestions[i].candidates, i, wordIndex]);
        }
      }
      this.sentence = this.highlightedSentence;
    },
  }
}
</script>
