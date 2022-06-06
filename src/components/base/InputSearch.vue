<template>
    <div style="position: relative;">
        <input class="inputClass" placeholder="请填写搜索内容" v-model="inputValue"/>
        <Icon v-if="shearchModule" type="ios-search" class="iconclass" @click="search"/>
        <Icon v-if="!shearchModule" type="ios-close-circle-outline" class="iconclass" @click="clear"/>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'InputSearch',
  props:['value','showClose','changeShowClose','searchempty'],//searchempty当值空的时候是否触发搜索
  data () {
    return {
      shearchModule:true,
      inputValue:this.value,
      oldValue:""
    }
  },
  computed: mapState({
  }),
  methods:{
     search(){
        if(!this.searchempty){
          if(this.inputValue==""){
            return;
          }
        }
        if(this.showClose){
          this.shearchModule = false;
        }
        this.$emit('on-click',this.inputValue)
     },
    clear(){
        this.shearchModule = true;
        this.inputValue="";
        this.$emit('on-clear');
    },
    change(){
      if(this.oldValue==this.inputValue){
        return;
      }
      if(this.changeShowClose){
        if(this.inputValue==""){
          this.shearchModule = true;
        }else{
          this.shearchModule = false;
        }
      }
      this.$emit('on-change',this.inputValue);
      this.oldValue = this.inputValue;
    }
  },
  created(){
   
  },
  watch : {
      value:function(val) {
          this.inputValue = val;
      },
      inputValue:function(val) {
        this.$emit('input', val);
        this.change();
      },
  }
 
}
</script>

<style scoped>
.inputClass{
    width: 100%;
    height: 100%;
    color: white;
    border-radius: 5px;
    background-color: #10487e;
    border: 0px;
    outline: 0;
}
.inputClass::-webkit-input-placeholder{
  color:#8ddbe8;
}
.iconclass{
    position:absolute;
    color: white;
    cursor: pointer;
    font-size: 16px;
    right: 5px;
    top: 4px;
}
</style>
