<template>
  <div class="window-container" v-if="show">
    <div class="window-header">
      <span class="window-title">{{title}}</span>
      <span class="window-close" title="关闭" @click="closeClick">×</span>
    </div>
    <div class="window-body">
      <div class="window-info-item">
        <span class="window-ifno-label" :style="getFieldStyle()">小区名称：</span>
        <span v-show="!showBtn"  class="window-ifno-text">{{formatValue(builddata.xqmc)}}</span>
        <span v-show="showBtn" class="window-ifno-text"><input v-model="builddata.xqmc"/></span>
      </div>
      <div class="window-info-item">
        <span class="window-ifno-label" :style="getFieldStyle()">楼栋名称：</span>
        <span v-show="!showBtn"  class="window-ifno-text">{{formatValue(builddata.ldmc)}}</span>
        <span v-show="showBtn" class="window-ifno-text"><input v-model="builddata.ldmc"/></span>
      </div>
      <div class="window-info-item">
        <span class="window-ifno-label" :style="getFieldStyle()">单元数：</span>
        <span v-show="!showBtn"  class="window-ifno-text">{{formatValue(builddata.dyh)}}</span>
        <span v-show="showBtn" class="window-ifno-text"><input v-model="builddata.dyh"/></span>
      </div>
      <div class="window-info-item">
        <span class="window-ifno-label" :style="getFieldStyle()">楼栋长名称：</span>
        <span v-show="!showBtn"  class="window-ifno-text">{{formatValue(builddata.ldzmc)}}</span>
        <span v-show="showBtn" class="window-ifno-text"><input v-model="builddata.ldzmc"/></span>
      </div>
      <div class="window-info-item">
        <span class="window-ifno-label" :style="getFieldStyle()">楼栋长电话：</span>
        <span v-show="!showBtn" class="window-ifno-text">{{formatValue(builddata.ldzdh)}}</span>
        <span v-show="showBtn" class="window-ifno-text"><input v-model="builddata.ldzdh"/></span>
      </div>
      <div class="window-btn">
        <HfxButton v-show="!showBtn"  @click="updateLdxx" name="修改" />
        <HfxButton v-show="showBtn"  @click="submitLdxx" name="确定"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BuildInfoWindow",
  data() {
    return {
      show: true,
      showBtn:false,
      builddata:{},
    };
  },
  props: {
    title: {
      type: String,
      default: "标题"
    },
    buildcode: {
      type: String,
      default: "10001"
    },
  },

  methods: {
    updateLdxx(){
       this.showBtn = !this.showBtn;
    },
    submitLdxx(){
       this.http.get("/user/updateLdxx",this.builddata,this.updateLdxxCallBack,this,false);
    },
    updateLdxxCallBack(data){
       this.builddata = data;
       this.showBtn = !this.showBtn;
    },
    formatValue(val) {
      if (!val) return "";
      if (val.length > 30) {
        return val.substr(0, 30);
      }

      return val;
    },

    getFieldWidth() {
      return 5*20; //按一个字符20像素处理
    },

    getFieldStyle() {
      return {
        width: this.getFieldWidth() + "px"
      };
    },

    closeClick() {
      if (this.closeEvent) {
        this.closeEvent();
      }
    },
    getFdDataCallBack(data){
      this.builddata = data;
    }
  },
  mounted(){
      this.http.get("/user/getFdData",{"buildcode":this.buildcode},this.getFdDataCallBack,this,false);
  }
};
</script>

<style lang="css" scoped>
.window-container {
  position: absolute;
  left: 0px;
  bottom: 0px;
  min-width: 350px;
  min-height: 200px;
  color: white;
}

.window-container::before {
  position: absolute;
  content: "";
  top: 100%;
  left: calc(50% - 20px);
  border: 20px solid transparent;
  border-top: 40px solid #409eff69;
}

.window-header {
  height: 30px;
  line-height: 30px;
  color: white;
  min-width: 200px;
  padding: 0px 10px;
  background: #1a4879;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  position: relative;
  user-select: none;
}

.window-close {
  position: absolute;
  right: 1px;
  font-size: 25px;
  cursor: pointer;
  width: 29px;
  text-align: center;
}

.window-close:hover {
  background: #dc2929b9;
}

.window-body {
  padding: 5px;
  background: linear-gradient(
    0deg,
    rgba(30, 32, 42, 0.8),
    rgba(13, 16, 19, 0.7)
  );
  border: 1px solid rgb(29, 26, 26);
  border-top: 0px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

.window-info-item {
  margin: 14px 0px;
  max-width: 350px;
}

.window-ifno-label {
  display: inline-block;
  min-width: 60px;
  text-align: justify;
  text-align-last: justify;
  background: #fff6f625;
}
.window-ifno-text { 
  background: #fff6f60e;
}
.window-btn{
  position: relative;
  width: 60px;
  left: 272px;
}
.window-ifno-text input{
  background: #fff0;
  color: #fff;
  border: 1px solid #409eff;
  outline: 0;
}

</style>