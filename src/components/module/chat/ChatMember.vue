<template>
    <div class="ChatMember" @click="clickMember">
        <Icon custom="iconfont icondanren" style="font-size:16px;margin-left:2px;margin-right:2px;"/>
        {{showName}}
    </div>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'


export default {
  name: 'ChatMember',
  props:['data'],
  components: { },
  data () {
    return {
    }
  },
  computed: {...mapState({
  }),
    showName:function(){
      var length = this.common.getLength(this.data.username);
      var str = this.common.cutstr(this.data.username,22);
      return str;
    }
  },
  methods:{
      clickMember(){
        this.$emit('on-click',this.data);
      }
  },
  created(){
  }
}
</script>
<style scoped>
.ChatMember{
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
.ChatMember:hover{
    border-top: 2px solid #5b6b70;
    border-left: 2px solid #5b6b70;
    border-right: 2px solid #5b6b70;
}

</style>

