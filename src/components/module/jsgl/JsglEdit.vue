<template>
    <div class="jsglEdit" @mouseover="mouseOver" @mouseout="mouseOut">
      <div class="picpanel">
        <!-- <img src="./../../../assets/role/role.png" style="width: 128px; height: 165px;"/> -->
        <el-image :src="rolepic" style="width: 128px; height: 165px;"></el-image>
        <div class="jsglEdit_deptname">
          <span>{{roleObj.deptname}}</span>
        </div>
        <div class="editpanel" v-show="showicon" >
          <!-- <Icon v-show="showicon" custom="iconfont iconxiugai" class="editRoleClass" style="font-size: 17px;" @click="showEditRole"/>
          <Icon v-show="showicon" custom="iconfont iconpeizhi1" class="menuRoleClass" style="font-size: 19px;" @click="showConfigRole"/>
          <Icon v-show="showicon" custom="iconfont iconshanchu" class="deleteRoleClass" style="font-size: 15px;" @click="showDeleteRole"/> -->
            <div class="editRoleIcon" @click="showEditRole" ></div>
            <div class="configIcon" @click="showConfigRole" ></div>
            <div class="delRoleIcon" @click="showDeleteRole" ></div>
        </div>
      </div>
      <div class="jsglEdit_rolename">{{roleObj.rolename}}</div>

        <Modal title="修改角色" v-model="showEdit" class-name="mdyRoleModal" :draggable="true" >
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">角色名称:<input v-model="roleObj.rolename" class="inputClass" /></div>
          <div style="width:100%;text-align:center;margin-bottom:5px;">角色描述:<input v-model="roleObj.remark" class="inputClass" /></div>
          <div style="width:100%;margin-bottom:10px;position:relative;">
              <div style="left:74px;position:relative;top:19px;">单位:</div>
              <DropdownTreeNew class="seachbar_dropdown" :deptListObj="deptListObj" :choiceDept="choiceEditDept" :orideptname="roleObj.deptname"/>
          </div>
          <!-- <div style="width:100%;text-align:center;">是否公用:
            <RadioGroup v-model="roleObj.ispublic">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
            </div> -->
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideEditModal">取消</Button>
            <Button type="primary" size="large" @click="updateRole">确定</Button> -->
            <HfxButton @click="hideEditModal"  name="取消" />
            <HfxButton @click="updateRole" />
          </div>
        </Modal>

        <Modal title="删除角色" v-model="showDelete" class-name="delRoleModal" :draggable="true" >
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;">是否删除{{roleObj.rolename}}?</div>
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideDeleteModal">取消</Button>
            <Button type="primary" size="large" @click="deleteRole">确定</Button> -->
            <HfxButton @click="hideDeleteModal" name="取消" />
            <HfxButton @click="deleteRole" />
          </div>
        </Modal>

        <Modal title="配置角色" v-model="showConfig" class-name="editRoleModal" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <el-scrollbar style="height:500px;width:95%;">
          <Tree ref="menutree" :data="menuList" :show-checkbox="true" class="menutree"></Tree>
          </el-scrollbar>
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideConfigModal">取消</Button>
            <Button type="primary" size="large" @click="configRole">确定</Button> -->
            <HfxButton @click="hideConfigModal" name="取消" />
            <HfxButton @click="configRole" />
          </div>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import DropdownTreeNew from '@/components/base/DropdownTreeNew'

export default {
  name: 'JsglEdit',
  props:['roleObj'],
  components: {DropdownTreeNew},
  data () {
    return {
      showicon:false,
      showEdit:false,
      showDelete:false,
      showConfig:false,
      editDeptcode:"",
      editDeptname:"",
      menuList:[],
    }
  },
  computed: {...mapState({
     deptListObj: state => state.jsgl.allDeptListObj
  }),
    rolepic:function(){
        return require("@/assets/jsgl/role.png");
    },
  },
  methods:{
     mouseOver(){
       this.showicon = true;
     },
     mouseOut(){
       this.showicon = false;
     },
     showEditRole(){
       this.showEdit = true;
     },
     hideEditModal(){
       this.showEdit = false;
     },
     updateRole(){
        if(this.roleObj.rolename=="" || this.roleObj.rolename==null){
          this.$Message.error("角色名称不能为空");
          return;
        }
        var obj = {};
        obj.rolename = this.roleObj.rolename;
        obj.roleid = this.roleObj.roleid;
        obj.remark = this.roleObj.remark;
        if(this.editDeptcode!=null&&this.editDeptcode!=""){
          obj.deptcode = this.editDeptcode;
          obj.deptname = this.editDeptname;
        }else{
          obj.deptcode = this.roleObj.deptcode;
          obj.deptname = this.roleObj.deptname;
        }
        this.http.get("/jsgl/updateRole",obj,this.updateRoleCallBack,this,false);
     },
     updateRoleCallBack(data){
        this.editDeptcode = "";
        this.editDeptname = "";
        this.showEdit = false;
        this.$emit('on-change');
     },
     choiceEditDept(data){
       this.editDeptcode = data.deptcode;
       this.editDeptname = data.deptname;
     },
     hideDeleteModal(){
       this.showDelete = false;
     },
     showDeleteRole(){
       this.showDelete = true;
     },
     deleteRole(){
       this.http.get("/jsgl/deleteRole",{roleid:this.roleObj.roleid},null,this,false);
       $(this.$el).hide();
       this.showDelete = false;
     },
     showConfigRole(){
       if(this.menuList.length==0){//获取菜单
          this.http.get("/jsgl/getRoleMenuPower",{roleid:this.roleObj.roleid},this.getRoleMenuPowerCallBack,this,false);
       }
       this.showConfig = true;
     },
     getRoleMenuPowerCallBack(data){
       var tree = data.menutree;
       var hasmenu=[];
       for(var i = 0;i<data.rolemenupower.length;i++){
         hasmenu.push(data.rolemenupower[i].menuid);
       }
       for(var i = 0;i<tree.length;i++){
         tree[i].title = tree[i].menuname;
         tree[i].expand = true;
         if(tree[i].children){
           for(var j = 0;j<tree[i].children.length;j++){
             tree[i].children[j].title = tree[i].children[j].menuname;
             if(hasmenu.indexOf(tree[i].children[j].menuid)>-1){
                tree[i].children[j].checked = true;
             }
           }
         }
       }
       this.menuList = tree;
     },
     hideConfigModal(){
       this.showConfig = false;
     },
     configRole(){
       this.showConfig = false;
       let checklist = this.$refs.menutree.getCheckedAndIndeterminateNodes();
       let list = [];
       for(let i=0;i<checklist.length;i++){
         list.push(checklist[i].menuid);
       }
       let obj = {};
       obj.roleid = this.roleObj.roleid;
       obj.menuidArr = list;
       this.http.get("/jsgl/setMenuPowerToRole",obj,null,this,false);
     },
  },
  created(){
    
  }
}
</script>

<style scoped>
.jsglEdit{
  width:150px;
  height:210px;
  padding: 11px;
  margin: 12px;
  float: left;
  background:rgba(88,245,255, 0.2);
  text-align: center;
}
.jsglEdit_rolename{
  text-align:center;
  color: #b6f6ff;
  margin: 5px 0;
}
.jsglEdit_deptname{
  position: absolute;
  top: 0;
  left: -14px;
  text-align:center;
  color: white;
  height: 27px;
  width:79px;
  line-height: 23px;
  background: 
  url(./../../../assets/jsgl/jsgl_deptnamebar.png)  no-repeat;
}
.editRoleClass{
  color: white;
  cursor: pointer;
  position:absolute;
  top:10px;
  right:10px;
}
.menuRoleClass{
  color: white;
  cursor: pointer;
  position:absolute;
  top:38px;
  right:8px;
}
.deleteRoleClass{
  color: white;
  cursor: pointer;
  position:absolute;
  top:70px;
  right:10px;
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
.seachbar_dropdown{
  height: 30px;
  width: 200px;
  position:absolute;
  top:-7px;
  left:118px;
}
.picpanel{
  position: relative;
}
.editpanel{
  position: absolute;
  bottom: 5px;
  height: 25px;
  width: 100%;
  background-color: rgba(0,0,0,0.2);
  display: flex;
  justify-content: flex-end;
}
.editRoleIcon{
  width: 17px;
  height: 17px;
  margin: 4px 8px 0 0;
  cursor: pointer;
  background: 
  url(./../../../assets/jsgl/jsgl_edit.png)  no-repeat;
}
.configIcon{
  width: 17px;
  height: 17px;
  margin: 4px 8px 0 0;
  cursor: pointer;
  background: 
  url(./../../../assets/jsgl/jsgl_juese.png)  no-repeat;
}
.delRoleIcon{
  width: 17px;
  height: 17px;
  margin: 4px 8px 0 0;
  cursor: pointer;
  background: 
  url(./../../../assets/jsgl/jsgl_del.png)  no-repeat;
}
.menutree>>>.ivu-tree-title{
    color: #b6f6ff !important;
}
.menutree>>>.ivu-tree-title:hover {
    background-color: rgba(137,156,255, 0.3);
}
</style>
<style>
.mdyRoleModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:780px;
  width: 400px !important;
}
.delRoleModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:780px;
  width: 400px !important;
}
.editRoleModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:780px;
  width: 400px !important;
}
</style>
