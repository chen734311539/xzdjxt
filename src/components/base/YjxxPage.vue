<template>
    <div class="yjxx_table" :class="[showPage==true?'yjxxsidetoleft':'yjxxsidetoright']">
        <div class="yjxx_title">
            <div class="yjxx_text">预警信息</div>
        </div>
        <div style="position:relative;width:calc(100% - 10px);height:calc(100% - 50px);margin:5px;">
            <div style="position:relative;width:100%;height:calc(100% - 50px);margin-top: 5px;">
                <div class="yqd_user_top" :class="[showtab=='xfyj'?'wqd_user_top':'']" @click="showTabel('xfyj')">消防预警</div>
                <div class="yqd_user_top" :class="[showtab=='ckyj'?'wqd_user_top':'']" @click="showTabel('ckyj')">CK预警</div>
                <div class="yqd_user_top" :class="[showtab=='bkyj'?'wqd_user_top':'']" @click="showTabel('bkyj')">布控预警</div>
               <div v-if="showtab=='xfyj'" class="yjxx_list_div" style="margin-right: 14px;">
                    <div class="bkyjitem" v-for=" obj in xfyjlist" :key="obj.id">
                       <div style="width: 100%;height: 30px;line-height: 45px;">
                            <span style="position:relative;margin-left:10px;">{{obj.addr}}</span>
                       </div>
                       <div style="width: 100%;height: 35px;line-height: 45px;">
                            <span style="position:relative;margin-left:10px;">{{obj.typename}}</span>
                            <span style="position: absolute;right: 10px;">{{obj.bjsj}}</span>
                       </div>
                    </div>
               </div>
               <div v-if="showtab=='ckyj'" class="yjxx_list_div">
                    <div class="bkyjitem" v-for=" obj in ckyjlist" :key="obj.id">
                       <div style="width: 100%;height: 30px;line-height: 45px;">
                            <span style="position:relative;margin-left:10px;">{{obj.addr}}</span>
                       </div>
                       <div style="width: 100%;height: 35px;line-height: 45px;">
                            <span style="position:relative;margin-left:10px;">{{obj.bjnr}}</span>
                            <span style="position: absolute;right: 10px;">{{obj.bjsj}}</span>
                       </div>
                    </div>
               </div>
               <div v-if="showtab=='bkyj'" class="yjxx_list_div">
                    <div class="bkyjitem" v-for=" obj in bkyjlist" :key="obj.id" @click="clickBtn(obj)">
                       <div style="width: 100%;height: 30px;line-height: 45px;">
                            <span style="position:relative;margin-left:10px;">{{obj.sitename}}</span>
                            <span>({{obj.alarmtarget}})</span>
                       </div>
                       <div style="width: 100%;height: 35px;line-height: 45px;">
                            <span style="position:relative;margin-left:10px;">{{obj.deploytype}}</span>
                            <span style="position: absolute;right: 10px;">{{obj.alarmtime}}</span>
                       </div>
                    </div>
               </div>
            </div>
        </div>
        <div :class="[showPage==true?'leftContentShow':'leftContentHide']" @click="hideleft"></div> 
  </div>
</template>
<script>
import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import map3DUtil from '@/components/map/js/map3DUtil'
export default {
    name: 'YjxxPage',
    props:['isshow'],
    data() {
        return {
            treeData:[],
            showtab:'xfyj',
            bkyjlist:[],
            xfyjlist:[],
            ckyjlist:[],
            showPage:true,
        };
    },
    computed: mapState({
        userInfo: state => state.userInfo,
        pushBkyj: state => state.push.bkyj,
        pushXfyj: state => state.push.xfyj,
        pushCkyj: state => state.push.ckyj,
        currentMapType:state => state.currentMapType,
    }),
    methods:{
        hideleft(){
          this.showPage = !this.showPage;
        },
        showTabel(num){
            this.showtab = num;
            this.getAlarmYjxx();
        },
        getAlarmYjxx(){
            var paramObj = {}
            paramObj.page = 1;
            paramObj.pagesize = 15;
            paramObj.oragin = this.showtab;
            this.http.get("/ssjq/getAlarmYjxx",paramObj,this.getAlarmYjxxCallBack,this,false);
        },
        getAlarmYjxxCallBack(data){
            if(this.showtab=='bkyj'){
                this.bkyjlist = data.data;
                yewuMarkUtil.addBkyjMarks(this.bkyjlist,this);//打点
            }
            if(this.showtab=='xfyj'){
                this.xfyjlist = data.data;
            }
            if(this.showtab=='ckyj'){
                this.ckyjlist = data.data;
            }
        },
        clickBtn(data){
            if(data.loc&&data.loc.x){//地图上显示
                if(this.currentMapType=="3D"){
                  map3DUtil.map3dCenterAt(data.loc);
                }else{
                   markUtil.centerAndShow("bkyjLayer",data.id,this);
                }
            }else{//没有坐标，不在地图上显示
            
            }
        },
    },
    created(){
        this.getAlarmYjxx();
    },
    watch : {
      pushBkyj:function(val) {//布控预警推送
        this.showTabel("bkyj");
      },
      pushXfyj:function(val) {//消防预警推送
        this.showTabel("xfyj");
      },
      pushCkyj:function(val) {//CK预警推送
        this.showTabel("ckyj");
      },
      isshow:function(val){
        this.showPage = val;
      }
    }
}
</script>

<style scoped>
.yjxx_table{
    position: absolute;
    width: 370px;
    height: 440px;
    background: #0e396d;
    -webkit-box-shadow: 0 0 5px 0 #0a1e65;
    box-shadow: 0 0 5px 0 #0a1e65;
    top: 30%;
    right: 10px;
    z-index: 10;
}
.yjxx_content{
  position: relative;
  width: 100%;
  height: 100%;
}
.yjxx_title{
    height: 40px;
    width: 100%;
}
.yjxx_text{
    color: #fff;
    text-align: center;
    line-height: 40px;
    height: 40px;
    float: left;
    width: 100%;
    cursor: move;
    font-size: 14px;
    background: #166bb3; 
}
.yjxx_close{
  cursor: pointer;
  width: 40px;
  height: 40px;
  float: right;
  display: flex;
  background: #155286;
  justify-content: center;
  align-items: center;
  position: relative;
}
.yjxx_close:hover{
  background-color: #f94747;
}
.yjxx_list_div{
    position: relative;
    width: 100%;
    height: 365px;
    float: left;
    overflow-x: hidden;
    overflow-y: auto;
    background: #166bb3;
}
.bkyjitem{
    position: relative;
    width: calc(100% - 10px);
    height: 65px;
    color: #fff;
    background: #08385a;
    margin: 6px 5px;
    cursor: pointer;
}
.yqd_user_top{
    width: 111px;
    height: 26px; 
    float: left;
    text-align: center;
    line-height: 26px;
    color: #fff;
    cursor: pointer;
    background: url("./../../assets/zbbq/bq01.png") center no-repeat;
    background-size: 100% 100%;
}
.wqd_user_top{
    width: 111px;
    height: 26px; 
    text-align: center;
    line-height: 26px;
    cursor: pointer;
    color: #fff;
    background: url("./../../assets/zbbq/bq02.png") center no-repeat;
    background-size: 100% 100%;  
}
.leftContentHide{
    position:absolute;
    width: 13px;
    height: 31px;
    top: 50%;
    left: -12px;
    background:url(./../../assets/leftcontent/leftcontent_hide.png)  center  no-repeat;
    z-index: 2;
    cursor: pointer;
}
.leftContentShow{
    position:absolute;
    width: 13px;
    height: 31px;
    top: 50%;
    left: -12px;
    background:url(./../../assets/leftcontent/leftcontent_show.png)  center  no-repeat;
    z-index: 2;
    cursor: pointer;
}
.yjxxsidetoleft{
  right: 0px;
  animation: slide-left 0.5s ease-in;
  -webkit-animation: slide-left 0.5s ease-in;
}
.yjxxsidetoright{
  right: -370px;
  animation: slide-right 0.5s ease-in;
  -webkit-animation: slide-right 0.5s ease-in;
}
@keyframes slide-left{
  0%{
    right:-370px;
    opacity: 0;
    }
  100%{
    right:0px;
    opacity: 1;
    }
}
@-webkit-keyframes slide-left{
  0%{
    right:-370px;
    opacity: 0;
   }
  100%{
     right:0px;
     opacity: 1;
    }
}
@keyframes slide-right{
  0%{
    right: 0px;
    opacity: 1;
    }
  100%{
    right:-370px;
     opacity: 0;
    }
}
@-webkit-keyframes slide-right{
  0%{
    right: 0px;
    opacity: 1;
    }
  100%{
    right:-370px;
    opacity: 0;
    }
}
</style>