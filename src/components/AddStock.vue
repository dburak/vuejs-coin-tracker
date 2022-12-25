<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    NewCoin: () => import('./NewCoin.vue'),
    ExistingCoin: () => import('./ExistingCoin.vue'),
  },
  methods: {
    ...mapActions(['fetchCoins']),
    reload() {
      this.renderKey++;
    },
    refreshComponent(){
      //TODO: not completed yet
    }
  },
  data() {
    return {
      search: '',
      dialog: false,
      renderKey: 0,
    };
  },
  computed: {
    filteredCoins() {
      this.renderKey;
      return this.coinsList.filter((item) => {
        return (
          item.symbol.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
    ...mapGetters(['coinsList']),
    ...mapGetters(['userCoinsList']),
  },
  created() {
    this.fetchCoins();
    setInterval(() => {
    this.refreshComponent();
  }, 1200000); //20 minutes
  },
};
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title primary-title> What would like to do ? </v-card-title>
      <v-card-actions>
        <template>
          <div class="text-center">         
            <v-dialog v-model="dialog" width="1200">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-on:click="reload()"
                  v-if="userCoinsList.length"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Add / Update
                </v-btn>
                <v-btn
                  v-on:click="reload()"
                  v-else
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Add Stock
                </v-btn>
                <v-btn
                  class="refresh"
                  v-on:click="reload()"
                  color="primary"
                  dark
                >Refresh</v-btn>
              </template>
              <template>
                <v-card>
                  <v-card-title>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <ul>
                    <li v-for="coin in filteredCoins" :key="coin.symbol">
                      <ExistingCoin
                        @reloadParent="reload"
                        :symbol="coin.symbol"
                        :last-price="coin.lastPrice"
                        :quantity="coin.quantity"
                        v-if="coin.isAdded"
                      />
                      <NewCoin
                        @reloadParent="reload"
                        :symbol="coin.symbol"
                        :last-price="coin.lastPrice"
                        :weighted-avg-price="coin.weightedAvgPrice"
                        v-else
                      />
                    </li>
                  </ul>
                </v-card>
              </template>
              <v-card>
                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </template>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style>
ul {
  list-style: none;
}
.refresh {
  margin-left: 1rem;
}
</style>
