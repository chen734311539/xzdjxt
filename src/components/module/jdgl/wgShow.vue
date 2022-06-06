<template style="width:100%;height:100%;">
  <div class="banner">
<!--  左侧-->
    <div class="" style="width: 20%;height: 93%;position: relative" >
      <transition name="show">
        <div class="left" v-if="isShow">
          <div class="leftTop">
            <p>春晓社区第二网格信息</p>
          </div>
          <div class="leftContent" style="height:95%">
            <div class="area">
              <div class="box" v-for="(item, index) in 6" :key="index">
                <div class="pic"></div>
                <div class="text">
                  <span style="font-size: 14px">朱玉琦</span>
                  <span style="color: #a2bbfa">网格长</span>
                  <span class="phone">17520214717</span>
                  <span class="border" style="cursor: pointer">拨打</span>
                </div>
              </div>
            </div>
            <div class="chara">
              <div class="header">
                <div class="pic"></div>
                <p>三官一师</p>
                <div class="pic"></div>
              </div>
              <div class="context">
                <div class="box" v-for="(item, index) in 4" :key="index">
                  <div class="text">
                    <span style="">朱玉琦</span>
                    <span style="color: #a2bbfa">警官</span>
                    <div class="phone">
                  <span class="mobile" style="width: 70%; color: #31f2d4"
                  >17520214717</span
                  >
                      <span class="border" style="color: black" @click="call"
                      >拨打</span
                      >
                    </div>
                  </div>
                </div>
                <div class="position previous"></div>
                <div class="position next"></div>
              </div>
            </div>
            <div class="chara">
              <div class="header" style="border: 1px solid #2f4e88">
                <div class="pic"></div>
                <p>村社区干部联系网络</p>
                <div class="pic"></div>
              </div>
              <div class="net">
                <div class="box">
                  <div class="name">
                    <i></i>
                    <span class="title" style="font-size: 16px; color: #fff"
                    >朱玉琦</span
                    >
                    <span class="space" style="font-size: 16px; color: #fff"></span>
                  </div>
                  <div>
                    <i class="circular"></i>
                    <span class="title" style="color: #fff">白校园一期</span>
                    <span class="space" style=""></span>
                  </div>
                  <div>
                    <i class="circular" style="background: #2effdf"></i>
                    <span class="title" style="color: #2effdf">17520214717</span>
                    <span class="space call">拨打</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="chara">
              <div class="header" style="border-bottom: 1px solid #2f4e88">
                <div class="pic"></div>
                <p>机关微网格长联系网络</p>
                <div class="pic"></div>
              </div>
              <div class="list">
                <div class="context" style="border: none">
                  <div class="boxList" v-for="(item, index) in 4" :key="index">
                    <i class=""></i>
                    <p style="font-size: 16px; color: #fff">沈峰</p>
                    <span style="color: #fff">春晓苑社区二期</span>
                    <span style="color: #31f2d4">17520214717</span>
                    <span style="color: #31f2d4; cursor: pointer">拨打</span>
                  </div>
                  <div class="position previous"></div>
                  <div class="position next"></div>
                </div>
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
      <div class="slide slideLeft2" style="" v-if="!isShow" @click="slide">
        <img src="@/assets/xzIndex/leftcontent_show.png" alt="">
      </div>

    </div>

<!--中间弹框部分-->
    <div class="center" v-if="drawStatus">
      <div class="draw">
        <div class="title">
          <p>恒创 百晓源二七凌云居2幢</p>
          <i style="color: #fff; cursor: pointer" @click="closeDraw">X</i>
        </div>
        <div class="content">
          <div v-for="(item, index) in 13" :key="index" style="margin: 5px 0">
            <span>户籍人口：</span>
            <span>91</span>
          </div>
        </div>
        <div class="flag">
          <div>
            <i></i>
            <span>党员</span>
          </div>
          <div>
            <i></i>
            <span>重点人口</span>
          </div>
          <div>
            <i></i>
            <span>出租房</span>
          </div>
          <div>
            <i></i>
            <span>企业</span>
          </div>
        </div>
        <div class="list">
          <div class="box" v-for="(item, index) in 6" :key="index">
            <div class="drawLeft">
              <span>1F</span>
            </div>
            <div class="drawRight">
              <span>101室</span>
              <span>102室</span>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--    右侧-->
    <div class="" style="width: 20%;height: 93%;position: relative">
        <div class="right" v-if="showRight" style="position: relative">
          <EchartsWg></EchartsWg>

          <!--    右侧展开-->
          <div class="slide slideRight1" style="left: -20px" v-if="showRight" @click="rightStatus">
            <img src="@/assets/xzIndex/leftcontent_show.png" alt="">
          </div>
        </div>

      <!--    右侧展开-->
      <div class="slide slideRight2" style="right: 0" v-if="!showRight"  @click="rightStatus">
        <img src="@/assets/xzIndex/leftcontent_hide.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import "echarts-gl";
import Map from "@/components/map/Map";
import EchartsWg from "@/components/module/jdgl/echartsWg";
import Constants from "@/constants/Constants";
import { mapState } from "vuex";
export default {
  name: "banner",
  components: { Map, EchartsWg },
  data() {
    return {
      xcjd: {},
      list: [],
      isShow:true,
      showRight:true,
      optionData: [
        {
          name: "等级房屋",
          value: 251103,
          itemStyle: {
            color: "#715625",
          },
        },
        {
          name: "出租房屋",
          value: 18740,
          itemStyle: {
            color: "#3691bd",
          },
        },
      ],
      userList: [],
      drawStatus: true,
      option: {},
    };
  },
  computed: {
    ...mapState({}),
  },
  mounted() {},
  created() {
    // console.log(this.$route);
  },
  methods: {
    slide(){
      this.isShow = !this.isShow;
    },
    rightStatus(){
      this.showRight = !this.showRight;
    },
    getdate(num) {
      var date1 = new Date();
      //今天时间
      //var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
      //console.log(time1);
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() + num);
      //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
      //  var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
      var time2 = date2.getMonth() + 1 + "-" + date2.getDate();
      return time2;
    },
    call() {},
    closeDraw() {
      this.drawStatus = false;
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

  .slide{
    position: absolute;
    top: 50%;
    /*width: 50px;*/
    /*height: 50px;*/
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
.banner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
    position: relative;
    justify-content: space-between;
 }

.banner .left {
  width: 100%;
  background-color: #08246c;
  z-index: 2;
  min-width: 376px;
  position: relative;
  border: 1px solid #106498;
  border-radius: 5px;
  /* overflow-y: auto; */
  height: 100%;
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
}

.banner .left .leftContent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}

.banner .left .leftContent .area {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.banner .left .leftContent .area .box {
  width: 48%;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 15px 10px;
  box-sizing: border-box;
  justify-content: space-between;
  background-image: url(../../../assets/xzIndex/头像背景.png);
  /* background-position-x: -40px; */
  background-size: 100%;
  background-repeat: no-repeat;
}

.banner .left .leftContent .area .box .pic {
  width: 40px;
  height: 40px;
  background-image: url(../../../assets/xzIndex/头像.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.banner .left .leftContent .area .box .text {
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.banner .left .leftContent .area .box .text span {
  color: #fff;
  display: inline-block;
  transform: scale(0.8);
  font-size: 12px;
  /*  line-height:16px;
    height:16px; */
}

.banner .left .leftContent .area .box .text .border {
  border: 1px solid #21ceca;
  color: #21ceca;
  height: 20px;
  border-radius: 5px;
  padding: 0px 2px;
  box-sizing: border-box;
}

.banner .left .leftContent .area .box .text .phone {
  color: #21ceca;
}

.banner .left .leftContent .chara {
  width: 100%;
  margin: 5px 0;
}

.banner .left .leftContent .chara .context .boxList {
  display: flex;
  flex-direction: row;
  border: 1px solid #2f4e88;
  width: 100%;
  padding: 5px;
  margin: 2px 0;
  justify-content: space-between;
  border-radius: 5px;
}

.banner .left .leftContent .chara .context .boxList i {
  background-image: url(../../../assets/xzIndex/党员.png);
  background-repeat: no-repeat;
  background-size: 90%;
  display: inline-block;
  width: 15px;
  height: auto;
  background-position-y: 5px;
}

.banner .left .leftContent .chara .context {
  width: 100%;
  border: 1px solid #2f4e88;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
}

.banner .left .leftContent .chara .net {
  border: 1px solid #2f4e88;
  width: 100%;
  padding: 10px 0;
}

.banner .left .leftContent .chara .net > .box {
  width: 40%;
  margin: 0 auto;
}

.banner .left .leftContent .chara .net > .box div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.banner .left .leftContent .chara .net > .box div span {
  display: inline-block;
  text-align: center;
}

.banner .left .leftContent .chara .net > .box div i {
}

.banner .left .leftContent .chara .net > .box div .circular {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  color: #fff;
  background: #b0d3ff;
}

.banner .left .leftContent .chara .net > .box div .title {
  width: 60%;
  word-break: break-all;
}

.banner .left .leftContent .chara .net > .box div .space {
  width: 20%;
}

.banner .left .leftContent .chara .net > .box div .call {
  width: 30px;
  max-height: 20px;
  border: 1px solid #2effdf;
  color: #2effdf;
  border-radius: 5px;
  font-size: 12px;
  transform: scale(0.8);
  cursor: pointer;
}

.banner .left .leftContent .chara .net > .box div .border {
}

.banner .left .leftContent .chara .net > .box div.name i:first-child {
  background-image: url(../../../assets/xzIndex/党员.png);
  background-position-y: 5px;
  background-repeat: no-repeat;
  background-size: 90%;
  display: inline-block;
  width: 15px;
  height: 25px;
}

.banner .left .leftContent .chara .context .position {
  position: absolute;
  width: 40px;
  top: 50%;
  margin-top: -20px;
  height: 40px;
  background-repeat: no-repeat;
  cursor: pointer;
}

.banner .left .leftContent .chara .context .previous {
  background-image: url(../../../assets/xzIndex/left.png);
  left: 0;
}

.banner .left .leftContent .chara .context .next {
  background-image: url(../../../assets/xzIndex/right.png);
  right: 0;
  background-position-x: right;
}

.banner .left .leftContent .chara .context .next {
}

.banner .left .leftContent .chara .context .box {
  width: 50%;
  height: 60px;
  background-image: url(../../../assets/xzIndex/三官一师BG.png);
  background-repeat: no-repeat;
  background-size: 90%;
  background-position: center;
}

.banner .left .leftContent .chara .context .box .text {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
}

.banner .left .leftContent .chara .context .box .text > span {
  display: inline-block;
  text-align: center;
  height: 20px;
  line-height: 20px;
  color: #fff;
}

.banner .left .leftContent .chara .context .box .text > span:first-child {
  font-style: oblique;
  font-size: 18px;
  width: 60%;
}

.banner .left .leftContent .chara .context .box .text .phone {
  background-image: url(../../../assets/xzIndex/拨打.png);
  background-repeat: no-repeat;
  background-position-x: 0;
  background-position-y: 0;
  background-size: 95% 95%;
  margin-top: 5px;
  display: flex;
  width: 100%;
  transform: scale(0.8);
  font-size: 13px;
  color: #205176;
  cursor: pointer;
}

.banner .left .leftContent .chara .context .box .text .phone span {
  font-size: 14px;
}

.banner .left .leftContent .chara .context .box .text > span:nth-child(2) {
  background: #1955d0;
  padding: 0 5px;
  border-radius: 5px;
}

.banner .left .leftContent .chara .header {
  width: auto;
  justify-content: center;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
}

.banner .left .leftContent .chara .header div {
  width: 66px;
  height: 9px;
  background-repeat: no-repeat;
}

.banner .left .leftContent .chara .header .pic:first-child {
  background-image: url(../../../assets/xzIndex/topLeft.png);
}

.banner .left .leftContent .chara .header .pic:nth-child(3) {
  background-image: url(../../../assets/xzIndex/topRight.png);
}

.banner .left .leftContent .chara .header p {
  color: #fff;
  font-size: 14px;
  margin: 0 10px;
  margin-top: -10px;
  max-width: 40%;
  text-align: center;
}

.banner .left .leftContent .company span {
  font-size: 20px;
  margin: 0 5px;
  color: #f7dc71;
  font-style: oblique;
}

.banner .left .leftBottom {
  width: 100%;
}

/*.banner .left .leftBottomTop {*/
/*  background-image: url(../../../assets/xzIndex/标题2.png);*/
/*  background-repeat: no-repeat;*/
/*  height: 10%;*/
/*  !* background-size: 100% ,100%; *!*/
/*  background-position-y: 100%;*/
/*  background-position-x: 30%;*/
/*  text-align: center;*/
/*  color: #fff;*/
/*  background-size: 115%;*/
/*  display:flex;*/
/*  align-items:center;*/
/*  justify-content:center;*/
/*  font-size: 14px;*/
/*}*/
.banner .left .leftBottomList {
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}

.banner .left .leftBottomList .list {
  display: flex;
  flex-direction: row;
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
  flex-wrap: nowrap;
}

.banner .left .leftBottomList .iden {
  background-image: url(../../../assets/xzIndex/iden.png);
  width: 25px;
  height: 25px;
  display: inline-block;
  background-repeat: no-repeat;
  text-align: center;
  line-height: 25px;
  color: #fff;
}

.banner .left .leftBottomList .title {
  width: 80%;
  height: 100%;
  line-height: 25px;
  color: #fff;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.banner .center {
  width: 50%;
  box-sizing: border-box;
}

.banner .center .draw {
  width: 60%;
  background: #08326c;
  display: flex;
  /*padding: 10px;*/
  border: 1px solid #3372c0;
  border-radius: 5px;
  margin: 150px auto;
  border-radius: 5px;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.banner .center .draw .title {
  width: 100%;
  background: #08326c;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  background-image: url(../../../assets/xzIndex/drawTitle.png);
  background-repeat: no-repeat;
  padding: 10px;
}

.banner .center .draw .title p {
  color: #fff;
  width: 60%;
  font-size: 15px;
  letter-spacing: 0.5pt;
  font-weight: 600;
}

.banner .center .draw .content {
  background: #0d3b84;
  box-sizing: border-box;
  padding: 10px 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 10px;
  border-radius: 5px;
}

.banner .center .draw .flag {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 70%;
  margin: 0 auto;
}
.banner .center .draw .flag div>span{
  color: #FFFFFF;
}
.banner .center .draw .list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 15px 0;
}

.banner .center .draw .list .box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 30%;
  margin: 10px 0;
}

.banner .center .draw .list .box .drawLeft {
  text-align: center;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner .center .draw .list .box .drawLeft span {
  font-weight: bold;
  font-size: 18px;
  display: inline-block;
  font-style: oblique;
}

.banner .center .draw .list .box .drawRight {
  /*border: 1px dotted #fff;*/
  background-size: 100% 100%;
  background-image: url(../../../assets/xzIndex/dotted.png);
  //background-size: 100%;
  background-repeat: no-repeat;
  width: 70%;
  text-align: center;
  /*border-radius: 50px;*/
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.banner .center .draw .list .box .drawRight span {
  color: #fff;
}

.banner .center .draw .flag div {
  width: 25%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.banner .center .draw .flag div i {
  display: inline-block;
  width: 15px;
  height: 25px;
  background-position-y: 2px;
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 0 5px;
}

.banner .center .draw .flag div:nth-child(1) i {
  background-image: url(../../../assets/xzIndex/党员.png);
}

.banner .center .draw .flag div:nth-child(2) i {
  background-image: url(../../../assets/xzIndex/重点人口.png);
}

.banner .center .draw .flag div:nth-child(3) i {
  background-image: url(../../../assets/xzIndex/出租房.png);
}

.banner .center .draw .flag div:nth-child(4) i {
  background-image: url(../../../assets/xzIndex/企业.png);
}

.banner .center .draw .content div {
  width: 25%;
}

.banner .center .draw .content div span {
  color: #fff;
  font-weight: 550;
  font-size: 13px;
}

.banner .right {
  width: 100%;
  min-width: 320px;
  background-color: #08246c;
  z-index: 2;
  min-width: 376px;
  border: 1px solid #106498;
  border-radius: 5px;
  /* overflow-y: auto; */
  height: 100%;
  /*min-width:400px;*/
  /*opacity:0.9;*/
}

.banner .left .leftTop p {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #fff;
}
</style>
