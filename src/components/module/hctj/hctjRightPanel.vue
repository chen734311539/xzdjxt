<template>
 <div class="hctjRightPanel">
    <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
    <div class="headerPanel">
      <select v-model="hctjtype" style="width:85px;" @change="unsetState()">
        <option value="ajzc">案件侦查</option>
        <option value="qqfw">请求服务</option>
        <option value="zlhc">指令核查</option>
        <option value="ryhc">人员核查</option>
      </select>
      <div class="header">参与部门</div>
        <Input class="deptnameInput" v-model="selectdeptnames" readonly="readonly" type="textarea" :autosize="false" />
        <Poptip ref="pop" placement="bottom" width="350" zIndex="2000" class="selectdeptsGroupPoptip" title="选择部门" >
          <HfxButton  name="选择部门" :width=70 />
            <div slot="title">选择部门</div>
            <div slot="content" style="height:300px;">
              <AllDeptTree @on-click="clickTree" class="deptpanel_treePanel" :deptListObj="deptListObj"/>
            </div>
        </Poptip>
        <HfxButton  style="margin-left: 10px;" @click="clearDepts" name="清空" :width=40 />
      <div class="header">状态</div>
      <select v-model="state" style="width:85px;">
        <option value="">请选择</option>
        <option v-show="hctjtype=='ajzc'||hctjtype=='zlhc'" value="0">{{getStateName(0)}}</option>
        <option v-show="hctjtype=='qqfw'||hctjtype=='zlhc'" value="1">{{getStateName(1)}}</option>
        <option v-show="hctjtype=='ajzc'||hctjtype=='qqfw'||hctjtype=='zlhc'" value="2">{{getStateName(2)}}</option>
        <option v-show="hctjtype=='ajzc'||hctjtype=='qqfw'" value="3">{{getStateName(3)}}</option>
      </select>
      <div class="header">开始时间</div>
        <el-date-picker v-model="starttime"  style="width:173px;" type="datetime" placeholder="选择起始时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      <div class="header">结束时间</div>
        <el-date-picker v-model="endtime"  style="width:173px;" type="datetime" placeholder="选择结束时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      <div class="header_button">
        <HfxButton  style="margin-left:5px;" @click="searchHctj"  name="查询" />
        <HfxButton  style="margin-left:5px;" @click="downloadhctj" name="下载" />
      </div>
    </div>
    <div class="contentPanel">
        <HfxTable  ref="ajzctable" :data="mainList" :columns="maincolumns"  class="tableclass" >
          <template #formartstate="{row,index}">
            <span>{{getStateName(row.state)}}</span>
          </template>
          <template #formarttitle="{row,index}">
                  <span  :title="[row.title]">{{common.cutstr(row.title,48)}}</span>
          </template>
          <template #formartdeptnames="{row,index}">
                  <span  :title="[row.deptnames]">{{common.cutstr(row.deptnames,30)}}</span>
          </template>
          <template #formartajmc="{row,index}">
                  <span  :title="[row.ajmc]">{{common.cutstr(row.ajmc,40)}}</span>
          </template>
          <template #formartsigned="{row,index}">
            <span>{{getStateName(row.signed)}}</span>
          </template>
        </HfxTable>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTable from '@/components/base/HfxTable'
import AllDeptTree from '@/components/base/AllDeptTree'
export default {
  name: 'hctjRightPanel',
  components: {LeftContentNameBar,HfxTable,AllDeptTree},
  data () {
    return {
        hctjtype:"ajzc",
        selectdeptnames:"",
        selectdeptcodes:"",
        state:"",
        starttime:"",
        endtime:"", 
        ajzccolumns: [
            {
              title: '序号',
              key: 'xh',
              width:5,
            },
            {
              title: '案件名称',
              key: 'title',
              width:20,
              slot:'formarttitle',
            },
            {
              title: '参与部门',
              key: 'deptnames',
              width:14,
              slot:'formartdeptnames',
            },
            {
              title: '状态',
              key: 'state',
              width:5,
              slot:'formartstate',
            },
            {
              title: '案件编号',
              key: 'ajbh',
              width:10,
            },
            {
              title: '案件内容',
              key: 'ajmc',
              width:20,
              slot:'formartajmc',
            },
            {
              title: '新增用户',
              key: 'insertusername',
              width:8,
            },
            {
              title: '新增ip',
              key: 'insertip',
              width:8,
            },
            {
              title: '新增时间',
              key: 'inserttime',
              width:10,
            },
        ],
        qqfwcolumns: [
            {
              title: '序号',
              key: 'xh',
              width:5,
            },
            {
              title: '请求主题',
              key: 'title',
              width:32,
            },
            {
              title: '参与部门',
              key: 'deptnames',
              width:32,
            },
            {
              title: '状态',
              key: 'state',
              width:5,
              slot:'formartstate',
            },
            {
              title: '新增用户',
              key: 'insertusername',
              width:8,
            },
            {
              title: '新增ip',
              key: 'insertip',
              width:8,
            },
            {
              title: '新增时间',
              key: 'inserttime',
              width:10,
            },
        ],
        zlhccolumns: [
            {
              title: '序号',
              key: 'xh',
              width:5,
            },
            {
              title: '指令类型',
              key: 'zllxmc',
              width:10,
            },
            {
              title: '指令名称',
              key: 'title',
              width:30,
            },
            {
              title: '参与部门',
              key: 'deptnames',
              width:24,
            },
            {
              title: '状态',
              key: 'signed',
              width:5,
              slot:'formartsigned',
            },
            {
              title: '新增用户',
              key: 'insertusername',
              width:8,
            },
            {
              title: '新增ip',
              key: 'insertip',
              width:8,
            },
            {
              title: '新增时间',
              key: 'inserttime',
              width:10,
            },
        ],
         ryhccolumns: [
            {
              title: '序号',
              key: 'xh',
              width:5,
            },
            {
              title: '人员核查标题',
              key: 'title',
              width:40,
            },
            {
              title: '参与部门',
              key: 'deptnames',
              width:29,
            },
            {
              title: '新增用户',
              key: 'insertusername',
              width:8,
            },
            {
              title: '新增ip',
              key: 'insertip',
              width:8,
            },
            {
              title: '新增时间',
              key: 'inserttime',
              width:10,
            },
        ],
        ajzcList:[],
        qqfwList:[],
        zlhcList:[],
        ryhcList:[],
        mainList:[],
        maincolumns:[],
    }
  },
  computed: mapState({
    deptListObj: state => state.zlhc.allDeptListObj,
  }),
  methods:{
      searchHctj(){
        var paramObj={};
        paramObj.hctjtype=this.hctjtype;
        paramObj.deptcode=this.selectdeptcodes;
        paramObj.state=this.state;
        paramObj.starttime=this.starttime;
        paramObj.endtime=this.endtime;
        this.http.get("/tjfx/getHctjList",paramObj,this.getHctjListCallBack,this,false);
        this.searchHctjCount();
      },
      getHctjListCallBack(data){
        for(var i=0;i<data.length;i++){
          data[i].xh=i+1;
        }
        this.mainList=data;
      },
      searchHctjCount(){
        var paramObj={};
        paramObj.deptcode=this.selectdeptcodes;
        paramObj.state=this.state;
        paramObj.starttime=this.starttime;
        paramObj.endtime=this.endtime;
        this.http.get("/tjfx/getHctjCount",paramObj,this.getHctjCountCallBack,this,false);
      },
      getHctjCountCallBack(data){
        this.$store.dispatch('putChildState',{"key":"hctj","childkey":"countObj","value":data});
      },
      downloadhctj(){
        var paramObj={};
        paramObj.deptcode=this.selectdeptcodes;
        paramObj.state=this.state;
        paramObj.starttime=this.starttime;
        paramObj.endtime=this.endtime;
        this.http.download("/tjfx/outputHctjExcel",paramObj);
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
      getStateName(state){
        if(this.hctjtype=="ajzc"){
          if(state==0){return "初查";}
          if(state==2){return "在侦";}
          if(state==3){return "已破";}
          return "";
        }else if(this.hctjtype=="qqfw"){
          if(state==1){return "新增";}
          if(state==2){return "研判";}
          if(state==3){return "完成";}
          return "";
        }else if(this.hctjtype=="zlhc"){
          if(state==0){return "未签收";}
          if(state==1){return "已签收";}
          if(state==2){return "超时";}
          return "";
        }else if(this.hctjtype=="ryhc"){
          return "";
        }
      },
      unsetState(){
        this.state="";
        this.maincolumns=[];
        this.mainList=[];
        if(this.hctjtype=="ajzc"){
         this.maincolumns=this.ajzccolumns;
        }else if(this.hctjtype=="qqfw"){
         this.maincolumns=this.qqfwcolumns;
        }else if(this.hctjtype=="zlhc"){
         this.maincolumns=this.zlhccolumns;
        }else if(this.hctjtype=="ryhc"){
        this.maincolumns=this.ryhccolumns;
        }
      },
      clickTree(data){
        this.selectdeptnames = this.selectdeptnames+data.deptname+",";
        this.selectdeptcodes = this.selectdeptcodes+data.deptcode+",";
      },
      getDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"zlhc","childkey":"allDeptListObj","value":data});
      },
      clearDepts(){
          this.selectdeptnames = "";
          this.selectdeptcodes = "";
      },
  },
  created(){
    this.http.get("/qzlq/getItemDeptTree",null,this.getDeptTreeCallBack,this,false);
    this.maincolumns=this.ajzccolumns;
    this.searchHctj();
  },
  watch : {
  }
}
</script>

<style scoped>
.hctjRightPanel{
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
  padding:10px;
  color: #b6f6ff;
  font-size: 14px;
}
.header_button{
  padding:20px;
}
.contentPanel{
  height: calc(100% - 100px);
  width: 100%;
  overflow: auto;
}
.table{
width: 100% !important;
}
.tbody{
  width: 100%;
}
.tableclass{
  height : 100%;
}
select {
  height:28px;
  color: #b6f6ff;
  border: 1px solid #b6f6ff;
  outline: none;
  background:transparent;
   padding-right: .14rem;
}
option {
  color: #b6f6ff;
  height:28px;
  border: 1px solid #b6f6ff;
  outline: none;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  background-color:rgba(8, 56, 90, 0.90);
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
.deptnameInput{
  width:306px;
}
.deptnameInput >>> textarea{
  width: 300px;
  height: 26px;
  min-height: 26px;
  font-size: 12px;
  padding: 0 10px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-popper{
  z-index: 2000;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-inner{
  background-color: rgba(8, 56, 90, 0.90);
  box-shadow: 0 0 3px 0 #1234ac;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-arrow:after{
  background-color: rgba(8, 56, 90, 0.90);
}
.deptpanel_treePanel{
  height: calc(100% - 24px - 5px);
}
</style>

