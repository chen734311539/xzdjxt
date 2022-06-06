import markUtil from './markUtil'
import mapUtil from './mapUtil'
export default{
    registerLayerEvent(layerid,layer,vm){
        this.registerLayerClickEvent(layerid,layer,vm);
        this.registerLayerHoverEvent(layer);
    },
    registerLayerClickEvent(layerid,layer,vm) {
        dojo.connect(layer, "onClick", function(evt){
            var needHide = true;
            if(evt.graphic.geometry.type=="polygon"){//面，并且在编辑的时候不隐藏，修改画面时
                 var obj  = vm.map.editToolbar.getCurrentState();
                 if(obj.graphic){//有正在修改的，不隐藏
                    needHide = false;
                 }
            }
            if(needHide){
                markUtil.hideLayer("hfxmap_graphics",vm);//编辑图层隐藏
            }
            //隐藏IndoWindow
            vm.map.map.infoWindow.hide();
            var graphic = evt.graphic;
            markUtil.showInfoWindow(graphic,true,vm);
        });
    },
    registerLayerHoverEvent(layer){
        dojo.connect(layer, "onMouseOver", function(evt){
            var g = evt.graphic;
            var geometry = g.geometry;
            var type = geometry.type;
            var symbol = g.symbol;
            var attr = g.attributes;
            if(!attr){
                return;
            }
            if(type=="point"){
                if(symbol.type == "picturemarkersymbol"){
                    if(attr["size_x"]){
                        symbol.width = parseFloat(attr["size_x"])*1.3;
                        symbol.height = parseFloat(attr["size_y"])*1.3;
                        g.setSymbol(symbol);
                    }
                }else if(symbol.type == "textsymbol"){
                    if(attr.textsize){
                        var textsize = attr.textsize;
                        var font = symbol.font;
                        font.size = parseFloat(textsize)*1.3;
                        symbol.setFont(font);
                        g.setSymbol(symbol);
                    }
                }else if(symbol.type == "simplemarkersymbol"){
                    
                }
            }else if(type=="polyline"){//线
                if(attr.linewidth){
                    var linewidth = attr.linewidth;
                    symbol.width=parseFloat(linewidth)*1.5;
                    g.setSymbol(symbol);
                }
            }
        });
        
        dojo.connect(layer, "onMouseOut", function(evt){
            var g = evt.graphic;
            var symbol = g.symbol;
            var attr = g.attributes;
            var geometry = g.geometry;
            var type = geometry.type;
            if(!attr){
                return;
            }
            if(type=="point"){
                if(symbol.type == "picturemarkersymbol"){
                    if(attr["size_x"]){
                        symbol.width = parseFloat(attr["size_x"]);
                        symbol.height = parseFloat(attr["size_y"]);
                        g.setSymbol(symbol);
                    }
                }else if(symbol.type == "textsymbol"){
                    if(attr.textsize){
                        var textsize = attr.textsize;
                        var font = symbol.font;
                        font.size = parseFloat(textsize);
                        symbol.setFont(font);
                        g.setSymbol(symbol);
                    }
                }else if(symbol.type == "simplemarkersymbol"){
                    
                }
            }else if(type=="polyline"){//线
                if(attr.linewidth){
                    var linewidth = attr.linewidth;
                    symbol.width=parseFloat(linewidth);
                    g.setSymbol(symbol);
                }
            }
        });
    },
    zoomEndEventHandler(evt){//地图缩放结束事件
        // reflashMapLabel(null);
        // showMapLabel();
        // showXqLayerByLevel();//根据地图层级显示相应的辖区
        // showHeatMapJqPoint();
        // try{
        //     spjkCurrentView();//视频监控当前视野
        // }catch(e){}
    },
    panEventHandler(evt){//地图拉动事件
        // yewuMarkUtil.reflashMapLabel(evt);
    },
    mouseDragStartEventHandler(evt){//地图拉动开始事件
        // ismousedrag = true;
        // panxmaxStart = map.extent.xmax;
        // panymaxStart = map.extent.ymax;
        // panStartTime = new Date().getTime();
    },
    panEndEventHandler(evt){//地图拉动结束事件
        // showHeatMapJqPoint();//
        // var widthStr = $(map.infoWindow.domNode.childNodes[0].childNodes[1]).css("width");
        // var width = eval(widthStr.substring(0, widthStr.length - 2));
        // var heightStr = $(map.infoWindow.domNode.childNodes[0].childNodes[1]).css("height");
        // var height = eval(heightStr.substring(0, heightStr.length - 2));
        // map.infoWindow.resize(width, height);
        // if(ismousedrag){
        //     ismousedrag = false;
        //     var xminEnd = evt.extent.xmin;
        //     var xmaxEnd = evt.extent.xmax;
        //     var yminEnd = evt.extent.ymin;
        //     var ymaxEnd = evt.extent.ymax;
        //     var xc = xmaxEnd-xminEnd;
        //     var yc = ymaxEnd-yminEnd;
        //     var panendtime = new Date().getTime()-panStartTime;
        //     if(panendtime>500){
        //         return;
        //     }
        //     var vx = (xmaxEnd-panxmaxStart)/panendtime;
        //     var vy = (ymaxEnd-panymaxStart)/panendtime;
        //     //暂定滑动时间20毫秒
        //     var distincex = vx*15;
        //     var distincey = vy*15;
        //     var xmax=xmaxEnd,ymax=ymaxEnd;
        //     xmax = xmax+distincex;
        //     ymax = ymax+distincey;
        //     var centerx = xmax-xc/2;
        //     var centery = ymax-yc/2;
        //     map.centerAt(new esri.geometry.Point(centerx,centery,map.spatialReference));
        // }
    },
    zoomStartEventHandler(evt){//地图缩放开始事件
        // hideMapLabel();
    }
}