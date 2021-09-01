<template>
  <div>
    <editor-content id="typearea" :editor="editor" />
    <div v-if="editor" class="toolbar">
      <button
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <font-awesome-icon icon="bold" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <font-awesome-icon icon="italic" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive('underline') }"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <font-awesome-icon icon="underline" />
      </button>
      <!-- <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        <font-awesome-icon icon="paragraph" />
      </button> -->
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        h1
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        h2
      </button>
      <button
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <font-awesome-icon icon="list" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <font-awesome-icon icon="list-ol" />
      </button>

      <button @click="editor.chain().focus().clearNodes().run()">
        <font-awesome-icon icon="remove-format" />
      </button>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    EditorContent,
    FontAwesomeIcon,
  },

  props: ["sentence"],

  data() {
    return {
      editor: null,
    };
  },

  watch: {
    sentence(updatedSentence) {
      this.editor.commands.setContent(updatedSentence);
    },
  },

  mounted() {
    this.editor = new Editor({
      content: "ངའ་མིང་ཀྲ་ཤིས་ཟིར།",
      extensions: [StarterKit, Highlight, Underline],
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
