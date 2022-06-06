<template>
  <div class="ybss_dzpenel">
      <!-- 楼栋信息 -->
       <div class="box_div">
           <div class="header_div">
               <!-- <img src="@/assets/ybss/point1.png" style="position: absolute;left: 5px;top: 5px;"/> -->
               <div class="header_text">楼栋编号：{{buildingcode}}</div>
               <img src="@/assets/ybss/close.png" style="position: absolute;right: 5px;top: 7px;cursor: pointer;" @click="closeBuilding"/>
           </div>
           <div style="position: relative;width:100%;height:calc(100% - 40px);">
               <img src="@/assets/ybss/fjxx.png" style="position: absolute;left: 8px;top: 12px;"/>
              <div class="fjxx_div">
                  <div>房间信息：<span>{{ldxx.roomnum}}</span></div>
                  <div>楼栋地址：<span v-if="ldxx.dz">{{ldxx.dz.replace('浙江省','')}}</span></div>
                  <div>楼层数：<span>{{ldxx.floornum>0?ldxx.floornum:"未知"}}</span></div>
                  <div>每层房间数：<span>{{ldxx.floorroomnum>0?ldxx.floorroomnum:"未知"}}</span></div>
              </div>
              <div style="width:100%;height:50%;">
                  <div  class="flexr" style="height: 30px;">
                    <img src="@/assets/ybss/dwjp.png"/>
                    <div style="width: 80px;margin-left: 8px;color:rgb(52, 165, 244);cursor:pointer;" @click="relocBzdz">定位纠偏</div>
                    <div style="width: calc(100% - 120px);color: #fbd023;"></div>
                 </div>
                  <div class="flexr" style="height: 30px;">
                      <img src="@/assets/ybss/ryqk.png"/>
                      <div style="width: 80px;margin-left: 8px;color:#fff;">人员概览</div>
                      <div style="width: calc(100% - 120px);color: #fbd023;">{{ldxx.czrk+ldxx.zzrk+ldxx.rhfl+ldxx.ldrhfl}}人</div>
                  </div>
                  <div style="width:100%;height:calc(100% - 60px);">
                      <div ref="ryqkchart" style="width:40%;height:100%;float:left"></div>
                      <div class="flexc" style="width:60%;height:100%;float:left">
                          <div class="flexr" style="width: 210px;height: 30px;line-height: 30px;background: #34a5f4;">
                              <div style="width: 110px;color:#fff;text-align: center;">人员类型</div>
                              <div style="width: 70px;color:#fff;">占比</div>
                          </div>
                          <div class="flexr" style="width: 210px;height: 30px;line-height: 30px;background: rgba(70, 172, 244,0.34);margin-top: 1px;padding: 0 5px;">
                              <div style="width: 10px;height: 10px;background: #54b354;"></div>
                              <div style="width: 90px;color:#fff;text-align: center;">常住人口</div>
                              <div style="width: 120px;color:#fbd023;">{{(ldxx.zzrk+ldxx.czrk+ldxx.rhfl+ldxx.ldrhfl)==0?'0%（0人）':Math.round(ldxx.czrk/(ldxx.zzrk+ldxx.czrk+ldxx.rhfl+ldxx.ldrhfl)*10000)/100+'%'+'（'+ldxx.czrk+'人）'}}</div>
                          </div>
                          <div class="flexr" style="width: 210px;height: 30px;line-height: 30px;background: rgba(70, 172, 244,0.34);margin-top: 1px;padding: 0 5px;">
                              <div style="width: 10px;height: 10px;background: yellow;"></div>
                              <div style="width: 90px;color:#fff;text-align: center;">暂住人口</div>
                              <div style="width: 120px;color:#fbd023;">{{(ldxx.zzrk+ldxx.czrk+ldxx.rhfl+ldxx.ldrhfl)==0?'0%（0人）':Math.round(ldxx.zzrk/(ldxx.zzrk+ldxx.czrk+ldxx.rhfl+ldxx.ldrhfl)*10000)/100+'%'+'（'+ldxx.zzrk+'人）'}}</div>
                          </div>
                          <div class="flexr" style="width: 210px;height: 30px;line-height: 30px;background: rgba(70, 172, 244,0.34);margin-top: 1px;padding: 0 5px;">
                              <div style="width: 10px;height: 10px;background: rgb(62 193 193);"></div>
                              <div style="width: 90px;color:#fff;text-align: center;">人户分离</div>
                              <div style="width: 120px;color:#fbd023;">{{(ldxx.zzrk+ldxx.czrk+ldxx.rhfl+ldxx.ldrhfl)==0?'0%（0人）':Math.round(ldxx.rhfl/(ldxx.zzrk+ldxx.czrk+ldxx.rhfl+ldxx.ldrhfl)*10000)/100+'%'+'（'+ldxx.rhfl+'人）'}}</div>
                          </div>
                          <div class="flexr" style="width: 210px;height: 30px;line-height: 30px;background: rgba(70, 172, 244,0.34);margin-top: 1px;padding: 0 5px;">
                              <div style="width: 10px;height: 10px;background: #17f9fe;"></div>
                              <div style="width: 90px;color:#fff;text-align: center;">流动人户分离</div>
                              <div style="width: 120px;color:#fbd023;">{{(ldxx.zzrk+ldxx.czrk+ldxx.rhfl+ldxx.ldrhfl)==0?'0%（0人）':Math.round(ldxx.ldrhfl/(ldxx.zzrk+ldxx.czrk+ldxx.rhfl+ldxx.ldrhfl)*10000)/100+'%'+'（'+ldxx.ldrhfl+'人）'}}</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div  style="width:100%;height:20%;position: relative;" class="flexr">
                  <img style="width:15px;height:15px;position:absolute;top:4px;right:10px;cursor:pointer;" src="@/assets/ybss/jwinfo_mdy.png"  @click="clickMdyJwInfo"  />
                  <div style="width:50%;height:100%;">
                      <div class="info_title">小区包干专班</div>
                      <div class="info_content">机关：{{buildingjwinfo_show.jg}}</div>
                      <div class="info_content">警务：{{buildingjwinfo_show.jw}}</div>
                      <div class="info_content">社区：{{buildingjwinfo_show.sq}}</div>
                  </div>
                  <div style="width:50%;height:100%;">
                      <div class="info_title">楼栋管控服务小组</div>
                      <div class="info_content">楼栋长：{{buildingjwinfo_show.ldz}}</div>
                      <div class="info_content">志愿者A：{{buildingjwinfo_show.zyza}}</div>
                      <div class="info_content">志愿者B：{{buildingjwinfo_show.zyzb}}</div>
                  </div>
              </div>
           </div>
           <div class="room_bar flexc" v-show="ldxx.rooms" @click="clickRoomBar"><div>房</div><div>屋</div><div>详</div><div>情</div></div>
           <div class="room_bar flexc" v-show="!ldxx.rooms" @click="clickPeopleBar"><div>人</div><div>员</div><div>详</div><div>情</div></div>
       </div>
       <!-- 房间信息 -->
       <div class="box_div" v-if="showRoom">
           <div class="header_div">
               <div class="header_text" style="margin: 5px 10px;">楼栋编号：{{buildingcode}}</div>
               <img src="@/assets/ybss/close.png" style="position: absolute;right: 5px;top: 7px;cursor: pointer;" @click="closeRoom"/>
           </div>
           <div style="position: relative;width:100%;height:calc(100% - 40px);">
               <img src="@/assets/ybss/fjxx.png" style="position: absolute;left: 8px;top: 12px;"/>
              <div class="fjxx_div" style="height: 30px;">
                  <div>房间<span style="margin-left: 15px;">{{'共'+ldxx.rooms.length+'套'}}</span></div>
              </div>
              <div class="room_box">
                  <div class="roomdiv" @click="searchRoomPeople(item)" v-for="(item,index) in ldxx.rooms" :key="index" :style="{'background':getRoomState(item),'border':item.roomcode==roomcode?'3px solid #e4b024':''}">{{item.mh}}</div>
              </div>
           </div>
       </div>
       <!-- 人员信息 -->
       <div class="box_div" v-if="showPeople">
           <div class="header_div">
               <div class="header_text" style="margin: 5px 10px;">房间编号：{{roomcode}}</div>
               <img src="@/assets/ybss/close.png" style="position: absolute;right: 5px;top: 7px;cursor: pointer;" @click="closePeople"/>
           </div>
           <div style="position: relative;width:100%;height:calc(100% - 40px);">
               <!-- 流动人户分离列表 -->
               <div style="position: relative;width:100%;max-height: calc(100% - 100px);">
                   <img src="@/assets/ybss/rk.png" style="position: absolute;left: 8px;top: 12px;"/>
                    <div class="fjxx_div" style="height: 30px;cursor: pointer;" @click="clickPeople('ldrhfl')">
                        <div>流动人户分离<span style="margin-left: 15px;">{{'共'+ldrhfllist.length+'人'}}</span></div>
                    </div>
                    <div class="people_box" v-show="rytipMap.indexOf('ldrhfl')>-1">
                        <div v-for="item in ldrhfllist" :key="item.id" style="width:100%;height:140px;background: rgba(13,117,214,0.58);color: #fff;margin-top: 5px;">
                            <div class="flexr" style="height: 22px;line-height: 22px;">
                                <div style="width: 135px;">姓名：{{item.xm}}</div>
                                <div style="width: 140px;">性别：{{item.xb=='1'?'男':'女'}}</div>
                            </div>
                            <div style="height: 22px;line-height: 22px;padding-left: 30px;">联系电话：{{item.dhhm}}</div>
                            <div style="height: 22px;line-height: 22px;padding-left: 30px;">身份证：{{item.sfzh}}</div>
                            <div style="height: 30px;line-height: 16px;padding-left: 30px;">户口地址：{{item.hkdz}}</div>
                            <div style="height: 30px;line-height: 16px;padding-left: 30px;">实际居住地：{{item.sjjzdz}}</div>
                        </div>
                    </div>
               </div>
               <!-- 暂住人口列表 -->
               <div style="position: relative;width:100%;max-height: calc(100% - 100px);">
                   <img src="@/assets/ybss/rk.png" style="position: absolute;left: 8px;top: 12px;"/>
                    <div class="fjxx_div" style="height: 30px;cursor: pointer;" @click="clickPeople('zzrk')">
                        <div>暂住人口<span style="margin-left: 15px;">{{'共'+zzrklist.length+'人'}}</span></div>
                    </div>
                    <div class="people_box" v-show="rytipMap.indexOf('zzrk')>-1">
                        <div v-for="item in zzrklist" :key="item.id" style="width:100%;height:86px;background: rgba(13,117,214,0.58);color: #fff;margin-top: 5px;">
                            <div class="flexr" style="height: 22px;line-height: 22px;">
                                <div style="width: 140px;">姓名：{{item.xm}}</div>
                                <div style="width: 140px;">性别：{{item.xb=='1'?'男':'女'}}</div>
                            </div>
                            <div class="flexr" style="height: 22px;line-height: 22px;">
                                <div style="width: 140px;">出生日期：{{item.csrq}}</div>
                                <div style="width: 140px;">联系电话：{{item.dhhm}}</div>
                            </div>
                            <div style="height: 22px;line-height: 22px;padding-left: 30px;">身份证：{{item.sfzh}}</div>
                            <div style="height: 22px;line-height: 22px;padding-left: 30px;">工作场所：{{item.gzcs}}</div>
                        </div>
                    </div>
               </div>
               <!-- 人户分离列表 -->
               <div style="position: relative;width:100%;max-height: calc(100% - 100px);">
                   <img src="@/assets/ybss/rk.png" style="position: absolute;left: 8px;top: 12px;"/>
                    <div class="fjxx_div" style="height: 30px;cursor: pointer;" @click="clickPeople('rhfl')">
                        <div>人户分离<span style="margin-left: 15px;">{{'共'+rhfllist.length+'人'}}</span></div>
                    </div>
                    <div class="people_box" v-show="rytipMap.indexOf('rhfl')>-1">
                        <div v-for="item in rhfllist" :key="item.id" style="width:100%;height:140px;background: rgba(13,117,214,0.58);color: #fff;margin-top: 5px;">
                            <div class="flexr" style="height: 22px;line-height: 22px;">
                                <div style="width: 135px;">姓名：{{item.xm}}</div>
                                <div style="width: 140px;">性别：{{item.xb=='1'?'男':'女'}}</div>
                            </div>
                            <div style="height: 22px;line-height: 22px;padding-left: 30px;">联系电话：{{item.dhhm}}</div>
                            <div style="height: 22px;line-height: 22px;padding-left: 30px;">身份证：{{item.sfzh}}</div>
                            <div style="height: 30px;line-height: 16px;padding-left: 30px;">户口地址：{{item.hkdz}}</div>
                            <div style="height: 30px;line-height: 16px;padding-left: 30px;">实际居住地：{{item.sjjzdz}}</div>
                        </div>
                    </div>
               </div>
               <!-- 常住人口列表 -->
               <div style="position: relative;width:100%;max-height: calc(100% - 100px);">
                    <img src="@/assets/ybss/rk.png" style="position: absolute;left: 8px;top: 12px;"/>
                    <div class="fjxx_div" style="height: 30px;cursor: pointer;" @click="clickPeople('czrk')">
                        <div>常住人口<span style="margin-left: 15px;">{{'共'+czrklist.length+'人'}}</span></div>
                    </div>
                    <div class="people_box" v-show="rytipMap.indexOf('czrk')>-1">
                        <div v-for="item in czrklist" :key="item.id" style="width:100%;height:86px;background: rgba(13,117,214,0.58);color: #fff;margin-top: 5px;">
                            <div class="flexr" style="height: 22px;line-height: 22px;">
                                <div style="width: 140px;">姓名：{{item.xm}}</div>
                                <div style="width: 140px;">性别：{{item.xb=='1'?'男':'女'}}</div>
                            </div>
                            <div class="flexr" style="height: 22px;line-height: 22px;">
                                <div style="width: 140px;">出生日期：{{item.csrq}}</div>
                                <div style="width: 140px;">联系电话：{{item.dhhm}}</div>
                            </div>
                            <div style="height: 22px;line-height: 22px;padding-left: 30px;">身份证：{{item.sfzh}}</div>
                            <div style="height: 22px;line-height: 22px;padding-left: 30px;">职业：{{item.zy}}</div>
                        </div>
                    </div>
               </div>
           </div>
       </div>
        <!-- 更新小区包干专班楼栋管控服务小组 -->
       <div class="jwinfo_div" v-if="showMdyJwInfo">
           <div class="header_div">
               <div class="header_text" style="margin: 5px 10px;"> 修改小区包干专班 楼栋管控服务小组</div>
               <img src="@/assets/ybss/close.png" style="position: absolute;right: 5px;top: 7px;cursor: pointer;" @click="closeJwInfo"/>
           </div>
           <div style="position: relative;width:100%;height:calc(100% - 40px);">
                <div class="modal-div">
                        <span>机关：</span>
                        <input style="width: 180px;" class="inputclass" v-model="buildingjwinfo_mdy.jg" />
                </div>
                <div class="modal-div">
                        <span>警务：</span>
                        <input style="width: 180px;" class="inputclass" v-model="buildingjwinfo_mdy.jw" />
                </div>
                <div class="modal-div">
                        <span>社区：</span>
                        <input style="width: 180px;" class="inputclass" v-model="buildingjwinfo_mdy.sq" />
                </div>
                <div class="modal-div">
                        <span>楼栋长：</span>
                        <input style="width: 180px;" class="inputclass" v-model="buildingjwinfo_mdy.ldz" />
                </div>
                <div class="modal-div">
                        <span>志愿者A：</span>
                        <input style="width: 180px;" class="inputclass" v-model="buildingjwinfo_mdy.zyza" />
                </div>
                <div class="modal-div">
                        <span>志愿者B：</span>
                        <input style="width: 180px;" class="inputclass" v-model="buildingjwinfo_mdy.zyzb" />
                </div>
                <HfxButton  style="width:64px;margin-top: 5px;margin-left: 195px;" @click="mdyBzdzJwInfo" />
           </div>
       </div>
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
    name: 'YbssDzPanel',
    props:['isshow',"buildingcode"],
    data() {
        return {
            ldxx:{},
            showRoom:false,
            showPeople:false,
            showMdyJwInfo:false,
            ryqkchart:null,
            czrklist:[],
            zzrklist:[],
            rhfllist:[],
            ldrhfllist:[],
            roomcode:'',
            selectmh:'',
            buildingjwinfo_show:{
            },
            buildingjwinfo_mdy:{
            },
            rytipMap:[]
        };
    },
    computed: mapState({
        userInfo: state => state.userInfo,
        currentMapType:state => state.currentMapType,
    }),
    methods:{
        clickPeople(rytip){
           var index = this.rytipMap.indexOf(rytip);
            if(index>-1){
                this.rytipMap.splice(index,1);
            }else{
                this.rytipMap = [];
                this.rytipMap.push(rytip);

                //以下是记录日志
                var remark = "";
                if(rytip=='czrk'){
                    remark = "查看地址房间【"+this.ldxx.dz+this.selectmh+"】下的常住人口";
                }else if(rytip=='zzrk'){
                    remark = "查看地址房间【"+this.ldxx.dz+this.selectmh+"】下的暂住人口";
                }else if(rytip=='rhfl'){
                    remark = "查看地址房间【"+this.ldxx.dz+this.selectmh+"】下的人户分离人口";
                }else if(rytip=='ldrhfl'){
                    remark = "查看地址房间【"+this.ldxx.dz+this.selectmh+"】下的流动人户分离人口";
                }
                var paramObj = {};
                paramObj.type = '查看操作';
                paramObj.typecode = 'read';
                paramObj.remark = remark;
                paramObj.module = '疫情管控';
                this.http.get("/czrz/insertPcCzjl",paramObj,null,this,false);
            }
        },
        getRoomState(item){
            if(item.zdrynum>0){
               return 'red';
            }
            if(item.ldrhflnum>0){
               return '#17f9fe';
            }
            if(item.zknum>0){
               return 'yellow';
            }
            if(item.rhflnum>0){
               return 'rgb(62 193 193)';
            }
            if(item.cknum>0){
               return '#54b354';
            }
            return 'white';
        },
        getLdxx(){
            var paramObj = {};
            paramObj.id = this.buildingcode;
            this.http.get("/ybss/getBuildingById",paramObj,this.getBuildingByIdCallBack,this,false);//获取楼栋地址
        },
        getJwxx(){
            var paramObj = {};
            paramObj.buildingcode = this.buildingcode;
            this.http.post("/ybss/getBzdzJwInfo",paramObj,this.getBzdzJwInfoCallBack,this,false);//获取楼栋地址
        },
        getBzdzJwInfoCallBack(result){
            if(result==""){
               this.buildingjwinfo_show={
                   jg:"",
                   jw:"",
                   sq:"",
                   ldz:"",
                   zyza:"",
                   zyzb:""
               };
            }else{
                this.buildingjwinfo_show=result;
            }
        },
        showRyqkChart(czrk,zzrk,rhfl,ldrhfl){
            this.ryqkchart = this.echarts.init(this.$refs.ryqkchart);
            var option = {
                color:['#54b354','yellow','rgb(62 193 193)', '#17f9fe'],
                series: [
                    {
                        type: 'pie',
                        radius: ['60%', '90%'],
                        labelLine: {
                            show: false
                        },
                        data: [
                            czrk,
                            zzrk,
                            rhfl,
                            ldrhfl
                        ]
                    }
                ]
            };
            this.ryqkchart.setOption(option);
            var that = this;
            window.addEventListener('resize',function(){
                that.ryqkchart.resize();
            });
        },
        clickRoomBar(){
           this.showRoom = true;
        },
        clickPeopleBar(){
            this.showPeople = true;
            this.roomcode = this.ldxx.roomcode;
            var paramObj = {};
            paramObj.dzsx = this.ldxx.dzsx;
            if(this.ldxx.dzsx=='2'){
                paramObj.roomid = this.ldxx.mph_pid;
            }
            if(this.ldxx.dzsx=='3'){
                paramObj.roomid = this.ldxx.lz_pid;
            }
            this.http.get("/ybss/getRoomById",paramObj,this.getRoomByIdCallBack,this,false);
        },
        clickMdyJwInfo(){
            this.buildingjwinfo_mdy=JSON.parse(JSON.stringify(this.buildingjwinfo_show));
            this.showMdyJwInfo=true;
        },
        searchRoomPeople(item){
            this.roomcode = item.roomcode;
            this.selectmh = item.mh;
            var paramObj = {};
            paramObj.dzsx = item.dzsx;
            paramObj.roomid = item.roomcode;
            this.http.get("/ybss/getRoomById",paramObj,this.getRoomByIdCallBack,this,false);
        },
        getRoomByIdCallBack(data){
            this.showPeople = true;
            this.czrklist = data.czrklist;
            this.zzrklist = data.zzrklist;
            this.rhfllist = data.rhfllist;
            this.ldrhfllist = data.ldrhfllist;
            this.rytipMap = [];
            
            // if(data.czrklist.length>0){
            //    this.rytipMap = [];
            //    this.rytipMap.push('czrk');
            // }
            // if(data.rhfllist.length>0){
            //    this.rytipMap = [];
            //    this.rytipMap.push('rhfl');
            // }
            // if(data.zzrklist.length>0){
            //    this.rytipMap = [];
            //    this.rytipMap.push('zzrk');
            // }
            // if(data.ldrhfllist.length>0){
            //    this.rytipMap = [];
            //    this.rytipMap.push('ldrhfl');
            // }
        },
        closePeople(){
           this.showPeople = false;
           this.roomcode = '';
        },
        closeRoom(){
           this.showRoom = false;
           this.showPeople = false;
        },
        closeJwInfo(){
            this.showMdyJwInfo=false;
        },
        closeBuilding(){
           this.showRoom = false;
           this.showPeople = false;
           this.$emit("handler", "close", false);
        },
        getBuildingByIdCallBack(data){
           this.ldxx = data;
           this.showRyqkChart(data.czrk,data.zzrk,data.rhfl,data.ldrhfl);
        },
        relocBzdz(){
            this.$emit("handler", "perloc", false);
            markUtil.reLocate(this.ldxx.loc.x,this.ldxx.loc.y,this.relocBzdzHandler,null,this);
        },
        relocBzdzHandler(point,args){
            var paramObj = {};
            var xpos = point.x;
            var ypos = point.y;
            paramObj.xpos = xpos;
            paramObj.ypos = ypos;
            paramObj.buildingcode = this.buildingcode;
            this.http.post("/ybss/updateBuildingLoc",paramObj,this.updateBuildingLocCallBack,this,false);
        },
        updateBuildingLocCallBack(result){
            this.$Message.success(result);
            this.$emit("handler", "locfinish", false);
        },
        mdyBzdzJwInfo(){
           var paramObj={};
           paramObj.buildingcode = this.buildingcode;
           paramObj.jg=this.buildingjwinfo_mdy.jg;
           paramObj.jw=this.buildingjwinfo_mdy.jw;
           paramObj.sq=this.buildingjwinfo_mdy.sq;
           paramObj.ldz=this.buildingjwinfo_mdy.ldz;
           paramObj.zyza=this.buildingjwinfo_mdy.zyza;
           paramObj.zyzb=this.buildingjwinfo_mdy.zyzb;
           this.http.post("/ybss/mdyBzdzJwInfo",paramObj,this.mdyBzdzJwInfoCallBack,this,false); 
        },
        mdyBzdzJwInfoCallBack(result){
            this.$Message.success(result);
            this.getJwxx();
            this.showMdyJwInfo=false;
        },

    },
    created(){
        
    },
    watch : {
       buildingcode:function(val){
          this.getLdxx();
          this.getJwxx();
          this.showRoom = false;
          this.showPeople = false;
       }
    }
}
</script>

<style scoped>
.ybss_dzpenel{
    position: absolute;
    min-width: 350px;
    height: 500px;
    top: 250px;
    left: 400px;
}
.box_div{
    position: relative;
    width: 360px;
    height: 500px;
    float: left;
    background: rgba(13,64,108,0.76);
    border: 1px solid #0d406c;
    margin-right: 10px;
}
.jwinfo_div{
    position: absolute;
    width: 280px;
    height: 260px;
    /* float: left; */
    background: rgba(13,64,108,0.76);
    border: 1px solid #0d406c;
    /* margin-right: 10px; */
    left: 370px;
    bottom:0px;
}
.header_div{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgba(46,153,247,0.54);
}
.header_text{
    position: absolute;
    color: #fff;
    width: calc(100% - 42px);
    height: 26px;
    line-height: 26px;
    margin: 5px 10px;
    background: #0f75a9;
    border: 1px solid #25a9f4;
}
.fjxx_div{
  width:100%;
  height:30%;
  padding: 10px 0 0 30px;
}
.fjxx_div >>> div{
  height: 24px;
  line-height: 24px;
  color: #fff;
}
.fjxx_div >>> span{
  color: #fbd023;
}
.room_bar{
    position: absolute;
    width: 27px;
    height: 94px;
    right: 0px;
    top: 100px;
    color: #fff;
    text-align: center;
    border-radius: 10px 0px 0px 10px;
    background: linear-gradient(0deg, rgba(64,253,251,0.48), rgba(26,186,226,0.48));
    cursor: pointer;
}
.room_box{
    position: relative;
    width:calc(100% - 20px);
    height:calc(100% - 50px);
    margin: 10px;
    overflow-y: auto;
}
.roomdiv{
    float: left;
    margin: 5px 9px;
    width: 65px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    color: #303133;
    cursor: pointer;
    border-radius: 4px;
    background: linear-gradient(86deg, #1cadf0, #1586fb);
}
.people_box{
    position: relative;
    width:calc(100% - 20px);
    max-height: 300px;
    margin: 10px;
    overflow-y: auto;
}
.info_title{
    background: rgb(52, 165, 244);
    text-align: center;
    color: #fff;
    height: 25%;
    line-height: 25px;
}
.info_content{
    text-align: center;
    color: #fff;
    height: 25%;
    line-height: 25px;
}
.modal-div{
    margin:5px 0 5px 0;
    text-align: center;
}
.modal-div span{
  float: left;
  width: 60px;
  text-align: right;
  color: #fff;
}
.inputclass{
  width:180px;
  height: 24px;
  padding: 0 10px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
</style>