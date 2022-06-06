<template>
    <Modal  v-model="showdata.showmodal"  :draggable = "true" :footer-hide="true" title="旅馆人员查询" class-name="lgsearch-panel">
        <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="headerPanel">
              <div class="header">入住</div>
              <el-date-picker v-model="rzsj"  type="datetime" placeholder="选择入住时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              <div class="header">退房</div>
              <el-date-picker v-model="tfsj"   type="datetime" placeholder="选择退房时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              <div class="header">身份证</div>
              <input class="inputclass"  v-model="sfzh" />
              <div class="header" >姓名</div>
              <input class="inputclass" style="width:70px;"   v-model="xm" />
              <input type="checkbox" style="margin:0 0 0 10px;"   v-model="issearchall" />
              <div  style="padding：5px;color：#b6f6ff;font-size:14px;margin-right:15px;" >全部旅馆</div>
              <div class="header_button">
                <HfxButton style="margin-left:5px;" @click="submitSearch" name="查询" />
              </div>
            </div>
          <HfxTable ref="table" :data="lgryList" :columns="columns"  class="tableclass">
            <template #formartmc="{row,index}">
                  <span :title="row.LGMC">{{formartmc(row.LGMC)}}</span>
            </template>
            <template #formartxb="{row,index}">
                  <span>{{formartxb(row.XBDM)}}</span>
              </template>
          </HfxTable>
          <PagerNew class="pagePanel" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
    </Modal>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import HfxTable from '@/components/base/HfxTable'
import PagerNew from '@/components/base/PagerNew'
import common from "@/common.js"
export default {
  name: 'LgSearchModal',
  props:['showdata'],
  components: {HfxTable,PagerNew},
  data () {
    return {
      rzsj:"",
      tfsj:"",
      sfzh:"",
      xm:"",
      issearchall:false,
      page:1,
      pageSize:10,
      totalSize:0,
      columns: [
            {
                title: '序号',
                key: 'RN',
                width:5,
            },
            {
                title: '旅馆名称',
                key: 'LGMC',
                width:20,
                  slot:'formartmc',
            },
            {
                title: '房号',
                key: 'RZFH',
                 width:5,
            },
              {
                title: '姓名',
                key: 'XM',
                 width:10,
            },
            {
                title: '性别',
                key: 'XBDM',
                width:10,
                slot:'formartxb',
            },
              {
                title: '身份证号',
                key: 'GMSFHM',
                 width:20,
            },
            {
                title: '入住时间',
                key: 'RZSJ',
                 width:17,
            },
                          {
                title: '退房时间',
                key: 'TFSJ',
                 width:17,
            },
        ],
      lgryList:[],
    }
  },
  computed:{ ...mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.ajzc.allDeptListObj
  }),
  lgbh:function(){
    return this.showdata.lgbh;
  },
  },
  methods:{  
    pageChange(page){
        this.page = page;
        this.searchLgry();
    },
    submitSearch(){
      this.page = 1;
      this.searchLgry();
    },
    clear(){
      this.rzsj="";
      this.tfsj="";
      this.sfzh="";
      this.xm="";
      this.issearchall=false;
      this.page= 1;
    },
    searchLgry(){
     var param = {};
     param.page = this.page;
     param.pagesize = this.pageSize;
     if(this.issearchall){
      param.lgbh ="";
     }else{
      param.lgbh = this.lgbh;
     }
     param.rzsj = this.rzsj;
     param.tfsj = this.tfsj;
     param.gmsfhm = this.sfzh;
     param.xm = this.xm;
     this.http.get("/lgwb/getLvGuanRyList",param,this.getLvGuanRyListCallBack,this,false);

    },
    getLvGuanRyListCallBack(data){
      this.totalSize=data.count;
      this.lgryList=data.data;
    },
    formartxb(val){
      if(val=="1"){
        return '男';
      }else if(val=="2"){
        return '女';
      }else{
        return '未知';
      }
    },
    formartmc(val){
      return common.cutstr(val,20);
    },
  },
  created(){
  },
  watch:{
    lgbh:{
      handler(val){
        if(""!=val){
        this.clear();
        this.searchLgry();
        }
      },
    }
  }
}
</script>
<style scoped>
.headerPanel{
  height:40px;
  width:100%;
  position: relative;
  padding: 0px 10px;
  display: inline-flex;
  align-items: center;
  margin: 10px 0 10px 0;
  background-color: rgba(88,245,255, 0.1);
}
.header{
  padding:20px;
  color: #b6f6ff;
  font-size: 14px;
}
.inputclass{
  width:150px;
  height: 24px;
  padding: 0 10px;
  outline: none;
  color: white;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.date-picker{
  width: 180px !important;
  height: 28px !important;
}
.pagePanel{
  margin-top: 10px;
}
</style>
<style>
.lgsearch-panel .ivu-modal .ivu-modal-content{
  top:180px;
  left:495px;
  width: 1115px !important;
}
</style>

