<template>
  <div>
    <div class="row q-gutter-lg">
      <div class="col-3">
        <div>Word list:</div>
        <q-select
          v-model="selectedWordList"
          class="q-mt-sm"
          outlined
          dense
          :options="wordListsNames"
        />
      </div>

      <div class="col">
        <div>Levels</div>
        <div class="q-mt-xs q-gutter-xs">
          <q-btn
            v-for="level in selectedWordListLevels"
            :key="level.label"
            :style="{ 'background-color': level.color, color: 'white' }"
            :label="level.label"
            unelevated
            dense
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfilerDashboard",
  data() {
    return {
      selectedWordList: "",
      wordListsNames: [],
    };
  },

  computed: {
    ...mapState("profiler", ["wordLists"]),

    selectedWordListLevels() {
      return this.wordLists[this.selectedWordList].levelLists;
    },
  },

  async created() {
    this.wordListsNames = Object.getOwnPropertyNames(this.wordLists);
    this.selectedWordList = this.wordListsNames[0];
    this.$store.dispatch("profiler/loadLevelLists", this.selectedWordList);
  },
};
</script>
