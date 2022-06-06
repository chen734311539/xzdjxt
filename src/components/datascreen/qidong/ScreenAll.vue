<template>
  <div class="panel">
      <div style="height:100%;width:50%;position: relative;float:left;">
        <Screen3fp1 v-show="showLeft" :screen="screen"/>
        <Screen3fp2 v-show="!showLeft" :screen="screen"/>
      </div>
      <div style="height:100%;width:50%;position: relative;float:left;">
        <Screen3fp3/>
      </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'

import Screen3fp1 from '@/components/datascreen/qidong/Screen3-1'
import Screen3fp2 from '@/components/datascreen/qidong/Screen3-2'
import Screen3fp3 from '@/components/datascreen/qidong/Screen3-3'

export default {
  name: 'ScreenAll',
  components:{Screen3fp1,Screen3fp2,Screen3fp3},
  props:[],
  data () {
    return {
       showLeft:true,
       screen:1,
    }
  },
  computed:mapState({
     userInfo: state => state.userInfo,
  }),
  methods:{
    setIntervalChart(){
        var that = this;
        setInterval(function(){
          that.showLeft = !that.showLeft;
          if(that.showLeft){
              that.screen = 1;
          }else{
              that.screen = 2;
          }
        }, 1000*6);//6秒钟
     },
  },
  mounted(){
     this.setIntervalChart();
  },
  created(){
    //  this.setIntervalChart();
  }
}
</script>

<style scoped>
.panel{
  position: relative;
  width: 100%;
  height: 100%;
  overflow:visible;
}
</style>
