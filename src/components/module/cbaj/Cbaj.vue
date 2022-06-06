<template>
    <div class="cbajpanel">
      <LeftContentNameBar :isshowshaixuan="true" :isshowclear="isshowclear" @on-click="clickMoreIcon" @on-clear="fanhuisearch"  />
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" v-model="name" @on-clear="fanhuisearch"/>
            <div class="seachbar_caozuo">
              <div class="seachbar_add" title="添加案件" ></div>
            </div>
        </div>
        <div class="cbajlist-panel">
            <div v-for="groupObj in cbajItemList" :key="groupObj.id" class="cbaj_item_class">
                <div style="height: 56px;">
                    <div style="width:83%;float:left;height:56px;cursor: pointer;" @click="showChilds($event)" >
                        <div class="item_div_class" style="color: #fff;">{{groupObj.cbtitle}}</div>
                        <div class="item_div_class" style="color: #58E8FF;top:18px;">{{groupObj.insertusername}}</div>
                    </div>
                    <div style="width:17%;float:left;height:56px;">
                        <div  class="xiugaiClass" title="修改预案分组"></div>
                        <div  class="shanchuClass" title="删除预案分组"></div>
                    </div>
                </div>
                <div style="display:none;margin-bottom: 3px;">
                  <CbajItemButton v-for="cbajObj in groupObj.hczzlist" :key="cbajObj.id" :data="cbajObj"/>
                </div>
            </div>
        </div>
        <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
    </div>
</template>

<script>

import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import DropdownTreeNew from '@/components/base/DropdownTreeNew'
import PagerNew from '@/components/base/PagerNew'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import common from "@/common.js"
import CbajItemButton from '@/components/module/cbaj/CbajItemButton'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'

export default {
  name: 'Cbaj',
  components: { InputSearchNew,DropdownTreeNew,PagerNew,CbajItemButton,LeftContentNameBar},
  data () {
    return {
      deptListObj:{},
      showMore:false,
      showAddObj:{showmodal:false},
      showEditObj:{showmodal:false},
      btndata:{},
      name:"",
      state:"",
      starttime:"",
      endtime:"",
      page:1,
      pageSize:10,
      totalSize:0,  //总共页数
      deptcode:"",  //选择的部门
      cbajItemList:[],
      isshowclear:false,  //清楚删选条件按钮是否显示
    }
  },
  computed: mapState({
     userInfo: state => state.userInfo
  }),
  methods:{
      showChilds(e){
        var el = e.currentTarget;
        var display = $(el).parent().next().css("display");
        if(display == "block"){
          $(el).parent().next().hide();
        }else{
          $(el).parent().next().show();
        }
      },
      inputSearch(){
        this.page = 1;
        this.searchAjzcItems();
      },
      fanhuisearch(){
        this.page = 1;
        this.name = "";
        this.searchAjzcItems();
        this.isshowclear=false;
      },
      clickMoreIcon(){
          this.showMore=true;
      },
      reset(){
        this.name = "";
        this.state = "";
        this.starttime = "";
        this.endtime = "";
      },
      submitSearch(){
        this.page = 1;
        this.searchAjzcItems();
        this.showMore = false;
        this.isshowclear=true;
      },
      pageChange(page){
        this.page = page;
        this.searchAjzcItems();
      },
      searchAjzcItems(){
        var paramObj = {};
        //翻页
        paramObj.deptcode = this.deptcode;
        paramObj.name = this.name;
        paramObj.state = this.state;
        paramObj.starttime = this.starttime;
        paramObj.endtime = this.endtime;
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize;
        this.http.get("/qzlq/getHczzCbaj",paramObj,this.getAjzcItemsCallBack,this,false);
      },
      getAjzcItemsCallBack(data){
        this.totalSize = data.count;
        this.cbajItemList = data.list;
      },
      getHczzCbajCallBack(data){
        this.totalSize = data.count;
        this.cbajItemList = data.data;
      },
  },
  created(){
      //获取案件主题
     var paramObj = {}; 
     paramObj.page = this.page;
     paramObj.pagesize = this.pageSize;
     this.http.get("/qzlq/getHczzCbaj",paramObj,this.getHczzCbajCallBack,this,false);
  }
}
</script>

<style scoped>
.cbajpanel{
  height: 100%;
  position: relative;
}
.cbajbarMore{
  position:absolute;
  right: 15px;
  cursor: pointer;
}
.seachbar{
  height: 80px;
} 
.seachbar_InputSearch{
  height: 36px;
  margin: 0px 0 17px 0;
}
.seachbar_dropdown{
  height: 36px;
  margin: 0px 0 17px 0;
}
.seachbar_caozuo{
  position: relative;
  height: 39px;
  right: 0px;
}
.seachbar_add{
 position:absolute;
  cursor: pointer;
  right: 0px;
  top: 0px;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/ajzc/ajzc_add.png)  no-repeat;
}
.seachbar_shuaxin{
  position:absolute;
  right: 30px;
  top: 0px;
  cursor: pointer;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/ajzc/ajzc_refresh.png)  no-repeat;
}
.xiugaiClass{
    position: relative;
    top: 15px;
    display: inline-block;
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 5px;
    background: 
    url(./../../../assets/dztc/dztc_mdy.png)  no-repeat;
}
.shanchuClass{
    position: relative;
    top: 15px;
    display: inline-block;
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 5px;
    background: 
    url(./../../../assets/dztc/dztc_del.png)  no-repeat;
}
.item_div_class{
    top: 10px;
    margin-left: 16px;
    position: relative;
}
.cbajlist-panel{
  height: calc(100% - 150px);
  overflow: auto;
}
.cbaj_item_class{
    border: 1px solid #00fffc;
    margin: 7px 3px 0 0;
}
.pagebar{
  height: 24px;
  position: absolute;
  left: 20px;
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
  padding: 0 10px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.date-picker{
  width: 180px;
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
.cbajselect-panel .ivu-modal .ivu-modal-content{
  top: 82px;
  left: 300px;
  width: 350px !important;
}
</style>
