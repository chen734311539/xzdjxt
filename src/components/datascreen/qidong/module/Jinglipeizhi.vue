<template>
  <div class="jinglipeizhiPanel">
        <div class="titleDiv"><span>警力配置</span></div>
        <div class="contentDiv">
          <div class="tubiao">
              <div class="flexc">
                <img src="@/assets/datascreen/qidong/jlpz/zjl.png" style="width:17px;height:19px;"/>
                <div style="color:#16ffff;font-size:12px;">在岗总警力</div>
                <div style="color:#83a5d4;font-size:12px;"><span class="jlnum">2</span><span class="jlnum">2</span><span class="jlnum">4</span><span class="jlnum">4</span>人</div>
              </div>
              <div class="flexc">
                <img src="@/assets/datascreen/qidong/jlpz/mj.png" style="width:17px;height:19px;"/>
                <div style="color:#16ffff;font-size:12px;">在岗民警</div>
                <div style="color:#83a5d4;font-size:12px;"><span class="jlnum">8</span><span class="jlnum">4</span><span class="jlnum">7</span>人</div>
              </div>
              <div class="flexc">
                <img src="@/assets/datascreen/qidong/jlpz/fj.png" style="width:17px;height:19px;"/>
                <div style="color:#16ffff;font-size:12px;">巡逻辅警</div>
                <div style="color:#83a5d4;font-size:12px;"><span class="jlnum">1</span><span class="jlnum">3</span><span class="jlnum">9</span><span class="jlnum">7</span>人</div>
              </div>
          </div>
          <div class="contentImgDiv">
              <div class="flexc" style="width:80px;">
                <div class="flexc">
                  <div class="contentlefttitle"><span></span>全市人口</div>
                  <div class="contentleftdesc"><div class="contentleftdescnum">119</div><div>万</div></div>
                </div>
                <div>
                  <div class="contentlefttitle"><span></span>警力占比</div>
                  <div class="contentleftdesc"><div class="contentleftdescnum">1.9</div><div>‰</div></div>
                </div>
              </div>
              <div ref="jlCharts" style="height:calc(100%);width:calc(100% - 80px);"></div>
          </div>
        </div>
        
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Jinglipeizhi',
  components:{},
  data () {
    return {
      jlchart:null
    }
  },
  computed:mapState({
  }),
  methods:{
    createJlCharts(){
      this.jlchart = this.echarts.init(this.$refs.jlCharts);
      var option = {
          legend: {
              orient: 'vertical',
              x: 'left',
              top:'middle',
              data:['民警','辅警'],
              textStyle:{
                  color:'#fff'
              }
          },
          series: [
              {
                  name:'警力配置',
                  type:'pie',
                  radius: ['30%', '70%'],
                  center: ['65%', '50%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: true,
                          position: 'inside',
                          formatter:'{d}',
                          fontSize:16,
                          color:'#fff',
                          backgroundColor:'rgba(0,0,0,0.2)',
                          borderRadius:100,
                          padding: 4
                      }
                  },
                  data:[
                      {value:38, name:'民警'},
                      {value:62, name:'辅警'}
                  ]
              },
              {
                  name:'警力配置',
                  type:'pie',
                  radius: ['30%', '70%'],
                  center: ['65%', '50%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: true,
                          position: 'center',
                          formatter:'%',
                          fontSize:18,
                          color:'#fff'
                      }
                  },
                  data:[
                      {value:38, name:'民警'},
                      {value:62, name:'辅警'}
                  ]
              }
          ]
      };
      this.jlchart.setOption(option);
    }
  },
  mounted(){
    this.createJlCharts();
    this.chartList.push(this.jlchart);
  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.jinglipeizhiPanel{
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
  display: flex;
  align-items: center;
  justify-content:space-around;
  flex-direction: row;
  /* margin-top:10px; */
  height: calc(100% - 65px);
  overflow: hidden;
  user-select: none;
}
.tubiao{
  width: 100%;
  height: 65px;
  display: flex;
  justify-content:space-around;
  align-items:flex-start;
}
.jlnum{
  color: white;
  font-size: 18px;
  font-family:Digitalt; 
  margin-left: 4px;
}
.contentlefttitle{
  color: white;
  font-size: 14px;
  display: flex;
  justify-content:center;
  align-items:center;
}
.contentlefttitle span{
  width: 8px;
  height: 8px;
  background: #12659c;
  display: block;
  border: 1px solid #16ffff;
  margin-right: 5px;
}
.contentleftdesc{
  color: white;
  font-size: 14px;
  display: flex;
  justify-content:center;
  align-items:center;
}
.contentleftdescnum{
  color: yellow;
  font-size: 22px;
  font-family: Digitalt;
}
</style>
