<template>
  <div class="panel">
      <div class="mapImgDiv panelkuang">
        <MapHeat mapid="heatMap"/>
        <div class="mapButtonPanel">
          <MapButton name="实时警情" icon="iconUI_icon_jingqing"/>
          <MapButton name="实时警力" icon="iconpolice-default-01"/>
          <MapButton name="视频监控" icon="iconshipinjiankong"/>
        </div>
      </div>
     <div class="id1 panelkuang">
       <div style="height:100%;">
         <div style="height:22px;">
            <span class="activity-title" style=" margin-right:15px;border-bottom: 1px solid rgb(52, 184, 214);">近期活动</span>
            <span style="font-size: 15px;">|</span>
            <span class="activity-title" style=" margin-left:15px;">近期任务</span>
         </div>
         <div style="padding:10px;height:calc(100% - 22px);">
           <el-scrollbar>
           <div style="clear: both;margin-bottom:10px;height:50px;">
              <div class="activityTimeDiv">
                <div style="color:#fff;font-size:12px;margin-bottom:3px;">星期五</div>
                <div style="color:#fff;font-size:16px;">12-6</div>
              </div>
              <div class="activityNameDiv">XXXXXXX活动</div>
           </div>
           <div style="clear: both;margin-bottom:10px;height:50px;">
              <div class="activityTimeDiv" style="background:green;border:1px solid rgb(18, 236, 116);">
                <div style="color:#fff;font-size:12px;margin-bottom:3px;">3天后</div>
                <div style="color:#fff;font-size:16px;">12-12</div>
              </div>
              <div class="activityNameDiv">XXXXXXX活动</div>
           </div>
           <div style="clear: both;height:50px;margin-bottom:10px;">
              <div class="activityTimeDiv" style="background:green;border:1px solid rgb(18, 236, 116);">
                <div style="color:#fff;font-size:12px;margin-bottom:3px;">5天后</div>
                <div style="color:#fff;font-size:16px;">12-14</div>
              </div>
              <div class="activityNameDiv">XXXXXXX活动</div>
           </div>
           <div style="clear: both;height:50px;margin-bottom:10px;">
              <div class="activityTimeDiv" style="background:green;border:1px solid rgb(18, 236, 116);">
                <div style="color:#fff;font-size:12px;margin-bottom:3px;">7天后</div>
                <div style="color:#fff;font-size:16px;">12-16</div>
              </div>
              <div class="activityNameDiv">XXXXXXX活动</div>
           </div>
           </el-scrollbar>
         </div>
       </div>
     </div>
     <div class="id11 panelkuang">
       <div class="title">值班警力</div>
       <div style="width:100%;height:calc(100% - 35px);" id="id11"></div>
     </div>
     <div class="id2 panelkuang">
       <div class="title">24小时警情</div>
       <div style="width:100%;height:calc(100% - 35px);" id="id22"></div>
     </div>
     <div class="id3 panelkuang" style="padding:20px;">
        <div style="height:100%;">
        <div class="zbbqtitle" style="height:22px;">
          <span style="color:#fff;font-size:15px;">共182人</span>
          <span style="color:#fff;font-size:15px;">值班备勤</span>
        </div>
        <div style="height:calc(100% - 22px);">
           <el-scrollbar>
        <div>
          <span class="zhicheng">市局领导</span><span class="zhicheng" style="color:#fff;">某某某</span>
        </div>
        <div>
          <span class="zhicheng" style="padding-right:33px;">值班长</span><span class="zhicheng" style="color:#fff;">某某某</span>
        </div>
        <div>
          <span class="zhicheng" style="padding-right:33px;">指挥员</span><span class="zhicheng" style="color:#fff;">某某某</span>
        </div>
        <div>
          <span class="zhicheng">在岗警力</span><span class="zhicheng" style="color:#fff;">122</span>
        </div>
        <div>
          <span class="zhicheng">值班警力</span><span class="zhicheng" style="color:#fff;">20</span>
        </div>
        <div>
          <span class="zhicheng">巡逻警力</span><span class="zhicheng" style="color:#fff;">20</span>
        </div>
        <div>
          <span class="zhicheng">备勤警力</span><span class="zhicheng" style="color:#fff;">20</span>
        </div>
         </el-scrollbar>
        </div>
        </div>
     </div>
     <div class="id33 panelkuang">
       <div class="title">巡逻警力</div>
       <div style="width:100%;height:calc(100% - 35px);" id="id33"></div>
     </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'

import MapHeat from '@/components/map/MapHeat'
import MapButton from '@/components/datascreen/example/MapButton'
export default {
  name: 'Example2',
  components:{MapHeat,MapButton},
  data () {
    return {
      id11Chart:null,
      id22Chart:null,
      id33Chart:null
    }
  },
  computed:mapState({
  }),
  methods:{
    getdate(num) { 
    var date1 = new Date();
    //今天时间
    //var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
    //console.log(time1);
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + num);
     //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    //  var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate(); 
    var time2 = (date2.getMonth() + 1) + "-" + date2.getDate(); 
    return time2;
    },
    createid11(){
      var a = this.echarts.init(document.getElementById("id11"));
      this.id11Chart = a;
        var xAxisArray = [];
        var seriesArray = [];
        
				var xAxisObj = {};
				xAxisObj.value = "惠龙镇";
				xAxisArray.push(xAxisObj);
        var seriesObj = {};
        seriesObj.data = [];
				seriesObj.name ="警车";
				seriesObj.type = 'bar';
				seriesObj.stack = 'c';
				seriesObj.data.push(3);
        seriesArray.push(seriesObj);
        var seriesObj2 = {};
        seriesObj2.data = [];
				seriesObj2.name ="对讲机";
				seriesObj2.type = 'bar';
				seriesObj2.stack = 'c';
				seriesObj2.data.push(2);
        seriesArray.push(seriesObj2);
        
        var xAxisObj = {};
				xAxisObj.value = "城西";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="城西";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(3);
        seriesObj2.data.push(1);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "开发区";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="开发区";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(7);
        seriesObj2.data.push(0);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "北新";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="北新";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(4);
        seriesObj2.data.push(1);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "启隆";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="启隆";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(6);
        seriesObj2.data.push(4);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "惠萍";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="惠萍";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(7);
        seriesObj2.data.push(5);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "东海";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="东海";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(7);
        seriesObj2.data.push(1);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "海复";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="海复";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(4);
        seriesObj2.data.push(3);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "近海";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="近海";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(5);
        seriesObj2.data.push(4);
				// seriesArray.push(seriesObj);
			

        var option = {
				tooltip: {
					trigger: 'axis',
					backgroundColor: '#23363c',
					borderColor: '#23363c',
					axisPointer: {            // 坐标轴指示器，坐标轴触发有效
						type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					show: false,
					data: ['直接访问', '邮件营销']
				},
				grid: {
					left: 0,
					right: 0,
					top: 5,
					bottom: 0,
					height: 'auto',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						axisLabel: {
							show: true,
							textStyle: {
								color: '#fff',
								fontSize: '12'
							}
						},
						data: xAxisArray,
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						//name: '水量/ml',
						// min: 0,
						// max: 7,
						// interval: 1,
						axisLabel: {
							//formatter: '{value} ',
							textStyle: {
								color: '#fff',
								fontWeight: 'normal',
								fontSize: '12'
							}
						},
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}
					},
				],
				series: seriesArray
			};
      a.setOption(option);
    },
    createid33(){
      var a = this.echarts.init(document.getElementById("id33"));
      this.id33Chart = a;
        var xAxisArray = [];
        var seriesArray = [];
        
				var xAxisObj = {};
				xAxisObj.value = "惠龙镇";
				xAxisArray.push(xAxisObj);
        var seriesObj = {};
        seriesObj.data = [];
				seriesObj.name ="警车";
				seriesObj.type = 'bar';
				seriesObj.stack = 'c';
				seriesObj.data.push(3);
        seriesArray.push(seriesObj);
        var seriesObj2 = {};
        seriesObj2.data = [];
				seriesObj2.name ="对讲机";
				seriesObj2.type = 'bar';
				seriesObj2.stack = 'c';
				seriesObj2.data.push(2);
        seriesArray.push(seriesObj2);
        
        var xAxisObj = {};
				xAxisObj.value = "城西";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="城西";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(3);
        seriesObj2.data.push(1);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "开发区";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="开发区";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(7);
        seriesObj2.data.push(0);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "北新";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="北新";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(4);
        seriesObj2.data.push(1);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "启隆";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="启隆";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(6);
        seriesObj2.data.push(4);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "惠萍";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="惠萍";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(7);
        seriesObj2.data.push(5);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "东海";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="东海";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(7);
        seriesObj2.data.push(1);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "海复";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="海复";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(4);
        seriesObj2.data.push(3);
        // seriesArray.push(seriesObj);
        
        var xAxisObj = {};
				xAxisObj.value = "近海";
				xAxisArray.push(xAxisObj);
				// var seriesObj = {};
				// seriesObj.name ="近海";
				// seriesObj.type = 'bar';
				// seriesObj.stack = 'c';
				// seriesObj.data = [];
        seriesObj.data.push(5);
        seriesObj2.data.push(4);
				// seriesArray.push(seriesObj);
			

        var option = {
				tooltip: {
					trigger: 'axis',
					backgroundColor: '#23363c',
					borderColor: '#23363c',
					axisPointer: {            // 坐标轴指示器，坐标轴触发有效
						type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					show: false,
					data: ['直接访问', '邮件营销']
				},
				grid: {
					left: 0,
					right: 0,
					top: 5,
					bottom: 0,
					height: 'auto',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						axisLabel: {
							show: true,
							textStyle: {
								color: '#fff',
								fontSize: '12'
							}
						},
						data: xAxisArray,
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						//name: '水量/ml',
						// min: 0,
						// max: 7,
						// interval: 1,
						axisLabel: {
							//formatter: '{value} ',
							textStyle: {
								color: '#fff',
								fontWeight: 'normal',
								fontSize: '12'
							}
						},
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}
					},
				],
				series: seriesArray
			};
      a.setOption(option);
    },
    createid22(){
      var a = this.echarts.init(document.getElementById("id22"));
      this.id22Chart = a;
	    a.setOption(
		{
			title: {
				text: ''
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				data:[]
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '5%',
				top:'4%',
				containLabel: true
			},
			xAxis :
			{
				type : 'category',
				boundaryGap : false,
				data : this.getLatestDays(24),
				axisLabel:{
					textStyle:{
						color:"white", //刻度颜色
						fontSize:8  //刻度大小
					},
					rotate:45,
					interval:2
				},
				axisTick:{show:false},
				axisLine:{
					show:true,
					lineStyle:{
						color: '#0B3148',
						width: 1,
						type: 'solid'
					}
				}
			},
			yAxis : 
			{
				type : 'value',
				axisTick:{show:false},
				axisLabel:{
					textStyle:{
						color:"white", //刻度颜色
						fontSize:8  //刻度大小
						}
				},
				axisLine:{
					show:true,
					lineStyle:{
						color: '#0B3148',
						width: 1,
						type: 'solid'
					}
				},
				splitLine:{
					show:false
				}
			},
			tooltip:{
				formatter:'{c}',
				backgroundColor:'#FE8501'
			},
			series : [
				{
					name:'',
					type:'line',
					smooth:true,
					areaStyle:{
						normal:{
              // color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#026B6F'}, {offset: 1, color: '#012138' }], false),
              color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                      offset: 0, color: '#026B6F' // 0% 处的颜色
                  }, {
                      offset: 1, color: '#012138' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
              },
							opacity:0.4
						}
					},
					itemStyle : {  
                            normal : {  
                                  color:'#009991'
                            },
							lineStyle:{
								normal:{
								color:'#009895',
								opacity:1
							}
						}
                    },
					symbol:'none',
					data:[4, 6, 8, 11, 4, 6, 7,1,3,6,7,8,12,11,6,8,5,7,9,1,4,7,4,9]
				}
			]
		}
	
	);
     
    },
    getLatestDays(num){
      var returnDays = [];
      for (var i = 0 ; i < num ; i++)
      {
        returnDays.push(i);
      }
      return returnDays;
    }
  },
  mounted(){
    this.createid11();
    this.chartList.push(this.id11Chart);
    this.createid33();
    this.chartList.push(this.id33Chart);
    this.createid22();
    this.chartList.push(this.id22Chart);
  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.panel{
  position: relative;
  width: 100%;
  height: 100%;
}



.hearmap{
  width: 100%;
  height:calc(100% - 35px);
  opacity: 0.6;
  z-index:4;
  user-select:none;
  padding:10px;
  
}
.panelkuang{
  z-index: 5;
  border: 1px solid rgba(100,162,255,.2);
  box-sizing:border-box;
  background: rgba(0, 0, 0,0.2);
  user-select:none;
  padding:10px;
}
.panelkuang:after,.panelkuang:before{position:absolute;content:"";width:20px;height:30px}
.panelkuang:before{border-left:1px solid #0258f0;border-top:1px solid #0258f0;left:-1px;top:-1px}
.panelkuang:after{border-right:1px solid #0258f0;border-bottom:1px solid #0258f0;right:-1px;bottom:-1px}
.title{
  height:35px;
  font-size:18px;
  line-height:35px;
  width:100%;
  color:#fff;
  font-weight:600;
  padding-left:15px;
  position:relative;
  box-sizing:border-box;
  font-family:"微软雅黑";
}
.mapImgDiv{
  position:absolute;
  z-index: 5;
  width: 60%;
  height: 70%;
  top:5%;
  left:20%;
  padding: 2px !important;
}
.mapButtonPanel{
  position:absolute;
  z-index: 6;
  bottom: 0px;
  height: 50px;
  width: 100%;
  background: rgba(0,0,0,.6);
}
.id1{
  position:absolute;
  top:5%;
  left:2%;
  height:40%;
  width: 17.5%;
  padding:10px;
}
.id11{
  position:absolute;
  top:46%;
  left:2%;
  height:50%;
  width: 17.5%;
  padding:10px;
}
.id3{
  position:absolute;
  top:5%;
  height:40%;
  right:2%;
  width: 17.5%;
  padding:10px;
}
.id33{
  position:absolute;
  top:46%;
  height:50%;
  right:2%;
  width: 17.5%;
  padding:10px;
}
.id2{
  position:absolute;
  top:76%;
  height:20%;
  width: 60%;
  left: 20%;
  padding:10px;
}
.activity-title{
  font-size: 15px;
  color: rgb(52, 184, 214);
  cursor: pointer;
  user-select: none;
  padding: 3px 2px;
}
.activityTimeDiv{
  height: 50px;
  width:70px;
  background: blue;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  border:1px solid rgb(6, 88, 219);
  
  float: left;
}
.activityNameDiv{
  float:left;
  color: #fff;
  font-size: 15px;
  margin-left: 15px;
  margin-top: 14px;
}
.zbbqtitle{
  display:flex;
  align-items: center;
  justify-content:space-between;
}
.zhicheng{
  height:35px;
  font-size:18px;
  line-height:35px;
  width:100%;
  color:rgb(35,194,255);
  font-weight:600;
  padding-right:15px;
  position:relative;
  box-sizing:border-box;
  font-family:"微软雅黑";
}
</style>
