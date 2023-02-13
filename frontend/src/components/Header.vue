<template>
  <div class="q-px-md q-py-sm">
    <div class="flex no-wrap">
      <q-avatar class="q-mr-md">
        <img src="https://monlamit.com/assets/img/apple-touch-icon.png">
      </q-avatar>
      <div class="q-mt-xs">
        <div class="text-h6 text-center text-primary"> {{ $t("སྨོན་ལམ་ཐ་སྙད་ཚད་གཞི་བརྟག་ཆས།")}} </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  emits: ["toggleMenu"],

  computed: {
    ...mapState("profiler", ["contentWordsLevel"]),
  },
};
</script>

<style lang="sass" scoped></style>
