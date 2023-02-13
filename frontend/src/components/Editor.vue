<template>
  <div>
    <div v-show="!profileModeOn" class="q-pa-sm editor">
      <q-editor
        v-model="editor"
        max-height="80vh"
        min-height="480px"
        toolbar-push
        :placeholder="$t('འདིར་ཡི་གེ་འཇུག་རོགས་གནང་།')"
        :definitions="{
          profile: {
            icon: 'psychology',
            label: 'ཞིབ་འཇུག',
            tip: $t('ཡིག་ཆ་ཞིབ་འཇུག་གྱིས།'),
            handler: profile,
          },
        }"
        :toolbar="[
          ['bold', 'italic', 'underline', 'strike'],
          ['profile'],
        ]"
      />
    </div>

    <div v-show="profileModeOn" class="q-mx-auto q-mt-md profiledContent">
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

.editor .q-btn__content{
  font-size: 22px;
}

.profiledContent {
  max-width: 1080px;
  max-height: 80vh;
  padding: 0.2rem 1rem;
  border: 1px solid #ccc;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 1.8rem;
  font-family: "Monlam Uni Ochan1";
}

</style>
