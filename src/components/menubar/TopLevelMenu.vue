<template>
<div class="header_middle_menu come-in-to-be-pointer"  @mouseover="mouseenter" @mouseout="mouseleave">
    <div class="header_toplevelmenu" @click="herfUrl">
      <img  :src="menu_show" />
    </div>
    <p v-if="this.menu.menuname" :style="{color:menunamecolor}">{{this.menu.menuname}}</p>
    <div v-if="loadSecondLevelMenu"  v-show="showSecondLevelMenu" @mouseover="secondmenumouseenter" @mouseout="secondmenumouseleave"  :class="[secondlevelmenulistPanel,wrapper]">
        <div style="margin-top:25px;">
          <SecondLevelMenu  v-for="menuObj in secondmenuList" :key="menuObj.menuid" :click="clickMenuButton"  :menu=menuObj />
        </div>
    </div>
</div>
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
import SecondLevelMenu from '@/components/menubar/SecondLevelMenu'
export default {
  name: 'TopLevelMenu',
  components: {SecondLevelMenu},
  props:['menu'],
  data () {
    return {
        menu_show:{},
        loadSecondLevelMenu:false,
        showSecondLevelMenu:false,
        secondmenuList:[],
        wrapper:"wrapper",
        menunamecolor:"#b6f6ff",
    }
  },
  computed:{
    ...mapState({
    userInfo: state => state.userInfo,
    currentMenu: state => state.currentMenu,
    openMenuidList: state => state.openMenuidList,
  }),
    menu_leave:function(){
        return require("@/assets/toplevelmenu/top_level_menu_"+this.menu.iconname+".png");
    },
    menu_enter:function(){
        return require("@/assets/toplevelmenu/top_level_menu_"+this.menu.iconname+"_hov.png");
    },
    secondlevelmenulistPanel:function(){
      if(!this.menu.children){
         return;
      }
      if(this.menu.children.length>0&&this.menu.children.length<=4){
        return "secondlevelmenulistPanel_4";
      }else if(this.menu.children.length>4&&this.menu.children.length<=6){
        return "secondlevelmenulistPanel_6";
      }else if(this.menu.children.length>6&&this.menu.children.length<=8){
        return "secondlevelmenulistPanel_8";
      }else{
      }
    },
  },
  methods:{
    mouseenter(){
      if(!this.loadSecondLevelMenu){
        this.loadSecondLevelMenu=true;
      }
      this.menu_show=this.menu_enter;
      this.showSecondLevelMenu=true;
      this.menunamecolor="white";
      this.$emit("on-change",this.menu.xh);
    },
    mouseleave(){
      this.menu_show=this.menu_leave;
      this.showSecondLevelMenu=false;
      this.menunamecolor="#b6f6ff";
    },
    secondmenumouseenter(){
      this.showSecondLevelMenu=true;
    },
    secondmenumouseleave(){
      this.showSecondLevelMenu=false;
    },
    clickMenuButton(data){
      if(this.openMenuidList.indexOf(data.menuid)==-1){
        var arr2 = [...this.openMenuidList];
        arr2.push(data.menuid);
        this.$store.dispatch('putState',{"key":"openMenuidList","value":arr2});
     }
   },
   herfUrl(){
      if(this.menu.menuid == "19"){
        // var idcard = this.userInfo.idcard;
        window.open("http://41.226.0.251:8081/datasearch/#/login");
        // if(!idcard||idcard==""){
        //   window.open("http://41.226.0.251:8081/datasearch/#/login");
        // }else{
        //   window.open("http://41.226.0.251:8081/datasearch/#/login?idcard="+idcard);
        // }
      }
   }
  },
  created(){
    this.menu_show=this.menu_leave;
    this.secondmenuList=this.menu.children;
  },
}
</script>
<style scoped>
.header_middle_menu{
  position: relative;
  height: 70px;
  width: 80px;
  margin:auto;
  min-width: 60px;
}
.header_middle_menu  p{
  color: #b6f6ff;
  position: relative;
  color: #b6f6ff;
  font-size: 12px;
  margin-top: -28px;
  text-align: center;
}
.header_middle_menu img{
  position: relative;
  margin-top: 6px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 40px;
  height: 36px;
}
.header_toplevelmenu{
  height: 70px;
  width: 80px;
  margin: auto;
}
.secondlevelmenulistPanel_4{
  position: absolute;
  width: 239px;
  height: 242px;
  margin: -4px 0 0 -55px;
  background:
  url(./../../assets/secondlevelmenu/second_level_menu_bg_4.png) center no-repeat;
}
.secondlevelmenulistPanel_4>>>.secondlevelmenuPanel{
   margin: 27px 0 0 41px;
}
.secondlevelmenulistPanel_6{
  position: absolute;
  width: 239px;
  height: 355px;
  margin: -18px 0 0 -55px;
  background:
  url(./../../assets/secondlevelmenu/second_level_menu_bg_6.png) center no-repeat;
}
.secondlevelmenulistPanel_6>>>.secondlevelmenuPanel{
   margin: 33px 0 0 42px;
}
.secondlevelmenulistPanel_8{
  position: absolute;
  width: 239px;
  height: 474px;
  margin: -26px 0 0 -55px;
  background:
  url(./../../assets/secondlevelmenu/second_level_menu_bg_8.png) center no-repeat;
}
.secondlevelmenulistPanel_8>>>.secondlevelmenuPanel{
   margin: 38px 0 0 42px ;
}
.header_middle_menu >>> .wrapper{
  position: absolute;
} 
.header_middle_menu:hover >>> .wrapper{
    max-height: 484px;
    transition: max-height 0.3s ease-in;
    transform-origin: 50% 0;
    animation: slide-down 0.3s ease-in;
    -webkit-animation: slide-down 0.3s ease-in;
 } 
@keyframes slide-down{
  0%{transform:scale(1,0);}
  100%{transform:scale(1,1);}
}
@-webkit-keyframes slide-down{
  0%{-webkit-transform:scale(1,0);}
  100%{-webkit-transform:scale(1,1);}
}
</style>
