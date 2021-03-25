<template>
<div class="container">
  <div class="sidepanel">
    <div class="title"> Tibetan Spellchecker</div>
    <input class="btn-upload" type="file" ref="myFile" @change="upload">
  </div>
  <div class="content">
    <div contenteditable="true" placeholder="Start by entering Tibetan text!" @paste ="onPaste" id="typearea" classname="typearea"></div>

    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
        <!-- request finished -->
    </div>

    <button class="check" @click="check">Check</button>
  </div>
  <div class="suggestion">
    <suggestion v-for="s in suggestions" :key=s :name=s />
    <br>
  </div>
</div>
</template>

<script>
import Suggestion from "./components/Suggestion";
import './App.css';

export default {
  name: 'App',

  components: {
    Suggestion
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
      reader.onload =  evt => {
        console.log(evt.target.result);
        document.getElementById('typearea').innerHTML = evt.target.result;
      }
      reader.onerror = evt => {
        console.error(evt);
      }
    },

    async check() {
      console.log("check for correction")
      this.suggestions = [];
      this.sentence = document.getElementById('typearea').textContent;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept" },
        body: JSON.stringify({ text: this.sentence})
      };
      this.loading = true;
      const response = await fetch("http://localhost:8000/tokens", requestOptions);
      const data = await response.json();
      this.wordTokens = data;
      this.loading = false;
      this.highlightedSentence = "";
      for (var i = 0; i < data.length; i++) {
        if (data[i].isWord == "true") {
          this.highlightedSentence+=data[i].text;
        }
        else {
          this.highlightedSentence += "<span style ='background-color: red'>" + data[i].text + "</span>";
          this.suggestions.push(data[i].text);
        }
      }
      document.getElementById('typearea').innerHTML = this.highlightedSentence;
    },
  }
}
</script>
