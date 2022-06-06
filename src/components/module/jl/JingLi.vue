<template>
    <div class="jlpanel">
      <LeftContentNameBar :isshowshaixuan="true" :isshowclear="isfanhuishow" @on-click="clickMoreIcon" @on-clear="fanhuisearch"  />
        <div class="jlbar">
              <span>在线</span>
              <el-switch class="switchOnline" :width=40 @change="gpsOnlineSwitch(onlineSwitch)" active-color="#13ce66" inactive-color="#ff4949" v-model="onlineSwitch">
              </el-switch>
              <span style="margin-left:7px;">显示</span>
              <el-switch class="switchShow" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="showSwitch" @change="showJlLayer">
              </el-switch>
              <span style="margin-left:7px;">状态</span>
              <el-switch class="switchJlState" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="JlStateSwitch" @change="showJlLabel">
              </el-switch>
              <span style="margin-left:7px;">热力</span>
              <el-switch class="switchJlState" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="JlReliSwitch" @change="showReli">
              </el-switch>
        </div>
         <Modal
            v-model="showMore" :draggable = "true" title="警力筛选" class-name="jlselect-panel">
            <div slot="close"><div class="hfx-modal-close"/></div>
            <div class="modal-div">
                <span>关键字</span>
                <input class="inputclass" v-model="name"/>
            </div>
            <div class="modal-div">
                <span>绑定警员</span>
                <input class="inputclass" v-model="bunduser"/>
            </div>
            <div class="modal-div">
                <span>所属分组</span>
                <select class="inputclass" v-model="jlgroup">
                  <option value="">请选择</option>
                  <!-- <option :value="jjlbObj.code" v-for="jjlbObj in jjlbList" :key="jjlbObj.code">{{jjlbObj.name}}</option> -->
                </select>
            </div>
            <div class="modal-div">
                <span>设备类型</span>
                <select class="inputclass" v-model="typecode">
                  <option value="">请选择</option>
                  <option v-for="item in gpsTypeList" :value="item.typecode" :key="item.typecode">{{ item.typename }}</option>
                </select>
            </div>
            <div slot="footer">
              <HfxButton   @click="fanhuisearch" name="重置" />
              <HfxButton   @click="submitSearch" />
            </div>
        </Modal>
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" @on-clear="fanhuisearch" v-model="name"/>
            <DropdownTreeNew class="seachbar_dropdown" :deptListObj="deptListObj" :choiceDept="choiceDept" :orideptname="userInfo.directdeptname"/>
        </div>
        <div class="jllist-panel">
            <JingLiButton v-for="jlObj in jlList" :key="jlObj.gpsid" :data="jlObj" @on-click="clickJlButton"/>
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
import JingLiButton from '@/components/module/jl/JingLiButton'
import JingLiDetailMap from '@/components/module/jl/JingLiDetailMap'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import common from "@/common.js"
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import PagerNew from '@/components/base/PagerNew'
import map3DUtil from '@/components/map/js/map3DUtil'

export default {
  name: 'JingLi',
  components: { LeftContentNameBar,InputSearchNew,DropdownTreeNew,JingLiButton,PagerNew,JingLiDetailMap},
  data () {
    return {
      showSwitch:true,
      onlineSwitch:true,
      JlStateSwitch:true,
      JlReliSwitch:false,
      deptListObj:{},
      showMore:false,
      name:"",
      bunduser:"",
      jlgroup:"",
      typecode:"",
      page:1,
      pageSize:10,
      totalSize:1,  //总共页数
      online:"1", //1是在线,0是不在线
      jlList:[],   //警力的list
      jlAllList:[],
      isfanhuishow:false,  //返回按钮是否显示
      deptcode:"" , //选择的部门
      gpsTypeList:[],//警力类型
    }
  },
  computed: mapState({
     userInfo: state => state.userInfo,
     pushSsjl: state => state.push.ssjl,
     currentMapType:state => state.currentMapType,
  }),
  methods:{
      clickMoreIcon(){
        this.showMore = !this.showMore;
      },
      inputSearch(value){
        this.page = 1;
        this.searchJl();
        this.isfanhuishow = true;
      },
      gpsOnlineSwitch(switchValue){
        if(switchValue==true){
          this.online = "1";
          this.page = 1;
          this.searchJl();
        }else{
          this.online = "0";
          this.page = 1;
          this.searchJl();
        }
      },
      getDeptTreeCallBack(data){
        this.deptListObj = data;
      },
      choiceDept(data){
        this.page = 1;
        this.deptcode = data.deptcode;
        this.searchJl();
      },
      pageChange(page){
        this.page = page;
        this.searchJl();
      },
      reset(){//筛选框清空
        this.name = "";
        this.bunduser = "";
        this.jlgroup = "";
        this.typecode = "";
      },
      submitSearch(){
          this.page = 1;
          this.searchJl();
          this.isfanhuishow=true;
      },
      getSsjlCallBack(data){
        this.totalSize = data.count;
        this.jlList = data.data;
      },
      getAllSsjlforMarkCallBack(data){
        this.jlAllList = data.data;
        if(this.currentMapType=="3D"){
          map3DUtil.addJlPoints(data.data,"jlLayer",this.jqHander);//打点
        }else{
          if(this.JlReliSwitch){
            markUtil.createHeatmapLayer("jlheatmap",this.jlAllList,this);//热力图层
          }else{
            this.showjllabel = this.JlStateSwitch;
            // markUtil.addCluster("hfxjuhelayer",data.data,this,"ssjl");//聚合图层
            yewuMarkUtil.addJlMarks(data.data,this);
          }
        }
        
      },
      jqHander(data,state){
        map3DUtil.rePlayTrailLine(data);
      },
      fanhuisearch(){
        this.page = 1;
        this.reset();
        this.isfanhuishow = false;
        this.searchJl();
      },
      searchJl(){
        var paramObj = {};
        //翻页
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize;
        //部门
        if(this.deptcode==""){
          paramObj.deptcode = this.userInfo.directdeptcode;
        }else{
          paramObj.deptcode = this.deptcode;
        }
        //关键字
        paramObj.name = this.name;
        //绑定警员信息
        paramObj.bunduser = this.bunduser;
        //警情类别
        paramObj.jlgroup = this.jlgroup;
        //警力设备类型
        paramObj.typecode = this.typecode;
        //是否在线
        paramObj.online = this.online;
        this.http.get("/ssjl/getSsjl",paramObj,this.getSsjlCallBack,this,false);
        paramObj.all = "yes";
        this.http.get("/ssjl/getSsjl",paramObj,this.getAllSsjlforMarkCallBack,this,false);
      },
      searchJlMap(){
        var paramObj = {};
        //翻页
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize;
        //部门
        if(this.deptcode==""){
          paramObj.deptcode = this.userInfo.directdeptcode;
        }else{
          paramObj.deptcode = this.deptcode;
        }
        //关键字
        paramObj.name = this.name;
        //绑定警员信息
        paramObj.bunduser = this.bunduser;
        //警情类别
        paramObj.jlgroup = this.jlgroup;
        //警力设备类型
        paramObj.typecode = this.typecode;
        //是否在线
        paramObj.online = this.online;
        // this.http.get("/ssjl/getSsjl",paramObj,this.getSsjlCallBack,this,false);
        paramObj.all = "yes";
        this.http.get("/ssjl/getSsjl",paramObj,this.getAllSsjlforMarkCallBack,this,false);
      },
      clickJlButton(data){
        if(data.loc&&data.loc.x){//地图上显示
            if(this.currentMapType=="3D"){
              map3DUtil.map3dCenterAt(data.loc);
            }else{
              markUtil.centerAndShow("ssjlLayer",data.gpsid,this);
            }
        }else{//没有坐标，不在地图上显示
          
        }
      },
      showJlLabel(){
         if(this.JlStateSwitch){//显示
            markUtil.showOrHideMapLabel(true,"ssjlLayer",this);
        }else{//隐藏
            markUtil.showOrHideMapLabel(false,"ssjlLayer",this);
        }
      },
      showJlLayer(){
        if(this.showSwitch){//显示
          this.layerObj.jl=true;
          this.JlReliSwitch = false;
          markUtil.showLayer("ssjlLayer",this);
          markUtil.hideLayer("jlheatmap",this);
        }else{//隐藏
          this.layerObj.jl=false;
          markUtil.hideLayer("ssjlLayer",this);
        }
      },
      showReli(){
        if(this.JlReliSwitch){
          this.showSwitch = false;
          this.layerObj.jl=false;
           markUtil.createHeatmapLayer("jlheatmap",this.jlAllList,this);//热力图层
           markUtil.hideLayer("ssjlLayer",this);
        }else{
          this.showSwitch = true;
          this.layerObj.jl=true;
          markUtil.hideLayer("jlheatmap",this);
          markUtil.showLayer("ssjlLayer",this);
        }
      },
      getGpsTypesCallBack(data){
        this.gpsTypeList = data;
      },
  },
  created(){
     //获取警力部门
     this.http.get("/user/getDeptTree",null,this.getDeptTreeCallBack,this,false);
     //获取警力类型
     this.http.get("/gps/getGpsTypes",null,this.getGpsTypesCallBack,this,false);
     //清空选取展示的的警力类型
     this.$store.dispatch('putState',{"key":"currentJlTypes","value":[]});
     //获取警力
     var param = {};
     param.page = this.page;
     param.pagesize = this.pageSize;
     param.online = this.online;
     this.http.get("/ssjl/getSsjl",param,this.getSsjlCallBack,this,false);
     param.all = "yes";
     this.http.get("/ssjl/getSsjl",param,this.getAllSsjlforMarkCallBack,this,false);
     var that = this;
     setInterval( () => {
				that.searchJl();
     }, 1000*60)  
  },
  watch : {
      pushSsjl:function(val) {//警力推送
      // console.log(val.gpsid);
          var from = val.from;
          if(from=="add"){
            this.searchJlMap();//重新查询
          }else if(from=="update"){//update
            if(val.loc){
              markUtil.resetMarkLoc("ssjlLayer",val.gpsid,val.loc,this);
            }
          }else if(from=="delete"){
            this.searchJlMap();//重新查询
          }
      },
  }
}
</script>

<style scoped>
.jlpanel{
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
  justify-content: left;
}
.jlbar .switchOnline{
  margin-left: 7px;
}
.jlbar .switchShow{
  margin-left: 7px;
}
.jlbar .switchJlState{
  margin-left: 7px;
}
.jlbar .jlbarMore{
  position:absolute;
  right: 15px;
  cursor: pointer;
}
.seachbar{
 height: 106px;
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
.jllist-panel{
  height: calc(100% - 220px);
  margin: 0 0 10px 0;
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
.jlselect-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left:387px;
  width: 350px !important;
}
</style>
