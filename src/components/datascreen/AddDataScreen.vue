<template>
  <div class="panel">
      <div class="top-bar">
        <div class="skew-decorator"></div><!--斜装饰-->
        <div class="cancel-btn" @click="cancelAddDataScreen"><span>取消创建</span></div>
      </div>
      <div class="creator-wp">
          <div class="template-list">
              <div class="template-selector">
                  <a class="selected template-selector-item">
                      <div class="template-content-wp">
                        <div class="template-thumbnail-wp">
                          <img class="template-thumbnail" src="@/assets/datascreen/thumbnail.png">
                        </div>
                      </div>
                      <div class="template-desc">
                          <div class="desc-name ellipsis-2">
                            <div class="name-text">空白</div>
                            <i class="right-arrow"/>
                          </div>
                         <div class="desc-scale desc-info">
                           <p>尺寸自定</p>
                         </div>
                      </div>
                  </a>
              </div>
          </div>
          <div class="template-preview">
            <div class="preview-title">选择模板</div>
            <div class="preview-content">
                <div class="preview-wrapper">
                    <div class="preview-img-wp">
                        <img class="preview-img" src="@/assets/datascreen/addblackscreen.png">
                        <div class="preview-img-mask">
                          <Button type="primary" size="large" class="create-btn">创建</Button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'AddDataScreen',
  components:{},
  data () {
    return {
     
    }
  },
  computed:mapState({
  }),
  methods:{
    // 取消创建大屏
    cancelAddDataScreen(){
      this.$router.push({ path:'/ds'}); //路由跳转
    }

  },
  mounted(){

  },
  beforeDestroy(){
  
  }
}
</script>

<style scoped>
.panel{
  width: 100%;
  overflow:hidden;
  height: 100%;
  background:#141c27;
}
.top-bar{
  position:absolute;
  left: 0px;
  top: 0px;
  height: 20px;
  width: 100%;
  background:#151b22;
  border-bottom:1px solid #12b3ff;
  z-index:10;
  box-shadow:0 5px 28px 0 rgba(55,126,255,.28);
}
.skew-decorator{
  cursor: pointer;
  height:25px;
  width:130px;
  margin-top:20px;
  border-right:2px solid #12b3ff;
  border-bottom:1px solid #12b3ff;
  border-bottom-right-radius:5px;
  transform:skewX(-45deg);
  background:#151b22;
  transform-origin:bottom;
  box-shadow:0 5px 28px 0 rgba(55,126,255,.28);
}
.skew-decorator::after{
  content:' ';
  position:absolute;
  left:-50px;
  bottom:0px;
  width:178px;
  height:54px;
  border-bottom-right-radius:5px;
  background:#151b22;
}
.cancel-btn{
  cursor: pointer;
  position:absolute;
  left: 0px;
  top:0px;
  width: 145px;
  color: #fff;
  font-size:14px;
  line-height:20px;
  padding:14px 24px;
  transition: 0.2s;
  user-select: none;
}
.cancel-btn:hover{
  color: #2483ff;
}
.creator-wp{
  display: flex;
  height:100%;
  flex-direction:row;
}
.template-list{
  width:329px;
  min-width:329px;
  height:100%;
}
.template-selector{
  width: 100%;
  height: 100%;
  padding-top: 75px;
}
.template-preview{
  flex:1;
  height:100%;
  width:100%;
  min-width:740px;
  display:flex;
  flex-direction:column;
}
.preview-title{
  text-align:center;
  color:#fff;
  font-size:14px;
  margin-top:63px;
  margin-bottom:7px;
}
.preview-content{
  opacity: 1;
  display:flex;
  flex:1;
  justify-content:center;
  align-items:center;
  box-sizing:content-box;
  padding:0 24px 30px 24px;
  overflow:hidden;
}
.preview-wrapper{
  width:85%;
  height:100%;
  transition:.2s ease;
}
.preview-img-wp{
  width: 100%;
  height: calc(100% - 65px);
  font-size:0;
  position:relative;
  border:1px solid #12b3ff;
  overflow:hidden;
}
.preview-img{
  display:block;
  position:relative;
  width: 100%;
  height: 100%;
}
.preview-img-mask{
  position:absolute;
  left: 0px;
  top:0px;
  height:100%;
  width:100%;
  transition:.2s ease;
}
.preview-img-mask:hover{
  background: rgba(0,0,0,.52);
}
.preview-img-mask .create-btn{
  opacity: 0;
  position:absolute;
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%);
  transition:.2s ease;
  width: 100px;
}
.preview-img-mask:hover .create-btn{
  opacity: 1;
}
.template-selector .template-selector-item.selected{
  transform:translateX(21px);
}
.template-selector .template-selector-item{
  display: block;
  width:100%;
  margin:17px 0px;
  padding:0px 24px;
  overflow:hidden;
  transition:.2s ease-out;
  cursor:pointer;
}
.template-selector .template-selector-item:first-child .template-thumbnail-wp{
  box-shadow:inset 0 0 46px 0 rgba(136,215,255,.45);
}
.template-selector .template-thumbnail-wp{
  display:block;
  position:relative;
  float:left;
}
.template-selector .template-thumbnail, .template-selector .template-thumbnail-wp{
  width:140px;
  height:79px;
}
.template-selector .template-selector-item:first-child .template-thumbnail{
  display: none;
}
.template-selector .template-thumbnail{
  display:block;
  position:relative;
  border:1px solid #9b9ea0;
}
.template-selector .template-desc{
  width:100%;
  height:100%;
  padding-left:148px;
  color:#c3c5c6;
}
.template-selector .template-selector-item.selected .desc-info, .template-selector .template-selector-item.selected .desc-name{
  color:#2483ff !important;
}
.template-selector .template-selector-item:first-child .desc-name{
  color:#fff;
}
.template-selector .template-desc .desc-name{
  font-size:14px;
  line-height:20px;
}
.template-selector .template-selector-item .desc-name{
  position:relative;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:flex-start;
}
.ellipsis-2{
  display:-webkit-box;
  word-break:break-word;
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}
.template-selector .template-selector-item .name-text{
  display:-webkit-box;
  text-overflow:ellipsis;
  overflow:hidden;
  word-wrap:break-word;
  word-break:break-all;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}
.template-selector .template-selector-item .right-arrow{
  position: relative;
  margin-left:6px;
  height: 0px;
  width: 0px;
  border-left:10px solid #2483ff;
  border-top:5px solid transparent;
  border-bottom:5px solid transparent;
}
.template-selector .template-selector-item .right-arrow::before{
  content:'';
  position:absolute;
  left: -10px;
  top:-5px;
  display:inline-block;
  height:0px;
  width: 0px;
  border-left:3px solid #141c27;
  border-top:5px solid transparent;
  border-bottom:5px solid transparent;
}
.template-selector .template-selector-item.selected .desc-info, .template-selector .template-selector-item.selected .desc-name{
  color: #2483ff !important;
}
.template-selector .template-desc .desc-info{
  line-height:17px;
  color:#bcc9d4;
  font-size:14px;
  font-family:Orbitron-Bold,PingFangSC-Medium,PingFang SC,Microsoft YaHei,Arial,Helvetica,sans-serif;
}

</style>
