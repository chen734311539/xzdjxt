<template>
  <div class="ssyjbutton" @click="clickHandler" @mouseover="changessyjbuttonBorderEnter" @mouseout="changessyjbuttonBorderLeave" :class="{ isRead: data.issee=='1' }">
    <div class="ssyjbuttonTX" :class="ssyjbuttonBorder">
      <!-- <img v-show="data.istop=='1'" src="@/assets/jq/ssjq_zhiding.png" class="zhiding"/> -->
    </div>
    <div class="datediv">
        <span class="date">{{insertdate}}</span>
    </div>
    <div class="timediv">
        <span class="time">{{inserttime}}</span>
    </div>
     <div class="separator">
    </div>
    <div class="content">
      <span class="itemname">{{data.date}}月{{data.label}}三色预警</span>
    </div>
    <div class="editpanel">
      <div v-show="isDelIconShow" class="shanchuClass" @click="delItem"  title="删除该三色预警"></div>
    </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"

export default {
  name: 'SsyjButton',
  props:['data'],
  data () {
    return {
      ssyjbuttonBorder:"ssyjbuttonBorder_leave",
      isDelIconShow:false,
    }
  },
  computed: {
    insertdate:function(){
      var sj = this.data.inserttime.split(" ")[0];
      return sj.split("-")[1]+"-"+sj.split("-")[2];
    },
    inserttime:function(){
      var sj = this.data.inserttime.split(" ")[1];
      return sj.split(":")[0]+":"+sj.split(":")[1];
    },
  },
  methods:{
    clickHandler(){
      this.$emit('on-click',this.data);
    },
    changessyjbuttonBorderEnter(){
      this.ssyjbuttonBorder="ssyjbuttonBorder_enter";
      this.isDelIconShow=true;
    },
    changessyjbuttonBorderLeave(){
      this.ssyjbuttonBorder="ssyjbuttonBorder_leave";
      this.isDelIconShow=false;
    },
    delItem(){
      this.$emit('on-del',this.data);
    }, 
  },
  created(){
    
  }
}
</script>

<style scoped>
.ssyjbutton{
  width: 94%;
  height: 70px;
  margin: 8px 0 0 6px;
  position: relative;
  padding: 13px 0px;
  /* border: 1px solid #2e8cb8; */
  /* border-bottom: 1px solid #b6f6ff; */
  cursor: pointer;
  /* background-color: #0b3c61; */
  /* box-shadow: 0 0 7px#0f2a4d; */
}
.ssyjbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.ssyjbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.zhiding{
  position:absolute;
  left: 0;
  top: 0;
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
.separator{
  position: absolute;
    left: 56px;
    top: 25%;
    width: 1px;
    height: 38px;
    background: 
    url(./../../../assets/jq/ssjq_separatorline.png)  no-repeat;
}
.content{
  position:absolute;
  left:65px;
  top:15px;
  width: 60%;
}
.itemname{
  position: relative;
  color: #b6f6ff;
  font-size: 14px;
  top: 8px;
}
.ssyjbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.ssyjbuttonTX:hover, .ssyjbuttonTX:focus, .ssyjbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
.editpanel{
  position: absolute;
  right: 15px;
  bottom: 10px;
}
.shanchuClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-left: 13px;
    background: 
    url(./../../../assets/dztc/dztc_del.png)  no-repeat;
}
</style>
