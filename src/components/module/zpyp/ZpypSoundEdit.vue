<template>
    <div class="soundEdit" @mouseover="mouseOver" @mouseout="mouseOut">
        <Audio :src="soundObj.fileurl"></Audio>
        <div class="sound_username">{{soundObj.insertusername}}</div>
        <div class="sound_deptname">{{soundObj.deptname}}</div>
        <div class="sound_time">{{soundObj.inserttime}}</div>
        <Icon v-show="showicon" custom="iconfont iconxiazai" class="downloadClass" style="font-size: 15px;" @click="download"/>
        <Icon v-show="showicon" custom="iconfont iconshanchu" class="deleteClass" style="font-size: 15px;" @click="showDeleteModal"/>
        <Modal title="删除语音" v-model="showDelete" class-name="modal_style" :draggable="true" width="400">
          <div style="width:100%;text-align:center;">是否删除该语音?</div>
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
import Audio from '@/components/base/Audio'
import saveAs from 'file-saver';
export default {
  name: 'ZpypSoundEdit',
  props:['soundObj'],
  components: {Audio},
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
       this.http.get("/fileclould/deleteFiles",{fileids:this.soundObj.fileid},this.deleteFilesCallBack,this,false);
     },
     deleteFilesCallBack(data){
       $(this.$el).hide();
       this.showDelete= false;
     },
     download(){//下载图片
        var FileSaver = require('file-saver');
        FileSaver.saveAs(this.soundObj.fileurl,this.soundObj.filerealname);
     }
  },
  created(){
    
  }
}
</script>

<style scoped>
.sound_username{
  text-align:center;
  color: white;
}
.sound_deptname{
  text-align:center;
  color: white;
  margin-top:3px;
}
.sound_time{
  text-align:center;
  color: white;
  margin-top:3px;
}
.soundEdit{
  width:280px;
  height:138px;
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

