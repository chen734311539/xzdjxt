<template>
    <div class="spjkpanel">
      <LeftContentNameBar :isshowshaixuan="false"  style="margin: 15px 0 5px 0;" />
        <div class="spjkbar">
              <div style="height:45px">
                   <div class="spjkbar_liebiao" :class="[showliebiao?ActiveClass:'']" @click="changeSpjkListTable('列表')">列表</div>
                   <div class="spjkbar_fenzu" :class="[showfenzu?ActiveClass:'']" @click="changeSpjkListTable('分组')">分组</div>
              </div>
        </div>
        <div v-show="showliebiao" class="spjklist-table">
          <div class="seachbar">
              <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" v-model="name" @on-clear="fanhuisearch" />
          </div>
          <div v-show="showViewBtn" @click="showViewLayer" style="position: absolute;left: 65%;color: #b6f6ff;cursor: pointer;">
            <div>当前视野</div>
          </div>
          <div class="showandhide">
            <div v-show="showSwitch" style="display:flex;float: right;" @click="showSpjkLayer">
              <div class="showeye"></div>
              <span>显示</span>
            </div>
            <div v-show="!showSwitch" style="display:flex;float: right;" @click="showSpjkLayer">
              <div class="hideeye"></div>
              <span>隐藏</span>
            </div>
          </div>
          <HfxTree @on-click="choiceJkcode" class="spjkselect-tree" :hfxTreelListObj="spjkTree" showname="deptname" uniquekey="id" :isExpand="true" customicon="customiconspjk" />
        </div>
        <div v-show="showfenzu" class="spjkgroup-table">
          <div class="spjkgroupinfo-panel">
            <div class="groupcount">
              <span>小组数:{{spjkGroupCount}}</span>
            </div>
            <div class="addnewgroup" @click="showAddSpjkGroupModal">
              <span>新增小组</span>
              <div class="addgroupicon" >
              </div>
            </div>
          </div>
          <div class="spjkgroup-panel">
            <ShiPinGroupButton v-for="spjkGroupObj in spjkGroupList" :key="spjkGroupObj.groupid" :data="spjkGroupObj"/>
          </div>
          <!-- 新增加小组 -->
          <Modal title="新增小组" v-model="showAddSpjkGroup" class-name="addgroupModal" :draggable="true">
              <div style="width:100%;text-align:center;margin-bottom:15px;">
                <span>小组名称:</span>
                <input v-model="addspjkGroupObj.groupname" class="inputClass"/>
              </div>
              <div style="width:100%;text-align:center;">
                <RadioGroup v-model="addspjkGroupObj.ispublic">
                    <Radio label="1">部门分组</Radio>
                    <Radio label="0">私人分组</Radio>
                </RadioGroup>
                </div>
              <div slot="footer">
                <HfxButton   @click="hideAddSpjkGroupModal" name="取消" />
                <HfxButton   @click="addSpjkGroup" />
              </div>
            </Modal>

        </div>
        <!-- 列表 -->
        <Modal  v-model="showspjklist" :draggable = "true" title="视频监控列表" class-name="spjklistModal" :footer-hide="true" >
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div v-show="spjkList.length>0" class="spjk-panel">
            <div class="spjklist-panel">
              <ShiPinButton v-for="spjkObj in spjkList" :key="spjkObj.id" :data="spjkObj" @on-click="clickSpjkButton" @handler="ShiPinDetailHandler"/>
            </div>
            <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/> 
          </div>
          <div v-show="spjkList.length==0" class="nospjk">
           <span>无视频监控设备</span>
          </div>
        </Modal>
        <!-- 分组的列表 -->
        <!-- <Modal :title="data.groupname" v-model="showGroupSpjkList" class-name="groupSpjkListModal" :draggable="true" :footer-hide="true" >
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div v-show="groupSpjkList.length>0" class="spjk-panel">
            <div class="spjkgrouplist_panel">
              <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" v-model="name" @on-clear="fanhuisearch" />
              <div class="spjklist-panel">
                <ShiPinGroupSpButton v-for="spjkObj in groupSpjkList" :key="spjkObj.id" :data="spjkObj" :groupid="data.groupid" @handler="ShiPinDetailHandler"/>
              </div>
              <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
            </div>
          </div>
          <div v-show="groupSpjkList.length==0" class="nospjk">
           <span>无视频监控设备</span>
          </div>
        </Modal> -->
    </div>
</template>

<script>
//iconfont iconzhaopian
import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import PagerNew from '@/components/base/PagerNew'
import ShiPinButton from '@/components/module/spjk/ShiPinButton'
import ShiPinGroupButton from '@/components/module/spjk/ShiPinGroupButton'
import ShiPinDetailMap from '@/components/module/spjk/ShiPinDetailMap'
import markUtil from '@/components/map/js/markUtil'
import mapUtil from '@/components/map/js/mapUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTree from '@/components/base/HfxTree'
import map3DUtil from '@/components/map/js/map3DUtil'

export default {
  name: 'ShiPin',
  components: { HfxTree,InputSearchNew,ShiPinButton,ShiPinGroupButton,ShiPinDetailMap,PagerNew,LeftContentNameBar},
  data () {
    return {
      showSwitch:false,
      disabledGroup:"列表",
      showMore:false,
      showliebiao:true,
      showfenzu:false,
      ActiveClass:"activeclass",
      showAddSpjkGroup:false,
      spjkTree:[],
      name:"",
      page:1,
      pageSize:50,
      jkcode:"",
      totalSize:1,  //总共页数
      spjkList:[],   //视频的list
      spjkGroupList:[],//视频分组list
      spjkGroupCount:0,
      isfanhuishow:false, //返回按钮是否显示
      showspjklist:false,//显示右边视频列表
      addspjkGroupObj:{
        groupname:"",
        ispublic:"1",
      },
      showViewBtn:false,//显示当前视野
    }
  },
   computed: mapState({
     userInfo: state => state.userInfo,
     currentMapLevel:state => state.currentMapLevel,
     currentMapType:state => state.currentMapType,
  }),
  methods:{
      showSpjkLayer(){//显示隐藏警情图层
        if(this.showSwitch){//显示
          this.layerObj.spjk=true;
          var layer = this.map.map.getLayer("spjkLayer");
          if(layer){
            layer.show();
          }
          this.showSwitch=!this.showSwitch;
        }else{//隐藏
          this.layerObj.spjk=false;
            var layer = this.map.map.getLayer("spjkLayer");
            if(layer){
              layer.hide();
            }
          this.showSwitch=!this.showSwitch;
        }
      },
      showViewLayer(){
          var paramObj = {};
          var map = this.map.map;
          var fromLayerInfo = this.map.fromLayerInfo;
          var xmin = map.extent.xmin;
          var ymin = map.extent.ymin;
          var xmax = map.extent.xmax;
          var ymax = map.extent.ymax;	
          var points = [{"lon":xmin,"lat":ymin},{"lon":xmax,"lat":ymax}];
          if(fromLayerInfo.xml.layerType=="realmap"){//坐标转化
            var pointsArry =[];
            var point1 ={
                "lon":mapUtil.point25ToPoint(fromLayerInfo,xmin, ymin).x,
                "lat":mapUtil.point25ToPoint(fromLayerInfo,xmin, ymin).y
            };
            var point2 ={
                "lon":mapUtil.point25ToPoint(fromLayerInfo,xmax, ymin).x,
                "lat":mapUtil.point25ToPoint(fromLayerInfo,xmax, ymin).y
            };
            var point3 ={
                "lon":mapUtil.point25ToPoint(fromLayerInfo,xmax, ymax).x,
                "lat":mapUtil.point25ToPoint(fromLayerInfo,xmax, ymax).y
            };
            var point4 ={
                "lon":mapUtil.point25ToPoint(fromLayerInfo,xmin, ymax).x,
                "lat":mapUtil.point25ToPoint(fromLayerInfo,xmin, ymax).y
            };
            var point5 ={
                "lon":mapUtil.point25ToPoint(fromLayerInfo,xmin, ymin).x,
                "lat":mapUtil.point25ToPoint(fromLayerInfo,xmin, ymin).y
            };
            pointsArry[0] = point1;
            pointsArry[1] = point2;
            pointsArry[2] = point3;
            pointsArry[3] = point4;
            pointsArry[4] = point5;
            paramObj.drawtype = "3";
            paramObj.points = pointsArry;
          }else{
            paramObj.drawtype = "2";
            paramObj.points = points;
          }
          this.http.post("/spjk/getSpjkNear",paramObj,this.getSpjkNearCallBack,this,false);
      },
      getSpjkNearCallBack(data){
        yewuMarkUtil.addSpjkMarks(data,this.ShiPinDetailHandler,this);//打点
      },
      addAlljkdw(){
        var paramObj = {};
        paramObj.hasloc = "1";
        this.http.get("/spjk/getSpjk",paramObj,this.getSpjkCallBack,this,false);
      },
      clickMoreIcon(){
        this.showMore = !this.showMore;
      },
      inputSearch(value){
        this.page = 1;
        this.searchSpjk();
        this.isfanhuishow = true;
      },
      changeSpjkListTable(value){
        if(value=="分组"){
          this.showliebiao = false;
          this.showfenzu = true;
          this.showspjklist =false;
        }else{
          this.showliebiao = true;
          this.showfenzu = false;
          this.showspjklist =true;
        }
      },
      changetable(value){
        if(value=="分组"){
          this.showliebiao = false;
          this.showfenzu = true;
        }else{
          this.showliebiao = true;
          this.showfenzu = false;
        }
      },
      showAddSpjkGroupModal(){
        this.showAddSpjkGroup = true;
      },
      hideAddSpjkGroupModal(){
        this.showAddSpjkGroup = false;
      },
      addSpjkGroup(){
        if(this.addspjkGroupObj.groupname=="" || this.addspjkGroupObj.groupname==null){
            this.$Message.error("分组名称不能为空");
            return;
        }
        var obj = {};
        obj.groupname = this.addspjkGroupObj.groupname;
        obj.ispublic = this.addspjkGroupObj.ispublic;
        this.http.get("/spjk/addSpjkGroup",obj,this.addSpjkGroupCallBack,this,false);
      },
      addSpjkGroupCallBack(){
        this.showAddSpjkGroup = false;
        //获取视频监控分组
        this.http.get("/spjk/getSpjkGroupList",null,this.getSpjkGroupCallBack,this,false);
      },
      spjkTreeChildren(children){
         for(var i=0;i<children.length;i++){
              children[i].title = children[i].deptname
              children[i].expand = false;
              if(children[i].children){
                this.spjkTreeChildren(children[i].children);
              }
         }
      },
      getSpjkTreeCallBack(data){
          this.spjkTree = data[0];
      },
      choiceJkcode(data){
        this.jkcode = data.jkcode;
        this.page = 1;
        this.searchSpjk();
      },
      pageChange(page){
        this.page = page;
        this.searchSpjk();
      },
      reset(){//筛选框清空
        this.name = "";
      },
      submitSearch(){
          this.page = 1;
          this.searchSpjk();
          this.isfanhuishow=true;
      },
      getSpjkCallBack(data){
        this.totalSize = data.count;
        this.spjkList = data.data;
        this.showspjklist=true;
        if(this.currentMapType=="3D"){
            map3DUtil.addSpjkPoints(this.spjkList,"spjkLayer");//打点
        }else{
           yewuMarkUtil.addSpjkMarks(this.spjkList,this.ShiPinDetailHandler,this);//打点
        }
      },
      //第一次进入不显示列表,但是在地图上显示所有的点;
      getSpjkfirstCallBack(data){
        this.totalSize = data.count;
        this.spjkList = data.data;
        if(this.currentMapType=="3D"){
            map3DUtil.addSpjkPoints(this.spjkList,"spjkLayer",this.ShiPinDetailHandler);//打点
        }else{
           yewuMarkUtil.addSpjkMarks(this.spjkList,this.ShiPinDetailHandler,this);//打点
        }
      },
      getSpjkGroupCallBack(data){
        this.spjkGroupList = data.data;
        this.spjkGroupCount = data.count;
      },
      fanhuisearch(){
        this.page = 1;
        this.reset();
        this.isfanhuishow = false;
        this.searchSpjk();
      },
      searchSpjk(){
        var paramObj = {};
        //翻页
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize;
        //关键字
        paramObj.name = this.name;
        paramObj.jkcode = this.jkcode;
        this.http.get("/spjk/getSpjk",paramObj,this.getSpjkCallBack,this,false);
      },
      
      clickSpjkButton(data){
        if(data.loc&&data.loc.x){//地图上显示
            if(this.currentMapType=="3D"){
              map3DUtil.map3dCenterAt(data.loc);
            }else{
              markUtil.centerAndShow("spjkLayer",data.id,this);
            }
        }else{//没有坐标，不在地图上显示
          
        }
      },
      ShiPinDetailHandler(data,state){
        if(state=="location"){//定位
          this.searchSpjk();
        }else if(state=="addspjkgroup"){
          this.http.get("/spjk/getSpjkGroupList",null,this.getSpjkGroupCallBack,this,false);
        }
      }
  },
  created(){
     //获取视频监控树
     this.http.get("/spjk/getSpjkTree",null,this.getSpjkTreeCallBack,this,false);
     //获取视频监控分组
     this.http.get("/spjk/getSpjkGroupList",null,this.getSpjkGroupCallBack,this,false);
     var paramObj = {};
        //翻页
     paramObj.page = this.page;
     paramObj.pagesize = this.pageSize;
     this.http.get("/spjk/getSpjk",paramObj,this.getSpjkfirstCallBack,this,false);
  },
  watch : {
       currentMapLevel:function(val){
         var layerType = this.map.fromLayerInfo.xml.layerType;
         this.showViewBtn = false;
         if(layerType =="yst"&&val>=5){
            this.showViewBtn = true;
         }
         if(layerType =="tdt"&&val>=15){
            this.showViewBtn = true;
         }
         if(layerType =="realmap"&&val>=3){
            this.showViewBtn = true;
         }
       }
  }
}
</script>

<style scoped>
.spjkpanel{
  height: 100%;
  position: relative;
}
.spjkbar{
  margin: 0px 0 17px 0;
}
.spjkbar .switchShow{
  position:absolute;
  top: 4px;
  margin-left: 8px;
}
.spjkbar .spjkbarMore{
  position:absolute;
  right: 15px;
  cursor: pointer;
}
.seachbar{
  margin: 0px 0 10px 0;
}
.seachbar_InputSearch{
  height: 36px;
}
.seachbar_fanhui{
  position:absolute;
  left: 90%;
  color: white;
  top:2px;
  font-size: 20px;
  cursor: pointer;
}
.spjk-add-icon{
  font-size: 24px;
  position: absolute;
  width: 17px;
  top: 2px;
  right: 4%;
  color: #409eff;
}
.spjklist-table{
  height: calc(100% - 130px);
}
.spjkgroup-table{
  height: calc(100% - 90px);
}
.spjkgroup-panel{
  top: 10px;
  height: calc(100% - 20px);
  overflow-y: auto;
  overflow-x:hidden;
}
.modal_style{
    display: flex;
    align-items: center;
    justify-content: center;
}
.inputClass{
  width:180px;
  height: 28px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.dropdowntree{
    color: white;
}
.dropdowntree >>> .ivu-tree-title{
    color: white;
}
.dropdowntree >>> .ivu-tree-title:hover{
    background-color: #1788cc;
}
.dropdowntree >>> .ivu-tree-title-selected, .dropdowntree >>> .ivu-tree-title-selected:hover{
    background-color: #1788cc;
}
.spjkbar_liebiao{
  float: left;
  cursor: pointer;
  width: 50%;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 14px;
  color: #8ddbe8;
  border-bottom: 1px solid #8ddbe8;
}
.spjkbar_fenzu{
  float: left;
  cursor: pointer;
  width: 50%;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 14px;
  color: #8ddbe8;
  border-bottom: 1px solid #8ddbe8;
}
.activeclass{
  color: white;
  border-bottom: 2px solid white;
}
.spjkselect-tree{
  max-height:calc(100% - 20px);
  overflow: auto;
}
.spjk-panel{
  position: relative;
  height: 520px;
}
.spjklist-panel{
  height:  calc(100% - 50px);
  overflow: auto;
}
.pagebar{
  position: absolute;
  left: 0;
  bottom: 0;
}
.nospjk {
  text-align: center;
}
.spjkgroupinfo-panel{
  width: 100%;
  height: 26px;
}
.groupcount{
  float: left;
  color: #b6f6ff;
}
.addnewgroup{
  cursor: pointer;
  float: right;
  color: #b6f6ff;
  display: flex;
}
.addgroupicon{
  width: 19px;
  height: 20px;
  margin-left: 5px;
  background: 
    url(./../../../assets/spjk/spjk_icon_addgroup.png)  no-repeat;
}
.showandhide{
  display: block;
  width: 18%;
  height: 20px;
  color: #b6f6ff;
  margin: 0px 0 10px 0;
  left: 82%;
  position: relative;
  cursor: pointer;
}
.showeye{
  width: 14px;
  height: 12px;
  margin: 2px 5px 0 0;
  background: 
  url(./../../../assets/spjk/spjk_group_showeye.png)  no-repeat;
}
.hideeye{
  width: 14px;
  height: 12px;
  margin: 2px 5px 0 0;
  background: 
  url(./../../../assets/spjk/spjk_group_hideeye.png)  no-repeat;

}
</style>
<style>
.spjkselect-panel .ivu-modal .ivu-modal-content{
  width: 300px !important;
}
.spjklistModal .ivu-modal .ivu-modal-content{
  top: 82px;
  left:387px;
  width: 297px !important;
}
.addgroupModal .ivu-modal .ivu-modal-content{
  top: 82px;
  left:387px;
  width: 400px !important;
}
</style>
