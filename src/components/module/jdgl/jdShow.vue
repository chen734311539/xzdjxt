<template style="width:100%;height:100%;">
  <div class="banner">
  <!-- 左侧 -->
    <div class="" style="width: 20%;height: 93%;position: relative" >
      <transition name="show">
        <div class="left" v-if="isShow">
          <div class="leftTop">
            <p>春晓社区简介</p>
          </div>
          <div class="leftContent" style="height:35%;">
            <div class="area">
              <div class="box">
                <div class="pic"></div>
                <div class="text">12.9</div>
                <p>总面积</p>
                <p class="unit">万平方公里</p>
              </div>
              <div class="box">
                <div class="pic"></div>
                <div class="text">3</div>
                <p>总面积</p>
                <p class="unit">万平方公里</p>
              </div>
              <div class="box">
                <div class="pic"></div>
                <div class="text">2.9</div>
                <p>总面积</p>
                <p class="unit">万平方公里</p>
              </div>
            </div>
            <div class="chara">
              <div>
                <span>2</span>个市场 <span>2</span>个大商圈 <span>2</span>个大特色
              </div>
            </div>
            <div class="company">
              <div>街道连续<span>2</span>年被市委.市政府评为平安先进单位，</div>
              <div>并获得<span>省级文明街道称号</span></div>
            </div>
          </div>
          <div class="leftContent" style="justify-content: space-around;height: 25%">
            <div class="leftBottomTop" style="width: 100%;height: 20%;">
              <p>社区网格信息</p>
            </div>
            <div class="wg" v-for="(item,index) in 4" :key="index" @click="toPath(item)">
              <div class="pic"></div>
              <div class="text">
                <p style="font-size: 0.16rem;width:100%;color:#FFFFFF;text-align: center;">第{{computedList(index + 1)}}网格</p>
                <span style="">朱玉琦</span>
                <span style="color: #a2bbfa">网格长</span>
                <span class="phone">17520214717</span>
                <span class="border" style="cursor: pointer">拨打</span>
              </div>
            </div>
          </div>
          <div class="leftBottom" style="height:35%">
            <div class="leftBottomTop">
              <p>微嘉园</p>
            </div>
            <div class="leftBottomList" style="height:90%;overflow: hidden">
              <div v-for="(item,index) in 3" :key="index">
                <div class="title">61%</div>
                <div class="status">处理中</div>
                <div class="detail" @click="toDetail(item)">查看详情</div>
                <div class="number">
                    <span style="font-size: 16px">32564</span>
                    <span>/件</span>
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

  <!-- 中间弹框部分-->
    <div class="center" v-if="drawStatus">
      <div class="draw">
        <div class="title">
          <p>微嘉园详细信息</p>
          <i style="color: #fff; cursor: pointer" @click="closeDraw">X</i>
        </div>
      </div>
    </div>

  <!-- 右侧 -->
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
  components: { Map,EchartsWg },
  data() {
    return {
      xcjd: {},
      list: [],
      drawStatus:false,
      isShow:true,
      showRight:true,
    };
  },
  computed: {
    ...mapState({}),
  },
  created() {
    console.log(this.$route);
  },
  methods: {
    computedList(i){
      var arr = ['零',"一","二","三","四","五"];
      return  arr[i]
    },
    slide(){
      this.isShow = !this.isShow;
    },
    rightStatus(){
      this.showRight = !this.showRight;
    },
    toDetail(item){
      this.drawStatus = !this.drawStatus;
    },
    closeDraw(item){
      this.drawStatus = !this.drawStatus;
    },
    toPath(item) {
      this.$router.push({
        path: "/wggl",
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
  height:100%;
  position: relative;
  border: 1px solid #106498;
  border-radius: 5px;
  /* overflow-y: auto; */
  min-width: 376px;
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
  background-size:115%;
}
  .banner .left .wg{
    width: 48%;
    margin: 5px 0;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 2%;
    box-sizing: border-box;
    justify-content: space-between;
    background-image: url(../../../assets/xzIndex/头像背景.png);
    /* background-position-x: -40px; */
    background-size: 100%;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .banner .left .wg>.text{
    width: 70%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 1%;
  }
  .banner .left .wg>.text span {
    color: #fff;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
    //transform: scale(0.8);
    font-size: 0.12rem;
    /*  line-height:16px;
      height:16px; */
  }
  .banner .left .wg>.text .border {
    border: 1px solid #21ceca;
    height: 20px;
    color: #21ceca;
    border-radius: 5px;
    padding: 0px 2px;
    box-sizing: border-box;
  }
  .banner .left .wg>.pic {
    width: 30%;
    height: 100%;
    background-image: url(../../../assets/xzIndex/wg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
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
  height: 15%;
  margin-top: 10px;
  background-position-x: 17px;
}
.banner .left .leftContent .chara div {
  text-align: center;
  margin: 0 auto;
  width: 80%;
  margin-top: -15px;
  color: #fff;
}
.banner .left .leftContent .company {
  text-align: center;
  margin: 0 auto;
  width: 80%;
  /*margin-top: 10px;*/
  height: 20%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.banner .left .leftContent .chara span {
  font-size: 0.24rem;
  margin: 0 0.05rem;
  color: #36e5b3;
  font-style: oblique;
}
.banner .left .leftContent .company span {
  font-size: 0.26rem;
  margin: 0 5px;
  color: #f7dc71;
  font-style: oblique;
}
.banner .left .leftBottom {
  width: 100%;
  padding: 5px 0;
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
.banner .left .leftBottomTop> p{
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100%;
}
.banner .left .leftBottomList {
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  box-sizing: border-box;
  width: 100%;
  height: 90%;
  justify-content: space-between;
  flex-wrap: wrap;
}
.banner .left .leftBottomList>div {
  display: flex;
  flex-direction: row;
  padding: 8px;
  height: 31%;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  margin: 3px auto;
  background-repeat: no-repeat;
  background-size: 95%;
  justify-content: space-between;
  flex-wrap: wrap;
  background-position-y: 6px;
}
.banner .left .leftBottomList>div:nth-child(1){
  background-image: url(../../../assets/xzIndex/toding.png);
}
  .banner .left .leftBottomList>div:nth-child(2){
  background-image: url(../../../assets/xzIndex/todo.png);
    background-position-y: 8px;
    background-position-x: 4px;
}
  .banner .left .leftBottomList>div:nth-child(3){
  background-image: url(../../../assets/xzIndex/unTodo.png);
}
/*.banner .left .leftBottomList .iden {*/
/*  background-image: url(../../../assets/xzIndex/iden.png);*/
/*  width: 25px;*/
/*  height: 25px;*/
/*  display: inline-block;*/
/*  background-repeat: no-repeat;*/
/*  text-align: center;*/
/*  line-height: 25px;*/
/*  color: #fff;*/
/*}*/
.banner .left .leftBottomList .status{
  width: 20%;
  display: flex;
  margin-top: 5px;
  /*justify-content: center;*/
  /*align-items: center;*/
  height: 25%;
  font-style: oblique;
  color: #FFFFFF;
}
.banner .left .leftBottomList .number{
  position: absolute;
  bottom: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  color: #FFFFFF;
  letter-spacing: 1pt;
  font-style: oblique;
}
  .banner .left .leftBottomList .number>span{
    margin: 0 3px;
  }
.banner .left .leftBottomList .detail{
  width: 35%;
  color: #3ea7d2;
  display: flex;
  height: 50%;
  /*align-items: center;*/
  justify-content: center;
  cursor: pointer;
}
.banner .left .leftBottomList .title {
  width: 39%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.banner .center {
  width: 50%;
  height: 100%;
}
.banner>.center .draw {
  width: 60%;
  height: 40%;
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
.banner .right {
  width: 100%;
  min-width: 320px;
  height:100%;
  background-color: #08246c;
  z-index: 2;
  min-width: 376px;
  border: 1px solid #106498;
  border-radius: 5px;
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
