<template>
  <div class="Screen3fp3">
  <div class="toppanel">
    <div class="videopanel">
      <div class="video">
      </div>
    </div>
    <div class="videopanel">
      <div class="video">
      </div>
    </div>
    <div class="videopanel">
      <div class="video">
      </div>
    </div>
    <div class="videopanel">
      <div class="video">
      </div>
    </div>
  </div>
  <div class="bottompanel">
    <div class="leftpanel">
      <div class="content jiao_bg" >
        <div class="yuqingheader">
          <div class="yuqingtitle">
            网络舆情
          </div>
           <div class="moreIcon"></div>
        </div>
        <div class="yuqingcontent">
          <div v-for="Obj in yuqingmsgList" :key="Obj.title" class="yuqingmsg">
            <div class="yuqingmsg_title">
              <span>{{Obj.title}}</span>
            </div>
            <div class="yuqingmsg_from">
              <div class="hotIcon" v-if="Obj.ishot=='1'"></div>
              <span>{{Obj.from}}</span>
            </div>
            <div class="yuqingmsg_time">
              <span>{{Obj.time}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightpanel">
      <div class="content jiao_bg">
        <div class="clryheader">
          <div class="bgcolor">
          </div>
          <div class="cltitle">
            <div class="carIcon"></div>
            <div class="carInfo">
              <div class="carNum">19</div>
              <div class="carName">重点车辆</div>
            </div>
          </div>
          <div class="separator"></div>
          <div class="rytitle">
            <div class="RyIcon"></div>
            <div class="RyInfo">
              <div class="RyNum">19</div>
              <div class="RyName">重点人员</div>
            </div>
          </div>
        </div>
        <div class="clpanel">
            <div class="clheader">
              <div class="zdcltitle">
                重点车辆
              </div>
            </div>
             <div class="clcontent">
               <div class="clpicpanel">
                 <img style="width:100%;height:100%;" src="http://50.89.32.104:51002/djwt/Picture/2020/7/21/11/ca7bcc30-f48d-41cb-9987-26990ff391c5.jpg" />
               </div>
               <div class="clinfopanel">
                 <div class="infoline">
                    <span class="titlespan">车牌：</span>
                    <span class="infospan">{{zdclObj.cph}}</span>
                 </div>
                  <div class="infoline">
                    <span class="titlespan">车牌颜色：</span>
                    <span class="infospan">{{zdclObj.hpys}}</span>
                 </div>
                 <div class="infoline">
                    <span class="titlespan">地点：</span>
                    <span class="infospan">{{zdclObj.add}}</span>
                 </div>
                 <div class="infoline">
                    <span class="titlespan">时间：</span>
                    <span class="infospan">{{zdclObj.time}}</span>
                 </div>
               </div>
             </div>
        </div>
        <div class="rypanel">
            <div class="clheader">
              <div class="zdcltitle">
                重点人员
              </div>
            </div>
             <div class="clcontent">
               <div class="rypicpanel">
                 <div style="width:50%;height:100%;">
                   <img style="width:100%;height:100%;" src="http://50.89.32.104:51002/djwt/Picture/2020/7/21/11/ca7bcc30-f48d-41cb-9987-26990ff391c5.jpg" />
                 </div>
                 <div style="width:50%;height:100%;">
                   <img style="width:100%;height:100%;" src="http://50.89.32.104:51002/djwt/Picture/2020/7/21/11/ca7bcc30-f48d-41cb-9987-26990ff391c5.jpg" />
                 </div>
               </div>
               <div class="ryinfopanel">
                <div class="infoline">
                    <span class="titlespan">姓名：</span>
                    <span class="infospan">{{zdryObj.name}}</span>
                 </div>
                <div class="infoline">
                    <span class="titlespan">性别：</span>
                    <span class="infospan">{{zdryObj.sex}}</span>
                 </div>
                 <div class="infoline">
                    <span class="titlespan">身份证号：</span>
                    <span class="infospan">{{zdryObj.sfhm}}</span>
                 </div>
                 <div class="infoline">
                    <span class="titlespan">地点：</span>
                    <span class="infospan">{{zdryObj.add}}</span>
                 </div>
               </div>
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
  name: 'Screen3fp3',
  components:{},
  props:[],
  data () {
    return {
      yuqingmsgList:[
        {"title":"启东规划重点学区，按学校周边...","from":"启东新闻网","time":"17:30","ishot":"1"},
        {"title":"国内多地叫停！这样手机扫码支付，很危险...","from":"启东新闻网","time":"06:06","ishot":"1"},
        {"title":"国内多地叫停！这样手机扫码支付，很危险...","from":"新华社","time":"13:30","ishot":"0"},
        {"title":"钱房两空！男子买二手，房被骗170万","from":"燕赵都市报","time":"12:12","ishot":"0"},
        {"title":"国内多地叫停！这样手机扫码支付，很危险...","from":"新华社","time":"13:30","ishot":"0"},
        {"title":"钱房两空！男子买二手，房被骗170万","from":"燕赵都市报","time":"12:12","ishot":"0"},
      ],
      zdclObj:{
        "cph":"辽GYB589",
        "hpys":"蓝色",
        "add":"公园路民乐路（双向）",
        "time":"2020-07-21 11:49:59",
      },
      zdryObj:{
        "name":"李玉",
        "sex":"女",
        "sfhm":"321951165433315234",
        "add":"公园路民乐路（双向）",
      },
    }
  },
  methods:{
  },
  mounted(){
  },
  beforeDestroy(){
  },
  watch : { 
  }
}
</script>
<style scoped>
.Screen3fp3{
  width: 100%;
  overflow:hidden;
  background:url(./../../../assets/datascreen/qidong/fp2/bg.png) no-repeat;
  background-size:100% 100%;
  background-color: #0a1e34;
  height: 100%;
  z-index: -1;
}
.toppanel{
  width: 100%;
  height: 50%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.bottompanel{
  width: 100%;
  height: 50%;
  display: flex;
}
.leftpanel{
 width: 50%;
 height: 100%;
 padding: 6px 6px;
}
.rightpanel{
 width: 50%;
 height: 100%;
 padding: 6px 6px;
}
.content{
  width: 100%;
  height: 100%;
}
.videopanel{
  width: 50%;
  height: 50%;
  padding: 6px 6px;
  /* border: 1px solid white; */
}
.video{
  width: 100%;
  height: 100%;
  /* border: 1px solid white; */
}
.jiao_bg{
 background-image: url(./../../../assets/datascreen/qidong/fp2/top_left.png),
      url(./../../../assets/datascreen/qidong/fp2/top_right.png),
      url(./../../../assets/datascreen/qidong/fp2/bot_left.png),
      url(./../../../assets/datascreen/qidong/fp2/bot_right.png);
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-position: top left, top right, bottom left, bottom right;
  z-index: 1;
  padding: 2px 2px 2px 2px;
  box-shadow:inset 0px 0px 46px 0px rgba(18, 146, 255, .16);
}
.yuqingheader{
  width: 100%;
  height:20%;
  position: relative;
}
.yuqingcontent{
  width: 100%;
  height:80%;
}
.yuqingtitle{
  width: 90px;
  height: 28px;
  background-image: url(./../../../assets/datascreen/qidong/fp2/img_title_bg.png);
  background-repeat:initial;
  background-size: 100%;
  position: absolute;
  left: calc( 50% -  45px );
  top: calc( 50% -  14px );
  text-align: center;
  font-size: 14px;
  line-height: 28px;
  color: #00D9DB;
}
.moreIcon{
  width: 18px;
  height: 17px;
  background-image: url(./../../../assets/datascreen/qidong/fp2/icon_more.png);
  background-repeat:initial;
  background-size: 100%;
  position: absolute;
  right: 10px;
  top: calc( 50% -  8.5px );
}
.yuqingmsg{
  height: 15%;
  padding: 0 10px;
  border-bottom: 1px solid #114474;
  position: relative;
}
.yuqingmsg_title{
  position: absolute;
  font-size: 12px;
  color: white;
  top: 10px;
  left: 10px;
}
.yuqingmsg_from{
  font-size: 12px;
  color: #4893CF;
  position: absolute;
  top: 30px;
  left: 10px;
  display: flex;
}
.yuqingmsg_time{
  font-size: 12px;
  color: #4893CF;
  position: absolute;
  top: 30px;
  right: 10px;
}
.hotIcon{
  width: 11px;
  height: 12px;
  margin: 2px 5px 0 0;
  background-image: url(./../../../assets/datascreen/qidong/fp2/icon_hot.png);
  background-repeat:initial;
  background-size: 100%;
}
.clryheader{
  width: 100%;
  height:20%;
  display: inline-flex;
  position: relative;
  /* background: #00D9DB; */
}
.bgcolor{
  width: 100%;
  height:80%;
  display: inline-flex;
  position: absolute;
  background:url(./../../../assets/datascreen/qidong/fp2/img_top_bg.png) no-repeat;
  background-size:100% 100%;
  top:10%;
}
.separator{
  position: absolute;
    width: 1px;
    height: 54px;
    background: 
    url(./../../../assets/datascreen/qidong/fp2/separator.png)  no-repeat;
    left: calc( 50% -  0.5px );
    top: calc( 50% -  27px );
}
.cltitle{
width: 50%;
height: 100%;
position: relative;
}
.carIcon{
    position: absolute;
    width: 40px;
    height: 40px;
    background: 
    url(./../../../assets/datascreen/qidong/fp2/img_zd_car.png)  no-repeat;
    left: calc( 30% -  20px );
    top: calc( 50% -  20px );
}
.carInfo{
 position: relative;
 width: 50px;
 height: 40px;
 left: calc( 60% -  25px );
 top: calc( 50% -   20px );
  text-align: center;
}
.carNum{
  clear: both;
 position: absolute;
 font-size: 24px;
 top: 10px;
 display: block;
 color: #D5AC2C;
 top: -5px;
 left: 7px;
 font-family: "Digitalt";
}
.carName{
  clear: both;
  position: absolute;
  bottom: 10px;
  width:50px;
  color: #00D9DB;
  display: block;
  top: 25px;
}
.rytitle{
width: 50%;
height: 100%;
position: relative;
}
.RyIcon{
    position: absolute;
    width: 40px;
    height: 40px;
    background: 
    url(./../../../assets/datascreen/qidong/fp2/img_zd_tail.png)  no-repeat;
    left: calc( 30% -  20px );
    top: calc( 50% -  20px );
}
.RyInfo{
 position: relative;
 width: 50px;
 height: 40px;
 left: calc( 60% -  25px );
 top: calc( 50% -   20px );
  text-align: center;
}
.RyNum{
  clear: both;
 position: absolute;
 font-size: 24px;
 top: 10px;
 display: block;
 color: #D5AC2C;
 top: -5px;
 left: 7px;
 font-family: "Digitalt";
}
.RyName{
  clear: both;
  position: absolute;
  bottom: 10px;
  width:50px;
  color: #00D9DB;
  display: block;
  top: 25px;
}
.clpanel{
  width:100%;
  height: 38%;
}
.rypanel{
  width:100%;
  height: 38%;
}
.clheader{
  width: 100%;
  height: 30%;
  position: relative;
}
.clcontent{
  width:100%;
  height: 70%;
}
.zdcltitle{
  width: 90px;
  height: 28px;
  background-image: url(./../../../assets/datascreen/qidong/fp2/img_title_bg.png);
  background-repeat:initial;
  background-size: 100%;
  position: absolute;
  left: calc( 50% -  45px );
  top: calc( 50% -  14px );
  text-align: center;
  font-size: 14px;
  line-height: 28px;
  color: #00D9DB;
}
.clcontent{
  background-image: url(./../../../assets/datascreen/qidong/fp2/top_left.png),
      url(./../../../assets/datascreen/qidong/fp2/top_right.png),
      url(./../../../assets/datascreen/qidong/fp2/bot_left.png),
      url(./../../../assets/datascreen/qidong/fp2/bot_right.png);
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-position: top left, top right, bottom left, bottom right;
  z-index: 1;
  padding: 2px 2px 2px 2px;
  box-shadow:inset 0px 0px 46px 0px rgba(18, 146, 255, .16);
  display: inline-flex;

}
.clpicpanel{
  height: 100%;
  width: 45%;
  padding:9px;
}
.clinfopanel{
  height: 100%;
  width: 55%;
  position: relative;
}
.infoline{
  margin: 5px 0 0 20%;
}
.titlespan{
  color:#D5AC2C;
}
.infospan{
  color: white;
}
.rypicpanel{
  height: 100%;
  width: 45%;
  padding:9px;
  display: inline-flex;
}
.ryinfopanel{
  height: 100%;
  width: 55%;
  position: relative;
}
</style>
