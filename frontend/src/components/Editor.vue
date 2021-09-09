<template>
  <div :class="classNames">
    <div v-show="!profileModeOn" class="ProseMirror" contenteditable @input="onInput">
      {{ content }}
    </div>
    <div v-show="profileModeOn" class="ProseMirror" contenteditable>
      <Token v-for="(token, idx) in contentTokens" :key="idx" :token="token" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Token from "components/Token";

export default {
  name: "Editor",

  components: {
    Token,
  },

  data() {
    return {
      editor: null,
    };
  },

  computed: {
    ...mapState("editor", ["content"]),
    ...mapState("profiler", ["contentTokens", "profileModeOn"]),

    classNames() {
      return {
        editor: true,
      };
    },
  },

  created() {
    this.$store.dispatch("profiler/setupWordLists");
  },
  methods: {
    onInput(event) {
      this.$store.dispatch("editor/updateContent", event.target.innerText);
    },

    focus() {
      // this.editor.commands.focus();
    },

    setContent(content) {
      const current = this.editor.getHTML();
      if (content != current) {
        this.editor.commands.setContent(content);
        this.editor.commands.focus();
      }
    },

    finalizeContent(html) {
      return html;
    },
  },
};
</script>

<style lang="scss">
.editor {
  cursor: text;
  padding-top: 1rem;

  @media print {
    padding: 0;
  }
}

.ProseMirror {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 1.5rem;
  font-size: 1rem;
  line-height: 1.75em;

  &:focus {
    outline: none;
  }

  & >>> span {
    margin-left: 10px;
  }

  @media print {
    font-size: 0.8rem;
    max-width: 100%;

    :first-child {
      margin-top: 0 !important;
    }
  }
}
</style>
