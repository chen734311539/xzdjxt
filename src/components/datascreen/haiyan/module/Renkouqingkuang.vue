<template>
  <div class="renkouqingkuangPanel">
        <div class="titleDiv"><span>人口情况</span></div>
        <div class="contentDiv">
          <div ref="title" style="overflow: hidden;">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="contentText">海盐县下辖4街道、5镇，陆地面积534.73平方公里，江口海湾面积537.90平方公里。2010年第六次全国人口普查，全县常住人口为43.09万人。</span>
          </div>
          <div ref="content" class="contentImgDiv">
              <div class="charttitle">
                <span style="width:5px;height:5px;border-radius:50%;background-color:rgb(17,255,255);display:block;margin-right:5px;"></span>
                2014-2018年海盐实际居住人口数量
              </div>
              <div class="chartytitle">(单位:万)</div>
              <div ref="rkCharts" style="height:calc(100% - 18px);width:100%;"></div>
          </div>
        </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Renkouqingkuang',
  components:{},
  data () {
    return {
      rkchart:null
    }
  },
  computed:mapState({
  }),
  methods:{
    createRkCharts(){
      this.rkchart = this.echarts.init(this.$refs.rkCharts);
      var option = {
              tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  },
                  top:'0px'
              },
              legend: {
                  data: ['常住人口', '暂住人口'],
                  textStyle:{
                      color:'#fff'
                  }
              },
              grid: {
                  top:'25px',
                  left: '0%',
                  right: '0%',
                  bottom: '0%',
                  containLabel: true
              },
              yAxis:  {
                  type: 'value',
                  axisLabel :{
                      color:'#fff'
                  }
              },
              xAxis: {
                  type: 'category',
                  data: ['2014','2015','2016','2017','2018'],
                  axisLabel :{
                      color:'#fff'
                  }
              },
              series: [
                  {
                      name: '常住人口',
                      type: 'bar',
                      stack: '总量',
                      barWidth:'50%',
                      itemStyle:{
                          color:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(4,6,80,.66)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(16, 71, 122, 0.66)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                      },
                      label: {
                          normal: {
                              show: true,
                              position: 'inside',
                              fontSize:14,
                              color:'yellow',
                              fontFamily:'微软雅黑'
                          }
                      },
                      data: [41, 42, 43, 42, 43]
                  },
                  {
                      name: '暂住人口',
                      type: 'bar',
                      stack: '总量',
                      barWidth:'50%',
                      itemStyle:{
                          color:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(17,255,255,0.8)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(17,255,255,0.4)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                      },
                      label: {
                          normal: {
                              show: true,
                              position: 'inside',
                              fontSize:14,
                              color:'yellow',
                              fontFamily:'微软雅黑'
                          }
                      },
                      data: [8, 9, 8, 9, 9]
                  }
              ]
          };
        this.rkchart.setOption(option);
    }
  },
  mounted(){
    var titleHeight = this.$refs.title.scrollHeight;
    $(this.$refs.content).height("calc(100% - "+titleHeight+"px)")
    this.createRkCharts();
    this.chartList.push(this.rkchart);
  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.renkouqingkuangPanel{
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
  width: 100%;
  height: 88.4615%;
  padding: 10px 5px 5px 5px;
  overflow: hidden;
  user-select: none;
}
.contentText{
  color: rgb(130,192,251);
  font-size: 12px;
}
.contentImgDiv{
  width: 100%;
  position: relative;
  overflow: hidden;
}
.charttitle{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 100%;
  font-size: 12px;
  text-align: center;
  user-select: none;
}
.chartytitle{
  position: absolute;
  color: rgb(130,192,251);
  font-size: 12px;
  top:20px;
  left: 0px;
}

</style>
