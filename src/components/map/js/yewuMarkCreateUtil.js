import Vue from 'vue'
import mapUtil from './mapUtil'
import markCreateUtil from './markCreateUtil'
import mapEvent from './mapEvent'
import Constants from '@/constants/Constants'

import JingQingDetailMap from '@/components/module/jq/JingQingDetailMap'
import JingLiDetailMap from '@/components/module/jl/JingLiDetailMap'
import ShiPinDetailMap from '@/components/module/spjk/ShiPinDetailMap'
import LayerMapDetail from '@/components/module/dztc/LayerMapDetail'

export default{
    getMapObj(vm,mapid){//获取map对象，里面的值格式等同this.map中的格式,多加一个id
        for(var i=0;i<vm.mapList.length;i++){
            if(vm.mapList[i].id=mapid){
              return vm.mapList[i];
            }
        }
        return null;
    },
    addClusterMark(array,vm,mapid){
      var mapObj = this.getMapObj(vm,mapid);
      if(mapObj==null){
        return;
      }
      markCreateUtil.addCluster("hfxjuhelayer",array,mapObj);
    },
    addHeatMapMark(array,vm,mapid){
      var mapObj = this.getMapObj(vm,mapid);
      if(mapObj==null){
        return;
      }
      markCreateUtil.createHeatmapLayer(array,mapObj);
    },
    addJqMarks(array,callback,vm,mapid){
        var mapObj = this.getMapObj(vm,mapid);
        if(mapObj==null){
          return;
        }
        var that = this;
        try{
            mapObj.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addJqMarks(array,callback,vm,mapid);
          },200);
          return;
        }
        var layerid = "ssjqLayer";
        markCreateUtil.clearLayer(layerid,mapObj);//警情清除
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  //警情打点
                  this.addJqMark(array[i],layerid,callback,mapObj);
              }
          }
        }
      },
      addJqMark(data,layerid,callback,mapObj){
        var that = this;
        try{
            mapObj.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addJqMark(data,layerid,callback,mapObj);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.id = data.id;
        //设置打点图片的大小
        markinfo.size_x=17;
        markinfo.size_y=28;
        markinfo.type = "ssjq";
        if(data.jjlxdm=='1'){//违法犯罪
          // if(data.state=='0'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_wffz_wqs.png");
          // }else if(data.state=='1'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_wffz_yqs.png");
          // }else if(data.state=='2'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_wffz_ydd.png");
          // }else if(data.state=='3'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_wffz_ywc.png");
          // }else{
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_wffz_wqs.png");
          // }
          if(data.state=='0'){
            markinfo.iconurl = require("./../../../assets/jq/icon_110_wqs.png");
          }else if(data.state=='1'){
            markinfo.iconurl = require("./../../../assets/jq/icon_110_yqs.png");
          }else if(data.state=='2'){
            markinfo.iconurl = require("./../../../assets/jq/icon_110_ydd.png");
          }else if(data.state=='3'){
            markinfo.iconurl = require("./../../../assets/jq/icon_110_ywc.png");
          }else{
            markinfo.iconurl = require("./../../../assets/jq/icon_110_wqs.png");
          }
        }else if(data.jjlxdm=='3'){//交通
          // if(data.state=='0'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_jt_wqs.png");
          // }else if(data.state=='1'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_jt_yqs.png");
          // }else if(data.state=='2'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_jt_ydd.png");
          // }else if(data.state=='3'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_jt_ywc.png");
          // }else{
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_jt_wqs.png");
          // }
          if(data.state=='0'){
            markinfo.iconurl = require("./../../../assets/jq/icon_122_wqs.png");
          }else if(data.state=='1'){
            markinfo.iconurl = require("./../../../assets/jq/icon_122_yqs.png");
          }else if(data.state=='2'){
            markinfo.iconurl = require("./../../../assets/jq/icon_122_ydd.png");
          }else if(data.state=='3'){
            markinfo.iconurl = require("./../../../assets/jq/icon_122_ywc.png");
          }else{
            markinfo.iconurl = require("./../../../assets/jq/icon_122_wqs.png");
          }
        }else if(data.jjlxdm=='2'){//火灾
          // if(data.state=='0'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_hz_wqs.png");
          // }else if(data.state=='1'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_hz_yqs.png");
          // }else if(data.state=='2'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_hz_ydd.png");
          // }else if(data.state=='3'){
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_hz_ywc.png");
          // }else{
          //   markinfo.iconurl = require("./../../../assets/jq/jqmark_hz_wqs.png");
          // }
          if(data.state=='0'){
            markinfo.iconurl = require("./../../../assets/jq/icon_119_wqs.png");
          }else if(data.state=='1'){
            markinfo.iconurl = require("./../../../assets/jq/icon_119_yqs.png");
          }else if(data.state=='2'){
            markinfo.iconurl = require("./../../../assets/jq/icon_119_ydd.png");
          }else if(data.state=='3'){
            markinfo.iconurl = require("./../../../assets/jq/icon_119_ywc.png");
          }else{
            markinfo.iconurl = require("./../../../assets/jq/icon_119_wqs.png");
          }
        }else{
          if(data.state=='0'){//其他
            markinfo.iconurl = require("./../../../assets/jq/jqmark_other_wqs.png");
          }else if(data.state=='1'){
            markinfo.iconurl = require("./../../../assets/jq/jqmark_other_yqs.png");
          }else if(data.state=='2'){
            markinfo.iconurl = require("./../../../assets/jq/jqmark_other_ydd.png");
          }else if(data.state=='3'){
            markinfo.iconurl = require("./../../../assets/jq/jqmark_other_ywc.png");
          }else{
            markinfo.iconurl = require("./../../../assets/jq/jqmark_other_wqs.png");
          }
        }
        var Profile = Vue.extend({
          template: '<JingQingDetailMap :mapObj="mapObj" jqid="'+markinfo.id+'" @handler="JingQingDetailHandler"/>',
          components: {JingQingDetailMap},
          data: function () {
            return {
              mapObj:mapObj
            }
          },
          methods:{
            JingQingDetailHandler(data,state){
                if(callback){
                    callback(data,state);
                }
            }
          }
        })
        markinfo.cp = new Profile();
        markCreateUtil.addMark(layerid,markinfo,mapObj);
      },
      addJlMarks(array,vm,mapid){
        var mapObj = this.getMapObj(vm,mapid);
        var that = this;
        try{
          mapObj.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addJlMarks(array,vm,mapid);
          },200);
          return;
        }
        var layerid = "ssjlLayer";
        markCreateUtil.clearLayer(layerid,mapObj);//警力清除
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  //警力打点
                  that.addJlMark(array[i],layerid,mapObj);
              }
          }
        }
      },
      addJlMark(data,layerid,mapObj){
        var that = this;
        try{
          mapObj.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addJlMark(data,layerid,mapObj);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.size_x = data.x;
        markinfo.size_y = data.y;
        markinfo.id = data.gpsid;
        markinfo.type = "ssjl";
        markinfo.users = data.users;
        if(data.online=="1"){
           markinfo.iconurl = Constants.gps_prefix+data.gpsonlineurl;
        }else{
           markinfo.iconurl = Constants.gps_prefix+data.gpsnoonlineurl; 
        }
        var Profile = Vue.extend({
          template: '<JingLiDetailMap :mapObj="mapObj" jlid="'+markinfo.id+'"/>',
          components: {JingLiDetailMap},
          data: function () {
            return {
              mapObj:mapObj
            }
          }
        })
        markinfo.cp = new Profile();
        markCreateUtil.addMark(layerid,markinfo,mapObj);
      },

      addSpjkMarks(array,callback,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addSpjkMarks(array,callback,vm);
          },200);
          return;
        }
        var layerid = "spjkLayer";
        markCreateUtil.clearLayer(layerid,vm);//视频清除
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  //视频打点
                  this.addSpjkMark(array[i],layerid,callback,vm);
              }
          }
        }
      },
      addSpjkMark(data,layerid,callback,vm){
        var that = this;
        try{
          vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addSpjkMark(data,layerid,callback,vm);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.id = data.id;
        markinfo.type = "spjk";
        markinfo.iconurl = Constants.project+"/static/assets/spjk/spjk.png";
        var Profile = Vue.extend({
          template: '<ShiPinDetailMap spjkid="'+markinfo.id+'" @handler="ShiPinDetailHandler"/>',
          components: {ShiPinDetailMap},
          data: function () {
            return {
            }
          },
          methods:{
            ShiPinDetailHandler(data,state){
                if(callback){
                    callback(data,state);
                } 
            }
          }
        })
        markinfo.cp = new Profile();
        markCreateUtil.addMark(layerid,markinfo,vm);
      },
      addLayerMark(layerid,templateObj,markObj,vm){
        var that = this;
        try{
          vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addLayerMark(layerid,templateObj,markObj,vm);
          },200);
          return;
        }
        var attributes =  new Object();
        attributes.type = "dztc";
        var Profile = Vue.extend({
        template: '<LayerMapDetail :templateObj="templateObj" :markObj="markObj"/>',
        components: {LayerMapDetail},
        data: function () {
            return {
                templateObj:templateObj,
                markObj:markObj
            }
        },
        methods:{
        }
        })
        attributes.cp = new Profile();
        markCreateUtil.addDztcLayerMark(layerid,templateObj,markObj,attributes,vm);
      },
}