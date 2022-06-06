<template>
    <div class="dzkkdetail-panel">
        <div class="dzkkDetail-header">
          <span class="dzkkTitle">电子卡口点位</span>
          <div class="hfx-modal-close close" @click="closeInfoWindow"></div>  
        </div>
        <div class="dzkkDetail-content">
              <div style="margin-bottom:5px;">
                <span>{{dzkkname}}</span>
              </div>
        </div>
    </div>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'

export default {
  name: 'DzkkDetailMap',
  props:['dzkkid','dzkkname'],
  data () {
    return {
      data:{},
      // showSpjkGroup:false,
      // groupList:[],
      // targetKeys1:[],
      // sptitles:["可选分组","已选分组"]
    }
  },
  computed: {
    
  },
  methods:{
    closeInfoWindow(){
      this.map.map.infoWindow.hide();
    },
  },
  mounted(){
  }
}
</script>

<style scoped>
.dzkkdetail-panel{
  width: 315px;
  height: 100px;
  position:relative;
}
.dzkkDetail-header{
  position: relative;
  height: 40px;
  border-bottom: 1px solid #b6f6ff;
  padding: 14px 16px;
}
.dzkkTitle{
  position: absolute;
  top: 10px;
}
.close{
  position:absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
}
.dzkkDetail-content{
  width: 100%;
  padding: 16px;
  height: 50px;
  color: white;
  font-size: 16px;
}
.dzkkDetail-footer{
  height: 20px;
}
</style>
