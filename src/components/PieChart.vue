<script>
import VueApexCharts from 'vue-apexcharts';
import { mapGetters } from 'vuex';
export default {
  components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    dataCount: []
  }),
  computed: {
    ...mapGetters(['userCoinsList']),
    ...mapGetters(['coinChartList']),
    itemsCount: {
      get() { return this.coinChartList[0].quantity },
      set(value) {
        this.$emit(value)
        this.dataCount = value;
      },
    },
  },
};
</script>
<template>
  <div>
    <apexchart
      class="chart"
      type="pie"
      :options="coinChartList[0].names[0].options"
      :series="itemsCount"
    />
  </div>
</template>

<style>
@import 'apexcharts/dist/apexcharts.css';
.chart {
  max-width: 500px;
}
</style>
