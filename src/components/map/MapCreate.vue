<template>
    <div class="map" :id="mapid">
       <!-- <div class="all_maps" v-show="baseMapObj.layerid!=null&&moreCreatMap.length" :class="{all_maps_hover:isShowAllMapHide}" @mouseover="mouseOver" @mouseout="mouseOut">
            <MapIcon :data="baseMapObj" :mapid="mapid" @on-click="changeBaseMap"/>
        </div> -->
        <!-- <div class="all_maps_hide_div" v-show="isShowAllMapHide&&moreCreatMap.length>0" @mouseover="mouseOver" @mouseout="mouseOut">
            <MapIcon v-for="obj in moreCreatMap" :key="obj.layerid" :data="obj" :mapid="mapid" @on-click="changeBaseMap"/>
        </div> -->
    </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Constants from '@/constants/Constants'
import dynamicLoading from "./js/dynamicLoading.js"
import TiledLayer from "./js/TiledLayer.js"
import mapCreateUtil from "./js/mapCreateUtil.js"
import markUtil from "./js/markUtil.js"
import yewuMarkUtil from "./js/yewuMarkUtil.js"
import MapIcon from '@/components/map/MapIcon'

export default {
  name: 'MapHeat',
  props:['mapid','basemap'],
  components: {MapIcon},
  data () {
    return {
      baseMapObj:{},
      moreCreatMap:[],
      isShowAllMapHide:false,
    }
  },
  computed: {
  },
  methods:{
     getMapObj(){//获取map对象，里面的值格式等同this.map中的格式,多加一个id
        for(var i=0;i<this.mapList.length;i++){
            if(this.mapList[i].id=this.mapid){
              return this.mapList[i];
            }
        }
        //或是没有则新增
        var mapObj = {};
        mapObj.map_mapArray = [];
        mapObj.layeridmap = {};
        mapObj.divlayeridmap={};
        mapObj.markidmap = {};
        mapObj.id = this.mapid;
        this.mapList.push(mapObj);
        return mapObj;
     },
     mapInit(){
       this.http.get("/user/getMap",null,this.getMapCallBack,this,false);
     },
     getMapCallBack(data){
       var that = this;
       try{
          var temp = new esri.layers.TiledMapServiceLayer();
        }catch(e){
          setTimeout(function(){
             that.getMapCallBack(data);
          },200);
          return;
        }
        TiledLayer.TiledLayerInit();
        var mapObj = this.getMapObj();
        mapCreateUtil.getMapArray(data,mapObj);
        var basemapid = "";
        for(var i=0;i<mapObj.map_mapArray.length;i++){
          var obj = mapObj.map_mapArray[i];
          if(obj.isbasemap=='1'){
            this.baseMapObj = obj;
            basemapid = obj.layerid;
          }else if(obj.isbasemap=='-1'){
            //  this.lklayerid = obj.layerid;
          }else{
            this.moreCreatMap.push(obj);
          }
        }
        mapCreateUtil.setBasemap(basemapid,this.mapid,mapObj);
     },
     changeBaseMap(data){
        var newMoreMap = [];
        var mapObj = this.getMapObj();
        for(var i=0;i<mapObj.map_mapArray.length;i++){
          var obj = mapObj.map_mapArray[i];
          if(obj.layerid!=data.layerid&&obj.isbasemap!='-1'){
            newMoreMap.push(obj);
          }
        }
        this.baseMapObj = data;
        this.moreCreatMap = newMoreMap;
        mapCreateUtil.setBasemap(data.layerid,this.mapid,mapObj);
     },
     mouseOver(){
        this.isShowAllMapHide = true;
     },
     mouseOut(){
        this.isShowAllMapHide = false;
     },
  },
  created(){
    var mapObj = this.getMapObj();
    if(!mapObj.map){
     var that = this;
     dynamicLoading.loadcss(Constants.map_base_url+"js/dijit/themes/claro/claro.css");
      dynamicLoading.loadcss(Constants.map_base_url+"js/esri/css/esri.css");
        new Promise(function (resolve, reject) {
          dynamicLoading.loadjs(Constants.map_base_url+"js/init.js");
          resolve();
      }).then(function () {
          setTimeout(function() {
              return that.mapInit();
          }, 500);
      }).catch(function () {});
    }
  }
}
</script>

<style scoped>
.map{
  height: 100%;
  width: 100%;
  position: relative;
}
.all_maps{
  position:absolute;
  right: 15px;
  bottom: 15px;
  z-index: 2;
  width: 100px;
  height: 75px;
  padding: 5px 5px 5px 5px;
}
.all_maps_hover{
  background: black;
}
.all_maps_hide_div{
  background: black;
  position:absolute;
  right: 109px;
  bottom: 15px;
  z-index: 2;
  padding: 5px 5px 5px 5px;
  height: 75px;
}
</style>
