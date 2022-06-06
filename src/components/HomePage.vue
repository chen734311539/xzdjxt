<template style="width:100%;height:100%;">
  <div class="home">
    <div class="content">
      <div ref="map" class="mapContentClass"><Map ref="centermap" mapid="hfxmap" @handler="dzHandler"/></div>
      <Header @show-chatpanel="showOrhideChatPanel" @handler="headerBarClick"></Header>
      <div  class="menubar" :class="[isBGcolor?'sysbgcolordark':'sysbgcolorlight']" :style="{width:menuList.length*110+'px'}"  v-show="isShowUI&&!showYbssDiv" > 
        <TopLevelMenu  class="toplevelmenu" v-for="menuObj in menuList" :key="menuObj.menuid" :menu="menuObj" @on-change="moveCurrent"/>
        <!-- <div class="current" :style="{left:currentleft+'px'}"></div> -->
      </div>
      <div v-show="leftContentState.show"  class="leftContentClass" :class="[isBGcolor?'sysbgcolordark':'sysbgcolorlight',leftContentState.left=='0'?'sidetoleft':'sidetoright']" >
        <div class="leftContentBottom">
          <LeftContent_new/>
        </div>
        <div :class="leftContentHideAndShow" @click="hideleft">
        </div> 
      </div>
      <div v-show="isShowMIdContent&&isShowMIdContentByLeft" class="midContentClass" :class="[isBGcolor?'sysbgcolordark':'sysbgcolorlight']" >
        <div v-if="openMenuidList.indexOf('0401')>-1" v-show="currentMenu.menuid=='0401'" style="height:100%;"><AjzcRightPanel ref="ajzc" /></div>
        <div v-if="openMenuidList.indexOf('0402')>-1" v-show="currentMenu.menuid=='0402'" style="height:100%;"><QqfwRightPanel ref="qqfw" /></div>
        <div v-if="openMenuidList.indexOf('0403')>-1" v-show="currentMenu.menuid=='0403'" style="height:100%;"><ZlhcRightPanel ref="zlhc" /></div>
        <div v-if="openMenuidList.indexOf('0405')>-1" v-show="currentMenu.menuid=='0405'" style="height:100%;"><MrhsRightPanel ref="mrhs" /></div>
        <div v-if="openMenuidList.indexOf('0406')>-1" v-show="currentMenu.menuid=='0406'" style="height:100%;"><RyhcRightPanel ref="ryhc" /></div>
        <div v-if="openMenuidList.indexOf('0501')>-1" v-show="currentMenu.menuid=='0501'" style="height:100%;"><SwxxRightPanel ref="swxx" /></div>
        <div v-if="openMenuidList.indexOf('0502')>-1" v-show="currentMenu.menuid=='0502'" style="height:100%;"><XxkbRightPanel ref="xxkb" /></div>
        <div v-if="openMenuidList.indexOf('0503')>-1" v-show="currentMenu.menuid=='0503'" style="height:100%;"><ZdryRightPanel /></div>
        <div v-if="openMenuidList.indexOf('0504')>-1" v-show="currentMenu.menuid=='0504'" style="height:100%;"><SywwRightPanel /></div>
        <div v-if="openMenuidList.indexOf('0505')>-1" v-show="currentMenu.menuid=='0505'" style="height:100%;"><CfjfRightPanel ref="cfjf" /></div>
        <div v-if="openMenuidList.indexOf('0506')>-1" v-show="currentMenu.menuid=='0506'" style="height:100%;"><YyjqRightPanel ref="yyjq" /></div>
        <div v-if="openMenuidList.indexOf('0601')>-1" v-show="currentMenu.menuid=='0601'" style="height:100%;"><YaglRightPanel /></div>
        <div v-if="openMenuidList.indexOf('0701')>-1" v-show="currentMenu.menuid=='0701'" style="height:100%;"><ZzryRightPanel /></div>
        <div v-if="openMenuidList.indexOf('0703')>-1" v-show="currentMenu.menuid=='0703'" style="height:100%;"><JsglRightPanel /></div>
        <div v-if="openMenuidList.indexOf('0706')>-1" v-show="currentMenu.menuid=='0706'" style="height:100%;"><GpsglRightPanel /></div>
        <div v-if="openMenuidList.indexOf('0707')>-1" v-show="currentMenu.menuid=='0707'" style="height:100%;"><CzlogRightPanel /></div>
        <div v-if="openMenuidList.indexOf('0801')>-1" v-show="currentMenu.menuid=='0801'" style="height:100%;"><JqzlRightPanel ref="jqzl" /></div>
        <div v-if="openMenuidList.indexOf('0802')>-1" v-show="currentMenu.menuid=='0802'" style="height:100%;"><ZpxaRightPanel ref="zpxa" /></div>
        <div v-if="openMenuidList.indexOf('0803')>-1" v-show="currentMenu.menuid=='0803'" style="height:100%;"><JqfxRightPanel /></div>
        <div v-if="openMenuidList.indexOf('0804')>-1" v-show="currentMenu.menuid=='0804'" style="height:100%;"><JqbbRightPanel /></div>
        <div v-if="openMenuidList.indexOf('0805')>-1" v-show="currentMenu.menuid=='0805'" style="height:100%;"><JqtjRightPanel /></div>
        <div v-if="openMenuidList.indexOf('1501')>-1" v-show="currentMenu.menuid=='1501'" style="height:100%;"><ZbbqRightPanel /></div>
        <div v-if="openMenuidList.indexOf('1503')>-1" v-show="currentMenu.menuid=='1503'" style="height:100%;"><ZpypRightPanel /></div>
        <div v-if="openMenuidList.indexOf('1504')>-1" v-show="currentMenu.menuid=='1504'" style="height:100%;"><BxgcRightPanel /></div>
        <div v-if="openMenuidList.indexOf('1505')>-1" v-show="currentMenu.menuid=='1505'" style="height:100%;"><DjdaRightPanel /></div>
        <div v-if="openMenuidList.indexOf('1506')>-1" v-show="currentMenu.menuid=='1506'" style="height:100%;"><YqsjRightPanel /></div>
        <div v-if="openMenuidList.indexOf('1608')>-1" v-show="currentMenu.menuid=='1608'" style="height:100%;"><SsyjRightPanel /></div>
        <div v-if="openMenuidList.indexOf('1609')>-1" v-show="currentMenu.menuid=='1609'" style="height:100%;"><HctjRightPanel /></div>
        <div v-if="openMenuidList.indexOf('1610')>-1" v-show="currentMenu.menuid=='1610'" style="height:100%;"><MrtbRightPanel /></div>
        <div v-if="openMenuidList.indexOf('1902')>-1" v-show="currentMenu.menuid=='1902'" style="height:100%;"><LdryRightPanel /></div>
        <div v-if="openMenuidList.indexOf('1903')>-1" v-show="currentMenu.menuid=='1903'" style="height:100%;"><HryjRightPanel /></div>
        <!-- <div v-show="currentMenu.menuid!='1601' &&currentMenu.menuid!='1602' &&currentMenu.menuid!='1605'" class="chatIcon" @click="clickChatIcon"><Icon type="md-chatbubbles" size="26"/></div> -->
      </div>
      <ChatListPanel v-show="showChatPanel"  @show-chatpanel="showOrhideChatPanel"/>
      <!-- <HfxModal :show="true"/> -->
      <!-- 重复报警呼入预警 -->
      <!-- <ShowMatchTel :needshow="needshow" :defaultshow="isShowHryj" /> -->
      <!-- 预警信息（布控预警、ck预警等） -->
      <!-- <YjxxPage :isshow="!showYbssDiv"/> -->
      <YbssLeftPanel v-show="showYbssDiv" @handler="mapEventHandler"/>
      <YbssHeaderPanel v-if="showYbssDiv"/>
      <YbssDzPanel :buildingcode="buildingcode" v-show="showYbssDiv&&showDzDiv" @handler="dzHandler"/>
      <YbssRightPanel  ref="ybssrightpanel"  v-if="showYbssDiv" @handler="dzHandler"/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import LeftContent from '@/components/content/LeftContent'
import LeftContent_new from '@/components/content/LeftContent_new'
import ChatListPanel from '@/components/chat/ChatListPanel'
import Map from '@/components/map/Map'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import ChatPanel from '@/components/module/chat/ChatPanel'
import AjzcRightPanel from '@/components/module/ajzc/AjzcRightPanel'
import QqfwRightPanel from '@/components/module/qqfw/QqfwRightPanel'
import SwxxRightPanel from '@/components/module/swxx/SwxxRightPanel'
import ZlhcRightPanel from '@/components/module/zlhc/ZlhcRightPanel'
import MrhsRightPanel from '@/components/module/mrhs/MrhsRightPanel'
import RyhcRightPanel from '@/components/module/ryhc/RyhcRightPanel'
import XxkbRightPanel from '@/components/module/xxkb/XxkbRightPanel'
import CfjfRightPanel from '@/components/module/cfjf/CfjfRightPanel'
import YyjqRightPanel from '@/components/module/yyjq/YyjqRightPanel'
import ZzryRightPanel from '@/components/module/zzry/ZzryRightPanel'
import JsglRightPanel from '@/components/module/jsgl/JsglRightPanel'
import ZbbqRightPanel from '@/components/module/zbbq/ZbbqRightPanel'
import ZpypRightPanel from '@/components/module/zpyp/ZpypRightPanel'
import BxgcRightPanel from '@/components/module/bxgc/BxgcRightPanel'
import DjdaRightPanel from '@/components/module/djda/DjdaRightPanel'
import YqsjRightPanel from '@/components/module/yqsj/YqsjRightPanel'
import JqfxRightPanel from '@/components/module/jqfx/JqfxRightPanel'
import JqbbRightPanel from '@/components/module/jqbb/JqbbRightPanel'
import JqtjRightPanel from '@/components/module/jqtj/JqtjRightPanel'
import SsyjRightPanel from '@/components/module/ssyj/SsyjRightPanel'
import HctjRightPanel from '@/components/module/hctj/HctjRightPanel'
import MrtbRightPanel from '@/components/module/mrtb/MrtbRightPanel'
import GpsglRightPanel from '@/components/module/gpsgl/GpsglRightPanel'
import CzlogRightPanel from '@/components/module/czlog/CzlogRightPanel'
import JqzlRightPanel from '@/components/module/jqzl/JqzlRightPanel'
import ZpxaRightPanel from '@/components/module/zpxa/ZpxaRightPanel'
import ZdryRightPanel from '@/components/module/zdry/ZdryRightPanel'
import SywwRightPanel from '@/components/module/syww/SywwRightPanel'
import LdryRightPanel from '@/components/module/ldry/LdryRightPanel'
import HryjRightPanel from '@/components/module/hryj/HryjRightPanel'
import YaglRightPanel from '@/components/module/yagl/YaglRightPanel'
import HfxModal from '@/components/base/HfxModal'
import TopLevelMenu from '@/components/menubar/TopLevelMenu'
import ShowMatchTel from '@/components/module/hryj/ShowMatchTel'
import YjxxPage from '@/components/base/YjxxPage'
import YbssLeftPanel from '@/components/module/ybss/YbssLeftPanel'
import YbssRightPanel from '@/components/module/ybss/YbssRightPanel'
import YbssDzPanel from '@/components/module/ybss/YbssDzPanel'
import YbssHeaderPanel from '@/components/module/ybss/YbssHeaderPanel'

export default {
  name: 'HomePage',
  provide(){//父方法传到子页面以供调用（显示有边的页面）
      return{
          initRightPaneldata:this.initRightPaneldata
      }
  },
  components: { ShowMatchTel,HfxModal,TopLevelMenu,Header,LeftContent,LeftContent_new,ChatListPanel,Map,ChatPanel,AjzcRightPanel,QqfwRightPanel,SwxxRightPanel,
  ZlhcRightPanel,MrhsRightPanel,RyhcRightPanel,XxkbRightPanel,CfjfRightPanel,YyjqRightPanel,ZzryRightPanel,JsglRightPanel,ZbbqRightPanel,ZpypRightPanel,
  BxgcRightPanel,DjdaRightPanel,YqsjRightPanel,JqfxRightPanel,JqbbRightPanel,JqtjRightPanel,SsyjRightPanel,HctjRightPanel,MrtbRightPanel,GpsglRightPanel,CzlogRightPanel,JqzlRightPanel,
  ZpxaRightPanel,ZdryRightPanel,SywwRightPanel,LdryRightPanel,HryjRightPanel,YaglRightPanel,YjxxPage,YbssLeftPanel,YbssRightPanel,YbssDzPanel,YbssHeaderPanel},
  data () {
    return {
      websock: null,//建立的连接
      lockReconnect: false,//是否真正建立连接
      timeout: 28*1000,//30秒一次心跳
      timeoutObj: null,//心跳心跳倒计时
      serverTimeoutObj: null,//心跳倒计时
      timeoutnum: null,//断开 重连倒计时
      menuList:[],//菜单
      openNames:[],//菜单默认展开
      chatOpen:false,//判断聊天框是否打开
      showChatPanel:false,
      currentleft:0,//菜单栏选择框位置
      needshow:false,//初始默认不显示呼入预警
      // showYbssDiv:false,
      buildingcode:'',
      showDzDiv:false,
    }
  },
  computed:{
    ...mapState({
    openMenuidList: state => state.openMenuidList,
    currentMenu: state => state.currentMenu,
    userInfo: state => state.userInfo,
    leftContentState:state => state.leftContentState,
    isShowMIdContent:state => state.isShowMIdContent,
    isShowUI:state => state.isShowUI,
    isShowMIdContentByLeft:state => state.isShowMIdContentByLeft,
    isBGcolor:state => state.isBGcolor,
    isShowHryj:state => state.isShowHryj,
    currentJlTypes:state => state.currentJlTypes,
    showYbssDiv:state => state.showYbssDiv,
  }),
  leftContentHideAndShow:function(){
    if(this.leftContentState.left==0){
      return "leftContentHide";
    }else{
      return "leftContentShow";
    };
  }
  },
  created () {
    //推送的内容
    this.initWebSocket();
    //添加水印
    // this.$watermark.set(this.userInfo.usercode);
    //获取menu
    this.http.get("/user/getMenu",null,this.getMenuCallBack,this,false);
  },
  methods:{
    headerBarClick(state,data){
      if(state=='ybss'){
        // this.showYbssDiv = data;
        this.$store.dispatch('putState',{"key":"showYbssDiv","value":data});
        this.hideleft();
        this.$store.dispatch('putState',{"key":"isShowUI","value":false});
      }
    },
    dzHandler(state,data){
      if(state=='click'){
        this.buildingcode = data;
        this.showDzDiv = true;
      }
      if(state=='close'){
        this.showDzDiv = false;
      }
      if(state=='perloc'){
        this.$refs.ybssrightpanel.hideYbssMarks();
      }
      if(state=='locfinish'){
        this.$refs.ybssrightpanel.remarkYbssMarks();
      }
      if(state=='clearybss'){
        this.$refs.ybssrightpanel.clearYbssMark();
      }
    },
    mapEventHandler(state,data){
      if(state == 'mapEvent'){
        if(data=='zyc'){//路况
            var jlarr=this.currentJlTypes;
            if(jlarr.indexOf("9")>0||jlarr.indexOf("10")>0){
              this.$store.dispatch('putState',{"key":"currentJlTypes","value":[]});
            }else{
              var newjlarr=[];
              newjlarr.push("9");
              newjlarr.push("10");
              this.$store.dispatch('putState',{"key":"currentJlTypes","value":newjlarr});
            }
        }
        if(data=='lk'){//路况
          this.$refs.centermap.isShowLk = !this.$refs.centermap.isShowLk;
          this.$refs.centermap.showLkLayer();
        }
        if(data=='xq'){//路况
          this.$refs.centermap.isShowXq = !this.$refs.centermap.isShowXq;
          this.$refs.centermap.changeXq();
        }
      }
    },
    hideleft(){
      if(this.leftContentState.show){
        if(this.leftContentState.left==0){
           this.$store.dispatch('putState',{"key":"leftContentState","value":{'show':true,'left':-387}});
           this.$store.dispatch('putState',{"key":"isShowMIdContentByLeft","value":false});
        }else{
          this.$store.dispatch('putState',{"key":"leftContentState","value":{'show':true,'left':0}});
          this.$store.dispatch('putState',{"key":"isShowMIdContentByLeft","value":true});
        }
      } 
    },
    showmid(){
         if(this.isshowmid){
        this.isshowmid=false;
      }else{
        this.isshowmid=true;
      }
    },
    showOrhideChatPanel(val){
      if(this.showChatPanel){
        this.showChatPanel = false;
      }else{
        this.showChatPanel = true;
      }
    },
    initWebSocket(){
      var session = this.common.getSessionUserInfo();
      if(session==null){//未登录不给连websocket
        return;
      }
      this.websock = new WebSocket(Constants.ws_url);
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen: function () {
      console.log("WebSocket连接成功");
      //开启心跳
      this.start();
    },
    websocketonerror: function (e) {
      console.log("WebSocket连接发生错误");
      //重连
      this.reconnect();
    },
    websocketonmessage: function (e) {
      // console.log(e.data);
      var da = JSON.parse(e.data);
      var type = da.type;
      //收到服务器信息，心跳重置
      this.reset();
      if(type=="ssjq"){//这里后卖面可以优化代码
        if(!this.common.isMyDeptcode(da.data.deptcode)){//不是自己辖区去掉
          return;
        }
        this.$store.dispatch('putChildState',{"key":"push","childkey":"ssjq","value":da.data});
      }else if(type=="chat"){
        if(da.data.insertusercode==this.userInfo.usercode){//自己发的消息不推
          return;
        }
        this.$store.dispatch('putChildState',{"key":"push","childkey":"chat","value":da.data});
      }else if(type=="ssjl"){
        if(!this.common.isMyDeptcode(da.data.deptcode)){//不是自己辖区去掉
          return;
        }
        this.$store.dispatch('putChildState',{"key":"push","childkey":"ssjl","value":da.data});
      }else if(type=="hryj"){
        this.$store.dispatch('putChildState',{"key":"push","childkey":"hryj","value":da.data});
        this.needshow=true;
        setTimeout(()=>{
          this.needshow=false;
        },10000);
      }else if(type=="dkkd"){
        this.$store.dispatch('putChildState',{"key":"push","childkey":"dkkd","value":da.data});
      }else if(type=="bkyj"){
        this.$store.dispatch('putChildState',{"key":"push","childkey":"bkyj","value":da.data});
      }else if(type=="xfyj"){
        this.$store.dispatch('putChildState',{"key":"push","childkey":"xfyj","value":da.data});
      }else if(type=="ckyj"){
        this.$store.dispatch('putChildState',{"key":"push","childkey":"ckyj","value":da.data});
      }
    },
    websocketclose: function (e) {
      //this.websock.close();
      // if(e && e.code){
      //   console.log("connection closed (" + e.code + ")");
      //   //重连
      //   if(e.code=='1000'){
      //     this.reconnect(); 
      //   }  
      // }
    },
    reconnect() {//重新连接
        var that = this;
        if(that.lockReconnect) {
            return;
        };
        that.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        that.timeoutnum && clearTimeout(that.timeoutnum);
        that.timeoutnum = setTimeout(function () {
            //新连接
            that.initWebSocket();
            that.lockReconnect = false;
        },5000);
    },
    reset(){//重置心跳
        var that = this;
        //清除时间
        clearTimeout(that.timeoutObj);
        clearTimeout(that.serverTimeoutObj);
        //重启心跳
        that.start();
    },
    start(){//开启心跳
        var self = this;
        self.timeoutObj && clearTimeout(self.timeoutObj);
        self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
        self.timeoutObj = setTimeout(function(){
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            if (self.websock.readyState == 1) {//如果连接正常
                self.websock.send("heartCheck");
            }else{//否则重连
                self.reconnect();
            }
            self.serverTimeoutObj = setTimeout(function() {
                //超时关闭
                self.websock.close();
            }, self.timeout);

        }, self.timeout)
    },
    getMenuCallBack(data){
       for(var i=0;i<data.length;i++){
        data[i].xh=i;
        if(data[i].menuid=='20'){
          data.splice(i,1);
        }
      }
      this.menuList = data;
    },
    selectMenu(menuname){
      var obj = null;
      for(var i=0;i<this.menuList.length;i++){
            if(this.menuList[i].children){
              for(var j=0;j<this.menuList[i].children.length;j++){
                  if(menuname==this.menuList[i].children[j].menuid){
                    obj = this.menuList[i].children[j];
                    break;
                  }
              }
            }
         }
      if(obj){
        if(this.openMenuidList.indexOf(obj.menuid)==-1){
          var arr2 = [...this.openMenuidList];
          arr2.push(obj.menuid);
          this.$store.dispatch('putState',{"key":"openMenuidList","value":arr2});
        }
        this.$store.dispatch('putState',{"key":"currentMenu","value":obj});
      }
    },
    clickChatIcon(){
      var ismenuOpen = false;
      if(!$(".menuContent").is(':hidden')){//menu show
        ismenuOpen = true;
      }
      this.chatOpen = !this.chatOpen;
      if(this.chatOpen){
        $(".chatContent").show();
        if(ismenuOpen){
          $(".midContentClass").css("width","calc(100% - 371px - 180px - 580px)");;
        }else{
          $(".midContentClass").css("width","calc(100% - 371px - 580px)");;
        }
      }else{
        $(".chatContent").hide();
        if(ismenuOpen){
          $(".midContentClass").css("width","calc(100% - 371px - 180px)");;
        }else{
          $(".midContentClass").css("width","calc(100% - 371px)");;
        }
        
      }
    },
    initRightPaneldata(val,panel){
      this.$refs[panel].initEditValues(val);
    },
    moveCurrent(data){
      this.currentleft=107*data;
    }
  },
  destroyed: function () {
      this.websocketclose();
  }
}
</script>

<style scoped>
.home{
  height: 100%;
  /* width: 1920px; */
  overflow: hidden;
}
.content{
  height: 100%;
  background-color: white;
  width: 100%;
  position: relative;
}
.mapContentClass{
  height:100%;
  width:100%;
  /* z-index:2; */
  position: absolute;
}
.leftContentClass{
  height: calc(100% - 84px);
  margin: 82px 0 2px 2px;
  width: 385px;
  position: absolute;
  /* z-index: 5; */
  background-color: transparent;
  transition:cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow:inset 0 0 30px 0 rgba(22, 121, 154, .52);
}
.sidetoleft{
  left: 0px;
  animation: slide-left 0.5s ease-in;
  -webkit-animation: slide-left 0.5s ease-in;
}
.sidetoright{
  left: -387px;
  animation: slide-right 0.5s ease-in;
  -webkit-animation: slide-right 0.5s ease-in;
}
.leftContentTop{
  height: 30px;
  width: 385px;
  background-color: #0e1f62;
  /* border-top: 2px solid #b6f6ff; */
  /* border-right: 2px solid #b6f6ff;  */
  /* background: */
  /* url(./../assets/leftcontent/leftcontent_bg_top.png)  no-repeat left top; */
}
.leftContentBottom{
  height: 100%;
  width: 385px;
  background-color: transparent;
  /* border-left: 2px solid #b6f6ff; */
  /* border-right: 2px solid #b6f6ff;  */
  background:
  url(./../assets/leftcontent/gaoguang_left.png)  no-repeat 0% 0%,
  url(./../assets/leftcontent/gaoguang_right.png)  no-repeat 100% 100%,
  url(./../assets/leftcontent/img_jiao_topleft.png)  no-repeat 0% 0%,
  url(./../assets/leftcontent/img_jiao_topright.png)  no-repeat 100% 0%,
  url(./../assets/leftcontent/img_jiao_botleft.png)  no-repeat 0% 100%,
  url(./../assets/leftcontent/img_jiao_botright.png)  no-repeat 100% 100%;
}
.midContentClass{
  position: relative;
  height: calc(100% - 83px);
  margin: 82px 2px 2px 8px;
  padding: 15px 15px;
  float: right;
  width: calc(100% - 390px - 10px);
  /* border: 2px solid #b6f6ff; */
  /* display: none; */
  z-index: 4;
  /* background:
  url(./../assets/leftcontent/leftcontent_bg_top.png)  no-repeat left top,
  url(./../assets/leftcontent/midcontent_bg_bottom.png)  no-repeat right bottom;
  background-color: #0b3c61;
  opacity: 0.9; */
  
  background:
  /* url(./../assets/midcontent/midcontent_bg_left.png)  no-repeat left 200%,
  url(./../assets/midcontent/midcontent_bg_right.png)  no-repeat right -100%,
  url(./../assets/midcontent/midcontent_bg_bottom.png)  no-repeat bottom center; */
  url(./../assets/leftcontent/gaoguang_left.png)  no-repeat 0% 0%,
  url(./../assets/leftcontent/gaoguang_right.png)  no-repeat 100% 100%,
  url(./../assets/leftcontent/img_jiao_topleft.png)  no-repeat 0% 0%,
  url(./../assets/leftcontent/img_jiao_topright.png)  no-repeat 100% 0%,
  url(./../assets/leftcontent/img_jiao_botleft.png)  no-repeat 0% 100%,
  url(./../assets/leftcontent/img_jiao_botright.png)  no-repeat 100% 100%;
  box-shadow:inset 0 0 40px 0 rgba(22, 121, 154, .52);
  /* box-shadow: 0 0 3px 0 #1234ac;
  background-color: rgba(8, 56, 90, 0.90); */
  animation: slide-mincontent 0.5s ease-in;
  -webkit-animation: slide-mincontent 0.5s ease-in;
}
.menuContent{
  height:100%;
  background: rgb(29, 30, 35);
  width: 180px;
  float: left;
  display:none;
}
.menuContent_leftMenu {
  background:rgb(29, 30, 35);
  color:rgb(81, 90, 110);
}
.menuContent_leftMenu >>> .ivu-menu-opened{
  background: #101117;
}
.chatIcon{
  z-index: 111;
  position:absolute;
  bottom: 32px;
  right: 32px;
  color: white;
  width: 52px;
  height: 52px;
  background: rgb(43, 133, 228);
  border-radius: 5px;
  line-height: 52px;
  text-align:center;
  cursor: pointer;
}
.chatContent{
  height:100%;
  background: rgb(41, 47, 49);
  width: 580px;
  float: right;
  display: none;
  position: relative;
  border-left: solid 1px black;

}
/* .mapContentClass >>> .esriSimpleSliderTL {
  top: 100px;
  right: 340px;
} */
/* .mapContentClass >>> .all_maps {
  right: 15px;
} */
.mapContentClass >>> .coordinate {
  left: 30%;
}
.mapContentClass >>> .drawPanel {
  left: 55%;
}
/* .mapContentClass >>> .all_maps_hide_div {
  right: 105px;
} */

.mapContentClass >>> .map_top_config{
    position: absolute;
    top: 100px;
    right: 50px;
    color: #fff;
    font-size: 19px;
    border-radius: 3px;
    padding: 0 5px;
    cursor: pointer;
    z-index: 2;
}
.leftContentHide{
    position:absolute;
    width: 13px;
    height: 31px;
    top: 50%;
    left: 384px;
    background:url(./../assets/leftcontent/leftcontent_hide.png)  center  no-repeat;
    z-index: 2;
}
.leftContentShow{
    position:absolute;
    width: 13px;
    height: 31px;
    top: 50%;
    left: 384px;
    background:url(./../assets/leftcontent/leftcontent_show.png)  center  no-repeat;
    z-index: 2;
}
.current {
	position:absolute;
  height: 70px;
  width: 127px;
  /* left: 360px; */
  margin: auto;
  z-index: -1;
  background:url(./../assets/toplevelmenu/top_level_menu_hov_bg.png)  center bottom no-repeat;
  background-size: 80% 80%;
	-webkit-transition: all 400ms cubic-bezier(.45, 1.92, .9, 1.54);
	-moz-transition: all 400ms cubic-bezier(.45, 1.92, .9, 1.54);
	-o-transition: all 400ms cubic-bezier(.45, 1.92, .9, 1.54);
	-ms-transition: all 400ms cubic-bezier(.45, 1.92, .9, 1.54);
	transition: all 400ms cubic-bezier(.16, 1.23, .87, 1.18);
}
.menubar{
  position: absolute;
  display: flex;
  width: 963px;
  height: 70px;
  top: 82px;
  border: 1px solid #1d7e7e;
  transform:translate(-50%,0%);
  left: 50%;
  z-index: 5;
  background: 
  url(./../assets/leftcontent/img_jiao_topleft.png)  no-repeat 0% 0%,
  url(./../assets/leftcontent/img_jiao_topright.png)  no-repeat 100% 0%,
  url(./../assets/leftcontent/img_jiao_botleft.png)  no-repeat 0% 100%,
  url(./../assets/leftcontent/img_jiao_botright.png)  no-repeat 100% 100%;
  box-shadow:inset 0 0 25px 0 rgba(22, 121, 154, .52);
  animation: slide-down 0.5s ease-in;
  -webkit-animation: slide-down 0.5s ease-in;
}
@keyframes slide-down{
  0%{
    top:-30px;
    opacity: 0;
    }
  100%{
    top:82px;
    opacity: 1;
    }
}
@-webkit-keyframes slide-down{
  0%{
     top:-30px;
     opacity: 0;
    }
  100%{
    top:82px;
     opacity: 1;
    }
}

@keyframes slide-left{
  0%{
    left:-387px;
    opacity: 0;
    }
  100%{
    left:0px;
    opacity: 1;
    }
}
@-webkit-keyframes slide-left{
  0%{
      left:-387px;
     opacity: 0;
    }
  100%{
     left:0px;
     opacity: 1;
    }
}
@keyframes slide-right{
  0%{
    left: 0px;
    opacity: 1;
    }
  100%{
      left:-387px;
     opacity: 0;
    }
}
@-webkit-keyframes slide-right{
  0%{
    left: 0px;
    opacity: 1;
    }
  100%{
      left:-387px;
     opacity: 0;
    }
}
@keyframes slide-mincontent{
  0%{
    margin-top:-50px;
    opacity: .2;
    }
  100%{
    margin-top:82px;
    opacity: 1;
    }
}
@-webkit-keyframes slide-mincontent{
  0%{
     margin-top:-50px;
     opacity: .2;
    }
  100%{
    margin-top:82px;
     opacity: 1;
    }
}
</style>
