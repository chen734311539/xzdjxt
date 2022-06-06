<template>
    <div class="map" :id = "mapid">
        <div class="all_maps" v-show="baseMapObj.layerid!=null&&moreMap.length" :class="{all_maps_hover:isShowAllMapHide}" @mouseover="mouseOver" @mouseout="mouseOut">
            <MapIcon :data="baseMapObj" :mapid="mapid"/>
        </div>
        <div class="all_maps_hide_div" v-show="isShowAllMapHide&&moreMap.length>0" @mouseover="mouseOver" @mouseout="mouseOut">
            <MapIcon v-for="obj in moreMap" :key="obj.layerid" :data="baseMapObj" :mapid="mapid"/>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Constants from '@/constants/Constants'
import dynamicLoading from "./js/dynamicLoading.js"
import TiledLayer from "./js/TiledLayer.js"
import mapHeatUtil from "./js/mapHeatUtil.js"
import markUtil from "./js/markUtil.js"
import yewuMarkUtil from "./js/yewuMarkUtil.js"
import MapIcon from '@/components/map/MapIcon'

export default {
  name: 'MapHeat',
  props:['mapid'],
  components: {MapIcon},
  data () {
    return {
      baseMapObj:{},
      moreMap:[],
      isShowAllMapHide:false,
      heatmap:{}
    }
  },
  computed: mapState({
  }),
  methods:{
     mouseOver(){
         this.isShowAllMapHide = true;
     },
     mouseOut(){
        this.isShowAllMapHide = false;
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
        mapHeatUtil.getMapArray(data,this);
        var basemapid = "";
        for(var i=0;i<this.heatmap.map_mapArray.length;i++){
          var obj = this.heatmap.map_mapArray[i];
          if(obj.isbasemap=='1'){
            basemapid = obj.layerid;
            this.baseMapObj = obj;
          }else{
            this.moreMap.push(obj);
          }
        }
        mapHeatUtil.setBasemap(basemapid,this.mapid,this);
     }
  },
  created(){
    if(!this.heatmap.map){
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
  left: 15px;
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
  left: 109px;
  bottom: 15px;
  z-index: 2;
  padding: 5px 5px 5px 5px;
  height: 75px;
}
</style>
