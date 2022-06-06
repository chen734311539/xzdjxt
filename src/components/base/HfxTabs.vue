<template>
    <div class="hfxtabs">
        <!-- 选择的头部 -->
        <div class="hfxtabs_header">
            <div v-for="(item,index) in labels" :key=index class="hfxtabs_labels" :class="{active:tabIndex===index}"   @click="channgeTab(index)">{{item}}</div>
        </div>
        <div class="hfxtabs_content">
        <!-- 对应头部的内容 -->
            <div v-for="(item,index) in labels" :key=index class="hfxtabs_content">
                <slot name=item ><slot>
            </div>    
        </div>
    </div>
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'HfxTabs',
  props:{
    labels:{
          type:Array,
          default:["第一页","第二页"]
    },
    tabIndex:{
        type:Number,
        default:0
    },
},
  data () {
    return { 
        active:"active",
        isShow:0,
    }
  },
  computed: {   
  },
  methods:{
    channgeTab(index){//切换选中状态
        this.tabIndex = index;
    },
  },
  created(){
    
  },
  mounted(){
  }
}
</script>
<style scoped>
.hfxtabs_labels{
  float: left;
  cursor: pointer;
  width: 50px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 14px;
  color: #8ddbe8;
  border-bottom: 1px solid #8ddbe8;
}
.active{
    color:white;
    border-bottom: 2px solid white;
}
</style>
<style>
</style>