<template>
  <div class="screenallpanel">
      <div ref="mapchart" style="width:100%;height:100%;"></div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: 'Screen2',
  components:{},
  data () {
    return {
        mapchart:null
    }
  },
  computed:mapState({
  }),
  methods:{
    getOption(){
      var option={
              geo: {//
                map: 'haiyan',
                // left:'10',
                label: {
                    emphasis: {
                       show: true,
                       color:"#fff"
                    },
                    normal:{
                      show:true,
                      
                    }
                },
                roam: true,
                zoom: 1.2,
                itemStyle: {
                    normal: {
                        borderColor: '#387ba7',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetX: 10,
                    },
                    emphasis: {
                        areaColor: '#575B68',
                    }
                },
                regions: [//对不同的区块进行着色
                    {
                        name: '西塘桥街道',
                        label:{show:true},
                        itemStyle: {
                            normal: {
                                areaColor: '#003782'
                            }
                        }
                    },
                    {
                        name: '望海街道',
                        label:{show:true},
                        itemStyle: {
                            normal: {
                                areaColor: '#004ea9'
                            }
                        }
                    },
                    {
                        name: '武原街道',
                        label:{show:true},
                        itemStyle: {
                            normal: {
                                areaColor: '#0060c6'
                            }
                        }
                    },
                    {
                        name: '沈荡镇',
                        label:{show:true},
                        itemStyle: {
                            normal: {
                                areaColor: '#0060c6'
                            }
                        }
                    },
                    {
                        name: '于城镇',
                        label:{show:true},
                        itemStyle: {
                            normal: {
                                areaColor: '#003782'
                            }
                        }
                    },
                    {
                        name: '百步镇',
                        label:{show:true},
                        itemStyle: {
                            normal: {
                                areaColor: '#004ea9'
                            }
                        }
                    },
                    {
                        name: '通元镇',
                        label:{show:true},
                        itemStyle: {
                            normal: {
                                areaColor: '#0060c6'
                            }
                        }
                    },
                    {
                        name: '秦山街道',
                        label:{show:true},
                        itemStyle: {
                            normal: {
                                areaColor: '#003782'
                            }
                        }
                    },
                    {
                        name: '澉浦镇',
                        label:{show:true},
                        itemStyle: {
                            normal: {
                                areaColor: '#004ea9'
                            }
                        }
                    }
                ]
              },
      };
      return option;
    },
    clickMap(data){
      alert(data.name);
    }
  },
  mounted(){
    var that = this;
      
      $.get(Constants.project+'/static/assets/map/haiyan.json', function (json) {
          that.echarts.registerMap('haiyan', json);
          that.mapchart = that.echarts.init(that.$refs.mapchart);
          that.mapchart.on("click", that.clickMap);
          var option = that.getOption();
          that.mapchart.setOption(option);
      });
  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.screenallpanel{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
