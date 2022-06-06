<template>
  <div class="shiqinggaikuangPanel">
        <div class="titleDiv"><span>实有单位</span></div>
        <div class="contentDiv">
          <div ref="title" style="overflow: hidden;">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="contentText">旺庄派出所辖区实有单位总共1969家。其中企事业单位83家，学校教育单位29家，医疗养老单位40家，金融行业单位9家，特种行业单位90家，娱乐服务场所128家，其他110家。</span>
          </div>
          <div ref="content" class="contentImgDiv">
              <div class="flexc" style="align-items: start;">
                  <div class="flexr" >
                    <img src="@/assets/datascreen/qidong/sqgk/gk-icon-1.png" style="width:42px;height:38px;"/>
                    <div class="flexc" style="align-items: start">
                        <div class="contentImgTitle">单位总数</div>
                        <div class="contentImgTitle"><span class="contentImgDesc">1969</span>家</div>
                    </div>
                  </div>
                  <div class="flexr" style="margin-top: 10px;">
                    <img src="@/assets/datascreen/qidong/sqgk/gk-icon-3.png" style="width:42px;height:38px;"/>
                    <div class="flexc" style="align-items: start;">
                        <div class="contentImgTitle">企事业单位</div>
                        <div class="contentImgTitle"><span class="contentImgDesc">83</span>家</div>
                    </div>
                  </div>
              </div>
              <div class="flexc" style="align-items: start;margin-left: 10px;">
                <div class="flexr">
                  <img src="@/assets/datascreen/qidong/sqgk/gk-icon-2.png" style="width:42px;height:38px;"/>
                  <div class="flexc" style="align-items: start;">
                      <div class="contentImgTitle">学校教育单位</div>
                      <div class="contentImgTitle"><span class="contentImgDesc">29</span>家</div>
                  </div>
                </div>
                <div class="flexr" style="margin-top: 10px;">
                  <img src="@/assets/datascreen/qidong/sqgk/gk-icon-4.png" style="width:42px;height:38px;"/>
                  <div class="flexc" style="align-items: start;">
                      <div class="contentImgTitle">娱乐服务场所</div>
                      <div class="contentImgTitle"><span class="contentImgDesc">128</span>家</div>
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
