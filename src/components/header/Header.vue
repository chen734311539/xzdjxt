<template style="width:100%;height:100%;">
  <div class="header">
      <div class="left">
        <el-button type="primary" size="mini" @click="back" v-if="path !='/'">
          返回
        </el-button>
      </div>
      <div class="right">
        <div class="time">
          <span v-if="time">{{time}}</span>
        </div>
      </div>
  </div>
</template>

<script>
import Map from '@/components/map/Map'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'ScreenHomePage',
  components: {Map},
  // props:['flag'],
  data () {
    return {
      // tabList:'1',
      time:'',
      path:""
    }
  },
  watch : {
    $route:{
        handler:function(val,oldVal){
            this.path = val.path;
        },
        deep:true
    },
  },
  computed:{
    ...mapState({

  }),
  },
  created () {
    this.path = this.$route.path;
    // 获取当前时间
    this.time  = this.$moment(new Date()).format("YYYY年MM月DD日");
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  },
  destroyed: function () {

  }
}
</script>

<style scoped>

.header{
  width:100%;
  height:121px;
  background-image:url(../../assets/xzIndex/header.png);
  position:absolute;
  z-index: 3;
  top:0;
  display:flex;
  justify-content:space-between;
  padding: 20px 10px;
  box-sizing: border-box;
  background-size: 100%;
  background-repeat: no-repeat;
}

.time span{
  font-size:16px;
  color:#fff;
  font-style:oblique;
  letter-spacing: 1pt;
}
.home{
  height: 100%;
  overflow: hidden;
}
.content{
  height: 100%;
  background-color: white;
  width: 100%;
  position: relative;
}
.mapContentClass{
  height:100%;
  width:100%;
  /* z-index:2; */
  position: absolute;
}
</style>
