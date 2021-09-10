<template>
  <div>
    <div>Token Coverage</div>
    <div class="container row">
      <div class="coverage" :style="{ width: `${totalHitPercent}%` }"></div>
      <div class="q-ml-sm">
        {{ totalHitPercent + "%" }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfilerDashboardTokenCoverage",

  computed: {
    ...mapState("profiler", ["vocabStatistic"]),
    totalHitPercent() {
      const totalHit = this.vocabStatistic.totalHit;
      const totalMiss = this.vocabStatistic.totalMiss;
      const percent = (totalHit / (totalHit + totalMiss)) * 100;
      return percent.toFixed(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0;
  margin: 0;
  border: 1px solid gray;

  & .coverage {
    margin: 0;
    height: 24px;
    background-color: green;
  }
}
</style>
