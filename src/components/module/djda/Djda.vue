<template>
    <div class="djdapanel">
        <LeftContentNameBar :isshowshaixuan="false"/>
        <HfxTree @on-click="clickTree" class="djdapanel-treePanel" :hfxTreelListObj="deptListObj" showname="deptname" uniquekey="deptcode" :isExpand="true" customicon="customicondept"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AllDeptTree from '@/components/base/AllDeptTree'
import HfxTree from '@/components/base/HfxTree'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'Djda',
  components: { AllDeptTree,HfxTree,LeftContentNameBar},
  data () {
    return {
    }
  },
  computed: mapState({
    currentDept: state => state.djda.currentDept,
    deptListObj: state => state.djda.allDeptListObj
  }),
  methods:{
    clickTree(data){
      this.$store.dispatch('putChildState',{"key":"djda","childkey":"currentDept","value":data});
    },
    getDeptTreeCallBack(data){
      this.$store.dispatch('putChildState',{"key":"djda","childkey":"allDeptListObj","value":data});
    }
  },
  created(){
    //获取部门树
    this.http.get("/djda/getDjdaDeptTree",null,this.getDeptTreeCallBack,this,false);
  }
}
</script>
<style scoped>
.djdapanel{
   height: 100%;
}
.djdapanel-treePanel{
  height: calc(100% - 70px);
  overflow:auto;
}
</style>
