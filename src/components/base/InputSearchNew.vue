<template>
    <div style="position: relative;">
        <input class="inputClass" v-model="inputValue"/>
        <div class="iconclass" @click="search" ></div>
        <div v-show="this.inputValue.length>0" class="clearclass" @click="clear" ></div>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'InputSearchNew',
  props: {
    value: {
      type:String,
      default:"",
    },
     //searchempty当值空的时候是否触发搜索
    searchempty:{
      type:Boolean,
      default:true,
    },
  },
  data () {
    return {
      inputValue:this.value,
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
        this.$emit('on-click',this.inputValue);
     },
    clear(){
      this.inputValue="";
      this.$emit('on-clear');
      
    },
    change(){
      this.$emit('on-change',this.inputValue);
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
    background-color:transparent;
    color: #b6f6ff;
    border: 1px solid #b6f6ff;
    outline:0;
    padding: 10px;
}
.iconclass{
    position:absolute;
    height: 29px;
    width: 29px;
    cursor: pointer;
    right: 5px;
    top: 4px;
    background:url(./../../assets/leftcontent/leftcontent_search.png)  center  no-repeat;
}
.iconclass:hover{
    position:absolute;
    height: 29px;
    width: 29px;
    cursor: pointer;
    right: 5px;
    top: 4px;
    background:url(./../../assets/leftcontent/leftcontent_search_hov.png)  center  no-repeat;
}
.clearclass{
    position:absolute;
    height: 29px;
    width: 29px;
    cursor: pointer;
    right: 30px;
    top: 3px;
    background:url(./../../assets/leftcontent/leftcontent_search_clear.png)  center  no-repeat;
}
.clearclass:hover{
    position:absolute;
    height: 29px;
    width: 29px;
    cursor: pointer;
    right: 30px;
    top: 3px;
    background:url(./../../assets/leftcontent/leftcontent_search_clear_hov.png)  center  no-repeat;
}
</style>
