import * as echarts from 'echarts';
export default function (id) {
  var myChart = echarts.init(document.getElementById(id), 'dark');
  var xdata = []
  var ydata = []
  var ydata2 = []
  var ydata3 = []
  for (var i = 0; i < 24; i++) {
    xdata.push(i + '')
    ydata.push(30 * Math.random().toFixed(1) + 10)
    ydata2.push(30 * Math.random().toFixed(1) + 40)
    ydata3.push(30 * Math.random().toFixed(1) + 70)
  }
  var option = {
    backgroundColor: 'rgba(255,255,255,0.0)',
    tooltip: {
      trigger: "axis",
      backgroundColor: 'rgba(0,0,0,0.6)',
      textStyle: {
        color: "rgba(220,220,220,1.0)",
        fontSize: "16",
      },
      borderWidth:"0",
    },
    legend: {
      top: "0%",
      data: ["交通用电", "居民用电", "工业用电",],
      textStyle: {
        color: "rgba(220,220,220,1.0)",
        fontSize: "16"
      }
    },

    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: xdata,
        axisLabel: {
          textStyle: {
            color: "rgba(220,220,220,1.0)",
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(150,150,150,0.1)",
          }
        },
        axisTick: {
          lineStyle: {
            color: "rgba(0,200,200,0.5)"
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(0,150,150,0.5)",
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(220,220,220,1.0)",
            fontSize: 12
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(0,200,200,0.3)"
          }
        }
      }
    ],
    series: [
      {
        name: "交通用电",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            color: "rgba( 240, 80,0, 1.0)",
            width: 2
          }
        },
        areaStyle: {

          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba( 240, 80,0, 0.7)"
                },
                {
                  offset: 0.7,
                  color: "rgba(240, 80, 0, 0.0)"
                }
              ],
              false
            ),
          }
        },
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          color: "rgba( 240, 80,0, 1.0)",
          borderColor: "rgba( 240, 80,0, 1.0)",
          borderWidth: 12
        },
        showSymbol: false,
        data: ydata
      },
      {
        name: "居民用电",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            color: "rgba( 200, 200,0, 1.0)",
            width: 2
          }
        },
        areaStyle: {

          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba( 200, 200,0, 0.7)"
                },
                {
                  offset: 0.7,
                  color: "rgba(200, 200, 0, 0.0)"
                }
              ],
              false
            ),
          }
        },
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          color: "#00d887",
          borderColor: "rgba(221, 220, 0, 0.1)",
          borderWidth: 12
        },
        showSymbol: false,
        data: ydata2
      },
      {
        name: "工业用电",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            color: "rgba(0, 240, 180, 1.0)",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0, 240, 180, 0.7)"
                },
                {
                  offset: 0.7,
                  color: "rgba(0, 240, 180, 0.0)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.25)"
          }
        },
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          color: "#00cccc",
          borderColor: "#00cccc",
          borderWidth: 12
        },
        showSymbol: false,
        data: ydata3
      }
    ]
  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
}