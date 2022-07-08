import * as echarts from 'echarts';
export default function (id) {
  var myChart = echarts.init(document.getElementById(id));

  var dataArr = 90;
  var colorSet = {
      color: '#22B95E'
  };
  var color1 = {
      type: "linear",
      x: 0,
      y: 0,
      x2: 1,
      y2: 1,
      colorStops: [
          {
              offset: 0,
              color: "rgba(255,255,255,0.1)"
          },
          {
              offset: 1,
              color: "rgba(255,255,255,0.3)"
          }
      ],
          global: false
  }
  var color2 = {
      type: "linear",
      x: 0,
      y: 0,
      x2: 1,
      y2: 1,
      colorStops: [
          {
              offset: 0,
              color: "#30DBBA"
          },
          {
              offset: 1,
              color: "#2DE696"
          }
      ],
          global: false
  }

  var option = {
    backgroundColor: 'rgba(255,255,255,0.0)',
      tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
      },

      series: [
          {
              name: "内部进度条",
              type: "gauge",
              radius: '70%',

              splitNumber: 10,
              axisLine: {
                  lineStyle: {
                      color: [
                          [dataArr / 100, colorSet.color],
                          [1, colorSet.color]
                      ],
                      width: 2
                  }
              },
              axisLabel: {
                  show: false,
              },
              axisTick: {
                  show: false,

              },
              splitLine: {
                  show: false,
              },
              itemStyle: {
                  color:"#ffffff"
              },
              detail: {
                  show: false,
                  formatter: function(value) {
                      if (value !== 0) {
                          var num = Math.round(value ) ;
                          return parseInt(num).toFixed(0)+"%";
                      } else {
                          return 0;
                      }
                  },
                  offsetCenter: [0, 67],
                  textStyle: {
                      padding: [0, 0, 0, 0],
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#ffffff'
                  }
              },
              title: { 
                  show: false,
                  offsetCenter: [0, 46], 
                  textStyle: {
                      color: "rgba(0,0,0,0)",
                      fontSize: 14, 
                      fontFamily: 'PingFangSC'
                  }
              },
              data: [{
                  name: "",
                  value: dataArr,
              }],
              pointer: {
                  show: true,
                  length: '70%',
                  radius: '20%',
                  width: 3 

              },
              animationDuration: 4000,
          },
          {
              name: "内部阴影",
              type: "gauge",
              radius: '44%',
              splitNumber: 10,
              axisLine: {
                  lineStyle: {
                      color: [
                          [dataArr / 100, new echarts.graphic.LinearGradient(
                              0, 1, 0, 0, [{
                                      offset: 0,
                                      color: 'rgba(45,230,150,0)',
                                  }, {
                                      offset: 0.5,
                                      color: 'rgba(45,230,150,0.2)',
                                  },
                                  {
                                      offset: 1,
                                      color: 'rgba(45,230,150,1)',
                                  }
                              ]
                          )],
                          [
                              1, 'rgba(28,128,245,0)'
                          ]
                      ],
                      width: 100

                  },
              },
              axisLabel: {
                  show: false,
              },
              axisTick: {
                  show: false,

              },
              splitLine: {
                  show: false,
              },
              itemStyle: {
                  show: false,
              },
         
          },
          {
              name: "内部小圆",
              type: "gauge",
              radius: '46%',

              splitNumber: 10,
              axisLine: {
                  lineStyle: {
                      color: [
                          [dataArr / 100, color2],
                          [1, "rgba(0,0,0,0)"]
                      ],
                      width: 10
                  }
              },
              axisLabel: {
                  show: false,
              },
              axisTick: {
                  show: false,

              },
              splitLine: {
                  show: false,
              },
              itemStyle: {
                  show: false,
              },
          },
          {
              name: '外部刻度',
              type: 'gauge',
              radius: '48%',
              min: 0, 
              max: 100, 
              splitNumber: 5, 
              startAngle: 225,
              endAngle: -45,
              axisLine: {
                  show: true,
                  lineStyle: {
                      width: 1,
                      color: [
                          [1, 'rgba(0,0,0,0)']
                      ]
                  }
              }, 
              axisLabel: {
                  show: true,
                  color: '#ffffff',
                  fontSize:14,
                  fontFamily:'SourceHanSansSC-Regular',
                  fontWeight:'bold',
                  distance: -30,
                  formatter: function(v) {
                      switch (v + '') {
                          case '0':
                              return '0';
                          case '10':
                              return '10';
                          case '20':
                              return '20';
                          case '30':
                              return '30';
                          case '40':
                              return '40';
                          case '50':
                              return '50';
                          case '60':
                              return '60';
                          case '70':
                              return '70';
                          case '80':
                              return '80';
                          case '90':
                              return '90';
                          case '100':
                              return '100';
                      }
                  }
              }, 
              axisTick: {
                  show: true,
                  splitNumber: 3,
                  lineStyle: {
                      color: color1, 
                      width: 1,
                  },
                  length: -6
              }, 
              splitLine: {
                  show: true,
                  length: -12,
                  lineStyle: {
                      color: color1, 
                  }
              }, 
              detail: {
                  show: false
              }
          },
          {
              name: "内部进度条",
              type: "gauge",
              radius: '20%',

              splitNumber: 10,
              axisLine: {
                  lineStyle: {
                      color: [
                          [dataArr / 100, colorSet.color],
                          [1, colorSet.color]
                      ],
                      width: 1
                  }
              },
              axisLabel: {
                  show: false,
              },
              axisTick: {
                  show: false,

              },
              splitLine: {
                  show: false,
              },
              itemStyle: {
                  color:"#ffffff"
              },
              detail: {
                  formatter: function(value) {
                      if (value !== 0) {
                          var num = Math.round(value ) ;
                          return parseInt(num).toFixed(0)+"%";
                      } else {
                          return 0;
                      }
                  },
                  offsetCenter: [0, 67],
                  textStyle: {
                      padding: [0, 0, 0, 0],
                      fontSize: 18,
                      color: "#ffffff"
                  }
              },
              title: {
                  show: true,
                  offsetCenter: [0, 46], 
                  textStyle: {
                      color: "#fff",
                      fontSize: 14, 
                      fontWeight: 400,
                      fontFamily: 'MicrosoftYaHei'
                  }
              },
              data: [{
                  name: "GDP进度",
                  value: dataArr,
                  itemStyle:{
                      color:"#ffffff",
                      fontFamily: "MicrosoftYaHei",
                      fontSize:14
                  }
              }],
              pointer: {
                  show: true,
                  length: '70%',
                  radius: '20%',
                  width: 3 

              },
              animationDuration: 4000,
          },
          { 
          type: 'pie',
          tooltip: {
              show: false
          },
          hoverAnimation: false,
          legendHoverLink: false,
          radius: ['0%', '4%'],
          center: ['50%', '50%'],
          label: {
              normal: {
                  show: false
              }
          },
          labelLine: {
              normal: {
                  show: false
              }
          },
          data: [{
              value: 120,
              itemStyle: {
                  normal: {
                      color: "#ffffff",
                  },
              }
          }]
      },
          
      ]
  };

  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
}
