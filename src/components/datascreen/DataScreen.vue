<template>
  <div class="panel">
    <div>
      <div class="header">
      </div>
      <div class="headerImgPanel">
          <div class="nav-img">
          </div>
      </div>
    </div>
    <div class="headerMainPanel">
        <canvas ref="canvas" width="1920" height="61" class="headerMainCanvas"></canvas>
        <span ref="span1"><a class="headLink" :class="{headLinkActive:(curModule==1)}" @click="clickModule(1)"><Icon class="headIcon" custom="iconfont icontuceng"/>我的可视化</a></span>
        <span ref="span2"><a class="headLink" :class="{headLinkActive:(curModule==2)}" @click="clickModule(2)"><Icon class="headIcon" custom="iconfont iconjj-jqbb"/>我的数据</a></span>
        <!-- <span ref="span3"><a class="headLink" :class="{headLinkActive:(curModule==3)}" @click="clickModule(3)"><Icon class="headIcon" custom="iconfont iconjj-jqbb"/>我的xxx</a></span> -->
    </div>
    <div class="headerShadow"></div>
    <div class="content">
        <MyScreen v-show="curModule==1"/>
    </div>

  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
import MyScreen from './MyScreen'
export default {
  name: 'DataScreen',
  components:{MyScreen},
  data () {
    return {
      curModule:1//当前打开的模块
    }
  },
  computed:mapState({
  }),
  methods:{
    clickModule(val){
      if(this.timer){
        clearInterval(this.timer);        
        this.timer = null;
      }
      this.curModule = val;
      this.drawLine();
    },
    drawLine(){
      var spanDiv;
      if(this.curModule==1){
        spanDiv = this.$refs.span1;
      }else if(this.curModule==2){
        spanDiv = this.$refs.span2;
      }else if(this.curModule==3){
        spanDiv = this.$refs.span3;
      }
      if(spanDiv==null || spanDiv==undefined){
        return;
      }
      var offsetLeft = spanDiv.offsetLeft;
      var spanDivWidth = spanDiv.scrollWidth;
      var c= this.$refs.canvas;
      var width = c.scrollWidth;
      var height = c.scrollHeight;
      var ctx=c.getContext("2d");
      ctx.clearRect(0,0,width,height);
      ctx.strokeStyle="#0D4283";
      ctx.lineJoin="round";//折角的类型   miter默认。创建尖角。 round圆角bevel斜角
      ctx.lineWidth=2;//画笔线条粗细
      ctx.beginPath();
      var pianyiliang = 15;//斜线的水平长度/2
      var hudusuojin = 5;//弧度的大小，提前多少像素开始画
      var genhao = Math.sqrt(2*hudusuojin*hudusuojin);//根据前一值，计算的高度，也是用在画弧度上面
      var top = 3;//上面线的Y位置
      var bottom = 40;//下面线的Y位置
      if(offsetLeft==0){
        ctx.moveTo(0,top);//起始坐标
        ctx.lineTo(spanDivWidth-pianyiliang-hudusuojin,top);
        ctx.quadraticCurveTo(spanDivWidth-pianyiliang,top,spanDivWidth-pianyiliang+genhao,top+genhao);
        ctx.lineTo(spanDivWidth+pianyiliang-genhao,bottom-genhao);
        ctx.quadraticCurveTo(spanDivWidth+pianyiliang,bottom,spanDivWidth+pianyiliang+hudusuojin,bottom);
      }else{
        ctx.moveTo(0,bottom);//起始坐标
        ctx.lineTo(offsetLeft-pianyiliang-hudusuojin,bottom);
        ctx.quadraticCurveTo(offsetLeft-pianyiliang,bottom,offsetLeft-pianyiliang+genhao,bottom-genhao);
        ctx.lineTo(offsetLeft+pianyiliang-genhao,top+genhao);
        ctx.quadraticCurveTo(offsetLeft+pianyiliang,top,offsetLeft+pianyiliang+hudusuojin,top);
        ctx.lineTo(offsetLeft+spanDivWidth-pianyiliang-hudusuojin,top);
        ctx.quadraticCurveTo(offsetLeft+spanDivWidth-pianyiliang,top,offsetLeft+spanDivWidth-pianyiliang+genhao,top+genhao);
        ctx.lineTo(offsetLeft+spanDivWidth+pianyiliang-genhao,bottom-genhao);
        ctx.quadraticCurveTo(offsetLeft+spanDivWidth+pianyiliang,bottom,offsetLeft+spanDivWidth+pianyiliang+hudusuojin,bottom);
      }
      ctx.lineTo(1920,bottom);//终点坐标
      ctx.stroke();
      //画里面的线
      for(var g=3,h=0.8,j=1;j<40;j++){
        ctx.strokeStyle="rgba(13, 66, 131, "+h+")";
        ctx.beginPath();
       if(offsetLeft==0){
          ctx.moveTo(0,3+j*g);
        }else{
          if(3+j*g<=bottom){
            ctx.moveTo(offsetLeft+pianyiliang-(j-1)*g,3+j*g);
          }else{
            ctx.moveTo(0,3+j*g);
          }
        }
        if(3+j*g<=bottom){
          ctx.lineTo(offsetLeft+spanDivWidth-pianyiliang+(j-1)*g,3+j*g);
        }else{
          ctx.lineTo(1920,3+j*g);
        }
        ctx.stroke();
        ctx.closePath();
        h=h-0.045;
        if(h<=0){
          break;
        }
      }
    }
  },
  mounted(){
    this.drawLine();
  },
  beforeDestroy(){
  
  }
}
</script>

<style scoped>
.panel{
  width: 100%;
  overflow:hidden;
  height: 100%;
}
.header{
  width:100%;
  display:flex;
  position:fixed;
  top:0px;
  justify-content:space-between;
  z-index:999;
  height:30px;
  padding:0px 10px;
  background-image:linear-gradient(0deg,rgba(0,0,0,0) 19%,#171717 100%);
}
.headerImgPanel{
  display: flex;
  position:absolute;
  top:0px;
  flex-direction:column;
  background:#171b22;
  height:121px;
  transition:.5s height cubic-bezier(.65,.05,.36,1);
  width:100%;
}
.headerImgPanel .nav-img{
  background-image:url(./../../assets/datascreen/bj.png);
  position:absolute;
  width: 100%;
  height: 121px;
  background-size:cover;
  background-position:center;
  transition:.5s opacity cubic-bezier(.4,0,1,1)
}
.headerMainPanel{
  z-index:10;
  display: flex;
  top: 30px;
  position:sticky;
  width: 100%;
  min-width: 1024px;
  user-select:none;
}
.headerMainCanvas{
  position:absolute;
  z-index: -1;
  left: 0px;
}
.headLink{
  transition:color .2s;
  text-decoration:none;
  display:block;
  color:#b9c2cc;
  width:auto;
  min-width:140px;
  line-height:40px;
  text-align:left;
  cursor:pointer;
  padding: 0px 40px;
  font-size:14px;
}
.headLinkActive{
  color:#fff!important 
}
.headIcon{
  padding-right:5px;
  font-size:20px;
}
.headerShadow{
  background:linear-gradient(180deg,transparent,#171b22);
  height:30px;
  position:absolute;
  width: 100%;
  z-index:1;
  top:91px;
}
.content{
  position:absolute;
  width: 100%;
  height: calc(100% - 121px);
  top:121px;
  background: rgb(23,27,34);
}
</style>
