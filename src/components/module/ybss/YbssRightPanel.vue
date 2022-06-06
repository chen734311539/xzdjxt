<template>
  <div class="ybss_rightpenel">
       <div class="box_panel">
          <div class="header_bg">辖区地址</div>
          <div class="content_panel" style="padding:10px">
              <div style="width:100%;height:40px;">
                  <InputSearchNew class="seachbar_InputSearch" @on-clear="clearSearch" @on-click="searchDz" v-model="searchname"/>
              </div>
              <div style="width:100%;height:calc(100% - 40px);position: relative;">
                  <div class="flexr" v-for="item in xzjdlist" :key="item.id" :class="[barMap.indexOf(item.xzjddm)>-1?'tc_bar_active':'tc_bar']" @click="clickBar(item.xzjddm)">
                      <img src="@/assets/ybss/jiedao.png"/>
                      <div>{{item.xzjdmc}}</div>
                  </div>
                  <div class="flexr" :class="[isdqsy?'other_bar_active':'other_bar']" style="position: absolute;top: -10px;right: 118px;" @click="showDqsy">
                      <img src="@/assets/ybss/dqsy.png"/>
                      <div>当前视野地址</div>
                  </div>
                  <!-- <div class="flexr " :class="[ishyht?'other_bar_active':'other_bar']" style="position: absolute;top: 26px;right: 118px;" @click="showHyht">
                      <img src="@/assets/ybss/dqsy.png"/>
                      <div>海韵华庭小区</div>
                  </div> -->
                  <div class="flexr other_bar" style="position: absolute;top: 26px;right: 118px;" @click="clearYbssMark">
                      <img src="@/assets/ybss/dqsy.png"/>
                      <div>清除图层点位</div>
                  </div>
                  <div class="flexr other_bar" style="position: absolute;top: 63px;right: 118px;" @click="circleMap">
                      <img src="@/assets/ybss/kuangxuan.png"/>
                      <div>&nbsp;&nbsp;圈选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  </div>
                  <div class="flexr other_bar" style="position: absolute;top: 100px;right: 118px;" @click="polygonMap">
                      <img src="@/assets/ybss/kuangxuan.png"/>
                      <div>&nbsp;&nbsp;框选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  </div>
                  <div v-show="drawObj.drawtype" class="flexr other_bar" style="position: absolute;top: 206px;right: 142px;background: #3C84F4;width:100px;">
                      <div>地址总数：{{totalSize}}</div>
                  </div>
                  <div v-show="drawObj.drawtype" class="flexr other_bar" style="position: absolute;top: 206px;right: 33px;background: #3C84F4;width:100px;">
                      <div>总人数：{{peopleCount}}</div>
                  </div>
                  <div v-show="drawObj.drawtype" class="flexr other_bar" style="position: absolute;top: 246px;right: 142px;background: #54b354;width:100px;">
                      <div>常住人口：{{ckcount}}</div>
                  </div>
                  <div v-show="drawObj.drawtype" class="flexr other_bar" style="position: absolute;top: 246px;right: 33px;background: #ffff0073;width:100px;">
                      <div>暂住人口：{{zkcount}}</div>
                  </div>
                  <div v-show="drawObj.drawtype" class="flexr other_bar" style="position: absolute;top: 286px;right: 142px;background: rgb(62 193 193);;width:100px;">
                      <div>人户分离：{{rhflcount}}</div>
                  </div>
                  <div v-show="drawObj.drawtype" class="flexr other_bar" style="position: absolute;top: 286px;right: 33px;background: rgb(23 249 254 / 77%);width:100px;">
                      <div>流动人户分离：{{ldrhflcount}}</div>
                  </div>
                  <div v-show="drawObj.drawtype" @click="importPeople" class="flexr other_bar" style="position: absolute;top: 170px;right: 33px;background: rgb(23 249 254 / 77%);width:100px;">
                      <div>数据导出</div>
                  </div>
              </div>
          </div>
       </div>
       <div class="box_panel">
          <div class="header_bg">标准地址</div>
          <div class="content_panel">
            <div style="width:100%;height:calc(100% - 35px);padding:0 10px;">
                <div class="flexr table1" style="width:100%;height:33px;">
                    <div style="width:10%;color:#03fcd6;">序号</div>
                    <div style="width:90%;color:#03fcd6;">地址详情</div>
                    <div class="addDzClass" @click="addDz" style="color:#03fcd6;">新增</div>
                    <!-- <div style="width:20%;color:#03fcd6;">所属街道</div> -->
                </div>
                <div style="width:100%;height:calc(100% - 33px);overflow-y: auto;">
                    <div v-for="(item, index) in bdzdlist" :key="index" @click="clickYbssButton(item)" class="flexr table1" style="width: 100%;height:10%;cursor: pointer;">
                        <div style="width:10%;" :style="index%2==0?{'background':'rgba(7, 43, 90, 0.91)'}:''">{{index+(page-1)*pageSize+1}}</div>
                        <div style="width:90%;text-align: left;padding-left: 30px;" :style="index%2==0?{'background':'rgba(7, 43, 90, 0.91)'}:''" :title="item.dz">{{common.cutstr(item.dz.replace('浙江省海盐县',''), 40)}}</div>
                        <!-- <div style="width:20%;" :style="index%2==0?{'background':'rgba(7, 43, 90, 0.91)'}:''">{{item.bjdh}}</div> -->
                    </div>
                </div>
            </div>
            <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
          </div>
          <div class="dzadd_panel" v-show="showAddDz">
                <div class="header_div">
                    <div class="header_text">新增地址</div>
                    <img src="@/assets/ybss/close.png" style="position: absolute;right: 12px;top: 9px;cursor: pointer;" @click="closeAddDz"/>
                </div>
                <div style="position: relative;width:100%;height:calc(100% - 40px);padding-left:30px;padding-right:30px;">
                    <div class="flexr" style="width:100%;margin-top:10px;">
                        <RadioGroup v-model="addDzlx" style="color:white;">
                            <Radio label="1" style="margin-right:10px;">地址</Radio>
                            <Radio label="2">房间</Radio>
                        </RadioGroup>
                    </div>
                    <div v-show ="addDzlx=='1'">
                        <div class="flexr" style="margin-top:10px;">
                            <div style="color:#fff;width:70px;">乡镇街道：</div>
                            <div style="color:#fff;width:calc(100% - 70px);">
                                <el-select style="width: 100%;" v-model="addDzObj.xzjddm">
                                        <el-option  key="330424510000" label="武原街道" value="330424510000"></el-option> 
                                        <el-option  key="330424530000" label="澉浦镇" value="330424530000"></el-option> 
                                        <el-option  key="330424540000" label="西塘街道" value="330424540000"></el-option> 
                                        <el-option  key="330424550000" label="秦山街道" value="330424550000"></el-option> 
                                        <el-option  key="330424560000" label="通元镇" value="330424560000"></el-option> 
                                        <el-option  key="330424570000" label="百步镇" value="330424570000"></el-option> 
                                        <el-option  key="330424580000" label="于城镇" value="330424580000"></el-option> 
                                        <el-option  key="330424590000" label="望海街道" value="330424590000"></el-option> 
                                        <el-option  key="330424520000" label="沈荡镇" value="330424520000"></el-option> 
                                </el-select>
                            </div>
                        </div>
                        <div class="flexr" style="margin-top:10px;">
                            <div style="color:#fff;width:70px;">街路巷：</div>
                            <div style="color:#fff;width:calc(100% - 70px);">
                                <el-select ref="jlxselect" style="width: 100%;" v-model="addDzObj.jlxdm" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="searchJlx">
                                        <el-option v-for="item in jlxlist" :key="item.jlxdm" :label="item.jlxmc" :value="item.jlxdm"></el-option> 
                                </el-select>
                            </div>
                        </div>
                        <div class="flexr" style="margin-top:10px;">
                            <div style="color:#fff;width:70px;">门牌号：</div>
                            <div style="color:#fff;width:calc(100% - 95px);"><Input v-model="addDzObj.mph"/></div>
                            <div style="color:#fff;width:20px;margin-left:5px;">号</div>
                        </div>
                        <div class="flexr" style="margin-top:10px;">
                            <div style="color:#fff;width:70px;">楼幢：</div>
                            <div style="color:#fff;width:calc(100% - 95px);"><Input v-model="addDzObj.lz"/></div>
                            <div style="color:#fff;width:20px;margin-left:5px;">幢</div>
                        </div>
                        <div class="flexr" style="margin-top:10px;">
                            <div style="color:#fff;width:70px;">经度：</div>
                            <div style="color:#fff;width:calc(100% - 115px);"><Input v-model="addDzObj.lx"/></div>
                            <div style="color:#fff;width:40px;margin-left:5px;">
                                <Button type="primary" size="small" @click="dwClick">获取</Button>
                            </div>
                        </div>
                        <div class="flexr" style="margin-top:10px;">
                            <div style="color:#fff;width:70px;">纬度：</div>
                            <div style="color:#fff;width:calc(100% - 115px);"><Input v-model="addDzObj.ly"/></div>
                            <div style="color:#fff;width:40px;margin-left:5px;"></div>
                        </div>
                        <div class="flexr" style="margin-top:10px;">
                            <div style="color:#fff;width:70px;">地址</div>
                            <div style="color:#fff;width:calc(100% - 70px);"><Input v-model="adddz" :readonly="true"/></div>
                        </div>
                    </div>
                    <div v-show ="addDzlx=='2'">
                        <div class="flexr" style="margin-top:10px;">
                            <div style="color:#fff;width:70px;">地址名称：</div>
                            <div style="color:#fff;width:calc(100% - 70px);">
                                <el-select style="width: 100%;" v-model="addDzObj.dzid" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="searchRoomDz">
                                        <el-option v-for="item in dzlist" :key="item.id" :label="item.dz" :value="item.id"></el-option> 
                                </el-select>
                            </div>
                        </div>
                        <div class="flexr" style="margin-top:10px;">
                            <div style="color:#fff;width:70px;">房间名：</div>
                            <div style="color:#fff;width:calc(100% - 70px);"><Input v-model="addDzObj.roomname"/></div>
                        </div>
                    </div>
                    <div class="flexr" style="margin-top:10px;">
                        <Button type="warning" @click="closeAddDz">取消</Button>
                        <Button type="primary" v-show ="addDzlx=='1'" style="margin-left:15px;" @click="saveAddDz">新增</Button>
                        <Button type="primary" v-show ="addDzlx=='2'" style="margin-left:15px;" @click="saveAddRoom">新增</Button>
                    </div>
                </div>
            </div>
       </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import PagerNew from '@/components/base/PagerNew'

import markUtil from '@/components/map/js/markUtil'
import mapUtil from '@/components/map/js/mapUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import map3DUtil from '@/components/map/js/map3DUtil'
export default {
    name: 'YbssRightPanel',
    components: {InputSearchNew,PagerNew},
    props:['isshow'],
    data() {
        return {
            barMap:[],
            xzjdlist:[],
            searchname:'',
            ckcount:0,
            zkcount:0,
            rhflcount:0,
            ldrhflcount:0,
            peopleCount:0,
            totalSize:0,
            page:1,
            pageSize:200,
            bdzdlist:[],
            isdqsy:false,
            drawObj:{},
            ishyht:false,
            showAddDz:false,
            addDzObj:{lx:"",ly:""},
            jlxlist:[],
            addDzlx:"1",
            dzlist:[],
        };
    },
    computed: {...mapState({
        userInfo: state => state.userInfo,
        currentMapType:state => state.currentMapType,
    }),
        adddz: function () {
            var dz = "浙江省海盐县";
            if(this.$refs.jlxselect){
                var jlx = this.$refs.jlxselect.selectedLabel;
                dz = dz+jlx;
            }
            if(this.addDzObj.mph){
                dz = dz+this.addDzObj.mph+"号";
            }
            if(this.addDzObj.lz){
                dz = dz+this.addDzObj.lz+"幢";
            }
            return dz;
        }
    },
    methods:{
        clickBar(barindex){
            var index = this.barMap.indexOf(barindex);
            if(index>-1){
                this.barMap.splice(index,1);
            }else{
                this.barMap.push(barindex);
            }
            this.searchDz();
        },
        clearSearch(){
           this.page = 1;
           this.searchname= '';
           this.searchDz();
        },
        pageChange(page){
            this.page = page;
            this.searchDz();
        },
        showDqsy(){
           this.isdqsy = !this.isdqsy;
           if(this.isdqsy){
               var level = parseInt(this.map.map.getLevel());
                if(level<15){
                  this.isdqsy = false;
                  this.$Message.error("当前地图层级不支持搜索，请放大地图层级再操作！")
                  return;
                }
                this.pageSize = 300;
                var map = this.map.map;
                var fromLayerInfo = this.map.fromLayerInfo;
                var xmin = map.extent.xmin;
                var ymin = map.extent.ymin;
                var xmax = map.extent.xmax;
                var ymax = map.extent.ymax;	
                var points = [{"lon":xmin,"lat":ymin},{"lon":xmax,"lat":ymax}];
                if(fromLayerInfo.xml.layerType=="gaode"){//坐标转化
                    var pointsArry =[];
                    var point1 ={
                        "lon":mapUtil.EPoint2ELatLng(fromLayerInfo,xmin, ymin).x,
                        "lat":mapUtil.EPoint2ELatLng(fromLayerInfo,xmin, ymin).y
                    };
                    var point2 ={
                        "lon":mapUtil.EPoint2ELatLng(fromLayerInfo,xmax, ymin).x,
                        "lat":mapUtil.EPoint2ELatLng(fromLayerInfo,xmax, ymin).y
                    };
                    var point3 ={
                        "lon":mapUtil.EPoint2ELatLng(fromLayerInfo,xmax, ymax).x,
                        "lat":mapUtil.EPoint2ELatLng(fromLayerInfo,xmax, ymax).y
                    };
                    var point4 ={
                        "lon":mapUtil.EPoint2ELatLng(fromLayerInfo,xmin, ymax).x,
                        "lat":mapUtil.EPoint2ELatLng(fromLayerInfo,xmin, ymax).y
                    };
                    var point5 ={
                        "lon":mapUtil.EPoint2ELatLng(fromLayerInfo,xmin, ymin).x,
                        "lat":mapUtil.EPoint2ELatLng(fromLayerInfo,xmin, ymin).y
                    };
                    pointsArry[0] = point1;
                    pointsArry[1] = point2;
                    pointsArry[2] = point3;
                    pointsArry[3] = point4;
                    pointsArry[4] = point5;
                    this.drawObj.drawtype = "3";
                    this.drawObj.points = pointsArry;
                }else{
                    this.drawObj.drawtype = "2";
                    this.drawObj.points = points;
                }
                this.searchDz();
           }else{
              this.drawObj = {};
              this.pageSize = 100;
              this.searchDz();
           }
        },
        // showHyht(){
        //     this.ishyht = !this.ishyht;
        //     if(this.ishyht){
        //         this.searchname="海韵华庭";
        //         this.searchDz();
        //         markUtil.moveMapAndLevel(120.9422,30.5395,15,this);
        //     }else{
        //         this.searchname="";
        //         this.searchDz();
        //     }

        // },
        importPeople(){
           if(this.drawObj.drawtype){
              this.http.download("/ybss/importBuildingsPeople",this.drawObj);
           }
        //    this.http.get("/ybss/importBuildingsPeople",paramObj,null,this,false);
        },
        searchDz(){
           var paramObj = {};
           paramObj.name = this.searchname;
           paramObj.page = this.page;
           paramObj.pagesize = this.pageSize;
           paramObj.xzjdlist = this.barMap;
           if(this.drawObj.drawtype){
              paramObj.drawObj = this.drawObj;
           }
           this.http.post("/ybss/getBuildings",paramObj,this.getBuildingsCallBack,this,false);
        },
        getBuildingsCallBack(data){
            this.bdzdlist = data.list;
            this.totalSize = data.count;
            this.ckcount = data.ckcount;
            this.zkcount = data.zkcount;
            this.rhflcount = data.rhflcount;
            this.ldrhflcount = data.ldrhflcount;
            this.peopleCount = data.ckcount+data.zkcount+data.rhflcount+data.ldrhflcount;
            yewuMarkUtil.addYbssMarks(this.bdzdlist,this,this.clickHandler);
            markUtil.showLayer("ybssLayer",this);
        },
        clickHandler(event){
           var id = event.graphic.attributes.id;
           this.$emit("handler", "click", id);
        },
        clickYbssButton(data){
            if(data.loc&&data.loc.x){//地图上显示
                markUtil.moveMap(data.loc.x,data.loc.y,this);
            }else{//没有坐标，不在地图上显示
            
            }
        },
        getXzjdListCallBack(data){
            this.xzjdlist = data;
        },
        hideYbssMarks(){
         markUtil.hideLayer("ybssLayer",this);
        },
        remarkYbssMarks(){
            this.searchDz();
        },
        clearYbssMark(){
            markUtil.clearLayer("ybssLayer",this);
            this.drawObj = {};
        },
        circleMap(){
           markUtil.drawYbss("CIRCLE",this,this.drawHandler);
        },
        polygonMap(){
           markUtil.drawYbss("POLYGON",this,this.drawHandler);
        },
        drawHandler(param){
           this.drawObj = param;
           this.searchDz();
        },
        addDz(){
            this.showAddDz = !this.showAddDz;
        },
        closeAddDz(){
            this.showAddDz = false;
        },
        searchJlx(name){
          var paramObj = {};
          paramObj.name = name;
          paramObj.xzjddm = this.addDzObj.xzjddm;
          this.http.get("/ybss/getJlxByName",paramObj,this.getJlxByNameCallBack,this,false);
        },
        getJlxByNameCallBack(data){
           this.jlxlist = data;
        },
        dwClick(){//警情定位
            markUtil.reLocate(null,null,this.dwclickHandler,null,this)
        },
        dwclickHandler(point,args){
            var lx = point.x;
            var ly = point.y;
            this.addDzObj.lx = lx;
            this.addDzObj.ly = ly;
        },
        searchRoomDz(name){
          var paramObj = {};
          paramObj.name = name;
          this.http.get("/ybss/getCanAddRoomDzByName",paramObj,this.searchRoomDzCallBack,this,false);
        },
        searchRoomDzCallBack(data){
           this.dzlist = data;
        },
        saveAddDz(){
            if(!this.addDzObj.xzjddm){
                this.$Message.error("请选择乡镇街道")
                return;
            }
            if(!this.addDzObj.jlxdm){
                this.$Message.error("请选择街路巷")
                return;
            }
            if(!this.addDzObj.mph&&!this.addDzObj.lz){
                this.$Message.error("请填写门牌号或楼幢")
                return;
            }
            if(!this.addDzObj.lx){
                this.$Message.error("请选择经纬度")
                return;
            }
            
            var param={};
            param.dz = this.adddz;
            param.lx = this.addDzObj.lx;
            param.ly = this.addDzObj.ly;
            param.mph = this.addDzObj.mph;
            param.lz = this.addDzObj.lz;
            param.jlxdm = this.addDzObj.jlxdm;
            param.xzjddm = this.addDzObj.xzjddm;
            this.http.post("/ybss/addDz",param,this.addDzCallBack,this,false);
        },
        addDzCallBack(data){
            this.$Message.success("新增地址成功");
            this.showAddDz = false;
            this.searchDz();
        },
        saveAddRoom(){
            if(!this.addDzObj.dzid){
                this.$Message.error("请选择地址")
                return;
            }
            if(!this.addDzObj.roomname){
                this.$Message.error("请填写房间名")
                return;
            }
            var param={};
            param.dzid = this.addDzObj.dzid;
            param.roomname = this.addDzObj.roomname;
            this.http.post("/ybss/addDzRoom",param,this.saveAddRoomCallBack,this,false);
        },
        saveAddRoomCallBack(){
            this.$Message.success("新增房间成功");
        }
    },
    created(){
        this.http.get("/ybss/getXzjdList",null,this.getXzjdListCallBack,this,false);//获取乡镇街道列表
        // this.searchDz();
    },
    watch : {
      
    }
}
</script>

<style scoped>
.ybss_rightpenel{
    position: absolute;
    width: 385px;
    height: calc(100% - 94px);
    top: 84px;
    right: 5px;
    background: rgba(13,64,108,0.76);
    border: 1px solid #0d406c;
    box-shadow: inset 0px 0px 10px 0px rgba(8, 132, 228, 0.6),0px 0px 17px 0px rgba(8, 132, 228, 0.6);
    z-index: 10;
}
.box_panel{
    position: relative;
    width: 100%;
    height: 50%;
}
.header_bg{
    width: 100%;
    height: 40px;
    color: #dfeef3;
    line-height: 40px;
    padding-left: 40px;
    background:url(./../../../assets/ybss/header.png)  center  no-repeat;
    background-size: 100% 100%;
}
.content_panel{
    width: 100%;
    height: calc(100% - 40px);
}
.other_bar{
    width: 126px;
    height: 32px;
    color: #dfeef3;
    border: 1px solid #67a8e4;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
}
.other_bar_active{
    width: 126px;
    height: 32px;
    color: #dfeef3;
    border: 1px solid #67a8e4;
    border-radius: 10px;
    background: #3C84F4;
    box-shadow: 0px 0px 7px 0px #02FCF9;
    margin-top: 10px;
    cursor: pointer;
}
.tc_bar{
    width: 100px;
    height: 32px;
    color: #dfeef3;
    border: 1px solid #67a8e4;
    border-radius: 10px;
    margin-top: 5px;
    cursor: pointer;
}
.tc_bar_active{
    width: 100px;
    height: 32px;
    color: #dfeef3;
    border: 1px solid #67a8e4;
    border-radius: 10px;
    background: #32bad3;
    box-shadow: 0px 0px 5px 0px #15e4d3;
    margin-top: 5px;
    cursor: pointer;
}
.tc_bar >>> div{
    margin-left: 10px;
}
.tc_bar_active >>> div{
    margin-left: 10px;
}
.seachbar_InputSearch{
  height: 32px;
  width: 260px;
}
.seachbar_InputSearch >>> input{
  border: 1px solid #1e91fc;
  border-radius: 6px;
}
.seachbar_InputSearch>>>.iconclass{
  right: 5px;
  top: 0px;
}
.seachbar_InputSearch>>>.iconclass:hover{
  right: 5px;
  top: 0px;
}
.seachbar_InputSearch>>>.clearclass{
  right: 28px;
  top: -2px;
}
.seachbar_InputSearch>>>.clearclass:hover{
  right: 28px;
  top: -2px;
}
.table1 div{
  position: relative;
  width: 85px;
  height: 100%;
  line-height: 35px;
  color: #dfeef3;
  text-align: center;
  font-size: 14px;
}
.pagebar{
  height: 35px !important;
  position: absolute;
  left: 50px;
  bottom: 0px;
}
.addDzClass{
    position:absolute;
    right: 0px;
    cursor: pointer;
    color:#03fcd6;
}
.dzadd_panel{
    position: absolute;
    width: 400px;
    height: 440px;
    top: 43%;
    right: 190px;
    transform: translate(-50%, -50%);
    background: rgba(13,64,108,0.76);
    border: 1px solid #0d406c;
    box-shadow: inset 0px 0px 10px 0px rgba(8, 132, 228, 0.6),0px 0px 17px 0px rgba(8, 132, 228, 0.6);
}
.header_div{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgba(46,153,247,0.54);
}
.header_text{
    position: absolute;
    color: #fff;
    width: calc(100% - 42px);
    height: 26px;
    line-height: 26px;
    padding-left: 10px;
    margin: 7px 3px;
    background: #0f75a9;
    /* border: 1px solid #25a9f4; */
}
</style>