<template>
  <div class="coins-tabel">
    <img src='www.cryptocompare.com/media/1383672/usdt.png' height="100" width="100" alt=""/>
    <b-table striped hover :items="itemsCoin" :fields="fields">
      <template v-slot:cell(Name)="data">
        <a :href="`{data.item.Name}`">{{ data.item.Name}}</a>
      </template>
      <template v-slot:cell(icon)="data">
        <img :src="'https://www.cryptocompare.com' + data.item.icon " alt="icon" width="35" height="35"/>
      </template>
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
      url:'https://www.cryptocompare.com',
      fields: [
        {
          key: '#',
          label: '#',
        },
        {
          key: 'icon',
          label: '',
        },
        {
          key: 'Name',
          label: 'Name',
          sortable: true
        },
        {
          key: 'Value',
          label: 'Value',
          sortable: true
        },
        {
          key: 'Price',
          label: 'Price',
          sortable: true
        }
        ,
        {
          key: 'Volume 24h',
          label: 'Volume 24h',
          sortable: true
        },
        {
          key: 'Top tier volume 24h',
          label: 'Top tier volume 24h',
          sortable: true
        },
        {
          key: 'Currency',
          label: 'Currency',
        },
      ],
      itemsCoin: []
    }
  },
  methods: {
    formatDataToTabel() {
      this.itemsCoin = this.coinsList.map((item, index) => ({
        '#': index + 1,
        icon:item.ImageUrl,
        Name: item.FullName,
        Value: item.Name,
        Price: item.value['PRICE'] || ' ~ ',
        'Volume 24h': item.value['VOLUME24HOUR'] || ' ~ ',
        'Top tier volume 24h': item.value['TOPTIERVOLUME24HOUR'] || ' ~ ',
        'Currency': item.value['TOSYMBOL']
      }))
      console.log(this.coinsList)
    }
  },
  created() {
    this.formatDataToTabel()
  },
};
</script>
