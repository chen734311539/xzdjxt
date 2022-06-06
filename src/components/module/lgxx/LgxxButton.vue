<template>
    <div class="lgxxbutton" @click="clickHandler" @mouseover="changelgxxbuttonBorderEnter" @mouseout="changelgxxbuttonBorderLeave" >
      <div class="lgxxbuttonTX" :class="lgxxbuttonBorder">
      </div>
      <div class="jltype">
        <div class="lgpic">
        </div>
      </div>
      <div class="separator">
      </div>
      <div class="content">
          <span class="lgname" :title="data.lgmc" >{{common.cutstr(data.lgmc,18)}}</span>
          <span class="address" :title="data.addr" >{{common.cutstr(data.addr,14)}}</span>
          <div class="caozuo" v-show="showCaoZuoIcon" >
            <div class="searchIcon" @click="showSearch" ></div>
            <div class="markIcon" v-show="data.loc" @click="Mark"></div>
            <div class="infoIcon" @click="showInfo"></div>
          </div>
      </div>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"
export default {
  name: 'LgxxButton',
  props:['data'],
  data () {
    return {
      showCaoZuoIcon:true,
      lgxxbuttonBorder:"lgxxbuttonBorder_leave",
    }
  },
  computed: {
  },
  methods:{
    clickHandler(){
      this.$emit('on-click',this.data);
    },
    changelgxxbuttonBorderEnter(){
      // this.showCaoZuoIcon=true;
      this.lgxxbuttonBorder="lgxxbuttonBorder_enter";
    },
    changelgxxbuttonBorderLeave(){
      // this.showCaoZuoIcon=false;
      this.lgxxbuttonBorder="lgxxbuttonBorder_leave";
    },
    showSearch(){
      this.$emit('on-search',this.data);
    },
    Mark(){
      
    },
    showInfo(){
      this.$emit('on-info',this.data);
    },
  },
  created(){
  }
}
</script>

<style scoped>
.lgxxbutton{
  width: 94%;
  height: 70px;
  margin: 8px 0 0 6px;
  position: relative;
  padding: 13px 0px;
  cursor: pointer;
}
.content{
  position:absolute;
  left:65px;
  top:15px;
  width: 60%;
}
.lgname{
  position: absolute;
  font-size: 14px;
  top: 0px;
  left: 5px;
  color: #b6f6ff;
}
.address{
  position: absolute;
  top: 25px;
  left: 5px;
  font-size: 12px;
  color: #b6f6ff;
}
.caozuo{
  display: flex;
  position: absolute;
  right: -35px;
  top:25px;
}
.lgxxbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.lgxxbuttonBorder_enter{
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
.lgpic{
  position: absolute;
  width: 27px;
  height: 31px;
  left: 15px;
  top: 20px;
  background: 
    url(./../../../assets/lgwb/lgwb_lgicon.png)  no-repeat;
    background-size: 100%;
}
.lgxxbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.lgxxbuttonTX:hover, .lgxxbuttonTX:focus, .lgxxbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
.searchIcon{
  width: 17px;
  height: 18px;
  cursor: pointer;
  margin-right:10px;
  background: 
  url(./../../../assets/lgwb/lgwb_search.png)  no-repeat;
}
.markIcon{
  width: 17px;
  height: 18px;
  cursor: pointer;
  margin-right:10px;
  background: 
  url(./../../../assets/lgwb/lgwb_mark.png)  no-repeat;
}
.infoIcon{
  width: 17px;
  height: 18px;
  cursor: pointer;
  margin-right:10px;
  background: 
  url(./../../../assets/lgwb/lgwb_info.png)  no-repeat;
}
</style>
