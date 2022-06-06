
import Constants from '@/constants/Constants'
import mapEvent from './mapEvent'
import mapUtil from './mapUtil'
//地图加载包
import * as esriLoader from 'esri-loader'
export default{
    getMapArray(array,vm){
		var map_mapArray = [];
		vm.heatmap.map_mapArray = map_mapArray;
        for(var i=0;i<array.length;i++){
            var obj = array[i];
            obj.urlpattern = (obj.urlpattern.replace(/\\\{/gi,"{")).replace(/\\\}/gi,"}");
            var xml = mapUtil.getMapXml(obj.url);
            obj.xml = xml;
            vm.heatmap.map_mapArray.push(obj);
        }
	},
	setBasemap(toLayerid,mapdiv,vm){
        var map = vm.heatmap.map;
        var fromLayerInfo = vm.heatmap.fromLayerInfo;
		var toLayerInfo = this.getLayerObj(toLayerid,vm);
		//basemaptype = toLayerInfo.xml.layerType;
		var toLayerType = toLayerInfo.xml.layerType;
		var toLevel = 0;
		var centerPoint = null;
		if(map){
			if (fromLayerInfo.layerid == toLayerid) {//图层相同，返回
				return;
			}
			//map存在时候
			if (fromLayerInfo.xml.layerType == toLayerInfo.xml.layerType) {//切片参数一致，只替换底图数据
				var fromLayer = map.getLayer(fromLayerInfo.layerid);
				if (fromLayer) {
					map.removeLayer(fromLayer);
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
					centerPoint = mapUtil.pointToPoint25(toLayerInfo,centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="realmap"&&toLayerType=="tdt"){
					toLevel = fromLevel+12;
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = mapUtil.point25ToPoint(fromLayerInfo,centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="realmap"&&toLayerType=="gaode"){
                    toLevel = fromLevel+10;
                    if(toLevel>18){
                      toLevel = 18; 
                    }
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = mapUtil.point25ToPoint(fromLayerInfo,centerX,centerY);
                    centerPoint = mapUtil.ELatLng2EPoint(toLayerInfo,centerPoint.x,centerPoint.y);
                }else if(fromLayerInfo.xml.layerType=="gaode"&&toLayerType=="realmap"){
                    toLevel = fromLevel-10;
                    if(toLevel<0){
						toLevel=0;
					}else if(toLevel>7){
						toLevel=7;
					}
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = mapUtil.EPoint2ELatLng(fromLayerInfo,centerX,centerY);  
                    centerPoint = mapUtil.pointToPoint25(toLayerInfo,centerPoint.x,centerPoint.y);
                }else if(fromLayerInfo.xml.layerType=="tdt"&&toLayerType=="gaode"){
					toLevel = fromLevel-3;
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = mapUtil.ELatLng2EPoint(toLayerInfo,centerX,centerY);
                }else if(fromLayerInfo.xml.layerType=="gaode"&&toLayerType=="tdt"){
                    toLevel = fromLevel+3;
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = mapUtil.EPoint2ELatLng(fromLayerInfo,centerX,centerY);    
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
					centerPoint = mapUtil.pointToPoint25(toLayerInfo,centerX,centerY);
				}else if(fromLayerInfo.xml.layerType=="realmap"&&toLayerType=="pgis"){
					toLevel = fromLevel+1;
					var centerX = (map.extent.xmin + map.extent.xmax)/2;
					var centerY = (map.extent.ymin + map.extent.ymax)/2;
					centerPoint = mapUtil.point25ToPoint(fromLayerInfo,centerX,centerY);
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
                vm.heatmap.basemap = basemap;
                centerPoint.spatialReference = basemap.spatialReference;
				map.centerAndZoom(centerPoint, toLevel);
				map.addLayer(basemap);
                map.disableKeyboardNavigation();
				this.reflashMarks(fromLayerInfo,toLayerInfo,vm);
				// vm.heatmap.mouseDragStartEvent=null;
				// vm.heatmap.panEndEvent=null;
				// vm.heatmap.zoomEndEvent = null;
				// vm.heatmap.panEvent = null;
				// vm.heatmap.zoomStartEvent = null;
				// vm.heatmap.mouseMoveEvent=null;
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
                centerPoint = mapUtil.pointToPoint25(toLayerInfo,toLayerInfo.xml.center_x, toLayerInfo.xml.center_y);
			}else if(toLayerType == "gaode") {
                centerPoint = mapUtil.ELatLng2EPoint(toLayerInfo,toLayerInfo.xml.center_x, toLayerInfo.xml.center_y);
			}else{
                centerPoint = new esri.geometry.Point(toLayerInfo.xml.center_x, toLayerInfo.xml.center_y);
            }
			toLevel = toLayerInfo.xml.defaultLevel;
            var basemap = new TiledLayer(toLayerInfo);
            vm.heatmap.basemap = basemap;
            centerPoint.spatialReference = basemap.spatialReference;
			map.centerAndZoom(centerPoint, toLevel);
			map.addLayer(basemap);
            map.disableKeyboardNavigation();
            vm.heatmap.map = map;
		}
		vm.heatmap.fromLayerInfo = toLayerInfo;
		// this.commonInit(vm);		
	},
	getLayerObj(layerid,vm){
		var layerObj;
		for(var i=0;i<vm.heatmap.map_mapArray.length;i++){
			var obj = vm.heatmap.map_mapArray[i];
			if(obj.layerid==layerid){
				layerObj = obj;
				break;
			}
		}
		return layerObj;
	},
}