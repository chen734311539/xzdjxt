<template>
    <div class="xqglpanel">
      <LeftContentNameBar :isshowshaixuan="false"  />
        <AllDeptXqglTree @on-click="clickTree" class="xqglpanel-treePanel" :deptListObj="deptListObj" @on-change="changeCheckbox" @on-add="add"/>
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
    </div>
</template>

<script>
import Vue from 'vue'
import AllDeptXqglTree from '@/components/module/xqgl/AllDeptXqglTree'
import XqglDetail from '@/components/module/xqgl/XqglDetail'
import markUtil from '@/components/map/js/markUtil'
import mapUtil from '@/components/map/js/mapUtil'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import { mapState } from 'vuex'
export default {
  name: 'Xqgl',
  components: { AllDeptXqglTree,XqglDetail,LeftContentNameBar},
  data () {
    return {
      deptListObj:{},
      addColor:"",
      editColor:"",
      isShowAddConfig:false,
      isShowEditConfig:false,
      addData:{},
      editData:{}
    }
  },
  computed: mapState({
  }),
  methods:{
      clickTree(data){
        // this.$store.dispatch('putChildState',{"key":"czlog","childkey":"currentDept","value":data});
      },
      getXqDeptTreeCallBack(data){
         this.deptListObj = data;
      },
      getXqMarkByDeptCallBack(data){
        for(var i=0;i<data.length;i++){
          var param = {};
          param.markid = data[i].markid;
          param.deptcode = data[i].deptcode;
          param.deptname = data[i].markname;
          param.linecolor = data[i].linecolor;
          param.polygoncolor = data[i].polygoncolor;
          var detailHandler = this.XqglDetailHandler;
          var Profile = Vue.extend({
              template: '<XqglDetail :data="data" @handler="XqglDetailHandler"/>',
              components: {XqglDetail},
              data: function () {
                  return {
                    data:param
                  }
                },
                methods:{
                  XqglDetailHandler(data,state){
                    detailHandler(data,state);
                  }
                }
          });
          data[i].cp = new Profile();
          data[i].type = "xqgl";
          markUtil.addPolygonMark("xq_layer",data[i],this);
        }
      },
      changeCheckbox(isCheck,data){
        if(data.markid){
          if(isCheck){//显示
            var paramObj = {};
            var deptcodes = [];
            deptcodes.push(data.deptcode);
            paramObj.deptcodes = deptcodes;
            this.http.get("/xqgl/getXqMarkByDept",paramObj,this.getXqMarkByDeptCallBack,this,false);
          }else{//取消显示
            markUtil.clearMark("xq_layer",data.markid,this);
            $(".xq_layer"+data.markid).remove();
          }
        }
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
          this.$Message.error("请选择辖区面的颜色");
          return;
        }
        var c = this.common.color16ToRGB(this.addColor);
        var cs = c.split(",");
        var linecolor="rgb("+cs[0]+","+cs[1]+","+cs[2]+")";
        var polygoncolor="rgba("+cs[0]+","+cs[1]+","+cs[2]+",0.5)";
        var param = {};
        param.deptcode = this.addData.deptcode;
        param.deptname = this.addData.deptname;
        param.linecolor = linecolor;
        param.polygoncolor = polygoncolor;
        var templateobj =  new Object();
        templateobj.type = "xqgl";
        var detailHandler = this.XqglDetailHandler;
        var Profile = Vue.extend({
          template: '<XqglDetail :data="data" @handler="XqglDetailHandler"/>',
          components: {XqglDetail},
          data: function () {
            return {
              data:param
            }
          },
          methods:{
            XqglDetailHandler(data,state){
              detailHandler(data,state);
            }
          }
        })
        templateobj.cp = new Profile();
        markUtil.drawAndEit("tempLayer",linecolor,polygoncolor,templateobj,this);
      },
      XqglDetailHandler(data,state){
        if(state=="edit"){
          this.editData = data;
          this.isShowEditConfig = true;
          this.editColor = this.common.colorRGBto16(data.linecolor)
        }else if(state=="save"){
          this.http.get("/xqgl/getXqDeptTree",null,this.getXqDeptTreeCallBack,this,false);
          this.isShowAddConfig = false;
        }else if(state=="close"){
          this.hideUpdateConfig();
        }else if(state=="delete"){
          this.isShowEditConfig = false;
          this.http.get("/xqgl/getXqDeptTree",null,this.getXqDeptTreeCallBack,this,false);
        }
      },
      hideUpdateConfig(){
        this.isShowEditConfig = false;
        markUtil.hideLayer("hfxmap_graphics",this);//编辑图层隐藏
        this.map.editToolbar.deactivate();//编辑工具注销
        //恢复原样
        var graphic = this.map.markidmap["xq_layer"][this.editData.markid];
        if(graphic){
          markUtil.setPolygonColor(graphic,this.editData.linecolor,this.editData.polygoncolor,this);
          var l = new esri.geometry.Polygon(this.map.map.spatialReference);
          l.addRing(this.map.editToolbarPointBefore);
          graphic.setGeometry(l);
        }
        this.editData = {};
      },
      save(){
        var paramObj = {};
			  paramObj.deptcode = this.editData.deptcode;
			  paramObj.layerid = "xq_layer";
        paramObj.markname = this.editData.deptname;
        var c = this.common.color16ToRGB(this.editColor);
        var cs = c.split(",");
        var linecolor="rgb("+cs[0]+","+cs[1]+","+cs[2]+")";
        var polygoncolor="rgba("+cs[0]+","+cs[1]+","+cs[2]+",0.5)";
			  paramObj.linecolor = linecolor;
        paramObj.polygoncolor = polygoncolor;
        var geometry = this.map.markidmap["xq_layer"][this.editData.markid].geometry;
        var polygon = mapUtil.getTruePolygon(geometry,this);
        paramObj.locinfo = {};
        paramObj.locinfo.points = polygon.rings[0];;
        paramObj.locinfo.type = "polygon";
        this.http.post("/xqgl/saveDeptXq",paramObj,this.saveDeptXqCallBack,this,false);
      },
      saveDeptXqCallBack(data){
        this.isShowEditConfig = false;
        this.editData = {};
        markUtil.hideLayer("hfxmap_graphics",this);//编辑图层隐藏
        if(this.map.editToolbar){
          this.map.editToolbar.deactivate();//取消编辑
        }
        this.$Message.success("辖区修改成功");
      },
      changeEditColor(){//当修改的颜色发生变化时
        var graphic = this.map.markidmap["xq_layer"][this.editData.markid];
        if(graphic){
          var c = this.common.color16ToRGB(this.editColor);
          var cs = c.split(",");
          var linecolor="rgb("+cs[0]+","+cs[1]+","+cs[2]+")";
          var polygoncolor="rgba("+cs[0]+","+cs[1]+","+cs[2]+",0.5)";
          markUtil.setPolygonColor(graphic,linecolor,polygoncolor,this);
        }
      }
  },
  created(){
    this.http.get("/xqgl/getXqDeptTree",null,this.getXqDeptTreeCallBack,this,false);
  }
}
</script>

<style scoped>
.xqglpanel{
   height: 100%;
}
.xqglpanel-treePanel{
  max-height:calc(100% - 20px);
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
</style>

