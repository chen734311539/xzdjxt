<template>
    <Modal  v-model="showdata.showmodal"  :draggable = "true" :footer-hide="true" title="网吧详细信息" class-name="lgsearch-panel">
        <div slot="close"><div class="hfx-modal-close"/></div>
        <div class="totalpanel">
         <div class="leftpanel">
            <div class="headerPanel">
              <div>
                <div class="info">
                  <span class="titlespan">编号：</span><span class="headerspan">{{wangbainfo.wbbm}}</span>
                </div>
                <div class="info">
                  <span class="titlespan">名称：</span><span class="headerspan" :title="wangbainfo.wbmc" >{{common.cutstr(wangbainfo.wbmc,30)}}</span>
                </div>
                <div class="info">
                  <span class="titlespan">负责人：</span><span class="headerspan">{{wangbainfo.fzr}}</span>
                </div>
                <div class="info">
                  <span class="titlespan">联系电话：</span><span class="headerspan">{{wangbainfo.lxdh}}</span>
                </div>
                <div class="info">
                  <span class="titlespan">管辖单位：</span><span class="headerspan">{{wangbainfo.gxdwmc}}</span>
                </div>
                <div class="info">
                  <span class="titlespan">地址：</span><span class="headerspan">{{wangbainfo.addr}}</span>
                </div>
                <!-- <span>编号：</span><span class="headerspan">{{wangbainfo.wbbm}}</span>
                <span>名称：</span><span class="headerspan" :title="wangbainfo.wbmc">{{common.cutstr(wangbainfo.wbmc,30)}}</span>
                <span>负责人：</span><span class="headerspan">{{wangbainfo.fzr}}</span>
                <span>联系电话：</span><span class="headerspan">{{wangbainfo.lxdh}}</span>
                <span>管辖单位：</span><span class="headerspan">{{wangbainfo.gxdwmc}}</span>
                <span>地址：</span><span class="headerspan">{{wangbainfo.addr}}</span> -->
              </div>
            </div>
          </div>
          <div class="rightpanel">
            <HfxTable ref="table" :data="wbryList" :columns="columns"  class="tableclass">
            </HfxTable>
          </div>
        </div>
          <PagerNew class="pagePanel" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
    </Modal>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"
import HfxTable from '@/components/base/HfxTable'
import PagerNew from '@/components/base/PagerNew'
export default {
  name: 'LgInfoModal',
  props:['showdata'],
  components: {HfxTable,PagerNew},
  data () {
    return {
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
            },
                          {
                title: '下机时间',
                key: 'OFFLINE_TIME',
                 width:17,
            },
        ],
      wbryList:[],
    }
  },
  computed:{ ...mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.ajzc.allDeptListObj
    }),
    wangbainfo:function(){
        return JSON.parse(this.showdata.data);
    },
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
    searchWbry(){
     var param = {};
     param.page = this.page;
     param.pagesize = this.pageSize;
     param.wbbh = this.wbbm;
     this.http.get("/lgwb/getWangBaRyList",param,this.getWangBaRyListCallBack,this,false);

    },
    getWangBaRyListCallBack(data){
      this.totalSize=data.count;
      this.wbryList=data.data;
    },
    formartxb(val){
      if(val=="1"){
        return '男';
      }else if(val=="2"){
        return '女';
      }else{
        return '未知';
      }
    }
  },
  created(){
  },
  watch:{
    wbbm:{
      handler(val){
        if(""!=val){
        this.page=1;
        this.searchWbry();
        }
      },
    }
  }
}
</script>
<style scoped>
.headerPanel{
  width:100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content:center;
}
.header{
  padding:20px;
  color: #b6f6ff;
  font-size: 14px;
}
.headerspan{
  color: white;
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
.totalpanel{
  display: flex;
}
.leftpanel{
  width:20%;
  border: 1px solid #68f5ff;
  border-right: none;
}
.rightpanel{
  width:80%;
  border: 1px solid #68f5ff;
  border-top: none;
}
.info{
  display: inline-flex;
  width: 100%;
  margin: 10px 0;
}
.titlespan{
  width: 60px;
  text-align: right;
}
</style>
<style>
.lgsearch-panel .ivu-modal .ivu-modal-content{
  top:180px;
  left:495px;
  width: 1115px !important;
}
</style>

