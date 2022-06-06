<template>
  <div class="groupspjkbutton" @click="clickHandler" @mouseover="mouseOver" @mouseout="mouseOut">
    <div class="groupspjkbuttonTX" :class="groupspjkbuttonBorder">
    </div>
    <div class="spjkicon">
    </div>
    <div class="separator">
    </div>
    <div class="content">
          <span>{{data.name}}</span>
    </div>
    <div class="controlbuttons" v-show="showicon" >
      <div class="dingweiicon" @click="spdwClick"></div>
      <div class="playicon"></div>
      <div class="removeicon" @click="removeSpjkClick"></div>
    </div>
  </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'

export default {
  name: 'ShiPinGroupSpButton',
  props:['data','groupid'],
  data () {
    return {
       showicon:false,
       groupspjkbuttonBorder:"groupspjkbuttonBorder_leave",
    }
  },
  computed: {
    
  },
  methods:{
    clickHandler(){
    //   if(this.showGroupDetail){
    //       this.showGroupDetail = false;
    //   }else{
    //       this.showGroupDetail = true;
    //   }
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
    removeSpjkClick(){
      var paramObj = {};
      paramObj.videoid = this.data.videoid;
      paramObj.groupid = this.groupid;
      this.http.get("/spjk/removeSpjkFromGroup",paramObj,this.removeSpjkFromGroupCallBack,this,false);
    },
    removeSpjkFromGroupCallBack(result){
      this.$emit('handler',result,"addspjkgroup");
      this.$emit('handler',result,"deletespjk");
    },
    updateSpjkLocCallBack(data){
      this.$emit('handler',data,"location");
    },
    mouseOver(){
       this.showicon = true;
       this.groupspjkbuttonBorder="groupspjkbuttonBorder_enter";
     },
     mouseOut(){
       this.showicon = false;
       this.groupspjkbuttonBorder="groupspjkbuttonBorder_leave";
     }
  },
  created(){
    
  }
}
</script>

<style scoped>
.groupspjkbutton{
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
  width: 21px;
  height: 27px;
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
.groupspjkbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.groupspjkbuttonTX:hover, .groupspjkbuttonTX:focus, .groupspjkbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
.groupspjkbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.groupspjkbuttonBorder_enter{
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
.removeicon{
  width: 17px;
  height: 17px;
  margin-left: 5px;
  background: 
    url(./../../../assets/spjk/spjk_icon_remove.png)  no-repeat;
}

</style>
