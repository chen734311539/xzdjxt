<template>
    <div class="mapDiv" :class="{mapDivOverClass:showTitle}" @mouseover="mouseOver" @mouseout="mouseOut" @click="clickMap">
       <img :src="imageSrc" />
       <div v-show="showTitle" class="title">
           {{data.label}}
       </div>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import mapUtil from "./js/mapUtil.js"

export default {
  name: 'MapIcon',
  props:['data','mapid'],
  components: { },
  data () {
    return {
        showTitle:false
    }
  },
  computed: {...mapState({
  }),
    imageSrc:function(){
        if(this.data&&this.data.icon){
            return require("@/assets/map/"+this.data.icon);
        }else{
            return require("@/assets/map/yx_map.png");
        }
    }
  },
  methods:{
     mouseOver(){
         this.showTitle = true;
     },
     mouseOut(){
        this.showTitle = false;
     },
     clickMap(){
        //  mapUtil.setBasemap(this.data.layerid,this.mapid,this);
         this.$emit('on-click',this.data);
     }
  },
  created(){
     
  }
}
</script>

<style scoped>
.mapDiv{
    width:90px;
    height: 65px;
    display:inline-block;
    position: relative;
    opacity: 0.8;
    cursor: pointer;
}
.mapDivOverClass{
    opacity:1;
}
.title{
    position:absolute;
    right: 5px;
    bottom: 5px;
    color: white;
    background: black;
    padding: 0px 3px;
}
</style>
