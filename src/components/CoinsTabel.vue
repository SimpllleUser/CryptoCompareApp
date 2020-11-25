<template>
  <div class="coins-tabel">
    <b-table striped hover :items="itemsCoin">
    </b-table>
  </div>
</template>

<script>
// import axios from "axios"
export default {
  name: "coins-tabel",
  props: ['coinsList'],
  watch: {
    coinsList: function (val) {
      this.formatDataToTabel()
    }
  },
  data() {
    return {
      itemsCoin: []
    }
  },
  methods: {
    formatDataToTabel() {
      this.itemsCoin = this.coinsList.map((item, index) => ({
        '#': index + 1,
        Name: item.FullName,
        Value: item.Name,
        price: item.value['PRICE'] || ' ~ ',
        'Volume 24h':item.value['VOLUME24HOUR'],
        'Top tier volume 24h': item.value['TOPTIERVOLUME24HOUR'],
        'Currency': item.value['TOSYMBOL']
      }))
    }
  },
  created() {
    this.formatDataToTabel()
  },
};
</script>
