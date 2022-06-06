<template>
    <Modal v-model="showdata.showmodal" :draggable = "true" :footer-hide="true" title="修改指令核查主题" class-name="zlhcEditItem-panel">
      <div slot="close"><div class="hfx-modal-close"/></div>
        <div style="display:block;" v-loading="loading" element-loading-text="主题生成中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,0.5)">
            <div style="height: 410px;">
                <div class="zlhcEditPanel">
                    <div class="modal-div">
                        <span>选择参与部门：</span>
                        <Input class="deptnameInput" v-model="selectdeptnames" readonly="readonly" type="textarea"  />
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
                        <span>指令类型：</span>
                        <select class="inputclass" v-model="zllx" @change="changeProduct($event)">
                            <option value="">请选择指令来源</option>
                            <option value="1">人员核查</option>
                            <option value="2">案件核查</option>
                            <option value="3">线索核查</option>
                            <option value="4">物品核查</option>
                            <option value="5">110核查</option>
                            <option value="6">设卡拦截</option>
                            <option value="9">其他</option>
                        </select>
                    </div>
                    <div class="modal-div">
                        <span>主题标题：</span>
                        <input style="width: 360px;" class="inputclass" v-model="title"/>
                    </div>
                    <div class="modal-div">
                        <span>时限：</span>
                        <input style="width: 50px;" @change="getLimittime" class="inputclass" v-model="sx"/>
                        <label>小时</label>
                        <input style="width: 248px;right: -30px;position: relative;" placeholder="限制时间" class="inputclass" v-model="limittime"/>
                    </div>
                    <div class="modal-div">
                        <span>简要概括：</span>
                        <Input class="zlhctextarea" v-model="jygk" type="textarea"  />
                    </div>
                    <div class="modal-div">
                        <span>短信接收人：</span>
                        <Input class="deptnameInput" v-model="selectusernames" readonly="readonly" type="textarea"  />
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
                <div class="zlhcEditContentPanel">
                    <div class="modal-div">
                        <span>工作要求：</span>
                        <Input class="zlhctextarea" v-model="gzyq" type="textarea"  />
                    </div>
                    <div class="modal-div">
                        <span>领导意见：</span>
                        <Input class="zlhctextarea" v-model="ldyj" type="textarea"  />
                    </div>
                    <div class="modal-div">
                        <span>备注：</span>
                        <Input class="zlhctextarea" v-model="remark" type="textarea"  />
                    </div>
                </div>
            </div>
            <div class="zlhcEditBtn">
                <HfxButton  @click="addZlhcItem" />
                <HfxButton  @click="closeZlhc" name="取消" />
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
  name: 'ZlhcEditInfo',
  props:['showdata'],
  inject:['reflashItem'],//接收父页面的方法
  components: {UE,AllDeptTree,UserTransfer},
  data () {
    return {
        showUsers:false,
        zllx:"",
        zllxmc:"",
        title:"",
        sendtime:"",
        sx:2,
        limittime:"",
        jygk:"",
        gzyq:"",
        ldyj:"",
        remark:"",
        selectdeptnames:"",
        selectdeptcodes:"",
        selectusers:[],
        selectusercodes:"",
        selectusernames:"",
        loading:false,
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.zlhc.allDeptListObj
  }),
  methods:{
      addZlhcItem(){
          if(this.selectdeptnames=="" || this.selectdeptnames==null){
            this.$Message.error("参与部门不能为空");
            return;
          }
          if(this.title=="" || this.title==null){
            this.$Message.error("主题不能为空");
            return;
          }
          var updateItemParamObj = {};
          updateItemParamObj.id = this.data.id;//主题的id
          updateItemParamObj.deptcodes = this.selectdeptcodes;
          updateItemParamObj.deptnames = this.selectdeptnames;
          updateItemParamObj.zllx = this.zllx;
          updateItemParamObj.zllxmc = this.zllxmc;
          updateItemParamObj.title = this.title;
          updateItemParamObj.sx = this.sx;
          updateItemParamObj.jygk = this.jygk;
          updateItemParamObj.gzyq = this.gzyq;
          updateItemParamObj.ldyj = this.ldyj;
          updateItemParamObj.remark = this.remark;
          updateItemParamObj.sendtime = this.sendtime;
          updateItemParamObj.limittime = this.limittime;
          updateItemParamObj.usercodes = this.selectusercodes;
          updateItemParamObj.usernames = this.selectusernames;
          this.loading = true;
          this.http.post("/qzlq/updateZlhcItem",updateItemParamObj,this.updateZlhcItemCallBack,this,false);
      },
      updateZlhcItemCallBack(result){
          this.loading = false;
          this.showdata.showmodal = false;
          this.reflashItem();
      },
      closeZlhc(){
          this.showdata.showmodal = false;
      },
      changeProduct(event){
          this.zllxmc = event.target[this.zllx].label;
      },
      getLimittime(){
          let nowtime = new Date();
          var sendtime = this.$moment(nowtime).format("YYYY年MM月DD日 HH时mm分ss秒");
          let totime = new Date(Date.now() + this.sx*60*60*1000);
          var limittime = this.$moment(totime).format("YYYY年MM月DD日 HH时mm分ss秒");
          this.sendtime = sendtime;
          this.limittime = limittime;
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
         this.$store.dispatch('putChildState',{"key":"zlhc","childkey":"allDeptListObj","value":data});
      },
      initEditValues(){//初始化修改的值
        var paramObj = {};
        paramObj.itemid = this.data.id;
        this.http.get("/qzlq/getZlhcItemDetailByid",paramObj,this.getZlhcItemDetailByIdCallBack,this,false);
      },
      getZlhcItemDetailByIdCallBack(result){
          var itemdata = result.item;
          this.selectdeptcodes = itemdata.deptcodes+",";
          this.selectdeptnames = itemdata.deptnames+",";
          this.zllx = itemdata.zllx;
          this.zllxmc = itemdata.zllxmc;
          this.title = itemdata.title;
          this.sx = itemdata.sx;
          this.jygk = itemdata.jygk;
          this.gzyq = itemdata.gzyq;
          this.ldyj = itemdata.ldyj;
          this.remark = itemdata.remark;
          this.sendtime = itemdata.sendtime;
          this.limittime = itemdata.limittime;
          this.selectusercodes = itemdata.receiveusercode+",";
          this.selectusernames = itemdata.receiveusername+",";
      }
  },
  created(){
      this.http.get("/qzlq/getItemDeptTree",null,this.getDeptTreeCallBack,this,false);
  }
}
</script>
<style scoped>
.zlhcEditPanel{
    width: 480px;
    height: 410px;
    float: left;
}
.zlhcEditBtn{
    text-align: center;
}
.zlhcEditContentPanel{
    float: left;
    width: 480px;
    height: 410px;
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
.zlhctextarea{
  width:360px;
}
.zlhctextarea >>> textarea{
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
<style>
.deptselect-panel .ivu-modal .ivu-modal-content{
  width: 300px !important;
  z-index: 1000;
}
.zlhcEditItem-panel .ivu-modal .ivu-modal-content{
  top:180px;
  left:495px;
  width: 1015px !important;
}
</style>

