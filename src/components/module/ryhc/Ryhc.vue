<template>
    <div class="ryhcpanel">
      <LeftContentNameBar :isshowshaixuan="true" :isshowclear="isshowclear" @on-click="clickMoreIcon" @on-clear="fanhuisearch"  />
         <Modal v-model="showMore" :draggable = "true" title="人员核查筛选" class-name="ryhcselect-panel">
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
              <HfxButton  @click="reset" name="重置"/>
              <HfxButton  @click="submitSearch" />
            </div>
        </Modal>
        <RyhcAddInfo :show="showAddObj.showmodal" :showdata="showAddObj" @handler="addItemHandler"/>
        <RyhcEditInfo :show="showEditObj.showmodal" :showdata="showEditObj" ref="ryhcedit"/>
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" v-model="name" @on-clear="fanhuisearch"/>
            <DropdownTreeNew class="seachbar_dropdown" :deptListObj="deptListObj" :choiceDept="choiceDept" :orideptname="userInfo.directdeptname"/>
            <div class="seachbar_caozuo">
              <div class="seachbar_shuaxin" @click="reflashItem" title="刷新" ></div>
              <div class="seachbar_add" @click="showAddRyhcItem" title="添加" ></div>
            </div>
        </div>
        <div class="ryhclist-panel">
            <RyhcItemButton v-for="ryhcObj in ryhcItemList" :key="ryhcObj.id" :data="ryhcObj" @show-edit="showEditPanel(ryhcObj)" @on-click="clickRyhcButton"/>
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
import RyhcAddInfo from '@/components/module/ryhc/RyhcAddInfo'
import RyhcEditInfo from '@/components/module/ryhc/RyhcEditInfo'
import RyhcItemButton from '@/components/module/ryhc/RyhcItemButton'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'

export default {
  name: 'Ryhc',
  provide(){//父方法传到子页面以供调用
      return{
          reflashItem:this.reflashItem
      }
  },
  inject:['initRightPaneldata'],//接收父页面的方法
  components: { InputSearchNew,DropdownTreeNew,PagerNew,RyhcAddInfo,RyhcEditInfo,RyhcItemButton,LeftContentNameBar},
  data () {
    return {
      deptListObj:{},
      showMore:false,
      showAddObj:{showmodal:false},
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
      ryhcItemList:[],
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
          this.searchRyhcItems();
        }
      },
      showEditPanel(val){
        this.$refs.ryhcedit.data = val;
        this.$refs.ryhcedit.initEditValues();
        this.showEditObj.showmodal = true;
      },
      getDeptTreeCallBack(data){
        this.deptListObj = data;
      },
      inputSearch(){
        this.page = 1;
        this.searchRyhcItems();
        this.isfanhuishow = true;
      },
      fanhuisearch(){
        this.page = 1;
        this.name = "";
        this.searchRyhcItems();
        this.isshowclear=false;
      },
      choiceDept(data){
        this.page = 1;
        this.deptcode = data.deptcode;
        this.searchRyhcItems();
      },
      showAddRyhcItem(){
        this.showAddObj.showmodal = true;
      },
      reflashItem(){
        this.searchRyhcItems();
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
        this.searchRyhcItems();
        this.showMore = false;
        this.isshowclear=true;
      },
      pageChange(page){
        this.page = page;
        this.searchRyhcItems();
      },
      searchRyhcItems(){
        var paramObj = {};
        //翻页
        paramObj.deptcode = this.deptcode;
        paramObj.name = this.name;
        paramObj.state = this.state;
        paramObj.starttime = this.starttime;
        paramObj.endtime = this.endtime;
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize;
        this.http.get("/qzlq/getRyhcItems",paramObj,this.getRyhcItemsCallBack,this,false);
      },
      clickRyhcButton(){

      },
      getRyhcItemsCallBack(data){
        this.totalSize = data.count;
        this.ryhcItemList = data.list;
      },
      getRyhcItemsFirstCallBack(data){
        this.totalSize = data.count;
        this.ryhcItemList = data.list;
        if(this.ryhcItemList.length>0){
          this.initRightPaneldata(this.ryhcItemList[0].id,"ryhc");
        }
      },
  },
  created(){
      //获取警情部门
     this.http.get("/qzlq/getItemDeptTree",null,this.getDeptTreeCallBack,this,false);
      //获取案件主题
     var paramObj = {}; 
     paramObj.page = this.page;
     paramObj.pagesize = this.pageSize;
     this.http.get("/qzlq/getRyhcItems",paramObj,this.getRyhcItemsFirstCallBack,this,false);
  }
}
</script>

<style scoped>
.ryhcpanel{
  height: 100%;
  position: relative;
}
.ryhcbarMore{
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
.ryhclist-panel{
  height: calc(100% - 200px);
  overflow: auto;
}
.pagebar{
  height: 24px;
  position: absolute;
  left: 20px;
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
  padding: 0 10px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.date-picker{
  width: 180px;
}
select {
  height:25px;
  width:111px;
  color: white;
  border: 1px solid white;
  outline: none;
  /*很关键：将默认的select选择框样式清除*/
  /* appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none; */
  /*将背景改为红色*/
  background:transparent;
  /*加padding防止文字覆盖*/
   padding-right: .14rem;
}
option {
  color: #b6f6ff;
  height:30px;
  border: 1px solid white;
  outline: none;
  /*很关键：将默认的select选择框样式清除*/
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  /*将背景改为项目颜色*/
  background-color:rgba(8, 56, 90, 0.90);
  /*加padding防止文字覆盖*/
   padding-right: .14rem;
}
</style>
<style>
.ryhcselect-panel .ivu-modal .ivu-modal-content{
  top: 82px;
  left: 387px;
  width: 350px !important;
}
</style>
