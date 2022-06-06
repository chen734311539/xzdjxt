<template>
    <Modal v-model="showdata.showmodal" :draggable = "true" :footer-hide="true" title="警情合成作战主题生成页" class-name="hczzEditItem-panel">
        <div slot="close"><div class="hfx-modal-close"/></div>
        <div style="display:block;">
            <div style="height: 450px;">
                <div class="hczzEditPanel">
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
                        <span>选择处警部门：</span>
                        <Input class="deptnameInput" v-model="selectcjdeptnames" readonly="readonly" type="textarea" :autosize="true" />
                        <Poptip ref="pop" placement="bottom" width="350" zIndex="2000" class="selectdeptsGroupPoptip" title="选择部门" >
                            <HfxButton style="margin-top: 31px;" name="选择部门" :width=70 />
                            <div slot="title">选择部门</div>
                            <div slot="content" style="height:300px;">
                                <AllDeptTree @on-click="clickCjTree" class="deptpanel_treePanel" :deptListObj="deptListObj"/>
                            </div>
                        </Poptip>
                        <HfxButton style="margin-top: 31px;" @click="clearCjDepts" name="清空" :width=40 />
                    </div>
                    <div class="modal-div">
                        <span>主题状态：</span>
                        <select class="inputclass" v-model="state">
                            <option value="0">初查</option>
                        </select>
                    </div>
                    <div class="modal-div">
                        <span>主题标题：</span>
                        <input style="width: 360px;" class="inputclass" v-model="title"/>
                    </div>
                    <div class="modal-div">
                        <span>报警时间：</span>
                        <el-date-picker style="width: 360px;" v-model="afsj" type="datetime" placeholder="选择日期时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </div>
                    <div class="modal-div">
                        <span>参与人员：</span>
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
                <div class="hczzEditContentPanel">
                    <div>备注内容：</div>
                    <div class="uespanel">
                        <Input class="remarkInput" v-model="defaultMsg" type="textarea" :autosize="true" />
                        <!-- <UE :defaultMsg="defaultMsg" :config="config" ref="ue" ueid="hczzedit"></UE> -->
                    </div>
                </div>
            </div>
            <div class="hczzEditBtn">
                <HfxButton  @click="addHczzItem" />
                <HfxButton  @click="closeHczz" name="取消" />
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
  name: 'HczzAddItem',
  props:['showdata','jqdata'],
  components: {UE,AllDeptTree,UserTransfer},
  data () {
    return {
        showUsers:false,
        defaultMsg: '',
        config: {
            initialFrameWidth: 250,
            initialFrameHeight: 280,
            autoHeightEnabled: false
        },
        state:"0",
        title:"1111",
        afsj:"",
        selectdeptnames:"",
        selectdeptcodes:"",
        selectcjdeptnames:"",
        selectcjdeptcodes:"",
        selectusers:[],
        selectusercodes:"",
        selectusernames:"",
        contentid:"",
        deptListObj:{},
    }
  },
  computed: {
  },
  methods:{
      addHczzItem(){
          if(this.selectdeptnames=="" || this.selectdeptnames==null){
            this.$Message.error("参与部门不能为空");
            return;
          }
          if(this.selectcjdeptnames=="" || this.selectcjdeptnames==null){
            this.$Message.error("处警部门不能为空");
            return;
          }
          if(this.selectusercodes=="" || this.selectusercodes==null){
            this.$Message.error("参与人员不能为空");
            return;
          }
          if(this.title=="" || this.title==null){
            this.$Message.error("主题不能为空");
            return;
          }
          if(this.afsj=="" || this.afsj==null){
            this.$Message.error("参与部门不能为空");
            return;
          }
          var addItemParamObj = {};
          addItemParamObj.ishczz = "1";
          addItemParamObj.jqid = this.jqdata.id;
          addItemParamObj.deptcodes = this.selectdeptcodes;
          addItemParamObj.deptnames = this.selectdeptnames;
          addItemParamObj.cjdeptcodes = this.selectcjdeptcodes;
          addItemParamObj.cjdeptnames = this.selectcjdeptnames;
          addItemParamObj.state = this.state;
          addItemParamObj.title = this.title;
          addItemParamObj.afsj = this.afsj;
          addItemParamObj.usercodes = this.selectusercodes;
          addItemParamObj.usernames = this.selectusernames;
          addItemParamObj.content = this.defaultMsg;
          this.http.post("/ssjq/creatHczzItem",addItemParamObj,this.insertAjzcItemCallBack,this,false);
      },
      insertAjzcItemCallBack(result){
          this.$Message.success("合成作战主题生成成功！");
          this.showdata.showmodal = false; 
      },
      closeHczz(){
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
      clickCjTree(data){
        this.selectcjdeptnames = this.selectcjdeptnames+data.deptname+",";
        this.selectcjdeptcodes = this.selectcjdeptcodes+data.deptcode+",";
      },
      clearDepts(){
          this.selectdeptnames = "";
          this.selectdeptcodes = "";
      },
      clearCjDepts(){
          this.selectcjdeptnames = "";
          this.selectcjdeptcodes = "";
      },
      clearUsers(){
          this.selectusercodes = "";
          this.selectusernames = "";
      },
      getDeptTreeCallBack(data){
         this.deptListObj = data;
      },
  },
  created(){
      this.http.get("/qzlq/getItemDeptTree",null,this.getDeptTreeCallBack,this,false);
  },
  watch : {
    jqdata:function(val) {
        this.title = val.afdd+val.bjlxmc;
        this.afsj = val.bjsj;
        this.defaultMsg = val.bjnr;
    },
  }
}
</script>
<style scoped>
.hczzEditPanel{
    width: 480px;
    height: 350px;
    float: left;
}
.hczzEditBtn{
    text-align: center;
}
.hczzEditContentPanel{
    float: left;
    width: 250px;
    height: 400px;
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
.remarkInput{
  width:256px;
}
.remarkInput >>> textarea{
  width: 250px;
  min-height: 385px;
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
    max-height: 385px;
    max-width: 400px;
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
.hczzEditItem-panel .ivu-modal .ivu-modal-content{
  top:233px;
  left:1111px;
  width: 800px !important;
}
</style>

