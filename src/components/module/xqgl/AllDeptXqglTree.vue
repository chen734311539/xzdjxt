<template>
    <div>
      <el-scrollbar>
        <ul class="allDeptTreePanel-ul" ref="allDeptTree">
     			  <li >
	     				<div @click="clickDiv($event,deptListObj)">
                <Icon v-if="deptListObj.children" class="icon" @click="clickIcon($event)" type="md-arrow-dropright" size="20" color="#fff" style="float: left;margin-top:4px;display:none;"/>
                <Icon v-if="deptListObj.children" class="icon" @click="clickIcon($event)" type="md-arrow-dropdown" size="20" color="#fff" style="float: left;margin-top:4px;"/>
                <!-- <Icon v-if="!deptListObj.children" custom="iconfont iconml" size="13" color="#fff" style="float: left;margin-top:8px;margin-right:5px;"/> -->
                <i v-if="!deptListObj.children" class="customicondept" style="margin-left:14px;"></i>
                
                <h5>{{deptListObj.deptname}}</h5>	
                <Checkbox class="checkboxClass"  @on-change="changeCheckbox($event,deptListObj)">
                </Checkbox>
                
                <!-- <Icon v-show="!deptListObj.markid" @click="add(deptListObj)" custom="iconfont icontianjiawhite" size="20" color="#fff" style="float: left;margin-top:4px;margin-right:5px;"/> -->
                <i  class="addicon" v-show="!deptListObj.markid"  @click="add(deptListObj)"></i>
	     				</div>
              <AllDeptXqglTreeItem v-if="deptListObj.children" :datalist="deptListObj.children" :level="1" @on-clickDiv="clickDiv" @on-clickIcon="clickIcon" @on-change="changeCheckbox" @on-add="add"/>	
              <!-- <ul>
                <li>
                  <div @click="clickDiv($event)">
                    <Icon custom="iconfont iconml" size="13" color="#fff" style="float: left;margin-top:8px;margin-right:5px;margin-left:10px;"/>
                    <h5>xx派出所</h5>	
                  </div>
                </li>
              </ul>   			 				 -->
     				</li>
     		</ul> 
      </el-scrollbar>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"
import AllDeptXqglTreeItem from '@/components/module/xqgl/AllDeptXqglTreeItem'

export default {
  name: 'AllDeptTree',
  components: {AllDeptXqglTreeItem},
  props:['deptListObj'],
  data () {
    return {
      single:false
    }
  },
  computed: mapState({
  }),
  methods:{
   clickDiv(e,data){
        var el = e.currentTarget;
        if(!$(el).hasClass("activediv")){
          $(this.$refs.allDeptTree).find("div").removeClass("activediv");
          $(el).addClass("activediv");
          this.$emit('on-click',data);		
        }
      },
      clickIcon(e){
        var el = e.currentTarget;
        common.stopEvent(e);
        $(el).parent().siblings("ul").toggle();
        $(el).siblings(".icon").show();
        $(el).hide();
      },
      changeCheckbox(isCheck,data){
        this.$emit('on-change',isCheck,data);	
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
.customicondept{
    float: left;
    width: 11px;
    height: 11px;
    margin: 8px 6px;
    background: 
    url(./../../../assets/tree/tree_dept.png)  no-repeat;
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
</style>
