<template>
    <div class="LayerMapDetailEdit">
        <div class="herder">
          <span>请输入当前标记的属性</span>
          <Icon type="ios-close" class="close" @click="closeInfoWindow"/>
        </div>
        <div class="content">
            <div class="titlenamedivclass flexr" style="justify-content:flex-start;">
                <div class="flexr" style="width:60px;">名称</div><input type="text" v-model="markname" placeholder="*必填" class="inputClass"/>
            </div>
            <div class="coldivclass" v-show="templateobj.pointmodule=='1'">
                    <div class="colnamedivclass flexr" style="justify-content:flex-start;" v-for="item in moduleList" :key="item.row">
                        <div class="flexr" :class="{inputClass1:(item.collist.length==1),inputClass2:(item.collist.length==2),inputClass3:(item.collist.length==3)}" style="justify-content:flex-start;" v-for="colitem in item.collist" :key="colitem.col">
                          <div class="colnamespanclass" style="width:60px;">{{colitem.name}}</div><input type="text" class="inputClass" v-model="colitem.inputvalue"/>
                        </div>
                    </div>
            </div>
            <div class="coldivclass" v-show="templateobj.pointmodule=='2'||templateobj.pointmodule=='3'">
                    <div style="justify-content:flex-start;" class="flexr">
                        <div class="moduleZpB" v-show="templateobj.pointmodule=='2'">照片</div>
                        <div style="width:calc(100% - 55px)">
                            <div class="colnamedivclass flexr" style="justify-content:flex-start;" v-for="item in moduleBList" :key="item.row">
                                <div class="flexr" :class="{inputClass1:(item.collist.length==1),inputClass2:(item.collist.length==2),inputClass3:(item.collist.length==3)}" style="justify-content:flex-start;" v-for="colitem in item.collist" :key="colitem.col">
                                    <div class="colnamespanclass" style="width:60px;">{{colitem.name}}</div><input type="text" class="inputClass" v-model="colitem.inputvalue"/>
                                </div>
                            </div>
                        </div>
                        <div class="moduleZpB" v-show="templateobj.pointmodule=='3'">照片</div>
                    </div>
                    <div class="colnamedivclass flexr" style="justify-content:flex-start;" v-for="item in moduleCList" :key="item.row">
                        <div class="flexr" :class="{inputClass1:(item.collist.length==1),inputClass2:(item.collist.length==2),inputClass3:(item.collist.length==3)}" style="justify-content:flex-start;" v-for="colitem in item.collist" :key="colitem.col">
                          <div class="colnamespanclass" style="width:60px;">{{colitem.name}}</div><input type="text" class="inputClass" v-model="colitem.inputvalue"/>
                        </div>
                    </div>
            </div>
        </div>
        <div class="bottom">
            <!-- <Button type="primary" size="small" style="margin-right:10px;" @click="closeInfoWindow">取消</Button>
            <Button type="primary" size="small" @click="saveMark">保存</Button> -->
            <HfxButton  style="margin-right:10px;" @click="closeInfoWindow" name="取消" />
            <HfxButton  @click="saveMark" name="保存" />
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'
import mapUtil from '@/components/map/js/mapUtil'
import LayerMapDetail from '@/components/module/dztc/LayerMapDetail'

export default {
  name: 'LayerMapDetailEdit',
  components: {LayerMapDetail },
  props:['templateobj','marktype'],
  data () {
    return {
       moduleList:[],
       markname:"",
       templateobjAndFields:{}
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
    closeInfoWindow(){
      this.map.map.infoWindow.hide();
      //去掉画图的
      markUtil.clearDrawLayer(this);
    },
    getTemplateByIdCallBack(data){
        this.moduleList = [];
        var map={};
        for(var i = 0;  i<data.fields.length;i++){
            var obj = data.fields[i];
            var row = obj.fieldrow;
            var col = obj.fieldcol;
            var name = obj.fieldname;
            if(map[row]){
                map[row].collist.push({col:col,name:name,fieldid:obj.fieldid,inputvalue:""});
            }else{
                var rowobj = {};
                rowobj.collist=[];
                rowobj.row = row;
                rowobj.collist.push({col:col,name:name,fieldid:obj.fieldid,inputvalue:""});
                this.moduleList.push(rowobj);
                map[row]=rowobj;
            }
        }
        this.templateobjAndFields = data;
    },
    saveMark(){
        if(this.markname==""){
          this.$Message.error("请填写名称！");
          return;
        }
        var paramObj = {};
        paramObj.markname = this.markname;
        paramObj.layerid = this.templateobj.layerid;
        paramObj.marktype = this.marktype;
        this.getLoc(paramObj);//设置坐标信息
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
        this.$Message.success("保存成功！");
        this.closeInfoWindow();
        var attributes =  new Object();
        attributes.type = "dztc";
        var templateobj = this.templateobj;
        var Profile = Vue.extend({
          template: '<LayerMapDetail :templateObj="templateObj" :markObj="markObj"/>',
          components: {LayerMapDetail},
          data: function () {
            return {
              templateObj:templateobj,
              markObj:data
            }
          },
          methods:{
          }
        })
        attributes.cp = new Profile();
        markUtil.addDztcLayerMark("dztc"+data.groupmodule+this.templateobj.layerid+"Layer",this.templateobj,data,attributes,this);
    },
    getLoc(obj){
      var layer = this.map.map.getLayer("tempLayer");
      var geometry = layer.graphics[0].geometry;
      if(geometry.type=="point"){
        var point = mapUtil.getTruePoint(geometry,this);
        obj.lx = point.x;
        obj.ly = point.y;
      }else if(geometry.type=="polygon"){
        var point = mapUtil.getPolygonCenterPoint(geometry,this);
        obj.lx = point.x;
			  obj.ly = point.y;
        var polygon = mapUtil.getTruePolygon(geometry,this);
        obj.locinfo = {};
        obj.locinfo.points = polygon.rings[0];
        obj.locinfo.type = "polygon";
      }else if(geometry.type=="polyline"){
        var point = mapUtil.getPolygonCenterPoint(geometry,this);
        obj.lx = point.x;
			  obj.ly = point.y;
        var polyline = mapUtil.getTruePolyline(geometry,this);
        obj.locinfo = {};
        obj.locinfo.points = polyline.paths[0];
        obj.locinfo.type = "polyline";
      }
	  }
  },
  created(){
    
  },
  mounted(){
    this.http.get("/tczy/getTemplateById",{templateid:this.templateobj.templateid},this.getTemplateByIdCallBack,this,false);
  }
}
</script>

<style scoped>
.LayerMapDetailEdit{
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
/* 修改placehoder的字体大小和颜色 */
.titlenamedivclass >>> input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #b6f6ff;
}
</style>

