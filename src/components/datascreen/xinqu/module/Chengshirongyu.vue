<template>
  <div class="zhongdianbuweiPanel">
        <div class="titleDiv"><span>实有单位</span></div>
        <div class="contentDiv flexr">
          <div ref="mapchart" style="width:100%;height:100%;"></div>
        </div>
        
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Zhongdianbuwei',
  components:{},
  data () {
    return {
      mapchart:null,
      current:3,
      yygxList:[
          {
            "name": "南通大学启东校区",
            "value": [121.8048, 31.9082, 2]}
      ],
      zfzdList:[
          {
            "name": "启东市政府",
            "value": [121.6450, 31.798, 2]}
      ],
      zyjdList:[
          {
            "name": "黄金海滩",
            "value": [121.8481, 31.7502, 2]},
            {
            "name": "恒大海上威尼斯",
            "value": [121.8481, 31.7237, 2]}
      ],
      jtslList:[
          {
              "name": "启东站",
              "value": [121.6346, 31.8615, 2]
          },
          {
              "name": "启东汽车客运站",
              "value": [121.6562, 31.8309, 2]
          },
          {
              "name": "启东吕四汽车客运站",
              "value": [121.5865, 32.0674, 2]
          }
      ]
    }
  },
  computed:mapState({
  }),
  methods:{
    clickImg(num){
        this.current = num;
        var option = this.getOption();
        this.mapchart.setOption(option);
    },
    getOption(){
        //  this.zdjbtjchart = this.echarts.init(this.$refs.zdjbtj);
        var legendList = ['企事业单位','学校教育','医疗养老','金融行业','特种行业','娱乐服务场所','其他'];
        // for(var i = 0;i<data.length;i++){
        //   data[i].value = data[i].count;
        //   legendList.push(data[i].name);
        // }
        var obj = {value:3};
        var data=[{name:"企事业单位",value:83},{name:"学校教育",value:29},{name:"医疗养老",value:40},{name:"金融行业",value:9},{name:"特种行业",value:90},{name:"娱乐服务场所",value:128},{name:"其他",value:111}];
        var option = {
          tooltip: {
                    show: true,
                    formatter: "{a} <br/>{b} : {c}<br/>占总数{d}%",
                },
          legend: {
              orient: 'vertical',
              left:'left',
              top:'middle',
              data:legendList,
              textStyle:{
                  color:'#fff'
              }
          },
          series: [
              {
                  name:'单位统计',
                  type:'pie',
                  radius: '80%',
                  center: ['65%', '50%'],
                  avoidLabelOverlap: true,
                  label: {
                      normal: {
                          show: true,
                          position: 'inside',
                          // formatter:function(params){
                          //   return params.data.remark+"\\n数量:"+params.value;
                          // },
                          formatter:'{c}({d}%)',
                          fontSize:14,
                          color:'#fff',
                          backgroundColor:'rgba(0,0,0,0.2)',
                          borderRadius:100,
                          padding: 4 
                      }
                  },
                //   itemStyle: {
                //           normal:{
                //               color:function(params) {
                //               //自定义颜色
                //               var colorList = [          
                //                       '#334b5c', '#0B49F5', '#FFFF00', '#E98F6F', '#FF0000'
                //                   ];
                //                   return colorList[params.dataIndex]
                //                 }
                //           }
                //   },
                  data:data
              }
            ]
        };
          return option;
    },
    createMapchart(){
      var that = this;
      var nowData
    //   $.get(Constants.project+'/static/assets/map/320600.json', function (nantongJson) {
        //   that.echarts.registerMap('nantong', nantongJson);
          that.mapchart = that.echarts.init(that.$refs.mapchart);
          var option = that.getOption();
          that.mapchart.setOption(option);
          this.chartList.push(that.mapchart);
    //   });
    }
  },
  mounted(){
    this.createMapchart();

  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.zhongdianbuweiPanel{
  position: relative;
  width: 100%;
  height: 100%;
}
.titleDiv{
  height: 11.5385%;
  color: rgb(17,255,255);
  font-family: SimHei;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  user-select: none;
  margin-left: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: start;
}
.titleDiv span{
  margin-left:15px;
}
.contentDiv{
  position: relative;
  width: 100%;
  height: 88.4615%;
  padding: 10px 5px 5px 5px;
  overflow: hidden;
  user-select: none;
}
.tudiv{
    position:absolute;
    width: 64px;
    height: 56px;
    cursor: pointer;
}
.xiaotu{
    position:absolute;
    left: 15px;
    top:5px;
}
.tutext{
    position:absolute;
    left: 8px;
    bottom: 0px;
    color: #efcb2f;
    font-size: 12px;
}
.zhuyaojingdian{
    left: 10%;
    top:5%;
}
.zhengfuzhudi{
    left: 2%;
    top:36%;
}
.jiaotongshuniu{
    left:18%;
    top:36%;
}
.yiyuangaoxiao{
    left: 10%;
    top:65%;
}
.jiantou{
    position:absolute;
    top:50%;
    right: 0px;
    top: 43%;
    right: 56%;
}
</style>
