<template>
    <div class="yaglpanel">
      <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true" />
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" @on-clear="fanhuisearch" v-model="searchName"/>
            <div class="seachbar_caozuo">
              <div class="seachbar_add" @click="showAdd" ></div>
            </div>
        </div>
        <div class="yagllist-panel">
          <YaglButton v-for="yaObj in yalist" :key="yaObj.id" :data="yaObj" @show-flow="showFlow" @edit-plan="editPlan" @del-plan="delPlan"/>
        </div>
        <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
        <Modal v-model="showaddmodal" :draggable = "true" title="新增预案" class-name="yagl-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="yaglEditPanel">
            <div class="modal-div">
              <span class="detailsspan">预案名称：</span>
              <input style="width: 280px;" class="inputclass" v-model="name"/>
            </div>
            <div class="modal-div">
                    <span class="detailsspan">报警类别：</span>
                    <select style="width: 200px;" class="inputclass" v-model="alarmtype_add" @change="changeAlarmType_add">
                      <option value="">请选择类型</option>
                      <option  :value="alarmtype.code" v-for="(alarmtype,index) in alarmtypeListObj" :key="index">{{alarmtype.name}}</option>
                    </select>
            </div>
            <div class="modal-div">
                    <span class="detailsspan">报警类型：</span>
                    <select style="width: 200px;" class="inputclass" v-model="alarmcate_add">
                      <option value="">请选择类别</option>
                      <option  :value="alarmcate.code" v-for="(alarmcate,index) in alarmcate_addListObj" :key="index">{{alarmcate.name}}</option>
                    </select>
            </div>
            <div class="modal-div">
              <Tags :tagspro='tags_add'/>
            </div>
            <div class="modal-div">
              <span class="detailsspan" style="top:-70px;position:relative;">备注信息：</span>
              <textarea style="width: 280px;" class="textareaclass" v-model="remark"/>
            </div>
          </div>
          <div slot="footer">
             <HfxButton @click="cancelAdd" name="取消"/>
             <HfxButton@click="submitAdd"/>
          </div>
        </Modal>
        <Modal v-model="showEditModal" :draggable = "true" title="修改预案信息" class-name="yagl-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="yaglEditPanel">
            <div class="modal-div">
              <span class="detailsspan">预案名称：</span>
              <input style="width: 280px;" class="inputclass" v-model="editPlanObj.name"/>
            </div>
            <div class="modal-div">
                    <span class="detailsspan">报警类别：</span>
                    <select style="width: 200px;" class="inputclass" v-model="editPlanObj.jqlb" @change="getAlarmJqlxlist(editPlanObj.jqlb)">
                      <option value="">请选择类型</option>
                      <option  :value="alarmtype.code" v-for="(alarmtype,index) in alarmtypeListObj" :key="index">{{alarmtype.name}}</option>
                    </select>
            </div>
            <div class="modal-div">
                    <span class="detailsspan">报警类型：</span>
                    <select style="width: 200px;" class="inputclass" v-model="editPlanObj.jqlx">
                      <option value="">请选择类别</option>
                      <option  :value="alarmcate.code" v-for="(alarmcate,index) in alarmcate_addListObj" :key="index">{{alarmcate.name}}</option>
                    </select>
            </div>
            <div class="modal-div">
              <Tags :tagspro="editTags"/>
            </div>
            <div class="modal-div">
              <span class="detailsspan" style="top:-70px;position:relative;">备注信息：</span>
              <textarea style="width: 280px;" class="textareaclass" v-model="editPlanObj.remark"/>
            </div>
          </div>
          <div slot="footer">
             <HfxButton @click="cancelEdit" name="取消"/>
             <HfxButton@click="submitEdit"/>
          </div>
        </Modal>
    </div>      
</template>

<script>
import Vue from 'vue'
import Constants from '@/constants/Constants'
import InputSearchNew from '@/components/base/InputSearchNew'
import PagerNew from '@/components/base/PagerNew'
import common from "@/common.js"
import PlanFlowPage from '@/components/base/PlanFlowPage'
import YaglButton from '@/components/module/yagl/YaglButton'
import Tags from "@/components/module/yagl/Tags"
import LeftContentNameBar from '@/components/content/LeftContentNameBar'

export default {
  name: 'Yagl',
  components: {InputSearchNew,PagerNew,YaglButton,LeftContentNameBar,PlanFlowPage,Tags},
  data () {
    return {
      searchName:"",
      totalSize:0,
      pageSize:10,
      page:0,
      showaddmodal:false,
      showFlowPage:false,
      yalist:[],
      name:'',
      remark:'',
      tags_add:[],
      plandata:{},
      alarmtypeListObj:[],
      alarmcate_addListObj:[],
      alarmtype_add:"",
      alarmcate_add:"",
      showEditModal:false,
      editPlanObj:{},
      editTags:[],
    }
  },
  methods:{
    closePlan(){
       this.showFlowPage = false;
    },
    showAdd(){
      this.showaddmodal=true;
    },
    cancelAdd(){
       this.name = '';
       this.remark = "";
       this.alarmtype_add = "";
       this.alarmcate_add = "";
       this.tags_add = [];
       this.showaddmodal=false;
    },
    submitAdd(){
      var paramObj = {};
      if(this.alarmtype_add==""){
        this.$Message.error("请选择报警类别");
        return;
      }
      paramObj.jqlb=this.alarmtype_add;
      if(this.alarmcate_add==""){
        this.$Message.error("请选择报警类型");
        return;
      }
      paramObj.jqlx=this.alarmcate_add;
      paramObj.tags=this.tags_add.join(";");
      paramObj.name = this.name;
      paramObj.remark = this.remark;
      this.http.get("/znfk/addPlan",paramObj,this.addPlanCallBack,this,false);
    },
    addPlanCallBack(data){
        this.cancelAdd();
        this.getYalist();
    },
    cancelEdit(){
       this.editTags = [];
       this.showEditModal = false;
    },
    submitEdit(){
      var paramObj = {};
      paramObj.id = this.editPlanObj.id;
      if(this.editPlanObj.jqlb==""){
        this.$Message.error("请选择报警类别");
        return;
      }
      paramObj.jqlb=this.editPlanObj.jqlb;
      if(this.editPlanObj.jqlx==""){
        this.$Message.error("请选择报警类型");
        return;
      }
      paramObj.jqlx=this.editPlanObj.jqlx;
      paramObj.tags=this.editTags.join(";");
      paramObj.name = this.editPlanObj.name;
      paramObj.remark = this.editPlanObj.remark;
      this.http.get("/znfk/updatePlan",paramObj,this.updatePlanCallBack,this,false);
    },
    updatePlanCallBack(data){
        this.$Message.success("修改成功");
        this.cancelEdit();
        this.getYalist();
    },
    showFlow(data){
       this.$store.dispatch('putChildState',{"key":"yagl","childkey":"currentPlan","value":data});
    },
    editPlan(data){
       this.showEditModal = true;
       this.editPlanObj = data;
       if(data.tags){
         this.editTags = data.tags.split(";");
       }else{
         this.editTags = [];
       }
       this.getAlarmJqlxlist(data.jqlb);
    },
    getAlarmJqlxlist(jqlb){
      var paramObj = {};
      paramObj.alarmtype = jqlb;
      this.http.get("/kdzl/getAlarmCateListByType",paramObj,this.getAlarmCateListByType_addCallBack,this,false);
    },
    delPlan(data){
        var h = this.$createElement;
        this.$msgbox({
        title: '删除预案',
        message: h('p', null, [
          h('span', null, '是否删除预案('+data.name+')？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            done();
            var paramObj = {};
            paramObj.id = data.id;
            this.http.get("/znfk/deletePlan",paramObj,this.deletePlanCallBack,this,false);
          } else {
            done();
          }
        }
      }).catch();
    },
    deletePlanCallBack(data){
      this.$Message.success("删除成功");
       this.getYalist();
    },
    pageChange(page){
      this.page = page;
    },
    fanhuisearch(){
      this.searchName = '';
      this.getYalist();
    },
    inputSearch(){
      if(this.searchName==''){
        this.$Message.error("请输入搜索条件");
        return;
      }
      this.getYalist();
    },
    getYalist(){
      var paramObj = {};
      if(this.searchName!=''){
        paramObj.name = this.searchName;
      }
      paramObj.page = this.page;
      paramObj.pagesize = this.pageSize;
      //获取文件类型列表
      this.http.get("/znfk/getYaglList",paramObj,this.getYaglListCallBack,this,false);
    },
    getYaglListCallBack(data){
       this.yalist = data.data;
       this.totalSize = data.count;
    },
    getAlarmTypeListCallBack(data){
      this.alarmtypeListObj=data;
    },
    changeAlarmType_add(){
      var paramObj = {};
      paramObj.alarmtype=this.alarmtype_add;
      this.http.get("/kdzl/getAlarmCateListByType",paramObj,this.getAlarmCateListByType_addCallBack,this,false);
    },
    getAlarmCateListByType_addCallBack(data){
      this.alarmcate_add="";
      this.alarmcate_addListObj=data;
    },
  },
  created(){
     this.getYalist();
     //获取报警类型列表
     this.http.get("/kdzl/getAlarmTypeList",null,this.getAlarmTypeListCallBack,this,false);
  }
}
</script>
<style scoped>
.yaglpanel{
  height: 100%;
}
.seachbar{
  height: 36px;
  width: 100%;
  position: relative;
}
.seachbar_add{
  width: 19px;
  height: 20px;
  position:absolute;
  right: 0;
  top:7px;
  cursor: pointer;
  background:url(./../../../assets/dztc/dztc_addtc.png)  no-repeat;
}
.seachbar_InputSearch{
  height: 30px;
  width: 88%;
  float: left;
}
.seachbar_select{
  position: relative;
  height: 36px;
  width: 100%;
}
.seachbar_caozuo{
    height: 30px;
    width: 12%;
    float: right;
    top: 0px;
    position: relative;
    line-height: 30px;
}
.detailsspan{
  margin-right:8px;
}
.yaglEditPanel{
  width: 360px;
  height: auto;
}
.yagllist-panel{
  height: calc(100% - 100px);
  overflow-x: hidden;
  overflow-y: auto;
}
.pagebar{
  height: 24px;
  position: absolute !important;
  left: 60px !important;
  bottom: 10px !important;
}
.modal-div{
  margin: 0 0 10px 0;
}
.inputclass{
  padding: 0 10px;
  width:140px;
  height: 24px;
  outline: none;
  color: #58f5ff;
  background-color: transparent;
  border: 1px solid #58f5ff;
}
.inputclass2{
  border: 1px solid #58f5ff;
  background-color:	transparent;
  color: #58f5ff;
  width: 100%;
  height: 36px;
}
.textareaclass{
  padding: 0 10px;
  width:140px;
  height: 80px;
  outline: none;
  color: #58f5ff;
  background-color: transparent;
  border: 1px solid #58f5ff;  
}
#edui75{
  height:100% !important;
}
select {
  height:25px;
  width:111px;
  color: #58f5ff;
  border: 1px solid #58f5ff;
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
  color: #58f5ff;
  height:30px;
  border: 1px solid #58f5ff;
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
</style>
<style>
.yagl-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left: 300px;
  width: 380px !important;
}
.yagl-read-panel .ivu-modal .ivu-modal-content{
  top:100px;
  left: 650px;
  width: 800px !important;
  height: 600px !important;
}
</style>