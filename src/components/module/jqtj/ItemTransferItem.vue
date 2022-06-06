<template>
    <div class="selectedGroup" @click="clickItem" @mouseover="mouseOver" @mouseout="mouseOut">
      {{itemObj.name}}
      <Icon v-show="showClose" type="md-close-circle" class="closeGroup" @click.stop="closeGroup"/>
    </div>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'


export default {
  name: 'ItemTransferItem',
  props:['itemObj','closeEnable'],
  components: {},
  data () {
    return {
      showClose:false
    }
  },
  computed: {...mapState({
    }),
  },
  methods:{
      clickItem(){
        this.$emit('on-click',this.itemObj);
      },
      closeGroup(){
        this.$emit('on-close',this.itemObj);
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
.selectedGroup{
    position: relative;
    color: white;
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
.selectedGroup:hover{
    background: rgba(0, 0, 0,0.6);
}
.closeGroup{
  position:absolute;
  right: 0px;
  font-size: 18px;
  top:2px;
}

</style>

