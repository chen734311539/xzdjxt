<template>
  <div class="zhongdianbuweiPanel">
        <div class="titleDiv"><span>重点人员</span></div>
        <div class="contentDiv flexr">
          <div style="width:30%;height:100%;" class="flexc">
              <!-- <div class="tudiv zhuyaojingdian" @click="clickImg(1)">
                  <img v-show="current==1" src="@/assets/datascreen/qidong/zdbw/重点单位分布-1.png" style="width:100%;height:100%;"/>
                  <img v-show="current==1" class="xiaotu" src="@/assets/datascreen/qidong/zdbw/景点-1.png" style="width:35px;height:33px;"/>
                  <div v-show="current==1" class="tutext">主要景点</div>

                  <img v-show="current!=1" src="@/assets/datascreen/qidong/zdbw/重点单位分布-2.png" style="width:100%;height:100%;"/>
                  <img v-show="current!=1" class="xiaotu" src="@/assets/datascreen/qidong/zdbw/景点-2.png" style="width:35px;height:33px;"/>
                  <div v-show="current!=1" class="tutext" style="color:#2bb8f0;">主要景点</div>
              </div>
              <div class="tudiv zhengfuzhudi" @click="clickImg(2)">
                  <img v-show="current==2" src="@/assets/datascreen/qidong/zdbw/重点单位分布-1.png" style="width:100%;height:100%;"/>
                  <img v-show="current==2" class="xiaotu" src="@/assets/datascreen/qidong/zdbw/事业单位-1.png" style="width:35px;height:33px;"/>
                  <div v-show="current==2" class="tutext">政府驻地</div>

                  <img v-show="current!=2" src="@/assets/datascreen/qidong/zdbw/重点单位分布-2.png" style="width:100%;height:100%;"/>
                  <img v-show="current!=2" class="xiaotu" src="@/assets/datascreen/qidong/zdbw/事业单位-2.png" style="width:35px;height:33px;"/>
                  <div v-show="current!=2" class="tutext" style="color:#2bb8f0;">政府驻地</div>
              </div>
              <div class="tudiv jiaotongshuniu" @click="clickImg(3)">
                  <img v-show="current==3" src="@/assets/datascreen/qidong/zdbw/重点单位分布-1.png" style="width:100%;height:100%;"/>
                  <img v-show="current==3" class="xiaotu" src="@/assets/datascreen/qidong/zdbw/大巴-1.png" style="width:35px;height:33px;"/>
                  <div v-show="current==3" class="tutext">交通枢纽</div>

                  <img v-show="current!=3" src="@/assets/datascreen/qidong/zdbw/重点单位分布-2.png" style="width:100%;height:100%;"/>
                  <img v-show="current!=3" class="xiaotu" src="@/assets/datascreen/qidong/zdbw/大巴-2.png" style="width:35px;height:33px;"/>
                  <div v-show="current!=3" class="tutext" style="color:#2bb8f0;">交通枢纽</div>
              </div>
              <div class="tudiv yiyuangaoxiao" @click="clickImg(4)">
                  <img v-show="current==4" src="@/assets/datascreen/qidong/zdbw/重点单位分布-1.png" style="width:100%;height:100%;"/>
                  <img v-show="current==4" class="xiaotu" src="@/assets/datascreen/qidong/zdbw/铁路-1.png" style="width:35px;height:33px;"/>
                  <div v-show="current==4" class="tutext">医院高校</div>

                  <img v-show="current!=4" src="@/assets/datascreen/qidong/zdbw/重点单位分布-2.png" style="width:100%;height:100%;"/>
                  <img v-show="current!=4" class="xiaotu" src="@/assets/datascreen/qidong/zdbw/铁路-2.png" style="width:35px;height:33px;"/>
                  <div v-show="current!=4" class="tutext"  style="color:#2bb8f0;">医院高校</div>
              </div>
              <div class="jiantou">
                  <img src="@/assets/datascreen/qidong/zdbw/jiantou.png" style="width:43px;height:26px;"/>
              </div> -->
             <div style="color:white;margin-bottom:10px;">社区矫正人员<span style="color:yellow;">3人</span></div>
             <div style="color:white;margin-bottom:10px;">违法犯罪前科人员<span style="color:yellow;">170</span>人</div>
             <div style="color:white;margin-bottom:10px;">一般涉稳人员<span style="color:yellow;">11</span>人</div>
             <div style="color:white;margin-bottom:10px;">重点涉稳人员<span style="color:yellow;">15</span>人</div>
             <div style="color:white;margin-bottom:10px;">一般精神病人<span style="color:yellow;">4</span>人</div>
             <div style="color:white;margin-bottom:10px;">肇事肇祸精神病人<span style="color:yellow;">9</span>人</div>
          </div>
          <div ref="mapchart" style="width:70%;height:100%;"></div>
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
        var legendList = ['社区矫正人员','违法犯罪前科人员','一般涉稳人员','重点涉稳人员','一般精神病人','肇事肇祸精神病人'];
        // for(var i = 0;i<data.length;i++){
        //   data[i].value = data[i].count;
        //   legendList.push(data[i].name);
        // }
        var obj = {value:3};
        var data=[{name:"社区矫正人员",value:3},{name:"违法犯罪前科人员",value:170},{name:"一般涉稳人员",value:11},{name:"重点涉稳人员",value:15},{name:"一般精神病人",value:4},{name:"肇事肇祸精神病人",value:9}];
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
                  name:'重点人员类别统计',
                  type:'pie',
                  radius: '90%',
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
