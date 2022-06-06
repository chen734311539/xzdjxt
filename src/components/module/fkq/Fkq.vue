<template>
    <div class="fkqpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
        <FkqAddInfo :show="showAddObj.showmodal" :showdata="showAddObj" @handler="addItemHandler"/>
        <FkqEditInfo :show="showEditObj.showmodal"  :showdata="showEditObj" ref="fkqedit"/>
        <FkqShowInfo :show="showInfoObj.showmodal"  :showdata="showInfoObj" ref="fkqinfo"/>
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" v-model="name" @on-clear="fanhuisearch" />
            <!-- <Icon v-show="isfanhuishow" custom="iconfont iconfanhui" class="seachbar_fanhui" @click="fanhuisearch"/> -->
            <!-- <Icon custom="iconfont icontianjia" title="添加" class="seachbar_shuaxin" style="right:21px;font-size:23px;" @click="showAddFkqItem"/>
            <Icon custom="iconfont iconshuaxin" title="刷新" class="seachbar_shuaxin" style="right:3px;font-size:18px;" @click="reflashItem"/> -->
            <div class="caozuopanel">
              <div class="seachbar_shuaxin" @click="reflashItem" ></div>
              <div class="seachbar_add" @click="showAddFkqItem" ></div>
            </div>
        </div>
        <div class="fkqlist-panel">
            <FkqButton v-for="fkqObj in fkqItemList" :key="fkqObj.id" :data="fkqObj" @show-info="showInfoPanel(fkqObj)" @show-edit="showEditPanel(fkqObj)" @on-click="clickFkqButton" @handler="FkqDetailHandler"/>
        </div>
        <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
    </div>
</template>

<script>

import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import PagerNew from '@/components/base/PagerNew'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import common from "@/common.js"
import FkqAddInfo from '@/components/module/fkq/FkqAddInfo'
import FkqEditInfo from '@/components/module/fkq/FkqEditInfo'
import FkqShowInfo from '@/components/module/fkq/FkqShowInfo'
import FkqButton from '@/components/module/fkq/FkqButton'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'

export default {
  name: 'Fkq',
  provide(){//父方法传到子页面以供调用
      return{
          reflashItem:this.reflashItem
      }
  },
  components: { InputSearchNew,PagerNew,FkqButton,FkqAddInfo,FkqEditInfo,FkqShowInfo,LeftContentNameBar},
  data () {
    return {
      showMore:false,
      showAddObj:{showmodal:false},
      showEditObj:{showmodal:false},
      showInfoObj:{showmodal:false},
      name:"",
      page:1,
      pageSize:10,
      totalSize:0,  //总共页数
      isfanhuishow:false,  //返回按钮是否显示
      fkqItemList:[]
    }
  },
  computed: mapState({
     userInfo: state => state.userInfo
  }),
  methods:{
      addItemHandler(data,state){//编辑Item页面返回
        if(state=="reflash"){
          this.page = 1;
          this.searchFkqItems();
        }
      },
      showEditPanel(val){
        this.$refs.fkqedit.data = val;
        this.$refs.fkqedit.initEditValues();
        this.showEditObj.showmodal = true;
      },
      showInfoPanel(val){
        // this.$refs.fkqinfo.data = val;
        // this.$refs.fkqinfo.initEditValues();
        // this.showInfoObj.showmodal = true;
        markUtil.drawThreeCircle(val.loc.x,val.loc.y,val,this);
      },
      getDeptTreeCallBack(data){
        this.deptListObj = data;
      },
      inputSearch(){
        this.page = 1;
        this.searchFkqItems();
        this.isfanhuishow = true;
      },
      fanhuisearch(){
        this.page = 1;
        this.name = "";
        this.searchFkqItems();
        this.isfanhuishow = false;
      },
      choiceDept(data){
        this.page = 1;
        this.deptcode = data.deptcode;
        this.searchFkqItems();
      },
      showAddFkqItem(){
        this.showAddObj.showmodal = true;
      },
      reflashItem(){
        this.searchFkqItems();
      },
      clickMoreIcon(){
          this.showMore=true;
      },
      reset(){
        this.name = "";
        this.state = "";
        this.starttime = "";
        this.endtime = "";
      },
      submitSearch(){
        this.page = 1;
        this.searchFkqItems();
        this.showMore = false;
      },
      pageChange(page){
        this.page = page;
        this.searchFkqItems();
      },
      searchFkqItems(){
        var paramObj = {};
        //翻页
        paramObj.name = this.name;
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize;
        this.http.get("/znfk/getFkqItems",paramObj,this.getFkqItemsCallBack,this,false);
      },
      clickFkqButton(data){
          if(data.loc&&data.loc.x){//地图上显示
            markUtil.centerAndShow("fkqLayer",data.id,this);
        }else{//没有坐标，不在地图上显示
          
        }
      },
      FkqDetailHandler(data,state){
        if(state=="location"){//定位
          this.searchFkqItems();
        }
      },
      getFkqItemsCallBack(data){
        this.totalSize = data.count;
        this.fkqItemList = data.data;
        yewuMarkUtil.addFkqMarks(this.fkqItemList,this.FkqDetailHandler,this);//打点
      }
  },
  created(){
     //获取防控圈主题
     var paramObj = {}; 
     paramObj.page = this.page;
     paramObj.pagesize = this.pageSize;
     this.http.get("/znfk/getFkqItems",paramObj,this.getFkqItemsCallBack,this,false);
  }
}
</script>

<style scoped>
.fkqpanel{
  height: 100%;
  position: relative;
}
.fkqbarMore{
  position:absolute;
  right: 15px;
  cursor: pointer;
}
.seachbar_shuaxin{
  position:absolute;
  right: 10px;
  color: white;
  top:2px;
  font-size: 20px;
  cursor: pointer;
}
.seachbar{
  height: 72px;
  position: relative;
}
.seachbar_InputSearch{
  height: 36px;
  width: 100%;
}
.seachbar_dropdown{
  height: 24px;
  width: 40%;
  position:absolute !important;
  top:0px;
  left: 41%;
}
.caozuopanel{
    margin: 10px 0;
    height: 22px;
    position: relative;
}
.seachbar_add{
 position:absolute;
  cursor: pointer;
  right: 0;
  top: 0;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/qygl/qygl_add.png)  no-repeat;
}
.seachbar_shuaxin{
  position:absolute;
  right: 30px;
  top: 0;
  cursor: pointer;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/qygl/qygl_refresh.png)  no-repeat;
}
.seachbar_fanhui{
  position:absolute;
  right: 14%;
  color: white;
  top:2px;
  font-size: 20px;
  cursor: pointer;
}
.fkqlist-panel{
  height: calc(100% - 140px);
}
.pagebar{
    height: 24px;
    position: absolute;
    left: 25px;
    bottom: -20px;
}
.modal-div{
  text-align: right;
  margin-top: 10px;
  margin-right:20px;
  margin-left:20px;
}
.modal-div span{
  width: 85px;
  text-align: right;
  margin-right: 10px;
}
.inputclass{
  width:180px;
  height: 28px;
}
.date-picker{
  width: 180px;
}
</style>
<style>
.fkqselect-panel .ivu-modal .ivu-modal-content{
  width: 350px !important;
  /* height: 600px !important; */
}
</style>
