<template>
    <Modal v-model="show" :draggable="true" class-name="hfx-panel" :footer-hide="true" title="慧风行">
    <!-- 替换原装的关闭按钮 -->
    <div slot="close"><div class="hfx-modal-close"/></div>     
    </Modal>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'HfxModal',
  props:['show'],
  data () {
    return { 
    }
  },
  computed: {   
  },
  methods:{
  },
  created(){
    
  },
  mounted(){
  }
}
</script>
<style scoped>
</style>
<style>
.hfx-panel .ivu-modal .ivu-modal-content{
position: absolute;
top:82px;
left:300px;
width: 480px !important;
}
</style>