<template>
  <editor-content id="typearea" :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
  },

  props: ['sentence'],

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    sentence (updatedSentence) {
      console.log(updatedSentence);
      this.editor.commands.setContent(updatedSentence);
    }
  },

  mounted() {
    this.editor = new Editor({
      content: '<p>Start by entering Tibetan text! 🎉</p>',
      extensions: [
        StarterKit,
      ],
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>
