<template>
    <div class="planflowpage">
        <div v-drag class="planhead">
            <div class="plantitle">{{plandata.name}}</div>
            <div class="planclose" @click="closePlanPanel">
                  <img src="@/assets/chat/chat_close.png"/>
            </div>
        </div>
        <div class="plancontent">
            <super-flow ref="superFlow" :node-list="nodeList" :link-list="linkList" :origin="origin" :link-base-style="linkBaseStyle" :link-desc="linkDesc">
                <template v-slot:node="{meta}">
                    <div @click="nodeClick(meta)" class="flow-node planflowitem" 
                      :class="{openclass:planOpenMap[meta.id]&&planOpenMap[meta.id].state=='1',closeclass:planOpenMap[meta.id]&&planOpenMap[meta.id].state=='2'}">
                      {{meta.desc}}
                    </div>
                </template>
            </super-flow>
        </div>
        <div class="time_line_btn" @click="showtimeline">{{timelineStr}}</div>
        <div v-show="showTimeLine" class="time_line">
            <div style="color:#fff;height:30px;line-height:30px;text-align:center;">预案时间线</div>
            <div class="time_line_panel">
                <Timeline style="margin:5px;top: 10px;position: relative;">
                    <TimelineItem v-for="obj in flowlist" :key="obj.code">
                        <p style="font-size:14px;font-weight:bold;color:#d67623;">{{obj.updatetime.substring(0,19)}}</p>
                        <p style="padding-left:5px;color:#fff;">{{obj.nodename}}</p>
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
  name: 'PlanFlowPage',
  components: {},
  props:['plandata'],
  data () {
    return {
        origin: [681, 465],
        nodeList: [],
        linkList: [],
        linkBaseStyle: {
            color: '#1D9346',           // line 颜色
            hover: '#D34F4F',           // line hover 的颜色
            textColor: '#D34F4F',       // line 描述文字颜色
            textHover: '#D34F4F',       // line 描述文字 hover 颜色
            font: '14px Arial',         // line 描述文字 字体设置 参考 canvas font
            dotted: false,              // 是否是虚线
            lineDash: [4, 4],           // 虚线时生效
            background: 'rgba(255,255,255,0.6)'    // 描述文字背景色
        },
        showEditPanel:false,
        planlist:[],
        remark:"",
        flowlist:[],
        selectFlow:{},
        showTimeLine:false,
        timelineStr:"显示时间线",
        planOpenMap:{},
    }
  },
  computed: mapState({
  }),
  methods:{
    closePlanPanel(){
        this.$emit('on-close');
    },
    getNodeItemClass(nodeid){

    },
    showtimeline(){
        this.showTimeLine = !this.showTimeLine;
        if(this.showTimeLine){
           this.timelineStr = "关闭时间线"
        }else{
           this.timelineStr = "显示时间线"
        }
    },
    nodeClick(meta){
        this.remark = "";
        var obj = this.planOpenMap[meta.id];
        if(obj){
           this.remark = obj.remark;
        }else{
          obj = {};
        }
        this.selectFlow = meta;
        this.showEditPanel = true;
    },
    linkDesc(link) {
      return link.meta ? link.meta.desc : ''
    },
    getPlanFlow(){
       var paramObj = {};
       paramObj.yaid = this.plandata.id;
       this.http.get("/znfk/getPlanFlow",paramObj,this.getPlanFlowCallBack,this,false);
    },
    getPlanFlowCallBack(data){
       if(data.length==0){
           return;
       }
        var obj = data[0];
        var nodeList = JSON.parse(obj.nodelist);
        var linkList = JSON.parse(obj.linklist);
        var linkBaseStyle = JSON.parse(obj.linkbasestyle);
        var origin = JSON.parse(obj.origin);

        setTimeout(() => {
          this.nodeList = nodeList
          this.linkList = linkList
          this.linkBaseStyle = linkBaseStyle
          this.origin = origin
        }, 100)
    },
    changeState(state){
        this.showEditPanel = false;
        if(state=='1'||state=='2'){
            var paramObj = {};
            paramObj.jqid = this.plandata.jqobj.id;
            paramObj.yaid = this.plandata.id;
            paramObj.code = this.selectFlow.id;
            paramObj.nodename = this.selectFlow.desc;
            paramObj.remark = this.remark;
            paramObj.state = state;
            this.http.get("/ssjq/updateAlarmPlanFlow",paramObj,this.updateAlarmPlanFlowCallBack,this,false);
        }
    },
    updateAlarmPlanFlowCallBack(data){
       this.getPlanByType();
    },
    getPlanByType(){
      var paramObj = {};
      paramObj.jqid = this.plandata.jqobj.id;
      paramObj.yaid = this.plandata.id;
      this.http.get("/ssjq/getPlanFlowByJqid",paramObj,this.getPlanFlowByJqidCallBack,this,false);
    },
    getPlanFlowByJqidCallBack(result){
        this.flowlist = [];
        var jqobj = {};
        jqobj.updatetime = this.plandata.jqobj.bjsj;
        jqobj.code = this.plandata.jqobj.id;
        jqobj.nodename = this.plandata.jqobj.bjnr;
        jqobj.remark = this.plandata.jqobj.afdd;
        this.flowlist.push(jqobj);
        for(var i in result){
            this.planOpenMap[result[i].code] = result[i];
            if(result[i].state=='1'){
              this.flowlist.push(result[i]);
            }
        }
    },
  },
  created(){
     this.getPlanFlow();
     this.getPlanByType();
  },
  mounted(){
    
  },
  watch : {
      plandata:function(val){
          this.getPlanFlow(); 
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
    width: 1200px;
    height: 800px;
    top: 485px;
    left: -210px;
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
  height:calc(100% - 95px);
  width: calc(100% - 20px);
  margin: 10px;
  top: 45px;
}
.super-flow{
   overflow: auto;
}
.planflowitem{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 3px;
    font-size: 12px;
    word-wrap: break-word;
    border: 1px solid #40afdd;
    color: #fff;
    vertical-align: top;
    text-align: center;
    background: #40afdd;
    background-repeat: no-repeat;
    background-position: bottom;
    box-shadow:inset 0px 0px 21px 0px #40afdd;
}
.edit_pannel{
    position: absolute;
    width: 340px;
    height: 142px; 
    background: #1ea6e5;
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
    top: 40px;
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
    z-index: 10;
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
