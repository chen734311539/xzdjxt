export default{
    TiledLayerInit(){
        var that = this;
        dojo.declare("TiledLayer", esri.layers.TiledMapServiceLayer, {
            constructor: function(layerInfo) {
                this.id = layerInfo.layerid;
                if(layerInfo.zj=='1'){
                    this.url = layerInfo.urlzjpattern;
                    layerInfo.zj = '0';
                }else{
                    this.url = layerInfo.urlpattern;
                }
                if(layerInfo.isbasemap=='-1'){//路况图层
                    this.url = this.url+'&_dc='+new Date().getTime();
                }
                this.bigchangelevel = layerInfo.bigchangelevel;
                this.bigchangeurlpattern = layerInfo.bigchangeurlpattern;
                this.smallchangelevel = layerInfo.smallchangelevel;
                this.smallchangeurlpattern = layerInfo.smallchangeurlpattern;
                this.className = layerInfo.xml.layerType;
                this.spatialReference = new esri.SpatialReference({wkid: layerInfo.xml.tileInfo_wkid});
                this.fullExtent = new esri.geometry.Extent(
                    layerInfo.xml.fullExtent_xmin, 
                    layerInfo.xml.fullExtent_ymin, 
                    layerInfo.xml.fullExtent_xmax, 
                    layerInfo.xml.fullExtent_ymax, 
                    this.spatialReference);
                this.initialExtent = new esri.geometry.Extent(
                    layerInfo.xml.initialExtent_xmin, 
                    layerInfo.xml.initialExtent_ymin, 
                    layerInfo.xml.initialExtent_xmax, 
                    layerInfo.xml.initialExtent_ymax, 
                    this.spatialReference);
                var lods = that.getLods(this.className);
                this.tileInfo = new esri.layers.TileInfo({
                    "rows": 256,
                    "cols": 256,
                    "format" : "PNG24",
                    "origin": {"x": layerInfo.xml.tileInfo_origin_x, "y": layerInfo.xml.tileInfo_origin_y},
                    "spatialReference": {"wkid": this.spatialReference.wkid},
                    "lods": lods
                });
                this.loaded = true;
                this.onLoad(this);
            },
        
            getTileUrl: function(level, row, col) {
                var cururl = this.url;
                var tileUrl = "";
                var layerType = this.className;
                var bigchangelevel = this.bigchangelevel;
                var bigchangeurlpattern = this.bigchangeurlpattern;
                var smallchangelevel = this.smallchangelevel;
                var smallchangeurlpattern = this.smallchangeurlpattern;
                if(bigchangelevel!=null&&bigchangelevel!=undefined&&bigchangelevel!=""){
                    if(level>=bigchangelevel){
                        cururl = bigchangeurlpattern;
                    }
                }
                if(smallchangelevel!=null&&smallchangelevel!=undefined&&smallchangelevel!=""){
                    if(level<=smallchangelevel){
                        cururl = smallchangeurlpattern;
                    }
                }
                switch (layerType) {
                case "tdt":
                    tileUrl = cururl.replace('{2}',col).replace('{1}',row).replace('{0}',level);
                    break;
                case "yst":
                    tileUrl = cururl + level + "/" + row + "/" + col;
                    break;
                case "pgis":
                case "baidu":
                    tileUrl = cururl + "L" + dojo.string.pad(level, 2, '0') + "/" +
                        "R" + dojo.string.pad(row.toString(16), 8, '0') + "/" +
                        "C" + dojo.string.pad(col.toString(16), 8, '0') + ".png";
                    break;
                case "realmap":
                    tileUrl = cururl + "png" + (7 - level) + "/" + col + "," + row + ".jpg";
                    break;
                case "bsyx":
                case "dl":
                    tileUrl = cururl + level + "/" + row + "/" + col;
                    break;
                case "edushi":
                    col = col - 48 * Math.pow(2, level);
                    row = row - 48 * Math.pow(2, level);
                    
                    tileUrl = cururl + "png" + (3 - level) + "/" + col + "," + row + ".png";
                    break;
                case "gaode":
                    tileUrl = cururl.replace("{level}",level).replace("{row}",row).replace("{col}",col);
                    break;
                }
                return tileUrl;
            }
        });
    },
    /**
 * 获取图层的lods信息
 */
getLods(layerType){
    var lods = new Array();

    var pgisLods = [
        {"level": 0, "scale": 288895.27714399999, "resolution": 0.00073324271651485824},
        {"level": 1, "scale": 144447.638572, "resolution": 0.00036662135825742912},  
        {"level": 2, "scale": 72223.819285999998, "resolution": 0.00018331067912871456},
        {"level": 3, "scale": 36111.909642999999, "resolution": 9.165533956435728e-005},
        {"level": 4, "scale": 18055.954822, "resolution": 4.5827669783447685e-005},  
        {"level": 5, "scale": 9027.9774109999998, "resolution": 2.2913834891723843e-005},
        {"level": 6, "scale": 4513.9887049999998, "resolution": 1.1456917444592874e-005},
        {"level": 7, "scale": 2256.994353, "resolution": 5.728458723565484e-006}, 
        {"level": 8, "scale": 1128.497176, "resolution": 2.8642293605136961e-006}
    ];
    var tdtLods = [
        { "level": 0, "resolution": 1.4062500, "scale": 590995197.14166915 },
        { "level": 1, "resolution": 0.7031250, "scale": 295497598.57083458 },
        { "level": 2, "resolution": 0.3515625, "scale": 147748796.52937502 },
        { "level": 3, "resolution": 0.17578125, "scale": 73874398.264687508 },
        { "level": 4, "resolution": 0.087890625, "scale": 36937199.132343754 },
        { "level": 5, "resolution": 0.0439453125, "scale": 18468599.566171877 },
        { "level": 6, "resolution": 0.02197265625, "scale": 9234299.7830859385 },
        { "level": 7, "resolution": 0.010986328125, "scale": 4617149.8915429693 },
        { "level": 8, "resolution": 0.0054931640625, "scale": 2308574.9457714846 },
        { "level": 9, "resolution": 0.00274658203125, "scale": 1154287.4728857423 },
        { "level": 10, "resolution": 0.001373291015625, "scale": 577143.73644287116 },
        { "level": 11, "resolution": 0.0006866455078125, "scale": 288571.86822143558 },
        { "level": 12, "resolution": 0.00034332275390625, "scale": 144285.93411071779 },
        { "level": 13, "resolution": 0.000171661376953125, "scale": 72142.967055358895 },
        { "level": 14, "resolution": 8.58306884765625e-005, "scale": 36071.483527679447 },
        { "level": 15, "resolution": 4.291534423828125e-005, "scale": 18035.741763839724 },
        { "level": 16, "resolution": 2.1457672119140625e-005, "scale": 9017.8708819198619 },
        { "level": 17, "resolution": 1.0728836059570313e-005, "scale": 4508.9354409599309 },
        { "level": 18, "resolution": 5.3644180297851563e-006, "scale": 2254.4677204799655 },
        { "level": 19, "resolution": 2.6822090649253473e-006, "scale": 1127.2338812669166 },
        { "level": 20, "resolution": 1.3411045324626736e-006, "scale": 563.61694063345828 }
    ];
    var ystLods = [
        {"level": 0, "resolution": 0.00118973050291514, "scale": 500000},
        {"level": 1, "resolution": 5.9486525145757E-4, "scale": 250000},
        {"level": 2, "resolution": 2.97432625728785E-4, "scale": 125000},
        {"level": 3, "resolution": 1.5228550437313792E-4, "scale": 64000},
        {"level": 4, "resolution": 7.614275218656896E-5, "scale": 32000},
        {"level": 5, "resolution": 3.807137609328448E-5, "scale": 16000},
        {"level": 6, "resolution": 1.903568804664224E-5, "scale": 8000},
        {"level": 7, "resolution": 9.51784402332112E-6,"scale": 4000},
        {"level": 8, "resolution": 4.75892201166056E-6, "scale": 2000},
        {"level": 9, "resolution": 2.37946100583028E-6, "scale": 1000}
    ];
    var realmapLods = [
        {"level": 0, "scale": 362834.76096, "resolution": 128},
        {"level": 1, "scale": 181417.38048, "resolution": 64},
        {"level": 2, "scale": 90708.69024, "resolution": 32},
        {"level": 3, "scale": 45354.34512, "resolution": 16},
        {"level": 4, "scale": 22677.17256, "resolution": 8},
        {"level": 5, "scale": 11338.58628, "resolution": 4},
        {"level": 6, "scale": 5669.29314, "resolution": 2},
        {"level": 7, "scale": 2834.64657, "resolution": 1}
    ];
    var edushiLods = [
        {"level": 0, "scale": 22677.17256, "resolution": 8},
        {"level": 1, "scale": 11338.58628, "resolution": 4},
        {"level": 2, "scale": 5669.29314, "resolution": 2},
        {"level": 3, "scale": 2834.64657, "resolution": 1}
    ];
    var baiduLods = [
        {"level": 0, "scale": 125246.31, "resolution": 0.00029801871076913099},
        {"level": 1, "scale": 62623.150000000001, "resolution": 0.00014900934348726047},
        {"level": 2, "scale": 31311.580000000002, "resolution": 7.4504683640935261e-005},
        {"level": 3, "scale": 15655.790000000001, "resolution": 3.725234182046763e-005},
        {"level": 4, "scale": 7827.8900000000003, "resolution": 1.8626159012928788e-005},
        {"level": 5, "scale": 3913.9499999999998, "resolution": 9.3130914037694211e-006}
    ];
    
    var gaodelods =[{"level" : 3,"resolution" : 19567.8792409999,"scale" : 73957190.948944},
                    {"level" : 4,"resolution" : 9783.93962049996,"scale" : 36978595.474472},
                    {"level" : 5,"resolution" : 4891.96981024998,"scale" : 18489297.737236},
                    {"level" : 6,"resolution" : 2445.98490512499,"scale" : 9244648.868618},
                    {"level" : 7,"resolution" : 1222.99245256249,"scale" : 4622324.434309}, 
                    {"level" : 8,"resolution" : 611.49622628138,"scale" : 2311162.217155}, 
                    {"level" : 9,"resolution" : 305.748113140558,"scale" : 1155581.108577}, 
                    {"level" : 10,"resolution" : 152.874056570411,"scale" : 577790.554289},
                    {"level" : 11,"resolution" : 76.4370282850732,"scale" : 288895.277144}, 
                    {"level" : 12,"resolution" : 38.2185141425366,"scale" : 144447.638572},
                    {"level" : 13,"resolution" : 19.1092570712683,"scale" : 72223.819286},
                    {"level" : 14,"resolution" : 9.55462853563415,"scale" : 36111.909643},
                    {"level" : 15,"resolution" : 4.77731426794937,"scale" : 18055.954822},
                    {"level" : 16,"resolution" : 2.38865713397468,"scale" : 9027.977411},
                    {"level" : 17,"resolution" : 1.19432856685505,"scale" : 4513.988705}, 
                    {"level" : 18,"resolution" : 0.597164283559817,"scale" : 2256.994353
    }];
    var dllods =[
                    {"level" : 0,"resolution" : 0.007324248677569646,"scale" : 3078112.5051528},
                    {"level" : 1,"resolution" : 0.0036621243387847946,"scale" : 1539056.2525763882},
                    {"level" : 2,"resolution" : 0.0018310621693923973,"scale" : 769528.1262881941},
                    {"level" : 3,"resolution" : 9.155310846962366E-4,"scale" : 384764.063144113},
                    {"level" : 4,"resolution" : 4.5776792180907984E-4,"scale" : 192383.0315720379}, 
                    {"level" : 5,"resolution" : 2.288827711740844E-4,"scale" : 96191.01578603887}, 
                    {"level" : 6,"resolution" : 1.144413855870422E-4,"scale" : 48095.507893019436}, 
                    {"level" : 7,"resolution" : 5.72206927935211E-5,"scale" : 24047.753946509718},
                    {"level" : 8,"resolution" : 2.861034639671392E-5,"scale" : 12023.876973235261}, 
                    {"level" : 9,"resolution" : 1.430517319835696E-5,"scale" : 6011.938486617631},
                    {"level" : 10,"resolution" : 7.152586599225016E-6,"scale" : 3005.9692433283726},
                    {"level" : 11,"resolution" : 3.5762932995659225E-6,"scale" : 1502.984621644608}
    ];
    var baiseyxlods=[{"level" : 0,"resolution" : 0.04394531250000001,"scale" : 1.8468599566171873E7},
                     {"level" : 1,"resolution" : 0.021972656250000003,"scale" : 9234299.783085937},
                     {"level" : 2,"resolution" : 0.010986328125000002,"scale" : 4617149.891542968},
                     {"level" : 3,"resolution" : 0.005493164062,"scale" : 2308574.945561352},
                     {"level" : 4,"resolution" : 0.002746582031,"scale" : 1154287.472780676},
                     {"level" : 5,"resolution" : 0.001373291016,"scale" : 577143.7366004697},
                     {"level" : 6,"resolution" : 6.86645508E-4,"scale" : 288571.86830023484},
                     {"level" : 7,"resolution" : 3.43322754E-4,"scale" : 144285.93415011742},
                     {"level" : 8,"resolution" : 1.71661377E-4,"scale" : 72142.96707505871},
                     {"level" : 9,"resolution" : 8.5830688E-5,"scale" : 36071.483327397735},
                     {"level" : 10,"resolution" : 4.2915344E-5,"scale" : 18035.741663698867},
                     {"level" : 11,"resolution" : 2.1457672E-5,"scale" : 9017.870831849434},
                     {"level" : 12,"resolution" : 1.0728836E-5,"scale" : 4508.935415924717},
    ];
    
    switch (layerType) {
    case "pgis":
        lods = pgisLods;
        break;
    case "tdt":
        lods = tdtLods;
        break;
    case "yst":
        lods = ystLods;
        break;
    case "realmap":
        lods = realmapLods;
        break;
    case "edushi":
        lods = edushiLods;
        break;
    case "baidu":
        lods = baiduLods;
        break;
    case "gaode":
        lods = gaodelods;
        break;
    case "dl":
        lods = dllods;
        break;
    case "bsyx":
        lods = baiseyxlods;
        break;
    }
    return lods;
}
    
    
}