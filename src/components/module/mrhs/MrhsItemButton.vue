<template>
    <div class="mrhsItemButton" @click="showFollowPanel"  @mouseover="mouseOver" @mouseout="mouseOut">
      <div class="mrhsbuttonTX" :class="mrhsbuttonBorder">
      </div>
        <div class="content">
            <span class="title">{{titlespan}}</span>
            <span class="username">{{data.insertusername}}</span>
            <span class="dateandtime">{{date+" "+time}}</span>
            <div class="caozuo" v-show="showEditIcon" >
              <div class="mdyIcon" @click="editMrhsItem" ></div>
              <div class="delIcon" @click="showDelPanel" ></div>
            </div>
            <!-- <Icon v-show="isshowdingwei" custom="iconfont icondingweiweizhizuobiaomianxing" class="dingwei"/>
            <Icon v-show="showEditIcon" title="修改主题" custom="iconfont iconxiugai" class="edit" @click="editMrhsItem"/>
            <Icon v-show="showEditIcon" custom="iconfont iconshanchu" class="delete" @click="showDelPanel"/> -->
         </div>
         <!-- <Icon custom="iconfont iconxiangyou" title="展示楼层" class="direction" @click="showFollowPanel"/> -->
         <Modal title="删除主题" v-model="showDelete" class-name="modal_style" :draggable="true" width="400">
          <div style="width:100%;text-align:center;">是否删除该主题?</div>
          <div slot="footer">
            <Button type="text" size="large" @click="hideDeleteModal">取消</Button>
            <Button type="primary" size="large" @click="deleteItem">确定</Button>
          </div>
        </Modal>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'MrhsItemButton',
  inject:['initRightPaneldata','reflashItem'],//接收父页面的方法
  props:['data'],
  components:{},
  data () {
    return {
        showDelete:false,
        showEditIcon:false,
        showdata:{showmodal:false},
        mrhsbuttonBorder:"mrhsbuttonBorder_leave",
    }
  },
  computed: {
    titlespan:function(){
      var sj = this.data.inserttime.split(" ")[0];
      return sj.split("-")[0]+"年"+sj.split("-")[1]+"月"+sj.split("-")[2]+"日 每日会商";
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
       this.mrhsbuttonBorder="mrhsbuttonBorder_enter";
     },
     mouseOut(){
       this.showEditIcon = false;
       this.mrhsbuttonBorder="mrhsbuttonBorder_leave";
     },
     editMrhsItem(){
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
       this.http.get("/qzlq/deleteMrhsItem",paramObj,this.deleteMrhsItemCallBack,this,false);
     },
     deleteMrhsItemCallBack(result){
       this.reflashItem();
     },
     showFollowPanel(){
       this.initRightPaneldata(this.data.id,"mrhs");
     }
  },
  created(){
    
  }
}
</script>

<style scoped>
.mrhsItemButton{
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
  top:33px;
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
.mrhsbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.mrhsbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.mrhsbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.mrhsbuttonTX:hover, .mrhsbuttonTX:focus, .mrhsbuttonTX:active {
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
