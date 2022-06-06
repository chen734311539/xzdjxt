<template>
<!-- 本组件是 AllDeptTree 的子组件jxj-->
        <ul v-show="level==1">
          <li v-for="dataObj in datalist" :key="dataObj.deptcode">
            <div @click="clickDiv($event,dataObj)">
              <Icon v-if="dataObj.children" class="icon" @click="clickIcon($event)" type="md-arrow-dropright" size="20" color="#fff" :style="arrowStyle1"/>
              <Icon v-if="dataObj.children" class="icon" @click="clickIcon($event)" type="md-arrow-dropdown" size="20" color="#fff" :style="arrowStyle2"/>
              <!-- <Icon v-if="!dataObj.children" custom="iconfont iconml" size="13" color="#fff" :style="mlStyle"/> -->
              <i v-if="!dataObj.children" class="customicondept" :style="mlStyle"></i>

                <h5>{{dataObj.deptname}}</h5>
              <Checkbox class="checkboxClass" :label="dataObj.deptcode" @on-change="changeCheckbox($event,dataObj)">
              </Checkbox>
              <!-- <Icon v-show="!dataObj.markid" @click="add(dataObj)"  custom="iconfont icontianjiawhite" size="20" color="#fff" style="float: left;margin-top:4px;margin-right:5px;"/> -->
              <i  class="addicon" v-show="!dataObj.markid"  @click="add(dataObj)"></i>
            </div>
              <AllDeptXqglTreeItem v-if="dataObj.children" :datalist="dataObj.children" :level="level+1"  @on-clickDiv="clickDiv" @on-clickIcon="clickIcon"/>	
            
          </li>
        </ul>   			 				
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"

export default {
  name: 'AllDeptXqglTreeItem',
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
    },
  },
  methods:{
      clickDiv(e,data){
         this.$emit('on-clickDiv',e,data);
      },
      clickIcon(e){
        this.$emit('on-clickIcon',e);
      },
      changeCheckbox(e,data){
        this.$emit('on-change',e,data);
      },
      add(data){
        this.$emit('on-add',data);
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
  background-color: rgba(137,156,255, 0.1);
  margin-bottom: 2px;
  width:100%;
  height: 28px;
  text-align:center;
  line-height: 28px;
  cursor: pointer;
  position: relative;
}
.allDeptTreePanel-ul >>> div.activediv{
   background-color: rgba(137,156,255, 0.2);
}
.checkboxClass{
    position: absolute;
    right: 5px;
    top: 1px;
}
.addicon{
    float: right;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 8px;
    right: 30px;
    background: 
    url(./../../../assets/qygl/qygl_zengjia.png)  no-repeat;
}
.customicondept{
    float: left;
    width: 11px;
    height: 11px;
    margin: 8px 6px;
    background: 
    url(./../../../assets/tree/tree_dept.png)  no-repeat;
}
</style>
