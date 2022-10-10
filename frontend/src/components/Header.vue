<template>
  <div class="q-px-md q-py-sm">
    <div class="flex no-wrap">
      <q-avatar class="q-mr-md">
        <img src="https://monlamit.com/assets/img/apple-touch-icon.png">
      </q-avatar>
      <div class="q-mt-xs">
        <div class="text-h6 text-center text-primary"> {{ $t("Monlam Children\'s Literary Review System")}} </div>
      </div>
    </div>


    <q-page-sticky position="top-left" :offset="[20, 25]">
      <q-btn
        v-show="profileModeOn"
        fab
        :title="$t('Go to Editor')"
        icon="arrow_back"
        @click="toggleToEditorMode"

      />
    </q-page-sticky>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
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

    toggleToEditorMode() {
      this.$store.commit("profiler/toggleProfileMode");
    },
  },
};
</script>

<style lang="sass" scoped></style>
