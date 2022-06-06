// 使用cesium结合geoserver动态单体化功能
import BuildInfoWindow from "@/components/map/map3d/WinDthPopup";
import Constants from '@/constants/Constants'
let dthInit = {
    init(viewer) {
        this.viewer = viewer;
        this.mouseClickPosition = { x: -1573831.7669333483, y: 5327727.13609521, z: 3123072.6339310976 };
        this.fcPrimitives = []; // 分层图元
        //geoserver数据服务的地址
        this.dataServerBaseUrl = Constants.geoserver_url+"/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite%3Ahybuilding&maxFeatures=50&outputFormat=application%2Fjson";
        //手动进行一次查询
        this.queryByPoint([120.9536, 30.5327]);
        this.initEvents();
    },

    //初始化viewer
    initViewer(el) {
        Cesium.Ion.defaultAccessToken = appConfig.cesiumToken;
        this.viewer = new Cesium.Viewer(el, {
            infoBox: false,
            selectionIndicator: false,
            navigation: false,
            animation: false,
            shouldAnimate: false,
            timeline: false,
            baseLayerPicker: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            imageryProvider: new Cesium.UrlTemplateImageryProvider({
                url: appConfig.imageryProvider
            })
        });
    },

    //场景事件
    initEvents() {
        new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(((e) => {
            let position = this.viewer.scene.pickPosition(e.position); //屏幕坐标转为笛卡尔空间坐标
            if (!position) return;
            this.mouseClickPosition = position;
            console.log(position)
            let c = Cesium.Cartographic.fromCartesian(position); //笛卡尔坐标转为经纬度（弧度）
            let point = [Cesium.Math.toDegrees(c.longitude), Cesium.Math.toDegrees(c.latitude)]; //转为经纬度点
            this.queryByPoint(point);
        }), Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

    //点查询
    queryByPoint(point) {
        //数据服务地址加上过滤条件 （条件为空间查询 与点相交）
        let url = this.dataServerBaseUrl +
            '&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">' +
            '<Intersects>' +
            '<PropertyName>the_geom</PropertyName>' +
            '<gml:Point>' +
            '<gml:coordinates>' + point[0] + ',' + point[1] + '</gml:coordinates>' +
            '</gml:Point>' +
            '</Intersects>' +
            '</Filter>'
        //发送get请求
        fetch(url).then(res => {
            return res.json();
        }).then(res => {
            this.handleQueryResult(res);
        }).catch(err => {
            console.log(err)
        })
    },

    //处理查询结果
    handleQueryResult(result) {
        //清除上一次结果
        this.clearQueryResult();
        //如果查询成功 那么返回的结果应该是一个geojson对象 类型为FeatureCollection
        let feature = result.features[0]; //取第一个要素
        let properties = feature.properties; //取要素的属性信息
        
        this.addClampFeature(feature);//贴对象
        this.showBuildInfo(properties);//显示贴对象的windowinfo窗口
    },

    //添加贴地对象
    addClampFeature(feature) {
        if (!feature) return;
        let geometry = feature.geometry; //取要素的几何对象
        let coordinates;
        let pointArr = [];
        if (geometry.type == "MultiPolygon") { //多面 房屋面一般不会出现空洞等现象 如果有需要另做处理
            coordinates = geometry.coordinates[0][0];
        } else if (geometry.type == "Polygon") {
            coordinates = geometry.coordinates[0];
        }
        for (let i = 0; i < coordinates.length; i++) {
            const element = coordinates[i];
            pointArr.push(element[0]);
            pointArr.push(element[1]);
            // pointArr.push(0);//3dtiles对象要添加高度
        }
        //3dtiles对象贴地方法
        // this.clampFeature = this.viewer.entities.add({
        //     polygon: {
        //         hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(pointArr)),
        //         classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
        //         material: Cesium.Color.RED.withAlpha(0.5)
        //     }
        // })

        // S3M对象贴地方法
        this.clampFeature = this.viewer.entities.add({
            id: 'identify-area',
            name: '单体化标识面',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(pointArr),
                material: new Cesium.Color(1.0, 0.0, 0.0, 0.3),
            },
            classificationType: Cesium.ClassificationType.S3M_TILE 
        });
    },

    //显示建筑信息
    showBuildInfo(properties) {
        var buildcode = properties.BuildCode;
        this.buildInfoWindow = new BuildInfoWindow(this.viewer, this.mouseClickPosition, "楼栋信息", buildcode);
    },

    //清除查询结果
    clearQueryResult() {
        if (this.clampFeature) {
            this.viewer.entities.remove(this.clampFeature);
            this.clampFeature = undefined;
        }

        if (this.buildInfoWindow) {
            this.buildInfoWindow.windowClose();
            this.buildInfoWindow = undefined;
        }
    },

    //加载三维模型
    load3dtiles() {
        let tileset = this.viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: appConfig.zy3dtiles,
            })
        );
        this.locationModal(tileset);

        // tileset.readyPromise
        //     .then(tileset => {
        //         this.tileset = tileset;
        //         this.setTilesetHeight(58);
        //     })
        //     .otherwise(function(error) {
        //         console.log(error);
        //     });
    },

    /**
	 *  加载3D模型
	 */
    locationModal(tileset){
        var longitude = 120.9242605;
        var latitude = 30.492522;
        var height = -10
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

    //设置视角
    setView() {
        let flyToOpts = {
            destination: {
                x: -1574022.5720305464,
                y: 5327801.903466489,
                z: 3123111.566829993
            },
            orientation: {
                heading: 4.979524808068254,
                pitch: -0.54024894684202,
                roll: 6.279951136096583
            }
        };
        this.viewer.scene.camera.setView(flyToOpts);
    },

    //设置模型高度 否则飘在空中
    setTilesetHeight(height) {
        var cartographic = Cesium.Cartographic.fromCartesian(
            this.tileset.boundingSphere.center
        );
        var surface = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            cartographic.height
        );
        var offset = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude, height
        );
        var translation = Cesium.Cartesian3.subtract(
            offset,
            surface,
            new Cesium.Cartesian3()
        );
        this.tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    },

    destroy() {
        this.clearQueryResult();
        this.viewer.entities.removeAll();
        this.viewer.imageryLayers.removeAll(true);
        this.viewer.destroy();
    }
}

export default dthInit;