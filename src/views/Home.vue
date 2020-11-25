<template>
  <div class="home">
    {{allData}}
<!--    <img alt="Vue logo" src="../assets/logo.png" />-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App" />-->
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data(){
    return{
      coinList:[
        {
          //cutName:"",
          // name:""
        }
      ],
      allData:{}
    }
  },
  methods: {
    initialData() {
      const apiKey = "aaa832ab7795e6f6fec2a270dfea998f1a3f701662fba05406651069b6dc9cee";
      const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
      ccStreamer.onopen = function onStreamOpen() {
        const subRequest = {
          "action": "SubAdd",
          "subs": ["5~CCCAGG~BTC~USD", "0~Coinbase~ETH~USD", "2~Binance~BTC~USDT"]
        };
        ccStreamer.send(JSON.stringify(subRequest));
      }
      const v = this
      ccStreamer.onmessage = function onStreamMessage(message) {
        var message = event.data;
        v.allData = event.data
        console.log("Received from Cryptocompare: " + message);
      }
    },
  },
  created() {
    console.log("Start data");
    this.initialData();
  },
};
</script>
