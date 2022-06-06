<template>
    <div class="czlogpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
      <!-- <AllDeptTree @on-click="clickTree" class="czlogpanel-treePanel" :deptListObj="deptListObj"/> -->
      <HfxTree @on-click="clickTree" class="czlogpanel-treePanel" :hfxTreelListObj="deptListObj" showname="deptname" uniquekey="deptcode" :isExpand="true" customicon="customicondept" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AllDeptTree from '@/components/base/AllDeptTree'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTree from '@/components/base/HfxTree'
export default {
  name: 'Czlog',
  components: { AllDeptTree,LeftContentNameBar,HfxTree},
  data () {
    return {
      
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.czlog.allDeptListObj
  }),
  methods:{
      clickTree(data){
        this.$store.dispatch('putChildState',{"key":"czlog","childkey":"currentDept","value":data});
      },
      getDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"czlog","childkey":"allDeptListObj","value":data});
      }
  },
  created(){
    //设置初始部门
    this.$store.dispatch('putChildState',{"key":"czlog","childkey":"currentDept","value":this.userInfo.deptObj});
    this.http.get("/czrz/getDeptTree",null,this.getDeptTreeCallBack,this,false);
  }
}
</script>

<style scoped>
.czlogpanel{
   height: 100%;
}
.czlogpanel-treePanel{
  height:calc(100% - 35px);
  overflow: auto;
}
</style>

