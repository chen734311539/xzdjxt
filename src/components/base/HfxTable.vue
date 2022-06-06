<template>
<!-- 
    HfxTable 3.0 
    功能:
        1.标题栏高度 titleheight 默认 50px
        2.行高高度 rowheight 默认34px
        3.条纹 stripe 默认显示 
        4.单选 radio @on-radio返回选中行的数据
        5.自定义单元格 slot 配合 columns 中的 slot属性使用  
            <template #caozuo="{row,index}">  #caozuo 等同与 v-slot:caozuo
                    <div class="tablebutton">
                      <HfxButton @click="register(index)" name="登记" />
                      <HfxButton @click="showJqInfo(index)" name="详情" />
                    </div>
            </template>
        6.自定义无数据时显示的内容 no-data-text 默认为 暂无数据
 -->
    <div class="hfxtablepanel" ref="hfxtable">
        <div class="tableheader">
        <!-- header 单选部分 -->
            <div  
                class="header radio"  v-if="radio" v-show="radio"
                :style="{height:titleheight+'px',lineHeight:titleheight+'px'}"
            >
                <span>选择</span>
            </div>
        <!-- header 部分 数据给了宽度的按给的宽度单位为% 否则为autowidth即平均宽度  -->
            <div v-for="item in columns" :key="item.title"
                class="header"
                :style="{'width':(item.width?item.width+'%':autowidth+'%'),height:titleheight+'px',lineHeight:titleheight+'px'}"
            >
            <span>{{item.title}}</span>
           </div>
        </div>
        <div class="tablebody" v-show="this.data.length" :style="{height:tablebodyHeight+'px'}">
            <!-- 行 -->
             <div class="table_tr" v-for="(dataObj,index) in data" :key="dataObj[columns.key]" :style="{height:rowheight+'px',lineHeight:rowheight+'px'}" @click="clickRadio(index)" >
                <!-- 行 单选部分 -->
                <div  
                    class="table_td radio" v-if="radio" v-show="radio"
                    :class="[stripe&&index%2==0?'':'bgClass',index==checkindex?'checkedbgClass':'']"
                >
                    <div class="checkedIcon" v-show="index==checkindex"></div>
                    <div class="notcheckedIcon"  v-show="!(index==checkindex)"></div>
                </div>
                <!-- 列 数据给了宽度的按给的宽度单位为% 否则为autowidth即平均宽度 是否显示条纹 -->
                <div v-for="item in columns" :key="item.title"
                    class="table_td text_ellipsis"
                    :style="{'width':(item.width?item.width+'%':autowidth+'%')}"
                    :class="[stripe&&index%2==0?'':'bgClass',index==checkindex?'checkedbgClass':'']"
                >
                <!-- 单元格 内容部分 -->
                <!-- 没有模板显示普通字段内容 -->
                <span v-if="!item.slot" :title="dataObj[item.key]">{{dataObj[item.key]}}</span>
                <!-- 如果有模板加载模板,数据为index和当前行数据 -->
                <slot v-if="item.slot"  :name="item.slot" :index="index" :row="dataObj">        
                </slot>
                </div>
            </div>
        </div> 
        <!-- 无数据的时候显示的内容 -->
        <div class="nodataclass table_tr" :style="{height:rowheight*2+'px',lineHeight:rowheight*2+'px'}" v-show="!this.data.length">
            <span>{{noDataText}}</span>
        </div> 
    </div> 
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'HfxTable',
  props:{
      //数据   
      data:{
          type:Array,
          default:() => {
                            return []
                        }
      },
      //列设置
      columns:{
          type:Array,
          default:() => {
                            return []
                        }
      },
      //标题栏高度默认50
      titleheight:{
          type:Number,
          default:40
      },
       //行高高度默认34
      rowheight:{
          type:Number,
          default:34
      },
      //是否显示条纹默认显示
      stripe:{
          type:Boolean,
          default:true
      },
      //是否显示单选按钮 默认不显示  显示 占5%宽度 点击整行回调on-radio,返回这一行的数据
      radio:{
          type:Boolean,
          default:false
      },
      noDataText:{
          type:String,
          default:"暂无数据"
      },
  },
  data () {
    return { 
        tablebodyHeight:null,//控制表格body的高度适应overlow:auto;
        checkindex:null,
    }
  },
  computed: { 
      //未设置width的话就为平均宽度   
      autowidth:function(){
          if(this.columns.length){
              return 100/this.columns.length;
          }else{
              return 100;
          }
      }
  },
  methods:{
       clickRadio(index){
        if(this.radio){
          this.checkindex=index;
          this.$emit("on-radio",this.data[index]);
        } 
      },
  },
  created(){
    
  },
  mounted(){
      //计算表格的高度为总体100%减去标题栏的高度来实现overlow:auto;
      this.tablebodyHeight=this.$refs.hfxtable.offsetHeight-this.titleheight;
  },
  watch:{//数据更新去除选中行
      data:function(){
          this.checkindex=null;
      },
  },
}
</script>
<style scoped>
.hfxtablepanel{
    height: 100%;
    width: 100%;
    color: #b6f6ff;
    /* overflow: auto; */
}
.tableheader{
    width: 100%;
    display: inline-flex;
    justify-content: center;
    text-align: center;
}
.header{
    width: 50px;
    border-top: 1px solid #b6f6ff;
    background-color: #08385a;
}
.table_tr{
     width: 100%;
    display: inline-flex;
    justify-content: center;
    text-align: center;
}
.table_tr:hover{
    background-color: rgba(88,245,255, 0.3);
}
.table_td{
     width: 50px;
    /* border: 1px solid #b6f6ff; */
}
.nodataclass{
    width: 100%;
    border-bottom: 1px solid #b6f6ff;
    text-align: center;
    font-size: 16px;
}
.bgClass{
     background-color: rgba(88,245,255, 0.1);
}
.checkedbgClass{
    background-color: rgba(88,245,255, 0.4);
}
.tablebody{
    overflow: auto;
}
.radio{
    width: 35px;
    position: relative;
}
.checkedIcon{
    width: 12px;
    height: 12px;
    background: 
    url(../../assets/hfxtable/hfxtable_checked.png)  no-repeat;
    position: absolute;
    top: 30%;
    left: 30%;
}
.notcheckedIcon{
    width: 12px;
    height: 12px;
    background: 
    url(../../assets/hfxtable/hfxtable_notchecked.png)  no-repeat;
    position: absolute;
    top: 30%;
    left: 30%;
}
</style>
<style>
</style>