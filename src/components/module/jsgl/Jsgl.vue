<template>
    <div class="jsglpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
        <!-- <AllDeptTree @on-click="clickTree" class="jsglpanel-treePanel" :deptListObj="deptListObj"/> -->
        <HfxTree @on-click="clickTree" class="jsglpanel-treePanel" :hfxTreelListObj="deptListObj" showname="deptname" uniquekey="deptcode" :isExpand="true" customicon="customicondept" />
    </div>
</template>

<script>
import AllDeptTree from '@/components/base/AllDeptTree'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTree from '@/components/base/HfxTree'
import { mapState } from 'vuex'
export default {
  name: 'Jsgl',
  components: { AllDeptTree,LeftContentNameBar,HfxTree},
  data () {
    return {
     
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.jsgl.allDeptListObj
  }),
  methods:{
      clickTree(data){
        this.$store.dispatch('putChildState',{"key":"jsgl","childkey":"currentDept","value":data});
      },
      getDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"jsgl","childkey":"allDeptListObj","value":data});
      }
  },
  created(){
    //设置初始部门
    this.$store.dispatch('putChildState',{"key":"jsgl","childkey":"currentDept","value":this.userInfo.deptObj});
    this.http.get("/jsgl/getDeptTreeByUserDept",null,this.getDeptTreeCallBack,this,false);
  }
}
</script>

<style scoped>
.jsglpanel{
   height: 100%;
}
.jsglpanel-treePanel{
   height:calc(100% - 35px);
   overflow: auto;
}
</style>

