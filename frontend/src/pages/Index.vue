<template>
  <q-page padding class="row full-height">
    <editor ref="editor" class="col" />
  </q-page>
</template>

<script>
import { mapState } from "vuex";

import Editor from "components/Editor";

export default {
  name: "Index",

  components: {
    Editor,
  },

  computed: {
    ...mapState("profiler", ["profileModeOn"]),
  },
};
</script>
