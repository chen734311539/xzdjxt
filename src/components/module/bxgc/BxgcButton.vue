<template>
  <div class="mrtbbutton" @click="clickHandler" @mouseover="changemrtbbuttonBorderEnter" @mouseout="changemrtbbuttonBorderLeave" :class="{ isRead: data.issee=='1' }">
    <div class="mrtbbuttonTX" :class="mrtbbuttonBorder">
    </div>
      <div >
        <div class="tablepic">
        </div>
      </div>
     <div class="separator">
    </div>
    <div class="content">
      <span class="itemname">{{data}}红旗蜗牛评选结果</span>
    </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"

export default {
  name: 'mrtbbutton',
  props:['data'],
  data () {
    return {
      mrtbbuttonBorder:"mrtbbuttonBorder_leave",
    }
  },
  computed: {
  },
  methods:{
    clickHandler(){
      this.$emit('on-click',this.data);
    },
    changemrtbbuttonBorderEnter(){
      this.mrtbbuttonBorder="mrtbbuttonBorder_enter";
    },
    changemrtbbuttonBorderLeave(){
      this.mrtbbuttonBorder="mrtbbuttonBorder_leave";
    },
  },
  created(){
  }
}
</script>

<style scoped>
.mrtbbutton{
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
.mrtbbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.mrtbbuttonBorder_enter{
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
.mrtbbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.mrtbbuttonTX:hover, .mrtbbuttonTX:focus, .mrtbbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
.tablepic{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 23px;
  left: 15px;
  background: 
    url(./../../../assets/mrtb/icon_table.png)  no-repeat;
    background-size: 100%;
}
</style>
