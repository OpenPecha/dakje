<template>
  <q-toolbar :class="className">
    <q-btn
      dense
      flat
      round
      icon="menu"
      aria-label="Menu"
      :title="$t('Toggle Menu')"
      @click="$emit('toggleMenu')"
    />

    <q-btn
      v-show="profileModeOn"
      flat
      rouned
      :title="$t('Editor')"
      icon="text_fields"
      @click="toggleToEditorMode"
    />

    <q-btn
      v-show="!profileModeOn"
      flat
      rouned
      :title="$t('Analyze Text')"
      icon="psychology"
      @click="profile"
    />
  </q-toolbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  emits: ["toggleMenu"],

  computed: {
    ...mapState("profiler", ["contentWordsLevel", "profileModeOn"]),
    className() {
      return this.$q.dark.isActive
        ? "bg-dark-page text-grey-6 shadow-dark-page"
        : "bg-white text-grey-7 shadow-white";
    },
  },

  methods: {
    profile() {
      this.$store.dispatch("profiler/tokenizeContent");
    },

    toggleToEditorMode() {
      this.$store.commit("profiler/toggleProfileMode");
    },
  },
};
</script>

<style lang="sass" scoped></style>
