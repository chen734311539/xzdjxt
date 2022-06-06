<template>
  <div class="gonganrongyuPanel">
        <div class="titleDiv"><span>公安绩效</span></div>
        <div class="contentDiv flexr">
            <div class="chartClass">
              <div ref="mapchart" style="width:100%;height:100%;"></div>
            </div>
            <div class="textDiv flexc">
                <!-- <marquee  direction="up" height="100%"> -->
                <div class="textItemDiv" style="font-size:16px;">2019年旺庄派出所绩效</div>
                <div class="textItemDiv">刑事案件<span class="textkey">999</span>起。</div>
                <div class="textItemDiv">治安案件<span class="textkey">2260</span>起。</div>
                <div class="textItemDiv">调解矛盾<span class="textkey">960</span>起。</div>
                <div class="textItemDiv">办理各类案件<span class="textkey">203</span>起。</div>
                <div class="textItemDiv">网上舆情发现数<span class="textkey">56</span>起。</div>
                <div class="textItemDiv">12345办理数<span class="textkey">215</span>起。</div>
               <!-- </marquee> -->
            </div>
        </div>
        
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Gonganrongyu',
  components:{},
  data () {
    return {
      mapchart:null
    }
  },
  computed:mapState({
  }),
  methods:{
  },
  mounted(){
          this.mapchart = this.echarts.init(this.$refs.mapchart);
          var legendList = ['刑事案件','治安案件','调解矛盾','办理各类案件','网上舆情发现数','12345办理数'];
        // for(var i = 0;i<data.length;i++){
        //   data[i].value = data[i].count;
        //   legendList.push(data[i].name);
        // }
        var obj = {value:3};
        var data=[{name:"刑事案件",value:999},{name:"治安案件",value:2260},{name:"调解矛盾",value:960},{name:"办理各类案件",value:203},{name:"网上舆情发现数",value:56},{name:"12345办理数",value:215}];
        var option = {
          tooltip: {
                    show: true,
                    formatter: "{a} <br/>{b} : {c}<br/>占总数{d}%",
                },
          legend: {
              orient: 'vertical',
              left:'right',
              top:'middle',
              data:legendList,
              textStyle:{
                  color:'#fff'
              }
          },
          series: [
              {
                  name:'单位统计',
                  type:'pie',
                  radius: '95%',
                  center: ['35%', '50%'],
                  avoidLabelOverlap: true,
                  label: {
                      normal: {
                          show: true,
                          position: 'inside',
                          // formatter:function(params){
                          //   return params.data.remark+"\\n数量:"+params.value;
                          // },
                          formatter:'{c}({d}%)',
                          fontSize:14,
                          color:'#fff',
                          backgroundColor:'rgba(0,0,0,0.2)',
                          borderRadius:100,
                          padding: 4 
                      }
                  },
                  data:data
              }
            ]
        };
          this.mapchart.setOption(option);
          this.chartList.push(this.mapchart);
  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.gonganrongyuPanel{
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
  user-select: none;
}
/* .jiang1{
  position:absolute;
  left: 6%;
  top:20%;
  width: 20%;
  height: 20%;
}
.jiang2{
  position:absolute;
  left: 20%;
  top:45%;
  width: 20%;
  height: 20%;
}
.jiang3{
  position:absolute;
  left: 34%;
  top:70%;
  width: 20%;
  height: 20%;
}
.textPanel{
  position:absolute;
  bottom: 0%;
  right: 0px;
  height: 88.4615%;
  width: 45%;
}
.textdiv{
  z-index: 3;
  position:absolute;
  color:white;
  font-size:12px;
  left: 22%;
}
.textdiv span{
  color: yellow;
} */
.chartClass{
  height: 100%;
  width: 60%;
}
.textDiv{
  width:40%;
  height: 100%;
}
.textItemDiv{
  color: white;
  font-size: 14px;
  margin-left: 10px;
}
.textkey{
  color: yellow;
  font-size: 18px;
}
</style>
