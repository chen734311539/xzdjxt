<template>
    <div class="mrhspanel">
      <LeftContentNameBar :isshowshaixuan="true" :isshowclear="isshowclear" @on-click="clickMoreIcon" @on-clear="fanhuisearch"  />
         <Modal v-model="showMore" :draggable = "true" title="每日会商筛选" class-name="mrhsselect-panel">
           <div slot="close"><div class="hfx-modal-close"/></div>
            <div class="modal-div">
                <span>关键字</span>
                <input class="inputclass" v-model="name"/>
            </div>
            <div class="modal-div">
                <span>时间范围(开始)</span>
                <el-date-picker v-model="starttime" type="datetime" placeholder="选择日期时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </div>
            <div class="modal-div">
                <span>时间范围(结束)</span>
                <el-date-picker v-model="endtime" type="datetime" placeholder="选择日期时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </div>
            <div slot="footer">
              <!-- <Button type="text" size="large" @click="reset">重置</Button>
              <Button type="primary" size="large" @click="submitSearch">确定</Button> -->
              <HfxButton  @click="reset" name="重置"/>
              <HfxButton  @click="submitSearch" />
            </div>
        </Modal>
        <MrhsAddInfo :show="showAddObj.showmodal" :showdata="showAddObj" :jqtjdata="jqtjObj" @handler="addItemHandler"/>
        <MrhsEditInfo :show="showEditObj.showmodal"  :showdata="showEditObj" ref="mrhsedit"/>
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" v-model="name"/>
            <DropdownTreeNew class="seachbar_dropdown" :deptListObj="deptListObj" :choiceDept="choiceDept" :orideptname="userInfo.directdeptname"/>
            <div class="seachbar_caozuo">
              <div class="seachbar_shuaxin" @click="reflashItem" title="刷新" ></div>
              <div class="seachbar_add" @click="showAddMrhsItem" title="添加" ></div>
            </div>
        </div>
        <div class="mrhslist-panel">
          <el-scrollbar>
            <MrhsItemButton v-for="mrhsObj in mrhsItemList" :key="mrhsObj.id" :data="mrhsObj" @show-edit="showEditPanel(mrhsObj)" @on-click="clickmrhsButton"/>
          </el-scrollbar>
        </div>
        <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
    </div>
</template>

<script>

import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import DropdownTreeNew from '@/components/base/DropdownTreeNew'
import PagerNew from '@/components/base/PagerNew'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import common from "@/common.js"
import MrhsAddInfo from '@/components/module/mrhs/MrhsAddInfo'
import MrhsEditInfo from '@/components/module/mrhs/MrhsEditInfo'
import MrhsItemButton from '@/components/module/mrhs/MrhsItemButton'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'

export default {
  name: 'Mrhs',
  provide(){//父方法传到子页面以供调用
      return{
          reflashItem:this.reflashItem
      }
  },
  inject:['initRightPaneldata'],//接收父页面的方法
  components: { InputSearchNew,DropdownTreeNew,PagerNew,MrhsAddInfo,MrhsEditInfo,MrhsItemButton,LeftContentNameBar},
  data () {
    return {
      deptListObj:{},
      showMore:false,
      showAddObj:{showmodal:false},
      jqtjObj:{},
      showEditObj:{showmodal:false},
      name:"",
      state:"",
      starttime:"",
      endtime:"",
      page:1,
      pageSize:10,
      totalSize:0,  //总共页数
      // isfanhuishow:false,  //返回按钮是否显示
      deptcode:"",  //选择的部门
      mrhsItemList:[],
      isshowclear:false,  //清楚删选条件按钮是否显示
    }
  },
  computed: mapState({
     userInfo: state => state.userInfo
  }),
  methods:{
      addItemHandler(data,state){//编辑Item页面返回
        if(state=="reflash"){
          this.page = 1;
          this.searchMrhsItems();
        }
      },
      showEditPanel(val){
        this.$refs.mrhsedit.data = val;
        this.$refs.mrhsedit.initEditValues();
        this.showEditObj.showmodal = true;
      },
      getDeptTreeCallBack(data){
        this.deptListObj = data;
      },
      inputSearch(){
        this.page = 1;
        this.searchMrhsItems();
      },
      fanhuisearch(){
        this.page = 1;
        this.name = "";
        this.searchMrhsItems();
        this.isshowclear=false;
      },
      choiceDept(data){
        this.page = 1;
        this.deptcode = data.deptcode;
        this.searchMrhsItems();
      },
      showAddMrhsItem(){
        this.showAddObj.showmodal = true;
        this.http.get("/qzlq/getMrhsJqtj",{},this.getMrhsJqtjCallBack,this,false);
      },
      getMrhsJqtjCallBack(data){
        this.jqtjObj = data;
      },
      reflashItem(){
        this.searchMrhsItems();
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
        this.searchMrhsItems();
        this.showMore = false;
        this.isshowclear=true;
      },
      pageChange(page){
        this.page = page;
        this.searchMrhsItems();
      },
      searchMrhsItems(){
        var paramObj = {};
        //翻页
        paramObj.deptcode = this.deptcode;
        paramObj.name = this.name;
        paramObj.state = this.state;
        paramObj.starttime = this.starttime;
        paramObj.endtime = this.endtime;
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize;
        this.http.get("/qzlq/getMrhsItems",paramObj,this.getMrhsItemsCallBack,this,false);
      },
      clickmrhsButton(){

      },
      getMrhsItemsCallBack(data){
        this.totalSize = data.count;
        this.mrhsItemList = data.list;
      },
      getMrhsItemsFirstCallBack(data){
        this.totalSize = data.count;
        this.mrhsItemList = data.list;
        if(this.mrhsItemList.length>0){
          this.initRightPaneldata(this.mrhsItemList[0].id,"mrhs");
        }
      }
  },
  created(){
      //获取警情部门
     this.http.get("/qzlq/getItemDeptTree",null,this.getDeptTreeCallBack,this,false);
      //获取案件主题
     var paramObj = {}; 
     paramObj.page = this.page;
     paramObj.pagesize = this.pageSize;
     this.http.get("/qzlq/getMrhsItems",paramObj,this.getMrhsItemsFirstCallBack,this,false);
  }
}
</script>

<style scoped>
.mrhspanel{
  height: 100%;
  position: relative;
}
.mrhsbarMore{
  position:absolute;
  right: 15px;
  cursor: pointer;
}
.seachbar{
  height: 135px;
} 
.seachbar_InputSearch{
  height: 36px;
  margin: 0px 0 17px 0;
}
.seachbar_dropdown{
  height: 36px;
  margin: 0px 0 17px 0;
}
.seachbar_caozuo{
  position: relative;
  height: 39px;
  right: 0px;
}
.seachbar_add{
 position:absolute;
  cursor: pointer;
  right: 0px;
  top: 0px;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/ajzc/ajzc_add.png)  no-repeat;
}
.seachbar_shuaxin{
  position:absolute;
  right: 30px;
  top: 0px;
  cursor: pointer;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/ajzc/ajzc_refresh.png)  no-repeat;
}
.mrhslist-panel{
  height: calc(100% - 61px);
  /* background-color:tomato; */
}
.pagebar{
  height: 23px;
  background-color: #002029;
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
  padding: 0 10px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.date-picker{
  width: 180px;
}
</style>
<style>
.mrhsselect-panel .ivu-modal .ivu-modal-content{
  top: 82px;
  left: 387px;
  width: 350px !important;
}
</style>
