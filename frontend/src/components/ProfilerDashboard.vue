<template>
  <div v-if="vocabStatistic">
    <div class="row q-gutter-lg">
      <div>
        <div class="text-h6">ཐ་སྙད་རེའུ་མིག</div>
        <q-select
          v-model="selectedWordList"
          class="q-mt-sm"
          outlined
          dense
          :options="wordListsNames"
        />
      </div>

      <!-- <div class="col">
        <div>ཚད་གཞི།</div>
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
      </div> -->
    </div>

    <ProfilerDashboardTokenCoverage class="q-mt-md" />

    <ProfilerDashboardLevelsTable class="q-mt-lg" />

    <ProfilerDashboardSentenceStatistic class="q-mt-lg" />
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
