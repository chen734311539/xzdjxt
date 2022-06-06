<template>
    <div style="position: relative;"  >
        <input class="inputClass" v-model="deptname" :readonly="true" @click="clickDropdown"/>
        <div class="icontext" @click="clickDropdown">点击展开</div> 
        <div class="iconclass" @click="clickDropdown" /> 
        <div v-if="showdiv" class="dropdownshowdiv" @mouseout="outDropdown">
            <Tree :data="dataList" @on-select-change="choice" class="dropdowntree"></Tree>
        </div>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'DropdownTreeNew',
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
    background-color:transparent;
    color: #b6f6ff;
    border: 1px solid #b6f6ff;
    outline:0;
    padding: 10px;
}
.icontext{
    position: absolute;
    top: 10px;
    right: 25px;
    color: #b6f6ff;
    cursor: pointer;
}
.iconclass{
    position:absolute;
    width: 22px;
    height: 16px;
    cursor: pointer;
    right: 5px;
    top: 10px;
    background:
    url(../../assets/form/arrow_bottom.png) no-repeat center;
}
.iconclass:hover{
    position:absolute;
    width: 22px;
    height: 16px;
    cursor: pointer;
    right: 5px;
    top: 10px;
    background:
    url(../../assets/form/arrow_bottom_hov.png) no-repeat center;
}
.dropdownshowdiv{
    position:absolute;
    width: 100%;
    background-color:rgba(14,31,98,0.9);
    height: 150px;
    z-index: 100;
    border:1px solid #b6f6ff;
    border-top: none;
    overflow: auto;
}
.dropdowntree{
    color: #b6f6ff;
}
.dropdowntree >>> .ivu-tree-title{
    color: #b6f6ff;
}
.dropdowntree >>> .ivu-tree-title:hover{
    color: white;
}
.dropdowntree >>> .ivu-tree-title:hover{
    background:none;
}
.dropdowntree >>> .ivu-tree-title-selected, .dropdowntree >>> .ivu-tree-title-selected:hover{
    background:none;
}
.dropdownshowdiv >>> .el-scrollbar__bar.is-vertical{
    width: 3px;
}
</style>
