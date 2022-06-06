<template>
    <div class="yaglbutton">
        <div class="content">
          <span class="title">{{data.name.length &lt;= 15? data.name:(data.name.substr(0,15)+"……")}}</span>
          <span class="deptname">创建部门：{{data.deptname}}</span>
        </div>
        <div class="yaglbuttoncaozuo">
          <div class="readIcon" @click="showPlan" ></div>
          <div class="mdyIcon" @click="editPlan" ></div>
          <div class="delIcon" @click="deletePlan" ></div>
        </div>
    </div>
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'YaglButton',
  props:['data'],
  components: {},
  data () {
    return {
      
    }
  },
  methods:{
     showPlan(){
        this.$emit('show-flow',this.data);	
     },
     editPlan(){
        this.$emit('edit-plan',this.data);	
     },
     deletePlan(){
        this.$emit('del-plan',this.data);	
     }
  },
  created(){
  }
}
</script>
<style scoped>
.yaglbutton{
  width: 94%;
  height: 70px;
  margin: 5px;
  border: 1px solid #58f5ff;
  position: relative;
  padding: 13px 0px;
  cursor: pointer;
}
.content{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
}
.title{
  position: absolute;
  color: #58f5ff;
  font-size: 14px;
  left: 10px;
}
.deptname{
  position: absolute;
  top: 30px;
  left: 10px;
  color: #58f5ff;
}
.groupname{
  position: absolute;
  top: 15px;
  left: 10px;
  color: #58f5ff;
}
.modal-div{
  margin: 0 0 20px -30px;
}
.modal-div span{
  float: left;
  width: 85px;
  text-align: right;
  margin-right: 10px;
}
.modal_style{
    display: flex;
    align-items: center;
    justify-content: center;
}
.readIcon{
  width: 19px;
  height: 15px;
  cursor: pointer;
  margin-right:10px;
  background: 
  url(./../../../assets/yagl/yagl_see.png)  no-repeat;

}
.mdyIcon{
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-right:10px;
  background: 
  url(./../../../assets/yagl/yagl_mdy.png)  no-repeat;
}
.delIcon{
  width: 15px;
  height: 15px;
  cursor: pointer;
  background: 
  url(./../../../assets/yagl/yagl_del.png)  no-repeat;
  
}
.yaglbuttoncaozuo{
  position: absolute;
  display: inline-flex;
  right: 5px;
  bottom: 5px;
}
.yaglbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #58f5ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.yaglbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #58f5ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
</style>
<style>
.yaglDelYaglModal .ivu-modal .ivu-modal-content{
  top:293px;
  left:300px;
  width: 400px !important;
}
</style>