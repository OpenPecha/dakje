<template>
  <div>
    <editor-content id="typearea" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'

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
      content: 'ངའ་མིང་ཀྲ་ཤིས་ཟིར།',
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Highlight,
      ],
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>
