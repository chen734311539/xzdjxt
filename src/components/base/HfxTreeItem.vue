<template>
<!-- 本组件是 HfxTree 的子组件jxj-->
        <ul v-show="level==1">
          <li v-for="dataObj in datalist" :key="dataObj[uniquekey]">
            <div @click="clickDiv($event,dataObj)">
              <i v-if="dataObj.children" @click="clickIcon($event)" class="icon plus"  :style="[isExpand?'':HideStyle,plusAndminusStyle]"></i>
              <i v-if="dataObj.children" @click="clickIcon($event)" class="icon minus" :style="[isExpand?HideStyle:'',plusAndminusStyle]"></i>
              <slot name="customicon" v-if="!dataObj.children"></slot>
              <!-- h5绑定的style作用 如果有孩子不右移 如果有自定义图标不右移(图标已经右移) 无图标自己右移 -->
              <!-- 处理一下名字过长 超过15个子就省略 title显示全部 -->
              <h5  :style="dataObj.children?'':(customicon?'':noiconStyle)" :title="[dataObj[showname]]">{{dataObj[showname]!=null&&dataObj[showname].length &lt;= 15?dataObj[showname]:(dataObj[showname]==null?'':dataObj[showname].substr(0,15)+"……")}}</h5>
            </div>
              <HfxTreeItem v-if="dataObj.children" :datalist="dataObj.children" :level="level+1" :uniquekey="dataObj[uniquekey]" :showname="showname" :isExpand="isExpand" :customicon="customicon" @on-clickDiv="clickDiv" @on-clickIcon="clickIcon">
                <i v-if="customicon"  :style="iconStyle" slot="customicon" :class="customicon"></i>
              </HfxTreeItem> 
          </li>
        </ul>   			 				
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"

export default {
  name: 'HfxTreeItem',
  props:['datalist','level','showname','uniquekey','isExpand','customicon'],
  data () {
    return {
      HideStyle:{"display":"none"},
    }
  },
  computed: {
    plusAndminusStyle:function(){
      var obj = {};
      obj["margin-top"] = "8px";
      obj["margin-right"] = "6px";
      obj["margin-left"] = (20*(this.level-1)+14)+"px";
      return obj;
    },
    //空的距离
    iconStyle:function(){
      var obj = {};
      obj["margin-left"] = (20*(this.level+1)-6)+"px";
      return obj;
    },
    noiconStyle:function(){
      var obj = {};
      obj["margin-left"] = (20*(this.level+1)-6-23)+"px";
      return obj;
    },
    NeedToMoveRight:function(){
      if(data.dataObj.children){
        return false;
      }
      if(customicon){
        return false;
      }
    }
  },
  methods:{
      clickDiv(e,data){
         this.$emit('on-clickDiv',e,data);
      },
      clickIcon(e){
        this.$emit('on-clickIcon',e);
        var el = e.currentTarget;
        common.stopEvent(e);
        $(el).parent().parent().siblings("ul").toggle();
        $(el).siblings(".icon").show();
        $(el).hide();
      }
  },
  created(){
    
  }
}
</script>

<style scoped>
/**树 */
.HfxTreePanel-ul >>> h5{
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  height: 28px;
  float: left;
}
.HfxTreePanel-ul >>> li{
  list-style:none;
}
.HfxTreePanel-ul >>> div{
  background-color: rgb(137,156,255,0.1);
  margin-bottom: 2px;
  border-radius: 4px;
  width:100%;
  height: 28px;
  text-align:center;
  line-height: 28px;
  cursor: pointer;
}
.HfxTreePanel-ul >>> div.activediv{
  background-color: rgb(137,156,255,0.2);
}
.plus{
    float: left;
    width: 11px;
    height: 11px;
    background: 
    url(../../assets/tree/tree_plus.png)  no-repeat;
}
.minus{
    float: left;
    width: 11px;
    height: 11px;
    background: 
    url(../../assets/tree/tree_minus.png)  no-repeat;
}
.customiconexample{
    float: left;
    width: 11px;
    height: 11px;
    margin: 8px 6px;
    background-color: greenyellow;
}
.customiconuser{
    float: left;
    width: 11px;
    height: 11px;
    margin: 8px 6px;
    background: 
    url(../../assets/tree/tree_user.png)  no-repeat;
}
.customicondept{
    float: left;
    width: 11px;
    height: 11px;
    margin: 8px 6px;
    background: 
    url(../../assets/tree/tree_dept.png)  no-repeat;
}
.customiconspjk{
    float: left;
    width: 11px;
    height: 11px;
    margin: 8px 6px;
    background: 
    url(../../assets/tree/tree_spjk.png)  no-repeat;
}
</style>
