<template>
    <div class="wbxxpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
        <div class="jlbar">
              <span style="margin-left:7px;">显示</span>
              <el-switch class="switchShow" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="showSwitch" @change="showDzkkLayer">
              </el-switch>
        </div>
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" @on-clear="fanhuisearch" v-model="kkmc"/>
        </div>
        <div class="wblist-panel">
            <DzkkButton v-for="(kkObj,index) in kkList" :key="kkObj.jkdbh" :data="kkObj" @on-click="clickKkButton" @on-search="searchCheLiang(index)"  />
        </div>
        <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
        <KkSearchModal :showdata="showdata" />
    </div>
</template>

<script>
import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import common from "@/common.js"
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import PagerNew from '@/components/base/PagerNew'
import DzkkButton from '@/components/module/dzkk/DzkkButton'
import KkSearchModal from '@/components/module/dzkk/KkSearchModal'
import DzkkDetailMap from '@/components/module/dzkk/DzkkDetailMap'

export default {
  name: 'Dzkk',
  components: { LeftContentNameBar,InputSearchNew,PagerNew,DzkkButton,KkSearchModal,DzkkDetailMap},
  data () {
    return {
      kkmc:"",
      showSwitch:true,
      page:1,
      pageSize:10,
      totalSize:1,  //总共页数
      kkList:[],   //卡口的list
      showdata:{showmodal:false,jkdbh:"",jkdmc:""},
    }
  },
  computed: mapState({
  }),
  methods:{
      showDzkkLayer(){
        if(this.showSwitch){//显示
          this.layerObj.dzkk=true;
          var layer = this.map.map.getLayer("dzkkLayer");
          if(layer){
              layer.show();
          }
        }else{//隐藏
          this.layerObj.dzkk=false;
            var layer = this.map.map.getLayer("dzkkLayer");
            if(layer){
              layer.hide();
            }
        }
      },
      inputSearch(value){
        this.page = 1;
        this.searchKk();
      },
      pageChange(page){
        this.page = page;
        this.searchKk();
      },
      reset(){//筛选框清空
        this.kkmc="";
      },
      getDzkkListCallBack(data){
        this.totalSize = data.count;
        this.kkList = data.data;
        yewuMarkUtil.addDzkkMarks(this.kkList,false,this);//打点
      },
      fanhuisearch(){
        this.page = 1;
        this.reset();
        this.searchKk();
      },
      searchKk(){
        var param = {};
        param.page = this.page;
        param.pagesize = this.pageSize;
        param.kkmc = this.kkmc;
        this.http.get("/dzkk/getDzkkList",param,this.getDzkkListCallBack,this,false);
      },
      clickKkButton(data){
        if(data.loc&&data.loc.x){//地图上显示
            markUtil.centerAndShow("dzkkLayer",data.jkdbh,this);
        }else{//没有坐标，不在地图上显示
          
        }
      },
      searchCheLiang(index){
        var obj=this.kkList[index];
        this.showdata.jkdbh=obj.jkdbh;
        this.showdata.jkdmc=obj.jkdmc;
        this.showdata.showmodal=true;
      },
  },
  created(){
     //获取电子卡口
     var param = {};
     param.page = this.page;
     param.pagesize = this.pageSize;
     this.http.get("/dzkk/getDzkkList",param,this.getDzkkListCallBack,this,false);
  },
  watch : {
  }
}
</script>

<style scoped>
.wbxxpanel{
  height: 100%;
  position: relative;
}
.jlbar{
  position: relative;
  height: 22px;
  color: #b6f6ff;
  line-height: 22px;
  top:-10px;
  display: flex;
}
.jlbar .switchShow{
  margin-left: 7px;
}
.jlbar .jlbarMore{
  position:absolute;
  right: 15px;
  cursor: pointer;
}
.seachbar{
 height: 50px;
}
.seachbar_InputSearch{
  height: 36px;
  margin: 0px 0 17px 0;
}
.seachbar_dropdown{
  height: 36px;
  margin: 0px 0 17px 0;
}
.seachbar_fanhui{
  position:absolute;
  left: 90%;
  color: white;
  top:2px;
  font-size: 20px;
  cursor: pointer;
}
.wblist-panel{
  height: calc(100% - 135px);
  overflow: auto;
}
.pagebar{
  height: 24px;
  position: absolute;
  left: 11px;
  bottom: -20px;
}
.modal-div{
  text-align: right;
  margin-top: 10px;
  margin-right:20px;
  margin-left:20px;
}
.modal-div span{
  width: 85px;
  text-align: right;
  margin-right: 10px;
}
.inputclass{
  width:180px;
  height: 28px;
  padding:0 10px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
select {
  height:25px;
  width:111px;
  color: white;
  border: 1px solid white;
  outline: none;
  /*很关键：将默认的select选择框样式清除*/
  /* appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none; */
  /*将背景改为红色*/
  background:transparent;
  /*加padding防止文字覆盖*/
   padding-right: .14rem;
}
option {
  color: #b6f6ff;
  height:30px;
  border: 1px solid white;
  outline: none;
  /*很关键：将默认的select选择框样式清除*/
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  /*将背景改为项目颜色*/
  background-color:rgba(8, 56, 90, 0.90);
  /*加padding防止文字覆盖*/
   padding-right: .14rem;
}
</style>
<style>
.wbselect-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left:300px;
  width: 350px !important;
}
</style>
