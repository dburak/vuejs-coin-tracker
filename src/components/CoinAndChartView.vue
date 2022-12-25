<template>
  <v-row>
    <v-col cols="6" offset="3">
      <UserCoin />
    </v-col>
    <v-col cols="4" offset="4">
      <PieChart />
    </v-col>
  </v-row>
</template>



<script>
import { mapGetters } from 'vuex';
export default {
	components: {
		UserCoin: () => import('./UserCoin'),
    PieChart: () => import('./PieChart')
	},
  computed: {
    ...mapGetters(['userCoinsList']),
    ...mapGetters(['coinChartList']),
  },
}
</script>