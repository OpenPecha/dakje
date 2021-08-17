<template>
  <q-page padding class="row wrap">
    <div class="text-container q-pl-xl q-pt-md col-20">
      <text-editor classname="typearea" data-test="typearea" :sentence="sentence" @paste="onPaste" @keyup="autocheck"/>
      <button class="check" data-test="check" @click="check">Check<span v-show="isLoading">ing... <font-awesome-icon icon="spinner" /></span></button>
    </div>


    <div class="suggestion" data-test="suggestion">
      <div>
        ({{suggestions.length}}) All Suggestions
      </div>
      <suggestion v-for="s in suggestions" :id="s" :key=s :candidates="s" :name="data.tokens" @selectCorrection="acceptSuggestion" />
    </div>
  </q-page>
</template>

<script>
import Suggestion from "../components/Suggestion";
import TextEditor from '../components/TextEditor.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'App',
  components: {
    Suggestion,
    TextEditor,
    FontAwesomeIcon,
  },
  data() {
    return {
      suggestions:[],
      sentence: "",
      highlightedSentence: "",
      isLoading: false,
      data: null,
      timeout: null
    }
  },
  methods: {
    onPaste (evt) {
      this.sentence = evt.clipboardData.getData('text');
    },

    autocheck: function() {

      // clear timeout variable
      clearTimeout(this.timeout);
      var self = this;

      this.timeout = setTimeout(function () {
          // enter this block of code after 1 second
          console.log("autochecked")
          self.check()
      }, 2000);

    },

    async acceptSuggestion(correction) {
      /*
        correction[0]: index of suggestion in string
        correction[1]: index of candidate in suggestions
        correction[2]: index of word in suggestions
      */
      console.log(this.sentence)
      let s1 = this.sentence.substring(0, correction[0]);
      let s2 = this.sentence.substring(correction[0]);
      let index = s2.search("</mark>") + 7;

      let oldWord = s2.substring(6, s2.search("</mark>"))
      let newWord = this.data.suggestions[correction[2]].candidates[correction[1]]
      this.highlightedSentence = s1 + newWord + s2.substring(index);

      let wordLengthDifference = oldWord.length - newWord.length;

      let offset = wordLengthDifference + 13;

      console.log("s1:" + s1.length + ", s2:" + s2.length + ", index:" + index + ", newWord:" + newWord +", wordLengthDif: " + wordLengthDifference)
      /*
        suggestions[i][0]: candidates for corrections
        suggestions[i][1]: index of word
        suggestions[i][2]: index of word in string
      */

      var deleted = false;
      //update every following word by update length
      for (var i = 0; i < this.suggestions.length; i++) {
        if (this.suggestions[i][1] == correction[2] && !deleted){
          this.suggestions.splice(i, 1);
          deleted = true;
          i--;
        } else if (this.suggestions[i][1] >= correction[2]) { //update the index of each following suggestion
          this.suggestions[i][2] = this.suggestions[i][2] - offset;
          let temp = [...this.suggestions[i]] //create a copy to refresh display
          this.suggestions.splice(i, 1, temp)
        }
      }
      this.sentence = this.highlightedSentence;
      console.log(this.sentence)

    },

    async check() {
      this.suggestions = [];
      this.sentence = document.getElementById('typearea').innerText;

      this.isLoading = true;
      const response = await this.$api.post("/spellcheck/", {
        content: this.sentence
      });
      this.data = response.data
      console.log(this.data)

      this.highlightedSentence = "";
      for (var i = 0; i < this.data.tokens.length; i++) {
        if (!this.data.suggestions.hasOwnProperty(i)) {
          this.highlightedSentence+=this.data.tokens[i] + " ";
        }
        else {
          var charIndex = this.highlightedSentence.length;
          this.highlightedSentence += "<mark>" + this.data.tokens[i] + "</mark> ";
          this.suggestions.push([this.data.suggestions[i].candidates, i, charIndex]);
        }
      }
      this.sentence = this.highlightedSentence;
      this.isLoading = false;
    },
  },
}
</script>
