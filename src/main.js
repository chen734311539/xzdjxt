// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from 'jquery'
import moment from 'moment'

import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//视频插件
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

//echarts
import * as echarts from 'echarts'

import http from "./http.js"
import common from "./common.js"
import store from './store'

import './css/common.css'
import './css/iconfont/iconfont.css'
import './css/font/font.css'

//富文本编辑器
import '../static/UEditor/ueditor.config.js'
import '../static/UEditor/ueditor.all.js'
import '../static/UEditor/lang/zh-cn/zh-cn.js'
import '../static/UEditor/ueditor.parse.min.js'
//引入统一的hfx按钮
import HfxButton from '@/components/base/HfxButton'
Vue.component("HfxButton",HfxButton);

//引入flow流程图
import SuperFlow from 'vue-super-flow'
import './css/index.css'
Vue.use(SuperFlow)

//添加水印
import watermark from './watermark.js'
Vue.prototype.$watermark = watermark

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(VideoPlayer)

Vue.prototype.http = http;
Vue.prototype.common = common;
Vue.prototype.echarts = echarts
Vue.prototype.$moment = moment;

//粒子动画
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

//粒子动画
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

/**************地图全局变量**************/
var mapObj = {};
mapObj.map_mapArray = [];
mapObj.layeridmap = {};
mapObj.divlayeridmap={};
mapObj.markidmap = {};
/*********存放地图详情资源数据start********/
mapObj.ssjqList = [];
mapObj.ssjlList = [];
mapObj.spjkList = [];
mapObj.dztcList = [];
mapObj.shzyList = [];
mapObj.ywsjList = [];
mapObj.showMapList = [];
/*********存放地图详情资源数据end********/
Vue.prototype.map = mapObj;//全局变量存放与map相关的
Vue.prototype.mapList=[];//放各种其他地方用到的地图

/**************警情全局变量**************/
var jqObj = {};
jqObj.wxcjList = [];//无需出警
Vue.prototype.jqObj = jqObj;

/**************图层显示全局变量**************/
var layerObj = {};
layerObj.jq = true;
layerObj.jl = true;
layerObj.spjk = true;
layerObj.dzkk = true;
layerObj.dztc = true;
Vue.prototype.layerObj = layerObj;

/**************大屏全局变量**************/
Vue.prototype.chartList = [];
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
