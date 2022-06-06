<template>
    <div>
      <el-scrollbar>
        <ul class="allDeptTreePanel-ul" ref="allDeptTree">
     			  <li >
	     				<div @click="clickDiv($event,deptListObj)">
                <Icon v-if="deptListObj.children" class="icon" @click="clickIcon($event)" type="md-arrow-dropright" size="20" color="#fff" style="float: left;margin-top:4px;display:none;"/>
                <Icon v-if="deptListObj.children" class="icon" @click="clickIcon($event)" type="md-arrow-dropdown" size="20" color="#fff" style="float: left;margin-top:4px;"/>
                <Icon v-if="!deptListObj.children" custom="iconfont iconml" size="13" color="#fff" style="float: left;margin-top:8px;margin-right:5px;"/>
	     					<h5>{{deptListObj.deptname}}</h5>	
	     				</div>
              <AllDeptTreeItem v-if="deptListObj.children" :datalist="deptListObj.children" :level="1" @on-clickDiv="clickDiv" @on-clickIcon="clickIcon" />	
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
import AllDeptTreeItem from '@/components/base/AllDeptTreeItem'

export default {
  name: 'AllDeptTree',
  components: {AllDeptTreeItem},
  props:['deptListObj'],
  data () {
    return {
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
        // $(el).siblings("ul").toggle();
      },
      clickIcon(e){
        var el = e.currentTarget;
        common.stopEvent(e);
        $(el).parent().siblings("ul").toggle();
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
