<template>
  <div class="chengshirongyuPanel">
        <div class="titleDiv"><span>城市荣誉</span></div>
        <div class="contentDiv">
            <div class="bjvideoDiv">
               <video class="bjvideo" src="@/assets/datascreen/qidong/rongyubj.webm" autoplay="autoplay" loop="loop" muted="muted"></video>
            </div>
            <div ref="content" class="textDiv">
                <marquee  direction="up" height="100%">
                <div class="textItemDiv">2015年，启东市获评为<span class="textkey">国家卫生城市</span>。</div>
                <div class="textItemDiv">2017年12月，启东市获评2017年<span class="textkey">工业百强县（市）</span>。</div>
                <div class="textItemDiv">2018年10月，入选2018年度全国<span class="textkey">投资潜力百强县市</span>、全国<span class="textkey">绿色发展百强县市</span>、全国<span class="textkey">科技创新百强县市</span>、全国<span class="textkey">新型城镇化质量百强县市</span> 。</div>

                <div class="textItemDiv">2018年11月，入选2018年<span class="textkey">工业百强县（市）</span>、中国城市全面小康指数前<span class="textkey">100</span>名。</div>
                <div class="textItemDiv">2018年12月，入选全国县域经济综合竞争力<span class="textkey">100</span>强、投资潜力<span class="textkey">100</span>强，中国最佳县级城市<span class="textkey">30</span>强。</div>
                <div class="textItemDiv">2019年入选中国<span class="textkey">百强县</span>。</div>
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
