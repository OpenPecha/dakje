<template>
  <div :class="classNames">
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

import { LocalStorage } from "quasar";
import { CONTENT_CACHE_KEY } from "../config";

export default {
  name: "Editor",

  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    };
  },

  computed: {
    classNames() {
      return {
        editor: true,
      };
    },
  },
  watch: {
    "$store.state.editor.contentHTML": function (val) {
      this.setContent(val);
    },
  },

  mounted() {
    const html = LocalStorage.getItem(CONTENT_CACHE_KEY);
    this.$store.dispatch("editor/updateContent", html);
    const finalizeContent = this.finalizeContent;
    const store = this.$store;
    this.editor = new Editor({
      extensions: [StarterKit],
      content: html,
      onUpdate({ editor }) {
        const html = editor.getHTML();
        const content = finalizeContent(html);
        console.log(content);
        store.dispatch("editor/updateContent", content);
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },

  methods: {
    focus() {
      this.editor.commands.focus();
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

  @media print {
    font-size: 0.8rem;
    max-width: 100%;

    :first-child {
      margin-top: 0 !important;
    }
  }
}
</style>
