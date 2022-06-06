<template>
    <div class="zzrypanel">
        <LeftContentNameBar :isshowshaixuan="false" />
        <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch"/>
        <!-- <AllDeptTree @on-click="clickTree" class="zzrypanel-treePanel" :deptListObj="deptListObj"/> -->
        <HfxTree @on-click="clickTree" class="zzrypanel-treePanel" :hfxTreelListObj="deptListObj" showname="deptname" uniquekey="deptcode" :isExpand="true" customicon="customicondept" />
    </div>
</template>

<script>
import InputSearchNew from '@/components/base/InputSearchNew'
import AllDeptTree from '@/components/base/AllDeptTree'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTree from '@/components/base/HfxTree'
import { mapState } from 'vuex'
export default {
  name: 'Zzry',
  components: {InputSearchNew, AllDeptTree,HfxTree,LeftContentNameBar},
  data () {
    return {
     
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.zzry.allDeptListObj
  }),
  methods:{
      inputSearch(value){
        if(value==""){
           return;
        }
        this.$store.dispatch('putChildState',{"key":"zzry","childkey":"searchName","value":value});
      },
      clickTree(data){
        this.$store.dispatch('putChildState',{"key":"zzry","childkey":"currentDept","value":data});
      },
      getDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"zzry","childkey":"allDeptListObj","value":data});
      }
  },
  created(){
    //设置初始部门
    this.$store.dispatch('putChildState',{"key":"zzry","childkey":"currentDept","value":this.userInfo.deptObj});
    this.http.get("/zzry/getDeptTreeByUserDept",null,this.getDeptTreeCallBack,this,false);
  }
}
</script>

<style scoped>
.zzrypanel{
   height: 100%;
}
.seachbar_InputSearch{
  height: 36px;
  width: 100%;
  margin-bottom: 15px;
}
.zzrypanel-treePanel{
   height:calc(100% - 35px - 36px - 15px);
  overflow: auto;
}
</style>

