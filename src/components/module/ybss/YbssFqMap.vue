<template>
    <div class="ybssFq-panel">
         <div class="ybssFq-header">
          <span class="title">防区属性</span>
          <div type="ios-close" class="hfx-modal-close close" @click="closeInfoWindow"/>
        </div>
        <div class="ybssFq-content">
          <!-- <div>名称:{{data.qyname}}</div> -->
          <div class="button-panel flexr">
             <HfxButton v-show="!data.isMap" style="width:65px;margin-left:15px;" @click="save" name="保存" />
             <HfxButton v-show="data.markid && (!data.isMap)" style="width:65px;margin-left:15px;" @click="edit" name="修改" />
             <HfxButton v-show="data.markid && (!data.isMap)" style="width:65px;margin-left:15px;" @click="deleteXq" name="删除" />
             <HfxButton v-show="!data.markid && (!data.isMap)" style="width:65px;margin-left:15px;" @click="closeInfoWindow" name="取消" />
          </div>
        </div>
    </div>
</template>

<script>
import markUtil from '@/components/map/js/markUtil'
import mapUtil from '@/components/map/js/mapUtil'
import { mapState } from 'vuex'
export default {
  name: 'YbssFqMap',
  components: {},
  props:['data'],
  data () {
    return {
      showDelete:false
    }
  },
  computed: mapState({
  }),
  methods:{
    closeInfoWindow(){
      this.map.map.infoWindow.hide();
      //去掉画图的
      markUtil.clearDrawLayer(this);
      this.$emit('handler',this.data,"close");
    },
    save(){
        var paramObj = {};
        paramObj.qycode = this.data.qycode;
        paramObj.layerid = this.data.qycode;
        paramObj.linecolor = this.data.linecolor;
        paramObj.polygoncolor = this.data.polygoncolor;
        var geometry;
        if(this.data.markid){//修改
          paramObj.markid = this.data.markid;
          var geometry = this.map.markidmap[this.data.qycode][this.data.markid].geometry;
        }else{//新增
            var layer = this.map.map.getLayer("tempLayer");
            if(layer==null||layer==undefined){
              this.$Message.info("无需保存");
              return;
            }
            var graphics = layer.graphics;
            if(graphics.length==0){
              this.$Message.info("无需保存");
              return;
            }
            geometry = graphics[0].geometry;
        }
        
        var polygon = mapUtil.getTruePolygon(geometry,this);
        paramObj.locinfo = {};
        paramObj.locinfo.points = polygon.rings[0];;
        paramObj.locinfo.type = "polygon";
        this.http.post("/ybss/updateFqMark",paramObj,this.updateQyMarkCallBack,this,false);
    },
    edit(){
        this.$emit('handler',this.data,"edit");
        markUtil.clearLayer("hfxmap_graphics",this);
        markUtil.drawEdit(this.data.qycode,this.data.markid,this);
    },
    updateQyMarkCallBack(data){
        markUtil.hideLayer("hfxmap_graphics",this);//编辑图层隐藏
        if(this.map.editToolbar){
            this.map.editToolbar.deactivate();//取消编辑
        }
        this.$Message.success("区域保存成功");
        this.$emit('handler',this.data,"save");
        this.map.map.infoWindow.hide();
        markUtil.clearLayer("tempLayer",this)
    },
    deleteQyMarkCallBack(data){
        this.showDelete = false;
        this.$Message.success("区域删除成功");
        this.map.map.infoWindow.hide();
        markUtil.clearLayer("hfxmap_graphics",this);
        markUtil.clearMark(this.data.qycode,this.data.markid,this);
        this.$emit('handler',this.data,"delete");
    },
    deleteXq(){
        this.http.get("/ybss/deleteFqById",{markid:this.data.markid},this.deleteQyMarkCallBack,this,false);
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
.ybssFq-panel{
  width: 100%;
  height: 100%;
}
.ybssFq-header{
  position: relative;
  height: 50px;
  border-bottom: 1px solid rgb(91, 107, 114);
  padding: 14px 16px;
  font-size:14px;
}
.close{
  position:absolute;
  font-size: 31px;
  color: white;
  right: 9px;
  top: 10px;
  cursor: pointer;
}
.ybssFq-content{
  color: #b6f6ff;
  height: calc(100% - 50px);
  padding: 10px;
}
.button-panel{
  margin-top: 10px;
  margin-left:10px;
}
.title{
  color: #b6f6ff;
}
</style>

