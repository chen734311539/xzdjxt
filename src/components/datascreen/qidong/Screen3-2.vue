<template>
  <div class="panel">
    <div class="head1">
        <span class="bg_title_span">人口大数据</span>
    </div>
    <div class="table1">
      <div class="table1_left">
        <div class="dataybp">
          <div ref="czrkYbpchart" class="ybp"></div>
          <div ref="zzrkYbpchart" class="ybp"></div>
          <div ref="lgrzYbpchart" class="ybp"></div>
          <div ref="wbswYbpchart" class="ybp"></div>
          <div ref="gyrsYbpchart" class="ybp"></div>
          <div ref="zdryYbpchart" class="ybp"></div>
        </div>
        <div style="width:100%;height:56.716418%">
          <div class="brrks jiao_bg" style="margin-top:10px">
              <div ref="brrkZxtchart" style="width:100%;height:100%" ></div>
          </div>
          <div class="brrks jiao_bg" style="margin-top:12px;">
              <div ref="byrkZxtchart" style="width:100%;height:100%"></div>
          </div>
        </div>
      </div>
      <div class="table1_right jiao_bg">
         <div class="table1_right_border" style="width:100%;height:33.3333%">
              <div ref="czrkBarchart" style="width:100%;height:100%"></div>
         </div>
         <div class="table1_right_border" style="width:100%;height:33.3333%">
              <div ref="zzrkBarchart" style="width:100%;height:100%"></div>
         </div>
         <div style="width:100%;height:33.3333%">
              <div ref="gyrkBarchart" style="width:100%;height:100%"></div>
         </div>
      </div>
    </div>
    <div class="head1" style="margin-top:10px">
      <span class="bg_title_span">交通大数据</span>
    </div>
    <div class="table2">
      <div class="table2_tab jiao_bg" style="margin-right:5px;margin-bottom:5px;">
           <div ref="zdkkchart" style="width:100%;height:100%"></div>
      </div>
      <div class="table2_tab jiao_bg" style="margin-left:5px;margin-bottom:5px;">
           <div ref="cztjchart" style="width:100%;height:100%"></div>
      </div>
      <div class="table2_tab jiao_bg" style="margin-right:5px;margin-top:5px;">
           <div ref="jtsgchart" style="width:100%;height:100%"></div>
      </div>
      <div class="table2_tab jiao_bg" style="margin-left:5px;margin-top:5px;">
           <div ref="wfclchart" style="width:100%;height:100%"></div>
      </div>
    </div>
     
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: 'Screen3fp2',
  components:{},
  props:['screen'],
  data () {
    return {
        date:"",
        time:"",
        czrkYbp:null,
        zzrkYbp:null,
        lgrzYbp:null,
        wbswYbp:null,
        gyrsYbp:null,
        zdryYbp:null,
        brrkZxt:null,
        byrkZxt:null,
        czrkBar:null,
        zzrkBar:null,
        gyrkBar:null,
        zdkkchart:null,
        cztjchart:null,
        jtsgchart:null,
        wfclchart:null,
        chartList:[],
        lgwbyrObj:{},//旅馆网吧一日数据
        lgwbqrObj:{},//旅馆网吧七日数据
    }
  },
  computed: {

  },
  methods:{
    createYbp(state){
      var data = { //显示的数据
            "name": '实有人口',
            "num": 1191463
      }
      var max = 1500000 //最大馆藏量
      var color = '#EA1E24';
      if(state==1){
        
      }
      if(state==2){
        data.name = '暂住人口';
        data.num = 348472;
        max = 400000;
        color = '#00D8E0';
      }
      if(state==3){
        data.name = '旅馆入住';
        data.num = 348472;
        max = 400000;
        color = '#E3DD0B';
      }
      if(state==4){
        data.name = '网吧人数';
        data.num = 348472;
        max = 400000;
        color = '#3D50FF';
      }
      if(state==5){
        data.name = '关押人数';
        data.num = 17122;
        max = 20000;
        color = '#E622FF';
      }
      if(state==6){
        data.name = '重点人员';
        data.num = 3000;
        max = 5000;
        color = '#4AE65C';
      }
        var option = {
          angleAxis: {
              show: false,
              max: max * 3 / 2, //这里将极坐标最大值转换成仪表盘的最大值，(360度除以240度)
              type: 'value',
              startAngle: 210, //极坐标初始角度，从第一象限算起，大约在7-8点钟角度之间
              splitLine: {
                  show: false //隐藏坐标
              }
          },
          barMaxWidth: 10, //圆环宽度
          radiusAxis: { //隐藏坐标
              show: false,
              type: 'category',
          },
          polar: { //设置圆环位置和大小
              center: ['50%', '50%'],
              radius: '100'
          },
          series: [{
                  type: 'bar',
                  data: [{ //上层圆环，用于显示真实数据
                      value: data.num,
                      itemStyle: {
                          color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                              type: 'linear',
                              x: 0,
                              y: 0,
                              x2: 1, //从左到右 0-1
                              y2: 0,
                              colorStops: [{
                                  offset: 0,
                                  color: '#2CABFC' // 0% 处的颜色
                              }, {
                                  offset: 1,
                                  color: color // 100% 处的颜色
                              }],
                              globalCoord: false // 缺省为 false
                          },
                          shadowColor: 'rgba(255, 255, 255, 0.2)', //加白色阴影产生高亮效果
                          shadowBlur: 10
                      }
                  }],
                  barGap: '-100%', //柱间距离,用来将上下两层圆环重合
                  coordinateSystem: 'polar', //类型，极坐标
                  roundCap: true, //顶端圆角
                  z: 2 //圆环层级，和zindex相似
              }, { //下层圆环，用于显示最大值
                  type: 'bar',
                  data: [{
                      value: max,
                      itemStyle: {
                          color: '#265195',
                          shadowColor: 'rgba(0, 0, 0, 0.2)', //加白色阴影产生高亮效果
                          shadowBlur: 5,
                          shadowOffsetY: 2
                      }
                  }],
                  barGap: '-100%', //柱间距离,用来将上下两层圆环重合
                  coordinateSystem: 'polar', //类型，极坐标
                  roundCap: true, //顶端圆角
                  z: 1 //圆环层级，和zindex相似
              },
              { //仪表盘
                  type: 'gauge',
                  radius: '95%',
                  startAngle: 210, //起始角度，同极坐标
                  endAngle: -30, //终止角度，同极坐标
                  max: max,
                  splitNumber: 5, //分割线个数（除原点外）
                  axisLine: { // 坐标轴线
                      show: false
                  },
                  pointer: {
                      show: false
                  },
                  axisLabel: {
                      // 坐标轴数字
                      textStyle: {
                          fontSize: 8,
                          color: "#13B5FC"
                      },

                  },
                  axisTick: { // 坐标轴标记
                      length: 10,
                      lineStyle: {
                          color: "#13B5FC"
                      }
                  },
                  splitLine: { // 分隔线
                      length: 5,
                      lineStyle: {
                          width: 1,
                      }
                  },
                  title: { //标题，显示'馆藏量'
                      textStyle: {
                          color: '#fff',
                          shadowColor: '#fff',
                          fontSize: 10
                      },
                      offsetCenter: ["0", '80%'] //位置偏移
                  },
                  detail: { //仪表盘数值
                      formatter: function (params) {
                          var name = data.num.toString()
                          var list = ''
                          for (var i = 0; i < name.length; i++) {
                              if(name.length>=5){
                                 list += '{value|' + name.substring(0,name.length-4) + '}{value| 万 }' //每个数字用border隔开
                                 break;
                              }
                              list += '{value|' + name[i] + '}' //每个数字用border隔开
                              if (i !== name.length - 1) {
                                  list += '{margin|}' //添加margin值
                              }
                          }
                          return [list]
                      },
                      offsetCenter: ["0", '5%'],
                      rich: { //编辑富文本样式
                          value: {
                              width: 10,
                              height: 10,
                              // borderColor: '#02A0F0',
                              // borderWidth: 2,
                              // borderRadius: 5,
                              lineHeight: 1000,
                              fontSize: 8,
                              padding: [0, 0, 4, 0],
                              color: '#fff',
                              shadowColor: 'rgb(2,157,239)',
                              shadowBlur: 5
                          },
                          margin: {
                              width: 8,
                              height: 42,
                          }
                      }

                  },
                  data: [{
                      value: data.num,
                      name: data.name
                  }]
              }
          ]
      }
      if(state==1){
        this.czrkYbp.setOption(option);
      }
      if(state==2){
        this.zzrkYbp.setOption(option);
      }
      if(state==3){
        this.lgrzYbp.setOption(option);
      }
      if(state==4){
        this.wbswYbp.setOption(option);
      }
      if(state==5){
        this.gyrsYbp.setOption(option);
      }
      if(state==6){
        this.zdryYbp.setOption(option);
      }
    },
    createRkZxt(state){
      var timedata=[];
      var lgdata=[];
      var wbdata=[];
      if(state==1){
          for (var i = 0;i<this.lgwbyrObj.lglist.length;i++){
            timedata.push(this.lgwbyrObj.lglist[i].TIMESTR);
            lgdata.push(this.lgwbyrObj.lglist[i].NUM);
          } 
          for (var j = 0;j<this.lgwbyrObj.wblist.length;j++){
            wbdata.push(this.lgwbyrObj.wblist[j].NUM);
          }
          var text= '本日旅馆网吧数量';
        }
        if(state==2){
          for (var i = 0;i<this.lgwbqrObj.lglist.length;i++){
            timedata.push(this.lgwbqrObj.lglist[i].TIMESTR);
            lgdata.push(this.lgwbqrObj.lglist[i].NUM);
          } 
          for (var j = 0;j<this.lgwbqrObj.wblist.length;j++){
            wbdata.push(this.lgwbqrObj.wblist[j].NUM);
          }
          var text= '七日旅馆网吧数量';
        }
       var option = {
            color: ['#FE963C', '#3697F9'],
            title: {
                text: text,
                left:'center',
                textStyle:{
                  color:'#04D7D9',
                  fontSize:14,
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
              orient: 'vertical',
                left: 'right',
                color:'white',
                align:'left',
                y:'center',
                itemGap:30,
                data: [{name:'旅馆',textStyle:{color:"#F39800"}}, {name:'网吧',textStyle:{color:"#00A0E9"}}]
            },
            grid: {
                left: '10',
                right: '90',
                bottom: '10',
                top:'30',
                containLabel: true
            },
            xAxis: {
                axisLabel:{
                  show:true,
                      color:'#33c8ff'
                },
                axisLine:{
                  show:true,
                     lineStyle:{
                         color:'#093765'
                     }
                }, 
                type: 'category',
                boundaryGap: true,
                data: timedata
            },
            yAxis: {
                type: 'value',
                axisLine:{
                  show:false,
                     lineStyle:{
                         color:'#093765'
                     }
                },
                splitLine:{
                  lineStyle:{
                    color:"#093765"
                  }
                },
                axisLabel:{
                    color:'#33c8ff'
                },
            },
            series: [
                {
                  name: '旅馆',
                  type: 'line',
                  data: lgdata
                },
                {
                  name: '网吧',
                  type: 'line',
                  data: wbdata
                }
            ]
        };
        if(state==1){
          this.brrkZxt.setOption(option);
        }
        if(state==2){
          this.byrkZxt.setOption(option);
        }
    },
    createczrkBar(){
         var option = {
              color: ['#008BEB', '#7B2A68'],
              title: {
                  text: '常住人口',
                  left: 'center',
                  textStyle:{
                    color:'#04D7D9',
                    fontSize:14,
                  }
              },
              legend: {
                orient: 'vertical',
                itemGap:30,
                color:'white',
                align:'left',
                right:'5%',
                y:'center',
                data: [{name:'男',textStyle:{color:"#E2873D"}}, {name:'女',textStyle:{color:"#DF48FF"}}]
              },
              tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              series: [
                  {
                      name: '常住人口',
                      type: 'pie',
                      radius: '55%',
                      center: ['50%', '60%'],
                      data: [
                          {value: 335, name: '男'},
                          {value: 310, name: '女'}
                      ],
                      emphasis: {
                          itemStyle: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
        };
        this.czrkBar.setOption(option);
    },
    createzzrkBar(){
        var option = {
            color: ['#FF4C4B', '#2BD6C3'],
            title: {
                  text: '暂住人口',
                  left: 'center',
                  textStyle:{
                    color:'#04D7D9',
                    fontSize:14,
                  }
            },
            grid: {
                left: '50',
                right: '90',
                bottom: '20',
                top:'40',
                containLabel: true
            },
            yAxis: {
                axisLabel:{
                  show:true,
                      color:'#33c8ff'
                },
                axisLine:{
                  show:false,
                     lineStyle:{
                         color:'#093765'
                     }
                }, 
                type: 'category',
                boundaryGap: false,
                data: ['30岁以下', '30-40岁', '40-50岁', '50-60岁']
            },
            xAxis: {
                type: 'value',
                axisLine:{
                  show:false,
                     lineStyle:{
                         color:'#093765'
                     }
                },
                splitLine:{
                  lineStyle:{
                    color:"rgba(220, 220, 220, 0.0)"
                  }
                },
                axisLabel:{
                    color:"rgba(220, 220, 220, 0.0)"
                },
            },
            series: [{
                data: [{value:'120',itemStyle: {color: '#00B8EC'}}, {value:'200',itemStyle: {color: '#3573FB'}},
                       {value:'150',itemStyle: {color: '#7FC369'}}, {value:'80',itemStyle: {color: '#FC6A34'}}],
                type: 'bar',
                barWidth: '45%',
                itemStyle: {
                      color: new this.echarts.graphic.LinearGradient(
                          1, 0, 0, 0,
                          [
                              {offset: 0, color: '#01bbf3'},
                              {offset: 1, color: '#003b6e'}
                          ]
                      )
                  },
                // showBackground: true,
                // backgroundStyle: {
                //     color: '#7FC369'
                // }
            }]
        };
        this.zzrkBar.setOption(option);
    },
    creategyrkBar(){
        var option = {
            color: ['#FF4C4B', '#2BD6C3'],
            title: {
                  text: '关押人口',
                  left: 'center',
                  textStyle:{
                    color:'#04D7D9',
                    fontSize:14,
                  }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                itemGap:30,
                color:'white',
                align:'left',
                right:'5%',
                y:'center',
                data: [{name:'本地',textStyle:{color:"#FF4C4B"}}, {name:'外地',textStyle:{color:"#2BD6C3"}}]
            },
            series: [
                {
                    name: '关押人口',
                    type: 'pie',
                    radius: ['30%', '70%'],
                    center: ['50%', '55%'],
                    avoidLabelOverlap: false,
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    label: {
                            show: true,
                            formatter: '{d}%'
                        },
                    data: [
                        {value: 55, name: '本地'},
                        {value: 26, name: '外地'}
                    ]
                }
            ]
        };
        this.gyrkBar.setOption(option);
    },
    createzdkkchart(){
      var option = {
            color: ['#00DB8A', '#F56229', '#2896FE'],
            title: {
                  text: '重点卡口',
                  left: 'left',
                  textStyle:{
                    color:'#04D7D9',
                    fontSize:14,
                  }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
              orient: 'vertical',
                left: 'right',
                color:'white',
                align:'left',
                y:'center',
                itemGap:15,
                data: [{name:'和平中路',textStyle:{color:"#00DB8A"}}, {name:'建筑路',textStyle:{color:"#F56229"}}, {name:'和平北路',textStyle:{color:"#2896FE"}}]
            },
            grid: {
                left: '10',
                right: '90',
                bottom: '0',
                top:'40',
                containLabel: true
            },
            xAxis: {
                axisLabel:{
                  show:true,
                      color:'#33c8ff'
                },
                axisLine:{
                  show:false,
                     lineStyle:{
                         color:'#093765'
                     }
                },
                type: 'category',
                boundaryGap: true,
                data: ['00:00', '04:00', '06:00', '12:00', '16:00', '20:00', '24:00']
            },
            yAxis: {
                type: 'value',
                axisLine:{
                  show:false,
                     lineStyle:{
                         color:'#093765'
                     }
                },
                splitLine:{
                  lineStyle:{
                    color:"#093765"
                  }
                },
                axisLabel:{
                    color:'#33c8ff'
                },
            },
            series: [
                {
                    name: '和平中路',
                    type: 'line',
                    smooth: true,
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '建筑路',
                    type: 'line',
                    smooth: true,
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '和平北路',
                    type: 'line',
                    smooth: true,
                    data: [150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
        this.zdkkchart.setOption(option);
    },
    createcztjchart(){
          var option = {
              color: ['#12B0DB', '#BA55AC'],
              title: {
                    text: '车证统计',
                    left: 'left',
                    textStyle:{
                      color:'#04D7D9',
                      fontSize:14,
                    }
              },
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                orient: 'vertical',
                  left: 'right',
                  color:'white',
                  align:'left',
                  y:'center',
                  itemGap:15,
                  data: [{name:'机动车',textStyle:{color:"#12B0DB"}}, {name:'驾驶证',textStyle:{color:"#BA55AC"}}]
              },
              grid: {
                  left: '10',
                  right: '90',
                  bottom: '0',
                  top:'40',
                  containLabel: true
              },
              xAxis: {
                  axisLabel:{
                    show:true,
                        color:'#33c8ff'
                  },
                  axisLine:{
                    show:false,
                      lineStyle:{
                          color:'#093765'
                      }
                  },
                  type: 'category',
                  boundaryGap: true,
                  data: ['8/3', '8/4', '8/5', '8/6', '8/7', '8/8', '8/9', '8/10', '8/11', '8/12', '8/13', '8/14']
              },
              yAxis: {
                  type: 'value',
                  axisLine:{
                    show:false,
                      lineStyle:{
                          color:'#093765'
                      }
                  },
                  splitLine:{
                    lineStyle:{
                      color:"#093765"
                    }
                  },
                  axisLabel:{
                      color:'#33c8ff'
                  },
              },
              series: [
                {
                    name: '机动车',
                    type: 'bar',
                    barWidth: '15%',
                    data: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90]
                },
                {
                    name: '驾驶证',
                    type: 'bar',
                    barWidth: '15%',
                    data: [100, 110, 91, 124, 80, 130, 210,120, 132, 101, 134, 90]
                },
            ]
          };
          this.cztjchart.setOption(option);

    },
    createjtsgchart(){
        var option = {
            color: ['#00DB8A'],
            title: {
                  text: '交通事故',
                  left: 'left',
                  textStyle:{
                    color:'#04D7D9',
                    fontSize:14,
                  }
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '10',
                right: '10',
                bottom: '0',
                top:'40',
                containLabel: true
            },
            xAxis: {
                axisLabel:{
                  show:true,
                      color:'#33c8ff'
                },
                axisLine:{
                  show:false,
                     lineStyle:{
                         color:'#093765'
                     }
                },
                type: 'category',
                boundaryGap: true,
                data: ['8/3', '8/4', '8/5', '8/6', '8/7', '8/8', '8/9', '8/10', '8/11', '8/12', '8/13', '8/14']
            },
            yAxis: {
                type: 'value',
                axisLine:{
                  show:false,
                     lineStyle:{
                         color:'#093765'
                     }
                },
                splitLine:{
                  lineStyle:{
                    color:"#093765"
                  }
                },
                axisLabel:{
                    color:'#33c8ff'
                },
            },
            series: [
                {
                    name: '交通事故量',
                    type: 'line',
                    smooth: true,
                    data: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90]
                }
            ]
        };
        this.jtsgchart.setOption(option);
    },
    createwfclchart(){
         var option = {
            color: ['#2ECA96', '#FF9A38',],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            title: {
                  text: '违法处理',
                  left: 'left',
                  textStyle:{
                    color:'#04D7D9',
                    fontSize:14,
                  }
            },
            legend: {
                orient: 'vertical',
                itemGap:30,
                color:'white',
                align:'left',
                right:'5%',
                y:'center',
                data: [{name:'非现场',textStyle:{color:"#2ECA96"}}, {name:'现场',textStyle:{color:"#FF9A38"}}]
            },
            series: [
                {
                    name: '违法处理',
                    type: 'pie',
                    radius: ['35%', '70%'],
                    center: ['40%', '50%'],
                    data: [
                        {value: 335, name: '非现场'},
                        {value: 200, name: '现场'},
                    ],
                    roseType: 'radius',
                    label: {
                            show: true,
                            formatter: '{d}%'
                        },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        this.wfclchart.setOption(option);
    },
    listenResize(){
      for(var i = 0;i<this.chartList.length;i++){
        this.chartList[i].resize();
      }
    },
    //-------------------请求后端数据--------------------------------------
    getlgwbData(){
      this.http.get("/datascreen/getJrLvwbCount",null,this.getJrLvwbCountCallBack,this,false);
      this.http.get("/datascreen/get7rLvwbCount",null,this.get7rLvwbCountCallBack,this,false);
    },
    getJrLvwbCountCallBack(data){
      this.lgwbyrObj=data;
      this.createRkZxt(1);
    },
    get7rLvwbCountCallBack(data){
      this.lgwbqrObj=data;
      this.createRkZxt(2);
    },
  },
  mounted(){
    this.getlgwbData();
    this.czrkYbp = this.echarts.init(this.$refs.czrkYbpchart);
    this.createYbp(1);
    this.chartList.push(this.czrkYbp);
    this.zzrkYbp = this.echarts.init(this.$refs.zzrkYbpchart);
    this.createYbp(2);
    this.chartList.push(this.zzrkYbp);
    this.lgrzYbp = this.echarts.init(this.$refs.lgrzYbpchart);
    this.createYbp(3);
    this.chartList.push(this.lgrzYbp);
    this.wbswYbp = this.echarts.init(this.$refs.wbswYbpchart);
    this.createYbp(4);
    this.chartList.push(this.wbswYbp);
    this.gyrsYbp = this.echarts.init(this.$refs.gyrsYbpchart);
    this.createYbp(5);
    this.chartList.push(this.gyrsYbp);
    this.zdryYbp = this.echarts.init(this.$refs.zdryYbpchart);
    this.createYbp(6);
    this.chartList.push(this.zdryYbp);
    this.brrkZxt = this.echarts.init(this.$refs.brrkZxtchart);
    // this.createRkZxt(1);
    this.chartList.push(this.brrkZxt);
    this.byrkZxt = this.echarts.init(this.$refs.byrkZxtchart);
    // this.createRkZxt(2);
    this.chartList.push(this.byrkZxt);
    this.czrkBar = this.echarts.init(this.$refs.czrkBarchart);
    this.createczrkBar();
    this.chartList.push(this.czrkBar);
    this.zzrkBar = this.echarts.init(this.$refs.zzrkBarchart);
    this.createzzrkBar();
    this.chartList.push(this.zzrkBar);
    this.gyrkBar = this.echarts.init(this.$refs.gyrkBarchart);
    this.creategyrkBar();
    this.chartList.push(this.gyrkBar);
    this.zdkkchart = this.echarts.init(this.$refs.zdkkchart);
    this.createzdkkchart();
    this.chartList.push(this.zdkkchart);
    this.cztjchart = this.echarts.init(this.$refs.cztjchart);
    this.createcztjchart();
    this.chartList.push(this.cztjchart);
    this.jtsgchart = this.echarts.init(this.$refs.jtsgchart);
    this.createjtsgchart();
    this.chartList.push(this.jtsgchart);
    this.wfclchart = this.echarts.init(this.$refs.wfclchart);
    this.createwfclchart();
    this.chartList.push(this.wfclchart);
    window.addEventListener('resize',this.listenResize);
  },
  beforeDestroy(){
   window.removeEventListener("resize",this.listenResize);
  },
  watch : {
      screen:function(val) {
          if(val==2){
              this.listenResize();
          }
      }
  }
}
</script>

<style scoped>
.panel{
  width: 100%;
  overflow:hidden;
  background:url(./../../../assets/datascreen/qidong/fp2/bg.png) no-repeat;
  background-size:100% 100%;
  background-color: #0a1e34;
  height: 100%;
  z-index: -1;
}
.bg_title_span{
  font-size:26px;
  letter-spacing:20px;
  margin-bottom:10px;
  background: linear-gradient(to bottom, #00ffff,#48b8ff 60%);
  color: transparent;
  -webkit-background-clip: text;
  font-weight: 700;
}
.jiao_bg{
 background-image: url(./../../../assets/datascreen/qidong/fp2/top_left.png),
      url(./../../../assets/datascreen/qidong/fp2/top_right.png),
      url(./../../../assets/datascreen/qidong/fp2/bot_left.png),
      url(./../../../assets/datascreen/qidong/fp2/bot_right.png);
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-position: top left, top right, bottom left, bottom right;
  z-index: 1;
  padding: 2px 2px 2px 2px;
  box-shadow:inset 0px 0px 46px 0px rgba(18, 146, 255, .16);
}
.head1{
  width: calc(100% - 20px);
  height: 4.8148%;
  margin-left: 10px;
  margin-right: 10px;
  background:url(./../../../assets/datascreen/qidong/fp2/logo_bg.png) no-repeat;
  background-size:100% 100%;
  display: flex;
  justify-content: center;
}
.table1{
  width: calc(100% - 20px);
  height: 55.833333%;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
}
.table1_left{
  float: left;
  width: 51.503759%;
  height: 100%;
}
.dataybp{
  width: 100%;
  height: 43.283582%;
}
.ybp{
  position: relative;
  float: left;
  width: 33.33333%;
  height: 50%;
}
.brrks{
  width: 100%;
  height: 46.783626%;
}
.table1_right{
  float: left;
  margin-left: 1.8797%;
  width: 46.616541%;
  height: 100%;
  /* box-shadow: 45px 45px 0px rgba(18,146,155,0.05) inset; */
}
.table1_right_border{
  background-image: url(./../../../assets/datascreen/qidong/fp2/border_line.png);
  background-repeat: no-repeat;
  background-position: bottom;
}
.table2{
  width: calc(100% - 20px);
  height: 31.481481%;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 8px;
}
.table2_tab{
  width: calc(50% - 5px);
  height: calc(50% - 5px);
  float: left;
}
</style>
