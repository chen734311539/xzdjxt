<template>
  <div class="zhongdianbuweiPanel">
        <div class="titleDiv"><span>重点部位</span></div>
        <div class="contentDiv flexr">
          <div style="width:40%;height:100%;">
              <div class="tudiv zhuyaojingdian" @click="clickImg(1)">
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
              </div>
          </div>
          <div ref="mapchart" style="width:60%;height:100%;"></div>
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
            "name": "嘉兴市第一医院",
            "value": [120.7383, 30.7385, 2]},
            {
            "name": "海盐县人民医院",
            "value": [120.9161, 30.5149, 2]}
      ],
      zfzdList:[
          {
            "name": "嘉兴市政府",
            "value": [120.7514, 30.7485, 2]},
            {
            "name": "海盐县政府",
            "value": [120.9432, 30.529, 2]}
      ],
      zyjdList:[
          {
            "name": "南北湖风景区",
            "value": [120.855, 30.3869, 2]}
      ],
      jtslList:[
          {
              "name": "嘉兴站",
              "value": [120.7589, 30.7662, 2]
          },
          {
              "name": "海盐客运中心",
              "value": [120.907, 30.5167, 2]
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
        var nowDate = null;
        var image = null;
        if(this.current==3){
            nowDate = this.jtslList;
            image = require("@/assets/datascreen/qidong/zdbw/大巴-1.png");
        }else if(this.current==1){
            nowDate = this.zyjdList;
            image = require("@/assets/datascreen/qidong/zdbw/景点-1.png");
        }else if(this.current==2){
            nowDate = this.zfzdList;
            image = require("@/assets/datascreen/qidong/zdbw/事业单位-1.png");
        }else if(this.current==4){
            nowDate = this.yygxList;
            image = require("@/assets/datascreen/qidong/zdbw/事业单位-1.png");
        }
        var option={
              geo: {//
                map: 'nantong',
                // left:'10',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                zoom: 1,
                itemStyle: {
                    normal: {
                        borderColor: '#387ba7',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetX: 10
                    },
                    emphasis: {
                        areaColor: '#b3f3f3'
                    }
                },
                regions: [//对不同的区块进行着色
                    {
                        name: '海盐县',
                        // label:{show:true},
                        itemStyle: {
                            normal: {
                                areaColor: '#2b97df'
                            }
                        }
                    }
                ]
              },
              series: [
              //   {
              //     type: 'map',
              //     map: 'nantong',
              //     itemStyle:{
              //       normal:{label:{show:true}},
              //       emphasis:{label:{show:true}}
              //     },
              //     data:[{name: '启东市', value: 1}]
              // },
              {
                    name: "冷链运输车分布",
                    type: 'custom',//配置显示方式为用户自定义
                    coordinateSystem: 'geo',
                    itemStyle: {
                        normal: {
                            color: '#46bee9'
                        }
                    },
                    renderItem: function (params, api) {//具体实现自定义图标的方法
                        return {
                            type: 'image',
                            style: {
                                image: image,
                                width:20,
                                height:20,
                                x: api.coord([
                                    nowDate[params.dataIndex].value[0], nowDate[params.dataIndex]
                                        .value[1]
                                ])[0],
                                y: api.coord([
                                    nowDate[params.dataIndex].value[0], nowDate[params.dataIndex]
                                        .value[1]
                                ])[1]
                            }
                        }
                    },
                    data: nowDate
                },
                {
                    name: "冷链运输车分布2",
                    type: 'custom',//配置显示方式为用户自定义
                    coordinateSystem: 'geo',
                    itemStyle: {
                        normal: {
                            color: '#46bee9'
                        }
                    },
                    renderItem: function (params, api) {//具体实现自定义图标的方法
                        return {
                            type: 'text',
                            position:[20,5],
                            style: {
                                text: nowDate[params.dataIndex].name,
                      
                                x: api.coord([
                                    nowDate[params.dataIndex].value[0], nowDate[params.dataIndex]
                                        .value[1]
                                ])[0],
                                y: api.coord([
                                    nowDate[params.dataIndex].value[0], nowDate[params.dataIndex]
                                        .value[1]
                                ])[1]
                            }
                        }
                    },
                    data: nowDate
                }
              ]
          };
          return option;
    },
    createMapchart(){
      var that = this;
      var nowData
      $.get(Constants.project+'/static/assets/map/330400.json', function (nantongJson) {
          that.echarts.registerMap('nantong', nantongJson);
          that.mapchart = that.echarts.init(that.$refs.mapchart);
          var option = that.getOption();
          that.mapchart.setOption(option);
      });
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
