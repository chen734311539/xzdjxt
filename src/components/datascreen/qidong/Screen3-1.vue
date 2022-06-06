<template>
  <div class="Screen3fp1">
     <div class="bg_title flexr">
        <span class="bg_title_span">今日值班表</span>
     </div>
     <div class="zbcontent flexr">
         <div class="zbcontentleft jiaobackground">
            <div class="zbcontentleftDiv flexc">
                <div style="color:#01d9d9;font-size:14px;margin-top:17px;">局领导</div>
                <div style="color:white;margin-top:10px;" class="flexr">
                  <img src="@/assets/datascreen/qidong/fp1/user.png" style="margin-right:10px;"/>
                  杨斌（总值班）
                </div>
                <div style="color:white;margin-top:10px;" class="flexr">
                  <img src="@/assets/datascreen/qidong/fp1/user.png" style="margin-right:10px;"/>
                  刑健 （副班）
                </div>
            </div>
            <div class="zbcontentleftDiv flexc">
                <div style="color:#01d9d9;font-size:14px;margin-top:17px;">指挥中心</div>
                <div style="color:white;margin-top:10px;color:#48b8ff;">彭雪松</div>
                <div style="color:white;margin-top:10px;color:#48b8ff;">施辉</div>
            </div>
            <div class="zbcontentleftDiv flexc">
                <div style="color:#01d9d9;font-size:14px;margin-top:17px;">情报中心</div>
                <div style="color:white;margin-top:10px;color:#48b8ff;">李巍</div>
                <div style="color:white;margin-top:10px;color:#48b8ff;">邱俊杨</div>
            </div>
            <div class="zbcontentleftDiv2 flexc">
                <div style="color:#01d9d9;font-size:14px;margin-top:17px;">指挥调度台</div>
                <div style="color:white;margin-top:10px;color:#48b8ff;">陈伟</div>
                <div style="color:white;margin-top:10px;color:#48b8ff;">凡季</div>
            </div>
         </div>
         <div class="zbcontentcenter">
            <div class="zbcontentcentertop">
                <!-- style="width:100px;height:80px;left:40%;top:40%;" -->
                  <div class="maptc" v-for=" Obj in JlcountAndDeptList" :key="Obj.deptcode" :style="{'width':'100px','height':'80px','left':Obj.left+'%','top':Obj.top+'%'}">
                    <div style="color:#d3b140;">{{Obj.deptname}}</div>
                    <div style="color:white;justify-content:flex-start;" class="flexr">{{Obj.leader}}<span style="margin-left:10px;font-size:24px;">{{Obj.count}}</span></div>
                  </div>
            </div>
            <div class="zbcontentcenterbottom jiaobackground flexr" style="justify-content:space-around;">
              <div class="flexr">
                 <img src="@/assets/datascreen/qidong/fp1/icon_list.png" style="margin-right:10px;"/>
                 <div class="flexc"><span style="color:white;">警务保障室</span><span style="color:#01d9d9;">陆金涛</span></div>
              </div>
              <div class="flexr">
                 <img src="@/assets/datascreen/qidong/fp1/icon_list.png" style="margin-right:10px;"/>
                 <div class="flexc"><span style="color:white;">信访办</span><span style="color:#01d9d9;">陆维忠</span></div>
              </div>
              <div class="flexr">
                 <img src="@/assets/datascreen/qidong/fp1/icon_list.png" style="margin-right:10px;"/>
                 <div class="flexc"><span style="color:white;">交警</span><span style="color:#01d9d9;">张海荣</span></div>
              </div>
              <div class="flexr">
                 <img src="@/assets/datascreen/qidong/fp1/icon_list.png" style="margin-right:10px;"/>
                 <div class="flexc"><span style="color:white;">网监</span><span style="color:#01d9d9;">龚陈健</span></div>
              </div>
            </div>
         </div>
         <div class="zbcontentright jiaobackground flexc">
            <div style="margin-top:30px;width:100%;justify-content:space-around;" class="flexr">
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">政治处</span><span style="color:#01d9d9;">郭汝林</span></div>
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">纪检督察</span><span style="color:#01d9d9;">张锋</span></div>
            </div>
            <div style="margin-top:25px;width:100%;justify-content:space-around;" class="flexr">
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">办公室</span><span style="color:#01d9d9;">顾俊杰</span></div>
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">指挥中心</span><span style="color:#01d9d9;">李巍</span></div>
            </div>
            <div style="margin-top:25px;width:100%;justify-content:space-around;" class="flexr">
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">法制</span><span style="color:#01d9d9;">俞越</span></div>
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">出入境</span><span style="color:#01d9d9;">沈健</span></div>
            </div>
            <div style="margin-top:25px;width:100%;justify-content:space-around;" class="flexr">
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">国保</span><span style="color:#01d9d9;">朱新华</span></div>
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">经文保</span><span style="color:#01d9d9;">郁洪健</span></div>
            </div>
            <div style="margin-top:25px;width:100%;justify-content:space-around;" class="flexr">
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">刑侦</span><span style="color:#01d9d9;">施春伟</span></div>
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">经侦</span><span style="color:#01d9d9;">陆永刚</span></div>
            </div>
            <div style="margin-top:25px;width:100%;justify-content:space-around;" class="flexr">
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">治安</span><span style="color:#01d9d9;">卫凯凯</span></div>
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" />
                <div class="flexc"><span style="color:white;">巡特警</span><span style="color:#01d9d9;">周一奇</span></div>
            </div>
            <div style="margin-top:25px;width:100%;justify-content:flex-start;" class="flexr">
                <img src="@/assets/datascreen/qidong/fp1/icon_list.png" style="margin-left:5px;"/>
                <div class="flexc" style="margin-left:11px;"><span style="color:white;">水警</span><span style="color:#01d9d9;">杨晓锋</span></div>
            </div>
         </div>
     </div>
     <div class="bg_title flexr" style="margin-top:25px;">
        <span class="bg_title_span">警情状态</span>
     </div>
     <div style="height:calc(100% - 597px);margin-top:13px;position: relative;" class="flexr">
       <div class="jqcontentleft jiaobackground flexc">
         <div class="jqcontentlefttop flexc">
            <div style="color:#01d9d9;font-size:14px;height:21px;">今日案件受理情况统计</div>
            <div class="flexr" style="height:calc(100% - 21px);width:100%;" ref="jrslqktjchart">
              <!-- <div style="width:50%;"></div>
              <div style="width:50%;"></div> -->
            </div>
         </div>
         <div class="jqcontentleftbottom flexc">
           <div style="color:#01d9d9;font-size:14px;height:21px;">近7日案件受理情况</div>
           <div ref="j7rslqkchart" style="height:calc(100% - 21px);width:100%;"></div>
         </div>
       </div>
       <div class="jqcontentright flexc">
         <div class="jqcontentrighttop jiaobackground">
           <div class="flexr" style="justify-content: space-between;padding:5px 10px 0px 10px;">
             <div style="color:#01d9d9;font-size:14px;height:21px;">今日派出所接处警</div>
             <div style="color:white;background:#0c3359;padding:5px;">
               <span style="margin-right:10px;">接处警统计</span><span>接警</span><span style="color:#01d9d9;margin-right:10px;">{{pcsjjcount}}</span><span>处警</span><span style="color:yellow;">{{pcscjcount}}</span>
             </div>
           </div>
           <div style="width:100%;height:calc(100% - 33px);" ref="pcsjjzztchart"></div>
         </div>
         <div class="jqcontentrightbottom jiaobackground">
           <div class="flexr" style="justify-content: space-between;padding:5px 10px 0px 10px;">
             <div style="color:#01d9d9;font-size:14px;height:21px;">今日派出所各类警情受理</div>
             <div style="color:white;background:#0c3359;padding:5px;">
               <span>受理总量同比</span><span style="color:#01d9d9;">{{counttb}}</span></span>
             </div>
           </div>
           <div style="width:100%;height:calc(100% - 33px);position: relative;" class="flexr">
             <div style="width:20%;height:100%;" ref="pcsjj1chart"></div>
             <div style="width:20%;height:100%;" ref="pcsjj2chart"></div>
             <div style="width:20%;height:100%;" ref="pcsjj3chart"></div>
             <div style="width:20%;height:100%;" ref="pcsjj4chart"></div>
             <div style="width:20%;height:100%;" ref="pcsjj5chart"></div>
           </div>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: 'Screen3fp1',
  components:{},
  props:['screen'],
  data () {
    return {
      chartList:[],
      j7rslqkchart:null,
      pcsjjzztchart:null,
      pcsjj1chart:null,
      pcsjj2chart:null,
      pcsjj3chart:null,
      pcsjj4chart:null,
      pcsjj5chart:null,
      jrslqktjchart:null,
      todayajcount:0,
      yestodayajcount:0,
      ajxlist:[],
      ajylist:[],
      pcsnamelist:[],
      jjlist:[],
      cjlist:[],
      pcsjjcount:0,
      pcscjcount:0,
      zacount:0,
      jtcount:0,
      xfcount:0,
      qzcount:0,
      jfcount:0,
      jrcount:0,
      counttb:"0%",
      JlcountAndDeptList:[
        //         45	320681530000	汇龙镇派出所
        //         40	320681176100	城区一中队
        //         33	320681870000	吕四派出所
        //         28	320681550000	城西派出所
        //         23	320681660000	北新派出所
        //         23	320681720000	王鲍派出所
        //         22	320681160000	巡特警大队
        //         20	320681640000	开发区派出所
        //         19	320681750000	寅阳派出所
        //         17	320681860000	近海派出所 
        {"count":"45","deptname":"汇龙镇派出所","deptcode":"320681530000","leader":"赵中华","left":"50","top":"40"},
        {"count":"40","deptname":"合作中心派出所","deptcode":"320681176100","leader":"王根灵","left":"40","top":"20"},
        {"count":"33","deptname":"吕四派出所","deptcode":"320681870000","leader":"高国忠","left":"45","top":"-5"},
        {"count":"28","deptname":"城西派出所","deptcode":"320681550000","leader":"顾栩源","left":"45","top":"65"},
        {"count":"23","deptname":"北新派出所","deptcode":"320681660000","leader":"彭军华","left":"30","top":"60"},
        {"count":"23","deptname":"王鲍派出所","deptcode":"320681720000","leader":"姜建飞","left":"25","top":"25"},
        {"count":"22","deptname":"惠萍派出所","deptcode":"320681160000","leader":"沈东","left":"60","top":"60"},
        {"count":"20","deptname":"开发区派出所","deptcode":"320681640000","leader":"张来汇","left":"38","top":"45"},
        {"count":"19","deptname":"寅阳派出所","deptcode":"320681750000","leader":"陆安新","left":"70","top":"65"},
        {"count":"17","deptname":"近海派出所","deptcode":"320681860000","leader":"顾爽爽","left":"60","top":"25"},
      ],
    }
  },
  methods:{
    listenResize(){
      for(var i = 0;i<this.chartList.length;i++){
        this.chartList[i].resize();
      }
    },
    createJ7rslqkchart(){
      var option = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              top: '0%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              axisLine:{
                     lineStyle:{
                         color:'#558fc7'
                     }
                },
              axisLabel:{
                      color:'#ffffff'
              },
              splitLine:{
                  show:false
              }
          },
          yAxis: {
              type: 'category',
              data: this.ajxlist,
              axisLine:{
                     lineStyle:{
                       show:false,
                         color:'#558fc7'
                     }
                },
                axisLabel:{
                      color:'#21FFF1'
                },
          },
          series: [
              { // For shadow
                  type: 'bar',
                  itemStyle: {
                      color: '#12325e'
                  },
                  barGap: '-100%',
                  barCategoryGap: '40%',
                  data: [100,100,100,100,100,100,100,100],
                  animation: false
              },
              {
                  name: '2020年',
                  type: 'bar',
                  itemStyle: {
                      color: new this.echarts.graphic.LinearGradient(
                          1, 0, 0, 0,
                          [
                              {offset: 0, color: '#01bbf3'},
                              {offset: 1, color: '#003b6e'}
                          ]
                      )
                  },
                  data: this.ajylist
              }
          ]
      };
      this.j7rslqkchart.setOption(option);
    },
    createPcsjjzztchart(){
      var option = {
          tooltip: {
                trigger: 'axis'
            },
          xAxis: {
              type: 'category',
              data: this.pcsnamelist,
              axisLabel:{
                  color:'#ffffff'
              },
            axisLine:{
                lineStyle:{
                              color:'#558fc7'
                  }
                
            }
          },
          yAxis: {
              type: 'value',
              axisLabel:{
                  color:'#ffffff'
              },
              axisLine:{
                  show:false,
              },
              splitLine:{
                lineStyle:{
                  color:"#558fc7"
                }
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              top: '6',
              containLabel: true
          },
          series: [{
              data: this.jjlist,
              type: 'bar',
              itemStyle: {
                            color: new this.echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#f15d8c'},
                                    {offset: 1, color: '#7c4dcf'}
                                ]
                            )
                        },
              barCategoryGap: '70%',
              },
              {
              data: this.cjlist,
              type: 'bar',
              itemStyle: {
                            color: new this.echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#f15d8c'},
                                    {offset: 1, color: '#7c4dcf'}
                                ]
                            )
                        },
              barCategoryGap: '70%',
             }
          ]
      };
      this.pcsjjzztchart.setOption(option);
    },
    createPcsjj1chart(){
      var option = {
          series: [
              {
                  type: 'pie',
                  radius: ['70%', '90%'],
                  label: {
                      show: true,
                      position: 'center',
                      formatter:"治安\n"+Math.round(this.zacount/this.jrcount*10000)/100.00+'%',
                      color:'#3b86ff',
                      fontSize: 15,
                      fontFamily:'宋体'
                  },
                  itemStyle: {
                      normal: {
                      color: function(params) {
                              //自定义颜色
                              var colorList = [
                              '#3b86ff', '#12325e'
                              ];
                              return colorList[params.dataIndex]
                          }
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                      {value: this.zacount, name: '治安'},
                      {value: this.jrcount-this.zacount, name: '其他'}
                  ]
              }
          ]
      };
      this.pcsjj1chart.setOption(option);
    },
    createPcsjj2chart(){
      var option = {
          series: [
              {
                  type: 'pie',
                  radius: ['70%', '90%'],
                  label: {
                      show: true,
                      position: 'center',
                      formatter:"交通\n"+Math.round(this.jtcount/this.jrcount*10000)/100.00+'%',
                      color:'#1ec9fc',
                      fontSize: 15,
                      fontFamily:'宋体'
                  },
                  itemStyle: {
                      normal: {
                      color: function(params) {
                              //自定义颜色
                              var colorList = [
                              '#1ec9fc', '#12325e'
                              ];
                              return colorList[params.dataIndex]
                          }
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                      {value: this.jtcount, name: '交通'},
                      {value: this.jrcount-this.jtcount, name: '其他'}
                  ]
              }
          ]
      };
      this.pcsjj2chart.setOption(option);
    },
    createPcsjj3chart(){
      var option = {
          series: [
              {
                  type: 'pie',
                  radius: ['70%', '90%'],
                  label: {
                      show: true,
                      position: 'center',
                      formatter:"消防\n"+Math.round(this.xfcount/this.jrcount*10000)/100.00+'%',
                      color:'#ff3e3e',
                      fontSize: 15,
                      fontFamily:'宋体'
                  },
                  itemStyle: {
                      normal: {
                      color: function(params) {
                              //自定义颜色
                              var colorList = [
                              '#ff3e3e', '#12325e'
                              ];
                              return colorList[params.dataIndex]
                          }
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                      {value: this.xfcount, name: '消防'},
                      {value: this.jrcount-this.xfcount, name: '其他'}
                  ]
              }
          ]
      };
      this.pcsjj3chart.setOption(option);
    },
    createPcsjj4chart(){
      var option = {
          series: [
              {
                  type: 'pie',
                  radius: ['70%', '90%'],
                  label: {
                      show: true,
                      position: 'center',
                      formatter:"求助\n"+Math.round(this.qzcount/this.jrcount*10000)/100.00+'%',
                      color:'#fa6b36',
                      fontSize: 15,
                      fontFamily:'宋体'
                  },
                  itemStyle: {
                      normal: {
                      color: function(params) {
                              //自定义颜色
                              var colorList = [
                              '#fa6b36', '#12325e'
                              ];
                              return colorList[params.dataIndex]
                          }
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                      {value: this.qzcount, name: '求助'},
                      {value: this.jrcount-this.qzcount, name: '其他'}
                  ]
              }
          ]
      };
      this.pcsjj4chart.setOption(option);
    },
    createPcsjj5chart(){
       var option = {
          series: [
              {
                  type: 'pie',
                  radius: ['70%', '90%'],
                  label: {
                      show: true,
                      position: 'center',
                      formatter:"纠纷\n"+Math.round(this.jfcount/this.jrcount*10000)/100.00+'%',
                      color:'#8c7cfc',
                      fontSize: 15,
                      fontFamily:'宋体'
                  },
                  itemStyle: {
                      normal: {
                      color: function(params) {
                              //自定义颜色
                              var colorList = [
                              '#8c7cfc', '#12325e'
                              ];
                              return colorList[params.dataIndex]
                          }
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                      {value: this.jfcount, name: '纠纷'},
                      {value: this.jrcount-this.jfcount, name: '其他'}
                  ]
              }
          ]
      };
      this.pcsjj5chart.setOption(option);
    },
    createJrslqktjchart(){
      var option = {
          series : [
              {
                  type: 'pie',
                  radius : '60%',
                  center: ['50%', '50%'],
                  data:[
                      {value:this.todayajcount, name:'今日办理量'},
                      {value:this.yestodayajcount, name:'昨日办理量'},
                  ],
                  label: {
                      show: true,
                      formatter:"{b}\n{c}件",
                  },
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      },
                      normal: {
                      color: function(params) {
                              //自定义颜色
                              var colorList = [
                              '#e6a868', '#94c8f2'
                              ];
                              return colorList[params.dataIndex]
                          }
                      }
                  }
              }
          ]
      };
      this.jrslqktjchart.setOption(option);
    },
    getAjtj(){
       this.http.get("/datascreen/getAjTj",null,this.getAjtjCallBack,this,false);
    },
    getAjtjCallBack(result){
       this.todayajcount = result[result.length-1].y;
       this.yestodayajcount = result[result.length-2].y;
       for(var i=0;i<result.length;i++){
           var ajx = result[i].x;
           this.ajxlist.push(ajx);
           var ajy = result[i].y;
           this.ajylist.push(ajy);
       }
       this.createJ7rslqkchart();
       this.createJrslqktjchart();
    },
    getPcsTj(){
        this.http.get("/datascreen/getPcsJcjTj",null,this.getPcsTjCallBack,this,false);
    },
    getPcsTjCallBack(result){
       this.pcsjjcount = result.jjcount;
       this.pcscjcount = result.cjcount;
       var pcslist = result.pcslist;
       for(var i=0;i<pcslist.length;i++){
            var name = pcslist[i].name;
            if(!pcslist[i].jjcount&&!pcslist[i].cjcount){
                continue;
            }
            var pcsjjcount = 0;
            var pcscjcount = 0;
            if(pcslist[i].jjcount){
               pcsjjcount = pcslist[i].jjcount;
            }
            if(pcslist[i].cjcount){
               pcscjcount = pcslist[i].cjcount;
            }
            this.jjlist.push(pcsjjcount);
            this.cjlist.push(pcscjcount);
            this.pcsnamelist.push(name);
       }
       this.createPcsjjzztchart();
    },
    getJqLbTj(){
        this.http.get("/datascreen/getJqLbTj",null,this.getJqLbTjCallBack,this,false);
    },
    getJqLbTjCallBack(result){
       this.zacount = result.zacount;
       this.jtcount = result.jtcount;
       this.xfcount = result.xfcount;
       this.qzcount = result.qzcount;
       this.jfcount = result.jfcount;
       this.jrcount = result.todaycount;
       var yestoday = result.yestodaycount;
    //    var yestoday = 200;
       this.counttb = Math.round(this.jrcount/yestoday*10000)/100.00+'%';
       this.createPcsjj1chart();
       this.createPcsjj2chart();
       this.createPcsjj3chart();
       this.createPcsjj4chart();
       this.createPcsjj5chart();
    }
  },
  mounted(){
    this.j7rslqkchart = this.echarts.init(this.$refs.j7rslqkchart);
    // this.createJ7rslqkchart();
    this.getAjtj();
    this.getPcsTj();
    this.getJqLbTj();
    this.chartList.push(this.j7rslqkchart);
    this.pcsjjzztchart = this.echarts.init(this.$refs.pcsjjzztchart);
    // this.createPcsjjzztchart();
    this.chartList.push(this.pcsjjzztchart);

    this.pcsjj1chart = this.echarts.init(this.$refs.pcsjj1chart);
    // this.createPcsjj1chart();
    this.chartList.push(this.pcsjj1chart);
    this.pcsjj2chart = this.echarts.init(this.$refs.pcsjj2chart);
    // this.createPcsjj2chart();
    this.chartList.push(this.pcsjj2chart);
    this.pcsjj3chart = this.echarts.init(this.$refs.pcsjj3chart);
    // this.createPcsjj3chart();
    this.chartList.push(this.pcsjj3chart);
    this.pcsjj4chart = this.echarts.init(this.$refs.pcsjj4chart);
    // this.createPcsjj4chart();
    this.chartList.push(this.pcsjj4chart);
    this.pcsjj5chart = this.echarts.init(this.$refs.pcsjj5chart);
    // this.createPcsjj5chart();
    this.chartList.push(this.pcsjj5chart);

    this.jrslqktjchart = this.echarts.init(this.$refs.jrslqktjchart);
    // this.createJrslqktjchart();
    this.chartList.push(this.jrslqktjchart);
    window.addEventListener('resize',this.listenResize);
  },
  beforeDestroy(){
  },
  watch : {
      screen:function(val) {
          if(val==1){
              this.listenResize();
          }
      }
  }
}
</script>

<style scoped>
.Screen3fp1{
  position: relative;
  width: 100%;
  overflow:hidden;
  height: 100%;
  background:url(./../../../assets/datascreen/qidong/fp1/bgimg.png) no-repeat;
  background-size:100% 100%;
  z-index: -1;
  padding: 0px 8px 8px 8px;
}
.bg_title{
  position: relative;
  width: 100%;
  height: 52px;
  background:url(./../../../assets/datascreen/qidong/fp1/logo_bg.png) no-repeat;
  background-size:100% 100%;
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
.zbcontent{
    position: relative;
    height: 448px;
    width:100%;
    margin-top:7px;
}
.zbcontentleft{
    position: relative;
    width: 150px;
    height:100%;
    box-shadow: inset 0px 0px 46px 0px rgba(18,146,255,0.16);
}
.zbcontentcenter{
    position: relative;
    margin-left: 10px;
    margin-right:10px;
    width: calc(100% - 320px);
    height:100%;
}
.zbcontentcentertop{
  position: relative;
  margin-top: 10px;
  height: calc(100% - 50px - 10px - 77px);
  background:url(./../../../assets/datascreen/qidong/fp1/map.png) no-repeat center;
  background-size:auto 100%;
}
.zbcontentcenterbottom{
  margin-top: 77px;
  height: 50px;
}
.zbcontentright{
    position: relative;
    width: 170px;
    height:100%;
    box-shadow: inset 0px 0px 46px 0px rgba(18,146,255,0.16);
    justify-content: flex-start;
}
.jiaobackground{
  background-image: url(./../../../assets/datascreen/qidong/fp1/bg_jiao01.png),url(./../../../assets/datascreen/qidong/fp1/bg_jiao02.png),url(./../../../assets/datascreen/qidong/fp1/bg_jiao03.png),url(./../../../assets/datascreen/qidong/fp1/bg_jiao04.png);
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-position: top left, top right, bottom left, bottom right;
}
.zbcontentleftDiv{
  height:112px;
  background:url(./../../../assets/datascreen/qidong/fp1/line.png) no-repeat;
  background-position:50% 110%;
  justify-content: flex-start;
}
.zbcontentleftDiv2{
  height:112px;
  justify-content: flex-start;
}
.maptc{
  position:absolute;
  background:url(./../../../assets/datascreen/qidong/fp1/map_tc.png) no-repeat;
  background-size:100% 100%;
  padding: 5px;
}

.jqcontentleft{
    position: relative;
    width: 32%;
    height:100%;
    box-shadow: inset 0px 0px 46px 0px rgba(18,146,255,0.16);
}
.jqcontentright{
    margin-left:10px;
    position: relative;
    width: calc(68% - 10px);
    height:100%;
}
.jqcontentrighttop{
    position: relative;
    width: 100%;
    height:58%;
    box-shadow: inset 0px 0px 46px 0px rgba(18,146,255,0.16);
}
.jqcontentrightbottom{
    margin-top:8px;
    position: relative;
    width: 100%;
    height:calc(42% - 8px);
    box-shadow: inset 0px 0px 46px 0px rgba(18,146,255,0.16);
}
.jqcontentlefttop{
  position: relative;
  height:50%;
  width:100%;
  background:url(./../../../assets/datascreen/qidong/fp1/line_chang.png) no-repeat;
  background-position:50% 110%;
}
.jqcontentleftbottom{
  position: relative;
  height:50%;
  width:100%;
}
</style>
