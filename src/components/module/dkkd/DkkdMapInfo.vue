<template>
    <div class="dkkddetail-panel">
        <div class="dkkdDetail-header">
          <span class="dkkdTitle">{{data.name}}</span>
          <div class="hfx-modal-close close" @click="closeInfoWindow"></div>  
        </div>
        <div class="dkkdDetail-content">
            <el-scrollbar>
              <div style="margin-bottom:10px;">
                <span>堵控范围：</span>
                <input style="width: 200px;" class="inputclass" v-model="data.radius" :readonly="true"/>
              </div>
              <div style="margin-bottom:10px;">
                <span>管辖单位：</span>
                <input style="width: 200px;" class="inputclass" v-model="data.owndeptname" :readonly="true"/>
              </div>
              <div style="margin-bottom:10px;">
                <span>责任民警：</span>
                <input style="width: 200px;" class="inputclass" v-model="data.personliable" :readonly="true"/>
              </div>
              <div style="margin-bottom:10px;">
                <span>备注信息：</span>
                <Input class="dkkdtext" v-model="data.remark" type="textarea" :autosize="true"  size="small" :readonly="true"/>
              </div>
            </el-scrollbar>
        </div>
        <div style="right:26px;position:absolute;">
            <HfxButton @click="zhoubianClick" name="周边" :width=70 />
            <!-- <HfxButton name="显示防控圈" :width=80 /> -->
        </div>
    </div>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'

export default {
  name: 'DkkdMapInfo',
  props:['dkkdid'],
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
    zhoubianClick(){
        var radius = parseInt(this.data.radius);
        markUtil.drawCircle(this.data.loc.x,this.data.loc.y,radius/111000,this)
    },
    selectDkdByIdCallBack(data){
      this.data = data;
    },
  },
  mounted(){
       this.http.get("/znfk/selectDkdById",{"id":this.dkkdid},this.selectDkdByIdCallBack,this,false);
  }
}
</script>

<style scoped>
.dkkddetail-panel{
  width: 310px;
  height: 310px;
  position:relative;
}
.dkkdDetail-header{
  position: relative;
  height: 65px;
  border-bottom: 1px solid rgb(91, 107, 114);
  padding: 14px 16px;
}
.dkkdTitle{
  position:absolute;
  font-size: 16px;
  color: #19a1ef;
  top: 20px;
  left:15px;
}
.dkkdtext{
  position:relative;
  left: 57px;
  top:-22px;
}
.dkkdtext >>> textarea{
  background-color: rgba(0, 0, 0, 0);
  color: #d8d8d8;
  border: 0px;
  width: 200px;
  min-height: 26px;
  font-size: 12px;
}
.inputclass{
  width:180px;
  height: 28px;
  outline: none;
  color: #b6f6ff;
  padding:0 10px;
  background-color: transparent;
  border: 1px solid transparent;
}
.close{
  position:absolute;
  font-size: 31px;
  color: white;
  right: 9px;
  top: 10px;
  cursor: pointer;
}
.dkkdDetail-content{
  width: 100%;
  padding: 16px;
  height: calc(100% - 100px);
}
</style>