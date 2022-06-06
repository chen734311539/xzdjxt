<template>
  <div class="container">
    <div class="water-eval-container" style="height: 25%">
      <div class="title">
        <p class="bg">
          <span>实有房屋（落图）</span>
        </p>
        <p class="num">
          <span>269843</span>
        </p>
        <span class="unit">所</span>
      </div>
      <!-- <div class="bg"></div> -->
      <div class="cityGreenLand-charts" id="cityGreenLand-charts"></div>
    </div>
    <div class="water-eval-container" style="height: 35%">
      <!-- <img :src="imgUrl" alt="" srcset="" style="width:100%;height:50px;    position: absolute;"> -->
      <div class="title">
        <p class="bg">
          <span>重点人员（落图）</span>
        </p>
        <p class="num">
          <span>269843</span>
        </p>
        <span class="unit">所</span>
      </div>
      <div class="category-charts" id="category-charts"></div>
    </div>
    <div class="staic" style="height: 17%">
      <div class="numBox">
        <div class="title">
          <span>网格长</span>
          <span class="num">598</span>
        </div>
        <div class="title">
          <span>网格长</span>
          <span class="num">598</span>
        </div>
        <div class="title">
          <span>网格长</span>
          <span class="num">598</span>
        </div>
      </div>
      <div class="dangyuan">
        <div class="title">
          <p>党员年龄</p>
        </div>
      </div>
      <div class="Proportion">
        <div class="box" ref="box1">
          <span class="percentage">30%</span>
          <i style="background: #00b861"></i>
          <img
            src="../../../assets/xzIndex/Glow.png"
            style="position: absolute; z-index: 99; right: 5%"
            alt=""
            srcset=""
          />
          <div class="bgc">三十岁及以下</div>
        </div>
        <div class="box" ref="box2">
          <span class="percentage">40%</span>
          <i style="background: #0a43cc"></i>
          <img
            src="../../../assets/xzIndex/Glow.png"
            style="position: absolute; z-index: 99; right: 5%"
            alt=""
            srcset=""
          />
          <div class="bgc">30-60岁</div>
        </div>
        <div class="box" ref="box3">
          <span class="percentage">30%</span>
          <i style="background: #c68a0e"></i>
          <img
            src="../../../assets/xzIndex/Glow.png"
            style="position: absolute; z-index: 99; right: 5%"
            alt=""
            srcset=""
          />
          <div class="bgc">61岁及以上</div>
        </div>
      </div>
    </div>
    <div class="circle" style="height: 23%">
      <div class="circleBox" id="circleBox"></div>
      <!-- <div class="circleBox" id="circleBox"></div> -->
    </div>
  </div>
</template>

<script>
import Constants from "@/constants/Constants";

import { getPie3D, getParametricEquation } from "./chart.js"; //工具类js，页面路径自己修改

import { mapState } from "vuex";
export default {
  data() {
    return {
      xcjd: {},
      list: [],
      optionData: [
        {
          name: "等级房屋",
          value: 553,
          itemStyle: {
            color: "#715625",
          },
        },
        {
          name: "出租房屋",
          value: 321,
          itemStyle: {
            color: "#3691bd",
          },
        },
      ],
      userList: [],
      drawStatus: true,
      option: {},
      imgUrl: require("../../../assets/xzIndex/柱状图拖.png"), //
    };
  },
  computed: {
    ...mapState({}),
  },
  mounted() {
    this.init();
    this.createXszajqdb();
    this.initCircle();
    this.$refs.box1.style.width = "30%";
    this.$refs.box2.style.width = "40%";
    this.$refs.box3.style.width = "30%";
  },
  created() {
    // console.log(this.$route);
  },
  methods: {
    initCircle() {
      let myCharts = this.echarts.init(document.getElementById("circleBox"));
      //2.准备数据
      //饼图无需配置 xaxis 和 yaxis  数据是由 value name构成的数组
      let data = [
        { value: 11231, name: "标准公开栏" },
        { value: 22673, name: "党员先锋站" },
        { value: 6123, name: "党员志愿站" },
      ];
      let data1 = [
        { value: 11231, name: "基层组织" },
        { value: 22673, name: "群（社区）" },
        { value: 6123, name: "地方组织" },
      ];
      //3.配置
      var total = "269";
      var color = ["#1676fe", "#FAB20C ", "#FA6119"];

      let option = {
        color: ["#1676fe", "#FAB20C ", "#FA6119"],
        tooltip: {
          trigger: "item",
          fommatter: "{a} : {b}",
          confine: true, //将此权限打开后tooltip将不再溢出
        },

        // 图列组件
        // legend: {
        //   data: data,
        //   // 设置图例的位置
        //   // left: "65%",
        //   fommatter: "{a} : {b}",
        //   bottom: "5%",
        //   left:"35%",
        //   orient: "vertical",
        //   itemWidth: 10,//图例图形的宽度
        //   itemHeight: 10,
        // },
        series: [
          {
            // name:"3213213",
            type: "pie",
            data: data,
            position: "outer",
            left: "5",
            radius: ["50%", "30%"],
            center: ["25%", "50%"], //图表的位置
            avoidLabelOverlap: false, //是否启用防止标签重叠策略
            hoverAnimation: true, //动画效果
            labelLayout(params) {
              return {
                // verticalAlign: "middle",
                align: "center",
                // shiftX: "90%",
                // shiftY: "90%",
                height: 50,
                labelRect: { x: 50, y: 50, width: 15, height: 15 },

                // labelLinePoints:[[1, 2], [3, 4], [5, 6]]
              };
            },
            label: {
              alignTo: "labelLine",
              lineHeight: 56,
              normal: {
                show: true,
                fontSize: 11,
                lineHeight: 18,
                padding: [3, 4, 5, 6],
                // formatter: "{d}%", // 显示百分比，
              },
              emphasis: {
                show: true,
              },
            },
            lableLine: {
              normal: {
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
          },
          {
            // name:"3213213",
            type: "pie",
            data: data1,
            position: "outside",
            right: "5",
            radius: ["50%", "30%"],
            center: ["75%", "50%"], //图表的位置
            avoidLabelOverlap: false, //是否启用防止标签重叠策略
            hoverAnimation: true, //动画效果
            labelLayout(params) {
              return {
                // verticalAlign: "middle",
                align: "center",
                // shiftX: "90%",
                // shiftY: "90%",
                height: 50,
                labelRect: { x: 50, y: 50, width: 15, height: 15 },

                // labelLinePoints:[[1, 2], [3, 4], [5, 6]]
              };
            },
            label: {
              normal: {
                show: true,
                fontSize: 11,
                // formatter: "{d}%", // 显示百分比，
              },
              emphasis: {
                show: true,
              },
            },
            lableLine: {
              verticalAlign: "middle",
              shadowOffsetY: 50,
              shadowOffsetX: 50,
              maxSurfaceAngle: 180,
              minTurnAngle: 60,
              smooth: 0,
              length: 50,
              labelRect: { x: 50, y: 50, width: 15, height: 15 },
              length2: 12,
              minTurnAngle: 90,
              lineStyle: {
                join: "round",
              },
              normal: {
                show: false,
              },
              // emphasis: {
              //   show: true,
              // },
            },
          },
        ],
      };
      //4.渲染图表
      myCharts.setOption(option);
    },
    // 柱状图
    createXszajqdb() {
      let that = this;
      var xData = [
        "青少年",
        "重点上访",
        "残疾",
        "吸毒",
        "刑满释放",
        "社区矫正",
        "重要援助",
        "精神病",
      ];
      var yData = [2500, 999, 2491, 1255, 872, 873, 190, 143];
      var color1 = [
        ["#3a84e2"],
        ["#2e6394"],
        ["#929f4f"],
        ["#19319c"],
        ["#5a5660"],
        ["#6d6194"],
        ["#4f2a6a"],
        ["#754ae4"],
      ];
      var color2 = [
        ["#3c87e6"],
        ["#69e0b7"],
        ["#a1ac4c"],
        ["#122fda"],
        ["#c19039"],
        ["#816a97"],
        ["#d22e23"],
        ["#754ae9"],
      ];
      var myChart = this.echarts.init(
        document.getElementById("category-charts")
      );
      var color = "#fff";
      //   var shadowColor = "#0b5767";
      var barWidth = 13;
      var option = {
        // backgroundColor: "#05233b",
        grid: {
          top: "20%",
          left: "5%",
          bottom: "10%",
          right: "5%",
          containLabel: true,
        },
        legend: {
          // icon:this.imgUrl
        },
        animation: true,
        tooltip: {
          show: true,
          axisPointer: {
            type: "line",
            axis: "auto",
          },
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            axisTick: {
              alignWithLabel: false,
            },

            nameTextStyle: {
              color: "#82b0ec",
            },
            axisLine: {
              show: true,
            },
            axisLabel: {
              // backgroundColor: {
              //   // image: this.imgUrl,
              //   // 这里可以是图片的 URL，
              //   // 或者图片的 dataURI，
              //   // 或者 HTMLImageElement 对象，
              //   // 或者 HTMLCanvasElement 对象。
              // },
              textStyle: {
                color: color,
              },
              margin: 20,
              formatter: function (value) {
                var ret = "";
                var maxLength = 1;
                var valLength = value.length;
                var rowN = Math.ceil(valLength / maxLength);
                if (rowN > 1) {
                  for (var i = 0; i < rowN; i++) {
                    var temp = "";
                    var start = i * maxLength;
                    var end = start + maxLength;
                    temp = value.substring(start, end) + "\n";
                    ret += temp;
                  }
                  return ret;
                } else {
                  return value;
                }
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              lineStyle: {
                color: "#0c2c5a",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
                type: "solid",
                width: 2,
              },
            },
            min: 0,
            max: 2500,
            interval: 500,
          },
        ],
        series: [
          {
            // name: "数据上椭圆",
            type: "pictorialBar",
            // colorBy: "data",
            symbolSize: [barWidth, 8],
            symbolOffset: [0, -6],
            symbolPosition: "end",
            z: 12,
            itemStyle: {
              //右面
              normal: {
                color: function (params) {
                  let colorList = [
                    "#7bc2f4",
                    "#9ef4a4",
                    "#AEE93C",
                    "#41EBE5",
                    "#866FF5",
                    "#749f83",
                    "#ca8622",
                    "#bda29a",
                    "#6e7074",
                    "#546570",
                  ];
                  return colorList[params.dataIndex];
                },
                barBorderRadius: [0, 0, 180, 0],
              },
            },
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 14,
                color: "#fff",
                formatter: function (params, index) {
                  return params.value;
                },
              },
            },

            data: yData,
          },
          {
            // name: "下椭圆",
            // colorBy: "data",
            type: "pictorialBar",
            symbolSize: [barWidth, 3.5],
            symbolOffset: [0, 0.5],
            z: 0,
            // color: color,
            data: yData,
            itemStyle: {
              //右面
              normal: {
                color: function (params) {
                  let colorList = [
                    "#FA6363",
                    "#F1A363",
                    "#AEE93C",
                    "#41EBE5",
                    "#866FF5",
                    "#749f83",
                    "#ca8622",
                    "#bda29a",
                  ];
                  return colorList[params.dataIndex];
                },
                barBorderRadius: [0, 0, 180, 0],
              },
            },
          },

          {
            type: "bar", //类型
            colorBy: "data",
            barWidth: barWidth, //柱子宽度
            barGap: "10%", //不同系列柱间距离，这里为柱子宽度的10%
            barCateGoryGap: "10%", //同一系列柱间距离
            itemStyle: {
              //通常情况下：
              normal: {
                // barBorderRadius: 8,
                opacity: 0.5,
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var index = params.dataIndex;
                  if (params.dataIndex >= color1.length) {
                    index = params.dataIndex - color1.length;
                  }
                  return new that.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      type: "linear",
                      offset: 0,
                      color: color1[index][0],
                    },
                    {
                      type: "linear",
                      offset: 1,
                      color: color2[index][0],
                    },
                  ]);
                },
              },
            },

            // itemStyle: {
            //   barBorderRadius: [2, 2, 0, 0], //柱体圆角
            //   color: params =>{
            //     return new that.echarts.graphic.LinearGradient(
            //       //前四个参数用于配置渐变色的起止位置，这四个参数依次对应 右下左上 四个方位。也就是从右边开始顺时针方向。
            //       //通过修改前4个参数，可以实现不同的渐变方向
            //       /*第五个参数则是一个数组，用于配置颜色的渐变过程。
            //         每项为一个对象，包含offset和color两个参数
            //     */
            //       0,
            //       0,
            //       0,
            //       1,
            //       [
            //         {
            //           //代表渐变色从正上方开始
            //           offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
            //           color: color2[params.dataIndex][0]
            //         }, //柱图渐变色
            //         {
            //           offset: 1, //指100%处的颜色
            //           color: color1[params.dataIndex][0]
            //         }
            //       ]
            //     )
            // },
            //   },
            data: yData,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 环形图
    init() {
      //构建3d饼状图
      let myChart = this.echarts.init(
        document.getElementById("cityGreenLand-charts")
      );
      // 传入数据生成 option

      this.option = getPie3D(this.optionData, 0.8, 250, 25, 40, 0.5);
      // myChart.setOption(this.option);
      //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      this.option.series.push({
        name: "pie2d",
        backgroundColor:'transparent',
        top: "10",
        type: "pie",
        labelLine: {
          // length: 15,
          // length2: 10,
          lineStyle: {
            color: "#4095f7",
            with: 2,
          },
        },
        label: {
          opacity: 1,
          fontSize: "12px",
          lineHeight: 20,
        },
        startAngle: -40, //起始角度，支持范围[0, 360]。
        clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ["20%", "50%"],
        center: ["50%", "40%"],
        data: this.optionData,
        itemStyle: {
          opacity: 0,
        },
      });
      myChart.setOption(this.option);
      this.bindListen(myChart);
    },

    // getPie3D(pieData, internalDiameterRatio, opacity = 1) {
    //   //internalDiameterRatio:透明的空心占比
    //   let that = this;
    //   let series = [];
    //   let sumValue = 0;
    //   let startValue = 0;
    //   let endValue = 0;
    //   let legendData = [];
    //   let legendBfb = [];
    //   let k = 1 - internalDiameterRatio;
    //   pieData.sort((a, b) => {
    //     return b.value - a.value;
    //   });
    //   // 为每一个饼图数据，生成一个 series-surface 配置
    //   for (let i = 0; i < pieData.length; i++) {
    //     sumValue += pieData[i].value;
    //     let seriesItem = {
    //       name:
    //         typeof pieData[i].name === "undefined"
    //           ? `series${i}`
    //           : pieData[i].name,
    //       type: "surface",
    //       parametric: true,
    //       wireframe: {
    //         show: false,
    //       },
    //       pieData: pieData[i],
    //       pieStatus: {
    //         selected: false,
    //         hovered: false,
    //         k: k,
    //       },
    //       center: ["10%", "50%"],
    //     };

    //     if (typeof pieData[i].itemStyle !== "undefined") {
    //       const itemStyle = {};
    //       itemStyle.color =
    //         typeof pieData[i].itemStyle.color !== "undefined"
    //           ? pieData[i].itemStyle.color
    //           : opacity;
    //       itemStyle.opacity =
    //         typeof pieData[i].itemStyle.opacity !== "undefined"
    //           ? pieData[i].itemStyle.opacity
    //           : opacity;
    //       seriesItem.itemStyle = itemStyle;
    //     }
    //     series.push(seriesItem);
    //   }

    //   // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    //   // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    //   legendData = [];
    //   legendBfb = [];
    //   for (let i = 0; i < series.length; i++) {
    //     endValue = startValue + series[i].pieData.value;
    //     series[i].pieData.startRatio = startValue / sumValue;
    //     series[i].pieData.endRatio = endValue / sumValue;
    //     series[i].parametricEquation = this.getParametricEquation(
    //       series[i].pieData.startRatio,
    //       series[i].pieData.endRatio,
    //       false,
    //       false,
    //       k,
    //       series[i].pieData.value
    //     );
    //     startValue = endValue;
    //     let bfb = that.fomatFloat(series[i].pieData.value / sumValue, 4);
    //     legendData.push({
    //       name: series[i].name,
    //       value: bfb,
    //     });
    //     legendBfb.push({
    //       name: series[i].name,
    //       value: bfb,
    //     });
    //   }
    //   let boxHeight = this.getHeight3D(series, 60); //通过传参设定3d饼/环的高度，26代表26px
    //   // 准备待返回的配置项，把准备好的 legendData、series 传入。
    //   let option = {
    //     legend: {
    //       data: legendData,
    //       orient: "horizontal",
    //       left: 50,
    //       bottom: 25,
    //       itemGap: 10,
    //       textStyle: {
    //         color: "#A1E2FF",
    //       },
    //       show: true,
    //       icon: "circle",
    //       formatter: function (param) {
    //         let item = legendBfb.filter((item) => item.name == param)[0];
    //         let bfs = that.fomatFloat(item.value * 100, 2) + "%";
    //         return `${item.name}  ${bfs}`;
    //       },
    //     },
    //     labelLine: {
    //       show: true,
    //       lineStyle: {
    //         color: "#7BC0CB",
    //       },
    //     },
    //     label: {
    //       show: true,
    //       position: "outside",
    //       rich: {
    //         b: {
    //           color: "#7BC0CB",
    //           fontSize: 12,
    //           lineHeight: 20,
    //         },
    //         c: {
    //           fontSize: 16,
    //         },
    //       },
    //       formatter: "{b|{b} \n}{c|{c}}{b|}",
    //     },
    //     tooltip: {
    //       formatter: (params) => {
    //         if (
    //           params.seriesName !== "mouseoutSeries" &&
    //           params.seriesName !== "pie2d"
    //         ) {
    //           let bfb = (
    //             (option.series[params.seriesIndex].pieData.endRatio -
    //               option.series[params.seriesIndex].pieData.startRatio) *
    //             100
    //           ).toFixed(2);
    //           return (
    //             `${params.seriesName}<br/>` +
    //             `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
    //             `${bfb}%`
    //           );
    //         }
    //       },
    //     },
    //     xAxis3D: {
    //       min: -1,
    //       max: 1,
    //     },
    //     yAxis3D: {
    //       min: -1,
    //       max: 1,
    //     },
    //     zAxis3D: {
    //       min: -1,
    //       max: 1,
    //     },
    //     grid3D: {
    //       show: false,
    //       boxHeight: boxHeight, //圆环的高度
    //       environment: "auto", //背景色,auto为自适应颜色
    //       viewControl: {
    //         //3d效果可以放大、旋转等，请自己去查看官方配置
    //         alpha: 30, //角度
    //         distance: 300, //调整视角到主体的距离，类似调整zoom
    //         projection: "perspective", // 先设置为这个perspective
    //         rotateSensitivity: 0, //设置为0无法旋转
    //         zoomSensitivity: 0, //设置为0无法缩放
    //         panSensitivity: 0, //设置为0无法平移
    //         autoRotate: false, //自动旋转
    //       },
    //     },
    //     series: series,
    //   };
    //   return option;
    // },

    // //获取3d丙图的最高扇区的高度
    // getHeight3D(series, height) {
    //   series.sort((a, b) => {
    //     return b.pieData.value - a.pieData.value;
    //   });
    //   return (height * 25) / series[0].pieData.value;
    // },

    // // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    // getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
    //   // 计算
    //   let midRatio = (startRatio + endRatio) / 2;
    //   let startRadian = startRatio * Math.PI * 2;
    //   let endRadian = endRatio * Math.PI * 2;
    //   let midRadian = midRatio * Math.PI * 2;
    //   // 如果只有一个扇形，则不实现选中效果。
    //   if (startRatio === 0 && endRatio === 1) {
    //     isSelected = false;
    //   }
    //   // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    //   k = typeof k !== "undefined" ? k : 1 / 3;
    //   // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    //   let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    //   let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
    //   // 计算高亮效果的放大比例（未高亮，则比例为 1）
    //   let hoverRate = isHovered ? 1.05 : 1;
    //   // 返回曲面参数方程
    //   return {
    //     u: {
    //       min: -Math.PI,
    //       max: Math.PI * 3,
    //       step: Math.PI / 32,
    //     },
    //     v: {
    //       min: 0,
    //       max: Math.PI * 2,
    //       step: Math.PI / 20,
    //     },
    //     x: function (u, v) {
    //       if (u < startRadian) {
    //         return (
    //           offsetX +
    //           Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
    //         );
    //       }
    //       if (u > endRadian) {
    //         return (
    //           offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
    //         );
    //       }
    //       return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    //     },
    //     y: function (u, v) {
    //       if (u < startRadian) {
    //         return (
    //           offsetY +
    //           Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
    //         );
    //       }
    //       if (u > endRadian) {
    //         return (
    //           offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
    //         );
    //       }
    //       return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    //     },
    //     z: function (u, v) {
    //       if (u < -Math.PI * 0.5) {
    //         return Math.sin(u);
    //       }
    //       if (u > Math.PI * 2.5) {
    //         return Math.sin(u) * h * 0.1;
    //       }
    //       return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    //     },
    //   };
    // },

    // fomatFloat(num, n) {
    //   var f = parseFloat(num);
    //   if (isNaN(f)) {
    //     return false;
    //   }
    //   f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
    //   var s = f.toString();
    //   var rs = s.indexOf(".");
    //   //判定如果是整数，增加小数点再补0
    //   if (rs < 0) {
    //     rs = s.length;
    //     s += ".";
    //   }
    //   while (s.length <= rs + n) {
    //     s += "0";
    //   }
    //   return s;
    // },

    bindListen(myChart) {
      // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
      let that = this;
      let selectedIndex = "";
      let hoveredIndex = "";
      // 监听点击事件，实现选中效果（单选）
      myChart.on("click", function (params) {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
        let isSelected =
          !that.option.series[params.seriesIndex].pieStatus.selected;
        let isHovered =
          that.option.series[params.seriesIndex].pieStatus.hovered;
        let k = that.option.series[params.seriesIndex].pieStatus.k;
        let startRatio =
          that.option.series[params.seriesIndex].pieData.startRatio;
        let endRatio = that.option.series[params.seriesIndex].pieData.endRatio;
        // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
        if (selectedIndex !== "" && selectedIndex !== params.seriesIndex) {
          that.option.series[selectedIndex].parametricEquation =
            getParametricEquation(
              that.option.series[selectedIndex].pieData.startRatio,
              that.option.series[selectedIndex].pieData.endRatio,
              false,
              false,
              k,
              that.option.series[selectedIndex].pieData.value
            );
          that.option.series[selectedIndex].pieStatus.selected = false;
        }
        // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
        that.option.series[params.seriesIndex].parametricEquation =
          getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            that.option.series[params.seriesIndex].pieData.value
          );
        that.option.series[params.seriesIndex].pieStatus.selected = isSelected;
        // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
        isSelected ? (selectedIndex = params.seriesIndex) : null;
        // 使用更新后的 option，渲染图表
        myChart.setOption(that.option);
      });
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on("mouseover", function (params) {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          return;
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = that.option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            startRatio = that.option.series[hoveredIndex].pieData.startRatio;
            endRatio = that.option.series[hoveredIndex].pieData.endRatio;
            k = that.option.series[hoveredIndex].pieStatus.k;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            that.option.series[hoveredIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                that.option.series[hoveredIndex].pieData.value
              );
            that.option.series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (
            params.seriesName !== "mouseoutSeries" &&
            params.seriesName !== "pie2d"
          ) {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected =
              that.option.series[params.seriesIndex].pieStatus.selected;
            isHovered = true;
            startRatio =
              that.option.series[params.seriesIndex].pieData.startRatio;
            endRatio = that.option.series[params.seriesIndex].pieData.endRatio;
            k = that.option.series[params.seriesIndex].pieStatus.k;
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            that.option.series[params.seriesIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                that.option.series[params.seriesIndex].pieData.value + 5
              );
            that.option.series[params.seriesIndex].pieStatus.hovered =
              isHovered;
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex;
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(that.option);
        }
      });
      // 修正取消高亮失败的 bug
      myChart.on("globalout", function () {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== "") {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = that.option.series[hoveredIndex].pieStatus.selected;
          isHovered = false;
          k = that.option.series[hoveredIndex].pieStatus.k;
          startRatio = that.option.series[hoveredIndex].pieData.startRatio;
          endRatio = that.option.series[hoveredIndex].pieData.endRatio;
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          that.option.series[hoveredIndex].parametricEquation =
            getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              that.option.series[hoveredIndex].pieData.value
            );
          that.option.series[hoveredIndex].pieStatus.hovered = isHovered;
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = "";
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(that.option);
      });
    },
  },
  destroyed: function () {},
};
</script>

<style  scoped>
.container {
  width: 100%;
  height: 100%;
}
.water-eval-container {
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
.water-eval-container:nth-child(2) {
  /* background-image: url(../../../assets/xzIndex/柱状图拖.png); */
  background-repeat: no-repeat;
  background-position-y: 77%;
  background-size: 80%;
  background-position-x: 75%;
}
.cityGreenLand-charts {
  height: 100%;
  width: 100%;
}

.category-charts {
  height: 100%;
  width: 100%;
}
.circle {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  height: 20%;
  box-sizing: border-box;
}
.circleBox {
  height: 100%;
  width: 100%;
}

.water-eval-container > .title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.water-eval-container > .bg {
  position: absolute;
  bottom: 50px;
  left: 50%;
  z-index: -1;
  width: 180px;
  height: 73px;
  background: no-repeat center;
  background-image: url("https://ks3-cn-beijing.ksyun.com/sxjg-elevator/datav-platform-2.0/images/chart_opacity_bg.png");
  background-size: 100% 100%;
  transform: translateX(-50%);
}
.staic {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  border-top: 1px solid #053c80;
  border-bottom: 1px solid #053c80;
  padding: 10px;
  box-sizing: border-box;
}
.staic > .dangyuan {
  background-image: url(../../../assets/xzIndex/box2.png);
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  margin: 8px auto;
}
.staic > .dangyuan > .title p {
  text-align: center;
  font-size: 13px;
  color: #fff;
  margin-top: 11px;
}
.staic > .numBox {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
}
.staic > .numBox .title {
  display: flex;
  width: 25%;
  flex-direction: row;
  /* justify-content: space-between; */
  box-sizing: border-box;
  align-items: center;
}
.staic > .numBox .title .num {
  font-size: 16px;
  font-style: oblique;
  color: #fff;
  margin: 0 5px;
}
.staic > .Proportion {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
}
.staic > .Proportion .box {
  /* height: 12px; */
  position: relative;
  box-sizing: border-box;
}
.staic > .Proportion .box > i {
  background-repeat: no-repeat;
}
.staic > .Proportion .box > .percentage {
  color: #fff;
  letter-spacing: 0.5pt;
  display: inline-block;
  width: 100%;
  text-align: center;
  font-style: oblique;
  position: absolute;
  top: -10px;
  font-size: 14px;
  z-index: 2;
}
.staic > .Proportion .box > i {
  height: 12px;
  width: 100%;
  display: inline-block;
  border-radius: 2px;
  transform: skew(-23deg, 0deg);
}
.staic > .Proportion .box > .bgc {
  /* position: absolute;
  top: 70%; */
  background-repeat: no-repeat;
  width: 90px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  /* left:5%; */
  background-size: contain;
  margin-top: 10px;
  margin: 0 auto;
}
.staic > .Proportion .box:nth-child(1) .bgc {
  background-image: url(../../../assets/xzIndex/30岁.png);
}
.staic > .Proportion .box:nth-child(2) .bgc {
  background-image: url(../../../assets/xzIndex/30-60.png);
}
.staic > .Proportion .box:nth-child(3) .bgc {
  background-image: url(../../../assets/xzIndex/60岁.png);
}
.water-eval-container > .title p.bg {
  background-image: url(../../../assets/xzIndex/title.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 6px;
  background-position-x: 0px;
  width: 80%;
  /* line-height: 4; */
  height: 40px;
}

.water-eval-container > .title p.num {
  width: 20%;
  max-width: 55px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.water-eval-container > .title > .unit {
  font-size: 12px;
  display: inline-block;
  width: 10px;
  font-style: oblique;
  margin-top: 3px;
  color: #72aef9;
  font-weight: bold;
}

.water-eval-container > .title p.num span {
  font-size: 16px;
  font-style: oblique;
  color: #72aef9;
  font-weight: bold;
}

.water-eval-container > .title p.bg span {
  display: inline-block;
  width: 65%;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
</style>
