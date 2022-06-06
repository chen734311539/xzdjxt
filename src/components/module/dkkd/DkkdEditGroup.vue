<template>
    <Modal v-model="showdata.showmodal" :draggable = "true" :footer-hide="true" :title="editdata.title" class-name="dkkdEditItem-panel">
      <div slot="close"><div class="hfx-modal-close"/></div>
        <div style="display:block;">
            <div style="height: 210px;">
                <div class="dkkdEditPanel">
                    <div class="modal-div">
                        <span>小组名称：</span>
                        <input style="width: 210px;" class="inputclass" v-model="groupname"/>
                    </div>
                    <div class="modal-div">
                        <span>所属单位：</span>
                        <DropdownTreeNew class="dkkd_dropdown" :deptListObj="deptListObj" :choiceDept="choiceSearchDept" :orideptname="!showEditGpsObj.deptname?'':showEditGpsObj.deptname"/>
                    </div>
                    <div class="modal-div">
                        <span>备注信息：</span>
                        <Input type="textarea" :autosize="true" class="dkkdtextarea" v-model="remark"/>
                    </div>
                </div>
            </div>
            <div class="dkkdEditBtn">
                <HfxButton @click="addDkkdGroup"/>
                <HfxButton @click="hideModal" name="取消" />
            </div>
        </div>
    </Modal>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import DropdownTreeNew from '@/components/base/DropdownTreeNew'

export default {
  name: 'DkkdEditGroup',
  props:['showdata','editdata'],
  components: {DropdownTreeNew},
  data () {
    return {
      groupid:"",
      groupname:"",
      remark:"",
      showEditGpsObj:{},
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.dkkd.allDeptListObj
  }),
  methods:{
    choiceSearchDept(data){
       this.showEditGpsObj.deptcode = data.deptcode;
       this.showEditGpsObj.deptname = data.deptname;
    },
    hideModal(){
      this.showdata.showmodal = false;
    },
    addDkkdGroup(){
      if(this.groupname==''){
        this.$Message.error("名称不能为空");
        return;
      }
      if(!this.showEditGpsObj.deptcode){
        this.$Message.error("部门不能为空");
        return;
      }
      if(!this.showEditGpsObj.deptname){
        this.$Message.error("部门不能为空");
        return;
      }
      var paramObj = {};
      paramObj.groupname = this.groupname;
      paramObj.deptcode = this.showEditGpsObj.deptcode;
      paramObj.deptname = this.showEditGpsObj.deptname;
      paramObj.remark = this.remark;
      if(this.editdata.title == "新增堵控分组"){
        this.http.get("/znfk/insertDkdGroup",paramObj,this.insertDkdGroupCallBack,this,false);
      }
      if(this.editdata.title == "修改堵控分组"){
        paramObj.groupid = this.groupid;
        this.http.get("/znfk/updateDkdGroup",paramObj,this.insertDkdGroupCallBack,this,false);
      }
    },
    insertDkdGroupCallBack(result){
       this.$Message.success("操作成功");
       this.hideModal();
       this.$emit('handler',result,"reflash");
    }
  },
  created(){

  },
  watch: {
    editdata:function(val){
      this.groupid = val.groupid;
      this.groupname = val.groupname;
      this.remark = val.remark;
      this.showEditGpsObj.deptcode=val.deptcode;
      this.showEditGpsObj.deptname=val.deptname;
    }
  }
}
</script>
<style scoped>
.dkkdEditPanel{
    width: 330px;
    height: 210px;
    float: left;
}
.dkkdEditBtn{
  text-align: center;
  margin-top: 10px;
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
  outline: none;
  color: #b6f6ff;
  padding:0 10px;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.dkkdtextarea{
  width:210px;
}
.dkkdtextarea >>> textarea{
  width: 210px;
  min-height: 100px;
  font-size: 12px;
  padding: 2px 10px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.numberinput >>> .el-input__inner{
  background-color: #2e8cb8;
  color: #b6f6ff;
  border: 0px;
}
.el-input-number--small {
  width: 210px;
}
.dkkd_dropdown{
  height: 28px;
  width: 210px;
  /* position:absolute !important; */
  top:-20px;
  left:95px;
}
</style>
<style>
.dkkdEditItem-panel .ivu-modal .ivu-modal-content{
  top: 240px;
  left:300px;
  width: 350px !important;
}
.dkkd_dropdown .iconclass{
  top:24px !important;
}
</style>

