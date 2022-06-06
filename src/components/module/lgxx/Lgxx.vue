<template>
    <div class="lgxxpanel">
      <LeftContentNameBar :isshowshaixuan="true" :isshowclear="isfanhuishow" @on-click="clickMoreIcon" @on-clear="fanhuisearch"  />
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" @on-clear="fanhuisearch" v-model="lgmc"/>
        </div>
        <div class="lglist-panel">
            <LgxxButton v-for="(lgObj,index) in lgList" :key="lgObj.LGBH" :data="lgObj" @on-click="clickLgButton" @on-search="searchRy(lgObj.lgbh)" @on-info="showInfo(index)" />
        </div>
        <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
        <Modal v-model="showMore" :draggable = "true" title="旅馆筛选" class-name="lgselect-panel">
            <div class="modal-div">
                <span>旅馆名称</span>
                <input class="inputclass" v-model="lgmc"/>
            </div>
            <div class="modal-div">
                <span>旅馆编号</span>
                <input class="inputclass" v-model="lgbh"/>
            </div>
            <div class="modal-div">
                <span>联系电话</span>
                <input class="inputclass" v-model="lxdh"/>
            </div>
            <div class="modal-div">
                <span>旅馆地址</span>
                <input class="inputclass" v-model="addr"/>
            </div>
            <div class="modal-div">
                <span>管辖单位</span>
                <DropdownTreeNew class="seachbar_dropdown" :deptListObj="deptListObj" :choiceDept="choiceDept" :orideptname="userInfo.directdeptname"/>
            </div>
            <div slot="footer">
              <HfxButton   @click="fanhuisearch" name="重置" />
              <HfxButton   @click="submitSearch" />
            </div>
        </Modal>
        <LgSearchModal :showdata="showdata" />
        <LgInfoModal :showdata="showinfodata"/>
    </div>
</template>

<script>
import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import JingLiDetailMap from '@/components/module/jl/JingLiDetailMap'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import common from "@/common.js"
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import PagerNew from '@/components/base/PagerNew'
import LgxxButton from '@/components/module/lgxx/LgxxButton'
import LgSearchModal from '@/components/module/lgxx/LgSearchModal'
import LgInfoModal from '@/components/module/lgxx/LgInfoModal'
import DropdownTreeNew from '@/components/base/DropdownTreeNew'

export default {
  name: 'Lgxx',
  components: { LeftContentNameBar,DropdownTreeNew,InputSearchNew,PagerNew,LgxxButton,LgSearchModal,LgInfoModal,JingLiDetailMap},
  data () {
    return {
      showMore:false,
      lgmc:"",
      lgbh:"",
      addr:"",
      lxdh:"",
      gxdwdm:"",
      deptcode:"",//管辖单位code
      page:1,
      pageSize:10,
      totalSize:1,  //总共页数
      lgList:[],   //旅馆的list
      isfanhuishow:false,  //返回按钮是否显示
      showdata:{showmodal:false,lgbh:""},
      showinfodata:{showmodal:false,lgbh:"",data:""},
      deptListObj:{},
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
  }),
  methods:{
      clickMoreIcon(){
        this.showMore = !this.showMore;
      },
      inputSearch(value){
        this.page = 1;
        this.searchLg();
      },
      choiceDept(data){
        this.page = 1;
        this.gxdwdm = data.deptcode;
        this.searchLg();
      },
      pageChange(page){
        this.page = page;
        this.searchLg();
      },
      reset(){//筛选框清空
        this.lgmc="";
        this.lgbh="";
        this.addr="";
        this.lxdh="";
        this.gxdwdm="";
      },
      submitSearch(){
          this.page = 1;
          this.searchLg();
          this.isfanhuishow=true;
      },
      getlvguanCallBack(data){
        this.totalSize = data.count;
        this.lgList = data.data;
        // yewuMarkUtil.addJlMarks(this.jlList,this);//打点
      },
      fanhuisearch(){
        this.page = 1;
        this.reset();
        this.isfanhuishow = false;
        this.searchLg();
      },
      searchLg(){
        var param = {};
        param.page = this.page;
        param.pagesize = this.pageSize;
        param.lgmc = this.lgmc;
        param.lgbh = this.lgbh;
        param.addr = this.addr;
        param.lxdh = this.lxdh;
        param.gxdwdm = this.gxdwdm;
        this.http.get("/lgwb/getLvGuanList",param,this.getlvguanCallBack,this,false);
      },
      clickLgButton(data){
        if(data.loc&&data.loc.x){//地图上显示
            // markUtil.centerAndShow("ssjlLayer",data.gpsid,this);
        }else{//没有坐标，不在地图上显示
          
        }
      },
      searchRy(val){
        this.showdata.lgbh=val;
        this.showdata.showmodal=true;
      },
      showInfo(index){
        var obj=this.lgList[index];
        this.showinfodata.lgbh=obj.lgbh;
        this.showinfodata.data=JSON.stringify(obj);
        this.showinfodata.showmodal=true;
      },
      getDeptTreeCallBack(data){
        this.deptListObj = data;
    },
  },
  created(){
     //获取旅馆
     var param = {};
     param.page = this.page;
     param.pagesize = this.pageSize;
     this.http.get("/lgwb/getLvGuanList",param,this.getlvguanCallBack,this,false);
          //获取警情部门
     this.http.get("/user/getDeptTree",null,this.getDeptTreeCallBack,this,false);
  },
  watch : {
  }
}
</script>

<style scoped>
.lgxxpanel{
  height: 100%;
  position: relative;
}
.jlbar{
  position: relative;
  height: 22px;
  color: #b6f6ff;
  line-height: 22px;
  margin: 0 0 19px 0;
  display: flex;
  justify-content: center;
}
.jlbar .switchShow{
  margin-left: 7px;
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
.lglist-panel{
  height: calc(100% - 120px);
  overflow: auto;
}
.pagebar{
  height: 24px;
  position: absolute;
  left: 11px;
  bottom: -20px;
}
.modal-div{
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
.seachbar_dropdown{
  height: 28px;
  width: 180px;
  display: inline-block;
}
</style>
<style>
.lgselect-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left:300px;
  width: 350px !important;
}
</style>
