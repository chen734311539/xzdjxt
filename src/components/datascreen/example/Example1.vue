<template>
  <div class="panel">
      <div class="jbzl">
        <h2 class="texttitle">交办指令</h2>
        <div style="width:100%;height:calc(100% - 24px);padding:0 5px 5px 5px;">
          <el-scrollbar>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于对部分P2P投资受损人员核查稳控的工作指令</div>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于做好我市涉稳重点人员XXX稳控工作的指令</div>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于做好金融投资受损人员教育稳控工作的通知</div>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于做好金融投资受损人员教育稳控工作的通知</div>
          </el-scrollbar>
        </div>
      </div>
      <div class="zbzl">
        <h2 class="texttitle">抓捕指令</h2>
        <div style="width:100%;height:calc(100% - 24px);padding:0 5px 5px 5px;">
          <el-scrollbar>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于对在逃人员XXX的抓捕工作指令</div>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于对在逃人员XXX的抓捕工作指令</div>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于对在逃人员XXX的抓捕工作指令</div>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于对在逃人员XXX的抓捕工作指令</div>
          </el-scrollbar>
        </div>
      </div>
      <div class="yjxx">
        <h2 class="texttitle">预警信息</h2>
        <div style="width:100%;height:calc(100% - 24px);padding:0 5px 5px 5px;">
          <el-scrollbar>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于少数人员通过XX实施诈骗煽动进京聚集的预警</div>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于XX公司实控人被依法采取刑事强制措施可能对带来影响引发涉稳风险的预警</div>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于XX为由实施诈骗引发涉稳风险的预警</div>
            <div class="textcotent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于XX为由实施诈骗引发涉稳风险的预警</div>
          </el-scrollbar>
        </div>
      </div>
      <div class="tbk">
        <div style="width:100%;height:100%;position:relative;">
          <div style="width:33%;height:50%;position:absolute;left:0%;top:0px;" >
            <div style="height:25px;color:#fff;line-height:25px;text-align:center;font-size:14px;user-select:none;">今日实时警情</div>
            <div style="width:100%;height:calc(100% - 25px);" id="ssjq"></div>
          </div>
          <div style="width:33%;height:50%;position:absolute;left:33.5%;top:0px;">
            <div style="height:25px;color:#fff;line-height:25px;text-align:center;font-size:14px;user-select:none;">今日警情</div>
            <div style="width:100%;height:calc(100% - 25px);" id="ssjqlb"></div>
          </div>
          <div style="width:33%;height:50%;position:absolute;left:67%;top:0px;">
            <div style="height:25px;color:#fff;line-height:25px;text-align:center;font-size:14px;user-select:none;">7日刑事治安警情对比</div>
            <div style="width:100%;height:calc(100% - 25px);" id="xszajqdb"></div>
          </div>
          <div style="width:33%;height:50%;position:absolute;left:0%;top:50%;">
            <div style="height:25px;color:#fff;line-height:25px;text-align:center;font-size:14px;user-select:none;">各派出所警情</div>
            <div style="width:100%;height:calc(100% - 25px);" id="pcsjq"></div>
          </div>
          </div>
          <div style="width:33%;height:50%;position:absolute;left:33.5%;top:50%;">
            <div style="height:25px;color:#fff;line-height:25px;text-align:center;font-size:14px;user-select:none;">7日刑事盗窃警情</div>
            <div style="width:100%;height:calc(100% - 25px);" id="xsdqjq"></div>
          </div>
          <div style="width:33%;height:50%;position:absolute;left:67%;top:50%;">
            <div style="height:25px;color:#fff;line-height:25px;text-align:center;font-size:14px;user-select:none;">7日通信网络诈骗概括</div>
            <div style="width:100%;height:calc(100% - 25px);" id="txwlzpgk"></div>
          </div>
        </div>
        <div class="sstjClass">
            <div class="sstjtitle">实时统计</div>
            <div style="width:100%;height:calc(100% - 35px);">
              <div class="sstjDiv" style="border-right:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(255,255,255,.1);">
                <img src="@/assets/datascreen/example/info-img-1.png" alt="">
                <div><span>GPS总数</span></div>
                <div> <p>453</p></div>
              </div>
              <div class="sstjDiv" style="border-bottom:1px solid rgba(255,255,255,.1);">
                <img src="@/assets/datascreen/example/info-img-2.png" alt="">
                <div><span>当前在线数</span></div>
                <div><p>67</p></div>
              </div>
              <div class="sstjDiv" style="border-right:1px solid rgba(255,255,255,.1);">
                <img src="@/assets/datascreen/example/info-img-3.png" alt="">
                <div><span>今日警情数量</span></div>
                <div><p>123</p></div>
              </div>
              <div class="sstjDiv">
                <img src="@/assets/datascreen/example/info-img-4.png" alt="">
                <div><span>本周警情数量</span></div>
                <div><p>342</p></div>
              </div>
            </div>
        </div>
        <div class="sstjClass" style="top:51%;padding:10px;">
            <div class="sstjtitle">在线警力</div>
            <div style="width:100%;height:calc(100% - 35px);" id="ssjl"></div>
        </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Example1',
  components:{},
  data () {
    return {
      ssjqChart:null,
      ssjqlbChart:null,
      xszajqdbChart:null,
      pcsjqChart:null,
      xsdqjqChart:null,
      txwlzpgkChart:null, 
      ssjlChart:null
    }
  },
  computed:mapState({
  }),
  methods:{
    getdate(num) { 
    var date1 = new Date();
    //今天时间
    // var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
    // console.log(time1);
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + num);
     //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    //  var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate(); 
    var time2 = (date2.getMonth() + 1) + "-" + date2.getDate(); 
    return time2;
    },
    createSSjq(){
      var a = this.echarts.init(document.getElementById("ssjq"));
      this.ssjqChart = a;
      var option = {
                tooltip: {
                    show: false,
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    show: false,
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '警情数量',
                        type: 'gauge',
                        radius: '100%',
                        startAngle: 225,
                        endAngle: -45,
                        max: 400,
                        splitNumber: 5,
                        splitLine: { show: false },
                        axisLine: { lineStyle: { width: 30, color: [[0.2, '#0abd13'], [0.8, '#ffff00'], [1, '#c23531']] } },
                        axisTick: { show: false },
                        axisLabel: { show: true },
                        pointer: { length: '50%', width: 4 },
                        title: {
                            show: false,
                            offsetCenter: [0, '15%'],
                            textStyle: {
                                color: '#fff',
                                fontWeight: 'lighter',
                                fontFamily: '微软雅黑',
                                fontSize: 10
                            }
                        },
                        detail: {
                            offsetCenter: [0, '50%'],
                            formatter: '{value}',
                            textStyle: {
                                fontWeight: 'lighter',
                                fontFamily: '微软雅黑',
                                fontSize: 20
                            }
                        },
                        data: [{ value: "123", name: '实时警情' }]
                    }
                ]
            };
            a.setOption(option);
    },
    createSSjqlb(){
      var a = this.echarts.init(document.getElementById("ssjqlb"));
      this.ssjqlbChart = a;
      var dataarray = [];
      var legendarray = [];
      
			var obj = {};
      obj.value = 8;
      obj.name = "违法犯罪警情";
      dataarray.push(obj);
      legendarray.push("违法犯罪警情");
      var obj = {};
      obj.value = 25;
      obj.name = "纠纷";
      dataarray.push(obj);
      legendarray.push("纠纷");
		  var obj = {};
      obj.value = 22;
      obj.name = "群众求助";
      dataarray.push(obj);
      legendarray.push("群众求助");
      var obj = {};
      obj.value = 3;
      obj.name = "举报投诉";
      dataarray.push(obj);
      legendarray.push("举报投诉");
      var obj = {};
      obj.value = 17;
      obj.name = "其他警情";
      dataarray.push(obj);
      legendarray.push("其他警情");
      
		
      var option = {
				tooltip: {
					trigger: "item",
					backgroundColor: '#23363c',
					borderColor: '#23363c',
					formatter: '{b}<br/>数量：{c}'
				},
				legend: {
					type: 'scroll',
					orient: 'vertical',
					x: 'left',
					data: legendarray,

					textStyle: {
						color: '#fff'
					},
					itemWidth: 8,
					itemHeight: 8
				},
				series: [{
					name: "警情类别",
					type: "pie",
					radius: ['50%', '85%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							formatter: "{b}\n{d}%",
							textStyle: {
								fontSize: '12',
								fontWeight: "bold"
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: dataarray
				}]
      };
      a.setOption(option);
    },
    createXszajqdb(){
      var a = this.echarts.init(document.getElementById("xszajqdb"));
      this.xszajqdbChart = a;
       var qrxszajq_nameArr = [];
        var qrxszajq_count1Arr = [];
        var qrxszajq_count2Arr = [];
        
        qrxszajq_nameArr.push(this.getdate(-7));
        qrxszajq_count1Arr.push(28);
        qrxszajq_count2Arr.push(12);

        qrxszajq_nameArr.push(this.getdate(-6));
        qrxszajq_count1Arr.push(20);
        qrxszajq_count2Arr.push(18);

        qrxszajq_nameArr.push(this.getdate(-5));
        qrxszajq_count1Arr.push(20);
        qrxszajq_count2Arr.push(18);

        qrxszajq_nameArr.push(this.getdate(-4));
        qrxszajq_count1Arr.push(25);
        qrxszajq_count2Arr.push(23);

        qrxszajq_nameArr.push(this.getdate(-3));
        qrxszajq_count1Arr.push(34);
        qrxszajq_count2Arr.push(19);

        qrxszajq_nameArr.push(this.getdate(-2));
        qrxszajq_count1Arr.push(23);
        qrxszajq_count2Arr.push(13);

        qrxszajq_nameArr.push(this.getdate(-1));
        qrxszajq_count1Arr.push(37);
        qrxszajq_count2Arr.push(16);
        
      var option = {
            title: {
                show: false,
                // text: '男女总人数对比',
                left: 10,
                top: 10
            },

            grid: {
                right: '3%',
                left: '3%',
                top: '4%',
                bottom: '36px',
                containLabel: true

            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none',
                }
            },
            legend: {
                //: '83%',
                bottom: '0',
                data: ['刑事警情', '治安警情'],
                textStyle: {
                    color: '#fff'
                },
                itemWidth: 8,
                itemHeight: 8
            },
            xAxis: {
                // name: '刑事警情',
                triggerEvent: true,
                data: qrxszajq_nameArr,
                axisLabel: {
                    show: true,
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontSize: '12'
                    },
                    rotate: 55,
                },
                axisLine: {
                    lineStyle: {
                        show: false,
                        color: "transparent",
                        width: 2
                    }
                },
                axisTick: {
                    show: false,
                }
            },
            yAxis: [{
                //name: '数量',
                type: 'value',
                nameTextStyle: {
                    "color": "#fff"
                },
                axisLabel: {
                    interval: 0,
                    show: true,
                    textStyle: {
                        color: "#fff"
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#F3F3F3",
                        width: 2
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#F3F3F3",
                        width: 1
                    }
                },
                axisTick: {
                    show: false,
                }
            }, {
                nameTextStyle: {
                    "color": "#AEA4A8"
                },
                axisLabel: {
                    interval: 0,
                    show: false,
                    textStyle: {
                        color: "#fff"
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#fff",
                        width: 2
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#F3F3F3",
                        width: 2
                    }
                }

            }],
            series: [{
                name: '刑事警情',
                type: 'bar',
                silent: true,
                itemStyle: {
                    normal: {
                        color: '#5182e4'
                    }
                },
                data: qrxszajq_count1Arr
            }, {
                name: '治安警情',
                type: 'bar',
                silent: true,
                itemStyle: {
                    normal: {
                        color: '#51b4f1'
                    }
                },
                data: qrxszajq_count2Arr
            }]
        };
       a.setOption(option);
    },
    createPcsjq(){
       var a = this.echarts.init(document.getElementById("pcsjq"));
       this.pcsjqChart = a;
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
    createXsdqjq(){
       var a = this.echarts.init(document.getElementById("xsdqjq"));
       this.xsdqjqChart = a;
       var qrxsdxjq_nameArr = [];
      var qrxsdxjq_countArr = [];
      var obj = {};
      obj.max = 26;
      obj.name = this.getdate(-7)+"(19)";
      qrxsdxjq_nameArr.push(obj);
      qrxsdxjq_countArr.push(19);
      var obj = {};
      obj.max = 26;
      obj.name = this.getdate(-6)+"(8)";
      qrxsdxjq_nameArr.push(obj);
      qrxsdxjq_countArr.push(8);

      var obj = {};
      obj.max = 26;
      obj.name = this.getdate(-5)+"(13)";
      qrxsdxjq_nameArr.push(obj);
      qrxsdxjq_countArr.push(13);

      var obj = {};
      obj.max = 26;
      obj.name = this.getdate(-4)+"(20)";
      qrxsdxjq_nameArr.push(obj);
      qrxsdxjq_countArr.push(20);

      var obj = {};
      obj.max = 26;
      obj.name = this.getdate(-3)+"(11)";
      qrxsdxjq_nameArr.push(obj);
      qrxsdxjq_countArr.push(11);

      var obj = {};
      obj.max = 26;
      obj.name = this.getdate(-2)+"(17)";
      qrxsdxjq_nameArr.push(obj);
      qrxsdxjq_countArr.push(17);

      var obj = {};
      obj.max = 26;
      obj.name = this.getdate(-1)+"(26)";
      qrxsdxjq_nameArr.push(obj);
      qrxsdxjq_countArr.push(26);

       var option = {
            grid: {
                top: '3%',
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item', 
                backgroundColor: '#23363c',
                borderColor: '#23363c',
                textStyle: {
                    //  color: '#525de4',
                    color: '#fff',
                    fontFamily: "Microsoft Yahei",
                },
            },

            radar: {
                // shape: 'circle',
                radius: '76%',
                center: ['50%', '50%'],
                nameGap: 4,
                indicator: qrxsdxjq_nameArr,
                triggerEvent: true
            },
            series: [
                {
                    name: '警情数量',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: [
                        {
                            value: qrxsdxjq_countArr
                        }
                    ]
                },
            ]
        };
       a.setOption(option);
    },
    createTxwlzp(){
       var a = this.echarts.init(document.getElementById("txwlzpgk"));
       this.txwlzpgkChart = a;
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
    createZxjl(){
      var a = this.echarts.init(document.getElementById("ssjl"));
      this.ssjlChart = a;
        var xAxisArray = [];
        var seriesArray = [];
        
				var xAxisObj = {};
				xAxisObj.value = "惠龙镇";
				xAxisArray.push(xAxisObj);
        var seriesObj = {};
        seriesObj.data = [];
				seriesObj.name ="警车";
				seriesObj.type = 'bar';
				seriesObj.stack = 'c';
				seriesObj.data.push(3);
        seriesArray.push(seriesObj);
        var seriesObj2 = {};
        seriesObj2.data = [];
				seriesObj2.name ="对讲机";
				seriesObj2.type = 'bar';
				seriesObj2.stack = 'c';
				seriesObj2.data.push(2);
        seriesArray.push(seriesObj2);
        
        var xAxisObj = {};
				xAxisObj.value = "城西";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="城西";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(3);
        seriesObj2.data.push(1);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "开发区";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="开发区";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(7);
        seriesObj2.data.push(0);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "北新";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="北新";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(4);
        seriesObj2.data.push(1);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "启隆";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="启隆";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(6);
        seriesObj2.data.push(4);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "惠萍";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="惠萍";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(7);
        seriesObj2.data.push(5);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "东海";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="东海";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(7);
        seriesObj2.data.push(1);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "海复";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="海复";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(4);
        seriesObj2.data.push(3);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "近海";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="近海";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(5);
        seriesObj2.data.push(4);
				// seriesArray.push(seriesObj);
			

        var option = {
				tooltip: {
					trigger: 'axis',
					backgroundColor: '#23363c',
					borderColor: '#23363c',
					axisPointer: {            // 坐标轴指示器，坐标轴触发有效
						type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					show: false,
					data: ['直接访问', '邮件营销']
				},
				grid: {
					left: 0,
					right: 0,
					top: 5,
					bottom: 0,
					height: 'auto',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						axisLabel: {
							show: true,
							textStyle: {
								color: '#fff',
								fontSize: '12'
							}
						},
						data: xAxisArray,
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						//name: '水量/ml',
						// min: 0,
						// max: 7,
						// interval: 1,
						axisLabel: {
							//formatter: '{value} ',
							textStyle: {
								color: '#fff',
								fontWeight: 'normal',
								fontSize: '12'
							}
						},
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}
					},
				],
				series: seriesArray
			};
      a.setOption(option);
    }
  },
  mounted(){
    this.createSSjq();
    this.createSSjqlb();
    this.createXszajqdb();
    this.createPcsjq();
    this.createXsdqjq();
    this.createTxwlzp();
    this.createZxjl();
    this.chartList.push(this.ssjqChart);
    this.chartList.push(this.ssjqlbChart);
    this.chartList.push(this.xszajqdbChart);
    this.chartList.push(this.pcsjqChart);
    this.chartList.push(this.xsdqjqChart);
    this.chartList.push(this.txwlzpgkChart);
    this.chartList.push(this.ssjlChart);
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
.jbzl{
  background:url(./../../../assets/datascreen/example/pleft1middb.png) no-repeat;
  background-size:100% 100%;
  width: 23%;
  height: 20%;
  position:absolute;
  left: 2%;
  top:5%;
}
.zbzl{
  background:url(./../../../assets/datascreen/example/pleft1middb.png) no-repeat;
  background-size:100% 100%;
  width: 21%;
  height: 20%;
  position:absolute;
  left: 26%;
  top:5%;
}
.yjxx{
  background:url(./../../../assets/datascreen/example/pleft1middb.png) no-repeat;
  background-size:100% 100%;
  width: 23%;
  height: 20%;
  position:absolute;
  left: 48%;
  top:5%;
}
.texttitle{
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 16px;
  user-select: none;
  height: 24px;
}
.textcotent{
  width: 100%;
  text-align: start;
  font-size: 14px;
  color: rgb(214,196,196);
  line-height: 20px;
  margin-top: 10px;
}
.tbk{
  background:url(./../../../assets/datascreen/example/bg_box3.png) no-repeat;
  background-size:100% 100%;
  width: 69%;
  height: 70%;
  position:absolute;
  left: 2%;
  top:26%;
  padding: 5px;
  box-sizing: border-box;
}
.red{
  background: red;
}
.green{
  background: green;
}
.sstjClass{
  position:absolute;
  width:26%;
  left:72%;
  top:5%;
  height: 45%;
  border: 1px solid rgba(100,162,255,.2);
  box-sizing:border-box;
  background:rgba(0,35,120,.36);
  
}
.sstjClass:after,.sstjClass:before{position:absolute;content:"";width:20px;height:30px}
.sstjClass:before{border-left:1px solid #0258f0;border-top:1px solid #0258f0;left:-1px;top:-1px}
.sstjClass:after{border-right:1px solid #0258f0;border-bottom:1px solid #0258f0;right:-1px;bottom:-1px}
.sstjClass .sstjtitle{
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
.sstjDiv{
  width:50%;
  height:50%;
  float:left;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
}
.sstjDiv span{
  font-size: 12px;
  color: #fff;
  opacity: 0.6;
}
.sstjDiv p{
  font-size: 24px;
  color: #fff;
  font-weight:bold;
}
</style>
