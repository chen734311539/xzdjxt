<template>
  <div class="shijugaikuangPanel">
        <div class="titleDiv"><span>派出所概况</span></div>
        <div class="contentDiv">
          <div style="overflow: hidden;">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="contentText">旺庄派出所有民警37人，辅警14人，网格员172人，联动单位35个。辖区内有感知设备2754台，其中视频监控2654台，人脸抓拍100台。辖区学校13所，保安共73人，银行网点11家，保安共56人。</span>
          </div>
          <div class="descDiv1 desc1">网格员<span>172</span>人</div>
          <div class="descDiv1 desc2"><span>35</span>个联动单位</div>

          <div class="descDiv2 desc3"><span>2654</span>台视频监控</div>
          <div class="descDiv2 desc4"><span>100</span>台人脸抓拍</div>
          <div class="descDiv2 desc5"><span>13</span>所学校</div>
          <div class="descDiv2 desc6"><span>11</span>家银行网点</div>
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
  right:35px;
}
.desc6{
  height: 9.6154%;
  width:43.17%;
  bottom: 9.6154%;
  right:20px;
}
</style>
