<template>
    <div class="jqpanel">
      <audio loop ref="jqsound"><source src="@/assets/jq/sound/jqsound.mp3"></audio><!--警情的声音http://47.111.104.252:8080/file/alarm/record/jqsound.mp3--->
      <LeftContentNameBar :isshowshaixuan="true" :isshowclear="isshowclear" @on-click="clickMoreIcon" @on-clear="fanhuisearch" />
        <div class="jqbar">
              <span>点位</span>
              <el-switch class="switchModel" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="showSwitch" @change="showJqLayer">
              </el-switch>
              <span>声音</span>
              <el-switch class="switchModel" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="soundSwitch" @change="showSound">
              </el-switch>
              <span>聚合</span>
              <el-switch class="switchModel" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="juheSwitch" @change="showJuhe">
              </el-switch>
              <span>热力</span>
              <el-switch class="switchModel" :width=40 active-color="#13ce66" inactive-color="#ff4949" v-model="reliSwitch" @change="showReli">
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
            v-model="showMore" :draggable = "true" title="警情筛选" class-name="jqselect-panel">
            <div slot="close"><div class="hfx-modal-close"/></div>
            <div class="modal-div">
                <span>关键字</span>
                <input class="inputclass" v-model="name"/>
            </div>
            <div class="modal-div">
                <span>接警单编号</span>
                <input class="inputclass" v-model="jjdbh"/>
            </div>
            <div class="modal-div">
                <span>警情类别</span>
                <select class="inputclass" v-model="jqlbcode">
                  <option value="">请选择</option>
                  <option :value="jjlbObj.code" v-for="jjlbObj in jjlbList" :key="jjlbObj.code">{{jjlbObj.name}}</option>
                </select>
            </div>
            <div class="modal-div">
                <span>警情状态</span>
                <select class="inputclass" v-model="state">
                  <option value="">请选择</option>
                  <option value="0">未签收</option>
                  <option value="1">已签收</option>
                  <option value="2">已到达</option>
                  <option value="3">已完成</option>
                </select>
            </div>
            <div class="modal-div">
                <span>时间范围(开始)</span>
                <!-- <el-date-picker v-model="starttime" type="datetime" placeholder="选择日期时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> -->
                <DatePicker type="datetime" v-model="starttime" class="date-picker" placeholder="选择日期时间"></DatePicker>
            </div>
            <div class="modal-div">
                <span>时间范围(结束)</span>
                <!-- <el-date-picker v-model="endtime" type="datetime" placeholder="选择日期时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> -->
                <DatePicker type="datetime" v-model="endtime" class="date-picker"  placeholder="选择日期时间" ></DatePicker>
            </div>
            <div slot="footer">
              <!-- <Button type="text" size="large" @click="reset">重置</Button>
              <Button type="primary" size="large" @click="submitSearch">确定</Button> -->
              <HfxButton   @click="fanhuisearch" name="重置" />
              <HfxButton   @click="submitSearch" />
            </div>
        </Modal>
        <JingQingDetail v-model="showJqDetail" :jqid="jqDetailId" @handler="JingQingDetailHandler"/>
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" @on-clear="fanhuisearch" v-model="name"/>
            <DropdownTreeNew class="seachbar_dropdown" :deptListObj="deptListObj" :choiceDept="choiceDept" :orideptname="userInfo.directdeptname"/>
            <!-- <Icon v-show="isfanhuishow" custom="iconfont iconfanhui" class="seachbar_fanhui" @click="fanhuisearch"/> -->
        </div>
        <div class="jqlist-panel">
          <!-- <el-scrollbar> -->
            <JingQingButton v-for="jqObj in jqList" :key="jqObj.id" :data="jqObj" @on-click="clickJqButton"/>
          <!-- </el-scrollbar> -->
         
        </div>
        <!-- <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/> -->
        <div style="color:rgb(88 245 255);position: relative;text-align: right;padding-right: 15px;padding-top: 3px;">
          <span>共计：</span><span>{{totalSize}}条</span>
        </div>
        <Modal title="警情派发" class-name="jqpf-panel" v-model="showJqpf" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div v-show="jqpfMjList.length==0&&jqpfWgyList.length==0">无可派发人员</div>
          <Divider v-show="jqpfMjList.length>0" orientation="center" class="line">民警</Divider>
          <CheckboxGroup v-show="jqpfMjList.length>0" v-model="jqpfMjSelect">
            <!-- label绑定下标方便从源数据中获取对象以获取电话号码 -->
            <Checkbox v-for="(obj,index) in jqpfMjList" :key="obj.usercode" :label="index">{{obj.username}}</Checkbox>
          </CheckboxGroup>
          <Divider v-show="jqpfWgyList.length>0" orientation="center" class="line" style="margin-top: 10px;">网格员</Divider>
          <div v-show="jqpfWgyList.length>0" class="wgyDiv">
            <Collapse :accordion="true">
                <Panel v-for="deptObj in jqpfWgyList" :key="deptObj.key">
                    {{deptObj.deptname}}
                    <div slot="content">
                        <Collapse :accordion="true">
                            <Panel v-for="wgObj in deptObj.wglist" :key="wgObj.key">
                                {{wgObj.wgname}}
                                <p slot="content">
                                    <Checkbox v-for="wgyObj in wgObj.wgylist" :key="wgyObj.wgyusername" label="wgyObj.wgyusername">{{wgyObj.wgyusername}}</Checkbox>
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                </Panel>
            </Collapse>
          </div>
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideJqpfModal">取消</Button>
            <Button type="primary" size="large">确定</Button> -->
            <HfxButton   @click="hideJqpfModal" name="取消" />
            <HfxButton  @click="submitJqpf" />
          </div>
        </Modal>
        <Modal title="已匹配预案" class-name="jqpf-panel" v-model="showPlanSelect" :footer-hide="true" :draggable="true">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div>
            <div>已匹配预案</div>
            <div @click="showPlanFlow(obj)" v-for="(obj,index) in matchplanlist" :key="obj.type" 
              style="background:#91981f;padding:5px;border-radius:3px;margin:5px;cursor:pointer;">{{(index+1)+"、"+obj.name}}
            </div>
          </div>
          <div>
            <div>其他预案</div>
            <div @click="showPlanFlow(obj)" v-for="(obj,index) in planlist" :key="obj.type" 
              style="background:#0b5caf;padding:5px;border-radius:3px;margin:5px;cursor:pointer;">{{(index+1)+"、"+obj.name}}
            </div>
          </div>
        </Modal>
        <!-- <SendMsg :dhhm="dhhm" :msg="msg" :showpanel="showSendMsg"/> -->
        <!-- <RybjPanel v-model="showrygjpanel" :showPanel="showrygjpanel" :data="ryxxData" @on-close="closeJqda"/> -->
        <RydaInfo :showPanel="showrydapanel" :lxdh="lxdh" @on-close="closeJqda"/>
        <PlanFlowPage v-if="showPlan" :plandata="plandata" @on-close="closePlan"/>
    </div>
</template>

<script>

import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import InputSearchNew from '@/components/base/InputSearchNew'
import DropdownTreeNew from '@/components/base/DropdownTreeNew'
import PagerNew from '@/components/base/PagerNew'
import HfxDatePicker from '@/components/base/HfxDatePicker'
import JingQingButton from '@/components/module/jq/JingQingButton'
import JingQingDetail from '@/components/module/jq/JingQingDetail'
import JingQingDetailMap from '@/components/module/jq/JingQingDetailMap'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import common from "@/common.js"
import SendMsg from '@/components/base/SendMsg'
import RybjPanel from '@/components/base/RybjPanel'
import RydaInfo from '@/components/base/RydaInfo'
import map3DUtil from '@/components/map/js/map3DUtil'
import PlanFlowPage from '@/components/base/PlanFlowPage'

export default {
  name: 'JingQing',
  components: {InputSearchNew,LeftContentNameBar,DropdownTreeNew,JingQingButton,PagerNew,HfxDatePicker,JingQingDetail,SendMsg,JingQingDetailMap,RybjPanel,RydaInfo,PlanFlowPage},
  data () {
    return {
      showSwitch:true,
      soundSwitch:true,
      juheSwitch:false,
      reliSwitch:false,
      deptListObj:{},
      showMore:false,
      showrygjpanel:false,
      showrydapanel:false,
      ryxxData:{},
      lxdh:"",
      starttime:"",
      endtime:"",
      name:"",
      jjdbh:"",
      jqlbcode:"",
      state:"",
      jjlbList:[],  //存放警情类别列表
      timeRadio:3,
      page:1,
      pageSize:10,
      totalSize:0,  //总共页数
      jqList:[],   //警情的list
      jqLocList:[],
      isshowclear:false,  //清楚删选条件按钮是否显示
      deptcode:"",  //选择的部门
      showJqDetail:false, //是否显示警情详情页面
      jqDetailId:"",  //警情详情页面id
      jqpfDataObj:{},//当前派发的警情
      showJqpf:false,
      jqpfMjSelect:[],//警情派发民警选择人员
      jqpfWgySelect:[],//警情派发网格员选择人员
      jqpfMjList:[],//警情派发民警的数据
      jqpfWgyList:[],//警情派发网格员的数据
      jqpfWgyTree:{},//警情派发网格员的数据树
      xianshiClass:"xianshiClass",
      yincangClass:"yincangClass",
      dakaiClass:"dakaiClass",
      guanbiClass:"guanbiClass",
      dhhm:"",
      msg:"",
      showSendMsg:false,
      showPlan:false,
      showPlanSelect:false,
      planlist:[],
      matchplanlist:[],
      selectjqObj:{},
      plandata:{},
    }
  },
  computed: mapState({
     userInfo: state => state.userInfo,
     pushSsjq: state => state.push.ssjq,
     currentMenu: state => state.currentMenu,
     currentMapType:state => state.currentMapType,
  }),
  methods:{
    clickShaiXuan(){
     
    },
      clickMoreIcon(){
        this.showMore = !this.showMore;
      },
      inputSearch(value){
        this.page = 1;
        this.searchJq();
      },
      getDeptTreeCallBack(data){
        this.deptListObj = data;
      },
      getSsjqLbCallBack(data){
        this.jjlbList = data;
      },
      choiceDept(data){
        this.page = 1;
        this.deptcode = data.deptcode;
        this.searchJq();
      },
      pageChange(page){
        this.page = page;
        this.searchJq();
      },
      reset(){//筛选框清空
        this.name = "";
        this.jjdbh = "";
        this.jqlbcode = "";
        this.state = "";
        this.starttime = "";
        this.endtime = "";
        this.timeRadio=3;
      },
      submitSearch(){
          this.page = 1;
          this.searchJq();
          this.isshowclear=true;
      },
      getSsjqCallBack(data){
        this.totalSize = data.count;
        this.jqList = data.data;
        this.jqLocList = [];
        for(var i=0;i<this.jqList.length;i++){
             if(this.jqList[i].loc){
                this.jqLocList.push(this.jqList[i]);
             }
        }
        if(this.currentMapType=="3D"){
          map3DUtil.addJqPoints(this.jqList,"jqLayer",this.JingQingDetailHandler);//打点
        }else{
          this.showCicle = this.showSwitch;
          yewuMarkUtil.addJqMarks(this.jqList,this.JingQingDetailHandler,this);//打点
        }
        // this.showJuhe();
        // this.showReli();
        // markUtil.createHeatmapLayer(this.jqList,this);//热力图层
        // markUtil.addCluster("hfxjuhelayer",this.jqList,this);//聚合图层
      },
      fanhuisearch(){
        this.page = 1;
        this.reset();
        this.isshowclear = false;
        this.searchJq();
      },
      searchJq(){
        var paramObj = {};
        //翻页
        paramObj.all='1';//查全部警情
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize;
        //部门
        if(this.deptcode==""){
          paramObj.deptcode = this.userInfo.directdeptcode;
        }else{
          paramObj.deptcode = this.deptcode;
        }
        //名称
        paramObj.name = this.name;
        //接警单编号
        paramObj.jjdbh = this.jjdbh;
        //开始时间
        if(this.starttime != ''){
          paramObj.starttime = this.$moment(this.starttime).format("YYYY-MM-DD HH:mm:ss");
        }
        //结束时间
        if(this.endtime != ''){
          paramObj.endtime = this.$moment(this.endtime).format("YYYY-MM-DD HH:mm:ss");
        }
        //警情类别
        paramObj.jqlbcode = this.jqlbcode;
        //状态
        paramObj.state = this.state;
        this.http.get("/ssjq/getSsjq",paramObj,this.getSsjqCallBack,this,false);
      },
      clickJqButton(data){
        if(data.loc&&data.loc.x){//地图上显示
            if(this.currentMapType=="3D"){
              map3DUtil.map3dCenterAt(data.loc);
            }else{
              markUtil.centerAndShow("ssjqLayer",data.id,this);
            }
            this.showJqDetail = false;
        }else{//没有坐标，没法地图上显示
          this.showJqDetail = true;
          this.jqDetailId = data.id;
          this.map.map.infoWindow.hide();
        }
        //这里需要停止声音
        var audioEl = this.$refs.jqsound;
        audioEl.pause();
        //设置为看过
        if(data.issee=="0"){//派出所账号看的
          if(common.deleteDeptcodeEndZero(this.userInfo.directdeptcode).length == 8){
              this.http.get("/ssjq/isSeeSsjq",{"id":data.id},null,this,false);
              var obj = common.getObjFromListById(this.jqList,data.id);
              if(obj!=null){
                obj.issee="1";//设置为已查看
              }
          }
        }
        
      },
      getSsjqWxcjcodeCallBack(data){
          this.jqObj.wxcjList = data;
      },
      JingQingDetailHandler(data,state){//detail页面中出发事件返回
        if(state=="top"){//置顶，需要重新查询
          this.searchJq();
        }else if(state=="location"){//定位
          //this.addJqMark(data,"ssjqLayer");
          this.searchJq();
        }else if(state=="jqpf"){
          this.jqpfDataObj = data;
          this.showJqpfModal();
        }else if(state=="rygj"){
          this.showrygjpanel = true;
          this.ryxxData = data;
        }else if(state=="ryda"){
          this.showrydapanel = true;
          this.lxdh = data;
        }else if(state=="jqya"){
          this.selectjqObj = data;
          this.http.get("/ssjq/getPlan",{jqlx:data.bjlbdm},this.getPlanCallBack,this,false);
        }
      },
      getPlanCallBack(data){
         if(data.length==0){
            this.$Message.error("未匹配到重大警情预案");
            return;
         }
         this.matchplanlist = [];
         this.planlist = [];
         for(var i in data){
            var jqlb = data[i].jqlb;
            var jqlx = data[i].jqlx;
            if(jqlb==this.selectjqObj.bjlbdm){
                this.matchplanlist.push(data[i]);
            }else if(jqlx==this.selectjqObj.bjlxdm){
                this.matchplanlist.push(data[i]);
            }else{
              var tags = [];
              var match = false;
              if(data[i].tags){
                tags = data[i].tags.split(";");
                for(var x in tags){
                    if(this.selectjqObj.bjnr.indexOf(tags[x])>-1){
                        match = true;
                        break;
                    }
                }
              }
              if(match){
                  this.matchplanlist.push(data[i]);
              }else{
                  this.planlist.push(data[i]);
              }
            }
         }
         this.showPlanSelect = true;
      },
      closeJqda(){
        this.showrydapanel=false;
      },
      closePlan(){
        this.showPlan = false;
      },
      showPlanFlow(obj){
         this.plandata = obj;
         this.plandata.jqobj = this.selectjqObj;
         this.showPlan = true;
         this.showPlanSelect = false;
      },
      showJqLayer(){//显示隐藏警情图层
        if(this.showSwitch){//显示
          this.layerObj.jq=true;
          markUtil.showLayer("ssjqLayer",this);
          this.reliSwitch = false;
          markUtil.hideLayer("jqheatmap",this);
          this.juheSwitch = false;
          markUtil.hideLayer("hfxjuhelayer",this);
        }else{//隐藏
          this.layerObj.jq=false;  
          markUtil.hideLayer("ssjqLayer",this);
        }
      },
      showSound(){//关闭或打开声音
        if(!this.soundSwitch){
          var audioEl = this.$refs.jqsound;
          audioEl.pause();
        }
      },
      showJuhe(){
        if(this.juheSwitch){
          markUtil.addCluster("hfxjuhelayer",this.jqLocList,this,"ssjq");//聚合图层
          this.reliSwitch = false;
          markUtil.hideLayer("jqheatmap",this);
          this.showSwitch = false;
          this.layerObj.jq=false;
          markUtil.hideLayer("ssjqLayer",this);
        }else{
          markUtil.hideLayer("hfxjuhelayer",this);
          this.showSwitch = true;
          this.layerObj.jq=true;
          markUtil.showLayer("ssjqLayer",this);
        }
      },
      showReli(){
        if(this.reliSwitch){
           markUtil.createHeatmapLayer("jqheatmap",this.jqList,this);//热力图层
           this.juheSwitch = false;
           this.showJuhe();
           this.showSwitch = false;
           this.layerObj.jq=false;
           markUtil.hideLayer("ssjqLayer",this);
        }else{
          markUtil.hideLayer("jqheatmap",this);
          this.showSwitch = true;
          this.layerObj.jq=true;
          markUtil.showLayer("ssjqLayer",this);
        }
      },
      // showModel(){
      //   if(this.modelSwitch){
      //     var juhelayer = this.map.map.getLayer("hfxjuhelayer");
      //     if(juhelayer){
		  //       juhelayer.hide();
		  //     }
      //     markUtil.createHeatmapLayer(this.jqList,this);//热力图层
      //   }else{
      //     var relilayer = this.map.map.getLayer("heatmap");
      //     if(relilayer){
		  //       relilayer.hide();
		  //     }
      //     markUtil.addCluster("hfxjuhelayer",this.jqList,this);//聚合图层
      //   }
      // },
      showJqpfModal(){
        this.showJqpf = true;
        this.http.get("/ssjq/getJqpfUsers",{jqdeptcode:this.jqpfDataObj.deptcode},this.getJqpfUsersCallBack,this,false);
      },
      hideJqpfModal(){
        this.showJqpf = false;
      },
      getJqpfUsersCallBack(data){
        this.jqpfMjList = data.mjlist;
        this.jqpfWgyTree={};
        this.jqpfWgyList=[];
        for(var i = 0;i<data.wgylist.length;i++){
          if(this.jqpfWgyTree[data.wgylist[i].deptcode]){
            var deptobj = this.jqpfWgyTree[data.wgylist[i].deptcode];
            var wglist = deptobj.wglist;
            if(this.jqpfWgyTree[data.wgylist[i].deptcode][data.wgylist[i].wgname]){
              var wgObj = this.jqpfWgyTree[data.wgylist[i].deptcode][data.wgylist[i].wgname];
              var wgylist = wgObj.wgylist;
              wgylist.push(data.wgylist[i]);
            }else{
              var wgObj = {};
              wgObj.wgname = data.wgylist[i].wgname;
              wgObj.key = "wg"+i;
              var wgylist = [];
              wgObj.wgylist = wgylist;
              wgylist.push(data.wgylist[i]);
              wglist.push(wgObj);
            }
          }else{
            var deptobj ={};
            deptobj.deptcode = data.wgylist[i].deptcode;
            deptobj.deptname = data.wgylist[i].deptname;
            deptobj.key = "dept"+i;
            var wglist = [];
            deptobj.wglist = wglist;
            var wgObj = {};
            wgObj.wgname = data.wgylist[i].wgname;
            var wgylist = [];
            wgObj.wgylist = wgylist;
            wgObj.key = "wg"+i;
            wgylist.push(data.wgylist[i]);
            wglist.push(wgObj);
            this.jqpfWgyTree[data.wgylist[i].deptcode]=deptobj;
            this.jqpfWgyList.push(deptobj);
            this.jqpfWgyTree[data.wgylist[i].deptcode][data.wgylist[i].wgname]=wgObj;
          }
        }
      },
      submitJqpf(){
        if(this.jqpfMjSelect.length<=0&&this.jqpfWgySelect<=0){
          this.$Message.error("未选择派发人员");
          return;
        }
        //准备短信内容
        var dhhm="";
        var msg="";
        var pfjqusercodes="";
        var jqpfObj=this.jqpfDataObj;
        //准备电话号码（民警部分）
        if(this.jqpfMjSelect.length>0){
          for(var i=0;i<this.jqpfMjSelect.length;i++){
              var mjObj=this.jqpfMjList[this.jqpfMjSelect[i]];
              var usercode=mjObj.usercode;
              pfjqusercodes+=usercode+",";
              var mobile=mjObj.mobile;
              if(!("undefined" == typeof mobile)){
                dhhm+=mobile+";";
              }
          }
        }
        //准备信息
        msg= "【时间："+jqpfObj.bjsj+"】,【地点："+this.common.formatundefined(jqpfObj.afdd)+"】,"
		        +"【报警人姓名："+this.common.formatundefined(jqpfObj.bjrxm)+"】,【报警联系电话："+this.common.formatundefined(jqpfObj.lxdh)+"】,"
            +"【报警内容："+this.common.formatundefined(jqpfObj.bjnr)+"】,点击查看报警人位置：https://www.hfengxing.com:9090/hfxdw/locview/html/policemap.html?";
        var policeNo =  pfjqusercodes.substr(0,pfjqusercodes.length-1);
        var taskId = jqpfObj.id;
        var area = jqpfObj.gxdwmc;
        var people_tel = jqpfObj.lxdh;
        var timestamp = Date.parse(new Date()).toString().substr(0,10);
        var param="a="+this.common.encode64(policeNo)+"&b="+this.common.encode64(taskId)+"&c="+this.common.encode64(area)+"&d="+this.common.encode64(people_tel)+"&e="+this.common.encode64(timestamp);
        this.dhhm=dhhm.substr(0,dhhm.length-1);
        this.msg=msg+param;
        this.showSendMsg=true;
      },
      currentTime(val){
        this.starttime =  this.common.addHours(-val);
        this.timeRadio=val;
        this.searchJq();
      }
  },
  created(){
     //获取警情部门
     this.http.get("/user/getDeptTree",null,this.getDeptTreeCallBack,this,false);
     //获取警情类别
     this.http.get("/ssjq/getSsjqLb",null,this.getSsjqLbCallBack,this,false);
     //获取警情
     var param = {};
     param.page = this.page;
     param.pagesize = this.pageSize;
     param.all='1';//查全部警情
     this.starttime = this.common.addHours(-this.timeRadio);
     param.starttime=this.$moment(this.starttime).format("YYYY-MM-DD HH:mm:ss");
     this.http.get("/ssjq/getSsjq",param,this.getSsjqCallBack,this,false);
     //获取无需出警列表
     this.http.get("/ssjq/getSsjqWxcjcode",null,this.getSsjqWxcjcodeCallBack,this,false);
  },
  watch : {
      pushSsjq:function(val) {//警情推送
      // console.log(val.id);
          var from = val.from;
          this.starttime =  this.common.addHours(-this.timeRadio);
          if(from=="insert"){
            this.searchJq();//重新查询
            var audioEl = this.$refs.jqsound;
            if(this.soundSwitch){
              audioEl.play();
            }else{
              audioEl.pause();
            }
          }else{//update
            this.searchJq();//重新查询
          }
      }
  }
}
</script>

<style scoped>
.jqpanel{
  height: 100%;
  /* position: relative; */
}
.jqbar{
  position: relative;
  height: 22px;
  color: #b6f6ff;
  line-height: 22px;
  top:-15px;
  /* margin: 0 0 19px 0; */
  display: inline-flex;
  width: 100%;
  justify-content: space-around;
}
.jqbar >>> .el-switch__core{
  width:54px;
}
.jqbar .switchModel{
  /* margin-left: 7px; */
}
.jqbar .jqbarMore{
  position:absolute;
  right: 15px;
  cursor: pointer;
}
.seachbar{
  height: 90px;
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
.jqlist-panel{
  height: calc(100% - 180px);
  /* margin: 0 0 10px 0; */
  overflow: auto;
}
.pagebar{
  height: 24px;
  position: absolute;
  left: 11px;
  bottom: -20px;
  /* background-color: #002029; */
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
.date-picker{
  width: 180px !important;
  height: 28px !important;
}
.line{
  color: #b6f6ff;
  font-size:14px;
}
.wgyDiv{
  height: 200px;
  overflow: auto;
}
.yincangClass{
  position: absolute;
  color: white;
  margin-left: -50px;
  line-height: 24px;
}
.xianshiClass{
 position: absolute;
  color: white;
  margin-left: -36px;
  line-height: 24px;
}
.guanbiClass{
  position: absolute;
  color: white;
  margin-left: -46px;
  line-height: 24px;
}
.dakaiClass{
 position: absolute;
  color: white;
  margin-left: -32px;
  line-height: 24px;
}
.jqlist-panel >>> .el-scrollbar__bar.is-vertical{
    width: 3px;
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
</style>
<style>
.jqselect-panel .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 82px;
  left:387px;
  width: 350px !important;
}
.jqpf-panel .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:750px;
  width: 400px !important;
}
.ivu-radio-group-button.ivu-radio-group-small .ivu-radio-wrapper {
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    width: 55px;
    color: #b6f6ff;
    background: #093c5d;
    border: 1px solid #b6f6ff;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked {
    border-color: #2d8cf0 !important;
    color: #2d8cf0 !important;
    box-shadow: -1px 0 0 0 #2d8cf0 !important;
    z-index: 1;
}
</style>
