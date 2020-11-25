<template>
  <div class="about">
    <h1>This is an Detail page</h1>
    {{$route.params.name_coin}}
  </div>
</template>
<script>
const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + process.env.VUE_APP_API_KEY);
export default {
  name: "coin-detail",
  methods:{
    initialData(){
      ccStreamer.onopen = function onStreamOpen() {
        var subRequest = {
          "action": "SubAdd",
          "subs": ["24~CCCAGG~BTC~USD~m"]
        };
        ccStreamer.send(JSON.stringify(subRequest));
      }

      ccStreamer.onmessage = function onStreamMessage(message) {
       console.log('message', message.data)
      }

    }
  },
  created() {
    this.initialData()
  }
  }

</script>
