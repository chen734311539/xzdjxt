<template>
    <Modal v-model="showSendMsg" :draggable="true" class-name="sendMsg-panel" :footer-hide="true"  title="发送短信">
        <div slot="close"><div @click="closePanel" class="hfx-modal-close"/></div>
        <div style="width: 500px;"> 
            <span>电话号码：</span>
            <input v-model="currentDhhm" class="dhhminput"/>
        </div>
        <div class="msgdiv"> 
            <span style="top:-150px;position:relative;">短信内容：</span>
            <textarea v-model="currentMsg" class="msgText"/>
        </div>
        <button class="sendMsgBtn" @click="sendDxMsg">发送</button>
    </Modal>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"

export default {
  name: 'SendMsg',
  props:['dhhm','msg','showSendMsg','localphone'],
  data () {
    return {
      currentDhhm:"",
      currentMsg:"",
      currentLocalphone:"1",//0表示是本地号码，1表示不是本地号码
    }
  },
  computed: mapState({
  }),
  methods:{
      sendDxMsg(){
          if(this.currentDhhm==""){
              this.$Message.error("电话号码不能为空");
              return;
          }
          for(var i=0;i<this.currentDhhm.split(";").length;i++){
              if(!(/(^[0-9]*$)/.test(this.currentDhhm.split(";")[i]))){
                this.$Message.error(this.currentDhhm.split(";")[i]+"此电话号码格式不正确");
                return;
              }
          }
          if(this.currentMsg==""){
              this.$Message.error("短信内容不能为空");
              return;
          }
          var paramObj = {};
          paramObj.dhhm = this.currentDhhm;
          paramObj.msg = this.currentMsg;
          this.http.post("/user/sendMsg",paramObj,this.sendMsgCallBack,this,false);
      },
      sendMsgCallBack(result){
         this.$Message.success(result);
         this.currentMsg = "";
      },
      closePanel(){
        this.$emit('on-close');
      }
  },
  created(){
      if(this.dhhm){
          this.currentDhhm = this.dhhm;
      }
      if(this.msg){
          this.currentMsg = this.msg;
      }
      if(this.localphone){
          this.currentLocalphone = this.localphone;
      }
  },
  watch:{
      dhhm:function(val){
          this.currentDhhm = val;
      },
      msg:function(val){
          this.currentMsg =val;
      },
      localphone:function(val){
          this.currentLocalphone =val;
      },
  }
}
</script>

<style scoped>
.dhhminput{
   width: 435px;
   background: #3b60ce;
   outline: 0;
   border: 0px;
   font-size: 14px;
   color: white;
}
.msgdiv{
    height: 220px;
    padding-top: 20px;
}
.msgText{
   outline: 0;
   border: 0px;
   height: 160px;
   width: 435px;
   background: #3b60ce;
   color: white;
}
.sendMsgBtn{
  height: 30px;
  width: 80px;
  outline: 0px;
  cursor: pointer;
  background: #264296;
  border: 2px solid;
  border-color: #2b97ea;
  color: #83c9ff;
  position: absolute;
  right: 10px;
  bottom: 10px
}
</style>
<style>
.sendMsg-panel .ivu-modal .ivu-modal-content{
  top:150px;
  left: 1280px;
  width: 535px !important;
}
</style>
