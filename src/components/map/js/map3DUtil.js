import Constants from '@/constants/Constants'

import WinPopup from "@/components/map/map3d/WinPopup";// 窗口样式2
import TrailLineAnimate from "@/components/map/map3d/js/TrailLineAnimate";//gps轨迹回放
import FdDth from "@/components/map/map3d/js/FdDth";//分栋单体化
import FcfhDth from "@/components/map/map3d/js/FcfhDth";//分层分户单体化
var modallist = {};//存放3d模型数据map
var tilelist = {};//存放地图底图数据map
export default{
    initMap(vm){//初始化3d引擎
        modallist = {};
        tilelist = {};
        var viewer = new Cesium.Viewer('cesiumContainer',{
            fullscreenButton: false,//是否显示全屏
            homeButton: false,//是否显示home按钮
            animation: false, //是否显示动画控件(左下方那个)
            baseLayerPicker: false, //是否显示图层选择控件
            geocoder: false, //是否显示地名查找控件
            timeline: false, //是否显示时间线控
            sceneModePicker: true, //是否显示投影方式控件
            navigationHelpButton: false, //是否显示帮助信息控件
            infoBox: false, //是否显示点击要素之后显示的信息
            imageryProvider:new Cesium.SingleTileImageryProvider({
              url : require('./../../../assets/map/worldimage.jpg')
            }),
        });
        viewer._cesiumWidget._creditContainer.style.display = "none";//去掉cesium商标
        
        window.viewer = viewer;
        this.addMouseMove(vm);//添加坐标显示
        this.map3dCenterAt(vm.centerPoint);//2D切换3D后中心点跟随2D
        var that = this;
        viewer.selectedEntityChanged.addEventListener(e => {//添加3D地图上事物的事件
            that.selectedEntityChanged(e);
        });
    },
    loadTiles(tiles){
        //设置2D底图
        for(var i in  tiles){
            var tileUrl = tiles[i];
            if(tilelist[tileUrl.id]){
                window.viewer.imageryLayers.remove(tilelist[tileUrl.id]);
                delete tilelist[tileUrl.id];
                return;
            }else{
                var oneLayer = window.viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                    url: tileUrl.url,
                }));
                tilelist[tileUrl.id] = oneLayer;
            }
        }
    },
    load3DModal(tiles){
        //设置3D模型
        for(var i in  tiles){
          var tileUrl = tiles[i];
          this.load3dtiles(tileUrl)
        }
    },
    //加载3dtiles数据
    load3dtiles(tileUrl) {
        if(modallist[tileUrl.id]){
            var tileset = window.viewer.scene.layers.removeAll(modallist[tileUrl.id],true);
            delete modallist[tileUrl.id];
            return;
        }else{
            var tileset = window.viewer.scene.addS3MTilesLayerByScp(tileUrl.url);
            modallist[tileUrl.id] = tileset;
        }

        FdDth.init(window.viewer);

        // var config = this.sendRequestWithResponse(testUrl, "GET");
        // var x = parseFloat(config.substring(config.indexOf("<sml:X>") + 7, config.indexOf("</sml:X>")));
        // var y = parseFloat(config.substring(config.indexOf("<sml:Y>") + 7, config.indexOf("</sml:Y>")));
        // var z = parseFloat(config.substring(config.indexOf("<sml:Z>") + 7, config.indexOf("</sml:Z>")));
        // if (Math.abs(z - 0.0) < 0.000001) {
        //     z = 120000;
        // }
        // console.log(x)
        // console.log(y)
        // console.log(z)
        // scene.camera.setView({
        //     destination: new Cesium.Cartesian3.fromDegrees(x, y, z)
        // });
    },
    sendRequestWithResponse(url, method) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(null);
        return xhr.responseText;
    },
    //调整3dtiles的高度位置
    setTilesetHeight(tileset) {
        var cartographic = Cesium.Cartographic.fromCartesian(
            tileset.boundingSphere.center
        );
        var surface = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            cartographic.height
        );
        var offset = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude, 55
        );
        var translation = Cesium.Cartesian3.subtract(
            offset,
            surface,
            new Cesium.Cartesian3()
        );
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    },
    modalCenterAt(data){
        if(modallist[data.id]){
           var tileset = modallist[data.id];
           var position = tileset.boundingSphere.center;
           let c = Cesium.Cartographic.fromCartesian(position); //笛卡尔坐标转为经纬度（弧度）
           let point = [Cesium.Math.toDegrees(c.longitude), Cesium.Math.toDegrees(c.latitude)]; //转为经纬度点
           window.viewer.camera.flyTo({
            destination: new Cesium.Cartesian3.fromDegrees(point[0], point[1]-0.007, 500),
            orientation: {
                heading: 0,
                pitch: -0.54024894684202,
                roll: 6.279951136096583
            }
          });
        }
    },
    map3dCenterAt(point){
        var height = 500;
        if(!point.x){
            point.x = point.lon;
            point.y = point.lat;
            height = point.alt;
        }
        window.viewer.camera.flyTo({
          destination: new Cesium.Cartesian3.fromDegrees(point.x, point.y, height),
          orientation : { 
            heading : 0,
            roll : 0
          }
        });
    },
    /**
	 *  鼠标监听3D地图实时坐标以及地图方向角
	 */
    addMouseMove(vm){
        var canvas = window.viewer.scene.canvas;
        var ellipsoid=window.viewer.scene.globe.ellipsoid;//具体事件的实现
        var handler = new Cesium.ScreenSpaceEventHandler(canvas);
        var that = vm;
        handler.setInputAction(function(movement){
          var cartesian=window.viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);//捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
          if(cartesian){
            var cartographic=window.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);//将笛卡尔三维坐标转为地图坐标（弧度）
            var lat_String=Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);//将地图坐标（弧度）转为十进制的度数
            var log_String=Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
            var alti_String=(window.viewer.camera.positionCartographic.height/1000).toFixed(2);
            var heading = Cesium.Math.toDegrees(window.viewer.camera.heading);//方向角
            that.direction = "rotate(-"+heading+"deg)";
            that.longitude_show=log_String;
            that.latitude_show=lat_String;
            that.altitude_show=alti_String;
          }
        },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
    /**
	 *  加载3D模型
	 */
    locationModal(tileset){
        var longitude = 120.9243205;
        var latitude = 30.492612;
        var height = -16
        // var heading = 0 // 方位角
        tileset.readyPromise.then(function(argument){// 模型加载完毕后的回调
          let hpr = new Cesium.Matrix3();// 1、旋转
          let hprObj = new Cesium.HeadingPitchRoll(Math.PI, Math.PI, Math.PI);// new Cesium.HeadingPitchRoll(heading, pitch, roll) heading围绕负z轴的旋转。pitch是围绕负y轴的旋转。Roll是围绕正x轴的旋转
          hpr = Cesium.Matrix3.fromHeadingPitchRoll(hprObj, hpr);//  Cesium.Matrix3.fromHeadingPitchRoll （headingPitchRoll，result）
          let modelMatrix = Cesium.Matrix4.multiplyByTranslation(// 2.3储存平移的结果
            // 2.1从以度为单位的经度和纬度值返回Cartesian3位置
            // 2.2计算4x4变换矩阵
            Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(longitude,latitude, height)), new Cesium.Cartesian3(), new Cesium.Matrix4()
          );
          // 3、应用旋转
          Cesium.Matrix4.multiplyByMatrix3(modelMatrix, hpr, modelMatrix); // Cesium.Matrix4.multiplyByMatrix3 （矩阵，旋转，结果）
          tileset._root.transform = modelMatrix;
        });
    },
    /**
	 *  根据视角高度近似换算地图层级
	*/
    heightToZoom(height){
        var A = 40487.57;
        var B = 0.00007096758;
        var C = 91610.74;
        var D = -40467.74;
        return Math.round(D+(A-D)/(1+Math.pow(height/C, B)));
    },
    /**
	 * 获取3D地图视野范围返回相机高度、地图层级、方向角、地图中心点
	*/
    getCurrentExtent(){
        var extent = {};// 范围对象
        var scene = window.viewer.scene;// 得到当前三维场景
        var ellipsoid = scene.globe.ellipsoid;// 得到当前三维场景的椭球体
        var canvas = scene.canvas;
        var car3_lt = window.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);// canvas左上角
        var car3_rb = window.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);// canvas右下角
        if(car3_lt && car3_rb){// 当canvas左上角和右下角全部在椭球体上
            var carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
            var carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
            extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
            extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
            extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
            extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
        }else if(!car3_lt && car3_rb) {// 当canvas左上角不在但右下角在椭球体上
            var car3_lt2 = null;
            var yIndex = 0;
            do{// 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
                yIndex <= canvas.height ? yIndex += 10 : canvas.height;
                car3_lt2 = window.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0,yIndex), ellipsoid);
            }while(!car3_lt2);
            var carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
            var carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
            extent.xmax = Cesium.Math.toDegrees(carto_lt2.longitude);
            extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
            extent.xmin = Cesium.Math.toDegrees(carto_rb2.longitude);
            extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
        }
        extent.height = Math.ceil(window.viewer.camera.positionCartographic.height);// 获取高度
        extent.lon = Cesium.Math.toDegrees(window.viewer.camera.positionCartographic.longitude);
        extent.lat = Cesium.Math.toDegrees(window.viewer.camera.positionCartographic.latitude);
        extent.heading = Cesium.Math.toDegrees(window.viewer.camera.heading);
        extent.pitch = Cesium.Math.toDegrees(window.viewer.camera.pitch);
        extent.roll = Cesium.Math.toDegrees(window.viewer.camera.roll);
        extent.level = this.heightToZoom(extent.height);
        return extent;
    },
    //实体选中事件
    selectedEntityChanged(e) {
        if (!e) return;
        if (this.pWindow) {
            this.pWindow.windowClose();
            this.pWindow = undefined;
        }
        this.pWindow = new WinPopup(window.viewer, e.position._value, e.type, e.info, e.callback,e.markinfo);
    },
    addJqPoints(pointarr,layerid,callback){
        var dataSource = null;
        var dataSources = window.viewer.dataSources._dataSources;
        for(var i=0;i<dataSources.length;i++){
             var name = dataSources[i]._name;
             if(name==layerid){
                dataSource = dataSources[i];
                break;
             }
        }
        if(dataSource != null){
           window.viewer.dataSources.remove(dataSource);
        }
        dataSource = new Cesium.CustomDataSource(layerid);
        var picurl = require("./../../../assets/jq/icon_110_wqs.png");
        var picwidth = 23;
        var picheight = 32;
        for(var i=0;i<pointarr.length;i++){
            var point = pointarr[i];
            var id = point.id;
            var loc = point.loc;
            if(!point.loc){
               continue;
            }
            if(point.jjlxdm=='1'){//违法犯罪
                if(point.state=='0'){
                  picurl = require("./../../../assets/jq/icon_110_wqs.png");
                }else if(point.state=='1'){
                  picurl = require("./../../../assets/jq/icon_110_yqs.png");
                }else if(point.state=='2'){
                  picurl = require("./../../../assets/jq/icon_110_ydd.png");
                }else if(point.state=='3'){
                  picurl = require("./../../../assets/jq/icon_110_ywc.png");
                }else{
                  picurl = require("./../../../assets/jq/icon_110_wqs.png");
                }
            }else if(point.jjlxdm=='2'){//交通
                if(point.state=='0'){
                  picurl = require("./../../../assets/jq/icon_122_wqs.png");
                }else if(point.state=='1'){
                  picurl = require("./../../../assets/jq/icon_122_yqs.png");
                }else if(point.state=='2'){
                  picurl = require("./../../../assets/jq/icon_122_ydd.png");
                }else if(point.state=='3'){
                  picurl = require("./../../../assets/jq/icon_122_ywc.png");
                }else{
                  picurl = require("./../../../assets/jq/icon_122_wqs.png");
                }
            }else if(point.jjlxdm=='3'){//火灾
                if(point.state=='0'){
                  picurl = require("./../../../assets/jq/icon_119_wqs.png");
                }else if(point.state=='1'){
                  picurl = require("./../../../assets/jq/icon_119_yqs.png");
                }else if(point.state=='2'){
                  picurl = require("./../../../assets/jq/icon_119_ydd.png");
                }else if(point.state=='3'){
                  picurl = require("./../../../assets/jq/icon_119_ywc.png");
                }else{
                  picurl = require("./../../../assets/jq/icon_119_wqs.png");
                }
            }else{
                if(point.state=='0'){//其他
                  picurl = require("./../../../assets/jq/jqmark_other_wqs.png");
                }else if(point.state=='1'){
                  picurl = require("./../../../assets/jq/jqmark_other_yqs.png");
                }else if(point.state=='2'){
                  picurl = require("./../../../assets/jq/jqmark_other_ydd.png");
                }else if(point.state=='3'){
                  picurl = require("./../../../assets/jq/jqmark_other_ywc.png");
                }else{
                  picurl = require("./../../../assets/jq/jqmark_other_wqs.png");
                }
            }
            dataSource.entities.add({
                position:  Cesium.Cartesian3.fromDegrees(loc.x, loc.y, 25),
                type: 'ssjq',
                info : point,
                callback: callback,
                billboard:{
                    image: picurl,
                    width: picwidth,
                    height: picheight
                },
                id: id,
                name:'Cesium-Station',
                description:'自定义增加的点'
            })
        }
        window.viewer.dataSources.add(dataSource);
    },
    addJlPoints(pointarr,layerid,callback){
        var dataSource = null;
        var dataSources = window.viewer.dataSources._dataSources;
        for(var i=0;i<dataSources.length;i++){
             var name = dataSources[i]._name;
             if(name==layerid){
                dataSource = dataSources[i];
                break;
             }
        }
        if(dataSource != null){
           window.viewer.dataSources.remove(dataSource);
        }
        dataSource = new Cesium.CustomDataSource(layerid);
        for(var i=0;i<pointarr.length;i++){
            var point = pointarr[i];
            var id = point.gpsid;
            var loc = point.loc;
            var gpsname = point.gpsname;
            if(!point.loc){
               continue;
            }
            var picurl = "";
            var picwidth = 20;
            var picheight = 30;
            if(point.online=="1"){
                picurl = Constants.gps_prefix+point.gpsonlineurl;
            }else{
                picurl = Constants.gps_prefix+point.gpsnoonlineurl; 
            }
            picwidth = point.x;
            picheight = point.y;
            dataSource.entities.add({
                position:  Cesium.Cartesian3.fromDegrees(loc.x, loc.y, 25),
                billboard:{
                    image: picurl,
                    width: picwidth,
                    height: picheight
                },
                id: id,
                type: 'ssjl',
                info : point,
                callback: callback,
                name:gpsname,
                // label:{
                //     text : gpsname,
                //     font : '12pt monospace',
                //     style:  Cesium.LabelStyle.FILL_AND_OUTLINE,
                //     outlineWidth : 2,
                //     verticalOrigin :  Cesium.VerticalOrigin.BOTTOM,
                //     pixelOffset : new Cesium.Cartesian2(0, -10),
                //     fillColor: Cesium.Color.YELLOW
                // },
                description:'自定义增加的点'
            })
        }
        window.viewer.dataSources.add(dataSource);
    },
    addSpjkPoints(pointarr,layerid,callback){
        var dataSource = null;
        var dataSources = window.viewer.dataSources._dataSources;
        for(var i=0;i<dataSources.length;i++){
             var name = dataSources[i]._name;
             if(name==layerid){
                dataSource = dataSources[i];
                break;
             }
        }
        if(dataSource != null){
           window.viewer.dataSources.remove(dataSource);
        }
        dataSource = new Cesium.CustomDataSource(layerid);
        var picurl = require("./../../../assets/spjk/mark_spjk.png");
        var picwidth = 20;
        var picheight = 30;
        for(var i=0;i<pointarr.length;i++){
            var point = pointarr[i];
            var id = point.id;
            var loc = point.loc;
            var name = point.name;
            if(!point.loc){
               continue;
            }
            dataSource.entities.add({
                position:  Cesium.Cartesian3.fromDegrees(loc.x, loc.y, 20),
                billboard:{
                    image: picurl,
                    width: picwidth,
                    height: picheight
                },
                id: id,
                type: 'spjk',
                info : point,
                callback: callback,
                name: name,
                // label : {
                //     text : name,
                //     font : '12pt monospace',
                //     style:  Cesium.LabelStyle.FILL_AND_OUTLINE,
                //     outlineWidth : 2,
                //     verticalOrigin :  Cesium.VerticalOrigin.BOTTOM,
                //     pixelOffset : new Cesium.Cartesian2(0, -10),
                //     fillColor: Cesium.Color.GREEN
                // },
                description:'自定义增加的点'
            })
        }
        window.viewer.dataSources.add(dataSource);
    },
    addDztcLayer(data){
        if(data.markList.length>0&&data.markList[0].marktype=='1'){
           this.addDztcPoints(data.markList,data.templateObj);
        }
        if(data.markList.length>0&&data.markList[0].marktype=='2'){
            this.addDztcPolylines(data.markList,data.templateObj);
        }
        if(data.markList.length>0&&data.markList[0].marktype=='3'){
            this.addDztcPolygons(data.markList,data.templateObj);
        }
    },
    addDztcPoints(markarr,template){
        var layerid = markarr[0].layerid;
        var dataSource = null;
        var dataSources = window.viewer.dataSources._dataSources;
        for(var i=0;i<dataSources.length;i++){
             var name = dataSources[i]._name;
             if(name==layerid){
                dataSource = dataSources[i];
                break;
             }
        }
        if(dataSource != null){
           window.viewer.dataSources.remove(dataSource);
        }
        dataSource = new Cesium.CustomDataSource(layerid);
        var picurl = "http://50.64.103.129:8089/icon/jq/icon_110_wqs.png";
        if(template.pointurl){
            picurl = template.pointurl;
        }
        var picwidth = 32;
        var picheight = 45;
        for(var i=0;i<markarr.length;i++){
            var markobj = markarr[i];
            var id = markobj.markid;
            var markname = markobj.markname;
            var loc = markobj.loc;
            if(!markobj.loc){
               continue;
            }
            dataSource.entities.add({
                position:  Cesium.Cartesian3.fromDegrees(loc.x, loc.y, 15),
                billboard:{
                    image: picurl,
                    width: picwidth,
                    height: picheight
                },
                id: id,
                type: 'tczy',
                info : template,
                name: markname,
                markinfo : markobj,
                label : {
                    text : markname,
                    font : '14pt monospace',
                    style:  Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth : 2,
                    verticalOrigin :  Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset : new Cesium.Cartesian2(0, -10),
                    fillColor: Cesium.Color.YELLOW
                },
                description:'自定义增加的点'
            })
        }
        window.viewer.dataSources.add(dataSource);
    },
    addDztcPolylines(markarr,template){
        var layerid = markarr[0].layerid;
        var dataSource = null;
        var dataSources = window.viewer.dataSources._dataSources;
        for(var i=0;i<dataSources.length;i++){
             var name = dataSources[i]._name;
             if(name==layerid){
                dataSource = dataSources[i];
                break;
             }
        }
        if(dataSource != null){
           window.viewer.dataSources.remove(dataSource);
        }
        dataSource = new Cesium.CustomDataSource(layerid);
        for(var i=0;i<markarr.length;i++){
            var markobj = markarr[i];
            var centerPoint = markobj.loc;
            var id = markobj.markid;
            var locinfo = markobj.locinfo;
            var markname = markobj.markname;
            if(!markobj.locinfo){
               continue;
            }
            var locinfo = JSON.parse(markobj.locinfo);
            var points = locinfo.points;
            var linearr = [];
            for(var n=0;n<points.length;n++){
                linearr.push(points[n][0]);
                linearr.push(points[n][1]);
            }
            dataSource.entities.add({
                position:  Cesium.Cartesian3.fromDegrees(centerPoint.x, centerPoint.y, 15),
                id: id,
                name: markname,
                type: 'tczy',
                info : template,
                markinfo : markobj,
                label : {
                    text : markname,
                    font : '14pt monospace',
                    style:  Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth : 2,
                    verticalOrigin :  Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset : new Cesium.Cartesian2(0, -10),
                    fillColor: Cesium.Color.YELLOW
                },
                corridor: {
                    positions: Cesium.Cartesian3.fromDegreesArray(linearr),
                    width: 20.0,
                    height: 2.0,
                    extrudedHeight: 10.0,
                    material: Cesium.Color.RED.withAlpha(0.5),
                },
            })
        }
        window.viewer.dataSources.add(dataSource);
    },
    addDztcPolygons(markarr,template){
        var layerid = markarr[0].layerid;
        var dataSource = null;
        var dataSources = window.viewer.dataSources._dataSources;
        for(var i=0;i<dataSources.length;i++){
             var name = dataSources[i]._name;
             if(name==layerid){
                dataSource = dataSources[i];
                break;
             }
        }
        if(dataSource != null){
           window.viewer.dataSources.remove(dataSource);
        }
        dataSource = new Cesium.CustomDataSource(layerid);
        for(var i=0;i<markarr.length;i++){
            var markobj = markarr[i];
            var centerPoint = markobj.loc;
            var id = markobj.markid;
            var locinfo = markobj.locinfo;
            var markname = markobj.markname;
            if(!markobj.locinfo){
               continue;
            }
            var locinfo = JSON.parse(markobj.locinfo);
            var points = locinfo.points;
            var gonarr = [];
            for(var n=0;n<points.length;n++){
                gonarr.push(points[n][0]);
                gonarr.push(points[n][1]);
            }
            dataSource.entities.add({
                position:  Cesium.Cartesian3.fromDegrees(centerPoint.x, centerPoint.y, 15),
                id: id,
                name: markname,
                type: 'tczy',
                info : template,
                markinfo : markobj,
                label : {
                    text : markname,
                    font : '14pt monospace',
                    style:  Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth : 2,
                    verticalOrigin :  Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset : new Cesium.Cartesian2(0, -10),
                    fillColor: Cesium.Color.YELLOW
                },
                polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(gonarr),
                    extrudedHeight: 15,
                    material: Cesium.Color.PURPLE,
                    outline: true,
                    outlineColor: Cesium.Color.MAGENTA,
                    arcType: Cesium.ArcType.RHUMB,
                },
            })
        }
        window.viewer.dataSources.add(dataSource);
    },
    addPlotMark(data) {//添加模型到3D地图
      var modalurl = "./../../../../static//3d/gltf/police_car.gltf";
      if(data.typecode == '5'){
          modalurl = "./../../../../static//3d/gltf/police.gltf";
      }
      var geoFeature = {
          type: "Feature",
          properties: {
              plotCode: data.gpsid,
              modelUrl: modalurl,
              style: {
                  width: 1.4,
                  height: 1.8,
                  scale: 1.5,
                  heading: data.dir, //模型方向角度
              },
              attr: {}
          },
          geometry: {
              type: "Point",
              position:  Cesium.Cartesian3.fromDegrees(data.loc.x, data.loc.y, 0),
          }
      };

      var properties = geoFeature.properties;
      var position = geoFeature.geometry.position; //[x,y,z]

      properties.plotType = "Gltf";
      properties.plotName = data.gpsname;

      var style = properties.style; //{heading,scale,height,width}  

      const headingPitchRoll = new Cesium.HeadingPitchRoll(
          Cesium.Math.toRadians(style.heading),
          Cesium.Math.toRadians(0),
          Cesium.Math.toRadians(0)
      );

      var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, headingPitchRoll);
      
      var gltfEntity = window.viewer.entities.add({
          plotCode: properties.plotCode,
          position: position,
          orientation: orientation,
          type: 'ssjl',
          info : data,
          model: {
              uri: properties.modelUrl,
              colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
              color: Cesium.Color.WHITE, //.withAlpha(0.5),
              scale: style.scale,
              maximumScale: style.scale,
          }
      });
    },
    rePlayTrailLine(data){
      var staps = [];
      for(var i in data){
          var obj = {};
          obj.time = data[i].uptime;
          obj.position = Cesium.Cartesian3.fromDegrees(data[i].loc.x, data[i].loc.y, 25);
          staps.push(obj);
      }
      TrailLineAnimate.initTrackLine(staps);
    }

}