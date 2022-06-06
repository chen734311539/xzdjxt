<template>
<!-- 本组件是 AllDeptTree 的子组件jxj-->
        <ul v-show="level==1">
          <li v-for="dataObj in datalist" :key="dataObj.deptcode">
            <div @click="clickDiv($event,dataObj)">
              <Icon v-if="dataObj.children" class="icon" @click="clickIcon($event)" type="md-arrow-dropright" size="20" color="#fff" :style="arrowStyle1"/>
              <Icon v-if="dataObj.children" class="icon" @click="clickIcon($event)" type="md-arrow-dropdown" size="20" color="#fff" :style="arrowStyle2"/>
              <Icon v-if="!dataObj.children" custom="iconfont iconml" size="13" color="#fff" :style="mlStyle"/>
              <h5>{{dataObj.deptname}}</h5>
            </div>
              <AllDeptTreeItem v-if="dataObj.children" :datalist="dataObj.children" :level="level+1"  @on-clickDiv="clickDiv" @on-clickIcon="clickIcon"/>	
            
          </li>
        </ul>   			 				
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"

export default {
  name: 'AllDeptTreeItem',
  props:['datalist','level'],
  data () {
    return {
    }
  },
  computed: {
    arrowStyle1:function(){
      var obj = {};
      obj.float = "left";
      obj["margin-top"] = "4px";
      obj["margin-left"] = (10*this.level-7)+"px";
      return obj;
    },
    arrowStyle2:function(){
      var obj = {};
      obj.float = "left";
      obj["margin-top"] = "4px";
      obj.display = "none";
      obj["margin-left"] = (10*this.level-7)+"px";
      return obj;
    },
    mlStyle:function(){
      var obj = {};
      obj.float = "left";
      obj["margin-top"] = "8px";
      obj["margin-right"] = "5px";
      obj["margin-left"] = (10*this.level)+"px";
      return obj;
    }
  },
  methods:{
      clickDiv(e,data){
         this.$emit('on-clickDiv',e,data);
      },
      clickIcon(e){
        this.$emit('on-clickIcon',e);
      }
  },
  created(){
    
  }
}
</script>

<style scoped>
/**树 */
.allDeptTreePanel-ul >>> h5{
  color: #b6f6ff;
  font-size: 12px;
  font-weight: 400;
  height: 28px;
  float: left;
}
.allDeptTreePanel-ul >>> li{
  list-style:none;
}
.allDeptTreePanel-ul >>> div{
  background-color: rgb(137,156,255,0.1);
  margin-bottom: 2px;
  border-radius: 4px;
  width:100%;
  height: 28px;
  text-align:center;
  line-height: 28px;
  cursor: pointer;
}
.allDeptTreePanel-ul >>> div.activediv{
  background-color: rgb(137,156,255,0.2);
}
</style>
