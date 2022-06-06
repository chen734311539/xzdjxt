<template>
    <div class="createpanel">
        <div class="panel_title">
            <div class="chat_info_right_header">
              <div class="chat_object_name">创建组</div>
              <div class="chat_info_right_topbar_close" @click="closePanel(0)">
                  <img src="@/assets/chat/chat_close.png"/>
              </div>
            </div>
        </div>
        <div class="panel_search">
            <span style="position: relative;top: 10px;margin-left: 43px;color: #fff;">群组名称：</span>
            <div style="float:left;">
                <input class="select_input" v-model="groupname" placeholder="    请填写群主名称"/>
            </div>
        </div>
        <div class="panel_content">
           <div style="position: relative;top: 10px;margin-left: 43px;color: #fff;">选择创建：</div>
           <div class="chat_usertree">
               <UserTransfer style="width:562px;height:390px;" @on-change="userTransferChange"/>
           </div>
        </div>
        <div class="panel_btn">
           <button class="chat_info_right_closecontent" @click="closePanel(0)">取消</button>
           <button style="background: #2b97ea;" class="chat_info_right_closecontent" @click="createGroup">确认</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import UserTransfer from '@/components/base/UserTransfer'
export default {
  name: 'ChatGroupCreat',
  components: {UserTransfer},
  data () {
    return {
      groupname:"",
      selectusers:[],
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
  }),
  methods:{
      closePanel(val){
        var obj = {};
        obj.state = val;
        this.$emit("close-chatCreatePanel",obj);
      },
      createGroup(){
          if(this.groupname == ""){
               this.$Message.error("群组名称不能为空");
               return;
          }
          if(this.selectusers.length == 0){
               this.$Message.error("请选择群组人员");
               return;
          }
          var paramObj = {};
          paramObj.name = this.groupname;
          var users = [];
          for(var i=0;i< this.selectusers.length;i++){
              users.push(this.selectusers[i].usercode);
          }
          paramObj.users = users;
          this.http.get("/chat/saveChatGroup",paramObj,this.saveChatGroupCallBack,this,false);
      },
      saveChatGroupCallBack(result){
          this.$Message.success("添加小组成功");
          this.selectusers = [];
          this.groupname = "";
          this.closePanel(1);
      },
      userTransferChange(userList){
          this.selectusers = userList;
      },
  },
  created(){
     
  }
}
</script>

<style scoped>
.createpanel{
   position: absolute;
   bottom: 10%;
   left: -355%;
   height: 571px;
   width: 683px;
   background: #08385a;
   box-shadow: 0 0 3px 0 #1234ac;
}
.chat_info_right_header{
  height: 36px;
  background: #10487e;
}
.chat_object_name{
  width: 647px;
  height: 36px;
  cursor: move;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.chat_info_right_topbar_close{
  cursor: pointer;
  width: 36px;
  height: 36px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.chat_info_right_topbar_close:hover{
  background-color: #f94747;
}
.panel_search{
    height: 36px;
    width: 100%;
    position: relative;
    top: 20px; 
}
.select_input{
    height: 36px;
    color: #8ddbe8;
    background-color: #10487e;
    border: 0px;
    width: 80%;
    outline: 0;
    font-size: 14px;
    right: 25px;
    position: absolute;
}
.select_input::-webkit-input-placeholder{
  color:#8ddbe8;
  font-size:12px;
}
.panel_content{
    height: 410px;
    width: 100%;
    position: relative;
    top: 40px;
}
.select_user_input{
    height: 30px;
    color: #8ddbe8;
    background-color: #10487e;
    border: 0px;
    width: 90%;
    outline: 0;
    font-size: 14px;
    right: 30px;
    position: absolute;
}
.chat_usertree{
    height: 100%;
    display: inline-block;
    width: 500px;
    top: -10px;
    margin-left: 112px;
    position: relative;
}
.selected_user{
    height: 100%;
    background: red;
    display: inline-block;
    width: 250px;
    top: -10px;
    position: relative;
}
.chat_info_right_closecontent{
  height: 30px;
  width: 80px;
  outline: 0px;
  cursor: pointer;
  background: #08385a;
  border: 2px solid;
  border-color: #2b97ea;
  color: #fff;
  margin-right: 13px;
}
.panel_btn{
    height: 31px;
    width: 200px;
    position: absolute;
    bottom: 10px;
    right: 0;
}
</style>
<style>
.chat_usertree .seachbar_InputSearch{
    top: -6px !important;
    height: 30px!important;
}
.chat_usertree .inputClass{
    height: 30px!important;
    color: #8ddbe8;
    background-color: #10487e!important;
    border: 0px!important;
    width: 100%!important;
    outline: 0!important;
    font-size: 14px!important;
}
</style>

