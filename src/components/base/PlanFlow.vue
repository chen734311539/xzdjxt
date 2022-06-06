<template>
    <div class="planflowpage">
        <div v-drag class="planhead">
            <div class="plantitle">重大警情预案</div>
            <div class="planclose" @click="closePlanPanel">
                  <img src="@/assets/chat/chat_close.png"/>
            </div>
        </div>
        <div class="plancontent">
             <div class="planflow">
                 <div v-for="(planarr,index) in planlist" :key="index" class="planflowlevel">
                     <div  v-for="obj in planarr" :key="obj.code" class="planflowitem" :style="itemstyleObject(obj)" @click="editItem(obj)"
                        :class="[obj.state=='1'?'openclass':'',obj.state=='2'?'closeclass':'']">{{obj.name}}
                         <div class="top_arraw"></div>
                         <div v-show="obj.haschild=='1'" class="vict_line"></div>
                         <div v-show="obj.linewidth!='0'" class="top_line" :style="linestyleObject(obj)"></div>
                         <div v-show="obj.code=='2001020201'" class="bottom_line"></div>
                     </div>
                 </div>
             </div>
        </div>
        <div class="time_line_btn" @click="showtimeline">{{timelineStr}}</div>
        <div v-show="showTimeLine" class="time_line">
            <div style="color:#fff;height:30px;line-height:30px;text-align:center;">预案时间线</div>
            <div class="time_line_panel">
                <Timeline style="margin:5px;top: 10px;position: relative;">
                    <TimelineItem v-for="obj in flowlist" :key="obj.code">
                        <p style="font-size:14px;font-weight:bold;color:#d67623;">{{obj.updatetime.substring(0,19)}}</p>
                        <p style="padding-left:5px;color:#fff;">{{obj.name}}</p>
                        <p style="padding-left:5px;color:#67c23a;">{{obj.remark}}</p>
                    </TimelineItem>
                </Timeline>
            </div>
        </div>
        <Modal v-model="showEditPanel" title="编辑流程状态" :footer-hide="true" style="top:10px" class="edit-plan-modal">
            <div class="edit_pannel">
                <div style="height:40px;">
                    <Button type="primary" size="small" @click="changeState('1')" class="edit_btn" style="background:#67c23a;">启用</Button>
                    <Button type="primary" size="small" @click="changeState('2')" class="edit_btn" style="background:#a8a8a8;"> 弃用</Button>
                    <!-- <Button type="primary" size="small" @click="changeState('3')" class="edit_btn" style="background:#0d9534;">备注</Button>
                    <Button type="primary" size="small" @click="changeState('0')" class="edit_btn" style="background:rgb(196 197 71);">取消</Button> -->
                </div>
                <div>
                    <textarea v-model="remark" style="width: 330px;height: 92px;margin: 5px;outline: 0px;" />
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"

export default {
  name: 'PlanFlow',
  components: {},
  props:['plandata'],
  data () {
    return {
       showEditPanel:false,
       planlist:[],
       remark:"",
       flowlist:[],
       selectPlanObj:{},
       showTimeLine:false,
       timelineStr:"显示时间线",
    }
  },
  computed: mapState({
  }),
  methods:{
    showtimeline(){
        this.showTimeLine = !this.showTimeLine;
        if(this.showTimeLine){
           this.timelineStr = "关闭时间线"
        }else{
           this.timelineStr = "显示时间线"
        }
    },
    editItem(obj){
        this.remark = "";
        if(obj.remark){
           this.remark = obj.remark;
        }
        this.selectPlanObj = obj;
        this.showEditPanel = true;
    },
    changeState(state){
        this.showEditPanel = false;
        if(state=='1'||state=='2'){
            var paramObj = {};
            paramObj.jqid = this.plandata.jqid;
            paramObj.code = this.selectPlanObj.code;
            paramObj.remark = this.remark;
            paramObj.state = state;
            this.http.get("/ssjq/updateAlarmPlanFlow",paramObj,this.updateAlarmPlanFlowCallBack,this,false);
        }
    },
    updateAlarmPlanFlowCallBack(data){
       this.getPlanByType();
    },
    itemstyleObject(val){
        var Obj={};
        if(val.type=='10'){
            if(val.level=='1'){
               Obj.width="120px";
            }
            if(val.level=='2'||val.level=='3'&&val.name.length>6){
               Obj.width="160px";
            }
            if(val.level=='3'){
                  Obj.height="50px";
            }
            if(val.level=='4'){
            
            }
            if(val.level=='5'){
               Obj.height="180px";
            }
    
            if(val.code=='10010210'){
                 Obj.marginRight = "580px";
            }
            if(val.code=='100103'){
                 Obj.marginRight = "580px";
            }
            if(val.code=='100104'){
                 Obj.left = "-70px";
            }
            if(val.code=='10010401'){
                 Obj.left = "-370px";
            }
            if(val.code=='10010402'){
                 Obj.left = "-83px";
            }
        }
        if(val.type=='20'){
            if(val.level=='1'){
               Obj.width="120px";
            }
            if(val.level=='2'&&val.name.length>6){
               Obj.width="300px";
            }
            if(val.level=='3'&&val.name.length>6){
               Obj.width="160px";
            }
            if(val.level=='3'){
               Obj.height="50px";
            }
            if(val.level=='4'){
              Obj.height="80px";
            }
            if(val.level=='5'){
               Obj.height="110px";
            }
            if(val.level=='6'){
               Obj.width="140px";
            }

            if(val.code=='20010210'){
                 Obj.marginRight = "580px";
            }
            if(val.code=='200103'){
                 Obj.marginRight = "580px";
            }
            if(val.code=='200104'){
                 Obj.left = "-26px";
            }
            if(val.code=='20010401'){
                 Obj.left = "-370px";
            }
            if(val.code=='20010402'){
                 Obj.left = "-83px";
            }
        }
        return Obj;
    },
    linestyleObject(val){
        var Obj={};
        Obj.width = val.linewidth+"px";
        return Obj;
    },
    closePlanPanel(){
        this.$emit('on-close');
    },
    getPlanFlowCallBack(result){
        this.planlist = result;
        this.getPlanByJqid();
    },
    getPlanByType(){
      var paramObj = {};
      paramObj.type = this.plandata.type;
      paramObj.jqid = this.plandata.jqid;
      this.http.get("/ssjq/getPlanFlow",paramObj,this.getPlanFlowCallBack,this,false);
    },
    getPlanFlowByJqidCallBack(result){
        this.flowlist = [];
        this.flowlist = result;
    },
    getPlanByJqid(){
      var paramObj = {};
      paramObj.jqid = this.plandata.jqid;
      paramObj.type = this.plandata.type;
      this.http.get("/ssjq/getPlanFlowByJqid",paramObj,this.getPlanFlowByJqidCallBack,this,false);
    },

  },
  created(){
     this.getPlanByType();
  },
  watch : {
      plandata:function(val) {
           this.getPlanByType();
      }
  },
  directives:{//拖拽div
    drag(elment,bindings){
        if(!elment.parentNode){
          return;
        }
        var el = elment.parentNode;
        elment.onmousedown = function(e){
            var disx = e.pageX - el.offsetLeft;
            var disy = e.pageY - el.offsetTop;
            document.onmousemove = function (e){
                el.style.left = e.pageX - disx+'px';
                el.style.top = e.pageY - disy+'px';
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            }
        }
    },
  },
}
</script>

<style scoped>
.planflowpage{
    position: absolute;
    width: 1580px;
    height: 800px;
    top: 482px;
    left: -482px;
    z-index: 10;
    background: #0c386fde;
    transform: translate(50%,-50%);
}
.planhead{
    height: 30px;
    width: 100%;
    background: #1b5491;
}
.plantitle{
  width: calc(100% - 30px);
  height: 30px;
  cursor: move;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.planclose{
  cursor: pointer;
  width: 30px;
  height: 30px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.planclose:hover{
  background-color: #f94747;
}
.plancontent{
  position: relative;
  height:calc(100% - 50px);
  width: calc(100% - 20px);
  margin: 10px;
}
.planflow{
  position: relative;
  left: 50%;
  top: 10px;
  width: 1580px;
  text-align: center;
  margin-bottom: 20px;
  overflow: auto;
  transform: translate(-50%,0%);
}
.planflowlevel{
   margin-bottom: 70px;
}
.displaynoneclass{
   position: relative;
   width: 72px;
   height: 10px; 
}
.planflowitem{
    position: relative;
    cursor: pointer;
    border: 1px solid #40afdd;
    color: #fff;
    width: 72px;
    display: inline-block;
    vertical-align: top;
    padding: 5px;
    margin-left: 5px;
    margin-right: 5px;
    text-align: center;
    background: url(./../../assets/jq/btn_bg_bottom.png);
    background-repeat: no-repeat;
    background-position: bottom;
    box-shadow:inset 0px 0px 21px 0px #40afdd;
}
.top_arraw{
    position: absolute;
    width: 15px;
    height: 32px;
    top: -32px;
    left: 50%;
    transform: translate(-50%,0);
    background-position: center;
    background: url(./../../assets/jq/arraw.png) no-repeat;
    background-size: 100% 100%;
}
.canvasPanel{
    position: absolute;
    top: 0px;
    left: 0px;
}
.vict_line{
    position: absolute;
    width: 1px;
    height: 40px;
    bottom: -40px;
    left: 50%;
    transform: translate(-50%,0);
    background: #40afdd;
}
.top_line{
    position: absolute;
    width: 738px;
    height: 1px;
    top: -32px;
    left: 50%;
    background: #40afdd; 
}
.bottom_line{
    position: absolute;
    width: 655px;
    height: 1px;
    bottom: -40px;
    left: 50%;
    background: #40afdd; 
}
.edit_pannel{
    position: absolute;
    width: 340px;
    height: 142px; 
    background: #1ea6e5;
    /* z-index: 10; */
}
.edit_btn{
  width:64px;
  margin-left:10px;
  font-size:14px;
  position: relative;
  top: 5px;
}
.openclass{
    background: #67c23a;
    box-shadow: inset 0px 0px 21px 0px #67c23a;
}
.closeclass{
    background: #a8a8a8;
    box-shadow: inset 0px 0px 21px 0px #a8a8a8;
}
.time_line_btn{
    position: absolute;
    top: 50px;
    cursor: pointer;
    left: 250px;
    width: 80px;
    text-align: center;
    height: 24px;
    line-height: 24px;
    color: #fff;
    box-shadow: inset 0px 0px 21px 0px #40afdd;
}
.time_line{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 200px;
    border-right: 1px solid #0b3466;
    height: 100%;
    background: #1b5491d6;
}
.time_line_panel{
    width: 200px;
    height: calc(100% - 60px);
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 30px;
}
</style>
<style>
.edit-plan-modal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 450px;
  left:750px;
  width: 370px !important;
  height: 230px !important;
}
</style>
