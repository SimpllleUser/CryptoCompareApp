<template>
  <div class="home">
    <div v-if="coinsList" >
      <coins-tabel :coinsList="coinsList"/>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import HelloWorld from "@/components/HelloWorld.vue";
import CoinsTabel from "@/components/CoinsTabel";
var ccStreamerHome = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + process.env.VUE_APP_API_KEY);
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    HelloWorld,
    CoinsTabel
  },
  computed: {
    ...mapGetters([
      'test',
    ])
  },
  data() {
    return {
      KEY: '50e081a896903ee4c80ba4e38bcc4073b4aa22473f8d460a3d05039ee37310c8',
      coinsList: [],
      allData: {},
      items: [],
      paramsCoinsWS: []
    }
  },
  methods: {
    async getListCoins() {
      const limit = "20"
      try {
        const res = await axios.get(process.env.VUE_APP_API_URL + `/data/top/mktcapfull?limit=${limit}&tsym=USD`, {})
        this.coinsList = res.data.Data.map(coin => coin.CoinInfo)
        const paramsName = this.coinsList.map(coin => coin.Name)
        this.paramsCoinsWS = paramsName.map(param => ({
          name: param,
          paramItem: `5~CCCAGG~${param}~USD`
        }))
      } catch (err) {
        console.log('err /n get coinsList', err)
      }
    },
    initialData() {
      const v = this
      ccStreamerHome.onopen = function onStreamOpen() {
        const subRequest = {
          "action": "SubAdd",
          "subs": v.paramsCoinsWS.map(param => param.paramItem)
        };
        ccStreamerHome.send(JSON.stringify(subRequest));
      }
      ccStreamerHome.onmessage = function onStreamMessage(message) {
        v.allData = message.data
        let coinMame = JSON.parse(v.allData)['FROMSYMBOL']
        if (coinMame) {
          v.items[`${coinMame}`] = JSON.parse(v.allData) || {}
          v.coinsList = v.coinsList.map(coin => ({...coin, value: v.items[coin.Name]}))
        }
      }
    },
  },
  async created() {
    this.initialData();
    await this.getListCoins()
    if(!this.coinsList){
      alert()
       ccStreamerHome = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + process.env.VUE_APP_API_KEY);
    }
  },
  destroyed(){
    ccStreamerHome.onclose = function(){
ccStreamerHome = null
    }
  },
  mounted() {
  },
};
</script>
