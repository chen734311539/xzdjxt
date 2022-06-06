<template style="width:100%;height:100%;">
  <div class="banner">
    <div class="" style="width: 20%;height: 93%;position: relative" >
      <transition name="show">
        <div v-if="isShow" class="left" >
          <div class="leftTop">
            <p>新城街道简介</p>
          </div>
          <div class="leftContent" style="height: 45%">
            <div class="area">
              <div class="box">
                <div class="pic"></div>
                <div class="text">547</div>
                <p>总面积</p>
                <p class="unit">万平方公里</p>
              </div>
              <div class="box">
                <div class="pic"></div>
                <div class="text">35.57</div>
                <p>户籍人口</p>
                <p class="unit">万</p>
              </div>
              <div class="box">
                <div class="pic"></div>
                <div class="text">35.95</div>
                <p>流动人口</p>
                <p class="unit">万</p>
              </div>
            </div>
            <div class="chara">
              <div>
                下辖<span>2</span>个镇
                <span>2</span>个街道和 <span>2</span>个国家级高新技术开发区
              </div>
            </div>
            <div class="company">
              <div>
                2019年，全区实现地区生产总值<span>458.36</span>亿元（小口径），
              </div>
              <div>
                财政收入<span>60</span>亿元；城镇居民人均收入<span>55560</span>元；
              </div>
              <div>农村居民人均可支配收入<span>35778</span></div>
            </div>
          </div>
          <div class="leftBottom" style="height: 50%">
            <div class="leftBottomTop">
              <span>下辖街道</span>
            </div>
            <div class="leftBottomList">
              <div
                class="jd"
                :class="item.size"
                v-for="(item, index) in jdList"
                :key="index"
                @click="toPath(item)"
              >
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>

          <!--    左侧展开-->
          <div class="slide slideLeft1" style="right: -20px" v-if="isShow" @click="slide">
            <img src="@/assets/xzIndex/leftcontent_hide.png" alt="">
          </div>

        </div>
      </transition>

      <!--    左侧展开-->
      <div class="slide slideLeft2" style="" v-if="!isShow"  @click="slide">
        <img src="@/assets/xzIndex/leftcontent_show.png" alt="">
      </div>

    </div>

    <!--    <div class="center"></div>-->

    <div class="" style="width: 20%;height: 93%;position: relative">
      <transition name="show_right">
        <div class="right" v-if="showRight" style="position: relative">
          <EchartsWg></EchartsWg>

          <!--    右侧展开-->
          <div class="slide slideRight1" style="left: -20px" v-if="showRight" @click="rightStatus">
            <img src="@/assets/xzIndex/leftcontent_show.png" alt="">
          </div>
        </div>
      </transition>

      <!--    右侧展开-->
      <div class="slide slideRight2" style="right: 0" v-if="!showRight"  @click="rightStatus">
        <img src="@/assets/xzIndex/leftcontent_hide.png" alt="">
      </div>
    </div>

  </div>
</template>

<script>
  import Map from "@/components/map/Map";
  import Constants from "@/constants/Constants";
  import EchartsWg from "@/components/module/jdgl/echartsWg";
  import { mapState } from "vuex";
  export default {
    name: "banner",
    components: { Map, EchartsWg },
    data() {
      return {
        isShow:true,
        showRight:true,
        ssjqChart: "",
        xcjd: {},
        list: [],
        jdList: [
          {
            name: "亚都社区",
            src: "",
            flag: "",
            size: "small",
          },
          {
            name: "春晓社区",
            src: "",
            flag: "",
            size: "large",
          },
          {
            name: "中山社区",
            src: "",
            flag: "",
            size: "small",
          },
          {
            name: "东升社区",
            src: "",
            flag: "",
            size: "middle",
          },
          {
            name: "秀湖社区",
            src: "",
            flag: "",
            size: "small",
          },
          {
            name: "成秀社区",
            src: "",
            flag: "",
            size: "middle",
          },
          {
            name: "殷秀社区",
            src: "",
            flag: "",
            size: "large",
          },
          {
            name: "木桥港村",
            src: "",
            flag: "",
            size: "middle",
          },
          {
            name: "义庄村",
            src: "",
            flag: "",
            size: "small",
          },
        ],
      };
    },
    computed: {
      ...mapState({}),
    },
    created() {},
    mounted() {
    },
    methods: {
      slide(){
        this.isShow = !this.isShow;
      },
      rightStatus(){
        this.showRight = !this.showRight;
      },
      toPath(item) {
        this.$router.push({
          path: "/jdgl",
          query: {
            obj: item,
          },
        });
      },
    },
    destroyed: function () {},
  };
</script>

<style scoped>
  @-webkit-keyframes fadenum {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes show{
    0%{
      opacity: 0;
      left: -20%;
    }
    100%{
      opacity: 1;
      left: 0;
    }
  }

  @-webkit-keyframes hide {
    0%{
      opacity: 1;
      left: 0;
    }
    100%{
      opacity: 0;
      left: -20%;
    }
  }
  .show-enter-active{
    animation: show 1.2s;
  }
  .show-leave-active{
    animation: hide 1.2s;
  }
  .show-enter,.show-leave-to{
    opacity: 0;
  }


  @-webkit-keyframes show_right{
    0%{
      opacity: 0;
      right: -20%;
    }
    100%{
      opacity: 1;
      right: 0;
    }
  }

  @-webkit-keyframes hide_right {
    0%{
      opacity: 1;
      right: 0;
    }
    100%{
      opacity: 0;
      right: -20%;
    }
  }

  .show_right-enter-active{
    animation: show_right 1.2s;
  }
  .show_right-leave-active{
    animation: hide_right 1.2s;
  }
  .show_right-enter,.show_right-leave-to{
    opacity: 0;
  }
  .banner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
    position: relative;
    justify-content: space-between;
    top: 5%;
    background-size:100%;
    background-position-y: 41%;
  }
  .slide{
    position: absolute;
    top: 50%;
    /*width: 50px;*/
    /*height: 50px;*/
  }
  @-webkit-keyframes slide1 {
    0%{
      opacity: 1;
      right: -20%;
    }
    100%{
      opacity: 1;
      right: -11px;
    }
  }
  .slideLeft1{
    /*animation: slide1 .3s;*/
  }
  .slideLeft2{
    animation: show 1s;
  }
  .slideRight1{
    animation: show_right 1s;
  }
  .slideRight2{
    animation: show_right 1s;
  }
  .banner .left {
    width: 100%;
    background-color: #08246c;
    z-index: 2;
    min-width: 376px;
    height: 100%;
    position: relative;
    min-width: 376px;
    border: 1px solid #106498;
    border-radius: 5px;
    /* overflow-y: auto; */
    /* min-width:400px; */
    /* opacity:0.9; */
  }
  .banner .left .leftTop {
    width: 100%;
    height: 5%;
    background-image: url(../../../assets/xzIndex/title1.png);
    background-repeat: no-repeat;
    /*background-size:100% ,100%; */
    background-position-y: 90%;
    background-position-x: 30%;
    background-size: 115%;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .banner .left .leftContent {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    /*padding: 25px 10px;*/
    box-sizing: border-box;
  }
  .banner .left .leftContent .area {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
    /*height: 50%;*/
  }
  .banner .left .leftContent .area .box {
    width: 25%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    min-width: 110px;
    height: 100%;
  }
  .banner .left .leftContent .area .box p {
    width: 100%;
    text-align: center;
    font-style: oblique;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .banner .left .leftContent .area .box .unit {
    color: #5475b9;
    margin-top: 5px;
  }
  .banner .left .leftContent .area .box .pic {
    width: 100%;
    /*height: 50%;*/
    height: 110px;
    background-repeat: no-repeat;
    background-size: 100%;
    animation: fadenum 3s linear infinite;
    position: relative;
  }
  .banner .left .leftContent .area .box .text {
    text-align: center;
    width: 100%;
    /*height: 50%;*/
    height: 110px;
    font-style: oblique;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    position: absolute;
  }
  .banner .left .leftContent .area .box:first-child .pic {
    background-image: url(../../../assets/xzIndex/01.png);
  }
  .banner .left .leftContent .area .box:nth-child(2) .pic {
    background-image: url(../../../assets/xzIndex/02.png);
  }
  .banner .left .leftContent .area .box:nth-child(3) .pic {
    background-image: url(../../../assets/xzIndex/03.png);
  }
  .banner .left .leftContent .chara {
    background-image: url(../../../assets/xzIndex/box.png);
    background-repeat: no-repeat;
    background-size: 90%;
    width: 100%;
    height: 10%;
    margin-top: 10px;
    background-position-x: 17px;
  }
  .banner .left .leftContent .chara div {
    text-align: center;
    margin: 0 auto;
    width: 80%;
    margin-top: -15px;
    color: #fff;
    font-size: 12px;
  }
  .banner .left .leftContent .company {
    text-align: center;
    margin: 0 auto;
    width: 95%;
    margin-top: 10px;
    color: #fff;
  }
  .banner .left .leftContent .chara span {
    font-size: 22px;
    margin: 0 5px;
    color: #36e5b3;
    font-style: oblique;
  }
  .banner .left .leftContent .company span {
    font-size: 20px;
    margin: 0 5px;
    color: #f7dc71;
    font-style: oblique;
  }
  .banner .left .leftBottom {
    width: 100%;
    overflow:hidden;
  }
  .banner .left .leftBottomTop {
    background-image: url(../../../assets/xzIndex/标题2.png);
    background-repeat: no-repeat;
    height: 10%;
    /* background-size: 100% ,100%; */
    background-position-y: 100%;
    background-position-x: 30%;
    text-align: center;
    color: #fff;
    background-size: 115%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size: 14px;
  }
  .banner .left .leftBottomList {
    display: flex;
    flex-direction: row;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 90%;
    justify-content: space-around;
    flex-wrap: wrap;
    background-image: url(../../../assets/xzIndex/线BG.png);
    /* background-position-y: 35px; */
    background-repeat: no-repeat;
    background-position-y: 100%;
    background-size: 100%;
  }
  .banner .left .leftBottomList .jd span {
    text-align: center;
    display: inline-block;
    width: 100%;
    color: #fff;
  }
  .banner .left .leftBottomList .small {
    width: 20%;
    height: 20%;
    display:flex;
    align-items:center;
    justify-content:center;
    margin: 5px 5px;
  }
  .banner .left .leftBottomList .middle {
    width: 25%;
    height: 25%;
    margin: 8px 8px;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .banner .left .leftBottomList .large {
    width: 30%;
    height: 30%;
    display:flex;
    align-items:center;
    justify-content:center;
    margin: 10px 10px;
  }
  .banner .left .leftBottomList div.jd {
    background-repeat: no-repeat;
    background-position-y: 20%;
    cursor: pointer;
    background-size: 100%;
  }
  .banner .left .leftBottomList div:nth-child(1) {
    background-image: url(../../../assets/xzIndex/qiu1.png);
    background-size: 100%;
  }
  .banner .left .leftBottomList div:nth-child(2) {
    background-image: url(../../../assets/xzIndex/qiu2.png);
    background-size: 100%;
  }
  .banner .left .leftBottomList div:nth-child(3) {
    background-image: url(../../../assets/xzIndex/qiu3.png);
  }
  .banner .left .leftBottomList div:nth-child(4) {
    background-image: url(../../../assets/xzIndex/qiu4.png);
  }
  .banner .left .leftBottomList div:nth-child(5) {
    background-image: url(../../../assets/xzIndex/qiu5.png);
  }
  .banner .left .leftBottomList div:nth-child(6) {
    background-image: url(../../../assets/xzIndex/qiu6.png);
  }
  .banner .left .leftBottomList div:nth-child(7) {
    background-image: url(../../../assets/xzIndex/qiu7.png);
  }
  .banner .left .leftBottomList div:nth-child(8) {
    background-image: url(../../../assets/xzIndex/qiu8.png);
  }
  .banner .left .leftBottomList div:nth-child(9) {
    background-image: url(../../../assets/xzIndex/qiu3.png);
  }
  .banner .center {
    width: 50%;
  }
  .banner .right {
    width: 100%;
    height: 100%;
    min-width: 376px;
    background-color: #08246c;
    z-index: 2;
    min-width: 376px;
    border: 1px solid #106498;
    border-radius: 5px;
    /*min-width:400px;*/
    /*opacity:0.9;*/
  }
  .banner .left .leftTop p {
    font-size: 15px;
    color: #fff;
  }
</style>
