<template>
    <div class="jlbutton" @click="clickHandler" @mouseover="changejlbuttonBorderEnter" @mouseout="changejlbuttonBorderLeave" >
      <div class="jlbuttonTX" :class="jlbuttonBorder">
      </div>
      <div class="jltype">
        <div :class="jlpic">
        </div>
      </div>
      <div class="separator">
      </div>
      <div class="content">
          <span class="gpsname"  :style="{color:activecolor}"  >{{data.gpsname}}</span>
          <span v-if="data.distance" style="color:red;position: absolute;right: -30px;">{{data.distance}}米</span>
          <span class="deptname"  >{{data.deptname}}</span>
      </div>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
export default {
  name: 'JingLiButton',
  props:['data'],
  data () {
    return {
      jlbuttonBorder:"jlbuttonBorder_leave",
    }
  },
  computed: {
    gpsurl:function(){
        var gpsicon = "";
        if(this.data.online=="1"){
           gpsicon = Constants.gps_prefix+this.data.gpsonlineurl;
        }else{
           gpsicon = Constants.gps_prefix+this.data.gpsnoonlineurl; 
        }
      return gpsicon;
    },
    jlpic:function(){
      if(this.data.typecode=="5"){
        if(this.data.online=="1"){
          return 'djjonline';
        }else{
          return 'djjoffline';
        }
      }else if(this.data.typecode=="2"){
        if(this.data.online=="1"){
          return 'mtconline';
        }else{
          return 'mtcoffline';
        }
      }else if(this.data.typecode=="3"){
        if(this.data.online=="1"){
          return 'jconline';
        }else{
          return 'jcoffline';
        }
      }else if(this.data.typecode=="4"){
        if(this.data.online=="1"){
          return 'jwtonline';
        }else{
          return 'jwtoffline';
        }
      }else if(this.data.typecode=="05"){
        if(this.data.online=="1"){
          return 'zfyonline';
        }else{
          return 'zfyoffline';
        }
      }else if(this.data.typecode=="9"){
        if(this.data.online=="1"){
          return 'zycryonline';
        }else{
          return 'zfyryoffline';
        }
      }else if(this.data.typecode=="10"){
        if(this.data.online=="1"){
          return 'zycybonline';
        }else{
          return 'zycyboffline';
        }
      }else{
         return '';
      }
    },
    activecolor:function(){
       if(this.data.online=="1"){
          return '#b6f6ff';
        }else{
           return '#b6f6ff';//#b8b8b8
        }
    }
  },
  methods:{
    clickHandler(){
      this.$emit('on-click',this.data);
    },
    changejlbuttonBorderEnter(){
      this.jlbuttonBorder="jlbuttonBorder_enter";
    },
    changejlbuttonBorderLeave(){
      this.jlbuttonBorder="jlbuttonBorder_leave";
    }
  },
  created(){
    
  }
}
</script>

<style scoped>
.jlbutton{
  width: 94%;
  height: 70px;
  margin: 8px 0 0 6px;
  position: relative;
  padding: 13px 0px;
  cursor: pointer;
}
.content{
  position:absolute;
  left:65px;
  top:15px;
  width: 60%;
}
.gpsname{
  position: absolute;
  font-size: 14px;
  top: 0px;
  left: 5px;
}
.deptname{
  position: absolute;
  top: 25px;
  left: 5px;
  font-size: 12px;
  color: #ffa20f
}
.jlstage{
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 4px;
    width: 8px;
    height: 8px;
}
.djjonline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_djj_online.png)  no-repeat;
    background-size: 100%;
}
.djjoffline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_djj_offline.png)  no-repeat;
    background-size: 100%;
}
.mtconline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_mtc_online.png)  no-repeat;
    background-size: 100%;
}
.mtcoffline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_mtc_offline.png)  no-repeat;
    background-size: 100%;
}
.jconline{
  position: absolute;
   width: 40px;
  height: 31px;
  top: 20px;
  left: 8px;
  background: 
    url(./../../../assets/jl/ssjl_jc_online.png)  no-repeat;
    background-size: 100%;
}
.jcoffline{
  position: absolute;
  width: 40px;
  height: 31px;
  top: 20px;
  left: 8px;
  background: 
    url(./../../../assets/jl/ssjl_jc_offline.png)  no-repeat;
    background-size: 100%;
}
.jwtonline{
  position: absolute;
   width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_jwt_online.png)  no-repeat;
    background-size: 100%;
}
.jwtoffline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_jwt_offline.png)  no-repeat;
    background-size: 100%;
}
.zfyonline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_zfy_online.png)  no-repeat;
    background-size: 100%;
}
.zfyoffline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_zfy_offline.png)  no-repeat;
    background-size: 100%;
}
.zycryonline{
  position: absolute;
  width: 30px;
  height: 35px;
  top: 20px;
  left: 12px;
  background: 
    url(./../../../assets/jl/ssjl_zyc_online.png)  no-repeat;
    background-size: 100%;
}
.zycryoffline{
  position: absolute;
  width: 30px;
  height: 35px;
  top: 20px;
  left: 12px;
  background: 
    url(./../../../assets/jl/ssjl_zyc_offline.png)  no-repeat;
    background-size: 100%;
}
.zycybonline{
  position: absolute;
  width: 30px;
  height: 35px;
  top: 20px;
  left: 12px;
  background: 
    url(./../../../assets/jl/ssjl_zyc_online.png)  no-repeat;
    background-size: 100%;
}
.zycyboffline{
  position: absolute;
  width: 30px;
  height: 35px;
  top: 20px;
  left: 12px;
  background: 
    url(./../../../assets/jl/ssjl_zyc_offline.png)  no-repeat;
    background-size: 100%;
}
.jlbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.jlbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.separator{
  position: absolute;
    left: 56px;
    top: 25%;
    width: 1px;
    height: 38px;
    background: 
    url(./../../../assets/jq/ssjq_separatorline.png)  no-repeat;
}
.jlbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.jlbuttonTX:hover, .jlbuttonTX:focus, .jlbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
</style>
