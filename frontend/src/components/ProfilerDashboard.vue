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

    <ProfilerDashboardTokenCoverage class="q-mt-md" style="width: 60%" />

    <ProfilerDashboardLevelsTable class="q-mt-md" style="width: 60%" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProfilerDashboardLevelsTable from "components/ProfilerDashboardLevelsTable";
import ProfilerDashboardTokenCoverage from "components/ProfilerDashboardTokenCoverage";
export default {
  name: "ProfilerDashboard",

  components: {
    ProfilerDashboardLevelsTable,
    ProfilerDashboardTokenCoverage,
  },

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

  watch: {
    async selectedWordList(val) {
      this.$store.commit("profiler/resetVocabStatistic");
      await this.loadLevelLists(val);
      await this.profileContent(val);
      await this.computeVocabStatistic(val);
    },
  },

  async created() {
    this.wordListsNames = Object.getOwnPropertyNames(this.wordLists);
    this.selectedWordList = this.wordListsNames[0];
  },

  methods: {
    ...mapActions("profiler", [
      "loadLevelLists",
      "profileContent",
      "computeVocabStatistic",
    ]),
  },
};
</script>
