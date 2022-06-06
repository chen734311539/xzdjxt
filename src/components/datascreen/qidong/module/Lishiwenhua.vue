<template>
  <div class="lishiwenhuaPanel">
        <div class="titleDiv"><span>历史文化</span></div>
        <div class="contentDiv">
          <div class="huajuan">
            <img src="@/assets/datascreen/qidong/lswh/history.png" class="imgclass"/>
            <div class="huajuandesc">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              启东市地处万里长江入海口北侧，因沙洲不断向东延伸，便由“启吾东疆”之意而得名。启东全境系长江口不同时期河相、海相沉积平原。汉朝以前为江口海域。唐初，长江口涨出东洲、布洲。
            </div>
          </div>
          <div ref="p1" v-show="currentpeople==1" class="lishirenwudiv">
            <div  style="margin-right:10px;transition:all 0.3;"><img src="@/assets/datascreen/qidong/lswh/zhangclmu.jpg" style="height:100px;width:60px;"/></div>
            <div  style="color:white;font-size:12px;">
              <span style="color:yellow;">张成龙</span>
              (1775-1847) 字云岩，原籍崇明，后移居启东市聚南乡。1834年任京口（镇江）水师将。1837年调浙江黄岩镇总兵。1840年鸦片战争爆发，张成龙由林则徐力荐，道光皇帝传旨，令张成龙担任阳江镇总兵。
            </div>
          </div>
          <div ref="p2" v-show="currentpeople==2" class="lishirenwudiv">
            <div style="margin-right:10px;"><img src="@/assets/datascreen/qidong/lswh/shayuzhaoshj.jpg" style="height:100px;width:100px;"/></div>
            <div style="color:white;font-size:12px;">
              <span style="color:yellow;">沙玉沼</span>
              (1845～1927)，字鉴渠。其书承王羲之父子、赵孟 、董其昌诸家之长，草书得王氏父子遗韵，行书颇似康熙，稳健遒媚，造诣较深。
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
  name: 'Lishiwenhua',
  components:{},
  data () {
    return {
        currentpeople:1,
        perpletimmer:null
    }
  },
  computed:mapState({
  }),
  methods:{
    createTimmer(){
      var that = this;
      this.perpletimmer = setInterval(() => {
        $(that.$refs.p1).css("right","");
        $(that.$refs.p1).css("left","");
        $(that.$refs.p2).css("right","");
        $(that.$refs.p2).css("left","");
        if(that.currentpeople==1){
          $(that.$refs.p1).animate({right:"100%"},function(){
            $(that.$refs.p2).css("left","100%");
            that.currentpeople = 2;
            $(that.$refs.p2).animate({left:"0%"})
          });
        }else{
           $(that.$refs.p2).animate({right:"100%"},function(){
            $(that.$refs.p1).css("left","100%");
            that.currentpeople = 1;
            $(that.$refs.p1).animate({left:"0%"})
          });
        }
      }, 5000);
    }
  },
  mounted(){
    this.createTimmer();
  },
  beforeDestroy(){
    if(this.perpletimmer!=null){
      clearInterval(this.perpletimmer);
    }
  }
}
</script>

<style scoped>
.lishiwenhuaPanel{
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
.huajuan{
  width: 100%;
  height: 100px;
  position: relative;
  overflow: hidden;
}
.imgclass{
  width: 100%;
  height: 100%;
}
.huajuandesc{
  position:absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  font-size: 12px;
  color:white;
  padding-left: 25px;
  padding-top: 5px;
}
.lishirenwudiv{
  position: relative;
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
