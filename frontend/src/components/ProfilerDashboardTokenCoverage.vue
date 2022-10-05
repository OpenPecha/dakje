<template>
  <div>
    <div class="text-h6">Token Coverage</div>
    <div class="container">
      <div class="coverage" :style="{ width: `${totalHitPercent}%` }">
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
  border: 1px solid gray;
  border-radius: 5px;

  & .coverage {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    color: white;
    background-color: green;
  }
}
</style>
