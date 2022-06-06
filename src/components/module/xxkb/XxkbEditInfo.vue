<template>
    <Modal v-model="showdata.showmodal" :draggable = "true" :footer-hide="true" title="修改信息快报主题" class-name="xxkbEditItem-panel">
      <div slot="close"><div class="hfx-modal-close"/></div>
        <div style="display:block;" v-loading="loading" element-loading-text="主题生成中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,0.5)">
            <div style="height: 330px;">
                <div class="xxkbEditPanel">
                    <div class="modal-div">
                        <span>本局部门：</span>
                        <Input class="deptnameInput" v-model="bjdeptnames" type="textarea"  />
                        <HfxButton style="margin-top: 31px;" @click="clearbjDepts" name="清空" :width=40 />
                    </div>
                    <div class="modal-div">
                        <span>外部部门：</span>
                        <Input class="deptnameInput" v-model="wbdeptnames" type="textarea"  />
                        <HfxButton style="margin-top: 31px;" @click="clearwbDepts" name="清空" :width=40 />
                    </div>
                    <div class="modal-div">
                        <span>主题标题：</span>
                        <input style="width: 360px;" class="inputclass" v-model="title"/>
                    </div>
                    <div class="modal-div">
                        <span>快报内容：</span>
                        <Input class="xxkbtextarea" v-model="kbnr" type="textarea"  />
                    </div>
                </div>
                <div class="zlhcEditContentPanel">
                    <div class="modal-div">
                        <span>领导批示：</span>
                        <Input class="xxkbtextarea" v-model="ldps" type="textarea"  />
                    </div>
                    <div class="modal-div">
                        <span>签报：</span>
                        <input style="width: 360px;" class="inputclass" v-model="qbr"/>
                    </div>
                    <div class="modal-div">
                        <span>拟稿：</span>
                        <input style="width: 360px;" class="inputclass" v-model="ngr"/>
                    </div>
                    <div class="modal-div">
                        <span>审稿：</span>
                        <input style="width: 360px;" class="inputclass" v-model="sgr"/>
                    </div>
                    <div class="modal-div">
                        <span>发稿时间：</span>
                        <el-date-picker style="width: 360px;" v-model="fbsj" type="datetime" placeholder="选择发稿时间" size="mini" class="date-picker" value-format="yyyy年MM月dd日 HH时mm分"></el-date-picker>
                    </div>
                </div>
            </div>
            <div class="xxkbEditBtn">
                <HfxButton @click="addXxkbItem" />
                <HfxButton @click="closeXxkb" name="取消" />
            </div>
        </div>
    </Modal>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import UE from '@/components/base/UEditor'
import AllDeptTree from '@/components/base/AllDeptTree'
import UserTransfer from '@/components/base/UserTransfer'


export default {
  name: 'XxkbEditInfo',
  props:['showdata'],
  inject:['reflashItem'],//接收父页面的方法
  components: {UE,AllDeptTree,UserTransfer},
  data () {
    return {
        title:"",
        qh:"",
        kbnr:"",
        ldps:"",
        qbr:"",
        ngr:"",
        sgr:"",
        fbsj:"",
        bjdeptnames:"",
        wbdeptnames:"",
        loading:false,
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.xxkb.allDeptListObj
  }),
  methods:{
      addXxkbItem(){
          if(this.bjdeptnames=="" || this.bjdeptnames==null){
            this.$Message.error("参与部门不能为空");
            return;
          }
          if(this.title=="" || this.title==null){
            this.$Message.error("主题不能为空");
            return;
          }
          if(this.kbnr=="" || this.kbnr==null){
            this.$Message.error("快报内容不能为空");
            return;
          }
          var updateItemParamObj = {};
          updateItemParamObj.id = this.data.id;//主题的id
          updateItemParamObj.bjdeptnames = this.bjdeptnames;
          updateItemParamObj.wbdeptnames = this.wbdeptnames;
          updateItemParamObj.title = this.title;
          updateItemParamObj.kbnr = this.kbnr;
          updateItemParamObj.ldps = this.ldps;
          updateItemParamObj.qbr = this.qbr;
          updateItemParamObj.ngr = this.ngr;
          updateItemParamObj.sgr = this.sgr;
          updateItemParamObj.fbsj = this.fbsj;
          this.loading = true;
          this.http.post("/qzlq/updateXxkbItem",updateItemParamObj,this.updateXxkbItemCallBack,this,false);
      },
      updateXxkbItemCallBack(result){
          this.loading = false;
          this.showdata.showmodal = false;
          this.reflashItem();
      },
      closeXxkb(){
          this.showdata.showmodal = false;
      },
      clearbjDepts(){
          this.bjdeptnames = "";
      },
      clearwbDepts(){
          this.wbdeptnames = "";
      },
      getDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"xxkb","childkey":"allDeptListObj","value":data});
      },
      initEditValues(){//初始化修改的值
        var paramObj = {};
        paramObj.itemid = this.data.id;
        this.http.get("/qzlq/getXxkbItemDetailByid",paramObj,this.getXxkbItemDetailByIdCallBack,this,false);
      },
      getXxkbItemDetailByIdCallBack(result){
          var itemdata = result.item;
          this.bjdeptnames = itemdata.bjdeptnames;
          this.wbdeptnames = itemdata.wbdeptnames;
          this.kbnr = itemdata.kbnr;
          this.title = itemdata.title;
          this.ldps = itemdata.ldps;
          this.qbr = itemdata.qbr;
          this.ngr = itemdata.ngr;
          this.sgr = itemdata.sgr;
          this.fbsj = itemdata.fbsj;
      }
  },
  created(){
      this.http.get("/qzlq/getItemDeptTree",null,this.getDeptTreeCallBack,this,false);
  }
}
</script>
<style scoped>
.xxkbEditPanel{
    width: 480px;
    height: 330px;
    float: left;
}
.xxkbEditBtn{
    text-align: center;
}
.xxkbEditContentPanel{
    float: left;
    width: 480px;
    height: 330px;
    margin-left: 22px;
}
.modal-div{
  margin: 0 0 20px 0;
}
.modal-div span{
  float: left;
  width: 85px;
  text-align: right;
  margin-right: 10px;
}
.inputclass{
  width:180px;
  height: 28px;
  padding: 0 10px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.date-picker{
  border: 0px;
  background-color: #2e3136;
  color: #d8d8d8;
  border-radius: 4px;
  width:180px;
  height: 28px;
}
.deptnameInput{
  width:256px;
}
.deptnameInput >>> textarea{
  width: 250px;
  min-height: 56px;
  font-size: 12px;
  padding: 0 10px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.xxkbtextarea{
  width:360px;
}
.xxkbtextarea >>> textarea{
  width: 360px;
  min-height: 90px;
  font-size: 12px;
  padding: 0 10px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.editor-container{
    height: 450px;
}
.uespanel{
    overflow: visible;
    max-height: 475px;
    max-width: 578px;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-popper{
  z-index: 2000;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-inner{
  background:#171616;
  box-shadow: 0px 1px 7px -1px #C0C0C0;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-arrow:after{
  border-left-color:#171616;
}
.deptpanel_treePanel{
  height: calc(100% - 24px - 5px);
}
</style>
<style>
.deptselect-panel .ivu-modal .ivu-modal-content{
  width: 300px !important;
  z-index: 1000;
}
.xxkbEditItem-panel .ivu-modal .ivu-modal-content{
  width: 1015px !important;
}
</style>

