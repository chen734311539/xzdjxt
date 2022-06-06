<template>
  <div class="panel">
      <div class="mapImgDiv">
        <div class="map" style="z-index:2;"><div class="map1"><img src="@/assets/datascreen/example/lbx.png"></div></div>
        <div class="map" style="z-index:3;"><div class="map2"><img src="@/assets/datascreen/example/jt.png"></div></div>
        <div class="map" style="z-index:1;"><div class="map3"><img src="@/assets/datascreen/example/map.png"></div></div>
      </div>
      <div class="leftpanel panelkuang" style="height:40%;">
            <div class="title">今日警情完成情况</div>
            <div class="content" id="id1">
                
            </div>
      </div>
      <div class="leftpanel panelkuang" style="height:50%;top:46%">
            <div class="title">一周警情统计表</div>
            <div class="content" id="id2">
                
            </div>
      </div>
      <div class="rightpanel panelkuang" style="height:40%;">
            <div class="title">各派出所警情</div>
            <div class="content" id="id3">
                
            </div>
      </div>
      <div class="rightpanel panelkuang" style="height:50%;top:46%">
            <div class="title">7日通信网络诈骗</div>
            <div class="content" id="id4">
                
            </div>
      </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'

import MapHeat from '@/components/map/MapHeat'
export default {
  name: 'Example2',
  components:{MapHeat},
  data () {
    return {
      id1Chart:null,
      id2Chart:null,
      id3Chart:null,
      id4Chart:null,
    }
  },
  computed:mapState({
  }),
  methods:{
    getdate(num) { 
    var date1 = new Date();
    //今天时间
    //var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
    //console.log(time1);
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + num);
     //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    //  var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate(); 
    var time2 = (date2.getMonth() + 1) + "-" + date2.getDate(); 
    return time2;
    },
    create1(){
      var a = this.echarts.init(document.getElementById("id1"));
      this.id1Chart = a;
      var option = {

          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['已完成','已到达','已签收','未签收'],
              textStyle:{color:"#fff"}
          },
          series : [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:123, name:'已完成'},
                      {value:17, name:'已到达'},
                      {value:13, name:'已签收'},
                      {value:6, name:'未签收'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      };
      a.setOption(option);
    },
    create2(){
      var a = this.echarts.init(document.getElementById("id2"));
      this.id2Chart = a;
      var option = {
        title: {
            
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data:['违法犯罪警情','纠纷','群众求助','举报投诉','其他警情'],
            textStyle:{color:"#fff"}
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日'],
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        series : [
            {
                name:'违法犯罪警情',
                type:'line',
                stack: '总量',
                areaStyle: {},
                data:[10, 5, 8, 6, 4, 1, 2]
            },
            {
                name:'纠纷',
                type:'line',
                stack: '总量',
                areaStyle: {},
                data:[3, 7, 4, 5, 6, 4, 3]
            },
            {
                name:'群众求助',
                type:'line',
                stack: '总量',
                areaStyle: {},
                data:[4, 8, 9, 8, 6, 11, 12]
            },
            {
                name:'举报投诉',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[7, 14, 3, 8, 9, 12, 6]
            },
            {
                name:'其他警情',
                type:'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {normal: {}},
                data:[4, 6, 5, 7, 12, 11, 8]
            }
        ]
    };
      a.setOption(option);
    },
    create3(){
         var a = this.echarts.init(document.getElementById("id3"));
       this.id3Chart = a;
       var nameArr = [];
       var countArr = [];
       nameArr.push("惠龙镇");
       countArr.push(4);
        nameArr.push("城西");
       countArr.push(8);
        nameArr.push("开发区");
       countArr.push(5);
       nameArr.push("北新");
       countArr.push(12);
       nameArr.push("启隆");
       countArr.push(2);
       nameArr.push("惠萍");
       countArr.push(6);
       nameArr.push("东海");
       countArr.push(10);
       nameArr.push("海复");
       countArr.push(7);
       nameArr.push("近海");
       countArr.push(6);

       var option = {
				tooltip: {
					trigger: 'item',
					//  position: ['48.5%', '49.2%'],       
					backgroundColor: '#23363c',
					borderColor: '#23363c',
					textStyle: {
						//  color: '#525de4',
						color: '#fff',
						fontFamily: "Microsoft Yahei",
					}
					// formatter: "{d}%"
				},
				angleAxis: {
					//show: false, 
					type: 'category',
					data: nameArr,
					z: 9,
					//data: hours,
					boundaryGap: false,
					splitLine: {
						show: true,
						lineStyle: {
							color: '#3D3C3C',
							type: 'solid'
						},

					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#fff',
							fontFamily: "Microsoft Yahei",
						}
					},
				},
				radiusAxis: {
					nameGap: 0,
					splitLine: {
						show: true,
						lineStyle: {
							color: '#3D3C3C',
							type: 'solid'
						},

					},
					// data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
					axisLine: {
						//show: true,
						lineStyle: {
							color: '#3D3C3C',
							type: 'solid'
						},
					},
					axisLabel: {
						show: false,
						// rotate: 45,
						interval: 0,
						// margin:20

					},
					splitArea: {
						interval: 0,
					},
				},
				interval: 30,
				polar: {
					radius: "62%",
				},
				detail: {
					textStyle: {
						color: "blue",
					}
				},
				series: [{
					type: 'bar',
					data: countArr,
					coordinateSystem: 'polar',
					name: '',
					color: ["#3fa7dc"],
					itemStyle: {
						emphasis: {
							//opacity:0.5,
							color: ["#B7E1E8"],
						},
					},
				}],
				legend: {
					show: false,
					// data: ['A', 'B', 'C']
				}
			};
       a.setOption(option);
    },
    create4(){
        var a = this.echarts.init(document.getElementById("id4"));
       this.id4Chart = a;
       var qrtxwl_nameArr = [];
        var qrtxwl_count1Arr = [];
        var qrtxwl_count2Arr = [];
       
            var name = this.getdate(-7);
            qrtxwl_nameArr.push(name);
            qrtxwl_count1Arr.push(6);
            qrtxwl_count2Arr.push(1);

            var name = this.getdate(-6);
            qrtxwl_nameArr.push(name);
            qrtxwl_count1Arr.push(11);
            qrtxwl_count2Arr.push(0);

            var name = this.getdate(-5);
            qrtxwl_nameArr.push(name);
            qrtxwl_count1Arr.push(5);
            qrtxwl_count2Arr.push(1);

            var name = this.getdate(-4);
            qrtxwl_nameArr.push(name);
            qrtxwl_count1Arr.push(8);
            qrtxwl_count2Arr.push(2);

            var name = this.getdate(-3);
            qrtxwl_nameArr.push(name);
            qrtxwl_count1Arr.push(11);
            qrtxwl_count2Arr.push(0);

            var name = this.getdate(-2);
            qrtxwl_nameArr.push(name);
            qrtxwl_count1Arr.push(12);
            qrtxwl_count2Arr.push(3);

            var name = this.getdate(-1);
            qrtxwl_nameArr.push(name);
            qrtxwl_count1Arr.push(5);
            qrtxwl_count2Arr.push(1);
  
       var option = {
            ///backgroundColor: "#202953",
            title: {
                show: false,

                // text: '世界人口总量',
                // subtext: '数据来自网络'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                }
            },
            legend: {
                data: ['网络诈骗', '电话诈骗'],
                bottom: 0,
                textStyle: {
                    color: '#fff'
                },
                itemWidth: 8,
                itemHeight: 8
            },
            grid: {
                top: '4%',
                left: '3%',
                right: '4%',
                bottom: '26px',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                itemStyle: {
                    color: "#202953"
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontSize: '12'
                    },
                    //  rotate: 55,
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#444",
                        width: 0
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#F3F3F3",
                        width: 0
                    }
                },
                axisTick: {
                    show: false,
                }
            },
            yAxis: {
                type: 'category',
                data: qrtxwl_nameArr,
                axisLabel: {
                    interval: 0,
                    show: true,
                    textStyle: {
                        color: "#fff"
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#ccc",
                        width: 2
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#F3F3F3",
                        width: 2
                    }
                },
                axisTick: {
                    show: false,
                }
            },
            series: [{
                name: '网络诈骗',
                type: 'bar',
                data: qrtxwl_count1Arr,
                itemStyle: {
                    normal: {
                        color: '#5182e4'
                    }
                },

            }, {
                name: '电话诈骗',
                type: 'bar',
                data: qrtxwl_count2Arr,
                itemStyle: {
                    normal: {
                        color: '#51b4f1'
                    }
                },
            }]
        };
       a.setOption(option);
    },
  },
  mounted(){
    this.create1();
    this.create2();
    this.create3();
    this.create4();
    this.chartList.push(this.id2Chart);
    this.chartList.push(this.id1Chart);
    this.chartList.push(this.id4Chart);
    this.chartList.push(this.id3Chart);
  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.panel{
  position: relative;
  width: 100%;
  height: 100%;
}
.mapImgDiv{
  position:absolute;
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%);
  width: 34%;
  height: 75%;
  opacity:0.8;
  user-select: none;
}
.mapImgDiv .map{
  position:absolute;
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%);
  user-select: none;
}
.mapImgDiv .map1{
  z-index: 2;
  animation:myfirst2 15s infinite linear;
  user-select: none;
}
.mapImgDiv .map2{
  z-index: 3;
  animation:myfirst 10s infinite linear;
  user-select: none;
}
.mapImgDiv .map3{
  z-index: 1;
  user-select: none;
}
@keyframes myfirst2
{
from {transform: rotate(0deg);}
to {transform: rotate(359deg);}
}
@keyframes myfirst
{
from {transform: rotate(0deg);}
to {transform: rotate(-359deg);}
}
.content{
  width: 100%;
  height:calc(100% - 35px);
  z-index:4;
  user-select:none;
}
.leftpanel{
  position:absolute;
  z-index: 5;
  width:33%;
  left:2%;
  top:5%;
  height: 90%;
  border: 1px solid rgba(100,162,255,.2);
  box-sizing:border-box;
  /* background:rgba(0,35,120,.36); */
  background: rgba(0, 0, 0,0.2);
  user-select:none;
  padding:10px;
}
.panelkuang:after,.panelkuang:before{position:absolute;content:"";width:20px;height:30px}
.panelkuang:before{border-left:1px solid #0258f0;border-top:1px solid #0258f0;left:-1px;top:-1px}
.panelkuang:after{border-right:1px solid #0258f0;border-bottom:1px solid #0258f0;right:-1px;bottom:-1px}
.title{
  height:35px;
  font-size:18px;
  line-height:35px;
  width:100%;
  color:#fff;
  font-weight:600;
  padding-left:15px;
  position:relative;
  box-sizing:border-box;
  font-family:"微软雅黑";
}
.rightpanel{
  position:absolute;
  z-index: 5;
  width:33%;
  right:2%;
  top:5%;
  height: 90%;
  border: 1px solid rgba(100,162,255,.2);
  box-sizing:border-box;
  /* background:rgba(0,35,120,.36); */
  background: rgba(0, 0, 0,0.2);
  user-select:none;
  padding:10px;
}
</style>
