<template>
    <Modal  v-model="isshow"  :draggable = "true" :footer-hide="true" title="电话呼入预警信息"  class-name="showmatchtel-panel">
        <div slot="close"><div class="hfx-modal-close"/></div>
        <div style="margin-bottom:5px;">
                <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">电话：</span>
                <span style="color:white;">{{hryj.phonenum}}</span>
        </div>
                <div style="margin-bottom:5px;">
                <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">姓名：</span>
                <span style="color:white;">{{hryj.name}}</span>
        </div>
                <div style="margin-bottom:5px;">
                <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">分类：</span>
                <span style="color:white;">{{hryj.type}}</span>
        </div>
                <div style="margin-bottom:5px;">
                <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">描述：</span>
                <span style="color:white;">{{hryj.describe}}</span>
        </div>
    </Modal>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import HfxTable from '@/components/base/HfxTable'
import common from "@/common.js"
export default {
  name: 'ShowMatchTel',
  props:['needshow','defaultshow'],
  components: {},
  data () {
    return {
        showSwitch:true,
    }
  },
  computed:{ ...mapState({
    hryj:state => state.push.hryj,
  }),
  isshow:{
      get:function(){
        return this.needshow&&this.defaultshow;
      },
      set:function(){
      },
  },
  },
  methods:{ 
  },
  created(){
  },
  watch:{
  }
}
</script>
<style scoped>

</style>
<style>
.showmatchtel-panel .ivu-modal .ivu-modal-content{
  top:170px;
  left:300px;
  width: 400px !important;
}
</style>

