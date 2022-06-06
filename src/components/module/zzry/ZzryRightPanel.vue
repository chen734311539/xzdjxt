<template>
    <div class="zzryRightPanel">
      <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
       <div class="zzry-title-panel">
          <div class= "deptnamepart">
            <div class="zzry-title-color">{{currentDept.deptname}}</div>
            <div class="zzry-title">组织名称</div>
          </div>
          <div class="splitline"></div>
          <div class="deptcodepart">
            <div class="zzry-title-color">{{currentDept.deptcode}}</div>
            <div class="zzry-title">组织代码</div>
          </div>
          <div class="splitline"></div>
          <div class="pdeptcodepart">
            <div class="zzry-title-color">{{currentDept.pdeptcode}}</div>
            <div class="zzry-title">上级代码</div>
          </div>
        </div>
        <div class="option-panel">
          <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showUpdateModal">修改</Button>
          <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showDeleteModal">删除</Button>
          <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showAddZzjgModal">添加下级</Button>
          <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showAddRyModal">添加人员</Button> -->
          <!-- 暂时注释掉，小进进要重新设计 -->
          <!-- <Button v-show="false" type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;">添加角色</Button> -->
          <HfxButton style="margin-left:10px;" @click="showUpdateModal" name="修改" />
          <HfxButton style="margin-left:10px;" @click="showDeleteModal" name="删除" />
          <HfxButton style="margin-left:10px;" @click="showAddZzjgModal" :width=70 name="添加下级" />
          <HfxButton style="margin-left:10px;" @click="showAddRyModal" :width=70 name="添加人员" />
          <HfxButton style="margin-left:10px;" :width=70 name="添加角色" />
        </div>
        <div class="zzry-main-panel">
          <el-scrollbar>
            <ZzryEdit v-for="userObj in userList" :key="userObj.usercode" :userObj="userObj" @on-change="changeZzryEdit"/>
          </el-scrollbar>
        </div>

        <Modal title="修改" v-model="showEdit" class-name="mdyJueseModal" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">组织名称:<input v-model="editObj.deptname" class="inputClass"/></div>
          <div style="width:100%;text-align:center;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;排序:<input v-model="editObj.seq" class="inputClass"/></div>    
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideUpdateModal">取消</Button>
            <Button type="primary" size="large" @click="updateZzjg">确定</Button> -->
            <HfxButton @click="hideUpdateModal" name="取消" />
            <HfxButton @click="updateZzjg" />
          </div>
        </Modal>

        <Modal title="删除" v-model="showDelete" class-name="delJueseModal" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;">是否删除{{currentDept.deptname}}?</div>
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideDeleteModal">取消</Button>
            <Button type="primary" size="large" @click="deleteZzjg">确定</Button> -->
            <HfxButton @click="hideDeleteModal" name="取消" />
            <HfxButton @click="deleteZzjg" />
          </div>
        </Modal>

        <Modal title="添加下级" v-model="showAddZzjg" class-name="addXiajiModal" :draggable="true" >
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">组织代码:<input v-model="addZzjgObj.deptcode" class="inputClass"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">组织名称:<input v-model="addZzjgObj.deptname" class="inputClass"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">联系电话:<input v-model="addZzjgObj.telephone" class="inputClass"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">所在地址:<input v-model="addZzjgObj.address" class="inputClass"/></div> 
          <div style="width:100%;text-align:center;margin-bottom:15px;">上级代码:<input v-model="currentDept.deptcode" class="inputClass" readonly="readonly"/></div>        
          <div style="width:100%;text-align:center;">上级名称:<input v-model="currentDept.deptname" class="inputClass" readonly="readonly"/></div>               
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideAddZzjgModal">取消</Button>
            <Button type="primary" size="large" @click="addZzjg">确定</Button> -->
            <HfxButton @click="hideAddZzjgModal" name="取消" />
            <HfxButton @click="addZzjg" />
          </div>
        </Modal>

        <Modal title="添加人员" v-model="showAddRy" class-name="addRenyuanModal" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">警号:<input v-model="addRyObj.usercode" class="inputClass"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">手机:<input v-model="addRyObj.mobile" class="inputClass"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;">姓名:<input v-model="addRyObj.username" class="inputClass"/></div>
          <div style="width:100%;text-align:center;margin-bottom:15px;margin-left:-6px;">身份证:<input v-model="addRyObj.idcard" class="inputClass"/></div> 
          <div style="width:100%;text-align:center;margin-bottom:15px;">密码:<input v-model="addRyObj.psw" class="inputClass"/></div> 
          <div style="width:100%;text-align:center;margin-bottom:15px;margin-left:-22px;">是否领导:
            <RadioGroup class="radioClass" v-model="addRyObj.isleader">
               <Radio label="1">是</Radio>
               <Radio label="0">否</Radio>
            </RadioGroup>
          </div> 
          <div style="width:100%;text-align:center;margin-bottom:15px;margin-left:-22px;">是否值班:
            <RadioGroup class="radioClass" v-model="addRyObj.iszb">
               <Radio label="1">是</Radio>
               <Radio label="0">否</Radio>
            </RadioGroup>
          </div>        
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideAddRyModal">取消</Button>
            <Button type="primary" size="large" @click="addRy">确定</Button> -->
            <HfxButton @click="hideAddRyModal" name="取消" />
            <HfxButton @click="addRy" />
          </div>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ZzryEdit from '@/components/module/zzry/ZzryEdit'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import common from "@/common.js"
export default {
  name: 'ZzryRightPanel',
  components: {ZzryEdit,LeftContentNameBar},
  data () {
    return {
      userList:[],
      showEdit:false,
      showDelete:false,
      showAddZzjg:false,
      showAddRy:false,
      editObj:{
        deptname:"",
        seq:""
      },
      addZzjgObj:{
        deptcode:"",
        deptname:"",
        telephone:"",
        address:""
      },
      addRyObj:{
        usercode:"",
        mobile:"",
        username:"",
        idcard:"",
        psw:"",
        isleader:"0",
        iszb:"0",
      }
    }
  },
  computed: mapState({
     currentDept: state => state.zzry.currentDept,
     searchName: state => state.zzry.searchName
  }),
  methods:{
      getUsersByDeptcodeCallBack(data){//获取人员回调
        this.userList = data;
      },
      showUpdateModal(){//显示修改弹窗
        this.showEdit = true;
      },
      hideUpdateModal(){
        this.showEdit = false;
      },
      updateZzjg(){//修改组织机构
        if(this.editObj.deptname=="" || this.editObj.deptname==null){
          this.$Message.error("组织名称不能为空");
          return;
        }
        if(this.editObj.seq=="" || this.editObj.seq==null){
          this.$Message.error("排序不能为空");
          return;
        }
        if(!common.isNumber(this.editObj.seq)){
          this.$Message.error("请填入正确的排序");
          return;
        }
        var obj = {};
        obj.deptcode = this.currentDept.deptcode;
        obj.deptname = this.editObj.deptname;
        obj.seq = this.editObj.seq;
        this.http.get("/zzry/updateDeptByDeptcode",obj,this.updateDeptByDeptcodeCallBack,this,false);
        this.showEdit = false;
      },
      updateDeptByDeptcodeCallBack(data){
          var obj = Object.assign({}, this.currentDept, {deptname:this.editObj.deptname,seq:this.editObj.seq});
          this.$store.dispatch('putChildState',{"key":"zzry","childkey":"currentDept","value":obj});
          this.http.get("/zzry/getDeptTreeByUserDept",null,this.getDeptTreeCallBack,this,false);
      },
      getDeptTreeCallBack(data){
          this.$store.dispatch('putChildState',{"key":"zzry","childkey":"allDeptListObj","value":data});
      },

      showDeleteModal(){//显示删除弹窗
        this.showDelete = true;
      },
      hideDeleteModal(){
        this.showDelete = false;
      },
      deleteZzjg(){//删除组织
        this.http.get("/zzry/deleteDeptByDeptcode",{deptcode:this.currentDept.deptcode},this.deleteDeptByDeptcodeCallBack,this,false);
      },
      deleteDeptByDeptcodeCallBack(data){
        this.showDelete = false;
        this.http.get("/zzry/getDeptTreeByUserDept",null,this.getDeptTreeCallBack,this,false);
      },
      showAddZzjgModal(){//显示修改弹窗
        this.showAddZzjg = true;
      },
      hideAddZzjgModal(){
        this.showAddZzjg = false;
      },
      addZzjg(){//增加下级组织
        if(this.addZzjgObj.deptname=="" || this.addZzjgObj.deptname==null){
          this.$Message.error("组织名称不能为空");
          return;
        }
        if(this.addZzjgObj.deptcode=="" || this.addZzjgObj.deptcode==null){
          this.$Message.error("组织代码不能为空");
          return;
        }
        if(!common.isNumber(this.addZzjgObj.deptcode) || this.addZzjgObj.deptcode.length!=12){
          this.$Message.error("请填入正确的组织代码");
          return;
        }
        var obj = {};
        obj.deptcode = this.addZzjgObj.deptcode;
        obj.deptname = this.addZzjgObj.deptname;
        obj.telephone = this.addZzjgObj.telephone;
        obj.address = this.addZzjgObj.address;
        obj.pdeptcode = this.currentDept.deptcode;
        this.http.post("/zzry/addChildDept",obj,this.addChildDeptCallBack,this,false);
      },
      addChildDeptCallBack(data){
         this.showAddZzjg = false;
         this.http.get("/zzry/getDeptTreeByUserDept",null,this.getDeptTreeCallBack,this,false);
      },
      showAddRyModal(){//显示修改弹窗
        this.showAddRy = true;
      },
      hideAddRyModal(){
        this.showAddRy = false;
      },
      addRy(){//增加下级组织
        if(this.addRyObj.usercode=="" || this.addRyObj.usercode==null){
          this.$Message.error("警号不能为空");
          return;
        }
        if(this.addRyObj.username=="" || this.addRyObj.username==null){
          this.$Message.error("姓名不能为空");
          return;
        }
        if(this.addRyObj.psw=="" || this.addRyObj.psw==null){
          this.$Message.error("密码不能为空");
          return;
        }else{
          var psw = this.addRyObj.psw;
          var reg=new RegExp('(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9a-zA-Z!@#$%^&_]{6,18}$','g');
          if(!psw.match(reg)){
            this.$Message.error("密码必须包含数字,大写字母,小写字母,可包含!@#$%^&_,长度为6至18位之间");
            return;
          }
        }
        var obj = Object.assign({}, this.addRyObj,{deptcode:this.currentDept.deptcode});
        this.http.post("/zzry/addDeptUser",obj,this.addDeptUserCallBack,this,false);
      },
      addDeptUserCallBack(data){
        this.showAddRy = false;
        this.http.get("/zzry/getUsersByDeptcode",{deptcode:this.currentDept.deptcode},this.getUsersByDeptcodeCallBack,this,false);
      },
      changeZzryEdit(){//组织人员有变化，重新获取
        this.http.get("/zzry/getUsersByDeptcode",{deptcode:this.currentDept.deptcode},this.getUsersByDeptcodeCallBack,this,false);
      }
  },
  created(){
    
  },
  watch : {
      currentDept:function(val) {
        // 搜索人员
        this.http.get("/zzry/getUsersByDeptcode",{deptcode:this.currentDept.deptcode},this.getUsersByDeptcodeCallBack,this,false);
        //初始化
        this.editObj.deptname = this.currentDept.deptname;
        this.editObj.seq = this.currentDept.seq;

        this.showEdit = false;
        this.showDelete = false;
        this.showAddZzjg = false;
        this.showAddRy = false;
      },
      searchName:{      
        handler(val){
            this.http.get("/zzry/searchUsers",{name:val},this.getUsersByDeptcodeCallBack,this,false);
        },
        immediate:true       
      }
  }
}
</script>

<style scoped>
.zzryRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
}
.zzry-title{
  color: white;
  font-size: 12px;
  text-align: center;
  height:25px;
  line-height:30px;
  margin: 0 20px 0 20px;
}
.zzry-title-color{
  color: #b6f6ff;
  font-size: 18px;
  text-align: center;
  height:25px;
  line-height:30px;
  margin: 0 20px 0 20px;
}
.splitline{
  height:50px;
  width: 1px;
  background-color: #b6f6ff;
}
.zzry-td{
  border-right: 1px solid white;
  padding: 0px 10px;
}
.zzry-title-panel{
  height: 50px;
  display: flex;
  margin: 25px 0 25px 0;
}
.deptnamepart{
  width: auto;
}
.option-panel{
  height:40px;
  width:100%;
  position: relative;
  padding: 0px 10px;
  display: inline-flex;
  align-items: center;
  background-color: rgba(88,245,255, 0.1);
  margin-bottom: 15px;
}
.zzry-main-panel{
  width: 100%;
  height:calc(100% - 32px - 50px - 50px - 40px - 15px);
  border-top:1px solid #b6f6ff;
  padding-top: 11px;
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
.radioClass{
  width:200px;
  height: 30px;
  line-height: 30px;
  margin-left:-10px;
  color: #b6f6ff;
  background-color: transparent;
  padding:0 10px;
}
</style>
<style>
.mdyJueseModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 230px;
  left:780px;
  width: 400px !important;
}
.delJueseModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 230px;
  left:780px;
  width: 400px !important;
}
.addXiajiModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 230px;
  left:780px;
  width: 400px !important;
}
.addRenyuanModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 230px;
  left:780px;
  width: 400px !important;
}
</style>

