<template>
    <div class="syrydetail-panel">
        <div class="syryDetail-header">
          <span class="syryTitle">涉疫人员</span>
          <div class="hfx-modal-close close" @click="closeInfoWindow"></div>  
        </div>
        <div class="syryDetail-content">
              <div style="margin-bottom:5px;">
                <span>姓名：{{data.xm}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span>性别：{{data.xb=="1"?"男":data.xb=="2"?"女":"未知"}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span>身份证号：{{data.sfzh}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span>联系电话：{{data.lxdh}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span>地址：{{data.dzmc}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span>涉疫类型：{{data.sylx=="1"?"确诊病例":data.sylx=="2"?"密接者":data.sylx=="3"?"次密接者":"未知"}}</span>
              </div>
              <div  style="margin-bottom:5px;" v-show="data.sylx=='2'||data.sylx=='3'">
                <span>{{data.sylx=="2"?"确诊人员：":data.sylx=="3"?"密接者：":"" }} {{data.relxm}}</span>
              </div>
              <div style="margin-bottom:5px;" v-show="data.sylx=='2'||data.sylx=='3'">
                <span>{{data.sylx=="2"?"确诊人员身份证号：":data.sylx=="3"?"密接者身份证号：":"" }}{{data.relsfzh}}</span>
              </div>
        </div>
        <div class="syryDetail-footer">
        </div>
    </div>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'

export default {
  name: 'SyryDetailMap',
  props:['sfzh'],
  data () {
    return {
      data:{},
    }
  },
  computed: {
  },
  methods:{
    closeInfoWindow(){
      this.map.map.infoWindow.hide()
    },
    getSyryCallBack(data){
      this.data = data;
    },
  },
  mounted(){
       this.http.get("/ybss/getSyry",{"sfzh":this.sfzh},this.getSyryCallBack,this,false);
  }
}
</script>

<style scoped>
.syrydetail-panel{
  width: 315px;
  height: 180px;
  position:relative;
}
.syryDetail-header{
  position: relative;
  height: 50px;
  border-bottom: 1px solid rgb(91, 107, 114);
  padding: 14px 16px;
}
.syryTitle{
  position:absolute;
  font-size: 16px;
  color: #19a1ef;
  top: 13px;
  left:15px;
}
.close{
  position:absolute;
  font-size: 31px;
  color: white;
  right: 26px;
  top: 10px;
  cursor: pointer;
}
.syryDetail-content{
  width: 100%;
  padding: 16px;
  height: calc(100% - 65px - 75px);
  color: white;
}
.syryDetail-footer{
  height: 20px;
}
</style>
<style>
.addtogroupModal .ivu-modal .ivu-modal-content{
  top: 82px;
  left:598px;
  width: 452px !important;
}
</style>