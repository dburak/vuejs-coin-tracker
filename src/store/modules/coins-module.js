import axios from 'axios';

const state = {
  coins: [],
  userCoins: [],
};

const getters = {
  coinsList: (state) => state.coins,
  userCoinsList: (state) => state.userCoins,
};

const actions = {
  async fetchCoins({ commit }) {
    const response = await axios.get(
      'https://api2.binance.com/api/v3/ticker/24hr'
    );
    commit('setCoins', response.data.slice(0, 25));
  },
  addCoins({ commit }, coin) {
    commit('setNewCoin', coin);
  },
  deleteCoin({commit}, deleteObject) {
    commit('setDeletedCoin', deleteObject);
  },
  updateCoin({commit}, updateObject) {
    commit('setUpdatedCoin', updateObject);
  }
};

const mutations = {
  setCoins: (state, coins) => (state.coins = coins),
  setNewCoin: (state, coin) => {
    state.userCoins.unshift(coin)
    const index = state.coins.findIndex(item => item.symbol == coin.symbol)
    state.coins[index] = coin;
  },
  setDeletedCoin: (state, deleteObject) => {

    const index = state.coins.findIndex(item => item.symbol == deleteObject.symbol)
    state.coins[index] = deleteObject;

    state.userCoins = state.userCoins.filter(item => item.symbol != deleteObject.symbol)
  }
  ,
  setUpdatedCoin: (state,updateObject) => {

    const index = state.userCoins.findIndex(item => item.symbol == updateObject.symbol)

    state.userCoins[index].quantity = updateObject.quantity;

  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
