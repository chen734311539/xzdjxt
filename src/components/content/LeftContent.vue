<template>
  <div class="left-panel">
     <div class="left-panel-bar">
       <Icon v-show="!menuOpen" custom="iconfont iconshouqi" class="header_menu_open" @click="openMenu"/>
       <Icon v-show="menuOpen" custom="iconfont iconzhankai" class="header_menu_open" @click="openMenu"/>
       <Button :ghost="true" class="left-panel-bar-button" @click="showConfigMenuModal">
            <Icon custom="iconfont iconpeizhi"/>
            配置
        </Button>
        <Modal title="自定义菜单" v-model="showConfigMenu" class="modal_style" :draggable="true" width="400">
          <div ref="configMenuModal" v-for="obj in selfConfigMneuList" :key="obj.menuid">
            <div class="selfMenuConfigHerderDiv"><span class="selfMenuConfigHerder">{{obj.menuname}}</span></div>
            <SelfMenuConfigItem v-for="cObj in obj.children" :key="cObj.menuid" :menuObj="cObj"/>
          </div>
 
          <div slot="footer">
            <Button type="text" size="large" @click="hideConfigMenuModal">取消</Button>
            <Button type="primary" size="large" @click="updateSelfMenu">确定</Button>
          </div>
        </Modal>
     </div>
     <div class="left-panel-menubar">
       <div ref="selfMenuPanel" :class="{'left-panel-menubuttonbar':!menushowall,'left-panel-menubuttonbar-showall':menushowall}">
          <MenuButton v-for="selfMenu in selfMenuList" :name="selfMenu.menuname" :icon="selfMenu.icon" :click="clickMenuButton" :data="selfMenu" :key="selfMenu.menuid"/>
       </div>
       <Icon v-if="!menushowall" v-show="menuLine>1" custom="iconfont iconxiangxiazhankai left-panel-menubar-icon" style="color:white;" @click="menuBarIconClick()"/>
       <Icon v-if="menushowall" v-show="menuLine>1" custom="iconfont iconxiangshangshouqi left-panel-menubar-icon" style="color:white;" @click="menuBarIconClick()"/>
     </div>
     <div :class="{'moudle-panel':(menuLine>1),'moudle-panel-no-line':(menuLine==0),'moudle-panel-single-line':(menuLine==1)}">
         <div class="moudle-title-panel">
            <Icon :custom="'iconfont '+currentMenu.icon"/>
            <span class="moudle-title-name">{{currentMenu.menuname}}</span>
         </div>
         <div class="moudle-content-panel">
           <JingQing v-if="openMenuidList.indexOf('0201')>-1" v-show="currentMenu.menuid=='0201'"></JingQing>
           <JingLi v-if="openMenuidList.indexOf('0202')>-1" v-show="currentMenu.menuid=='0202'"></JingLi>
           <ShiPin v-if="openMenuidList.indexOf('0203')>-1" v-show="currentMenu.menuid=='0203'"></ShiPin>

           <Dztc v-if="openMenuidList.indexOf('0301')>-1" v-show="currentMenu.menuid=='0301'" module="dztc"></Dztc><!--定制图层 -->
           <Dztc v-if="openMenuidList.indexOf('0302')>-1" v-show="currentMenu.menuid=='0302'" module="shzy"></Dztc><!--社会资源 -->
           <Dztc v-if="openMenuidList.indexOf('0303')>-1" v-show="currentMenu.menuid=='0303'" module="ywsj"></Dztc><!--业务数据 -->

           <Ajzc v-if="openMenuidList.indexOf('0401')>-1" v-show="currentMenu.menuid=='0401'"></Ajzc><!--案件侦查 -->
           <Qqfw v-if="openMenuidList.indexOf('0402')>-1" v-show="currentMenu.menuid=='0402'"></Qqfw><!--请求服务 -->
           <Zlhc v-if="openMenuidList.indexOf('0403')>-1" v-show="currentMenu.menuid=='0403'"></Zlhc><!--指令核查 -->
           <Mrhs v-if="openMenuidList.indexOf('0404')>-1" v-show="currentMenu.menuid=='0404'"></Mrhs><!--每日会商 -->

           <Swxx v-if="openMenuidList.indexOf('0501')>-1" v-show="currentMenu.menuid=='0501'"></Swxx><!--涉稳信息 -->
           <Xxkb v-if="openMenuidList.indexOf('0502')>-1" v-show="currentMenu.menuid=='0502'"></Xxkb><!--信息快报 -->

           <Fkq v-if="openMenuidList.indexOf('0602')>-1" v-show="currentMenu.menuid=='0602'"></Fkq><!--防控圈 -->
           <Dkkd v-if="openMenuidList.indexOf('0604')>-1" v-show="currentMenu.menuid=='0604'"></Dkkd><!--堵控卡点 -->

           <Zbbq v-if="openMenuidList.indexOf('1501')>-1" v-show="currentMenu.menuid=='1501'"></Zbbq><!--值班备勤 -->
           <Kdzl v-if="openMenuidList.indexOf('1502')>-1" v-show="currentMenu.menuid=='1502'"></Kdzl>
           <Zpyp v-if="openMenuidList.indexOf('1503')>-1" v-show="currentMenu.menuid=='1503'"></Zpyp><!--照片云盘 -->

           <Jqfx v-if="openMenuidList.indexOf('1601')>-1" v-show="currentMenu.menuid=='1601'"></Jqfx><!--警情分析 -->
           <Jqbb v-if="openMenuidList.indexOf('1602')>-1" v-show="currentMenu.menuid=='1602'"></Jqbb><!--警情报表 -->
           <Zlgl v-if="openMenuidList.indexOf('1604')>-1" v-show="currentMenu.menuid=='1604'"></Zlgl><!--指令管理 -->
           <Jqtj v-if="openMenuidList.indexOf('1605')>-1" v-show="currentMenu.menuid=='1605'"></Jqtj><!--警情统计 -->
           
          <Zzry v-if="openMenuidList.indexOf('0701')>-1" v-show="currentMenu.menuid=='0701'"></Zzry><!--组织人员 -->
          <Jsgl v-if="openMenuidList.indexOf('0703')>-1" v-show="currentMenu.menuid=='0703'"></Jsgl><!--组织人员 -->
          <Xqgl v-if="openMenuidList.indexOf('0704')>-1" v-show="currentMenu.menuid=='0704'"></Xqgl><!--辖区管理 -->
          <Qygl v-if="openMenuidList.indexOf('0705')>-1" v-show="currentMenu.menuid=='0705'"></Qygl><!--操作日志 -->
          <Gpsgl v-if="openMenuidList.indexOf('0706')>-1" v-show="currentMenu.menuid=='0706'"></Gpsgl><!--Gps管理 -->
          <Czlog v-if="openMenuidList.indexOf('0707')>-1" v-show="currentMenu.menuid=='0707'"></Czlog><!--操作日志 -->

          <Zdry v-if="openMenuidList.indexOf('1901')>-1" v-show="currentMenu.menuid=='1901'"></Zdry><!--重点人员 -->
          <Ldry v-if="openMenuidList.indexOf('1902')>-1" v-show="currentMenu.menuid=='1902'"></Ldry><!--流动人员 -->
          
         </div>
     </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import MenuButton from '@/components/base/MenuButton'
import JingQing from '@/components/module/jq/JingQing'
import JingLi from '@/components/module/jl/JingLi'
import ShiPin from '@/components/module/spjk/ShiPin'
import Zzry from '@/components/module/zzry/Zzry'
import Jsgl from '@/components/module/jsgl/Jsgl'
import Zbbq from '@/components/module/zbbq/Zbbq'
import Kdzl from '@/components/module/kdzl/Kdzl'
import Fkq from '@/components/module/fkq/fkq'
import Dkkd from '@/components/module/dkkd/Dkkd'
import Zpyp from '@/components/module/zpyp/Zpyp'
import Jqfx from '@/components/module/jqfx/Jqfx'
import Jqbb from '@/components/module/jqbb/Jqbb'
import Zlgl from '@/components/module/zlgl/Zlgl'
import Jqtj from '@/components/module/jqtj/Jqtj'
import Gpsgl from '@/components/module/gpsgl/Gpsgl'
import Czlog from '@/components/module/czlog/Czlog'
import Xqgl from '@/components/module/xqgl/Xqgl'
import Qygl from '@/components/module/qygl/Qygl'
import Zdry from '@/components/module/zdry/Zdry'
import Ldry from '@/components/module/ldry/Ldry'
import Dztc from '@/components/module/dztc/Dztc'
import Ajzc from '@/components/module/ajzc/Ajzc'
import Qqfw from '@/components/module/qqfw/Qqfw'
import Swxx from '@/components/module/swxx/Swxx'
import Zlhc from '@/components/module/zlhc/Zlhc'
import Mrhs from '@/components/module/mrhs/Mrhs'
import Xxkb from '@/components/module/xxkb/Xxkb'
import SelfMenuConfigItem from '@/components/base/SelfMenuConfigItem'

export default {
  name: 'LeftContent',
  data () {
    return {
      menushowall:false,
      selfMenuList:[],
      menuLine:0,//自定义的menu行数，一行或0行可以隐藏arrow图标
      showConfigMenu:false,
      selfConfigMneuList:[],//config menu配置
      menuOpen:false
    }
  },
  components: { MenuButton,JingQing,JingLi,ShiPin,Zzry,Jsgl,Zpyp,Jqfx,Jqbb,Zlgl,Jqtj,Kdzl,Fkq,Dkkd,Zbbq,SelfMenuConfigItem,Gpsgl,Czlog,Xqgl,Qygl,Zdry,Ldry,Dztc,Ajzc,Qqfw,Swxx,Zlhc,Mrhs,Xxkb},
  computed: mapState({
    currentMenu: state => state.currentMenu,
    openMenuidList: state => state.openMenuidList
  }),
  methods:{
   clickMenuButton(data){
     if(this.openMenuidList.indexOf(data.menuid)==-1){
       var arr2 = [...this.openMenuidList];
       arr2.push(data.menuid);
       this.$store.dispatch('putState',{"key":"openMenuidList","value":arr2});
     }
     this.menushowall = false;
   },
   menuBarIconClick(){
     this.menushowall=!this.menushowall;
   },
   getSelfMenuCallBack(data){
     this.menuLine = 0;
     this.selfMenuList = data;
     if(data.length>0){
       if(this.openMenuidList.indexOf(data[0].menuid)==-1){
        var arr2 = [...this.openMenuidList];
        arr2.push(data[0].menuid);
        this.$store.dispatch('putState',{"key":"openMenuidList","value":arr2});
       }
       this.$store.dispatch('putState',{"key":"currentMenu","value":data[0]});
       var contentwidth = $(this.$refs.selfMenuPanel).width();
       var num = parseInt(contentwidth/90);
       if(data.length<=num){
         this.menuLine = 1;
       }else{
         this.menuLine = 2;
       }
     }
   },
   showConfigMenuModal(){
     this.showConfigMenu = true;
     this.http.get("/user/getOptionMenu",null,this.getOptionMenuCallBack,this,false);
   },
   getOptionMenuCallBack(data){
     this.selfConfigMneuList = data;
   },
   hideConfigMenuModal(){
     this.showConfigMenu = false;
   },
   updateSelfMenu(){
     var list = [];
     var el = $(this.$refs.configMenuModal).find(".selfMenuConfigItemDivActive")
     $(el).each(function (index) {
        var menuid = $(this).attr('menuid');
        var seq = $(this).attr('seq');
        var obj = {};
        obj.seq = seq;
        obj.menuid = menuid;
        list.push(obj);
     });
     this.http.post("/user/saveSelfMenu",{menuidArray:list},this.saveSelfMenuCallBack,this,false);
   },
   saveSelfMenuCallBack(data){
     this.showConfigMenu = false;
     this.http.get("/user/getSelfMenu",null,this.getSelfMenuCallBack,this,false);
   },
   openMenu(){
      var ischatOpen = false;
      if(!$(".chatContent").is(':hidden')){//menu show
        ischatOpen = true;
      }
      this.menuOpen = !this.menuOpen;
      if(this.menuOpen){
        $(".menuContent").show();
        if(ischatOpen){
          $(".midContentClass").css("width","calc(100% - 371px - 580px - 180px)");;
        }else{
          $(".midContentClass").css("width","calc(100% - 371px - 180px)");;
        }
      }else{
        $(".menuContent").hide();
        if(ischatOpen){
           $(".midContentClass").css("width","calc(100% - 371px - 580px)");;
        }else{
          $(".midContentClass").css("width","calc(100% - 371px)");;
        }
      }
    }

  },
  created(){
    //获取menubar
     this.http.get("/user/getSelfMenu",null,this.getSelfMenuCallBack,this,false);
  }
}
</script>

<style scoped>
.left-panel {
  height: 100%;
  padding: 8px 5px 0px 5px;
  border-right: 1px solid black;
  overflow: hidden;
}
.left-panel-bar{
   border-radius: 5px;
   height: 40px;
   padding: 8px 15px;
   background-color: #262b2e;
   position: relative;
}
.left-panel-bar-button{
  float: right;
  border: 0px;
  font-size:14px;
  padding: 0px;
}
.left-panel-menubar{
  position: relative;
  height: auto;
  padding-top: 4px;
}
.left-panel-menubuttonbar{
  /* height: 78px; */
  max-height: 78px;
  height:auto;
  overflow: hidden
}
.left-panel-menubuttonbar-showall{
  height: auto;
}
.left-panel-menubar-icon{
  color: white;
  position: relative;;
  left: 48%;
  bottom: 4px;
  cursor:pointer;
}
.moudle-panel{
  height: calc(100% - 145px);
}
.moudle-panel-no-line{/* 箭头和selfmenu栏都不显示 */
  height: calc(100% - 145px + 100px);
}
.moudle-panel-single-line{/* 箭头不显示 */
  height: calc(100% - 145px + 22px);
}
.moudle-title-panel{
   position: relative;
   color: white;
   border-radius: 5px;
   height: 35px;
   padding: 6px 20px;
   background-color: #090909;
   font-size: 14px;
}
.moudle-title-name{
  margin-left: 20px;
  top:2px;
  position: relative;
}
.moudle-content-panel{
  height:calc(100% - 35px);
  border-left: 1px solid #303031;
  border-right: 1px solid #303031;
  border-bottom: 1px solid #303031;
  padding: 8px 10px;
}
.modal_style{
    display: flex;
    align-items: center;
    justify-content: center;
}
.selfMenuConfigHerder{
  position: relative;
  text-align: center;
  top:4px;
}
.selfMenuConfigHerderDiv{
  position: relative;
  height: 25px;
  width: 62px;
  margin-right:5px;
  text-align: center;
  margin-bottom: 5px;
  border-radius: 5px;
  color: white;
}
.header_menu_open{
  position:absolute;
  top:10px;
  color: white;
  font-size: 20px;
  /* right: 230px; */
  left:259px;
  cursor: pointer;
}
</style>
