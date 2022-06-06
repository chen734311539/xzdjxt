<template>
<el-date-picker v-model="data" type="datetime" placeholder="选择日期时间" size="mini" :style="{width:+width+'px'}" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'HfxDatePicker',
  props:{
      data:{
          type:String
      },
      width:{
          type:Number,
          default:180
      }
  },
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
</style>