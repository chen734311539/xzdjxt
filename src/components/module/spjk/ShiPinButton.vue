<template>
    <div class="spjkbutton" @click="clickHandler" @mouseover="mouseOver" @mouseout="mouseOut">
      <div class="spjkbuttonTX" :class="spjkbuttonBorder">
      </div>
      <div class="spjkicon">
      </div>
      <div class="separator">
      </div>
      <div class="content">
          <span :title="data.name">{{common.cutstr(data.name,28)}}</span>
      </div>
      <div v-if="data.distance" style="color:red;position: absolute;right: 5px;">{{data.distance}}米</div>
      <div class="controlbuttons" v-show="showicon" >
        <div class="addtogroupicon" @click="showSpjkGroupModal"></div>
        <div class="dingweiicon" @click="spdwClick"></div>
        <div class="playicon" @click="playVideo"></div>
        <!-- <iframe width="0" height="0" display="none" id="listItemPlayUrl"></iframe> -->
      </div>
      <Modal title="添加视频到分组" v-model="showSpjkGroup" class-name="addtogroupModal" :draggable="true">
           <div slot="close"><div class="hfx-modal-close"/></div>
              <Transfer :data="groupList" :target-keys="targetKeys1" :titles="sptitles" @on-change="handleChange1"></Transfer>
              <div slot="footer">
                <HfxButton   @click="quxiaoOption" name="取消"/>
                <HfxButton   @click="submitAddSpjkGroup" />
            </div>
      </Modal>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'
import common from "@/common.js"

export default {
  name: 'ShiPinButton',
  props:['data'],
  data () {
    return {
      showSpjkGroup:false,
      showicon:false,
      groupList:[],
      targetKeys1:[],
      sptitles:["可选分组","已选分组"],
      spjkbuttonBorder:"spjkbuttonBorder_leave",

    }
  },
  computed: {
    
  },
  methods:{
    clickHandler(){
      this.$emit('on-click',this.data);
    },
     mouseOver(){
       this.showicon = true;
       this.spjkbuttonBorder="spjkbuttonBorder_enter";
     },
     mouseOut(){
       this.showicon = false;
        this.spjkbuttonBorder="spjkbuttonBorder_leave";
     },
    showSpjkGroupModal(){
      this.showSpjkGroup=true;
      this.http.get("/spjk/getSpjkGroupList",null,this.getSpjkGroupListCallBack,this,false);
      var paramObj = {};
      paramObj.id = this.data.id;
      this.http.get("/spjk/getSpjkDetailById",paramObj,this.getSpjkDetailByIdCallBack,this,false);
    },
    getSpjkDetailByIdCallBack(result){
      for(var i=0;i<result.groups.length;i++){
          this.targetKeys1.push(result.groups[i].groupid);
      }
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
      this.$emit('handler',result,"addspjkgroup");
    },
    quxiaoOption(){
      this.showSpjkGroup=false;
      this.targetKeys1 = [];
    },
    spdwClick(){
      markUtil.reLocate(null,null,this.spdwclickHandler,null,this)
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
      this.$emit('handler',data,"location");
    },
    playVideo(){
      var indexcode = this.data.indexcode;
      window.location.href = "VideosLiYuan://?method=RealTimeVideo&cameraId=" + indexcode;
      // var CamList = indexcode;
      // var param = "btoolpplayerprotocol://ReqType:PlayReal;Language:zh_CN;clear:3;WndCount:1;NginxIp:50.89.34.200;NginxPort:443;UserID:admin;"
      //           +"sg:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6InhhdXRoLWF1dGhjIiwiZXhwIjoxNjA5NzI1MjkzLCJpYXQiOjE2MDQ1NDEyOTMsImp0aSI6ImYzMTNlMGU2YTBkMDRjMDY5ZThhMjM4YjhiZjExNmZiIn0.XB82VQ1wf8qaOL4xf2LEdEjswLxyLKsvC-O9qrE5awU;"
      //           +"protocol:https;CamList:"+CamList+";";
      // var iframe = document.createElement("iframe");
      // iframe.src = param;
      // iframe.style.display = 'none';
      // document.body.appendChild(iframe);
    },
  },
  created(){
    
  }
}
</script>

<style scoped>
.spjkbutton{
  width: 94%;
  height: 70px;
  margin: 8px 0 0 6px;
  position: relative;
  padding: 13px 0px;
  cursor: pointer;
}
.content{
  position:absolute;
  top: 28px;
  left: 54px;
  color: #b6f6ff;
}
.spjkicon{
  position:absolute;
  width: 27px;
  height: 31px;
  top: 22px;
  left: 10px;
  background: 
    url(./../../../assets/spjk/spjk_icon.png)  no-repeat;
}

.separator{
  position: absolute;
    left: 41px;
    top: 25%;
    width: 1px;
    height: 38px;
    background: 
    url(./../../../assets/spjk/spjk_separatorline.png)  no-repeat;
}
.spjkbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.spjkbuttonTX:hover, .spjkbuttonTX:focus, .spjkbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
.spjkbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.spjkbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.controlbuttons{
  position: absolute;
  display: flex;
  bottom: 10px;
  right: 10px;
}
.addtogroupicon{
  width: 17px;
  height: 17px;
  margin-left: 5px;
  background: 
    url(./../../../assets/spjk/spjk_icon_add.png)  no-repeat;
}
.dingweiicon{
  width: 17px;
  height: 17px;
  margin-left: 5px;
  background: 
    url(./../../../assets/spjk/spjk_icon_mark.png)  no-repeat;
}
.playicon{
  width: 17px;
  height: 17px;
  margin-left: 5px;
  background: 
    url(./../../../assets/spjk/spjk_icon_play.png)  no-repeat;
}

.addtogroupModal>>>.ivu-transfer-list-header{
  padding: 8px 16px;
  background: transparent !important;
  color: #b6f6ff; 
  border: 1px solid #b6f6ff;
  border-bottom: 1px solid #b6f6ff;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

</style>
<style>
.addtogroupModal .ivu-modal .ivu-modal-content{
  top: 82px;
  left:598px;
  width: 452px !important;
}
.ivu-transfer-list-header{
  padding: 8px 16px;
  background: transparent !important;
  color: #b6f6ff; 
  border: 1px solid #b6f6ff;
  border-bottom: 1px solid #b6f6ff;
  /* border-radius: 6px 6px 0 0; */
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.ivu-transfer-list-body {
    height: 100%;
    border: 1px solid #b6f6ff;
    border-top: none;
    /* border-radius: 0 0 6px 6px; */
    position: relative;
    overflow: hidden;
}
.ivu-transfer-list-content-item {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #b6f6ff;
    font-size: 12px!important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background .2s ease-in-out;
}
.ivu-transfer-list-content-item:hover {
    background: rgba(137,156,255, 0.2);
}
</style>