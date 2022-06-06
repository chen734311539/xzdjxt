<template>
    <Modal v-model="showPanel" :draggable="true" class-name="jqda-panel" :footer-hide="true" >
        <div slot="header" style="float:left;">
            <div style="width:272px;float:left;">全息档案</div>
        </div>
        <div slot="close" style="float:left;"><div @click="closePanel" class="hfx-modal-close"/></div>
        <div style="width:100%;height:280px" v-loading="loading" element-loading-text="加载数据中..."
         element-loading-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,0.5)">
             <div style="height:138px;">
                <div class="rytp">
                    <img :src="jqdaObj.rytp" width="125px" height="138px"/>
                </div>
                <div style="width:65%;float: left;padding-left: 20px;">
                    <div class="divclass">
                        <span>姓名：</span>
                        <span style="color:#fff">{{jqdaObj.xm}}</span>
                    </div>
                    <div class="divclass">
                        <span>身份证号：</span>
                        <span style="color:#fff">{{jqdaObj.sfzh}}</span>
                    </div>
                    <div class="divclass">
                        <span style="color:red;">置信度：</span>
                        <span style="color:#fff">{{getPercent(jqdaObj.zxd)}}</span>
                    </div>
                    <div class="divclass">
                        <span>车辆信息：</span>
                        <span style="color:#fff">{{jqdaObj.clxx}}</span>
                    </div>
                    <div class="divclass">
                        <span>户籍所在地：</span>
                        <span style="color:#fff">{{jqdaObj.hjszd}}</span>
                    </div>
                </div>
             </div>
             <div style="padding-top: 20px;">
                <div class="divclass" style="width:318px">
                    <span>实际居住地：</span>
                    <div style="float: right;width: 242px;color:#fff;">{{jqdaObj.sjjzd}}</div>
                </div>
                <div class="divclass">
                    <span>是否前科：</span>
                    <span style="color:#fff">{{jqdaObj.isqk}}</span>
                </div>
                <div class="divclass">
                    <span>是否精神病：</span>
                    <span style="color:#fff">{{jqdaObj.isjsb}}</span>
                </div>
                <div class="divclass">
                    <span>是否重点上访：</span>
                    <span style="color:#fff">{{jqdaObj.issf}}</span>
                </div>
                <div class="divclass">
                    <span>特殊身份：</span>
                    <span style="color:#fff">{{jqdaObj.tssf}}</span>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"

export default {
  name: 'RydaInfo',
  props: ['showPanel','lxdh'],
  components: {},
  data () {
    return {
        jqdaObj:{},
        loading:false,
    }
  },
  computed: mapState({
  }),
  methods:{
     closePanel(){
        this.$emit('on-close');
      },
      getPercent(point){
          var str=Number(point*100).toFixed(4);
          str+="%";
          return str;
      },
      getRyda(lxdh){
          this.loading = true;
          var param = {};
          param.lxdh = lxdh;
          this.http.get("/ssjq/getJqdaInfo",param,this.jqdaClickCallBack,this,false);
      },
      jqdaClickCallBack(data){
         this.jqdaObj = data;
         this.loading = false;
      },
  },
  created(){
     
  },
  mounted(){
      
  },
  watch: {
      lxdh:function(val){
         this.getRyda(val);
      }
  }
}
</script>

<style scoped>
.ryxxInfo_panel{
    height: 100%;
    width: 260px;
    float: left;
    border: 1px solid #2c6daf;
}
.rysjsaInfo_panel{
    height: 100%;
    width: 590px;
    float: left;
    border: 1px solid #2c6daf;
    border-left: 0px;
}
.ryhdqkInfo_panel{
    height: 100%;
    width: 200px;
    float: left;
    border: 1px solid #2c6daf;
    border-left: 0px;
}
.ryhdsxtInfo_panel{
    height: 100%;
    width: 510px;
    float: left;
    border: 1px solid #2c6daf;
    border-left: 0px;
}
.rytp{
  float: left;
  right: 28px;
  width: 35%;
  height: 138px;
}
.divclass{
    height: 25px;
    width: 189px;
}
</style>
<style>
.jqda-panel .ivu-modal .ivu-modal-content{
  top:170px;
  left: 387px;
  width: 430px !important;
  /* background-color: #011931 !important; */
}
.jqda-panel .ivu-modal .ivu-modal-header{
  height: 45px !important;
}
</style>
