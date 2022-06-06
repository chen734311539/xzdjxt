<template>
    <div class="chat_info_panel">
        <div class="chat_info_left_panel">
            <div v-for=" chatObj in  chatObjects" :key="chatObj.id"  @mouseover="mouseOver($event)" @mouseout="mouseOut($event)" class="chat_left_list_userinfo" :class="{chatObjectActive:(chatObj.id==currentChatObj.id)}">
              <div style="height: 100%;width:85%;float:left" @click="chooseChatObject(chatObj)">
                    <div class="chat_left_list_user_icon">
                        <img :src="getChatInfoIcon(chatObj)" style="border-radius: 50%;width:30px;height:30px;"/>
                    </div>
                    <div class="chat_left_list_username">
                        <span :title="chatObj.name">{{common.cutstr(chatObj.name,10)}}</span>
                    </div>
                    <div v-show="chatObj.num>0" class="chat_left_list_unreadnum">
                      <span style="position: relative;top: -3px;">{{chatObj.num}}</span>
                    </div>
              </div>
              <div class="chat_left_list_close_icon" @click="closeChatObject(chatObj)">
                  <img src="@/assets/chat/chat_left_close.png" style="top:16px;position: absolute;"/>
              </div>
            </div>
        </div>
        <div class="chat_info_right_panel">
            <div v-drag class="chat_info_right_header">
              <div class="chat_object_name">{{currentChatObj.name}}</div>
              <div class="chat_info_right_topbar_close" @click="closeChatInfoPanel">
                  <img src="@/assets/chat/chat_close.png"/>
              </div>
              <div class="chat_info_right_topbar" @click="closeChatInfoPanel">
                  <img src="@/assets/chat/chat_hide.png" style="width:15px;height:14px;"/>
              </div>
            </div>
            <div class="chat_info_right_window">
                <div v-for=" chatHistoryObj in chatHistoryList" :key="chatHistoryObj.id">
                    <div style="padding-top:30px;position: relative;min-height:75px;height:auto;" :class="{user_info_loc_right:chatHistoryObj.isself,user_info_loc_left:!chatHistoryObj.isself}">
                      <div :class="{user_info_right:chatHistoryObj.isself,user_info_left:!chatHistoryObj.isself}">
                        <img :src="getChatIcon(chatHistoryObj)" style="border-radius: 50%;width:40px;height:40px;" :class="{img_right:chatHistoryObj.isself,img_left:!chatHistoryObj.isself}"/>
                      </div>
                      <div :class="{triangle_right:chatHistoryObj.isself,triangle_left:!chatHistoryObj.isself}"/>
                      <div :class="{content_info_right:chatHistoryObj.isself,content_info_left:!chatHistoryObj.isself}">
                        <div :class="{content_infouser_right:chatHistoryObj.isself,content_infouser_left:!chatHistoryObj.isself}">
                          <span>{{chatHistoryObj.insertusername}}</span>
                          <span>{{chatHistoryObj.inserttime}}</span>
                        </div>
                        <div :class="{content_infotext_right:chatHistoryObj.isself,content_infotext_left:!chatHistoryObj.isself}">
                          <span style="float: right;margin: 6px;position: relative;">{{chatHistoryObj.message}}
                          <el-image v-for="fileObj in chatHistoryObj.file" :key="fileObj.filename.split('.')[0]" style="max-width: 200px; max-height: 150px;" :src="getChatFile(fileObj)" :preview-src-list="[getChatFile(fileObj)]"></el-image>
                          </span>
                        </div>
                      </div>
                      <div style='clear:both'/>
                    </div>
                </div>
            </div>
            <div class="chat_info_right_optionbar">
                <div class="chat_info_right_chose_file">
                    <el-upload  style="padding-top: 5px;position: absolute;" ref="upload" :before-upload="beforeUploadPicture"
                        action="" :show-file-list="false" accept=".png,.ico,.bmp,.jpg,.gif,.jpeg,.ufo">
                            <img src="@/assets/chat/chat_chose_file.png" style="width:25px;height:19px;"/>
                    </el-upload>
                </div>
                <div class="chat_info_right_history">
                    <img src="@/assets/chat/chat_history.png" style="width:25px;height:19px;"/>
                </div>
            </div>
            <div class="chat_info_right_inputarea">
              <div class="chat_info_right_content" ref="chatmsgdiv" placeholder="输入消息..." contenteditable="true">
              </div>
              <div class="chat_info_rihgt_btn">
                <button class="chat_info_right_closecontent" @click="closeChatInfoPanel">关闭</button>
                <button class="chat_info_right_sendcontent" @click="sendChatMsg">{{sendTypeLabel}}</button>
                <button class="chat_info_right_sendarrow" @click="showSendArrow">
                  <div style="border-left: 1px solid #08385a;">
                      <img src="@/assets/chat/chat_send_arrow.png"/>
                  </div>
                </button>
                <div v-show="sendArrowShow" class="chat_info_arrow">
                  <div class="chat_into_type_top" @click="chooseSendType(1)">发送消息</div>
                  <div class="chat_into_type" @click="chooseSendType(2)">发送指令</div>
                  <div class="chat_into_type" @click="chooseSendType(3)">发送短信</div>
                </div>
              </div>
            </div>
        </div>
        <div v-show="showGroupUsers" class="chat_group_user">
          <div class="chat_group_user_heard">
            <div class="chat_group_user_icon">
                <img src="@/assets/chat/chat_qun.png" style="width:16px;height:14px;"/>
            </div>
            <div class="chat_group_user_num">
                <span>成员数{{groupMumberList.length}}人</span>
            </div>
          </div>
          <div class="chat_group_user_info">
              <div v-for=" groupUserObj in  groupMumberList" :key="'grouplist'+groupUserObj.usercode"  
                 class="chat_group_userinfo">
                <div style="height: 100%;width:100%;float:left" @click="chooseGroupChatObject(groupUserObj)">
                      <div class="chat_groupuser_icon">
                          <img :src="getChatInfoIcon(groupUserObj)" style="border-radius: 50%;width:30px;height:30px;"/>
                      </div>
                      <div class="chat_group_username">
                          <span>{{groupUserObj.username}}</span>
                      </div>
                </div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"

export default {
  name: 'ChatInfoPanel',
  props:['chatObject'],
  data () {
    return {
      sendArrowShow:false,
      sendTypeLabel:'发送 / 消息',
      sendType:'1',
      chatMsg:'',
      chatObjects:[],
      currentChatObj:{},
      chatHistoryList:[],
      uploadFileList:[],
      groupMumberList:[],
      showGroupUsers:false,
    }
  },
  computed: {...mapState({
      pushChat: state => state.push.chat,
      userInfo: state => state.userInfo,
     }),
  },
  methods:{
    closeChatInfoPanel(){
      var obj = {};
      obj.state = false;
      obj.clear = false;
      this.$emit("close-chatInfoPanel",obj);
    },
    chooseChatObject(obj){
      obj.num = 0;
      this.currentChatObj = obj;
    },
    chooseGroupChatObject(obj){
      if(obj.usercode == this.userInfo.usercode){
          return;
      }
      obj.num = 0;
      obj.id = obj.usercode;
      obj.name = obj.username;
      obj.state = '2';
      this.currentChatObj = obj;
    },
    getChatInfoIcon(obj){//获取列表聊天对象图标
       if(obj.state=='1'){
          return require("@/assets/chat/chat_group.png");
       }else{
           if(obj.newavatar){
               return Constants.file_url+obj.newavatar;
           }else if(obj.touseravatar){
               return Constants.file_url+obj.touseravatar;
           }else{
               return require("@/assets/chat/chat_user.png");
           }
       }
    },
    getChatIcon(obj){//获取列表聊天对象图标
      if(obj.newavatar){
          return Constants.file_url+obj.newavatar;
      }else{
          return require("@/assets/chat/chat_user.png");
      }
    },
    getChatFile(obj){//获取列表聊天文件
      return Constants.file_url+obj.fileurl;
    },
    closeChatObject(obj){
      var newChatObjects = [];
      for(var i=0;i<this.chatObjects.length;i++){
          if(obj.id != this.chatObjects[i].id){
              newChatObjects.push(this.chatObjects[i]);
          }
      }
      this.chatObjects = newChatObjects;
      if(newChatObjects.length==0){
        var obj = {};
        obj.state = false;
        obj.clear = true;
        this.currentChatObj = {};
        this.$emit("close-chatInfoPanel",obj);
        return;
      }
      if(obj.id==this.currentChatObj.id){
          this.currentChatObj = this.chatObjects[newChatObjects.length-1];
      }
    },
    mouseOver(e){
      var el = e.currentTarget;
      $(el).children()[1].style.display='block';
    },
    mouseOut(e){
      var el = e.currentTarget;
      $(el).children()[1].style.display='none';
    },
    showSendArrow(){
      if(this.sendArrowShow){
        this.sendArrowShow = false;
      }else{
        this.sendArrowShow = true;
      }
    },
    chooseSendType(val){
        if(val==1){
          this.sendTypeLabel = "发送 / 消息";
          this.sendType = '1';
        }
        if(val==2){
          this.sendTypeLabel = "发送 / 指令";
          this.sendType = '2';
        }
        if(val==3){
          this.sendTypeLabel = "发送 / 短信";
          this.sendType = '3';
        }
        this.sendArrowShow = false;
     },
     getChatHistory(){
        var param = {};
        if(this.currentChatObj.state==1){//组
            param.state = "1";
            param.groupid = this.currentChatObj.id;
        }else{//人
            param.state = "2";
            param.usercode = this.currentChatObj.id;
            param.insertusercode = this.userInfo.usercode;
        }
        this.http.get("/chat/getChatHistory",param,this.getChatHistoryCallBack,this,false);
     },
     getChatHistoryCallBack(data){
         var newarr=[];
         for(var i=data.list.length-1;i>=0;i--){
             if(data.list[i].insertusercode == this.userInfo.usercode){
                 data.list[i].isself = true;
             }else{
                 data.list[i].isself = false;
             }
             newarr.push(data.list[i]);
         }
         this.chatHistoryList = newarr;
     },
    beforeUploadPicture(file){
      var src = window.URL.createObjectURL(file);
      var tmpfileid = src.split('/')[3];
      file.fileid = tmpfileid;
      var imgTmp = "<span fileid='"+tmpfileid+"'><img src='"+src+"' alt style='max-width:50px;max-height:50px;'/></span>";
      var div = this.$refs.chatmsgdiv;
      $(div).append(imgTmp);
      this.uploadFileList.push(file);
      return false;
    },
     sendChatMsg(){
        var div = this.$refs.chatmsgdiv;
        if($(div).find('span').length==0&&div.innerText==''){//无内容则不发送
           this.$Message.error("请先输入聊天信息");
           return;
        }
        var that = this;
        //发送信息
        var paramObj= {};
        paramObj.state = this.currentChatObj.state;//1是组，2是对人发
        paramObj.name = this.currentChatObj.name;
        paramObj.sendtype = "1";//发送消息的方式1表示仅消息发送，2表示消息加短息发送,3表示是指令加短信，4表示只发指令
        paramObj.message = div.innerText;
        if(this.currentChatObj.state=="1"){//组
            paramObj.groupid = this.currentChatObj.id;
        }else{//人
            paramObj.usercode = this.currentChatObj.id;
        }
        paramObj.uitype = "1";//type 1字 2 图片
        let formData = new FormData();
        $(div).find('span').each(function(){
            var fileid = $(this).attr("fileid");
            for(var i=0;i<that.uploadFileList.length;i++){
               if(that.uploadFileList[i].fileid==fileid){
                 formData.append(that.uploadFileList[i].fileid,that.uploadFileList[i]);
               }
            }
        });
        this.http.filePost("/chat/sendChatMsg",formData,paramObj,this.sendChatMsgCallBack,this,false);//发送请求
     },
     sendChatMsgCallBack(data){
       this.$refs.chatmsgdiv.innerHTML="";//发送完毕清空输入框里的所有
       this.uploadFileList = [];
       if(data.insertusercode == this.userInfo.usercode){
            data.isself = true;
       }else{
            data.isself = false;
       }
       this.chatHistoryList.push(data);
       setTimeout(function(){
         $(".chat_info_right_window")[0].scrollTop = $(".chat_info_right_window")[0].scrollHeight;
       }, 150);
     },
     getChatGroupUserByGroupidCallBack(data){
        this.groupMumberList = data;
     }
  },
  created(){

  },
  directives:{//拖拽div
    drag(elment,bindings){
        if(!elment.parentNode){
          return;
        }
        var el = elment.parentNode.parentNode;
        elment.onmousedown = function(e){
            var disx = e.pageX - el.offsetLeft;
            var disy = e.pageY - el.offsetTop;
            document.onmousemove = function (e){
                el.style.left = e.pageX - disx+'px';
                el.style.top = e.pageY - disy+'px';
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            }
        }
    },
  },
  watch : {
      chatObject:function(val) {
        if(!val.id){
           return;
        }
        this.currentChatObj = val;
      },
      currentChatObj:function(val){
        if(!val.id){
           return;
        }
        val.num = 0;
        if(this.chatObjects.length == 0){
            this.chatObjects.push(val);
        }else{
             var flag = false;
             for(var i=0;i<this.chatObjects.length;i++){
                if(val.id == this.chatObjects[i].id){
                      flag = true;
                      break;
                }
             }
             if(!flag){
                this.chatObjects.push(val);
             }
        }
         this.getChatHistory();
         if(val.state=='1'){
            this.showGroupUsers = true;
            this.http.get("/chat/getChatGroupUserByGroupid",{groupid:val.id},this.getChatGroupUserByGroupidCallBack,this,false);
         }else{
            this.showGroupUsers = false;
         }
         setTimeout(function(){
            $(".chat_info_right_window")[0].scrollTop = $(".chat_info_right_window")[0].scrollHeight;
         }, 150);
      },
      pushChat:function(val){
        var pushid = '';
         if(val.state=='1'){//群组消息
            pushid = val.groupid;
         }else{//个人消息
            pushid = val.insertusercode;
         }
         if(pushid == this.currentChatObj.id){
           this.sendChatMsgCallBack(val);
         }else{
           for(var i=0;i<this.chatObjects.length;i++){
                if(this.chatObjects[i].id == pushid){
                    this.chatObjects[i].num = this.chatObjects[i].num+1;
                    this.$forceUpdate();
                }
           }
         }
      }
  }
}
</script>

<style scoped>
.chat_info_panel{
   position: absolute;
   bottom: 10%;
   left: -355%;
   height: 571px;
   width: 859px;
   background: #08385a;
   box-shadow: 0 0 3px 0 #1234ac;
}
.chat_info_left_panel{
  width: 140px;
  height: 571px;
  float: left;
  background: #10487e;
  position: absolute;
  border-right:#08385a 1px solid;
  box-shadow:0 0 0 #08385a;
  overflow: auto;
  overflow-x: hidden;
}
.chat_left_list_userinfo{
  cursor: pointer;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #08385a;
}
.chatObjectActive{
    cursor: pointer;
    background-color: #08385a;
}
.chat_left_list_user_icon{
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.chat_left_list_username{
  left: 50px;
  margin-top: 15px;
  position: absolute;
  color: white;
  font-size: 12px;
}
.chat_left_list_unreadnum{
  left: 34px;
  background: red;
  width: 24px;
  border: 1px solid;
  height: 14px;
  border-radius: 28%;
  text-align: center;
  margin-top: 3px;
  position: absolute;
  color: white;
  font-size: 12px;
}
.chat_left_list_close_icon{
  position: relative;
  width: 15%;
  float: left;
  height: 100%;
  display: none;
}
.chat_info_right_panel{
  width: 719px;
  height: 571px;
  float: left;
  left: 140px;
  position: absolute;
}
.chat_info_right_header{
  height: 36px;
  background: #10487e;
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
.chat_info_right_topbar{
  cursor: pointer;
  width: 36px;
  height: 36px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.chat_info_right_topbar:hover{
  background-color: #08385a;
}
.chat_right_list_user_icon{
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
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
.chat_info_right_window{
    height: 370px;
    overflow:auto;
    overflow-x: hidden;
}
.user_info_loc_left{
  left: 15px;
}
.user_info_loc_right{
  right: 15px;
}
.chat_info_right_optionbar{
    height: 36px;
    background: #10487e;
}
.chat_info_right_inputarea{
    height: 130px;
}
.chat_info_right_chose_file{
  float: left;
  width: 41px;
  height: 36px;
  left: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.chat_info_right_chose_file:hover{
  cursor: pointer;
  background-color: #08385a;
}
.chat_info_right_history{
  float: left;
  width: 41px;
  height: 36px;
  left: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.chat_info_right_history:hover{
  cursor: pointer;
  background-color: #08385a;
}
.chat_info_right_content{
  background: #08385a;
  outline: 0px;
  height: 84px;
  width: 700px;
  resize: none;
  border: 0px;
  left: 19px;
  padding-top: 15px;
  color: white;
  overflow: auto;
  overflow-x: hidden;
  position: absolute;
}
/* .chat_info_right_content::-webkit-input-placeholder{
  color:#3d92d3;
} */
.chat_info_right_content:empty:before{
  content: attr(placeholder);
  color:#3d92d3;
}
.chat_info_right_content:focus:before{
 content:none;
}
.chat_info_rihgt_btn{
  position: absolute;
  margin-top: 84px;
  right: 20px;
  height: 30px;
}
.chat_info_right_closecontent{
  height: 30px;
  width: 80px;
  outline: 0px;
  cursor: pointer;
  background: #08385a;
  border: 2px solid;
  border-color: #2b97ea;
  color: #83c9ff;
  margin-right: 13px;
}
.chat_info_right_sendcontent{
  height: 30px;
  width: 80px;
  outline: 0px;
  cursor: pointer;
  background: #10487e;
  border: 0px;
  color: white;
}
.chat_info_right_sendarrow{
  height: 30px;
  width: 30px;
  outline: 0px;
  cursor: pointer;
  background: #10487e;
  border: 0px;
  margin-left: -4px;
}
.chat_info_arrow{
  background: #10487e;
  height: 67px;
  width: 74px;
  text-align: center;
  top: 24px;
  color: white;
  position: absolute;
  right: -47px;
}
.chat_into_type_top{
  height: 20px;
  margin-top: 5px;
}
.chat_into_type_top:hover{
  cursor: pointer;
  background: #83c9ff;
}
.chat_into_type{
  height: 20px;
}
.chat_into_type:hover{
  cursor: pointer;
  background: #83c9ff;
}
.user_info_left{
  height: 40px;
  width: 40px;
  float: left;
  background: #657DFE;
}
.content_info_left{
  float: left;
  color: white;
  max-width: 510px;
  position: relative;
}
.content_infouser_left{
  height: 20px;
  top: -15px;
  position: relative;
}
.content_infotext_left{
  float: left;
  color: white;
  top: -16px;
  border-radius: 8px;
  word-break: break-all;
  width:fit-content;
  width:-webkit-fit-content;
  width:-moz-fit-content;
  min-height: 40px;
  min-width: 25px;
  max-width: 510px;
  background: #657DFE;
  position: relative;
}
.triangle_left{
  width: 10px;
  height: 10px;
  top: 10px;
  float: left;
  position: relative;
  border-top: 1px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 9px solid #657DFE;
}
.user_info_right{
  height: 40px;
  width: 40px;
  float: right;
  background: #10487e;
}
.content_info_right{
  float: right;
  color: white;
  max-width: 510px;
  position: relative;
}
.content_infouser_right{
  height: 20px;
  top: -15px;
  text-align: right;
  position: relative;
}
.content_infotext_right{
  float: right;
  color: white;
  top: -16px;
  border-radius: 8px;
  word-break: break-all;
  width:fit-content;
  width:-webkit-fit-content;
  width:-moz-fit-content;
  min-height: 40px;
  min-width: 25px;
  max-width: 510px;
  background: #10487e;
  position: relative;
}
.triangle_right{
  height: 10px;
  width: 10px;
  top: 10px;
  float: right;
  position: relative;
  border-top: 1px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 9px solid #10487e;
}
.chat_group_user{
  width: 150px;
  height: 571px;
  background: red;
  float: right;
  right: -150px;
  background: #10487e;
  border-left:#08385a 1px solid;
  box-shadow:0 0 0 #08385a;
  position: relative;
}
.chat_group_user_heard{
  background: #08385a;
  height: 36px;
}
.chat_group_user_info{
  width: 100%;
  height: 535px;
  overflow: auto;
  overflow-x: hidden;
  position: absolute;
}
.chat_group_user_icon{
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.chat_group_user_num{
  left: 40px;
  margin-top: 10px;
  position: absolute;
  color: white;
  font-size: 12px;
}
.chat_group_userinfo{
  cursor: pointer;
  width: 100%;
  height: 40px;
}
.chat_group_userinfo:hover{
  background: #657DFE;
}
.chat_groupuser_icon{
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.chat_group_username{
  left: 50px;
  margin-top: 10px;
  position: absolute;
  color: white;
  font-size: 12px;
}
</style>
