<template>
  <div class="shipinjieshaoPanel">
      <!-- <video class="jieshaovideo" :src="spsrc" autoplay="autoplay" loop="loop" muted="muted"></video> -->
      <div class="jieshaovideo">
        <iframe  src="http://10.35.0.230:8080/jczh/" width="100%" height="100%"   frameborder="0"  name="ditu"   scrolling="no"></iframe>
      </div>
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
.htmldiv{
  background: red;
}
</style>
