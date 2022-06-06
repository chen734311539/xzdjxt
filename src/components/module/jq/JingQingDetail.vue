<template>
    <Modal v-model="show" :draggable="true" class-name="jqdetail-panel" :footer-hide="true">
      <div slot="close"><div class="hfx-modal-close"/></div>
        <div slot="header" class="jqDetail-header">
          <div class="datediv">
            <span class="date">{{bjsjdate}}</span>
          </div>
          <div class="timediv">
            <span class="time">{{bjsjtime}}</span>
          </div>
            <div class="separator">
          </div>
          <div class="content">
            <span class="jqlb" :title="[data.bjlbmc+'-'+data.bjlxmc]" >{{jqlbname}}</span>
            <span class="address" :title="[data.afdd]">{{common.cutstr(data.afdd,16)}}</span>
          </div>
              <div :class="signstate">
            </div>
        </div>
        <div style="margin-bottom:5px;">
          <span style="margin-left:25px;margin-right:30px;">报警姓名:</span>
          <span style="color:white;">{{data.bjrxm}}</span>
        </div>
        <div style="margin-bottom:5px;display:inline-flex;">
          <span style="margin-left:25px;margin-right:30px;">联系电话:</span>
          <span style="color:white;">{{data.lxdh}}</span>
          <!-- 发短信和打电话 -->
          <div class="tel"></div>
          <div class="msg" @click="SendMsgToBjr"></div>
        </div>
        <div style="margin-bottom:5px;">
          <span style="margin-left:25px;margin-right:30px;">受警单位:</span>
          <span style="color:white;">{{data.gxdwmc}}</span>
        </div>
        <div style="margin-bottom:5px;">
          <span style="margin-left:25px;margin-right:30px;">受警警员:</span>
          <span style="color:white;">{{data.jjyxm}}</span>
        </div>
        <div style="margin-bottom:5px;">
          <span style="margin-left:25px;margin-right:30px;color:#b6f6ff;">录音编号:</span>
          <!-- <span style="color:white;">{{data.jjlyh}}</span>
          <span v-show="data.jjlyh!=null&&userInfo.usercode=='admin'" style="color:red;cursor: pointer;" @click="loadRecords">下载录音</span> -->
        </div>
        <div style="margin-bottom:-10px;position:relative;">
          <span style="margin-left:25px;margin-right:30px;">报案内容:</span>
          <Input class="bjnr" v-model="bjnr" type="textarea" :autosize="true"  size="small" :readonly="true"/>
        </div>
        <div style="margin-bottom:5px;">
          <span style="margin-left:25px;margin-right:30px;">定位类型:</span>
          <span style="color:white;">{{loctypename}}</span>
        </div>
        <div style="margin-bottom:5px;">
          <span style="margin-left:25px;margin-right:30px;">报警时间:</span>
          <span style="color:white;">{{data.bjsj}}</span>
        </div>
        <div style="margin-bottom:5px;position:relative;">
          <span style="margin-left:2px;margin-right:30px;">无需出警理由:</span>
          <select v-model="notneedcjstate" class="notneedcj" @change="changeWxcj">
                <option value="">请选择</option>
                <option v-for="wxcjObj in jqObj.wxcjList" :value="wxcjObj.code" :key="wxcjObj.code">{{wxcjObj.name}}</option>
          </select>
          <div v-show="isshowwxcjDetail" class="wxcjDetail">
           <textarea v-model="notneedcjstateremark" class="wxcjDetail_text"/>
           <HfxButton   @click="cancelWxcjDetail" name="取消" />
           <HfxButton   @click="submitWxcjDetail" />
         </div>
        </div>
         <div style="margin-top:20px;margin-bottom:10px;">
          <HfxButton style="width:64px;margin-left:0px;" @click="showJQDetailInfo" name="详情" />
          <HfxButton v-if="data.istop=='0'" style="width:64px;margin-left:4px;" @click="setSsjqTop" name="置顶" />
          <HfxButton v-if="data.istop=='1'" style="width:64px;margin-left:4px;" @click="cancelSsjqTop" name="取消置顶" />
          <HfxButton  style="width:64px;margin-left:4px;" @click="jqdwClick" name="定位" />
          <HfxButton  style="width:64px;margin-left:4px;" @click="jqdaClick" name="警情档案" />
         </div>
        <div>
          <HfxButton  style="width:64px;margin-left:0px;"  name="指令" />
          <!-- <HfxButton  style="width:64px;margin-left:4px;" @click="showHczz"  name="合成作战" /> -->
          <HfxButton  style="width:64px;margin-left:4px;" @click="jqyaClick" name="警情预案" />
          <HfxButton  style="width:64px;margin-left:4px;" @click="jqpfClick" name="警情派发" />
         </div>
         <Modal v-model="showDetailInfo" :draggable="true" class-name="jqdetailInfo-panel" :footer-hide="true"  title="警情详情">
            <div slot="close"><div class="hfx-modal-close"/></div>
            <JingQingDetailInfo :jqid="detailInfoJqid"/>
         </Modal>
          <Modal v-model="showJqdaInfo" :draggable="true" class-name="jqdaInfo-panel" :footer-hide="true"  title="报警人档案详情">
            <div class="bjrda_table">
              <div style="width:330px;float:left">
                  <div style="margin-bottom:5px;">
                    <span style="margin-left:38px;margin-right:4px;color:#b6f6ff;">姓名:</span>
                    <span style="color:white;">{{jqdaObj.xm}}</span>
                    <span style="color:#303133;margin-left:164px;background-color:#e6a23c;border-radius:3px;cursor: pointer;" @click="showRygj">人员轨迹</span>
                  </div>
                  <div style="margin-bottom:5px;">
                    <span style="margin-left:15px;margin-right:2px;color:#b6f6ff;">身份证号:</span>
                    <span style="color:white;">{{jqdaObj.sfzh}}</span>
                  </div>
                  <div style="margin-bottom:5px;">
                    <span style="margin-left:15px;margin-right:4px;color:#b6f6ff;">工作单位:</span>
                    <span style="color:white;">{{jqdaObj.gzcs}}</span>
                  </div>
                  <div style="margin-bottom:5px;">
                    <span style="margin-left:28px;margin-right:2px;color:#b6f6ff;">户籍地:</span>
                    <span style="color:white;">{{jqdaObj.hjd}}</span>
                  </div>
                  <div style="margin-bottom:5px;">
                    <span style="margin-left:28px;margin-right:2px;color:#b6f6ff;">现住址:</span>
                    <span style="color:white;">{{jqdaObj.xzd}}</span>
                  </div>
                  <div style="margin-bottom:5px;">
                    <span style="margin-left:40px;margin-right:3px;color:#b6f6ff;">车牌:</span>
                    <span style="color:white;">{{jqdaObj.cph}}</span>
                  </div>
                  <div style="margin-bottom:5px;">
                    <span style="margin-left:4px;margin-right:4px;color:#b6f6ff;">重复报警数:</span>
                    <span style="color:white;">{{jqdaObj.cfbjs}}</span>
                  </div>
              </div>
              <div style="width:128px;float:left;height: 161px;">
                   <img :src="ryzpurl" style="width:128px;height: 158px;"/>
              </div>
            </div>
         </Modal>  
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
            <HfxButton   @click="hideJqpfModal" name="取消" />
            <HfxButton  @click="submitJqpf" />
          </div>
        </Modal>
        <SendMsg :dhhm="dhhm" :msg="msg" :localphone="localphone" :showSendMsg="showSendMsg" @on-close="closeSendMsg"  /> 
        <HczzAddItem :showdata="showdata" :jqdata="data"/>
    </Modal>
</template>

<script>
import { mapState } from 'vuex'
import JingQingDetailInfo from '@/components/module/jq/JingQingDetailInfo'
import markUtil from '@/components/map/js/markUtil'
import common from "@/common.js"
import Vue from 'vue'
import SendMsg from '@/components/base/SendMsg'
import HczzAddItem from '@/components/base/HczzAddItem'

export default {
  name: 'JingQingDetail',
  components: { JingQingDetailInfo,SendMsg,HczzAddItem},
  props:['value','jqid'],
  data () {
    return {
      notneedcjstate:"",
      data:{},
      isshowwxcjDetail:false,
      notneedcjstateremark:"",
      showDetailInfo:false,
      showJqdaInfo:false,
      detailInfoJqid:"",
      jqdalist:[],
      show:this.value,
      jqdaObj:{},
      ryzpurl:require("@/assets/common/zwry.jpg"),
      dhhm:"",
      msg:"",
      localphone:"",
      msgparam:"",
      showSendMsg:false,
      showJqpf:false,
      jqpfMjSelect:[],//警情派发民警选择人员
      jqpfWgySelect:[],//警情派发网格员选择人员
      jqpfMjList:[],//警情派发民警的数据
      jqpfWgyList:[],//警情派发网格员的数据
      jqpfWgyTree:{},//警情派发网格员的数据树
      showdata:{
        showmodal:false,
      },
      showdata:{
        showmodal:false,
      },

    }
  },
  computed: {
    ...mapState({
     userInfo: state => state.userInfo,
    }),
    jqlbname: function () {
      if(this.data.bjlbmc==null){
        this.data.bjlbmc="";
      }
      if(this.data.bjlxmc==null){
        this.data.bjlxmc="";
      }
      if(this.data.bjlbmc!=""&&this.data.bjlxmc!=""){
        var orginstr=this.data.bjlbmc+"-"+this.data.bjlxmc;
        return common.cutstr(orginstr,14);
      }
      if(this.data.bjlbmc==""){
          return this.data.bjlxmc;
      }
      if(this.data.bjlxmc==""){
         return this.data.bjlbmc;
      }
      return "";

    },
    bjsjname:function(){
      if(!this.data.bjsj){
        return "";
      }
      var sj = this.data.bjsj.split(" ")[1];
      return sj.split(":")[0]+":"+sj.split(":")[1];
    },
    bjnr:function(){
      return this.data.bjnr;
    },
    bjnr:function(){
      return this.data.bjnr;
    },
    loctypename:function(){
      var loctypemc = "";
      if(this.data.loctype=="1"){
        loctypemc = "标准地址库";
      }else if(this.data.loctype=="2"||this.data.loctype=="3"){//实际为3,2是历史遗留问题
        loctypemc = "处警采集";
      }else if(this.data.loctype=="4"){
        loctypemc = "基站定位";
      }
      return loctypemc;
    },
    bjsjdate:function(){
      if(!this.data.bjsj){
        return "";
      }
      var sj = this.data.bjsj.split(" ")[0];
      return sj.split("-")[1]+"-"+sj.split("-")[2];
    },
     bjsjtime:function(){
       if(!this.data.bjsj){
        return "";
      }
      var sj = this.data.bjsj.split(" ")[1];
      return sj.split(":")[0]+":"+sj.split(":")[1];
    },
    signstate:function(){
        if(this.data.state=='0'){
            return "signstate_wqs";
        }else if (this.data.state=='1'){
            return "signstate_yqs";
        }else if (this.data.state=='2'){
            return "signstate_ydd";
        }else if (this.data.state=='3'){
            return "signstate_ywc";
        }else{}
    },
  },
  methods:{
    showHczz(){
      this.showdata.showmodal = !this.showdata.showmodal;
    },
    getSsjqByIdCallBack(data){
      this.data = data;
      this.notneedcjstate = data.notneedcjstate==null?"":data.notneedcjstate;
    },
    changeWxcj(){
      if(this.notneedcjstate=="99"){
        this.isshowwxcjDetail = true;
      }else{
        this.isshowwxcjDetail = false;
        var param = {};
        param.notneedcjstate = this.notneedcjstate;
        param.id = this.data.id;
        this.http.get("/ssjq/saveSsjqNotneedcj",param,null,this,false);
      }
      
    },
    cancelWxcjDetail(){
      this.notneedcjstate="";
      this.isshowwxcjDetail = false;
    },
    submitWxcjDetail(){
      if(this.notneedcjstateremark==""){
        this.$Message.warning("请输入无需出警理由");
        return;
      }
      this.isshowwxcjDetail = false;
      var param = {};
      param.notneedcjstateremark = this.notneedcjstateremark;
      param.notneedcjstate = "99";
      param.id = this.data.id;
      this.http.get("/ssjq/saveSsjqNotneedcj",param,null,this,false);
    },
    showJQDetailInfo(){
      this.detailInfoJqid = this.jqid;
      this.showDetailInfo = true;
    },
    setSsjqTop(){
      this.http.get("/ssjq/setSsjqTop",{"id":this.jqid},this.setSsjqTopCallBack,this,false);
    },
    cancelSsjqTop(){
      this.http.get("/ssjq/cancelSsjqTop",{"id":this.jqid},this.cancelSsjqTopCallBack,this,false);
    },
    setSsjqTopCallBack(data){
      this.data.istop = "1";
      this.$emit('handler',this.data,"top");
    },
    cancelSsjqTopCallBack(data){
      this.data.istop = "0";
      this.$emit('handler',this.data,"top");
    },
    jqdwClick(){//警情定位
      this.show = false;
      markUtil.reLocate(null,null,this.jqdwclickHandler,null,this)
    },
    jqdaClick(){
      this.$emit('handler',this.data.lxdh,"ryda");
    },
    jqdaClickCallBack(data){
      this.jqdaObj = data;
    },
    getRyzpCallBack(result){
      if(result.zpurl!=""){
        this.ryzpurl = result.zpurl;
      }
    },
    jqyaClick(){
      this.$emit('handler',this.data,"jqya");
    },
    jqpfClick(){
      // this.$emit('handler',this.data,"jqpf");
      this.http.get("/ssjq/getJqpfUsers",{jqdeptcode:this.data.deptcode},this.getJqpfUsersCallBack,this,false);
    },
    getJqpfUsersCallBack(data){
        this.jqpfMjList = data.mjlist;
        this.showJqpf=true;
    },
    hideJqpfModal(){
      this.showJqpf = false;
    },
    submitJqpf(){
        this.dhhm="";
        this.msg="";
        this.msgparam="";
        if(this.jqpfMjSelect.length<=0&&this.jqpfWgySelect<=0){
          this.$Message.error("未选择派发人员");
          return;
        }
        //准备短信内容
        var dhhm="";
        var msg="";
        var pfjqusercodes="";
        var jqpfObj=this.data;
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
            +"【报警内容："+this.common.formatundefined(jqpfObj.bjnr)+"】,点击查看报警人位置：https://www.hfengxing.com:9090/dwxt/bdp.html?";
        var policeNo =  pfjqusercodes.substr(0,pfjqusercodes.length-1);
        var taskId = jqpfObj.id;
        var area = "hyga";
        if(!jqpfObj.lxdh){
           alert("该报警人联系电话为空！");
           return
        }
        var people_tel = jqpfObj.lxdh;
        var timestamp = jqpfObj.bjsj;
        var param="a="+this.common.encode64(policeNo)+"&b="+this.common.encode64(taskId)+"&c="+this.common.encode64(area)+"&d="+this.common.encode64(people_tel)+"&e="+this.common.encode64(timestamp);
        this.dhhm=dhhm.substr(0,dhhm.length-1);
        this.msg=msg+param;
        this.msgparam=param;
        this.localphone = "0";
        this.showSendMsg=true;
    },
    jqdwclickHandler(point,args){
      var paramObj = {};
      var lx = point.x;
      var ly = point.y;
      paramObj.lx = lx;
      paramObj.ly = ly;
      paramObj.id = this.jqid;
      this.http.get("/ssjq/updateSsjqLoc",paramObj,this.updateSsjqLocCallBack,this,false);
    },
    updateSsjqLocCallBack(data){
      this.$emit('handler',data,"location");
    },
    SendMsgToBjr(){
      var msg="";
      if(this.msgparam!=""){
        msg="您的报警已由"+this.data.gxdwmc+"受理，为确认您的报警，便于民警及时准确赶往现场处理，请点击以下链接：https://www.hfengxing.com:9090/dwxt/bdc.html?"+this.msgparam;
      }
      this.dhhm=this.data.lxdh;
      this.msg=msg;
      this.localphone = "1";
      this.showSendMsg=true;
    },
    showRygj(){
      this.jqdaObj.ryzpurl = this.ryzpurl;
      this.jqdaObj.dhhm = this.data.lxdh;
      // this.showrygjpanel = true;
      this.$emit('handler',this.jqdaObj,"rygj");
    },
    loadRecords(){
       if(this.data.jjlyh){
           this.http.get("/ssjq/getJqLyRecord",{"jjlyh":this.data.jjlyh},this.getJqLyRecordCallBack,this,false);
       }
    },
    getJqLyRecordCallBack(data){
      for(var i=0;i<data.length;i++){
        window.open(data[i]);
      }
    },
    closeSendMsg(){
      this.showSendMsg=false;
    },
  },
  created(){
    
  },
  watch : {
      show:function(val) {
          this.$emit('input',val);
      },
      value:function(val){
        this.show=val;
      },
      jqid:function(val) {
           var that = this;
           this.http.get("/ssjq/getSsjqById",{"id":val},this.getSsjqByIdCallBack,this,false);
      }
  }
}
</script>

<style scoped>

.jqdetail-panel{
  position: relative;
}
.jqDetail-header{
  position: relative;
  height: 70px;
}
.signstate{
  position:absolute;
  right: 27px;
  top:13px;
}
.bjnr{
  position:relative;
  left: 103px;
  top:-22px;
}
.bjnr >>> textarea{
  background-color:transparent;
  color: white;
  border: 0px;
  width: 160px;
  min-height: 26px;
  font-size: 12px;
}
.wxcjDetail{
  position:absolute;
  width: 270px;
  height: 100px;
  top: 0;
  left: 222px;
  border: 1px solid #b6f6ff;
  padding: 10px 10px 5px 10px;
  background-color: rgba(14,31,98,0.9);
}
.wxcjDetail_text{
  color: white;
  width: 100%;
  height: 53px;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  outline: 0;
}
.spantd{
  margin-left: 5px;
  display:inline;
}
.table{
  width: 100%;
  height: calc(100% - 65px - 75px);
}
.bjrda_table{
  overflow: auto;
  max-height: 500px;
}
.bjrda_row{
  margin-left:15px;
  margin-right:30px;
  width: 73px;
  height: 20px;
  color:#b6f6ff;
}
.tbody tr td{
  display:inline;
  padding: 5px 0px;
  text-align: left;
  color: #848484;
} 
.textClass{
  margin-left: 35px;
}
.spanClass{
  word-break: break-all;
  display:table-cell;
  padding: 2px 3px;
  width: 520px;
  color: white;
}
.timediv{
    position: absolute;
    width: 48px;
    height: 20px;
    left: 0;
    top: 32px;
    text-align: center;
    line-height: 20px;
}
.datediv{
    position: absolute;
    width: 48px;
    height: 20px;
    left: 0;
    top: 17px;
    text-align: center;
    line-height: 20px;
}
.date{
  font-size: 14px;
  color: #b6f6ff;
}
.time{
  font-size: 12px;
  color: #b6f6ff;
}
.separator{
  position: absolute;
    left: 50px;
    top: 25%;
    width: 1px;
    height: 38px;
    background: 
    url(./../../../assets/jq/ssjq_separatorline.png)  no-repeat;
}
.content{
  position:absolute;
  left:60px;
  top:15px;
  width: 130px;
}
.jqlb{
  position: relative;
  color: #b6f6ff;
  font-size: 14px;
  top: 5px;
}
.address{
  position:absolute;
  left: 0px;
  top:25px;
  color: #b6f6ff;
}
.signstate_wqs{
  position: absolute;
  right: 25px;
  top: 12px;
  width: 47px;
  height: 45px;
  background: 
  url(./../../../assets/jq/ssjq_wqs.png)  no-repeat;
}
.signstate_yqs{
  position: absolute;
  right: 25px;
  top: 12px;
  width: 47px;
  height: 45px;
  background: 
  url(./../../../assets/jq/ssjq_yqs.png)  no-repeat;
}
.signstate_ydd{
  position: absolute;
  right: 25px;
  top: 12px;
  width: 47px;
  height: 45px;
  background: 
  url(./../../../assets/jq/ssjq_ydd.png)  no-repeat;
}
.signstate_ywc{
  position: absolute;
  right: 25px;
  top: 12px;
  width: 47px;
  height: 45px;
  background: 
  url(./../../../assets/jq/ssjq_ywc.png)  no-repeat;
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
.tel{
  width: 15px;
  height: 15px;
  margin: 0 5px;
  background: 
  url(./../../../assets/jq/ssjq_tel.png)  no-repeat;
}
.msg{
  width: 15px;
  height: 15px;
  margin: 0 5px;
  background: 
  url(./../../../assets/jq/ssjq_msg.png)  no-repeat;
}
.wgyDiv{
  max-height: 250px;
  overflow: auto;
}
.line{
  color: #b6f6ff;
  font-size:14px;
}
</style>
<style>
.jqdetail-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left: 387px;
  width: 315px !important;
}
.jqdetailInfo-panel .ivu-modal .ivu-modal-content{
  top:100px;
  left: 750px;
  width: 625px !important;
}
.jqdaInfo-panel .ivu-modal .ivu-modal-content{
  top:200px;
  left: 750px;
  width: 500px !important;
}
</style>