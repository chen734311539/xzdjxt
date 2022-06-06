<template>
  <div class="wangPanel">
      <div class="xunfangwang flexr">
        <img src="@/assets/datascreen/qidong/xunfangwang.png" class="imgclass"/>
      </div>
      <div class="jifangwang flexr">
        <img src="@/assets/datascreen/qidong/jifangwang.png" class="imgclass"/>
      </div>
      <div class="shujuwang flexr">
        <img src="@/assets/datascreen/qidong/shujuwang.png" class="imgclass"/>
      </div>
      <div class="xiaowang"></div>
      <div v-show="currentMoudle==1" class="tuxing">
        <div ref="left1" class="left">
          <img src="@/assets/datascreen/qidong/合成打击-2.png" style="width:100%;height:100%;"/>
          <div class="imagetitle">合成打击</div>
        </div>
        <div ref="right1" class="right">
          <img src="@/assets/datascreen/qidong/联合指挥-2.png" style="width:100%;height:100%;"/>
          <div class="imagetitle">联合指挥</div>
        </div>
        <div ref="middle1" class="middle">
          <img src="@/assets/datascreen/qidong/合成研判-1.png" style="width:100%;height:100%;"/>
        </div>
      </div>
      <div v-show="currentMoudle==2" class="tuxing">
        <div ref="left2" class="left">
          <img src="@/assets/datascreen/qidong/合成研判-2.png" style="width:100%;height:100%;"/>
          <div class="imagetitle">合成研判</div>
        </div>
        <div ref="right2" class="right">
          <img src="@/assets/datascreen/qidong/合成打击-2.png" style="width:100%;height:100%;"/>
          <div class="imagetitle">合成打击</div>
        </div>
        <div ref="middle2" class="middle">
          <img src="@/assets/datascreen/qidong/联合指挥-1.png" style="width:100%;height:100%;"/>
        </div>
      </div>
      <div v-show="currentMoudle==3" class="tuxing">
        <div ref="left3" class="left">
          <img src="@/assets/datascreen/qidong/联合指挥-2.png" style="width:100%;height:100%;"/>
          <div class="imagetitle">联合指挥</div>
        </div>
        <div ref="right3" class="right">
          <img src="@/assets/datascreen/qidong/合成研判-2.png" style="width:100%;height:100%;"/>
          <div class="imagetitle">合成研判</div>
        </div>
        <div ref="middle3" class="middle">
          <img src="@/assets/datascreen/qidong/合成打击-1.png" style="width:100%;height:100%;"/>
        </div>
      </div>
      <div class="imagename flexr">
          <span v-show="currentMoudle==1">合成研判</span>
          <span v-show="currentMoudle==2">联合指挥</span>
          <span v-show="currentMoudle==3">合成打击</span>
      </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Wang',
  components:{},
  data () {
    return {
        currentMoudle:1,
        timmer:null
    }
  },
  computed:mapState({
  }),
  methods:{
    createTimmer(){
      var that = this;
      this.timmer = setInterval(() => {
         $(that.$refs.left1).css("left","20%");
        $(that.$refs.left1).css("top","49%");
        $(that.$refs.right1).css("left","63%");
        $(that.$refs.right1).css("top","49%");
        $(that.$refs.middle1).css("left","41%");
        $(that.$refs.middle1).css("top","16%");
        $(that.$refs.left2).css("left","20%");
        $(that.$refs.left2).css("top","49%");
        $(that.$refs.right2).css("left","63%");
        $(that.$refs.right2).css("top","49%");
        $(that.$refs.middle2).css("left","41%");
        $(that.$refs.middle2).css("top","16%");
        $(that.$refs.left3).css("left","20%");
        $(that.$refs.left3).css("top","49%");
        $(that.$refs.right3).css("left","63%");
        $(that.$refs.right3).css("top","49%");
        $(that.$refs.middle3).css("left","41%");
        $(that.$refs.middle3).css("top","16%");
        if(that.currentMoudle==1){
          $(that.$refs.left1).animate({left:"63%"},function(){
          });
          $(that.$refs.right1).animate({left:"41%",top: "16%"},function(){
          });
          $(that.$refs.middle1).animate({left:"20%",top: "49%"},function(){
              that.currentMoudle = 2;
          });
        }else if(that.currentMoudle==2){
          $(that.$refs.left2).animate({left:"63%"},function(){
          });
          $(that.$refs.right2).animate({left:"41%",top: "16%"},function(){
          });
          $(that.$refs.middle2).animate({left:"20%",top: "49%"},function(){
              that.currentMoudle = 3;
          });
        }else if(that.currentMoudle==3){
          $(that.$refs.left3).animate({left:"63%"},function(){
          });
          $(that.$refs.right3).animate({left:"41%",top: "16%"},function(){
          });
          $(that.$refs.middle3).animate({left:"20%",top: "49%"},function(){
              that.currentMoudle = 1;
          });
        }
      }, 5000);
    }
  },
  mounted(){
    this.createTimmer();
  },
  beforeDestroy(){
    if(this.timmer!=null){
      clearInterval(this.timmer);
    }
  }
}
</script>

<style scoped>
.wangPanel{
  position: relative;
  width: 100%;
  height: 100%;
}
.xunfangwang{
  position:absolute;
  width: 15.5%;
  height: 11%;
  bottom:4%;
  left:10.8%;
  color: white;
  font-family: 微软雅黑;
  font-size: 1rem;
  letter-spacing:0.3em;
  user-select: none;
}
.jifangwang{
  position:absolute;
  width: 15.5%;
  height: 11%;
  bottom:4%;
  left:41.2%;
  color: white;
  font-family: 微软雅黑;
  font-size: 2em;
  letter-spacing:0.3em;
  user-select: none;
}
.shujuwang{
  position:absolute;
  width: 15.5%;
  height: 11%;
  bottom:4%;
  right:11.6%;
  color: white;
  font-family: 微软雅黑;
  font-size: 2em;
  letter-spacing:0.3em;
  user-select: none;
}
.imgclass{
  width: 70%;
  height: 70%;
}
.xiaowang{
  position:absolute;
  left: 32%;
  top: 10%;
  width: 38%;
  height: 46%;
  background-image:url(./../../../../assets/datascreen/qidong/xiaowang.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size:100% 100%;
}
.tuxing{
  position:absolute;
  width: 100%;
  height: 100%;
}
.imagetitle{
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%);
  position:absolute;
  color:#43c8e6;
  font-size: 14px;
  width: 100%;
  text-align: center;
}
.left{
  position:absolute;
  left:20%;
  top: 49%;
  user-select: none;
  width:15.967%;
  /* height:31.984%; */
}
.right{
  position:absolute;
  left:63%;
  top: 49%;
  user-select: none;
  width:15.967%;
}
.middle{
  position:absolute;
  left:41%;
  top: 16%;
  user-select: none;
  width:18.466%;
}
.imagename{
  position:absolute;
  color: rgb(238,220,9);
  background: rgba(15,185,222,0.2);
  width: 24.992%;
  height:12.692%;
  border-radius:20px;
  font-size: 20px;
  font-weight: 600;
  left: 37%;
  bottom: 19%;
  user-select: none;
}
</style>
