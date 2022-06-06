<template>
  <div class="chengshirongyuPanel">
        <div class="titleDiv"><span>城市荣誉</span></div>
        <div class="contentDiv">
            <div class="bjvideoDiv">
               <video class="bjvideo" src="@/assets/datascreen/qidong/rongyubj.webm" autoplay="autoplay" loop="loop" muted="muted"></video>
            </div>
            <div ref="content" class="textDiv">
                <marquee  direction="up" height="100%">
                <div class="textItemDiv">2017年12月14日，海盐县获评2017年<span class="textkey">工业百强县（市）</span>。</div>
                <div class="textItemDiv">2019年7月19日，海盐县入选<span class="textkey">中国百强县。</span></div>
                <div class="textItemDiv">第二批国家农产品<span class="textkey">质量安全县</span>，2019全国<span class="textkey">营商环境百强县</span>。</div>
                <div class="textItemDiv">2019年11月13日，入选2019年<span class="textkey">工业百强县（市）</span>、2019年中国<span class="textkey">创新百强县（市）</span>。</div>
                <div class="textItemDiv">2019年11月，入选第二批节水型<span class="textkey">社会建设达标县（区）</span>。</div>
                <div class="textItemDiv">2019年12月6日，入选<span class="textkey">“2019年投资潜力全国百强县（市）</span>”。</div>
               </marquee>
            </div>
        </div>
        
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Chengshirongyu',
  components:{},
  data () {
    return {
    }
  },
  computed:mapState({
  }),
  methods:{
  },
  mounted(){
    
  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.chengshirongyuPanel{
  position: relative;
  width: 100%;
  height: 100%;
}
.titleDiv{
  height: 11.5385%;
  color: rgb(17,255,255);
  font-family: SimHei;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  user-select: none;
  margin-left: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: start;
}
.titleDiv span{
  margin-left:15px;
}
.contentDiv{
  width: 100%;
  height: 88.4615%;
  padding: 10px 5px 5px 5px;
  
  user-select: none;
}
.bjvideoDiv{
  width:100%;
  height: 50%;
}
.bjvideo{
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.textDiv{
  width:100%;
  height: 50%;
}
.textItemDiv{
  color: white;
  font-size: 12px;
  margin-left: 10px;
}
.textkey{
  color: yellow;
  font-size: 16px;
}
</style>
