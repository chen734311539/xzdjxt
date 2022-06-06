<template>
  <div class="screenallpanel">
    <video class="video" src="@/assets/datascreen/beijing.webm" autoplay="autoplay" loop="loop"></video>
    <div class="newPanel">
      <div class="shiqinggaikuangloc"><Shiqinggaikuang /></div>
      <div class="renkouqingkuangloc"><Renkouqingkuang /></div>
      <div class="jinglipeizhiloc"><Jinglipeizhi /></div>
      <div class="shijugaikuangloc"><Shijugaikuang /></div>
      <div class="shipinjieshaoloc"><Shipinjieshao /></div>
      
      <div class="zhongdianbuweiloc"><Zhongdianbuwei /></div>
      <div class="zhiantaishiloc"><Zhiantaishi /></div>

      <div class="lishiwenhualoc"><Lishiwenhua /></div>
      <div class="chengshirongyuloc"><Chengshirongyu /></div>
      <div class="gonganrongyuloc"><Gonganrongyu/></div>

      <div class="wangloc"><Wang /></div>
    </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
import Shiqinggaikuang from './module/Shiqinggaikuang'
import Renkouqingkuang from './module/Renkouqingkuang'
import Jinglipeizhi from './module/Jinglipeizhi'
import Shijugaikuang from './module/Shijugaikuang'
import Shipinjieshao from './module/Shipinjieshao'
import Zhongdianbuwei from './module/Zhongdianbuwei'
import Lishiwenhua from './module/Lishiwenhua'
import Chengshirongyu from './module/Chengshirongyu'
import Wang from './module/Wang'
import Gonganrongyu from './module/Gonganrongyu'
import Zhiantaishi from './module/Zhiantaishi'

export default {
  name: 'Screen1',
  components:{Shiqinggaikuang,Renkouqingkuang,Jinglipeizhi,Shijugaikuang,Shipinjieshao,
                Zhongdianbuwei,Lishiwenhua,Chengshirongyu,Wang,Gonganrongyu,Zhiantaishi},
  data () {
    return {
      
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
.screenallpanel{
  position: relative;
  width: 100%;
  height: 100%;
}
.video{
  position:absolute;
  top: -80px;
  left: 0px;
  object-fit: fill;
  width: 100%;
  height: calc(100% + 80px);
  z-index: -1;
}
.newPanel{
  position:absolute;
  top: -80px;
  left: 0px;
  width: 100%;
  height: calc(100% + 80px);
}
.shiqinggaikuangloc{
  position:absolute;
  left: 0.4167%;
  top: 8.315565%;
  height: 27.91855%;
  width: 14.5833%;
}
.renkouqingkuangloc{
  position:absolute;
  left:15.78125%; /*0.4167%+14.5833+0.78125*/
  top: 8.315565%;
  height: 27.91855%;
  width: 14.5833%;
}
.jinglipeizhiloc{
  position:absolute;
  right: 0.3167%;
  top: 8.315565%;
  height: 27.91855%;
  width: 14.5833%;
  /* background: rgba(0, 0, 0, 0.5); */
}
.shijugaikuangloc{
  position:absolute;
  right: 15.54125%;
  top:  8.315565%;
  height: 27.91855%;
  width: 14.5833%;
  /* background: rgba(0, 0, 0, 0.5); */
}
.shipinjieshaoloc{
  position:absolute;
  top: 8.315565%;
  left: 31.36455%;
  right: 31.12455%;
  height: 54%;
}

.zhongdianbuweiloc{
  position:absolute;
  width: 29.84375%;
  height: 27.91855%;
  top:39.534115%;
  left:0.4167%;
}
.zhiantaishiloc{
  position:absolute;
  width: 29.84375%;
  height: 27.91855%;
  top:39.534115%;
  right:0.4167%;
}
.lishiwenhualoc{
  position:absolute;
  left: 0.3167%;
  bottom: 2.052%;
  height: 27.91855%;
  width: 14.5833%;
}
.chengshirongyuloc{
  position:absolute;
  left:15.68125%;
  bottom: 2.052%;
  height: 27.91855%;
  width: 14.5833%;
}
.gonganrongyuloc{
  position:absolute;
  width: 29.84375%;
  height: 27.91855%;
  bottom: 2.052%;
  right: 0.4167%;
  
}
.wangloc{
  position:absolute;
  bottom: 0%;
  left: 31.36455%;
  right: 31.12455%;
  height: 42%;
}
</style>
