<template>
    <div>
        <ul class="allDeptTreePanel-ul" ref="allDeptTree">
     			  <li >
	     				<div @click="clickDiv($event,deptListObj)">
                <Icon v-if="deptListObj.children" class="icon" @click="clickIcon($event)" type="md-arrow-dropright" size="20" color="#fff" style="float: left;margin-top:4px;display:none;"/>
                <Icon v-if="deptListObj.children" class="icon" @click="clickIcon($event)" type="md-arrow-dropdown" size="20" color="#fff" style="float: left;margin-top:4px;"/>
                <!-- <Icon v-if="!deptListObj.children" custom="iconfont iconml" size="13" color="#fff" style="float: left;margin-top:8px;margin-right:5px;"/> -->
                <i v-if="!deptListObj.children" class="customicondept" style="margin-left:14px;"></i>
                
                <h5>{{deptListObj.qyname}}</h5>	
                <Checkbox class="checkboxClass" :label="deptListObj.qycode" @on-change="changeCheckbox($event,deptListObj)">
                </Checkbox>
                
                <!-- <Icon title="删除部门" @click="deleteDept(deptListObj.qycode)" custom="iconfont iconshanchu" size="15" color="#57a3f3" style="float: right;margin-top:6px;margin-right:5px;"/>
                <Icon title="修改名称" @click="editDept(deptListObj)" custom="iconfont iconxiugai" size="15" color="#57a3f3" style="float: right;margin-top:6px;margin-right:5px;"/>
                <Icon v-show="!deptListObj.markid" @click="add(deptListObj)" title="添加图层" custom="iconfont icontianjiawhite" size="20" color="#fff" style="float: right;margin-top:4px;margin-right:5px;"/> -->
                <i  class="delicon" @click="deleteDept(deptListObj.qycode)" ></i>
                <i  class="mdyicon" @click="editDept(deptListObj)" ></i>
                <i  class="addicon" v-show="!deptListObj.markid"  @click="add(deptListObj)"></i>
	     				</div>
              <QyglAllDeptTreeItem v-if="deptListObj.children" :datalist="deptListObj.children" :level="1" @on-clickDiv="clickDiv" @on-clickIcon="clickIcon" @on-change="changeCheckbox" @on-add="add" @on-delete="deleteDept" @on-edit="editDept"/>	
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
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"
import QyglAllDeptTreeItem from '@/components/module/qygl/QyglAllDeptTreeItem'

export default {
  name: 'QyglAllDeptTree',
  components: {QyglAllDeptTreeItem},
  props:['deptListObj'],
  data () {
    return {
      single:false,
      showDelete:false,
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
      },
      deleteDept(val){
        this.$emit('on-delete',val);
      },
      editDept(data){
        this.$emit('on-edit',data);
      },
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
.delicon{
    float: right;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 8px;
    right: 35px;
    /* margin: 8px 6px; */
    background: 
    url(./../../../assets/qygl/qygl_del.png)  no-repeat;
}
.mdyicon{
    float: right;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 8px;
    right: 60px;
    background: 
    url(./../../../assets/qygl/qygl_mdy.png)  no-repeat;
}
.addicon{
    float: right;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 8px;
    right: 85px;
    background: 
    url(./../../../assets/qygl/qygl_zengjia.png)  no-repeat;
}
</style>
