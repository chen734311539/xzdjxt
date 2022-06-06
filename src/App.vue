<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import init from "./store/init"
export default {
  name: 'App',
  data() {
      return {
      };
  },
  created () {
    if (sessionStorage.getItem('store')) {
      var stateObj = JSON.parse(sessionStorage.getItem('store'));
      //打开的菜单初始化，刷新时
      this.$store.replaceState(Object.assign({}, this.$store.state, stateObj))
    }
    window.addEventListener('beforeunload', () => {
      var initObj=init.initState;
      var storeObj={};
      storeObj.userInfo = this.$store.state.userInfo;//用户信息刷新保存
      var obj = Object.assign({}, initObj, storeObj)
      sessionStorage.setItem('store', JSON.stringify(obj))
    })
  }
}
</script>

<style>
#app {
  height:100%
}
</style>
