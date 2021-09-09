<template>
  <q-page class="row full-height" @click="onFocus">
    <editor ref="editor" class="col" />
    <ProfilerDashboard v-if="profileModeOn" class="col-5" />
  </q-page>
</template>

<script>
import { mapState } from "vuex";

import Editor from "components/Editor";
import ProfilerDashboard from "components/ProfilerDashboard";

export default {
  name: "Index",

  components: {
    Editor,
    ProfilerDashboard,
  },

  computed: {
    ...mapState("profiler", ["profileModeOn"]),
  },

  methods: {
    onFocus(evt) {
      this.$refs.editor.focus();
    },
  },
};
</script>
