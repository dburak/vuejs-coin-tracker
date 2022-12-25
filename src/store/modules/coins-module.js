import axios from 'axios';

const state = {
  coins: [],
  userCoins: [],
  coinChart: [{
    names: [{
      options: {
        chart: {
          width: 380,
          type: 'pie',
          offsetX: 0,
          offsetY: 0,
        },
        labels: [],
        legend: {
          position: 'bottom',
        }
      }
    }],
    quantity: []
  }],
};

const getters = {
  coinsList: (state) => state.coins,
  userCoinsList: (state) => state.userCoins,
  coinChartList: (state) => state.coinChart,
};

const actions = {
  async fetchCoins({ commit }) {
    const response = await axios.get(
      'https://api2.binance.com/api/v3/ticker/24hr'
    );
    commit('setCoins', response.data.slice(0, 100));
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
    state.coinChart[0].quantity.push(parseInt(coin.quantity))
    state.coinChart[0].names[0].options.labels.push(coin.symbol)
    const index = state.coins.findIndex(item => item.symbol == coin.symbol)
    state.coins[index] = coin
  },
  setDeletedCoin: (state, deleteObject) => {

    const indexUserCoin = state.coins.findIndex(item => item.symbol == deleteObject.symbol)
    state.coins[indexUserCoin] = deleteObject;

    state.userCoins = state.userCoins.filter(item => item.symbol != deleteObject.symbol)

    state.coinChart[0].names[0].options.labels = state.coinChart[0].names[0].options.labels.filter(item => item != deleteObject.symbol)

  }
  ,
  setUpdatedCoin: (state,updateObject) => {

    const indexUserCoin = state.userCoins.findIndex(item => item.symbol == updateObject.symbol)
    const indexChartCoin = state.coinChart[0].names[0].options.labels.findIndex(item => item == updateObject.symbol)

    state.userCoins[indexUserCoin].quantity = updateObject.quantity;
    state.coinChart[0].quantity[indexChartCoin] = parseInt(updateObject.quantity);



  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
