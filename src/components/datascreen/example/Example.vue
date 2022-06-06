<template>
  <div class="panel">
     <div class="bjpanel"></div>
     <div class="bg_title">
       <div class="title">
         启东市公安局可视化指挥系统
       </div>
     </div>
    <div class="content" @mouseover="mouseOver" @mouseout="mouseOut">
        <!-- <Example4 v-show="curpage==1"/> -->
        <Example1 v-show="curpage==1"/>
        <Example2 v-show="curpage==2"/>
        <Example3 v-show="curpage==3"/>
        <div class="prevClass" @click="clickPrevPage()" v-show="curpage!=1&&showpage==true"></div>
        <div class="nextClass" @click="clickNextPage()" v-show="curpage!=3&&showpage==true"></div>
        <div class="page" v-show="showpage==true">
          <span :class="{active:(curpage==1)}" @click="clickPage(1)"></span>
          <span :class="{active:(curpage==2)}" @click="clickPage(2)"></span>
          <span :class="{active:(curpage==3)}" @click="clickPage(3)"></span>
          <!-- <span :class="{active:(curpage==4)}" @click="clickPage(4)"></span> -->
        </div>
    </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
import Example1 from './Example1'
import Example2 from './Example2'
import Example3 from './Example3'
import Example4 from './Example4'
export default {
  name: 'Example',
  components:{Example1,Example2,Example3,Example4},
  data () {
    return {
        showpage:false,//是否显示翻页
        curpage:1//当前页
    }
  },
  computed:mapState({
  }),
  methods:{
    getdate(num) { 
    var date1 = new Date();
    //今天时间
    //var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
    //console.log(time1);
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + num);
     //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    //  var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate(); 
    var time2 = (date2.getMonth() + 1) + "-" + date2.getDate(); 
    return time2;
    },
    clickPage(page){
        this.curpage = page;
        //调整屏幕上的echarts
        var that = this;
        setTimeout(function(){
          that.listenPageResize();
        },100);
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
  background:url(./../../../assets/datascreen/example/bg.jpg) no-repeat;
  background-size:100% 100%;
  z-index: -1;
}
.bg_title{
  width:100%;
  height: 80px;
  background:url(./../../../assets/datascreen/example/title.png) no-repeat;
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
</style>
