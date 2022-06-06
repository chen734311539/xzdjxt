<template>
    <button :style="styleObject" :class="buttonObject" @click="click">{{this.name}}</button>
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'HfxButton',
  props:{
      name:{
          type:String,
          default:"确定"
      },
      width:{
          type:Number,
          default:60
      },
      height:{
          type:Number,
          default:26
      }
  },
  data () {
    return { 
    }
  },
  computed: { 
      styleObject:function(){
          var Obj={};
          Obj.width=this.width+'px';
          Obj.height=this.height+'px';
        return Obj;
      },
      buttonObject:function(){
          if(this.name=="确定"){
              return "hfxokbutton";
          }else{
              return "hfxbutton";
          }
      }

  },
  methods:{
      click(){
          this.$emit("click");
      }
  },
  created(){
    
  },
  mounted(){
  }
}
</script>
<style scoped>
.hfxbutton{
    border: 1px solid #b6f6ff;
    outline: 0;
}
.hfxbutton:hover{
    border: 1px solid #b6f6ff;
    background-color: #b6f6ff;
    color: #0b3c61;
    outline: 0;
}
.hfxokbutton{
    border: 1px solid #b6f6ff;
    background-color: #b6f6ff;
    color: #0b3c61;
    outline: 0;
}
.hfxokbutton:hover{
    border: 1px solid #b6f6ff;
    background-color: #b6f6ff;
    color: #0b3c61;
    outline: 0;
}
button {
    -webkit-appearance: button;
    text-rendering: auto;
    color:#b6f6ff;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: center;
    align-items: flex-start;
    cursor:pointer;
    background-color: transparent;
    box-sizing: border-box;
    margin: 0em;
    padding: 1px 6px;
    border-width: 2px;
    border-style: outset;
    border-image: initial;
}
</style>
