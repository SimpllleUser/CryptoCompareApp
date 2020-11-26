<template>
  <div class="about">
    <div id="container" style="height: 400px; min-width: 310px"></div>

    <h1>This is an Detail page</h1>
    {{ $route.params.name_coin }}
  </div>
</template>
<script>
const ccStreamer = new WebSocket(
  "wss://streamer.cryptocompare.com/v2?api_key=" + process.env.VUE_APP_API_KEY
);
export default {
  name: "coin-detail",
  methods: {
    initialData() {
      ccStreamer.onopen = function onStreamOpen() {
        var subRequest = {
          action: "SubAdd",
          subs: ["24~CCCAGG~BTC~USD~D"],
        };
        ccStreamer.send(JSON.stringify(subRequest));
      };

      ccStreamer.onmessage = function onStreamMessage(message) {
        console.log("message", message.data);
      };
    },
    initHightChart() {
      // split the data set into ohlc and volume
      var ohlc = [
          [1543242600000, 43.56, 43.74, 42.56, 43.65, 179994000],
          [1543329000000, 42.88, 43.69, 42.72, 43.56, 165549600],
          [1543415400000, 44.18, 45.32, 43.73, 45.24, 184250000],
        ],
        volume = [],
        dataLength = data.length,
        i = 0;

      for (i; i < dataLength; i += 1) {
        ohlc.push([
          data[i][0], // the date
          data[i][1], // open
          data[i][2], // high
          data[i][3], // low
          data[i][4], // close
        ]);

        volume.push([
          data[i][0], // the date
          data[i][5], // the volume
        ]);
      }

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
            data: ohlc,
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
                  inputEnabled: false, // it supports only days
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
    this.initHightChart();
  },
};
</script>
