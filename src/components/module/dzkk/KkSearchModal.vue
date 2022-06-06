<template>
    <Modal  v-model="showdata.showmodal"  :draggable = "true" :footer-hide="true" :title="title" class-name="kksearch-panel">
        <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="headerPanel">
              <div class="header">开始</div>
              <el-date-picker v-model="starttime"  type="datetime" placeholder="选择开始时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              <div class="header">结束</div>
              <el-date-picker v-model="endtime"   type="datetime" placeholder="选择结束时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              <div class="header">车牌号</div>
              <input class="inputclass"  v-model="cph" />
              <div class="header">车牌颜色</div>
              <select class="inputclass" v-model="hpys">
                <option value="">请选择</option>
                <option value="0">无牌类型1</option>
                <option value="1">蓝色</option>
                <option value="2">无牌类型2</option>
                <option value="3">黄色</option>
                <option value="4">白色</option>
                <option value="5">其他</option>
              </select>
              <input type="checkbox" style="margin:0 0 0 10px;"   v-model="issearchall" />
              <div  style="padding：5px;color：#b6f6ff;font-size:14px;margin-right:15px;" >全部卡口</div>
              <div class="header_button">
                <HfxButton style="margin-left:5px;" @click="submitSearch" name="查询"/>
              </div>
            </div>
          <HfxTable ref="table" :data="kkgcList" :columns="columns"  class="tableclass">
             <template #formartmc="{row,index}">
               <span :title="row.JKDMC">{{formartmc(row.JKDMC)}}</span>
            </template>
            <template #fomartCPPic="{row,index}">
               <div>
                 <img v-show="row.HPYS!=0&&row.HPYS!=2&&row.HPYS!=5" style="width:50px;height:30px;" :src="row.CPZP" />
                 <span v-show="row.HPYS==0||row.HPYS==2||row.HPYS==5">无照片</span>
               </div>
            </template>
            <template #fomartGCPic="{row,index}">
               <div>
                 <a :href="row.GCZP" target="_blank">点击查看过车照片</a> 
               </div>
            </template>
            <template #formarthpys="{row,index}">
               <div>
                 <span>{{formartHPYS(row.HPYS)}}</span>
               </div>
            </template>
          </HfxTable>
        <div class="footpanel">
          <div>
            <span style="margin:0 5px 0 0;">当前第{{ page }}页</span>
          <span style="margin:0 5px 0 0;">显示条数</span>
          <input class="inputclass" style="width:40px;height:26px;margin: 5px 10px 0 0;"  v-model="pageSize" />
          </div>
          <HfxButton style="margin: 5px 15px 0 0;" @click="firstPage" name="首页"/>
          <HfxButton style="margin: 5px 15px 0 0;" @click="previousPage" name="上一页"/>
          <HfxButton style="margin: 5px 15px 0 0;" @click="nextPage" name="下一页"/>
        </div>
    </Modal>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import HfxTable from '@/components/base/HfxTable'
import common from "@/common.js"
export default {
  name: 'WbSearchModal',
  props:['showdata'],
  components: {HfxTable},
  data () {
    return {
      starttime:"",
      endtime:"",
      cph:"",
      hpys:"",
      issearchall:false,
      page:1,
      pageSize:10,
      columns: [
            {
                title: '序号',
                key: 'RN',
                width:5,
            },
            {
                title: '点位名称',
                key: 'jkdmc',
                width:25,
                slot:'formartmc',
            },
            {
                title: '车牌号码',
                key: 'HPHM',
                 width:6,
            },
              {
                title: '车牌颜色',
                key: 'HPYS',
                width:10,
                slot:'formarthpys',
            },
              {
                title: '车牌照片',
                key: 'CPZP',
                 width:20,
                 slot:'fomartCPPic'
            },
            {
                title: '经过时间',
                key: 'JGSJ',
                width:17,
        
            },
            {
                title: '过车照片',
                key: 'GCZP',
                width:17,
                slot:'fomartGCPic'
            },
        ],
      kkgcList:[],
    }
  },
  computed:{ ...mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.ajzc.allDeptListObj
  }),
    jkdbh:function(){
      return this.showdata.jkdbh;
    },
    title:function(){
      return '卡口过车查询 —— '+this.showdata.jkdmc;
    },

  },
  methods:{  
    firstPage(){
      this.page = 1; 
      this.searchKkgc();
    },
    previousPage(){
      if(this.page>1){
        this.page=this.page-1;
      }
      this.searchKkgc();
    },
    nextPage(){
        this.page=this.page+1;
        this.searchKkgc();
    },
    submitSearch(){
      this.page = 1;
      this.searchKkgc();
    },
    clear(){
      this.endtime=this.formartDate(new Date());
      this.starttime=this.formartDate(new Date(new Date().setDate(new Date().getDate()-2)));
      this.cph="",
      this.hpys="";
      this.issearchall=false;
      this.page= 1;
      this.pageSize=10;
    },
    searchKkgc(){
     var param = {};
     param.page = this.page;
     param.pagesize = this.pageSize;
     if(this.issearchall){
      param.kkbh ="";
     }else{
      param.kkbh = this.jkdbh;
     }
     param.cph = this.cph;
     param.hpys = this.hpys;
     if(this.starttime==null||this.starttime==""){
          this.$Message.error("请选择开始时间");
          return;
     }
    param.starttime=this.starttime;
    if(this.endtime==null||this.endtime==""){
          this.$Message.error("请选择结束时间");
          return;
    }
    param.endtime=this.endtime;
    this.http.get("/dzkk/getKaKouGuoCheList",param,this.getKaKouGuoCheListCallBack,this,false);
    },
    getKaKouGuoCheListCallBack(data){
      this.kkgcList=data.data;
      this.$Message.success("查询成功");
    },
    formartDate(time) {
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
      },
    add0(m){
        return m<10?'0'+m:m;
    },
    formartHPYS(val){
      var str=val.trim();
      if(str=='0'){
        return "无";
      }
      if(str=='1'){
        return "蓝";
      }
      if(str=='2'){
        return "无";
      }
      if(str=='3'){
        return "黄";
      }
      if(str=='4'){
        return "白";
      }
      if(str=='5'){
        return "其他";
      }
    },
    formartmc(val){
      return common.cutstr(val,20);
    },
  },
  created(){
    this.endtime=this.formartDate(new Date());
    this.starttime=this.formartDate(new Date(new Date().setDate(new Date().getDate()-2)));
  },
  watch:{
    jkdbh:{
      handler(val){
        if(""!=val){
        this.clear();
        this.kkgcList=[];
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
  width:100px;
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
.footpanel{
  width: 100%;
  display: inline-flex;
  justify-content:center;
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
.tableclass{
  max-height: 400px;
  overflow: auto;
}
</style>
<style>
.kksearch-panel .ivu-modal .ivu-modal-content{
  top:180px;
  left:495px;
  width: 1115px !important;
}
</style>

