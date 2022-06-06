<template>
    <div class="TemplateItemUpdate">
        <div class="flexr" style="justify-content:flex-start;">
            <span>名称：</span><input class="inputClass" v-model="templatename"/>
        </div>
        <div  class="flexr" style="justify-content:space-around;margin-top:10px;" >
            <div class="typeclass flexr" :class="{typeclassBackground:(type=='1')}" @click="clickType('1')">
                <div  class="huadianClass"></div>
                <span>点</span>
            </div>
            <div class="typeclass flexr" :class="{typeclassBackground:(type=='2')}" @click="clickType('2')">
                <div  class="huaxianClass"></div>
                <span>线</span>
            </div>
            <div class="typeclass flexr" :class="{typeclassBackground:(type=='3')}" @click="clickType('3')">
                <div  class="huamianClass"></div>
                <span>面</span>
            </div>
            <div class="typeclass flexr" :class="{typeclassBackground:(type=='4')}" @click="clickType('4')">
                <div  class="huawenziClass"></div>
                <!-- 文字是2个子,所以left少4px -->
                <span style="left:8px;">文字</span>
            </div>
        </div>

        <div class="tabpanel flexr" style="margin-top:10px;">
            <div class="styleTyleClass flexr" :class="{styleTyleClassBackground:(styletype=='1')}" @click="clickStyleType('1')">
                <span>编辑样式</span>
            </div>
            <div class="styleTyleClass flexr" :class="{styleTyleClassBackground:(styletype=='2')}" style="margin-left:15px;" @click="clickStyleType('2')">
                <span>编辑属性</span>
            </div>
        </div>
        <div v-show="styletype=='1'&&type=='1'" class="contentpanel">
            <div class="flexr" style="justify-content:flex-start;" >
                <div class="styleTyleClass flexr" :class="{pointtypeclass:(pointtype=='1')}" @click="clickPointType('1')">纯色标记</div>
                <div class="styleTyleClass flexr" style="margin-left:10px;" :class="{pointtypeclass:(pointtype=='2')}" @click="clickPointType('2')">图片标记</div>
            </div>
            <div v-show="pointtype=='1'" style="margin-top:10px;justify-content:flex-start;" class="flexr">
                <ColorPicker v-model="pointcolor" :alpha="true"/>
                <div style="margin-left:20px;" class="flexr">预览：<div style="margin-left:10px;width:15px;height:15px;border-radius:50%;" :style="{background:pointcolor}"></div></div>        
            </div>
            <div v-show="pointtype=='2'" style="margin-top:10px;margin-left:5px;">
                <div class="flexr" style="justify-content:flex-start;">
                    <span>图标：</span>
                    <Poptip placement="right" width="300" class="selectMarkIconPop" v-model="showPoptip">
                        <div style="margin-right:10px;margin-left:10px;border:1px solid white;padding:0px 5px;border-radius:5px;cursor:pointer;">选择</div>
                        <div slot="title">请选择图标</div>
                        <div slot="content" style="height:107px;">
                            <el-scrollbar>
                                <div v-for="item in iconList" :key="item.iconid" style="height:30px;width:30px;margin-top:10px;margin-right:10px;float:left;position:relative;" class="flexr iconitemclass" >
                                    <img :src="item.iconurl" style="max-height:30px;max-width:30px;" @click="clickMarkIcon(item)"/>
                                    <Icon @click="deleteMarkIcon(item)" v-show="item.icontype=='2'" custom="iconfont iconguanbi" class="Icon" style="color:white;font-size:12px;cursor: pointer;background:black;position:absolute;right:-5px;top:-5px;"/>
                                </div>
                            </el-scrollbar>
                        </div>
                    </Poptip>
                    <Upload :action="insertIconUrl" accept=".png,.bmp,.jpg,.gif,.jpeg" :show-upload-list="false" :on-success="uploadPictureSuccess" :on-error="uploadPictureError"><Button size="small" type="primary" style="width:80px;">上传新图标</Button></Upload>
                </div>
                <div class="flexr" style="justify-content:flex-start;margin-top:10px;">
                    <span>预览：</span>
                    <img :src="selectMarkIcon.iconurl" style="max-height:30px;max-width:30px;margin-left:10px;"/>
                </div>       
            </div>
        </div>
        <div v-show="styletype=='1'&&type=='2'" class="contentpanel">
            <div>
                <ColorPicker v-model="linecolor" :alpha="true"/>
                <div style="margin-top:10px;justify-content:flex-start;" class="flexr">宽度：<div style="margin-left:10px;width:150px;"><slider :min=2 :max=20 v-model = "linewidth"></slider></div><div style="margin-left:10px;">{{linewidth}}</div></div>        
                <div style="margin-top:10px;justify-content:flex-start;" class="flexr">预览：<div style="margin-left:10px;width:150px;" :style="{borderTop: linewidth+'px solid '+linecolor}"></div></div>        
            </div>
        </div>
        <div v-show="styletype=='1'&&type=='3'" class="contentpanel">
             <div class="flexr" style="justify-content:flex-start;" >
                <ColorPicker v-model="miancolor" :alpha="true"/>
                <div style="margin-left:20px;" class="flexr">预览：<div style="margin-left:10px;width:15px;height:15px;" :style="{background:miancolor}"></div></div>        
            </div>
        </div>
        <div v-show="styletype=='1'&&type=='4'" class="contentpanel">
             <div>
                <ColorPicker v-model="textcolor" :alpha="true"/>
                <div style="margin-top:10px;justify-content:flex-start;" class="flexr">大小：<div style="margin-left:10px;width:150px;"><slider :min=12 :max=50 v-model = "textsize"></slider></div><div style="margin-left:10px;">{{textsize}}px</div></div>        
                <div style="margin-top:10px;justify-content:flex-start;" class="flexr">预览：<div style="margin-left:10px;width:150px;" :style="{fontSize: textsize+'px',color:textcolor}">T</div></div>        
            </div>
        </div>
        <div v-show="styletype=='2'" class="contentpanel">
            <div class="flexr" style="justify-content:flex-start;margin-bottom:5px;" >
                <div class="biaojipanel flexr" :class="{pointtypeclass:(module=='1')}" @click="clickModule('1')">A模板</div>
                <div class="biaojipanel flexr" :class="{pointtypeclass:(module=='2')}" style="margin-left:10px;" @click="clickModule('2')">B模板</div>
                <div class="biaojipanel flexr" :class="{pointtypeclass:(module=='3')}" style="margin-left:10px;" @click="clickModule('3')">C模板</div>
            </div>
            <div v-show="module=='1'">
                <div style="margin-bottom:5px;" v-for="item in moduleList" :key="item.row">
                    <span style="position:relative;" v-for="colitem in item.collist" :key="colitem.col">
                        <input type="text" v-model="colitem.name" class="inputModule" :class="{inputModule1:(item.collist.length==1),inputModule2:(item.collist.length==2),inputModule3:(item.collist.length==3)}"/>
                        <Icon custom="iconfont iconshanchu" class="moudleDeleteIcon" @click="deleteModuleCol(colitem,item)"/>
                    </span>
                    <span class="spanButton" v-show="item.collist.length<3" @click="addModuleCol(item)">+列</span>
                </div>
                <div>
                    <span class="spanButton" @click="addModuleRow">+行</span> 
                </div>
            </div>
            <div v-show="module=='2'||module=='3'">
                <div style="margin-bottom:5px;justify-content:flex-start;" class="flexr">
                    <div v-show="module=='2'" class="moduleZpB">照片</div>
                    <div style="width:calc(100% - 50px)"> 
                        <div style="margin-bottom:5px;" v-for="item in moduleBList" :key="item.row">
                            <span style="position:relative;" v-for="colitem in item.collist" :key="colitem.col">
                                <input type="text" v-model="colitem.name" class="inputModule" :class="{inputModuleB1:(item.collist.length==1),inputModuleB2:(item.collist.length==2),inputModuleB3:(item.collist.length==3)}"/>
                                <Icon custom="iconfont iconshanchu" class="moudleDeleteIcon" @click="deleteModuleCol(colitem,item)"/>
                            </span>
                            <span class="spanButton" v-show="item.collist.length<3" @click="addModuleCol(item)">+列</span>
                        </div>
                    </div>
                    <div v-show="module=='3'" class="moduleZpB">照片</div>
                </div>
                <div style="margin-bottom:5px;" v-for="item in moduleCList" :key="item.row">
                    <span style="position:relative;" v-for="colitem in item.collist" :key="colitem.col">
                        <input type="text" v-model="colitem.name" class="inputModule" :class="{inputModule1:(item.collist.length==1),inputModule2:(item.collist.length==2),inputModule3:(item.collist.length==3)}"/>
                        <Icon custom="iconfont iconshanchu" class="moudleDeleteIcon" @click="deleteModuleCol(colitem,item)"/>
                    </span>
                    <span class="spanButton" v-show="item.collist.length<3" @click="addModuleCol(item)">+列</span>
                </div>
                <div>
                    <span class="spanButton" @click="addModuleRow">+行</span> 
                </div>
            </div>
        </div>
        <div style="margin-top:10px;">
            <RadioGroup v-model="ispublic">
                <Radio label="0">私人模板</Radio>
                <Radio label="1">公共模板</Radio>
            </RadioGroup>
        </div>
        <div class="flexr" style="justify-content:space-evenly;margin-top:10px;">
            <!-- <Button type="primary" size="large" @click="cancelupdateTemplate">取消</Button>
            <Button type="primary" size="large" @click="updateTemplate">保存</Button> -->
            <HfxButton @click="cancelupdateTemplate" name="取消" />
            <HfxButton  @click="updateTemplate" name="保存" />
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Constants from '@/constants/Constants'
import Slider from '@/components/base/Slider'

export default {
  name: 'TemplateItemAdd',
  components: {Slider},
  props:['data'],
  data () {
    return {
       showPoptip:true,
       templatename:"",
       selectTemplateid:"",
       iconList:[],
       type:"1",
       styletype:"1",//1编辑样式   2编辑属性
       module:"1",//1是A模板2是B模板3是C模板
       ispublic:"0",//是否公共模板

       pointtype:"1",
       pointcolor:"rgba(255,0,0,1)",
       insertIconUrl:"",
       selectMarkIcon:{},

       linecolor:"rgba(255,0,0,1)",
       linewidth:1,

       miancolor:"rgba(255,0,0,1)",

       textcolor:"rgba(255,0,0,1)",
       textsize:12,

       moduleList:[],
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
      getMarkIconsCallBack(data){
          for(var i = 0;i<data.length;i++){
              data[i].iconurl = Constants.file_url+data[i].iconurl;
          }
          this.iconList = data;
      },
      clickType(type){
          this.type=type;
      },
      clickStyleType(type){
          this.styletype = type;
      },
      clickModule(type){
          this.module = type;
      },
      clickPointType(pointtype){
          this.pointtype = pointtype;
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
      setUploadUrl(){
          this.insertIconUrl = Constants.url_prefix+"/tczy/addMarkIcons";
          var param = {};
          var sessionId = this.common.getSessionId();
          this.insertIconUrl = this.insertIconUrl + "?param="+JSON.stringify(param)+"&sessionId="+sessionId;
      },
      clickMarkIcon(item){
          this.showPoptip=false;
          this.selectMarkIcon = item;
      },
      deleteMarkIcon(item){
         var h = this.$createElement;
        this.$msgbox({
          title: '删除图标',
          message: h('p', null, [
            h('span', null, '是否删除此图标？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              var param = {};
              param.iconid = item.iconid;
              this.http.get("/tczy/deleteMarkIcons",param,this.deleteMarkIconsCallBack,this,false);
            } else {
              done();
            }
          }
        }).catch();
      },
      deleteMarkIconsCallBack(data){
          this.$Message.success("删除成功");
          this.http.get("/tczy/getMarkIcons",null,this.getMarkIconsCallBack,this,false);
      },
      addModuleRow(){
          var colobj = {};
          colobj.col = 1;
          colobj.name="";
          var rowobj = {};
          rowobj.row = this.moduleList.length+1;
          rowobj.collist = [];
          rowobj.collist.push(colobj);
          this.moduleList.push(rowobj);
      },
      addModuleCol(rowitem){
          var collist = rowitem.collist;
          var colobj = {};
          colobj.col = collist.length+1;
          colobj.name="";
          collist.push(colobj);
      },
      deleteModuleCol(colitem,rowitem){
          var dcol = colitem.col;
          var drow = rowitem.row;
          var collist = rowitem.collist;
          if(collist.length==1){//不仅要删除列，还要删除行
            this.moduleList.splice(drow-1,1);
          }else{//仅仅删除列
            collist.splice(dcol-1,1);
          }
          //重新设置row和col
          for(var i = 0;  i<this.moduleList.length;i++){
              this.moduleList[i].row = i+1;
               for(var j = 0; j<this.moduleList[i].collist.length;j++){
                   this.moduleList[i].collist[j].col = j+1;
               }
          }
      },
      insertTemplate(){
        if(this.templatename=="" || this.templatename==null){
            this.$Message.error("模板名称不能为空");
            return;
        }
        
        var paramObj = {};
        paramObj.templatename = this.templatename;
        paramObj.layerid = this.data.layerid;
        paramObj.pointtype = this.pointtype;
        if(this.pointtype=="2"){//图片需要有url
            if(!this.selectMarkIcon.iconurl){
                this.$Message.error("请选择点的图片标记或者使用纯色图标");
                return;
            }
            paramObj.pointurl = this.selectMarkIcon.iconurl;
        }else{//纯色标记
            paramObj.pointcolor = this.pointcolor;
        }
        paramObj.pointmodule = this.module;

        paramObj.linecolor = this.linecolor;
        paramObj.linewidth = this.linewidth;
        paramObj.linemodule = this.module;

        paramObj.polygoncolor = this.miancolor;
        paramObj.polygonmodule = this.module;

        paramObj.textcolor = this.textcolor;
        paramObj.textsize = this.textsize;
        paramObj.textmodule = this.module;

        paramObj.ispublic = this.ispublic;

        var allfields = [];
        for(var i = 0;  i<this.moduleList.length;i++){
               var row = this.moduleList[i].row;
               for(var j = 0; j<this.moduleList[i].collist.length;j++){
                   var col = this.moduleList[i].collist[j].col;
                   var fieldname = this.moduleList[i].collist[j].name;
                   if(fieldname==""||fieldname==null){
                       this.$Message.error("属性中列名不能为空");
                       return;
                   }
                   var fieldobj = {};
                   fieldobj.fieldname = fieldname;
                   fieldobj.fieldrow = row;
                   fieldobj.fieldcol = col;
                   allfields.push(fieldobj);
               }
        }
        if(allfields.length==0){
            this.$Message.error("请编辑属性");
            return;
        }
        paramObj.fields = allfields;
        this.http.post("/tczy/saveTemplate",paramObj,this.saveTemplateCallBack,this,false);
      },
      updateTemplate(){
        if(this.templatename=="" || this.templatename==null){
            this.$Message.error("模板名称不能为空");
            return;
        }
        
        var paramObj = {};
        paramObj.templateid = this.data.templateid;
        paramObj.templatename = this.templatename;
        paramObj.layerid = this.data.layerid;
        paramObj.pointtype = this.pointtype;
        if(this.pointtype=="2"){//图片需要有url
            if(!this.selectMarkIcon.iconurl){
                this.$Message.error("请选择点的图片标记或者使用纯色图标");
                return;
            }
            paramObj.pointurl = this.selectMarkIcon.iconurl;
        }else{//纯色标记
            paramObj.pointcolor = this.pointcolor;
        }
        paramObj.pointmodule = this.module;

        paramObj.linecolor = this.linecolor;
        paramObj.linewidth = this.linewidth;
        paramObj.linemodule = this.module;

        paramObj.polygoncolor = this.miancolor;
        paramObj.polygonmodule = this.module;

        paramObj.textcolor = this.textcolor;
        paramObj.textsize = this.textsize;
        paramObj.textmodule = this.module;

        paramObj.ispublic = this.ispublic;

        var allfields = [];
        for(var i = 0;  i<this.moduleList.length;i++){
               var row = this.moduleList[i].row;
               for(var j = 0; j<this.moduleList[i].collist.length;j++){
                   var col = this.moduleList[i].collist[j].col;
                   var fieldname = this.moduleList[i].collist[j].name;
                   if(fieldname==""||fieldname==null){
                       this.$Message.error("属性中列名不能为空");
                       return;
                   }
                   var fieldobj = {};
                   fieldobj.fieldname = fieldname;
                   fieldobj.fieldrow = row;
                   fieldobj.fieldcol = col;
                   fieldobj.fieldid = this.moduleList[i].collist[j].fieldid;
                   allfields.push(fieldobj);
               }
        }
        if(allfields.length==0){
            this.$Message.error("请编辑属性");
            return;
        }
        paramObj.fields = allfields;
        this.http.post("/tczy/saveTemplate",paramObj,this.saveTemplateCallBack,this,false);
      },
      cancelupdateTemplate(){
          this.$emit("on-cancel");
      },
      saveTemplateCallBack(data){
          this.$Message.success("保存成功");
          this.$emit('on-save');	
      },
      changeTemplate(templateid){
          this.http.get("/tczy/getTemplateById",{templateid:templateid},this.getTemplateByIdCallBack,this,false);
      },
      getTemplateByIdCallBack(data){
          this.templatename = data.templatename;
          this.pointtype = data.pointtype;
          if(this.pointtype=="2"){//图片需要有url
             this.selectMarkIcon.iconurl = data.pointurl;
          }else{//纯色标记
             this.pointcolor = data.pointcolor;
          }
          this.module = data.pointmodule;
          this.linecolor = data.linecolor;
          this.linewidth = data.linewidth ;

          this.miancolor = data.polygoncolor;

          this.textcolor = data.textcolor;
          this.textsize = data.textsize;

          this.ispublic = data.ispublic;
          this.moduleList = [];
          var map={};
          for(var i = 0;  i<data.fields.length;i++){
              var obj = data.fields[i];
              var row = obj.fieldrow;
              var col = obj.fieldcol;
              var name = obj.fieldname;
              if(map[row]){
                 map[row].collist.push({col:col,name:name,fieldid:obj.fieldid});
              }else{
                  var rowobj = {};
                  rowobj.collist=[];
                  rowobj.row = row;
                  rowobj.collist.push({col:col,name:name,fieldid:obj.fieldid});
                  this.moduleList.push(rowobj);
                  map[row]=rowobj;
              }
          }
      }
  },
  created(){
    
  },
  watch:{
      data:{
          handler(newdata,olddata){
              this.getTemplateByIdCallBack(newdata);
          },
          immediate:true
      }
  },
  mounted(){
      this.setUploadUrl();
      this.http.get("/tczy/getMarkIcons",null,this.getMarkIconsCallBack,this,false);
      this.getTemplateByIdCallBack(this.data);
  }
}
</script>

<style scoped>
.TemplateItemUpdate{
   background-color:rgba(88,245,255,0.1);
    padding:15px;
}
.inputClass{
  margin-left:10px;
  height: 25px;
  width: 86%;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.typeclassBackground{
    background-color: #08385a;
}
.styleTyleClass{
    width: 60px;
    height: 20px;
    color: white;
    cursor: pointer;
    user-select: none;
}
.styleTyleClassBackground{
    color: #b6f6ff;
    border-bottom:2px solid #b6f6ff;
}
.pointtypeclass{
    background-color: #b6f6ff;
    color: #08385a;
}
.selectMarkIconPop >>> .ivu-poptip-inner{
  background:#171616;
  box-shadow: 0px 1px 7px -1px #C0C0C0;
}
.selectMarkIconPop >>> .ivu-poptip-arrow:after{
  border-right-color:#171616;
}
.iconitemclass .Icon{
    display: none;
}
.iconitemclass:hover .Icon{
    display: inline;
}
.inputModule{
     outline: 0;
    background-color: transparent;
    height: 20px;
    border: 1px solid #b6f6ff;
    padding-left: 2px;
    color: #b6f6ff;
    margin-right:4px;
}
.inputModule1{
    width:91.1%;
}
.inputModule2{
    width:44.4%;
}
.inputModule3{
    width:29.1%;
}
.inputModuleB1{
    width:88%;
}
.inputModuleB2{
    width:42.4%;
}
.inputModuleB3{
    width:27.5%;
}
.spanButton{
    cursor: pointer;
}
.moudleDeleteIcon{
    position:absolute;
    right: 12px;
    top:0px;
    color: #b6f6ff;
    font-size: 12px;
    cursor: pointer;
}
.moduleZpB{
    width: 45px;
    height: 50px;
    color: #b6f6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #08385a;
    margin-right:5px;
}
.typeclass{
    width: 40px;
    height: 40px;
    cursor: pointer;
    user-select: none;
    position: relative;
}
.typeclass span{
    position: absolute;
    top: 18px;
    left: 13px;
}
.huadianClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    position: absolute;
    top: 5px;
    left: 12px;
    background: 
    url(./../../../assets/dztc/dztc_dian.png)  no-repeat;
}
.huaxianClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    position: absolute;
    top: 5px;
    left: 12px;
    background: 
    url(./../../../assets/dztc/dztc_xian.png)  no-repeat;
}
.huamianClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    position: absolute;
    top: 5px;
    left: 12px;
    background: 
    url(./../../../assets/dztc/dztc_mian.png)  no-repeat;
}
.huawenziClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    position: absolute;
    top: 5px;
    left: 12px;
    background: 
    url(./../../../assets/dztc/dztc_wenzi.png)  no-repeat;
}
.tabpanel{
border-bottom: 1px solid #e8eaec;
justify-content: start;
margin-top: 5px;
}
.contentpanel{
    margin-top: 10px;
    padding: 10px;
    background-color: rgba(88,245,255, 0.3);
}
.biaojipanel{
 width: 60px;
 height: 25px;
 cursor: pointer;
}
</style>

