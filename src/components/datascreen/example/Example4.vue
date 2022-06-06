<template>
  <div class="panel">
      <div class="gonganrili box">
        <div class="titleDiv">公安日历</div>
        <div class="contentDiv gonganriliContent">
            <div style="height:100%;width:calc(100% - 150px);float:left;">
              <!-- <el-calendar v-model="calendarDate">
              </el-calendar> -->
            </div>
            <div style="height:100%;width:150px;float:left;border-left:3px solid rgba(49,86,128);background:rgba(16,37,66,0.5);" class="flexc">
                <div style="font-size: 18px;color:yellow;width:100%;text-align:center;">距某某</div>
                <div style="font-size: 18px;color:yellow;width:100%;text-align:center;">（下一个）</div>
                <div style="font-size: 18px;color:yellow;width:100%;text-align:center;">敏感日还有XX天</div>
            </div>
        </div>
      </div>
      <div class="jinrizhongdianguanzhu box">
        <div class="titleDiv">今日重点关注</div>
        <div class="contentDiv">
            <div class="jinrizhongdianguanzhuItem">
                <div class="jinrizhongdianguanzhuItemNum">1</div>
                <div class="jinrizhongdianguanzhuItemDesc">可能影响省党代表大会的不稳定因素；</div>
            </div>
            <div class="jinrizhongdianguanzhuItem">
                <div class="jinrizhongdianguanzhuItemNum">2</div>
                <div class="jinrizhongdianguanzhuItemDesc"><span>为进一步做好原8023部队退役人员有关工作，按照党中央、国务院的指示精神，现将有关问题通知如下：</span></div>
            </div>
            <div class="jinrizhongdianguanzhuItem"></div>
            <div class="jinrizhongdianguanzhuItem"></div>
        </div>
      </div>
      <div class="xinxishishifabu box">
        <div class="titleDiv">信息实时发布</div>
      </div>

      <div class="jinriwendianfabu box">
        <div class="titleDiv">今日文电发布</div>
      </div>
      <div class="zhongjian2">
          <div class="jinrijiebaoxinxi box">
            <div class="titleDiv">今日接报信息</div>
          </div>
          <div class="xinwenyuqinbobao box">
            <div class="titleDiv">新闻舆情播报</div>
          </div>
      </div>
      <div class="wangluoyuqingfenxi box">
        <div class="titleDiv">网络舆情分析</div>
      </div>

      <div class="datingyujingzhiling box">
        <div class="titleDiv">大厅预警指令</div>
      </div>
      <div class="bumenyujingzhiling box">
        <div class="titleDiv">部门预警指令</div>
      </div>
      <div class="geshiyujingzhiling box">
        <div class="titleDiv">各市预警指令</div>
      </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: 'Example4',
  components:{},
  data () {
    return {
      calendarDate:new Date()
    }
  },
  computed:mapState({
  }),
  methods:{

  },
  mounted(){

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
.gonganrili{
  position:absolute;
  left: 5px;
  top: 0px;
  width: 32%;
  height: 32%;
}
.xinxishishifabu{
  position:absolute;
  right: 5px;
  top: 0px;
  width: 32%;
  height: 32%;
}
.jinrizhongdianguanzhu{
  position:absolute;
  right: calc(32% + 10px);
  left:calc(32% + 10px);
  top: 0px;
  height: 32%;
}

.jinriwendianfabu{
  position:absolute;
  left: 5px;
  top: calc(32% + 5px);
  bottom: calc(32% + 10px);
  width: 24%;
}
.wangluoyuqingfenxi{
  position:absolute;
  right: 5px;
  top: calc(32% + 5px);
  bottom: calc(32% + 10px);
  width: 24%;
}
.zhongjian2{
  position:absolute;
  left: calc(24% + 10px);
  right: calc(24% + 10px);
  top: calc(32% + 5px);
  bottom: calc(32% + 10px);
}
.jinrijiebaoxinxi{
  position:absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: calc(50% - 2.5px);
}
.xinwenyuqinbobao{
  position:absolute;
  right: 0px;
  top: 0px;
  height: 100%;
  width: calc(50% - 2.5px);
}


.datingyujingzhiling{
  position:absolute;
  left: 5px;
  bottom: 5px;
  width: 32%;
  height: 32%;
}
.geshiyujingzhiling{
  position:absolute;
  right: 5px;
  bottom: 5px;
  width: 32%;
  height: 32%;
}
.bumenyujingzhiling{
  position:absolute;
  right: calc(32% + 10px);
  left:calc(32% + 10px);
  bottom: 5px;
  height: 32%;
}

.titleDiv{
  height: 35px;
  width: 100%;
  line-height: 35px;
  color: white;
  text-align: center;
  font-size:18px;
  background:url(./../../../assets/datascreen/example/titlebj.jpg) center no-repeat;
  background-size:110% 110%;
  user-select: none;
}
.box{
  border: 3px solid rgba(21,68,112);
  border-radius: 5px;
}
.contentDiv{
  width: calc(100% - 6px);
  height: calc(100% - 35px - 6px);
  margin: 3px;
}

.gonganriliContent{
  clear: both;
  border: 2px solid rgba(49,86,128);
}

.jinrizhongdianguanzhuItem{
  position: relative;
  width: calc(100% - 20px);
  height:calc(25% - 12.5px);
  line-height:calc(25% - 12.5px);
  background:rgba(16,37,66,0.7);
  margin: 10px;
  border: 1px solid rgba(49,86,128);
  padding: 5px 5px 5px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
}
.jinrizhongdianguanzhuItemNum{
  height: 100%;
  width: 50px;
  color: yellow;
  font-size: 20px;
  border-right: 3px solid rgba(49,86,128);
  display: flex;
  align-items: center;
  justify-content: center;
}
.jinrizhongdianguanzhuItemDesc{
  height: 100%;
  width: calc(100% - 50px);
  color: rgb(114,191,211);
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 20px;
}
</style>
