<template>
    <div class="jqfxRightPanel">
      <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
      <el-tabs  class="tabs">
        <el-tab-pane label="列表分析" class="tabs_pane">
          <JqfxList/>
        </el-tab-pane>
        <el-tab-pane label="图表分析" class="tabs_pane">
          <JqfxChart/>
        </el-tab-pane>
        <el-tab-pane label="预警分析" class="tabs_pane">
          <JqfxMap/>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import JqfxList from '@/components/module/jqfx/JqfxList'
import JqfxChart from '@/components/module/jqfx/JqfxChart'
import JqfxMap from '@/components/module/jqfx/JqfxMap'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'JqfxRightPanel',
  components: {JqfxList,JqfxChart,JqfxMap,LeftContentNameBar},
  data () {
    return {
      
    }
  },
  computed: {...mapState({
     userInfo:state => state.userInfo,
     currentDept: state => state.jqfx.currentDept,
  })
  },
  methods:{
    
  },
  created(){
    
  },
}
</script>

<style scoped>
.jqfxRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
  padding: 0px;
}

 .tabs{
  height: calc(100% - 32px);
}
.tabs >>> .el-tabs__content{
  height:calc(100% - 50px);
}
.tabs >>> .el-tabs__item{
  color: #b6f6ff;
} 
.tabs >>>.el-tabs__active-bar{
  display: none;
}
.tabs>>>.el-tabs__nav-wrap::after{
  background-color: #b6f6ff;
}
/* 无效 处理tabs标签左右两个一个靠左一个靠右 */
.tabs>>> .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: none !important;
}
.tabs>>> .el-tabs--bottom .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--top .el-tabs__item.is-top:last-child {
  padding-right: none !important;
}
.tabs >>> .el-tabs__item.is-active{
  color: white;
  /* background-color: #b6f6ff; */
  border-bottom: 3px solid white;
} 
.tabs_pane{
  height: 100%;
}
.jqfx_option_panel{
  width: 100%;
  background: #262b2e;
  height: 40px;
  border: 1px solid rgb(91, 107, 114);
  position: relative;
  padding:10px 5px 5px 10px;
  margin-bottom: 5px;
  color:white;
}
.switchShow{
  margin-top:-2px;
  margin-right: 10px;
  margin-left:10px;
}
.upload{
  position:absolute;
  top:3px;
  left:188px;
}

</style>

