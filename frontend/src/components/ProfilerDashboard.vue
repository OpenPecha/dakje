<template>
  <div v-if="vocabStatistic">
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
        <!-- <div>Levels</div>
        <div class="q-mt-xs q-gutter-xs">
          <q-btn
            v-for="level in selectedWordListLevels"
            :key="level.label"
            :style="{ 'background-color': level.color, color: 'white' }"
            :label="level.label"
            unelevated
            dense
          />
        </div> -->
      </div>
    </div>

    <ProfilerDashboardTokenCoverage class="q-mt-md" style="width: 60%" />

    <ProfilerDashboardLevelsTable class="q-mt-lg" style="width: 60%" />

    <ProfilerDashboardSentenceStatistic class="q-mt-lg" style="width: 60%" />
  </div>
</template>

<script>
import ProfilerDashboardLevelsTable from "components/ProfilerDashboardLevelsTable";
import ProfilerDashboardSentenceStatistic from "components/ProfilerDashboardSentenceStatistic";
import ProfilerDashboardTokenCoverage from "components/ProfilerDashboardTokenCoverage";
import { mapActions, mapState } from "vuex";

export default {
  name: "ProfilerDashboard",

  components: {
    ProfilerDashboardLevelsTable,
    ProfilerDashboardTokenCoverage,
    ProfilerDashboardSentenceStatistic,
  },

  data() {
    return {
      selectedWordList: "",
      wordListsNames: [],
    };
  },

  computed: {
    ...mapState("profiler", ["wordLists", "vocabStatistic"]),

    selectedWordListLevels() {
      return this.wordLists[this.selectedWordList].levelLists;
    },
  },

  watch: {
    async selectedWordList(val) {
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
