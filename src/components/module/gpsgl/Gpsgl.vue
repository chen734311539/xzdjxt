<template>
    <div class="gpsglpanel">
        <LeftContentNameBar :isshowshaixuan="false" />
        <!-- <AllDeptTree @on-click="clickTree" class="gpsglpanel-treePanel" :deptListObj="deptListObj"/> -->
        <HfxTree @on-click="clickTree" class="gpsglpanel-treePanel" :hfxTreelListObj="deptListObj" showname="deptname" uniquekey="deptcode" :isExpand="true" customicon="customicondept" />
    </div>
</template>

<script>
import AllDeptTree from '@/components/base/AllDeptTree'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTree from '@/components/base/HfxTree'
import { mapState } from 'vuex'
export default {
  name: 'Gpsgl',
  components: {AllDeptTree,LeftContentNameBar,HfxTree},
  data () {
    return {
     
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.gpsgl.allDeptListObj
  }),
  methods:{
      clickTree(data){
        this.$store.dispatch('putChildState',{"key":"gpsgl","childkey":"currentDept","value":data});
      },
      getAllGpsDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"gpsgl","childkey":"allDeptListObj","value":data});
      }
  },
  created(){
    //设置初始部门
    this.$store.dispatch('putChildState',{"key":"gpsgl","childkey":"currentDept","value":this.userInfo.deptObj});
    this.http.get("/gps/getAllGpsDeptTree",null,this.getAllGpsDeptTreeCallBack,this,false);
  }
}
</script>

<style scoped>
.gpsglpanel{
   height: 100%;
}
.gpsglpanel-treePanel{
  height:calc(100% - 35px);
  overflow: auto;
}
</style>

