<template>
    <div class="jsglRightPanel">
      <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
       <div class="option-panel">
          <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showAddRoleModal">添加角色</Button> -->
          <HfxButton  @click="showAddRoleModal" :width=70 name="添加角色" />
        </div>
        <div class="jsgl-main-panel">
            <JsglEdit v-for="roleObj in roleList" :key="roleObj.roleid" :roleObj="roleObj" @on-change="changeJsglEdit"/>
        </div>

         <Modal title="添加角色" v-model="showAddRole" class-name="addRoleModal" :draggable="true">
           <div slot="close"><div class="hfx-modal-close"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">角色名称:<input v-model="addRoleObj.rolename" class="inputClass"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">角色描述:<input v-model="addRoleObj.remark" class="inputClass"/></div>
           <div style="width:100%;text-align:center;">是否公用:
            <RadioGroup v-model="addRoleObj.ispublic">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
            </div>
           <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideAddRoleModal">取消</Button>
            <Button type="primary" size="large" @click="addRole">确定</Button> -->
            <HfxButton @click="hideAddRoleModal" name="取消" />
            <HfxButton @click="addRole" />
           </div>
         </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import JsglEdit from '@/components/module/jsgl/JsglEdit'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import common from "@/common.js"
export default {
  name: 'JsglRightPanel',
  components: {JsglEdit,LeftContentNameBar},
  data () {
    return {
      roleList:[],
      showAddRole:false,
      addRoleObj:{
        rolename:"",
        remark:"",
        ispublic:"1"
      }
    }
  },
  computed: mapState({
     currentDept: state => state.jsgl.currentDept
  }),
  methods:{
    getDeptRolesCallBack(data){
      this.roleList = data;
    },
    showAddRoleModal(){
      this.showAddRole = true;
    },
    hideAddRoleModal(){
      this.showAddRole = false;
    },
    addRole(){
      if(this.addRoleObj.rolename=="" || this.addRoleObj.rolename==null){
          this.$Message.error("角色名称不能为空");
          return;
      }
      var obj = {};
      obj.deptcode = this.currentDept.deptcode;
      obj.deptname = this.currentDept.deptname;
      obj.rolename = this.addRoleObj.rolename;
      obj.ispublic = this.addRoleObj.ispublic;
      obj.remark = this.addRoleObj.remark;
      this.http.get("/jsgl/addNewRole",obj,this.addNewRoleCallBack,this,false);
    },
    addNewRoleCallBack(data){
      this.showAddRole = false;
      this.http.get("/jsgl/getDeptRoles",{deptcode:this.currentDept.deptcode},this.getDeptRolesCallBack,this,false);
    },
    changeJsglEdit(){//角色有变化，重新获取
      this.http.get("/jsgl/getDeptRoles",{deptcode:this.currentDept.deptcode},this.getDeptRolesCallBack,this,false);
    }
  },
  created(){
    
  },
  watch : {
      currentDept:function(val) {
        this.http.get("/jsgl/getDeptRoles",{deptcode:this.currentDept.deptcode},this.getDeptRolesCallBack,this,false);
      }
  }
}
</script>

<style scoped>
.jsglRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
}
.option-panel{
  height:40px;
  width:100%;
  position: relative;
  padding: 0px 10px;
  display: inline-flex;
  align-items: center;
  background-color: rgba(88,245,255, 0.1);
  margin: 15px 0 15px 0;
}
.jsgl-main-panel{
  width: 100%;
  height:calc(100% - 100px);
  overflow: auto;
}
.modal_style{
    display: flex;
    align-items: center;
    justify-content: center;
}
.inputClass{
  width:200px;
  height: 30px;
  margin-left:15px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  padding:0 10px;
}
</style>
<style>
.addRoleModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:780px;
  width: 400px !important;
}
</style>

