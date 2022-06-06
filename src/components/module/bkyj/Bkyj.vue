<template>
    <div class="bkyjpanel">
      <audio loop ref="yjsound"><source src="@/assets/jq/sound/jqsound.mp3"></audio>
      <LeftContentNameBar :isshowshaixuan="true" :isshowclear="isfanhuishow" @on-click="clickMoreIcon" @on-clear="fanhuisearch"  />
        <div class="bkyjbar">
              <span style="margin-left:7px;">显示</span>
              <el-switch class="switchShow" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="showSwitch" @change="showJlLayer">
              </el-switch>
              <span>声音</span>
              <el-switch class="switchModel" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="soundSwitch" @change="showSound">
              </el-switch>
        </div>
        <div style="position: relative;top: -10px;">
          <RadioGroup v-model="timeRadio" size="small" type="button" @on-change="currentTime($event)">
             <Radio :label="1">1小时</Radio>
             <Radio :label="3">3小时</Radio>
             <Radio :label="6">6小时</Radio>
             <Radio :label="12">12小时</Radio>
             <Radio :label="24">24小时</Radio>
          </RadioGroup>
        </div>
         <Modal
            v-model="showMore" :draggable = "true" title="布控预警筛选" class-name="jlselect-panel">
            <div slot="close"><div class="hfx-modal-close"/></div>
            <div class="modal-div">
                <span>关键字</span>
                <input class="inputclass" v-model="name"/>
            </div>
            <div class="modal-div">
                <span>预警等级</span>
                <select class="inputclass" v-model="alarmlevel">
                  <option value="">请选择</option>
                  <option value="一级">一级</option>
                  <option value="二级">二级</option>
                  <option value="三级">三级</option>
                  <option value="四级">四级</option>
                </select>
            </div>
            <div class="modal-div">
                <span>布控类型</span>
                <select class="inputclass" v-model="deploytype">
                  <option value="">请选择</option>
                  <option value="全息布控">全息布控</option>
                  <option value="出入布控">出入布控</option>
                  <option value="人车伴随布控">人车伴随布控</option>
                </select>
            </div>
            <div class="modal-div">
                <span>时间范围(开始)</span>
                <DatePicker type="datetime" v-model="starttime" class="date-picker" placeholder="选择日期时间"></DatePicker>
            </div>
            <div class="modal-div">
                <span>时间范围(结束)</span>
                <DatePicker type="datetime" v-model="endtime" class="date-picker"  placeholder="选择日期时间" ></DatePicker>
            </div>
            <div slot="footer">
              <HfxButton   @click="fanhuisearch" name="重置" />
              <HfxButton   @click="submitSearch" />
            </div>
        </Modal>
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" @on-clear="fanhuisearch" v-model="name"/>
        </div>
        <div class="yjlist-panel">
            <BkyjButton v-for="yjObj in yjList" :key="yjObj.id" :data="yjObj" @on-click="clickYjButton"/>
        </div>
        <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
    </div>
</template>

<script>
import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import BkyjButton from '@/components/module/bkyj/BkyjButton'
import BkyjDetailMap from '@/components/module/bkyj/BkyjDetailMap'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import common from "@/common.js"
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import PagerNew from '@/components/base/PagerNew'
import map3DUtil from '@/components/map/js/map3DUtil'

export default {
  name: 'Bkyj',
  components: { LeftContentNameBar,InputSearchNew,BkyjButton,BkyjDetailMap,PagerNew},
  data () {
    return {
      showSwitch:true,
      soundSwitch:true,
      showMore:false,
      name:"",
      alarmlevel:"",
      deploytype:"",
      starttime:"",
      endtime:"",
      page:1,
      pageSize:10,
      totalSize:1,  //总共页数
      yjList:[],   //布控预警的list
      isfanhuishow:false,  //返回按钮是否显示
      timeRadio:3,
    }
  },
  computed: mapState({
     userInfo: state => state.userInfo,
     pushBkyj: state => state.push.bkyj,
     currentMapType:state => state.currentMapType,
  }),
  methods:{
      clickMoreIcon(){
        this.showMore = !this.showMore;
      },
      inputSearch(value){
        this.page = 1;
        this.searchBkyj();
        this.isfanhuishow = true;
      },
      pageChange(page){
        this.page = page;
        this.searchBkyj();
      },
      reset(){//筛选框清空
        this.name = "";
        this.alarmlevel="";
        this.deploytype="";
        this.starttime = "";
        this.endtime = "";
        this.timeRadio=3;
      },
      submitSearch(){
          this.page = 1;
          this.searchBkyj();
          this.isfanhuishow=true;
      },
      getBkyjlCallBack(data){
        this.totalSize = data.count;
        this.yjList = data.data;
        yewuMarkUtil.addBkyjMarks(this.yjList,this);//打点
      },
      jqHander(data,state){
        map3DUtil.rePlayTrailLine(data);
      },
      fanhuisearch(){
        this.page = 1;
        this.reset();
        this.isfanhuishow = false;
        this.searchBkyj();
      },
      searchBkyj(){
        var paramObj = {};
        //翻页
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize;
        //关键字
        paramObj.name = this.name;
        //预警等级
         paramObj.alarmlevel = this.alarmlevel;
        //布控类型
        paramObj.deploytype = this.deploytype;
        //开始时间
        if(this.starttime != ''){
          paramObj.starttime = this.$moment(this.starttime).format("YYYY-MM-DD HH:mm:ss");
        }
        //结束时间
        if(this.endtime != ''){
          paramObj.endtime = this.$moment(this.endtime).format("YYYY-MM-DD HH:mm:ss");
        }
        this.http.get("/bkyj/getBkyj",paramObj,this.getBkyjlCallBack,this,false);
      },
      clickYjButton(data){
        var audioEl = this.$refs.yjsound;
        audioEl.pause();
        if(data.loc&&data.loc.x){//地图上显示
            if(this.currentMapType=="3D"){
              map3DUtil.map3dCenterAt(data.loc);
            }else{
              markUtil.centerAndShow("bkyjLayer",data.id,this);
            }
        }else{//没有坐标，不在地图上显示
          
        }
      },
      showSound(){//关闭或打开声音
        if(!this.soundSwitch){
          var audioEl = this.$refs.yjsound;
          audioEl.pause();
        }
      },
      showJlLayer(){
      if(this.showSwitch){//显示
          var layer = this.map.map.getLayer("bkyjLayer");
          if(layer){
              layer.show();
              this.map.map.infoWindow.show()
          }
        }else{//隐藏
            var layer = this.map.map.getLayer("bkyjLayer");
            if(layer){
              layer.hide();
              this.map.map.infoWindow.hide()
            }
        }
      },
      currentTime(val){
        this.starttime =  this.common.addHours(-val);
        this.timeRadio=val;
        this.searchBkyj();
      }
  },
  created(){
     this.starttime =  this.common.addHours(-this.timeRadio);
     this.searchBkyj();
  },
  watch : {
      pushBkyj:function(val) {//布控预警推送
        this.showSound();
        this.searchBkyj();//重新查询
      },
  }
}
</script>

<style scoped>
.bkyjpanel{
  height: 100%;
  position: relative;
}
.bkyjbar{
  position: relative;
  height: 22px;
  color: #b6f6ff;
  line-height: 22px;
  margin: 0 0 19px 0;
  display: flex;
  justify-content: left;
}
.bkyjbar .switchOnline{
  margin-left: 7px;
}
.bkyjbar .switchShow{
  margin-left: 7px;
}
.bkyjbar .switchJlState{
  margin-left: 7px;
}
.bkyjbar .bkyjbarMore{
  position:absolute;
  right: 15px;
  cursor: pointer;
}
.seachbar{
 height: 50px;
}
.seachbar_InputSearch{
  height: 36px;
  margin: 0px 0 17px 0;
}
.seachbar_dropdown{
  height: 36px;
  margin: 0px 0 17px 0;
}
.seachbar_fanhui{
  position:absolute;
  left: 90%;
  color: white;
  top:2px;
  font-size: 20px;
  cursor: pointer;
}
.yjlist-panel{
  height: calc(100% - 190px);
  margin: 0 0 10px 0;
  overflow: auto;
}
.pagebar{
  height: 24px;
  position: absolute;
  left: 11px;
  bottom: -20px;
}
.modal-div{
  text-align: right;
  margin-top: 10px;
  margin-right:20px;
  margin-left:20px;
}
.modal-div span{
  width: 85px;
  text-align: right;
  margin-right: 10px;
}
.inputclass{
  width:180px;
  height: 28px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
select {
  height:25px;
  width:111px;
  color: white;
  border: 1px solid white;
  outline: none;
  /*很关键：将默认的select选择框样式清除*/
  /* appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none; */
  /*将背景改为红色*/
  background:transparent;
  /*加padding防止文字覆盖*/
   padding-right: .14rem;
}
option {
  color: #b6f6ff;
  height:30px;
  border: 1px solid white;
  outline: none;
  /*很关键：将默认的select选择框样式清除*/
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  /*将背景改为项目颜色*/
  background-color:rgba(8, 56, 90, 0.90);
  /*加padding防止文字覆盖*/
   padding-right: .14rem;
}
.date-picker{
  width: 180px !important;
  height: 28px !important;
}
</style>
<style>
.jlselect-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left:387px;
  width: 350px !important;
}
</style>
