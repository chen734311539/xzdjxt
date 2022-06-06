<template>
    <div class="yyjqpanel">
      <LeftContentNameBar :isshowshaixuan="true" :isshowclear="isshowclear" @on-click="clickMoreIcon" @on-clear="fanhuisearch"  />
        <YyjqAddInfo :show="showAddObj.showmodal" :showdata="showAddObj" @handler="addItemHandler"/>
        <YyjqEditInfo :show="showEditObj.showmodal"  :showdata="showEditObj" ref="yyjqedit"/>
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" v-model="name" @on-clear="fanhuisearch" />
            <DropdownTreeNew class="seachbar_dropdown" :deptListObj="deptListObj" :choiceDept="choiceDept" :orideptname="userInfo.directdeptname"/>
            <div class="seachbar_caozuo">
              <div class="seachbar_shuaxin" @click="reflashItem" title="刷新" ></div>
              <div class="seachbar_add" @click="showAddYyjqItem" title="添加" ></div>
            </div>
        </div>
        <div class="yyjqlist-panel">
            <YyjqItemButton v-for="yyjqObj in yyjqItemList" :key="yyjqObj.id" :data="yyjqObj" @show-edit="showEditPanel(yyjqObj)" />
        </div>
        <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>

        <Modal v-model="showMore" :draggable = "true" title="涉稳信息筛选" class-name="yyjqselect-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
            <div class="modal-div">
                <span>关键字</span>
                <input class="inputclass" v-model="name"/>
            </div>
            <div class="modal-div">
                <span>状态</span>
                <select class="inputclass" v-model="state">
                  <option value="1">新增</option>
                  <option value="2">续报</option>
                  <option value="3">解除</option>
                </select>
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
import YyjqAddInfo from '@/components/module/yyjq/YyjqAddInfo'
import YyjqEditInfo from '@/components/module/yyjq/YyjqEditInfo'
import YyjqItemButton from '@/components/module/yyjq/YyjqItemButton'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'

export default {
  name: 'yyjq',
  provide(){//父方法传到子页面以供调用
      return{
          reflashItem:this.reflashItem
      }
  },
  inject:['initRightPaneldata'],//接收父页面的方法
  components: { InputSearchNew,DropdownTreeNew,PagerNew,YyjqAddInfo,YyjqEditInfo,YyjqItemButton,LeftContentNameBar},
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
      deptcode:"",  //选择的部门
      yyjqItemList:[],
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
          this.searchYyjqItems();
        }
      },
      showEditPanel(val){
        this.$refs.yyjqedit.data = val;
        this.$refs.yyjqedit.initEditValues();
        this.showEditObj.showmodal = true;
      },
      getDeptTreeCallBack(data){
        this.deptListObj = data;
      },
      inputSearch(){
        this.page = 1;
        this.searchYyjqItems();
      },
      fanhuisearch(){
        this.page = 1;
        this.name = "";
        this.searchYyjqItems();
        this.isshowclear=false;
      },
      choiceDept(data){
        this.page = 1;
        this.deptcode = data.deptcode;
        this.searchYyjqItems();
      },
      showAddYyjqItem(){
        this.showAddObj.showmodal = true;
      },
      reflashItem(){
        this.searchYyjqItems();
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
        this.searchYyjqItems();
        this.showMore = false;
        this.isshowclear=true;
      },
      pageChange(page){
        this.page = page;
        this.searchYyjqItems();
      },
      searchYyjqItems(){
        var paramObj = {};
        //翻页
        paramObj.deptcode = this.deptcode;
        paramObj.name = this.name;
        paramObj.state = this.state;
        paramObj.starttime = this.starttime;
        paramObj.endtime = this.endtime;
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize;
        this.http.get("/qzlq/getYyjqItems",paramObj,this.getYyjqItemsCallBack,this,false);
      },
      getYyjqItemsCallBack(data){
        this.totalSize = data.count;
        this.yyjqItemList = data.list;
      },
      getYyjqItemsFirstCallBack(data){
        this.totalSize = data.count;
        this.yyjqItemList = data.list;
        if(this.yyjqItemList.length>0){
          this.initRightPaneldata(this.yyjqItemList[0].id,"yyjq");
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
     this.http.get("/qzlq/getYyjqItems",paramObj,this.getYyjqItemsFirstCallBack,this,false);
  }
}
</script>

<style scoped>
.yyjqpanel{
  height: 100%;
  position: relative;
}
.yyjqbarMore{
  position:absolute;
  right: 15px;
  cursor: pointer;
}
.seachbar_shuaxin{
  position:absolute;
  right: 10px;
  color: white;
  font-size: 20px;
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
.yyjqlist-panel{
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
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.date-picker{
  width: 180px;
}
.seachbar_add{
 position:absolute;
  cursor: pointer;
  right: 0;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/xxkb/xxkb_add.png)  no-repeat;
}
.seachbar_shuaxin{
  position:absolute;
  right: 30px;
  cursor: pointer;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/xxkb/xxkb_refresh.png)  no-repeat;
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
.yyjqselect-panel .ivu-modal .ivu-modal-content{
  top: 82px;
  left: 387px;
  width: 350px !important;
}
</style>
