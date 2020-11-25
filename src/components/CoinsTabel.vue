<template>
  <div class="coins-tabel">
    <b-table striped hover :items="itemsCoin" :fields="fields">
      <template v-slot:cell(Name)="data">
        <router-link :to="'detail/'+data.item.Value">{{ data.item.Name}}</router-link>
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
      console.log('val',val)
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
      this.itemsCoin = this.coinsList && this.coinsList.map((item, index) => ({
        '#': index + 1,
        icon:item.ImageUrl,
        Name: item.FullName,
        Value: item.Name,
        Price: item.value['PRICE'] || ' ~ ',
        'Volume 24h': item.value['VOLUME24HOUR'] || ' ~ ',
        'Top tier volume 24h': item.value['TOPTIERVOLUME24HOUR'] || ' ~ ',
        'Currency': item.value['TOSYMBOL']
      }))
    }
  },

};
</script>
