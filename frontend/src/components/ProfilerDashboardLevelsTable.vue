<template>
  <div>
    <table class="profileTable">
      <thead>
        <tr>
          <th style="text-align: left">Levels</th>
          <th style="text-align: right">No. of Words</th>
          <th style="text-align: right">Percent</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="col in columns" :key="col.name">
          <td class="row">
            <div
              :style="{
                height: '20px',
                width: '20px',
                'background-color': col.color,
                'margin-right': '5px',
              }"
            ></div>
            {{ col.name }}
          </td>
          <td style="text-align: right">{{ col.wordCount }}</td>
          <td style="text-align: right">{{ col.percent }}%</td>
        </tr>
      </tbody>
    </table>
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

<style lang="scss" scoped>

.profileTable {
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }
}
</style>
