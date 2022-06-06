<template>
    <div style="position: relative;"  >
        <input class="inputClass" v-model="deptname" :readonly="true" @click="clickDropdown"/>
        <Icon type="ios-arrow-down" class="iconclass" @click="clickDropdown"/>
        <div v-if="showdiv" class="dropdownshowdiv" @mouseout="outDropdown">
            <el-scrollbar>
                <Tree :data="dataList" @on-select-change="choice" class="dropdowntree"></Tree>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'DropdownTree',
  props:['choiceDept','deptListObj','orideptname'],
  data () {
    return {
      showdiv:false,
      newDeptname:""
    }
  },
  computed: {
     deptname: function(){
         if(this.newDeptname==""){
             return this.orideptname;
         }else{
            return this.newDeptname;
         }
     },
     dataList:function(){
        var obj = Object.assign({},this.deptListObj);
          obj.title = obj.deptname;
          if(obj.deptname==this.deptname){
              obj.selected = true;
          }else{
              obj.selected = false;
          }
          obj.expand = true;
          if(obj.children){
            this.handleDate(obj.children);
          }
          return new Array(obj);
     }
  },
  methods:{
    clickDropdown(){
        this.showdiv = !this.showdiv;
    },
    outDropdown(){
        //this.showdiv = false;
    },
    choice(data){
        this.newDeptname = data[0].deptname;
        this.showdiv = false;
        this.choiceDept(data[0]);
        // this.$store.dispatch('putChildState',{"key":"jq","childkey":"search","value":{"deptcode":data[0].deptcode,"deptname":data[0].deptname}});
    },
    handleDate(list){
         if(list==null || list==undefined){
             return;
         }
         for(var i=0;i<list.length;i++){
            list[i].title = list[i].deptname;
            if(list[i].deptname==this.deptname){
              list[i].selected = true;
            }else{
              list[i].selected = false;
            }
             if(list[i].children){
                 this.handleDate(list[i].children);
             }
         }
     }
  },
  created(){
   
  }
}
</script>

<style scoped>
.inputClass{
    width: 100%;
    height: 100%;
    background-color:rgba(0, 0, 0, 0);
    color: white;
    border: 1px solid #5b6b72;
    border-radius: 5px;
    cursor: pointer;
    padding-left:10px;
}
.iconclass{
    position:absolute;
    color: white;
    cursor: pointer;
    font-size: 16px;
    right: 5px;
    top: 5px;
}
.dropdownshowdiv{
    position:absolute;
    width: 100%;
    background-color: black;
    height: 150px;
    z-index: 100;
}
.dropdowntree{
    color: white;
}
.dropdowntree >>> .ivu-tree-title{
    color: white;
}
.dropdowntree >>> .ivu-tree-title:hover{
    background-color: #262b2e;
}
.dropdowntree >>> .ivu-tree-title-selected, .dropdowntree >>> .ivu-tree-title-selected:hover{
    background-color: #262b2e;
}
</style>
