<template>
    <div class="otherEdit" @mouseover="mouseOver" @mouseout="mouseOut">
        <img src="@/assets/zpyp/other.png" style="cursor: pointer;" @click="download"/>
        <div class="other_filerealname">{{otherObj.filerealname}}</div>
        <div class="other_username">{{otherObj.insertusername}}</div>
        <div class="other_deptname">{{otherObj.deptname}}</div>
        <div class="other_time">{{otherObj.inserttime}}</div>
        <Icon v-show="showicon" custom="iconfont iconxiazai" class="downloadClass" style="font-size: 15px;" @click="download"/>
        <Icon v-show="showicon" custom="iconfont iconshanchu" class="deleteClass" style="font-size: 15px;" @click="showDeleteModal"/>
        <Modal title="删除文件" v-model="showDelete" class-name="modal_style" :draggable="true" width="400">
          <div style="width:100%;text-align:center;">是否删除该文件?</div>
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
  name: 'ZpypOtherEdit',
  props:['otherObj'],
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
       this.http.get("/fileclould/deleteFiles",{fileids:this.otherObj.fileid},this.deleteFilesCallBack,this,false);
     },
     deleteFilesCallBack(data){
       $(this.$el).hide();
       this.showDelete= false;
     },
     download(){//下载图片
        var FileSaver = require('file-saver');
        FileSaver.saveAs(this.otherObj.fileurl,this.otherObj.filerealname);
     }
  },
  created(){
    
  }
}
</script>

<style scoped>
.other_filerealname{
  text-align:center;
  color: white;
  word-wrap:break-word;
}
.other_username{
  text-align:center;
  color: white;
}
.other_deptname{
  text-align:center;
  color: white;
 
}
.other_time{
  text-align:center;
  color: white;
 
}
.otherEdit{
  width:155px;
  height:130px;
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

