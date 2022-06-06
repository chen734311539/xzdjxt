import Vue from "vue";
import mapUtil from './mapUtil'
import mapEvent from './mapEvent'
import yewuMarkUtil from './yewuMarkUtil'
import Constants from '@/constants/Constants'
//地图加载包
import * as esriLoader from 'esri-loader'
export default{
    addMark(layerid,markinfo,vm){
		var layer;
		if(vm.map.layeridmap[layerid]){
			//存在则从map中获取
			layer = vm.map.layeridmap[layerid];
		}else{
			//不存在则新建
			layer = new esri.layers.GraphicsLayer({id:layerid});
			vm.map.layeridmap[layerid] = layer;
			vm.map.map.addLayer(layer,5);
			mapEvent.registerLayerEvent(layerid,layer,vm);
		}
		var markid = markinfo.id;
		if(markid==null){
			return;
		}
		var lx = parseFloat(markinfo.lx);
		var ly = parseFloat(markinfo.ly);
		var size_x = markinfo.size_x;
		if(size_x==null||size_x==""){
			size_x = 22;
			markinfo.size_x = 22;
		}
		var size_y = markinfo.size_y;
		if(size_y==null||size_y==""){
			size_y = 23;
			markinfo.size_y = 23;
		}
		var point;
		if(vm.map.fromLayerInfo.xml.layerType == "realmap"){
			point = mapUtil.pointToPoint25(vm.map.fromLayerInfo,lx,ly);
		}else if(vm.map.fromLayerInfo.xml.layerType == "gaode"){
            point = mapUtil.ELatLng2EPoint(vm.map.fromLayerInfo,lx,ly);    
        }else{
			point = new esri.geometry.Point(lx, ly);
		}
		if(markinfo.radius){
			var radius = parseInt(markinfo.radius);
			this.drawPointCircle(lx,ly,radius/111000,layerid+"Circle",markinfo,vm);
		}
		point.spatialReference = vm.map.basemap.spatialReference;
		var isExistMark = false;
		var symbol_pic = new esri.symbol.PictureMarkerSymbol(markinfo.iconurl, parseFloat(size_x), parseFloat(size_y));
		if(markinfo.bgiconurl){
			var hsymbol = new esri.symbol.PictureMarkerSymbol(markinfo.bgiconurl,32,42);	
			var bgobj = {};
			bgobj.size_x = 32;
			bgobj.size_y = 42;
			bgobj.id = markid;
			bgobj.noclick = '1';
			markinfo.noclick = '1';
		}
		if(vm.map.markidmap[layerid]){
			if(vm.map.markidmap[layerid][markid]){
				isExistMark = true;
				//存在点重新打点
				var pointGraphic = vm.map.markidmap[layerid][markid];
				pointGraphic.setAttributes(markinfo);
				pointGraphic.setGeometry(point);
				pointGraphic.setSymbol(symbol_pic);

				if(markinfo.bgiconurl){
					//图片边框
					var bgPointGraphic = vm.map.markidmap[layerid][markid+"bg"];
					bgPointGraphic.setAttributes(bgobj);
					bgPointGraphic.setGeometry(point);
					bgPointGraphic.setSymbol(hsymbol);
				}
			}
		}
		if(!isExistMark){
			//不存在点则打点
			if(markinfo.bgiconurl){
				var bgPointGraphic = new esri.Graphic(point, hsymbol,bgobj,null);//带边框图片打点
                layer.add(bgPointGraphic);
			}
			var pointGraphic = new esri.Graphic(point, symbol_pic,markinfo,null);
			layer.add(pointGraphic);
		}
		if(vm.map.markidmap[layerid]){
			vm.map.markidmap[layerid][markid] = pointGraphic;
			if(markinfo.bgiconurl){
				vm.map.markidmap[layerid][markid+"bg"] = bgPointGraphic;
			}
		}else{
			vm.map.markidmap[layerid] = {};
			vm.map.markidmap[layerid][markid] = pointGraphic;
			if(markinfo.bgiconurl){
				vm.map.markidmap[layerid][markid+"bg"] = bgPointGraphic;
			}
		}
		if(markinfo.type=='ssjl'){
            this.addJlLabelDiv(markinfo,layerid,vm,'tips');
		}
		//打div
		//if(isShowMapDiv){
			// this.addMapLabelDiv(point.x,point.y,layerid,markid,vm);
		//}
	},
	resetMarkLoc(layerid,markid,loc,vm){
		if(!vm.map.markidmap[layerid][markid]){
           return;
		}
		var point;
		if(vm.map.fromLayerInfo.xml.layerType == "realmap"){
			point = mapUtil.pointToPoint25(vm.map.fromLayerInfo,loc.x,loc.y);
		}else if(vm.map.fromLayerInfo.xml.layerType == "gaode"){
            point = mapUtil.ELatLng2EPoint(vm.map.fromLayerInfo,loc.x,loc.y);    
        }else{
			point = new esri.geometry.Point(loc.x, loc.y);
		}
		point.spatialReference = vm.map.basemap.spatialReference;
		//存在点重新打点
		var pointGraphic = vm.map.markidmap[layerid][markid];
		pointGraphic.setGeometry(point);
		var screenPoint = vm.map.map.toScreen(point);//地图坐标转屏幕坐标

		var fontSizewWidth = $("#" + markid).width();
		var fontSizewheight = $("#" + markid).height();
		var divleft = '';
		var divtop = '';
		divleft = screenPoint.x -(fontSizewWidth/2) + "px";
		divtop = screenPoint.y -25-fontSizewheight + "px";
		$("#" + markid)[0].style.left = divleft;
		$("#" + markid)[0].style.top = divtop;
		$("#" + markid).attr('divtype','ssjl');
	},
	addJlLabelDiv(data,layerid,vm,divtype){
		var lon = data.lx;
		var lat = data.ly;
		var markid = data.id;
		var showdivclass = false;
		if(!vm.map.divlayeridmap.hasOwnProperty(layerid)){
			vm.map.divlayeridmap[layerid]=vm.showjllabel;
			showdivclass = vm.showjllabel;
		}else{
			showdivclass = vm.map.divlayeridmap[layerid];
		}
		var divId = markid;
		var mapPoint = new esri.geometry.Point(lon, lat,vm.map.map.spatialReference);
		if(vm.map.fromLayerInfo.xml.layerType=="realmap"){
			var mapPoint = mapUtil.pointToPoint25(vm.map.fromLayerInfo,lon,lat);
			mapPoint.spatialReference = vm.map.map.spatialReference;
		}
		if(vm.map.fromLayerInfo.xml.layerType=="gaode"){
			var mapPoint = mapUtil.ELatLng2EPoint(vm.map.fromLayerInfo,lon,lat);
			mapPoint.spatialReference = vm.map.map.spatialReference;
		}
		var screenPoint = vm.map.map.toScreen(mapPoint);//地图坐标转屏幕坐标
		var _set = '<div onselectstart="return false" id="'+divId+'" class="ssjl_tips '+layerid+' ssjlLayer"   offsetx="'+0+'" offsety="'+0+'" lon="'+lon+'" lat="'+lat+'">'+ (data.name.length>50?data.name.substring(0,50):data.name) +'</div>';
		if($("#" + divId).length>0){
			$("#" + divId).remove();
		}
		$("#"+vm.map.map.id+"_layers").append(_set);
		var fontSizewWidth = $("#" + divId).width();
		var fontSizewheight = $("#" + divId).height();
		var divleft = '';
		var divtop = '';
		if(divtype=="tips"){
			divleft = screenPoint.x -(fontSizewWidth/2) + "px";
			divtop = screenPoint.y -25-fontSizewheight + "px";
		}else{
			divleft = screenPoint.x - (fontSizewWidth/2) + "px";
			divtop = screenPoint.y - (fontSizewheight/2) + "px";
		}
		$("#" + divId)[0].style.left = divleft;
		$("#" + divId)[0].style.top = divtop;
		$("#" + divId).attr('divtype','ssjl');
		if(showdivclass){
			$("." + layerid).show();
		}else{
			$("." + layerid).hide();
		}
	},
	addYbssLabelDiv(data,layerid,vm,divtype){
		var lon = data.xpos;
		var lat = data.ypos;
		var markid = data.id;
		if(!vm.map.divlayeridmap.hasOwnProperty(layerid)){
			vm.map.divlayeridmap[layerid]= true;
		}
		var divId = markid;
		var mapPoint = new esri.geometry.Point(lon, lat,vm.map.map.spatialReference);
		if(vm.map.fromLayerInfo.xml.layerType=="realmap"){
			var mapPoint = mapUtil.pointToPoint25(vm.map.fromLayerInfo,lon,lat);
			mapPoint.spatialReference = vm.map.map.spatialReference;
		}
		if(vm.map.fromLayerInfo.xml.layerType=="gaode"){
			var mapPoint = mapUtil.ELatLng2EPoint(vm.map.fromLayerInfo,lon,lat);
			mapPoint.spatialReference = vm.map.map.spatialReference;
		}
		var screenPoint = vm.map.map.toScreen(mapPoint);//地图坐标转屏幕坐标
		var _set = '<div onselectstart="return false" id="'+divId+'" class="ybss_tips '+layerid+' ssjlLayer"   offsetx="'+0+'" offsety="'+5+'" lon="'+lon+'" lat="'+lat+'">'+ (data.lz?data.lz:data.mph) +'</div>';
		if($("#" + divId).length>0){
			$("#" + divId).remove();
		}
		$("#"+vm.map.map.id+"_layers").append(_set);
		var fontSizewWidth = $("#" + divId).width();
		var fontSizewheight = $("#" + divId).height();
		var divleft = '';
		var divtop = '';
		if(divtype=="tips"){
			divleft = screenPoint.x -(fontSizewWidth/2) + "px";
			divtop = screenPoint.y -20-fontSizewheight + "px";
		}else{
			divleft = screenPoint.x - (fontSizewWidth/2) + "px";
			divtop = screenPoint.y - (fontSizewheight/2) + "px";
		}
		$("#" + divId).attr('divtype','ybss');
		$("#" + divId)[0].style.left = divleft;
		$("#" + divId)[0].style.top = divtop;
	},
	addMapLabelDiv(data,layerid,vm,divtype){
		var lon = data.loc.x;
		var lat = data.loc.y;
		var markid = data.id;
		var showdivclass = false;
		if(!vm.map.divlayeridmap.hasOwnProperty(layerid)){
			vm.map.divlayeridmap[layerid]=vm.showCicle;
			showdivclass = vm.showCicle;
		}else{
			showdivclass = vm.map.divlayeridmap[layerid];
		}
		var divId = markid;
		var mapPoint = new esri.geometry.Point(lon, lat,vm.map.map.spatialReference);
		if(vm.map.fromLayerInfo.xml.layerType=="realmap"){
			var mapPoint = mapUtil.pointToPoint25(vm.map.fromLayerInfo,lon,lat);
			mapPoint.spatialReference = vm.map.map.spatialReference;
		}
		if(vm.map.fromLayerInfo.xml.layerType=="gaode"){
			var mapPoint = mapUtil.ELatLng2EPoint(vm.map.fromLayerInfo,lon,lat);
			mapPoint.spatialReference = vm.map.map.spatialReference;
		}
		var screenPoint = vm.map.map.toScreen(mapPoint);//地图坐标转屏幕坐标
		// var style = "position:absolute;width:50px;height:50px;display:none;background:rgb(241 92 92);color:white;font-size:12px;font-family:宋体;border-radius:3px;word-wrap:break-word;line-height:138%;opacity:0.7;text-align:left;overflow: hidden;-webkit-line-clamp:1; -webkit-box-orient: vertical;padding:1px 3px;";
		var _set = '<div onselectstart="return false" id="'+divId+'" class="pointcss '+layerid+'"  offsetx="'+0+'" offsety="'+0+'" lon="'+lon+'" lat="'+lat+'"></div>';
		if($("#" + divId).length>0){
			$("#" + divId).remove();
		}
		$("#"+vm.map.map.id+"_layers").append(_set);
		var fontSizewWidth = $("#" + divId).width();
		var fontSizewheight = $("#" + divId).height();
		if(divtype=="tips"){
			$("#" + divId)[0].style.left = screenPoint.x -(fontSizewWidth/2) + "px";
			$("#" + divId)[0].style.top = screenPoint.y -10-fontSizewheight + "px";
		}else{
			$("#" + divId)[0].style.left = screenPoint.x - (fontSizewWidth/2) + "px";
			$("#" + divId)[0].style.top = screenPoint.y - (fontSizewheight/2) + "px";
		}
		if(showdivclass){
			$("#" + divId).show();
		}else{
			$("#" + divId).hide();
		}
	},
	addMapPplygonLabelDiv(lon,lat,layerid,attr,vm){
		if(!attr.showname){
			return;
		}
		if(!vm.map.divlayeridmap.hasOwnProperty(layerid)){
			vm.map.divlayeridmap[layerid] = true;
		}
		if(attr.id){
			var divId = layerid+"-"+attr.id;
		}else{
			var divId = layerid;
		}
		var mapPoint = new esri.geometry.Point(lon, lat,vm.map.map.spatialReference);
		if(vm.map.fromLayerInfo.xml.layerType=="realmap"){
			var mapPoint = mapUtil.pointToPoint25(vm.map.fromLayerInfo,lon,lat);
			mapPoint.spatialReference = vm.map.map.spatialReference;
		}
		if(vm.map.fromLayerInfo.xml.layerType=="gaode"){
			var mapPoint = mapUtil.ELatLng2EPoint(vm.map.fromLayerInfo,lon,lat);
			mapPoint.spatialReference = vm.map.map.spatialReference;
		}
		var screenPoint = vm.map.map.toScreen(mapPoint);//地图坐标转屏幕坐标
		var style = "position:absolute;display:none;background:rgb(241 92 92);color:white;font-size:12px;font-family:宋体;border-radius:3px;word-wrap:break-word;line-height:138%;opacity:0.7;text-align:left;overflow: hidden;-webkit-line-clamp:1; -webkit-box-orient: vertical;padding:1px 3px;";
		var _set = '<div onselectstart="return false" id="'+divId+'" class="'+ layerid +'" style="'+ style +'" title="'+attr.showname+'" offsetx="'+0+'" offsety="'+20+'" lon="'+lon+'" lat="'+lat+'">'+ (attr.showname.length>50?attr.showname.substring(0,50):attr.showname) +'</div>';
		if($("#" + divId).length>0){
			$("#" + divId).remove();
		}
		$("#"+vm.map.map.id+"_layers").append(_set);
		var fontSizewWidth = $("#" + divId).width();
		var fontSizewheight = $("#" + divId).height();
		$("#" + divId)[0].style.left = screenPoint.x -(fontSizewWidth/2+4) + "px";
		$("#" + divId)[0].style.top = screenPoint.y -20-fontSizewheight+50 + "px";
		
		if(!vm.map.divlayeridmap.hasOwnProperty(layerid)||vm.map.divlayeridmap[layerid]==true){
			$("#" + divId).show();
		}else{
			$("#" + divId).hide();
		}
	},
	reflashMapLabel(evt,vm){//刷新地图上div
		var mapObj = vm.map;
		for(var layerId in mapObj.divlayeridmap){
		  for (var i = 0; i < $("." + layerId).length; i++) {
			var divObj = $("." + layerId)[i];
			var lon = eval(divObj.attributes.lon.value);
			var lat = eval(divObj.attributes.lat.value);
			var mapPoint = new esri.geometry.Point(lon, lat,mapObj.map.spatialReference);
			if(vm.map.fromLayerInfo.xml.layerType=="realmap"){
				var mapPoint = mapUtil.pointToPoint25(vm.map.fromLayerInfo,lon,lat);
				mapPoint.spatialReference = vm.map.map.spatialReference;
			}
			if(vm.map.fromLayerInfo.xml.layerType=="gaode"){
				var mapPoint = mapUtil.ELatLng2EPoint(vm.map.fromLayerInfo,lon,lat);
				mapPoint.spatialReference = vm.map.map.spatialReference;
			}
			var screenPoint = mapObj.map.toScreen(mapPoint);//地图坐标转屏幕坐标
			var offset = {
				x: eval(divObj.attributes.offsetx.value),
				y: eval(divObj.attributes.offsety.value)
			};
			var fontSizewWidth = $(divObj).width();
			var fontSizewheight = $(divObj).height();
			var toppx = 35;
			if(evt==null){
				divObj.style.left = screenPoint.x + offset.x - (fontSizewWidth/2) + "px";
				divObj.style.top = screenPoint.y + offset.y-toppx-(fontSizewheight/2) + "px";
			}else{
				divObj.style.left = screenPoint.x + offset.x - (fontSizewWidth/2) + evt.delta.x + "px";
				divObj.style.top = screenPoint.y + offset.y-toppx-(fontSizewheight/2) + evt.delta.y + "px";
			}
			
		  }
		}
	},
	hideMapLabel(vm){
	  for(var layerId in vm.map.divlayeridmap){
		$("." + layerId).hide();
	  }
	},
	showMapLabel(vm){
	  for(var layerId in vm.map.divlayeridmap){
		  if(vm.map.divlayeridmap[layerId]){
			  $("." + layerId).show();
		  }
	  }
	},
	showOrHideMapLabel(flag,layerid,vm){
		vm.map.divlayeridmap[layerid] = flag;
		if(flag){
            $("." + layerid).show();
		}else{
			$("." + layerid).hide();
		}
	},
	addTempMark(lx,ly,layerid,markid,icon,vm){
		var map = vm.map.map;
		var fromLayerInfo = vm.map.fromLayerInfo;
		var layer = map.getLayer(layerid);
		if(layer==undefined||layer==null){
			layer = this.createLayer(layerid,vm);
		}
		lx = parseFloat(lx);
		ly = parseFloat(ly);
		var size_x = 22;
		var size_y = 23;
		var point;
		if(fromLayerInfo.xml.layerType == "realmap"){
			point = mapUtil.pointToPoint25(fromLayerInfo,lx,ly);
		}else if(fromLayerInfo.xml.layerType == "gaode"){
			point = mapUtil.ELatLng2EPoint(fromLayerInfo,lx,ly);      
		}else{
			point = new esri.geometry.Point(lx, ly);
		}
		var markinfo = {id:markid};
		point.spatialReference = map.spatialReference;
		var symbol_pic = new esri.symbol.PictureMarkerSymbol(icon, parseFloat(size_x), parseFloat(size_y));
		if(this.mapHasMark(layerid,markid,vm)){
			//存在点重新打点
			var pointGraphic = this.mapGetGraphic(layerid,markid,vm);
			pointGraphic.setGeometry(point);
			pointGraphic.setSymbol(symbol_pic);
		}else{
			//不存在点则打点
			var pointGraphic = new esri.Graphic(point, symbol_pic,markinfo,null);
			layer.add(pointGraphic);   
		}
	},
	addLinePart(point,layerid,markid,vm){
		var map = vm.map.map;
		var fromLayerInfo = vm.map.fromLayerInfo;
		var layer = map.getLayer(layerid);
		if(layer==undefined||layer==null){
			layer = this.createLayer(layerid,vm);
		}
		if(markid==null){
			return;
		}
		if(vm.map.markidmap[layerid]&&vm.map.markidmap[layerid][markid]){
			var tempGraphic = vm.map.markidmap[layerid][markid];
			var arr = new Array();
			for(var i=0; i<tempGraphic.geometry.paths[0].length;i++){
				var newpoint  = new esri.geometry.Point(tempGraphic.geometry.paths[0][i][0], tempGraphic.geometry.paths[0][i][1]);
				arr[i] = newpoint;
			}
            if(fromLayerInfo.xml.layerType == "realmap"){
                point = mapUtil.pointToPoint25(fromLayerInfo,point.x,point.y);
            }else if(fromLayerInfo.xml.layerType == "gaode"){
                point = mapUtil.ELatLng2EPoint(fromLayerInfo,point.x,point.y);   
            }
			arr.push(point);
			var templine = new esri.geometry.Polyline(map.spatialReference);
			templine.addPath(arr);
			tempGraphic.setGeometry(templine);
		}else{
			if(!vm.map.markidmap[layerid]){
				vm.map.markidmap[layerid] = {};
			}
			var mapPoints = [];
			mapPoints[0]=point;
			var templine = new esri.geometry.Polyline(map.spatialReference);
			templine.addPath(mapPoints);
            if(fromLayerInfo.xml.layerType=="realmap"){
                templine=mapUtil.polylineToPolyline25(fromLayerInfo,templine);
            }else if(fromLayerInfo.xml.layerType=="gaode"){
                templine=mapUtil.polylineToPolylineGaode(fromLayerInfo,templine);     
			}
			//线样式
			var lineSymbol = new esri.symbol.SimpleLineSymbol(
		 			esri.symbol.SimpleLineSymbol.STYLE_SHORTDASH, new dojo.Color([255,0,0,0.55]), 3);
			var tempGraphic = new esri.Graphic(templine, lineSymbol,null,null);
			vm.map.markidmap[layerid][markid] = tempGraphic;
			layer.add(tempGraphic);
		}
	},
	addPolygonMark(layerid,markobj,vm) {
		var that = this;
		esriLoader.loadModules([
			"esri/symbols/PictureMarkerSymbol",
			"esri/InfoTemplate",
			"esri/toolbars/draw",
			"esri/graphic",
			"esri/symbols/SimpleMarkerSymbol",
			"esri/symbols/SimpleLineSymbol",
			"esri/symbols/SimpleFillSymbol",
			"dojo/colors",
			"esri/symbols/Font",
			"esri/symbols/TextSymbol",
			"dojo/parser" 
		], {url:Constants.map_base_url}).then(([PictureMarkerSymbol,InfoTemplate,Draw, 
			Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color, Font,TextSymbol,parser]) => {
				var map = vm.map.map;
				var markidmap = vm.map.markidmap;
				var fromLayerInfo = vm.map.fromLayerInfo;			
				var cLayer = map.getLayer(layerid);
				if(cLayer == "undefined" || cLayer == null){
					cLayer = that.createLayerUseIndex(layerid,0,vm);
					mapEvent.registerLayerEvent(layerid,cLayer,vm);
				}
				var markid = markobj.markid;
				if(!markobj.locinfo){
					return;
				}
				var polygoncolor = markobj.polygoncolor;
				if(polygoncolor==null){
					polygoncolor = "rgb(0,0,0,0.5)";
				}
				var linecolor = markobj.linecolor;
				if(linecolor==null){
					linecolor = "rgb(0,0,0)";
				}
				var linesymbol = new esri.symbol.SimpleLineSymbol(
							esri.symbol.SimpleLineSymbol.STYLE_SOLID, dojo.colorFromRgb(linecolor), 1);
				var fillsymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
						linesymbol, dojo.colorFromRgb(polygoncolor));
				var locinfo = JSON.parse(markobj.locinfo);
				var points = locinfo.points;
				var mian = new esri.geometry.Polygon(map.spatialReference);
				mian.rings[0] = points;
				if(fromLayerInfo.xml.layerType == "realmap"){
					mian = mapUtil.polygonToPolygon25(fromLayerInfo,mian);
				}else if(fromLayerInfo.xml.layerType == "gaode"){
					mian = mapUtil.polygonToPolygonGaode(fromLayerInfo,mian);
				}
				var graphic = new esri.Graphic(mian, fillsymbol, markobj);
				if(markidmap[layerid]){
					if(markidmap[layerid][markid]){
						//存在点重新打点
						var pointGraphic = markidmap[layerid][markid];
						pointGraphic.setGeometry(graphic.geometry);
						pointGraphic.setSymbol(graphic.symbol);
					}else{
						markidmap[layerid][markid] = graphic;
						cLayer.add(graphic);
					}
				}else{
					markidmap[layerid] = {};
					markidmap[layerid][markid] = graphic;
					cLayer.add(graphic);
				}
				var point = mapUtil.getPolygonCenterPoint(graphic.geometry,vm);
				var showObj = {};
                showObj.showname = markobj.markname;
				that.addMapPplygonLabelDiv(point.x,point.y,layerid+markid,showObj,vm);
			}).catch (err => {})
	},
	mapHasMark(layerid,markid,vm){
		var map = vm.map.map;
		var layer = map.getLayer(layerid);
		if(layer){
			for(var j = 0;j<layer.graphics.length;j++){
				var attr = layer.graphics[j].attributes;
				if(attr&&attr.id){
					if(attr.id==markid){
						return true;
					}
				}
			}
		}
		return false;
	},
	mapGetGraphic(layerid,markid,vm){
		var map = vm.map.map;
		var layer = map.getLayer(layerid);
		if(layer){
			for(var j = 0;j<layer.graphics.length;j++){
				var attr = layer.graphics[j].attributes;
				if(attr&&attr.id){
					if(attr.id==markid){
						return layer.graphics[j];
					}
				}
			}
		}
		return null;
	},
	clearLayer(layerid,vm){
		try{
			var layer = vm.map.map.getLayer(layerid);
			if(layer){//存在则清空
				//markidmap 中清空
				if(vm.map.markidmap[layerid]){
					if(layerid=='xq_layer'||layerid=='wg_layer'||layerid=='ssjqLayer'||layerid=='ssjlLayer'||layerid=='xlfq_layer'||
					   layerid=='xlwg_layer'||layerid=='ybss_layer'||layerid=='rxyjLayer'||layerid=='ybssLayer'||layerid=='wstLayer'){
						var list = vm.map.markidmap[layerid];
						for(let markid in list){
							$("."+layerid+markid).remove();
						}
						$("."+layerid).remove();
					}
					delete vm.map.markidmap[layerid];
				}
				layer.clear();
			}
		}catch(e){}
	},
	hideLayer(layerid,vm){
		var layer = vm.map.map.getLayer(layerid);
		if(layer){
			layer.hide();
			this.showOrHideMapLabel(false,layerid,vm);
		}
	},
	showLayer(layerid,vm){
		var layer = vm.map.map.getLayer(layerid);
		if(layer){//存在则显示
			layer.show();
			this.showOrHideMapLabel(true,layerid,vm);
		}
	},
	showClusterInfoWindow(clusterData,type){
		if(type==undefined||type==""){
			return;
		}
		var width = 300;
		var height = 300;
		if(type=="ssjq"){
			width = 315;
			height = 370;
			var Profile = Vue.extend({
				template: '<div><JingQingDetailMap jqid="'+clusterData.id+'" @handler="JingQingDetailHandler"/></div>',
				components: {JingQingDetailMap},
				data: function () {
				  return {
				  }
				},
				methods:{
				  JingQingDetailHandler(data,state){
					  if(callback){
						  callback(data,state);
					  }
				  },
				  prePage(){

				  },
				  nextPage(){

				  }
				}
			})
			clusterData.cp = new Profile();
		}else if(type=="ssjl"){
			var users =  clusterData.attributes.users;
			if(users == 0){
				width = 315;
				height = 300;
			}else if(users == 1){
				width = 315;
				height = 410;
			}else{
				width = 315;
				height = 410;
			}
			var Profile = Vue.extend({
				template: '<JingLiDetailMap jlid="'+clusterData.id+'"/>',
				components: {JingLiDetailMap},
				data: function () {
				  return {
				  }
				}
			})
			clusterData.cp = new Profile();
		}else if(type=="spjk"){
			width = 315;
			height = 180;
		}else if(type=="lgxx"){
			width = 340;
			height = 300;
		}else if(type=="wbxx"){
			width = 340;
			height = 200;
		}else if(type=="dzsp"){
			width = 360;
			height = 256;
		}else if(type=="dzkk"){
			width = 300;
			height = 120;
		}else if(type=="xqgl"){
			width = 300;
			height = 120;
		}else if(type=="dztc"){
			width = 400;
			height = 280;
		}else if(type=="fkq"){
			width = 306;
			height = 310;
		}else if(type=="qygl"){
			width = 300;
			height = 120;
		}else if(type=="dkkd"){
			width = 310;
			height = 310;
		}else if(type=="bkyj"){
			width = 340;
			height = 280;
		}else if(type=="fkqtc"){
			width = 300;
			height = 120;
		}
		clusterData.width = width;
		clusterData.height = height;
		return clusterData;
	},
	showInfoWindow(graphic,isClick,vm){
		var markinfo  = graphic.attributes;
		var type = markinfo.type;
		if(type==undefined||type==""){
			return;
		}
		var width = 300;
		var height = 300;
		if(type=="ssjq"){
			width = 315;
			//height = 359+10;//两排按钮,10为3行报警内容多出来的高
			height = 370;
		}else if(type=="ssjl"){
			var users =  markinfo.users;
			if(users == 0){
				width = 315;
				height = 300;
			}else if(users == 1){
				width = 315;
				height = 410;
			}else{
				width = 315;
				height = 410;
			}
		}else if(type=="spjk"){
			width = 315;
			height = 180;
		}else if(type=="lgxx"){
			width = 340;
			height = 300;
		}else if(type=="wbxx"){
			width = 340;
			height = 200;
		}else if(type=="dzsp"){
			width = 360;
			height = 256;
		}else if(type=="dzsp_user"){
			var users =  markinfo.users;
			if(users == 0){
				width = 305;
				height = 290;
			}else if(users == 1){
				width = 305;
				height = 410;
			}else{
				width = 305;
				height = 456;
			}
		}else if(type=="dzkk"){
			width = 300;
			height = 120;
		}else if(type=="xqgl"){
			width = 300;
			height = 120;
		}else if(type=="dztc"){
			width = 400;
			height = 280;
		}else if(type=="fkq"){
			width = 306;
			height = 310;
		}else if(type=="qygl"){
			width = 300;
			height = 120;
		}else if(type=="dkkd"){
			width = 310;
			height = 310;
		}else if(type=="bkyj"){
			width = 340;
			height = 280;
		}else if(type=="fkqtc"){
			width = 300;
			height = 120;
		}else if(type=="syry"){
			width = 300;
			height = 280;
		}
		this.setInfoWinowWidthAndHeight(width,height,vm);
		//var markid = markinfo.id;
		if(markinfo.cp){
			if (isClick) {//marker单击事件出发
				var varcomponent= markinfo.cp.$mount();
				var infoTemplate = new esri.InfoTemplate("", varcomponent.$el);
				graphic.setInfoTemplate(infoTemplate);
			}else{
				var varcomponent= markinfo.cp.$mount();
				vm.map.map.infoWindow.setTitle("");
				vm.map.map.infoWindow.setContent(varcomponent.$el);
				if(graphic.geometry.type=="point"){
					vm.map.map.infoWindow.show(vm.map.map.toScreen(graphic.geometry));
				}else{
					var point = graphic.geometry.getExtent().getCenter();
					vm.map.map.infoWindow.show(vm.map.map.toScreen(point));	
				}
			}
			vm.map.map.infoWindow.resize(width, height + 10);
		}
	},
	setInfoWinowWidthAndHeight(width,height,vm) {
		vm.map.map.infoWindow.domNode.childNodes[0].childNodes[0].style.width=width + "px";
		vm.map.map.infoWindow.domNode.childNodes[0].childNodes[1].style.width=width + "px";
		vm.map.map.infoWindow.domNode.childNodes[0].childNodes[1].style.height = eval(height) + "px";
		vm.map.map.infoWindow.domNode.childNodes[0].childNodes[1].childNodes[0].style.height = eval(height) + "px";
	},
	centerAndShow(layerid,markid,vm) {
		vm.map.map.infoWindow.hide();
		if(vm.map.markidmap[layerid]){
			if(vm.map.markidmap[layerid][markid]){
				var graphic = vm.map.markidmap[layerid][markid];
				setTimeout(function(){
					if(graphic.geometry.type=="point"){
                        vm.map.map.centerAt(graphic.geometry);
                    }else{
                        var point = graphic.geometry.getExtent().getCenter();
                        vm.map.map.centerAt(point);
                    }	
				}, 200);
				this.showInfoWindow(graphic,false,vm);
			}
		}
	},
	reLocate(lx,ly,funcallback,args,vm){
		var map = vm.map.map;
		var fromLayerInfo = vm.map.fromLayerInfo;
		map.infoWindow.hide();
		if(lx==null||ly==null||lx==""||ly==""||lx=="0"||ly=="0"){
			var xmin = map.extent.xmin;
			var xmax = map.extent.xmax;
			var ymin = map.extent.ymin;
			var ymax = map.extent.ymax;
			lx=(xmin+xmax)/2;
			ly=(ymin+ymax)/2;
		}else{
			if(fromLayerInfo.xml.layerType=="realmap"){
				var ppoint = mapUtil.pointToPoint25(fromLayerInfo,lx,ly);
				lx=ppoint.x;
				ly=ppoint.y;
			}
			if(fromLayerInfo.xml.layerType=="gaode"){
				var ppoint = mapUtil.ELatLng2EPoint(fromLayerInfo,lx,ly);
				lx=ppoint.x;
				ly=ppoint.y;
			}
		}
		var layer = this.createLayer("locateLayer",vm);
		layer.clear();
		var point = new esri.geometry.Point(lx,ly,map.spatialReference);
		
		var symbol_pic = new esri.symbol.PictureMarkerSymbol(require("@/assets/map/location.png"), parseFloat(30), parseFloat(30));
		var pointGraphic = new esri.Graphic(point, symbol_pic,{edittype:"location"},null);
		layer.add(pointGraphic);
		var textSymbol1 = new esri.symbol.TextSymbol("保存",new esri.symbol.Font(),new dojo.Color([255,255,255]));
		textSymbol1.setOffset(25,20);
		var textSymbol2 = new esri.symbol.TextSymbol("取消",new esri.symbol.Font(),new dojo.Color([255,255,255]));
		textSymbol2.setOffset(53,20);
		
		var divsymbol1 = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 25,
				   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, 
				   new dojo.Color([0,0,0]), 1),
				   new dojo.Color([0,0,0,0.75]));
		divsymbol1.setOffset(25,25);
		var divsymbol2 = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 25,
				   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, 
				   new dojo.Color([0,0,0]), 1),
				   new dojo.Color([0,0,0,0.75]));
		divsymbol2.setOffset(52,25);
		var textGraphic1 = new esri.Graphic(point, textSymbol1,{edittype:"baocun"},null);
		var textGraphic2 = new esri.Graphic(point, textSymbol2,{edittype:"quxiao"},null);
		var divGraphic1 = new esri.Graphic(point, divsymbol1,{edittype:"baocun"},null);
		var divGraphic2 = new esri.Graphic(point, divsymbol2,{edittype:"quxiao"},null);
		layer.add(divGraphic1);
		layer.add(divGraphic2);
		layer.add(textGraphic1);
		layer.add(textGraphic2);
		var map_click_event = map.on("click",function(evt){
			pointGraphic.setGeometry(evt.mapPoint);
			textGraphic1.setGeometry(evt.mapPoint);
			textGraphic2.setGeometry(evt.mapPoint);
			divGraphic1.setGeometry(evt.mapPoint);
			divGraphic2.setGeometry(evt.mapPoint);
		});
		
		var layer_click_event = layer.on("click",function(evt){
			var g = evt.graphic;
			var attr = g.attributes;
			if(attr==null){
				return;
			}
			if(attr.edittype){
				map_click_event.remove();
				if(attr.edittype=="baocun"){
					if(funcallback){
						var locationLayer = map.getLayer("locateLayer");
						if(locationLayer){
							var tempgraphic;
							for(var i=0;i<locationLayer.graphics.length;i++){
								var edittype = locationLayer.graphics[i].attributes.edittype;
								if(edittype=="location"){
									tempgraphic=locationLayer.graphics[i];
									break;
								}
							}
							if(tempgraphic){
								if(fromLayerInfo.xml.layerType=="realmap"){
									var p = mapUtil.point25ToPoint(fromLayerInfo,tempgraphic.geometry.x,tempgraphic.geometry.y);
									funcallback(p,args);
								}else if(fromLayerInfo.xml.layerType=="gaode"){
									var p = mapUtil.EPoint2ELatLng(fromLayerInfo,tempgraphic.geometry.x,tempgraphic.geometry.y);
									funcallback(p,args);     
								}else{
									funcallback(tempgraphic.geometry,args);
								}
							}
						}
					}
				}
				layer.clear();
				layer_click_event.remove();
			}
		});
	},
	createLayer(layerid,vm){
		var layeridmap = vm.map.layeridmap;
		var map = vm.map.map;
		var layer;
		if(layeridmap[layerid]){
			//存在则从map中获取
			layer = layeridmap[layerid];
		}else{
			//不存在则新建
			layer = new esri.layers.GraphicsLayer({id:layerid});
			layeridmap[layerid] = layer;
			map.addLayer(layer);
		}
		return layer;
	},
	createLayerUseIndex(layerid,index,vm){
		var layeridmap = vm.map.layeridmap;
		var map = vm.map.map;
		var layer;
		if(layeridmap[layerid]){
			//存在则从map中获取
			layer = layeridmap[layerid];
		}else{
			//不存在则新建
			layer = new esri.layers.GraphicsLayer({id:layerid});
			layeridmap[layerid] = layer;
			map.addLayer(layer,index);
		}
		return layer;
	},
	clearAll(vm){
		var map = vm.map.map;
		for (var i = 0;i< map.graphicsLayerIds.length;i++){
			var layerid = map.graphicsLayerIds[i];
			this.clearLayer(layerid,vm);
		}
		this.clearLayer("hfxmap_graphics",vm);
		map.infoWindow.hide();
		this.clearDrawLayer(vm);
		$(".buffer-tools").hide();
	},
	moveMap(x,y,vm) {
		if(x==null||x==undefined||x==""||x==0){
			return;
		}
		var fromLayerInfo = vm.map.fromLayerInfo;
		var map = vm.map.map;
		var mapPoint;
		if(fromLayerInfo.xml.layerType=="realmap"){
			mapPoint=mapUtil.pointToPoint25(fromLayerInfo,x,y);
		}else if(fromLayerInfo.xml.layerType=="gaode"){
            mapPoint=mapUtil.ELatLng2EPoint(fromLayerInfo,x,y);     
        }else{
			mapPoint = new esri.geometry.Point(x, y,map.spatialReference);
		}
		map.centerAt(mapPoint);
	},
	moveMapAndLevel(x,y,z,vm) {
		if(x==null||x==undefined||x==""||x==0){
			return;
		}
		var fromLayerInfo = vm.map.fromLayerInfo;
		var map = vm.map.map;
		var mapPoint;
		if(fromLayerInfo.xml.layerType=="realmap"){
			mapPoint=mapUtil.pointToPoint25(fromLayerInfo,x,y);
		}else if(fromLayerInfo.xml.layerType=="gaode"){
			if(z>18){
				z=18;
			}
			if(z<7){
              z=7;
			}
            mapPoint=mapUtil.ELatLng2EPoint(fromLayerInfo,x,y);     
        }else{
			z = z+4;
			if(z>20){
				z=20;
			}
			if(z<10){
				z=10;
			}
			mapPoint = new esri.geometry.Point(x, y,map.spatialReference);
		}
		map.centerAndZoom(mapPoint, z);
	},
	measure(type,vm){
		var that = this;
		esriLoader.loadModules([
			"esri/dijit/Measurement",
			"esri/geometry/geodesicUtils",
			"esri/geometry/Point",
			"esri/units"
		], {url:Constants.map_base_url}).then(([Measurement, 
			geodesicUtils,
			Point, 
			units]) => {
			var measurement = vm.map.measurement;
			var measureEnd = vm.map.measureEnd;
			var measureStart = vm.map.measureStart;
			var measureMove = vm.map.measureMove;
			var map = vm.map.map;
			var fromLayerInfo = vm.map.fromLayerInfo;
			map.infoWindow.hide();
			if (measurement){//右键取消距离|面积量算
				measurement.clearResult();
				switch(measurement.activeTool){
					case "distance":
						measurement.setTool("distance", false);//取消距离量算
						measureEnd.remove();
						measureEnd = null;
						measureStart.remove();
						measureStart = null;
						measureMove.remove();
						measureMove = null;
						break;
					case "area":
						measurement.setTool("area", false);//取消面积量算
						measureEnd.remove();
						measureEnd = null;
						measureStart.remove();
						measureStart = null;
						measureMove.remove();
						measureMove = null;
						break;
					default:
						break;
				}
				measurement.destroy();
				measurement = null;
			}
			that.showLayer("hfxmap_graphics",vm);//编辑图层显示
			//节点样式
			var pointSymbol = new esri.symbol.PictureMarkerSymbol(require("@/assets/map/measure.png"), 10, 10);
			//线样式
			var lineSymbol = new esri.symbol.SimpleLineSymbol(
				esri.symbol.SimpleLineSymbol.STYLE_SHORTDASH, new dojo.Color([0,0,255,0.55]), 3);
			//填充样式
			var fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
				lineSymbol, new dojo.Color([98,194,204,0.5]));
			//如果结束事件存在就移除该事件
			if(measureEnd){
				measureEnd.remove();
			}
			if(measureStart){
				measureStart.remove();
			}
			if(measureMove){
				measureMove.remove();
			}
			measurement = new esri.dijit.Measurement({
				map: map,
				pointSymbol: pointSymbol,
				lineSymbol: lineSymbol,
				fillSymbol: fillSymbol,
				defaultLengthUnit: units.METERS,
				defaultAreaUnit: units.SQUARE_METERS
			});
			vm.map.measurement = measurement;
			measurement.startup();
			measurement.setTool(type, true);
			measureStart=measurement.on("measure-start", function(evt){
				map.infoWindow.hide();
			});
			vm.map.measureStart = measureStart;
			measureMove=measurement.on("measure", function(evt){
				if(type=="distance"){
					that.setInfoWinowWidthAndHeight(220,30,vm);
					map.infoWindow.setTitle("距离测量");
					map.infoWindow.setContent("长度 ： " + evt.values.toFixed(3) + "米");
					map.infoWindow.show(evt.geometry);
				}else if(type=="area"){
					that.setInfoWinowWidthAndHeight(220,30,vm);
					map.infoWindow.setTitle("面积测量");
					map.infoWindow.setContent("面积 ： " + (Math.abs(evt.values)).toFixed(3) + "平方米");
					var points = evt.geometry.rings[0];
					var CurX = points[points.length-1][0];
					var CurY = points[points.length-1][1];
					var CurPos = new esri.geometry.Point(CurX,CurY, map.spatialReference);
					map.infoWindow.show(CurPos);
				}
			});
			vm.map.measureMove = measureMove;
			measureEnd = measurement.on("measure-end", function(evt){
				var geometry = evt.geometry;
				switch(geometry.type){
				case "polyline":
					var points = geometry.paths[0];
					var length = 0;
					if(fromLayerInfo.xml.layerType=="realmap"){
						var polyline25 = mapUtil.polyline25ToPolyline(fromLayerInfo,geometry);
						length = geodesicUtils.geodesicLengths([polyline25],units.METERS)[0];
					}else if(fromLayerInfo.xml.layerType=="gaode"){
						var polyline25 = mapUtil.polylineGaodeToPolyline(fromLayerInfo,geometry);
						length = geodesicUtils.geodesicLengths([polyline25],units.METERS)[0];     
					}else{
						length = geodesicUtils.geodesicLengths([geometry],units.METERS)[0];
					}
					var CurX = points[points.length-1][0];
					var CurY = points[points.length-1][1];
					var CurPos = new esri.geometry.Point(CurX, CurY, map.spatialReference);
					that.setInfoWinowWidthAndHeight(220,30,vm);
					map.infoWindow.setTitle("距离测量");
					map.infoWindow.setContent("长度 ： " + length.toFixed(3) + "米");
					map.infoWindow.show(CurPos);
					break;
				case "polygon":
					var points = geometry.rings[0];
					var area = 0;
					if(fromLayerInfo.xml.layerType=="realmap"){
						var polygon25 = mapUtil.polygon25ToPolygon(fromLayerInfo,geometry);
						area = geodesicUtils.geodesicAreas([polygon25],units.SQUARE_METERS)[0];
					}else if(fromLayerInfo.xml.layerType=="gaode"){
						var polygon25 = mapUtil.polygonGaodeToPolygon(fromLayerInfo,geometry);
						area = geodesicUtils.geodesicAreas([polygon25],units.SQUARE_METERS)[0];    
					}else{
						area = geodesicUtils.geodesicAreas([geometry],units.SQUARE_METERS)[0];
					}
					var CurX = points[points.length-2][0];
					var CurY = points[points.length-2][1];
					var CurPos = new esri.geometry.Point(CurX, CurY, map.spatialReference);
					that.setInfoWinowWidthAndHeight(220,30,vm);
					map.infoWindow.setTitle("面积测量");
					map.infoWindow.setContent("面积 ： " + (Math.abs(area)).toFixed(3) + "平方米");
					map.infoWindow.show(CurPos);
					break;
				default:
					break;
				}
			});
			vm.map.measureEnd = measureEnd;
		}).catch (err => {})
	},
	clearDrawLayer(vm){
		var measurement = vm.map.measurement;
		var measureEnd = vm.map.measureEnd;
		var measureStart = vm.map.measureStart;
		var measureMove = vm.map.measureMove;
		var map = vm.map.map;
		//隐藏窗体
		map.infoWindow.hide();
		//取消测量
		if (measurement){//右键取消距离|面积量算
			measurement.clearResult();
			switch(measurement.activeTool){
			case "distance":
				measurement.setTool("distance", false);//取消距离量算
				measureEnd.remove();
				measureEnd = null;
				measureStart.remove();
				measureStart = null;
				measureMove.remove();
				measureMove = null;
				break;
			case "area":
				measurement.setTool("area", false);//取消面积量算
				measureEnd.remove();
				measureEnd = null;
				measureMove.remove();
				measureMove = null;
				break;
			default:
				break;
			}
			measurement.destroy();
			measurement = null;
			vm.map.measurement = null;
			vm.map.measureEnd = null;
			vm.map.measureStart = null;
			vm.map.measureMove = null;
		}
		//去掉画面的
		this.clearLayer("hfxmap_graphics",vm);
		//去掉临时的
		this.clearLayer("tempLayer",vm);
		//去掉Draw和Edit
		vm.map.toolbar.deactivate();
		vm.map.editToolbar.deactivate();

		//去掉框选圈选
		this.clearLayer("drawLayer",vm);
		this.clearLayer("bufferShowLayer",vm);//去掉标签图层
		this.clearLayer("bufferShowDetailLayer",vm);//去掉标签图层
		this.clearMapDrawLayer(vm);//清空画图图层


		this.showYewuLayer(vm);//显示业务图层	
	},
	clearMapDrawLayer(vm){
		var map = vm.map.map;
		//去掉框选圈选的
		this.clearLayer("drawssjqLayer",vm);
		this.clearLayer("drawssjlLayer",vm);
		this.clearLayer("drawspjkLayer",vm);
		this.clearLayer("drawdzkkLayer",vm);
		this.clearLayer("drawlgxxLayer",vm);
		this.clearLayer("drawwbxxLayer",vm);
		this.clearLayer("drawrlsbLayer",vm);
		this.clearLayer("drawwifiLayer",vm);
		//定制图层清空
		for(var i in map.graphicsLayerIds){
			if(vm.common.startsWith(map.graphicsLayerIds[i],"drawdztc")){
				this.clearLayer(map.graphicsLayerIds[i],vm);
			}
		}
	},
	drawAndEit(layerid,linecolor,polygoncolor,templateobj,vm) {
		var that = this;
		esriLoader.loadModules([
			"esri/toolbars/draw"
		], {url:Constants.map_base_url}).then(([Draw
			]) => {
			var drawEndHandler = vm.map.drawEndHandler;
			var map = vm.map.map;
			var toolbar = vm.map.toolbar;
			var editToolbar = vm.map.editToolbar;
			if (drawEndHandler) {
				//移除绘制结束事件
				drawEndHandler.remove();
				vm.map.drawEndHandler = null;
			}
			that.showLayer("hfxmap_graphics",vm);//编辑图层显示
			map.infoWindow.hide();
			//toolbar绘制注销
			toolbar.deactivate();
			//线样式
			 var lineSymbol = new esri.symbol.SimpleLineSymbol(
				 esri.symbol.SimpleLineSymbol.STYLE_SHORTDASH, new dojo.Color([0,0,255,0.55]), 3);
			 //填充样式
			 var fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
				 lineSymbol, new dojo.Color([98,194,204,0.5]));
			 toolbar.setFillSymbol(fillSymbol);
			 toolbar.setLineSymbol(lineSymbol);
			 toolbar.activate(Draw["POLYGON"]);
			drawEndHandler = toolbar.on("draw-end", function(evt){
			esriLoader.loadModules([
				"esri/symbols/PictureMarkerSymbol",
				"esri/InfoTemplate",
				"esri/toolbars/draw",
				"esri/graphic",
				"esri/symbols/SimpleMarkerSymbol",
				"esri/symbols/SimpleLineSymbol",
				"esri/symbols/SimpleFillSymbol",
				"dojo/colors",
				"esri/symbols/Font",
				"esri/symbols/TextSymbol",
				"dojo/parser" 
			], {url:Constants.map_base_url}).then(([PictureMarkerSymbol,
				InfoTemplate,Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color, Font,TextSymbol,parser]) => {			
					 parser.parse();
					 //移除绘制结束事件
					 drawEndHandler.remove();
					 vm.map.drawEndHandler = null;
					 //toolbar绘制注销
					 toolbar.deactivate();
					 
					 //获取图层
					 var cLayer = map.getLayer(layerid);
					if(cLayer == "undefined" || cLayer == null){
						cLayer = new esri.layers.GraphicsLayer({id:layerid});
						map.addLayer(cLayer);
					}
					cLayer.clear();
	
					if(polygoncolor==null){
						polygoncolor = "rgba(0,0,0,0.5)";
					}
					if(linecolor==null){
						linecolor = "rgb(0,0,0)";
					}
					var linesymbol = new esri.symbol.SimpleLineSymbol(
								esri.symbol.SimpleLineSymbol.STYLE_SOLID, dojo.colorFromRgb(linecolor), 1);
					var fillsymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
							linesymbol, dojo.colorFromRgb(polygoncolor));
					var graphic = new Graphic(evt.geometry, fillsymbol, templateobj);
					cLayer.add(graphic);						

					that.showInfoWindow(graphic,false,vm);
					
					//画完后可编辑
					esriLoader.loadModules([
						"esri/toolbars/edit"
						], {url:Constants.map_base_url}).then(([Edit
						]) => {
								 //跟踪图层显示
								 that.showLayer("hfxmap_graphics",vm);
								 var editToolbarGraphic = null;
								 var editToolbarPointBefore = [];
	//				     		var getEditLayer = map.getLayer(layerid);
								 var Graphic = graphic;
								 if (Graphic) {
									 editToolbarGraphic=Graphic;
									 //如果编辑不保存就把Graphic最初始的值回传
									 var arrPoint = Graphic.geometry.rings[0];
									 for (var j = 0; j < arrPoint.length; j++) {
										 editToolbarPointBefore[j] = arrPoint[j];
									 }
									 //编辑工具注销
									 if(editToolbar)
									 {	
										 editToolbar.deactivate();
									 }
									 //打开编辑的顶点移动状态 
									 editToolbar.activate(Edit.EDIT_VERTICES, Graphic);
								 }
								 vm.map.editToolbarGraphic = editToolbarGraphic;
								 vm.map.editToolbarPointBefore = editToolbarPointBefore;
								}).catch (err => {})
					}).catch (err => {})
			});
			vm.map.drawEndHandler = drawEndHandler;
		}).catch (err => {})
	},
	drawEdit(layerid, markid,vm){
		var that = this;
		esriLoader.loadModules([
			"esri/toolbars/edit"
		], {url:Constants.map_base_url}).then(([Edit
			]) => {
			//跟踪图层显示
			that.showLayer("hfxmap_graphics",vm);
			var map = vm.map.map;
			var markidmap = vm.map.markidmap;
			var editToolbar = vm.map.editToolbar;
			var editToolbarGraphic = vm.map.editToolbarGraphic;
			var editToolbarPointBefore = vm.map.editToolbarPointBefore;
			editToolbarGraphic = null;
			editToolbarPointBefore = [];
			var getEditLayer = map.getLayer(layerid);
			var Graphic = markidmap[layerid][markid];
			if (Graphic) {
				editToolbarGraphic=Graphic;
				//如果编辑不保存就把Graphic最初始的值回传
				var graphicType = Graphic.geometry.type;
				if (graphicType == "polyline") {
					var arrPoint = Graphic.geometry.paths[0];
					for (var i = 0; i < arrPoint.length; i++) {
						editToolbarPointBefore[i] = arrPoint[i];
					}
				} else if (graphicType == "polygon") {
					var arrPoint = Graphic.geometry.rings[0];
					for (var j = 0; j < arrPoint.length; j++) {
						editToolbarPointBefore[j] = arrPoint[j];
					}
				}
				//编辑工具注销
				if(editToolbar)
				{	
					editToolbar.deactivate();
				}
				//打开编辑的顶点移动状态 
				editToolbar.activate(Edit.EDIT_VERTICES, Graphic);
				vm.map.editToolbarGraphic = editToolbarGraphic;
				vm.map.editToolbarPointBefore = editToolbarPointBefore;
			}
		}).catch (err => {})
	},
	clearMark(layerid,markid,vm) {
		var map = vm.map.map;
		var markidmap = vm.map.markidmap;
		var layer = map.getLayer(layerid);
		if(layer){//存在则清空
			//markidmap 中清空
			if(markidmap[layerid]){
				if(markidmap[layerid][markid]){
					layer.remove(markidmap[layerid][markid]);
					delete markidmap[layerid][markid];
				}
			}
		}
	},
	setPolygonColor(graphic,linecolor,polygoncolor,vm){
		var linesymbol = new esri.symbol.SimpleLineSymbol(
			esri.symbol.SimpleLineSymbol.STYLE_SOLID, dojo.colorFromRgb(linecolor), 1);
		var fillsymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
			linesymbol, dojo.colorFromRgb(polygoncolor));
		graphic.setSymbol(fillsymbol);
	},
	/**
	 *  一标三实画图形,地图上框选圈选
	 *  type  EXTENT框选 CIRCLE 圈选 POLYGON 多变形选 POINT 点
	 *  POLYLINE 线选
	 */
	drawYbss(type,vm,callback){
		var that = this;
		esriLoader.loadModules([
			"esri/toolbars/draw"
		], {url:Constants.map_base_url}).then(([Draw
			]) => {
				var map = vm.map.map;
				var drawEndHandler = vm.map.drawEndHandler;
				var fromLayerInfo = vm.map.fromLayerInfo;
				var toolbar = vm.map.toolbar;
				map.infoWindow.hide();
				that.showLayer("hfxmap_graphics",vm);//编辑图层显示
				if(drawEndHandler)
				{
				  drawEndHandler.remove();
				  vm.map.drawEndHandler=null;
				}
				var bufferShowclick = vm.map.bufferShowclick;
				if(bufferShowclick){
					bufferShowclick.remove();
				}
                // if(bufferShowclickThree){
				// 	bufferShowclickThree.remove();
                //     bufferShowclickThree = null;
				// }
				var bufferShowDetailclick = vm.map.bufferShowDetailclick;
                if(bufferShowDetailclick){
                    bufferShowDetailclick.remove();
                }
				// $(".buffer-tools").hide();
				//toolbar绘制注销
				toolbar.deactivate();
				var tempLy = map.getLayer("drawLayer");
		 		if(tempLy == null || tempLy =="undefined"){
		 			tempLy = that.createLayer("drawLayer",vm);
				}else{
					tempLy.clear();
				}
				var bufferShowLayer = map.getLayer("bufferShowLayer");
				var bufferShowDetailLayer = map.getLayer("bufferShowDetailLayer");
				if(bufferShowLayer == null || bufferShowLayer =="undefined"){
					bufferShowLayer = that.createLayer("bufferShowLayer",vm);
					bufferShowDetailLayer = that.createLayer("bufferShowDetailLayer",vm);
				}else{
					that.clearLayer("bufferShowLayer",vm);
					that.clearLayer("bufferShowDetailLayer",vm);
				}
				
				//线样式
		 		var lineSymbol = new esri.symbol.SimpleLineSymbol(
		 			esri.symbol.SimpleLineSymbol.STYLE_SHORTDASH, new dojo.Color([0,0,255,0.55]), 3);
		 		//填充样式
		 		var fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
		 			lineSymbol, new dojo.Color([98,194,204,0.5]));
		 		toolbar.setFillSymbol(fillSymbol);
		 		toolbar.setLineSymbol(lineSymbol);
				toolbar.activate(Draw[type]);	
				drawEndHandler=toolbar.on("draw-end", function(evt){
					esriLoader.loadModules([
						"esri/toolbars/draw",
						"esri/graphic",
						"esri/symbols/SimpleMarkerSymbol",
						"esri/symbols/SimpleLineSymbol",
						"esri/symbols/SimpleFillSymbol",
						"dojo/colors",
						"esri/SpatialReference",
						"dojo/parser" 
					], {url:Constants.map_base_url}).then(([
						Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color, SpatialReference, parser]) => {			
							// $('.bottom-tools ul li').removeClass('active');
							drawEndHandler.remove();
					 		vm.map.drawEndHandler = null;
							that.clearDrawLayer(vm);
					 		toolbar.deactivate();
					 		//符号
							var symbol = null;
					 		var geometrytype = evt.geometry.type;
					 		switch (geometrytype) {
							case "polyline":
								symbol = new esri.symbol.SimpleLineSymbol(
							 			esri.symbol.SimpleLineSymbol.STYLE_SHORTDASH, new dojo.Color([0,0,255,0.55]), 3);
								break;
							default:
								symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL, 
										new SimpleLineSymbol(SimpleLineSymbol.STYLE_SHORTDASH, 
										new Color([0,0,255,0.55]), 3), new Color([98,194,204,0.5]));
								break;
							}
					 		// var bufferShowLayer = map.getLayer("bufferShowLayer");
							var tempLy = map.getLayer("drawLayer");
							var graphic = new Graphic(evt.geometry, symbol,{type:type});
							tempLy.add(graphic);
							
                            //添加圈选详情按钮
                            var bufferShowDetailLayer = map.getLayer("bufferShowDetailLayer");
                            x = (evt.geometry.getExtent().xmin+evt.geometry.getExtent().xmax)/2;
                            y = evt.geometry.getExtent().ymax;
                            var hsymbol = new esri.symbol.PictureMarkerSymbol(require('@/assets/map/bottom.png'),50,20);
                            var sPoint = new esri.geometry.Point(x,y,new SpatialReference({ wkid: map.spatialReference }));//定义点		
                            var gra = new esri.Graphic(sPoint, hsymbol);//定义一个图
                            // bufferShowDetailLayer.add(gra);//将定义好的图添加到图层
                            var Tsymbol = new esri.symbol.TextSymbol("详情");	
                            Tsymbol.setOffset(0, -5);
                            var sPointT = new esri.geometry.Point(x,y,new SpatialReference({ wkid: map.spatialReference }));//定义点
                            var graT = new esri.Graphic(sPointT, Tsymbol);//定义一个图 
                            // bufferShowDetailLayer.add(graT);//将定义好的图添加到图层
                            bufferShowDetailclick = bufferShowDetailLayer.on("click",function(evt){
                                $(".class_map_detailContainer").show();//点击事件打开资源列表详情
                            });
							if(type == "CIRCLE"){
								var x = (evt.geometry.getExtent().xmin+evt.geometry.getExtent().xmax)/2;
								var y = evt.geometry.getExtent().ymin;
								var hsymbol = new esri.symbol.PictureMarkerSymbol(require('@/assets/map/bottom.png'),50,20);
								var sPoint = new esri.geometry.Point(x,y,new SpatialReference({ wkid: map.spatialReference }));//定义点		
								var radius = (evt.geometry.getExtent().xmax - evt.geometry.getExtent().xmin)/2;
								if(fromLayerInfo.xml.layerType=="realmap"){//坐标转化
									radius = radius*0.0000013528771724176554;
								}
                                if(fromLayerInfo.xml.layerType=="gaode"){
                                   radius = radius/111000;
                                }
								var cd = parseInt(radius*111000);
                                var gra = new esri.Graphic(sPoint, hsymbol,{"cd":cd});//定义一个图
								bufferShowLayer.add(gra);//将定义好的图添加到图层
								var Tsymbol = new esri.symbol.TextSymbol(cd + "米");	
								Tsymbol.setOffset(0, -5);
								var sPointT = new esri.geometry.Point(x,y,new SpatialReference({ wkid: map.spatialReference }));//定义点
								var graT = new esri.Graphic(sPointT, Tsymbol,{"cd":cd});//定义一个图 
								bufferShowLayer.add(graT);//将定义好的图添加到图层
								bufferShowclick = bufferShowLayer.on("click",function(evt){
//									//缓冲半径输入框显示
									var graphic = evt.graphic;
                        //			//缓冲半径输入框显示
                                    var mapPoint = evt.mapPoint;
                                    var screenPoint = map.toScreen(mapPoint);
                                    $(".buffer-tools").css({
                                        'left' : screenPoint.x,
                                        'top' : screenPoint.y			
                                    });
                                    var ccd = graphic.attributes.cd;
                                    $(".buffer-tools-txt").val(ccd);
                                    $(".buffer-tools").show();
                                    
								});
								vm.map.bufferShowclick = bufferShowclick;
							}else if(type == "POLYLINE"){
								var cd = 200;
								var distance = cd/111000;
                                if(fromLayerInfo.xml.layerType=="realmap"){
									distance = cd;
								}
                                if(fromLayerInfo.xml.layerType=="gaode"){
                                   distance = cd;
                                }
								that.doBufferByDistance(evt.geometry,distance,vm);
								var points = evt.geometry.getExtent().getCenter();
								var x = points.x;
								var y = points.y;
								var hsymbol = new esri.symbol.PictureMarkerSymbol(require('@/assets/map/bottom.png'),50,20);
								var Lng = x;  //经度坐标
								var Lat = y;  //纬度坐标
								var sPoint = new esri.geometry.Point(Lng,Lat,new SpatialReference({ wkid: map.spatialReference }));//定义点		
								var gra = new esri.Graphic(sPoint, hsymbol,{"cd":cd});//定义一个图
								bufferShowLayer.add(gra);//将定义好的图添加到图层
								var Tsymbol = new esri.symbol.TextSymbol(cd + "米");	
								Tsymbol.setOffset(0, -5);
								var sPointT = new esri.geometry.Point(Lng,Lat,new SpatialReference({ wkid: map.spatialReference }));//定义点
								var graT = new esri.Graphic(sPointT, Tsymbol,{"cd":cd});//定义一个图 
								bufferShowLayer.add(graT);//将定义好的图添加到图层
								
								bufferShowclick = bufferShowLayer.on("click",function(evt){
//									//缓冲半径输入框显示
									var graphic = evt.graphic;
                        //			//缓冲半径输入框显示
                                    var mapPoint = evt.mapPoint;
                                    var screenPoint = map.toScreen(mapPoint);
                                    $(".buffer-tools").css({
                                        'left' : screenPoint.x,
                                        'top' : screenPoint.y			
                                    });
                                    var ccd = graphic.attributes.cd;
                                    $(".buffer-tools-txt").val(ccd);
                                    $(".buffer-tools").show();
                                    
								});
								return;
							}
							that.drawHandler(type,evt.geometry,vm,callback);
						}).catch (err => {})
				});
			}).catch (err => {})
	},
	/**
	 *  画图形,地图上框选圈选
	 *  type  EXTENT框选 CIRCLE 圈选 POLYGON 多变形选 POINT 点
	 *  POLYLINE 线选
	 */
	draw(type,vm){
		var that = this;
		esriLoader.loadModules([
			"esri/toolbars/draw"
		], {url:Constants.map_base_url}).then(([Draw
			]) => {
				var map = vm.map.map;
				var drawEndHandler = vm.map.drawEndHandler;
				var fromLayerInfo = vm.map.fromLayerInfo;
				var toolbar = vm.map.toolbar;
				map.infoWindow.hide();
				that.showLayer("hfxmap_graphics",vm);//编辑图层显示
				if(drawEndHandler)
				{
				  drawEndHandler.remove();
				  vm.map.drawEndHandler=null;
				}
				var bufferShowclick = vm.map.bufferShowclick;
				if(bufferShowclick){
					bufferShowclick.remove();
				}
                // if(bufferShowclickThree){
				// 	bufferShowclickThree.remove();
                //     bufferShowclickThree = null;
				// }
				var bufferShowDetailclick = vm.map.bufferShowDetailclick;
                if(bufferShowDetailclick){
                    bufferShowDetailclick.remove();
                }
				// $(".buffer-tools").hide();
				//toolbar绘制注销
				toolbar.deactivate();
				var tempLy = map.getLayer("drawLayer");
		 		if(tempLy == null || tempLy =="undefined"){
		 			tempLy = that.createLayer("drawLayer",vm);
				}else{
					tempLy.clear();
				}
				var bufferShowLayer = map.getLayer("bufferShowLayer");
				var bufferShowDetailLayer = map.getLayer("bufferShowDetailLayer");
				if(bufferShowLayer == null || bufferShowLayer =="undefined"){
					bufferShowLayer = that.createLayer("bufferShowLayer",vm);
					bufferShowDetailLayer = that.createLayer("bufferShowDetailLayer",vm);
				}else{
					that.clearLayer("bufferShowLayer",vm);
					that.clearLayer("bufferShowDetailLayer",vm);
				}
				
				//线样式
		 		var lineSymbol = new esri.symbol.SimpleLineSymbol(
		 			esri.symbol.SimpleLineSymbol.STYLE_SHORTDASH, new dojo.Color([0,0,255,0.55]), 3);
		 		//填充样式
		 		var fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
		 			lineSymbol, new dojo.Color([98,194,204,0.5]));
		 		toolbar.setFillSymbol(fillSymbol);
		 		toolbar.setLineSymbol(lineSymbol);
				toolbar.activate(Draw[type]);	
				drawEndHandler=toolbar.on("draw-end", function(evt){
					esriLoader.loadModules([
						"esri/toolbars/draw",
						"esri/graphic",
						"esri/symbols/SimpleMarkerSymbol",
						"esri/symbols/SimpleLineSymbol",
						"esri/symbols/SimpleFillSymbol",
						"dojo/colors",
						"esri/SpatialReference",
						"dojo/parser" 
					], {url:Constants.map_base_url}).then(([
						Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color, SpatialReference, parser]) => {			
							// $('.bottom-tools ul li').removeClass('active');
							drawEndHandler.remove();
					 		vm.map.drawEndHandler = null;
							that.clearDrawLayer(vm);
					 		toolbar.deactivate();
					 		//符号
							var symbol = null;
					 		var geometrytype = evt.geometry.type;
					 		switch (geometrytype) {
							case "polyline":
								symbol = new esri.symbol.SimpleLineSymbol(
							 			esri.symbol.SimpleLineSymbol.STYLE_SHORTDASH, new dojo.Color([0,0,255,0.55]), 3);
								break;
							default:
								symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL, 
										new SimpleLineSymbol(SimpleLineSymbol.STYLE_SHORTDASH, 
										new Color([0,0,255,0.55]), 3), new Color([98,194,204,0.5]));
								break;
							}
					 		// var bufferShowLayer = map.getLayer("bufferShowLayer");
							var tempLy = map.getLayer("drawLayer");
							var graphic = new Graphic(evt.geometry, symbol,{type:type});
							tempLy.add(graphic);
							
                            //添加圈选详情按钮
                            var bufferShowDetailLayer = map.getLayer("bufferShowDetailLayer");
                            x = (evt.geometry.getExtent().xmin+evt.geometry.getExtent().xmax)/2;
                            y = evt.geometry.getExtent().ymax;
                            var hsymbol = new esri.symbol.PictureMarkerSymbol(require('@/assets/map/bottom.png'),50,20);
                            var sPoint = new esri.geometry.Point(x,y,new SpatialReference({ wkid: map.spatialReference }));//定义点		
                            var gra = new esri.Graphic(sPoint, hsymbol);//定义一个图
                            bufferShowDetailLayer.add(gra);//将定义好的图添加到图层
                            var Tsymbol = new esri.symbol.TextSymbol("详情");	
                            Tsymbol.setOffset(0, -5);
                            var sPointT = new esri.geometry.Point(x,y,new SpatialReference({ wkid: map.spatialReference }));//定义点
                            var graT = new esri.Graphic(sPointT, Tsymbol);//定义一个图 
                            bufferShowDetailLayer.add(graT);//将定义好的图添加到图层
                            bufferShowDetailclick = bufferShowDetailLayer.on("click",function(evt){
                                $(".class_map_detailContainer").show();//点击事件打开资源列表详情
                            });
							if(type == "CIRCLE"){
								var x = (evt.geometry.getExtent().xmin+evt.geometry.getExtent().xmax)/2;
								var y = evt.geometry.getExtent().ymin;
								var hsymbol = new esri.symbol.PictureMarkerSymbol(require('@/assets/map/bottom.png'),50,20);
								var sPoint = new esri.geometry.Point(x,y,new SpatialReference({ wkid: map.spatialReference }));//定义点		
								var radius = (evt.geometry.getExtent().xmax - evt.geometry.getExtent().xmin)/2;
								if(fromLayerInfo.xml.layerType=="realmap"){//坐标转化
									radius = radius*0.0000013528771724176554;
								}
                                if(fromLayerInfo.xml.layerType=="gaode"){
                                   radius = radius/111000;
                                }
								var cd = parseInt(radius*111000);
                                var gra = new esri.Graphic(sPoint, hsymbol,{"cd":cd});//定义一个图
								bufferShowLayer.add(gra);//将定义好的图添加到图层
								var Tsymbol = new esri.symbol.TextSymbol(cd + "米");	
								Tsymbol.setOffset(0, -5);
								var sPointT = new esri.geometry.Point(x,y,new SpatialReference({ wkid: map.spatialReference }));//定义点
								var graT = new esri.Graphic(sPointT, Tsymbol,{"cd":cd});//定义一个图 
								bufferShowLayer.add(graT);//将定义好的图添加到图层
								bufferShowclick = bufferShowLayer.on("click",function(evt){
//									//缓冲半径输入框显示
									var graphic = evt.graphic;
                        //			//缓冲半径输入框显示
                                    var mapPoint = evt.mapPoint;
                                    var screenPoint = map.toScreen(mapPoint);
                                    $(".buffer-tools").css({
                                        'left' : screenPoint.x,
                                        'top' : screenPoint.y			
                                    });
                                    var ccd = graphic.attributes.cd;
                                    $(".buffer-tools-txt").val(ccd);
                                    $(".buffer-tools").show();
                                    
								});
								vm.map.bufferShowclick = bufferShowclick;
							}else if(type == "POLYLINE"){
								var cd = 200;
								var distance = cd/111000;
                                if(fromLayerInfo.xml.layerType=="realmap"){
									distance = cd;
								}
                                if(fromLayerInfo.xml.layerType=="gaode"){
                                   distance = cd;
                                }
								that.doBufferByDistance(evt.geometry,distance,vm);
								var points = evt.geometry.getExtent().getCenter();
								var x = points.x;
								var y = points.y;
								var hsymbol = new esri.symbol.PictureMarkerSymbol(require('@/assets/map/bottom.png'),50,20);
								var Lng = x;  //经度坐标
								var Lat = y;  //纬度坐标
								var sPoint = new esri.geometry.Point(Lng,Lat,new SpatialReference({ wkid: map.spatialReference }));//定义点		
								var gra = new esri.Graphic(sPoint, hsymbol,{"cd":cd});//定义一个图
								bufferShowLayer.add(gra);//将定义好的图添加到图层
								var Tsymbol = new esri.symbol.TextSymbol(cd + "米");	
								Tsymbol.setOffset(0, -5);
								var sPointT = new esri.geometry.Point(Lng,Lat,new SpatialReference({ wkid: map.spatialReference }));//定义点
								var graT = new esri.Graphic(sPointT, Tsymbol,{"cd":cd});//定义一个图 
								bufferShowLayer.add(graT);//将定义好的图添加到图层
								
								bufferShowclick = bufferShowLayer.on("click",function(evt){
//									//缓冲半径输入框显示
									var graphic = evt.graphic;
                        //			//缓冲半径输入框显示
                                    var mapPoint = evt.mapPoint;
                                    var screenPoint = map.toScreen(mapPoint);
                                    $(".buffer-tools").css({
                                        'left' : screenPoint.x,
                                        'top' : screenPoint.y			
                                    });
                                    var ccd = graphic.attributes.cd;
                                    $(".buffer-tools-txt").val(ccd);
                                    $(".buffer-tools").show();
                                    
								});
								return;
							}
							that.drawHandler(type,evt.geometry,vm);
						}).catch (err => {})
				});
			}).catch (err => {})
	},
	/**
	 * 画圈效果不带查询
	 * @param x
	 * @param y
	 * @param radius 度数
	 */
	drawPointCircle(x,y,radius,layerid,markinfo,vm){
		esriLoader.loadModules([
			"esri/toolbars/draw",
			"esri/graphic",
			"esri/symbols/SimpleMarkerSymbol",
			"esri/symbols/SimpleLineSymbol",
			"esri/symbols/SimpleFillSymbol",
			"dojo/colors",
			"esri/SpatialReference",
			"dojo/parser" 
		], {url:Constants.map_base_url}).then(([
			Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color, SpatialReference, parser]) => {
			var map = vm.map.map;
			var fromLayerInfo = vm.map.fromLayerInfo;
			var markidmap = vm.map.markidmap;
			// var tempLy = map.getLayer(layerid);
			// if(tempLy == null || tempLy =="undefined")
			// {
			// 	tempLy = createLayer(layerid);
			// }
			var tempLy;
			if(vm.map.layeridmap[layerid]){
				//存在则从map中获取
				tempLy = vm.map.layeridmap[layerid];
			}else{
				//不存在则新建
				tempLy = new esri.layers.GraphicsLayer({id:layerid});
				vm.map.layeridmap[layerid] = tempLy;
				vm.map.map.addLayer(tempLy,0);
				mapEvent.registerLayerEvent(layerid,tempLy,vm);
			}
			var fillcolor = [255,64,64,0.35];
			if(markinfo.hasjl=='1'){//有警力进入的话就使颜色变绿
				fillcolor = [0,238,0,0.35];
			}
			var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_NULL, 
					new Color([98,194,204,0.5]), 3), new Color(fillcolor));
			var polygon = new esri.geometry.Polygon();
			var points = new Array();
			for (var i = 0; i <= 360; i += 5) {
				var radian = i * (Math.PI / 180.0);
				var lx = x + radius * Math.cos(radian);
				var ly = y + radius * Math.sin(radian);
				points.push(new esri.geometry.Point(lx, ly,map.spatialReference));
			}
			polygon.addRing(points);
			polygon.spatialReference = map.spatialReference;
			if(fromLayerInfo.xml.layerType=="realmap"){
				polygon=mapUtil.polygonToPolygon25(fromLayerInfo,polygon);
			}
			if(fromLayerInfo.xml.layerType=="gaode"){
				polygon=mapUtil.polygonToPolygonGaode(fromLayerInfo,polygon);
			}
			var gra = new esri.Graphic(polygon, symbol, {type:"CIRCLE"});
			var cd = parseInt(radius*111000);
			var Tsymbol = new esri.symbol.TextSymbol(cd + "米",null,new dojo.Color([255,255,0]));	
			Tsymbol.setOffset(0, 0);
			var sPointT = new esri.geometry.Point(x,y-radius,map.spatialReference);//定义点
			if(fromLayerInfo.xml.layerType=="realmap"){
				sPointT=mapUtil.pointToPoint25(fromLayerInfo,x,y-radius);
			}
			if(fromLayerInfo.xml.layerType=="gaode"){
				sPointT=mapUtil.ELatLng2EPoint(fromLayerInfo,x,y-radius);
			}
			var graT = new esri.Graphic(sPointT, Tsymbol,{"cd":cd});//定义一个图 

			var markidcircle = markinfo.id+'circle';
			var markidradius = markinfo.id+'radius';
			if(markidmap[layerid]){
				if(markidmap[layerid][markidcircle]){
					tempLy.remove(markidmap[layerid][markidcircle]);
					delete markidmap[layerid][markidcircle];
					markidmap[layerid][markidcircle] = gra;
					tempLy.add(gra);
					// var graphic = markidmap[layerid][markidcircle];
					// graphic.setSymbol(symbol);
				}else{
					markidmap[layerid][markidcircle] = gra;
					tempLy.add(gra);
				}
				if(markidmap[layerid][markidradius]){
					tempLy.remove(markidmap[layerid][markidradius]);
					delete markidmap[layerid][markidradius];
					markidmap[layerid][markidradius] = graT;
					tempLy.add(graT);//将定义好的图添加到图层
					// var graphic = markidmap[layerid][markidradius];
					// graphic.setSymbol(Tsymbol);
				}else{
					markidmap[layerid][markidradius] = graT;
					tempLy.add(graT);//将定义好的图添加到图层
				}
			}else{
				markidmap[layerid] = {};
				markidmap[layerid][markidcircle] = gra;
				markidmap[layerid][markidradius] = graT;
				tempLy.add(gra);
				tempLy.add(graT);//将定义好的图添加到图层
			}
		});
	},
	/**
	 *  画圈
	 *  xpos  经度  当前地图上的坐标经度
	 *  ypos  纬度  当前地图上的坐标纬度
	 */
	drawCircle(xpos,ypos,radius,vm){
		var that = this;
		esriLoader.loadModules([
			"esri/toolbars/draw",
			"esri/graphic",
			"esri/symbols/SimpleMarkerSymbol",
			"esri/symbols/SimpleLineSymbol",
			"esri/symbols/SimpleFillSymbol",
			"dojo/colors",
			"esri/SpatialReference",
			"dojo/parser" 
		], {url:Constants.map_base_url}).then(([
			Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color, SpatialReference, parser]) => {			
				// $('.bottom-tools ul li').removeClass('active');
				var map = vm.map.map;
				var fromLayerInfo = vm.map.fromLayerInfo;
				map.infoWindow.hide();
				that.showLayer("hfxmap_graphics",vm);//编辑图层显示

				var bufferShowclick = vm.map.bufferShowclick;
				if(bufferShowclick){
					bufferShowclick.remove();
				}
                // if(bufferShowclickThree){
				// 	bufferShowclickThree.remove();
                //     bufferShowclickThree = null;
				// }
                var bufferShowDetailclick = vm.map.bufferShowDetailclick;
                if(bufferShowDetailclick){
                    bufferShowDetailclick.remove();
                }
				// $(".buffer-tools").hide();

				var tempLy = map.getLayer("drawLayer");
		 		if(tempLy == null || tempLy =="undefined"){
		 			tempLy = that.createLayer("drawLayer",vm);
				}else{
					tempLy.clear();
				}
                // clearLayer("bufferShowLayerThree");
                // clearLayer("bufferShowDetailLayer");
				 var bufferShowLayer = map.getLayer("bufferShowLayer");
				 var bufferShowDetailLayer = map.getLayer("bufferShowDetailLayer");
				 if(bufferShowLayer == null || bufferShowLayer =="undefined"){
					bufferShowLayer = that.createLayer("bufferShowLayer",vm);
					bufferShowDetailLayer = that.createLayer("bufferShowDetailLayer",vm);
				 }else{
					that.clearLayer("bufferShowLayer",vm);
					that.clearLayer("bufferShowDetailLayer",vm);
				 }
				
				//线样式
		 		var lineSymbol = new esri.symbol.SimpleLineSymbol(
		 			esri.symbol.SimpleLineSymbol.STYLE_SHORTDASH, new dojo.Color([0,0,255,0.55]), 3);
		 		//填充样式
		 		var fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, 
					 lineSymbol, new dojo.Color([98,194,204,0.5]));
				var polygon = new esri.geometry.Polygon();
				var points = new Array();
				for (var i = 0; i <= 360; i += 10) {
					var radian = i * (Math.PI / 180.0);
					var lx = xpos + radius * Math.cos(radian);
					var ly = ypos + radius * Math.sin(radian);
					points.push(new esri.geometry.Point(lx, ly,map.spatialReference));
				}
				polygon.addRing(points);
				polygon.spatialReference = map.spatialReference;
				if(fromLayerInfo.xml.layerType=="realmap"){
					polygon=mapUtil.polygonToPolygon25(fromLayerInfo,polygon);
				}
				if(fromLayerInfo.xml.layerType=="gaode"){
					polygon=mapUtil.polygonToPolygonGaode(fromLayerInfo,polygon);
				}
				var graphic = new Graphic(polygon, fillSymbol,{type:"CIRCLE"});
				tempLy.add(graphic);
				
				var hsymbol = new esri.symbol.PictureMarkerSymbol(require('@/assets/map/bottom.png'),50,20);
				var sPoint = new esri.geometry.Point(xpos,ypos-radius,new SpatialReference({ wkid: map.spatialReference }));//定义点	
				if(fromLayerInfo.xml.layerType=="realmap"){//坐标转化
					sPoint = mapUtil.pointToPoint25(fromLayerInfo,sPoint.x,sPoint.y);
				}
				if(fromLayerInfo.xml.layerType=="gaode"){
					sPoint = mapUtil.ELatLng2EPoint(fromLayerInfo,sPoint.x,sPoint.y);
				}
				var cd = parseInt(radius*111000);
				var gra = new esri.Graphic(sPoint, hsymbol,{"cd":cd});//定义一个图
				bufferShowLayer.add(gra);//将定义好的图添加到图层
				var Tsymbol = new esri.symbol.TextSymbol(cd + "米");	
				Tsymbol.setOffset(0, -5);
				var graT = new esri.Graphic(sPoint, Tsymbol,{"cd":cd});//定义一个图 
				bufferShowLayer.add(graT);//将定义好的图添加到图层
				bufferShowclick = bufferShowLayer.on("click",function(evt){
                    //缓冲半径输入框显示
					var graphic = evt.graphic;
					//缓冲半径输入框显示
					var mapPoint = evt.mapPoint;
					var screenPoint = map.toScreen(mapPoint);
					$(".buffer-tools").css({
						'left' : screenPoint.x,
						'top' : screenPoint.y			
					});
					var ccd = graphic.attributes.cd;
					$(".buffer-tools-txt").val(ccd);
					$(".buffer-tools").show();
					
				});
				vm.map.bufferShowclick = bufferShowclick;
				//添加圈选详情按钮
				var hsymbol = new esri.symbol.PictureMarkerSymbol(require('@/assets/map/bottom.png'),50,20);
				var sPoint = new esri.geometry.Point(xpos,ypos+radius,new SpatialReference({ wkid: map.spatialReference }));//定义点
				if(fromLayerInfo.xml.layerType=="realmap"){//坐标转化
					sPoint = mapUtil.pointToPoint25(fromLayerInfo,sPoint.x,sPoint.y);
				}
				if(fromLayerInfo.xml.layerType=="gaode"){
					sPoint = mapUtil.ELatLng2EPoint(fromLayerInfo,sPoint.x,sPoint.y);
				}		
				var gra = new esri.Graphic(sPoint, hsymbol);//定义一个图
				bufferShowDetailLayer.add(gra);//将定义好的图添加到图层
				var Tsymbol = new esri.symbol.TextSymbol("详情");	
				Tsymbol.setOffset(0, -5);
				// var sPointT = new esri.geometry.Point(xpos,ypos+radius,new SpatialReference({ wkid: map.spatialReference }));//定义点
				var graT = new esri.Graphic(sPoint, Tsymbol);//定义一个图 
				bufferShowDetailLayer.add(graT);//将定义好的图添加到图层
				bufferShowDetailclick = bufferShowDetailLayer.on("click",function(evt){
					$(".class_map_detailContainer").show();//点击事件打开资源列表详情
				});
				this.drawHandler("CIRCLE",polygon,vm);
			}).catch (err => {});
	},
	/**
	 *  修改缓冲区范围后重新画圈
	 *  radius  修改后的范围
	 */
	reDrawCircle(radius,vm){
		var map = vm.map.map;
		var fromLayerInfo = vm.map.fromLayerInfo;
		var tempLy = map.getLayer("drawLayer");
        if(tempLy){
          for(var i=0;i<tempLy.graphics.length;i++){
            var attr = tempLy.graphics[i].attributes;
            if(attr.type=="CIRCLE"){
              var extent = tempLy.graphics[i].geometry.getExtent();
              var x = (extent.xmin+extent.xmax)/2;
			  var y = (extent.ymin+extent.ymax)/2;
			  this.clearDrawLayer(vm);
              if(fromLayerInfo.xml.layerType=="realmap"){
                var sPointT=mapUtil.pointToPoint25(fromLayerInfo,x,y);
                this.drawCircle(sPointT.x,sPointT.y,radius/111000,vm);
              }else if(fromLayerInfo.xml.layerType=="gaode"){
                var sPointT=mapUtil.ELatLng2EPoint(fromLayerInfo,x,y);
                this.drawCircle(sPointT.x,sPointT.y,radius/111000,vm);     
              }else{
                this.drawCircle(x,y,radius/111000,vm);
              }
            }else if(attr.type=="POLYLINE"){
			  var tempLyGeometry = tempLy.graphics[i].geometry;
              var points = tempLyGeometry.getExtent().getCenter();
              var x = points.x;
			  var y = points.y;
			//   this.clearDrawLayer(vm);
              var hsymbol = new esri.symbol.PictureMarkerSymbol(require('@/assets/map/bottom.png'),50,20);
              var Lng = x;  //经度坐标
              var Lat = y;  //纬度坐标
              var sPoint = new esri.geometry.Point(Lng,Lat,map.spatialReference);//定义点		
			  var gra = new esri.Graphic(sPoint, hsymbol,{"cd":radius});//定义一个图
			  var bufferShowLayer = map.getLayer("bufferShowLayer");
              if(bufferShowLayer == null || bufferShowLayer =="undefined")
              {
                bufferShowLayer = createLayer("bufferShowLayer");
              }else{
                bufferShowLayer.clear();
              }
              bufferShowLayer.add(gra);//将定义好的图添加到图层
              var Tsymbol = new esri.symbol.TextSymbol(radius + "米");	
              Tsymbol.setOffset(0, -5);
              var sPointT = new esri.geometry.Point(Lng,Lat,map.spatialReference);//定义点
              var graT = new esri.Graphic(sPointT, Tsymbol,{"cd":radius});//定义一个图 
			  bufferShowLayer.add(graT);//将定义好的图添加到图层
			  var bufferShowclick = vm.map.bufferShowclick;
			  if(bufferShowclick){
				bufferShowclick.remove();
			  }
              this.doBufferByDistance(tempLyGeometry,radius/111000,vm);
              bufferShowclick = bufferShowLayer.on("click",function(evt){
                          var graphic = evt.graphic;
              //			//缓冲半径输入框显示
                          var mapPoint = evt.mapPoint;
                          var screenPoint = map.toScreen(mapPoint);
                          $(".buffer-tools").css({
                              'left' : screenPoint.x,
                              'top' : screenPoint.y			
                          });
                          var ccd = graphic.attributes.cd;
                          $(".buffer-tools-txt").val(ccd);
                          $(".buffer-tools").show();
                });
                    
            }else if(attr.type=="lineBuffer"){
               tempLy.remove(tempLy.graphics[i]);
            }
          }
        }
	},
	/**
	 *  画圈三道防控圈
	 *  xpos  经度  当前地图上的坐标经度
	 *  ypos  纬度  当前地图上的坐标纬度
	 */
	drawThreeCircle(xpos,ypos,locdata,vm){
		var that = this;
		esriLoader.loadModules([
			"esri/toolbars/draw",
			"esri/graphic",
			"esri/symbols/SimpleMarkerSymbol",
			"esri/symbols/SimpleLineSymbol",
			"esri/symbols/SimpleFillSymbol",
			"dojo/colors",
			"esri/SpatialReference",
			"dojo/parser" 
		], {url:Constants.map_base_url}).then(([
			Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color, SpatialReference, parser]) => {			
				// $('.bottom-tools ul li').removeClass('active');
				// debugger;
				var firstradius = locdata.firstradius/111000;
				var secondradius = locdata.secondradius/111000;
				var thirdradius = locdata.thirdradius/111000;
				var map = vm.map.map;
				var fromLayerInfo = vm.map.fromLayerInfo;
				map.infoWindow.hide();
				that.showLayer("hfxmap_graphics",vm);//编辑图层显示

				var bufferShowclick = vm.map.bufferShowclick;
				if(bufferShowclick){
					bufferShowclick.remove();
				}
                // if(bufferShowclickThree){
				// 	bufferShowclickThree.remove();
                //     bufferShowclickThree = null;
				// }
                var bufferShowDetailclick = vm.map.bufferShowDetailclick;
                if(bufferShowDetailclick){
                    bufferShowDetailclick.remove();
                }
				// $(".buffer-tools").hide();

				var tempLy = map.getLayer("drawLayer");
		 		if(tempLy == null || tempLy =="undefined"){
		 			tempLy = that.createLayer("drawLayer",vm);
				}else{
					tempLy.clear();
				}
                // clearLayer("bufferShowLayerThree");
                // clearLayer("bufferShowDetailLayer");
				 var bufferShowLayer = map.getLayer("bufferShowLayer");
				 var bufferShowDetailLayer = map.getLayer("bufferShowDetailLayer");
				 if(bufferShowLayer == null || bufferShowLayer =="undefined"){
					bufferShowLayer = that.createLayer("bufferShowLayer",vm);
					bufferShowDetailLayer = that.createLayer("bufferShowDetailLayer",vm);
				 }else{
					that.clearLayer("bufferShowLayer",vm);
					that.clearLayer("bufferShowDetailLayer",vm);
				 }
				
				//线样式
		 		var lineSymbol = new esri.symbol.SimpleLineSymbol(
		 			esri.symbol.SimpleLineSymbol.STYLE_SHORTDASH, new dojo.Color([0,0,255,0.55]), 3);
		 		//填充样式
		 		var fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, 
					 lineSymbol, new dojo.Color([98,194,204,0.5]));
				var firstpolygon = new esri.geometry.Polygon();
				var secondpolygon = new esri.geometry.Polygon();
				var thirdpolygon = new esri.geometry.Polygon();
				var firstpoints = new Array();
				for (var i = 0; i <= 360; i += 10) {
					var radian = i * (Math.PI / 180.0);
					var lx = xpos + firstradius * Math.cos(radian);
					var ly = ypos + firstradius * Math.sin(radian);
					firstpoints.push(new esri.geometry.Point(lx, ly,map.spatialReference));
				}
				firstpolygon.addRing(firstpoints);
				firstpolygon.spatialReference = map.spatialReference;
				var secondpoints = new Array();
				for (var i = 0; i <= 360; i += 10) {
					var radian = i * (Math.PI / 180.0);
					var lx = xpos + secondradius * Math.cos(radian);
					var ly = ypos + secondradius * Math.sin(radian);
					secondpoints.push(new esri.geometry.Point(lx, ly,map.spatialReference));
				}
				secondpolygon.addRing(secondpoints);
				secondpolygon.spatialReference = map.spatialReference;
				var thirdpoints = new Array();
				for (var i = 0; i <= 360; i += 10) {
					var radian = i * (Math.PI / 180.0);
					var lx = xpos + thirdradius * Math.cos(radian);
					var ly = ypos + thirdradius * Math.sin(radian);
					thirdpoints.push(new esri.geometry.Point(lx, ly,map.spatialReference));
				}
				thirdpolygon.addRing(thirdpoints);
				thirdpolygon.spatialReference = map.spatialReference;
				if(fromLayerInfo.xml.layerType=="realmap"){
					firstpolygon=mapUtil.polygonToPolygon25(fromLayerInfo,firstpolygon);
					secondpolygon=mapUtil.polygonToPolygon25(fromLayerInfo,secondpolygon);
					thirdpolygon=mapUtil.polygonToPolygon25(fromLayerInfo,thirdpolygon);
				}
				if(fromLayerInfo.xml.layerType=="gaode"){
					firstpolygon=mapUtil.polygonToPolygonGaode(fromLayerInfo,firstpolygon);
					secondpolygon=mapUtil.polygonToPolygonGaode(fromLayerInfo,secondpolygon);
					thirdpolygon=mapUtil.polygonToPolygonGaode(fromLayerInfo,thirdpolygon);
				}
				var firstgraphic = new Graphic(firstpolygon, fillSymbol,{type:"CIRCLE"});
				var secondgraphic = new Graphic(secondpolygon, fillSymbol,{type:"CIRCLE"});
				var thirdgraphic = new Graphic(thirdpolygon, fillSymbol,{type:"CIRCLE"});
				tempLy.add(firstgraphic);
				tempLy.add(secondgraphic);
				tempLy.add(thirdgraphic);
				
				var hsymbol = new esri.symbol.PictureMarkerSymbol(require('@/assets/map/bottom.png'),50,20);
				var firstsPoint = new esri.geometry.Point(xpos,ypos-firstradius,new SpatialReference({ wkid: map.spatialReference }));//定义点
				var secondsPoint = new esri.geometry.Point(xpos,ypos-secondradius,new SpatialReference({ wkid: map.spatialReference }));//定义点
				var thirdsPoint = new esri.geometry.Point(xpos,ypos-thirdradius,new SpatialReference({ wkid: map.spatialReference }));//定义点	
				if(fromLayerInfo.xml.layerType=="realmap"){//坐标转化
					firstsPoint = mapUtil.pointToPoint25(fromLayerInfo,firstsPoint.x,firstsPoint.y);
					secondsPoint = mapUtil.pointToPoint25(fromLayerInfo,secondsPoint.x,secondsPoint.y);
					thirdsPoint = mapUtil.pointToPoint25(fromLayerInfo,thirdsPoint.x,thirdsPoint.y);
				}
				if(fromLayerInfo.xml.layerType=="gaode"){
					firstsPoint = mapUtil.ELatLng2EPoint(fromLayerInfo,firstsPoint.x,firstsPoint.y);
					secondsPoint = mapUtil.ELatLng2EPoint(fromLayerInfo,secondsPoint.x,secondsPoint.y);
					thirdsPoint = mapUtil.ELatLng2EPoint(fromLayerInfo,thirdsPoint.x,thirdsPoint.y);
				}
				var firstcd = parseInt(firstradius*111000);
				var firstgra = new esri.Graphic(firstsPoint, hsymbol,{"cd":firstcd});//定义一个图
				var secondcd = parseInt(secondradius*111000);
				var secondgra = new esri.Graphic(secondsPoint, hsymbol,{"cd":secondcd});//定义一个图
				var thirdcd = parseInt(thirdradius*111000);
				var thirdgra = new esri.Graphic(thirdsPoint, hsymbol,{"cd":thirdcd});//定义一个图
				bufferShowLayer.add(firstgra);//将定义好的图添加到图层
				bufferShowLayer.add(secondgra);//将定义好的图添加到图层
				bufferShowLayer.add(thirdgra);//将定义好的图添加到图层

				var Tsymbol = new esri.symbol.TextSymbol(firstcd + "米");	
				Tsymbol.setOffset(0, -5);
				var firstgraT = new esri.Graphic(firstsPoint, Tsymbol,{"cd":firstcd});//定义一个图 
				bufferShowLayer.add(firstgraT);//将定义好的图添加到图层

				var Tsymbol = new esri.symbol.TextSymbol(secondcd + "米");	
				Tsymbol.setOffset(0, -5);
				var secondgraT = new esri.Graphic(secondsPoint, Tsymbol,{"cd":secondcd});//定义一个图 
				bufferShowLayer.add(secondgraT);//将定义好的图添加到图层

				var Tsymbol = new esri.symbol.TextSymbol(thirdcd + "米");	
				Tsymbol.setOffset(0, -5);
				var thirdgraT = new esri.Graphic(thirdsPoint, Tsymbol,{"cd":thirdcd});//定义一个图 
				bufferShowLayer.add(thirdgraT);//将定义好的图添加到图层

				bufferShowclick = bufferShowLayer.on("click",function(evt){
					//缓冲半径输入框显示
					var graphic = evt.graphic;
					//缓冲半径输入框显示
					var mapPoint = evt.mapPoint;
					var screenPoint = map.toScreen(mapPoint);
					$(".buffer-tools").css({
						'left' : screenPoint.x,
						'top' : screenPoint.y			
					});
					var ccd = graphic.attributes.cd;
					$(".buffer-tools-txt").val(ccd);
					$(".buffer-tools").show();
					
				});
				vm.map.bufferShowclick = bufferShowclick;
				this.drawHandler("CIRCLE",thirdpolygon,vm);
			}).catch (err => {});
	},
	drawHandler(type,geometry,vm,callback){
		var fromLayerInfo = vm.map.fromLayerInfo;
		var paramObj = new Object();
		if(type=="EXTENT"){//框选
		 var extent = geometry.getExtent();
		 var xmin = extent.xmin;
		 var ymin = extent.ymin;
		 var xmax = extent.xmax;
		 var ymax = extent.ymax;	
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
		 }else if(fromLayerInfo.xml.layerType=="gaode"){
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
		   paramObj.drawtype = "3";
		   paramObj.points = pointsArry;     
		 }else{
		   paramObj.drawtype = "2";
		   paramObj.points = points;
		 }
	   }else if(type=="CIRCLE"){
		 var circleExtent = geometry.getExtent();
		 var centerX = (circleExtent.xmin + circleExtent.xmax)/2;
		 var centerY = (circleExtent.ymin + circleExtent.ymax)/2;
		 var radius = (circleExtent.xmax - circleExtent.xmin)/2;
		 if(fromLayerInfo.xml.layerType=="realmap"){//坐标转化
		   var point1 = mapUtil.point25ToPoint(fromLayerInfo,centerX,centerY);
		   centerX = point1.x;
		   centerY = point1.y;
		   radius = radius*0.0000013528771724176554;
		 }else if(fromLayerInfo.xml.layerType=="gaode"){//坐标转化
		   var point1 = mapUtil.EPoint2ELatLng(fromLayerInfo,centerX,centerY);
		   centerX = point1.x;
		   centerY = point1.y;
		   radius = radius/111000;
		 }
		 paramObj.drawtype = "1";
		 paramObj.lon = centerX;
		 paramObj.lat = centerY;
		 paramObj.radius = radius;
	   }else{
		 var points = geometry.rings[0];
		 var pointsArry =[];
		 if(fromLayerInfo.xml.layerType=="realmap"){//坐标转化
		   for (var i = 0; i < points.length - 1; i++) {
			 var point ={
				 "lon":mapUtil.point25ToPoint(fromLayerInfo,points[i][0], points[i][1]).x,
				 "lat":mapUtil.point25ToPoint(fromLayerInfo,points[i][0], points[i][1]).y
			 };				
			 pointsArry.push(point);
		   }
		   var lastPoint = {
			   "lon":mapUtil.point25ToPoint(fromLayerInfo,points[0][0], points[0][1]).x,
			   "lat":mapUtil.point25ToPoint(fromLayerInfo,points[0][0], points[0][1]).y
		   };
		   pointsArry.push(lastPoint);	
		 }else if(fromLayerInfo.xml.layerType=="gaode"){
				 for (var i = 0; i < points.length - 1; i++) {
			 var point ={
				 "lon":mapUtil.EPoint2ELatLng(fromLayerInfo,points[i][0], points[i][1]).x,
				 "lat":mapUtil.EPoint2ELatLng(fromLayerInfo,points[i][0], points[i][1]).y
			 };				
			 pointsArry.push(point);
		   }
		   var lastPoint = {
			   "lon":mapUtil.EPoint2ELatLng(fromLayerInfo,points[0][0], points[0][1]).x,
			   "lat":mapUtil.EPoint2ELatLng(fromLayerInfo,points[0][0], points[0][1]).y
		   };
		   pointsArry.push(lastPoint);	    
			 }else{
		   for (var i = 0; i < points.length - 1; i++) {
			 var point ={"lon":points[i][0],"lat":points[i][1]};				
			 pointsArry.push(point);
		   }
		   var lastPoint = {"lon":points[0][0],"lat":points[0][1]};
		   pointsArry.push(lastPoint);
		 }
		 paramObj.drawtype = "3";
		 paramObj.points = pointsArry;
	   }
	   if(callback){
		   callback(paramObj);
	   }else{
		   vm.http.post("/common/getDrawPoint",paramObj,this.getDrawPointCallBack,vm,false,this);
	   }
	},
	getDrawPointCallBack(data,vm,that){
	   that.hideYewuLayer(vm);
	   that.clearMapDrawLayer(vm);
	   if(data.ssjq){//有时实时警情数据
		 for(var i = 0;i<data.ssjq.length;i++){
		   yewuMarkUtil.addJqMark(data.ssjq[i],"drawssjqLayer",null,vm);
		 }
		 vm.map.ssjqList = data.ssjq;//赋值给详情页面数据 
	   }
	   if(data.ssjl){//有时实时警力数据
		 for(var i = 0;i<data.ssjl.length;i++){
		   yewuMarkUtil.addJlMark(data.ssjl[i],"drawssjlLayer",vm);
		 }
		 vm.map.ssjlList = data.ssjl;//赋值给详情页面数据 
	   }
	   if(data.spjk){//视频监控数据
		 for(var i = 0;i<data.spjk.length;i++){
		   yewuMarkUtil.addSpjkMark(data.spjk[i],"drawspjkLayer",null,vm);
		 }
		 vm.map.spjkList = data.spjk;//赋值给详情页面数据 
	   }
	   if(data.tczy){
			var templateMap = data.tczy.template;
			if(data.tczy.dztc){
				var dztc = data.tczy.dztc;
				vm.map.dztcList = dztc;//赋值给详情页面数据 
				for(var i = 0;i<dztc.length;i++){
				 var layers = dztc[i].layerlist;
				 for(var k = 0;k<layers.length;k++){
					 var marks = layers[k].marklist;
					 for(var j=0;j<marks.length;j++){
						 var layerid = marks[j].layerid;
						 if(templateMap[layerid]){
							yewuMarkUtil.addLayerMark("drawdztc"+layerid+"Layer",templateMap[layerid],marks[j],vm);
						 }
					 }
				 }
			   }
			 }
			 if(data.tczy.shzy){
				var shzy = data.tczy.shzy;
				vm.map.shzyList = shzy;//赋值给详情页面数据 
				for(var i = 0;i<shzy.length;i++){
				var layers = shzy[i].layerlist;
				for(var k = 0;k<layers.length;k++){
					var marks = layers[k].marklist;
					for(var j=0;j<marks.length;j++){
						var layerid = marks[j].layerid;
						if(templateMap[layerid]){
							yewuMarkUtil.addLayerMark("drawdztc"+layerid+"Layer",templateMap[layerid],marks[j],vm);
						}
					}
				}
			   }
		   }
		   if(data.tczy.ywsj){
			  var ywsj = data.tczy.ywsj;
			  vm.map.ywsjList = ywsj;//赋值给详情页面数据 
			  for(var i = 0;i<ywsj.length;i++){
				var layers = ywsj[i].layerlist;
				for(var k = 0;k<layers.length;k++){
					var marks = layers[k].marklist;
					for(var j=0;j<marks.length;j++){
						var layerid = marks[j].layerid;
						if(templateMap[layerid]){
							yewuMarkUtil.addLayerMark("drawdztc"+layerid+"Layer",templateMap[layerid],marks[j],vm);
						}
					}
				}
			  }
			}
	   }
		 // if(data.dzkk){//电子卡口数据
		 //   for(var i = 0;i<data.dzkk.length;i++){
		 //     addDzkkMark(data.dzkk[i],"drawdzkkLayer");
		 //   }
		   // }
	},
	playVideo(indexcodes){
		if(indexcodes==''){
            return;
		}
		window.location.href = "VideosLiYuan://?method=RealTimeVideo&cameraId=" + indexcodes;
		// var CamList = indexcodes;
		// var param = "btoolpplayerprotocol://ReqType:PlayReal;Language:zh_CN;clear:3;WndCount:9;NginxIp:50.89.34.200;NginxPort:443;UserID:admin;"
		//             +"sg:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6InhhdXRoLWF1dGhjIiwiZXhwIjoxNjA5NzI1MjkzLCJpYXQiOjE2MDQ1NDEyOTMsImp0aSI6ImYzMTNlMGU2YTBkMDRjMDY5ZThhMjM4YjhiZjExNmZiIn0.XB82VQ1wf8qaOL4xf2LEdEjswLxyLKsvC-O9qrE5awU;"
		// 			+"protocol:https;CamList:"+CamList+";";
		// var iframe = document.createElement("iframe");
		// iframe.src = param;
		// iframe.style.display = 'none';
		// document.body.appendChild(iframe);
	},
	hideYewuLayer(vm){
		var map = vm.map.map;
		this.hideLayer("ssjqLayer",vm);
		this.hideLayer("ssjlLayer",vm);
		this.hideLayer("spjkLayer",vm);
		this.hideLayer("dzkkLayer",vm);
		this.hideLayer("lgxxLayer",vm);
		this.hideLayer("lgxxallLayer",vm);
		this.hideLayer("wbxxLayer",vm);
		this.hideLayer("wbxxallLayer",vm);
		this.hideLayer("rlgjLayer",vm);
		//定制图层隐藏
		for(var i in map.graphicsLayerIds){
			if(vm.common.startsWith(map.graphicsLayerIds[i],"dztc")){
				this.hideLayer(map.graphicsLayerIds[i],vm);
			}
		}
	},
	showYewuLayer(vm){
		var map = vm.map.map;
		if(vm.layerObj.jq){
			this.showLayer("ssjqLayer",vm);
		}
		if(vm.layerObj.jl){
			this.showLayer("ssjlLayer",vm);
		}
		if(vm.layerObj.spjk){
			this.showLayer("spjkLayer",vm);
		}
		if(vm.layerObj.dzkk){
			this.showLayer("dzkkLayer",vm);
		}
		this.showLayer("lgxxLayer",vm);
		this.showLayer("lgxxallLayer",vm);
		this.showLayer("wbxxLayer",vm);
		this.showLayer("wbxxallLayer",vm);
		this.showLayer("rlgjLayer",vm);
		//定制图层隐藏
		if(vm.layerObj.dztc){
			for(var i in map.graphicsLayerIds){
				if(vm.common.startsWith(map.graphicsLayerIds[i],"dztc")){
					this.showLayer(map.graphicsLayerIds[i],vm);
				}
			}
		}
	},
	doBufferByDistance(geometry,distance,vm){
		var map = vm.map.map;
		var that = this;
		esriLoader.loadModules([
			"esri/tasks/BufferParameters",
			"esri/tasks/GeometryService",
			"esri/config",
			"esri/geometry/normalizeUtils"
		], {url:Constants.map_base_url}).then(([
			BufferParameters, GeometryService, esriConfig, normalizeUtils]) => {		
			//设置缓冲分析参数
			var params = new BufferParameters();
			params.distances = [distance];
			params.bufferSpatialReference = map.spatialReference;
			params.outSpatialReference = map.spatialReference;
			
			//geometryService的URL
			esriConfig.defaults.geometryService = new GeometryService("http://50.89.33.62:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
			normalizeUtils.normalizeCentralMeridian([geometry]).then(function(normalizedGeometries){
				var normalizedGeometry = normalizedGeometries[0];
				if (normalizedGeometry.type === "polygon") {
					esriConfig.defaults.geometryService.simplify([normalizedGeometry], function(geometries) {
						params.geometries = geometries;
						esriConfig.defaults.geometryService.buffer(params, that.showBuffer, that.showBufferError);
					});
				} else {
					params.geometries = [geometry];
					// esriConfig.defaults.geometryService.buffer(params, that.showBuffer, that.showBufferError);
					esriConfig.defaults.geometryService.buffer(params, function(bufferedGeometries){
						esriLoader.loadModules([
							"esri/symbols/SimpleFillSymbol",
							"esri/symbols/SimpleLineSymbol",
							"dojo/_base/array",
							"esri/Color",
							"esri/graphic"
						], {url:Constants.map_base_url}).then(([
							SimpleFillSymbol, SimpleLineSymbol, array, Color, Graphic]) => {		
							//STYLE_NULL / STYLE_SOLID
							var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL, 
							new SimpleLineSymbol(SimpleLineSymbol.STYLE_SHORTDASH, 
							new Color([0,0,255,0.55]), 3), new Color([98,194,204,0.5]));
				
							array.forEach(bufferedGeometries, function(geometry) {
								var tempLy = map.getLayer("drawLayer");
								var graphic = new Graphic(geometry, symbol,{type:"lineBuffer"});
								tempLy.add(graphic);
								//隐藏选中外对象
								that.drawHandler("POLYLINE",geometry,vm);
								//查询Mark点层
						//			queryResults = getQueryResults(qGeometry,queryLayerIds);
							});
						});
					}, that.showBufferError);
				}	
			});
		});
	},
	/**
	 * 缓冲区分析出错
	 * @param error 错误对象
	 */
	showBufferError(error){
		//alert(error);
	},
	/**
	 * 画定制图层的编辑图层
	 * @param {*} type  图案类型
	 * @param {*} vm    vue this
	 * @param {*} templateobj  模板
	 * @param {*} markinfo   点的信息，cp
	 * @param {*} callback   回调函数
	 */
	drawDztcLayer(type,vm,templateobj,markinfo,callback){
		var that = this;
		esriLoader.loadModules([
			"esri/toolbars/draw"
		], {url:Constants.map_base_url}).then(([Draw
			]) => {
				var map = vm.map.map;
				var drawEndHandler = vm.map.drawEndHandler;
				var fromLayerInfo = vm.map.fromLayerInfo;
				var toolbar = vm.map.toolbar;
				map.infoWindow.hide();
				that.showLayer("hfxmap_graphics",vm);//编辑图层显示
				if(drawEndHandler){
				  drawEndHandler.remove();
				  vm.map.drawEndHandler=null;
				}
				//toolbar绘制注销
				toolbar.deactivate();
				//线样式
		 		var lineSymbol = new esri.symbol.SimpleLineSymbol(
		 			esri.symbol.SimpleLineSymbol.STYLE_SHORTDASH, new dojo.Color([0,0,255,0.55]), 3);
		 		//填充样式
		 		var fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
		 			lineSymbol, new dojo.Color([98,194,204,0.5]));
		 		toolbar.setFillSymbol(fillSymbol);
				toolbar.setLineSymbol(lineSymbol);
				if(type=="TEXT"){
					toolbar.activate(Draw["POINT"]);
				}else{
					toolbar.activate(Draw[type]);
				}
				//获取图层
				var cLayer = map.getLayer("tempLayer");
				if(cLayer == "undefined" || cLayer == null){
					cLayer = new esri.layers.GraphicsLayer({id:"tempLayer"});
					map.addLayer(cLayer);
				}
				cLayer.clear();
				drawEndHandler=toolbar.on("draw-end", function(evt){
					esriLoader.loadModules([
						"esri/symbols/PictureMarkerSymbol",
						"esri/InfoTemplate",
						"esri/toolbars/draw",
						"esri/graphic",
						"esri/symbols/SimpleMarkerSymbol",
						"esri/symbols/SimpleLineSymbol",
						"esri/symbols/SimpleFillSymbol",
						"dojo/colors",
						"esri/symbols/Font",
						"esri/symbols/TextSymbol",
						"dojo/parser" 
					], {url:Constants.map_base_url}).then(([
						PictureMarkerSymbol,InfoTemplate,Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color, Font,TextSymbol,parser]) => {			
							parser.parse();
							drawEndHandler.remove();
					 		vm.map.drawEndHandler = null;
					 		toolbar.deactivate();
					 		var mapPoint;
							var marktype = '1';
							if(type=="POINT"){
								marktype = '1';
								var pointtype = templateobj.pointtype;
								var symbol;
								mapPoint = evt.geometry;
								if(pointtype=="2"){//图片标记
									var pointurl = templateobj.pointurl;
									symbol = new PictureMarkerSymbol(pointurl, 22, 23);
								}else{//纯色标记
									var pointcolor = templateobj.pointcolor;
									if(pointcolor==null){
										pointcolor = "rgba(255,0,0,1)";
									}
									var linesymbol = new esri.symbol.SimpleLineSymbol(
											esri.symbol.SimpleLineSymbol.STYLE_SOLID, dojo.colorFromRgb(pointcolor), 1);
									symbol = new esri.symbol.SimpleMarkerSymbol("STYLE_CIRCLE",14,linesymbol,dojo.colorFromRgb(pointcolor));
								}
								var graphic = new Graphic(mapPoint, symbol, markinfo);
								cLayer.add(graphic);
								that.showInfoWindow(graphic,false,vm);
							}else if(type=="TEXT"){
								marktype = '4';
								mapPoint = evt.geometry;
								var textcolor = templateobj.textcolor;
								if(textcolor==null){
									textcolor = "rgba(255,0,0,1)";
								}
								var textsize = templateobj.textsize;
								if(textsize==null){
									textsize = "20px";
								}else{
									textsize = textsize+"px";
								}
								var font = new Font();
								font.setFamily("宋体");
								font.setSize(textsize);
								var textSymbol = new TextSymbol("文本",font,dojo.colorFromRgb(textcolor));
								var graphic = new Graphic(mapPoint, textSymbol, markinfo);
								cLayer.add(graphic);
								that.showInfoWindow(graphic,false,vm);
							}else if(type=="POLYLINE"){//线
								marktype = '2';
								var linecolor = templateobj.linecolor;
								if(linecolor==null){
									linecolor = "rgba(0, 0, 255,1)";
								}
								var linewidth = templateobj.linewidth;
								if(linewidth==null){
									linewidth = 2;
								}
								var linesymbol = new esri.symbol.SimpleLineSymbol(
										esri.symbol.SimpleLineSymbol.STYLE_SOLID, dojo.colorFromRgb(linecolor), linewidth);
								var graphic = new Graphic(evt.geometry, linesymbol, markinfo);
								cLayer.add(graphic);
								mapPoint=evt.geometry.getExtent().getCenter();
								that.showInfoWindow(graphic,false,vm);
							}else if(type=="POLYGON"){//面
								marktype = '3';
								var polygoncolor = templateobj.polygoncolor;
								if(polygoncolor==null){
									polygoncolor = "rgba(98,194,204,1)";
								}
								var linesymbol = new esri.symbol.SimpleLineSymbol(
										esri.symbol.SimpleLineSymbol.STYLE_SOLID, dojo.colorFromRgb(polygoncolor), 1);
								var fillsymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
										linesymbol,  dojo.colorFromRgb(polygoncolor));
								var graphic = new Graphic(evt.geometry, fillsymbol, markinfo);
								cLayer.add(graphic);
								mapPoint=evt.geometry.getExtent().getCenter();
								that.showInfoWindow(graphic,false,vm);
							}
							callback();
						}).catch (err => {})
				});
			}).catch (err => {})
	},
/**
 * 定制图层打点，画线，画面
 * @param type
 * @param layerid
 * @param templateobj
 */
 addDztcLayerMark(layerid,templateobj,markobj,attributes,vm) {
	 var that = this;
	esriLoader.loadModules([
		"esri/symbols/PictureMarkerSymbol",
		"esri/InfoTemplate",
		"esri/toolbars/draw",
		"esri/graphic",
		"esri/symbols/SimpleMarkerSymbol",
		"esri/symbols/SimpleLineSymbol",
		"esri/symbols/SimpleFillSymbol",
		"dojo/colors",
		"esri/symbols/Font",
		"esri/symbols/TextSymbol",
		"dojo/parser" 
	], {url:Constants.map_base_url}).then(([PictureMarkerSymbol,InfoTemplate,Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color, Font,TextSymbol,parser
		]) => {			
			 //获取图层
			var map = vm.map.map;
			var fromLayerInfo = vm.map.fromLayerInfo;
			var markidmap = vm.map.markidmap;
	 		var cLayer = map.getLayer(layerid);
			if(cLayer == "undefined" || cLayer == null){
				cLayer = that.createLayer(layerid,vm);
				map.addLayer(cLayer);
				mapEvent.registerLayerEvent(layerid,cLayer,vm);
			}
			var markid = markobj.markid;
			var marktype = markobj.marktype;
			var mapPoint;
			attributes.marktype = marktype;
			attributes.markid = markid;
			attributes.layerid = templateobj.layerid;
			if(marktype=="1"){//点
                attributes.pointtype = templateobj.pointtype;
				var pointtype = templateobj.pointtype;
				var symbol;
				if(!markobj.loc||!markobj.loc.x){
					return;
				}
				attributes.loc = markobj.loc;
				var lx = parseFloat(markobj.loc.x);
				var ly = parseFloat(markobj.loc.y);
				mapPoint = new esri.geometry.Point(lx, ly, map.spatialReference);
				if(fromLayerInfo.xml.layerType == "realmap"){
					mapPoint = mapUtil.pointToPoint25(fromLayerInfo,lx,ly);
				}
                if(fromLayerInfo.xml.layerType=="gaode"){
			        mapPoint=mapUtil.ELatLng2EPoint(fromLayerInfo,lx,ly);
		        }
				var graphic;
				if(pointtype=="2"){//图片标记
					if(!attributes.size_x){
						attributes.size_x = 22;
					}
					if(!attributes.size_y){
						attributes.size_y = 23;
					}
					var pointurl = templateobj.pointurl;
					if(pointurl==null){
						pointurl = "/jczh/map/images/point.png";
					}
					symbol = new PictureMarkerSymbol(pointurl, attributes.size_x, attributes.size_y);
				}else{//纯色标记
                    attributes.size = 15;
					var pointcolor = templateobj.pointcolor;
					if(pointcolor==null){
						pointcolor = "rgba(255,0,0,1)";
					}
					var linesymbol = new esri.symbol.SimpleLineSymbol(
				 			esri.symbol.SimpleLineSymbol.STYLE_SOLID, dojo.colorFromRgb(pointcolor), 1);
					symbol = new esri.symbol.SimpleMarkerSymbol("STYLE_CIRCLE",15,linesymbol,dojo.colorFromRgb(pointcolor));
				}
				graphic = new Graphic(mapPoint, symbol, attributes);
				if(markidmap[layerid]){
					if(markidmap[layerid][markid]){
						//存在点重新打点
						var pointGraphic = markidmap[layerid][markid];
						pointGraphic.setGeometry(graphic.geometry);
						pointGraphic.setSymbol(graphic.symbol);
					}else{
						cLayer.add(graphic);
					}
				}else{
					cLayer.add(graphic);
				}
			}else if(marktype=="4"){//文字
				if(!markobj.loc||!markobj.loc.x){
					return;
				}
				var lx = parseFloat(markobj.loc.x);
				var ly = parseFloat(markobj.loc.y);
				mapPoint = new esri.geometry.Point(lx, ly, map.spatialReference);
				if(fromLayerInfo.xml.layerType == "realmap"){
					mapPoint = mapUtil.pointToPoint25(fromLayerInfo,lx,ly);
				}
                if(fromLayerInfo.xml.layerType=="gaode"){
			        mapPoint=mapUtil.ELatLng2EPoint(fromLayerInfo,lx,ly);
		        }
				var textcolor = templateobj.textcolor;
				if(textcolor==null){
					textcolor = "rgba(255,0,0,1)";
				}
				var textsize = templateobj.textsize;
				if(textsize==null){
					textsize = "20px";
				}else{
					textsize = textsize+"px";
				}
                attributes.textsize = textsize;
				var font = new Font();
				font.setFamily("宋体");
				font.setSize(textsize);
				var textSymbol = new TextSymbol(markobj.markname,font,dojo.colorFromRgb(textcolor));
				graphic = new Graphic(mapPoint, textSymbol, attributes);
				if(markidmap[layerid]){
					if(markidmap[layerid][markid]){
						//存在点重新打点
						var pointGraphic = markidmap[layerid][markid];
						pointGraphic.setGeometry(graphic.geometry);
						pointGraphic.setSymbol(graphic.symbol);
					}else{
						cLayer.add(graphic);
					}
				}else{
					cLayer.add(graphic);
				}
			}else if(marktype=="2"){//线
				if(!markobj.locinfo){
					return;
				}
				var linecolor = templateobj.linecolor;
				if(linecolor==null){
					linecolor = "rgba(0, 0, 255,1)";
				}
				var linewidth = templateobj.linewidth;
				if(linewidth==null){
					linewidth = 2;
				}
                attributes.linewidth = linewidth;
				var linesymbol = new esri.symbol.SimpleLineSymbol(
			 			esri.symbol.SimpleLineSymbol.STYLE_SOLID, dojo.colorFromRgb(linecolor), linewidth);
				var locinfo = JSON.parse(markobj.locinfo);
				var points = locinfo.points;
				var xian = new esri.geometry.Polyline(map.spatialReference);
				xian.paths[0] = points;
				if(fromLayerInfo.xml.layerType == "realmap"){
					xian = mapUtil.polylineToPolyline25(fromLayerInfo,xian);
				}
                if(fromLayerInfo.xml.layerType == "gaode"){
					xian = mapUtil.polylineToPolylineGaode(fromLayerInfo,xian);
				}
				graphic = new Graphic(xian, linesymbol, attributes);
				if(markidmap[layerid]){
					if(markidmap[layerid][markid]){
						//存在点重新打点
						var pointGraphic = markidmap[layerid][markid];
						pointGraphic.setGeometry(graphic.geometry);
						pointGraphic.setSymbol(graphic.symbol);
					}else{
						cLayer.add(graphic);
					}
				}else{
					cLayer.add(graphic);
				}
			}else if(marktype=="3"){//面
				if(!markobj.locinfo){
					return;
				}
				var polygoncolor = templateobj.polygoncolor;
				if(polygoncolor==null){
					polygoncolor = "rgba(98,194,204,0.5)";
				}
				var linesymbol = new esri.symbol.SimpleLineSymbol(
			 			esri.symbol.SimpleLineSymbol.STYLE_SOLID, dojo.colorFromRgb(polygoncolor), 1);
				var fillsymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
						linesymbol, dojo.colorFromRgb(polygoncolor));
				var locinfo = JSON.parse(markobj.locinfo);
				var points = locinfo.points;
				var mian = new esri.geometry.Polygon(map.spatialReference);
				mian.rings[0] = points;
				if(fromLayerInfo.xml.layerType == "realmap"){
					mian = mapUtil.polygonToPolygon25(fromLayerInfo,mian);
				}
                if(fromLayerInfo.xml.layerType == "gaode"){
					mian = mapUtil.polygonToPolygonGaode(fromLayerInfo,mian);
				}
				graphic = new Graphic(mian, fillsymbol, attributes);
				if(markidmap[layerid]){
					if(markidmap[layerid][markid]){
						//存在点重新打点
						var pointGraphic = markidmap[layerid][markid];
						pointGraphic.setGeometry(graphic.geometry);
						pointGraphic.setSymbol(graphic.symbol);
					}else{
						cLayer.add(graphic);
					}
				}else{
					cLayer.add(graphic);
				}
			}
			
			if(markidmap[layerid]){
				markidmap[layerid][markid] = graphic;
			}else{
				markidmap[layerid] = {};
				markidmap[layerid][markid] = graphic;
			}
		}).catch (err => {})
	},

/**
 * 热力图图层
 * @param dataArray
 */
createHeatmapLayer(layerid,dataArray,vm){
	esriLoader.loadModules([
		"esri/InfoTemplate",
		"esri/layers/FeatureLayer",
		"esri/map",
		"esri/geometry/Point", 
		"esri/graphic",
		"esri/renderers/HeatmapRenderer",
		"esri/SpatialReference",
		"esri/symbols/PictureMarkerSymbol",
		"dojo/domReady!" 
	    ], {url:Constants.map_base_url}).then(([InfoTemplate, FeatureLayer, Map, Point, Graphic, HeatmapRenderer, SpatialReference, PictureMarkerSymbol
		]) => {
		var map = vm.map.map;
		var heatmapLayer = map.getLayer(layerid);
		if(heatmapLayer){
			map.removeLayer(heatmapLayer);
		}
		var fromLayerInfo = vm.map.fromLayerInfo;
		var heatmapDataArray = [];
		for (var i = 0; i < dataArray.length; i++){
			if(!dataArray[i].loc){
				continue;
			}
			var pt = new esri.geometry.Point(dataArray[i].loc.x, dataArray[i].loc.y, map.spatialReference);
			if(fromLayerInfo.xml.layerType=="realmap"){
				pt = mapUtil.pointToPoint25(fromLayerInfo,pt.x,pt.y);
			}else if(fromLayerInfo.xml.layerType=="gaode"){
				pt = mapUtil.ELatLng2EPoint(fromLayerInfo,pt.x,pt.y); 
			}
			var currentItem = {
				id: layerid+"_id_" + "$" + i,
				X: pt.x,
				Y: pt.y
			};
			var symbol = new PictureMarkerSymbol("/jczh/map/images/point.png", 20, 20);
			var g = new Graphic(pt, symbol, currentItem, null);
			heatmapDataArray.push(g);
		}
		var heatmapFeatureLayer;//热力图渲染图层对象
		//定义图层
		var layerDefinition = {
			"geometryType": "esriGeometryPoint",
			"objectIdField": "ObjectID",
			"drawingInfo": {
				"renderer": {
					"type": "simple",
					"symbol": {
						"type": "esriPMS",
						"url": "/jczh/map/images/point.png",
						"contentType": "image/png",
						"width": 15,
						"height": 15
					}
				}
			},
			"fields": [{
				"name": "ObjectID",
				"aliase3": "ObjectID",
				"type": "esriFieldTypeOID",
				"editable": false,
				"domain": null
			}],
			"types": [],
			"capabilities": "Query"
		};
		
		//要素集合
		var featureCollection = {
			layerDefinition: layerDefinition,
			featureSet: {
				"features": [],
				"geometryType": "esriGeometryPoint"
			}
		};
		
		//热力图层参数设置
		var heatmapFeatureLayerOptions = {
			mode: FeatureLayer.MODE_ONDEMAND,//模式设置：MODE_AUTO、MODE_ONDEMAND、MODE_SELECTION、MODE_SNAPSHOT
			infoTemplate: "",//信息弹窗模板
			outFields: [//图层字段数组
				"*"
			]
		};
		
		//创建热力图层
		heatmapFeatureLayer = new FeatureLayer(featureCollection, heatmapFeatureLayerOptions);
		heatmapFeatureLayer.id = layerid;
		//自定义热力图渲染参数
		var heatmapRenderer = new HeatmapRenderer({
            blurRadius: 6, //模糊半径
			colorStops: [ //不同比率，颜色参数设置
				{ ratio: 0.0, color: "rgba(141, 138, 246,0)" },
				// { ratio: 0.1, color: "rgb(85, 235, 66)" },
				{ ratio: 0.2, color: "rgba(141, 138, 246,100)" },
				// { ratio: 0.3, color: "rgb(222, 248, 25,0.5)" },
				{ ratio: 0.40, color: "rgba(103, 249, 219,100)" },
				// { ratio: 0.5, color: "rgb(250, 0, 0,0.5)"},
				{ ratio: 0.60, color: "rgba(89, 250, 78,100)" },
				// { ratio: 0.7, color: "rgb(248, 152, 21)"},
				{ ratio: 0.850, color: "rgba(249, 251, 10,100)"},
				{ ratio: 0.9961, color: "rgba(253, 16, 0,100)"}
			],
			maxPixelIntensity: 3,//最大像素密度
			minPixelIntensity: 0 //最小像素密度
            
// 			blurRadius: 4, //模糊半径
// 			colorStops: [ //不同比率，颜色参数设置
// //				{ ratio: 0, color: "rgba(250, 0, 0, 0)" },
// //                { ratio: 0.1, color: "rgb(85, 235, 66)" },
// //                { ratio: 0.6, color: "rgb(222, 248, 25)" },
// //				{ ratio: 0.7, color: "rgb(248, 152, 21)"},
// //				{ ratio: 0.8, color: "rgb(250, 0, 0)"}
//                { ratio: 0, color: "rgba(85, 235, 66, 0)" },
//                { ratio: 0.2, color: "rgb(85, 235, 66,0.5)" },
//                { ratio: 0.3, color: "rgb(222, 248, 25,0.5)" },
// 				{ ratio: 0.4, color: "rgb(248, 152, 21,0.5)"},
// 				{ ratio: 0.5, color: "rgb(250, 0, 0,0.5)"}
// 			],
// 			maxPixelIntensity: 50,//最大像素密度
// 			minPixelIntensity: 0 //最小像素密度
		});
		heatmapFeatureLayer.setRenderer(heatmapRenderer);
		for (var i = 0; i < heatmapDataArray.length; i++) {
			heatmapFeatureLayer.add(heatmapDataArray[i]);
		}
        
		//把热力图图层加载到地图窗口中
		vm.map.layeridmap[layerid] = heatmapFeatureLayer;
		map.addLayer(heatmapFeatureLayer);
	});
},
/**
 * 添加点聚合
 * @param layerId
 * @param clusterdataArrary
 */
addCluster(layerId,clusterdataArrary,vm,type){
	esriLoader.loadModules([
		"dojo/parser", 
		"dojo/ready",
		"dojo/_base/array",
		"esri/Color",
		"dojo/dom-style",
		"dojo/query",
		"esri/map", 
		"esri/request",
		"esri/graphic",
		"esri/geometry/Extent",
		"esri/symbols/SimpleMarkerSymbol",
		"esri/symbols/SimpleFillSymbol",
		"esri/symbols/PictureMarkerSymbol",
		"esri/renderers/ClassBreaksRenderer",
		"esri/layers/GraphicsLayer",
		"esri/SpatialReference",
		"esri/dijit/PopupTemplate",
		"esri/geometry/Point",
		"esri/geometry/webMercatorUtils",
		"esri/layers/ClusterLayer",
		"dijit/layout/BorderContainer", 
	    "dijit/layout/ContentPane", 
	    "dojo/domReady!" 
	], {url:Constants.map_base_url}).then(([parser, ready, arrayUtils, Color, domStyle, query,
		Map, esriRequest, Graphic, Extent,
		SimpleMarkerSymbol, SimpleFillSymbol, PictureMarkerSymbol, ClassBreaksRenderer,
		GraphicsLayer, SpatialReference, PopupTemplate, Point, webMercatorUtils,ClusterLayer
		]) => {
		var map = vm.map.map;
		var fromLayerInfo = vm.map.fromLayerInfo;
		if(clusterdataArrary==null||clusterdataArrary.length==0){
			return;
		}
		parser.parse();
		domStyle.set(query("a.action.zoomTo")[0], "display", "none");
		var dataInfo = {};
		var clusterarr = [];
		for(var i=0;i<clusterdataArrary.length;i++){
			if(!clusterdataArrary[i].loc){
				continue;
			}
			var p = clusterdataArrary[i];
			var locationX = p.loc.x;
			var locationY = p.loc.y;
			if(locationX==null||locationY==null){
				continue;
			}
			var latlng = new  Point(parseFloat(p.loc.x), parseFloat(p.loc.y), map.spatialReference);
			if(fromLayerInfo.xml.layerType == "realmap"){
				latlng = mapUtil.pointToPoint25(fromLayerInfo,locationX,locationY);
			}
			if(fromLayerInfo.xml.layerType=="gaode"){
				latlng = mapUtil.ELatLng2EPoint(fromLayerInfo,locationX,locationY);
			}
			var clusterObj = {};
			if(p.gpsid){
				clusterObj.id = p.gpsid;
			}else{
				clusterObj.id = p.id;
			}
			clusterObj.x = latlng.x;
			clusterObj.y = latlng.y;
			clusterObj.attributes = p;
       
			this.showClusterInfoWindow(clusterObj,type);
			this.getImageByDataType(clusterObj.attributes,type);

			clusterarr.push(clusterObj);
		}
		dataInfo.data = clusterarr;
		if(map.getLayer(layerId)){
			map.removeLayer(map.getLayer(layerId));
		}
		var clusterLayer = new ClusterLayer({
			"data": dataInfo.data,
			"distance": 100,
			"id": layerId,
			"labelColor": "#fff",
			"labelOffset": 10,
			"resolution": map.extent.getWidth() / map.width,
			"singleColor": "#888",
			'spatialReference': map.spatialReference
		});
		var defaultSym = new SimpleMarkerSymbol().setSize(4);
		var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");
		var blue = new PictureMarkerSymbol(require("@/assets/map/Shapes/BluePin1LargeB.png"), 45, 45).setOffset(0, 15);
		var green = new PictureMarkerSymbol(require("@/assets/map/Shapes/GreenPin1LargeB.png"), 45, 45).setOffset(0, 15);
		var red = new PictureMarkerSymbol(require("@/assets/map/Shapes/RedPin1LargeB.png"), 45, 45).setOffset(0, 15);
		var defaultSymbol = blue;
		if(type){
			// var tempData = this.getImageByDataType(dataInfo.data[0].attributes,type);
			var defaultSymbol = new PictureMarkerSymbol(dataInfo.data[0].attributes.iconurl,dataInfo.data[0].attributes.size_x,dataInfo.data[0].attributes.size_y);
		}
		renderer.addBreak(0, 1, defaultSymbol);
		renderer.addBreak(1, 2, blue);
		renderer.addBreak(2, 200, green);
		renderer.addBreak(200, 1001, red);
		
		clusterLayer.setRenderer(renderer);
		map.addLayer(clusterLayer);
	});
},

getImageByDataType(data,dataType){
	if(dataType=="ssjq"){
		data.size_x=23;
        data.size_y=32;
		if(data.jjlxdm=='1'){//违法犯罪
			if(data.state=='0'){
				data.iconurl = require("./../../../assets/jq/icon_110_wqs.png");
			}else if(data.state=='1'){
				data.iconurl = require("./../../../assets/jq/icon_110_yqs.png");
			}else if(data.state=='2'){
				data.iconurl = require("./../../../assets/jq/icon_110_ydd.png");
			}else if(data.state=='3'){
				data.iconurl = require("./../../../assets/jq/icon_110_ywc.png");
			}else{
				data.iconurl = require("./../../../assets/jq/icon_110_wqs.png");
			}
		  }else if(data.jjlxdm=='2'){//交通
			if(data.state=='0'){
				data.iconurl = require("./../../../assets/jq/icon_122_wqs.png");
			}else if(data.state=='1'){
				data.iconurl = require("./../../../assets/jq/icon_122_yqs.png");
			}else if(data.state=='2'){
				data.iconurl = require("./../../../assets/jq/icon_122_ydd.png");
			}else if(data.state=='3'){
				data.iconurl = require("./../../../assets/jq/icon_122_ywc.png");
			}else{
				data.iconurl = require("./../../../assets/jq/icon_122_wqs.png");
			}
		  }else if(data.jjlxdm=='3'){//火灾
			if(data.state=='0'){
				data.iconurl = require("./../../../assets/jq/icon_119_wqs.png");
			}else if(data.state=='1'){
				data.iconurl = require("./../../../assets/jq/icon_119_yqs.png");
			}else if(data.state=='2'){
				data.iconurl = require("./../../../assets/jq/icon_119_ydd.png");
			}else if(data.state=='3'){
				data.iconurl = require("./../../../assets/jq/icon_119_ywc.png");
			}else{
				data.iconurl = require("./../../../assets/jq/icon_119_wqs.png");
			}
		  }else{
			if(data.state=='0'){//其他
				data.iconurl = require("./../../../assets/jq/jqmark_other_wqs.png");
			}else if(data.state=='1'){
				data.iconurl = require("./../../../assets/jq/jqmark_other_yqs.png");
			}else if(data.state=='2'){
				data.iconurl = require("./../../../assets/jq/jqmark_other_ydd.png");
			}else if(data.state=='3'){
				data.iconurl = require("./../../../assets/jq/jqmark_other_ywc.png");
			}else{
				data.iconurl = require("./../../../assets/jq/jqmark_other_wqs.png");
			}
		  }
	}else if(dataType=="ssjl"){
		 data.size_x = data.x;
		 data.size_y = data.y;
		 if(data.online=="1"){
			data.iconurl = Constants.gps_prefix+data.gpsonlineurl;
		 }else{
			data.iconurl = Constants.gps_prefix+data.gpsnoonlineurl; 
		 }
	}
	// return data;
},

}