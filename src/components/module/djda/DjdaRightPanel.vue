<template>
 <div class="djdaRightPanel">
    <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
      <div class="djdadeptselect">
        <div class="depttab" style="border-right:1px solid;" :style="[selectTab=='my'?{color:'#fff'}:{color:'rgb(146 133 133)'}]" @click="showTab('my')">我的警情</div>
        <div class="depttab" :style="[selectTab=='all'?{color:'#fff'}:{color:'rgb(146 133 133)'}]" @click="showTab('all')">全部警情</div>
      </div>
      <div class="headerPanel">
        <div class="header">开始时间</div>
        <el-date-picker v-model="starttime"  type="datetime" placeholder="选择起始时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        <div class="header">结束时间</div>
        <el-date-picker v-model="endtime"   type="datetime" placeholder="选择结束时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        <div class="header">警情类别</div>
        <select v-model="jqlbcode" style="width:85px;">
            <option value="">请选择</option>
            <option :value="jjlbObj.code" v-for="jjlbObj in jjlbcodeList" :key="jjlbObj.code">{{jjlbObj.name}}</option>
        </select>
        <div class="header_button">
          <HfxButton style="margin-left:5px;"  @click="searchDjda" name="查询" />
        </div>
      </div>
      <div class="contentPanel">
        <HfxTable ref="table" :data="djdaList" :columns="selectTab=='my'?columnsmy:columnsall"  class="tableclass" :stripe="true" >
          <template #formartgxdw="{row,index}">
            <span  :title="[row.gxdwmc]">{{common.cutstr(row.gxdwmc,16)}}</span>
          </template>
          <template #formartafdd="{row,index}">
            <span  :title="[row.afdd]">{{common.cutstr(row.afdd,24)}}</span>
          </template>
          <template #formartremark="{row,index}">
            <span  :title="[row.remark]">{{common.cutstr(row.remark,24)}}</span>
          </template>
          <template #formartbjnr="{row,index}">
            <span  :title="[row.bjnr]">{{common.cutstr(row.bjnr,50)}}</span>
          </template>
          <template #mycaozuo="{row,index}">
              <div class="tablebutton">
                <HfxButton @click="register(index)" name="记录" />
                <HfxButton name="确认" />
                <HfxButton @click="showJqInfo(index)" name="详情"/>
                <HfxButton @click="getDjdaWord(index)" name="报表" />
              </div>
          </template>
          <template #allcaozuo="{row,index}">
              <div class="tablebutton">
                <HfxButton @click="renlingjq(index)" name="认领" />
                <HfxButton @click="showZpPanel(index)" name="指派" />
                <HfxButton @click="showJqInfo(index)" name="详情" />
              </div>
          </template>
          <template #formarthasremark="{row,index}">
              <span v-show="!row.remark" style="color:red;">未登记</span>
              <span v-show="row.remark" style="color:#67d067;">已登记</span>
          </template>
        </HfxTable>
      </div>
      <PagerNew class="pagePanel" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
      <JingQingDjda :jqdata="jdjajqData" :show="showDjda" @on-close="closeZpPanel"/>

      <Modal v-model="showRegister" :draggable = "true" title="盯警盯案警情备注" class-name="register-panel">
        <div slot="close"><div class="hfx-modal-close"/></div>
        <div class="registerPanel">
          <div class="modal-div" style="height:100px">
            <div style="width:70px;position:relative;float: left;">盯警信息:</div>
            <div style="width:395px;position:relative;float: left;">
              <textarea style="height:125px;width:395px;background:#2e548a;color:#fff;outline:0px;" v-model="reg_remark"/>
            </div>
          </div>
        </div>
        <div slot="footer">
          <HfxButton @click="cancelRegister" name="取消" />
          <HfxButton @click="submitRegister" name="登记" />
        </div>
      </Modal>
      <Modal v-model="showDetails" :draggable = "true" title="盯警盯案信息" class-name="details-panel">
        <div slot="close"><div class="hfx-modal-close"/></div>
        <div class="detailsPanel">
          <div class="detailsLeftPanel">
            <div class="modal-div" v-for="(obj,index) in djdaremarklist" :key="index" style="min-height: 100px;border: 1px solid;">
              <div style="width:100%;position:relative;text-align:center;height:25px;line-height:25px;">{{obj.deptname}}</div>
              <div class="remarkPanel">{{obj.remark}}</div>
            </div>
          </div>
        </div>
        <div slot="footer">
        </div>
      </Modal>
      <PdfVeiw :showdata="showpdf" :pdfdata="selectdjdata" @on-close="closePdf"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import PagerNew from '@/components/base/PagerNew'
import Constants from '@/constants/Constants'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTable from '@/components/base/HfxTable'
import PdfVeiw from '@/components/base/PdfVeiw'
import JingQingDjda from '@/components/module/jq/JingQingDjda'
export default {
  name: 'DjdaRightPanel',
  components: {PagerNew,LeftContentNameBar,HfxTable,PdfVeiw,JingQingDjda},
  data () {
    return {
        selectTab:'my',
        self: this,
        starttime:"",
        endtime:"", 
        jqlbcode:"",
        deptcode:"",
        jjlbcodeList:[],
        djdaList:[],
        totalSize:0,
        pageSize:30,
        page:1,
        showRegister:false,
        reg_jqid:"",
        reg_remark:"",
        showDetails:false,
        details:{},
        djdaremarklist:[],
        checkOption:'qr',
        jdjajqData:{},
        showDjda:false,
        showpdf:false,
        selectdjdata:{},
        columnsmy: [
            {
              title: '序号',
              key: 'xh',
              width: 5,
            },
            {
              title: '报警时间',
              key: 'bjsj',
              width: 10,
            },
            {
              title: '警单编号',
              key: 'jjdbh',
              width: 10,
            },
            {
                title: '报警内容',
                key: 'bjnr',
                width: 30,
                slot:'formartbjnr',
            },
            {
                title: '报警类别',
                key: 'bjlbmc',
                width: 8,
            },
            {
                title: '警情类型',
                key: 'bjlxmc',
                width: 8,
            },
             {
                title: '管辖单位',
                key: 'gxdwmc',
                width: 10,
                slot:'formartgxdw',
            },
            {
              title: '登记状态',
                key: 'hasremark',
                width: 5,
                slot:'formarthasremark',
            },
            {
                title: '操作',
                key: 'xh',
                width: 25,
                slot:"mycaozuo",
            },
        ],
        columnsall: [
            {
              title: '序号',
              key: 'xh',
              width: 5,
            },
            {
              title: '报警时间',
              key: 'bjsj',
              width: 10,
            },
            {
              title: '警单编号',
              key: 'jjdbh',
              width: 10,
            },
            {
              title: '案发地点',
              key: 'afdd',
              width: 15,
              slot:'formartafdd',
            },
            {
                title: '报警内容',
                key: 'bjnr',
                width: 25,
                slot:'formartbjnr',
            },
            {
                title: '报警类别',
                key: 'bjlbmc',
                width: 8,
            },
            {
                title: '警情类型',
                key: 'bjlxmc',
                width: 8,
            },
             {
                title: '管辖单位',
                key: 'gxdwmc',
                width: 10,
                slot:'formartgxdw',
            },
            {
                title: '登记状态',
                key: 'hasremark',
                width: 5,
                slot:'formarthasremark',
            },
            {
                title: '操作',
                key: 'xh',
                width: 15,
                slot:"allcaozuo",
            },
        ],
    }
  },
  computed: {...mapState({
      userInfo: state => state.userInfo,
      currentDept: state => state.djda.currentDept,
    }),
  },
  methods:{
      pageChange(page){
        this.page = page;
        this.searchDjda();
      },
      showZpPanel(index){
        this.showDjda = true;
        var data=this.djdaList[index];
        this.jdjajqData = data;
      },
      closeZpPanel(){
        this.showDjda = false;
      },
      showTab(val){
        this.selectTab = val;
        this.searchDjda();
      },
      renlingjq(index){
        var data=this.djdaList[index];
        var h = this.$createElement;
        this.$msgbox({
          title: '认领警情提示',
          message: h('p', null, [
            h('span', null, '是否认领该警情？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              var paramObj = {};
              paramObj.jqid = data.id;
              this.http.get("/djda/JqDjdaSetMe",paramObj,this.JqDjdaSetMeCallBack,this,false);
            } else {
              done();
            }
          }
        }).catch();
      },
      JqDjdaSetMeCallBack(){
        this.searchDjda();
        this.$Message.success("认领成功");
      },
      register(index){
        var data=this.djdaList[index];
        this.reg_jqid=data.id;
        this.reg_remark=data.remark;
        this.showRegister=true;
      },
      cancelRegister(){
        this.showRegister=false;
      },
      submitRegister(){
        var paramObj={};
        paramObj.jqid=this.reg_jqid;
        paramObj.remark=this.reg_remark;
        this.http.get("/djda/setJqDjdaRemark",paramObj,this.setJqDjdaRemarkCallBack,this,false);
      },
      setJqDjdaRemarkCallBack(data){
        this.searchDjda();
        this.$Message.success("登记成功");
        this.showRegister=false;
      },
      getDjdaWord(index){
        var data = this.djdaList[index];
        this.showpdf = true;
        this.selectdjdata = data;
      },
      closePdf(){
         this.showpdf = false;
         this.selectdjdata = {};
      },
      searchDjda(){
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
        paramObj.pagesize=this.pageSize;
        paramObj.page=this.page;
        if(this.selectTab=='my'){
          this.http.get("/djda/getDjdaForm",paramObj,this.getDjdaFormCallBack,this,false);
        }else{
          this.http.get("/djda/getDjdaAllForm",paramObj,this.getDjdaFormCallBack,this,false);
        }
      },
      getDjdaFormCallBack(data){
        this.djdaList=data.data;
        this.totalSize=data.count;
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
      showJqInfo(index){
        var data = this.djdaList[index];
        var paramObj = {};
        paramObj.jqid = data.id;
        this.http.get("/djda/getDjdaRemark",paramObj,this.getDjdaRemarkCallBack,this,false);
      },
      getDjdaRemarkCallBack(data){
        if(data.length==0){
           this.$Message.error("该警情还未被任何单位认领");
           return;
        }
         this.djdaremarklist = data;
         this.showDetails=true;
      },
  },
  created(){
    //获取警情类别
    this.http.get("/ssjq/getSsjqLb",null,this.getSsjqLbCallBack,this,false);
    //默认当前时间前一天
    this.endtime=this.formartDate(new Date());
    this.starttime=this.formartDate(new Date(new Date().setDate(new Date().getDate()-1)));
    this.deptcode=this.userInfo.directdeptcode;
    this.searchDjda();
  },
  watch : {
      currentDept:function(val) {
        this.deptcode = val.deptcode;
        this.searchDjda();
      },
  }
}
</script>

<style scoped>
.djdaRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
  padding: 4px;
}
.djdadeptselect{
  position: relative;
  top: 5px;
  height: 36px;
  color: #b6f6ff;
  border: 1px solid #b6f6ff;
  width: 202px;
}
.depttab{
  position: relative;
  width: 100px;
  float: left;
  height: 34px;
  cursor: pointer;
  line-height: 34px;
  text-align: center;
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
.modal-div{
  margin: 0 0 10px 0;
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
.inputclass2{
  width: 140px;
  height: 24px;
  outline: none;
  color: white;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.detailsspan{
  margin-right:8px;
}
.modal-div span{
    float: left;
    width: 120px;
    text-align: right;
    margin-right: 10px;
}
.contentPanel{
  height: calc(100% - 120px);
  width: 100%;
  overflow: auto;
}
.tableclass{
  height : 100%;
}
.pagePanel{
  position: absolute;
  bottom: 0px;
  left: calc(50% - 125px);
  height: 25px;
  line-height: 25px;
  text-align:center;
}
.messageInput{
  width:250px;
}
.messageInput >>> textarea{
  width: 250px;
  min-height: 26px;
  font-size: 12px;
  color: white;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.detailsInput{
  width:250px;
}
.detailsInput >>> textarea{
  width: 250px;
  min-height: 48px;
  font-size: 12px;
  color: white;
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
  border-left-color:rgba(14, 31, 98, 0.90)
}
.detailsPanel{
  display: flex;
}
.detailsLeftPanel{
  width:100%;
  max-height: 750px;
  overflow-y: auto;
  overflow-x: hidden;
}
.remarkPanel{
  width: calc(100% - 20px);
  min-height: 66px;
  background: #2e548a;
  margin: 0px 10px 10px 10px;
  position: relative;
}
.date-picker{
  width: 180px !important;
  height: 28px !important;
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
.tablebutton{
  line-height: 26px;
  margin: 4px 0 0 0;
}
</style>
<style>
.register-panel .ivu-modal .ivu-modal-content{
  top:200px;
  left: 750px;
  width: 500px !important;
}
.details-panel .ivu-modal .ivu-modal-content{
  top:100px;
  left: 750px;
  width: 600px !important;
}
</style>

