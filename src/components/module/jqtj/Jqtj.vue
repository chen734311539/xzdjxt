<template>
    <div class="jqtjpanel">
             <LeftContentNameBar :isshowshaixuan="false"   />
        <!-- <AllDeptTree @on-click="clickTree" class="jqtjpanel-treePanel" :deptListObj="deptListObj"/> -->
        <HfxTree @on-click="clickTree" class="jqtjpanel-treePanel" :hfxTreelListObj="deptListObj" showname="deptname" uniquekey="deptcode" :isExpand="true" customicon="customicondept"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AllDeptTree from '@/components/base/AllDeptTree'
import HfxTree from '@/components/base/HfxTree'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'Jqtj',
  components: { AllDeptTree,HfxTree,LeftContentNameBar},
  data () {
    return {
    }
  },
  computed: mapState({
    currentDept: state => state.jqtj.currentDept,
    deptListObj: state => state.jqtj.allDeptListObj
  }),
  methods:{
    clickTree(data){
      this.$store.dispatch('putChildState',{"key":"jqtj","childkey":"currentDept","value":data});
    },
    getDeptTreeCallBack(data){
      this.$store.dispatch('putChildState',{"key":"jqtj","childkey":"allDeptListObj","value":data});
    }
  },
  created(){
    //获取部门树
    this.http.get("/jqtj/getJqtjDeptTree",null,this.getDeptTreeCallBack,this,false);
  }
}
</script>
<style scoped>
.jqtjpanel{
   height: 100%;
}
.jqtjpanel-treePanel{
  height: calc(100% - 70px);
  overflow:auto;
}
</style>
