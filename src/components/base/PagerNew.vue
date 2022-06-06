<template>
    <div class="page-panel">
        <span class="totalCountClass">共{{totalSize}}条</span>
        <button class="buttonclass" type="button" :class="{'buttonclassdisable':leftdisable}" :disabled="leftdisable" @click="clickLeftLeftButton">&lt;&lt;</button>
        <button class="buttonclass" type="button" :class="{'buttonclassdisable':leftdisable}" :disabled="leftdisable" @click="clickLeftButton">&lt;</button>
        <span>
        <button v-for="page in pages" :class="{buttonblueclass:(page==currentPage)}" class="buttonclass buttonclassmiddle" type="button" @click="clickButton(page)" :key="page">{{page}}</button> 
        </span>
        <button class="buttonclass" type="button" :class="{'buttonclassdisable':rightdisable}" :disabled="rightdisable" @click="clickRightButton">&gt;</button>
        <button class="buttonclass" type="button" :class="{'buttonclassdisable':rightdisable}" :disabled="rightdisable" @click="clickRightRightButton">&gt;&gt;</button>

    </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'PagerNew',
  props:['totalSize','pageSize','nowPage'],
  data () {
    return {
        currentPage:1
    }
  },
  computed: {
      totalPage: function (){
          return Math.ceil(this.totalSize/this.pageSize);
      },
      leftdisable: function (){
          if(this.currentPage==1){
              return true;
          }else{
              return false;
          }
      },
      rightdisable: function (){
            if(this.totalPage<=this.currentPage){
              return true;
          }else{
              return false;
          }
      },
      pages:function(){//获取页码数组
          if(this.totalPage<=3){
                let arr = []
                for(let i = 1; i <= this.totalPage; i++) {
                    arr.push(i)
                }
                return arr;
          }else{
                let a = parseInt((this.currentPage-1)/3);
                let arr = []
                if(a*3+3>this.totalPage){
                    for(let i = a*3+1; i <= this.totalPage; i++) {
                        arr.push(i)
                    }
                }else{
                    for(let i = a*3+1; i <= a*3+3; i++) {
                        arr.push(i)
                    }
                }
                return arr;
          }
      }
     
  },
  methods:{
     clickRightButton(){
          this.currentPage=this.currentPage+1;
          this.$emit('on-change',this.currentPage);
    },
    clickRightRightButton(){
        this.currentPage = this.totalPage;
        this.$emit('on-change',this.currentPage);
    },
    clickLeftButton(){
        this.currentPage=this.currentPage-1;
        this.$emit('on-change',this.currentPage);
    },
    clickLeftLeftButton(){
        this.currentPage=1;
        this.$emit('on-change',this.currentPage);
    },
    clickButton(page){
        this.currentPage = page;
        this.$emit('on-change',this.currentPage);
    }
  },
  created(){
    
  },
  mounted(){
      this.currentPage = this.nowPage;
  }
}
</script>

<style scoped>
.page-panel{
    height: 24px;
    color: #b6f6ff;
    text-align: center;
}
.buttonclass{
    height: 24px;
    width: 24px;
    background-color: transparent;
    border: 1px solid #b6f6ff;
    border-radius: 12px;
    cursor: pointer;
    color: #b6f6ff;
    outline: 0;
}
.buttonclassmiddle{
    margin-left: 2px;
    margin-right: 2px;
}
.buttonclassdisable{
    color: #6499c0 !important;
    cursor: not-allowed;
    background-color: transparent !important;
    border: 1px solid #6499c0 !important;
}
.buttonblueclass{
    background-color: #b6f6ff !important;
    color: #0b3c61;
    border: 1px solid #0b3c61;
}
.buttonclass:hover,.buttonclass.active{
    background-color: #b6f6ff;
    color: #0b3c61;
    border: 1px solid #0b3c61;
}
</style>
