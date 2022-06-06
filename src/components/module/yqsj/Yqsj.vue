<template>
    <div class="yqsjpanel">
        <LeftContentNameBar :isshowshaixuan="false"/>
        <!-- <HfxTree @on-click="clickTree" class="yqsjpanel-treePanel" :hfxTreelListObj="deptListObj" showname="deptname" uniquekey="deptcode" :isExpand="true" customicon="customicondept"/> -->
        111
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AllDeptTree from '@/components/base/AllDeptTree'
import HfxTree from '@/components/base/HfxTree'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'Yqsj',
  components: { AllDeptTree,HfxTree,LeftContentNameBar},
  data () {
    return {
    }
  },
  computed: mapState({
  }),
  methods:{
  },
  created(){
  }
}
</script>
<style scoped>
.yqsjpanel{
   height: 100%;
}
.yqsjpanel-treePanel{
  height: calc(100% - 70px);
  overflow:auto;
}
</style>
