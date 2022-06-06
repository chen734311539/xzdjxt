<template>
    <div class="gpsglRightPanel">
      <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
      <div class="option-panel">
          <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showEditGpsModal">修改</Button> -->
          <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showDeleteGpsModal">删除</Button> -->
          <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showAssignGpsModal">分配</Button> -->
          <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showGroupModal">设置分组</Button> -->
          <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showTypeModal">设置类型</Button>
          <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showIconManagerModal">图标管理</Button> -->
          <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="showSearchGpsModal">GPS检索</Button> -->
          <HfxButton style="width:64px;margin-left:10px;" @click="showEditGpsModal" name="修改"  />
          <HfxButton style="width:64px;margin-left:10px;" @click="showDeleteGpsModal" name="删除"  />
          <HfxButton style="width:64px;margin-left:10px;" @click="showAssignGpsModal" name="分配"  />
          <HfxButton style="width:64px;margin-left:10px;" @click="showGroupModal" name="设置分组"  />
          <HfxButton style="width:64px;margin-left:10px;" @click="showSearchGpsModal" name="GPS检索" />
      </div>
      <HfxTable :data="gpsList"  :columns="columns"  class="tableclass"  radio @on-radio="clickRow" />

      <Modal title="修改" v-model="showEditGps" class-name="modifyModal" :draggable="true">
        <div slot="close"><div class="hfx-modal-close"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">设备编号:<input v-model="showEditGpsObj.gpsid" class="inputClass" readonly="readonly"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">车辆编号:<input v-model="showEditGpsObj.gpscode" class="inputClass"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">设备名称:<input v-model="showEditGpsObj.gpsname" class="inputClass"/></div>
           <div style="width:100%;margin-bottom:10px;position:relative;margin-top:-12px;">
              <div style="left:51px;position:relative;top:19px;">所属部门:</div>
              <DropdownTreeNew class="seachbar_dropdown" :deptListObj="deptListObj" :choiceDept="choiceEditDept" :orideptname="showEditGpsObj.deptname"/>
           </div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">设备类别:
              <select v-model="showEditGpsObj.typecode" style="width:200px;margin-left:12px;">
                  <option v-for="item in gpsTypeList" :value="item.typecode" :key="item.typecode">{{ item.typename }}</option>
              </select>
           </div>
           <div style="width:100%;text-align:center;margin-bottom:15px;" class="suoshufenzu" >所属分组:
              <Select v-model="showEditGpsObj.groupids" style="width:200px;margin-left:12px;" :multiple="true">
                  <Option v-for="item in gpsGroupList" :value="item.groupid" :key="item.groupid">{{ item.groupname }}</Option>
              </Select>
           </div>
           <div slot="footer">
            <HfxButton @click="hideEditGpsModal" name="取消" />
            <HfxButton @click="updateGps"  />
           </div>
      </Modal>

      <Modal title="删除GPS" v-model="showDeleteGps" class-name="deleteModal" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;">是否删除{{currentRow.gpsid}}-{{currentRow.gpsname}}?</div>
          <div slot="footer">
            <HfxButton @click="hideDeleteGpsModal" name="取消" />
            <HfxButton @click="deleteGps"  />
          </div>
      </Modal>

      <Modal title="人员分配" v-model="showAssignGps" class-name="renyuanfenpeiModal" :draggable="true" width="400">
          <div slot="close"><div class="hfx-modal-close"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">设备编号:<input v-model="currentRow.gpsid" class="inputClass" readonly="readonly"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">车辆编号:<input v-model="currentRow.gpscode" class="inputClass" readonly="readonly"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">设备名称:<input v-model="currentRow.gpsname" class="inputClass" readonly="readonly"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;" class="renyuanfenpei">人员分配:
              <Select v-model="showAssignGpsObj.usercodes" style="width:200px;margin-left:12px;" :multiple="true" :filterable="true">
                  <Option v-for="item in userList" :value="item.usercode" :key="item.usercode">{{ item.username }}</Option>
              </Select>
           </div>
           <div slot="footer">
            <HfxButton @click="hideAssignGpsModal" name="取消" />
            <HfxButton @click="assignGps"  />
           </div>
      </Modal>

      <Modal title="设置分组" v-model="showGroup" class-name="setGroupModal" :draggable="true" >
            <div slot="close"><div class="hfx-modal-close"/></div>
            <div>
              <div class="groupModalDivInline">分组编号</div><div class="groupModalDivInline">分组名称</div>
            </div>
            <div class="groupModalDiv" :class="{groupModalDivActive:(currentGroup.groupid==obj.groupid)}" v-for="obj in gpsGroupList" :key="obj.groupid" @click="groupClick(obj)">
              <div class="groupModalDivInline">{{obj.groupid}}</div><div class="groupModalDivInline">{{obj.groupname}}</div>
            </div>
           <div slot="footer">
            <HfxButton @click="showInsertGroupModal" name="新增" />
            <HfxButton @click="showEditGroupModal" name="修改" />
            <HfxButton @click="showDeleteGroupModal" name="删除"  />
           </div>
      </Modal>

         <Modal title="添加分组" v-model="showInsertGroup" class-name="addGroupModal" :draggable="true" >
            <div slot="close"><div class="hfx-modal-close"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">分组编号:<input v-model="insertGroupObj.groupid" class="inputClass"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">分组名称:<input v-model="insertGroupObj.groupname" class="inputClass"/></div>
           <div slot="footer">
            <HfxButton @click="hideInsertGroupModal" name="取消"  />
            <HfxButton @click="insertGroup" />
           </div>
         </Modal>

         <Modal title="编辑分组" v-model="showEditGroup" class-name="mdyGroupModal" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">分组编号:<input v-model="editGroupObj.groupid" class="inputClass" readonly="readonly"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">分组名称:<input v-model="editGroupObj.groupname" class="inputClass"/></div>
           <div slot="footer">
            <HfxButton @click="hideEditGroupModal" name="取消" />
            <HfxButton @click="editGroup" />
           </div>
         </Modal>

         <Modal title="删除分组" v-model="showDeleteGroup" class-name="delGroupModal" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;">是否删除{{currentGroup.groupname}}?</div>
          <div slot="footer">
            <HfxButton @click="hideDeleteGroupModal" name="取消" />
            <HfxButton @click="deleteGroup" />
          </div>
        </Modal>

        <Modal title="GPS检索" v-model="showSearchGps" class-name="gpsSearchModal" :draggable="true" >
          <div slot="close"><div class="hfx-modal-close"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">设备编号:<input v-model="showSearchGpsObj.gpsid" class="inputClass"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">车辆编号:<input v-model="showSearchGpsObj.gpscode" class="inputClass"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">设备名称:<input v-model="showSearchGpsObj.gpsname" class="inputClass"/></div>
            <div style="width:100%;text-align:center;margin-bottom:15px;">民警姓名:<input v-model="showSearchGpsObj.user" class="inputClass"/></div>
           <div style="width:100%;margin-bottom:10px;position:relative;margin-top:-12px;">
              <div style="left:51px;position:relative;top:19px;">所属部门:</div>
              <DropdownTreeNew class="seachbar_dropdown" :deptListObj="deptListObj" :choiceDept="choiceSearchDept"/>
           </div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">设备类别:
              <select v-model="showSearchGpsObj.typecode" style="width:200px;margin-left:12px;">
                  <option v-for="item in gpsTypeList" :value="item.typecode" :key="item.typecode">{{ item.typename }}</option>
              </select>
           </div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">所属分组:
              <select v-model="showSearchGpsObj.groupid" style="width:200px;margin-left:12px;">
                  <option v-for="item in gpsGroupList" :value="item.groupid" :key="item.groupid">{{ item.groupname }}</option>
              </select>
           </div>
           <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideSearchGpsModal">取消</Button>
            <Button type="primary" size="large" @click="resetSearchGps">重置</Button>
            <Button type="primary" size="large" @click="searchGps">确定</Button> -->
            <HfxButton @click="hideSearchGpsModal" name="取消" />
            <HfxButton @click="resetSearchGps" name="重置" />
            <HfxButton @click="searchGps" />
           </div>
         </Modal>

          <Modal title="设置类型" v-model="showType" class-name="modal_index" :draggable="true" width="340">
            <div slot="close"><div class="hfx-modal-close"/></div>
            <div>
              <div class="groupModalDivInline">类型编号</div><div class="groupModalDivInline">类型名称</div>
            </div>
            <div class="groupModalDiv" :class="{groupModalDivActive:(currentType.typecode==obj.typecode)}" v-for="obj in gpsTypeList" :key="obj.typecode" @click="typeClick(obj)">
              <div class="groupModalDivInline">{{obj.typecode}}</div><div class="groupModalDivInline">{{obj.typename}}</div>
            </div>
           <div slot="footer">
            <Button type="primary" size="large" @click="showInsertTypeModal">新增</Button>
            <Button type="primary" size="large" @click="showEditGroupModal">修改</Button>
            <Button type="primary" size="large" @click="showDeleteGroupModal">删除</Button>
           </div>
         </Modal>

         <Modal title="添加类型" v-model="showInsertType" class-name="modal_index_up" :draggable="true" width="400">
            <div slot="close"><div class="hfx-modal-close"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">类型编号:<input v-model="insertTypeObj.typecode" class="inputClass"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">类型名称:<input v-model="insertTypeObj.typename" class="inputClass"/></div>
           <div style="position:relative;margin-bottom:15px;">
             <Button type="primary" size="small" style="width:100px;margin-left:50px;">在线图标选择</Button>
             <Button type="primary" size="small" style="width:100px;margin-left:50px;">离线图标选择</Button>
           </div>
           <div style="margin-bottom:15px;">
             <span style="margin-left:50px;">在线图标预览:</span>
             <el-image style="max-width: 100px; max-height: 100px;" src="http://47.111.104.252:9000/zhddxtFile/gps/icon/0CCB6C4A5D8E4DE5A363BD396BF05BD4.png" ></el-image>
           </div>
           <div style="margin-bottom:15px;">
             <span style="margin-left:50px;">离线图标预览:</span>
             <el-image style="max-width: 100px; max-height: 100px;" src="http://47.111.104.252:9000/zhddxtFile/gps/icon/75913FBEAB634EB48EFEFD71749FB05F.png" ></el-image>
           </div>
           <div slot="footer">
            <Button type="text" size="large" @click="hideInsertTypeModal">取消</Button>
            <Button type="primary" size="large" @click="insertType">确定</Button>
           </div>
         </Modal>

         <Modal title="图标管理" v-model="showIconManager" class-name="modal_index" :draggable="true" width="700">
            <div slot="close"><div class="hfx-modal-close"/></div>
           <Upload class="uploadPicture" :before-upload="beforeUploadPicture"	:on-success="uploadPictureSuccess" 
                        :on-error="uploadPictureError" :action="uploadAction" accept=".png,.ico,.bmp,.jpg,.gif,.jpeg,.ufo">
                            <Button type="primary" size="small" style="width:100px;">上传新图标</Button>
              </Upload>
           <div style="height:500px;">
             <el-tabs type="border-card" class="tabs">
              <el-tab-pane label="上传图标" class="tabs_pane">
              <el-scrollbar>
               
              </el-scrollbar>
              </el-tab-pane>
              <el-tab-pane label="系统图标" class="tabs_pane">
                <el-scrollbar>
                
                </el-scrollbar>
              </el-tab-pane>
            </el-tabs>
           </div>
           <div slot="footer">
           </div>
         </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import GpsglRow from '@/components/module/gpsgl/GpsglRow'
import DropdownTreeNew from '@/components/base/DropdownTreeNew'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTable from '@/components/base/HfxTable'

export default {
  name: 'GpsglRightPanel',
  components: { GpsglRow,DropdownTreeNew,LeftContentNameBar,HfxTable},
  data () {
    return {
      gpsList:[],
      gpsTypeList:[],
      gpsGroupList:[],
      userList:[],
      currentRow:{},//目前选择的列
      showEditGps:false,
      showEditGpsObj:{},
      showDeleteGps:false,
      showAssignGps:false,
      showAssignGpsObj:{},
      showGroup:false,
      currentGroup:{},//设置分组里面当前选择的 group
      showInsertGroup:false,
      insertGroupObj:{},
      showEditGroup:false,
      editGroupObj:{},
      showDeleteGroup:false,
      showSearchGps:false,//显示gps搜索框
      showSearchGpsObj:{},
      showType:false,
      currentType:{},//设置类型里面当前选择的 type
      showInsertType:false,
      insertTypeObj:{},
      uploadAction:"",//发送图片的路径
      showIconManager:false,
      columns:[
        {
          key:'xh',
          title:"序号",
          width:5,
        },
         {
          key:'gpsid',
          title:"设备编号",
          width:12.5,
        },
         {
          key:'gpscode',
          title:"车辆编号",
          width:12.5,
        },
         {
          key:'gpsname',
          title:"设备名称",
          width:12.5,
        },
         {
          key:'typename',
          title:"所属类型",
          width:12.5,
        },
         {
          key:'groupnames',
          title:"所属分组",
          width:12.5,
        },
         {
          key:'usernames',
          title:"民警姓名",
          width:16.5,
        },
         {
          key:'mobiles',
          title:"手机号码",
          width:16,
        }
      ],
    }
  },
  computed: mapState({
     currentDept: state => state.gpsgl.currentDept,
     deptListObj: state => state.gpsgl.allDeptListObj
  }),
  methods:{
    clickRow(data){
      this.currentRow = data;
    },
    getGpsTypesCallBack(data){
      this.gpsTypeList = data;
    },
    getGpsGroupsCallBack(data){
      this.gpsGroupList = data;
    },
    getGpsByDeptCallBack(data){
      for(var i = 0;i<data.length;i++){
        data[i].xh = i+1;
      }
      this.gpsList = data;
    },
    getUserByGpsDeptCallBack(data){
      this.userList = data;
    },
    showEditGpsModal(){
      if(!this.currentRow.gpsid){
        this.$Message.error("请先选择GPS");
        return;
      }
      this.showEditGpsObj = Object.assign({},this.currentRow);
      if(this.showEditGpsObj.groupids){
        var ids = this.showEditGpsObj.groupids.split(",");
        this.showEditGpsObj.groupids = ids;
      }
      this.showEditGps = true;
    },
    hideEditGpsModal(){
      this.showEditGps = false;
    },
    updateGps(){
        if(this.showEditGpsObj.gpscode=="" || this.showEditGpsObj.gpscode==null){
          this.$Message.error("车辆编号不能为空");
          return;
        }
        if(this.showEditGpsObj.gpsname=="" || this.showEditGpsObj.gpsname==null){
          this.$Message.error("设备名称不能为空");
          return;
        }
        this.http.get("/gps/updateGpsDevice",this.showEditGpsObj,this.updateGpsDeviceCallBack,this,false);
    },
    updateGpsDeviceCallBack(data){
       this.$Message.success("修改成功");
       this.showEditGps = false;
       this.currentRow = {};
       this.http.get("/gps/getGpsByDept",{deptcode:this.currentDept.deptcode},this.getGpsByDeptCallBack,this,false);
    },
    choiceEditDept(data){
       this.showEditGpsObj.deptcode = data.deptcode;
       this.showEditGpsObj.deptname = data.deptname;
    },
    showDeleteGpsModal(){
      if(!this.currentRow.gpsid){
        this.$Message.error("请先选择GPS");
        return;
      }
      this.showDeleteGps = true;
    },
    hideDeleteGpsModal(){
      this.showDeleteGps = false;
    },
    deleteGps(){
      this.http.get("/gps/deleteGpsByGpsid",{gpsid:this.currentRow.gpsid},this.deleteGpsByGpsidCallBack,this,false);
    },
    deleteGpsByGpsidCallBack(data){
      this.$Message.success("删除成功");
      this.showDeleteGps = false;
      this.currentRow = {};
      this.http.get("/gps/getGpsByDept",{deptcode:this.currentDept.deptcode},this.getGpsByDeptCallBack,this,false);
    },
    showAssignGpsModal(){
      if(!this.currentRow.gpsid){
        this.$Message.error("请先选择GPS");
        return;
      }
      this.showAssignGpsObj = Object.assign({},this.currentRow);
      if(this.showAssignGpsObj.usercodes){
        var usercodes = this.showAssignGpsObj.usercodes.split(",");
        this.showAssignGpsObj.usercodes = usercodes;
      }
      this.showAssignGps = true;
    },
    hideAssignGpsModal(){
      this.showAssignGps = false;
    },
    assignGps(){
      this.showAssignGpsObj.userarr = this.showAssignGpsObj.usercodes;
      this.http.get("/gps/saveUsersForGps",this.showAssignGpsObj,this.saveUsersForGpsCallBack,this,false);
    },
    saveUsersForGpsCallBack(data){
       this.$Message.success("分配成功");
       this.showAssignGps = false;
       this.currentRow = {};
       this.http.get("/gps/getGpsByDept",{deptcode:this.currentDept.deptcode},this.getGpsByDeptCallBack,this,false);
    },
    showGroupModal(){
      this.showGroup = true;
    },
    hideGroupModal(){
      this.showGroup = false;
    },
    groupClick(data){//选中分组
      this.currentGroup = data;
    },
    showInsertGroupModal(){
      this.showInsertGroup = true;
      this.insertGroupObj = {};
    },
    hideInsertGroupModal(){
      this.showInsertGroup = false;
    },
    insertGroup(){
        if(this.insertGroupObj.groupid=="" || this.insertGroupObj.groupid==null){
          this.$Message.error("分组编号不能为空");
          return;
        }
        if(this.insertGroupObj.groupname=="" || this.insertGroupObj.groupname==null){
          this.$Message.error("分组名称不能为空");
          return;
        }
        this.http.get("/gps/addGpsGroup",this.insertGroupObj,this.addGpsGroupCallBack,this,false);
    },
    addGpsGroupCallBack(data){
      this.$Message.success("添加分组成功");
      this.showInsertGroup = false;
      this.http.get("/gps/getGpsGroups",null,this.getGpsGroupsCallBack,this,false);
    },
    showEditGroupModal(){
      if(!this.currentGroup.groupid){
        this.$Message.error("请先选择分组");
        return;
      }
      this.editGroupObj.groupid = this.currentGroup.groupid;
      this.editGroupObj.groupname = this.currentGroup.groupname;
      this.showEditGroup = true;
    },
    hideEditGroupModal(){
      this.showEditGroup = false;
    },
    editGroup(){
      if(this.editGroupObj.groupname=="" || this.editGroupObj.groupname==null){
          this.$Message.error("分组名称不能为空");
          return;
        }
      this.http.get("/gps/updateGpsGroup",this.editGroupObj,this.updateGpsGroupCallBack,this,false);
    },
    updateGpsGroupCallBack(data){
      this.$Message.success("编辑分组成功");
      this.showEditGroup = false;
      this.http.get("/gps/getGpsGroups",null,this.getGpsGroupsCallBack,this,false);
      this.currentGroup = {};
    },
    showDeleteGroupModal(){
      if(!this.currentGroup.groupid){
        this.$Message.error("请先选择分组");
        return;
      }
      this.showDeleteGroup = true;
    },
    hideDeleteGroupModal(){
      this.showDeleteGroup = false;
    },
    deleteGroup(){
        this.http.get("/gps/deleteGpsGroup",{groupid:this.currentGroup.groupid},this.deleteGpsGroupCallBack,this,false);
    },
    deleteGpsGroupCallBack(data){
      this.$Message.success("删除分组成功");
      this.showDeleteGroup = false;
      this.http.get("/gps/getGpsGroups",null,this.getGpsGroupsCallBack,this,false);
      this.currentGroup = {};
    },
    showSearchGpsModal(){
      this.showSearchGps = true;
    },
    hideSearchGpsModal(){
      this.showSearchGps = false;
    },
    searchGps(){
      this.http.get("/gps/gpsSearchByCon",this.showSearchGpsObj,this.getGpsByDeptCallBack,this,false);
      this.showSearchGps = false;
    },
    choiceSearchDept(data){
       this.showSearchGpsObj.deptcode = data.deptcode;
       this.showSearchGpsObj.deptname = data.deptname;
    },
    resetSearchGps(){
      this.showSearchGpsObj = {};
    },
    showTypeModal(){
      this.showType = true;
    },
    hideTypeModal(){
      this.showType = false;
    },
    typeClick(data){//选中类型
      this.currentType = data;
    },
    showInsertTypeModal(){
      this.showInsertType = true;
      this.insertTypeObj = {};
    },
    hideInsertTypeModal(){
      this.showInsertType = false;
    },
    insertType(){
        if(this.insertTypeObj.typecode=="" || this.insertTypeObj.typecode==null){
          this.$Message.error("类型编号不能为空");
          return;
        }
        if(this.insertTypeObj.typename=="" || this.insertTypeObj.typename==null){
          this.$Message.error("类型名称不能为空");
          return;
        }
        // this.http.get("/gps/addGpsGroup",this.insertGroupObj,this.addGpsGroupCallBack,this,false);
    },
    showIconManagerModal(){
      this.showIconManager = true;
    },
    



    uploadPictureSuccess(response, file, fileList){
        if(response.code==1){
            this.$Message.success("上传成功");
        }else if(response.code==0){
            this.$Message.error(response.data);
        } 
    },
    uploadPictureError(error, file, fileList){
        this.$Message.error("上传失败");
    },
    beforeUploadPicture(file){
        var filename = file.name.split(".");
        if(filename==null || filename==undefined || filename.length<2){
            this.$Message.error("请选择正确的图片");
            return false;
        }
        var endName = filename[filename.length-1].toLocaleLowerCase();
        //.png,.ico,.bmp,.jpg,.gif,.jpeg,.ufo
        if(endName!="png"&&endName!="ico"&&endName!="bmp"&&endName!="jpg"&&endName!="gif"&&endName!="jpeg"&&endName!="ufo" ){
            this.$Message.error("请选择正确的图片");
            return false;
        }

        this.uploadAction = Constants.url_prefix+"/chat/sendChatMsg";
        //发送信息
        var param = {};
        
        var sessionId = this.common.getSessionId();
        this.uploadAction = this.uploadAction + "?param="+JSON.stringify(param)+"&sessionId="+sessionId;
        let promise = new Promise((resolve) => {
                this.$nextTick(function () {
                    resolve(true);
                });
            });
        return promise; //通过返回一个promis对象解决 
    },
  },
  created(){
    this.http.get("/gps/getGpsTypes",null,this.getGpsTypesCallBack,this,false);
    this.http.get("/gps/getGpsGroups",null,this.getGpsGroupsCallBack,this,false);
  },
  watch : {
      currentDept:function(val) {
        this.currentRow = {};
        this.http.get("/gps/getGpsByDept",{deptcode:this.currentDept.deptcode},this.getGpsByDeptCallBack,this,false);
        this.http.get("/gps/getUserByGpsDept",{deptcode:this.currentDept.deptcode},this.getUserByGpsDeptCallBack,this,false);
      }
  }
}
</script>

<style scoped>
.gpsglRightPanel{
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
  margin: 10px 0 10px 0;
  background-color: rgba(88,245,255, 0.1);
}
.tableheader{
  color: white;
  margin-top: 10px;
  height:30px;
  width:100%;
  background:rgba(250, 250, 250, 0.06);
  position: relative;
  line-height: 30px;
}
.tableheader-div{
  display: inline-flex;
  text-align: center;
}
.tablebody{
  height:calc(100% - 40px - 40px);
}
.rowActive{
    background: rgba(255, 255, 255, 0.4) !important;
}
.inputClass{
  width:200px;
  height: 28px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  margin-left:15px;
  padding: 0 10px;
}
.seachbar_dropdown{
  height: 28px;
  width: 200px;
  position:absolute;
  top:-7px;
  left:117px;
}
.groupModalDivInline{
  display:inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  width: 150px;
  color: white;
  border: 1px solid white;
}
.groupModalDiv{
  cursor: pointer;
  width:300px;
}
.groupModalDivActive{
  background: rgba(255, 255, 255, 0.2);
}
.uploadPicture{
  margin-bottom: 10px;
}
.tabs{
  border: 1px solid rgb(91, 107, 114);
  height: 100%;
}
.tabs >>> .el-tabs__content{
  background-color:rgba(0, 0, 0, 0.95);
  height:calc(100% - 40px);
}

.tabs >>> .el-tabs__nav-scroll{
  background-color: #262b2e;
  border-bottom: 1px solid rgb(91, 107, 114);
}
.tabs >>> .el-tabs__item{
  border: 1px solid rgb(91, 107, 114);
  color: white;
} 

.tabs >>> .el-tabs__item.is-active{
  background-color: #515a6e;
  border-left: 1px solid rgb(91, 107, 114);
  border-right: 1px solid rgb(91, 107, 114);
} 
.tabs_pane{
  height: 100%;
}
.tableclass{
  height:calc(100% - 90px) !important;
}
select {
  height: 28px;
  width:111px;
  color: #b6f6ff;
  border: 1px solid #b6f6ff;
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
  border: 1px solid #b6f6ff;
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
.suoshufenzu>>>.ivu-select .ivu-select-selection {
    background: transparent;
}
.suoshufenzu>>>.ivu-select-multiple .ivu-select-selection {
    padding: 0 24px 0 4px;
}
.suoshufenzu>>>.ivu-select-selection-focused, .ivu-select-selection:hover {
    border-color: #b6f6ff;
}
.suoshufenzu>>>.ivu-select-selection {
    display: block;
    box-sizing: border-box;
    outline: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 0px;
    border: 1px solid #b6f6ff;
    transition: all .2s ease-in-out;
}
.suoshufenzu>>>.ivu-select .ivu-select-dropdown {
    background: rgba(8, 56, 90, 0.90);
}
.suoshufenzu>>>.ivu-select .ivu-select-selection .ivu-tag-checked {
    background: #b6f6ff;
    color: rgba(8, 56, 90, 0.90);
}
.suoshufenzu>>>.ivu-select-dropdown {
    width: inherit;
    max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    padding: 5px 0;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 0px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    position: absolute;
    z-index: 900;
}
.suoshufenzu>>>.ivu-tag-checked span {
    color: #0b3c61;
}
.suoshufenzu>>>.ivu-select .ivu-select-selection i {
    color: #0b3c61;
}
.suoshufenzu>>>.ivu-select-multiple .ivu-select-selection .ivu-select-placeholder {
    display: block;
    height: 30px;
    line-height: 30px;
    color: #b6f6ff;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 4px;
    padding-right: 22px;
}

.renyuanfenpei>>>.ivu-select .ivu-select-selection {
    background: transparent;
}
.renyuanfenpei>>>.ivu-select-multiple .ivu-select-selection {
    padding: 0 24px 0 4px;
}
.renyuanfenpei>>>.ivu-select-selection-focused, .ivu-select-selection:hover {
    border-color: #b6f6ff;
}
.renyuanfenpei>>>.ivu-select-selection {
    display: block;
    box-sizing: border-box;
    outline: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 0px;
    border: 1px solid #b6f6ff;
    transition: all .2s ease-in-out;
}
.renyuanfenpei>>>.ivu-select .ivu-select-dropdown {
    background: rgba(8, 56, 90, 0.90);
}
.renyuanfenpei>>>.ivu-select .ivu-select-selection .ivu-tag-checked {
    background: #b6f6ff;
    color: rgba(8, 56, 90, 0.90);
}
.renyuanfenpei>>>.ivu-select-dropdown {
    width: inherit;
    max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    padding: 5px 0;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 0px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    position: absolute;
    z-index: 900;
}
.renyuanfenpei>>>.ivu-tag-checked span {
    color: #0b3c61;
}
.renyuanfenpei>>>.ivu-select .ivu-select-selection i {
    color: #0b3c61;
}
.renyuanfenpei>>>.ivu-select-multiple .ivu-select-selection .ivu-select-placeholder {
    display: block;
    height: 30px;
    line-height: 30px;
    color: #b6f6ff;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 4px;
    padding-right: 22px;
}
</style>
<style>
.modifyModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:750px;
  width: 400px !important;
}
.deleteModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:750px;
  width: 400px !important;
}
.renyuanfenpeiModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:750px;
  width: 400px !important;
}
.setGroupModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:750px;
  width: 340px !important;
}
.addGroupModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:1090px;
  width: 400px !important;
}
.mdyGroupModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:1090px;
  width: 400px !important;
}
.delGroupModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:1090px;
  width: 400px !important;
}
.gpsSearchModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:750px;
  width: 400px !important;
}
</style>