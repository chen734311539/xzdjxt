<template>
  <div class="lishiwenhuaPanel">
        <div class="titleDiv"><span>历史文化</span></div>
        <div class="contentDiv">
          <div class="huajuan">
            <img src="@/assets/datascreen/qidong/lswh/history.png" class="imgclass"/>
            <div class="huajuandesc">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              海盐地处沿海，生产食盐。《太平寰宇记》卷九十五“海盐县（南九十里原十乡）本吴郡武原乡。秦置海盐县，汉因之，属会稽郡。又按（吴君记）云，海滨广 斥，盐田相望，即海盐与盐官之地同也。”
            </div>
          </div>
          <div ref="p1" v-show="currentpeople==1" class="lishirenwudiv">
            <div  style="margin-right:10px;transition:all 0.3;"><img src="@/assets/datascreen/haiyan/lswh/zyj.jpg" style="height:100px;width:60px;"/></div>
            <div  style="color:white;font-size:12px;">
              <span style="color:yellow;">张元济</span>
              （1867年10月25日—1959年8月14日，享年91岁），男，字筱斋，号菊生，浙江海盐人。中国近代杰出的出版家、教育家、爱国实业家。
            </div>
          </div>
          <div ref="p2" v-show="currentpeople==2" class="lishirenwudiv">
            <div style="margin-right:10px;"><img src="@/assets/datascreen/haiyan/lswh/nbh.jpg" style="height:100px;width:100px;"/></div>
            <div style="color:white;font-size:12px;">
              <span style="color:yellow;">南北湖</span>
              风景区在海盐县澉浦镇西，东起长山闸，西至茶磨山，南自黄沙坞，北到六里堰，面积约30平方公里，以自然景观为主，兼有文物古迹和现代建筑。
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
