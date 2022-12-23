<script>
import { mapActions } from 'vuex';
export default {
  props: {
    symbol: String,
    lastPrice: String,
  },
  methods: {
    ...mapActions(['addCoins']),
    onAddClick() {
      let quantity = this.itemsCount;
      this.addCoins({
        symbol: this.symbol,
        lastPrice: this.lastPrice,
        quantity: quantity,
        isAdded: true,
      });
      this.$emit('reload')
    },
  },
  data: () => ({
    items: ['1', '2', '3', '4', '5'],
    itemsCount: '1',
  }),
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
            <v-btn v-on:click="onAddClick()" color="green"> Add </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>
