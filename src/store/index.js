import Vue from 'vue'
import Vuex from 'vuex'
import init from './init'
Vue.use(Vuex)

export default new Vuex.Store({
  state: init.initState,
  mutations: {
    putState (state, payload) {
      state[payload.key] = payload.value;
    },
    putChildState (state, payload) {
      state[payload.key][payload.childkey] = payload.value;
    },
    initState (state) {
      state = Object.assign({},init.initState);
      // state = init.initState;
    },
    clearState (state) {//除了用户登录信息，其他全部清空
      state.currentMenu = {};
      state.openMenuidList = [];
      state.zzry.currentDept={};
      state.ajzc.currentDept={};
      state.qqfw.currentDept={};
      state.swxx.currentDept={};
      state.zlhc.currentDept={};
      state.xxkb.currentDept={};
      state.yagl.currentPlan={};
      state.jsgl.currentDept={};
      state.gpsgl.currentDept={};
      state.dkkd.currentDept={};
      state.zpyp.currentDept={};
      state.jqfx.currentDept={};
      state.jqbb.currentDept={};
      state.jqtj.currentDept={};
      state.djda.currentDept={};
      state.czlog.currentDept={};
    },
  },
  actions: {
    putState ({ commit, state }, obj) {
      commit('putState',obj);
    },
    putChildState ({ commit, state }, obj) {
      commit('putChildState',obj);
    },
    initState ({ commit, state }) {
      commit('initState');
    },
    clearState ({ commit, state }) {
      commit('clearState');
    }
    // // websocket的相关方法
    // STAFF_WEBSOCKET ({ commit, state }) {
    //   commit('STAFF_UPDATEWEBSOCKET', new WebSocket('ws://47.111.104.252:8080/zhddxt/websocket'));
    //   // 只有定义了onopen方法，才能继续实现接收消息，即在使用的地方调用onmessage方法。
    //   state.websock.onopen = function () {
    //   }
    //   // state.websock.onmessage = function (e) {
    //   //   console.log(e.data);
    //   // }
    //   // 心跳包，30s左右无数据浏览器会断开连接Heartbeat
    //   setInterval(function () {
    //     state.websock.send("心跳连接")
    //   }, 30000)
    // }
  },
  // 该部分为了获取websocket的相关方法。会发现此处跟mutations 里的写法是类似的，但是，想使用return，需要将相关数据写在getters里面。
  // getters: {
  //   STAFF_UPDATE (state) {
  //     return state.websock
  //   }
  // }
})
