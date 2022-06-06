<template>
    <div class="fkqItemButton" @click="clickHandler" @mouseover="mouseOver" @mouseout="mouseOut">
      <div class="fkqbuttonTX" :class="fkqbuttonBorder">
        <!-- <img v-show="data.istop=='1'" src="./../../../assets/jq/zhiding.png" class="zhiding"/> -->
      </div>

        <div class="content">
            <span class="title" :title="data.title">{{titlespan}}</span>
            <span class="username">{{data.insertusername}}</span>
            <span class="dateandtime">{{date+" "+time}}</span>
            <!-- <Icon v-show="isshowdingwei" custom="iconfont icondingweiweizhizuobiaomianxing" class="dingwei"/> -->
            <div class="location" v-show="isshowdingwei">
            </div>
            <div class="caozuo" v-show="showEditIcon" >
              <div class="markIcon" @click="fkqdwClick" ></div>
              <div class="mdyIcon" @click="editFkqItem" ></div>
              <div class="delIcon" @click="showDelPanel" ></div>
              <div class="showIcon" @click="showItemInfo" ></div>
              <!-- <Icon v-show="showEditIcon" custom="iconfont iconshanchu" class="delete" @click="showDelPanel"/>
              <Icon v-show="showEditIcon" title="修改" custom="iconfont iconxiugai" class="edit" @click="editFkqItem"/>
              <Icon v-show="showEditIcon" title="定位"  custom="iconfont iconlocmark" class="addloc" @click="fkqdwClick"/>
              <Icon custom="iconfont icontiaojian" title="显示防控圈" class="detail" @click="showItemInfo"/> -->
            </div>
         </div>
         <!-- <Icon v-show="showEditIcon" custom="iconfont iconshanchu" class="delete" @click="showDelPanel"/>
         <Icon v-show="showEditIcon" title="修改" custom="iconfont iconxiugai" class="edit" @click="editFkqItem"/>
         <Icon v-show="showEditIcon" title="定位"  custom="iconfont iconlocmark" class="addloc" @click="fkqdwClick"/>
         <Icon custom="iconfont icontiaojian" title="显示防控圈" class="detail" @click="showItemInfo"/> -->
         <Modal title="删除主题" v-model="showDelete" class-name="fkqselect-panel" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;">是否删除该主题?</div>
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideDeleteModal">取消</Button>
            <Button type="primary" size="large" @click="deleteItem">确定</Button> -->
            <HfxButton @click="hideDeleteModal" name="取消" />
            <HfxButton @click="deleteItem" />
          </div>
        </Modal>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'

export default {
  name: 'FkqButton',
  inject:['initRightPaneldata','reflashItem'],//接收父页面的方法
  props:['data'],
  components:{},
  data () {
    return {
        showEditIcon:false,
        showdata:{showmodal:false},
        showDelete:false,
        fkqbuttonBorder:"fkqbuttonBorder_leave",
    }
  },
  computed: {
    titlespan:function(){
      var spancontent = this.data.title;
      if(this.data.title.length>=24){
        spancontent = this.data.title.substr(0,24)+"...";
      }
      return spancontent;
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
    clickHandler(){
      this.$emit('on-click',this.data);
    },
    mouseOver(){
       this.showEditIcon = true;
       this.fkqbuttonBorder="fkqbuttonBorder_enter";
     },
     mouseOut(){
       this.showEditIcon = false;
       this.fkqbuttonBorder="fkqbuttonBorder_leave";
     },
     editFkqItem(){
        this.$emit("show-edit",true);
     },
     showItemInfo(){
        this.$emit("show-info",true);
     },
     showFollowPanel(){
       this.initRightPaneldata(this.data.id,"fkq");
     },
     showDelPanel(){
       this.showDelete = true;
     },
     hideDeleteModal(){
       this.showDelete = false;
     },
     deleteItem(){
       var paramObj = {};
       paramObj.id = this.data.id;
       this.http.get("/znfk/deleteFkqItem",paramObj,this.deleteFkqItemCallBack,this,false);
     },
     deleteFkqItemCallBack(result){
       this.reflashItem();
       this.showDelete = false;
     },
     fkqdwClick(){
        markUtil.reLocate(null,null,this.fkqdwclickHandler,null,this)
     },
     fkqdwclickHandler(point,args){
        var paramObj = {};
        var lx = point.x;
        var ly = point.y;
        paramObj.xpos = lx;
        paramObj.ypos = ly;
        paramObj.id = this.data.id;
        this.http.get("/znfk/updateFkqCenterPoint",paramObj,this.updateFkqCenterPointCallBack,this,false);
     },
     updateFkqCenterPointCallBack(data){
        this.$emit('handler',data,"location");
     }
  },
  created(){
    
  }
}
</script>

<style scoped>
.fkqItemButton{
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
  color: #b6f6ff;
  font-size: 14px;
  top: 0px;
  left: 10px;
}
.username{
 position: absolute;
  color: #b6f6ff;
  font-size: 12px;
  left: 10px;
  top: 33px;
}
.dateandtime{
 position: absolute;
  color: #b6f6ff;
  font-size: 12px;
  left: 75px;
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
    color: rgba(190, 190, 190, 0.98);
    left: 144px;
    top: 18px;
    font-size: 15px;
}
.delete{
    position: absolute;
    color: #2d8cf0;
    right: 81px;
    font-size: 14px;
    top: 33px;
}
.edit{
    position: absolute;
    color: #2d8cf0;
    right: 60px;
    top: 31px;
}
.addloc{
    position: absolute;
    color: #2d8cf0;
    right: 40px;
    top: 32px;
}
.detail{
    position: absolute;
    color: #e8eaec;
    right: 8px;
    font-size: 22px;
    top: 18px;
}
.direction{
  right: 10px;
  position: absolute;
  color: #fff;
  font-size: 25px;
  top: 22px;
}
.fkqstate{
  position: absolute;
  right: 40px;
  font-size: 40px;
  width: 55px;
  height: 43px;
  color: red;
  top: 10px;
}
.fkqbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.fkqbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.fkqbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.fkqbuttonTX:hover, .fkqbuttonTX:focus, .fkqbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
.location{
  width: 17px;
  height: 12px;
  position: absolute;
  top: 20px;
  left: 10px;
  background: 
  url(./../../../assets/fkq/fkq_location.png)  no-repeat;
}
.markIcon{
  width: 15px;
  height: 15px;
  cursor: pointer;
    position: absolute;
  right: 65px;
  background: 
  url(./../../../assets/fkq/fkq_mark.png)  no-repeat;
}
.mdyIcon{
  width: 15px;
  height: 15px;
  cursor: pointer;
    position: absolute;
  right: 45px;
  background: 
  url(./../../../assets/fkq/fkq_mdy.png)  no-repeat;
}
.delIcon{
  width: 15px;
  height: 15px;
  cursor: pointer;
    position: absolute;
  right: 25px;
  background: 
  url(./../../../assets/fkq/fkq_del.png)  no-repeat;
}
.showIcon{
  width: 15px;
  height: 15px;
  cursor: pointer;
  position: absolute;
  right: 5px;
  background: 
  url(./../../../assets/fkq/fkq_show.png)  no-repeat;
}
</style>
<style>
.fkqselect-panel .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 233px;
  left:300px;
  width: 400px !important;
}
</style>