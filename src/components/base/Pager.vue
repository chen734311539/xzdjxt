<template>
    <div class="page-panel">
        <span>共{{totalSize}}条</span>
        <button class="buttonclass" type="button" :class="{'buttonclassdisable':leftdisable}" :disabled="leftdisable" @click="clickLeftLeftButton"><<</button>
        <button class="buttonclass" type="button" :class="{'buttonclassdisable':leftdisable}" :disabled="leftdisable" @click="clickLeftButton"><</button>
        <span>
        <button v-for="page in pages" :class="{buttonblueclass:(page==currentPage)}" class="buttonclass buttonclassmiddle" type="button" @click="clickButton(page)" :key="page">{{page}}</button> 
        </span>
        <!-- <button class="buttonclass" type="button" :class="{buttonblueclass:(current=='1')}" @click="clickButton1">{{middle-1}}</button>
        <button class="buttonclass" type="button" :class="{buttonblueclass:(current=='2')}" @click="clickButton2">{{middle}}</button>
        <button class="buttonclass" type="button" :class="{buttonblueclass:(current=='3')}" @click="clickButton3">{{middle+1}}</button> -->
        <button class="buttonclass" type="button" :class="{'buttonclassdisable':rightdisable}" :disabled="rightdisable" @click="clickRightButton">></button>
        <button class="buttonclass" type="button" :class="{'buttonclassdisable':rightdisable}" :disabled="rightdisable" @click="clickRightRightButton">>></button>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'Pager',
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
    height: 23px;
    color: white;
    text-align: center;
}
.buttonclass{
    height: 23px;
    width: 28px;
    background-color: #303539;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
}
.buttonclassmiddle{
    margin-left: 2px;
    margin-right: 2px;
}
.buttonclassdisable{
    color: #6b6b6b;
}
.buttonblueclass{
    background-color: rgb(66, 139, 202) !important;
}
.buttonclass:hover,.buttonclass.active{
    background-color: rgb(66, 139, 202);
}
</style>
