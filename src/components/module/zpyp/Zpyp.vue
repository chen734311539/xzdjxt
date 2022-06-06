<template>
    <div class="zpyppanel">
       <LeftContentNameBar :isshowshaixuan="false" />
        <!-- <AllDeptTree @on-click="clickTree" class="zpyppanel-treePanel" :deptListObj="deptListObj"/> -->
        <HfxTree @on-click="clickTree" class="zpyppanel-treePanel" :hfxTreelListObj="deptListObj" showname="deptname" uniquekey="deptcode" :isExpand="true" customicon="customicondept" />

    </div>
</template>

<script>
import AllDeptTree from '@/components/base/AllDeptTree'
import { mapState } from 'vuex'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTree from '@/components/base/HfxTree'
export default {
  name: 'Zpyp',
  components: { AllDeptTree,LeftContentNameBar,HfxTree},
  data () {
    return {
     
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.zpyp.allDeptListObj
  }),
  methods:{
      clickTree(data){
        this.$store.dispatch('putChildState',{"key":"zpyp","childkey":"currentDept","value":data});
      },
      getDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"zpyp","childkey":"allDeptListObj","value":data});
      }
  },
  created(){
    //设置初始部门
    this.$store.dispatch('putChildState',{"key":"zpyp","childkey":"currentDept","value":this.userInfo.deptObj});
    this.http.get("/zzry/getDeptTreeByUserDept",null,this.getDeptTreeCallBack,this,false);
  }
}
</script>

<style scoped>
.zpyppanel{
   height: 100%;
}
.zpyppanel-treePanel{
  height: 100%;
  overflow: auto;
}
</style>

