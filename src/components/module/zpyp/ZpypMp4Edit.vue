<template>
    <div class="mp4Edit" @mouseover="mouseOver" @mouseout="mouseOut">
        <Mp4 :data="mp4Obj" width="252px" height="150px"></Mp4>
        <div class="mp4_username">{{mp4Obj.insertusername}}</div>
        <div class="mp4_deptname">{{mp4Obj.deptname}}</div>
        <div class="mp4_time">{{mp4Obj.inserttime}}</div>
        <Icon v-show="showicon" custom="iconfont iconxiazai" class="downloadClass" style="font-size: 15px;" @click="download"/>
        <Icon v-show="showicon" custom="iconfont iconshanchu" class="deleteClass" style="font-size: 15px;" @click="showDeleteModal"/>
        <Modal title="删除视频" v-model="showDelete" class-name="modal_style" :draggable="true" width="400">
          <div style="width:100%;text-align:center;">是否删除该视频?</div>
          <div slot="footer">
            <Button type="text" size="large" @click="hideDeleteModal">取消</Button>
            <Button type="primary" size="large" @click="deletePicture">确定</Button>
          </div>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Constants from '@/constants/Constants'
import Mp4 from '@/components/base/Mp4'
import saveAs from 'file-saver';
export default {
  name: 'ZpypMp4Edit',
  props:['mp4Obj'],
  components: {Mp4},
  data () {
    return {
      showicon:false,
      showDelete:false
    }
  },
  computed: mapState({
     pictureUrlRecords: state => state.zpyp.pictureUrlRecords//所有的picturl文件，提供浏览用
  }),
  methods:{
     mouseOver(){
       this.showicon = true;
     },
     mouseOut(){
       this.showicon = false;
     },
     showDeleteModal(){
       this.showDelete= true;
     },
     hideDeleteModal(){
       this.showDelete= false;
     },
     deletePicture(){
       this.http.get("/fileclould/deleteFiles",{fileids:this.mp4Obj.fileid},this.deleteFilesCallBack,this,false);
     },
     deleteFilesCallBack(data){
       $(this.$el).hide();
       this.showDelete= false;
     },
     download(){//下载图片
        var FileSaver = require('file-saver');
        FileSaver.saveAs(this.mp4Obj.fileurl,this.mp4Obj.filerealname);
     }
  },
  created(){
    
  }
}
</script>

<style scoped>
.mp4_username{
  text-align:center;
  color: white;
}
.mp4_deptname{
  text-align:center;
  color: white;
  margin-top:3px;
}
.mp4_time{
  text-align:center;
  color: white;
  margin-top:3px;
}
.mp4Edit{
  width:273px;
  height:245px;
  padding: 10px 6px;
  margin: 2px;
  float: left;
  background:rgba(250, 250, 250, 0.06);
  text-align: center;
  position: relative;
}
.downloadClass{
  color: white;
  cursor: pointer;
  position:absolute;
  top:10px;
  right:3px;
}
.deleteClass{
  color: white;
  cursor: pointer;
  position:absolute;
  top:38px;
  right:3px;
}
.modal_style{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

