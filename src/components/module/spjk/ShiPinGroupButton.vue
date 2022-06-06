<template>
    <div class="spjkgroupbutton" @click="clickHandler"  @mouseover="mouseOver" @mouseout="mouseOut">
         <!-- <Icon custom="iconfont iconqun" class="spjkicon" style="font-size: 25px;"/>
        <div class="content">
            <span class="spjkgroupname">{{data.groupname}}</span>
            <span class="spjkgroupcount" style="cursor:pointer" @click="showGroupSpjk">({{data.videocount}})</span>
        </div>
        <span style="position: relative;top:-5px;left:328px;">显示</span>
        <el-switch class="switchShow" active-color="#13ce66" inactive-color="#ff4949" v-model="showSwitch" @change="showSpjkLayer"> 
        </el-switch>
        <div class="spjkgroupdetail">
            <Icon custom="iconfont iconrenyuan" class="spjkiconrenyuan"/><p class="spjkgroupcontent">{{data.insertusername}}</p>
            <Icon custom="iconfont icondanwei" class="spjkicondanwei"/><p class="spjkgroupcontent">{{data.deptname}}</p>
            <Icon custom="iconfont iconshijian" class="spjkiconshijian"/><p class="spjkgroupcontent">{{data.inserttime}}</p>
        </div> -->
      <div class="spjkgroupbuttonTX" :class="spjkgroupbuttonBorder"></div>
      <div class="upcontent" @click="showSpjkLayer">
        <div class="groupname"><span >{{data.groupname}}</span></div>
        <div class="showandhide">
          <div v-show="showSwitch" style="display:flex;">
            <div class="showeye"></div>
            <span>显示组员</span>
          </div>
          <div v-show="!showSwitch" style="display:flex;">
            <div class="hideeye"></div>
            <span>隐藏组员</span>
          </div>
        </div>
      </div>
      <div class="dividingline"></div>
      <div class="downcontent">
        <div class="insertusername">
          <div class="insertusernameicon"></div>
            <span>{{data.insertusername}}</span>
        </div>
        <div class="deptname">
          <div class="deptnameicon"></div>
            <span>{{data.deptname}}</span>
        </div>
        <div class="inserttime">
          <div class="inserttimeicon"></div>
            <span>{{data.inserttime}}</span>
        </div>
        <div class="videocount">
          <div class="videocounticon"></div>
            <span>组员数:{{data.videocount}}</span>
        </div>
      </div>
        <Modal :title="data.groupname" v-model="showGroupSpjkList" class-name="groupSpjkListModal" :draggable="true" :footer-hide="true" >
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div v-show="groupSpjkList.length>0" class="spjk-panel">
            <div class="spjkgrouplist_panel">
              <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" v-model="name" @on-clear="fanhuisearch" />
              <div class="spjklist-panel">
                <ShiPinGroupSpButton v-for="spjkObj in groupSpjkList" :key="spjkObj.id" :data="spjkObj" :groupid="data.groupid" @handler="ShiPinDetailHandler"/>
              </div>
              <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
            </div>
          </div>
          <div v-show="groupSpjkList.length==0" class="nospjk">
           <span>无视频监控设备</span>
          </div>
        </Modal>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import PagerNew from '@/components/base/PagerNew'
import ShiPinDetailMap from '@/components/module/spjk/ShiPinDetailMap'
import ShiPinGroupSpButton from '@/components/module/spjk/ShiPinGroupSpButton'
import markUtil from '@/components/map/js/markUtil'

export default {
  name: 'ShiPinGroupButton',
  props:['data'],
  components: {InputSearchNew,ShiPinDetailMap,ShiPinGroupSpButton,PagerNew},
  data () {
    return {
       showSwitch:false,
       showGroupSpjkList:false,
       isfanhuishow:false,
       groupSpjkList:[],
       name:"",
       page:1,
       pageSize:10,
       totalSize:1 ,//总共页数
       spjkgroupbuttonBorder:"spjkgroupbuttonBorder_leave",
    }
  },
  computed: {
    
  },
  methods:{
    clickHandler(){
      this.showGroupSpjk();
    },
    showSpjkLayer(){//显示隐藏警情图层
      if(this.showSwitch){//显示
        var layer = this.map.map.getLayer("spjk"+this.data.groupid+"Layer");
        if(layer){
          layer.show();
        }else{
          this.searchSpjk();
        }
        this.showSwitch=!this.showSwitch;
      }else{//隐藏
          var layer = this.map.map.getLayer("spjk"+this.data.groupid+"Layer");
          if(layer){
            layer.hide();
          }
          this.showSwitch=!this.showSwitch;
      }
    },
    pageChange(page){
        this.page = page;
        this.searchSpjk();
    },
    searchSpjk(){
      var paramObj = {};
      //翻页
      paramObj.page = this.page;
      paramObj.pagesize = this.pageSize;
      //关键字
      paramObj.name = this.name;
      paramObj.groupid = this.data.groupid;
      this.http.get("/spjk/getSpjk",paramObj,this.getSpjkCallBack,this,false);
    },
    getSpjkCallBack(data){
        this.totalSize = data.count;
        this.groupSpjkList = data.data;
        this.addSpjkMarks(data.data);//打点
        var layer = this.map.map.getLayer("spjk"+this.data.groupid+"Layer");
    },
    showGroupSpjk(){
      // this.showSwitch=true;
      this.showGroupSpjkList = true;
      this.searchSpjk();
    },
    inputSearch(value){
        this.page = 1;
        this.searchSpjk();
        this.isfanhuishow = true;
    },
    fanhuisearch(){
        this.page = 1;
        this.reset();
        this.isfanhuishow = false;
        this.searchSpjk();
    },
    reset(){//筛选框清空
        this.name = "";
    },
    addSpjkMarks(array){
        var that = this;
        try{
          that.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addSpjkMarks(array);
          },200);
          return;
        }
        var layerid = "spjk"+this.data.groupid+"Layer";
        markUtil.clearLayer(layerid,this);//视频清除
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  //视频打点
                  this.addSpjkMark(array[i],layerid);
              }
          }
        }
      },
      addSpjkMark(data,layerid){
        var that = this;
        try{
          that.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addSpjkMark(data,layerid);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.id = data.id;
        markinfo.type = "spjk";
        markinfo.iconurl = Constants.project+"/static/assets/spjk/spjk.png";
        var detailHandler = this.ShiPinDetailHandler;
        var Profile = Vue.extend({
          template: '<ShiPinDetailMap spjkid="'+markinfo.id+'" @handler="ShiPinDetailHandler"/>',
          components: {ShiPinDetailMap},
          data: function () {
            return {
            }
          },
          methods:{
            ShiPinDetailHandler(data,state){
                detailHandler(data,state);
            }
          }
        })
        markinfo.cp = new Profile();
        markUtil.addMark(layerid,markinfo,this);
      },
      ShiPinDetailHandler(data,state){
        if(state=="location"){//定位
          this.searchSpjk();
        }else if(state=="addspjkgroup"){
          this.http.get("/spjk/getSpjkGroupList",null,this.getSpjkGroupCallBack,this,false);
        }else if(state=="deletespjk"){
          this.searchSpjk();
        }
      },
      mouseOver(){
        this.spjkgroupbuttonBorder="spjkgroupbuttonBorder_enter";
      },
      mouseOut(){
        this.spjkgroupbuttonBorder="spjkgroupbuttonBorder_leave";
      },
  },
  created(){
    
  }
}
</script>

<style scoped>
.spjkgroupbutton{
  width: 94%;
  height: 110px;
  margin: 8px 0 0 6px;
  position: relative;
  cursor: pointer;
}
.spjkicon{
  position:absolute;
  width: 21px;
  height: 27px;
  top: 22px;
  left: 10px;
  background: 
    url(./../../../assets/spjk/spjk_icon.png)  no-repeat;
}

.spjkgroupbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.spjkgroupbuttonTX:hover, .spjkgroupbuttonTX:focus, .spjkgroupbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
.spjkgroupbuttonBorder_leave{
  width: 100%;
  height: 110px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.spjkgroupbuttonBorder_enter{
  width: 100%;
  height: 110px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.upcontent{
  height: 36px;
  line-height: 36px;
  width: 100%;
  position: absolute;
}
.dividingline{
  position: absolute;
  width: 100%;
  height: 1px;
  top: 36px;
  background-color: #b6f6ff;
}
.downcontent{
  top: 37px;
  height: 70px;
  width: 100%;
  position: relative;
}
.groupname{
  float: left;
  font-size: 15px;
  line-height: 36px;
  color: white;
  margin-left: 15px;
  max-width: 150px;
}
.showandhide{
  display: block;
  margin: 0 15px 0 0;
  color: white;
  float: right;
}
.showeye{
  width: 14px;
  height: 12px;
  margin: 11px 10px 0 0;
  background: 
  url(./../../../assets/spjk/spjk_group_showeye.png)  no-repeat;
}
.hideeye{
  width: 14px;
  height: 12px;
  margin: 11px 10px 0 0;
  background: 
  url(./../../../assets/spjk/spjk_group_hideeye.png)  no-repeat;

}

.insertusername{
  color: #b6f6ff;
  display: flex;
  line-height: 15px;
  position: absolute;
  top: 15px;
  left: 15px;
}
.insertusernameicon{
  width: 12px;
  height: 13px;
  margin-right: 10px;
  background: 
  url(./../../../assets/spjk/spjk_group_user.png)  no-repeat;
}

.deptname{
  color: #b6f6ff;
   display: flex;
  line-height: 15px;
  position: absolute;
  top: 15px;
  left: 170px;
}
.deptnameicon{
  width: 12px;
  height: 13px;
  margin-right: 10px;
  background: 
  url(./../../../assets/spjk/spjk_group_deptname.png)  no-repeat;
}
.inserttime{
  color: #b6f6ff;
   display: flex;
  line-height: 15px;
  position: absolute;
  bottom: 15px;
  left: 15px;
}
.inserttimeicon{
  width: 12px;
  height: 13px;
  margin-right: 10px;
  background: 
  url(./../../../assets/spjk/spjk_group_time.png)  no-repeat;

}
.videocount{
  color: #b6f6ff;
  display: flex;
  line-height: 15px;
  position: absolute;
  bottom: 15px;
  left: 170px;
}
.videocounticon{
  width: 12px;
  height: 13px;
  margin-right: 10px;
  background: 
  url(./../../../assets/spjk/spjk_group_count.png)  no-repeat;

}
.spjk-panel{
  position: relative;
  height: 520px;
}
.spjklist-panel{
  height:  440px;
  margin: 5px 0 5px 0;
  overflow: auto;
}
.pagebar{
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
<style>
.groupSpjkListModal .ivu-modal .ivu-modal-content{
  top: 82px;
  left:300px;
  width:297px !important;
}
</style>
