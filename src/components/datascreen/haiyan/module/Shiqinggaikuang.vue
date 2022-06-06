<template>
  <div class="shiqinggaikuangPanel">
        <div class="titleDiv"><span>市情概况</span></div>
        <div class="contentDiv">
          <div ref="title" style="overflow: hidden;">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="contentText">海盐县，隶属于浙江省嘉兴市，是浙江最早的建制县之一，始建于秦。海盐县地处杭州湾西北，距上海118公里、杭州98公里。海盐素以“鱼米之乡、丝绸之府、礼仪之邦、旅游之地”著称。1985年被国务院列入沿海经济开放区，是中国综合实力百强县。</span>
          </div>
          <!-- 全市总面积4788平方公里，辖江阴、宜兴2个县级市和梁溪、滨湖、锡山、惠山、新吴5个行政区、1个无锡经济开发区，全市总人口856万，其中户籍人口498万人、流动人口358万人。 -->
          <div ref="content" class="contentImgDiv">
              <div class="flexc" style="align-items: start;">
                  <div class="flexr" >
                    <img src="@/assets/datascreen/qidong/sqgk/gk-icon-1.png" style="width:42px;height:38px;"/>
                    <div class="flexc" style="align-items: start">
                        <div class="contentImgTitle">生产总值</div>
                        <div class="contentImgTitle"><span class="contentImgDesc">407.76</span>亿元</div>
                    </div>
                  </div>
                  <div class="flexr" style="margin-top: 10px;">
                    <img src="@/assets/datascreen/qidong/sqgk/gk-icon-3.png" style="width:42px;height:38px;"/>
                    <div class="flexc" style="align-items: start;">
                        <div class="contentImgTitle">农业总产值</div>
                        <div class="contentImgTitle"><span class="contentImgDesc">30.92</span>亿元</div>
                    </div>
                  </div>
              </div>
              <div class="flexc" style="align-items: start;margin-left: 10px;">
                <div class="flexr">
                  <img src="@/assets/datascreen/qidong/sqgk/gk-icon-2.png" style="width:42px;height:38px;"/>
                  <div class="flexc" style="align-items: start;">
                      <div class="contentImgTitle">工业总产值</div>
                      <div class="contentImgTitle"><span class="contentImgDesc">908.09</span>亿元</div>
                  </div>
                </div>
                <div class="flexr" style="margin-top: 10px;">
                  <img src="@/assets/datascreen/qidong/sqgk/gk-icon-4.png" style="width:42px;height:38px;"/>
                  <div class="flexc" style="align-items: start;">
                      <div class="contentImgTitle">固定资产投资</div>
                      <div class="contentImgTitle"><span class="contentImgDesc">291.25</span>亿元</div>
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
