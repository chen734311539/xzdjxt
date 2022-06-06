<template style="width:100%;height:100%;">
  <div class="home" id="cesiumContainer">
     <div class="locinfo">
       <span>经度：</span><span>{{longitude_show}}</span>
       <span>纬度：</span><span>{{latitude_show}}</span>
       <span>视角高：</span><span>{{altitude_show}}千米</span>
     </div>
     <div class="mapControl">
       <div class="ctr_left"></div>
       <div class="ctr_right"></div>
       <div class="ctr_dir" :style="{transform:direction}"></div>
     </div>
     <!-- <div class="mapHome">
        <div class="toolbar">
          <img src="./../../assets/map3d/ic_15.png" title="回到主视角" @click="showListPanel"/>
        </div>
     </div> -->
     <div class="mapTools">
        <div class="tools" v-show="showtool">
          <div class="imgdiv">
            <img src="./../../assets/map3d/ic_11.png" title="图层列表" @click="showListPanel"/>
          </div>
          <!-- <div class="imgdiv">
            <img src="./../../assets/map3d/ic_06.png" title="三维分析"/>
          </div>
          <div class="imgdiv">
            <img src="./../../assets/map3d/ic_03.png" title="场景设置"/>
          </div> -->
        </div>
        <div class="toolbar" title="显示地图工具" @click="showTools">
          <img src="./../../assets/map3d/ic_01.png"/>
        </div>
     </div>
     <div class="layerlist" v-show="showlist">
        <div style="width:100%;height:35px;">
          <div style="height:35px;color:#fff;text-align:center;line-height:35px;">图层列表</div>
          <div class="layerclose" @click="showListPanel">
            <img src="./../../assets/map3d/tk_close.png"/>
          </div>
        </div>
        <div class="layercontent">
           <el-tree class="tree_panel" ref="tree2dmap" :data="maplist" show-checkbox node-key="id" @check="show3dTile($event,'2d')"
                    :default-expanded-keys="defaultExpandKeys" :props="listprops"/>
           <el-tree class="tree_panel" ref="tree3dmap" :data="map3dlist" show-checkbox node-key="id" @check="show3dTile($event,'3d')"
                    :default-expanded-keys="defaultExpandKeys" :props="listprops">
            <div slot-scope="{node,data}" class="el-tree-node__label">
              <span>{{node.label}}</span>
              <img @click="flyToModal(data)" v-show="false" style="margin-left: 10px;" title="定位到模型" src="./../../assets/map3d/map_dw.png"/>
            </div>
           </el-tree>
        </div>
     </div>
  </div>
</template>
<script>
import map3DUtil from "./js/map3DUtil.js"
export default {
  name: 'Map3d',
  props:['centerPoint'],
  components: {},
  data () {
    return {
       maplist:[],//3d地图底图url，包括影像图、路网、百度矢量
       map3dlist:[],//3d模型url,包括3dtiles、超图s3m精简压缩地址
       listprops:{children:'children',label:'label'},
       defaultExpandKeys:['map2d','map3d'],
       showtool:false,
       showlist:false,
       toolarrawurl: require("./../../assets/map3d/ic_10.png"),
       longitude_show:"",
       latitude_show:"",
       altitude_show:"",
       direction: "rotate(0deg)",
    }
  },
  computed: {
  },
  created () {
  },
  mounted(){
    map3DUtil.initMap(this);//初始化3d引擎
    this.mapInit();//初始化3d数据
  },
  methods:{
    mapInit(){
       this.http.get("/user/getMap3d",null,this.getMap3dCallBack,this,false);
    },
    getMap3dCallBack(data){
       var map2dobj = {id:'map2d',label:"地图底图"};
       var map3dobj = {id:'map3d',label:"三维模型"};
       map2dobj.children = data.list2d;
       this.maplist.push(map2dobj);
       map3dobj.children = data.list3d;
       this.map3dlist.push(map3dobj);
       var baseTiles = [];
       var default2dCheckedKeys = [];
       var default3dCheckedKeys = [];
       for(var i in data.list2d){
          if(data.list2d[i].isbasemap == "1"){
            baseTiles.push(data.list2d[i]);
            default2dCheckedKeys.push(data.list2d[i].id);
          }
       }
       var base3dTiles = [];
       for(var i in data.list3d){
          if(data.list3d[i].isbasemap == "1"){
            base3dTiles.push(data.list3d[i]);
            default3dCheckedKeys.push(data.list3d[i].id);
          }
       }
       var that = this;
       setTimeout(function(){
         that.$refs.tree2dmap.setCheckedKeys(default2dCheckedKeys);
         that.$refs.tree3dmap.setCheckedKeys(default3dCheckedKeys);
       }, 150);
       if(baseTiles.length>0){
         map3DUtil.loadTiles(baseTiles);//添加2d基础地图
       }
       if(base3dTiles.length>0){
         map3DUtil.load3DModal(base3dTiles);//添加3d模型
       }
    },
    show3dTile(data,type){
      var tileslist = [];
      if(data.url){
          tileslist.push(data);
      }
      if(data.children){
          for(var i in data.children){
              if(data.children[i].url){
                  tileslist.push(data.children[i]);
              }
              if(data.children[i].children){
                for(var n in data.children[i].children){
                    if(data.children[i].children[n].url){
                        tileslist.push(data.children[i].children[n]);
                    }
                }
              }
          }
      }
      if(type=='2d'){
        map3DUtil.loadTiles(tileslist);//添加2d底图
      }
      if(type=='3d'){
        map3DUtil.load3DModal(tileslist);//添加3d模型
      }
    },
    showTools(){
      this.showtool = !this.showtool;
      if(this.showtool){
         this.toolarrawurl = require("./../../assets/map3d/ic_09.png");
      }else{
         this.toolarrawurl = require("./../../assets/map3d/ic_10.png");
      }
    },
    showListPanel(){
       this.showlist = !this.showlist;
    },
    flyToModal(data){
      map3DUtil.modalCenterAt(data);
    }
  },
  destroyed: function () {
     
  }
}
</script>

<style scoped>
.home{
  width: 100%;
  height: 100%;
}
.locinfo{
    position: absolute;
    background: #fff;
    z-index: 10;
    /* right: 150px; */
    left: 30%;
    bottom: 22px;
}
.mapControl{
  position: absolute;
  width: 75px;
  height: 75px;
  bottom: 75px;
  right: 25px;
  z-index: 10;
  background: url(./../../assets/map/mapctr_01.png)  no-repeat;
}
.ctr_left{
  width: 10px;
  height: 40px;
  position: absolute;
  top: 22px;
  left: -4px;
  background: url(./../../assets/map/mapctr_03.png)  no-repeat;
}
.ctr_right{
  width: 10px;
  height: 40px;
  position: absolute;
  top: 22px;
  right: -4px;
  background: url(./../../assets/map/mapctr_04.png)  no-repeat;
}
.ctr_dir{
  width: 58px;
  height: 58px;
  position: absolute;
  top: 8px;
  left: 8px;
  background: url(./../../assets/map/mapctr_02.png)  no-repeat;
}
.mapHome{
  position: absolute;
  right: 50px;
  bottom: 200px;
  height: 40px;
  z-index: 10;
}
.mapTools{
  position: absolute;
  right: 55px;
  top: 200px;
  height: 40px;
  z-index: 10;
}
.toolArrow{
  float: left;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  width: 40px;
  height: 40px;
  background-color: rgba(25, 81, 144, 0.7);
}
.tools{
  float: left;
  height: 40px;
  background-color: rgba(25, 81, 144, 0.7);
}
.imgdiv{
  float: left;
  cursor: pointer;
  width: 40px;
  text-align: center;
  line-height: 50px;
  height: 40px;
}
.imgdiv:hover{
  background: #154d8d;
}
.toolbar{
  float: right;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  width: 40px;
  height: 40px;
  background: #154d8d;
}
.layerlist{
  width: 240px;
  height: 550px;
  position: absolute;
  top: 250px;
  right: 55px;
  z-index: 10;
  background: url(./../../assets/map3d/3dmaxbg.png)  no-repeat;
  background-size:100% 100%;
}
.layercontent{
  height: calc(100% - 45px);
  width: calc(100% - 20px);
  margin: 0px 10px;
  border: 1px solid #80afe5;
  color: #fff;
}
.tree_panel{
  margin: 5px;
  background: rgba(0,0,0,0);
  color: #fff;
}
.layerclose{
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 10px;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
}
</style>
<style>
/* 设置树形最外层的背景颜色和字体颜色 */
.el-tree {
  background: palegoldenrod;
  color: black;
  width: 200px;
}
/*节点选中时样式*/
.el-tree-node.is-current > .el-tree-node__content {
  background-color: rgba(46,139,87,0.5) !important;
}
/*hover鼠标移入节点时样式*/
.el-tree-node.is-focusable > .el-tree-node__content:hover{
  background-color: #80afe5 !important;
}
/* 改变节点高度 */
.el-tree-node__content {
  height: 25px;
}
/*show-checkbox属性开启后，仅限子叶节点显示勾选（隐藏父节点的勾选按钮）*/
.is-leaf + .el-checkbox .el-checkbox__inner {
  display: inline-block;
}
.el-tree-node__label{
  padding-left: 10px;
}
.cesium-viewer-toolbar{
  display: none !important;
}
.cesium-viewer-navigationContainer{
  display: none !important;
}
</style>
