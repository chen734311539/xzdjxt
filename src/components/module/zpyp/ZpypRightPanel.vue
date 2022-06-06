<template>
    <div class="zpypRightPanel">
      <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true" style="margin: 0 0 0 0;"/>
      <div class="zpyp_option_panel">
        <span>个人云盘</span>
        <el-switch class="switchShow" active-color="#13ce66" inactive-color="#ff4949" v-model="showDept" @change="showDeptChange">
        </el-switch>
        <span>单位云盘</span>
        <Upload class="upload" :action="uploadUrl" :on-success="uploadSuccess" :on-error="uploadError">
            <!-- <Button type="primary" icon="ios-cloud-upload-outline" class="upoadbutton">上传</Button> -->
            <HfxButton  name="上传" />
        </Upload>
        
      </div>
      <el-tabs  class="tabs">
        <el-tab-pane label="照片" class="tabs_pane">
        <el-scrollbar>
          <ZpypPictureEdit v-for="pictureObj in pictureRecords" :key="pictureObj.fileid" :pictureObj="pictureObj" @on-click="clickPicture"/>
        </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="视频" class="tabs_pane">
          <el-scrollbar>
          <ZpypMp4Edit v-for="mp4Obj in mp4Records" :key="mp4Obj.fileid" :mp4Obj="mp4Obj" />
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="语音" class="tabs_pane">
          <el-scrollbar>
          <ZpypSoundEdit v-for="soundObj in soundRecords" :key="soundObj.fileid" :soundObj="soundObj" />
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="其他" class="tabs_pane">
          <el-scrollbar>
          <ZpypOtherEdit v-for="otherObj in otherRecords" :key="otherObj.fileid" :otherObj="otherObj" />
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import ZpypPictureEdit from '@/components/module/zpyp/ZpypPictureEdit'
import ZpypMp4Edit from '@/components/module/zpyp/ZpypMp4Edit'
import ZpypSoundEdit from '@/components/module/zpyp/ZpypSoundEdit'
import ZpypOtherEdit from '@/components/module/zpyp/ZpypOtherEdit'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'ZpypRightPanel',
  components: {ZpypPictureEdit,ZpypMp4Edit,ZpypSoundEdit,ZpypOtherEdit,LeftContentNameBar},
  data () {
    return {
      showDept:true,//显示单位文件
      otherRecords:[],//其他
      pictureRecords:[],//图片
      soundRecords:[],//声音
      mp4Records:[],//视频
      uploadUrl:""
    }
  },
  computed: {...mapState({
     userInfo:state => state.userInfo,
     currentDept: state => state.zpyp.currentDept,
     pictureUrlRecords: state => state.zpyp.pictureUrlRecords//所有的picturl文件，提供浏览用
  })
  },
  methods:{
    showDeptChange(){
      if(this.showDept){//显示单位
        this.http.get("/fileclould/getFiles",{deptcode:this.currentDept.deptcode},this.getFilesCallBack,this,false);
      }else{//显示自己
        this.http.get("/fileclould/getFiles",{usercode:this.userInfo.usercode},this.getFilesCallBack,this,false);
      }
    },
    getFilesCallBack(data){
      this.otherRecords = [];
      this.pictureRecords = [];
      this.soundRecords = [];
      this.mp4Records = [];
      if(data.data&&data.data.length>0){
        for(var i=0;i<data.data.length;i++){
          var record = data.data[i];
          if(record.fileurl!=null&&record.fileurl!=""){
            record.fileurl=Constants.file_url+record.fileurl;
          }
          if(record.slturl!=null&&record.slturl!=""){
            record.slturl=Constants.file_url+record.slturl;
          }
          if(record.filetype=="4"){ //4是其他，1是图片，2是录音，3是视频
              this.otherRecords.push(record);
          }else if(record.filetype=="1"){
              this.pictureRecords.push(record);
          }else if(record.filetype=="2"){
              this.soundRecords.push(record);
          }else if(record.filetype=="3"){
              this.mp4Records.push(record);
          }
        }
      }
    },
    clickPicture(id){
      var pictureUrlRecordsTemp=[];
      var num = 0;
      for(var i = 0;i<this.pictureRecords.length;i++){
        if(this.pictureRecords[i].fileid==id){
          num = i;
          break;
        }
      }
      for(var i = num;i<this.pictureRecords.length;i++){
        pictureUrlRecordsTemp.push(this.pictureRecords[i].fileurl);
      }
      for(var i = 0;i<num;i++){
        pictureUrlRecordsTemp.push(this.pictureRecords[i].fileurl);
      }
       this.$store.dispatch('putChildState',{"key":"zpyp","childkey":"pictureUrlRecords","value":pictureUrlRecordsTemp});
    },
    uploadSuccess(response, file, fileList){
        if(response.code==1){
            this.$Message.success("上传成功");
            if(this.showDept){
              this.http.get("/fileclould/getFiles",{deptcode:this.currentDept.deptcode},this.getFilesCallBack,this,false);
            }else{
              this.http.get("/fileclould/getFiles",{usercode:this.userInfo.usercode},this.getFilesCallBack,this,false);
            }
        }else if(response.code==0){
            this.$Message.error(response.data);
        }
       
    },
    uploadError(error, file, fileList){
        this.$Message.error("上传失败");
    }
  },
  created(){
    
  },
  watch : {
      currentDept:function(val) {
        this.showDept = true;
        this.http.get("/fileclould/getFiles",{deptcode:this.currentDept.deptcode},this.getFilesCallBack,this,false);
        var sessionId = this.common.getSessionId();
        var url = Constants.url_prefix+"/fileclould/addFiles?param={deptcode:"+this.currentDept.deptcode+"}&sessionId="+sessionId;
        this.uploadUrl = url;
      }
  }
}
</script>

<style scoped>
.zpypRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
}

.zpyp_option_panel{
  height: 40px;
  width: 100%;
  position: relative;
  padding: 0px 10px;
  color: #b6f6ff;
  display: inline-flex;
  align-items: center;
  margin: 10px 0 10px 0;
  background-color: rgba(88,245,255, 0.1);
}
.switchShow{
  margin-top:-2px;
  margin-right: 10px;
  margin-left:10px;
}
.upload{
  position:absolute;
  left:188px;
}
.tabs{
  height: calc(100% - 102px);
}
.tabs >>> .el-tabs__content{
  height:calc(100% - 40px);
}
.tabs_pane{
  height: 100%;
}
.tabs >>> .el-tabs__item{
  color: #b6f6ff;
} 
.tabs >>>.el-tabs__active-bar{
  display: none;
}
.tabs>>>.el-tabs__nav-wrap::after{
  background-color: #b6f6ff;
}
/* .tabs>>> .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left:none !important; 
}
.tabs>>>.el-tabs--bottom .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--top .el-tabs__item.is-top:last-child {
  padding-right: none !important;
} */
.tabs >>> .el-tabs__item.is-active{
  color: white;
  /* background-color: #b6f6ff; */
  border-bottom: 3px solid white;
} 
.upoadbutton{
  border-radius: none !important;
}
</style>

