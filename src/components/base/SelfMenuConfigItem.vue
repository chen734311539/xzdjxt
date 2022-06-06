<template>
    <div class="selfMenuConfigItemDiv" :class="{selfMenuConfigItemDivActive:isClick}" @click="clickSelfMenuConfigItem($event)" @mouseover="mouseOver" @mouseout="mouseOut" :menuid="menuObj.menuid" :seq="seq">
            <span class="selfMenuConfigItem">{{menuObj.menuname}}</span>
            <div v-show="isClick&&seq>0" class="menuseqClass">{{seq}}</div>
            <Icon v-show="isClick&&showIcon" class="menujiantouleftClass" custom="iconfont iconjiantouzuo" @click="clickSelfMenuConfigLeftItem($event)"/>
            <Icon v-show="isClick&&showIcon" class="menujiantourightClass" custom="iconfont iconjiantouyou" @click="clickSelfMenuConfigRightItem($event)"/>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'SelfMenuConfigItem',
  props:['menuObj'],
  data () {
    return {
        seq:0,
        isClick:false,
        showIcon:false
    }
  },
  computed:{
  },
  methods:{
    clickSelfMenuConfigItem(e){
      this.isClick=!this.isClick;
   },
   clickSelfMenuConfigLeftItem(e){
     var num = this.seq-1;
     if(num<1){
         num=1;
     }
     this.seq=num;
     this.common.stopEvent(e);
   },
   clickSelfMenuConfigRightItem(e){
       this.seq = this.seq+1;
       this.common.stopEvent(e);
   },
   mouseOver(){
       this.showIcon = true;
   },
   mouseOut(){
       this.showIcon = false;
   }
  },
  created(){
    var num = 0;
    if(this.menuObj.selfseq&&this.menuObj.selfseq!=""&&this.menuObj.selfseq!="99"){
      num = this.menuObj.selfseq;
    }
    this.seq = num;

    var click = false;
    if(this.menuObj.selfmenuid){
      click = true;
    }
    this.isClick = click;
    
  }
}
</script>

<style scoped>
.selfMenuConfigItem{
  position: relative;
  cursor: pointer;
  text-align: center;
  top:4px;
}
.selfMenuConfigItemDiv{
  color: #808695;
  display:inline-block;
  position: relative;
  height: 25px;
  width: 62px;
  margin-right:5px;
  text-align: center;
  margin-bottom: 5px;
  border-radius: 5px;
}
.selfMenuConfigItemDiv:hover{
  color: black;
  background: white
}
.selfMenuConfigItemDivActive{
  color: black !important;
  background: white !important;
}
.menuseqClass{
  position:absolute;
  width: 15px;
  height: 15px;
  background: rgb(45,140,240);
  top: -3px;
  left: -6px;
  border-radius: 5px;
  color: white !important;
}
.menujiantouleftClass{
  position:absolute;
  cursor: pointer;
  font-size:10px;
  color: rgb(45,140,240);
  top:-8px;
  right:11px;
}
.menujiantourightClass{
  position:absolute;
  cursor: pointer;
  font-size:10px;
  color: rgb(45,140,240);
  top:-8px;
  right:2px;
}
</style>
