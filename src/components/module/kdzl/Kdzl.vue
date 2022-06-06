<template>
    <div class="kdzlpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" @on-clear="fanhuisearch" v-model="title"/>
            <div class="seachbar_select">
              <select class="inputclass2" v-model="groupid" @change="getGroupidSelected">
                <option  value="">全部文件</option>
                <option  :value="group.groupid" v-for="(group,index) in groupListObj" :key="index">{{group.groupname}}</option>
              </select>
              <!-- <Icon custom="iconfont icontianjia" class="seachbar_add"  @click="showAdd"/> -->
            </div>
            <div class="seachbar_caozuo">
              <div class="seachbar_add" @click="showAdd" ></div>
            </div>
            <!-- <Icon v-show="isfanhuishow" custom="iconfont iconfanhui" class="seachbar_fanhui" @click="fanhuisearch"/> -->
        </div>
        <div class="kdzllist-panel">
          <BookButton v-for="bookObj in bookList" :key="bookObj.bookid" :data="bookObj"  @on-change="bookChange(arguments)"></BookButton>
        </div>
        <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>

        <Modal v-model="showaddmodal" :draggable = "true" title="新增文件" class-name="kdzl-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="kdzlEditPanel">
            <div class="modal-div">
              <span class="detailsspan">文件标题：</span>
              <input style="width: 380px;" class="inputclass" v-model="title_add"/>
            </div>
            <div class="modal-div">
              <span class="detailsspan">文件类型：</span>
              <select style="width: 200px;" class="inputclass" v-model="groupid_add">
                <option value="">请选择分组</option>
                <option  :value="group.groupid" v-for="(group,index) in groupListObj" :key="index">{{group.groupname}}</option>
              </select>
            </div>
            <div class="modal-div">
                    <span class="detailsspan">报警类型：</span>
                    <select style="width: 200px;" class="inputclass" v-model="alarmtype_add" @change="changeAlarmType_add">
                      <option value="">请选择类型</option>
                      <option  :value="alarmtype.code" v-for="(alarmtype,index) in alarmtypeListObj" :key="index">{{alarmtype.name}}</option>
                    </select>
            </div>
            <div class="modal-div">
                    <span class="detailsspan">报警类别：</span>
                    <select style="width: 200px;" class="inputclass" v-model="alarmcate_add">
                      <option value="">请选择类别</option>
                      <option  :value="alarmcate.code" v-for="(alarmcate,index) in alarmcate_addListObj" :key="index">{{alarmcate.name}}</option>
                    </select>
            </div>
            <div class="modal-div">
              <Tags v-model='tags_add'/>
            </div>
            <div class="kdzlContentPanel">
              <div class="uepanel">
                <UE :defaultMsg="defaultMsg" :config="configadd" ref="ue" ueid="addkdzl"></UE>
              </div>
             </div>
          </div>
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="cancelAdd">重置</Button>
            <Button type="primary" size="large" @click="submitAdd">确定</Button> -->
            <HfxButton @click="cancelAdd" name="重置" />
             <HfxButton@click="submitAdd" />
          </div>
        </Modal>

      <Modal v-model="showreadmodal" :draggable = "true" :title="readTitle" class-name="kdzl-read-panel"> 
        <div slot="close"><div class="hfx-modal-close"/></div>
            <div class="uepanel">
              <UE :defaultMsg="defaultMsg" :config="configread" ref="ue_read" ueid="showkdzl"></UE>
            </div>
          <div slot="footer"></div>
      </Modal>

      <Modal v-model="showmdymodal" :draggable = "true" title="修改文件" class-name="kdzl-panel">
        <div slot="close"><div class="hfx-modal-close"/></div>
        <div class="kdzlEditPanel">
          <div class="modal-div">
            <span class="detailsspan">文件标题：</span>
            <input style="width: 380px;" class="inputclass" v-model="title_mdy"/>
          </div>
          <div class="modal-div">
            <span class="detailsspan">文件类型：</span>
            <select style="width: 200px;" class="inputclass" v-model="groupid_mdy">
              <option value="">请选择分组</option>
              <option  :value="group.groupid" v-for="(group,index) in groupListObj" :key="index">{{group.groupname}}</option>
            </select>
          </div>
          <div class="modal-div">
            <span class="detailsspan">报警类型：</span>
            <select style="width: 200px;" class="inputclass" v-model="alarmtype_mdy" @change="changeAlarmType_mdy">
              <option value="">请选择类型</option>
              <option  :value="alarmtype.code" v-for="(alarmtype,index) in alarmtypeListObj" :key="index">{{alarmtype.name}}</option>
            </select>
          </div>
          <div class="modal-div">
            <span class="detailsspan">报警类别：</span>
            <select style="width: 200px;" class="inputclass" v-model="alarmcate_mdy">
              <option value="">请选择类别</option>
              <option  :value="alarmcate.code" v-for="(alarmcate,index) in alarmcate_mdyListObj" :key="index">{{alarmcate.name}}</option>
            </select>
          </div>
          <div class="modal-div">
            <Tags v-model='tags_mdy'/>
          </div>
          <div class="kdzlContentPanel">
            <div class="uepanel">
              <UE :defaultMsg="defaultMsg" :config="configadd" ref="ue_mdy" ueid="editkdzl"></UE>
            </div>
          </div>
        </div>
        <div slot="footer">
          <!-- <Button type="text" size="large" @click="cancelMdy">取消</Button>
          <Button type="primary" size="large" @click="submitMdy">确定</Button> -->
          <HfxButton @click="cancelMdy" name="取消" />
          <HfxButton @click="submitMdy" />
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
import UE from '@/components/base/UEditor'
import BookButton from '@/components/module/kdzl/BookButton'
import Tags from "@/components/module/kdzl/Tags"
import LeftContentNameBar from '@/components/content/LeftContentNameBar'

export default {
  name: 'Kdzl',
  components: { InputSearchNew,PagerNew,UE,BookButton,Tags,LeftContentNameBar},
  data () {
    return {
      title:"",
      groupid:"",
      title_add:"",
      groupid_add:"",
      tags_add:[],
      alarmtype_add:"",
      alarmcate_add:"",
      title_mdy:"",
      groupid_mdy:"",
      tags_mdy:[],
      alarmtype_mdy:"",
      alarmcate_mdy:"",
      readTitle:"",
      bookid_handle:"",
      page:1,
      pageSize:10,
      showaddmodal:false,
      showreadmodal:false,
      showmdymodal:false,
      isfanhuishow:false, 
      defaultMsg: "",
      totalSize:0,
      bookList:[],
      groupListObj:{},
      alarmtypeListObj:{},
      alarmcate_addListObj:{},
      alarmcate_mdyListObj:{},
      configadd: {
        initialFrameWidth: 450,
        initialFrameHeight: 240,
        autoHeightEnabled: false
      },
       configread: {
        initialFrameWidth: "100%",
        initialFrameHeight: 450,
        readonly : true,
        autoHeightEnabled: false,
        }
    }
  },
  methods:{
    showAdd(){
      this.showaddmodal=true;
    },
    submitAdd(){
      var paramObj = {};
      if(this.title_add.trim()==""){
        this.$Message.error("文件标题不能为空");
        return;
      }
      paramObj.title=this.title_add;
      if(this.groupid_add==""){
        this.$Message.error("请选择文件分组");
        return;
      }
      paramObj.groupid=this.groupid_add;
      paramObj.groupname=this.groupListObj[this.groupid_add-1].groupname;
      paramObj.fullcontent=this.$refs.ue.getUEContent();
      if(this.alarmtype_add==""){
        this.$Message.error("请选择报警类型");
        return;
      }
      paramObj.alarmtype=this.alarmtype_add;
      if(this.alarmcate_add==""){
        this.$Message.error("请选择报警类别");
        return;
      }
      paramObj.alarmcate=this.alarmcate_add;
      paramObj.tags=this.tags_add.join();
      this.http.post("/kdzl/addBook",paramObj,this.addBookCallBack,this,false);
    },
    addBookCallBack(data){
      this.$Message.success("添加文件成功");
      this.cancelAdd();
      this.searchKdzl();
    },
    cancelAdd(){
      this.title_add="";
      this.groupid_add="";
      this.tags_add=[];
      this.alarmtype_add="";
      this.alarmcate_add="";
      this.$refs.ue.setUEContent("");
    },
    inputSearch(value){
      this.page=1;
      this.searchKdzl();
      this.isfanhuishow = true;
    },
    getGroupidSelected(){
      this.page=1;
      this.searchKdzl();
      this.isfanhuishow = true;
    },
    fanhuisearch(){
      this.page = 1;
      this.reset();
      this.isfanhuishow = false;
      this.searchKdzl();
    },
    bookChange(val){
      this.bookid_handle=val[1];
      if(val[0]=="read"){
        this.readBook();
      }
      if(val[0]=="mdy"){
        this.modifyBook();
      }
      if(val[0]=="del"){
        this.deleteBook();
      }
    },
    readBook(){
      var paramObj={};
      paramObj.bookid=this.bookid_handle;
      this.http.get("/kdzl/getBookDetailByBookid",paramObj,this.readBookCallBack,this,false);
    },
    readBookCallBack(data){
      this.readTitle=data.title;
      this.$refs.ue_read.setUEContent(data.fullcontent);
      this.showreadmodal=true;
    },
    modifyBook(){
      var paramObj={};
      paramObj.bookid=this.bookid_handle;
      this.http.get("/kdzl/getBookDetailByBookid",paramObj,this.modifyBookCallBack,this,false);
    },
    modifyBookCallBack(data){
      this.title_mdy=data.title;
      this.groupid_mdy=data.groupid;
      this.alarmtype_mdy=data.alarmtype;
      this.alarmcate_mdy=data.alarmcate;
      this.changeAlarmType_mdy();
      if(typeof data.tags == "undefined" || data.tags == null || data.tags == ""){
        this.tags_mdy=[];
      }else{
        this.tags_mdy=(data.tags+"").split(",");
      }
      this.$refs.ue_mdy.setUEContent(data.fullcontent);
      this.showmdymodal=true;
    },
    cancelMdy(){
      this.showmdymodal=false;
    },
    submitMdy(){
      var paramObj = {};
      paramObj.bookid=this.bookid_handle;
      if(this.title_mdy.trim()==""){
        this.$Message.error("文件标题不能为空");
        return;
      }
      paramObj.title=this.title_mdy;
      if(this.groupid_mdy==""){
        this.$Message.error("请选择文件分组");
        return;
      }
      paramObj.groupid=this.groupid_mdy;
      if(this.alarmtype_mdy==""){
        this.$Message.error("请选择报警类型");
        return;
      }
      paramObj.alarmtype=this.alarmtype_mdy;
      if(this.alarmcate_mdy==""){
        this.$Message.error("请选择报警类别");
        return;
      }
      paramObj.alarmcate=this.alarmcate_mdy;
      paramObj.tags=this.tags_mdy.join();
      paramObj.groupname=this.groupListObj[this.groupid_mdy-1].groupname;
      paramObj.fullcontent=this.$refs.ue_mdy.getUEContent();
      this.http.post("/kdzl/mdyBook",paramObj,this.mdyBookCallBack,this,false);
    },
    mdyBookCallBack(data){
      this.searchKdzl();
      this.$Message.success("修改成功");
      this.showmdymodal=false;
      
    },
     deleteBook(){
      var paramObj={};
      paramObj.bookid=this.bookid_handle;
      this.http.get("/kdzl/delBook",paramObj,this.deleteBookCallBack,this,false);
    },
    deleteBookCallBack(data){
      this.searchKdzl();
      this.$Message.success("删除成功");
    },
    pageChange(page){
      this.page = page;
      this.searchKdzl();
    },
    reset(){
      this.title="";
      this.groupid="";
    },
    getGroupListCallBack(data){
      this.groupListObj=data;
    },
    getAlarmTypeListCallBack(data){
      this.alarmtypeListObj=data;
    },
    getAlarmCateListByType_addCallBack(data){
      this.alarmcate_add="";
      this.alarmcate_addListObj=data;
    },
     getAlarmCateListByType_mdyCallBack(data){
      this.alarmcate_mdyListObj=data;
    },
    getBookListByGroupidCallBack(data){
      this.totalSize = data.count;
      this.bookList = data.data;
    },
    searchKdzl(){
      var paramObj = {};
      //翻页
      paramObj.page = this.page;
      paramObj.pagesize = this.pageSize;
      //文件标题关键字
      paramObj.title = this.title;
      paramObj.groupid = this.groupid;
      this.http.get("/kdzl/getBookListByGroupid",paramObj,this.getBookListByGroupidCallBack,this,false);
    },
    changeAlarmType_add(){
      var paramObj = {};
      paramObj.alarmtype=this.alarmtype_add;
      this.http.get("/kdzl/getAlarmCateListByType",paramObj,this.getAlarmCateListByType_addCallBack,this,false);
    },
     changeAlarmType_mdy(){
      var paramObj = {};
      paramObj.alarmtype=this.alarmtype_mdy;
      this.http.get("/kdzl/getAlarmCateListByType",paramObj,this.getAlarmCateListByType_mdyCallBack,this,false);
    }
  },
  created(){
    var paramObj = {};
   //获取文件类型列表
    this.http.get("/kdzl/getGroupList",null,this.getGroupListCallBack,this,false);
   //获取报警类型列表
   this.http.get("/kdzl/getAlarmTypeList",null,this.getAlarmTypeListCallBack,this,false);
    //获取文件列表
    this.http.get("/kdzl/getBookListByGroupid",paramObj,this.getBookListByGroupidCallBack,this,false);
  }
}
</script>
<style scoped>
.kdzlpanel{
  height: 100%;
  position: relative;
}
.seachbar{
  height: 131px;
  position: relative;
}
.seachbar_add{
  width: 19px;
  height: 20px;
  position:absolute;
  right: 0;
  top:0;
  cursor: pointer;
  background: 
    url(./../../../assets/dztc/dztc_addtc.png)  no-repeat;
}
.seachbar_InputSearch{
  height: 36px;
  width: 100%;
  margin-bottom: 17px;
}
.seachbar_select{
  position: relative;
  height: 36px;
  width: 100%;
}
.seachbar_caozuo{
  margin: 10px 0;
  height: 22px;
  position: relative;
  line-height: 22px;
}
.detailsspan{
  margin-right:8px;
}
.kdzlEditPanel{
  width: 480px;
  height: auto;
}
.kdzlContentPanel{
  width: 480px;
  height: auto;
}
.kdzllist-panel{
  height: calc(100% - 200px);
  overflow-x: hidden;
  overflow-y: auto;
}
.pagebar{
  height: 24px;
  position: absolute;
  left: 11px;
  bottom: -20px;
}
.modal-div{
  margin: 0 0 10px 0;
}
.inputclass{
  padding: 0 10px;
  width:140px;
  height: 24px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.inputclass2{
  border: 1px solid #b6f6ff;
  background-color:	transparent;
  color: #b6f6ff;
  width: 100%;
  height: 36px;
}
#edui75{
  height:100% !important;
}
select {
  height:25px;
  width:111px;
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
  height:30px;
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
</style>
<style>
.kdzl-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left: 387px;
  width: 480px !important;
}
.kdzl-read-panel .ivu-modal .ivu-modal-content{
  top:100px;
  left: 650px;
  width: 800px !important;
  height: 600px !important;
}
</style>