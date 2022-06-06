<template>
    <Button :ghost="true" class="button" @click="clickButton">
      <Icon :custom="'iconfont '+icon"/>
      <span class="button-name">{{name}}</span>
    </Button>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'MapButton',
  props:['name','icon','click','data'],
  data () {
    return {
      
    }
  },
  computed: mapState({
  }),
  methods:{
      clickButton(){
        this.click(this.data);
        this.$store.dispatch('putState',{"key":"currentMenu","value":this.data});
      }
  },
  created(){
   
  }
}
</script>

<style scoped>
.button{
  width: 88px;
  height: 50px;
  border: 1px solid #5b6b70;
  position: relative;
  margin: 0px 1px 4px 1px;
}
.button:hover,.button.active{
  border: 1px solid #fff;
  color:#fff;
}
.button .ivu-icon{
  position:absolute;
  top: 2px;
  left:32px;
  font-size:25px;
}
.button .button-name{
  position:absolute;
  left: 19px;
  bottom: 1px;
}
</style>
