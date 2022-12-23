<script>
import { mapActions } from 'vuex';
export default {
  props: {
    symbol: String,
    lastPrice: String,
    quantity: String
  },
  methods: {
    ...mapActions(['deleteCoin', 'updateCoin']),
    onRemoveClick() {
      this.deleteCoin({
        symbol: this.symbol,
        lastPrice: this.lastPrice
      });
      this.$emit('reloadParent')
    },
    onUpdateClick(){
      this.updateCoin({
        symbol: this.symbol,
        quantity: this.dataCount
      });
      this.$emit('reloadParent')
    }
  },
  data: () => ({
    items: ['1', '2', '3', '4', '5'],
    dataCount: '1'
  }),
  computed: {
    itemsCount: {
      get() { return this.quantity },
      set(value) {
        this.$emit(value)
        this.dataCount = value;
      }
    }
  }
};
</script>

<template>
  <v-container fluid>
    <v-card elevation="12" max-width="720" class="mx-auto">
      <v-list two-line>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-bitcoin</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ symbol }}</v-list-item-title>
            <v-list-item-subtitle>{{ lastPrice }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-col class="d-flex" cols="12" sm="4">
              <v-select v-model="itemsCount" :items="items"></v-select>
            </v-col>
          </v-list-item-action>
          <v-list-item-content>
          <v-btn v-on:click="onUpdateClick()" color="purple lighten-2"> Update </v-btn>
          <v-btn v-on:click="onRemoveClick()" color="red accent-3"> Remove </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>
