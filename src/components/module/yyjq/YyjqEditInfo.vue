<template>
    <Modal v-model="showdata.showmodal" :draggable = "true" :footer-hide="true" title="修改扬言警情主题" class-name="yyjqEditItem-panel">
      <div slot="close"><div class="hfx-modal-close"/></div>
        <div style="display:block;">
            <div style="height: 570px;">
                <div class="yyjqEditPanel">
                    <div class="modal-div">
                        <span>选择参与部门：</span>
                        <Input class="deptnameInput" v-model="selectdeptnames" readonly="readonly" type="textarea" :autosize="true" />
                        <Poptip ref="pop" placement="bottom" width="350" zIndex="2000" class="selectdeptsGroupPoptip" title="选择部门" >
                            <HfxButton style="margin-top: 31px;" name="选择部门" :width=70 />
                            <div slot="title">选择部门</div>
                            <div slot="content" style="height:300px;">
                                <AllDeptTree @on-click="clickTree" class="deptpanel_treePanel" :deptListObj="deptListObj"/>
                            </div>
                        </Poptip>
                        <HfxButton style="margin-top: 31px;" @click="clearDepts" name="清空" :width=40 />
                    </div>
                    <div class="modal-div">
                        <span>主题状态：</span>
                        <select class="inputclass" v-model="state">
                            <option value="1">新增</option>
                            <option value="2">续报</option>
                            <option value="3">解除</option>
                        </select>
                    </div>
                    <div class="modal-div">
                        <span>主题标题：</span>
                        <input style="width: 360px;" class="inputclass" v-model="title"/>
                    </div>
                    <div class="modal-div">
                        <span>短信接收人：</span>
                        <Input class="deptnameInput" v-model="selectusernames" readonly="readonly" type="textarea" :autosize="true" />
                        <Poptip v-model="showUsers" ref="pop" placement="right-end" width="420" zIndex="2000" class="selectdeptsGroupPoptip" title="选择民警" >
                            <HfxButton style="margin-top: 31px;" name="选择民警" :width=70 />
                            <div slot="title">选择民警</div>
                            <div slot="content" style="height:370px;">
                                <UserTransfer @on-change="userTransferChange"/>
                                <div style="width:100%;text-align:end;">
                                    <HfxButton @click="selectedUsers" :width=40 />
                                </div>
                            </div>
                        </Poptip>
                        <HfxButton style="margin-top: 31px;" @click="clearUsers" name="清空" :width=40 />
                    </div>
                </div>
                <div class="yyjqEditContentPanel">
                    <div class="uespanel">
                        <UE :defaultMsg="defaultMsg" :config="config" ref="ue" ueid="yyjqedit"></UE>
                    </div>
                </div>
            </div>
            <div class="yyjqEditBtn">
                <HfxButton  @click="addyyjqItem" />
                <HfxButton  @click="closeyyjq" name="取消" />
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
  name: 'yyjqEditInfo',
  props:['showdata'],
  inject:['reflashItem'],//接收父页面的方法
  components: {UE,AllDeptTree,UserTransfer},
  data () {
    return {
        showUsers:false,
        defaultMsg: '',
        config: {
            initialFrameWidth: 578,
            initialFrameHeight: 473,
            autoHeightEnabled: false
        },
        state:"1",
        title:"",
        selectdeptnames:"",
        selectdeptcodes:"",
        selectusers:[],
        selectusercodes:"",
        selectusernames:"",
        contentid:""
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.yyjq.allDeptListObj
  }),
  methods:{
      addyyjqItem(){
          if(this.selectdeptnames=="" || this.selectdeptnames==null){
            this.$Message.error("参与部门不能为空");
            return;
          }
          if(this.title=="" || this.title==null){
            this.$Message.error("主题不能为空");
            return;
          }
          var updateItemParamObj = {};
          updateItemParamObj.itemid = this.data.id;//主题的id
          updateItemParamObj.deptcodes = this.selectdeptcodes;
          updateItemParamObj.deptnames = this.selectdeptnames;
          updateItemParamObj.state = this.state;
          updateItemParamObj.title = this.title;
          updateItemParamObj.usercodes = this.selectusercodes;
          updateItemParamObj.usernames = this.selectusernames;
          updateItemParamObj.content = this.$refs.ue.getUEContent();
          updateItemParamObj.contentid = this.contentid;//内容的id
          this.http.post("/qzlq/updateYyjqItem",updateItemParamObj,this.updateyyjqItemCallBack,this,false);
      },
      updateyyjqItemCallBack(result){
          this.showdata.showmodal = false;
          this.reflashItem();
      },
      closeyyjq(){
          this.showdata.showmodal = false;
      },
      selectedUsers(){
          this.showUsers = false;
          for(var i=0;i<this.selectusers.length;i++){
              this.selectusercodes = this.selectusercodes+this.selectusers[i].usercode+",";
              this.selectusernames = this.selectusernames+this.selectusers[i].username+","
          }
      },
      userTransferChange(userList){
          this.selectusers = userList;
      },
      clickTree(data){
        this.selectdeptnames = this.selectdeptnames+data.deptname+",";
        this.selectdeptcodes = this.selectdeptcodes+data.deptcode+",";
      },
      clearDepts(){
          this.selectdeptnames = "";
          this.selectdeptcodes = "";
      },
      clearUsers(){
          this.selectusercodes = "";
          this.selectusernames = "";
      },
      getDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"yyjq","childkey":"allDeptListObj","value":data});
      },
      initEditValues(){//初始化修改的值
        var paramObj = {};
        paramObj.itemid = this.data.id;
        this.http.get("/qzlq/getYyjqItemDetailById",paramObj,this.getyyjqItemDetailByIdCallBack,this,false);
      },
      getyyjqItemDetailByIdCallBack(result){
          var itemdata = result.item;
          var contentlist = result.data;
          this.contentid = contentlist[0].contentid;
          this.selectdeptcodes = itemdata.deptcodes+",";
          this.selectdeptnames = itemdata.deptnames+",";
          this.state = itemdata.state;
          this.title = itemdata.title;
          this.selectusercodes = itemdata.receiveusercode+",";
          this.selectusernames = itemdata.receiveusername+",";
          var content = contentlist[0].content;
          this.$refs.ue.setUEContent(content);
      }
  },
  created(){
      this.http.get("/qzlq/getItemDeptTree",null,this.getDeptTreeCallBack,this,false);
  }
}
</script>
<style scoped>
.yyjqEditPanel{
    width: 480px;
    height: 570px;
    float: left;
}
.yyjqEditBtn{
    text-align: center;
}
.yyjqEditContentPanel{
    float: left;
    width: 580px;
    height: 570px;
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
.editor-container{
    height: 570px;
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
  background-color: rgba(8, 56, 90, 0.90);
  box-shadow: 0 0 3px 0 #1234ac;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-arrow:after{
  background-color: rgba(8, 56, 90, 0.90);
}
.deptpanel_treePanel{
  height: calc(100% - 24px - 5px);
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
</style>
<style>
.deptselect-panel .ivu-modal .ivu-modal-content{
  width: 300px !important;
  z-index: 1000;
}
.yyjqEditItem-panel .ivu-modal .ivu-modal-content{
  top:180px;
  left:495px;
  width: 1115px !important;
  /* height: 600px !important; */
}
</style>

