<template>
    <div class="map" id = "hfxmap" @contextmenu.prevent="mouseRightClick" :style="{backgroundColor:isBGcolor?'white':'#08385a'}">
        <div v-show="!show3DMap" class="coordinate">{{coordinate}}</div>
        <!-- <div class="coordinate" :style="{color:coordinateColor}">{{coordinate}}</div> -->
        <!--<div class="map_top_config">
            <div class="mapTool" title="地图工具" v-show="!show3DMap">
              <Icon class="mapToolIcon" custom="iconfont iconwhitegongju" @click.stop="showMapToolDiv"/>
              <div v-show="showMapTool" class="mapToolDiv">
                    <div @click.stop="clearAll" >清除</div>
                    <div @click.stop="ceju" :class="{backgroundBlack:isCeju}">测距</div>
                    <div @click.stop="mianji" :class="{backgroundBlack:isMianji}">面积</div>
                    <div @click.stop="showZbdwDiv" style="width:60px;" :class="{backgroundBlack:showZbdw}">坐标定位</div>
                    <div @click.stop="showSendMsgDiv" style="width:60px;">发送短信</div>
              </div>
              <div v-show="showZbdw" class="zbdwPanel">
                  <div style="width:100%;text-align:center;margin-bottom:10px;">经度:<input v-model="lx" class="inputClass" /></div>
                  <div style="width:100%;text-align:center;margin-bottom:0px;">维度:<input v-model="ly" class="inputClass" /></div>
                  <Button @click="hideZbdwDiv" class="zbdwCancelButton" type="text" size="small" style="width:64px;margin-left:50px;margin-top:8px;color:white;">取消</Button>
                  <Button @click="mapZbdw" type="primary" size="small" style="width:64px;margin-left:10px;margin-top:8px;">定位</Button>
              </div>
              <SendMsg :showSendMsg="showSendMsg" @on-close="closeSendMsg"/>
			      </div>
            <div class="mapTool" title="自定义图层" v-show="!show3DMap">
              <Icon class="mapToolIcon" custom="iconfont icontuceng" @click.stop="showMapLayerDiv"/>
              <div v-show="showMapLayer" class="mapLayerDiv">
                    <Checkbox v-model="isShowXq" @on-change="changeXq">辖区</Checkbox>
                    <Checkbox v-model="isShowLk" @on-change="showLkLayer">路况</Checkbox>
              </div>
			      </div>
            <div class="mapTool" title="警力控件" v-show="!show3DMap">
              <Icon class="mapToolIcon" custom="iconfont icondingwei1" @click.stop="showJlLayerDiv"/>
              <div v-show="showJlLayer" class="jlLayerDiv">
                <CheckboxGroup v-model="jltypes" @on-change="changeJlTypes">
                  <Checkbox label="5">对讲机</Checkbox>
                  <Checkbox label="3" >警车</Checkbox>
                  <Checkbox label="4" >警务通</Checkbox>
                  <Checkbox label="9" >转运车-人员</Checkbox>
                  <Checkbox label="10" >转运车-样本</Checkbox>
                </CheckboxGroup>
              </div>
			      </div>
            <div class="mapTool" title="相关控件" v-show="!show3DMap">
              <Icon class="mapToolIcon" custom="iconfont iconchajian1" @click.stop="showKongjianDiv"/>
              <div v-show="showKongjian" class="kongjianDiv">
                    <div @click.stop="spkjDownload" >视频控件</div>
              </div>
			      </div>
        </div> -->
<!--        <div class="drawPanel">-->
<!--          <div class="drawPanelDiv" @click="mapkuangxuan"><Icon class="drawIcon" custom="iconfont iconfangkuang"/></div>-->
<!--          <div class="drawPanelDiv" @click="mapquanxuan"><Icon class="drawIcon" custom="iconfont iconcircle"/></div>-->
<!--          <div class="drawPanelDiv" @click="mapduobianxingxuan"><Icon class="drawIcon" custom="iconfont iconduobianxing"/></div>-->
<!--          <div class="drawPanelDiv" @click="mapxianxuan"><Icon class="drawIcon" custom="iconfont iconxian"/></div>-->
<!--          <div class="drawPanelDiv" @click="showDrawSearchConfigModal"><Icon class="drawIcon" custom="iconfont iconpeizhi"/></div>-->
<!--        </div>-->
        <div class="all_maps"   v-show="baseMapObj.layerid!=null&&moreMap.length&&!show3DMap" :class="{all_maps_hover:isShowAllMapHide,all_maps_yqfk:showYbssDiv}" @mouseover="mouseOver" @mouseout="mouseOut">
            <MapIcon :data="baseMapObj" mapid="hfxmap" @on-click="changeBaseMap"/>
        </div>
        <div class="all_maps_hide_div" v-show="isShowAllMapHide&&moreMap.length>0" :class="{all_maps_hide_div_yqfk:showYbssDiv}" @mouseover="mouseOver" @mouseout="mouseOut" >
            <MapIcon v-for="obj in moreMap" :key="obj.layerid" :data="obj" mapid="hfxmap" @on-click="changeBaseMap"/>
        </div>
        <Modal title="配置地图可搜索数据类型" v-model="showDrawSearchConfig" class-name="configMapSearchModal" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
            <div class="searchtree">
            <Tree ref="drawOptionTree" :data="drawOptionList" :show-checkbox="true" @on-check-change="drawOptionTreeChange"></Tree>
            </div>
          <div slot="footer">
          </div>
        </Modal>
        <!--修改圈选半径div-->
        <div class="buffer-tools" style="width: 330px; left: 517px; top: 532px;z-index:10;">
          <label class="buffer-tools-lab">半径(米)：</label>
          <input type="text" class="buffer-tools-txt" placeholder="请输入半径">
          <HfxButton type="button" style="position: relative;top: 7px;" name="确定" @click="bufferToolsSubmit"/>
          <HfxButton type="button" style="position: relative;top: 7px;" name="取消" @click="bufferToolsCancel"/>
        </div>
        <!--显示地图资源详情列表div-->
        <div class="class_map_detailContainer">
            <div class="map_detailContainer_left">
              <div v-drag class="detail_head">
                <div class="detail_head_title">详情</div>
                <div class="detail_head_close"><img @click="close_map_detail" src="@/assets/chat/chat_close.png"/></div>
              </div>
              <div style="height: 280px;overflow-y: auto;margin-bottom: 10px;">
                 <div v-if="map.ssjqList.length>0" class="detail_list_div">
                   <div class="detail_name">实时警情</div>
                   <div class="detail_count">({{map.ssjqList.length}})</div>
                   <div class="show_right_list"><img @click="showLayerList('ssjq')" style="position: relative;top: 6px;" src="@/assets/map/icon_next.png"/></div>
                   <div style="width:30px;float:right;">
                        <i-switch size="small" :value="true" @on-change="showDrawLayer($event,'drawssjqLayer')"/>
                   </div>
                 </div>
                 <div v-if="map.ssjlList.length>0" class="detail_list_div">
                   <div class="detail_name">实时警力</div>
                   <div class="detail_count">({{map.ssjlList.length}})</div>
                   <div class="show_right_list"><img @click="showLayerList('ssjl')" style="position: relative;top: 6px;" src="@/assets/map/icon_next.png"/></div>
                   <div style="width:30px;float:right;">
                      <i-switch size="small" :value="true" @on-change="showDrawLayer($event,'drawssjlLayer')"/>
                   </div>
                 </div>
                 <div v-if="map.spjkList.length>0" class="detail_list_div">
                   <div class="detail_name">视频监控</div>
                   <div class="detail_count">({{map.spjkList.length}})</div>
                   <div class="show_right_list"><img @click="showLayerList('spjk')" style="position: relative;top: 6px;" src="@/assets/map/icon_next.png"/></div>
                   <div style="width:30px;float:right;">
                      <i-switch size="small" :value="true" @on-change="showDrawLayer($event,'drawspjkLayer')"/>
                   </div>
                 </div>
                 <div v-if="map.dztcList.length>0">
                   <ul>
                     <li>
                        <div class="detail_list_div">
                          <i @click="clickIcon($event)"  class="icon plus"></i>
                          <i @click="clickIcon($event)"   class="icon minus" style="display:none;"></i>
                          <div class="detail_name">定制图层</div>
                        </div>
                        <ul style="display:none">
                          <li v-for=" (groupObj,indexgroup) in map.dztcList" :key="groupObj.groupid">
                            <div class="li_list_div">
                              <i @click="clickIcon($event)"  class="icon plus" style="top:4px;"></i>
                              <i @click="clickIcon($event)"   class="icon minus" style="display:none;top:4px;"></i>
                              <div class="detail_mark_name" style="padding-left:27px" :title="groupObj.groupname">{{common.cutstr(groupObj.groupname,17)}}</div>
                            </div>
                            <ul style="display:none">
                              <li v-for=" (layerObj,indexlayer) in groupObj.layerlist" :key="layerObj.layerid">
                                <div class="li_list_div">
                                  <div class="detail_mark_name" :title="layerObj.layername">{{common.cutstr(layerObj.layername,10)}}</div>
                                  <div class="detail_count">({{layerObj.marklist.length}})</div>
                                  <div class="show_right_list" style="height:20px;line-height:20px"><img @click="showLayerList('dztc',indexgroup,indexlayer)" style="position: relative;top:1px;" src="@/assets/map/icon_next.png"/></div>
                                  <div style="width:30px;float:right;">
                                      <i-switch size="small" :value="true" @on-change="showDrawLayer($event,'drawdztc'+layerObj.layerid+'Layer')"/>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                     </li>
                   </ul>
                 </div>
                 <div v-if="map.shzyList.length>0">
                   <ul>
                     <li>
                        <div class="detail_list_div">
                          <i @click="clickIcon($event)"  class="icon plus"></i>
                          <i @click="clickIcon($event)"   class="icon minus" style="display:none;"></i>
                          <div class="detail_name">社会资源</div>
                        </div>
                        <ul style="display:none">
                          <li v-for=" (groupObj,indexgroup) in map.shzyList" :key="groupObj.groupid">
                            <div class="li_list_div">
                              <i @click="clickIcon($event)"  class="icon plus" style="top:4px;"></i>
                              <i @click="clickIcon($event)"   class="icon minus" style="display:none;top:4px;"></i>
                              <div class="detail_mark_name" style="padding-left:27px" :title="groupObj.groupname">{{common.cutstr(groupObj.groupname,17)}}</div>
                            </div>
                            <ul style="display:none">
                              <li v-for=" (layerObj,indexlayer) in groupObj.layerlist" :key="layerObj.layerid">
                                <div class="li_list_div">
                                  <div class="detail_mark_name" :title="layerObj.layername">{{common.cutstr(layerObj.layername,10)}}</div>
                                  <div class="detail_count">({{layerObj.marklist.length}})</div>
                                  <div class="show_right_list" style="height:20px;line-height:20px"><img @click="showLayerList('shzy',indexgroup,indexlayer)" style="position: relative;top:1px;" src="@/assets/map/icon_next.png"/></div>
                                  <div style="width:30px;float:right;">
                                      <i-switch size="small" :value="true" @on-change="showDrawLayer($event,'drawdztc'+layerObj.layerid+'Layer')"/>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                     </li>
                   </ul>
                 </div>
                 <div v-if="map.ywsjList.length>0">
                   <ul>
                     <li>
                        <div class="detail_list_div">
                          <i @click="clickIcon($event)"  class="icon plus"></i>
                          <i @click="clickIcon($event)"   class="icon minus" style="display:none;"></i>
                          <div class="detail_name">业务数据</div>
                        </div>
                        <ul style="display:none">
                          <li v-for=" (groupObj,indexgroup) in map.ywsjList" :key="groupObj.groupid">
                            <div class="li_list_div">
                              <i @click="clickIcon($event)"  class="icon plus" style="top:4px;"></i>
                              <i @click="clickIcon($event)"   class="icon minus" style="display:none;top:4px;"></i>
                              <div class="detail_mark_name" style="padding-left:27px" :title="groupObj.groupname">{{common.cutstr(groupObj.groupname,17)}}</div>
                            </div>
                            <ul style="display:none">
                              <li v-for=" (layerObj,indexlayer) in groupObj.layerlist" :key="layerObj.layerid">
                                <div class="li_list_div">
                                  <div class="detail_mark_name" :title="layerObj.layername">{{common.cutstr(layerObj.layername,10)}}</div>
                                  <div class="detail_count">({{layerObj.marklist.length}})</div>
                                  <div class="show_right_list" style="height:20px;line-height:20px"><img @click="showLayerList('ywsj',indexgroup,indexlayer)" style="position: relative;top:1px;" src="@/assets/map/icon_next.png"/></div>
                                  <div style="width:30px;float:right;">
                                      <i-switch size="small" :value="true" @on-change="showDrawLayer($event,'drawdztc'+layerObj.layerid+'Layer')"/>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                     </li>
                   </ul>
                 </div>
              </div>
            </div>
            <div class="map_detailContainer_right">
                <div class="maplist_panel">
                    <div v-if="currentType=='ssjq'"><JingQingButton v-for="jqObj in map.showMapList" :key="jqObj.id" :data="jqObj" @on-click="clickJqButton"/></div>
                    <div v-if="currentType=='ssjl'"><JingLiButton  v-for="jlObj in map.showMapList" :key="jlObj.gpsid" :data="jlObj" @on-click="clickJlButton"/></div>
                    <div v-if="currentType=='spjk'"><ShiPinButton   v-for="spjkObj in map.showMapList" :key="spjkObj.id" :data="spjkObj" @on-click="clickSpjkButton"/></div>
                    <div v-if="currentType=='spjk'">
                      <div  style="width:265px;height:30px;position: absolute;bottom: 5px;">
                       <div title="显示最近9路视频" style="float:right;margin-left: 15px;cursor: pointer;"><img @click="playSpjk(9)" style="position: relative;top: 6px;" src="@/assets/map/icon_ninebox.png"/></div>
                       <div title="显示最近4路视频" style="float:right;cursor: pointer;"><img @click="playSpjk(4)" style="position: relative;top: 6px;" src="@/assets/map/icon_fourbox.png"/></div>
                      </div>
                    </div>
                    <div v-if="currentType=='dztc'||currentType=='shzy'||currentType=='ywsj'">
                      <div  v-for="markObj in map.showMapList" :key="markObj.markid" @click="clickMark(markObj)"
                        style="background-color: rgba(88,245,255, 0.1);padding:10px 25px;margin-bottom:2px;cursor: pointer;justify-content:space-between;" class="flexr">
                        <span style="color:white;width: 170px;" :title="markObj.markname">{{common.cutstr(markObj.markname,25)}}</span>
                        <span v-if="markObj.distance" style="color:red;right:0px;position:relative;">{{markObj.distance}}米</span>
                        <div v-if="markObj.marktype=='1'" class="huadianClass"></div>
                        <div v-if="markObj.marktype=='2'" class="huaxianClass"></div>
                        <div v-if="markObj.marktype=='3'" class="huamianClass"></div>
                        <div v-if="markObj.marktype=='4'" class="huawenziClass"></div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="changemapdiv">
          <!-- <div v-if="!show3DMap" title="点击切换到3D地图" @click="load3DMap">2D</div> -->
          <div v-if="show3DMap" title="点击切换到2D地图" @click="load2DMap">3D</div>
        </div>
        <!-- <Map3d v-if="show3DMap" :centerPoint="centerPoint"/> -->
        <!-- <ZbbqPage v-if="showZbbq.show" :isshow="showZbbq"/> -->
    </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import dynamicLoading from "./js/dynamicLoading.js"
import TiledLayer from "./js/TiledLayer.js"
import mapUtil from "./js/mapUtil.js"
import markUtil from "./js/markUtil.js"
import yewuMarkUtil from "./js/yewuMarkUtil.js"
import XqglDetail from '@/components/module/xqgl/XqglDetail'
import MapIcon from '@/components/map/MapIcon'
// import Map3d from '@/components/map/Map3d'
import SendMsg from '@/components/base/SendMsg'
import ZbbqPage from '@/components/base/ZbbqPage'
import JingQingButton from '@/components/module/jq/JingQingButton'
import JingLiButton from '@/components/module/jl/JingLiButton'
import ShiPinButton from '@/components/module/spjk/ShiPinButton'
import map3DUtil from '@/components/map/js/map3DUtil'

export default {
  name: 'Map',
  components: {XqglDetail,MapIcon,SendMsg,ZbbqPage,JingQingButton,JingLiButton,ShiPinButton},
  data () {
    return {
      coordinate:"",
      coordinateColor:'#000',
      showMapTool:false,//地图工具
      showMapLayer:false,//图层控件
      showJlLayer:false,//警力控件
      jlTimer:null,//获取在线警力定时器
      isgetOnlineJl:false,
      isCeju:false,
      isMianji:false,
      lx:"",
      ly:"",
      showZbdw:false,
      showSendMsg:false,
      isShowXq:false,
      showDrawSearchConfig:false,
      drawOptionList:[],
      baseMapObj:{},
      moreMap:[],
      isShowLk:false,
      lkTimer:'',
      lklayerid:'',//路况图层的id
      isShowAllMapHide:false,
      showKongjian:false,
      currentType:'',//地图详情当前显示的数据类型
      showZbbq:{show:false},
      show3DMap:false,
      centerPoint:{
         lon: 120.9242805,
         lat: 30.492742,
         alt: 2000,
      },
    }
  },
  computed: {...mapState({
    userInfo: state => state.userInfo,
    isBGcolor:state => state.isBGcolor,
    currentMapType:state => state.currentMapType,
    currentJlTypes:state => state.currentJlTypes,
    showYbssDiv:state => state.showYbssDiv,
  }),
  jltypes:{//需要加载的警力
    get:function(){
    return this.currentJlTypes;
    },
    set:function(newValue){
      this.$store.dispatch('putState',{"key":"currentJlTypes","value":newValue});
    },
  },
  },
  methods:{
     load3DMap(){
        var centerPoint2D = mapUtil.getMapCenterPoint(this);
        this.centerPoint.lon = centerPoint2D.x;
        this.centerPoint.lat = centerPoint2D.y;
        $("#hfxmap_root").hide();
        this.show3DMap = true;
        this.$store.dispatch('putState',{"key":"currentMapType","value":"3D"});
     },
     load2DMap(){
       this.show3DMap = false;
       $("#hfxmap_root").show();
       this.$store.dispatch('putState',{"key":"currentMapType","value":"2D"});
       var extent = map3DUtil.getCurrentExtent();
       markUtil.moveMapAndLevel(extent.lon,extent.lat,extent.level,this);
     },
     mouseOver(){
         this.isShowAllMapHide = true;
     },
     mouseOut(){
        this.isShowAllMapHide = false;
     },
     mapInit(){
       // this.http.get("/user/getMap.do",null,this.getMapCallBack,this,true);
       var result ={
         "code": 1,
         "data": [
           {
             "icon": "ew_map.png",
             "id": "4",
             "isbasemap": "1",
             "isdelete": "0",
             "label": "高德图",
             "layerid": "gaodesl",
             "type": "gaodesl",
             "url": "/static/xml/gaode.xml",
             "urlpattern": "https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={col}&y={row}&z={level}"
           },
           {
             "icon": "yx_map.png",
             "id": "5",
             "isbasemap": "0",
             "isdelete": "0",
             "label": "嘉兴影像",
             "layerid": "jiaxingyx",
             "type": "tdtss",
             "url": "/static/xml/haiyanyxtdt.xml",
             "urlpattern": "https://t0.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE=default&FORMAT=tiles&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=4267820f43926eaf808d61dc07269beb",
             "urlzjpattern": "https://t0.tianditu.gov.cn/cia_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=cia&STYLE=default&FORMAT=tiles&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=4267820f43926eaf808d61dc07269beb"
           }
         ],
         "success": true
       };
       this.getMapCallBack(result);
     },
     getMapCallBack(result){
       var data = result.data;
       var that = this;
       try{
          var temp = new esri.layers.TiledMapServiceLayer();
        }catch(e){
          setTimeout(function(){
             that.getMapCallBack(result);
          },200);
          return;
        }
        TiledLayer.TiledLayerInit();
        mapUtil.getMapArray(data,this);
        var basemapid = "";
        for(var i=0;i<this.map.map_mapArray.length;i++){
          var obj = this.map.map_mapArray[i];
          if(obj.isbasemap=='1'){
            basemapid = obj.layerid;
            this.baseMapObj = obj;
          }else if(obj.isbasemap=='-1'){
             this.lklayerid = obj.layerid;
          }else{
            this.moreMap.push(obj);
          }
        }
        mapUtil.setBasemap(basemapid,"hfxmap",this);
        if(data.layerid!="jiaxinggdys"){
          this.$store.dispatch('putState',{"key":"isBGcolor","value":true});
        }else{
           this.$store.dispatch('putState',{"key":"isBGcolor","value":false});
        }
     },
     showLkLayer(){
       this.lkTimer = setInterval(this.showLkxx, 1000*30);
       this.showLkxx();
     },
     showLkxx(){
        if(this.isShowLk&&this.lklayerid!=''){
          mapUtil.setBasemap(this.lklayerid,"hfxmap",this,'lklayer');
        }else{
          var map = this.map.map;
          var frombzLayer = map.getLayer(this.lklayerid);//移除注记图层
          if(frombzLayer){
            map.removeLayer(frombzLayer);
          }
          clearInterval(this.lkTimer);
        }
     },
    changeJlTypes(types){
     },
     showOnlineJlLayer(){
       //获取警力
       this.isgetOnlineJl=true;
          var that = this;
          this.getOnlineDjj();
          clearInterval(this.jlTimer);
          this.jlTimer=setInterval( () => {
          that.getOnlineDjj();
          }, 1000*10)
     },
     hideOnlineJlLayer(){
       this.isgetOnlineJl=false;
        clearInterval(this.jlTimer);
        markUtil.showOrHideMapLabel(false,"ssjlLayer",this);
        markUtil.clearLayer("ssjlLayer",this);
     },
     getOnlineDjj(){
        var param = {};
        param.online = "1";
        param.jltypes=this.jltypes;
        this.http.get("/ssjl/getSsjlforKongJian",param,this.getOnlineDjjForMarkCallBack,this,false);
     },
     getOnlineDjjForMarkCallBack(data){
        if(this.currentMapType=="3D"){
          map3DUtil.addJlPoints(data.data,"jlLayer",this.jqHander);//打点
        }else{
         yewuMarkUtil.addJlMarks(data.data,this);
         markUtil.showOrHideMapLabel(true,"ssjlLayer",this);
        }
      },
     clearAll(){
       this.isCeju = false;
       this.isMianji = false;
      //地图上的所有点清除
      markUtil.clearAll(this);
      //清除模块
      this.$store.dispatch('clearState');
     },
     ceju(){
       this.isCeju = !this.isCeju;
       this.isMianji = false;
       markUtil.clearDrawLayer(this);
       if(this.isCeju){
         markUtil.measure("distance",this);
       }
     },
     mianji(){
       this.isMianji = !this.isMianji;
       this.isCeju = false;
       markUtil.clearDrawLayer(this);
       if(this.isMianji){
        markUtil.measure("area",this);
       }
     },
     showZbdwDiv(){
      if(this.showZbdw){
        this.hideZbdwDiv();
      }else{
        this.showZbdw = true;
      }
     },
     hideZbdwDiv(){
       this.curMapTool = 0;
       this.showZbdw = false;
       var layer = this.map.map.getLayer("tempLayer");
       if(layer){
          var g = markUtil.mapGetGraphic("tempLayer","zbdw",this);
          layer.remove(g);
        }
     },
     showSendMsgDiv(){
      this.showSendMsg = !this.showSendMsg
     },
     showMapToolDiv(){
       this.showMapTool = !this.showMapTool
     },
     showMapLayerDiv(){
       this.showMapLayer = !this.showMapLayer
     },
     showJlLayerDiv(){
       this.showJlLayer = !this.showJlLayer
     },
     showKongjianDiv(){
       this.showKongjian = !this.showKongjian
     },
     spkjDownload(){
       window.open(Constants.file_url+"tools/spjk.rar");
     },
     showZbbqDiv(){
        this.showZbbq.show = !this.showZbbq.show;
     },
     mapZbdw(){
        if(this.lx==""){
            this.$Message.error("请输入正确的经度");
            return;
        }
        if(this.ly==""){
            this.$Message.error("请输入正确的纬度");
            return;
        }
        if(!this.common.isNumber(this.lx)){
            this.$Message.error("请输入正确的经度");
            return;
        }
        if(!this.common.isNumber(this.ly)){
            this.$Message.error("请输入正确的纬度");
            return;
        }
        markUtil.moveMap(parseFloat(this.lx),parseFloat(this.ly),this);
        markUtil.addTempMark(this.lx,this.ly,"tempLayer","zbdw",require("@/assets/map/location.png"),this)
     },
     mouseRightClick(){//点击右键,取消画画
       this.isCeju = false;
       this.isMianji = false;
       markUtil.clearDrawLayer(this);
       $(".buffer-tools").hide();
       $(".class_map_detailContainer").hide();
       this.map.ssjqList = [];
       this.map.ssjlList = [];
       this.map.spjkList = [];
       this.map.dztcList = [];
       this.map.shzyList = [];
       this.map.ywsjList = [];
       this.map.showMapList = [];
       this.$emit("handler", "clearybss");
       return false;
     },
     changeXq(){
       if(this.isShowXq){//显示辖区
        var pdeptcode = this.userInfo.directdeptcode;
        this.http.get("/xqgl/getAllXqByMapLevel",{pdeptcode:pdeptcode},this.getAllXqByMapLevelCallBack,this,false);
       }else{//取消显示辖区
          markUtil.clearLayer("xq_layer",this);
       }
     },
     getAllXqByMapLevelCallBack(data){
       for(var i=0;i<data.length;i++){
         if(!data[i].markid){
           continue;
         }
          var param = {};
          param.markid = data[i].markid;
          param.deptcode = data[i].deptcode;
          param.deptname = data[i].markname;
          param.linecolor = data[i].linecolor;
          param.polygoncolor = data[i].polygoncolor;
          param.isMap = true;
          var Profile = Vue.extend({
              template: '<XqglDetail :data="data"/>',
              components: {XqglDetail},
              data: function () {
                  return {
                    data:param
                  }
                },
                methods:{
                }
          });
          data[i].cp = new Profile();
          data[i].type = "xqgl";
          markUtil.addPolygonMark("xq_layer",data[i],this);
        }
     },
     mapkuangxuan(){
       markUtil.draw("EXTENT",this);
     },
     mapquanxuan(){
       markUtil.draw("CIRCLE",this);
     },
     mapduobianxingxuan(){
       markUtil.draw("POLYGON",this);
     },
     mapxianxuan(){
       markUtil.draw("POLYLINE",this);
     },
     showDrawSearchConfigModal(){
       if(this.drawOptionList.length==0){//获取菜单
          this.http.get("/common/getDrawOption",null,this.getDrawOptionCallBack,this,false);
       }
       this.showDrawSearchConfig = true;
     },
     getDrawOptionCallBack(data){
       for(var i=0;i<data.length;i++){
         data[i].title = data[i].typename;
         if(data[i].disable=="0"){
            data[i].checked = true;
          }else{
            data[i].checked = false;
          }
          if(data[i].children){
              this.handleDate(data[i].children);
          }
       }
       this.drawOptionList = data;
     },
     handleDate(list){
         if(list==null || list==undefined){
             return;
         }
         for(var i=0;i<list.length;i++){
            list[i].title = list[i].typename;
            if(list[i].disable=="0"){
              list[i].checked = true;
            }else{
              list[i].checked = false;
            }
             if(list[i].children){
                 this.handleDate(list[i].children);
             }
         }
     },
     drawOptionTreeChange(){
       var list = this.$refs.drawOptionTree.getCheckedNodes();
       var paramList = [];
       for(var i=0;i<list.length;i++){
          var paramObj = {};
          if(list[i].istc=="1"){
            paramObj.istc = "1";
          }else{
            paramObj.istc = "0";
          }
          paramObj.type = list[i].type;
          paramList.push(paramObj);
       }
       this.http.post("/common/saveDrawOption",{data:paramList},null,this,false);
     },
     changeBaseMap(data){
        var newMoreMap = [];
        for(var i=0;i<this.map.map_mapArray.length;i++){
          var obj = this.map.map_mapArray[i];
          if(obj.layerid!=data.layerid&&obj.isbasemap!='-1'){
            newMoreMap.push(obj);
          }
        }
        this.baseMapObj = data;
        this.moreMap = newMoreMap;
        if(data.layerid!="jiaxinggdys"){
          this.$store.dispatch('putState',{"key":"isBGcolor","value":true});
        }else{
           this.$store.dispatch('putState',{"key":"isBGcolor","value":false});
        }
        mapUtil.setBasemap(data.layerid,"hfxmap",this);
        this.showLkxx();//显示路况

     },
     setzbText(text,color){
       this.coordinate = text;
       this.coordinateColor = color;
     },
     closeSendMsg(){
       this.showSendMsg=false;
     },
     bufferToolsSubmit(){
        $(".buffer-tools").hide();
        var radius = parseFloat($(".buffer-tools-txt").val());
        if(radius==undefined||isNaN(radius)||radius==""||radius=="0"){
          return;
        }
        markUtil.reDrawCircle(radius,this);
     },
     bufferToolsCancel(){
       $(".buffer-tools").hide();
     },
     close_map_detail(){
       $(".class_map_detailContainer").hide();
     },
     showLayerList(type,indexgroup,indexlayer){
        this.currentType = type;
        var currentList = [];
        if(type=='ssjq'){
           currentList = this.map.ssjqList;
        }
        if(type=='ssjl'){
           currentList = this.map.ssjlList;
        }
        if(type=='spjk'){
           currentList = this.map.spjkList;
        }
        if(type=='dztc'){
           currentList = this.map.dztcList[indexgroup].layerlist[indexlayer].marklist;
        }
        if(type=='shzy'){
           currentList = this.map.shzyList[indexgroup].layerlist[indexlayer].marklist;
        }
        if(type=='ywsj'){
           currentList = this.map.ywsjList[indexgroup].layerlist[indexlayer].marklist;
        }
        this.$set(this.map,'showMapList',currentList);
     },
     clickJqButton(data){
       markUtil.centerAndShow("drawssjqLayer",data.id,this);
     },
     clickJlButton(data){
        markUtil.centerAndShow("drawssjlLayer",data.gpsid,this);
     },
     clickSpjkButton(data){
        markUtil.centerAndShow("drawspjkLayer",data.id,this);
     },
     clickMark(markObj){
          markUtil.centerAndShow("drawdztc"+markObj.layerid+"Layer",markObj.markid,this);
     },
     clickIcon(e){
      var el = e.currentTarget;
      common.stopEvent(e);
      $(el).parent().siblings("ul").toggle();
      $(el).siblings(".icon").show();
      $(el).hide();
    },
     playSpjk(windcount){
        var CamList = "";
        if(this.map.spjkList.length==0){
           return;
        }
        if(this.map.spjkList.length<=windcount){
           windcount = this.map.spjkList.length;
        }
        for(var i=0;i<windcount;i++){
            CamList = CamList+this.map.spjkList[i].indexcode+",";
        }
        CamList =CamList.substr(0,(CamList.length-1));
        window.location.href = "VideosLiYuan://?method=RealTimeVideo&cameraId=" + indexcode;
        // var param = "btoolpplayerprotocol://ReqType:PlayReal;Language:zh_CN;clear:3;WndCount:"+windcount+";NginxIp:50.89.34.200;NginxPort:443;UserID:admin;"
        //       +"sg:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6InhhdXRoLWF1dGhjIiwiZXhwIjoxNjA5NzI1MjkzLCJpYXQiOjE2MDQ1NDEyOTMsImp0aSI6ImYzMTNlMGU2YTBkMDRjMDY5ZThhMjM4YjhiZjExNmZiIn0.XB82VQ1wf8qaOL4xf2LEdEjswLxyLKsvC-O9qrE5awU;"
        //       +"protocol:https;CamList:"+CamList+";";
        // var iframe = document.createElement("iframe");
        // iframe.src = param;
        // iframe.style.display = 'none';
        // document.body.appendChild(iframe);
     },
     showDrawLayer(flag,type){//显示隐藏图层
        if(flag){//显示
          var layer = this.map.map.getLayer(type);
          if(layer){
              layer.show();
          }
        }else{//隐藏
            var layer = this.map.map.getLayer(type);
            if(layer){
              layer.hide();
            }
        }
      },
  },
  created(){
    if(!this.map.map){
     var that = this;
     dynamicLoading.loadcss(Constants.map_base_url+"js/dijit/themes/tundra/tundra.css");
      dynamicLoading.loadcss(Constants.map_base_url+"js/esri/css/esri.css");
        new Promise(function (resolve, reject) {
          dynamicLoading.loadjs(Constants.map_base_url+"js/init.js");
          resolve();
      }).then(function () {
          setTimeout(function() {
              return that.mapInit();
          }, 500);
      }).catch(function () {});
    }
  },
  watch : {

  },
  directives:{//拖拽div
    drag(elment,bindings){
        if(!elment.parentNode){
          return;
        }
        var el = elment.parentNode.parentNode;
        elment.onmousedown = function(e){
            var disx = e.pageX - el.offsetLeft;
            var disy = e.pageY - el.offsetTop;
            document.onmousemove = function (e){
                el.style.left = e.pageX - disx+'px';
                el.style.top = e.pageY - disy+'px';
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            }
        }
    },
  },
}
</script>

<style scoped>
.map{
    height: 100%;
    width: 100%;
    padding: 0px;
    position: relative;
}
.coordinate{
  position:absolute;
  left: 15%;
  /* color: #000; */
  background: #fff;
  font-size: 12px;
  bottom: 22px;
  z-index: 2;
}
.map_top_config{
    position: absolute;
    top: 50px;
    right: 50px;
    color: #fff;
    font-size: 19px;
    border-radius: 3px;
    padding: 0 5px;
    cursor: pointer;
    z-index: 2;
}
.mapTool{
  position:relative;
	margin: 0 0 10px 0;
	height:36px;
}
.mapToolIcon{
  height: 36px;
	width: 36px;
	background: rgba(0,0,0,.5);
  border-radius: 3px;
  font-size: 20px;
  line-height:36px;
  text-align: center;
}
.mapToolDiv{
  position:absolute;
  top: 0px;
  right: 50px;
  background: rgba(0,0,0,.5);
  height: 36px;
  border-radius: 3px;
  padding: 3px 5px;
  width: 307px;
}
.mapLayerDiv{
  position:absolute;
  top: 0px;
  right: 50px;
  background: rgba(0,0,0,.5);
  height: 36px;
  border-radius: 3px;
  padding: 3px 10px;
  width: 125px;
}
.mapToolDiv div{
  color: #fff;
  font-size: 12px;
  line-height: 25px;
  border-radius: 3px;
  position: relative;
  display:inline-block;
  width: 35px;
  text-align: center;
  margin-left:5px;
  margin-right:5px;
}
.jlLayerDiv{
  position:absolute;
  top: 0px;
  right: 50px;
  background: rgba(0,0,0,.5);
  height: 36px;
  border-radius: 3px;
  padding: 3px 10px;
  width: 400px;
  line-height:30px;
}
.kongjianDiv{
  position:absolute;
  top: 0px;
  right: 50px;
  background: rgba(0,0,0,.5);
  height: 36px;
  border-radius: 3px;
  padding: 3px 5px;
  width: 72px;
}
.kongjianDiv div{
  color: #fff;
  font-size: 12px;
  line-height: 25px;
  border-radius: 3px;
  position: relative;
  display:inline-block;
  width: 55px;
  text-align: center;
  margin-left:5px;
  margin-right:5px;
}
.backgroundBlack{
  background: black;
}
.zbdwPanel{
  position:absolute;
  background: black;
  top: 150px;
  right: 50px;
  width: 250px;
  height: 105px;
  font-size: 12px;
  padding: 15px 10px 10px 10px;
}
.inputClass{
    width: 150px;
    height: 20px;
    background-color:rgba(0, 0, 0, 0);
    color: white;
    border: 1px solid #5b6b72;
    border-radius: 5px;
    margin-left:15px;
}
.zbdwCancelButton:hover{
  background: #2d8cf0;
}
.drawPanel{
  width: 230px;
  height: 37px;
  background: rgba(0,0,0,.5);
  position:absolute;
  left: 50%;
  bottom: 0px;
  z-index: 2;
  transform:translate(-50%,-50%);
}
.drawIcon{
  color: white;
  font-size: 18px;
}
.drawPanelDiv{
  display: inline-block;
  height: 100%;
  width: 37px;
  margin: 0px 3px;
  cursor: pointer;
  line-height: 37px;
  text-align: center;
}
.all_maps{
  position:absolute;
  right: 15px;
  bottom: 15px;
  z-index: 2;
  width: 100px;
  height: 75px;
  padding: 5px 5px 5px 5px;
}
.all_maps_hover{
  background: black;
}
.all_maps_hide_div{
  background: black;
  position:absolute;
  right: 105px;
  bottom: 15px;
  z-index: 2;
  padding: 5px 5px 5px 5px;
  height: 75px;
}
.all_maps_yqfk{
  right: 415px;
}
.all_maps_hide_div_yqfk{
  right: 505px;
}
.searchtree{
  height: 300px;
  width: 95%;
  overflow: auto;
}
.searchtree>>>.ivu-tree-title {
    display: inline-block;
    margin: 0;
    padding: 0 4px;
    border-radius: 3px;
    cursor: pointer;
    vertical-align: top;
    color: #b6f6ff;
    transition: all .2s ease-in-out;
}
.searchtree>>>.ivu-tree-title:hover {
  background-color: rgba(88,245,255, 0.3);
}
.searchtree>>>.ivu-tree-title-selected {
    background-color: rgba(88,245,255, 0.3);
}
.searchtree>>>.ivu-tree-title-selected:hover {
    background-color: rgba(88,245,255, 0.3);
}
.buffer-tools{
    position: absolute;
    left: 45%;
    top: 45%;
    background: #2f4775;
    width: 310px;
    height: 40px;
    color: #fff;
    display: none;
}
.buffer-tools-lab{
  position: relative;
  left: 10px;
  top: 7px;
}
.buffer-tools-txt {
    position: relative;
    top: 7px;
    width: 105px;
    background: rgba(8, 8, 8, 0.28);
    border: 1px solid #3F3C3C;
    border-radius: 3px;
    margin-left: 20px;
    padding-left: 10px;
    color: #fff;
    height: 24px;
}
.class_map_detailContainer{
  display: none;
  position: absolute;
  left: 17%;
  top: 40%;
  height: 330px;
  width: 517px;
  z-index: 50;
  background-color: rgba(8,56,90,0.9) !important;
}
.map_detailContainer_left{
  float: left;
  margin-right: 4px;
  height: 330px;
  width: 230px;
  border: 1px solid #1D7E7E;
  background:
  url(./../../assets/leftcontent/img_jiao_topleft.png)  no-repeat 0% 0%,
  url(./../../assets/leftcontent/img_jiao_topright.png)  no-repeat 100% 0%,
  url(./../../assets/leftcontent/img_jiao_botleft.png)  no-repeat 0% 100%,
  url(./../../assets/leftcontent/img_jiao_botright.png)  no-repeat 100% 100%;
  box-shadow:inset 0 0 40px 0 rgba(22, 121, 154, .52);
}
.map_detailContainer_right{
  float: left;
  height: 330px;
  width: 283px;
  border: 1px solid #1D7E7E;
  background:
  url(./../../assets/leftcontent/img_jiao_topleft.png)  no-repeat 0% 0%,
  url(./../../assets/leftcontent/img_jiao_topright.png)  no-repeat 100% 0%,
  url(./../../assets/leftcontent/img_jiao_botleft.png)  no-repeat 0% 100%,
  url(./../../assets/leftcontent/img_jiao_botright.png)  no-repeat 100% 100%;
  box-shadow:inset 0 0 40px 0 rgba(22, 121, 154, .52);
}
.detail_head{
  height: 40px;
  border-bottom: 1px solid #1D7E7E;
}
.detail_head_title{
  float: left;
  height: 40px;
  line-height: 40px;
  width: 50px;
  color: #4edce8;
  text-align: center;
}
.detail_head_close{
  height: 40px;
  width: 35px;
  line-height: 40px;
  float: right;
  cursor: pointer;
  text-align: center;
}
.detail_list_div{
  height: 30px;
  line-height: 30px;
}
.li_list_div{
  height: 21px;
  line-height: 20px;
  padding-left: 12px;
}
.detail_name{
  display: inline-block;
  width: 74px;
  color: #b6f6ff;
  text-align: right;
}
.detail_mark_name{
  display: inline-block;
  color: #b6f6ff;
  padding-left: 40px;
}
.detail_count{
  width: 30px;
  color: #fff;
  text-align: left;
  display: inline-block;
}
.show_right_list{
  height: 30px;
  width: 35px;
  line-height: 30px;
  float:right;
  cursor: pointer;
  text-align: center;
}
.maplist_panel{
  height: calc(100% - 40px);
  margin: 10px 0 0 0;
  overflow: auto;
}
.plus{
    float: left;
    width: 11px;
    height: 11px;
    position: relative;
    top: 9px;
    left: 23px;
    background: url(./../../assets/tree/tree_plus.png)  no-repeat;
}
.minus{
    float: left;
    width: 11px;
    height: 11px;
    position: relative;
    top: 9px;
    left: 23px;
    background: url(./../../assets/tree/tree_minus.png)  no-repeat;
}
.huadianClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background:
    url(./../../assets/dztc/dztc_dian.png)  no-repeat;
}
.huaxianClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background:
    url(./../../assets/dztc/dztc_xian.png)  no-repeat;
}
.huamianClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background:
    url(./../../assets/dztc/dztc_mian.png)  no-repeat;
}
.huawenziClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    background:
    url(./../../assets/dztc/dztc_wenzi.png)  no-repeat;
}
.changemapdiv{
    position: absolute;
    bottom: 165px;
    right: 52px;
    z-index: 1;
}
.changemapdiv > div{
    color: #4c4c4c;
    width: 30px;
    height: 30px;
    background: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
<style>
.configMapSearchModal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 250px;
  left:690px;
  width: 400px !important;
}
</style>
