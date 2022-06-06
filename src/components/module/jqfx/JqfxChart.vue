<template>
    <div class="jqfxChartPanel">
        <div class="leftPanel">
          <div class="modal-div" style="padding-top: 23px;">
              <span>图表类型：</span>
              <select class="inputclass" v-model="charttype" @change="chartset">
                  <option value="">请选择图表类型</option>
                  <option value="1">柱状图</option>
                  <option value="2">折线图</option>
                  <option value="3">饼状图</option>
                  <option value="4">雷达图</option>
              </select>
          </div>
          <div class="modal-div">
              <span>时间类型：</span>
              <select class="inputclass" v-model="timetype" @change="resetdate">
                  <option value="">请选时间类型</option>
                  <option value="1">年（每个月）</option>
                  <option value="2">月（每一天）</option>
                  <option value="3">日（每小时）</option>
              </select>
          </div>
          <div class="modal-div">
              <span>选择时间：</span>
              <el-date-picker v-show="timetype=='1'" v-model="date" style="width:180px" type="year" value-format="yyyy"  placeholder="选择年" size="mini"></el-date-picker>
              <el-date-picker v-show="timetype=='2'" v-model="date" style="width:180px" type="month" value-format="yyyy-MM"  placeholder="选择月" size="mini"></el-date-picker>
              <el-date-picker v-show="timetype=='3'" v-model="date" style="width:180px" type="date" value-format="yyyy-MM-dd"  placeholder="选择日期" size="mini"></el-date-picker>
              <el-date-picker v-show="timetype=='4'" v-model="date" style="width:180px" type="datetimerange" range-separator="至"  start-placeholder="开始时间" end-placeholder="结束时间" size="mini"></el-date-picker>
          </div>
          <div v-show="timetype=='4'" class="modal-div">
              <span>时间单位：</span>
              <RadioGroup style="padding-top: 5px;color:red;" v-model="timedw">
                  <Radio label="0">/年</Radio>
                  <Radio label="1">/月</Radio>
                  <Radio label="2">/日</Radio>
                  <Radio label="3">/时</Radio>
              </RadioGroup>
          </div>
          <div class="modal-div">
              <span>警情类型：</span>
              <select class="inputclass" v-model="jqlbcode">
                  <option value="">请选择警情类型</option>
                  <option :value="jjlbObj.code" v-for="jjlbObj in jjlbList" :key="jjlbObj.code">{{jjlbObj.name}}</option>
              </select>
          </div>
          <div class="modal-div">
              <span>警情状态：</span>
              <select class="inputclass" v-model="state">
                  <option value="">请选择</option>
                  <option value="0">未签收</option>
                  <option value="1">已签收</option>
                  <option value="2">已到达</option>
                  <option value="3">已完成</option>
              </select>
          </div>
          <div class="modal-div">
              <HfxButton style="margin-left: 20px;" @click="searchCount('time')" name="按时间展示" :width=90 :height=36 />
              <HfxButton style="margin-left: 20px;" @click="searchCount('dept')" name="按单位展示" :width=90 :height=36 />
              <HfxButton style="margin-left: 20px;" @click="searchCount('jqlb')" name="按类别展示" :width=90 :height=36 />
          </div>
        </div>
        <div class="rightPanel">
          <div class="rightTopPanel">
            <div v-show="charttype=='1'||charttype=='2'" ref="jqfxzxt" class="chart"></div><!--警情分析折线图 -->
            <div v-show="charttype=='3'" ref="jqfxbzt" class="chart"></div><!--警情分析饼状图 -->
            <div v-show="charttype=='4'" ref="jqfxldt" class="chart"></div><!--警情分析雷达图 -->
          </div>
          <!-- <div class="rightBottomPanel">
          </div> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
export default {
  name: 'JqfxChart',
  components: {},
  data () {
    return {
      jjlbList:[],
      charttype:"2",
      timetype:"1",
      date:"2020",
      deptcode:"",
      timedw:"1",
      jqlbcode:"",
      state:"",
      zxtchart:null,//折线图
      ldtchart:null,//折线图
      bztchart:null,//折线图
      chart:"line",
      searchtype:"",
      chartTitle:"",
    }
  },
  computed: mapState({
     userInfo:state => state.userInfo,
     currentDept: state => state.jqfx.currentDept,
  }),
  methods:{
      resetdate(){
        this.date = "";
      },
      chartset(){
        if(this.charttype=='1'){
          this.chart = 'bar';
        }
        if(this.charttype=='2'){
          this.chart = 'line';
        }
      },
      getSsjqLbCallBack(data){
        this.jjlbList = data;
      },
      searchCount(val){
        if(this.timetype=="" || this.timetype==null){
          this.$Message.error("时间类型不能为空");
          return;
        }
        if(this.date=="" || this.date==null){
          this.$Message.error("选择时间不能为空");
          return;
        }
        var param = {};
        param.timetype = this.timetype;
        param.date = this.date;
        param.jqlbcode = this.jqlbcode;
        param.deptcode = this.deptcode;
        param.state = this.state;
        if(val=='time'){
          this.http.get("/tjfx/getJqfxCountForDate",param,this.getJqfxCountCallBack,this,false);
        }
        if(val=='dept'){
          this.http.get("/tjfx/getJqfxCountForDept",param,this.getJqfxCountCallBack,this,false);
        }
        if(val=='jqlb'){
          this.http.get("/tjfx/getJqfxCountForJqlb",param,this.getJqfxCountCallBack,this,false);
        }
        this.searchtype = val;
      },
      getJqfxCountCallBack(result){
         this.chartTitle = this.date+"警情统计图";
         var list = result.list;
         if(this.charttype == '1'||this.charttype == '2'){
           this.zxtchart = this.echarts.init(this.$refs.jqfxzxt);
           this.createJqfxzxt(list);
         }
         if(this.charttype == '3'){
           this.bztchart = this.echarts.init(this.$refs.jqfxbzt);
           this.createJqfxbzt(list);
         }
         if(this.charttype == '4'){
           this.ldtchart = this.echarts.init(this.$refs.jqfxldt);
           this.createJqfxldt(list);
         }
      },
      createJqfxzxt(list){//折线、柱状图
        var labelList = [];
        var countList = [];
        for(var i=0;i<list.length;i++){
          labelList.push(list[i].name);
          countList.push(list[i].count);
        }
        var option = {
            title : {
                text: this.chartTitle,       //大标题
                textStyle:{color:'white'},
                x:'center'                 //标题位置   居中
            },
            legend: {
                data:['警情数'],
                textStyle:{
                  color:'#fff'
                },
                x:'right'
            },
            color: ['#6442f3','#ff0000'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '10',
                right: '10',
                bottom: '0',
                top:'30',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: labelList,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel:{
                      color:'#fff',
                      interval:0,
                      rotate:40
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位:起',
                    nameTextStyle:{
                      color:'#fff'
                    },
                    axisLabel:{
                      color:'#fff'
                    }
                }
            ],
            series: [
                {
                  name: '警情数',
                  type: this.chart,
                  // barWidth: '50%',
                  smooth: true,
                  itemStyle: {
                            color: new this.echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#69FDB9'},
                                    {offset: 1, color: '#F8CA27'}
                                ]
                            )
                        },
                  data: countList
                }
            ]
        };
        this.zxtchart.setOption(option);

      },
      createJqfxldt(list){//雷达图
        var labelList=[];
        var dataList=[];
        for(var i=0;i<list.length;i++){
            labelList.push({text:list[i].name});
            dataList.push(list[i].count);
        }
        var option = {
            title : {
                text: this.chartTitle,       //大标题
                // subtext: '纯属虚构',                //类似于副标题
                textStyle:{color:'white'},
                x:'center'                 //标题位置   居中
            },
            tooltip: {
            },
            radar: [
                {
                    indicator: labelList,
                    center: ['50%', '50%'],
                    radius: '75%',
                    startAngle: 90,
                    splitNumber: 8,
                    shape: 'circle',
                    name: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#18f5f7'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(41,56,87, 0.4)'],
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 9
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(10,158,166,0.6)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(10,158,166,0.6)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '雷达图',
                    type: 'radar',
                    emphasis: {
                        lineStyle: {
                            width: 4
                        }
                    },
                    data: [
                        {
                            value: dataList,
                            name: '派出所警情统计',
                            areaStyle: {
                                color: 'rgba(24,245,247, 0.5)'
                            },
                            lineStyle:{
                                color: 'rgba(24,245,247, 0.5)'
                            },
                        }
                    ]
                }
            ]
        };
        this.ldtchart.setOption(option);
     },
     createJqfxbzt(list){//饼状图
        var legendList = [];
        var datalist = [];
         for(var i=0;i<list.length;i++){
            legendList.push(list[i].name);
            var obj = {};
            obj.name = list[i].name;
            obj.value = list[i].count;
            datalist.push(obj);
        }
        var option = {
            // color: ['#6699ff', 'green','#ffff33','#6633ff', '#ffcc66','#ff0000','#00ff66','#3366ff','#993333','#ffcc00','#33cccc','#666ff','red','#6442f3','#ff0000'],
            color: function() {
                return 'rgb(' + [
                        Math.round(Math.random() * 255),
                        Math.round(Math.random() * 255),
                        Math.round(Math.random() * 255)
                        ].join(',') + ')';
            },
            title : {
                text: this.chartTitle,       //大标题
                textStyle:{color:'white'},
                x:'center'                 //标题位置   居中
            },
            tooltip : {
                trigger: 'item',           //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
                formatter: "{a} <br/>{b} : {c} ({d}%)"   //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）用于鼠标悬浮时对应的显示格式和内容
            },
            legend: {                           //图例组件。
                orient: 'vertical',             //图例列表的布局朝向
                left: '20px',
                textStyle:{color:'white',fontSize:'20',},
                data: legendList,
            },
            series : [              //系列列表。每个系列通过 type 决定自己的图表类型
                {
                    name: '警情数量',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '50%'],
                    data: datalist,
                    label:{fontSize:'20'},
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                    }
                }
            ]
        };
        this.bztchart.setOption(option);
     },
  },
  created(){
    //获取警情类别
     this.http.get("/ssjq/getSsjqLb",null,this.getSsjqLbCallBack,this,false);
  },
  mounted(){
  },
  watch : {
      currentDept:function(val) {
        this.deptcode = val.deptcode;
        this.searchCount(this.searchtype);
      },
  }
}
</script>

<style scoped>
.jqfxChartPanel{
  height: 100%;
  width: 100%;
}
.leftPanel{
  width:25%;
  height:100%;
  float: left;
  border-right: 1px solid #2d8cf0;
  overflow: hidden;
}
.rightPanel{
  width:75%;
  height:100%;
  float: left;
  overflow: hidden;
}
.rightTopPanel{
  width:100%;
  height:95%;
  border-bottom: 1px solid #2d8cf0;
  overflow: hidden;
}
.rightBottomPanel{
  width:100%;
  height:30%;
  display: flex;
  overflow: hidden;
}
.modal-div{
  margin: 0 0 20px 0;
}
.modal-div span{
  float: left;
  width: 85px;
  font-size: 14px;
  text-align: right;
  margin-right: 0px;
  color: #409eff;
  padding-top: 5px;
}
.inputclass{
  width:180px;
  height: 28px;
  outline: none;
  color: #b6f6ff;
  padding: 0 10px;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.chartTitle{
  color: #d8d8d8;
  height: 10%;
  width: 100%;
}
.chart{
  height: 100%;
  width: 100%;
}
select {
  height:28px;
  color: #b6f6ff;
  border: 1px solid #b6f6ff;
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
  height:28px;
  border: 1px solid #b6f6ff;
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

</style>

