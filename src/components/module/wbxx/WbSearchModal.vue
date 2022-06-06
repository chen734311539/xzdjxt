<template>
    <Modal  v-model="showdata.showmodal"  :draggable = "true" :footer-hide="true" title="网吧人员查询" class-name="lgsearch-panel">
        <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="headerPanel">
              <div class="header">上机</div>
              <el-date-picker v-model="sxsj"  type="datetime" placeholder="选择上机时间" size="mini" class="date-picker" value-format="yyyyMMddHHmmss"></el-date-picker>
              <div class="header">下机</div>
              <el-date-picker v-model="xxsj"   type="datetime" placeholder="选择下机时间" size="mini" class="date-picker" value-format="yyyyMMddHHmmss"></el-date-picker>
              <div class="header">身份证</div>
              <input class="inputclass"  v-model="sfzh" />
              <div class="header" >姓名</div>
              <input class="inputclass" style="width:70px;"   v-model="xm" />
              <input type="checkbox" style="margin:0 0 0 10px;"   v-model="issearchall" />
              <div  style="padding：5px;color：#b6f6ff;font-size:14px;margin-right:15px;" >全部网吧</div>
              <div class="header_button">
                <HfxButton style="margin-left:5px;" @click="submitSearch" name="查询" />
              </div>
            </div>
          <HfxTable ref="table" :data="wbryList" :columns="columns"  class="tableclass">
            <template #formartmc="{row,index}">
                  <span :title="row.SERVICE_NAME">{{formartmc(row.SERVICE_NAME)}}</span>
            </template>
            <template #formartonline="{row,index}">
                  <span>{{formarttime(row.ONLINE_TIME)}}</span>
            </template>
            <template #formartoffline="{row,index}">
                  <span>{{formarttime(row.OFFLINE_TIME)}}</span>
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
  name: 'WbSearchModal',
  props:['showdata'],
  components: {HfxTable,PagerNew},
  data () {
    return {
      sxsj:"",
      xxsj:"",
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
                title: '网吧名称',
                key: 'SERVICE_NAME',
                width:25,
                slot:'formartmc',
            },
            {
                title: '机器号',
                key: 'CARD_ID',
                 width:6,
            },
              {
                title: '姓名',
                key: 'USER_NAME',
                 width:10,
            },
              {
                title: '身份证号',
                key: 'CERTIFICATE_CODE',
                 width:20,
            },
            {
                title: '上机时间',
                key: 'ONLINE_TIME',
                width:17,
                slot:'formartonline',
            },
            {
                title: '下机时间',
                key: 'OFFLINE_TIME',
                width:17,
                slot:'formartoffline',
            },
        ],
      wbryList:[],
    }
  },
  computed:{ ...mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.ajzc.allDeptListObj
  }),
  wbbm:function(){
    return this.showdata.wbbm;
  },
  },
  methods:{  
    pageChange(page){
        this.page = page;
        this.searchWbry();
    },
    submitSearch(){
      this.page = 1;
      this.searchWbry();
    },
    clear(){
      this.sxsj="";
      this.xxsj="";
      this.sfzh="";
      this.xm="";
      this.issearchall=false;
      this.page= 1;
    },
    searchWbry(){
     var param = {};
     param.page = this.page;
     param.pagesize = this.pageSize;
     if(this.issearchall){
      param.wbbm ="";
     }else{
      param.wbbh = this.wbbm;
     }
     param.sxsj = this.sxsj;
     param.xxsj = this.xxsj;
     param.gmsfhm = this.sfzh;
     param.xm = this.xm;
     this.http.get("/lgwb/getWangBaRyList",param,this.getWangBaRyListCallBack,this,false);

    },
    getWangBaRyListCallBack(data){
      this.totalSize=data.count;
      this.wbryList=data.data;
    },
    formartmc(val){
      return common.cutstr(val,20);
    },
    formarttime(time){
      if(time==null||time==undefined||time=="undefined"||time==""){
        return "";
      }else{
        var nyr=time.substr(0,4)+"-"+time.substr(4,2)+"-"+time.substr(6,2);
        var sfm=time.substr(8,2)+":"+time.substr(10,2)+":"+time.substr(12,2);
        return nyr+" "+sfm;
      }
    },
  },
  created(){
  },
  watch:{
    wbbm:{
      handler(val){
        if(""!=val){
        this.clear();
        this.searchWbry();
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

