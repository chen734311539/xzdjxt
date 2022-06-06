<template>
    <div class="LayerMapDetail">
        <div class="herder">
           <span v-show="!isEdit">{{markname}}</span>
           <span v-show="isEdit">请输入当前标记的属性</span>
            <div class="hfx-modal-close close" @click="closeInfoWindow"></div>  
        </div>
        <div v-show="!isEdit" class="content"><!--查看的时候显示-->
            <div class="coldivclass" style="height:100%;" v-show="templateObj.pointmodule=='1'">
                    <div class="colnameshowdivclass flexr" style="justify-content:flex-start;" v-for="item in moduleList" :key="item.row">
                        <div class="flexr" :class="{inputClass1:(item.collist.length==1),inputClass2:(item.collist.length==2),inputClass3:(item.collist.length==3)}" style="justify-content:flex-start;" v-for="colitem in item.collist" :key="colitem.col">
                          <div class="colnamespanclass" style="width:50px;">{{colitem.name}}</div><div class="spanClass">{{colitem.inputvalue}}</div>
                        </div>
                    </div>
            </div>
            <div class="coldivclass" style="height:100%;" v-show="templateObj.pointmodule=='2'||templateObj.pointmodule=='3'">
                    <div style="justify-content:flex-start;" class="flexr">
                        <div class="moduleZpB" style="margin-right:5px;cursor:pointer;" v-show="templateObj.pointmodule=='2'" @click="showZpDetailModal">
                          <span v-if="!markHasPicture.markpictureurls||markHasPicture.markpictureurls.length==0">照片</span>
                          <img v-if="markHasPicture.markpictureurls&&markHasPicture.markpictureurls.length>0" :src="markHasPicture.markpictureurls[0].markpictureurl" style="width:100%;height:100%;"/>
                          <div class="tagClass" v-if="markHasPicture.markpictureurls&&markHasPicture.markpictureurls.length>1">{{markHasPicture.markpictureurls.length}}</div>
                        </div>
                        <div style="width:calc(100% - 60px)">
                            <div class="colnameshowdivclass flexr" style="justify-content:flex-start;" v-for="item in moduleBList" :key="item.row">
                                <div class="flexr" :class="{inputClass1:(item.collist.length==1),inputClass2:(item.collist.length==2),inputClass3:(item.collist.length==3)}" style="justify-content:flex-start;" v-for="colitem in item.collist" :key="colitem.col">
                                    <div class="colnamespanclass" style="width:50px;">{{colitem.name}}</div><div class="spanClass">{{colitem.inputvalue}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="moduleZpB" style="margin-left:5px;cursor:pointer;" v-show="templateObj.pointmodule=='3'" @click="showZpDetailModal">
                          <span v-if="!markHasPicture.markpictureurls||markHasPicture.markpictureurls.length==0">照片</span>
                          <img v-if="markHasPicture.markpictureurls&&markHasPicture.markpictureurls.length>0" :src="markHasPicture.markpictureurls[0].markpictureurl" style="width:100%;height:100%;"/>
                          <div class="tagClass" v-if="markHasPicture.markpictureurls&&markHasPicture.markpictureurls.length>1" color="primary">{{markHasPicture.markpictureurls.length}}</div>
                        </div>
                    </div>
                    <div class="colnameshowdivclass flexr" style="justify-content:flex-start;" v-for="item in moduleCList" :key="item.row">
                        <div class="flexr" :class="{inputClass1:(item.collist.length==1),inputClass2:(item.collist.length==2),inputClass3:(item.collist.length==3)}" style="justify-content:flex-start;" v-for="colitem in item.collist" :key="colitem.col">
                          <div class="colnamespanclass" style="width:50px;">{{colitem.name}}</div><div class="spanClass">{{colitem.inputvalue}}</div>
                        </div>
                    </div>
            </div>
        </div>
        <div v-show="isEdit" class="content"><!--修改的时候显示-->
            <div class="titlenamedivclass flexr" style="justify-content:flex-start;">
                <div class="flexr" style="width:60px;">名称</div><input type="text" v-model="markname" placeholder="*必填" class="inputClass"/>
            </div>
            <div class="coldivclass" v-show="templateObj.pointmodule=='1'">

                    <div class="colnamedivclass flexr" style="justify-content:flex-start;" v-for="item in moduleList" :key="item.row">
                        <div class="flexr" :class="{inputClass1:(item.collist.length==1),inputClass2:(item.collist.length==2),inputClass3:(item.collist.length==3)}" style="justify-content:flex-start;" v-for="colitem in item.collist" :key="colitem.col">
                          <div class="colnamespanclass" style="width:60px;">{{colitem.name}}</div><input type="text" class="inputClass" v-model="colitem.inputvalue"/>
                        </div>
                    </div>
            </div>
            <div class="coldivclass" v-show="templateObj.pointmodule=='2'||templateObj.pointmodule=='3'">
                    <div style="justify-content:flex-start;" class="flexr">
                        <div class="moduleZpB" v-show="templateObj.pointmodule=='2'">照片</div>
                        <div style="width:calc(100% - 55px)">
                            <div class="colnamedivclass flexr" style="justify-content:flex-start;" v-for="item in moduleBList" :key="item.row">
                                <div class="flexr" :class="{inputClass1:(item.collist.length==1),inputClass2:(item.collist.length==2),inputClass3:(item.collist.length==3)}" style="justify-content:flex-start;" v-for="colitem in item.collist" :key="colitem.col">
                                    <div class="colnamespanclass" style="width:60px;">{{colitem.name}}</div><input type="text" class="inputClass" v-model="colitem.inputvalue"/>
                                </div>
                            </div>
                        </div>
                        <div class="moduleZpB" v-show="templateObj.pointmodule=='3'">照片</div>
                    </div>
                    <div class="colnamedivclass flexr" style="justify-content:flex-start;" v-for="item in moduleCList" :key="item.row">
                        <div class="flexr" :class="{inputClass1:(item.collist.length==1),inputClass2:(item.collist.length==2),inputClass3:(item.collist.length==3)}" style="justify-content:flex-start;" v-for="colitem in item.collist" :key="colitem.col">
                          <div class="colnamespanclass" style="width:60px;">{{colitem.name}}</div><input type="text" class="inputClass" v-model="colitem.inputvalue"/>
                        </div>
                    </div>
            </div>
        </div>
        <div class="bottom">
            <!-- <Button v-show="!isEdit" type="primary" style="margin-right:10px;" size="small" @click="deleteMark">删除</Button>
            <Button v-show="!isEdit" type="primary" style="margin-right:10px;" size="small" @click="relocateMark">定位</Button>
            <Button v-show="!isEdit" type="primary" style="margin-right:10px;" size="small" @click="editMark">修改</Button>
            <Button v-show="isEdit" type="primary" style="margin-right:10px;" size="small" @click="cancelSaveMark">取消</Button>
            <Button v-show="isEdit" type="primary" style="margin-right:10px;" size="small" @click="saveMark">保存</Button> -->
            <HfxButton v-show="!isEdit" style="margin-right:10px;" @click="deleteMark" name="删除" />
            <HfxButton v-show="!isEdit" style="margin-right:10px;" @click="relocateMark" name="定位" />
            <HfxButton v-show="!isEdit" style="margin-right:10px;" @click="editMark" name="修改" />
            <HfxButton v-show="isEdit" style="margin-right:10px;" @click="cancelSaveMark" name="取消" />
            <HfxButton v-show="isEdit" style="margin-right:10px;" @click="saveMark" name="保存" />
        </div>
        <Modal title="图片" v-model="isshowZpDetailModal" class-name="picspanel" :draggable="true" width="600">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div v-if="markHasPicture.markpictureurls&&markHasPicture.markpictureurls.length>0" style="height:300px;">
            <el-scrollbar>
                <LayerPictureEdit v-for="pictureObj in markHasPicture.markpictureurls" :key="pictureObj.pictureid" :pictureObj="pictureObj" @on-click="clickPicture" @on-delete="deletePicture" :pictureUrlRecords="pictureUrlRecords"/>
            </el-scrollbar>
          </div>
          <div slot="footer" class="flexr">
            <HfxButton  @click="hideZpDetailModal" style="margin-right:10px;" name="取消" />
            <Upload :action="insertPictureUrl" accept=".png,.bmp,.jpg,.gif,.jpeg" :show-upload-list="false" :on-success="uploadPictureSuccess" :on-error="uploadPictureError">
              <HfxButton name="上传" />
            </Upload>
          </div>
        </Modal>
        <Modal title="重新定位" v-model="isshowRelocateModal" class-name="modal_index_up2" :draggable="true" width="300" :closable="false">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="flexr">
            <Button type="primary" size="large" @click="hideRelocateModal" style="margin-right:10px;">取消</Button>
            <Button type="primary" size="large" @click="relocateSave">保存</Button>
          </div>
          <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'
import mapUtil from '@/components/map/js/mapUtil'
import Constants from '@/constants/Constants'
import LayerPictureEdit from '@/components/module/dztc/LayerPictureEdit'
import LayerMapDetail from '@/components/module/dztc/LayerMapDetail'

export default {
  name: 'LayerMapDetail',
  components: {LayerPictureEdit,LayerMapDetail},
  props:['templateObj','markObj'],
  data () {
    return {
      isEdit:false,
      moduleList:[],
      templateobjAndFields:{},
      markvaluemap:[],
      
      markname:"",
      markHasPicture:{},

      isshowZpDetailModal:false,
      insertPictureUrl:"",
      pictureUrlRecords:[],

      isshowRelocateModal:false,
    }
  },
  computed: {...mapState({
  }),
    moduleBList:function(){
        var list = [];
        var length = 2;
        if(this.moduleList.length<length){
            length = this.moduleList.length;
        }
        for(var i =0;i<length;i++){
            list.push(this.moduleList[i]);
        }
        return list;
    },
    moduleCList:function(){
        var list = [];
        for(var i =2;i<this.moduleList.length;i++){
            list.push(this.moduleList[i]);
        }
        return list;
    }
  },
  methods:{
      init(){
        this.markname = this.markObj.markname;
        this.insertPictureUrl = Constants.url_prefix+"/tczy/addMarkPictureUrl";
        var param = {};
        param.markid = this.markObj.markid;
        var sessionId = this.common.getSessionId();
        this.insertPictureUrl = this.insertPictureUrl + "?param="+JSON.stringify(param)+"&sessionId="+sessionId;
      },
      closeInfoWindow(){
        this.map.map.infoWindow.hide();
      },
      getTemplateByIdCallBack(data){
        var markvalue = 
        this.moduleList = [];
        var map={};
        for(var i = 0;  i<data.fields.length;i++){
            var obj = data.fields[i];
            var row = obj.fieldrow;
            var col = obj.fieldcol;
            var name = obj.fieldname;
            var fieldid = obj.fieldid;
            var inputvalue = "";
            if(this.markvaluemap[fieldid]){
                inputvalue = this.markvaluemap[fieldid];
            }
            if(map[row]){
                map[row].collist.push({col:col,name:name,fieldid:fieldid,inputvalue:inputvalue});
            }else{
                var rowobj = {};
                rowobj.collist=[];
                rowobj.row = row;
                rowobj.collist.push({col:col,name:name,fieldid:fieldid,inputvalue:inputvalue});
                this.moduleList.push(rowobj);
                map[row]=rowobj;
            }
        }
        this.templateobjAndFields = data;
      },
      getMarkvaluemap(markvalue){
        this.markvaluemap = [];
        if(markvalue){
              var markvalueJSON = JSON.parse(markvalue);
                for(var i in markvalueJSON){
                  var fieldid = markvalueJSON[i].fieldid;
                  var name = markvalueJSON[i].name;
                  this.markvaluemap[fieldid]=name;
                }
            }
      },
      deleteMark(){
        var h = this.$createElement;
        this.$msgbox({
          title: '删除标记',
          message: h('p', null, [
            h('span', null, '是否删除此标记('+this.markObj.markname+')？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              var param = {};
              param.markid = this.markObj.markid;
              this.http.get("/tczy/deleteMark",param,this.deleteMarkCallBack,this,false);
            } else {
              done();
            }
          }
        }).catch();
      },
      deleteMarkCallBack(data){
        this.$Message.success("删除成功");
        this.map.map.infoWindow.hide();
        markUtil.clearMark("dztc"+this.markObj.groupmodule+this.templateObj.layerid+"Layer",this.markObj.markid,this);
      },
      editMark(){
        this.isEdit = true;
      },
      saveMark(){
        if(this.markname==""){
          this.$Message.error("请填写名称！");
          return;
        }
        var paramObj = {};
        paramObj.markid = this.markObj.markid;
        paramObj.markname = this.markname;
        paramObj.layerid = this.templateObj.layerid;
        var allfields = [];
        for(var i = 0;  i<this.moduleList.length;i++){
               var row = this.moduleList[i].row;
               for(var j = 0; j<this.moduleList[i].collist.length;j++){
                   var col = this.moduleList[i].collist[j].col;
                   var fieldid = this.moduleList[i].collist[j].fieldid;
                   var inputvalue = this.moduleList[i].collist[j].inputvalue;
                   var fieldobj = {};
                   fieldobj.fieldid = fieldid;
                   fieldobj.name = inputvalue;
                   allfields.push(fieldobj);
               }
        }
        paramObj.markvalue = allfields;
        this.http.post("/tczy/saveMark",paramObj,this.saveMarkCallBack,this,false);
      },
      saveMarkCallBack(data){
        this.$Message.success("保存成功");
        this.isEdit = false;
        for(var i=0;i<data.markpictureurls.length;i++){
          data.markpictureurls[i].markpictureurl = Constants.file_url + data.markpictureurls[i].markpictureurl;
          data.markpictureurls[i].fileurl=data.markpictureurls[i].markpictureurl
          
        }
        this.markHasPicture = data;
      },
      cancelSaveMark(){
        this.isEdit = false;
        this.init();
        this.getMarkvaluemap(this.markHasPicture.markvalue);
        this.getTemplateByIdCallBack(this.templateobjAndFields);
      },
      getMarkByIdCallBack(data){
        for(var i=0;i<data.markpictureurls.length;i++){
          data.markpictureurls[i].markpictureurl = Constants.file_url + data.markpictureurls[i].markpictureurl;
          data.markpictureurls[i].fileurl=data.markpictureurls[i].markpictureurl
        }
        this.markHasPicture = data;
      },
      showZpDetailModal(){
        this.isshowZpDetailModal = true;
      },
      hideZpDetailModal(){
        this.isshowZpDetailModal = false;
      },
      uploadPictureSuccess(response, file, fileList){
          if(response.code==1){
              this.$Message.success("上传成功");
              this.http.get("/tczy/getMarkById",{markid:this.markObj.markid},this.getMarkByIdCallBack,this,false);
          }else if(response.code==0){
              this.$Message.error(response.data);
          } 
      },
      uploadPictureError(error, file, fileList){
            this.$Message.error("上传失败");
      },
      clickPicture(id){
        this.pictureUrlRecords=[];
        var num = 0;
        for(var i = 0;i<this.markHasPicture.markpictureurls.length;i++){
          if(this.markHasPicture.markpictureurls[i].pictureid==id){
            num = i;
            break;
          }
        }
        for(var i = num;i<this.markHasPicture.markpictureurls.length;i++){
          this.pictureUrlRecords.push(this.markHasPicture.markpictureurls[i].fileurl);
        }
        for(var i = 0;i<num;i++){
          this.pictureUrlRecords.push(this.markHasPicture.markpictureurls[i].fileurl);
        }
    },
    deletePicture(id){
      var num = 0;
        for(var i = 0;i<this.markHasPicture.markpictureurls.length;i++){
          if(this.markHasPicture.markpictureurls[i].pictureid==id){
            num = i;
            break;
          }
        }
      this.markHasPicture.markpictureurls.splice(num,1);
    },
    relocateMark(){
      var marktype = this.markObj.marktype;
      if(marktype=="1"||marktype=="4"){//点文字重新打点
        markUtil.reLocate(this.markObj.loc.x,this.markObj.loc.y,this.relocateMarkHandler,null,this)
      }else if(marktype=="2"){//线
        // parent.$('.edit-toolbar-dztc').show();
        // parent.drawEdit("dztc"+markobj.groupmodule+layerid+"Layer",markobj.markid);
        // parent.map.infoWindow.hide();
        markUtil.drawEdit("dztc"+this.markObj.groupmodule+this.templateObj.layerid+"Layer",this.markObj.markid,this);
        this.map.map.infoWindow.hide();
        this.isshowRelocateModal = true;
      }else if(marktype=="3"){//面
        markUtil.drawEdit("dztc"+this.markObj.groupmodule+this.templateObj.layerid+"Layer",this.markObj.markid,this);
        this.map.map.infoWindow.hide();
        this.isshowRelocateModal = true;
      }
    },
    relocateMarkHandler(point,args){
        var paramObj = {};
        var lx = point.x;
        var ly = point.y;
        paramObj.lx = lx;
        paramObj.ly = ly;
        paramObj.markid = this.markObj.markid;
        paramObj.marktype = this.markObj.marktype;
        this.http.post("/tczy/updateMarkLoc",paramObj,this.updateMarkLocCallBack,this,false);
        var markObj = this.markHasPicture;
        markObj.loc.x=lx;
        markObj.loc.y=ly;
        var templateObj = this.templateObj;
        var attributes =  new Object();
        attributes.type = "dztc";
        var Profile = Vue.extend({
        template: '<LayerMapDetail :templateObj="templateObj" :markObj="markObj"/>',
        components: {LayerMapDetail},
        data: function () {
            return {
                templateObj:templateObj,
                markObj:markObj
            }
        },
        methods:{
        }
        })
        attributes.cp = new Profile();
        markUtil.addDztcLayerMark("dztc"+this.markObj.groupmodule+this.templateObj.layerid+"Layer",templateObj,markObj,attributes,this);
    },
    updateMarkLocCallBack(data){
       this.$Message.success("定位成功");
       this.isshowRelocateModal = false;
    },
    hideRelocateModal(){
        this.isshowRelocateModal = false;
        markUtil.hideLayer("hfxmap_graphics",this);//编辑图层隐藏
        this.map.editToolbar.deactivate();//编辑工具注销
        //恢复原样
        var graphic = this.map.markidmap["dztc"+this.markObj.groupmodule+this.templateObj.layerid+"Layer"][this.markObj.markid];
        if(graphic){
          if(graphic.geometry.type=="polyline"){
            var l = new esri.geometry.Polyline(this.map.map.spatialReference);
            l.addPath(this.map.editToolbarPointBefore);
            graphic.setGeometry(l);
          }else if(graphic.geometry.type=="polygon"){
            var l = new esri.geometry.Polygon(this.map.map.spatialReference);
            l.addRing(this.map.editToolbarPointBefore);
            graphic.setGeometry(l);
          }
        }
    },
    relocateSave(){
      this.map.editToolbar.deactivate();//编辑工具注销
      var obj = {};
      var editToolbarGraphic = this.map.editToolbarGraphic;
      var geometry = editToolbarGraphic.geometry;
      if(geometry.type=="polygon"){
        var point = mapUtil.getPolygonCenterPoint(geometry,this);
        obj.lx = point.x;
			  obj.ly = point.y;
        var polygon = mapUtil.getTruePolygon(geometry,this);
        obj.locinfo = {};
        obj.locinfo.points = polygon.rings[0];;
        obj.locinfo.type = "polygon";
      }else if(geometry.type=="polyline"){
        var point = mapUtil.getPolygonCenterPoint(geometry,this);
        obj.lx = point.x;
			  obj.ly = point.y;
        var polyline = mapUtil.getTruePolyline(geometry,this);
        obj.locinfo = {};
        obj.locinfo.points = polyline.paths[0];;
        obj.locinfo.type = "polyline";
      }
      obj.markid = this.markObj.markid;
      obj.marktype = this.markObj.marktype;
      this.http.post("/tczy/updateMarkLoc",obj,this.updateMarkLocCallBack,this,false);
    }
  },
  created(){
    
  },
  mounted(){
    this.init();
    this.getMarkvaluemap(this.markObj.markvalue);
    this.http.get("/tczy/getTemplateById",{templateid:this.templateObj.templateid},this.getTemplateByIdCallBack,this,false);
    this.http.get("/tczy/getMarkById",{markid:this.markObj.markid},this.getMarkByIdCallBack,this,false);
  }
}
</script>

<style scoped>
.LayerMapDetail{
  width:100%;
  height:100%;
}
.herder{
  position: relative;
  height: 50px;
  border-bottom: 1px solid rgb(91, 107, 114);
  padding: 14px 16px;
  font-size:14px;
}
.close{
  position:absolute;
  font-size: 31px;
  color: white;
  right: 9px;
  top: 10px;
  cursor: pointer;
}
.content{
  height: calc(100% - 85px);
  padding: 10px;
}
.bottom{
  height:35px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.titlenamedivclass{
  /* background: #222; */
  margin-bottom: 2px;
  position: relative;
  height: 40px;
  padding: 0px 10px;
}
.inputClass{
  width:calc(100% - 60px);
  outline: 0;
  height: 22px;
  border:1px solid #b6f6ff;
  background: transparent;
  color:white;
}
.inputClass1{
  width:100%;
}
.inputClass2{
  width:50%;
}
.inputClass3{
  width:33.3%;
}
.coldivclass{
  height: calc(100% - 40px);
  /* background: #222; */
  padding: 10px 0px 10px 10px;
  overflow: auto;
}
.colnamedivclass{
  margin-bottom: 2px;
  position: relative;
  height: 30px;
  padding-right: 10px;
}
.colnamespanclass{
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  color: #b6f6ff;
}
.moduleZpB{
    position: relative;
    width: 55px;
    height: 60px;
    color: #08385a;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #b6f6ff;
    margin-right:5px;
}
.colnameshowdivclass{
  margin-bottom: 2px;
  position: relative;
  min-height: 30px;
  padding: 2px 10px 2px 0px;
  border: 1px solid #b6f6ff;
}
.spanClass{
  width:calc(100% - 50px);
  /* background: #6f6f6f; */
  color:white;
  min-height: 20px;
  word-wrap:break-word;
  word-break:break-all;
}
.tagClass{
  position:absolute;
  left: 0px;
  bottom: 0px;
  height: 15px;
  width: 15px;
  color: white;
  background: #2d8cf0;
  border-radius: 3px;
  line-height: 15px;
  text-align: center;
}
.close{
  position:absolute;
  font-size: 31px;
  color: white;
  right: 9px;
  top: 10px;
  cursor: pointer;
}
</style>
<style>
.picspanel .ivu-modal .ivu-modal-content{
  top:200px;
  left: 750px;
  width: 400px !important;
}
</style>

