<template>
  <div class="shijugaikuangPanel">
        <div class="titleDiv"><span>市局概况</span></div>
        <div class="contentDiv">
          <div style="overflow: hidden;">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="contentText">启东市局下设内设机构9个（副科级建制5个），直属机构11个（均为副科级建制），内地派出所15个（均为副科级建制），边防派出所7个，责任区交警中队12个、刑侦中队4个。全局现有民警847名、职工68名、保安联防队员1244名。 </span>
          </div>
          <div class="descDiv1 desc1"><span>9</span>个内设机构</div>
          <div class="descDiv1 desc2"><span>11</span>个直属机构</div>

          <div class="descDiv2 desc3"><span>15</span>个内地派出所</div>
          <div class="descDiv2 desc4"><span>7</span>个边防派出所</div>
          <div class="descDiv2 desc5"><span>4</span>个刑侦中队</div>
          <div class="descDiv2 desc6"><span>12</span>个责任区交警中队</div>
        </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Shijugaikuang',
  components:{},
  data () {
    return {
      
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
.shijugaikuangPanel{
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
.contentText{
  color: rgb(130,192,251);
  font-size: 12px;
}
.descDiv1{
  color: #fff;
  font-size: 12px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: start;
}
.descDiv1 span{
  color:yellow;
}
.desc1{
  height: 19.23%;
  width:43.17%;
  bottom: 31.1538%;
  left:10px;
}
.desc2{
  height: 19.23%;
  width:43.17%;
  bottom: 9.6154%;
  left:10px;
}
.descDiv2{
  color: #fff;
  font-size: 12px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.descDiv2 span{
  color:yellow;
}
.desc3{
  height: 9.6154%;
  width:43.17%;
  bottom: 40.3846%;
  right:10px;
}
.desc4{
  height: 9.6154%;
  width:43.17%;
  bottom: 30%;
  right:10px;
}
.desc5{
  height: 9.6154%;
  width:43.17%;
  bottom: 20%;
  right:10px;
}
.desc6{
  height: 9.6154%;
  width:43.17%;
  bottom: 9.6154%;
  right:10px;
}
</style>
