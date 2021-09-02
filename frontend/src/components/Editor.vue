<template>
  <div :class="classNames">
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

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

  mounted() {
    this.editor = new Editor({
      content: "<p>I’m running tiptap with Vue.js. 🎉</p>",
      extensions: [StarterKit],
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },

  methods: {
    focus() {
      this.editor.commands.focus();
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
