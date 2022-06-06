<template>
    <div class="xqglDetail-panel">
         <div class="xqglDetail-header">
          <span class="title">辖区属性</span>
          <div type="ios-close" class="hfx-modal-close close" @click="closeInfoWindow"/>
        </div>
        <div class="xqglDetail-content">
          <div>名称:{{data.deptname}}</div>
          <div class="button-panel">
             <!-- <Button v-show="!data.markid && (!data.isMap)" type="primary" size="small" style="width:65px;margin-left:61px;" @click="save">保存</Button>
             <Button v-show="data.markid && (!data.isMap)" type="primary" size="small" style="width:65px;margin-left:61px;" @click="edit">修改</Button>
             <Button v-show="data.markid && (!data.isMap)" type="primary" size="small" style="width:65px;margin-left:10px;" @click="showDeleteModal">删除</Button>
             <Button v-show="!data.markid && (!data.isMap)" type="primary" size="small" style="width:65px;margin-left:10px;" @click="closeInfoWindow">取消</Button> -->
             <HfxButton v-show="!data.markid && (!data.isMap)" style="width:65px;margin-left:61px;" @click="save" name="保存" />
             <HfxButton v-show="data.markid && (!data.isMap)" style="width:65px;margin-left:61px;" @click="edit" name="修改" />
             <HfxButton v-show="data.markid && (!data.isMap)" style="width:65px;margin-left:10px;" @click="showDeleteModal" name="删除" />
             <HfxButton v-show="!data.markid && (!data.isMap)" style="width:65px;margin-left:10px;" @click="closeInfoWindow" name="取消" />
          </div>
        </div>
        <Modal title="删除辖区" v-model="showDelete" :draggable="true"  style="xqgldelXqModal">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;">是否删除{{data.deptname}}的辖区?</div>
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideDeleteModal">取消</Button>
            <Button type="primary" size="large" @click="deleteXq">确定</Button> -->
            <HfxButton @click="hideDeleteModal" name="取消" />
            <HfxButton @click="deleteXq" />
          </div>
        </Modal>
    </div>
</template>

<script>
import markUtil from '@/components/map/js/markUtil'
import mapUtil from '@/components/map/js/mapUtil'
import { mapState } from 'vuex'
export default {
  name: 'XqglDetail',
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
			  paramObj.deptcode = this.data.deptcode;
			  paramObj.layerid = "xq_layer";
			  paramObj.markname = this.data.deptname;
			  paramObj.linecolor = this.data.linecolor;
        paramObj.polygoncolor = this.data.polygoncolor;
        var geometry;
        if(this.data.markid){//修改
          var geometry = this.map.markidmap["xq_layer"][this.data.markid].geometry;
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
        this.http.post("/xqgl/saveDeptXq",paramObj,this.saveDeptXqCallBack,this,false);
    },
    edit(){
      this.$emit('handler',this.data,"edit");
      markUtil.clearLayer("hfxmap_graphics",this);
      markUtil.drawEdit("xq_layer",this.data.markid,this);
    },
    saveDeptXqCallBack(data){
      markUtil.hideLayer("hfxmap_graphics",this);//编辑图层隐藏
      if(this.map.editToolbar){
        this.map.editToolbar.deactivate();//取消编辑
      }
      this.$Message.success("辖区保存成功");
      this.$emit('handler',this.data,"save");
      this.map.map.infoWindow.hide();
      markUtil.clearLayer("tempLayer",this)
    },
    deleteDeptXqCallBack(data){
      this.showDelete = false;
      this.$Message.success("辖区删除成功");
      this.map.map.infoWindow.hide();
      markUtil.clearLayer("hfxmap_graphics",this);
      markUtil.clearMark("xq_layer",this.data.markid,this);
      this.$emit('handler',this.data,"delete");
    },
    showDeleteModal(){
      this.showDelete = true;
    },
    hideDeleteModal(){
      this.showDelete = false;
    },
    deleteXq(){
      this.http.get("/xqgl/deleteDeptXq",{deptcode:this.data.deptcode},this.deleteDeptXqCallBack,this,false);
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
.xqglDetail-panel{
  width: 100%;
  height: 100%;
}
.xqglDetail-header{
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
.xqglDetail-content{
  height: calc(100% - 50px);
  padding: 10px;
}
.button-panel{
  margin-top: 10px;
  margin-left:10px;
}
</style>
<style>
.xqgldelXqModal .ivu-modal .ivu-modal-content{
  top:82px;
  left: 750px;
  width: 400px !important;
}
</style>
