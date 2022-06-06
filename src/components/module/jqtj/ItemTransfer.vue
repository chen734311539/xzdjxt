<template>
    <div class="itemTransferPanel">
       <div class="left">
         <div class="left-top">
           <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" :showClose="true" :changeShowClose="true" @on-change="inputSearchChange" @on-clear="inputSearchClear"/>
        </div>
        <div class="left-middle">
          <div v-show="!isSearch" class="treePanel">
              <el-scrollbar>
              <ItemShowItem v-for="itemObj in allItemsData" :key="itemObj.id" :itemObj="itemObj" :closeEnable="false" @on-click="clickItem"/>
              </el-scrollbar>
          </div>
          <div v-show="isSearch" class="searchPanel">
            <el-scrollbar>
              <ItemShowItem v-for="itemObj in searchItems" :key="itemObj.id" :itemObj="itemObj" :closeEnable="false" @on-click="clickItem"/>
            </el-scrollbar>
          </div>
        </div>
       </div><!--此注释不能删，解决line-block中间的缝隙
    --><div class="right">
        <div class="right-top">
         已选：{{selectItems.length}}
        </div>
        <div class="right-middle">
          <el-scrollbar>
            <ItemTransferItem v-for="itemObj in selectItems" :key="itemObj.id" :itemObj="itemObj" :closeEnable="true" @on-close="closeItem"/>
          </el-scrollbar>
        </div>
       </div>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import ItemTransferItem from '@/components/module/jqtj/ItemTransferItem'
import ItemShowItem from '@/components/module/jqtj/ItemShowItem'
export default {
  name: 'ItemTransfer',
  components: {InputSearchNew,ItemTransferItem,ItemShowItem},
  props:['allItems'],
  data () {
    return {
      isSearch:false,
      allItemsData: [],
      selectItems:[],//选择的项目
      searchItems:[],//搜索列表出来的项目
      defaultProps: {
          children: 'children',
          label: 'name'
        }
    }
  },
  computed: mapState({
  }),
  methods:{
      inputSearch(value){
          this.inputSearchChange(value);
      },
      inputSearchChange(val){
        this.searchItems = [];
        this.isSearch = true;
        if(val==""){//去掉搜索列表
          this.inputSearchClear();
        }else{//搜索列表暂时
          this.searchItem(this.allItems,val);
        }
      },
      searchItem(list,val){
        for(var i=0;i<list.length;i++){
          var obj = list[i];
          if(obj.code.indexOf(val)>-1 || obj.name.indexOf(val)>-1){
            this.searchItems.push(obj);
          }
        }
      },
      inputSearchClear(){//去掉搜索列表
        this.isSearch = false;
      },
      closeItem(obj){
        var index = 0;
        for(var j=0;j<this.selectItems.length;j++){
            if(this.selectItems[j].id==obj.id){
              index = j;
              break;
            }
        }
        this.selectItems.splice(index,1);
        this.changeSelectItems();
      },
      clickItem(obj){
        if(this.isInSelectItems(obj)){
          this.closeItem(obj);
        }else{
          this.selectItems.push(obj);
          this.changeSelectItems();
        }
      },
     isInSelectItems(obj){
       var exist = false;
       for(var j=0;j<this.selectItems.length;j++){
          if(this.selectItems[j].id==obj.id){
            exist = true;
            break;
          }
       }
       return exist;
     },
     changeSelectItems(){
       this.$emit('on-change',this.selectItems);
     },
     clearSelectItems(){
       this.selectItems=[];
       this.changeSelectItems();
     },
     addItem(val){
       var item={};
       item.id=ths.selectItems.length;
       item.name=val;
       item.code="manually";
       this.selectItems.push(item);
       this.changeSelectItems();
     },
  },
  created(){
    this.allItemsData=this.allItems;
    for(var i=0;i<this.allItemsData.length;i++){
      this.allItemsData[i].id=i;
    }
  }
}
</script>

<style scoped>
.itemTransferPanel{
  position: relative;
  width: 370px;
  height: 340px;
}
.left{
  width:calc(60% - 10px);
  height: 100%;
  padding: 5px;
  display:inline-block;
  position: relative;
}
.right{
  margin-left:20px;
  width:calc(40% - 10px);
  height: 100%;
  padding: 5px;
  display:inline-block;
  position: absolute;
}
.left-top{
  height: 30px;
  width: 100%;
}
.left-middle{
  height: calc(100% - 30px);
  width: 100%;
  background: #08385a;;
}
.right-top{
  height: 30px;
  width: 100%;
}
.right-middle{
  height: calc(100% - 30px);
  width: 100%;
  background: #08385a;;
  padding: 5px; 
}
.seachbar_InputSearch{
  height: 26px;
  width: 100%;
  margin: auto;
}
.seachbar_InputSearch>>>.iconclass{
  right: 5px;
  top: 0px;
}
.seachbar_InputSearch>>>.iconclass:hover{
  right: 5px;
  top: 0px;
}
.seachbar_InputSearch>>>.clearclass{
  right: 28px;
  top: -2px;
}
.seachbar_InputSearch>>>.clearclass:hover{
  right: 28px;
  top: -2px;
}
.treePanel{
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 5px; 
}
.searchPanel{
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 5px;
}
.treePanel >>> .ivu-tree-title{
  color: white;
}
.treePanel >>> .ivu-tree-title:hover{
  color: black;
}
</style>
