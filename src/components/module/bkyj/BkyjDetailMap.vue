<template>
    <div class="spjkdetail-panel">
        <div class="bkyjDetail-header">
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
          <div class="hfx-modal-close close" @click="closeInfoWindow"></div>  
        </div>
        <div class="spjkDetail-content">
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">预警目标:</span>
                <span style="color:white;">{{data.alarmtarget}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">预警等级:</span>
                <span style="color:white;">{{data.alarmlevel}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">预警站点:</span>
                <span style="color:white;">{{data.sitename}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">案件名称:</span>
                <span style="color:white;">{{data.casename}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">归属地:</span>
                <span style="color:white;">{{data.location}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">姓名:</span>
                <span style="color:white;">{{data.name}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">证件号:</span>
                <span style="color:white;">{{data.idnumber}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">手机:</span>
                <span style="color:white;">{{data.phone}}</span>
              </div>

        </div>
        <!-- <div class="spjkDetail-footer">
          <div style="margin-top:40px;margin-bottom:10px;">
          </div>
        </div> -->
    </div>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'

export default {
  name: 'ShiPinDetailMap',
  props:['bkyjid'],
  data () {
    return {
      data:{},
      yjdate:"",
      yjtime:"",
    }
  },
  computed: {
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
    closeInfoWindow(){
      this.map.map.infoWindow.hide()
    },
    getBkyjByIdCallBack(data){
      this.data = data;
      var rq = this.data.alarmtime.split(" ")[0];
      var sj = this.data.alarmtime.split(" ")[1];
     this.yjdate=rq.split("-")[1]+"-"+rq.split("-")[2];
     this.yjtime=sj.split(":")[0]+":"+sj.split(":")[1];
    },
  },
  mounted(){
       this.http.get("/bkyj/getBkyjById",{"id":this.bkyjid},this.getBkyjByIdCallBack,this,false);
  }
}
</script>

<style scoped>
.spjkdetail-panel{
  width: 340px;
  height: 180px;
  position:relative;
}
.bkyjDetail-header{
  position: relative;
  height: 65px;
  border-bottom: 1px solid rgb(91, 107, 114);
  padding: 14px 0px;
}
.close{
  position:absolute;
  font-size: 31px;
  color: white;
  right: 9px;
  top: 10px;
  cursor: pointer;
}
.spjkDetail-content{
  width: 100%;
  padding: 16px;
  height: calc(100% - 65px - 75px);
  color: white;
}
.spjkDetail-footer{
  height: 20px;
}
.content{
  position:absolute;
  left:60px;
  top:15px;
  width: 65%;
}
.alarmlevel{
  position: absolute;
  right:40px;
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
.separator{
  position: absolute;
    left: 56px;
    top: 25%;
    width: 1px;
    height: 38px;
    background: 
    url(./../../../assets/jq/ssjq_separatorline.png)  no-repeat;
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