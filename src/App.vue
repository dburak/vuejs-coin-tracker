<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Coin Tracker</h1>
      </div>
    </v-app-bar>

    <v-main>
      <AddStock />
      <CoinAndChartView />
    </v-main>
  </v-app>
</template>

<script>
import AddStock from './components/AddStock';
import CoinAndChartView from './components/CoinAndChartView'

export default {
  name: 'App',

  components: {
    AddStock,
    CoinAndChartView
  },

  data: () => ({
    //
  }),
};
</script>
