<template>
    <div class="layerItemClass">
            <div class="layerContentClass" @mouseover="showEditIcon" @mouseout="hideEditIcon">
                <div  :class="markClass"   @click="getLayerMarks" title="在地图上显示或隐藏"></div>
                <span style="margin-left:5px;color:#ffa20f;">{{data.layername}}({{data.num}})</span>
                <div  class="showLayerEditClass"   @click="showLayerEdit" title="显示或隐藏编辑栏"></div>
                <div class="layerIconDiv">
                    <div v-show="isEditIconShow" class="clearClass"   @click.stop="clearLayerMarks" title="清空图层内容"></div>
                    <div v-show="isEditIconShow" class="xiugaiClass"   @click.stop="showEditLayerModal" title="修改图层名称"></div>
                    <div v-show="isEditIconShow" class="shanchuClass"   @click.stop="deleteLayer" title="删除图层"></div>
                    <div  class="xianshiClass"  @click.stop="showLayerMarkModal" title="显示图层元素列表"></div>
                </div>
            </div>
               <div class="layerEditClass" v-show="isShowLayerEdit">
                   <!-- <div class="flexc editClass" :class="{editClassActive:(selectItem=='POINT')}" @click="clickDraw('POINT')">
                       <Icon custom="iconfont icondian" style="color:white;font-size:14px;"/>
                   </div>
                   <div class="flexc editClass" :class="{editClassActive:(selectItem=='POLYLINE')}" @click="clickDraw('POLYLINE')">
                       <Icon custom="iconfont iconicon-xian" style="color:white;font-size:14px;"/>
                   </div>
                   <div class="flexc editClass" :class="{editClassActive:(selectItem=='POLYGON')}" @click="clickDraw('POLYGON')">
                       <Icon custom="iconfont iconshixinzhengfangxing" style="color:white;font-size:14px;"/>
                   </div>
                    <div class="flexc editClass" :class="{editClassActive:(selectItem=='TEXT')}" @click="clickDraw('TEXT')">
                       <Icon custom="iconfont iconwenzi" style="color:white;font-size:14px;"/>
                   </div> -->
                   <div class="huaClass">
                        <div :class="{editClassActive:(selectItem=='POINT')}">
                            <div  class="huadianClass" :class="{editClassActive:(selectItem=='POINT')}" @click="clickDraw('POINT')"  title="画点"></div>
                        </div>
                        <div :class="{editClassActive:(selectItem=='POLYLINE')}">
                            <div  class="huaxianClass" @click="clickDraw('POLYLINE')"  title="画线"></div>
                        </div>
                        <div :class="{editClassActive:(selectItem=='POLYGON')}">
                            <div  class="huamianClass" @click="clickDraw('POLYGON')"  title="画面"></div>
                        </div>
                        <div :class="{editClassActive:(selectItem=='TEXT')}">
                            <div  class="huawenziClass" @click="clickDraw('TEXT')"  title="文字"></div>
                        </div>
                    </div>
                   <div class="caozuoClass">
                        <!-- <Button type="primary" size="small" style="width:40px;" @click="clickEditTemplate">编辑</Button>
                        <Button type="primary" size="small" style="width:40px;" @click="showLayerExportModal">导入</Button> -->
                        <div  class="bianjiClass"  @click="clickEditTemplate"  title="编辑"></div>
                        <div  class="daochuClass" @click="exportTemplate"  title="导出模板"></div>
                        <!-- <Upload class="upload" accept=".xls,.xlsx" :action="uploadImportUrl" :show-upload-list="false" :on-success="uploadSuccess" :on-error="uploadError"><Button type="primary" size="small" style="width:64px;">导入</Button></Upload> -->
                        <Upload class="upload" accept=".xls,.xlsx" :action="uploadImportUrl" :show-upload-list="false" :on-success="uploadSuccess" :on-error="uploadError">
                            <div  class="daoruClass"   title="导入数据"></div>
                        </Upload>
                        <!-- 编辑 导入 导出 -->
                        <!-- <div  class="xianshiClass"  @click.stop="showLayerMarkModal" title="编辑"></div>
                        <div  class="xianshiClass"  @click.stop="showLayerMarkModal" title="导入"></div>
                        <div  class="xianshiClass"  @click.stop="showLayerMarkModal" title="导出"></div> -->
                   </div>
               </div>
               <Modal title="修改图层名称" v-model="isShowEditLayerModal" class-name="mdyLayer" :draggable="true">
                    <div slot="close"><div class="hfx-modal-close"/></div>
                    <input v-model="editlayername" class="inputClass"/>
                    <div slot="footer">
                        <!-- <Button type="primary" size="large" @click="hideEditLayerModal" style="margin-right:10px;">取消</Button>
                        <Button type="primary" size="large" @click="updateLayer">保存</Button> -->
                        <HfxButton  @click="hideEditLayerModal" name="取消" />
                        <HfxButton  @click="updateLayer" name="保存" />              
                    </div>
                </Modal>
                <Modal :title="data.layername" v-model="isShowLayerMarkModal" class-name="showlayerList" :draggable="true">
                    <div slot="close"><div class="hfx-modal-close"/></div>
                    <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" v-model="markname" />
                    <div style="height:200px;margin-top:10px;overflow:auto;">
                        <div v-for="item in markList" :key="item.markid" @click="clickMark(item)" style="background-color: rgba(88,245,255, 0.1);padding:10px 25px;margin-bottom:2px;cursor: pointer;justify-content:space-between;" class="flexr">
                            <span style="color:white;">{{item.markname}}</span>
                            <!-- <Icon v-show="item.marktype=='1'" custom="iconfont icondian" style="color:white;font-size:14px;"/>
                            <Icon v-show="item.marktype=='2'" custom="iconfont iconicon-xian" style="color:white;font-size:14px;"/>
                            <Icon v-show="item.marktype=='3'" custom="iconfont iconshixinzhengfangxing" style="color:white;font-size:14px;"/>
                            <Icon v-show="item.marktype=='4'" custom="iconfont iconwenzi" style="color:white;font-size:14px;"/> -->
                            <div v-show="item.marktype=='1'" class="huadianClass"></div>
                            <div v-show="item.marktype=='2'" class="huaxianClass"></div>
                            <div v-show="item.marktype=='3'" class="huamianClass"></div>
                            <div v-show="item.marktype=='4'" class="huawenziClass"></div>
                        </div>
                    </div>
                    <div slot="footer">
                        <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
                    </div>
                </Modal>
                <!-- <Modal title="导入" v-model="isShowLayerExportModal" class-name="modal_index positionleft" :draggable="true" width="250">
                    <div>请选择要导入的excel文档，导入的文档必须由导出模板编辑所得。</div>
                    <div slot="footer" class="flexr" style="justify-content:flex-end;">
                        <Upload class="upload" accept=".xls,.xlsx" :action="uploadImportUrl" :show-upload-list="false" :on-success="uploadSuccess" :on-error="uploadError"><Button type="primary" size="small" style="width:64px;">导入</Button></Upload>
                        <Button type="primary" size="small" style="width:64px;margin-left:10px;" @click="exportTemplate">导出模板</Button>
                    </div>
                </Modal> -->
    </div>
</template>

<script>
import Vue from 'vue'
import markUtil from '@/components/map/js/markUtil'
import mapUtil from '@/components/map/js/mapUtil'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import LayerMapDetailEdit from '@/components/module/dztc/LayerMapDetailEdit'
import LayerMapDetail from '@/components/module/dztc/LayerMapDetail'
import PagerNew from '@/components/base/PagerNew'
import InputSearchNew from '@/components/base/InputSearchNew'
import map3DUtil from '@/components/map/js/map3DUtil'


export default {
  name: 'DztcItem',
  components: {LayerMapDetailEdit,LayerMapDetail,PagerNew,InputSearchNew},
  props:['data','isActive','module','name'],
  data () {
    return {
        selectItem:"0",//画点1，画线2，画面3，文字4
        isShowLayerEdit:false,
        isDWActive:false,
        isShowEditLayerModal:false,
        editlayername:"",
        isShowLayerMarkModal:false,
        isEditIconShow:false,
        totalSize:0,
        pageSize:10,
        page:1,
        markname:"",
        markList:[],

        isShowLayerExportModal:false,
        uploadImportUrl:"",
    }
  },
  computed: {...mapState({
      currentMapType:state => state.currentMapType,
  }),
    layerList:function(){
        return this.data.layers;
    },
    markClass:function(){
        if(this.isDWActive){
            return "showmarkClass";
        }else{
            return "hidemarkClass";
        }
    },
  },
  methods:{
      clickDraw(val){
          if(this.selectItem==val){
              this.selectItem="0";
          }else{
            this.selectItem = val;
            this.http.get("/tczy/getUsedTemplate",{layerid:this.data.layerid},this.getUsedTemplateCallBack,this,false);
          }
      },
      getUsedTemplateCallBack(data){
        if(!data.templateid){
            this.$Message.error("请先配置本图层的模板");
            return;
        }
        var marktype = "1";
        if(this.selectItem=="POLYLINE"){
            marktype = "2";
        }else if(this.selectItem=="POLYGON"){
            marktype = "3";
        }else if(this.selectItem=="TEXT"){
            marktype = "4";
        }
        var markinfo =  new Object();
        markinfo.type = "dztc";
        var Profile = Vue.extend({
          template: '<LayerMapDetailEdit :templateobj="data" :marktype="marktype"/>',
          components: {LayerMapDetailEdit},
          data: function () {
            return {
              data:data,
              marktype:marktype,
            }
          },
          methods:{
          }
        })
        markinfo.cp = new Profile();
        markUtil.drawDztcLayer(this.selectItem,this,data,markinfo,this.drawComplete,);
      },
      drawComplete(){
          this.selectItem="0";
      },
      showLayerEdit(){
          this.isShowLayerEdit = !this.isShowLayerEdit;
      },
      clickEditTemplate(){
         this.$emit('on-click','templateEdit',this.data);		
      },
      getLayerMarks(){
          if(this.isDWActive){//已激活
              this.isDWActive = false;
              if(this.currentMapType=="3D"){
                    var layerid = this.data.layerid
                    var dataSource = null;
                    var dataSources = window.viewer.dataSources._dataSources;
                    for(var i=0;i<dataSources.length;i++){
                        var name = dataSources[i]._name;
                        if(name==layerid){
                            dataSource = dataSources[i];
                            break;
                        }
                    }
                    if(dataSource != null){
                      window.viewer.dataSources.remove(dataSource);
                    }
              }else{
                  markUtil.clearLayer("dztc"+this.module+this.data.layerid+"Layer",this);
              }
          }else{
              this.isDWActive = true;
              if(this.currentMapType=="3D"){
                  this.http.get("/tczy/getMarks",{layerid:this.data.layerid,name:this.name},this.getMarks3DCallBack,this,false);
              }else{
                  this.http.get("/tczy/getMarks",{layerid:this.data.layerid,name:this.name},this.getMarksCallBack,this,false);
              }
          }
      },
      getMarks3DCallBack(data){
         map3DUtil.addDztcLayer(data);
      },
      getMarksCallBack(data){
        var layerid = data.templateObj.layerid;
        var groupmodule = data.groupmodule;
        markUtil.clearLayer("dztc"+groupmodule+layerid+"Layer",this);
        for(var i=0;i<data.markList.length;i++){
            var markObj = data.markList[i];
            var attributes =  new Object();
            attributes.type = "dztc";
            var Profile = Vue.extend({
            template: '<LayerMapDetail :templateObj="templateObj" :markObj="markObj"/>',
            components: {LayerMapDetail},
            data: function () {
                return {
                    templateObj:data.templateObj,
                    markObj:markObj
                }
            },
            methods:{
            }
            })
            attributes.cp = new Profile();
            //设置打在地图上的图片的大小
            attributes.size_x = data.templateObj.sizex;
			attributes.size_y = data.templateObj.sizey;
            markUtil.addDztcLayerMark("dztc"+groupmodule+layerid+"Layer",data.templateObj,markObj,attributes,this);
        }
      },
      showEditLayerModal(){
          this.editlayername = this.data.layername;
          this.isShowEditLayerModal = true;
      },
      hideEditLayerModal(){
          this.isShowEditLayerModal = false;
      },
      updateLayer(){
          if(this.editlayername==""){
              this.$Message.error("图层名称不能为空");
              return;
          }
          var param = {};
          param.layerid = this.data.layerid;
          param.layername = this.editlayername;
          this.http.get("/tczy/updateLayer",param,this.updateLayerCallBack,this,false);
      },
      updateLayerCallBack(data){
        this.$Message.success("保存成功");
        this.isShowEditLayerModal = false;
        var param = {};
        param.groupid = this.data.groupid;
        param.layerid = this.data.layerid;
        param.layername = this.editlayername;
        this.$emit('on-click',"updateLayer",param);	
      },
      deleteLayer(){
          var h = this.$createElement;
          this.$msgbox({
          title: '删除图层',
          message: h('p', null, [
            h('span', null, '是否删除此图层('+this.data.layername+')？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              var param = {};
              param.layerid = this.data.layerid;
              this.http.get("/tczy/deleteLayer",param,this.deleteLayerCallBack,this,false);
            } else {
              done();
            }
          }
        }).catch();
      },
      deleteLayerCallBack(data){
          this.$Message.success("删除成功");
          var param = {};
          param.groupid = this.data.groupid;
          param.layerid = this.data.layerid;
          this.$emit('on-click',"deleteLayer",param);	
      },
      showLayerMarkModal(){
          this.isShowLayerMarkModal = true;
          this.page = 1;
          this.markname="";
          this.getMarkList();
          //如果图层没有开，开图层
          if(!this.isDWActive){//已激活
              this.isDWActive = true;
              this.http.get("/tczy/getMarks",{layerid:this.data.layerid,name:this.name},this.getMarksCallBack,this,false);
          }
      },
      hideLayerMarkModal(){
          this.isShowLayerMarkModal = false;
      },
      pageChange(page){
        this.page = page;
        this.getMarkList();
      },
      inputSearch(value){
         this.page = 1;
         this.getMarkList();
      },
      getMarkList(){
          var param={};
          param.layerid = this.data.layerid;
          param.name = this.markname;
          param.name2 = this.name;
          param.page = this.page;
          param.pagesize = this.pageSize;
          this.http.get("/tczy/getMarkList",param,this.getMarkListCallBack,this,false);
      },
      getMarkListCallBack(data){
          this.markList = data.list;
          this.totalSize = data.count;
      },
      clickMark(markObj){
            if(this.currentMapType=="3D"){
               map3DUtil.map3dCenterAt(markObj.loc);
            }else{
               markUtil.centerAndShow("dztc"+this.module+this.data.layerid+"Layer",markObj.markid,this);
            }
      },
      showLayerExportModal(){
          this.isShowLayerExportModal = true;
      },
      exportTemplate(){
          this.http.download("/tczy/exportDztcExcel",{layerid:this.data.layerid});
      },
      uploadSuccess(response, file, fileList){
          if(response.code==1){
              this.$Message.success("上传成功");
          }else if(response.code==0){
              this.$Message.error(response.data);
          }
      },
      uploadError(error, file, fileList){
          this.$Message.error("上传处警信息失败");
      },
      showEditIcon(){
          this.isEditIconShow=true;
      },
      hideEditIcon(){
          this.isEditIconShow=false;
      },
      clearLayerMarks(){
          if(confirm("确定删除该图层下的所有标记?")){
            var param={};
            param.layerid = this.data.layerid;
            this.http.get("/tczy/deleteLayerMarksByLayerid",param,this.deleteLayerMarksByLayeridCallBack,this,false);
          }
      },
      deleteLayerMarksByLayeridCallBack(result){
        this.$emit("on-delete",null);
        this.$Message.success(result);
      },
  },
  created(){
    
  },
  mounted(){
     var sessionId = this.common.getSessionId();
     this.uploadImportUrl = Constants.url_prefix+'/tczy/importDztcExcel?param={layerid:"'+this.data.layerid+'"}&sessionId='+sessionId;
  },
  watch : {
      isActive:function(val) {
          this.isDWActive = val;
      }
  }
}
</script>

<style scoped>
.iconClass{
    color: white;
    font-size: 18px;
    cursor: pointer;
}
.iconlayerClass{
    color: white;
    font-size: 16px;
    cursor: pointer;
}
.layerContentClass{
    display: flex;
    height: 34px;
    align-items: center;
    position: relative;
    color: #b6f6ff;
    padding: 0 0 0 10px;
}
.layerIconDiv{
    position:absolute;
    right: 10px;
    display: flex;
}
.layerEditClass{
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.editClass{
    padding-left: 5px;
    padding-right: 5px;
    cursor: pointer;
}
.editClassActive{
    background-color: #08385a;
}
.layerItemClass{
    background-color: rgba(79,104,193, 0.3);
    margin-bottom: 1px;
}
.active{
    color: rgb(240, 123, 13);
}
.inputClass{
    width: 200px;
    height: 30px;
    outline:0;
    background-color: transparent;
    color: #b6f6ff;
    border: 1px solid #b6f6ff;
    margin-left:15px;
}
.pagebar{
  height: 23px;
  background-color:transparent;
}
.seachbar_InputSearch{
  height: 36px;
  width: 100%;
}
.showmarkClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_showmark.png)  no-repeat;
}
.hidemarkClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_hidemark.png)  no-repeat;
}
.showLayerEditClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-left: 5px;
    background: 
    url(./../../../assets/dztc/dztc_showedit.png)  no-repeat;
}
.clearClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 13px;
    background: 
    url(./../../../assets/dztc/dztc_refresh.png)  no-repeat;
    background-size: 100%;
}
.xiugaiClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 13px;
    background: 
    url(./../../../assets/dztc/dztc_mdy.png)  no-repeat;
}
.shanchuClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 13px;
    background: 
    url(./../../../assets/dztc/dztc_del.png)  no-repeat;
}
.xianshiClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_xianshi.png)  no-repeat;
}
.huaClass{
    display: flex;
    position:absolute;
    left: 10px;
    width: 60%;
    justify-content: space-around;
}
.huadianClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_dian.png)  no-repeat;
}
.huaxianClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_xian.png)  no-repeat;
}
.huamianClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_mian.png)  no-repeat;
}
.huawenziClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_wenzi.png)  no-repeat;
}
.caozuoClass{
    display: flex;
    position: absolute;
    right: 10px;
    width: 30%;
    justify-content: space-around;
}
.bianjiClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_bianji.png)  no-repeat;
}
.daoruClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_daoru.png)  no-repeat;
}
.daochuClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_daochu.png)  no-repeat;
}
</style>
<style>
.mdyLayer .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 82px;
  left:387px;
  width: 300px !important;
}
.showlayerList .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 82px;
  left:387px;
  width: 350px !important;
}
</style>

