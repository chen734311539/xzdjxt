<template>
    <div class="mp4" @click="clickPicture">
        <el-image :style="{width:width,height:height}" :src="data.slturl"></el-image>
        <Icon custom="iconfont iconbofang" class="mp4_icon"/>
        <Modal v-model="showMap4" :draggable="true" class-name="mp4modal-panel" :footer-hide="true"  title="视频">
          <div slot="close"><div class="hfx-modal-close"/></div>
            <video-player class="video-player" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
        </Modal>
    </div>
</template>

<script>

export default {
  name: 'Mp4',
  props:['data','width','height'],
  data () {
    return {
      showMap4:false
    }
  },
  computed: {
     playerOptions: function(){
       var obj = {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          fullscreen:true,
          sources: [{
            src: this.data.fileurl,  // 路径
            type: 'video/mp4'  // 类型
          }],
          poster: this.data.slturl, //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
      };
      return obj;
     }
  },
  methods:{
      clickPicture(){
          this.showMap4 = true;
      }

  },
  created(){
    
  },
  watch : {
      showMap4:function(val) {
          if(val==false){
            this.$refs.videoPlayer.player.pause();
          }
      }
  }
}
</script>

<style scoped>
.mp4{
  position:relative;
  margin: 0px 5px;
  cursor: pointer;
  float:left;
}
.mp4_icon{
  font-size: 50px;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
.video-player >>> .video-js .vjs-big-play-button{
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
</style>
<style>
.mp4modal-panel .ivu-modal .ivu-modal-content{
  top:200px;
  left: 750px;
  width: 500px !important;
}
</style>
