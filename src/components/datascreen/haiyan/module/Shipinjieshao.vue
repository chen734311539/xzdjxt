<template>
  <div class="shipinjieshaoPanel">
      <!-- <video class="jieshaovideo" :src="spsrc" autoplay="autoplay" loop="loop" muted="muted"></video> -->
      
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Shipinjieshao',
  components:{},
  data () {
    return {
      spsrc:Constants.file_url+"datascreen/center.mp4"
    }
  },
  computed:mapState({
  }),
  methods:{
   
  },
  mounted(){
    
  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.shipinjieshaoPanel{
  position: relative;
  width: 100%;
  height: 100%;
  background-image:url(./../../../../assets/datascreen/qidong/shiping.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size:115% 130%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.jieshaovideo{
  width: 91%;
  height: 82%;
  object-fit: fill;
  margin-bottom:5%;
}
</style>
