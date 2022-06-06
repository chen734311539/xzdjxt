<template>
    <div class="zdryRightPanel">
      <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
        <div class="headerPanel">
            <div class="header">搜索内容</div>
            <input v-model="keyword"  class="inputClass"/>
            <div class="header">删除状态</div>
            <select v-model="isdel" style="width:85px;">
              <option value="">请选择</option>
              <option value="0">未删除</option>
              <option value="1">已删除</option>
            </select>
            <HfxButton name="查询" :width=80 :height=28  style="margin-left:20px;" @click="searchData" /> 

            <HfxButton name="新增" :width=80 :height=28  style="margin-left:60px;" @click="addZdry" /> 
            <HfxButton name="修改" :width=80 :height=28  style="margin-left:10px;" @click="editZdry"/> 
            <HfxButton name="删除" :width=80 :height=28  style="margin-left:10px;" @click="deleteOneRow"/> 
            <HfxButton name="数据导出" :width=100 :height=28 style="margin-left:10px;" @click="downloadData" />
        </div>
        <div class="countPanel">
          <span style="color:rgb(255, 155, 0);">目前，排查梳理重点人员{{countObj.zdrycount}}人。&nbsp;&nbsp;</span>
          <span style="color:rgb(255, 155, 0);" v-for="Obj in countObj.level" :key="Obj.level">{{Obj.level}}{{Obj.count}}人&nbsp;&nbsp;</span>
          <span style="color:rgb(255, 97, 0);"  v-for="Obj in countObj.zrdw" :key="Obj.zrdw">{{Obj.zrdw}}{{Obj.count}}人&nbsp;&nbsp;</span>
          <span style="color:rgb(234, 23, 15);" v-for="Obj in countObj.zdrylb" :key="Obj.zdrylb">{{Obj.zdrylb}}{{Obj.count}}名&nbsp;&nbsp;</span>
        </div>
        <div class="contentPanel" ref="contentPanel">
          <HfxTable ref="table" :data="data" :columns="columns"  class="tableclass" radio @on-radio="clickRow">
              <template #levelformart="{index,row}">
                  <div :class="getRowClassName(row, index)" class="levelClass">
                    <span>{{row.level}}</span>
                  </div>
              </template>
              <template #detailformart="{index,row}">
                <div class="tablebutton">
                  <HfxButton name="详细信息" :width=80 :height=26 @click="showZdryInfo(row)"/>
                </div>
              </template>
          </HfxTable>
        </div>
      <Modal title="重点人员详情" v-model="showZdryDetail" :draggable="true" class="zdryinfo-panel">
        <div slot="close"><div class="hfx-modal-close"/></div>
        <ZdryDetailInfo :infoObj="infoObj" />
        <div slot="footer">
        </div>
      </Modal>
      <ZdryAddInfo :showAddZdry="showAddZdry" @on-click="closeAddZdry" @on-fresh="searchData"/>
      <ZdryEditInfo :infoObj="infoObj" :showEditZdry="showEditZdry" @on-click="closeEditZdry" @on-fresh="searchData"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTable from '@/components/base/HfxTable'
import ZdryDetailInfo from '@/components/module/zdry/ZdryDetailInfo'
import ZdryAddInfo from '@/components/module/zdry/ZdryAddInfo'
import ZdryEditInfo from '@/components/module/zdry/ZdryEditInfo'
export default {
  name: 'ZdryRightPanel',
  components: {LeftContentNameBar,HfxTable,ZdryDetailInfo,ZdryAddInfo,ZdryEditInfo},
  data () {
    return {
      isdel:"",
      deptcode:"",
      keyword:"",
      data:[],
      columns: [
        {
          key:'xh',
          title:"序号",
          width:5,
        },
        {
          key:'zjhm',
          title:"身份证号",
          width:10,
        },
        {
          key:'xm',
          title:"姓名",
          width:10,
        },
        {
          key:'zdrylb',
          title:"类别细类",
          width:10,
        },
        {
          key:'lxdh',
          title:"手机号码",
          width:10,
        },
        {
          key:'qqh',
          title:"QQ号",
          width:10,
        },
        {
          key:'wxh',
          title:"微信号",
          width:10,
        },
        {
          key:'zycph',
          title:"在用车牌号",
          width:10,
        },
        {
          key:'zrdw',
          title:"责任单位",
          width:10,
        },
        {
          key:'gkzrr',
          title:"管控责任人",
          width:10,
        },
        {
          key:'gkzrrlxfs',
          title:"管控人联系方式",
          width:10,
        },
        {
          key:'level',
          title:"评定等级",
          width:5,
           slot:"levelformart",
        },
        {
          key:'level',
          title:"查看详情",
          width:10,
          slot:"detailformart",
        },
       ],
    currentRow:{},//选中行
    showZdryDetail:false,
    infoObj:{
      xm:"",
        zjhm:"",
        lxdh:"",
        qqh:"",
        zdrylb:"",
        wxh:"",
        zycph:"",
        zrdw:"",
        level:"",
        gkzrr:"",
        gkzrrlxfs:"",
        hjdz:"",
        xzdz:"",
        gkremark:"",
    },
    showAddZdry:false,
    showEditZdry:false,
    countObj:{},
    }
  },
  computed: mapState({
    currentDept: state => state.zdry.currentDept,
     deptListObj: state => state.zdry.allDeptListObj
  }),
  methods:{
      searchData(){
        var paramObj={};
        paramObj.isdel=this.isdel;
        paramObj.deptcode=this.deptcode;
        paramObj.name=this.keyword;
        this.http.get("/zdry/getZdry",paramObj,this.getZdryCallBack,this,false);
      },
      getZdryCallBack(data){
        for(var i = 0;i<data.length;i++){
          data[i].xh=i+1;
        }
        this.data=data;
      },
      downloadData(){
          this.http.download("/zdry/getZdryListToExcle",null);
      },
      clickRow(data){
        this.currentRow = data;
      },
      deleteOneRow(){
        if(this.currentRow.id){
          if(confirm("确定删除该条重点人员信息?")){
            var paramObj={};
            paramObj.id=this.currentRow.id;
            this.http.get("/zdry/deleteZdry",paramObj,this.deleteZdryCallBack,this,false);
          }
        }else{
         this.$Message.error("请先选择重点人员");
        }
      },
      deleteZdryCallBack(data){
        this.$Message.success(data);
         this.searchData();
      },
      getRowClassName(row, index){
        var level = row.level;
        if(level==null||level==""){
          return "";
        }
        if(level=="黄色"){
            return 'table-row-yello';
        }else if(level=="橙色"){
            return 'table-row-orange';
        }else if(level=="红色"){
            return 'table-row-red';
        }
        return "";
      },
      showZdryInfo(row){
        var paramObj={};
        paramObj.id=row.id;
        this.http.get("/zdry/getZdryDetail",paramObj,this.getZdryDetailCallBack,this,false);
      },
      getZdryDetailCallBack(data){
        this.infoObj=data;
        this.showZdryDetail=true;
      },
      addZdry(){
        this.showAddZdry=true;
      },
      editZdry(){
        if(this.currentRow.id){
          this.showEditZdry=true;
          this.infoObj=this.currentRow;
        }else{
          this.$Message.error("请先选择重点人员");
        }
      },
      closeAddZdry(){
        this.showAddZdry=false;
      },
      closeEditZdry(){
        this.showEditZdry=false;
      },
      getZdryTongJiCallBack(data){
        this.countObj=data;
      },
  },
  created(){
    this.http.get("/zdry/getZdryTongJi",null,this.getZdryTongJiCallBack,this,false);
  },
  mounted(){
     this.deptcode=this.currentDept.deptcode;
    this.searchData();
  },
  watch : {
      currentDept:function(val) {
       this.deptcode=val.deptcode;
       this.searchData();  
      }
  }
}
</script>

<style scoped>
.zdryRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
}
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
.header2{
  padding-left:20px;
  color: #fff;
  font-size: 14px;
}
.contentPanel{
  width: 100%;
  height: calc(100% - 140px);
}
.pagePanel{
  position: absolute;
  bottom: 0px;
  left: calc(50% - 125px);
  height: 25px;
  line-height: 25px;
  text-align:center;
}
.table{
  width: 100%;
}
.tbody{
  width: 100%;
}
.tbody tr td{
  display:inline;
  padding: 5px 0px;
  text-align: left;
  color: #b6f6ff;
} 
.textClass{
  margin-left: 35px;
}
.spanClass{
  word-break: break-all;
  /* background-color: #333; */
  display:table-cell;
  padding: 2px 3px;
  width: 165px;
  color: white;
}
.spanClass2{
  word-break: break-all;
  /* background-color: #333; */
  display:table-cell;
  padding: 2px 3px;
  width: 425px;
  color: white;
}
.spantd{
  margin-left: 5px;
  display:inline;
}
.upload{
  margin-left: 10px;
}
.tablebutton{
  line-height: 26px;
  margin: 4px 0 0 0;
}
.levelClass{
    margin: 4px 0 0 20px;
    height: 28px;
    width: 28px;
    border-radius: 14px;
    text-align: center;
    line-height: 28px;
}
.table-row-yello{
   background:rgba(255, 255, 0,1) !important; 
    color: #000;
}
.table-row-blue{
      background-color:rgba(11, 73, 245,1) !important;
    color: #fff;
}
.table-row-orange{
      background-color:rgba(233, 143, 111,1) !important;
    color: #fff;
}
.table-row-red{
      background-color:rgba(245, 11, 11,1) !important;
    color: #fff;
}
select {
  height:28px;
  color: #b6f6ff;
  border: 1px solid #b6f6ff;
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
  height:28px;
  border: 1px solid #b6f6ff;
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
.inputClass{
    width: 150px;
    height: 28px;
    background-color: transparent;
    outline: 0;
    padding: 5px;
    color: #b6f6ff;
    border: 1px solid #b6f6ff;
}
.tablebutton{
  line-height: 26px;
  margin: 4px 0 0 0;
}
.countPanel{
  font-size: 16px;
}
</style>
<style>
.zdryinfo-panel .ivu-modal .ivu-modal-content{
  top: 200px;
  left:750px;
  width: 500px !important;
}
</style>

