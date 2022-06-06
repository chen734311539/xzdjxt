<template>
    <div class="jldetail-panel">
        <div class="jlDetail-header">
          <div class="jltype">
            <div :class="jlpic"></div>
          </div>
            <div class="separator"></div>
          <div class="content">
            <span class="gpsname"  :style="{color:activecolor}"  >{{data.gpsname}}</span>
            <span class="deptname" :style="{color:activecolor}"  >{{data.deptname}}</span>
          </div>
          <div class="hfx-modal-close close" @click="closeInfoWindow"></div>
        </div>
        <div>
          <div class="ssjldeptname">
                <span style="color:white;">{{data.deptname}}</span>
          </div>
          <el-scrollbar v-show="showuserdiv" style="height: 110px;">
            <div style="display: flex;" v-for="userObj in users" :key="userObj.usercode" :data="userObj">
                  <div class="ssjluserpic">
                     <el-image :src="userObj.userpic" style="width: 93px; height: 100px;"></el-image>
                  </div>
                   <div class="ssjlusers">
                      <div style="margin-bottom:5px;">
                      <span style="color:58f5ff">姓名:</span>
                      <span style="color:white;">{{userObj.username}}</span>
                      </div>
                      <div style="margin-bottom:5px;">
                        <span style="color:#b6f6ff;">电话:</span>
                        <span style="color:white;">{{userObj.mobile}}</span>
                      </div>
                      <div style="margin-bottom:5px;">
                        <span style="color:#b6f6ff;">警号:</span>
                        <span style="color:white;">{{userObj.usercode}}</span>
                      </div>
                  </div>  
            </div>
          </el-scrollbar>
        </div>
      <div class="jlDetail-content">
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">巡逻区域:</span>
                <span style="color:white;">{{data.jjyxm}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">巡逻状态:</span>
                <span style="color:white;">{{data.state}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">行驶速度:</span>
                <span style="color:white;">{{data.speed}}</span>
              </div>
              <div style="margin-bottom:5px;">
                <span style="color:#b6f6ff;">设备编号:</span>
                <span style="color:white;">{{data.gpsid}}</span>
              </div>
              <div style="margin-bottom:-10px;position:relative;">
                <span style="color:#b6f6ff;">定位时间:</span>
                <span style="color:white;">{{data.uptime}}</span>
              </div>
        </div>
        <div class="jlDetail-footer">
          <div style="margin-top:0px;margin-bottom:10px;">
            <!-- <Button v-show="!isMapCreate" type="primary" size="small" style="width:64px;margin-left:10px;" @click="jlzbClick">周边</Button>
            <Button v-show="!isMapCreate" type="primary" size="small" style="width:64px;margin-left:10px;">视频</Button>
            <Button v-show="!isMapCreate" type="primary" size="small" style="width:64px;margin-left:10px;" @click="jlgjClick">轨迹</Button>
            <Button v-show="!isMapCreate" type="primary" size="small" style="width:64px;margin-left:10px;">追踪</Button> -->
            <HfxButton v-show="!isMapCreate" style="width:64px;margin-left:5px;" @click="jlzbClick"  name="周边" />
            <HfxButton v-show="!isMapCreate" style="width:64px;margin-left:10px;" @click="jlspClick" name="视频" />
            <HfxButton v-show="!isMapCreate" style="width:64px;margin-left:10px;" @click="jlgjClick"  name="轨迹" />
            <HfxButton v-show="!isMapCreate" style="width:64px;margin-left:10px;"   name="追踪" />
          </div>
          <div>
            <!-- <Button v-show="!isMapCreate" type="primary" size="small" style="width:64px;margin-left:5px;">指令</Button> -->
            <HfxButton v-show="!isMapCreate" style="width:64px;margin-left:5px;"   name="指令" />
          </div>
        </div>
        <Modal v-model="showJlGuiJiPanel" :draggable = "true" title="警力轨迹查询" :footer-hide="true" class="jlguiji-panel">
          <div slot="close"><div class="hfx-modal-close"  @click="closeGuiji" /></div>
          <JingLiGuiJi :gpsdata="data" ref="jlgj" />
        </Modal>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'
import JingLiGuiJi from '@/components/module/jl/JingLiGuiJi'

export default {
  name: 'JingLiDetailMap',
  props:['jlid','mapObj'],
  components: {JingLiGuiJi},
  data () {
    return {
      data:{},
      users:[],
      showuserdiv:false,
      showJlGuiJiPanel:false
    }
  },
  computed: {
    gpsurl:function(){
        var gpsicon = "";
        if(this.data.online=="1"){
           gpsicon = Constants.gps_prefix+this.data.gpsonlineurl;
        }else{
           gpsicon = Constants.gps_prefix+this.data.gpsnoonlineurl; 
        }
      return gpsicon;
    },
    isMapCreate:function(){//1是 0不是，是的话就不是那个正常的地图，是其他地方用地图，禁用各种与地图有关的功能
      var a = false;
      if(this.mapObj&&this.mapObj.id){
        a = true;
      }
      return a;
    },
        jlpic:function(){
      if(this.data.typecode=="5"){
        if(this.data.online=="1"){
          return 'djjonline';
        }else{
          return 'djjoffline';
        }
      }else if(this.data.typecode=="2"){
        if(this.data.online=="1"){
          return 'mtconline';
        }else{
          return 'mtcoffline';
        }
      }else if(this.data.typecode=="3"){
        if(this.data.online=="1"){
          return 'jconline';
        }else{
          return 'jcoffline';
        }
      }else if(this.data.typecode=="4"){
        if(this.data.online=="1"){
          return 'jwtonline';
        }else{
          return 'jwtoffline';
        }
      }else if(this.data.typecode=="05"){
        if(this.data.online=="1"){
          return 'zfyonline';
        }else{
          return 'zfyoffline';
        }
      }else if(this.data.typecode=="9"){
        if(this.data.online=="1"){
          return 'zycryonline';
        }else{
          return 'zfyryoffline';
        }
      }else if(this.data.typecode=="10"){
        if(this.data.online=="1"){
          return 'zycybonline';
        }else{
          return 'zycyboffline';
        }
      }else{
         return '';
      }
    },
    activecolor:function(){
       if(this.data.online=="1"){
          return '#b6f6ff';
        }else{
           return '#b6f6ff';
        }
    }
  },
  methods:{
    closeInfoWindow(){
      if(this.mapObj){
          this.mapObj.map.infoWindow.hide()
      }else{
        this.map.map.infoWindow.hide()
      }
    },
    getSsjlByIdCallBack(data){
      this.data = data;
      for(var i=0;i<data.users.length;i++){
        data.users[i].userpic = Constants.file_url+"users/"+data.users[i].avatar;
      }
      this.users = data.users;
      if(data.users.length>0){
        this.showuserdiv = true;
      }
    },
    jlspClick(){
        if(typeof(this.data.deviceid)=="undefined" || this.data.deviceid==null || this.data.deviceid==""){
          alert("该设备无设备ID，暂时无法提供视频！");
        }else{
          window.open("alert:"+Constants.url_prefix+"/static/iehtml/showVideo.html?"+this.data.deviceid,"_self","height=0,width=0,top=1000px,alwaysLowered=yes");
        }
    },
    jlzbClick(){
      markUtil.drawCircle(this.data.loc.x,this.data.loc.y,1/111,this)
    },
    jlgjClick(){
      this.showJlGuiJiPanel = true;
    },
    closeGuiji(){
      this.$refs.jlgj.stopJlGj();
      markUtil.clearLayer("ssjlgjlayer",this);//清除轨迹所有图层
      markUtil.clearLayer("ssjlgjlinelayer",this);//清除轨迹所有图层
    },
  },
  mounted(){
       this.http.get("/ssjl/getSsjlDetailByGpsid",{"gpsid":this.jlid},this.getSsjlByIdCallBack,this,false);
  }
}
</script>

<style scoped>
.jldetail-panel{
  width: 315px;
  height: 300px;
  position:relative;
}
.jlDetail-header{
  position: relative;
  height: 65px;
  border-bottom: 1px solid #2e8cb8;
  /* padding: 14px 16px;
   background:
  url(./../../../assets/modal/modal_header_bg.png) no-repeat left top; */
}
.typename{
  position:absolute;
  font-size: 16px;
  color: #19a1ef;
  top: 20px;
  left:15px;
}
.gpsname{
  position: absolute;
  color: #fff;
  font-size: 14px;
  top: 20px;
  left:69px
}
.gpsicon{
  position: absolute;
  right: 51px;
  top: 15px;
  width: 39px;
}
.close{
  position:absolute;
  font-size: 31px;
  color: white;
  right: 9px;
  top: 10px;
  cursor: pointer;
}
.jlDetail-content{
  width: 100%;
  padding-left: 22px;
  padding-top: 11px;
  /* border-left: 2px solid #b6f6ff; */
  /* border-right: 2px solid #b6f6ff; */
  left: 10px;
  height: calc(100% - 65px - 108px);
  margin: 0px 0 10px 0;
}
.ssjldeptname{
  padding-left: 20px;
  padding-top: 10px;
  /* border-left: 2px solid #b6f6ff; */
  /* border-right: 2px solid #b6f6ff; */
}
.ssjluserpic{
  /* display: inline-block; */
  padding-left: 20px;
}
.ssjlusers{
  /* display: inline-block; */
  padding-left: 10px;
}
.jlDetail-footer{
  height: 80px;
  /* border: 2px solid #b6f6ff; */
  border-top:none;
  /* background:
  url(./../../../assets/modal/modal_footer_bg.png) no-repeat right bottom; */
}
.djjonline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_djj_online.png)  no-repeat;
    background-size: 100%;
}
.djjoffline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_djj_offline.png)  no-repeat;
    background-size: 100%;
}
.mtconline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_mtc_online.png)  no-repeat;
    background-size: 100%;
}
.mtcoffline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_mtc_offline.png)  no-repeat;
    background-size: 100%;
}
.jconline{
  position: absolute;
  width: 40px;
  height: 31px;
  top: 20px;
  left: 8px;
  background: 
    url(./../../../assets/jl/ssjl_jc_online.png)  no-repeat;
    background-size: 100%;
}
.jcoffline{
  position: absolute;
  width: 40px;
  height: 31px;
  top: 20px;
  left: 8px;
  background: 
    url(./../../../assets/jl/ssjl_jc_offline.png)  no-repeat;
    background-size: 100%;
}
.jwtonline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_jwt_online.png)  no-repeat;
    background-size: 100%;
}
.jwtoffline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_jwt_offline.png)  no-repeat;
    background-size: 100%;
}
.zfyonline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_zfy_online.png)  no-repeat;
    background-size: 100%;
}
.zfyoffline{
  position: absolute;
  width: 27px;
  height: 31px;
  top: 20px;
  left: 15px;
  background: 
    url(./../../../assets/jl/ssjl_zfy_offline.png)  no-repeat;
    background-size: 100%;
}
.zycryonline{
  position: absolute;
  width: 30px;
  height: 35px;
  top: 20px;
  left: 12px;
  background: 
    url(./../../../assets/jl/ssjl_zyc_online.png)  no-repeat;
    background-size: 100%;
}
.zycryoffline{
  position: absolute;
  width: 30px;
  height: 35px;
  top: 20px;
  left: 12px;
  background: 
    url(./../../../assets/jl/ssjl_zyc_offline.png)  no-repeat;
    background-size: 100%;
}
.zycybonline{
  position: absolute;
  width: 30px;
  height: 35px;
  top: 20px;
  left: 12px;
  background: 
    url(./../../../assets/jl/ssjl_zyc_online.png)  no-repeat;
    background-size: 100%;
}
.zycyboffline{
  position: absolute;
  width: 30px;
  height: 35px;
  top: 20px;
  left: 12px;
  background: 
    url(./../../../assets/jl/ssjl_zyc_offline.png)  no-repeat;
    background-size: 100%;
}
.separator{
  position: absolute;
    left: 56px;
    top: 25%;
    width: 1px;
    height: 38px;
    background: 
    url(./../../../assets/jq/ssjq_separatorline.png)  no-repeat;
}
.content{
  position:absolute;
  left:65px;
  top:15px;
  width: 60%;
}
.gpsname{
  position: absolute;
  font-size: 14px;
  top: 0px;
  left: 5px;
}
.deptname{
  position: absolute;
  top: 25px;
  left: 5px;
  font-size: 12px;
}
</style>
<style>
.jlguiji-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left:1205px;
  width: 715px !important;
  height: 405px !important;
}
</style>