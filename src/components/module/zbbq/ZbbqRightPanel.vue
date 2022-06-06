<template>
    <div class="zbbqRightPanel">
        <div class="calendarpanel" @mousedown="hideZbzt">
        <full-calendar v-show="showCalander" @events="changeMonth" ref="calendar"  :config="config" class="test-fc"  id = "calendar"
            locale="fr" @event-drop="eventDrop" @event-receive="eventReceive" @event-selected="eventSelected">
        </full-calendar>
        </div>
        <div v-show="showZbztPanel" class="zbztBtn" :style="{top:flootTop+'px',left:flootLeft+'px'}">
            <Button type="primary" size="small" @click="changeZbzt(1)" style="width:64px;margin-left:10px;background:#3f67f9;font-size:14px;position: relative;top: 40px;">
                <Icon custom="iconfont iconbaiban"/>白班</Button>
            <Button type="primary" size="small" @click="changeZbzt(2)" style="width:64px;margin-left:10px;background:#534f4f;font-size:14px;position: relative;top: 40px;">
                <Icon custom="iconfont iconwanban"/>晚班</Button>
            <Button type="primary" size="small" @click="changeZbzt(0)" style="width:64px;margin-left:10px;background:#0d9534;font-size:14px;position: relative;top: 40px;">
                <Icon custom="iconfont iconquantian"/>全天</Button>
            <Button type="primary" size="small" @click="changeZbzt(3)" style="width:64px;margin-left:10px;background:#85990e;font-size:14px;position: relative;top: 60px;">
                <Icon custom="iconfont iconbeiqin"/>备勤</Button>
            <Button type="primary" size="small" @click="changeZbzt(4)" style="width:64px;margin-left:10px;background:#ff0000;font-size:14px;position: relative;top: 60px;">
                <Icon custom="iconfont iconzbbqshanchu"/>删除</Button>
        </div>
        <!-- <Modal v-model="showZbztPanel" title="值班状态修改" :footer-hide="true" style="top:10px" class="vertical-center-modal">
            <div class="zbztBtn">
                <Button type="primary" size="small" @click="changeZbzt(1)" style="width:64px;margin-left:10px;background:#3f67f9;font-size:14px;">
                    <Icon custom="iconfont iconbaiban"/>白班</Button>
                <Button type="primary" size="small" @click="changeZbzt(2)" style="width:64px;margin-left:10px;background:#534f4f;font-size:14px;">
                    <Icon custom="iconfont iconwanban"/>晚班</Button>
                <Button type="primary" size="small" @click="changeZbzt(0)" style="width:64px;margin-left:10px;background:#0d9534;font-size:14px;">
                    <Icon custom="iconfont iconquantian"/>全天</Button>
                <Button type="primary" size="small" @click="changeZbzt(3)" style="width:64px;margin-left:10px;background:#85990e;font-size:14px;">
                    <Icon custom="iconfont iconbeiqin"/>备勤</Button>
                <Button type="primary" size="small" @click="changeZbzt(4)" style="width:64px;margin-left:10px;background:#ff0000;font-size:14px;">
                    <Icon custom="iconfont iconzbbqshanchu"/>删除</Button>
            </div>
        </Modal> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import 'fullcalendar/dist/fullcalendar.css'
import {FullCalendar} from 'vue-full-calendar'
import common from "@/common.js"
import HfxTable from '@/components/base/HfxTable'
export default {
  name: 'ZbbqRightPanel',
  components: {FullCalendar,LeftContentNameBar,HfxTable},
  data () {
   return {
        showTimeselect:false,
        zbTableDataLeft:[],
        zbTableDataRight:[],
        showZbztPanel:false,
        showCalander:true,
        showZbtable:false,
        zbchangeBtn:"值班排班表",
        zbtitle: [
                    {
                        title: '部门',
                        key: 'deptname',
                        width:40,
                    },
                    {
                        title: '姓名',
                        key: 'username',
                        width:30,
                    },
                    {
                        title: '短号',
                        key: 'shortmobile',
                        width:30,
                    }
                ],
        zbzt:0,
        config:{
            firstDay:1,//表示从周一开始
            locale:'zh-cn',//表示中文格式
            defaultView: 'month',//默认视图
            titleFormat:'YYYY年MM月',
            height:810,
            header:{//标题格式
                // top:'60',
                left:'',
                center:'title',
                right:'prev,today,next',
            },
            dragOpacity: {
                        '': .6
                        },
            eventOrder: "color",
            /* agenda 模式 */
            allDaySlot:false,
            editable: true,
            droppable:true,//true可以将内容拖放到日历上
            // editable:true,
            /* 设置按钮文字 */
            buttonText:{
                today:'本月',
                prev:'<',
                next:'>'
            },
            events: this.changeMonth
        },
        prveMonth:'',
        nextMonth:'',
        itemEvent:{},
        flootTop:200,
        flootLeft:200,
    }
  },
  computed: mapState({
      userInfo: state => state.userInfo
  }),
  methods:{
      hideZbzt(){
          this.showZbztPanel = false;
      },
      changeView(){
          if(this.showCalander==true){
              this.showTimeselect = true;
              this.showCalander = false;
              this.showZbtable = true;
              this.zbchangeBtn = "值班排班表";
              this.reflashZbForm();
          }else{
              this.showTimeselect = false;
              this.showCalander = true;
              this.showZbtable = false;
              this.zbchangeBtn = "每日值班表";
          }
      },
      changeDate(date){
          this.http.get("/zbbq/getZbFormByDatetime",{datetime:date},this.getZbFormByDatetimeCallBack,this,false);
      },
      eventDrop(date,dayDelta,revertFunc){//日历内部之间的拖拽后触发
        
      },
      eventSelected(event,jsEvent,view){// 点击日历上的item事件
        this.flootLeft = jsEvent.clientX-540;
        this.flootTop = jsEvent.clientY-90;
        var id = event.id;
        this.showZbztPanel = true;
        this.itemEvent = event;
      },
      changeZbzt(zbzt){
          var updateZbbqObj = {};
          updateZbbqObj.id = this.itemEvent.id;
          updateZbbqObj.datetime = this.itemEvent.datetime;
          updateZbbqObj.zbzt = zbzt;
          this.zbzt = zbzt;
          if(zbzt==4){
            var deleteZbbqObj = {};
            deleteZbbqObj.id = this.itemEvent.id;
            this.http.get("/zbbq/deleteZbUserById",deleteZbbqObj,this.deleteZbUserByIdCallBack,this,false);
          }else{
            this.http.get("/zbbq/updateZbUserZbztById",updateZbbqObj,this.updateZbUserZbztByIdCallBack,this,false);
          }
      },
      deleteZbUserByIdCallBack(result){
          $('#calendar').fullCalendar('removeEvents', this.itemEvent._id);
          this.showZbztPanel = false;
      },
      updateZbUserZbztByIdCallBack(result){
          var username = this.itemEvent.title.substring(0, this.itemEvent.title.indexOf("("));
          var zb = "全班";
          if(this.zbzt==0){
              this.itemEvent.title = username + "(全天)";
          }else if(this.zbzt==1){
              this.itemEvent.title = username + "(白班)";
          }else if(this.zbzt==2){
              this.itemEvent.title = username + "(晚班)";
          }else if(this.zbzt==3){
              this.itemEvent.title = username + "(备勤)";
          }
          $('#calendar').fullCalendar('updateEvent', this.itemEvent);
          this.showZbztPanel = false;
      },
      eventReceive(event){//日历外面的元素拖拽进日历后触发
        var insertZbDateUserObj = {};
        insertZbDateUserObj.datetime =  this.$moment(event.start).format("YYYY-MM-DD");
        insertZbDateUserObj.deptcode = event.deptcode;
        insertZbDateUserObj.code = event.usercode;
        insertZbDateUserObj.name = event.title;
        insertZbDateUserObj.iszbleader = event.isleader;
        this.itemEvent = event;
        $('#calendar').fullCalendar('removeEvents', event._id);
        this.http.get("/zbbq/insertZbUserByDate",insertZbDateUserObj,this.insertZbUserByDateCallBack,this,false);
      },
      insertZbUserByDateCallBack(result){
            this.itemEvent.id = result[0].id;
            this.itemEvent.datetime = result[0].datetime;//回调之后在更新日历前把日历Iteam的时间设置成入库的datetime
            this.itemEvent.title = this.itemEvent.title + "(全天)";
            if(this.itemEvent.isleader == '1') {
                this.itemEvent.color = '#3a87ad';
            }else {
                this.itemEvent.color = '#F37B1D';
            }
            // $('#calendar').fullCalendar('updateEvent', this.itemEvent);
            $('#calendar').fullCalendar('refetchEvents');
      },
      changeMonth(start,end,timezone,callback){
          var date = this.$moment(this.$refs.calendar.fireMethod("getDate")).format("YYYY-MM");
          this.http.get("/zbbq/getZbUserByMonth",{deptcode:this.userInfo.deptcode,date:date},this.getZbUserByMonthCallBack,this,false,callback);
      },
      fireMethod(...options) {
          return $(this.$el).fullCalendar(...options)
      },
      getZbUserByMonthCallBack(data,callback){
          for(var i=0;i<data.length;i++){
            if(data[i].zbzt == '0') {
                var btype = '(全天)';
            }else if(data[i].zbzt == '1') {
                var btype = '(白班)';
            }else if(data[i].zbzt == '2'){
                var btype = '(晚班)';
            }else if(data[i].zbzt == '3'){
                var btype = '(备勤)';
            }
            if(data[i].isleader == '1') {
                var fccolor = '#3a87ad';
            }else {
                var fccolor = '#F37B1D';
            }
            data[i].title = data[i].username+btype;
            data[i].start = data[i].datetime;
            data[i].color = fccolor;
         }
         callback(data);
      },
      getZbFormByDatetimeCallBack(result){
          var leftdata = [];
          var rightdata = [];
          for(var i=0;i<result.length;i++){
             if(i%2 !=0){
                 leftdata.push(result[i]);
             }else{
                 rightdata.push(result[i]);
             }
          }
           this.zbTableDataLeft = leftdata;
           this.zbTableDataRight = rightdata;
      },
      reflashZbForm(){
        var date = this.$moment(new Date()).format("YYYY-MM-DD");
        this.http.get("/zbbq/getZbFormByDatetime",{datetime:date},this.getZbFormByDatetimeCallBack,this,false);
      }
  },
  created(){
      var date = this.$moment(new Date()).format("YYYY-MM-DD");
      this.http.get("/zbbq/getZbFormByDatetime",{datetime:date},this.getZbFormByDatetimeCallBack,this,false);
  }
}
</script>

<style scoped>
.zbbqRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
  /* color: white; */
}
.zbTable{
    padding-top: 10px;
    display: flex;
    height: calc(100% - 72px);
}
.zbztBtn{
    position: absolute;
    /* top: 100px;
    left: 200px; */
    width: 255px;
    height: 150px; 
    background: url("./../../../assets/zbbq/zb_img_menu_bg.png") center no-repeat;
    background-size: 100% 100%;
    z-index: 10;
}
.calendarpanel{
    height: calc(100% - 0px);
    overflow: hidden;
    color: #fff;
    width: 1410px;
    margin: 0 auto;
}
</style>
<style>
.vertical-center-modal .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 450px;
  left:750px;
  width: 450px !important;
}
.fc-toolbar.fc-header-toolbar{
    margin-top: 20px;
    width: 1410px;
    height: 50px; 
    background: url("./../../../assets/zbbq/zb_img_title_bg.png") center no-repeat;
    background-size: 100% 100%;
}
.fc-toolbar .fc-center{
    margin-top: 10px;
    color: #fff;
    font-size: 14px;
}
.fc-button-group{
   margin-top: 15px;
   margin-right: 15px; 
}
.fc .fc-button-group > * {
   background: #fff0;
   color: #fff;
   border: 1px solid #fff;
   outline: 0px;
   margin: 0px 5px;
}
.fc-day-header{
    width: 190px !important;
    height: 40px; 
    line-height: 40px;
    margin: 5px;
    background: url("./../../../assets/zbbq/zb_table_th_bg.png") center no-repeat;
    background-size: 100% 100%;
}
.fc-past{
    width: 190px !important;
    height: 40px; 
    margin: 5px;
    background: url("./../../../assets/zbbq/zb_boder_boxbg.png") center no-repeat;
    background-size: 100% 100%;
}
.fc-past span{
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    top: 10px;
    border-radius: 50%;
    border: 1px solid #fff;
    position: relative;
    right: 10px; 
}
.fc-today{
    width: 190px !important;
    height: 40px; 
    margin: 5px;
    background: url("./../../../assets/zbbq/zb_boder_boxbg_click.png") center no-repeat;
    background-size: 100% 100%;
}
.fc-today span{
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    top: 10px;
    border-radius: 50%;
    border: 1px solid #67c23a;
    position: relative;
    right: 10px; 
}
.fc-future{
    width: 190px !important;
    height: 40px; 
    margin: 5px;
    background: url("./../../../assets/zbbq/zb_boder_boxbg.png") center no-repeat;
    background-size: 100% 100%;
}
.fc-future span{
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    top: 10px;
    border-radius: 50%;
    border: 1px solid #fff;
    position: relative;
    right: 10px; 
}
.fc-event-container{
   height: 50px; 
}
.fc-row .fc-content-skeleton tbody td{
    height: 20px;
}
</style>

