<template>
    <div class="jqfxpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
        <!-- <AllDeptTree @on-click="clickTree" class="jqfxpanel-treePanel" :deptListObj="deptListObj"/> -->
      <HfxTree @on-click="clickTree" class="jqfxpanel-treePanel" :hfxTreelListObj="deptListObj" showname="deptname" uniquekey="deptcode" :isExpand="true" customicon="customicondept"/>
    </div>
</template>

<script>
import AllDeptTree from '@/components/base/AllDeptTree'
import { mapState } from 'vuex'
import HfxTree from '@/components/base/HfxTree'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'Jqfx',
  components: { AllDeptTree,LeftContentNameBar,HfxTree},
  data () {
    return {
     
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.jqfx.allDeptListObj
  }),
  methods:{
      clickTree(data){
        this.$store.dispatch('putChildState',{"key":"jqfx","childkey":"currentDept","value":data});
      },
      getDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"jqfx","childkey":"allDeptListObj","value":data});
      }
  },
  created(){
    //设置初始部门
    this.$store.dispatch('putChildState',{"key":"jqfx","childkey":"currentDept","value":this.userInfo.deptObj});
    this.http.get("/tjfx/getJqfxDeptTree",null,this.getDeptTreeCallBack,this,false);
  }
}
</script>

<style scoped>
.jqfxpanel{
   height: 100%;
}
.jqfxpanel-treePanel{
  height: calc(100% - 70px);
  overflow:auto;
}
</style>

