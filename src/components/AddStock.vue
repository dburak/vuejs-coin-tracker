<!-- eslint-disable no-unused-vars -->
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['fetchCoins']),
    reloadParent() {
      this.renderKey++;
    }
  },
  components: {
    NewCoin: () => import('./NewCoin.vue'),
    ExistingCoin: () => import('./ExistingCoin.vue'),
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
      this.renderKey
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
                <v-btn v-if="userCoinsList.length" color="primary" dark v-bind="attrs" v-on="on">
                  Add / Update
                </v-btn>
                <v-btn v-else color="primary" dark v-bind="attrs" v-on="on">
                  Add Stock
                </v-btn>
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
                        :symbol="coin.symbol"
                        :last-price="coin.lastPrice"
                        :quantity="coin.quantity"
                        v-if="coin.isAdded"
                      />
                      <NewCoin 
                        @reload="reloadParent"
                        :symbol="coin.symbol"
                        :last-price="coin.lastPrice"
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
</style>
