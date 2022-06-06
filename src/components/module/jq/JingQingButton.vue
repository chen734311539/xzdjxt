<template>
  <div class="jqbutton" @click="clickHandler" @mouseover="changejqbuttonBorderEnter" @mouseout="changejqbuttonBorderLeave" :class="{ isRead: data.issee=='1' }">
    <div class="jqbuttonTX" :class="jqbuttonBorder">
      <img v-show="data.istop=='1'" src="@/assets/jq/ssjq_zhiding.png" class="zhiding"/>
    </div>
    <div class="datediv">
        <span class="date">{{bjsjdate}}</span>
    </div>
    <div class="timediv">
        <span class="time">{{bjsjtime}}</span>
    </div>
     <div class="separator">
    </div>
    <div class="content">
            <span class="jqlb" :title="[data.bjlbmc+'-'+data.bjlxmc]">{{jqlbname}}</span>
            <span class="address" :title="[data.afdd]">{{common.cutstr(data.afdd,30)}}</span>
    </div>
    <div class="statediv">
      <div class="video" v-show="data.haszfsp=='1'">
      </div>
      <div class="see" v-show="data.issee=='1'">
      </div>
      <div class="location" v-show="isshowdingwei">
      </div>
      <div v-if="data.distance" style="color:red;">{{data.distance}}米</div>
    </div>
    <div :class="signstate">
    </div>
  </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"

export default {
  name: 'JingQingButton',
  props:['data'],
  data () {
    return {
      jqbuttonBorder:"jqbuttonBorder_leave",
    }
  },
  computed: {
    jqlbname: function () {
      if(this.data.bjlbmc==null){
        this.data.bjlbmc="";
      }
      if(this.data.jjlxmc==null){
        this.data.jjlxmc="";
      }
      if(this.data.bjlbmc!=""&&this.data.jjlxmc!=""){
        var orginstr=this.data.bjlbmc+"-"+this.data.jjlxmc;
        return common.cutstr(orginstr,18);
      }
      if(this.data.bjlbmc==""){
          return this.data.jjlxmc;
      }
      if(this.data.jjlxmc==""){
         return this.data.bjlbmc;
      }
      return "";
    },
    bjsjdate:function(){
      var sj = this.data.bjsj.split(" ")[0];
      return sj.split("-")[1]+"-"+sj.split("-")[2];
    },
     bjsjtime:function(){
      var sj = this.data.bjsj.split(" ")[1];
      return sj.split(":")[0]+":"+sj.split(":")[1];
    },
    isshowdingwei:function(){
      if(this.data.loc&&this.data.loc.x){
        return true;
      }
      return false;
    },
    signstate:function(){
        if(this.data.state=='0'){
            return "signstate_wqs";
        }else if (this.data.state=='1'){
            return "signstate_yqs";
        }else if (this.data.state=='2'){
            return "signstate_ydd";
        }else if (this.data.state=='3'){
            return "signstate_ywc";
        }else{}
    },
     isshowdingwei:function(){
      if(this.data.loc&&this.data.loc.x){
        return true;
      }
      return false;
    }
  },
  methods:{
    clickHandler(){
      this.$emit('on-click',this.data);
    },
    changejqbuttonBorderEnter(){
      this.jqbuttonBorder="jqbuttonBorder_enter";
    },
    changejqbuttonBorderLeave(){
      this.jqbuttonBorder="jqbuttonBorder_leave";
    }
    
  },
  created(){
    
  }
}
</script>

<style scoped>
.jqbutton{
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
.jqbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.jqbuttonBorder_enter{
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
.statediv{
  position:absolute;
  left:65px;
  top:50px;
  width: 60%;
  display: flex;
}
.video{
  width: 17px;
  height: 12px;
  margin-right: 10px;
  background: 
  url(./../../../assets/jq/ssjq_video.png)  no-repeat;
}
.see{
  width: 17px;
  height: 12px;
  margin-right: 10px;
  background: 
  url(./../../../assets/jq/ssjq_see.png)  no-repeat;
}
.location{
  width: 17px;
  height: 12px;
  margin-right: 10px;
  background: 
  url(./../../../assets/jq/ssjq_location.png)  no-repeat;
}
.content{
  position:absolute;
  left:65px;
  top:15px;
  width: 60%;
}
.jqlb{
  position: relative;
  color: #b6f6ff;
  font-size: 14px;
  top: -7px;
}
.address{
  position:absolute;
  left: 0px;
  top:14px;
  color: #fff;
}
.signstate_wqs{
  position: absolute;
  right: 5px;
  width: 47px;
  height: 45px;
  background: 
  url(./../../../assets/jq/ssjq_wqs.png)  no-repeat;
}
.signstate_yqs{
  position: absolute;
  right: 5px;
  width: 47px;
  height: 45px;
  background: 
  url(./../../../assets/jq/ssjq_yqs.png)  no-repeat;
}
.signstate_ydd{
  position: absolute;
  right: 5px;
  width: 47px;
  height: 45px;
  background: 
  url(./../../../assets/jq/ssjq_ydd.png)  no-repeat;
}
.signstate_ywc{
  position: absolute;
  right: 5px;
  width: 47px;
  height: 45px;
  background: 
  url(./../../../assets/jq/ssjq_ywc.png)  no-repeat;
}
.jqbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.jqbuttonTX:hover, .jqbuttonTX:focus, .jqbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
</style>
