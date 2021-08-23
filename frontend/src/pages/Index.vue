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
      <suggestion
        v-for="s in suggestions"
        :id="s"
        :key=s
        :candidates="s"
        :name="data.tokens"
        @selectCorrection="acceptSuggestion"
      />
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

    /**
     * Strips HTML tags when pasting content
     * @param {Object} evt Event
     */
    onPaste (evt) {
      this.sentence = evt.clipboardData.getData('text');
    },

    /**
     * Automatically checks content after 2 seconds of inactivity
     */
    autocheck: function() {
      // clear timeout variable
      clearTimeout(this.timeout);
      var self = this;

      this.timeout = setTimeout(function () {
          self.check()
      }, 2000);

    },

    /**
     * Updates text on screen when user accepts a suggestion.
     * @param {Array} correction Contains data on where to replace text
     *
     * correction[0]: index of suggestion in string
     * correction[1]: index of candidate in suggestions
     * correction[2]: index of word in suggestions
     */
    async acceptSuggestion(correction) {
      let s1 = this.sentence.substring(0, correction[0]); //from index 0 to location of word
      let s2 = this.sentence.substring(correction[0]); //from location of word to end of sentence
      let index = s2.search("</mark>") + 7; //end of highlighted word

      let oldWord = s2.substring(6, s2.search("</mark>")) //6 is length of "<mark>"
      let newWord = this.data.suggestions[correction[2]].candidates[correction[1]]
      this.highlightedSentence = s1 + newWord + s2.substring(index); //construct new sentence

      let offset = oldWord.length - newWord.length + 13; //+13 for removed <mark> and </mark>

      /**
       * suggestions[i][0]: candidates for corrections
       * suggestions[i][1]: index of word
       * suggestions[i][2]: index of word in string
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
          let newSuggestion = [...this.suggestions[i]] //create a copy to refresh display
          this.suggestions.splice(i, 1, newSuggestion)
        }
      }
      this.sentence = this.highlightedSentence;
    },

    /**
     *  Sends content to API for spellchecking. Called automatically or when check button pressed.
     */
    async check() {
      this.suggestions = [];
      this.sentence = document.getElementById('typearea').innerText;

      this.isLoading = true;
      const response = await this.$api.post("/spellcheck/", {
        content: this.sentence
      });
      this.data = response.data

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
