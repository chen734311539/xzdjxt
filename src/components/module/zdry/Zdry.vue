<template>
    <div class="zdrypanel">
      <LeftContentNameBar :isshowshaixuan="false" />
      <HfxTree @on-click="clickTree" class="zdrypanel-treePanel" :hfxTreelListObj="deptListObj" showname="deptname" uniquekey="deptcode" :isExpand="true" customicon="customicondept" />
    </div>
</template>

<script>
import InputSearch from '@/components/base/InputSearch'
import AllDeptTree from '@/components/base/AllDeptTree'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTree from '@/components/base/HfxTree'
import { mapState } from 'vuex'
export default {
  name: 'Zdry',
  components: {LeftContentNameBar,HfxTree},
  data () {
    return {
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.zdry.allDeptListObj
  }),
  methods:{
     clickTree(data){
        this.$store.dispatch('putChildState',{"key":"zdry","childkey":"currentDept","value":data});
      },
      getZdryDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"zdry","childkey":"allDeptListObj","value":data});
      }
  },
  created(){
     //设置初始部门
    this.$store.dispatch('putChildState',{"key":"zdry","childkey":"currentDept","value":this.userInfo.deptObj});
    this.http.get("/zdry/getZdryDeptTree",null,this.getZdryDeptTreeCallBack,this,false);
  },
  mounted(){
  }
}
</script>

<style scoped>
.zdrypanel{
   height: 100%;
   width: 100%;
}
.zdrypanel-treePanel{
  height:calc(100% - 35px);
  overflow: auto;
}
</style>

