<template>
    <Modal v-model="showdata" :draggable = "true" :footer-hide="true" title="文档预览页" class-name="pdfEditItem-panel">
        <div slot="close"><div class="hfx-modal-close" @click="closePanel"/></div>
        <div style="display:block;">
            <div class="pdfEditPanel" v-loading="loading" element-loading-text="文档生成中，请稍等..."
                                     element-loading-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,0.5)">
                <pdf v-for="i in pdfPage" :key="i" :src="pdfsrc" :page="i" style="width:600px;height:848px"></pdf>
            </div>
            <div v-show="showBtn" class="pdfEditBtn">
                <HfxButton style="width:85px" @click="downloadWord" name="下载文档" />
            </div>
        </div>
    </Modal>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import pdf from 'vue-pdf'


export default {
  name: 'PdfVeiw',
  props:['showdata','pdfdata'],
  components: {pdf},
  data () {
    return {
       pdfPage:0, //pdf页码数
       pdfsrc:"",
       loading:false,
       djdadata:{},
       showBtn:false,
    }
  },
  computed: {
  },
  methods:{
      closePanel(){
        this.$emit('on-close');
        this.pdfPage = 0; //pdf页码数
        this.pdfsrc = "";
      },
     initPdf(pdfurl){
            // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
            var that = this
            var loadingTask = pdf.createLoadingTask(pdfurl);
            loadingTask.then(pdf => {
                that.pdfsrc = loadingTask
                that.pdfPage = pdf.numPages
            }).catch((err) => {
                console.error('pdf加载失败')
            })
      },
      getPdfUrl(){
           this.loading = true;
           this.showBtn = false;
           this.http.post("/djda/createDjdaWord",this.pdfdata,this.createDjdaWordCallBack,this,false);
      },
      createDjdaWordCallBack(data){
          if(data.wordurl=='0'){
             this.$Message.error("尚未有单位填写盯警信息，请确保至少有一个单位填写信息");
             this.closePanel();
          }else{
            this.djdadata = data;
            this.showBtn = true;
            this.initPdf(data.pdfurl);
          }
          this.loading = false;
      },
      downloadWord(){
          window.open(this.djdadata.wordurl);
      }
  },
  created(){
      
  },
  watch:{
    showdata:function(){
        if(this.showdata){
            this.getPdfUrl();
        }
    }
  }
}
</script>
<style scoped>
.pdfEditPanel{
    width: 600px;
    height: 780px;
    overflow-y: auto;
    overflow-x: hidden;
}
.pdfEditBtn{
    width: 85px;
    text-align: center;
    position: absolute;
    top: 10px;
    right: 50px;
}

</style>
<style>
.pdfEditItem-panel .ivu-modal .ivu-modal-content{
  top:50px;
  left:695px;
  width: 630px !important;
}
</style>

