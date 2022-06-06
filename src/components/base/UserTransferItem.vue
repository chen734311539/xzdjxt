<template>
    <div class="chatGroup" @click="clickUser" @mouseover="mouseOver" @mouseout="mouseOut">
      <Icon custom="iconfont icondanren" style="font-size:16px;margin-left:2px;margin-right:2px;"/>
      {{userObj.username}}
      <Icon v-show="showClose" type="md-close-circle" class="closeGroup" @click.stop="closeGroup"/>
    </div>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'


export default {
  name: 'UserTransferItem',
  props:['userObj','closeEnable'],
  components: { },
  data () {
    return {
      showClose:false
    }
  },
  computed: {...mapState({
  }),
    showName:function(){
      var length = this.common.getLength(this.name);
      var str = this.common.cutstr(this.name,22);
      return str;
    }
  },
  methods:{
      clickUser(){
        this.$emit('on-click',this.userObj);
      },
      closeGroup(){
        this.$emit('on-close',this.userObj);
        $(this.$el).remove();
      },
      mouseOver(){
        if(this.closeEnable){
          this.showClose = true;
        }
      },
      mouseOut(){
        this.showClose = false;
      }
  },
  created(){
  }
}
</script>
<style scoped>
.chatGroup{
    position: relative;
    color: #409eff;
    width: 90%;
    height: 25px;
    line-height: 25px;
    margin:auto;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 5px;
    padding: 0px 5px;
    margin-bottom: 5px;
}
.chatGroup:hover{
    background: #10487e;
}
.closeGroup{
  position:absolute;
  right: 0px;
  font-size: 18px;
  top:2px;
}

</style>

