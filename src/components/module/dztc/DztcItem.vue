<template>
    <div class="DztcItem">
       <div class="layerGroupItemClass" @mouseover="showEditIcon" @mouseout="hideEditIcon">
           <div  :class="markClass"   @click="getLayerGroupMarks" title="在地图上显示或隐藏"></div>
           <div class="layerGroupItemClass_content" @click="showLayerItems">
           <div class="nameandarrow">
            <span>{{data.groupname}}({{layerList.length}})</span>
            <div :class="[isShowLayerItems?'shangjiantouClass':'xiajiantouClass']"></div>
           </div>
            <div class="flrxr">
                <div v-show="isEditIconShow" class="xiugaiClass"   @click.stop="showEditLayerGroupModal" title="修改图层名称"></div>
                <div v-show="isEditIconShow" class="shanchuClass"   @click.stop="deleteLayerGroup" title="删除图层"></div>
            </div>
           </div>
       </div>
       <div class="layerItemsClass" v-show="isShowLayerItems">
           <LayerItem :name="name" :module="data.module" :isActive="isActive"  :class="{firstLayerItemClass:(i==0)}"  v-for="(item,i) in layerList" :key="item.layerid" :data="item"  @on-click="clickLayerItem"  @on-delete="deleteLayerMarks"   />
       </div>
       <Modal title="修改图层组名称" v-model="isShowEditLayerGroupModal" class-name="mdyLayerGroup" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <input v-model="editgroupname" class="inputClass"/>
          <div slot="footer">
            <!-- <Button type="primary" size="large" @click="hideEditLayerGroupModal" style="margin-right:10px;">取消</Button>
            <Button type="primary" size="large" @click="updateLayerGroup">保存</Button> -->
            <HfxButton  @click="hideEditLayerGroupModal" name="取消" />
            <HfxButton    @click="updateLayerGroup" name="保存" />
          </div>
        </Modal>
    </div>
</template>

<script>
import Vue from 'vue'
import markUtil from '@/components/map/js/markUtil'
import mapUtil from '@/components/map/js/mapUtil'
import { mapState } from 'vuex'
import LayerItem from '@/components/module/dztc/LayerItem'
import LayerMapDetail from '@/components/module/dztc/LayerMapDetail'
import map3DUtil from '@/components/map/js/map3DUtil'

export default {
  name: 'DztcItem',
  components: {LayerItem,LayerMapDetail},
  props:['data','name'],
  data () {
    return {
        isEditIconShow:false,
        selectItem:"0",//画点1，画线2，画面3，文字4
        isShowLayerItems:false,
        isShowLayerEdit:false,
        isActive:false,
        isShowEditLayerGroupModal:false,
        editgroupname:"",
    }
  },
  computed: {...mapState({
      currentMapType:state => state.currentMapType,
  }),
    layerList:function(){
        return this.data.layers;
    },
     markClass:function(){
        if(this.isActive){
            return "showmarkClass";
        }else{
            return "hidemarkClass";
        }
    },
  },
  methods:{
      showEditIcon(){
          this.isEditIconShow=true;
      },
      hideEditIcon(){
           this.isEditIconShow=false;
      },
      clickDraw(val){
          if(this.selectItem==val){
              this.selectItem="0";
          }else{
            this.selectItem = val;
          }
      },
      showLayerItems(){
          this.isShowLayerItems = !this.isShowLayerItems;
      },
      showLayerEdit(){
          this.isShowLayerEdit = !this.isShowLayerEdit;
      },
      clickLayerItem(type,data){
         this.$emit('on-click',type,data);		
      },
      getLayerGroupMarks(){
          if(this.isActive){//已激活
              this.isActive = false;
              if(this.currentMapType=="3D"){
                  for(var n=0;n<this.layerList.length;n++){
                    var layerid = this.layerList[n].layerid;
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
                  }
              }else{
                for(var i=0;i<this.layerList.length;i++){
                   markUtil.clearLayer("dztc"+this.data.module+this.layerList[i].layerid+"Layer",this);
                }
              }
          }else{
              this.isActive = true;
              if(this.currentMapType=="3D"){
                for(var i=0;i<this.layerList.length;i++){
                  this.http.get("/tczy/getMarks",{layerid:this.layerList[i].layerid,name:this.name},this.getMarks3DCallBack,this,false);
                }
              }else{
                for(var i=0;i<this.layerList.length;i++){
                  this.http.get("/tczy/getMarks",{layerid:this.layerList[i].layerid,name:this.name},this.getMarksCallBack,this,false);
                }
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
            markUtil.addDztcLayerMark("dztc"+groupmodule+layerid+"Layer",data.templateObj,markObj,attributes,this);
          }
      },
      deleteLayerGroup(){
          if(this.layerList.length>0){
              this.$Message.error("请先删除该图层组下的图层");
              return;
          }
          var h = this.$createElement;
          this.$msgbox({
          title: '删除图层组',
          message: h('p', null, [
            h('span', null, '是否删除此图层组('+this.data.groupname+')？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              var param = {};
              param.groupid = this.data.groupid;
              this.http.get("/tczy/deleteLayerGroup",param,this.deleteLayerGroupCallBack,this,false);
            } else {
              done();
            }
          }
        }).catch();
      },
      deleteLayerGroupCallBack(data){
          this.$Message.success("删除成功");
          var param = {};
          param.groupid = this.data.groupid;
          this.$emit('on-click',"deleteLayerGroup",param);	
      },
      showEditLayerGroupModal(){
          this.editgroupname = this.data.groupname;
          this.isShowEditLayerGroupModal = true;
      },
      hideEditLayerGroupModal(){
          this.isShowEditLayerGroupModal = false;
      },
      updateLayerGroup(){
          if(this.editgroupname==""){
              this.$Message.error("图层组名称不能为空");
              return;
          }
          var param = {};
          param.groupid = this.data.groupid;
          param.groupname = this.editgroupname;
          this.http.get("/tczy/updateLayerGroup",param,this.updateLayerGroupCallBack,this,false);
      },
      updateLayerGroupCallBack(data){
        this.$Message.success("保存成功");
        this.isShowEditLayerGroupModal = false;
        var param = {};
        param.groupid = this.data.groupid;
        param.groupname = this.editgroupname;
        this.$emit('on-click',"updateLayerGroup",param);	
      },
      deleteLayerMarks(){
          this.$emit("on-reflush",null);
      },
  },
  created(){
    
  }
}
</script>

<style scoped>
.DztcItem{
    position: relative;
    width: 98%;
    color: white;
    border: 1px solid #b6f6ff;
}
.layerGroupItemClass{
    height: 38px;
    display: flex;
    justify-content:flex-start;
    align-items: center;
    background: #08385a;
    padding: 0px 5px;
}
.iconClass{
    color: white;
    font-size: 18px;
    cursor: pointer;
}
.layerGroupItemClass_content{
    width: 90%;
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding: 0 10px 0px 5px;
    cursor: pointer;
    color: #b6f6ff;
    position: relative;
}
.layerItemsClass{
    /* padding: 5px 5px; */
}
.firstLayerItemClass{
    margin-top: 0px !important;
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
.showmarkClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_showallmark.png)  no-repeat;
}
.hidemarkClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: 
    url(./../../../assets/dztc/dztc_hideallmark.png)  no-repeat;
}
.flrxr{
    display: flex;
    position: absolute;
    right: 15px;
}
.xiugaiClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-left: 13px;
    background: 
    url(./../../../assets/dztc/dztc_mdy.png)  no-repeat;
}
.shanchuClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-left: 13px;
    background: 
    url(./../../../assets/dztc/dztc_del.png)  no-repeat;
}
.shangjiantouClass{
    width: 11px;
    height: 7px;
    margin: 6px 0 0 6px;
    background: 
    url(./../../../assets/dztc/dztc_jiantou_shang.png)  no-repeat;

}
.xiajiantouClass{
    width: 11px;
    height: 7px;
    margin: 6px 0 0 6px;
    background: 
    url(./../../../assets/dztc/dztc_jiantou_xia.png)  no-repeat;
}
.nameandarrow{
    display:flex;
}
</style>
<style>
.mdyLayerGroup .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 82px;
  left:387px;
  width: 300px !important;
}
</style>
