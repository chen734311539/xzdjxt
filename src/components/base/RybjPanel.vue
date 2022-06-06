<template>
    <Modal v-model="showPanel" :draggable="true" class-name="jqda-panel" :footer-hide="true" >
        <div slot="header" style="float:left;">
            <div style="width:272px;float:left;">人员信息轨迹</div>
            <div style="width:200;float:left;color:#f33d3d;cursor:pointer;height:23px;" @click="goToNtfnptUrl">南通市公安局警情赋能服务应用系统</div>
        </div>
        <div slot="close" style="float:left;"><div @click="closePanel" class="hfx-modal-close"/></div>
        <div style="width:100%;height:250px">
           <div class="ryxxInfo_panel">
               <div style="height:120px;padding-top: 10px;padding-left: 10px;">
                   <div style="float:left;">
                       <img :src="data.ryzpurl" style="width:100px;height:120px;"/>
                   </div>
                   <div style="float:left;margin-left:3px;">
                        <div style="margin-bottom:5px;margin-top:35px;">
                            <span style="margin-right:2px;color:#b6f6ff;">姓名：</span>
                            <span style="color:white;">{{data.xm}}</span>
                        </div>
                        <div style="margin-bottom:5px;margin-top:5px;">
                            <span style="margin-right:2px;color:#b6f6ff;">手机号码：</span>
                            <span style="color:white;">{{data.dhhm}}</span>
                        </div>
                        <div style="margin-bottom:5px;margin-top:5px;">
                            <span style="margin-right:2px;color:#b6f6ff;">车牌号：</span>
                            <span style="color:white;">{{data.cph}}</span>
                        </div>
                   </div>
               </div>
               <div style="padding-left: 10px;">
                   <div style="margin-bottom:5px;margin-top:15px;">
                    <span style="margin-right:2px;color:#b6f6ff;">身份证号：</span>
                    <span style="color:white;">{{data.sfzh}}</span>
                   </div>
                   <div style="margin-bottom:5px">
                    <span style="margin-right:2px;color:#b6f6ff;">工作场所：</span>
                    <span style="color:white;" :title="[data.gzcs]">{{common.cutstr(data.gzcs,28)}}</span>
                  </div>
                  <div style="margin-bottom:5px;">
                    <span style="margin-right:2px;color:#b6f6ff;">户籍地：</span>
                    <span style="color:white;" :title="[data.hjd]">{{common.cutstr(data.hjd,28)}}</span>
                  </div>
                  <div style="margin-bottom:5px;">
                    <span style="margin-right:2px;color:#b6f6ff;">现住址：</span>
                    <span style="color:white;" :title="[data.xzd]">{{common.cutstr(data.xzd,28)}}</span>
                  </div>
               </div>
           </div>
           <div class="rysjsaInfo_panel">
               <div style="margin:5px">
                    <div>
                        <span style="color:#303133;margin-left:20px;background-color:#e6a23c;border-radius:3px;cursor: pointer;" @click="showTab">涉警信息</span>
                        <span style="color:#303133;margin-left:10px;background-color:#e6a23c;border-radius:3px;cursor: pointer;" @click="showTab">涉案信息</span>
                    </div>
                    <HfxTable v-show="showjqaj" ref="jqtable" :data="jqDataList" :columns="columns"  style="height:200px">
                        <template #formartafdd="{row,index}">
                            <span  :title="[row.afdd]">{{common.cutstr(row.afdd,10)}}</span>
                        </template>
                        <template #formartbjnr="{row,index}">
                            <span  :title="[row.bjnr]">{{common.cutstr(row.bjnr,10)}}</span>
                        </template>
                    </HfxTable>
                    <HfxTable v-show="!showjqaj" ref="ajtable" :data="ajDataList" :columns="ajcolumns"  style="height:200px">
                        <template #formartajdzmc="{row,index}">
                            <span  :title="[row.ajdzmc]">{{common.cutstr(row.ajdzmc,10)}}</span>
                        </template>
                        <template #formartjyaq="{row,index}">
                            <span  :title="[row.jyaq]">{{common.cutstr(row.jyaq,10)}}</span>
                        </template>
                    </HfxTable>
               </div>
               
           </div>
           <div class="ryhdqkInfo_panel">
               <div style="margin:5px">
                    <div style="width:100%;text-align:center;"><span style="color:white;">最近活动情况</span></div>
                    <div style="margin-left:5px;margin-top:5px;">
                        <div style="width:5px;background-color:#e6a23c;height: 11px;display: inline-block"></div>
                        <span style="color:#e6a23c;">最近一次活动情况</span>
                    </div>
                    <div style="width:100%;text-align:center;margin-top:5px;">
                        <div style="color:white;">{{lasttime}}</div>
                        <div style="color:white;">{{lastmc}}</div>
                    </div>
                    <div style="margin-left:5px;margin-top:5px;">
                        <div style="width:5px;background-color:#e6a23c;height: 11px;display: inline-block"></div>
                        <span style="color:#e6a23c;">七日内活动情况</span>
                    </div>
                    <div style="width:100%;margin-top:5px;">
                        <div style="color:white;margin-top:10px;">
                            <span style="padding-left: 17px;"><img style="width:14px;height:14px" :src="lgicon"/></span>
                            <span style="padding-left: 35px;">旅馆住宿</span>
                            <span style="padding-left: 30px;">{{lgcount}}次</span>
                        </div>
                        <div style="color:white;margin-top:10px;">
                            <span style="padding-left: 17px;"><img style="width:14px;height:14px" :src="wbicon"/></span>
                            <span style="padding-left: 35px;">网吧上网</span>
                            <span style="padding-left: 30px;">{{wbcount}}次</span>
                        </div>
                        <div style="color:white;margin-top:10px;">
                            <span style="padding-left: 17px;"><img style="width:14px;height:14px" :src="kkicon"/></span>
                            <span style="padding-left: 35px;">车辆轨迹</span>
                            <span style="padding-left: 30px;">{{kkcount}}次</span>
                        </div>
                    </div>
               </div>
           </div>
           <div class="ryhdsxtInfo_panel">
               <div ref="ryhdgj" style="width:500px;height:240px;margin:5px"></div>
           </div>
        </div>
    </Modal>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"
import HfxTable from '@/components/base/HfxTable'

export default {
  name: 'RybjPanel',
  props:['dhhm','sfzh','showPanel','data'],
  components: {HfxTable},
  data () {
    return {
      currentDhhm:"",
      currentSfzh:"",
      rygjzxt:null,
      showjqaj:true,
      wbicon: Constants.project+"/static/assets/jq/wbjl.png",
      lgicon: Constants.project+"/static/assets/jq/lgjl.png",
      kkicon: Constants.project+"/static/assets/jq/kkjl.png",
      columns: [
            {
                title: '接警单编号',
                key: 'jjdbh',
                width:25,
            },
            {
                title: '报警时间',
                key: 'bjsj',
                width:25,
            },
            {
                title: '报警类别',
                key: 'bjlbmc',
                width:10,
            },
            {
                title: '案发地点',
                key: 'afdd',
                width:20,
                slot:'formartafdd',
            },
            {
                title: '报警内容',
                key: 'bjnr',
                width:20,
                slot:'formartbjnr',
            }
       ],
       ajcolumns: [
            {
                title: '案件编号',
                key: 'ajbh',
                width:25,
            },
            {
                title: '报案时间',
                key: 'basj',
                width:25,
            },
            {
                title: '案件名称',
                key: 'ajmc',
                width:10,
            },
            {
                title: '案件地点',
                key: 'ajdzmc',
                width:20,
                slot:'formartajdzmc',
            },
            {
                title: '简要案情',
                key: 'jyaq',
                width:20,
                slot:'formartjyaq',
            }
       ],
       jqDataList:[],
       ajDataList:[],
       lastmc:'无',
       lasttime:'无',
       lgcount:0,
       wbcount:0,
       kkcount:0,
       chartXdata:[],
    }
  },
  computed: mapState({
  }),
  methods:{
      closePanel(){
        this.$emit('on-close');
      },
      goToNtfnptUrl(){
          window.open("http://50.88.1.187/jqfn/view/login/login.jsp");
      },
      showTab(){
        this.showjqaj = !this.showjqaj;
      },
      createRygjzxt(data){
        // 以下开始计算y轴刻度
        var hours = 0 // 时
        var minute = 0 // 分
        var second = 0 // 秒
        var s = 0 // 总共的
        var yAxis = []
        yAxis.push('00:00:00') // 从00:00:00开始，否则就会第一个刻度将会是数组的第一个，00:00:01
        for (var i = 1; i <= 86400; i++) {
            // 一分钟以内
            if (i < 60) {
            if (i < 10) {
                s = '00:00:0' + i
            } else {
                s = '00:00:' + i
            }
            } else if (i < 3600) {
            // 一小时以内
            minute = parseInt(i / 60) < 10 ? '0' + parseInt(i / 60) : parseInt(i / 60)
            second = (i % 60) < 10 ? '0' + i % 60 : i % 60
            s = '00' + ':' + minute + ':' + second
            } else {
            // 超过一小时以后
            hours = parseInt(i / 3600) < 10 ? '0' +  parseInt(i / 3600) :  parseInt(i / 3600)
            minute = (parseInt(i % 3600 / 60)) < 10 ? '0' + parseInt(i % 3600 / 60) : parseInt(i % 3600 / 60)
            second = (i % 60) < 10 ? '0' + i % 60 : i % 60
            s = hours + ':' + minute + ':' + second
            }
            yAxis.push(s)
        }
        
        var lgdata = data.lgdata;
        var wbdata = data.wbdata;
        var kkdata = data.kkdata;
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var option = {
                color: colors,
                legend: {
                    itemGap:30,
                    data:[{name:'网吧记录',textStyle:{color:'#5793f3'},icon:'image://'+this.wbicon}, {name:'旅馆记录',textStyle:{color:'#d14a61'},icon:'image://'+this.lgicon},
                          {name:'卡口记录',textStyle:{color:'#675bba'},icon:'image://'+this.kkicon}]
                },
                grid: {
                    top: 50,
                    bottom: 20,
                    left:65,
                    right:10,
                },
                tooltip: {
                    position: 'top',
                    trigger: 'item',
                    // 自己定义显示的值，就是鼠标放在点上，显示的东西
                    formatter: function (params) {
                        let tiptitle = ''
                        let tiptime = ''
                        let tipdetail = ''
                        if(params.value[4] == 'kk'){
                           tiptitle = '卡口轨迹信息 </br>';
                           tipdetail = "经过"+params.value[3]+'卡口';
                        }else if(params.value[4] =='lg'){
                           tiptitle = '旅馆住宿信息 </br>';
                           tipdetail = "在"+params.value[3]+'办理入住';
                        }else if(params.value[4] =='wb'){
                           tiptitle = '网吧上网信息 </br>';
                           tipdetail = "在"+params.value[3]+'上网';
                        }
                        tiptime = params.value[2]+'</br>';
                        return tiptitle+tiptime+tipdetail;
                    }
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    position:'top',
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '旅馆记录  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: this.chartXdata
                },
                yAxis: {
                    type: 'category',
                    axisLine: {
                        show: true,
                        lineStyle:{
                            color:'#093765',
                        }
                    },
                    splitLine: {
                        lineStyle: {
                          type: 'dashed',
                          color:'#093765'
                        }
                    },
                    axisTick: {
                        interval: 14400
                        // length: 6
                    }, // 这个感觉没用，但是如果不加，整个散点图都不见了。
                    // 重点是下面这个axisLabel，这个是用来控制y轴间隔的，因为24小时，时分秒，一天有86400个值，我这让他四个小时一个刻度
                    axisLabel:{
                        // y轴刻度配置，我这是设置了4小时一个刻度间隔，如果想隔6小时就6*3600 - 1就好了
                        interval: 14399, // 0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                        color:'#33c8ff',
                    },
                    // interval: 14399, // 每次增加几个
                    data: yAxis
                },
                series: [
                    {
                        name: '网吧记录',
                        type: 'scatter',
                        symbol:'image://'+this.wbicon,
                        symbolSize:20,
                        // data: [['2020-07-16', '04:00:00'], ['2020-07-20', '05:00:00'], ["2020-07-19", "16:22:49"]]
                        data: wbdata
                    },
                    {
                        name: '旅馆记录',
                        type: 'scatter',
                        symbol:'image://'+this.lgicon,
                        symbolSize:20,
                        data: lgdata
                        // data: [['2020-07-16', '04:00:00'], ['2020-07-20', '05:00:00'], ["2020-07-19", "16:22:49"]]
                    },
                    {
                        name: '卡口记录',
                        type: 'scatter',
                        symbol:'image://'+this.kkicon,
                        symbolSize:20,
                        data: kkdata
                        // data: [['2020-07-16', '04:00:00'], ['2020-07-20', '05:00:00'], ["2020-07-19", "16:22:49"]]
                    }
                ]
        }
        this.rygjzxt.setOption(option);
      },
      initData(){
          var param={};
          param.lxdh=this.data.dhhm;
          param.zjhm=this.data.sfzh;
          param.hphm=this.data.cph;
          this.http.get("/ssjq/getJqdaRyJq",param,this.getJqdaRyJqCallBack,this,false);
          this.http.get("/ssjq/getJqdaRyAj",param,this.getJqdaRyAjCallBack,this,false);
          this.http.get("/ssjq/getJqdaRyRecentEvents",param,this.getJqdaRyRecentEventsCallBack,this,false);
      },
      getJqdaRyJqCallBack(data){
          this.jqDataList=data;
      },
      getJqdaRyAjCallBack(data){
          this.ajDataList=data;
      },
      getJqdaRyRecentEventsCallBack(data){
          this.lgcount=data.lgdata.length;
          this.wbcount=data.wbdata.length;
          this.kkcount=data.kkdata.length;
          this.chartXdata = data.datelist;
          this.createRygjzxt(data);
          if(data.alldata.length==0){
              this.lasttime = "无";
              this.lastmc = "无";
          }else{
              this.lasttime = data.alldata[data.alldata.length-1].TIME;
              this.lastmc = data.alldata[data.alldata.length-1].MC;
          }
      },
  },
  created(){
      if(this.dhhm){
          this.currentDhhm = this.dhhm;
      }
      if(this.sfzh){
          this.currentSfzh = this.sfzh;
      }
  },
  mounted(){
      this.rygjzxt = this.echarts.init(this.$refs.ryhdgj);
  },
  watch:{
      dhhm:function(val){
          this.currentDhhm = val;
      },
      sfzh:function(val){
          this.currentSfzh =val;
      },
      data:function(val){
          this.initData();
      },
  }
}
</script>

<style scoped>
.ryxxInfo_panel{
    height: 100%;
    width: 260px;
    float: left;
    border: 1px solid #2c6daf;
}
.rysjsaInfo_panel{
    height: 100%;
    width: 590px;
    float: left;
    border: 1px solid #2c6daf;
    border-left: 0px;
}
.ryhdqkInfo_panel{
    height: 100%;
    width: 200px;
    float: left;
    border: 1px solid #2c6daf;
    border-left: 0px;
}
.ryhdsxtInfo_panel{
    height: 100%;
    width: 510px;
    float: left;
    border: 1px solid #2c6daf;
    border-left: 0px;
}
</style>
<style>
.jqda-panel .ivu-modal .ivu-modal-content{
  top:640px;
  left: 310px;
  width: 1600px !important;
  /* background-color: #011931 !important; */
}
.jqda-panel .ivu-modal .ivu-modal-header{
  height: 45px !important;
}
</style>
