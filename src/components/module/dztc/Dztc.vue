<template>
    <div class="dztcpanel">
            <LeftContentNameBar :isshowshaixuan="false"/>
        <div class="seachbar">
          <InputSearchNew class="seachbar_InputSearch" v-model="name" @on-click="inputSearch" @on-clear="inputSearch" />
        </div>
        <div class="titlebar">
              <span>是否显示</span>
              <el-switch class="switchShow" active-color="#13ce66" inactive-color="#ff4949" v-model="showSwitch" @change="showDztcLayer">
              </el-switch>
              <span>热力</span>
              <el-switch class="switchShow" active-color="#13ce66" inactive-color="#ff4949" v-model="reliSwitch" @change="showReliLayer">
              </el-switch>
            <div class="refreshicon" @click="reflash" title="刷新"></div>
            <div class="addtcicon" @click="showAddLayerModal" title="新建图层"></div>
        </div>
        <div class="contentBar">
              <DztcItem :name="name" v-for="item in layerList" :key="item.groupid" :data="item" style="margin-bottom:5px;" @on-click="clickLayer" @on-reflush="reflash"  />
        </div>
        <div class="bottomBar">
          <span>分组数量:{{layerList.length}}(图层数量:{{layernum}})</span>
        </div>
        <Modal title="新建图层" v-model="isAddLayerModalShow" class-name="addnewtc" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
           <div style="width:100%;text-align:center;margin-bottom:15px;">图层名称:<input v-model="insertLayer.layername" class="inputClass"/></div>
           <div style="width:100%;margin-left:47px;margin-bottom:15px;">图层分组:
              <select v-model="insertLayer.groupid" class="inputClass" >
                  <option v-for="item in layerGroupList" :value="item.groupid" :key="item.groupid">{{ item.groupname }}</Option>
              </select>
              <Poptip ref="pop" placement="left" width="300" class="addLayerGroupPoptip" title="新增图层分组" >
                <!-- <Icon custom="iconfont icontianjia" style="margin-left:5px;color:white;font-size:20px;cursor: pointer;"/> -->
                <div class="addgroupicon"  title="新建图层分组"></div>
                <div slot="title">新增图层分组</div>
                <div slot="content" style="height:107px;">
                    <div style="width:100%;text-align:center;margin-bottom:15px;">分组名称:<input v-model="insertLayerGroup.groupname" class="inputClass" style="width:150px;"/></div>
                    <div style="width:100%;text-align:center;margin-bottom:15px;">
                      <RadioGroup v-model="insertLayerGroup.ispublic">
                          <Radio label="0">部门图层</Radio>
                          <Radio label="1">公共图层</Radio>
                      </RadioGroup>
                    </div>
                    <div style="width:100%;text-align:end;">
                        <!-- <Button type="primary" size="small" @click="saveLayerGroup">保存</Button> -->
                        <HfxButton   @click="saveLayerGroup" name="保存" />
                        <HfxButton   @click="cancelLayerGroup" name="取消" />
                    </div>
                </div>
              </Poptip>
           </div>
           <div style="width:100%;margin-left:50px;margin-bottom:15px;">
              <RadioGroup v-model="insertLayer.ispublic">
                  <Radio label="0">部门图层</Radio>
                  <Radio label="1">公共图层</Radio>
              </RadioGroup>
           </div>
           <div style="padding:0px 20px;">*部门图层只有部门成员才能看见使用，公共图层为公共资源，所有成员都能看见</div>
           <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideAddLayerModal">取消</Button>
            <Button type="primary" size="large" @click="saveLayer">确定</Button> -->
            <HfxButton   @click="hideAddLayerModal" name="取消" />
            <HfxButton  @click="saveLayer" />
           </div>
         </Modal>
         <Modal title="编辑模板" v-model="isshowtemplatemodal" class-name="mdymoban" :draggable="true" :footer-hide="true">
           <div slot="close"><div class="hfx-modal-close"/></div>
           <div class="moBanListPanel">
                <div>
                    <TemplateItem v-for="item in templateList" :key="item.templateid" :data="item" @on-save="addTemplateSuccess" @on-update="showUpdateTemplatePanel" />
                </div>
           </div>
           <div class="addMoBanIcon" @click="showAddTemplatePanel" title="新增模板">
            </div>
           <div class="addMoBanPanel" v-show="isshowaddtemplatepanel">
              <Divider orientation="center" class="line">新增模板({{selectLayer.layername}})</Divider>
              <TemplateItemAdd :layerobj="selectLayer" @on-save="addTemplateSuccess" @on-cancel="hideAddTemplatePanel" />
            </div>
            <div class="addMoBanPanel" v-if="isshowupdatetemplatepanelif" v-show="isshowupdatetemplatepanel">
              <Divider orientation="center" class="line">修改模板({{updatedata.templatename}})</Divider>
              <TemplateItemUpdate :data="updatedata" @on-cancel="hideUpdateTemplatePanel" @on-save="addTemplateSuccess" />
            </div>
         </Modal>
    </div>
</template>

<script>
import Vue from 'vue'
import markUtil from '@/components/map/js/markUtil'
import mapUtil from '@/components/map/js/mapUtil'
import { mapState } from 'vuex'

import InputSearchNew from '@/components/base/InputSearchNew'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'

import DztcItem from '@/components/module/dztc/DztcItem'
import TemplateItem from '@/components/module/dztc/TemplateItem'
import TemplateItemAdd from '@/components/module/dztc/TemplateItemAdd'
import TemplateItemUpdate from '@/components/module/dztc/TemplateItemUpdate'

export default {
  name: 'Dztc',
  props:['module'],
  components: {InputSearchNew,LeftContentNameBar,DztcItem,TemplateItem,TemplateItemAdd,TemplateItemUpdate},
  data () {
    return {
        name:"",
        layerList:[],
        showSwitch:true,
        reliSwitch:false,
        isAddLayerModalShow:false,
        insertLayer:{},
        layerGroupList:[],
        insertLayerGroup:{},

        selectLayer:{},

        isshowtemplatemodal:false,
        templateList:[],

        isshowaddtemplatepanel:false,
        updatedata:{},
        isshowupdatetemplatepanelif:false,
        isshowupdatetemplatepanel:false,
    }
  },
  computed: {...mapState({
  }),
    layernum:function(){
      var num = 0;
      for(var i = 0;i<this.layerList.length;i++){
        num = num+this.layerList[i].layers.length;
      }
      return num;
    }
  },
  methods:{
    
      getLayer(){
        var paramObj = {};
        paramObj.name = this.name;
        paramObj.module = this.module;
        this.http.get("/tczy/getLayers",paramObj,this.getLayersCallBack,this,false);
      },
      getLayersCallBack(data){
        this.layerList = data;
      },
      reflash(){
        this.name = "";
        this.getLayer();
      },
      inputSearch(value){
        this.getLayer();
      },
      showDztcLayer(){
        var map = this.map.map;
        if(this.showSwitch){//显示
            this.layerObj.dztc=true;
            for(var i in map.graphicsLayerIds){
                if(this.common.startsWith(map.graphicsLayerIds[i],"dztc"+this.module)){
                		markUtil.showLayer(map.graphicsLayerIds[i],this);
                }
            }
            if(this.reliSwitch){
                markUtil.showLayer("dztc"+this.module+"juhe",this);
            }else{
                markUtil.hideLayer("dztc"+this.module+"juhe",this);
            }
        }else{
          this.layerObj.dztc=false;
            for(var i in map.graphicsLayerIds){
                if(this.common.startsWith(map.graphicsLayerIds[i],"dztc"+this.module)){
                		markUtil.hideLayer(map.graphicsLayerIds[i],this);
                }
            }
            markUtil.hideLayer("dztc"+this.module+"juhe",this);
        }
      },
      showReliLayer(){
        var map = this.map.map;
        if(this.reliSwitch){//显示
            var array = [];
            for(var i in map.graphicsLayerIds){
                if(this.common.startsWith(map.graphicsLayerIds[i],"dztc"+this.module)){
                      markUtil.hideLayer(map.graphicsLayerIds[i],this);
                      var layer = map.getLayer(map.graphicsLayerIds[i]);
                      for(var j in layer.graphics){
                        var attributes = layer.graphics[j].attributes;
                        if(attributes.marktype=="1"){//点聚合
                          array.push(attributes);
                        }
                      }
                }
            }
            markUtil.createHeatmapLayer("dztc"+this.module+"juhe",array,this);
        }else{
            for(var i in map.graphicsLayerIds){
                if(this.common.startsWith(map.graphicsLayerIds[i],"dztc"+this.module)){
                	markUtil.showLayer(map.graphicsLayerIds[i],this);
                }
            }
            markUtil.hideLayer("dztc"+this.module+"juhe",this);
        }
      },
      showAddModal(){

      },
      showAddLayerModal(){
        this.isAddLayerModalShow = true;
      },
      hideAddLayerModal(){
        this.isAddLayerModalShow = false;
      },
      getLayerGroup(){
        // alert(this.module)
        var paramObj = {};
        paramObj.module = this.module;
        this.http.get("/tczy/getLayerGroups",paramObj,this.getLayerGroupsCallBack,this,false);
      },
      getLayerGroupsCallBack(data){
        this.layerGroupList = data
      },
      saveLayerGroup(){
        if(this.insertLayerGroup.groupname=="" || this.insertLayerGroup.groupname==null){
          this.$Message.error("分组名称不能为空");
          return;
        }
        if(this.insertLayerGroup.ispublic=="" || this.insertLayerGroup.ispublic==null){
          this.$Message.error("分组类型不能为空");
          return;
        }
        var paramObj = {};
        paramObj.module = this.module;
        paramObj.groupname=this.insertLayerGroup.groupname;
        paramObj.ispublic=this.insertLayerGroup.ispublic;
        this.http.get("/tczy/insertLayerGroup",paramObj,this.insertLayerGroupCallBack,this,false);
      },
      cancelLayerGroup(){
         this.$refs.pop.cancel();
      },
      insertLayerGroupCallBack(data){
        this.$Message.success("新增分组成功");
        this.insertLayerGroup = {};
        this.getLayerGroup();
         this.getLayer();
        this.cancelLayerGroup();
      },
      saveLayer(){
        if(this.insertLayer.layername=="" || this.insertLayer.layername==null){
          this.$Message.error("图层名称不能为空");
          return;
        }
        if(this.insertLayer.groupid=="" || this.insertLayer.groupid==null){
          this.$Message.error("图层分组不能为空");
          return;
        }
        if(this.insertLayer.ispublic=="" || this.insertLayer.ispublic==null){
          this.$Message.error("图层类型不能为空");
          return;
        }
        var paramObj = {};
        paramObj.layername = this.insertLayer.layername;
        paramObj.groupid=this.insertLayer.groupid;
        paramObj.ispublic=this.insertLayer.ispublic;
        this.http.get("/tczy/insertLayer",paramObj,this.insertLayerCallBack,this,false);
      },
      insertLayerCallBack(data){
        this.$Message.success("新增图层成功");
        this.isAddLayerModalShow = false;
        this.insertLayer={};
      },
      clickLayer(type,data){
        if(type=="templateEdit"){
           this.selectLayer = data;
           this.isshowtemplatemodal = true;
           //获取当前layer下的模板
           this.http.get("/tczy/getTemplates",{layerid:data.layerid},this.getTemplatesCallBack,this,false);
        }else if(type=="updateLayerGroup"){
           for(var i = 0;i<this.layerList.length;i++){
             if(this.layerList[i].groupid==data.groupid){
               this.layerList[i].groupname=data.groupname;
               break;
             }
           }
        }else if(type=="deleteLayerGroup"){
          var num = 0;
           for(var i = 0;i<this.layerList.length;i++){
             if(this.layerList[i].groupid==data.groupid){
               num = i;
               break;
             }
           }
          this.layerList.splice(num,1);
          this.layerGroupList.splice(num,1);
        }else if(type=="updateLayer"){
          for(var i = 0;i<this.layerList.length;i++){
             if(this.layerList[i].groupid==data.groupid){
               for(var j = 0;j<this.layerList[i].layers.length;j++){
                 if(this.layerList[i].layers[j].layerid==data.layerid){
                    this.layerList[i].layers[j].layername = data.layername;
                    break;
                 }
               }
             }
           }
        }else if(type=="deleteLayer"){
          for(var i = 0;i<this.layerList.length;i++){
             if(this.layerList[i].groupid==data.groupid){
               var num = 0;
               for(var j = 0;j<this.layerList[i].layers.length;j++){
                 if(this.layerList[i].layers[j].layerid==data.layerid){
                    num = j;
                 }
               }
               this.layerList[i].layers.splice(num,1);
             }
           }
        }
      },
      //-----------------------------------模板管理-----------------------------
      hideTemplateModal(){
        this.isshowtemplatemodal = false;
      },
      showAddTemplatePanel(){
        this.hideUpdateTemplatePanel();
        this.isshowaddtemplatepanel = true;
      },
      hideAddTemplatePanel(){
        this.isshowaddtemplatepanel = false;
      },
      showUpdateTemplatePanel(data){
        this.updatedata=data;
        this.isshowupdatetemplatepanelif=true;
        this.hideAddTemplatePanel();
        this.isshowupdatetemplatepanel=true;
      },
      hideUpdateTemplatePanel(){
        this.isshowupdatetemplatepanel =false;
      },

      addTemplateSuccess(){
          this.hideUpdateTemplatePanel();
          this.hideAddTemplatePanel();
        this.http.get("/tczy/getTemplates",{layerid:this.selectLayer.layerid},this.getTemplatesCallBack,this,false);
      },
      getTemplatesCallBack(data){
        for(var i = 0;i<data.length;i++){
          data[i].xh = i+1;
        }
        this.templateList = data;
      }
  },
  created(){
    
  },
  mounted(){
    this.getLayerGroup();
    this.getLayer();
  }
}
</script>

<style scoped>
.dztcpanel{
   height: 100%;
}
.seachbar{
  height: 36px;
  margin: 0px 0 17px 0;
}
.titlebar{
  margin: 10px 0;
  height: 22px;
  position: relative;
  color: #b6f6ff;
  line-height: 22px;
}
.seachbar_InputSearch{
  height: 36px;
}
.contentBar{
  height: calc(100% - 60px - 80px);
  overflow: auto;
}
.bottomBar{
  height: 20px;
  font-size: 12px;
  color:#b6f6ff;
  margin-top: 5px;
  position: relative;
}
.bottomBar span{
  position: absolute;
  left: 25%;
}
.inputClass{
    width: 200px;
    height: 30px;
    background-color: transparent;
    outline: 0;
    color: #b6f6ff;
    border: 1px solid #b6f6ff;
    margin-left:15px;
}
.addLayerGroupPoptip{
  margin: 0px 0 0 5px;
  position: relative;
}
.addLayerGroupPoptip >>> .ivu-poptip-inner{
  background:#08385a;
  box-shadow: 0px 1px 7px -1px #C0C0C0;
}
.addLayerGroupPoptip >>> .ivu-poptip-arrow:after{
  border-left-color:#08385a;
}
.refreshicon{
  position:absolute;
  right: 30px;
  top:0px;
  cursor: pointer;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/dztc/dztc_refresh.png)  no-repeat;
}
.addtcicon{
  width: 19px;
  height: 20px;
  position:absolute;
  right: 0;
  top:0;
  cursor: pointer;
  background: 
    url(./../../../assets/dztc/dztc_addtc.png)  no-repeat;
}
.el-switch {
  top: -1px;
}
select {
  height:25px;
  width:111px;
  color: white;
  border: 1px solid white;
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
  border: 1px solid white;
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
.addgroupicon{
  width: 19px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: -14px;
  background: 
    url(./../../../assets/dztc/dztc_addtc.png)  no-repeat;
}
</style>
<style>
.addnewtc .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 82px;
  left:387px;
  width: 400px !important;
}
.mdymoban .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 82px;
  left:387px;
  width: 400px !important;
}
.addMoBanIcon{
  width: 19px;
  height: 20px;
  cursor: pointer;
  float: right;
  margin: 5px 5px 10px 0;
  background: 
  url(./../../../assets/dztc/dztc_addtc.png)  no-repeat;
}
.line{
  color: #b6f6ff !important;
  font-size:14px !important;
}
.moBanListPanel{
  max-height: 200px;
  overflow: auto;
}
</style>
