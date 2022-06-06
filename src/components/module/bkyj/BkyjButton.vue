<template>
    <div class="yjbutton" @click="clickHandler" @mouseover="changeyjbuttonBorderEnter" @mouseout="changeyjbuttonBorderLeave" >
      <div class="yjbuttonTX" :class="yjbuttonBorder">
      </div>
      <div class="datediv">
        <span class="date">{{yjdate}}</span>
      </div>
      <div class="timediv">
        <span class="time">{{yjtime}}</span>
      </div>
      <div class="separator">
      </div>
      <div class="content">
          <span class="alarmtarget">{{data.alarmtarget}}</span>
          <span class="sitename"  >{{data.sitename}}</span>
          <span  class="deploytype" >&nbsp;{{data.deploytype}}&nbsp;</span>
      </div>
      <div class="alarmlevel">
        <div class="outcircle" :style="levelforborder" ></div>
        <div class="incircle"  :style="levelforborder" ></div>
        <div class="level">
          <span :style="levelfortext" >{{data.alarmlevel}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
export default {
  name: 'BkyjButton',
  props:['data'],
  data () {
    return {
      yjbuttonBorder:"yjbuttonBorder_leave",
    }
  },
  computed: {
    yjdate:function(){
      var sj = this.data.alarmtime.split(" ")[0];
      return sj.split("-")[1]+"-"+sj.split("-")[2];
    },
     yjtime:function(){
      var sj = this.data.alarmtime.split(" ")[1];
      return sj.split(":")[0]+":"+sj.split(":")[1];
    },
    levelforborder:function(){
      var level=this.data.alarmlevel;
      var levelStyle={};
      if("一级"==level){
        levelStyle.border="1px solid #ff4040";
      }else if("二级"==level){
        levelStyle.border="1px solid #fcee48";
      }else if("三级"==level){
        levelStyle.border="1px solid #ffa200";
      }else if("四级"==level){
        levelStyle.border="1px solid #18ffbb";
      }else{
        levelStyle.border="1px solid white";
      }
      return levelStyle;
    },
    levelfortext:function(){
      var level=this.data.alarmlevel;
      var levelStyle={};
      if("一级"==level){
         levelStyle.color="#ff4040";
      }else if("二级"==level){
         levelStyle.color="#fcee48";
      }else if("三级"==level){
         levelStyle.color="#ffa200";
      }else if("四级"==level){
         levelStyle.color="#18ffbb";
      }else{
         levelStyle.color="white";
      }
      return levelStyle;
    },

  },
  methods:{
    clickHandler(){
      this.$emit('on-click',this.data);
    },
    changeyjbuttonBorderEnter(){
      this.yjbuttonBorder="yjbuttonBorder_enter";
    },
    changeyjbuttonBorderLeave(){
      this.yjbuttonBorder="yjbuttonBorder_leave";
    }
  },
  created(){
    
  }
}
</script>

<style scoped>
.yjbutton{
  width: 94%;
  height: 70px;
  margin: 8px 0 0 6px;
  position: relative;
  padding: 13px 0px;
  cursor: pointer;
}
.content{
  position:absolute;
  left:60px;
  top:15px;
  width: 65%;
}
.alarmlevel{
  position: absolute;
  right:10px;
  top:10px;
  width: 50px;
  height: 50px;
}
.outcircle{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 50px;
  height: 50px;
  border: 1px solid white;
  border-radius: 25px;
}
.incircle{
  position: absolute;
  top: 5px;
  left: 5px;
  width: 40px;
  height: 40px;
  border: 1px solid white;
  border-radius: 20px;
}
.level{
  position: absolute;
  top: 14px;
  left: 15px;
  width: 30px;
  height: 30px;
  transform: rotate(-30deg);
}
.level span{
  color: #fff;
}
.alarmtarget{
  position: absolute;
  font-size: 14px;
  top: 0px;
  left: 5px;
  color: #b6f6ff;
}
.sitename{
  position: absolute;
  top: 25px;
  left: 5px;
  font-size: 12px;
  color: #fff;
}
.deploytype{
  position: absolute;
  top: 25px;
  left: 130px;
  font-size: 12px;
  color: #333333;
  background-color: #b6f6ff;
}
.yjbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.yjbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.separator{
  position: absolute;
    left: 56px;
    top: 25%;
    width: 1px;
    height: 38px;
    background: 
    url(./../../../assets/jq/ssjq_separatorline.png)  no-repeat;
}
.yjbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.yjbuttonTX:hover, .yjbuttonTX:focus, .yjbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
.timediv{
    position: absolute;
    width: 48px;
    height: 20px;
    left: 8px;
    top: 32px;
    text-align: center;
    line-height: 20px;
}
.datediv{
    position: absolute;
    width: 48px;
    height: 20px;
    left: 8px;
    top: 17px;
    text-align: center;
    line-height: 20px;
}
.date{
  font-size: 14px;
  color: #ffa20f;
}
.time{
  font-size: 12px;
  color: #ffa20f;
}
</style>
