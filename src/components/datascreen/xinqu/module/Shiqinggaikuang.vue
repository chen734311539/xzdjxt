<template>
  <div class="shiqinggaikuangPanel">
        <div class="titleDiv"><span>实有地址</span></div>
        <div class="contentDiv">
          <div ref="title" style="overflow: hidden;">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="contentText">旺庄派出所辖区实有地址总共7747个。其中标准地址5672个，非标地址606个，虚拟地址1469个。已建房1892个，访查中914个，完成访查4941个。</span>
          </div>
          <div ref="content" class="contentImgDiv">
              <div class="flexc" style="align-items: start;">
                  <div class="flexr" >
                    <img src="@/assets/datascreen/qidong/sqgk/gk-icon-1.png" style="width:42px;height:38px;"/>
                    <div class="flexc" style="align-items: start">
                        <div class="contentImgTitle">地址总数</div>
                        <div class="contentImgTitle"><span class="contentImgDesc">7747</span>个</div>
                    </div>
                  </div>
                  <div class="flexr" style="margin-top: 10px;">
                    <img src="@/assets/datascreen/qidong/sqgk/gk-icon-3.png" style="width:42px;height:38px;"/>
                    <div class="flexc" style="align-items: start;">
                        <div class="contentImgTitle">已建房</div>
                        <div class="contentImgTitle"><span class="contentImgDesc">1892</span>个</div>
                    </div>
                  </div>
              </div>
              <div class="flexc" style="align-items: start;margin-left: 10px;">
                <div class="flexr">
                  <img src="@/assets/datascreen/qidong/sqgk/gk-icon-2.png" style="width:42px;height:38px;"/>
                  <div class="flexc" style="align-items: start;">
                      <div class="contentImgTitle">访查中</div>
                      <div class="contentImgTitle"><span class="contentImgDesc">914</span>个</div>
                  </div>
                </div>
                <div class="flexr" style="margin-top: 10px;">
                  <img src="@/assets/datascreen/qidong/sqgk/gk-icon-4.png" style="width:42px;height:38px;"/>
                  <div class="flexc" style="align-items: start;">
                      <div class="contentImgTitle">完成访查</div>
                      <div class="contentImgTitle"><span class="contentImgDesc">4941</span>个</div>
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
