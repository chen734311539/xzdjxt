<template>
    <div class="zlhcItemButton" @click="showFollowPanel" @mouseover="mouseOver" @mouseout="mouseOut">
      <div class="zlhcbuttonTX" :class="zlhcbuttonBorder">
      </div>
        <div class="content">
            <span class="title" :title="data.title">{{titlespan}}</span>
            <span class="deptnames" :title="data.deptnames">{{deptnamesspan}}</span>
            <span class="username">{{data.insertusername}}</span>
            <span class="dateandtime">{{date+" "+time}}</span>
            <div class="caozuo" v-show="showEditIcon" >
              <div class="mdyIcon" @click="editZlhcItem" ></div>
              <div class="delIcon" @click="showDelPanel" ></div>
            </div>
         </div>
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
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'ZlhcItemButton',
  inject:['initRightPaneldata','reflashItem'],//接收父页面的方法
  props:['data'],
  components:{},
  data () {
    return {
        showDelete:false,
        showEditIcon:true,
        showdata:{showmodal:false},
        zlhcbuttonBorder:"zlhcbuttonBorder_leave",
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
      var spancontent = this.data.deptnames;
      if(this.data.deptnames.length>=23){
        spancontent = this.data.deptnames.substr(0,23)+"...";
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
    clickHandler(){
      this.$emit('on-click',this.data);
    },
    mouseOver(){
       this.showEditIcon = true;
       this.zlhcbuttonBorder="zlhcbuttonBorder_enter";
     },
     mouseOut(){
       this.showEditIcon = false;
       this.zlhcbuttonBorder="zlhcbuttonBorder_enter";
     },
     editZlhcItem(){
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
       this.http.get("/qzlq/deleteZlhcItem",paramObj,this.deleteZlhcItemCallBack,this,false);
     },
     deleteZlhcItemCallBack(result){
       this.reflashItem();
     },
     showFollowPanel(){
       this.initRightPaneldata(this.data.id,"zlhc");
     }
  },
  created(){
    
  }
}
</script>

<style scoped>
.zlhcItemButton{
  width: 94%;
  height: 70px;
  margin: 8px 0 0 6px;
  position: relative;
  padding: 13px 0px;
  cursor: pointer;
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
.zlhcstate{
  position: absolute;
  right: 40px;
  font-size: 40px;
  width: 55px;
  height: 43px;
  color: red;
  top: 10px;
}
.modal_style{
    display: flex;
    align-items: center;
    justify-content: center;
}
.zlhcbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.zlhcbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.zlhcbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.zlhcbuttonTX:hover, .zlhcbuttonTX:focus, .zlhcbuttonTX:active {
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
