<template>
    <div class="moudle-name-bar">
        <div class="moudle-name-pic">
          <img  :src=title_pic style="width:16px;height:16px;" />
        </div>
        <div class="moudle-name-title">
          <p>{{currentMenu.menuname}}</p>
        </div>
        <div class="moudle-name-screen" v-show="isshowshaixuan">
          <div>筛选条件</div>
          <div class="moudle-name-screen-icon" @click="clickShaiXuan">
          </div>
          <div v-show="isshowclear" class="moudle-name-screen-clear-icon" @click="clearShaiXuan">
          </div>
        </div>
        <div class="moudle-close" v-show="isshowclose" @click="clickClose" >
        </div>
    </div> 
</template>
<script>

import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
export default {
  name: 'LeftContentNameBar',
  components: {},
  props: {
    isshowshaixuan: {
      type:Boolean,
      default:false,
    },
    isshowclear: {
      type:Boolean,
      default:true,
    },
    isshowclose:{
      type:Boolean,
      default:false,
    },
  },
  data () {
    return {
        
    }
  },
  computed: {
    ...mapState({
    currentMenu: state => state.currentMenu,
  }),
  title_pic:function(){
  return require("@/assets/leftcontenttitle/leftcontent_title_menu_"+this.currentMenu.iconname+".png");
  }

  },
  methods:{
    clearShaiXuan(){
      this.$emit("on-clear");
    },
    clickShaiXuan(){
      this.$emit("on-click");
    },
    clickClose(){//返回实时警情模块
      //实时警情按钮信息
      var ssjqmenu={"menuid":"0201","menuname":"实时警情","pmenuid":"02","seq":1,"key":"ssjq","used":"1","ismenubar":"1","icon":"icon-zn_ssjq","innerhtml":"/jczh/view/ssjq/ssjq.html","iconname":"shishijingqing"};
      this.$store.dispatch('putState',{"key":"leftContentState","value":{'show':true,'left':0}});
      this.$store.dispatch('putState',{"key":"isShowMIdContent","value":false});
      this.$store.dispatch('putState',{"key":"currentMenu","value":ssjqmenu});
      this.$store.dispatch('putState',{"key":"isShowUI","value":true});
    },
  },
  created(){
  },
}
</script>

<style scoped>
.moudle-name-bar{
  height: 32px;
  display: flex;
  margin: 15px 0 23px 0;
  line-height: 32px;
  border-bottom:1px solid #b6f6ff;
  position: relative;
}
.moudle-name-pic{
  width: 16px;
  height: 16px;
  margin-top: 4px;
}
.moudle-name-title{
  color: #b6f6ff;
  font-size: 14px;
  margin-left: 6px;
}
.moudle-name-screen{
  position: absolute;
  right: 0;
  color: #b6f6ff;
  font-size: 12px;
  display: flex;
}
.moudle-name-screen-icon{
  width: 32px;
  height: 32px;
  margin-left: 5px;
  background:url(./../../assets/leftcontent/leftcontent_namebar_shaixuan.png)  center  no-repeat;
}
.moudle-name-screen-icon:hover{
  width: 32px;
  height: 32px;
  margin-left: 5px;
  background:url(./../../assets/leftcontent/leftcontent_namebar_shaixuan_hov.png)  center  no-repeat;
}
.moudle-name-screen-clear-icon{
  width: 32px;
  height: 32px;
  background:url(./../../assets/leftcontent/leftcontent_namebar_shaixuan_clear.png)  center  no-repeat;
}
.moudle-name-screen-clear-icon:hover{
  width: 32px;
  height: 32px;
  background:url(./../../assets/leftcontent/leftcontent_namebar_shaixuan_clear_hov.png)  center  no-repeat;
}
.moudle-close{
  width: 32px;
  height: 32px;
  background:url(./../../assets/leftcontent/leftcontent_namebar_shaixuan_clear.png)  center  no-repeat;
  position: absolute;
  right: 0;
}
.moudle-close{
    height: 26px;
    width: 26px;
    background: 
    url(./../../assets/modal/modal_close.png) center no-repeat;
}
.moudle-close:hover{
    height: 26px;
    width: 26px;
    background: 
    url(./../../assets/modal/modal_close_hov.png) center no-repeat;
}
</style>