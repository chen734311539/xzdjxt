<template>
  <div class="left-panel">
         <div class="moudle-content-panel">
           <JingQing v-if="openMenuidList.indexOf('0201')>-1" v-show="currentMenu.menuid=='0201'"></JingQing>
           <JingLi v-if="openMenuidList.indexOf('0202')>-1" v-show="currentMenu.menuid=='0202'"></JingLi>
           <ShiPin v-if="openMenuidList.indexOf('0203')>-1" v-show="currentMenu.menuid=='0203'"></ShiPin>
           <Bkyj v-if="openMenuidList.indexOf('0205')>-1" v-show="currentMenu.menuid=='0205'"></Bkyj><!-- 布控预警 -->
           <Lgxx v-if="openMenuidList.indexOf('0215')>-1" v-show="currentMenu.menuid=='0215'"></Lgxx><!-- 旅馆信息 -->
           <Wbxx v-if="openMenuidList.indexOf('0216')>-1" v-show="currentMenu.menuid=='0216'"></Wbxx><!-- 网吧信息 -->
           <Dzkk v-if="openMenuidList.indexOf('0217')>-1" v-show="currentMenu.menuid=='0217'"></Dzkk><!--电子卡口 -->

           <Dztc v-if="openMenuidList.indexOf('0301')>-1" v-show="currentMenu.menuid=='0301'" module="dztc"></Dztc><!--定制图层 -->
           <Dztc v-if="openMenuidList.indexOf('0302')>-1" v-show="currentMenu.menuid=='0302'" module="shzy"></Dztc><!--社会资源 -->
           <Dztc v-if="openMenuidList.indexOf('0303')>-1" v-show="currentMenu.menuid=='0303'" module="ywsj"></Dztc><!--业务数据 -->

           <Ajzc v-if="openMenuidList.indexOf('0401')>-1" v-show="currentMenu.menuid=='0401'"></Ajzc><!--案件侦查 -->
           <Qqfw v-if="openMenuidList.indexOf('0402')>-1" v-show="currentMenu.menuid=='0402'"></Qqfw><!--请求服务 -->
           <Zlhc v-if="openMenuidList.indexOf('0403')>-1" v-show="currentMenu.menuid=='0403'"></Zlhc><!--指令核查 -->
           <Cbaj v-if="openMenuidList.indexOf('0404')>-1" v-show="currentMenu.menuid=='0404'"></Cbaj><!--串并案件 -->
           <Mrhs v-if="openMenuidList.indexOf('0405')>-1" v-show="currentMenu.menuid=='0405'"></Mrhs><!--每日会商 -->
           <Ryhc v-if="openMenuidList.indexOf('0406')>-1" v-show="currentMenu.menuid=='0406'"></Ryhc><!--人员核查 -->

           <Swxx v-if="openMenuidList.indexOf('0501')>-1" v-show="currentMenu.menuid=='0501'"></Swxx><!--涉稳信息 -->
           <Xxkb v-if="openMenuidList.indexOf('0502')>-1" v-show="currentMenu.menuid=='0502'"></Xxkb><!--信息快报 -->
           <Zdry v-if="openMenuidList.indexOf('0503')>-1" v-show="currentMenu.menuid=='0503'"></Zdry><!--重点人员 -->
           <Syww v-if="openMenuidList.indexOf('0504')>-1" v-show="currentMenu.menuid=='0504'"></Syww><!--涉疫维稳 -->
           <Cfjf v-if="openMenuidList.indexOf('0505')>-1" v-show="currentMenu.menuid=='0505'"></Cfjf><!--重复纠纷 -->
           <Yyjq v-if="openMenuidList.indexOf('0506')>-1" v-show="currentMenu.menuid=='0506'"></Yyjq><!--扬言警情 -->

           <Yagl v-if="openMenuidList.indexOf('0601')>-1" v-show="currentMenu.menuid=='0601'"></Yagl><!--预案管理 -->
           <Fkq v-if="openMenuidList.indexOf('0602')>-1" v-show="currentMenu.menuid=='0602'"></Fkq><!--防控圈 -->
           <Dkkd v-if="openMenuidList.indexOf('0604')>-1" v-show="currentMenu.menuid=='0604'"></Dkkd><!--堵控卡点 -->

           <Zbbq v-if="openMenuidList.indexOf('1501')>-1" v-show="currentMenu.menuid=='1501'"></Zbbq><!--值班备勤 -->
           <Kdzl v-if="openMenuidList.indexOf('1502')>-1" v-show="currentMenu.menuid=='1502'"></Kdzl>
           <Zpyp v-if="openMenuidList.indexOf('1503')>-1" v-show="currentMenu.menuid=='1503'"></Zpyp><!--照片云盘 -->
           <Bxgc v-if="openMenuidList.indexOf('1504')>-1" v-show="currentMenu.menuid=='1504'"></Bxgc><!--比学赶超 -->
           <Djda v-if="openMenuidList.indexOf('1505')>-1" v-show="currentMenu.menuid=='1505'"></Djda><!--盯警盯案 -->
           <Yqsj v-if="openMenuidList.indexOf('1506')>-1" v-show="currentMenu.menuid=='1506'"></Yqsj><!--疫情数据 -->

           <Zlgl v-if="openMenuidList.indexOf('1604')>-1" v-show="currentMenu.menuid=='1604'"></Zlgl><!--指令管理 -->
           <Ssyj v-if="openMenuidList.indexOf('1608')>-1" v-show="currentMenu.menuid=='1608'"></Ssyj><!--三色预警 -->
           <Hctj v-if="openMenuidList.indexOf('1609')>-1" v-show="currentMenu.menuid=='1609'"></Hctj><!--核查统计 -->
           <Mrtb v-if="openMenuidList.indexOf('1610')>-1" v-show="currentMenu.menuid=='1610'"></Mrtb><!--每日通报 -->
           
          <Zzry v-if="openMenuidList.indexOf('0701')>-1" v-show="currentMenu.menuid=='0701'"></Zzry><!--组织人员 -->
          <Jsgl v-if="openMenuidList.indexOf('0703')>-1" v-show="currentMenu.menuid=='0703'"></Jsgl><!--组织人员 -->
          <Xqgl v-if="openMenuidList.indexOf('0704')>-1" v-show="currentMenu.menuid=='0704'"></Xqgl><!--辖区管理 -->
          <Qygl v-if="openMenuidList.indexOf('0705')>-1" v-show="currentMenu.menuid=='0705'"></Qygl><!--操作日志 -->
          <Gpsgl v-if="openMenuidList.indexOf('0706')>-1" v-show="currentMenu.menuid=='0706'"></Gpsgl><!--Gps管理 -->
          <Czlog v-if="openMenuidList.indexOf('0707')>-1" v-show="currentMenu.menuid=='0707'"></Czlog><!--操作日志 -->

          <Jqzl v-if="openMenuidList.indexOf('0801')>-1" v-show="currentMenu.menuid=='0801'"></Jqzl><!--警情质量 -->
          <Zpxa v-if="openMenuidList.indexOf('0802')>-1" v-show="currentMenu.menuid=='0802'"></Zpxa><!--诈骗小案 -->
          <Jqfx v-if="openMenuidList.indexOf('0803')>-1" v-show="currentMenu.menuid=='0803'"></Jqfx><!--警情分析 -->
           <Jqbb v-if="openMenuidList.indexOf('0804')>-1" v-show="currentMenu.menuid=='0804'"></Jqbb><!--警情报表 -->
           <Jqtj v-if="openMenuidList.indexOf('0805')>-1" v-show="currentMenu.menuid=='0805'"></Jqtj><!--警情统计 -->

          <Ldry v-if="openMenuidList.indexOf('1902')>-1" v-show="currentMenu.menuid=='1902'"></Ldry><!--流动人员 -->
          <Hryj v-if="openMenuidList.indexOf('1902')>-1" v-show="currentMenu.menuid=='1903'"></Hryj><!--呼入预警 -->
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
import Bkyj from '@/components/module/bkyj/Bkyj'
import Lgxx from '@/components/module/lgxx/Lgxx'
import Wbxx from '@/components/module/wbxx/Wbxx'
import Dzkk from '@/components/module/dzkk/Dzkk'
import Zzry from '@/components/module/zzry/Zzry'
import Jsgl from '@/components/module/jsgl/Jsgl'
import Zbbq from '@/components/module/zbbq/Zbbq'
import Kdzl from '@/components/module/kdzl/Kdzl'
import Yagl from '@/components/module/yagl/Yagl'
import Fkq from '@/components/module/fkq/fkq'
import Dkkd from '@/components/module/dkkd/Dkkd'
import Zpyp from '@/components/module/zpyp/Zpyp'
import Bxgc from '@/components/module/bxgc/Bxgc'
import Djda from '@/components/module/djda/Djda'
import Yqsj from '@/components/module/yqsj/Yqsj'
import Jqfx from '@/components/module/jqfx/Jqfx'
import Jqbb from '@/components/module/jqbb/Jqbb'
import Zlgl from '@/components/module/zlgl/Zlgl'
import Jqtj from '@/components/module/jqtj/Jqtj'
import Ssyj from '@/components/module/ssyj/Ssyj'
import Hctj from '@/components/module/hctj/Hctj'
import Mrtb from '@/components/module/mrtb/Mrtb'
import Gpsgl from '@/components/module/gpsgl/Gpsgl'
import Czlog from '@/components/module/czlog/Czlog'
import Jqzl from '@/components/module/jqzl/Jqzl'
import Zpxa from '@/components/module/zpxa/Zpxa'
import Xqgl from '@/components/module/xqgl/Xqgl'
import Qygl from '@/components/module/qygl/Qygl'
import Zdry from '@/components/module/zdry/Zdry'
import Syww from '@/components/module/syww/Syww'
import Ldry from '@/components/module/ldry/Ldry'
import Hryj from '@/components/module/hryj/Hryj'
import Dztc from '@/components/module/dztc/Dztc'
import Ajzc from '@/components/module/ajzc/Ajzc'
import Qqfw from '@/components/module/qqfw/Qqfw'
import Swxx from '@/components/module/swxx/Swxx'
import Zlhc from '@/components/module/zlhc/Zlhc'
import Cbaj from '@/components/module/cbaj/Cbaj'
import Mrhs from '@/components/module/mrhs/Mrhs'
import Xxkb from '@/components/module/xxkb/Xxkb'
import Cfjf from '@/components/module/cfjf/Cfjf'
import Yyjq from '@/components/module/yyjq/Yyjq'
import Ryhc from '@/components/module/ryhc/Ryhc'
import SelfMenuConfigItem from '@/components/base/SelfMenuConfigItem'

export default {
  name: 'LeftContent_new',
  data () {
    return {
    }
  },
  components: { MenuButton,JingQing,JingLi,ShiPin,Bkyj,Lgxx,Wbxx,Dzkk,Zzry,Jsgl,Zpyp,Bxgc,Djda,Yqsj,Jqfx,Jqbb,Zlgl,Jqtj,Ssyj,Hctj,Mrtb,Kdzl,Yagl,Fkq,Dkkd,Zbbq,
     SelfMenuConfigItem,Gpsgl,Czlog,Jqzl,Zpxa,Xqgl,Qygl,Zdry,Syww,Ldry,Hryj,Dztc,Ajzc,Qqfw,Swxx,Zlhc,Cbaj,Mrhs,Xxkb,Cfjf,Yyjq,Ryhc},
  computed: mapState({
    currentMenu: state => state.currentMenu,
    openMenuidList: state => state.openMenuidList
  }),
  methods:{
  },
  created(){
  }
}
</script>
<style scoped>
.left-panel {
  height: 100%;
  padding: 2px 11px 14px 11px;
  /* border-right: 1px solid black; */
  overflow: hidden;
}
.moudle-content-panel{
  height:calc(100% - 35px);
}
</style>
