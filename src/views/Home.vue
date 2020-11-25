<template>
  <div class="home">
    {{allData.length > 10 && JSON.parse(allData)}}
  </div>
</template>

<script>
import axios from "axios"
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data(){
    return{
      KEY:'50e081a896903ee4c80ba4e38bcc4073b4aa22473f8d460a3d05039ee37310c8',
      API_URL:"https://min-api.cryptocompare.com",
      // API_URL:"https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=",
      coinList:[],
      allData:{}
    }
  },
  methods: {
    async getListCoins(){
      const limit = "20"

      try {
        const res = await axios.get(this.API_URL + `/data/top/mktcapfull?limit=${limit}&tsym=USD`,{})
        this.coinList = res.data.Data.map(coin => coin.CoinInfo)
      }catch (e) {
        console.log('err /n get coinList', e)
      }
      console.log('coinList',this.coinList)
    },
    initialData() {
      const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + this.KEY);
      // ccStreamer.close()
      ccStreamer.onopen = function onStreamOpen() {
        const subRequest = {
          "action": "SubAdd",
          "subs": ["5~CCCAGG~BTC~USD", "0~CCCAGG~ETH~USD",]
        };
        ccStreamer.send(JSON.stringify(subRequest));
      }
      const v = this
      ccStreamer.onmessage = function onStreamMessage(message) {
        var message = event.data;
        v.allData = event.data
        console.log(message);
      }
    },
  },
  async created () {
    console.log("Start data");
    this.initialData();
    await this.getListCoins()
  },
};
</script>
