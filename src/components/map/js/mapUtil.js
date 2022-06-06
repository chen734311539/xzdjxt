
import Constants from '@/constants/Constants'
import mapEvent from './mapEvent'
import markUtil from './markUtil'
//地图加载包
import * as esriLoader from 'esri-loader'
export default{
    getMapArray(array,vm){
        for(var i=0;i<array.length;i++){
            var obj = array[i];
            obj.urlpattern = (obj.urlpattern.replace(/\\\{/gi,"{")).replace(/\\\}/gi,"}");
            var xml = this.getMapXml(obj.url);
            obj.xml = xml;
            vm.map.map_mapArray.push(obj);
        }
    },
    getMapXml(url){
		var obj = new Object();
        var results = this.loadXmlFile(url);
        var _layer = results.getElementsByTagName("layer");
        var _layerType = _layer[0].getElementsByTagName("layerType")[0].firstChild.nodeValue;
        var _defaultLevel = parseFloat(_layer[0].getElementsByTagName("defaultLevel")[0].firstChild.nodeValue);
        var _minLevel = parseFloat(_layer[0].getElementsByTagName("minLevel")[0].firstChild.nodeValue);
        var _maxLevel = parseFloat(_layer[0].getElementsByTagName("maxLevel")[0].firstChild.nodeValue);
        var _center = _layer[0].getElementsByTagName("center");
        var _center_x = parseFloat(_center[0].getElementsByTagName("x")[0].firstChild.nodeValue);
        var _center_y = parseFloat(_center[0].getElementsByTagName("y")[0].firstChild.nodeValue);
        
        var _fullExtent = _layer[0].getElementsByTagName("fullExtent");
        var _fullExtent_xmin = parseFloat(_fullExtent[0].getElementsByTagName("xmin")[0].firstChild.nodeValue);
        var _fullExtent_ymin = parseFloat(_fullExtent[0].getElementsByTagName("ymin")[0].firstChild.nodeValue);
        var _fullExtent_xmax = parseFloat(_fullExtent[0].getElementsByTagName("xmax")[0].firstChild.nodeValue);
        var _fullExtent_ymax = parseFloat(_fullExtent[0].getElementsByTagName("ymax")[0].firstChild.nodeValue);
        
        var _initialExtent = _layer[0].getElementsByTagName("initialExtent");
        var _initialExtent_xmin = parseFloat(_initialExtent[0].getElementsByTagName("xmin")[0].firstChild.nodeValue);
        var _initialExtent_ymin = parseFloat(_initialExtent[0].getElementsByTagName("ymin")[0].firstChild.nodeValue);
        var _initialExtent_xmax = parseFloat(_initialExtent[0].getElementsByTagName("xmax")[0].firstChild.nodeValue);
        var _initialExtent_ymax = parseFloat(_initialExtent[0].getElementsByTagName("ymax")[0].firstChild.nodeValue);
        
        var _tileInfo = _layer[0].getElementsByTagName("tileInfo");
        var _tileInfo_dpi = parseInt(_tileInfo[0].getElementsByTagName("dpi")[0].firstChild.nodeValue);
        var _tileInfo_origin = _tileInfo[0].getElementsByTagName("origin");
        var _tileInfo_origin_x = parseFloat(_tileInfo_origin[0].getElementsByTagName("x")[0].firstChild.nodeValue);
        var _tileInfo_origin_y = parseFloat(_tileInfo_origin[0].getElementsByTagName("y")[0].firstChild.nodeValue);
        var _tileInfo_wkid = parseFloat(_tileInfo[0].getElementsByTagName("wkid")[0].firstChild.nodeValue);
        var _tileInfo_width = parseFloat(_tileInfo[0].getElementsByTagName("width")[0].firstChild.nodeValue);
        var _tileInfo_height = parseFloat(_tileInfo[0].getElementsByTagName("height")[0].firstChild.nodeValue);
        var _tileInfo_lods = _tileInfo[0].getElementsByTagName("lods");
        var _tileInfo_lods_lod = _tileInfo_lods[0].getElementsByTagName("lod");
        var _tileInfo_lods_lod_arr = new Array();
        for(var i = 0;i<_tileInfo_lods_lod.length;i++){
            _tileInfo_lods_lod_arr[i] = {
                "level" : parseFloat(_tileInfo_lods_lod[i].getElementsByTagName("level")[0].firstChild.nodeValue), 
                "resolution" : parseFloat(_tileInfo_lods_lod[i].getElementsByTagName("resolution")[0].firstChild.nodeValue), 
                "scale" : parseFloat(_tileInfo_lods_lod[i].getElementsByTagName("scale")[0].firstChild.nodeValue)
            };
        }
        
        if(_layerType == "realmap" || _layerType == "gaode"){
            var _offset = _layer[0].getElementsByTagName("offset");
            var _offset_x = parseFloat(_offset[0].getElementsByTagName("x")[0].firstChild.nodeValue);
            var _offset_y = parseFloat(_offset[0].getElementsByTagName("y")[0].firstChild.nodeValue);
            
            var _transformData = _layer[0].getElementsByTagName("transformData");
            var _transformData_difference = _transformData[0].getElementsByTagName("difference");
            var _transformData_difference_x = _transformData[0].getElementsByTagName("x")[0].firstChild.nodeValue;
            var _transformData_difference_y = _transformData[0].getElementsByTagName("y")[0].firstChild.nodeValue;

            var _transformData_lat = _transformData[0].getElementsByTagName("lat");
            var _transformData_lat_intercept = _transformData_lat[0].getElementsByTagName("intercept")[0].firstChild.nodeValue;
            var _transformData_lat_variable1 = _transformData_lat[0].getElementsByTagName("variable1")[0].firstChild.nodeValue;
            var _transformData_lat_variable2 = _transformData_lat[0].getElementsByTagName("variable2")[0].firstChild.nodeValue;
            var _transformData_lng = _transformData[0].getElementsByTagName("lng");
            
            var _transformData_lng_intercept = _transformData_lng[0].getElementsByTagName("intercept")[0].firstChild.nodeValue;
            var _transformData_lng_variable1 = _transformData_lng[0].getElementsByTagName("variable1")[0].firstChild.nodeValue;
            var _transformData_lng_variable2 = _transformData_lng[0].getElementsByTagName("variable2")[0].firstChild.nodeValue;

            var _transformData_x = _transformData[0].getElementsByTagName("x");
            var _transformData_x_intercept = _transformData_x[1].getElementsByTagName("intercept")[0].firstChild.nodeValue;
            var _transformData_x_variable1 = _transformData_x[1].getElementsByTagName("variable1")[0].firstChild.nodeValue;
            var _transformData_x_variable2 = _transformData_x[1].getElementsByTagName("variable2")[0].firstChild.nodeValue;

            var _transformData_y = _transformData[0].getElementsByTagName("y");
            var _transformData_y_intercept = _transformData_y[1].getElementsByTagName("intercept")[0].firstChild.nodeValue;
            var _transformData_y_variable1 = _transformData_y[1].getElementsByTagName("variable1")[0].firstChild.nodeValue;
            var _transformData_y_variable2 = _transformData_y[1].getElementsByTagName("variable2")[0].firstChild.nodeValue;

            var _transformdata = {
                'Lat':{Intercept:parseFloat(_transformData_lat_intercept),Variable1:parseFloat(_transformData_lat_variable1),Variable2:parseFloat(_transformData_lat_variable2)},
                'Lng':{Intercept:parseFloat(_transformData_lng_intercept),Variable1:parseFloat(_transformData_lng_variable1),Variable2:parseFloat(_transformData_lng_variable2)},
                'X':{Intercept:parseFloat(_transformData_x_intercept),Variable1:parseFloat(_transformData_x_variable1),Variable2:parseFloat(_transformData_x_variable2)},
                'Y':{Intercept:parseFloat(_transformData_y_intercept),Variable1:parseFloat(_transformData_y_variable1),Variable2:parseFloat(_transformData_y_variable2)}
            };
        }
        
        obj.layerType = _layerType;
        obj.defaultLevel = _defaultLevel;
        obj.minLevel = _minLevel;
        obj.maxLevel = _maxLevel;
        obj.center_x = _center_x;
        obj.center_y = _center_y;
        obj.fullExtent_xmin = _fullExtent_xmin;
        obj.fullExtent_ymin = _fullExtent_ymin;
        obj.fullExtent_xmax = _fullExtent_xmax;
        obj.fullExtent_ymax = _fullExtent_ymax;
        obj.initialExtent_xmin = _initialExtent_xmin;
        obj.initialExtent_ymin = _initialExtent_ymin;
        obj.initialExtent_xmax = _initialExtent_xmax;
        obj.initialExtent_ymax = _initialExtent_ymax;
        obj.tileInfo_dpi = _tileInfo_dpi;
        obj.tileInfo_origin_x = _tileInfo_origin_x;
        obj.tileInfo_origin_y = _tileInfo_origin_y;
        obj.tileInfo_wkid = _tileInfo_wkid;
        obj.tileInfo_width = _tileInfo_width;
        obj.tileInfo_height = _tileInfo_height;
        obj.tileInfo_lods_lod_arr = _tileInfo_lods_lod_arr;
        if(_layerType == "realmap" ||_layerType =="gaode"){
            obj.offset_x = _offset_x;
            obj.offset_y = _offset_y;
            obj.transformData_difference_x = _transformData_difference_x;
            obj.transformData_difference_y = _transformData_difference_y;
            obj.transformdata = _transformdata;
        }
        return obj;
    },
	loadXmlFile(xmlFile){   //xmlFile 是xml文件的地址
        xmlFile = Constants.project+xmlFile;
        var xmlDom = null;
        if (window.ActiveXObject)//IE浏览器中读取xml文件
        {
            xmlDom = new ActiveXObject("Microsoft.XMLDOM");
            xmlDom.async="false";
            xmlDom.load(xmlFile);
        }
        else if(document.implementation && document.implementation.createDocument)
        {
            //Firefox，Chrome 浏览器中读取xml文件 ,Chrome 需要开服务器才能访问
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", xmlFile, false);
            xmlhttp.send(null);
            xmlDom = xmlhttp.responseXML;
        }
        else
        {
            xmlDom = null;
        }
        return xmlDom;
    },
    getLayerObj(layerid,vm){
		var layerObj;
		for(var i=0;i<vm.map.map_mapArray.length;i++){
			var obj = vm.map.map_mapArray[i];
			if(obj.layerid==layerid){
				layerObj = obj;
				break;
			}
		}
		return layerObj;
	},
    setBasemap(toLayerid,mapdiv,vm,layertype){
        var map = vm.map.map;
        var fromLayerInfo = vm.map.fromLayerInfo;
		var toLayerInfo = this.getLayerObj(toLayerid,vm);
		if(layertype=='zjlayer'){//地图路径里面有注记的打标注图层
			toLayerInfo.zj = '1';
		}
		if(toLayerInfo.urlzjpattern&&toLayerInfo.urlzjpattern!=""&&!layertype){//标注不为空，延时200毫秒打标注图层
			var that = this;
			setTimeout(function() {
				return that.setBasemap(toLayerid,mapdiv,vm,"zjlayer");
			}, 200);
		}

		//basemaptype = toLayerInfo.xml.layerType;
		var toLayerType = toLayerInfo.xml.layerType;
		var toLevel = 0;
		var centerPoint = null;
		if(map){
			if(layertype=='lklayer'){//添加路况图层
				var templayerid = toLayerInfo.layerid;
				toLayerInfo.layerid = templayerid;
				var toLayer = map.getLayer(toLayerInfo.layerid);
				if(toLayer){
					map.removeLayer(toLayer);
				}
				var basemap = new TiledLayer(toLayerInfo);
				map.addLayer(basemap);
				toLayerInfo.layerid = templayerid;
				return;
			}
			if(layertype=='zjlayer'){//添加地图注记图层
				var templayerid = toLayerInfo.layerid;
				toLayerInfo.layerid = templayerid+"bz";
				var toLayer = map.getLayer(toLayerInfo.layerid+"bz");
				if(toLayer){
					map.removeLayer(toLayer);
				}
				var basemap = new TiledLayer(toLayerInfo);
				map.addLayer(basemap);
				toLayerInfo.layerid = templayerid;
				return;
			}
			if(fromLayerInfo.layerid == toLayerid){//图层相同，返回
				return;
			}
			//map存在时候
			if (fromLayerInfo.xml.layerType!="realmap"&&fromLayerInfo.xml.layerType == toLayerInfo.xml.layerType) {//切片参数一致，只替换底图数据
				var fromLayer = map.getLayer(fromLayerInfo.layerid);
				if (fromLayer) {
					map.removeLayer(fromLayer);
				}
				var frombzLayer = map.getLayer(fromLayerInfo.layerid+"bz");//移除注记图层
				if (frombzLayer) {
					map.removeLayer(frombzLayer);
				}
				var basemap = new TiledLayer(toLayerInfo);
				map.addLayer(basemap);
			}else{
				var fromLevel = map.getLevel();
				toLevel = fromLevel;
				if(fromLayerInfo.xml.layerType=="tdt"&&toLayerType=="realmap"){//2D转2.5D
					toLevel = fromLevel-13;
					if(toLevel<0){
						toLevel=0;
					}else if(toLevel>7){
						toLevel=7;
					}
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.pointToPoint25(toLayerInfo,centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="realmap"&&toLayerType=="tdt"){
					toLevel = fromLevel+13;
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.point25ToPoint(fromLayerInfo,centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="tdt"&&toLayerType=="yst"){
					toLevel = fromLevel-10;
					if(toLevel<0){
						toLevel = 0;
					}
					centerPoint = new esri.geometry.Point(fromLayerInfo.xml.center_x, fromLayerInfo.xml.center_y);
				}else if(fromLayerInfo.xml.layerType=="yst"&&toLayerType=="tdt"){
					toLevel = fromLevel+10;
					centerPoint = new esri.geometry.Point(fromLayerInfo.xml.center_x, fromLayerInfo.xml.center_y);
				}else if(fromLayerInfo.xml.layerType=="yst"&&toLayerType=="realmap"){
					toLevel = fromLevel-3;
					if(toLevel<0){
						toLevel = 0;
					}
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.pointToPoint25(toLayerInfo,centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="realmap"&&toLayerType=="yst"){
					toLevel = fromLevel+3;
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.point25ToPoint(fromLayerInfo,centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="realmap"&&toLayerType=="gaode"){
                    toLevel = fromLevel+10;
                    if(toLevel>18){
                      toLevel = 18; 
                    }
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.point25ToPoint(fromLayerInfo,centerX,centerY);
                    centerPoint = this.ELatLng2EPoint(toLayerInfo,centerPoint.x,centerPoint.y);
                }else if(fromLayerInfo.xml.layerType=="gaode"&&toLayerType=="realmap"){
                    toLevel = fromLevel-10;
                    if(toLevel<0){
						toLevel=0;
					}else if(toLevel>7){
						toLevel=7;
					}
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.EPoint2ELatLng(fromLayerInfo,centerX,centerY);  
                    centerPoint = this.pointToPoint25(toLayerInfo,centerPoint.x,centerPoint.y);
                }else if(fromLayerInfo.xml.layerType=="realmap"&&toLayerType=="realmap"){
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.point25ToPoint(fromLayerInfo,centerX,centerY);
					centerPoint = this.pointToPoint25(toLayerInfo,centerPoint.x,centerPoint.y);
				}else if(fromLayerInfo.xml.layerType=="tdt"&&toLayerType=="gaode"){
					toLevel = fromLevel-3;
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.ELatLng2EPoint(toLayerInfo,centerX,centerY);
                }else if(fromLayerInfo.xml.layerType=="gaode"&&toLayerType=="tdt"){
                    toLevel = fromLevel+3;
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.EPoint2ELatLng(fromLayerInfo,centerX,centerY);    
                }else if(fromLayerInfo.xml.layerType=="tdt"&&toLayerType=="pgis"){
					toLevel = fromLevel-11;
					if(toLevel<0){
						toLevel=0;
					}else if(toLevel>8){
						toLevel=8;
					}
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = new esri.geometry.Point(centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="pgis"&&toLayerType=="tdt"){
					toLevel = fromLevel+11;
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = new esri.geometry.Point(centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="pgis"&&toLayerType=="realmap"){
					toLevel = fromLevel-1;
					if(toLevel<0){
						toLevel=0;
					}else if(toLevel>7){
						toLevel=7;
					}
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.pointToPoint25(toLayerInfo,centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="realmap"&&toLayerType=="pgis"){
					toLevel = fromLevel+1;
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.point25ToPoint(fromLayerInfo,centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="dl"&&toLayerType=="bsyx"){
					toLevel = fromLevel+3;
                    if(toLevel<0){
						toLevel=0;
					}else if(toLevel>12){
						toLevel=12;
					}
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = new esri.geometry.Point(centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="bsyx"&&toLayerType=="dl"){
					toLevel = fromLevel-3;
                    if(toLevel<0){
						toLevel=0;
					}else if(toLevel>11){
						toLevel=11;
					}
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = new esri.geometry.Point(centerX,centerY);
				}else{
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = new esri.geometry.Point(centerX,centerY);
				}
				map.removeAllLayers();
				map.destroy();
				var mapOptions = {};
				mapOptions.logo = false;
                mapOptions.minZoom = toLayerInfo.xml.minLevel;
			    mapOptions.maxZoom = toLayerInfo.xml.maxLevel;
				mapOptions.showLabels = true;
                mapOptions.isPan = false;
				map = new esri.Map(mapdiv, mapOptions);
                var basemap = new TiledLayer(toLayerInfo);
                vm.map.basemap = basemap;
                centerPoint.spatialReference = basemap.spatialReference;
				map.centerAndZoom(centerPoint, toLevel);
				map.addLayer(basemap);
				map.disableKeyboardNavigation();
				vm.map.map = map;
				this.reflashMarks(fromLayerInfo,toLayerInfo,vm);
				vm.map.mouseDragStartEvent=null;
				vm.map.panEndEvent=null;
				vm.map.zoomEndEvent = null;
				vm.map.panEvent = null;
				vm.map.zoomStartEvent = null;
				vm.map.mouseMoveEvent=null;
			}
		}else{
			//map不存在时候
			var mapOptions = {};
			mapOptions.logo = false;
			//设置图层最小最大显示等级
			mapOptions.minZoom = toLayerInfo.xml.minLevel;
			mapOptions.maxZoom = toLayerInfo.xml.maxLevel;
            mapOptions.isPan = false;
			map = new esri.Map(mapdiv,mapOptions);
			if (toLayerType == "realmap") {
                centerPoint = this.pointToPoint25(toLayerInfo,toLayerInfo.xml.center_x, toLayerInfo.xml.center_y);
			}else if(toLayerType == "gaode") {
                centerPoint = this.ELatLng2EPoint(toLayerInfo,toLayerInfo.xml.center_x, toLayerInfo.xml.center_y);
			}else{
                centerPoint = new esri.geometry.Point(toLayerInfo.xml.center_x, toLayerInfo.xml.center_y);
            }
			toLevel = toLayerInfo.xml.defaultLevel;
            var basemap = new TiledLayer(toLayerInfo);
            vm.map.basemap = basemap;
            centerPoint.spatialReference = basemap.spatialReference;
			map.centerAndZoom(centerPoint, toLevel);
			map.addLayer(basemap);
            map.disableKeyboardNavigation();
            vm.map.map = map;
		}
		vm.map.fromLayerInfo = toLayerInfo;
		this.commonInit(vm);		
    },
    commonInit(vm){
		var that = this;
		var map = vm.map.map;
		vm.$store.dispatch('putState',{"key":"currentMapType","value":"2D"});
		vm.$store.dispatch('putState',{"key":"currentMapLevel","value":map.getLevel()});
		if(!vm.map.zoomEndEvent){
			// vm.map.zoomEndEvent = map.on("zoom-end",mapEvent.zoomEndEventHandler);
			vm.map.zoomEndEvent = map.on("zoom-end",function(evt){
				markUtil.reflashMapLabel(null,vm);//刷新地图上的div样式
				markUtil.showMapLabel(vm);//显示地图上的div样式
				vm.$store.dispatch('putState',{"key":"currentMapLevel","value":map.getLevel()});
			});
		}
		if(!vm.map.panEvent){
			// vm.map.panEvent = map.on("pan",mapEvent.panEventHandler);
			vm.map.panEvent = map.on("pan",function(evt){
				markUtil.reflashMapLabel(evt,vm);//刷新地图上的div样式
			});
		}
		if(!vm.map.mouseDragStartEvent){
			vm.map.mouseDragStartEvent = map.on("mouse-drag-start", mapEvent.mouseDragStartEventHandler);
		}
		if(!vm.map.panEndEvent){
			// vm.map.panEndEvent = map.on("pan-end", mapEvent.panEndEventHandler);
			vm.map.panEndEvent = map.on("pan-end", function(evt){
				var widthStr = $(map.infoWindow.domNode.childNodes[0].childNodes[1]).css("width");
				var width = eval(widthStr.substring(0, widthStr.length - 2));
				var heightStr = $(map.infoWindow.domNode.childNodes[0].childNodes[1]).css("height");
				var height = eval(heightStr.substring(0, heightStr.length - 2));
				map.infoWindow.resize(width, height);
			});
		}
		if(!vm.map.zoomStartEvent){
			// vm.map.zoomStartEvent = map.on("zoom-start", mapEvent.zoomStartEventHandler);
			vm.map.zoomStartEvent = map.on("zoom-start", function(evt){
				markUtil.hideMapLabel(vm);//隐藏地图上的div样式
			});
		}
		if(!vm.map.mouseMoveEvent){//鼠标移动事件
			vm.map.mouseMoveEvent = map.on("mouse-move",function(evt){
				var point = evt.mapPoint;
				var x = point.x;
				var y = point.y;
				if(vm.map.fromLayerInfo.xml.layerType=="realmap"){
					point = that.point25ToPoint(vm.map.fromLayerInfo,x,y);
					x=point.x;
					y=point.y;
				}
				if(vm.map.fromLayerInfo.xml.layerType=="gaode"){
					point = that.EPoint2ELatLng(vm.map.fromLayerInfo,x,y);
					x=point.x;
					y=point.y;
				}
				if(vm.map.fromLayerInfo.xml.layerType=="yst"){
					vm.setzbText("经度："+x.toFixed(4)+" 纬度："+y.toFixed(4),'#ebeef5');
				}else{
					vm.setzbText("经度："+x.toFixed(4)+" 纬度："+y.toFixed(4),'#000');
				}
			});
		}
		var width = 300;
		var height = 300;
		var style = {
				titleStyle: {
					"width": width,//标题栏宽度
					"height": 30,//标题栏高度
					// "background": "black",//标题栏背景色
					"border-radius": 0,//标题栏圆角
					"opacity": 0.9,//标题栏透明度为0.9 颜色适应新系统
					"background": "#08385a",
				},
				contentStyle: {
					"width": width,//内容框宽度
					"height": height,//内容框高度
					// "background": "black",//标题栏背景色
					"border-radius": 0,//内容框圆角
					"opacity": 0.9,//标题栏透明度为0.9 颜色适应新系统
					"overflow":"hidden",
					"background": "#08385a",
				}
			};
		this.setInfoWinowStyle(style,vm);
		
		this.createToolbarDraw(vm);
		
		//去掉点击效果的框框  不能去掉，不然测量，画图都没有了
        // $("#hfxmap_graphics_layer").remove();
    },
    setInfoWinowStyle(style,vm) {
		var titleStyle = style.titleStyle;
        var contentStyle = style.contentStyle;
        var map = vm.map.map;
	    map.infoWindow.domNode.childNodes[0].style.opacity=1;
		//隐藏窗体多余内容
		map.infoWindow.domNode.childNodes[0].childNodes[2].style.display="none";
		map.infoWindow.domNode.childNodes[0].childNodes[0].style.display="none";
		//设置标题栏|内容框高度宽度
		map.infoWindow.domNode.childNodes[0].childNodes[0].style.width=titleStyle["width"] + "px";
		map.infoWindow.domNode.childNodes[0].childNodes[1].style.width=contentStyle["width"] + "px";
		map.infoWindow.domNode.childNodes[0].childNodes[1].style.height=eval(contentStyle["height"]) + "px";
		map.infoWindow.domNode.childNodes[0].childNodes[0].childNodes[0].style.height=titleStyle["height"] + "px";
		map.infoWindow.domNode.childNodes[0].childNodes[1].childNodes[0].style.height=eval(contentStyle["height"]) + "px";
		map.infoWindow.domNode.childNodes[0].childNodes[1].childNodes[0].style.color="white";
		//设置内容框的padding|margin属性
		map.infoWindow.domNode.childNodes[0].childNodes[1].childNodes[0].style.padding="0px";
		map.infoWindow.domNode.childNodes[0].childNodes[1].childNodes[0].style.margin="0px";
		//设置标题栏和内容框圆角
		map.infoWindow.domNode.childNodes[0].childNodes[0].childNodes[0].style.background=titleStyle["background"];
		map.infoWindow.domNode.childNodes[0].childNodes[1].childNodes[0].style.background=contentStyle["background"];

		//设置标题栏和内容框圆角
		var windowRadius = "" + titleStyle["border-radius"] + "px " + titleStyle["border-radius"] + "px " 
			+ contentStyle["border-radius"] + "px " + contentStyle["border-radius"] + "px";
		var titleRadius = "" + titleStyle["border-radius"] + "px " + titleStyle["border-radius"] + "px 0px 0px";
		var contentRadius = contentStyle["border-radius"]+"px "+contentStyle["border-radius"]+"px " + contentStyle["border-radius"] + "px " + contentStyle["border-radius"] + "px";
		map.infoWindow.domNode.childNodes[0].style["border-radius"]=windowRadius;
		map.infoWindow.domNode.childNodes[0].childNodes[0].childNodes[0].style["border-radius"]=titleRadius;
		map.infoWindow.domNode.childNodes[0].childNodes[1].childNodes[0].style["border-radius"]=contentRadius;
		map.infoWindow.domNode.childNodes[0].childNodes[1].childNodes[0].style["overflow"]="hidden";
		
		//设置标题栏标题、最大最小按钮和关闭按钮位置自适应
		map.infoWindow.domNode.childNodes[0].childNodes[0].childNodes[0].childNodes[1].style["margin-left"]=titleStyle["height"]/4 + "px";
		map.infoWindow.domNode.childNodes[0].childNodes[0].childNodes[0].style["padding-top"]=titleStyle["height"]/4 + "px";
		map.infoWindow.domNode.childNodes[0].childNodes[0].childNodes[0].childNodes[4].style["margin-right"]=titleStyle["height"]/4 + "px";
		map.infoWindow.domNode.childNodes[0].childNodes[0].childNodes[0].childNodes[4].style["margin-top"]=titleStyle["height"]/4 + "px";
		map.infoWindow.domNode.childNodes[0].childNodes[0].childNodes[0].childNodes[4].style.display="none";
		map.infoWindow.domNode.childNodes[0].childNodes[0].childNodes[0].childNodes[5].style["margin-right"]=titleStyle["height"]/4 + "px";
		map.infoWindow.domNode.childNodes[0].childNodes[0].childNodes[0].childNodes[5].style["margin-top"]=titleStyle["height"]/4 + "px";

		//设置标题栏、内容框、冒泡箭头透明度
		map.infoWindow.domNode.childNodes[0].childNodes[0].childNodes[0].style.opacity=titleStyle["opacity"];
		map.infoWindow.domNode.childNodes[0].childNodes[1].childNodes[0].style.opacity=contentStyle["opacity"];
		map.infoWindow.domNode.childNodes[0].childNodes[3].style.opacity=titleStyle["opacity"];
		map.infoWindow.domNode.childNodes[1].style.opacity=contentStyle["opacity"];

		//设置冒泡窗的箭头颜色和内容框颜色保持一致
		$(map.infoWindow.domNode.childNodes[0].childNodes[3]).css("background", 
			$(map.infoWindow.domNode.childNodes[0].childNodes[1].childNodes[0]).css("background"));
		$(map.infoWindow.domNode.childNodes[1]).css("background", $(map.infoWindow.domNode.childNodes[0].childNodes[1].childNodes[0]).css("background"));
	
	},
	getMapCenterPoint(vm){
		var centerPoint = null;
		var map = vm.map.map;
        var fromLayerInfo = vm.map.fromLayerInfo;
		var centerX = (map.extent.xmin + map.extent.xmax)/2;
		var centerY = (map.extent.ymin + map.extent.ymax)/2;
		centerPoint = new esri.geometry.Point(centerX, centerY);
		if(fromLayerInfo.xml.layerType=="gaode"){
			centerPoint = this.EPoint2ELatLng(fromLayerInfo,centerX,centerY); 
		}
		if(fromLayerInfo.xml.layerType=="realmap"){
			centerPoint = this.pointToPoint25(fromLayerInfo,centerX,centerY);
		}
		return centerPoint;
	},
    pointToPoint25(layerInfo,lon,lat){//平常坐标转化为2.5坐标，layerInfo为2.5
        var a1=parseFloat(layerInfo.xml.transformdata.X.Variable1);
        var b1=parseFloat(layerInfo.xml.transformdata.X.Variable2);
        var c1=parseFloat(layerInfo.xml.transformdata.X.Intercept);
        var a2=parseFloat(layerInfo.xml.transformdata.Y.Variable1);
        var b2=parseFloat(layerInfo.xml.transformdata.Y.Variable2);
        var c2=parseFloat(layerInfo.xml.transformdata.Y.Intercept);
        var x=parseFloat(lon+layerInfo.xml.transformData_difference_x);
        var y=parseFloat(lat+layerInfo.xml.transformData_difference_y);
        var x2=parseFloat((a1*x+b1*y+c1));
        var y2=parseFloat((a2*x+b2*y+c2));
        var z = parseFloat(layerInfo.xml.fullExtent_ymax-y2);
        var point = new esri.geometry.Point(x2,z,new esri.SpatialReference({"wkid": 102100}));	
        return point;
    },
    point25ToPoint(layerInfo,lon,lat){//2.5坐标转化为平常坐标，layerInfo为2.5
        var a1=parseFloat(layerInfo.xml.transformdata.Lng.Variable1);
        var b1=parseFloat(layerInfo.xml.transformdata.Lng.Variable2);
        var c1=parseFloat(layerInfo.xml.transformdata.Lng.Intercept);
        var a2=parseFloat(layerInfo.xml.transformdata.Lat.Variable1);
        var b2=parseFloat(layerInfo.xml.transformdata.Lat.Variable2);
        var c2=parseFloat(layerInfo.xml.transformdata.Lat.Intercept);
        var x = parseFloat(lon);
        var y = parseFloat(layerInfo.xml.fullExtent_ymax-lat);
        var x2=parseFloat(a1*x+b1*y+c1);
        var y2=parseFloat(a2*x+b2*y+c2);
        x2 = parseFloat(x2-layerInfo.xml.transformData_difference_x);
        y2 = parseFloat(y2-layerInfo.xml.transformData_difference_y);
        var point = new esri.geometry.Point(x2,y2,new esri.SpatialReference({"wkid": 4490}));	
        return point;
    },
	ELatLng2EPoint(layerInfo,lon,lat) {//平常坐标转化为高德墨卡托投影坐标，layerInfo为高德
		var location = this.wgs84togcj02(parseFloat(lon),parseFloat(lat));//天地图坐标转火星坐标（高德经纬度坐标）
		var point = this.lonlatToMercator(location[0],location[1]);//高德经纬度坐标转高德墨卡托坐标
		return point;
    },
    EPoint2ELatLng(layerInfo,lon,lat) {//高德墨卡托投影坐标转化为平常坐标，layerInfo为高德
		var point = this.morcatorTolonlat(parseFloat(lon),parseFloat(lat));//高德墨卡托坐标转高德经纬度坐标（火星坐标）
		var location = this.gcj02towgs84(point.x,point.y);//火星坐标转天地图坐标
		var point = new esri.geometry.Point(location[0],location[1],new esri.SpatialReference({"wkid": 4326}));	
		return point;
	},
	morcatorTolonlat(lng,lat){
		var x = lng/20037508.34*180;
		var y = lat/20037508.34*180;
		y= 180/Math.PI*(2*Math.atan(Math.exp(y*Math.PI/180))-Math.PI/2);
		var point = new esri.geometry.Point(x,y,new esri.SpatialReference({"wkid": 4326}));	
		return point;
	},
	lonlatToMercator(lng,lat){
		var earthRad = 6378137.0; 
		var x = lng*Math.PI / 180*earthRad; 
		var a = lat*Math.PI / 180; 
		var y = earthRad / 2*Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
		var point = new esri.geometry.Point(x,y,new esri.SpatialReference({"wkid": 3857}));	
		return point;
	},
    wgs84togcj02(lng,lat){
		var PI = 3.1415926535897932384626;
		var a = 6378245.0;
		var ee = 0.00669342162296594323;

		var dlat = this.transformlat(lng - 105.0, lat - 35.0);
        var dlng = this.transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
		var mglng = lng + dlng;
		return [mglng, mglat];
	},
	gcj02towgs84(lng,lat){
		var PI = 3.1415926535897932384626;
		var a = 6378245.0;
		var ee = 0.00669342162296594323;
		
		var dlat = this.transformlat(lng - 105.0, lat - 35.0);
        var dlng = this.transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
		var mglng = lng + dlng;
		var X = lng * 2 - mglng;
		var Y = lat * 2 - mglat;
		return [X, Y];
	},
	transformlat(lng, lat) {
		var PI = 3.1415926535897932384626;
		var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
		ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
		return ret
	},
	transformlng(lng, lat) {
		var PI = 3.1415926535897932384626;
		var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
		ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
		return ret
	},

	polyline25ToPolyline(layerInfo,polyline){//2.5线转为平常线
		var l = new esri.geometry.Polyline(new esri.SpatialReference({"wkid": 4490}));
		var arr = new Array();
		for(var i in polyline.paths[0]){
			var point = this.point25ToPoint(layerInfo,polyline.paths[0][i][0],polyline.paths[0][i][1]);
			point.spatialReference = new esri.SpatialReference({"wkid": 4490});
			arr[i]=point;
		}
		l.addPath(arr);
		return l;
	},
	polylineToPolyline25(toLayerInfo,polyline){//平常线转为2.5线
		var l = new esri.geometry.Polyline(new esri.SpatialReference({"wkid": 102100}));
		var arr = new Array();
		for(var i in polyline.paths[0]){
			var point = this.pointToPoint25(toLayerInfo,polyline.paths[0][i][0],polyline.paths[0][i][1]);
			point.spatialReference = new esri.SpatialReference({"wkid": 102100});
			arr[i]=point;
		}
		l.addPath(arr);
		return l;
	},
	polylineGaodeToPolyline(layerInfo,polyline){//高德线转平常线
		var l = new esri.geometry.Polyline(new esri.SpatialReference({"wkid": 4490}));
		var arr = new Array();
		for(var i in polyline.paths[0]){
			var point = this.EPoint2ELatLng(layerInfo,polyline.paths[0][i][0],polyline.paths[0][i][1]);
			point.spatialReference = new esri.SpatialReference({"wkid": 4490});
			arr[i]=point;
		}
		l.addPath(arr);
		return l;
	},
	polylineToPolylineGaode(toLayerInfo,polyline){//平常线转高德线
		var l = new esri.geometry.Polyline(new esri.SpatialReference({"wkid": 102100}));
		var arr = new Array();
		for(var i in polyline.paths[0]){
			var point = this.ELatLng2EPoint(toLayerInfo,polyline.paths[0][i][0],polyline.paths[0][i][1]);
			point.spatialReference = new esri.SpatialReference({"wkid": 102100});
			arr[i]=point;
		}
		l.addPath(arr);
		return l;
	},
	polygon25ToPolygon(fromLayerInfo,polygon){//多边形2.5转平常
		var l = new esri.geometry.Polygon(new esri.SpatialReference({"wkid": 4490}));
		var arr = new Array();
		for(var i in polygon.rings[0]){
			var point = this.point25ToPoint(fromLayerInfo,polygon.rings[0][i][0],polygon.rings[0][i][1]);
			point.spatialReference = new esri.SpatialReference({"wkid": 4490});
			arr[i]=point;
		}
		l.addRing(arr);
		return l;
	},
	polygonToPolygon25(toLayerInfo,polygon){//多边形平常转2.5
		var l = new esri.geometry.Polygon(new esri.SpatialReference({"wkid": 102100}));
		var arr = new Array();
		for(var i in polygon.rings[0]){
			var point = this.pointToPoint25(toLayerInfo,polygon.rings[0][i][0],polygon.rings[0][i][1]);
			point.spatialReference = new esri.SpatialReference({"wkid": 102100});
			arr[i]=point;
		}
		l.addRing(arr);
		return l;
	},
	polygonGaodeToPolygon(fromLayerInfo,polygon){//多边形高德转平常
		var l = new esri.geometry.Polygon(new esri.SpatialReference({"wkid": 4490}));
		var arr = new Array();
		for(var i in polygon.rings[0]){
			var point = this.EPoint2ELatLng(fromLayerInfo,polygon.rings[0][i][0],polygon.rings[0][i][1]);
			point.spatialReference = new esri.SpatialReference({"wkid": 4490});
			arr[i]=point;
		}
		l.addRing(arr);
		return l;
	},
	polygonToPolygonGaode(toLayerInfo,polygon){//多边形平常转高德
		var l = new esri.geometry.Polygon(new esri.SpatialReference({"wkid": 102100}));
		var arr = new Array();
		for(var i in polygon.rings[0]){
			var point = this.ELatLng2EPoint(toLayerInfo,polygon.rings[0][i][0],polygon.rings[0][i][1]);
			point.spatialReference = new esri.SpatialReference({"wkid": 102100});
			arr[i]=point;
		}
		l.addRing(arr);
		return l;
	},
	extent25ToExtent(fromLayerInfo,extent){//框2.5转平常
		var point1 = this.point25ToPoint(fromLayerInfo,extent.xmin,extent.ymin);
		var point2 = this.point25ToPoint(fromLayerInfo,extent.xmax,extent.ymin);
		var point3 = this.point25ToPoint(fromLayerInfo,extent.xmax,extent.ymax);
		var point4 = this.point25ToPoint(fromLayerInfo,extent.xmin,extent.ymax);
		var l = new esri.geometry.Polygon(new esri.SpatialReference({"wkid": 4490}));
		var arr = new Array();
		arr[0]=point1;
		arr[1]=point2;
		arr[2]=point3;
		arr[3]=point4;
		arr[4]=point1;
		l.addRing(arr);
		return l;
	},
	extentToExtent25(toLayerInfo,extent){//框平常转2.5
		var point1 = this.pointToPoint25(toLayerInfo,extent.xmin,extent.ymin);
		var point2 = this.pointToPoint25(toLayerInfo,extent.xmax,extent.ymin);
		var point3 = this.pointToPoint25(toLayerInfo,extent.xmax,extent.ymax);
		var point4 = this.pointToPoint25(toLayerInfo,extent.xmin,extent.ymax);
		var l = new esri.geometry.Polygon(new esri.SpatialReference({"wkid": 102100}));
		var arr = new Array();
		arr[0]=point1;
		arr[1]=point2;
		arr[2]=point3;
		arr[3]=point4;
		arr[4]=point1;
		l.addRing(arr);
		return l;
	},
	extentGaodeToExtent(fromLayerInfo,extent){//框高德转平常
		var point1 = this.EPoint2ELatLng(fromLayerInfo,extent.xmin,extent.ymin);
		var point2 = this.EPoint2ELatLng(fromLayerInfo,extent.xmax,extent.ymin);
		var point3 = this.EPoint2ELatLng(fromLayerInfo,extent.xmax,extent.ymax);
		var point4 = this.EPoint2ELatLng(fromLayerInfo,extent.xmin,extent.ymax);
		var l = new esri.geometry.Polygon(new esri.SpatialReference({"wkid": 4490}));
		var arr = new Array();
		arr[0]=point1;
		arr[1]=point2;
		arr[2]=point3;
		arr[3]=point4;
		arr[4]=point1;
		l.addRing(arr);
		return l;
	},
	extentToExtentGaode(toLayerInfo,extent){//框平常转高德
		var point1 = this.ELatLng2EPoint(toLayerInfo,extent.xmin,extent.ymin);
		var point2 = this.ELatLng2EPoint(toLayerInfo,extent.xmax,extent.ymin);
		var point3 = this.ELatLng2EPoint(toLayerInfo,extent.xmax,extent.ymax);
		var point4 = this.ELatLng2EPoint(toLayerInfo,extent.xmin,extent.ymax);
		var l = new esri.geometry.Polygon(new esri.SpatialReference({"wkid": 102100}));
		var arr = new Array();
		arr[0]=point1;
		arr[1]=point2;
		arr[2]=point3;
		arr[3]=point4;
		arr[4]=point1;
		l.addRing(arr);
		return l;
	},
	reflashMarks(fromLayerInfo,toLayerInfo,vm){//切换图层重新打点
		if(fromLayerInfo==null||toLayerInfo==null){
			return;
		}
		if (fromLayerInfo.xml.layerType == toLayerInfo.xml.layerType) {//切片参数一致，只替换底图数据
			//无需重新打点
		}else{
			var basemap = new TiledLayer(toLayerInfo);
			var layeridmap = vm.map.layeridmap;
			var divlayeridmap = vm.map.divlayeridmap;
			if((fromLayerInfo.xml.layerType=="tdt"||fromLayerInfo.xml.layerType=="yst")&&toLayerInfo.xml.layerType=="realmap"){//2D转2.5D
				for(var layerid in layeridmap){
					var clayer = layeridmap[layerid];
					for(var j = 0;j<clayer.graphics.length;j++){
						var graphic = clayer.graphics[j];
						if(graphic.geometry.type=="point"){
							var point = this.pointToPoint25(toLayerInfo,graphic.geometry.x,graphic.geometry.y);
							point.spatialReference = basemap.spatialReference;
							graphic.setGeometry(point);
						}else if(graphic.geometry.type=="polygon"){
							graphic.setGeometry(this.polygonToPolygon25(toLayerInfo,graphic.geometry));
						}else if(graphic.geometry.type=="polyline"){
							graphic.setGeometry(this.polylineToPolyline25(toLayerInfo,graphic.geometry));
						}else if(graphic.geometry.type=="extent"){
							graphic.setGeometry(this.extentToExtent25(toLayerInfo,graphic.geometry));
						}
					}
				}
			}else if(fromLayerInfo.xml.layerType=="realmap"&&(toLayerInfo.xml.layerType=="tdt"||toLayerInfo.xml.layerType=="yst")){//2.5D转2D
				for(var layerid in layeridmap){
					var clayer = layeridmap[layerid];
					for(var j = 0;j<clayer.graphics.length;j++){
						var graphic = clayer.graphics[j];
						if(graphic.geometry.type=="point"){
							var point = this.point25ToPoint(fromLayerInfo,graphic.geometry.x,graphic.geometry.y);
							point.spatialReference = basemap.spatialReference;
							graphic.setGeometry(point);
						}else if(graphic.geometry.type=="polygon"){
							graphic.setGeometry(this.polygon25ToPolygon(fromLayerInfo,graphic.geometry));
						}else if(graphic.geometry.type=="polyline"){
							graphic.setGeometry(this.polyline25ToPolyline(fromLayerInfo,graphic.geometry));
						}else if(graphic.geometry.type=="extent"){
							graphic.setGeometry(this.extent25ToExtent(fromLayerInfo,graphic.geometry));
						}
					}
				}
			}else if((fromLayerInfo.xml.layerType=="tdt"||fromLayerInfo.xml.layerType=="yst")&&toLayerInfo.xml.layerType=="gaode"){//2D转高德
				for(var layerid in layeridmap){
					var clayer = layeridmap[layerid];
					for(var j = 0;j<clayer.graphics.length;j++){
						var graphic = clayer.graphics[j];
						if(graphic.geometry.type=="point"){
							var point = this.ELatLng2EPoint(toLayerInfo,graphic.geometry.x,graphic.geometry.y);
							point.spatialReference = basemap.spatialReference;
							graphic.setGeometry(point);
						}else if(graphic.geometry.type=="polygon"){
							graphic.setGeometry(this.polygonToPolygonGaode(toLayerInfo,graphic.geometry));
						}else if(graphic.geometry.type=="polyline"){
							graphic.setGeometry(this.polylineToPolylineGaode(toLayerInfo,graphic.geometry));
						}else if(graphic.geometry.type=="extent"){
							graphic.setGeometry(this.extentToExtentGaode(toLayerInfo,graphic.geometry));
						}
					}
				}
			}else if(fromLayerInfo.xml.layerType=="gaode"&&(toLayerInfo.xml.layerType=="tdt"||toLayerInfo.xml.layerType=="yst")){//高德转2D
				for(var layerid in layeridmap){
					var clayer = layeridmap[layerid];
					for(var j = 0;j<clayer.graphics.length;j++){
						var graphic = clayer.graphics[j];
						if(graphic.geometry.type=="point"){
							var point = this.EPoint2ELatLng(fromLayerInfo,graphic.geometry.x,graphic.geometry.y);
							point.spatialReference = basemap.spatialReference;
							graphic.setGeometry(point);
						}else if(graphic.geometry.type=="polygon"){
							graphic.setGeometry(this.polygonGaodeToPolygon(fromLayerInfo,graphic.geometry));
						}else if(graphic.geometry.type=="polyline"){
							graphic.setGeometry(this.polylineGaodeToPolyline(fromLayerInfo,graphic.geometry));
						}else if(graphic.geometry.type=="extent"){
							graphic.setGeometry(this.extentGaodeToExtent(fromLayerInfo,graphic.geometry));
						}
					}
				}
			}else if(fromLayerInfo.xml.layerType=="gaode"&&toLayerInfo.xml.layerType=="realmap"){//高德转2.5
				for(var layerid in layeridmap){
					var clayer = layeridmap[layerid];
					for(var j = 0;j<clayer.graphics.length;j++){
						var graphic = clayer.graphics[j];
						if(graphic.geometry.type=="point"){
							var point = this.EPoint2ELatLng(fromLayerInfo,graphic.geometry.x,graphic.geometry.y);
							point = this.pointToPoint25(toLayerInfo,point.x,point.y);
							point.spatialReference = basemap.spatialReference;
							graphic.setGeometry(point);
						}else if(graphic.geometry.type=="polygon"){
							var geo = this.polygonGaodeToPolygon(fromLayerInfo,graphic.geometry);
							graphic.setGeometry(this.polygonToPolygon25(toLayerInfo,geo));
						}else if(graphic.geometry.type=="polyline"){
							var geo = this.polylineGaodeToPolyline(fromLayerInfo,graphic.geometry);
							graphic.setGeometry(this.polylineToPolyline25(toLayerInfo,geo));
						}else if(graphic.geometry.type=="extent"){
							var geo = this.extentGaodeToExtent(fromLayerInfo,graphic.geometry);
							graphic.setGeometry(this.extentToExtent25(toLayerInfo,geo));
						}
					}
				}
			}else if(fromLayerInfo.xml.layerType=="realmap"&&toLayerInfo.xml.layerType=="gaode"){//2.5转高德
				for(var layerid in layeridmap){
					var clayer = layeridmap[layerid];
					for(var j = 0;j<clayer.graphics.length;j++){
						var graphic = clayer.graphics[j];
						if(graphic.geometry.type=="point"){
							var point = this.point25ToPoint(fromLayerInfo,graphic.geometry.x,graphic.geometry.y);
							point = this.ELatLng2EPoint(toLayerInfo,point.x,point.y);
							point.spatialReference = basemap.spatialReference;
							graphic.setGeometry(point);
						}else if(graphic.geometry.type=="polygon"){
							var geo = this.polygon25ToPolygon(fromLayerInfo,graphic.geometry);
							graphic.setGeometry(this.polygonToPolygonGaode(toLayerInfo,geo));
						}else if(graphic.geometry.type=="polyline"){
							var geo = this.polyline25ToPolyline(fromLayerInfo,graphic.geometry);
							graphic.setGeometry(this.polylineToPolylineGaode(toLayerInfo,geo));
						}else if(graphic.geometry.type=="extent"){
							var geo = this.extent25ToExtent(fromLayerInfo,graphic.geometry);
							graphic.setGeometry(this.extentToExtentGaode(toLayerInfo,geo));
						}
					}
				}
			}
			for(var layerid in layeridmap){
                if(layerid=="heatmap"){
                    // var l = getFeatureLayer();
                    // var preLayer = layeridmap[layerid];
                    // for(var j = 0;j<preLayer.graphics.length;j++){
					// 	var graphic = preLayer.graphics[j];
					// 	l.add(graphic);
					// }
                    // layeridmap[layerid] = l;
                    // map.addLayer(l);
                }else{
					var map = vm.map.map;
				    map.addLayer(layeridmap[layerid]);
                }
			}
			vm.map.fromLayerInfo = toLayerInfo;//刷新地图上div点样式
			for(var layerid in divlayeridmap){
                for(var markid in divlayeridmap[layerid]){
                    markUtil.addMapLabelDiv(divlayeridmap[layerid][markid],layerid,vm);
				}
			}
		}
	},
	createToolbarDraw(vm) {
		var map = vm.map.map;
		esriLoader.loadModules([
			"esri/toolbars/draw"
		], {url:Constants.map_base_url}).then(([Draw
			]) => {
				vm.map.toolbar = new esri.toolbars.Draw(map);
			}).catch (err => {})
		esriLoader.loadModules([
			"esri/toolbars/edit"
		], {url:Constants.map_base_url}).then(([Edit
			]) => {
				vm.map.editToolbar = new esri.toolbars.Edit(map);
			}).catch (err => {})
	},
	getTruePolygon(polygon,vm){
		var fromLayerInfo = vm.map.fromLayerInfo;
		if(fromLayerInfo.xml.layerType=="realmap"){//实景图转化
			return this.polygon25ToPolygon(fromLayerInfo,polygon);
		}
		if(fromLayerInfo.xml.layerType=="gaode"){//实景图转化
			return this.polygonGaodeToPolygon(fromLayerInfo,polygon);
		}
		return polygon;
	},
	getTruePoint(point,vm){
		var fromLayerInfo = vm.map.fromLayerInfo;
		if(fromLayerInfo.xml.layerType=="realmap"){//实景图转化
			return this.point25ToPoint(fromLayerInfo,point.x,point.y);
		}
		if(fromLayerInfo.xml.layerType=="gaode"){//实景图转化
			return this.EPoint2ELatLng(fromLayerInfo,point.x,point.y);
		}
		return point;
	},
	getTruePolyline(polyline,vm){
		var fromLayerInfo = vm.map.fromLayerInfo;
		if(fromLayerInfo.xml.layerType=="realmap"){//实景图转化
			return this.polyline25ToPolyline(fromLayerInfo,polyline);
		}
		if(fromLayerInfo.xml.layerType=="gaode"){//实景图转化
			return this.polylineGaodeToPolyline(fromLayerInfo,polyline);
		}
		return polyline;
	},
	getPolygonCenterPoint(polygon,vm){//获取几何图形的中心点
		var fromLayerInfo = vm.map.fromLayerInfo;
		var xmin = polygon.cache._extent.xmin;
		var xmax = polygon.cache._extent.xmax;
		var ymin = polygon.cache._extent.ymin;
		var ymax = polygon.cache._extent.ymax;
		var point = {};
		point.x = (xmin+xmax)/2;
		point.y = (ymin+ymax)/2;
		if(fromLayerInfo.xml.layerType=="realmap"){
			point = this.point25ToPoint(fromLayerInfo,point.x,point.y);
		}
		if(fromLayerInfo.xml.layerType=="gaode"){
			point = this.EPoint2ELatLng(fromLayerInfo,point.x,point.y);
		}
		return point;
	},
}