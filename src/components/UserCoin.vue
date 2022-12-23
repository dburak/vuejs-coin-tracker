<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['userCoinsList']),
  },
  components: {
    ExistingCoin: () => import('./ExistingCoin.vue'),
  },
};
</script>

<template>
  <div>
    <h1 v-if="userCoinsList.length" class="userCoin">Your Portfolio</h1>
    <h1 v-else class="userCoin">You don't have any coin in your portfolio</h1>
    <ul>
      <li v-for="coin in userCoinsList" :key="coin.title">
        <ExistingCoin :symbol="coin.symbol" :last-price="coin.lastPrice" :quantity="coin.quantity" />
      </li>
    </ul>
  </div>
</template>

<style>
  .userCoin {
    margin-top: 2rem;
    text-align: center;
  }
</style>
