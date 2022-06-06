import Vue from 'vue'
import mapUtil from './mapUtil'
import markUtil from './markUtil'
import mapEvent from './mapEvent'
import Constants from '@/constants/Constants'


export default{
    addJqMarks(array,callback,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addJqMarks(array,callback,vm);
          },200);
          return;
        }
        var layerid = "ssjqLayer";
        markUtil.clearLayer(layerid,vm);//警情清除
        vm.map.divlayeridmap[layerid]=[];
        $("." + layerid).remove();//清除div点样式
        var num = 0;
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              if(num<5){
                array[i].isnew = "1";
              }
              num++;
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  //警情打点
                  this.addJqMark(array[i],layerid,callback,vm);
              }
          }
        }
      },
      addJqMark(data,layerid,callback,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addJqMark(data,layerid,callback,vm);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.id = data.id;
        //设置打点图片的大小
        markinfo.size_x=23;
        markinfo.size_y=32;
        markinfo.type = "ssjq";
        if(data.jjlxdm=='1'){//违法犯罪
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
        }else if(data.jjlxdm=='2'){//交通
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
        }else if(data.jjlxdm=='3'){//火灾
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
          template: '<JingQingDetailMap jqid="'+markinfo.id+'" @handler="JingQingDetailHandler"/>',
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
            }
          }
        })
        markinfo.cp = new Profile();
        markUtil.addMark(layerid,markinfo,vm);
        if(data.isnew == '1'){
          // markUtil.addMapLabelDiv(data,layerid,vm);//最新的5条警情加div样式
        }
      },
      addJlMarks(array,vm){
        var that = this;
        try{
          vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addJlMarks(array,vm);
          },200);
          return;
        }
        var layerid = "ssjlLayer";
        markUtil.clearLayer(layerid,vm);//警力清除
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  //警力打点
                  that.addJlMark(array[i],layerid,vm);
              }
          }
        }
      },
      addJlMark(data,layerid,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addJlMark(data,layerid,vm);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.name = data.gpsname;
        markinfo.id = data.gpsid;
        markinfo.size_x = data.x;
        markinfo.size_y = data.y;
        markinfo.type = "ssjl";
        markinfo.users = data.users;
        if(data.online=="1"){
           markinfo.iconurl = Constants.gps_prefix+data.gpsonlineurl;
        }else{
           markinfo.iconurl = Constants.gps_prefix+data.gpsnoonlineurl; 
        }
        if(data.avatar){
          markinfo.iconurl = Constants.file_url+"users/"+data.newavatar;
          markinfo.bgiconurl = require("./../../../assets/jl/userbg.png");
          markinfo.size_x  = "26.7px";
          markinfo.size_y  = "32.8px";
        }
        var Profile = Vue.extend({
          template: '<JingLiDetailMap jlid="'+markinfo.id+'"/>',
          components: {JingLiDetailMap},
          data: function () {
            return {
            }
          }
        })
        markinfo.cp = new Profile();
        markUtil.addMark(layerid,markinfo,vm);
      },
      addSingleMark(data,layerid,iconurl,pointtype,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addSingleMark(data,layerid,iconurl,pointtype,vm);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.id = data.id+pointtype;
        markinfo.type = pointtype;
        markinfo.iconurl = iconurl;
        if(pointtype == "starting"){
          markinfo.size_x = 23;
          markinfo.size_y = 32;
        }else if(pointtype == "endding"){
          markinfo.size_x = 23;
          markinfo.size_y = 32;
        }else{
          markinfo.size_x = 20;
          markinfo.size_y = 20;
        }
        markUtil.addMark(layerid,markinfo,vm);
      },
      addTraceLine(data,layerid,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addTraceLine(data,layerid,vm);
          },200);
          return;
        }
        if(data.loc != null){
            var lx = data.loc.x;
            var ly = data.loc.y;
            var point = new esri.geometry.Point(lx, ly);
            point.spatialReference = vm.map.map.spatialReference;
            markUtil.addLinePart(point,layerid,data.id,vm);
          }
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
        markUtil.clearLayer(layerid,vm);//视频清除
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
        markinfo.size_x=23;
        markinfo.size_y=32;
        markinfo.type = "spjk";
        markinfo.iconurl = require("./../../../assets/spjk/mark_spjk.png");
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
        markUtil.addMark(layerid,markinfo,vm);
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
        markUtil.addDztcLayerMark(layerid,templateObj,markObj,attributes,vm);
      },
      //防控圈打点
      addFkqMarks(array,callback,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addFkqMarks(array,callback,vm);
          },200);
          return;
        }
        var layerid = "fkqLayer";
        markUtil.clearLayer(layerid,vm);//视频清除
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  //视频打点
                  this.addFkqMark(array[i],layerid,callback,vm);
              }
          }
        }
      },
      addFkqMark(data,layerid,callback,vm){
        var that = this;
        try{
          vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addFkqMark(data,layerid,callback,vm);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.id = data.id;
        markinfo.type = "fkq";
        markinfo.size_x = 44;
        markinfo.size_y = 44;
        // markinfo.iconurl = Constants.project+"/static/assets/fkq/fkcircle.gif";
        var Profile = Vue.extend({
          template: '<FkqDetailMap fkqid="'+markinfo.id+'" @handler="FkqDetailHandler"/>',
          components: {FkqDetailMap},
          data: function () {
            return {
            }
          },
          methods:{
            FkqDetailHandler(data,state){
                if(callback){
                    callback(data,state);
                } 
            }
          }
        })
        markinfo.cp = new Profile();
        markUtil.addMark(layerid,markinfo,vm);
        // markUtil.addMapLabelDiv(data.loc.x,data.loc.y,layerid,markinfo.id,vm)
      },
      //堵控卡点打点
      addDkkdMarks(array,callback,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addDkkdMarks(array,callback,vm);
          },200);
          return;
        }
        var layerid = "dkkdLayer";
        markUtil.clearLayer(layerid,vm);//清除
        markUtil.clearLayer(layerid+"Circle",vm);//清除
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  this.addDkkdMark(array[i],layerid,callback,vm);
              }
          }
        }
      },
      addDkkdMark(data,layerid,callback,vm){
        var that = this;
        if(data.show==false){
          return;
        }
        try{
          vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addDkkdMark(data,layerid,callback,vm);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.id = data.id;
        markinfo.radius = data.radius;
        markinfo.type = "dkkd";
        markinfo.size_x = 35;
        markinfo.size_y = 55;
        if(data.hasjl=='1'){
          markinfo.hasjl = data.hasjl;
          markinfo.iconurl = require("./../../../assets/dkkd/pcslzz_green.png");
        }else{
          markinfo.iconurl = require("./../../../assets/dkkd/pcslzz.png");
        }
        var Profile = Vue.extend({
          template: '<DkkdMapInfo dkkdid="'+markinfo.id+'" @handler="DkkdDetailHandler"/>',
          components: {DkkdMapInfo},
          data: function () {
            return {
            }
          },
          methods:{
            DkkdDetailHandler(data,state){
                if(callback){
                    callback(data,state);
                } 
            }
          }
        })
        markinfo.cp = new Profile();
        markUtil.addMark(layerid,markinfo,vm);
      },
      //电子卡口打点
      addDzkkMarks(array,callback,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addSpjkMarks(array,callback,vm);
          },200);
          return;
        }
        var layerid = "dzkkLayer";
        markUtil.clearLayer(layerid,vm);//卡口清除
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  //卡口打点
                  this.addDzkkMark(array[i],layerid,callback,vm);
              }
          }
        }
      },
      addDzkkMark(data,layerid,callback,vm){
        var that = this;
        try{
          vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addDzkkMark(data,layerid,callback,vm);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        //设置打点图片的大小
        markinfo.size_x=23;
        markinfo.size_y=32;
        markinfo.id = data.jkdbh;
        markinfo.type = "dzkk";
        markinfo.iconurl = require("./../../../assets/dzkk/mark_dzkk.png");
        var Profile = Vue.extend({
          template: '<DzkkDetailMap dzkkid="'+markinfo.id+'" dzkkname="'+data.jkdmc+'" @handler="ShiPinDetailHandler"/>',
          components: {DzkkDetailMap},
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
        markUtil.addMark(layerid,markinfo,vm);
      },
      addBkyjMarks(array,vm){
        var that = this;
        try{
          vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addBkyjMarks(array,vm);
          },200);
          return;
        }
        var layerid = "bkyjLayer";
        markUtil.clearLayer(layerid,vm);//预警清除
        $("." + layerid).remove();//清除div点样式
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  //布控预警打点
                  that.addBkyjMark(array[i],layerid,vm);
              }
          }
        }
      },
      addBkyjMark(data,layerid,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addBkyjMark(data,layerid,vm);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.id = data.id;
        markinfo.size_x = 27;
        markinfo.size_y = 25;
        markinfo.type = "bkyj";
        markinfo.iconurl = require("./../../../assets/common/map_yujing.png");
        var Profile = Vue.extend({
          template: '<BkyjDetailMap bkyjid="'+markinfo.id+'"/>',
          components: {BkyjDetailMap},
          data: function () {
            return {
            }
          }
        })
        markinfo.cp = new Profile();
        markUtil.addMark(layerid,markinfo,vm);
        markUtil.addMapLabelDiv(data,layerid,vm);
      },
      addYbssMarks(array,vm,callback){
        var that = this;
        try{
          vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addYbssMarks(array,vm,callback);
          },200);
          return;
        }
        var layerid = "ybssLayer";
        markUtil.clearLayer(layerid,vm);//清除
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  //打点
                  that.addYbssMark(array[i],layerid,vm);
              }
          }
        }
        var layer = vm.map.layeridmap[layerid];
        layer.on("click", callback);//添加点的点击事件
      },
      addYbssMark(data,layerid,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addYbssMark(data,layerid,vm);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.id = data.id;
        markinfo.size_x = 38;
        markinfo.size_y = 42;
        markinfo.type = "ybss";
        markinfo.iconurl = require("./../../../assets/ybss/ybss.png");
        markUtil.addMark(layerid,markinfo,vm);
        markUtil.addYbssLabelDiv(data,layerid,vm,'tips');
      },
      addSyryMarks(array,vm,callback){
        var that = this;
        try{
          vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addSyryMarks(array,vm,callback);
          },200);
          return;
        }
        var layerid = "syryLayer";
        markUtil.clearLayer(layerid,vm);//清除
        for(var i=0;i<array.length;i++){
          if(array[i].loc == null){
          }else{
              var locationX = array[i].loc.x;
              var locationY = array[i].loc.y;
              if (locationX > 0 && locationY > 0) {
                  //打点
                  that.addSyryMark(array[i],layerid,vm);
              }
          }
        }
        // var layer = vm.map.layeridmap[layerid];
        // layer.on("click", callback);//添加点的点击事件
      },
      addSyryMark(data,layerid,vm){
        var that = this;
        try{
            vm.map.map.getLevel();
        }catch(e){
          setTimeout(function(){
            that.addSyryMark(data,layerid,vm);
          },200);
          return;
        }
        var markinfo = new Object();
        markinfo.lx = data.loc.x;
        markinfo.ly = data.loc.y;
        markinfo.id = data.sfzh;
        markinfo.size_x = 34;
        markinfo.size_y = 34;
        markinfo.type = "syry";
        var sylxtype=data.sylx;
        if(sylxtype=="1"){
          markinfo.iconurl = require("./../../../assets/ybss/syry_qz.png");
        }else if(sylxtype=="2"){
          markinfo.iconurl = require("./../../../assets/ybss/syry_mj.png");
        }else if(sylxtype=="3"){
          markinfo.iconurl = require("./../../../assets/ybss/syry_cmj.png");
        }else{
          markinfo.iconurl = require("./../../../assets/ybss/ldz.png");
        } 
        var Profile = Vue.extend({
          template: '<SyryDetailMap sfzh="'+markinfo.id+'"/>',
          components: {SyryDetailMap},
          data: function () {
            return {
            }
          }
        })
        markinfo.cp = new Profile();
        markUtil.addMark(layerid,markinfo,vm);
        // markUtil.addYbssLabelDiv(data,layerid,vm,'tips');
      },
}