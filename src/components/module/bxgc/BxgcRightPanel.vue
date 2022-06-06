<template>
    <div class="mrtbRightPanel">
      <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
        <div class="headerPanel">
          <div class="ssyjtabletitle">
            <span>{{currentMonth}}比学赶超“红旗”“蜗牛”评选结果</span>
          </div>
        </div>
        <div class="contentPanel" ref="contentPanel"> 
          <table  class="zdsjtable"   cellpadding='0' cellspacing='0' >
          <tbody></tbody>
            <tr>
              <td rowspan="2" >部&nbsp;&nbsp;门</td>
              <td  colspan="3" >年度工作</td>
              <td rowspan="2">专项工作</td>
              <td rowspan="2">争先创优</td>
              <td rowspan="2">队伍建设</td>
              <td rowspan="2">执法规范</td>
              <td rowspan="2">本月合计</td>
              <td rowspan="2">累&nbsp;&nbsp;计</td>
            </tr>
            <tr>
              <td>反诈控方案</td>
              <td>基础工作</td>
              <td>刑事打击</td>
            </tr>
          <tr v-for="Obj in bxgcObj" :key="Obj.deptname">
            <td>{{Obj.deptname}}</td>
            <td><div v-show="Obj.fzkfa=='10'" class ='hongqi'/><div v-show="Obj.fzkfa=='20'" class ='woniu'/></td>
            <td><div v-show="Obj.jcgz=='10'" class ='hongqi'/><div v-show="Obj.jcgz=='20'" class ='woniu'/></td>
            <td><div v-show="Obj.xsdj=='10'" class ='hongqi'/><div v-show="Obj.xsdj=='20'" class ='woniu'/></td>
            <td><div v-show="Obj.zxgz=='10'" class ='hongqi'/><div v-show="Obj.zxgz=='20'" class ='woniu'/></td>
            <td><div v-show="Obj.zxcy=='10'" class ='hongqi'/><div v-show="Obj.zxcy=='20'" class ='woniu'/></td>
            <td><div v-show="Obj.dwjs=='10'" class ='hongqi'/><div v-show="Obj.dwjs=='20'" class ='woniu'/></td>
            <td><div v-show="Obj.zfgf=='10'" class ='hongqi'/><div v-show="Obj.zfgf=='20'" class ='woniu'/></td>
            <td >
             <div v-show="Obj.hqcount!=null&&Obj.wncount!=null&&(Obj.wncount!='0'||Obj.hqcount!='0')"><div class ='hongqi'/><div class='counttext'>*&nbsp;{{Obj.hqcount}}</div><div class ='woniu'/><div class='counttext'>*&nbsp;{{Obj.wncount}}</div></div>
            </td>
            <td >
              <div v-show="Obj.hqtotal!=null&&Obj.hqtotal!='0'&&Obj.wntotal!=null&&Obj.wntotal!='0'"><div class ='hongqi'/><div class='counttext'>*&nbsp;{{Obj.hqtotal}}</div><div class ='woniu'/><div class='counttext'>*&nbsp;{{Obj.wntotal}}</div></div>
            </td>
          </tr>
          </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'mrtbRightPanel',
  components: {LeftContentNameBar},
  data () {
    return {
      bxgcObj:[],
    }
  },
  computed: mapState({
    currentMonth: state => state.bxgc.currentMonth,
  }),
  methods:{
    getBxgcByMonthCallBack(data){
      this.bxgcObj=data;
    },
    getBxgcByMonth(val){
      this.http.get("/mrtb/getHqwnByMonth",{"month":val},this.getBxgcByMonthCallBack,this,false); 
    },
    getHqOrWn(str){
    var formatstr="";
    if("10"==str){
        formatstr="<div class ='hongqi'/>";
    }else if("20"==str){
        formatstr="<div class ='woniu'/>";
    }else if("30"==str){
        formatstr="";
    }else{
        formatstr="";
    };
    return formatstr;
  },
  getHqAndWn(hqcount,wncount,refs){
    if(hqcount==null||hqcount==""){
        return "";
    }
    if(wncount==null||wncount==""){
        return "";
    }
    var hqc=parseInt(hqcount);
    var wnc=parseInt(wncount);
    var total=hqc+wnc;
    var formatstr="";
    if(total<=5){
        for(var i=0;i<hqc;i++){
            formatstr+="<div class ='hongqi'/>";
        }
        for(var i=0;i<wnc;i++){
            formatstr+="<div class ='woniu'/>";
        }
    }else{
        formatstr="<div class ='hongqi'/><div class='counttext'>*&nbsp;"+hqc+"</div><div class ='woniu'/><div class='counttext'>*&nbsp;"+wnc+"</div>";

      }
    // return formatstr;
    this.$refs.refs.html(formatstr);
    }
  },
  created(){
    var month=this.common.dateFormat(new Date(),"yyyy-MM");
    this.$store.dispatch('putChildState',{"key":"bxgc","childkey":"currentMonth","value":month});
  },
  mounted(){
  },
    watch:{
    currentMonth:{
      handler(val){
        if(""!=val){
        this.getBxgcByMonth(val);
        }
      },
    }
  }
}
</script>

<style scoped>
.mrtbRightPanel{
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
.contentPanel{
  width: 100%;
  height: calc(100% - 125px);
  overflow: auto;
}
.inputClass{
  width:180px;
  height: 28px;
  padding:0 10px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
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
.ssyjtabletitle {
    text-align: center;
    color: #b6f6ff;
    line-height: 40px;
    position: absolute;
    left: 45%;
    height: 40px;
    font-size: 16px;
}
.tabletype{
  width: 129px;
  height: 32px;
  color: #b6f6ff;
  text-align: center;
  line-height: 32px;
  background: 
  url(./../../../assets/ssyj/ssyj_type.png)  no-repeat;
}
.tablecontent{
  display: flex;
  justify-content: space-around;
}
.tableColumn{
  height: 128px;
}
.tableColumn div{
   text-align: center;
   height: 32px;
   line-height: 32px;
   color: #b6f6ff;
   border: 1px solid #b6f6ff;
}
.table-cell-yellow{
   color:rgba(255, 255, 0,1) !important; 
}
.table-cell-green{
    color:rgba(103, 194, 58,1) !important;
}
.table-cell-red{
    color:rgba(237, 64, 20,1) !important;
}
.zdsjtable{
  border: 1px solid #255c95;
  text-align: center;
  color: white;
  height: 100%;
  width: 100%;
}
.zdsjtable tr{
 height: 40px;
}
.zdsjtable td{
  border: 1px solid #255c95;
 height: 40px;
 width: 30px;
}
.woniu{
    width: 26px;
    height: 20px;
    background:url(./../../../assets/bxgc/woniu.png) no-repeat;
    background-size:100% 100%;
    display: inline-block;
}
.hongqi{
    width: 26px;
    height: 20px;
    background:url(./../../../assets/bxgc/hongqi.png) no-repeat;
    background-size:100% 100%;
    display: inline-block;
}
.counttext{
    width: 26px;
    height: 20px;
    display: inline-block;
    font-family:"微软雅黑"; 
    font-size:13px;
}
</style>

