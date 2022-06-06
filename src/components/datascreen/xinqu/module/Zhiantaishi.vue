<template>
  <div class="zhiantaishiPanel">
        <div class="titleDiv"><span>治安态势</span></div>
        <div class="contentDiv flexr">
          <div class="chartDiv">
            <div class="charttitle flexr">
              <span></span>警情趋势
            </div>
            <div ref="chart1" style="width:100%;height:calc(100% - 20px);"></div>
            <div class="danwei">千起</div>
          </div>
          <div class="chartDiv">
            <div class="charttitle flexr">
              <span></span>案件趋势
            </div>
            <div ref="chart2" style="width:100%;height:calc(100% - 20px);"></div>
            <div class="danwei">起</div>
          </div>
          <div class="chartDiv">
            <div class="charttitle flexr">
              <span></span>打处绩效
            </div>
            <div ref="chart3" style="width:100%;height:calc(100% - 20px);"></div>
            <div class="danwei" style="margin-left:10px;">起</div>
          </div>
        </div>
        
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Zhiantaishi',
  components:{},
  data () {
    return {
      jqqschart:null,
      ajqschart:null,
      dcjxchart:null
    }
  },
  computed:mapState({
  }),
  methods:{
    createJqqs(){
      this.jqqschart = this.echarts.init(this.$refs.chart1);
      var option = {
          tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                top:'0px'
          },
          grid:{
            left:'25',
            right:'0',
            bottom:'30',
            top:'20'
          },
          legend: {
                data: ['总警情', '违法犯罪'],
                textStyle:{
                    color:'#fff'
                }
            },
          xAxis: {
              type: 'category',
              axisLabel :{
                color:'#fff'
              },
              data: ['17年', '18年', '19年']
          },
          yAxis: {
              type: 'value',
              axisLabel :{
                      color:'#fff'
              }
          },
          series: [{
              name:'总警情',
              data: [15.8, 16.4, 19.7],
              type: 'line'
          },
          {
              name:'违法犯罪',
              data: [2.1, 2.2, 2.5],
              type: 'line'
          }]
      };
      this.jqqschart.setOption(option);
    },
    createAjqs(){
      this.ajqschart = this.echarts.init(this.$refs.chart2);
      var option = {
          tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                top:'0px'
          },
          grid:{
            left:'45',
            right:'0',
            bottom:'30',
            top:'20'
          },
          legend: {
                data: ['刑事案件', '治安案件'],
                textStyle:{
                    color:'#fff'
                }
            },
          xAxis: {
              type: 'category',
              axisLabel :{
                color:'#fff'
              },
              data: ['17年', '18年', '19年']
          },
          yAxis: {
              type: 'value',
              axisLabel :{
                      color:'#fff'
              }
          },
          series: [{
              name:'刑事案件',
              data: [831, 873, 999],
              type: 'line'
          },
          {
              name:'治安案件',
              data: [2065, 2180, 2260],
              type: 'line'
          }]
      };
      this.ajqschart.setOption(option);
    },
    createDcjx(){
      this.dcjxchart = this.echarts.init(this.$refs.chart3);
      // var option = {
      //     tooltip : {
      //           trigger: 'axis',
      //           axisPointer : {            // 坐标轴指示器，坐标轴触发有效
      //               type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      //           },
      //           top:'0px'
      //     },
      //     grid:{
      //       left:'30',
      //       right:'0',
      //       bottom:'30',
      //       top:'20'
      //     },
      //     xAxis: {
      //         type: 'category',
      //         axisLabel :{
      //           color:'#fff'
      //         },
      //         data: ['14年', '15年', '16年','17年','18年']
      //     },
      //     yAxis: {
      //         type: 'value',
      //         min:'dataMin',
      //         axisLabel :{
      //                 color:'#fff'
      //         }
      //     },
      //     series: [{
      //         name:'打处绩效',
      //         data: [538,550, 564,570,585],
      //         type: 'line'
      //     }]
      // };
      var option = {
          tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                top:'0px'
          },
          grid:{
            left:'35',
            right:'0',
            bottom:'30',
            top:'20'
          },
          legend: {
                data: ['调解矛盾', '各类案件'],
                textStyle:{
                    color:'#fff'
                }
            },
          xAxis: {
              type: 'category',
              axisLabel :{
                color:'#fff'
              },
              data: ['17年', '18年', '19年']
          },
          yAxis: {
              type: 'value',
              axisLabel :{
                      color:'#fff'
              }
          },
          series: [{
              name:'调解矛盾',
              data: [895, 913, 960],
              type: 'line'
          },
          {
              name:'各类案件',
              data: [175, 187, 203],
              type: 'line'
          }]
      };
      this.dcjxchart.setOption(option);
    }
  },
  mounted(){
    this.createJqqs();
    this.chartList.push(this.jqqschart);
    this.createAjqs();
    this.chartList.push(this.ajqschart);
    this.createDcjx();
    this.chartList.push(this.dcjxchart);
  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.zhiantaishiPanel{
  position: relative;
  width: 100%;
  height: 100%;
}
.titleDiv{
  height: 11.5385%;
  color: rgb(17,255,255);
  font-family: SimHei;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  user-select: none;
  margin-left: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: start;
}
.titleDiv span{
  margin-left:15px;
}
.contentDiv{
  position: relative;
  width: 100%;
  height: 88.4615%;
  /* padding: 10px 5px 5px 5px; */
  overflow: hidden;
  user-select: none;
}
.chartDiv{
  position: relative;
  width: 33%;
  height:100%;
}
.charttitle{
  height: 20px;
  width: 100%;
  color: white;
  font-size: 12px;
}
.charttitle span{
  width: 5px;
  height: 5px;
  display: block;
  border-radius: 50%;
  background: #00ffff;
  margin-right: 5px;
}
.danwei{
  position:absolute;
  color: rgb(135,170,225);
  font-size: 12px;
  top:14px;
  left:0px;
}
</style>
