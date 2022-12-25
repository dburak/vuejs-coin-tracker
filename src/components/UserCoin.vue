<script>
import { mapGetters } from 'vuex';
export default {
  components: {
    ExistingCoin: () => import('./ExistingCoin.vue'),
  },
  computed: {
    ...mapGetters(['userCoinsList']),
  },
};
</script>

<template>
  <div>
    <h1 class="usercoin usercoin--underlined">My Portfolio</h1>
    <h2 v-if="!userCoinsList.length" class="usercoin">You don't have any coin in your portfolio</h2>
    <ul>
      <li v-for="coin in userCoinsList" :key="coin.symbol">
        <ExistingCoin
          :symbol="coin.symbol"
          :last-price="coin.lastPrice"
          :weighted-avg-price="coin.weightedAvgPrice"
          :quantity="coin.quantity"
        />
      </li>
    </ul>
  </div>
</template>

<style>
.usercoin {
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}
.usercoin--underlined{
  text-decoration: underline;
}
</style>
