<template>
  <div class="panel">
      <div class="leftPanel">
        <div class="projectGroup">
          <span>我的分组</span>
        </div>
        <div class="projectDiv" @click="clickProject('all')">
          <div class="project" :class="{projectCheckedColor:(curProject=='all')}">
            <span class="projectNameSpan">全部大屏</span>
            <span class="projectNum">6</span>
          </div>
        </div>
        <div class="projectDiv" @click="clickProject('wfz')">
          <div class="project" :class="{projectCheckedColor:(curProject=='wfz')}">
            <span class="projectNameSpan">未分组</span>
            <span class="projectNum">5</span>
          </div>
        </div>
         <div class="projectDiv" @click="clickProject('1')">
          <div class="project" :class="{projectCheckedColor:(curProject=='1')}">
            <span class="projectNameSpan">测试组</span>
            <span class="projectNum">1</span>
          </div>
        </div>
      </div>
      <div class="midPanel">
        <div class="midPanelHeader">
          <div class="midPanelHeaderTitle">
            <h2>全部大屏</h2>
            <span style="font-size:14px;letter-spacing:1px;color:#bcc9d4;">
              <span style="padding:0px 2px;color:#2483ff;">5</span>个
            </span>
          </div>
          <div class="midPanelHeaderManager">
            <div class="search">
                <input class="search-input" placeholder="搜索" value="">
            </div>
            <Icon type="ios-search" class="searchiconclass"/>
            <Poptip trigger="hover" placement="bottom" class="sortDropListPanel">
              <div class="sort-type">
                <span class="sort-text" title="按修改时间排序">按修改时间排序</span>
                <Icon  custom="iconfont iconzhankai1" class="sortIcon"/>
              </div>
              <div slot="content"> 
                 <div class="item-container">
                   <a class="drop-list-item" href="javascript:;">
                     <span>按名称排序</span>
                   </a>
                   <a class="drop-list-item" href="javascript:;">
                     <span>按创建时间排序</span>
                   </a>
                   <a class="drop-list-item" href="javascript:;">
                     <span>按修改时间排序</span>
                   </a>
                 </div>
              </div>
            </Poptip>
          </div>
        </div>
        <div class="main-screen">
          <el-scrollbar>
            <div class="my-screen" @click="addNewScreen">
              <div class="new-project">
                <div class="add-new-screen">
                  <Icon custom="iconfont iconjiahaocu" class="add-new-screenIcon"/>
                  <span>新建可视化</span>
                </div>
              </div>
            </div>
              <ScreenItem />
            </el-scrollbar>
        </div>
      </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
import ScreenItem from './ScreenItem'
export default {
  name: 'MyScreen',
  components:{ScreenItem},
  data () {
    return {
      curProject:"all"
    }
  },
  computed:mapState({
  }),
  methods:{
    clickProject(name){
      this.curProject = name;
    },
    addNewScreen(){
      const {href} = this.$router.resolve({
          path: "/adddatascreen"
      });
      window.open(href, '_blank');
    }
  },
  mounted(){

  },
  beforeDestroy(){
  
  }
}
</script>

<style scoped>
.panel{
  width: 100%;
  height: 100%;
}
.leftPanel{
  float: left;
  width: 240px;
  height: 100%;
  color:#fff;
  font-size: 14px;
}
.midPanel{
  float: left;
  width: calc(100% - 240px);
  height: 100%;
  padding-left:8px;
  padding-right: 50px;
}
.projectGroup{
  position:relative;
  user-select: none;
  height: 56px;
  padding-left: 24px;
  padding-right: 36px;
  border-bottom: 1px solid #27343e;
  line-height: 36px;
  display: flex;
  align-items:center;
  justify-content: space-between;
}
.projectDiv{
  display: flex;
  flex-direction:column;
  font-size:12px;
}
.project{
  color:white;
  position:relative;
  height:36px;
  padding:0px 30px 0px 50px;
  display:flex;
  font-size:12px;
  align-items:center;
  justify-content:space-between;
  cursor:pointer;
  transition:color .2s;
  
}
.projectCheckedColor{
  background-image:url(./../../assets/datascreen/projectselect.png);
  background-repeat:round;
  color: #fff !important;
}
.projectNameSpan{
  color:currentColor;
  width: 100px;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
  font-size:14px;
}
.projectNum{
  display:block !important;
  user-select:none;
  font-family:Orbitron-Bold,Microsoft Yahei;
  color:#bcc9d4;
  font-size: 14px;
}
.midPanelHeader{
  display:flex;
  align-items:center;
  justify-content:space-between;
  border-bottom:1px solid #434b55;
  padding-bottom:5px;
  padding-top:10px;
  height: 56px;
  background: #171b22;
  z-index:1;
  min-width:1024px;
}
.midPanelHeader h2{
  max-width:200px;
  font-size: 14px;
  color: #2483ff;
  padding: 0px 10px;
  border-left: 2px solid #2483ff;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
}
.midPanelHeaderTitle{
  display: flex;
  align-items: center;
  padding: 5px 0px;
}
.midPanelHeaderManager{
  display: flex;
  align-items: center;
  font-size: 14px;
}
.search{
  transform: translateX(30px);
}
.search-input{
  background:#1d262e;
  color: #fff;
  padding: 0 10px;
  line-height:30px;
  height:30px;
  border:1px solid transparent;
  text-overflow:ellipsis;
  overflow: hidden;
  white-space:nowrap;
  transition:.2s;
}
.searchiconclass{
  padding:0px 24px 0px 4px;
  color:rgb(188, 201, 212);
  cursor:pointer;
  z-index:1;
  font-size:16px;
  font-style:normal;
  display:inline-block;
  vertical-align:middle;
}
.sort-type{
  line-height:30px;
  cursor:pointer;
  display:inline-block;
  color:#bcc9d4;
  font-size:14px;
  min-width:100px;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
}
.sort-text{
  vertical-align:middle;
  color:inherit;
}
.sortIcon{
  font-size:14px;
  margin-left:4px;
  font-style:normal;
  display:inline-block;
  vertical-align:middle;
}
.sortDropListPanel >>> .ivu-poptip-inner{
  position:relative;
  background:#262c33;
  box-shadow:0 1px 4px -3px #000;
  border-radius:1px;
}
.sortDropListPanel >>> .ivu-poptip-arrow{
  border-bottom-color:#262c33;
}
.sortDropListPanel >>> .ivu-poptip-arrow:after{
  border-bottom-color:#262c33;
}
.sortDropListPanel >>> .ivu-poptip-body{
  padding: 0px;
}
.sortDropListPanel .item-container{
  max-height:240px;
  overflow-y:auto;
}
.drop-list-item{
  display:block;
  align-items:center;
  text-align: center;
  text-decoration:none;
  font-size:12px;
  height:30px;
  line-height:30px;
  padding-left:10px;
  padding-right:12px;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
  border-radius:1px;
  color:#fff;
  transition:.2s;
  border-left:3px solid transparent;
  border-bottom: 1px solid #1a1b1d;
}
.drop-list-item:hover{
  border-left-color: #2483ff;
  background: #1a1b1d;
}
.main-screen{
  display:flex;
  flex-wrap:wrap;
  align-content:flex-start;
  padding-top:8px;
  padding-bottom:8px;
  padding-left:4px;
  user-select:none;
  height: calc(100% - 56px);
}
.my-screen{
  margin:16px;
  float:left;
}
.new-project{
  display:flex;
  justify-content:center;
  align-items:center;
  height:184px;
  width:258px;
  border:1px solid #2483ff;
  font-size:14px;
  color:#dbe8ff;
  background-image:linear-gradient(-90deg,rgba(0,161,255,.39) 0,rgba(0,137,255,.19) 100%);
  box-shadow:0 0 10px -8px #000;
  cursor:pointer;
}
.add-new-screen{
  transition:.2s;
  transform-origin:center;
}
.add-new-screenIcon{
  display:block;
  padding-bottom:10px;;
  text-align:center;
  font-size:18px;
}
.my-screen:hover .add-new-screenIcon{
  font-size:21px !important;
}
.add-new-screen span{
  color: inherit;
}
</style>
