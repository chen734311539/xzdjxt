<template>
    <div class="chatGroup" @click="clickGroup" @mouseover="mouseOver" @mouseout="mouseOut">
        <Icon v-show="data.state==1" custom="iconfont iconqun" style="font-size:20px;"/>
        <Icon v-show="data.state==2" custom="iconfont icondanren" style="font-size:16px;margin-left:2px;margin-right:2px;"/>
        {{showName}}
        <Icon v-show="showClose" type="md-close-circle" class="closeGroup" @click.stop="closeGroup"/>
         <Badge v-show="showUnReead" :count="unReadCount" overflow-count="99" :dot="true" class="countBadge">
         </Badge>
    </div>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'


export default {
  name: 'ChatGroup',
  props:['data','closeEnable','showUnReead'],
  components: { },
  data () {
    return {
      showClose:false
    }
  },
  computed: {...mapState({
    unReadMap: state => state.chat.unReadMap //未读消息
  }),
    showName:function(){
      var length = this.common.getLength(this.data.name);
      var str = this.common.cutstr(this.data.name,18);
      return str;
    },
    unReadCount:function(){
      var count = this.unReadMap[this.data.id];
      if(count==null || count==undefined || count==""){
        return 0;
      }
      return count;
    }
  },
  methods:{
      clickGroup(){
        this.$emit('on-click',this.data);
      },
      closeGroup(){
        this.$emit('on-close',this.data);
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
    color: white;
    width: 160px;
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
    border-top: 2px solid #5b6b70;
    border-left: 2px solid #5b6b70;
    border-right: 2px solid #5b6b70;
}
.closeGroup{
  position:absolute;
  right: 0px;
  font-size: 18px;
  top:2px;
}
.countBadge{
  position:absolute;
  top: 6px;
  left: 6px;
}

</style>

