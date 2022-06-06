<template>
    <Modal v-model="showdata.showmodal" :draggable = "true" :footer-hide="true" :title="editdata.title" class-name="dkkdEditItem-panel">
      <div slot="close"><div class="hfx-modal-close"/></div>
        <div style="display:block;">
            <div style="height: 250px;">
                <div class="dkkdEditPanel">
                    <div class="modal-div">
                        <span>卡点名称：</span>
                        <input style="width: 210px;" class="inputclass" v-model="name"/>
                    </div>
                    <div class="modal-div">
                        <span>卡点范围：</span>
                        <input type="number" style="width: 210px;" class="inputclass" v-model="radius"/>
                    </div>
                    <div class="modal-div">
                        <span>所属单位：</span>
                        <DropdownTreeNew class="dkkd_dropdown" :deptListObj="deptListObj" :choiceDept="choiceSearchDept" :orideptname="!showEditGpsObj.deptname?'':showEditGpsObj.deptname"/>
                    </div>
                    <div class="modal-div">
                        <span>责任人：</span>
                        <input style="width: 210px;" class="inputclass" v-model="zrr"/>
                    </div>
                    <div class="modal-div">
                        <span>备注信息：</span>
                        <textarea style="width: 210px;height:45px" class="inputclass" v-model="remark"/>
                    </div>
                </div>
            </div>
            <div class="dkkdEditBtn">
                <HfxButton @click="addDkkd"/>
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
  name: 'DkkdEditItem',
  props:['showdata','editdata'],
  components: {DropdownTreeNew},
  data () {
    return {
      groupid:"",
      itemid:"",
      name:"",
      radius:100,
      zrr:"",
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
    addDkkd(){
      if(this.name==''){
        this.$Message.error("名称不能为空");
        return;
      }
      if(this.radius==''){
        this.$Message.error("卡点范围");
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
      paramObj.groupid = this.groupid;
      paramObj.name = this.name;
      paramObj.radius = this.radius;
      paramObj.owndeptcode = this.showEditGpsObj.deptcode;
      paramObj.owndeptname = this.showEditGpsObj.deptname;
      paramObj.personliable = this.zrr;
      paramObj.remark = this.remark;
      if(this.editdata.title == "新增堵控点"){
        this.http.get("/znfk/insertDkd",paramObj,this.insertDkdCallBack,this,false);
      }
      if(this.editdata.title == "修改堵控点"){
        paramObj.id = this.itemid;
        delete paramObj.groupid;
        this.http.get("/znfk/updateDkd",paramObj,this.insertDkdCallBack,this,false);
      }
    },
    insertDkdCallBack(result){
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
      this.itemid = val.id;
      this.name = val.name;
      this.radius = val.radius;
      this.zrr = val.personliable;
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
    height: 250px;
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

