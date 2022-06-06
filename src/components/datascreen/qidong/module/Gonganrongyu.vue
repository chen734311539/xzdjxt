<template>
  <div class="gonganrongyuPanel">
        <div class="titleDiv"><span>公安荣誉</span></div>
        <div class="contentDiv">
            <div class="jiang1">
                <img src="@/assets/datascreen/qidong/gary/2013.png" style="width:100%;height:100%;"/>
            </div>
            <div class="jiang2">
                <img src="@/assets/datascreen/qidong/gary/2015.png" style="width:100%;height:100%;"/>
            </div>
            <div class="jiang3">
                <img src="@/assets/datascreen/qidong/gary/2016.png" style="width:100%;height:100%;"/>
            </div>
            <div class="textPanel flexc">
                <div class="flexr">
                  <img src="@/assets/datascreen/qidong/gary/ry.png" style="width:30px;height:31px;z-index:2;"/>
                  <img src="@/assets/datascreen/qidong/gary/rybj.png" style="width:80%;height:26px;margin-left:-10px;z-index:1;margin-bottom:3px;"/>
                  <div class="textdiv">全省县级公安机关绩效考评<span>优胜单位</span></div>
                </div>
                <div class="flexr">
                  <img src="@/assets/datascreen/qidong/gary/ry.png" style="width:30px;height:31px;z-index:2;"/>
                  <img src="@/assets/datascreen/qidong/gary/rybj.png" style="width:80%;height:26px;margin-left:-10px;z-index:1;margin-bottom:3px;"/>
                  <div class="textdiv">县级公安机综合考核<span>优胜公安局</span></div>
                </div>
                <div class="flexr">
                  <img src="@/assets/datascreen/qidong/gary/ry.png" style="width:30px;height:31px;z-index:2;"/>
                  <img src="@/assets/datascreen/qidong/gary/rybj.png" style="width:80%;height:26px;margin-left:-10px;z-index:1;margin-bottom:3px;"/>
                  <div class="textdiv">县级公安机综合考核<span>先进集体</span></div>
                </div>
                <div class="flexr">
                  <img src="@/assets/datascreen/qidong/gary/ry.png" style="width:30px;height:31px;z-index:2;"/>
                  <img src="@/assets/datascreen/qidong/gary/rybj.png" style="width:80%;height:26px;margin-left:-10px;z-index:1;margin-bottom:3px;"/>
                  <div class="textdiv">2016年度<span>五星级机关（单位）</span></div>
                </div>
                <div class="flexr">
                  <img src="@/assets/datascreen/qidong/gary/ry.png" style="width:30px;height:31px;z-index:2;"/>
                  <img src="@/assets/datascreen/qidong/gary/rybj.png" style="width:80%;height:26px;margin-left:-10px;z-index:1;margin-bottom:3px;"/>
                  <div class="textdiv">2010-2012年度江苏省<span>文明单位</span></div>
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
  name: 'Gonganrongyu',
  components:{},
  data () {
    return {
    }
  },
  computed:mapState({
  }),
  methods:{
  },
  mounted(){
    
  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.gonganrongyuPanel{
  position: relative;
  width: 100%;
  height: 100%;
}
.titleDiv{
  height: 11.5385%;
  color: rgb(17,255,255);
  font-family: SimHei;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  user-select: none;
  margin-left: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: start;
}
.titleDiv span{
  margin-left:15px;
}
.contentDiv{
  width: 100%;
  height: 88.4615%;
  padding: 10px 5px 5px 5px;
  user-select: none;
}
.jiang1{
  position:absolute;
  left: 6%;
  top:20%;
  width: 20%;
  height: 20%;
}
.jiang2{
  position:absolute;
  left: 20%;
  top:45%;
  width: 20%;
  height: 20%;
}
.jiang3{
  position:absolute;
  left: 34%;
  top:70%;
  width: 20%;
  height: 20%;
}
.textPanel{
  position:absolute;
  bottom: 0%;
  right: 0px;
  height: 88.4615%;
  width: 45%;
}
.textdiv{
  z-index: 3;
  position:absolute;
  color:white;
  font-size:12px;
  left: 22%;
}
.textdiv span{
  color: yellow;
}
</style>
