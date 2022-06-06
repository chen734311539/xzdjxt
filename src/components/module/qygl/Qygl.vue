<template>
    <div class="qyglpanel">
      <LeftContentNameBar :isshowshaixuan="false"/>
        <div class="seachbar">
          <div>
            <InputSearchNew class="seachbar_InputSearch"  v-model="name"/>
          </div>
            <div class="caozuopanel">
              <!-- <Icon custom="iconfont iconshuaxin" title="刷新" class="seachbar_shuaxin"  @click="reflash"/>
              <Icon custom="iconfont icontianjia" title="添加" class="seachbar_add"  @click="addDept"/> -->
              <div class="seachbar_shuaxin" @click="reflash" ></div>
              <div class="seachbar_add" @click="addDept" ></div>
            </div>
        </div>
        <QyglAllDeptTree @on-click="clickTree" class="qyglpanel-treePanel" :deptListObj="deptListObj" @on-change="changeCheckbox" @on-add="add" @on-delete="deleteDept" @on-edit="editDept"/>
        <div v-if="isShowAddConfig" class="addConfigPanel">
          <div style="color:#b6f6ff;">
            颜色选择:
            <ColorPicker v-model="addColor"/>
          </div>
          <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="hideAddConfig">取消</Button>
          <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="draw">画面</Button> -->
          <HfxButton @click="hideAddConfig" style="width:64px;margin-left:10px;margin-top:8px;"  name="取消" />
          <HfxButton @click="draw" style="width:64px;margin-left:10px;margin-top:8px;" name="画面" />
        </div>
        <div v-if="isShowEditConfig" class="addConfigPanel">
          <div style="color:#b6f6ff;">
            颜色选择:
            <ColorPicker v-model="editColor" @on-change="changeEditColor"/>
          </div>
          <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="hideUpdateConfig">取消</Button>
          <Button type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;" @click="save">保存</Button> -->
          <HfxButton @click="hideUpdateConfig" style="width:64px;margin-left:10px;margin-top:8px;" name="取消" />
          <HfxButton @click="save" style="width:64px;margin-left:10px;margin-top:8px;" name="保存" />
        </div>
        <Modal v-model="showAdd" :draggable = "true" :title="addOrEditState=='0'?'新增区域部门':'修改区域部门'" class-name="qyglselect-panel">
            <div slot="close"><div class="hfx-modal-close"/></div>
            <div class="modal-div">
                <span>区域名称：</span>
                <input class="inputclass" v-model="qyname"/>
            </div>
            <div class="modal-div">
                <span>所属类型：</span>
                <select  v-model="sslx" @change="changeSslx">
                    <option value="1">市</option>
                    <option value="2">区县</option>
                    <option value="3">乡镇街道</option>
                    <option value="4">社区自然村</option>
                    <option value="5">网格</option>
                </select>
            </div>
            <div class="modal-div">
                <span>排列序号：</span>
                <input class="inputclass" v-model="seq"/>
            </div>
            <div class="modal-div">
                <span>上级区域：</span>
                <select v-model="pqycode" class="inputclass" @change="changeProduct($event)">
                      <option value="-1">顶级</option>
                      <option v-for="pquObj in pqylist" :value="pquObj.qycode" :key="pquObj.qycode">{{pquObj.qyname}}</option>
                </select>
            </div>
            <div slot="footer">
              <!-- <Button type="text" size="large" @click="cancleAdd">取消</Button>
              <Button type="primary" size="large" @click="addQydept">确定</Button> -->
              <HfxButton @click="cancleAdd" name="取消" />
              <HfxButton @click="addQydept" />
            </div>
        </Modal>
        <Modal title="删除单位" v-model="showDelete" class-name="qygl_deldeptModal" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
            <div style="width:100%;text-align:center;">是否删除该单位?</div>
            <div slot="footer">
              <!-- <Button type="text" size="large" @click="hideDeleteModal">取消</Button>
              <Button type="primary" size="large" @click="deleteItem">确定</Button> -->
              <HfxButton @click="hideDeleteModal" name="取消" />
              <HfxButton @click="deleteItem" />
            </div>
        </Modal>
    </div>
</template>

<script>
import Vue from 'vue'
import QyglAllDeptTree from '@/components/module/qygl/QyglAllDeptTree'
import QyglDetail from '@/components/module/qygl/QyglDetail'
import markUtil from '@/components/map/js/markUtil'
import mapUtil from '@/components/map/js/mapUtil'
import InputSearchNew from '@/components/base/InputSearchNew'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import { mapState } from 'vuex'
export default {
  name: 'Qygl',
  components: { QyglAllDeptTree,QyglDetail,InputSearchNew,LeftContentNameBar},
  data () {
    return {
      isfanhuishow:false,
      name:"",
      deptListObj:{},
      addColor:"#1559A0",
      editColor:"",
      isShowAddConfig:false,
      isShowEditConfig:false,
      addData:{},
      editData:{},
      showAdd:false,
      qycode:"",
      qyname:"",
      sslx:"1",
      seq:"99",
      pqycode:"-1",
      pqyname:"顶级",
      pqylist:[],
      showDelete:false,
      deleteqycode:"",
      addOrEditState:"0",//0显示新增界面，1显示修改界面
    }
  },
  computed: mapState({
  }),
  methods:{
      addDept(){
        this.addOrEditState = '0';
        this.showAdd=true;
      },
      reflash(){
        this.initQyDeptTree();
      },
      cancleAdd(){
        this.showAdd = false;
      },
      changeSslx(){
        var paramObj = {};
        paramObj.type = this.sslx-1;
        this.http.get("/qygl/getQyDeptByType",paramObj,this.getQyDeptByTypeCallBack,this,false);
      },
      getQyDeptByTypeCallBack(result){
        if(result.length==0){

        }else{
          this.pqylist = result;
        }
      },
      changeProduct(event){
          this.pqyname = event.target[this.pqycode].text;
      },
      addQydept(){
        if(this.addOrEditState=='0'){//新增
          var paramObj = {};
          paramObj.qyname = this.qyname;
          paramObj.type = this.sslx;
          paramObj.seq = this.seq;
          paramObj.pqyname = this.pqyname;
          paramObj.pqycode = this.pqycode;
          this.http.get("/qygl/insertQyDept",paramObj,this.insertQyDeptCallBack,this,false);
        }else{//修改
          var paramObj = {};
          paramObj.qycode = this.qycode;
          paramObj.qyname = this.qyname;
          paramObj.type = this.sslx;
          paramObj.seq = this.seq;
          paramObj.pqyname = this.pqyname;
          paramObj.pqycode = this.pqycode;
          this.http.get("/qygl/updateQyDept",paramObj,this.insertQyDeptCallBack,this,false);
        }
      },
      insertQyDeptCallBack(result){
        this.showAdd = false;
        this.http.get("/qygl/getQyDeptTree",null,this.getQyDeptTreeCallBack,this,false);
      },
      clickTree(data){
        
      },
      getQyDeptTreeCallBack(data){
         this.deptListObj = data;
      },
      getQyMarkLocInfoCallBack(data){
        for(var i=0;i<data.length;i++){
          var param = {};
          param.markid = data[i].markid;
          param.qycode = data[i].qycode;
          param.pqycode = data[i].pqycode;
          param.qyname = data[i].markname;
          param.linecolor = data[i].linecolor;
          param.polygoncolor = data[i].polygoncolor;
          var detailHandler = this.QyglDetailHandler;
          var Profile = Vue.extend({
              template: '<QyglDetail :data="data" @handler="QyglDetailHandler"/>',
              components: {QyglDetail},
              data: function () {
                  return {
                    data:param
                  }
                },
                methods:{
                  QyglDetailHandler(data,state){
                    detailHandler(data,state);
                  }
                }
          });
          data[i].cp = new Profile();
          data[i].type = "qygl";
          markUtil.addPolygonMark("qy_layer",data[i],this);
        }
      },
      changeCheckbox(isCheck,data){
        if(data.markid){
          if(isCheck){//显示
            var paramObj = {};
            var qycodes = [];
            qycodes.push(data.qycode);
            paramObj.qycodes = qycodes;
            this.http.get("/qygl/getQyMarkLocInfo",paramObj,this.getQyMarkLocInfoCallBack,this,false);
          }else{//取消显示
            markUtil.clearMark("qy_layer",data.markid,this);
            $(".qy_layer"+data.markid).remove();
          }
        }
      },
      deleteDept(val){
        this.deleteqycode = val;
        this.showDelete = true;
      },
      hideDeleteModal(){
        this.showDelete = false;
      },
      deleteItem(){
        var paramObj = {};
        paramObj.qycode = this.deleteqycode;
        this.http.get("/qygl/deleteQyDept",paramObj,this.deleteQyDeptCallBack,this,false);
      },
      deleteQyDeptCallBack(result){
        this.initQyDeptTree();
        this.showDelete = false;
      },
      editDept(data){
        this.addOrEditState = '1';
        this.qyname = data.qyname;
        this.qycode = data.qycode;
        this.showAdd = true;
        this.sslx = data.type;
        this.seq = data.seq;
        this.changeSslx();
        this.pqycode = data.pqycode;
      },
      add(data){
        this.addData = data;
        this.isShowAddConfig = true;
        //正在修改的取消
        this.hideUpdateConfig();
      },
      hideAddConfig(){
        this.isShowAddConfig = false;
        markUtil.clearDrawLayer(this);
      },
      draw(){
        if(this.addColor==""){
          this.$Message.error("请选择区域面的颜色");
          return;
        }
        var c = this.common.color16ToRGB(this.addColor);
        var cs = c.split(",");
        var linecolor="rgb("+cs[0]+","+cs[1]+","+cs[2]+")";
        var polygoncolor="rgba("+cs[0]+","+cs[1]+","+cs[2]+",0.5)";
        var param = {};
        param.qycode = this.addData.qycode;
        param.pqycode = this.addData.pqycode;
        param.qyname = this.addData.qyname;
        param.linecolor = linecolor;
        param.polygoncolor = polygoncolor;
        var templateobj =  new Object();
        templateobj.type = "qygl";
        var detailHandler = this.QyglDetailHandler;
        var Profile = Vue.extend({
          template: '<QyglDetail :data="data" @handler="QyglDetailHandler"/>',
          components: {QyglDetail},
          data: function () {
            return {
              data:param
            }
          },
          methods:{
            QyglDetailHandler(data,state){
              detailHandler(data,state);
            }
          }
        })
        templateobj.cp = new Profile();
        markUtil.drawAndEit("tempLayer",linecolor,polygoncolor,templateobj,this);
      },
      QyglDetailHandler(data,state){
        if(state=="edit"){
          this.editData = data;
          this.isShowEditConfig = true;
          this.editColor = this.common.colorRGBto16(data.linecolor)
        }else if(state=="save"){
          this.http.get("/qygl/getQyDeptTree",null,this.getQyDeptTreeCallBack,this,false);
          this.isShowAddConfig = false;
        }else if(state=="close"){
          this.hideUpdateConfig();
        }else if(state=="delete"){
          this.isShowEditConfig = false;
          this.http.get("/qygl/getQyDeptTree",null,this.getQyDeptTreeCallBack,this,false);
        }
      },
      hideUpdateConfig(){
        this.isShowEditConfig = false;
        markUtil.hideLayer("hfxmap_graphics",this);//编辑图层隐藏
        this.map.editToolbar.deactivate();//编辑工具注销
        //恢复原样
        if(this.editData.markid){
          var graphic = this.map.markidmap["qy_layer"][this.editData.markid];
          if(graphic){
            markUtil.setPolygonColor(graphic,this.editData.linecolor,this.editData.polygoncolor,this);
            var l = new esri.geometry.Polygon(this.map.map.spatialReference);
            l.addRing(this.map.editToolbarPointBefore);
            graphic.setGeometry(l);
          }
        }
        this.editData = {};
      },
      save(){
        var paramObj = {};
        paramObj.qycode = this.editData.qycode;
        paramObj.pqycode = this.editData.pqycode;
			  paramObj.layerid = "qy_layer";
        paramObj.markname = this.editData.qyname;
        var c = this.common.color16ToRGB(this.editColor);
        var cs = c.split(",");
        var linecolor="rgb("+cs[0]+","+cs[1]+","+cs[2]+")";
        var polygoncolor="rgba("+cs[0]+","+cs[1]+","+cs[2]+",0.5)";
			  paramObj.linecolor = linecolor;
        paramObj.polygoncolor = polygoncolor;
        var geometry = this.map.markidmap["qy_layer"][this.editData.markid].geometry;
        var polygon = mapUtil.getTruePolygon(geometry,this);
        paramObj.locinfo = {};
        paramObj.locinfo.points = polygon.rings[0];;
        paramObj.locinfo.type = "polygon";
        this.http.post("/qygl/updateQyMark",paramObj,this.updateQyMarkCallBack,this,false);
      },
      updateQyMarkCallBack(data){
        this.isShowEditConfig = false;
        this.editData = {};
        markUtil.hideLayer("hfxmap_graphics",this);//编辑图层隐藏
        if(this.map.editToolbar){
          this.map.editToolbar.deactivate();//取消编辑
        }
        this.$Message.success("辖区修改成功");
      },
      changeEditColor(){//当修改的颜色发生变化时
        var graphic = this.map.markidmap["qy_layer"][this.editData.markid];
        if(graphic){
          var c = this.common.color16ToRGB(this.editColor);
          var cs = c.split(",");
          var linecolor="rgb("+cs[0]+","+cs[1]+","+cs[2]+")";
          var polygoncolor="rgba("+cs[0]+","+cs[1]+","+cs[2]+",0.5)";
          markUtil.setPolygonColor(graphic,linecolor,polygoncolor,this);
        }
      },
      initQyDeptTree(){
        this.http.get("/qygl/getQyDeptTree",null,this.getQyDeptTreeCallBack,this,false);
      }
  },
  created(){
    this.initQyDeptTree();
  }
}
</script>

<style scoped>
.qyglpanel{
   height: 100%;
}
.seachbar{
  height: 72px;
  position: relative;
}
.seachbar_InputSearch{
  height: 36px;
  width: 100%;
}
.seachbar_dropdown{
  height: 24px;
  width: 40%;
  position:absolute !important;
  top:0px;
  left: 41%;
}
.caozuopanel{
    margin: 10px 0;
    height: 22px;
    position: relative;
}
.seachbar_add{
 position:absolute;
  cursor: pointer;
  right: 0;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/qygl/qygl_add.png)  no-repeat;
}
.seachbar_shuaxin{
  position:absolute;
  right: 30px;
  cursor: pointer;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/qygl/qygl_refresh.png)  no-repeat;
}
.qyglpanel-treePanel{
  max-height:calc(100% - 115px);
  overflow: auto;
}
.addConfigPanel{
  position:absolute;
  top: 75px;
  left: 390px;
  z-index: 2;
  height: 91px;
  width: 178px;
  background: #1d5996;
  padding: 10px;
  color: white;
}
.modal-div{
  text-align: right;
  margin-top: 10px;
  margin-right:20px;
  margin-left:20px;
}
.modal-div span{
  width: 85px;
  text-align: right;
  margin-right: 10px;
}
.inputclass{
  width:180px;
  height: 28px;
  outline: none;
  color: #b6f6ff;
  padding: 0 10px;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
select {
  height:28px;
  width:180px;
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
</style>
<style>
.qyglselect-panel .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 155px;
  left:390px;
  width: 327px !important;
}
.qygl_deldeptModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:750px;
  width: 400px !important;
}
</style>

