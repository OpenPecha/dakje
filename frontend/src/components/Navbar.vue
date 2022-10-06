<template>
  <q-toolbar :class="className">
    <!-- <q-btn
      dense
      flat
      round
      icon="menu"
      aria-label="Menu"
      :title="$t('Toggle Menu')"
      @click="$emit('toggleMenu')"
    /> -->

    <q-toolbar-title>
      <q-avatar class="q-mr-md">
        <img src="https://monlamit.com/assets/img/apple-touch-icon.png">
      </q-avatar>
      {{ $t("Monlam Children\'s Literary Review System")}}
    </q-toolbar-title>


    <q-page-sticky position="bottom-right" :offset="[50, 50]">
      <q-btn
        v-show="profileModeOn"
        fab
        :title="$t('Editor')"
        icon="text_fields"
        color="primary"
        @click="toggleToEditorMode"
      />

      <q-btn
        v-show="!profileModeOn"
        fab
        :title="$t('Analyze Text')"
        icon="psychology"
        color="primary"
        @click="profile"
      />

    </q-page-sticky>
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
