<template style="width:100%;height:100%;">
  <scale>
    <div class="home">
      <div class="content">
        <Header />
        <div ref="map" class="mapContentClass"><Map ref="centermap" mapid="hfxmap"/></div>
        <router-view></router-view>
      </div>
    </div>
  </scale>
</template>

<script>
import Map from '@/components/map/Map'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Header from '@/components/header/Header'
import Banner from '@/components/content/Banner'
import scale from './scale'

export default {
  name: 'ScreenHomePage',
  components: {Map,Header,Banner,scale},
  data () {
    return {
    }
  },
  computed:{
    ...mapState({

  }),
  },
  created () {
  },
  methods:{

  },
  destroyed: function () {

  }
}
</script>

<style scoped>
.home{
  height: 100%;
  overflow: hidden;
}
.container{
  height:100%;
}
.content{
  height: 100%;
  background-color: white;
  width: 100%;
  position: relative;
}
>>>#hfxmap_gc{
  background-image: url(../assets/xzIndex/bgcCover.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
.mapContentClass{
  height:100%;
  width:100%;
   z-index:2;
  position: absolute;
}
>>>.banner .center{
  z-index: 2;
}
>>>.banner .slide{
  z-index: 2;
}
>>>.banner{
  top: 5% !important;
}
.banner>>> .left{
  z-index: 3 !important;
}
.banner>>> .right{
  z-index: 3 !important;
}
</style>
