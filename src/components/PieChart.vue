<template>
  <apexchart class="chart" type="pie" :options="options" :series="series" />
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      options: {
        chart: {
          width: 380,
          type: 'pie',
          offsetX: 1000,
          offsetY: -150,
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        legend: {
          position: 'bottom',
        }
      },
      series: [44, 55, 13, 43, 22],
    }
  }
}
</script>

<style>
  @import 'apexcharts/dist/apexcharts.css';
  .chart {
    max-width: 500px;
  }
</style>
