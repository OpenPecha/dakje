<template>
  <div>
    <div v-show="!profileModeOn" class="q-pa-sm editor">
      <q-editor
        v-model="editor"
        dense
        max-height="80vh"
        min-height="480px"
        :placeholder="$t('Type or paste your text here')"
        :definitions="{
          profile: {
            label: $t('Profile'),
            tip: 'profile the text',
            icon: 'psychology',
            handler: profile,
          },
        }"
        :toolbar="[
          ['bold', 'italic', 'underline', 'strike'],
          ['profile'],
        ]"
      />
    </div>

    <div v-show="profileModeOn" class="profiledContent">
      <Word v-for="(word, idx) in contentWordsLevel" :key="idx" :word="word" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import Word from "components/Word";

export default {
  name: "Editor",

  components: {
    Word,
  },

  computed: {
    ...mapState("editor", ["content"]),
    ...mapState("profiler", ["contentWordsLevel", "profileModeOn"]),
    ...mapGetters("editor", ["contentInnerText"]),

    editor: {
      get() {
        return this.content;
      },
      set(value) {
        this.$store.dispatch("editor/updateContent", value);
      },
    },

  },

  created() {
    this.$store.dispatch("profiler/setupWordLists");
  },

  methods: {
    profile() {
      this.$store.dispatch("profiler/tokenizeContent");
    },
  }
};
</script>

<style lang="scss">

.editor {
  max-width: 1080px;
  margin: auto;
  font-size: 2rem;
  line-height: 1.7;
  overflow: auto;
  font-family: "Monlam Uni Ochan1";
}

.profiledContent {
  margin-top: 0.5rem;
  max-width: 1080px;
  margin-left: 100px;
  margin-right: 50px;
  padding: 10px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 2rem;
  font-family: "Monlam Uni Ochan1";
}

</style>
