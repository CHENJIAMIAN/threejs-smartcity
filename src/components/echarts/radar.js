import * as echarts from 'echarts';

export default function (id) {
    var myChart = echarts.init(document.getElementById(id));

    var option = {
        backgroundColor: 'rgba(255,255,255,0.0)',
        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.6)',
            textStyle: {
              color: "rgba(220,220,220,1.0)",
              fontSize: "16",
            },
            borderWidth:"0",
          },
        color: ['#3D91F7', '#61BE67'],
        legend: {
            show: true,
            icon: "circle",
            bottom: 30,
            center: 0,
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 21,
            orient: "horizontal",
            data: ['a', 'b'],
            textStyle: {
                fontSize: '70%',
                color: '#8C8C8C'
            },
        },
        
        radar: {
            radius:'80%',
            triggerEvent: true,
            name: {
                textStyle: {
                    color: '#fff',
                    fontSize:'14',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            nameGap:'2',
            indicator: [{
                    name: '资金周转', max: 6500},
                {name: '其他', max: 16000},
                {name: '金融理财', max: 30000 },
                {name: '投资', max: 38000},
                {name: '个人消费',max: 52000},
                {name: '固定资产', max: 25000},
                {name: '生产经营', max: 25000}
            ],
            splitArea: {
                areaStyle: {
                     color: [
                             'rgba(0,200,200, 0.1)', 'rgba(0,200,200, 0.2)',
                             'rgba(0,200,200, 0.2)', 'rgba(0,200,200, 0.3)',
                             'rgba(0,200,200, 0.4)', 'rgba(0,200,200, 0.5)'
                         ].reverse()
                }
            },
            splitLine: {
                lineStyle: {
                    width:1,
                    color: [
                        'rgba(0,255,255, 1.0)', 'rgba(0,255,255, 0.6)',
                        'rgba(0,200,200, 0.6)', 'rgba(0,200,200, 0.6)',
                        'rgba(0,200,200, 0.2)', 'rgba(0,200,200, 0.2)'
                    ].reverse()
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 200, 200, 0.3)'
                }
            }

        },

        series: [{
            name: '一级权重分析',
            type: 'radar',
            areaStyle: {
                normal: {
                  color: new echarts.graphic.RadialGradient(
                    0.5, 0.5, 1.0,
                    [
                      {
                        offset: 0,
                        color: "rgba( 255, 255,0, 0.0)"
                      },
                      {
                        offset: 1.0,
                        color: "rgba( 255, 255,0, 0.9)"
                      }
                    ],
                    false
                  ),
                  shadowColor: "rgba(0, 0, 0, 0.25)"
                }
              },
            symbolSize: 0,
            lineStyle: {
                normal: {
                    color: 'rgba(255,255,0, 1)',
                    width: 1
                }
            },
            data: [{
                    value: [4300, 10000, 28000, 35000, 50000, 19000, 21000],
                    name: '因素',
                   


                }
            ]
        }]
}
    myChart.setOption(option);
  }


