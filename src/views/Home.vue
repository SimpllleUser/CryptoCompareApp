<template>
  <div class="home">
    {{items}}
    {{ allData.length > 10 && JSON.parse(allData) }}
    <coins-tabel :coinsList="coinsList"/>
  </div>
</template>

<script>
import axios from "axios"
import HelloWorld from "@/components/HelloWorld.vue";
import CoinsTabel from "@/components/CoinsTabel";

export default {
  name: "Home",
  components: {
    HelloWorld,
    CoinsTabel
  },
  data() {
    return {
      KEY: '50e081a896903ee4c80ba4e38bcc4073b4aa22473f8d460a3d05039ee37310c8',
      API_URL: "https://min-api.cryptocompare.com",
      // API_URL:"https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=",
      coinsList: [],
      allData: {},
      items:[],
      paramsCoinsWS: []
    }
  },
  methods: {
    async getListCoins() {
      const limit = "20"
      try {
        const res = await axios.get(this.API_URL + `/data/top/mktcapfull?limit=${limit}&tsym=USD`, {})
        this.coinsList = res.data.Data.map(coin => coin.CoinInfo)
        const paramsName = this.coinsList.map(coin => coin.Name)
        this.paramsCoinsWS = paramsName.map(param => ({
          name: param,
          paramItem: `5~CCCAGG~${param}~USD`
        }))
      } catch (err) {
        console.log('err /n get coinsList', err)
      }
      // console.log('coinsList', this.coinsList)
    },
    initialData() {
      const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + this.KEY);
      const v = this
      ccStreamer.onopen = function onStreamOpen() {
        const subRequest = {
          "action": "SubAdd",
          "subs": v.paramsCoinsWS.map(param => param.paramItem)
        };
        ccStreamer.send(JSON.stringify(subRequest));
      }
      ccStreamer.onmessage = function onStreamMessage(message) {
        var message = event.data;
        v.allData = event.data
        let coinname = JSON.parse(v.allData)['FROMSYMBOL']
        v.items[`${coinname}`] = JSON.parse( v.allData) || {}
        console.log('v.items',v.items)
      }
    },
  },
  async created() {
    console.log("Start data");
    this.initialData();
    await this.getListCoins()
  },
};
</script>
