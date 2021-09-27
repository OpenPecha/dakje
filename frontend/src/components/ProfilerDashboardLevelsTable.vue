<template>
  <div class="column">
    <div class="row">
      <div class="col">Levels</div>
      <div class="col">No. of Words</div>
      <div class="col">% of total</div>
    </div>
    <div v-for="col in columns" :key="col.name" class="row">
      <div class="col row">
        <div
          :style="{
            height: '20px',
            width: '20px',
            'background-color': col.color,
            'margin-right': '5px',
          }"
        ></div>
        {{ col.name }}
      </div>
      <div class="col">{{ col.wordCount }}</div>
      <div class="col">{{ col.percent }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilerDashboardLevelsTable",
  data() {
    return {
      columns: [],
    };
  },

  watch: {
    "$store.state.profiler.vocabStatistic": function (val) {
      this.columns = [];
      if (!val.levels) {
        return;
      }

      Object.keys(val.levels).map((levelLabel, idx) => {
        const level = val.levels[levelLabel];
        this.columns.push({
          name: levelLabel,
          wordCount: level.count,
          percent: level.percent,
          color: level.color,
        });
      });
    },
  },
};
</script>

<style scoped>
.row > div {
  border: 1px solid rgba(86, 61, 124, 0.2);
}
</style>
