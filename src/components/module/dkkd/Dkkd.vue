<template>
    <div class="dkkdpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
      <DkkdEditGroup :show="showEditData.showmodal" :showdata="showEditData" :editdata="editdata" @handler="itemHandler"/>
      <DkkdEditItem :show="showItemEditData.showmodal" :showdata="showItemEditData" :editdata="edititemdata" @handler="itemHandler"/>
        <div class="showbar">
            <span>显示</span>
            <el-switch class="switchShow" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="showSwitch" @change="showDkkdLayer">
            </el-switch>
            <span style="margin-left:15px;">展示全部</span>
            <el-switch class="switchShow" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="showAll" @change="showAllDkkds">
            </el-switch>
        </div>
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" @on-clear="fanhuisearch"  v-model="name" />
            <div class="caozuopanel">
                <div class="seachbar_shuaxin" @click="reflashDkkd"></div>
                <div class="seachbar_add" @click="showEditPanel"></div>
            </div>
        </div>
        <div class="dkkdlist_panel">
            <div v-for="groupObj in groupList" :key="groupObj.groupid" class="dkkd_item_class">
                <div style="height: 56px;">
                    <div style="width:75%;float:left;height:56px;cursor: pointer;position:relative;" @click="showChilds($event)" >
                        <div class="item_div_class" style="color: #fff;">{{groupObj.groupname}}</div>
                        <div class="item_div_class" style="color: #58E8FF;top:18px;">{{groupObj.deptname}}</div>
                        <div class="group_switch_class">
                          <el-switch class="switchShow" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="groupObj.showgroup" @change="showGroupDkkds(groupObj)" @click.stop.native>
                          </el-switch>
                        </div>
                    </div>
                    <div style="width:25%;float:left;height:56px;">
                        <!-- <div  class="xianshiClass" title="显示隐藏图层"></div> -->
                        <div  class="tianjiaClass" @click="showDkkdPanel(groupObj)" title="添加堵控点"></div>
                        <div  class="xiugaiClass" @click="editGroup(groupObj)"  title="修改预案分组"></div>
                        <div  class="shanchuClass" @click="deleteGroup(groupObj)" title="删除预案分组"></div>
                    </div>
                </div>
                <div style="display:none;">
                  <div v-for="dkdObj in groupObj.dkdlist" :key="dkdObj.id" class="dkkd_child_class">
                      <div style="width:72%;float:left;height:56px;cursor: pointer;position:relative;" @click="centerPoint(dkdObj)">
                          <div style="float:left;position: relative;top: 5px;padding-left: 5px;"><img :id="'dkkd'+dkdObj.id" width="28px" height="45px" src="./../../../assets/dkkd/pcslzz.png"/></div>
                          <div style="color: #58E8FF;float:left;position:relative;top: 20px;margin-left: 5px;" :title="dkdObj.name">{{dkdObj.name.length<12?dkdObj.name:dkdObj.name.substr(0,11)+'...'}}</div>
                          <div class="item_switch_class">
                            <el-switch class="switchShow" :width=40  active-color="#13ce66" inactive-color="#ff4949" v-model="dkdObj.show" @change="showDkdd(dkdObj)" @click.stop.native>
                            </el-switch>
                          </div>
                      </div>
                      <div style="width:28%;float:left;height:56px;">
                          <div  class="xiugaiClass" @click="editDkd(dkdObj)"  title="修改堵控点信息"></div>
                          <div  class="locationClass" @click="updateDkdLoc(dkdObj)"   title="修改堵控点坐标"></div>
                          <div  class="shanchuClass" @click="deleteDkd(dkdObj)"  title="删除堵控点"></div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import DkkdEditGroup from '@/components/module/dkkd/DkkdEditGroup'
import DkkdEditItem from '@/components/module/dkkd/DkkdEditItem'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import common from "@/common.js"
import LeftContentNameBar from '@/components/content/LeftContentNameBar'

export default {
  name: 'Dkkd',
  components: { InputSearchNew,DkkdEditGroup,DkkdEditItem,LeftContentNameBar},
  data () {
    return {
      showSwitch:true,
      showAll:false,
      name:"",
      isfanhuishow:false,  //返回按钮是否显示
      showEditData:{showmodal:false},
      groupList:[],
      editdata:{},
      edititemdata:{},
      showItemEditData:{showmodal:false},
    }
  },
  computed: mapState({
     pushDkkd: state => state.push.dkkd,
     userInfo: state => state.userInfo
  }),
  methods:{
     showDkkdLayer(){
      if(this.showSwitch){//显示
          var layer = this.map.map.getLayer("dkkdLayer");
          var circlelayer = this.map.map.getLayer("dkkdLayerCircle");
          if(layer){
              layer.show();
              circlelayer.show();
          }
        }else{//隐藏
            var layer = this.map.map.getLayer("dkkdLayer");
            var circlelayer = this.map.map.getLayer("dkkdLayerCircle");
            if(layer){
              layer.hide();
              circlelayer.hide();
            }
        }
     },
     showEditPanel(){
        this.editdata = {};
        this.editdata.title = "新增堵控分组";
        this.showEditData.showmodal = true;
     },
     showDkkdPanel(obj){
        this.edititemdata = {};
        this.edititemdata.title = "新增堵控点";
        this.edititemdata.groupid = obj.groupid;
        this.showItemEditData.showmodal = true;
     },
     showChilds(e){
        var el = e.currentTarget;
        var display = $(el).parent().next().css("display");
        if(display == "block"){
          $(el).parent().next().hide();
        }else{
          $(el).parent().next().show();
        }
     },
     centerPoint(data){
        if(data.loc&&data.loc.x){//地图上显示
            markUtil.centerAndShow("dkkdLayer",data.id,this);
        }else{//没有坐标，不在地图上显示
          
        }
     },
     reflashDkkd(){
        this.getDkkdGroupList();
     },
     inputSearch(){
        this.getDkkdGroupList();
     },
     fanhuisearch(){
        this.name = '';
        this.isfanhuishow = false;
        this.getDkkdGroupList();
     },
     getAllGpsDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"dkkd","childkey":"allDeptListObj","value":data});
     },
     getDkkdGroupList(){
       var paramObj = {};
       paramObj.groupname = this.name;
       this.http.get("/znfk/getDkdGroupList",paramObj,this.getDkdGroupListCallBack,this,false);
     },
     getDkdGroupListCallBack(result){
       var dkdlist = [];
       for(var i=0;i<result.data.length;i++){
          if(i==0){
              result.data[i].showgroup=true;
          }else{
              result.data[i].showgroup=false;
          }
           for(var n=0;n<result.data[i].dkdlist.length;n++){
             if(i==0){
                result.data[i].dkdlist[n].show=true;
              }else{
               result.data[i].dkdlist[n].show=false;
              }
              dkdlist.push(result.data[i].dkdlist[n]);
           }
       }
        this.groupList = result.data;
        console.log(this.groupList);
       yewuMarkUtil.addDkkdMarks(dkdlist,null,this);
     },
     itemHandler(data,state){//编辑Item页面返回
        if(state=="reflash"){
          this.getDkkdGroupList();
        }
     },
     deleteGroup(obj){
        var h = this.$createElement;
        this.$msgbox({
          title: '删除堵控分组',
          message: h('p', null, [
            h('span', null, '是否删除此分组('+obj.groupname+')？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              this.http.get("/znfk/deleteDkdGroup",{groupid:obj.groupid},this.getDkkdGroupList,this,false);
            } else {
              done();
            }
          }
        }).catch();
     },
     editGroup(obj){
        this.editdata = obj;
        this.editdata.title = "修改堵控分组";
        this.showEditData.showmodal = true;
     },
     deleteDkd(obj){
       var h = this.$createElement;
        this.$msgbox({
          title: '删除堵控点',
          message: h('p', null, [
            h('span', null, '是否删除此分组('+obj.name+')？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              this.http.get("/znfk/deleteDkd",{id:obj.id},this.getDkkdGroupList,this,false);
            } else {
              done();
            }
          }
        }).catch();
     },
     editDkd(obj){
        this.edititemdata = obj;
        this.edititemdata.title = "修改堵控点";
        this.showItemEditData.showmodal = true;
     },
     updateDkdLoc(obj){
      markUtil.reLocate(obj.xpos,obj.ypos,this.updateDkdLocHandler,obj,this)
    },
    updateDkdLocHandler(point,args){
      var paramObj = {};
      var lx = point.x;
      var ly = point.y;
      paramObj.lx = lx;
      paramObj.ly = ly;
      paramObj.id = args.id;
      this.http.get("/znfk/updateDkdLoc",paramObj,this.updateDkdLocCallBack,this,false);
    },
    updateDkdLocCallBack(data){
      this.getDkkdGroupList();
      yewuMarkUtil.addDkkdMark(data,"dkkdLayer",null,this);
    },
    showGroupDkkds(groupObj){
      var isshow=groupObj.showgroup;
      var id=groupObj.groupid;
      var dkdlist = [];
       for(var i=0;i<this.groupList.length;i++){
           for(var n=0;n<this.groupList[i].dkdlist.length;n++){
             if(id==this.groupList[i].groupid){
               if(isshow){
                 this.groupList[i].dkdlist[n].show=true;
               }else{
                 this.groupList[i].dkdlist[n].show=false;
               }
             }
              dkdlist.push(this.groupList[i].dkdlist[n]);
           }
       }
       yewuMarkUtil.addDkkdMarks(dkdlist,null,this);

    },
    showDkdd(dkdObj){
      var dkdlist = [];
      var isshow=dkdObj.show;
      var id=dkdObj.id;
      if(isshow){
          for(var i=0;i<this.groupList.length;i++){
            for(var n=0;n<this.groupList[i].dkdlist.length;n++){
              if(id==this.groupList[i].dkdlist[n].id){
               this.groupList[i].dkdlist[n].show=true;
              }
              dkdlist.push(this.groupList[i].dkdlist[n]);
            }
          }
      }else{
          for(var i=0;i<this.groupList.length;i++){
            for(var n=0;n<this.groupList[i].dkdlist.length;n++){
              if(id==this.groupList[i].dkdlist[n].id){
                this.groupList[i].dkdlist[n].show=false;
              }
              dkdlist.push(this.groupList[i].dkdlist[n]);
            }
           }
      }
      yewuMarkUtil.addDkkdMarks(dkdlist,null,this);
    },
    showAllDkkds(){
      var dkdlist = [];
      if(this.showAll){
          for(var i=0;i<this.groupList.length;i++){
            this.groupList[i].showgroup=true;
            for(var n=0;n<this.groupList[i].dkdlist.length;n++){
              this.groupList[i].dkdlist[n].show=true;
              dkdlist.push(this.groupList[i].dkdlist[n]);
            }
          }
      }else{
          for(var i=0;i<this.groupList.length;i++){
            this.groupList[i].showgroup=false;
            for(var n=0;n<this.groupList[i].dkdlist.length;n++){
              this.groupList[i].dkdlist[n].show=false;
              dkdlist.push(this.groupList[i].dkdlist[n]);
            }
          }
      }
      yewuMarkUtil.addDkkdMarks(dkdlist,null,this);
    },
  },
  created(){
    this.http.get("/gps/getAllGpsDeptTree",null,this.getAllGpsDeptTreeCallBack,this,false);
    this.getDkkdGroupList();
  },
  watch:{
    pushDkkd:function(val){
        yewuMarkUtil.addDkkdMark(val,"dkkdLayer",null,this);
        var dkkdid = "dkkd"+val.id;
        if(val.hasjl=='1'){
          $("#"+dkkdid).attr('src',require('./../../../assets/dkkd/pcslzz_green.png'));
        }else{
          $("#"+dkkdid).attr('src',require('./../../../assets/dkkd/pcslzz.png'));
        }
    }
  }
}
</script>

<style scoped>
.dkkdpanel{
  height: 100%;
  position: relative;
}
.showbar{
  position: relative;
  height: 22px;
  color: #b6f6ff;
  line-height: 22px;
  margin: 0 0 15px 0;
  display: flex;
}
.showbar .switchShow{
  margin-left: 7px;
}
.seachbar{
  height: 72px;
  position: relative;
}
.seachbar_InputSearch{
  height: 36px;
  width: 100%;
}
.caozuopanel{
    margin: 10px 0;
    height: 22px;
    position: relative;
}
.seachbar_add{
 position:absolute;
  cursor: pointer;
  right: 0;
  top: 0;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/qygl/qygl_add.png)  no-repeat;
}
.seachbar_shuaxin{
  position:absolute;
  right: 30px;
  top: 0;
  cursor: pointer;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/qygl/qygl_refresh.png)  no-repeat;
}
.seachbar_fanhui{
  position:absolute;
  right: 14%;
  color: white;
  top:2px;
  font-size: 20px;
  cursor: pointer;
}
.xiugaiClass{
    position: relative;
    top: 15px;
    display: inline-block;
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 5px;
    background: 
    url(./../../../assets/dztc/dztc_mdy.png)  no-repeat;
}
.shanchuClass{
    position: relative;
    top: 15px;
    display: inline-block;
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 5px;
    background: 
    url(./../../../assets/dztc/dztc_del.png)  no-repeat;
}
.xianshiClass{
    position: relative;
    top: 17px;
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    margin-right: 5px;
    background: 
    url(./../../../assets/dkkd/icon_adress.png)  no-repeat;
}
.tianjiaClass{
    position: relative;
    top: 15px;
    display: inline-block;
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 5px;
    background: 
    url(./../../../assets/qygl/qygl_zengjia.png)  no-repeat;
}
.locationClass{
    position: relative;
    top: 16px;
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    margin-right: 5px;
    background: 
    url(./../../../assets/dkkd/icon_map.png)  no-repeat;
}
.dkkdlist_panel{
  height: calc(100% - 165px);
  overflow-y: auto;
}
.dkkd_item_class{
    border: 1px solid #00fffc;
    margin: 7px 3px 0 0;
}
.item_div_class{
    top: 10px;
    margin-left: 16px;
    position: relative;
}
.dkkd_child_class{
    height: 56px;
    background: #094671;
    border: 1px solid #2E8CB8;
    margin: 5px 5px 5px 5px;
}
.group_switch_class{
  width: 30px;
  height: 20px;
  position: absolute;
  right: 24px;
  top: 15px;;
}
.item_switch_class{
  width: 30px;
  height: 20px;
  position: absolute;
  right: 20px;
  top: 15px;;
}
</style>
<style>

</style>
