<template>
    <div class="hryjRightPanel">
      <LeftContentNameBar :isshowshaixuan="false"  style="margin:0 0 0 0;" />
        <div class="headerPanel">
            <div class="header">匹配类型</div>
            <select v-model="type_search" style="width:200px;margin-left:10px;" @on-change="changeRyType">
                  <option value="" >请选择</option>
                  <option v-for="item in HrrjTypeList" :key="item.type" :value="item.type" >{{item.typename}}</option>
            </select>
             <HfxButton @click="showEditHryjTypeModal" :width=80 style="margin-left:10px;" name="类型管理" />
            <div class="header2">搜索内容</div>
            <div><input v-model="keyword" class="inputClass"/></div>
            <HfxButton @click="searchDataByName" style="margin-left:10px;" name="搜索" />
            <HfxButton class="upload" name="新增关注人员" @click="showAddHryjModal" :width=100 />
            <HfxButton class="upload" name="下载导入模板" @click="downloadHryjTemplate()" :width=100 />
            <Upload class="upload" :action="uploadHryjUrl" :on-success="uploadHryjSuccess" :on-error="uploadHryjError">
                <HfxButton  name="导入关注人员" :width=100 />
            </Upload>
        </div>
        <div class="contentPanel" ref="contentPanel">
          <HfxTable ref="table" :data="data" :columns="columns"  class="tableclass" >
            <template #action="{row,index}">
              <div class="tablebutton">
                <HfxButton style="margin-right: 5px" @click="showUpdateHryjRy(row)" name="修改" />
                <HfxButton style="margin-right: 5px" @click="deleteHryjRy(row.phonenum)" name="删除" />

              </div>
            </template>
          </HfxTable>
        </div>
        <PagerNew class="pagePanel" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
        <Modal  v-model="showAddHryj"  :draggable = "true" :footer-hide="true" title="新增关注人员"  class-name="addhryj-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="margin-bottom:5px;">
                  <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">电话：</span>
                  <input v-model="phonenum_add" class="inputClass"/>
          </div>
          <div style="margin-bottom:5px;">
                  <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">姓名：</span>
                  <input v-model="name_add" class="inputClass"/>
          </div>
          <div style="margin-bottom:5px;">
                  <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">分类：</span>
                  <select v-model="type_add" style="width:250px;">
                    <option value="" >请选择</option>
                    <option v-for="item in HrrjTypeList" :key="item.type" :value="item.type" >{{item.typename}}</option>
                  </select>
          </div>
          <div style="margin-bottom:5px;">
                  <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">描述：</span>
                  <Input class="describeInput" v-model="describe_add"  type="textarea" :autosize="true" />
          </div>
          <div  style="text-align: center;">
                  <HfxButton @click="insertHryjRy" />
                  <HfxButton @click="hideAddHryjModal" name="取消" />
          </div>
    </Modal>
    <Modal  v-model="showMdyHryj"  :draggable = "true" :footer-hide="true" title="修改关注人员"  class-name="mdyhryj-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="margin-bottom:5px;">
                  <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">电话：</span>
                  <input v-model="phonenum_mdy" class="inputClass" :readonly="true" />
          </div>
          <div style="margin-bottom:5px;">
                  <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">姓名：</span>
                  <input v-model="name_mdy" class="inputClass"/>
          </div>
          <div style="margin-bottom:5px;">
                  <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">分类：</span>
                  <select v-model="type_mdy" style="width:250px;">
                    <option value="" >请选择</option>
                      <option v-for="item in HrrjTypeList" :key="item.type" :value="item.type" >{{item.typename}}</option>
                  </select>
          </div>
          <div style="margin-bottom:5px;">
                  <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">描述：</span>
                  <Input class="describeInput" v-model="describe_mdy"  type="textarea" :autosize="true" />
          </div>
          <div  style="text-align: center;">
                  <HfxButton @click="updateHryjRy" />
                  <HfxButton @click="hideMdyHryjModal" name="取消" />
          </div>
    </Modal>
    <Modal  v-model="showEditHrryType"  :draggable = "true" :footer-hide="true" title="编辑类型"  class-name="edithrrytype-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <HfxTable ref="typetable" :data="HrrjTypeList" :columns="typecolumns"  class="tableclass" >
            <template #action="{row,index}">
              <div class="tablebutton">
                <HfxButton style="margin-right: 5px" @click="deleteHryjType(row.type)" name="删除" />
              </div>
            </template>
          </HfxTable>
          <br/>
          <div style="margin-bottom:5px;text-align: center;">
              <span style="margin-left:25px;color:#b6f6ff;">新增类型</span>
          </div>
          <div style="margin-bottom:5px;">
              <span style="margin-left:25px;color:#b6f6ff;">类型编号：</span>
              <input v-model="hrrytypeno_add" class="inputClass"/>
          </div>
          <div style="margin-bottom:5px;">
              <span style="margin-left:25px;color:#b6f6ff;">类型名称：</span>
              <input v-model="hrrytypename_add" class="inputClass"/>
          </div>
          <div  style="text-align: center;">
                  <HfxButton @click="insertHryjRyType" />
                  <HfxButton @click="hideEditHryjTypeModal" name="取消" />
          </div>
    </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import PagerNew from '@/components/base/PagerNew'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTable from '@/components/base/HfxTable'
export default {
  name: 'HryjRightPanel',
  components: {PagerNew,LeftContentNameBar,HfxTable},
  data () {
    return {
      showLdryDetail:false,
      selectrow:null,//详情的行
      ldryDetailObj:{},//流动人员详情
      type_search:"",
      keyword:"",
      data:[],
      totalSize:1,
      pageSize:25,
      page:1,
      // uploadHryjUrl:"",
      showAddHryj:false,
      phonenum_add:"",
      name_add:"",
      type_add:"",
      describe_add:"",
      showMdyHryj:false,
      phonenum_mdy:"",
      name_mdy:"",
      type_mdy:"",
      describe_mdy:"",
      columns: [
            {
                title: '序号',
                key: 'xh',
                width:10,
            },
            {
                title: '电话',
                key: 'phonenum',
                width:10,
            },
            {
                title: '姓名',
                key: 'name',
                width:10,
            },
            {
                title: '类型',
                key: 'typename',
                width:10,
            },
            {
                title: '描述',
                key: 'describe',
                width:50,
            },
            {
                title: '操作',
                slot: 'action',
                width:10,
             }
       ],
       typecolumns: [
            {
                title: '类型编号',
                key: 'type',
                width:20,
            },
            {
                title: '类型名称',
                key: 'typename',
                width:40,
            },
            {
                title: '操作',
                slot: 'action',
                width:40,
             }
       ],
       HrrjTypeList:[],
       showEditHrryType:false,
       hrrytypeno_add:"",
       hrrytypename_add:"",
    }
  },
  computed: { ...mapState({
   
  }),
  uploadHryjUrl:function(){
    var sessionId = this.common.getSessionId();
   var  url=Constants.url_prefix+'/hryj/importHryjRyExcel?param={"type":"'+this.type_search+'"}&sessionId='+sessionId;
   return url;
  },
  
  },
  methods:{
    pageChange(page){
        this.page = page;
        this.searchData();
      },
    changeRyType(){

    },
    searchData(){
      var paramObj = {};
      paramObj.page = this.page;
      paramObj.pagesize = this.pageSize;
      paramObj.type = this.type_search;
      paramObj.keyword = this.keyword;
      this.http.get("/hryj/getHryjRyList",paramObj,this.getHryjRyListCallBack,this,false);
    },
    getHryjRyListCallBack(data){
      for(var i = 0;i<data.data.length;i++){
          data.data[i].xh = i+1;
        }
        this.data = data.data;
        this.totalSize = data.count;
    },
    searchDataByName(){
      this.page =1;
      this.searchData();
    },
    showAddHryjModal(){
      this.showAddHryj=true;
    },
    hideAddHryjModal(){
      this.showAddHryj=false;
    },
    showMdyHryjModal(){
      this.showMdyHryj=true;
    },
    hideMdyHryjModal(){
      this.showMdyHryj=false;
    },
    
    uploadHryjSuccess(response, file, fileList){
          if(response.code==1){
              this.$Message.success("上传人员信息成功");
              this.page = 1;
              this.searchData();
          }else if(response.code==0){
              this.$Message.error(response.data);
          } 
      },
      uploadHryjError(error, file, fileList){
          this.$Message.error("上传人员信息失败");
      },
    insertHryjRy(){
      var paramObj={};
      if(this.phonenum_add=="" || this.phonenum_add==null){
            this.$Message.error("电话号码不能为空");
            return;
      }
      if(this.name_add=="" || this.name_add==null){
            this.$Message.error("姓名不能为空");
            return;
      }
      if(this.type_add=="" || this.type_add==null){
            this.$Message.error("类型不能为空");
            return;
      }
      if(this.describe_add=="" || this.describe_add==null){
            this.$Message.error("描述不能为空");
            return;
      }
      paramObj.phonenum=this.phonenum_add;
      paramObj.name=this.name_add;
      paramObj.type=this.type_add;
      paramObj.describe=this.describe_add;
      this.http.post("/hryj/addHryjRy",paramObj,this.insertHryjRyCallBack,this,false);
    },
    insertHryjRyCallBack(result){
       console.log(result);
      if(result.msg){
        this.$Message.error(result.msg);
      }else{
        this.clearAddData();
        this.$Message.success("新增"+result.phonenum+"成功");

      }
    },
    deleteHryjRy(val){
      if(confirm("确认删除该条关注人员？")){
        var paramObj={};
        paramObj.phonenum=val;
        this.http.get("/hryj/delHryjRy",paramObj,this.delHryjRyCallBack,this,false);
      }else{
      }
    },
    delHryjRyCallBack(result){
      this.searchData();
       this.$Message.success(result);
    },
    clearAddData(){
      this.phonenum_add="";
      this.name_add="";
      this.type_add="";
      this.describe_add="";
    },
    showUpdateHryjRy(row){
      this.phonenum_mdy=row.phonenum;
      this.name_mdy=row.name;
      this.type_mdy=row.type;
      this.describe_mdy=row.describe;
      this.showMdyHryj=true;
    },
    updateHryjRy(){
      var paramObj={};
      if(this.phonenum_mdy=="" || this.phonenum_mdy==null){
            this.$Message.error("电话号码不能为空");
            return;
      }
      if(this.name_mdy=="" || this.name_mdy==null){
            this.$Message.error("姓名不能为空");
            return;
      }
      if(this.type_mdy=="" || this.type_mdy==null){
            this.$Message.error("类型不能为空");
            return;
      }
      if(this.describe_mdy=="" || this.describe_mdy==null){
            this.$Message.error("描述不能为空");
            return;
      }
      paramObj.phonenum=this.phonenum_mdy;
      paramObj.name=this.name_mdy;
      paramObj.type=this.type_mdy;
      paramObj.describe=this.describe_mdy;
      this.http.post("/hryj/mdyHryjRy",paramObj,this.mdyHryjRyCallBack,this,false);
    },
    mdyHryjRyCallBack(result){
      this.searchData();
      this.showMdyHryj=false;
      this.$Message.success(result);
    },
    showEditHryjTypeModal(){
      this.showEditHrryType=true;
    },
    hideEditHryjTypeModal(){
      this.showEditHrryType=false;
    },
    getHryjRyTypeList(){
       this.http.get("/hryj/getHryjRyTypeList",null,this.getHryjRyTypeListCallBack,this,false);
    },
    getHryjRyTypeListCallBack(result){
      this.HrrjTypeList=result;
    },
    insertHryjRyType(){
      var paramObj={};
      var type=this.hrrytypeno_add.trim();
      if(type=="" || type==null){
          this.$Message.error("类型编号不能为空");
          return;
      }
      paramObj.type=type;
      var typename=this.hrrytypename_add.trim();
          if(typename=="" || typename==null){
        this.$Message.error("类型名称不能为空");
            return;
      }
      paramObj.typename=typename;
      this.http.post("/hryj/addHryjRyType",paramObj,this.addHryjRyTypeCallBack,this,false);
    },
    addHryjRyTypeCallBack(result){
      if(result.state=="1"){
        this.$Message.error(result.msg);
      }else if(result.state=="0"){
        this.$Message.success(result.msg);
        this.hideEditHryjTypeModal();
        this.getHryjRyTypeList();
      }
      
    },
    deleteHryjType(type){
      var paramObj={};
      paramObj.type=type;
      this.http.post("/hryj/delHryjRyType",paramObj,this.delHryjRyTypeCallBack,this,false);
    },
    delHryjRyTypeCallBack(result){
      if(result.state=="1"){
        this.$Message.error(result.msg);
      }else if(result.state=="0"){
        this.$Message.success(result.msg);
        this.getHryjRyTypeList();
      }
    },
    downloadHryjTemplate(){
      var url=Constants.file_url+"hryj/呼入预警人员导入模板.xls";
      var a = document.createElement("a");
      a.href=url;
      a.click();
    },
  },
  created(){
    
  },
  mounted(){
    this.searchData();
    this.getHryjRyTypeList();
    // var sessionId = this.common.getSessionId();
    // this.uploadHryjUrl = Constants.url_prefix+'/hryj/importHryjRyExcel?param={"type":"'+this.type_search+'"}&sessionId='+sessionId;
  }
}
</script>

<style scoped>
.hryjRightPanel{
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
  padding:20px;
  color: #b6f6ff;
  font-size: 14px;
}
.contentPanel{
  width: 100%;
  height: calc(100% - 125px);
}
.pagePanel{
  position: absolute;
  bottom: 0px;
  left: calc(50% - 125px);
  height: 25px;
  line-height: 25px;
  text-align:center;
}
.spantd{
  margin-left: 5px;
  display:inline;
}
.upload{
  margin-left: 10px;
}
.inputClass{
  width:250px;
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
.tablebutton{
  line-height: 26px;
  margin: 4px 0 0 0;
}
.tabs{
  /* border: 1px solid #b6f6ff; */
}
.tabs >>> .el-tabs__content{
  /* background-color:#0b3c61; */
}

.tabs >>> .el-tabs__nav-scroll{
}
.tabs >>> .el-tabs__item{
  color: #b6f6ff;
} 
.tabs >>>.el-tabs__active-bar{
  display: none;
}
.tabs>>>.el-tabs__nav-wrap::after{
  background-color: #b6f6ff;
}
/* 无效 处理tabs标签左右两个一个靠左一个靠右 */
.tabs>>> .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: none !important;
}
.tabs>>> .el-tabs--bottom .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--top .el-tabs__item.is-top:last-child {
  padding-right: none !important;
}
.tabs >>> .el-tabs__item.is-active{
  color: white;
  /* background-color: #b6f6ff; */
  border-bottom: 3px solid white;
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
.describeInput{
  width:256px;
}
.describeInput >>> textarea{
  width: 250px;
  min-height: 56px;
  font-size: 12px;
  padding: 0 10px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
</style>
<style>
.addhryj-panel .ivu-modal .ivu-modal-content{
  top:300px;
  left:800px;
  width: 400px !important;
}
.mdyhryj-panel .ivu-modal .ivu-modal-content{
  top:300px;
  left:800px;
  width: 400px !important;
}
.edithrrytype-panel .ivu-modal .ivu-modal-content{
  top:300px;
  left:800px;
  width: 400px !important;
}

</style>

