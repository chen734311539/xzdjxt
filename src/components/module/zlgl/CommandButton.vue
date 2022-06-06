<template>
    <div class="cmdbutton" @click="showCmdDetails" @mouseover="mouseOver" @mouseout="mouseOut" >
      <div class="cmdbuttonTX" :class="cmdbuttonBorder">
      </div>
      <div class="content">
          <!-- message超出16个字符省略 -->
          <span class="message">{{data.message.length &lt;= 16 ? data.message:(data.message.substr(0,16)+"……")}}</span>
          <span class="insertusername">{{data.insertusername}}</span>
          <Icon v-show="showFile" type="md-folder" class="file" size="16" color="#b6f6ff"/>
          <span class="dateandtime">{{date+" "+time}}</span>
          <!-- <span class="time">{{time}}</span> -->
      </div>

    </div>
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'CmdButton',
  props:['data'],
  components: {},
  data () {
    return {
      cmdbuttonBorder:"cmdbuttonBorder_leave",
    }
  },
  computed: {
    date:function(){
      var sj = this.data.inserttime.split(" ")[0];
      return sj.split("-")[1]+"-"+sj.split("-")[2];
    },
    time:function(){
      var sj = this.data.inserttime.split(" ")[1];
      return sj.split(":")[0]+":"+sj.split(":")[1];
    },
    showFile:function(){
      if(this.data.haspicture=="1"||this.data.hassound=="1"||this.data.hasvideo=="1"){
         return true;
      }else{
        return false;
      }
     
    }
  },
  methods:{
    showCmdDetails(){
      this.$emit("on-change",this.data.id);
    },
    mouseOver(){
      this.cmdbuttonBorder="cmdbuttonBorder_enter";
    },
    mouseOut(){
      this.cmdbuttonBorder="cmdbuttonBorder_leave";
    },
  },
  created(){
  }
}
</script>
<style scoped>
.cmdbutton{
  width: 94%;
  height: 70px;
  margin: 8px 0 0 6px;
  position: relative;
  padding: 13px 0px;
  cursor: pointer;
}
.content{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
}
.message{
  position: absolute;
  color: #b6f6ff;
  font-size: 14px;
  top: 0px;
  left: 10px;
}
.insertusername{
  position: absolute;
  color: #b6f6ff;
  font-size: 12px;
  top: 30px;
  left: 10px;
}
.dateandtime{
  position: absolute;
  color: #b6f6ff;
  font-size: 12px;
  top: 30px;
  right: 10px;
}
.file{
  position: absolute;
  top: 30px;
  left: 100px;
}
.cmdbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.cmdbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.cmdbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.cmdbuttonTX:hover, .cmdbuttonTX:focus, .cmdbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
</style>
