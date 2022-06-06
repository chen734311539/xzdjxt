<template>
 <div class="jqbbRightPanel">
    <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
    <div class="headerPanel">
      <div class="header">开始时间</div>
        <el-date-picker v-model="starttime"  style="width:173px;" type="datetime" placeholder="选择起始时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      <div class="header">结束时间</div>
        <el-date-picker v-model="endtime"  style="width:173px;" type="datetime" placeholder="选择结束时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      <div class="header">警情类别</div>
      <select v-model="jqlbcode" style="width:85px;">
        <option value="">请选择</option>
        <option :value="jjlbObj.code" v-for="jjlbObj in jjlbcodeList" :key="jjlbObj.code">{{jjlbObj.name}}</option>
      </select>
      <div class="header_button">
        <!-- <Button type="primary" style="margin-left: 5px;" size="small" @click="searchJqbb">查询</Button> -->
        <!-- <Button type="primary" style="margin-left: 5px;" size="small" @click="printJqbb">在线打印</Button> -->
        <!-- <Button type="primary" style="margin-left: 5px;" size="small" @click="downloadJqbb">下载excel</Button> -->
        <HfxButton  style="margin-left:5px;" @click="searchJqbb" name="查询" />
        <HfxButton  style="margin-left:5px;" @click="downloadJqbb" name="下载" />
      </div>
    </div>
    <div class="contentPanel">
        <!-- <Table ref="table"  border :columns="columns" :data="jqbbList"></Table> -->
        <HfxTable ref="table" :data="jqbbList" :columns="columns"  class="tableclass" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTable from '@/components/base/HfxTable'
export default {
  name: 'JqbbRightPanel',
  components: {LeftContentNameBar,HfxTable},
  data () {
    return {
        starttime:"",
        endtime:"", 
        jqlbcode:"",
        deptcode:"",
        jjlbcodeList:[],
        jqbbList:[],
        columns: [
            {
                title: '部门单位',
                key: 'deptname',
                align:'center',
                width:15,
            },
            {
                title: '警情总数',
                key: 'jqzs',
                align:'center',
                 width:5,
            },
            {
                title: '未流转',
                key: 'jqwlzs',
                align:'center',
                 width:5,
            },
            {
                title: '无需处警数(pc)',
                key: 'pcwxcjs',
                align:'center',
                 width:10,
            },
            {
                title: 'app签收',
                key: 'appqss',
                align:'center',
                 width:5,
            },
            {
                title: 'app完成',
                key: 'appwcs',
                align:'center',
                 width:5,
            },
            {
                title: '无需处警数(app)',
                key: 'appwxcjs',
                align:'center',
                width:10,
            },
            {
                title: '夜间处警数',
                key: 'yjcjs',
                 align:'center',
                 width:5,
            },
            {
                title: '异常处警数',
                key: 'yccjs',
                 align:'center',
                 width:5,
            },
             {
                title: '1m签收',
                key: 'qs1Min',
                 align:'center',
                 width:5,
            },
             {
                title: '5m签收',
                key: 'qs5Min',
                 align:'center',
                 width:5,
            },
             {
                title: '30m签收',
                key: 'qs30Min',
                 align:'center',
                 width:5,
            },
             {
                title: '超30m签收',
                key: 'qs30sMin',
                align:'center',
                width:5,
            },
             {
                title: '10m处置',
                key: 'cz10Min',
                 align:'center',
                 width:5,
            },
             {
                title: '30m处置',
                key: 'cz30Min',
                 align:'center',
                 width:5,
            },
             {
                title: '超30m处置',
                key: 'cz30sMin',
                 align:'center',
                 width:5,
            }
        ],
    }
  },
  computed: {...mapState({
    userInfo: state => state.userInfo,
    currentDept: state => state.jqbb.currentDept,
  })
  },
  methods:{
      searchJqbb(){
        var paramObj={};
        if(this.deptcode==null||this.deptcode==""){
          this.$Message.error("请选择部门");
          return;
        }
        paramObj.deptcode=this.deptcode;
        if(this.starttime==null||this.starttime==""){
          this.$Message.error("请选择起始时间");
          return;
        }
        paramObj.starttime=this.starttime;
        if(this.endtime==null||this.endtime==""){
          this.$Message.error("请选择结束时间");
          return;
        }
        paramObj.endtime=this.endtime;
        paramObj.jqlbcode=this.jqlbcode;
        this.http.get("/jqbb/getJqbbForm",paramObj,this.getJqbbFormCallBack,this,false);
      },
      getJqbbFormCallBack(data){
        this.jqbbList=data;
      },
      // printJqbb(){
      //   var paramObj={};
      //   if(this.deptcode==null||this.deptcode==""){
      //     this.$Message.error("请选择部门");
      //     return;
      //   }
      //   paramObj.deptcode=this.deptcode;
      //   if(this.starttime==null||this.starttime==""){
      //     this.$Message.error("请选择起始时间");
      //     return;
      //   }
      //   paramObj.starttime=this.starttime;
      //   if(this.endtime==null||this.endtime==""){
      //     this.$Message.error("请选择结束时间");
      //     return;
      //   }
      //   paramObj.endtime=this.endtime;
      //   paramObj.jqlbcode=this.jqlbcode;
      //   this.http.get("/jqbb/downloadJqbbForm",paramObj,this.downloadJqbbFormCallBack,this,false);
      // },
      // downloadJqbbFormCallBack(data){
      //   console.log(Constants.file_url+data);
      //   let url=window.location.href+"";
      //   let openurl=url.substring(0,url.length-2)+"static/pdf/web/viewer.html?file="+Constants.file_url+data;
      //   window.open(openurl);
      // },
      downloadJqbb(){
        var paramObj={};
        if(this.deptcode==null||this.deptcode==""){
          this.$Message.error("请选择部门");
          return;
        }
        paramObj.deptcode=this.deptcode;
        if(this.starttime==null||this.starttime==""){
          this.$Message.error("请选择起始时间");
          return;
        }
        paramObj.starttime=this.starttime;
        if(this.endtime==null||this.endtime==""){
          this.$Message.error("请选择结束时间");
          return;
        }
        paramObj.endtime=this.endtime;
        paramObj.jqlbcode=this.jqlbcode;
        this.http.download("/jqbb/downloadexcelJqbbForm",paramObj);
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
      getSsjqLbCallBack(data){
        this.jjlbcodeList = data;
      },
  },
  created(){
    //获取警情类别
    this.http.get("/ssjq/getSsjqLb",null,this.getSsjqLbCallBack,this,false);
    this.endtime=this.formartDate(new Date());
    this.starttime=this.formartDate(new Date(new Date().setMonth(new Date().getMonth()-1)));
    this.deptcode=this.userInfo.directdeptcode;
    this.searchJqbb();
  },
  watch : {
      currentDept:function(val) {
        this.deptcode = val.deptcode;
        this.endtime=this.formartDate(new Date());
        this.starttime=this.formartDate(new Date(new Date().setMonth(new Date().getMonth()-1)));
        this.searchJqbb();
      },
  }
}
</script>

<style scoped>
.jqbbRightPanel{
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
.header_button{
  padding:20px;
}
.contentPanel{
  height: calc(100% - 100px);
  width: 100%;
  /* overflow: auto; */
}
.table{
width: 100% !important;
}
.tbody{
  width: 100%;
}
/* .tbody tr td{
  display:inline;
  padding: 5px 0px;
  text-align: left;
  color: #848484;
}  */
.tableclass{
  height : 100%;
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
.headerPanel >>> .el-input__inner {
    -webkit-appearance: none;
    background-color: transparent !important;
    background-image: none;
    border-radius: 0px;
    border: 1px solid #b6f6ff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #b6f6ff;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 28px;
    outline: 0;
    padding: 0 30px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.headerPanel >>>.el-input__prefix{
  color: #b6f6ff !important;
}
.headerPanel >>>.el-input__suffix{
  color: #b6f6ff !important;
}
/* 修改placehoder的字体大小和颜色 */
.headerPanel >>> input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #b6f6ff;
}
.date-picker{
  width: 180px !important;
  height: 28px !important;
}
</style>

