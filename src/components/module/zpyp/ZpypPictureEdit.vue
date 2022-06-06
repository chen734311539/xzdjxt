<template>
    <div class="pictureEdit" @mouseover="mouseOver" @mouseout="mouseOut">
        <el-image style="width: 128px; height: 165px;margin:0px 5px;" :src="pictureObj.fileurl" @click="clickPicture(pictureObj.fileid)" :preview-src-list="pictureUrlRecords"></el-image>
        <div class="picture_username">{{pictureObj.insertusername}}</div>
        <div class="picture_deptname">{{pictureObj.deptname}}</div>
        <div class="picture_time">{{pictureObj.inserttime}}</div>
        <Icon v-show="showicon" custom="iconfont iconxiazai" class="downloadClass" style="font-size: 15px;" @click="download"/>
        <Icon v-show="showicon" custom="iconfont iconshanchu" class="deleteClass" style="font-size: 15px;" @click="showDeleteModal"/>
        <Modal title="删除照片" v-model="showDelete" class-name="modal_style" :draggable="true" width="400">
          <div style="width:100%;text-align:center;">是否删除该图片?</div>
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
import saveAs from 'file-saver';
export default {
  name: 'ZpypPictureEdit',
  props:['pictureObj'],
  components: {},
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
       this.http.get("/fileclould/deleteFiles",{fileids:this.pictureObj.fileid},this.deleteFilesCallBack,this,false);
     },
     deleteFilesCallBack(data){
       $(this.$el).hide();
       this.showDelete= false;
     },
     download(){//下载图片
        var FileSaver = require('file-saver');
        FileSaver.saveAs(this.pictureObj.fileurl,this.pictureObj.filerealname);
     },
     clickPicture(id){
        this.$emit('on-click',id);
     }
  },
  created(){
    
  }
}
</script>

<style scoped>
.picture_username{
  text-align:center;
  color: white;
}
.picture_deptname{
  text-align:center;
  color: white;
  margin-top:3px;
}
.picture_time{
  text-align:center;
  color: white;
  margin-top:3px;
}
.pictureEdit{
  width:185px;
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
  right:5px;
}
.deleteClass{
  color: white;
  cursor: pointer;
  position:absolute;
  top:38px;
  right:5px;
}
.modal_style{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

