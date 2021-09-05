<template>
  <q-page class="column full-height" @click="onFocus">
    <editor ref="editor" class="col" />
  </q-page>
</template>

<script>
import Editor from "components/Editor";

export default {
  name: "Index",

  components: {
    Editor,
  },

  methods: {
    onFocus(evt) {
      this.$refs.editor.focus();
    },
  },
};
</script>
