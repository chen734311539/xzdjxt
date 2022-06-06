<template>
    <div class="userTransferPanel">
       <div class="left">
         <div class="left-top">
           <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" :showClose="true" :changeShowClose="true" @on-change="inputSearchChange" @on-clear="inputSearchClear"/>
        </div>
        <div class="left-middle">
          <div v-show="!isSearch" class="treePanel">
              <el-scrollbar>
                <Tree ref="userTransferTree" :data="treeDate" :show-checkbox="true" @on-check-change="checkTree"></Tree>
              </el-scrollbar>
          </div>
          <div v-show="isSearch" class="searchPanel">
              <el-scrollbar>
                <UserTransferItem v-for="userObj in searchUsers" :key="userObj.usercode" :userObj="userObj" :closeEnable="false" @on-click="clickUser"/>
              </el-scrollbar>
          </div>
        </div>
       </div><!--此注释不能删，解决line-block中间的缝隙
    --><div class="right">
        <div class="right-top">
         已选：{{selectUsers.length}}
        </div>
        <div class="right-middle">
          <el-scrollbar>
                <UserTransferItem v-for="userObj in selectUsers" :key="userObj.usercode" :userObj="userObj" :closeEnable="true" @on-close="closeUser"/>
          </el-scrollbar>
        </div>
       </div>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearchNew from '@/components/base/InputSearchNew'
import UserTransferItem from '@/components/module/jqtj/UserTransferItem'


export default {
  name: 'UserTransfer',
  components: {InputSearchNew,UserTransferItem},
  props:['oriSelectUsers'],
  data () {
    return {
      isSearch:false,
      treeDate: [],
      selectUsers:[],//选择的用户
      searchUsers:[],//搜索列表出来的用户
      userMap:[],//树中的用户,key为usercode
      deptMap:[],//树中的部门,key为usercode
    }
  },
  computed: mapState({
  }),
  methods:{
      inputSearch(value){
          this.inputSearchChange(value);
      },
      inputSearchChange(val){
        this.searchUsers = [];
        this.isSearch = true;
        if(val==""){//去掉搜索列表
          this.inputSearchClear();
        }else{//搜索列表暂时
          this.searchUser(this.treeDate,val);
        }
      },
      searchUser(list,val){
        for(var i=0;i<list.length;i++){
          var obj = list[i];
          if(obj.usercode){//ren
            if(obj.usercode.indexOf(val)>-1 || obj.username.indexOf(val)>-1){
                this.searchUsers.push(obj);
            }
          }else{//单位
            if(obj.children){
              this.searchUser(obj.children,val);
            }
          }
        }
      },
      inputSearchClear(){//去掉搜索列表
        this.isSearch = false;
      },
      closeUser(obj){
        var index = 0;
        for(var j=0;j<this.selectUsers.length;j++){
            if(this.selectUsers[j].usercode==obj.usercode){
              index = j;
              break;
            }
        }
        this.selectUsers.splice(index,1);
        //处理树
        var list = this.$refs.userTransferTree.getCheckedNodes();
        for(var i=0;i<list.length;i++){
          if(list[i].usercode&&list[i].usercode==obj.usercode){//ren
               if(this.userMap[obj.usercode]){
                  this.userMap[obj.usercode].checked=false;
                  //部门也去掉选择,若部门有多个用户，不会影响其他的已选择用户，不去则不会对此用户产生影响
                  var deptcode = this.userMap[obj.usercode].deptcode;
                  if(this.deptMap[deptcode]){
                    this.deptMap[deptcode].checked=false;
                  }
               }
              break;
          }
        }
        this.changeSelectUsers();
      },
      clickUser(obj){
        if(!this.isInSelectUsers(obj)){
          this.selectUsers.push(obj);
          //树中也选择上
          if(this.userMap[obj.usercode]){
            this.userMap[obj.usercode].checked=true;
          }
          this.changeSelectUsers();
        }
      },
      getDeptTreeContainUserCallBack(obj){
          this.duleChildren(obj);
          this.deptMap[obj.deptcode]=obj;
          obj.title = obj.deptname;
          obj.expand = true;
          if(obj.users){
            this.handleUsersDate(obj,obj.users);
          }
          if(obj.oldchildren){
            this.handleDate(obj,obj.oldchildren);
          }
          this.treeDate = new Array(obj);
      },
      duleChildren(obj){//处理下children
        if(obj.children){
          obj.oldchildren = obj.children;
          obj.children = null;
          for(var i=0;i<obj.oldchildren.length;i++){
            this.duleChildren(obj.oldchildren[i]);
          }
        }
      },
      handleUsersDate(obj,list){
        if(list==null || list==undefined || list.length == 0){
             return;
         }
        if(!obj.children){
          obj.children = [];
        }
        for(var i=0;i<list.length;i++){
            this.userMap[list[i].usercode]=list[i];
            list[i].title = list[i].username;
            list[i].render = this.renderContent;
            if(this.isInSelectUsers(list[i])){
              list[i].checked=true;
            }else{
              list[i].checked=false;
            }
            obj.children.push(list[i]);
         }
      },
      handleDate(obj,list){
         if(list==null || list==undefined || list.length == 0){
             return;
         }
         if(!obj.children){
            obj.children = [];
         }
         for(var i=0;i<list.length;i++){
            this.deptMap[list[i].deptcode]=list[i];
            list[i].title = list[i].deptname;
            this.handleUsersDate(list[i],list[i].users);
            if(list[i].oldchildren){
                this.handleDate(list[i],list[i].oldchildren);
            }
            obj.children.push(list[i]);
         }
     },
     checkTree(list,obj){
       var listusercode=[];
       for(var i=0;i<list.length;i++){
         if(list[i].usercode){//是人员
            listusercode.push(list[i].usercode);
            if(!this.isInSelectUsers(list[i])){
              this.selectUsers.push(list[i]);
            }
         }
       }
      //去掉人员
      for(var i=this.selectUsers.length-1;i>=0;i--){
           if(listusercode.indexOf(this.selectUsers[i].usercode)==-1){//若在选择的用户中没有，则需要去掉
                this.selectUsers.splice(i,1);
           }
      }
      this.changeSelectUsers();
     },
     isInSelectUsers(obj){
       var exist = false;
       for(var j=0;j<this.selectUsers.length;j++){
          if(this.selectUsers[j].usercode==obj.usercode){
            exist = true;
            break;
          }
       }
       return exist;
     },
     changeSelectUsers(){
       this.$emit('on-change',this.selectUsers);
     },
     clearSelectUsers(){
       this.selectUsers=[];
       this.changeSelectUsers();
     },
     addUser(val){
       var user={};
       user.username=val;
       user.usercode="manually";
       user.title = user.username;
       user.render = this.renderContent;
       this.selectUsers.push(user);
       this.changeSelectUsers();
     },
      renderContent (h, { root, node, data }) {//树节点渲染
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                        hover:{
                              color:'black'
                            }
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                custom: 'iconfont icondanren'
                            },
                            style: {
                                margineft: '-3px',
                                marginRight: '3px',
                                fontSize:'14px'
                            }
                        }),
                        h('span', data.title)
                    ])
                 
                ]);
            },
  },
  created(){
      this.http.get("/common/getDeptTreeContainUser",null,this.getDeptTreeContainUserCallBack,this,false);
      if(this.oriSelectUsers){
        this.selectUsers = this.selectUsers.concat(this.oriSelectUsers);
      }
  }
}
</script>

<style scoped>
.userTransferPanel{
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
  background: #08385a;
}
.right-top{
  height: 30px;
  width: 100%;
}
.right-middle{
  height: calc(100% - 30px);
  width: 100%;
  background: #08385a;
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
