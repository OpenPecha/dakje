<template>
  <q-page padding>
    <div
      v-show="profileModeOn"
      class="q-mx-auto row justify-start"
      style="max-width: 1080px;"
    >
      <q-btn
        dense
        flat
        icon="arrow_back"
        color="primary"
        @click="toggleToEditorMode"
      />

      <q-btn
        dense
        no-caps
        outline
        :label="rightDrawerOpen ? $t('གྲུབ་དོན་སྦེད་པ།') : $t('ཞིབ་བཤེར་གྲུབ་དོན།')"
        color="primary"
        @click="toggleRightDrawer"
      />
    </div>
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
    ...mapState("base", ["rightDrawerOpen"]),
  },

  methods: {
    toggleRightDrawer() {
      this.$store.dispatch("base/toggleRightDrawer");
    },

    toggleToEditorMode() {
      this.$store.commit("profiler/toggleProfileMode");
    },
  }
};
</script>
