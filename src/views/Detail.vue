<template>
  <div class="about">
    <h1>This is an Detail page</h1>
    <!-- <div id="container" class="chart"></div> -->
  </div>
</template>
<script>
const ccStreamer = new WebSocket(
  "wss://streamer.cryptocompare.com/v2?api_key=" + process.env.VUE_APP_API_KEY
);
export default {
  name: "coin-detail",
  data() {
    return {
      allData: [],
      allVolume: [],
    };
  },
  methods: {
    initialData() {
      const v = this;
      ccStreamer.onopen = function onStreamOpen() {
        var subRequest = {
          action: "SubAdd",
          subs: ["24~CCCAGG~BTC~USD~D"],
        };
        ccStreamer.send(JSON.stringify(subRequest));
      };

      ccStreamer.onmessage = function onStreamMessage(message) {
        let dataCoint = JSON.parse(message.data);
        console.log(dataCoint);
        if (dataCoint.TS){
          v.allData.push([
            dataCoint.TS,
            dataCoint.OPEN,
            dataCoint.CLOSE,
            dataCoint.HIGH,
            dataCoint.LOW,
            dataCoint.VOLUMETO,
          ]);
        v.allVolume.push([dataCoint.TS, dataCoint.VOLUMETO]);
        v.initHighChart(v.allData,v.allVolume);
        }
      };
    },
    initHighChart(allData, allVolume) {
      console.log("!!! allVolume", allVolume);
      var data = allData;
      var ohlc = []
      var volume = allVolume
      var dataLength = 5
      var i = 0

      Highcharts.stockChart("container", {
        yAxis: [
          {
            labels: {
              align: "left",
            },
            height: "80%",
            resize: {
              enabled: true,
            },
          },
          {
            labels: {
              align: "left",
            },
            top: "80%",
            height: "20%",
            offset: 0,
          },
        ],
        tooltip: {
          shape: "square",
          headerShape: "callout",
          borderWidth: 0,
          shadow: false,
          positioner: function(width, height, point) {
            var chart = this.chart,
              position;

            if (point.isHeader) {
              position = {
                x: Math.max(
                  // Left side limit
                  chart.plotLeft,
                  Math.min(
                    point.plotX + chart.plotLeft - width / 2,
                    // Right side limit
                    chart.chartWidth - width - chart.marginRight
                  )
                ),
                y: point.plotY,
              };
            } else {
              position = {
                x: point.series.chart.plotLeft,
                y: point.series.yAxis.top - chart.plotTop,
              };
            }

            return position;
          },
        },
        series: [
          {
            type: "ohlc",
            id: "aapl-ohlc",
            name: "AAPL Stock Price",
            data: data
          },
          {
            type: "column",
            id: "aapl-volume",
            name: "AAPL Volume",
            data: volume,
            yAxis: 1,
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 800,
              },
              chartOptions: {
                rangeSelector: {
                  buttons: [
                    {
                      type: "hour",
                      count: 1,
                      text: "1h",
                    },
                    {
                      type: "day",
                      count: 1,
                      text: "1d",
                    },
                    {
                      type: "month",
                      count: 1,
                      text: "1m",
                    },
                    {
                      type: "year",
                      count: 1,
                      text: "1y",
                    },
                    {
                      type: "all",
                      text: "All",
                    },
                  ],
                  inputEnabled: false,
                  selected: 4, // all
                },
              },
            },
          ],
        },
      });
    },
  },
  created() {
    this.initialData();
  },
};
</script>
