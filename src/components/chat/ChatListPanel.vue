<template style="width:100%;height:100%;">
    <div class="chat_list_panel">
        <div class="chat_list_panel_top">
            <div class="chat_topbar_close_class" @click="hideChatPanel">
                <img src="@/assets/chat/chat_close.png"/>
            </div>
            <div class="chat_topbar_class" @click="hideChatPanel">
                <img src="@/assets/chat/chat_hide.png" style="width:15px;height:14px;"/>
            </div>
            <div class="chat_topbar_class" @click="showSetPanel">
                <img src="@/assets/chat/chat_tool.png" style="width:15px;height:14px;"/>
            </div>
        </div>
        <div class="chat_list_panel_bottom">
            <div class="chat_userinfo">
                <div class="chat_user_icon">
                  <img :src="userPic" style="border-radius: 50%;width:55px;height:55px;"/>
                </div>
                <div class="chat_username">
                    <span>{{userInfo.username}}</span>
                </div>
            </div>
            <div class="chat_select_input">
                <input class="select_input" placeholder="搜索好友 / 组" v-model="selectname"  @change="inputSearchChange"/>
                <div class="select_icon"></div>
            </div>
            <div class="chat_tables">
                <div style="height:45px">
                   <div class="chat_list_select_users" @click="showSelectList('users')">联系人</div>
                   <div class="chat_list_select_groups" @click="showSelectList('groups')">群组</div>
                   <div class="chat_add_group"><img :src="chataddgroupicon" @click="showCreatPanel" style="width:16px;height:16px;"/></div>
                </div>
                <div class="chat_table_list">
                    <div v-for=" chatObj in  chatListData" :key="chatObj.id" @click="optionChatInfo(chatObj)" class="chat_list_userinfo ">
                        <div class="chat_list_user_icon">
                        <img :src="getChatInfoIcon(chatObj)" style="border-radius: 50%;width:41px;height:41px;"/>
                        </div>
                        <div class="chat_list_username">
                            <span>{{chatObj.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ChatInfoPanel :chatObject="selectChatObject" v-show="showChatInfo" @close-chatInfoPanel="closeChatInfoPanel"/>
        <ChatGroupCreat  v-show="showChatCreat" @close-chatCreatePanel="closeChatCreatePanel"/>
        <ChatSetGroup v-show="showSetGroup" :show="showSetGroup" @close-chatCreatePanel="closeChatSetPanel"/>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import ChatInfoPanel from '@/components/chat/ChatInfoPanel'
import ChatGroupCreat from '@/components/chat/ChatGroupCreat'
import ChatSetGroup from '@/components/chat/ChatSetGroup'
import { mapState } from 'vuex'

export default {
  name: 'ChatListPanel',
  components: {ChatInfoPanel,ChatGroupCreat,ChatSetGroup},
  data () {
    return {
      selectname:'',
      chataddgroupicon:require("@/assets/chat/chat_add_group.png"),
      chatListData:[],
      showChatInfo:false,
      showChatCreat:false,
      showSetGroup:false,
      selectChatObject:{},
    }
  },
  computed: {...mapState({
        userInfo: state => state.userInfo
    }),
    userPic:function(){
      if(this.userInfo.newavatar){
        return this.userInfo.newavatar;
      }else{
        return require("@/assets/chat/chat_user.png");
      }
    }
  },
  methods:{
    showSetPanel(){
       this.showSetGroup = !this.showSetGroup;
       this.showChatCreat = false;
       this.showChatInfo = false;
    },
    showCreatPanel(){
      this.showChatCreat = !this.showChatCreat;
      this.showChatInfo = false;
      this.showSetGroup = false;
    },
    hideChatPanel(){
      this.$emit("show-chatpanel",false);
    },
    getChatInfoIcon(obj){//获取列表聊天对象图标
       if(obj.state=='1'){
         return require("@/assets/chat/chat_group.png");
       }else{
           if(obj.newavatar){
               return Constants.file_url+obj.newavatar;
           }else{
               return require("@/assets/chat/chat_user.png");
           }
       }
    },
    showSelectList(type){//点击表头的选项，是显示联系人还是群组，或者显示最近联系对象
        if(type=="users"){
          $(".chat_list_select_users").css("color","white");
          $(".chat_list_select_users").css("border-bottom","2px solid white");
          $(".chat_list_select_groups").css("color","#8ddbe8");
          $(".chat_list_select_groups").css("border-bottom","1px solid #8ddbe8");
          this.chataddgroupicon = require("@/assets/chat/chat_add_group.png");
          this.http.get("/chat/findSelfChatUsers",null,this.findSelfChatInfoCallBack,this,false);
        }
        if(type=="groups"){
          $(".chat_list_select_users").css("color","#8ddbe8");
          $(".chat_list_select_users").css("border-bottom","1px solid #8ddbe8");
          $(".chat_list_select_groups").css("color","white");
          $(".chat_list_select_groups").css("border-bottom","2px solid white");
          this.chataddgroupicon = require("@/assets/chat/chat_add_group_click.png");
          this.http.get("/chat/findSelfChatGroup",null,this.findSelfChatInfoCallBack,this,false);
        }
        if(type=="all"){
          $(".chat_list_select_users").css("color","#8ddbe8");
          $(".chat_list_select_users").css("border-bottom","1px solid #8ddbe8");
          $(".chat_list_select_groups").css("color","#8ddbe8");
          $(".chat_list_select_groups").css("border-bottom","1px solid #8ddbe8");
          this.chataddgroupicon = require("@/assets/chat/chat_add_group.png");
        }
    },
    findSelfChatInfoCallBack(data){
      this.chatListData = data;
    },
    chatInputChange(){
      this.showSelectList('all');
      this.http.get("/chat/findChatGroupOrUser",{name:this.selectname},this.findChatGroupOrUserCallBack,this,false);
    },
    inputSearchChange(){
        this.http.get("/chat/findChatGroupOrUser",{name:this.selectname},this.findChatGroupOrUserCallBack,this,false);
    },
    optionChatInfo(obj){
        this.http.get("/chat/optionChatInfo",{toid:obj.id},null,this,false);
        if(this.showChatInfo==false){
          this.showChatInfo = true;
          this.showChatCreat = false;
          this.showSetGroup = false;
        }
        this.selectChatObject = obj;
    },
    closeChatInfoPanel(val){
      if(val.clear){
        this.selectChatObject = {};
      }
      this.showChatInfo = false;
    },
    findChatGroupOrUserCallBack(data){
        this.chatListData=data.userlist;
        for(var i=0;i<data.grouplist.length;i++){
            this.chatListData.push(data.grouplist[i]);
        }
    },
    closeChatCreatePanel(val){
      if(val.state == 1){
         this.http.get("/chat/findSelfChatGroup",null,this.findSelfChatInfoCallBack,this,false);
      }
      this.showChatCreat = false;
    },
    closeChatSetPanel(val){
      if(val.state == 1){
         this.http.get("/chat/findSelfChatGroup",null,this.findSelfChatInfoCallBack,this,false);
      }else{
        this.showSetGroup = false;
      }
    }
  },
  created () {
    this.http.get("/chat/findChatGroupOrUser",{name:''},this.findChatGroupOrUserCallBack,this,false);
  },
  watch : {
      selectname:function(val) {
        this.chatInputChange();
      },
  }
}
</script>

<style scoped>
.chat_list_panel{
  height: calc(100% - 84px);
  margin: 82px 0 2px 2px;
  width: 297px;
  float: right;
  position: absolute;
  z-index: 3;
  right: 2px;
  /* background-color: rgba(14, 31, 98, 0.9); */
   background-color: #08385a;
  box-shadow: 0 0 3px 0 #1234ac;
}
.chat_list_panel_top{
  height: 30px;
  width: 297px;
}
.chat_topbar_class{
  cursor: pointer;
  width: 28px;
  height: 28px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.chat_topbar_class:hover{
  background-color: #10487e;
}
.chat_topbar_close_class{
  cursor: pointer;
  width: 28px;
  height: 28px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.chat_topbar_close_class:hover{
  background-color: #f94747;
}
.chat_list_panel_bottom{
  height: calc(100% - 30px);
  width: 297px;
}
.chat_userinfo{
    width: 100%;
    height: 57px;
}
.chat_user_icon{
  width: 57px;
  height: 57px;
  left: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.chat_username{
  left: 90px;
  margin-top: 18px;
  position: absolute;
  color: white;
  font-size: 18px;
}
.chat_select_input{
  position: relative;
  top: 17px;
  height: 40px;
  background-color: #10487e;
}
.select_input{
  height: 40px;
  color: #8ddbe8;
  background-color: #10487e;
  border: 0px;
  width: 85%;
  outline: 0;
  font-size: 14px;
  right: 0px;
  position: absolute;
}
.select_input::-webkit-input-placeholder{
  color:#8ddbe8;
  font-size:12px;
}
.select_icon{
    position:absolute;
    height: 29px;
    width: 29px;
    cursor: pointer;
    left: 10px;
    top: 4px;
    background:url(./../../assets/leftcontent/leftcontent_search.png)  center  no-repeat;
}
.select_icon:hover{
    position:absolute;
    height: 29px;
    width: 29px;
    cursor: pointer;
    left: 10px;
    top: 4px;
    background:url(./../../assets/leftcontent/leftcontent_search_hov.png)  center  no-repeat;
}
.chat_tables{
  position: relative;
  top: 17px;
  height: calc(100% - 142px);
}
.chat_table_list{
  height: 94%;
  width: 100%;
  overflow: auto;
  /* overflow-x: hidden; */
  position: relative;
}
.chat_list_select_users{
  float: left;
  cursor: pointer;
  width: 50%;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 14px;
  color: #8ddbe8;
  border-bottom: 1px solid #8ddbe8;
}
.chat_list_select_groups{
  float: left;
  cursor: pointer;
  width: 50%;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 14px;
  color: #8ddbe8;
  border-bottom: 1px solid #8ddbe8;
}
.chat_list_select:hover{
  color: white;
  border-bottom: 2px solid white;
}
.chat_add_group{
  height: 45px;
  position: absolute;
  right: 10px;
  line-height: 52px;
  cursor: pointer;
}
.chat_list_userinfo{
    width: 100%;
    height: 57px;
}
.chat_list_userinfo:hover{
    cursor: pointer;
    background-color: #10487e;
}
.chat_list_user_icon{
  width: 57px;
  height: 57px;
  left: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.chat_list_username{
  left: 90px;
  margin-top: 18px;
  position: absolute;
  color: white;
  font-size: 12px;
}
</style>
