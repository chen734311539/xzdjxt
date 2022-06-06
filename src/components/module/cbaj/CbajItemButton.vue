<template>
    <div class="cbajItemButton" @click="showFollowPanel" @mouseover="mouseOver" @mouseout="mouseOut">
        <div class="cbajbuttonTX" :class="cbajbuttonBorder">
            <img v-show="data.istop=='1'" src="@/assets/jq/ssjq_zhiding.png" class="zhiding"/>
        </div>
        <div class="content">
            <span class="title" :title="data.title">{{titlespan}}</span>
            <span class="deptnames" :title="data.deptnames">{{deptnamesspan}}</span>
            <span class="username">{{data.insertusername}}</span>
            <span class="dateandtime">{{date+" "+time}}</span>
         </div>
        <div :class="state">
        </div>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'CbajItemButton',
  props:['data'],
  components:{},
  data () {
    return {
        showdata:{showmodal:false},
        cbajbuttonBorder:"cbajbuttonBorder_leave",
    }
  },
  computed: {
    titlespan:function(){
      var spancontent = this.data.title;
      if(this.data.title.length>=12){
        spancontent = this.data.title.substr(0,12)+"...";
      }
      return spancontent;
    },
    deptnamesspan:function(){
      var spancontent = this.data.deptnames;
      if(this.data.deptnames.length>=9){
        spancontent = this.data.deptnames.substr(0,9)+"...";
      }
      return "["+spancontent+"]";
    },
    date:function(){
      var sj = this.data.lasttime.split(" ")[0];
      return sj.split("-")[1]+"-"+sj.split("-")[2];
    },
    time:function(){
      var sj = this.data.lasttime.split(" ")[1];
      return sj.split(":")[0]+":"+sj.split(":")[1];
    },
    isshowdingwei:function(){
      if(this.data.loc&&this.data.loc.x){
        return true;
      }
      return false;
    },
    state:function(){
        if(this.data.state=='1'||this.data.state=='0'){
            return "state_chucha";
        }else if (this.data.state=='2'){
            return "state_zaizhen";
        }else if (this.data.state=='3'){
            return "state_yipo";
        }else{}
    },
  },
  methods:{
    clickHandler(){
      this.$emit('on-click',this.data);
    },
    mouseOver(){
       this.cbajbuttonBorder="cbajbuttonBorder_enter";
     },
     mouseOut(){
       this.cbajbuttonBorder="cbajbuttonBorder_leave";
     },
     showFollowPanel(){
    //    this.initRightPaneldata(this.data.id,"cbaj");
     }
  },
  created(){
    
  }
}
</script>

<style scoped>
.cbajItemButton{
   width: 94%;
  height: 70px;
  margin: 8px 0 0 6px;
  position: relative;
  padding: 13px 0px;
  cursor: pointer;
}
.zhiding{
  position:absolute;
  top:2px;
  left: 2px;
}
.content{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
}
.title{
  position: absolute;
  color: #b6f6ff;
  font-size: 14px;
  top: 0px;
  left: 10px;
}
.deptnames{
 position: absolute;
  color: #b6f6ff;
  font-size: 12px;
  left: 10px;
  top: 18px;
}
.username{
 position: absolute;
  color: #b6f6ff;
  font-size: 12px;
  left: 10px;
  top: 33px;
}
.dateandtime{
 position: absolute;
  color: #b6f6ff;
  font-size: 12px;
  right: 100px;
  top: 33px;
}
.caozuo{
  display: flex;
  position: absolute;
  right: 50px;
  top:33px;
}
.dingwei{
  position: absolute;
    color: #2d8cf0;
    left: 142px;
    top: 18px;
    font-size: 15px;
}
.edit{
  position: absolute;
  color: #2d8cf0;
  left: 161px;
  top: 17px;
}
.direction{
  right: 10px;
  position: absolute;
  color: #fff;
  font-size: 25px;
  top: 22px;
}
.cbajstate{
  position: absolute;
  right: 40px;
  font-size: 40px;
  width: 55px;
  height: 43px;
  color: red;
  top: 10px;
}
.cbajbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.cbajbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.cbajbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.cbajbuttonTX:hover, .cbajbuttonTX:focus, .cbajbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
.mdyIcon{
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-right:10px;
  background: 
  url(./../../../assets/ajzc/ajzc_mdy.png)  no-repeat;
}
.state_chucha{
  position: absolute;
  right: 5px;
  width: 47px;
  height: 45px;
  background: 
  url(./../../../assets/ajzc/ajzc_chucha.png)  no-repeat;
}
.state_zaizhen{
  position: absolute;
  right: 5px;
  width: 47px;
  height: 45px;
  background: 
  url(./../../../assets/ajzc/ajzc_zaizhen.png)  no-repeat;
}
.state_yipo{
  position: absolute;
  right: 5px;
  width: 47px;
  height: 45px;
  background: 
  url(./../../../assets/ajzc/ajzc_yipo.png)  no-repeat;
}
</style>
