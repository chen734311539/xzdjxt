<template>
<div class="popup3d-container" v-if="show">
    <div class="spjkdetail-panel">
        <div class="spjkDetail-header">
          <span class="spjkTitle">视频监控</span>
          <div class="hfx-modal-close close" @click="handleClose"></div>  
        </div>
        <div class="spjkDetail-content">
              <div style="margin-bottom:5px;">
                <span>{{data.name}}</span>
              </div>
        </div>
        <div class="spjkDetail-footer">
          <div style="margin-top:40px;margin-bottom:10px;">
            <HfxButton   style="width:64px;margin-left:10px;" @click="showSpjkGroupModal" name="添加小组" />
            <HfxButton   style="width:64px;margin-left:10px;" @click="spdwClick" name="定位" />
            <HfxButton   style="width:64px;margin-left:10px;" @click="playVideo" name="播放" />
          </div>
        </div>
        <Modal title="添加视频到分组" v-model="showSpjkGroup" class-name="addtogroupModal" :draggable="true" >
          <div slot="close"><div class="hfx-modal-close"/></div>
              <Transfer :data="groupList" :target-keys="targetKeys1" :titles="sptitles" @on-change="handleChange1"></Transfer>
              <div slot="footer">
                <HfxButton   @click="quxiaoOption" name="取消" />
                <HfxButton   @click="submitAddSpjkGroup" />
            </div>
        </Modal>
    </div>
</div>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'

export default {
  name: 'spwindow',
  props:['spjkid'],
  data () {
    return {
      show:true,
      data:{},
      showSpjkGroup:false,
      groupList:[],
      targetKeys1:[],
      sptitles:["可选分组","已选分组"]
    }
  },
  computed: {
    
  },
  methods:{
    handleClose() {
      if (this.closeEvent) {
        this.closeEvent();
      }
    },
    getSpjkByIdCallBack(data){
      this.data = data;
      for(var i=0;i<data.groups.length;i++){
          this.targetKeys1.push(data.groups[i].groupid);
      }
    },
    showSpjkGroupModal(){
      this.showSpjkGroup=true;
      this.http.get("/spjk/getSpjkGroupList",null,this.getSpjkGroupListCallBack,this,false);
      var paramObj = {};
      paramObj.id = this.data.id;
      this.http.get("/spjk/getSpjkDetailById",paramObj,this.getSpjkByIdCallBack,this,false);
    },
    getSpjkGroupListCallBack(result){
      for(var i=0;i<result.data.length;i++){
          result.data[i].label = result.data[i].groupname;
          result.data[i].key = result.data[i].groupid;
      }
      this.groupList = result.data;
    },
    handleChange1(newTargetKeys, direction, moveKeys){
      this.targetKeys1 = newTargetKeys;
    },
    submitAddSpjkGroup(){
      var paramObj = {};
      paramObj.videoid = this.data.videoid; 
      paramObj.groupidarr = this.targetKeys1;
      this.http.get("/spjk/addSpjkToGroup",paramObj,this.addSpjkToGroupCallBack,this,false);
    },
    addSpjkToGroupCallBack(result){
      this.showSpjkGroup=false;
      this.targetKeys1 = [];
      if(this.clickEvent) {
        this.clickEvent(result,"addspjkgroup");
      }
    //   this.$emit('handler',result,"addspjkgroup");
    },
    quxiaoOption(){
      this.showSpjkGroup=false;
      this.targetKeys1 = [];
    },
    spdwClick(){
      markUtil.reLocate(this.data.loc.x,this.data.loc.y,this.spdwclickHandler,null,this)
    },
    spdwclickHandler(point,args){
      var paramObj = {};
      var lx = point.x;
      var ly = point.y;
      paramObj.lx = lx;
      paramObj.ly = ly;
      paramObj.id = this.data.id;
      this.http.get("/spjk/updateSpjkLoc",paramObj,this.updateSpjkLocCallBack,this,false);
    },
    updateSpjkLocCallBack(data){
      if(this.clickEvent) {
        this.clickEvent(data,"location");
      }
    //   this.$emit('handler',data,"location");
    },
    playVideo(){
      var indexcode = this.data.indexcode;
      window.location.href = "VideosLiYuan://?method=RealTimeVideo&cameraId=" + indexcode;
    },
  },
  mounted(){
       this.http.get("/spjk/getSpjkDetailById",{"id":this.spjkid},this.getSpjkByIdCallBack,this,false);
  }
}
</script>

<style scoped>
.popup3d-container {
  width: 315px;
  height: 180px;
  background: rgb(8, 56, 90);
  opacity: 0.9;
  position: absolute;
  left: 0px;
  bottom: 0px;
  cursor: default;
}
.popup3d-container::before {
  content: "";
  width: calc(100% + 22px);
  height: 39px;
  position: absolute;
  bottom: -39px;
  left: -22px;
  background: url(../../../../../static/assets/popup3d/popup3d.png) 0px 0px no-repeat;
  background-position: 0px 0px;
}
.spjkdetail-panel{
  width: 315px;
  height: 180px;
  font-size: 12px;
  position:relative;
}
.spjkDetail-header{
  position: relative;
  height: 65px;
  border-bottom: 1px solid rgb(91, 107, 114);
  padding: 14px 16px;
}
.spjkTitle{
  position:absolute;
  font-size: 16px;
  color: #19a1ef;
  top: 20px;
  left:15px;
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
</style>
<style>
.addtogroupModal .ivu-modal .ivu-modal-content{
  top: 82px;
  left:598px;
  width: 452px !important;
}
</style>