<template>
    <Modal  v-model="showdata.showmodal"  :draggable = "true" :footer-hide="true" title="旅馆详细信息" class-name="lgsearch-panel">
        <div slot="close"><div class="hfx-modal-close"/></div>
        <div class="totalpanel">
        <div class="leftpanel">
          <div class="headerPanel">
            <div>
              <div class="info">
                <span class="titlespan">编号：</span><span class="headerspan">{{lvguaninfo.lgbh}}</span>
              </div>
              <div class="info">
                <span class="titlespan">名称：</span><span class="headerspan">{{lvguaninfo.lgmc}}</span>
              </div>
              <div class="info">
                <span class="titlespan">地址：</span><span class="headerspan">{{lvguaninfo.addr}}</span>
              </div>
              <div class="info">
                <span class="titlespan">法人：</span><span class="headerspan">{{lvguaninfo.layman}}</span>
              </div>
              <div class="info">
                <span class="titlespan">负责人：</span><span class="headerspan">{{lvguaninfo.man}}</span>
              </div>
              <div class="info">
                <span class="titlespan">房间数：</span><span class="headerspan">{{lvguaninfo.roomnum}}</span>
              </div>
              <div class="info">
                <span class="titlespan">床位数：</span><span class="headerspan">{{lvguaninfo.bednum}}</span>
              </div>
              <div class="info">
                <span class="titlespan">联系电话：</span><span class="headerspan">{{lvguaninfo.lxdh}}</span>
              </div>
              <div class="info">
                <span class="titlespan">责任民警：</span><span class="headerspan">{{lvguaninfo.zrmj}}</span>
              </div>
              <div class="info">
                <span class="titlespan">管辖单位：</span><span class="headerspan">{{lvguaninfo.gxdwmc}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="rightpanel">
          <HfxTable ref="table" :data="lgryList" :columns="columns"  class="tableclass">
            <template #formartxb="{row,index}">
                  <span>{{formartxb(row.XBDM)}}</span>
            </template>
            <template #formartmc="{row,index}">
                  <span>{{formartmc(row.LGMC)}}</span>
            </template>
          </HfxTable>
        </div>
      </div>
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
    lvguaninfo:function(){
        return JSON.parse(this.showdata.data);
    },
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
    searchLgry(){
     var param = {};
     param.page = this.page;
     param.pagesize = this.pageSize;
     param.lgbh = this.lgbh;
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
        this.page=1;
        this.searchLgry();
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

