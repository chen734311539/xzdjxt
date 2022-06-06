<template>
    <div class="zzryEdit" @mouseover="mouseOver" @mouseout="mouseOut">
         <div class="picpanel">
            <el-image :src="avatar" style="width: 128px; height: 165px;"></el-image>
           <div class="zzryEdit_usercode">
              <span> {{userObj.usercode}}</span>
            </div>
           <div class="editpanel" v-show="showicon" >
            <!-- <Icon v-show="showicon" custom="iconfont iconxiugai" class="editUserClass" style="font-size: 17px;" @click="editUser"/>
            <Icon v-show="showicon" custom="iconfont iconjiaoseguanli1" class="jueseUserClass" style="font-size: 19px;" @click="editRoleUser"/>
            <Icon v-show="showicon" custom="iconfont iconshanchu" class="deleteUserClass" style="font-size: 15px;" @click="deleteUser"/> -->
            <div class="editUserIcon" @click="editUser" ></div>
            <div class="jueseUserIcon" @click="editRoleUser" ></div>
            <div class="delUserIcon" @click="deleteUser" ></div>
          </div>
         </div>
         <div class="zzryEdit_username">{{userObj.username}}</div>

         <Modal title="删除人员" v-model="showDelete" class-name="deluserModal" :draggable="true" >
           <div slot="close"><div class="hfx-modal-close"/></div>
            <div style="width:100%;text-align:center;">是否删除{{userObj.username}}?</div>
            <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideDeleteModal">取消</Button>
            <Button type="primary" size="large" @click="deleteRy">确定</Button> -->
            <HfxButton @click="hideDeleteModal" name="取消" />
            <HfxButton @click="deleteRy" />
          </div>
        </Modal>

        <Modal title="修改人员" v-model="showEdit" class-name="mdyuserModal" :draggable="true" >
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;margin-bottom:5px;">警号:<input v-model="userObj.usercode" class="inputClass" readonly="readonly"/></div>
          <div style="width:100%;margin-bottom:10px;position:relative;">
              <div style="left:62px;position:relative;top:19px;">单位:</div>
              <DropdownTreeNew class="seachbar_dropdown" :deptListObj="deptListObj" :choiceDept="choiceEditDept" :orideptname="userObj.deptname"/>
          </div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">手机:<input v-model="userObj.mobile" class="inputClass"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">姓名:<input v-model="userObj.username" class="inputClass"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;margin-left:-6px;">身份证:<input v-model="userObj.idcard" class="inputClass"/></div> 
          <div style="width:100%;text-align:center;margin-bottom:15px;">排序:<input v-model="userObj.seq" class="inputClass"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">密码:<input v-model="userObj.psw" class="inputClass"/></div>     
          <div style="width:100%;text-align:center;margin-bottom:15px;margin-left:-22px;">是否领导:
            <RadioGroup class="radioClass" v-model="userObj.isleader">
               <Radio label="1">是</Radio>
               <Radio label="0">否</Radio>
            </RadioGroup>
          </div> 
          <div style="width:100%;text-align:center;margin-bottom:15px;margin-left:-22px;">是否值班:
            <RadioGroup class="radioClass" v-model="userObj.iszb">
               <Radio label="1">是</Radio>
               <Radio label="0">否</Radio>
            </RadioGroup>
          </div>     
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideEditModal">取消</Button>
            <Button type="primary" size="large" @click="updateRy">确定</Button> -->
            <HfxButton @click="hideEditModal" name="取消" />
            <HfxButton @click="updateRy" />
          </div>
        </Modal>

        <Modal title="修改人员角色" v-model="showRoleEdit" class-name="jueseuserModal" :draggable="true" >
          <div slot="close"><div class="hfx-modal-close"/></div>
            <CheckboxGroup v-model="userSelectRole">
              <Checkbox v-for="role in allrolelist" :key="role.roleid" :label="role.roleid">{{role.rolename}}</Checkbox>
            </CheckboxGroup>
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideEditRoleModal">取消</Button>
            <Button type="primary" size="large" @click="updateRyRole">确定</Button> -->
            <HfxButton @click="hideEditRoleModal" name="取消" />
            <HfxButton @click="updateRyRole" />
          </div>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import DropdownTreeNew from '@/components/base/DropdownTreeNew'
import Constants from '@/constants/Constants'

export default {
  name: 'ZzryEdit',
  props:['userObj'],
  components: {DropdownTreeNew},
  data () {
    return {
      showicon:false,
      showDelete:false,
      showEdit:false,
      showRoleEdit:false,
      editDeptcode:"",
      allrolelist:[],//所有的权限
      userSelectRole:[]//用户已有的权限
    }
  },
  computed: {...mapState({
      deptListObj: state => state.zzry.allDeptListObj
    }),
    avatar:function(){
      if(this.userObj.newavatar){
        return Constants.file_url+this.userObj.newavatar;
      }else{
        return require("@/assets/zzry/zzrydefaultpic.png");;
      }
      
    }
  },
  methods:{
     deleteUser(){//删除用户
       this.showDeleteModal();
     },
     editUser(){//修改用户
       this.showEdit = true;
     },
     editRoleUser(){
      if(this.allrolelist.length==0){
        this.http.get("/zzry/getRoleList",{usercode:this.userObj.usercode},this.getRoleListCallBack,this,false);
      }
      this.showRoleEdit = true;
     },
     mouseOver(){
       this.showicon = true;
     },
     mouseOut(){
       this.showicon = false;
     },
     showDeleteModal(){//显示删除弹窗
        this.showDelete = true;
     },
     hideDeleteModal(){
       this.showDelete = false;
     },
     deleteRy(){
        this.http.get("/zzry/deleteUserByUserCode",{usercode:this.userObj.usercode},null,this,false);
        $(this.$el).hide();
        this.showDelete = false;
     },
     hideEditModal(){
       this.showEdit = false;
     },
     updateRy(){
        if(this.userObj.usercode=="" || this.userObj.usercode==null){
          this.$Message.error("警号不能为空");
          return;
        }
        if(this.userObj.username=="" || this.userObj.username==null){
          this.$Message.error("姓名不能为空");
          return;
        }
        if(this.userObj.psw=="" || this.userObj.psw==null){
          this.$Message.error("密码不能为空");
          return;
        }else{
          var psw = this.userObj.psw;
          var reg1=new RegExp('(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9a-zA-Z!@#$%^&_]{6,18}$','g');
          if(!psw.match(reg1)){
            this.$Message.error("密码必须包含数字,大写字母,小写字母,可包含!@#$%^&_,长度为6至18位之间");
            return;
          }
        }
        var obj = {};
        obj.usercode = this.userObj.usercode;
        obj.mobile = this.userObj.mobile;
        obj.username = this.userObj.username;
        obj.idcard = this.userObj.idcard;
        obj.seq = this.userObj.seq;
        obj.psw = this.userObj.psw;
        obj.isleader = this.userObj.isleader;
        obj.iszb = this.userObj.iszb;
        if(this.editDeptcode!=null&&this.editDeptcode!=""){
          obj.deptcode = this.editDeptcode;
        }
        this.http.get("/zzry/updateUser",obj,this.updateUserCallBack,this,false);
     },
     updateUserCallBack(){
        this.editDeptcode = "";
        this.showEdit = false;
        this.$emit('on-change');
     },
     choiceEditDept(data){
       this.editDeptcode = data.deptcode;
     },
     hideEditRoleModal(){
       this.showRoleEdit = false;
     },
     updateRyRole(){
       this.http.post("/zzry/updateUserRole",{usercode:this.userObj.usercode,roleidarr:this.userSelectRole},null,this,false);
       this.showRoleEdit = false;
     },
     getRoleListCallBack(data){
      this.allrolelist = data.allrolelist;
      var ownerrole = data.ownerrole;
      for(var i=0;i<ownerrole.length;i++){
        if(this.userSelectRole.indexOf(ownerrole[i].roleid)==-1){//无就添加
          this.userSelectRole.push(ownerrole[i].roleid);
        }
      }
     }
  },
  created(){
    
  }
}
</script>

<style scoped>
.zzryEdit{
  width:150px;
  height:210px;
  padding: 11px;
  margin: 12px;
  float: left;
  background:rgba(88,245,255, 0.2);
  text-align: center;
}
.zzryEdit_username{
  text-align:center;
  color: #b6f6ff;
  margin: 5px 0;
}
.zzryEdit_usercode{
  position: absolute;
  top: 0;
  left: -14px;
  text-align:center;
  color: white;
  height: 27px;
  width:79px;
  line-height: 23px;
  background: 
  url(./../../../assets/zzry/zzry_usercodebar.png)  no-repeat;
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
.editUserClass{
  color: white;
  cursor: pointer;
}
.jueseUserClass{
  color: white;
  cursor: pointer;
}
.deleteUserClass{
  color: white;
  cursor: pointer;
}
.modal_style{
    display: flex;
    align-items: center;
    justify-content: center;
}
.inputClass{
  margin-left:15px;
  width:200px;
  height: 28px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  padding:0 10px;
}
.radioClass{
  width:200px;
  height: 30px;
  line-height: 30px;
  margin-left:-10px;
  color: #b6f6ff;
  background-color: transparent;
  padding:0 10px;
}
.seachbar_dropdown{
  height: 30px;
  width: 200px;
  position:absolute;
  top:-7px;
  left:105px;
}
.seachbar_dropdown>>>.iconclass{
  top: 8px;
}
.seachbar_dropdown>>>.iconclass:hover{
  top: 8px;
}
.editUserIcon{
  width: 17px;
  height: 17px;
  margin: 4px 8px 0 0;
  cursor: pointer;
  background: 
  url(./../../../assets/zzry/zzry_edit.png)  no-repeat;
}
.jueseUserIcon{
  width: 17px;
  height: 17px;
  margin: 4px 8px 0 0;
  cursor: pointer;
  background: 
  url(./../../../assets/zzry/zzry_juese.png)  no-repeat;
}
.delUserIcon{
  width: 17px;
  height: 17px;
  margin: 4px 8px 0 0;
  cursor: pointer;
  background: 
  url(./../../../assets/zzry/zzry_del.png)  no-repeat;
}
</style>
<style>
.deluserModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 285px;
  left:780px;
  width: 400px !important;
}
.mdyuserModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 285px;
  left:780px;
  width: 400px !important;
}
.jueseuserModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 285px;
  left:780px;
  width: 400px !important;
}
</style>
