<template>
    <div class="xxkbItemButton" @click="showFollowPanel" @mouseover="mouseOver" @mouseout="mouseOut">
      <div class="xxkbbuttonTX" :class="xxkbbuttonBorder">
        <img v-show="data.istop=='1'" src="./../../../assets/jq/zhiding.png" class="zhiding"/>
      </div>
        <div class="content">
            <span class="title" :title="data.title">{{titlespan}}</span>
            <span class="deptnames" :title="data.bjdeptnames">{{deptnamesspan}}</span>
            <span class="username">{{data.insertusername}}</span>
            <span class="dateandtime">{{date+" "+time}}</span>
            <div class="caozuo" v-show="showEditIcon" >
            <div class="mdyIcon" @click="editXxkbItem" ></div>
            <div class="delIcon" @click="showDelPanel" ></div>
            </div>
         </div>
         <Modal title="删除主题" v-model="showDelete" class-name="xxkbDelModal" :draggable="true">
           <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;">是否删除该主题?</div>
          <div slot="footer">
            <HfxButton  @click="hideDeleteModal" name="取消"/>
            <HfxButton  @click="deleteItem" />
          </div>
        </Modal>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'XxkbItemButton',
  inject:['initRightPaneldata','reflashItem'],//接收父页面的方法
  props:['data'],
  components:{},
  data () {
    return {
        showDelete:false,
        showEditIcon:false,
        showdata:{showmodal:false},
        xxkbbuttonBorder:"xxkbbuttonBorder_leave",
    }
  },
  computed: {
    titlespan:function(){
      var spancontent = this.data.title;
      if(this.data.title.length>=23){
        spancontent = this.data.title.substr(0,23)+"...";
      }
      return spancontent;
    },
    deptnamesspan:function(){
      var spancontent = this.data.bjdeptnames;
      if(this.data.bjdeptnames.length>=23){
        spancontent = this.data.bjdeptnames.substr(0,23)+"...";
      }
      return "["+spancontent+"]";
    },
    date:function(){
      var sj = this.data.inserttime.split(" ")[0];
      return sj.split("-")[1]+"-"+sj.split("-")[2];
    },
    time:function(){
      var sj = this.data.inserttime.split(" ")[1];
      return sj.split(":")[0]+":"+sj.split(":")[1];
    },
    isshowdingwei:function(){
      if(this.data.loc&&this.data.loc.x){
        return true;
      }
      return false;
    }
  },
  methods:{
    mouseOver(){
       this.showEditIcon = true;
       this.xxkbbuttonBorder="xxkbbuttonBorder_enter";
     },
     mouseOut(){
       this.showEditIcon = false;
       this.xxkbbuttonBorder="xxkbbuttonBorder_leave";
     },
     editXxkbItem(){
         this.$emit("show-edit",true);
     },
     showDelPanel(){
       this.showDelete = true;
     },
     hideDeleteModal(){
       this.showDelete = false;
     },
     deleteItem(){
       var paramObj = {};
       paramObj.itemid = this.data.id;
       this.http.get("/qzlq/deleteXxkbItem",paramObj,this.deleteXxkbItemCallBack,this,false);
     },
     deleteXxkbItemCallBack(result){
       this.reflashItem();
     },
     showFollowPanel(){
       this.initRightPaneldata(this.data.id,"xxkb");
     }
  },
  created(){
    
  }
}
</script>

<style scoped>
.xxkbItemButton{
  width: 94%;
  height: 70px;
  margin: 8px 0 0 6px;
  position: relative;
  padding: 13px 0px;
  cursor: pointer;
}
.zhiding{
  position:absolute;
  top:2px;
  left: 2px;
}
.content{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
}
.title{
  position: absolute;
  color: #fff;
  font-size: 14px;
  top: 0px;
  left: 10px;
}
.deptnames{
 position: absolute;
  color: #b6f6ff;
  font-size: 12px;
  left: 10px;
  top: 18px;
}
.username{
 position: absolute;
  color: #ffa20f;
  font-size: 12px;
  left: 10px;
  top: 33px;
}
.dateandtime{
 position: absolute;
  color: #ffa20f;
  font-size: 12px;
  right: 100px;
  top: 33px;
}
.caozuo{
  display: flex;
  position: absolute;
  right: 10px;
  top:30px;
}
.dingwei{
  position: absolute;
    color: #2d8cf0;
    left: 142px;
    top: 18px;
    font-size: 15px;
}
.edit{
  position: absolute;
  color: #2d8cf0;
  left: 161px;
  top: 17px;
}
.delete{
  position: absolute;
  color: #2d8cf0;
  left: 184px;
  top: 17px;
}
.direction{
  right: 10px;
  position: absolute;
  color: #fff;
  font-size: 25px;
  top: 22px;
}
.xxkbstate{
  position: absolute;
  right: 40px;
  font-size: 40px;
  width: 55px;
  height: 43px;
  color: red;
  top: 10px;
}
.xxkbbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.xxkbbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.xxkbbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.xxkbbuttonTX:hover, .xxkbbuttonTX:focus, .xxkbbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
.mdyIcon{
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-right:10px;
  background: 
  url(./../../../assets/xxkb/xxkb_mdy.png)  no-repeat;
}
.delIcon{
  width: 15px;
  height: 15px;
  cursor: pointer;
  background: 
  url(./../../../assets/xxkb/xxkb_del.png)  no-repeat;
}
</style>
<style>
.xxkbDelModal .ivu-modal .ivu-modal-content{
  top: 290px;
  left: 300px;
  width: 400px !important;
}
</style>