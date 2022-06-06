
import Constants from '@/constants/Constants'
import mapEvent from './mapEvent'
//地图加载包
import * as esriLoader from 'esri-loader'
export default{
    getMapArray(array,mapObj){
        for(var i=0;i<array.length;i++){
            var obj = array[i];
            obj.urlpattern = (obj.urlpattern.replace(/\\\{/gi,"{")).replace(/\\\}/gi,"}");
            var xml = this.getMapXml(obj.url);
            obj.xml = xml;
            mapObj.map_mapArray.push(obj);
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
    getLayerObj(layerid,mapObj){
		var layerObj;
		for(var i=0;i<mapObj.map_mapArray.length;i++){
			var obj = mapObj.map_mapArray[i];
			if(obj.layerid==layerid){
				layerObj = obj;
				break;
			}
		}
		return layerObj;
	},
    setBasemap(toLayerid,mapdiv,mapObj,layertype){
        var map = mapObj.map;
        var fromLayerInfo = mapObj.fromLayerInfo;
		var toLayerInfo = this.getLayerObj(toLayerid,mapObj);
		if(layertype=='zjlayer'){//地图路径里面有注记的打标注图层
			toLayerInfo.zj = '1';
		}
		if(toLayerInfo.urlzjpattern&&toLayerInfo.urlzjpattern!=""&&!layertype){//标注不为空，延时200毫秒打标注图层
			var that = this;
			setTimeout(function() {
				return that.setBasemap(toLayerid,mapdiv,mapObj,"zjlayer");
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
			if (fromLayerInfo.layerid == toLayerid) {//图层相同，返回
				return;
			}
			//map存在时候
			if (fromLayerInfo.xml.layerType == toLayerInfo.xml.layerType) {//切片参数一致，只替换底图数据
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
					toLevel = fromLevel-12;
					if(toLevel<0){
						toLevel=0;
					}else if(toLevel>7){
						toLevel=7;
					}
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = this.pointToPoint25(toLayerInfo,centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="realmap"&&toLayerType=="tdt"){
					toLevel = fromLevel+12;
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
				mapOptions.slider=false;
                mapOptions.isPan = false;
				map = new esri.Map(mapdiv, mapOptions);
                var basemap = new TiledLayer(toLayerInfo);
                mapObj.basemap = basemap;
                centerPoint.spatialReference = basemap.spatialReference;
				map.centerAndZoom(centerPoint, toLevel);
				map.addLayer(basemap);
                map.disableKeyboardNavigation();
				this.reflashMarks(fromLayerInfo,toLayerInfo,mapObj);
				mapObj.mouseDragStartEvent=null;
				mapObj.panEndEvent=null;
				mapObj.zoomEndEvent = null;
				mapObj.panEvent = null;
				mapObj.zoomStartEvent = null;
				mapObj.mouseMoveEvent=null;
			}
		}else{
			//map不存在时候
			var mapOptions = {};
			mapOptions.logo = false;
			//设置图层最小最大显示等级
			mapOptions.minZoom = toLayerInfo.xml.minLevel;
			mapOptions.maxZoom = toLayerInfo.xml.maxLevel;
			mapOptions.slider=false;  
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
            mapObj.basemap = basemap;
            centerPoint.spatialReference = basemap.spatialReference;
			map.centerAndZoom(centerPoint, toLevel);
			map.addLayer(basemap);
            map.disableKeyboardNavigation();
			mapObj.map = map;
		}
		mapObj.fromLayerInfo = toLayerInfo;
		this.commonInit(mapObj);		
    },
    commonInit(mapObj){
		var that = this;
        var map = mapObj.map;
		if(!mapObj.zoomEndEvent){
			mapObj.zoomEndEvent = map.on("zoom-end",mapEvent.zoomEndEventHandler);
		}
		if(!mapObj.panEvent){
			mapObj.panEvent = map.on("pan",mapEvent.panEventHandler);
		}
		if(!mapObj.mouseDragStartEvent){
			mapObj.mouseDragStartEvent = map.on("mouse-drag-start", mapEvent.mouseDragStartEventHandler);
		}
		if(!mapObj.panEndEvent){
			mapObj.panEndEvent = map.on("pan-end", function(evt){
				var widthStr = $(map.infoWindow.domNode.childNodes[0].childNodes[1]).css("width");
				var width = eval(widthStr.substring(0, widthStr.length - 2));
				var heightStr = $(map.infoWindow.domNode.childNodes[0].childNodes[1]).css("height");
				var height = eval(heightStr.substring(0, heightStr.length - 2));
				map.infoWindow.resize(width, height);
			});
		}
		if(!mapObj.zoomStartEvent){
			mapObj.zoomStartEvent = map.on("zoom-start", mapEvent.zoomStartEventHandler);
		}
		//注销鼠标移动事件
		// if(!mapObj.mouseMoveEvent){//鼠标移动事件
		// 	mapObj.mouseMoveEvent = map.on("mouse-move",function(evt){
		// 		var point = evt.mapPoint;
		// 		var x = point.x;
		// 		var y = point.y;
		// 		if(mapObj.fromLayerInfo.xml.layerType=="realmap"){
		// 			point = that.point25ToPoint(mapObj.fromLayerInfo,x,y);
		// 			x=point.x;
		// 			y=point.y;
		// 		}
		// 		if(mapObj.fromLayerInfo.xml.layerType=="gaode"){
		// 			point = that.EPoint2ELatLng(mapObj.fromLayerInfo,x,y);
		// 			x=point.x;
		// 			y=point.y;
		// 		}
		// 		vm.coordinate = x.toFixed(4)+","+y.toFixed(4);
		// 	});
		// }
		var width = 300;
		var height = 300;
		var style = {
				titleStyle: {
					"width": width,//标题栏宽度
					"height": 30,//标题栏高度
					"background": "black",//标题栏背景色
					"border-radius": 5,//标题栏圆角
					"opacity": 1//标题栏透明度
				},
				contentStyle: {
					"width": width,//内容框宽度
					"height": height,//内容框高度
					"background": "black",//标题栏背景色
					"border-radius": 5,//内容框圆角
					"opacity": 1,//内容框透明度
					"overflow":"hidden"
				}
			};
		this.setInfoWinowStyle(style,mapObj);
		
		this.createToolbarDraw(mapObj);
    },
    setInfoWinowStyle(style,mapObj) {
		var titleStyle = style.titleStyle;
        var contentStyle = style.contentStyle;
		var map = mapObj.map;
		if(!map.infoWindow){
           return;
		}
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
    ELatLng2EPoint(layerInfo,lon,lat) {//平常坐标转化为高德坐标，layerInfo为高德
        var X = parseInt(layerInfo.xml.transformdata.X.Variable1*lon + layerInfo.xml.transformdata.X.Variable2*lat + (layerInfo.xml.transformdata.X.Intercept));
        var Y = parseInt(layerInfo.xml.transformdata.Y.Variable1*lon + layerInfo.xml.transformdata.Y.Variable2*lat + (layerInfo.xml.transformdata.Y.Intercept));
        var point = new esri.geometry.Point(X,Y,new esri.SpatialReference({"wkid": 102100}));	
        return point;
    },
    EPoint2ELatLng(layerInfo,lon,lat) {//高德坐标转化为平常坐标，layerInfo为高德
        var Lng=layerInfo.xml.transformdata.Lng.Variable1 * lon + (layerInfo.xml.transformdata.Lng.Variable2) * lat + (layerInfo.xml.transformdata.Lng.Intercept);
        var Lat=layerInfo.xml.transformdata.Lat.Variable1 * lon + layerInfo.xml.transformdata.Lat.Variable2 * lat + (layerInfo.xml.transformdata.Lat.Intercept);
        var point = new esri.geometry.Point(Lng,Lat,new esri.SpatialReference({"wkid": 4490}));	
        return point;
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
	reflashMarks(fromLayerInfo,toLayerInfo,mapObj){//切换图层重新打点
		if(fromLayerInfo==null||toLayerInfo==null){
			return;
		}
		if (fromLayerInfo.xml.layerType == toLayerInfo.xml.layerType) {//切片参数一致，只替换底图数据
			//无需重新打点
		}else{
			var layeridmap = mapObj.layeridmap;
			if((fromLayerInfo.xml.layerType=="tdt"||fromLayerInfo.xml.layerType=="pgis")&&toLayerInfo.xml.layerType=="realmap"){//2D转2.5D
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
			}else if(fromLayerInfo.xml.layerType=="realmap"&&(toLayerInfo.xml.layerType=="tdt"||toLayerInfo.xml.layerType=="pgis")){//2.5D转2D
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
			}else if((fromLayerInfo.xml.layerType=="tdt"||fromLayerInfo.xml.layerType=="pgis")&&toLayerInfo.xml.layerType=="gaode"){//2D转高德
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
			}else if(fromLayerInfo.xml.layerType=="gaode"&&(toLayerInfo.xml.layerType=="tdt"||toLayerInfo.xml.layerType=="pgis")){//高德转2D
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
				    map.addLayer(layeridmap[layerid]);
                }
			}
		}
	},
	createToolbarDraw(mapObj) {
		var map = mapObj.map;
		esriLoader.loadModules([
			"esri/toolbars/draw"
		], {url:Constants.map_base_url}).then(([Draw
			]) => {
				mapObj.toolbar = new esri.toolbars.Draw(map);
			}).catch (err => {})
		esriLoader.loadModules([
			"esri/toolbars/edit"
		], {url:Constants.map_base_url}).then(([Edit
			]) => {
				mapObj.editToolbar = new esri.toolbars.Edit(map);
			}).catch (err => {})
	},
	getTruePolygon(polygon,mapObj){
		var fromLayerInfo = mapObj.fromLayerInfo;
		if(fromLayerInfo.xml.layerType=="realmap"){//实景图转化
			return this.polygon25ToPolygon(fromLayerInfo,polygon);
		}
		if(fromLayerInfo.xml.layerType=="gaode"){//实景图转化
			return this.polygonGaodeToPolygon(fromLayerInfo,polygon);
		}
		return polygon;
	},
	getTruePoint(point,mapObj){
		var fromLayerInfo = mapObj.fromLayerInfo;
		if(fromLayerInfo.xml.layerType=="realmap"){//实景图转化
			return this.point25ToPoint(fromLayerInfo,point.x,point.y);
		}
		if(fromLayerInfo.xml.layerType=="gaode"){//实景图转化
			return this.EPoint2ELatLng(fromLayerInfo,point.x,point.y);
		}
		return point;
	},
	getTruePolyline(polyline,mapObj){
		var fromLayerInfo = mapObj.fromLayerInfo;
		if(fromLayerInfo.xml.layerType=="realmap"){//实景图转化
			return this.polyline25ToPolyline(fromLayerInfo,polyline);
		}
		if(fromLayerInfo.xml.layerType=="gaode"){//实景图转化
			return this.polylineGaodeToPolyline(fromLayerInfo,polyline);
		}
		return polyline;
	},
	getPolygonCenterPoint(polygon,mapObj){//获取几何图形的中心点
		var fromLayerInfo = mapObj.fromLayerInfo;
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
	}
}