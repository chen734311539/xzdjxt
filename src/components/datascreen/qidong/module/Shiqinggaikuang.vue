<template>
  <div class="shiqinggaikuangPanel">
        <div class="titleDiv"><span>市情概况</span></div>
        <div class="contentDiv">
          <div ref="title" style="overflow: hidden;">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="contentText">启东地处万里长江入海口北侧，三面环水，形似半岛，集黄金水道、黄金海岸、黄金大通道于一身，是出江入海的重要门户，也是江苏日出最早的地方。启东市陆地面积1208平方公里，总人口111.59万人（2017年）。</span>
          </div>
          <!-- 全市总面积4788平方公里，辖江阴、宜兴2个县级市和梁溪、滨湖、锡山、惠山、新吴5个行政区、1个无锡经济开发区，全市总人口856万，其中户籍人口498万人、流动人口358万人。 -->
          <div ref="content" class="contentImgDiv">
              <div class="flexc" style="align-items: start;">
                  <div class="flexr" >
                    <img src="@/assets/datascreen/qidong/sqgk/gk-icon-1.png" style="width:42px;height:38px;"/>
                    <div class="flexc" style="align-items: start">
                        <div class="contentImgTitle">生产总值</div>
                        <div class="contentImgTitle"><span class="contentImgDesc">1063.3</span>亿元</div>
                    </div>
                  </div>
                  <div class="flexr" style="margin-top: 10px;">
                    <img src="@/assets/datascreen/qidong/sqgk/gk-icon-3.png" style="width:42px;height:38px;"/>
                    <div class="flexc" style="align-items: start;">
                        <div class="contentImgTitle">消费品零售总额</div>
                        <div class="contentImgTitle"><span class="contentImgDesc">376.9</span>亿元</div>
                    </div>
                  </div>
              </div>
              <div class="flexc" style="align-items: start;margin-left: 10px;">
                <div class="flexr">
                  <img src="@/assets/datascreen/qidong/sqgk/gk-icon-2.png" style="width:42px;height:38px;"/>
                  <div class="flexc" style="align-items: start;">
                      <div class="contentImgTitle">实际利用外资</div>
                      <div class="contentImgTitle"><span class="contentImgDesc">3.1</span>亿美元</div>
                  </div>
                </div>
                <div class="flexr" style="margin-top: 10px;">
                  <img src="@/assets/datascreen/qidong/sqgk/gk-icon-4.png" style="width:42px;height:38px;"/>
                  <div class="flexc" style="align-items: start;">
                      <div class="contentImgTitle">进出口总额</div>
                      <div class="contentImgTitle"><span class="contentImgDesc">194.3</span>亿元</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Shiqinggaikuang',
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
    var titleHeight = this.$refs.title.scrollHeight;
    $(this.$refs.content).height("calc(100% - "+titleHeight+"px)")

  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.shiqinggaikuangPanel{
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
  overflow: hidden;
  user-select: none;
}
.contentText{
  color: rgb(130,192,251);
  font-size: 12px;
}
.contentImgDiv{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  /* margin-top:10px; */
  /* height: calc(100% - 122px); */
  overflow: hidden;
  user-select: none;
}
.contentImgTitle{
  color: #fff;
  font-size: 12px;
}
.contentImgDesc{
  color: #fff900;
  font-family: Digitalt;
}
</style>
