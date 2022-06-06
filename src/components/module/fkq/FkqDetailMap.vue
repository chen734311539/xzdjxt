<template>
    <div class="fkqdetail-panel">
        <div class="fkqDetail-header">
          <span class="fkqTitle">{{data.title}}</span>
          <!-- <Icon type="ios-close" class="close" @click="closeInfoWindow"/> -->
          <div class="hfx-modal-close close" @click="closeInfoWindow"></div>  
        </div>
        <div class="fkqDetail-content">
            <el-scrollbar>
              <div style="margin-bottom:5px;">
                <span>防控内容：</span>
                <Input class="fkqtext" v-model="data.fknr" type="textarea" :autosize="true"  size="small" :readonly="true"/>
              </div>
              <div style="margin-bottom:5px;">
                <span>防控要求：</span>
                <Input class="fkqtext" v-model="data.fkyq" type="textarea" :autosize="true"  size="small" :readonly="true"/>
              </div>
              <div style="margin-bottom:5px;">
                  <span>一级范围：</span>
                <span style="color:#d8d8d8;">{{data.firstradius}}米</span>
              </div>
              <div style="margin-bottom:5px;">
                  <span>二级范围：</span>
                <span style="color:#d8d8d8;">{{data.secondradius}}米</span>
              </div>
              <div style="margin-bottom:5px;">
                  <span>三级范围：</span>
                <span style="color:#d8d8d8;">{{data.thirdradius}}米</span>
              </div>
            </el-scrollbar>
        </div>
        <div style="right:26px;position:absolute;">
                 <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;" @click="fkqdwClick">修改位置</Button>
                 <Button type="primary" size="small" style="width:75px;margin-left:10px;" @click="showFkq">显示防控圈</Button> -->
                 <HfxButton @click="fkqdwClick" name="修改位置" :width=70 />
                 <HfxButton @click="showFkq" name="显示防控圈" :width=80 />
        </div>
    </div>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'

export default {
  name: 'FkqDetailMap',
  props:['fkqid'],
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
    fkqdwClick(){
      markUtil.reLocate(this.data.loc.x,this.data.loc.y,this.fkqdwclickHandler,null,this)
    },
    fkqdwclickHandler(point,args){
      var paramObj = {};
      var lx = point.x;
      var ly = point.y;
      paramObj.xpos = lx;
      paramObj.ypos = ly;
      paramObj.id = this.data.id;
      this.http.get("/znfk/updateFkqCenterPoint",paramObj,this.updateFkqCenterPointCallBack,this,false);
    },
    showFkq(){
        markUtil.drawThreeCircle(this.data.loc.x,this.data.loc.y,this.data,this);
    },
    updateFkqCenterPointCallBack(data){
      this.$emit('handler',data,"location");
    },
    getFkqItemByidCallBack(data){
      this.data = data;
    },
  },
  mounted(){
       this.http.get("/znfk/getFkqItemByid",{"id":this.fkqid},this.getFkqItemByidCallBack,this,false);
  }
}
</script>

<style scoped>
.fkqdetail-panel{
  width: 316px;
  height: 310px;
  position:relative;
}
.fkqDetail-header{
  position: relative;
  height: 65px;
  border-bottom: 1px solid rgb(91, 107, 114);
  padding: 14px 16px;
}
.fkqTitle{
  position:absolute;
  font-size: 16px;
  color: #19a1ef;
  top: 20px;
  left:15px;
}
.fkqtext{
  position:relative;
  left: 57px;
  top:-22px;
}
.fkqtext >>> textarea{
  background-color: rgba(0, 0, 0, 0);
  color: #d8d8d8;
  border: 0px;
  width: 200px;
  min-height: 26px;
  font-size: 12px;
}
.close{
  position:absolute;
  font-size: 31px;
  color: white;
  right: 9px;
  top: 10px;
  cursor: pointer;
}
.fkqDetail-content{
  width: 100%;
  padding: 16px;
  height: calc(100% - 100px);
}
</style>