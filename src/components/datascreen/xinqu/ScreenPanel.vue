<template>
  <div class="panel">
     <div class="bjpanel"></div>
     <div class="bg_title">
       <div class="title">
          旺庄派出所智慧大屏
       </div>
     </div>
    <div class="content" @mouseover="mouseOver" @mouseout="mouseOut">
        <Screen1 v-show="curpage==1"/>
        <div class="prevClass" @click="clickPrevPage()" v-show="curpage!=1&&showpage==true"></div>
        <div class="nextClass" @click="clickNextPage()" v-show="curpage!=totalpage&&showpage==true"></div>
        <div class="page" v-show="showpage==true&&totalpage>1">
          <span :class="{active:(curpage==i)}" @click="clickPage(i)" v-for="i in totalpage" :key="i"></span>
        </div>
    </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
import Screen1 from './Screen1'
export default {
  name: 'ScreenPanel',
  components:{Screen1},
  data () {
    return {
        title:Constants.project_name,
        showpage:false,//是否显示翻页
        curpage:1,//当前页
        totalpage:2//一共多少页
    }
  },
  computed:mapState({
  }),
  methods:{
    clickPage(page){
        this.curpage = page;
        //调整屏幕上的echarts
        // var that = this;
        // setTimeout(function(){
        //   that.listenPageResize();
        // },100);
    },
    clickPrevPage(){
      this.clickPage(this.curpage-1);
    },
    clickNextPage(){
      this.clickPage(this.curpage+1);
    },
    mouseOver(){
        this.showpage = true;
    },
    mouseOut(){
        this.showpage = false;
    },
    listenResize(){
      for(var i = 0;i<this.chartList.length;i++){
        this.chartList[i].resize();
      }
    },
    listenPageResize(){
      for(var i = 0;i<this.chartList.length;i++){
        if(this.chartList[i].getHeight()==0){//这样页面翻页不用每次resize
          this.chartList[i].resize();
        }
      }
    }
  },
  mounted(){
     window.addEventListener('resize',this.listenResize); 
  },
  beforeDestroy(){
    window.removeEventListener("resize",this.listenResize);
  }
}
</script>

<style scoped>
.panel{
  width: 100%;
  overflow:hidden;
  height: 100%;
}
.bjpanel{
  position:absolute;
  width: 100%;
  height: 100%;
  background:url(./../../../assets/datascreen/qidong/bg.jpg) no-repeat;
  background-size:100% 100%;
  z-index: -1;
}
.bg_title{
  width:100%;
  height: 80px;
  background:url(./../../../assets/datascreen/qidong/title.png) no-repeat;
  background-size:100% 100%;
}
.title{
  width: 100%;
  height: 100%;
  text-align:center;
  font-size:30px;
  line-height:80px;
  color:#fff;
  user-select: none;
}
.content{
  position: relative;
  width: 100%;
  height: calc(100% - 80px);
}
.prevClass{
    background: url(./../../../assets/datascreen/prev.png) no-repeat;
    position:absolute;
    height: 79px;
    width: 40px;
    top: 40%;
    left: 0px;
    cursor: pointer;
    z-index: 10;
}
.nextClass{
    background: url(./../../../assets/datascreen/next.png) no-repeat;
    position:absolute;
    height: 79px;
    width: 40px;
    top: 40%;
    right: 0px;
    cursor: pointer;
    z-index: 10;
}
.page{
    position:absolute;
    bottom: 10px;
    z-index: 10;
    left: 50%;
    transform:translate(-50%,0%);
}
.page span{
    cursor: pointer;
    width: 23px;
    height: 8px;
    border: 1px solid #101c6e;
    margin:  0 5px;
    display: block;
    float:left;
}
.page span.active{
    background: #264cde;
    border: 1px solid #264cde;
}
.rightPanel{
  position:absolute;
  height: 50%;
  width:100px;
  right: 0px;
  top:25%;
}
.leftPanel{
  position:absolute;
  height: 50%;
  width:100px;
  left: 0px;
  top:25%;
}
.bottomPanel{
  position:absolute;
  height: 100px;
  width:50%;
  left: 25%;
  bottom: 0px;
}
</style>
