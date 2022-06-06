<template>
<div class="secondlevelmenuPanel" @click="menuClick">
    <div class="secondlevelmenu come-in-to-be-pointer"  @mouseenter="mouseenter" @mouseleave="mouseleave">
          <img  :src=menu_show />
    </div>
    <p v-if="this.menu.menuname" @mouseenter="mouseenter" @mouseleave="mouseleave">{{this.menu.menuname}}</p>
</div>
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'SecondLevelMenu',
  props:['menu','click'],
  data () {
    return {
        menu_show:{},
    }
  },
  computed:{
    menu_leave:function(){
        return require("@/assets/secondlevelmenu/second_level_menu_"+this.menu.iconname+".png");
    },
    menu_enter:function(){
        return require("@/assets/secondlevelmenu/second_level_menu_"+this.menu.iconname+"_hov.png");
    },
  },
  methods:{
    mouseenter(){
      this.menu_show=this.menu_enter;
    },
    mouseleave(){
      this.menu_show=this.menu_leave;
    },
    menuClick(){
    this.click(this.menu);
    this.$store.dispatch('putState',{"key":"currentMenu","value":this.menu});
    if(
      this.menu.menuid=='0210'||
      this.menu.menuid=='0211'||
      this.menu.menuid=='1606'||
      // this.menu.menuid=='0601'||
      this.menu.menuid=='0603'||
      this.menu.menuid=='1401'||
      this.menu.menuid=='1402'||
      this.menu.menuid=='1403'||
      this.menu.menuid=='1410'
    ){
      this.$store.dispatch('putState',{"key":"leftContentState","value":{'show':false,'left':0}});
    }else{
      this.$store.dispatch('putState',{"key":"leftContentState","value":{'show':true,'left':0}});
    }
    
    if( this.menu.menuid=='0401'||
        this.menu.menuid=='0402'||
        this.menu.menuid=='0403'||
        this.menu.menuid=='0404'||
        this.menu.menuid=='0405'||
        this.menu.menuid=='0406'||
        this.menu.menuid=='0501'||
        this.menu.menuid=='0502'||
        this.menu.menuid=='0503'||
        this.menu.menuid=='0504'||
        this.menu.menuid=='0505'||
        this.menu.menuid=='0506'||
        this.menu.menuid=='0601'||
        this.menu.menuid=='0701'||
        this.menu.menuid=='0703'||
        this.menu.menuid=='0706'||
        this.menu.menuid=='0707'||
        this.menu.menuid=='0801'||
        this.menu.menuid=='0802'||
        this.menu.menuid=='0803'||
        this.menu.menuid=='0804'||
        this.menu.menuid=='0805'||
        this.menu.menuid=='1501'||
        this.menu.menuid=='1503'||
        this.menu.menuid=='1504'||
        this.menu.menuid=='1505'||
        this.menu.menuid=='1506'||
        this.menu.menuid=='1608'||
        this.menu.menuid=='1609'||
        this.menu.menuid=='1610'||
        this.menu.menuid=='1901'||
        this.menu.menuid=='1902'||
        this.menu.menuid=='1903'){
      this.map.map.infoWindow.hide();//打开有ringhtpanel的菜单时让地图上弹框隐藏
      this.$store.dispatch('putState',{"key":"isShowUI","value":false});
      this.$store.dispatch('putState',{"key":"isShowMIdContent","value":true});
      this.$store.dispatch('putState',{"key":"isShowMIdContentByLeft","value":true});
    }else{
      this.$store.dispatch('putState',{"key":"isShowMIdContent","value":false});
    }
    if(
      this.menu.menuid=='1401'||
      this.menu.menuid=='1402'||
      this.menu.menuid=='1403'||
      this.menu.menuid=='1410'
    ){
      window.open(this.menu.innerhtml);
    }
    
    },
  },
  created(){
    this.menu_show=this.menu_leave;
  }
}
</script>
<style scoped>
.secondlevelmenuPanel{
  height: 60px;
  width: 60px;
  float: left;
  text-align: center;
  margin: 35px 0 0 40px;
}
.secondlevelmenuPanel  p{
  color: #b6f6ff;
  font-size: 12px;
  margin-top: 4px;
}
.secondlevelmenuPanel  img{
  height: 36px;
  width: 36px;
}
.secondlevelmenuPanel:hover  p{
  color: white;
  font-size: 12px;
  margin-top: 4px;
}
.secondlevelmenu{
  height: 36px;
  width: 36px;
  margin: auto;
}

</style>
