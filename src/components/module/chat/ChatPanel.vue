<template>
    <div class="chatPanel">
        <div class="herder">
            <span class="herder_name">{{curPanel.name}}</span>
            <Icon v-show="curPanelId!=''&&curPanel.state=='1'" class="herder_manage" type="ios-settings" @click="showEditGroupModal"/>
            <Icon class="herder_add" type="md-add" @click="showAddGroupModal"/>
        </div>
        <div class="chatcontent">
            <div class="chatLeftPanel">
                <div ref="chatLeftPanel" class="chatLeftUpPanel">
                    <div v-show="chatPanelObj.id==curPanelId" class="chat" v-for="chatPanelObj in chatPanelList" :key="chatPanelObj.id">
                        <el-scrollbar :wrapClass="'wrapClass'+chatPanelObj.id">
                            <ChatItem v-for="obj in chatPanelObj.textlist" :key="obj.id" :data="obj"/>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="chatLeftMiddlePanel">
                        <Upload v-show="curPanelId!=''" class="uploadPicture" :before-upload="beforeUploadPicture"	:on-success="uploadPictureSuccess" 
                        :on-error="uploadPictureError" :action="uploadAction" accept=".png,.ico,.bmp,.jpg,.gif,.jpeg,.ufo">
                            <Icon class="uploadPictureIcon" custom="iconfont icontupian"/>
                        </Upload>
                       <Icon v-show="curPanelId!=''" class="msgHistoryIcon" custom="iconfont iconjiaotianjilu" @click="showHistoryModal"/>
                </div>
                <div class="chatLeftDownPanel">
                    <textarea class="sendtextarea" v-model="text"></textarea>
                    <div  class="sendBar">
                        <Button v-show="curPanelId!=''" class="sendButton" type="primary" size="small" style="width:64px;" @click="sendMessage">发送</Button>
                    </div>
                    
                </div>
            </div>
            <div class="chatRightPanel">
                <div class="chatRightUpPanel">
                    <InputSearch class="seachbar_InputSearch" @on-click="inputSearch" :showClose="true" :changeShowClose="true" @on-change="inputSearchChange" @on-clear="inputSearchClear"/>
                    <div v-show="!isSearch" class="groupPanel">
                        <el-scrollbar>
                            <ChatGroup :class="{chatGroupActive:(groupObj.id==curPanelId)}" v-for="groupObj in groupList" :key="groupObj.id" :data="groupObj" @on-click="clickGroup" @on-close="closeGroup" :closeEnable="true" :showUnReead="true"/>
                         </el-scrollbar>
                    </div>
                    <div v-show="isSearch" class="groupSearchPanel">
                        <el-scrollbar>
                            <ChatGroup v-for="groupObj in groupSelectList" :key="groupObj.id" :data="groupObj" @on-click="clickSelectGroup" :closeEnable="false"/>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="chatRightMiddlePanel">
                     成员数({{groupMumberList.length}})
                </div>
                <div class="chatRightDownPanel">
                    <el-scrollbar>
                        <ChatMember v-for="obj in groupMumberList" :key="obj.usercode" :data="obj" @on-click="clickMember"/>
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <Modal title="创建组" v-model="showAdd" class-name="modal_style" :draggable="true" width="400">
            <div slot="header">
                <span style="font-weight:700;font-size:14px;">创建组</span>
                <input v-model="addGroupName" class="inputClass"/>
            </div>
            <UserTransfer v-if="loadAdd" @on-change="userTransferChange"/>
          <div slot="footer">
            <Button type="text" size="large" @click="hideAddGroupModal">取消</Button>
            <Button type="primary" size="large" @click="addGroup">确定</Button>
          </div>
        </Modal>
        <Modal title="管理组" v-model="showEdit" class-name="modal_style" :draggable="true" width="400" @on-cancel="hideEditGroupModal">
            <div slot="header">
                <span style="font-weight:700;font-size:14px;">修改组</span>
                <input v-model="editGroupName" class="inputClass"/>
            </div>
            <UserTransfer v-if="loadEdit" @on-change="userEditTransferChange" :oriSelectUsers="groupMumberList"/>
          <div slot="footer">
            <Button type="text" size="large" @click="hideEditGroupModal">取消</Button>
            <Button type="primary" size="large" @click="editGroup">确定</Button>
          </div>
        </Modal>

        <Modal title="历史记录" v-model="showHistory" class-name="modal_style" :draggable="true" width="550">
            <div slot="header">
                <span style="font-weight:700;font-size:14px;">{{curPanel.name}}</span>
            </div>
           <InputSearch class="seachbar_InputSearch" v-model="historySearchName" @on-click="inputSearchHistory" :showClose="true" :changeShowClose="true" @on-change="inputSearchChangeHistory" @on-clear="inputSearchClearHistory"/>
           <div class="historyPanel">
                 <el-scrollbar>
                     <ChatItemHistory v-for="historyObj in historyList" :key="historyObj.id" :data="historyObj"/>
                 </el-scrollbar>
           </div>
           <Pager class="pagebar" :totalSize="historyTotalSize" :pageSize="historyPagesize" @on-change="pageChange" :nowPage="historyPage"/>
          <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import InputSearch from '@/components/base/InputSearch'
import UserTransfer from '@/components/base/UserTransfer'
import Pager from '@/components/base/Pager'
import ChatGroup from '@/components/module/chat/ChatGroup'
import ChatMember from '@/components/module/chat/ChatMember'
import ChatItem from '@/components/module/chat/ChatItem'
import ChatItemHistory from '@/components/module/chat/ChatItemHistory'

export default {
  name: 'ChatPanel',
  components: {InputSearch,ChatGroup,ChatMember,UserTransfer,ChatItem,ChatItemHistory,Pager },
  data () {
    return {
        loadAdd:false,
        showAdd:false,//add group modal
        loadEdit:false,
        showEdit:false,
        isSearch:false,
        addSelectUsers:[],//
        addGroupName:"",
        editSelectUsers:[],//
        editGroupName:"",
        groupList:[],
        groupMumberList:[],
        groupSelectList:[],
        curPanel:{},//目前的聊天框信息
        curPanelId:"",//目前的聊天框Id groupid或usercode
        chatPanelList:[],
        text:"",//发送信息
        uploadAction:"",//发送图片的路径
        showHistory:false,
        historyInput:"",//历史消息中的搜索
        historyList:[],
        historyPage:1,
        historyPagesize:10,
        historyTotalSize:1,
        historySearchName:""
    }
  },
  computed: {...mapState({
      pushChat: state => state.push.chat,
      userInfo: state => state.userInfo,
      unReadMap: state => state.chat.unReadMap //未读消息
  }),
    // uploadPictureAction:function(){
    //     return Constants.url_prefix+"/chat/sendChatMsg";
    // }
  },
  methods:{
      inputSearch(value){
          this.inputSearchChange(value);
      },
      inputSearchChange(val){
          this.isSearch = true;
          if(val==""){//去掉搜索列表
            this.inputSearchClear();
          }else{//搜索列表暂时
            this.http.get("/chat/findChatGroupOrUser",{name:val},this.findChatGroupOrUserCallBack,this,false);
          }
      },
      findChatGroupOrUserCallBack(data){
          this.groupSelectList = [];
          this.groupSelectList = this.groupSelectList.concat(data.grouplist,data.userlist);
      },
      inputSearchClear(){//去掉搜索列表
        this.isSearch = false;
      },
      clickGroup(data){//点击组
        if(data.state=="1"){//组
            this.http.get("/chat/getChatGroupUserByGroupid",{groupid:data.id},this.getChatGroupUserByGroupidCallBack,this,false);
        }else{//人
            this.groupMumberList = [];
        }
        this.curPanel = data;
        this.curPanelId = data.id;
        var find = false;
        var clickTextList = [];
        for(var i=0;i<this.chatPanelList.length;i++){
            if(this.chatPanelList[i].id==data.id){
                find=true;
                clickTextList = this.chatPanelList[i].textlist;
                break;
            }
        }
        if(!find){
            var obj = {};
            obj.id = data.id;
            obj.textlist = [];
            this.chatPanelList.push(obj);
        }
        this.hideEditGroupModal();//如果有修改页面先暂时去掉
        this.showHistory = false;
        
        //滚动条到最下面
        var aa = this.curPanelId;
        var that = this;
        setTimeout(function(){
            var myDiv =  $(that.$refs.chatLeftPanel).find(".wrapClass"+aa)[0];
            myDiv.scrollTop = myDiv.scrollHeight;
        }, 100);

        //去掉未读消息
        var unredObj = Object.assign({},this.unReadMap);
        if(unredObj[data.id]){
            unredObj[data.id] = 0;
        }
        this.$store.dispatch('putChildState',{"key":"chat","childkey":"unReadMap","value":unredObj});

        if(clickTextList.length==0){//没有聊天记录就先获取历史记录
            var param = {};
            if(this.curPanel.state==1){//组
                param.state = "1";
                param.groupid = this.curPanelId;
            }else{//人
                param.state = "2";
                param.usercode = this.curPanelId;
                param.insertusercode = this.userInfo.usercode;
            }
            this.http.get("/chat/getChatHistory",param,this.getChatHistoryCallBack,this,false);
        }

      },
      getChatHistoryCallBack(data){
           var clickTextList = [];
            for(var i=0;i<this.chatPanelList.length;i++){
                if(this.chatPanelList[i].id==this.curPanelId){
                    clickTextList = this.chatPanelList[i].textlist;
                    break;
                }
            }
          for(var i=data.list.length-1;i>=0;i--){
               var dataObj = data.list[i];
                var obj = {};
                obj.id = dataObj.id;
                var type="1";
                if(dataObj.haspicture>0){
                    type = "2";
                }
                if(type=="1"){//字
                    obj.type = "1";//type 1字 2 图片
                    obj.text = dataObj.message;
                }else if(type=="2"){
                    obj.type = "2";//type 1字 2 图片
                    obj.picture = Constants.file_url+dataObj.file[0].fileurl;
                }
                if(dataObj.insertusercode==this.userInfo.usercode){
                    obj.isMy = true;
                }else{
                     obj.isMy = false;
                }
                obj.inserttime = dataObj.inserttime;
                obj.insertusername = dataObj.insertusername;
                clickTextList.push(obj);
          }
        
      },
      clickSelectGroup(data){
          this.isSearch = false;
          var exist = false;
          for(var i=0;i<this.groupList.length;i++){
              if(this.groupList[i].id==data.id){
                  exist = true;
                  break;
              }
          }
          if(!exist){
              this.groupList.push(data);
          }
          this.clickGroup(data);

      },
      clickMember(data){
          var exist = false;
          var dataObj = {};
          dataObj.id = data.usercode;
          dataObj.name = data.username;
          dataObj.usercode = data.usercode;
          dataObj.username = data.username;
          dataObj.deptname = data.deptname;
          dataObj.state = "2";
          for(var i=0;i<this.groupList.length;i++){
              if(this.groupList[i].id==dataObj.id){
                  exist = true;
                  break;
              }
          }
          if(!exist){
              this.groupList.push(dataObj);
          }
          this.clickGroup(dataObj);
      },
      getChatGroupUserByGroupidCallBack(data){
          this.groupMumberList = data;
      },
      closeGroup(data){//关闭组,如果当前的组关闭，则清空；聊天内容
        if(data.id==this.curPanelId){
            this.groupMumberList = [];
            this.curPanel={};
            this.curPanelId="";
        }
      },
      showAddGroupModal(){
          if(!this.loadAdd){
              this.loadAdd = true;
          }
          this.showAdd = true;
      },
      hideAddGroupModal(){
          this.showAdd = false;
      },
      showEditGroupModal(){
          if(this.curPanelId==""){
              this.$Message.error("请先选择一个组");
              return;
          }
          if(this.curPanel.state=="2"){
              this.$Message.error("请先选择一个组");
              return;
          }
          if(!this.loadEdit){
              this.loadEdit = true;
          }
          this.showEdit = true;
          this.editGroupName = this.curPanel.name;
      },
      hideEditGroupModal(){
          this.showEdit = false;
          this.loadEdit = false;
      },
      addGroup(){
         if(this.addGroupName==""){
             this.$Message.error("组名称不能为空");
             return;
         }
         if(this.addSelectUsers.length==0){
             this.$Message.error("组员不能为空");
             return;
         }
         var paramObj = {};
         paramObj.name = this.addGroupName;
         var users = [];
         paramObj.users = users;
         for(var i=0;i<this.addSelectUsers.length;i++){
             users.push(this.addSelectUsers[i].usercode);
         }
         this.http.get("/chat/saveChatGroup",paramObj,this.saveChatGroupCallBack,this,false);
      },
      editGroup(){
          if(this.editGroupName==""){
             this.$Message.error("组名称不能为空");
             return;
         }
         if(this.editSelectUsers.length==0){
             this.$Message.error("组员不能为空");
             return;
         }
         var paramObj = {};
         paramObj.name = this.editGroupName;
         var users = [];
         paramObj.users = users;
         paramObj.groupid = this.curPanelId;
         for(var i=0;i<this.editSelectUsers.length;i++){
             users.push(this.editSelectUsers[i].usercode);
         }
         this.http.get("/chat/saveChatGroup",paramObj,this.editChatGroupCallBack,this,false);
      },
      saveChatGroupCallBack(data){
          this.showAdd = false;
          //刷新组列表
          this.http.get("/chat/findSelfChatGroup",null,this.findSelfChatGroupCallBack,this,false);
      },
      editChatGroupCallBack(data){
          this.showEdit = false;
          this.loadEdit = false;
          this.curPanel.name = this.editGroupName;
          this.http.get("/chat/findSelfChatGroup",null,this.findSelfChatGroupCallBack,this,false);
          this.http.get("/chat/getChatGroupUserByGroupid",{groupid:this.curPanelId},this.getChatGroupUserByGroupidCallBack,this,false);
      },
      userTransferChange(userList){
          this.addSelectUsers = userList;
      },
      userEditTransferChange(userList){
          this.editSelectUsers = userList;
      },
      findSelfChatGroupCallBack(data){
          this.groupList=data;
      },
      sendMessage(){
          if(this.text==""){
              return;
          }
          if(this.curPanelId==null||this.curPanelId==undefined||this.curPanelId==""){
              this.$Message.error("请先选择组或人员");
              return;
          }
            //发送信息
            var paramObj= {};
            paramObj.state = this.curPanel.state;//1是组，2是对人发
            paramObj.name = this.curPanel.name;
            paramObj.sendtype = "1";//发送消息的方式1表示仅消息发送，2表示消息加短息发送,3表示是指令加短信，4表示只发指令
            paramObj.message = this.text;
            if(this.curPanel.state=="1"){//组
                paramObj.groupid = this.curPanel.id;
            }else{//人
                paramObj.usercode = this.curPanel.id;
            }
            paramObj.uitype = "1";//type 1字 2 图片
            this.http.post("/chat/sendChatMsg",paramObj,this.sendChatMsgCallBack,this,false);
      },
      sendChatMsgCallBack(data){
          this.addMsgToChatPanel(data,"1");
          this.text = "";
      },
      addMsgToChatPanel(data,type){
          var state = data.state;
          var key = "";
          if(state=="1"){
              key = data.groupid;
          }else{
              key = data.usercode;
          }
          for(var i=0;i<this.chatPanelList.length;i++){
            if(this.chatPanelList[i].id==key){
                var textlist = this.chatPanelList[i].textlist;
                var obj = {};
                obj.id = data.id;
                if(type=="1"){//字
                    obj.type = "1";//type 1字 2 图片
                    obj.text = data.message;
                }else if(type=="2"){
                    obj.type = "2";//type 1字 2 图片
                    obj.picture = Constants.file_url+data.file[0].fileurl;
                }
                obj.isMy = true;
                obj.inserttime = data.inserttime;
                obj.insertusername = data.insertusername;
                textlist.push(obj);

                //滚动条到最下面
                var that = this;
                setTimeout(function(){
                    var myDiv =  $(that.$refs.chatLeftPanel).find(".wrapClass"+key)[0];
                    myDiv.scrollTop = myDiv.scrollHeight;
                }, 100);
                break;
            }
          }
      },
    uploadPictureSuccess(response, file, fileList){
        if(response.code==1){
            this.$Message.success("上传成功");
            this.addMsgToChatPanel(response.data,"2");
        }else if(response.code==0){
            this.$Message.error(response.data);
        }
    },
    uploadPictureError(error, file, fileList){
        this.$Message.error("上传失败");
    },
    beforeUploadPicture(file){
        if(this.curPanelId==null||this.curPanelId==undefined||this.curPanelId==""){
              this.$Message.error("请先选择组或人员");
              return false;
        }
        var filename = file.name.split(".");
        if(filename==null || filename==undefined || filename.length<2){
            this.$Message.error("请选择正确的图片");
            return false;
        }
        var endName = filename[filename.length-1].toLocaleLowerCase();
        //.png,.ico,.bmp,.jpg,.gif,.jpeg,.ufo
        if(endName!="png"&&endName!="ico"&&endName!="bmp"&&endName!="jpg"&&endName!="gif"&&endName!="jpeg"&&endName!="ufo" ){
            this.$Message.error("请选择正确的图片");
            return false;
        }

        this.uploadAction = Constants.url_prefix+"/chat/sendChatMsg";
        //发送信息
        var param = {};
        param.state = this.curPanel.state;//1是组，2是对人发
        param.name = this.curPanel.name;
        param.sendtype = "1";//发送消息的方式1表示仅消息发送，2表示消息加短息发送,3表示是指令加短信，4表示只发指令
        param.message = this.text;
        if(this.curPanel.state=="1"){//组
            param.groupid = this.curPanel.id;
        }else{//人
            param.usercode = this.curPanel.id;
        }
        param.uitype = "2";//type 1字 2 图片
        var sessionId = this.common.getSessionId();
        this.uploadAction = this.uploadAction + "?param="+JSON.stringify(param)+"&sessionId="+sessionId;
        let promise = new Promise((resolve) => {
                this.$nextTick(function () {
                    resolve(true);
                });
            });
        return promise; //通过返回一个promis对象解决 
    },
    showHistoryModal(){
        this.historyPage = 1;
        this.historySearchName = "";
        this.showHistory = true;
        this.searchHistory();
    },
    searchHistory(){
        var param = {};
        if(this.curPanel.state==1){//组
            param.state = "1";
            param.groupid = this.curPanelId;
        }else{//人
            param.state = "2";
            param.usercode = this.curPanelId;
            param.insertusercode = this.userInfo.usercode;
        }
        param.page = this.historyPage;
        param.pagesize = this.historyPagesize;
        param.searchtxt = this.historySearchName;
        this.http.get("/chat/getChatHistory",param,this.getChatHistoryInHistoryPanelCallBack,this,false);
    },
    getChatHistoryInHistoryPanelCallBack(data){
        this.historyTotalSize = data.count;
        this.historyList = [];
         for(var i=0;i<data.list.length;i++){
               var dataObj = data.list[i];
                var obj = {};
                obj.id = dataObj.id;
                var type="1";
                if(dataObj.haspicture>0){
                    type = "2";
                }
                if(type=="1"){//字
                    obj.type = "1";//type 1字 2 图片
                    obj.text = dataObj.message;
                }else if(type=="2"){
                    obj.type = "2";//type 1字 2 图片
                    obj.picture = Constants.file_url+dataObj.file[0].fileurl;
                }
                obj.inserttime = dataObj.inserttime;
                obj.insertusername = dataObj.insertusername;
                this.historyList.push(obj);
          }
    },
    pageChange(page){
        this.historyPage = page;
        this.searchHistory();
    },
    inputSearchHistory(value){
        this.inputSearchChangeHistory(value);
    },
    inputSearchChangeHistory(val){
        if(val==""){//去掉搜索列表
          this.inputSearchClearHistory();
        }else{//搜索列表暂时
          this.historyPage = 1;
          this.searchHistory();
        }
    },
    inputSearchClearHistory(){//去掉搜索列表
        this.historyPage = 1;
        this.searchHistory();
    },
  },
  created(){
      this.http.get("/chat/findSelfChatGroup",null,this.findSelfChatGroupCallBack,this,false);
  },
  watch : {
      pushChat:function(val) {//消息推送
        var state = val.state;//推送状态 1 表示小组 2表示人
		var insertusercode = val.insertusercode;//发送消息的人编码
		var insertusername = val.insertusername;//发送消息人的名字
		var message = val.message;//发送消息
		var name = val.name;//消息接受对象名称
		var groupid = "";//组的编号
		var usercode = "";//接受人的编号
        var filetmp = '';
        var id = '';
		if(state =="1"){
			id = val.groupid;
		}else{
			id = val.usercode;
        }
        if(state == "1"){//组
			groupid = val.groupid;
			var groupusers = val.groupusers
			var isexsit = false;
			for(var i=0;i<groupusers.length;i++){//检测用户是否在分组里
				if(this.userInfo.usercode == groupusers[i].usercode){
					isexsit = true;
					break;
				}
            }
            if(isexsit){
                var find = false;
                for(var i=0;i<this.chatPanelList.length;i++){
                    if(this.chatPanelList[i].id==id){
                        find = true
                        var textlist = this.chatPanelList[i].textlist;
                        var obj = {};
                        obj.id = id;
                        obj.type = val.uitype; 
                        if(val.uitype=="1"){//type 1字 2 图片
                            obj.text = message;
                        }else if(val.uitype=="2"){
                            obj.picture = Constants.file_url+val.file[0].fileurl;
                        }
                        obj.isMy = false;
                        obj.inserttime = val.inserttime;
                        obj.insertusername = val.insertusername;
                        textlist.push(obj);

                        //滚动条到最下面
                        var that = this;
                        setTimeout(function(){
                            var myDiv =  $(that.$refs.chatLeftPanel).find(".wrapClass"+id)[0];
                            myDiv.scrollTop = myDiv.scrollHeight;
                        }, 100);
                        break;
                    }
                }
                if(!find){//不存在现有的组里
                    var obj = {};
                    obj.id = id;
                    obj.textlist = [];
                    var messageObj = {};
                    messageObj.id = id;
                    messageObj.type = val.uitype; 
                    if(val.uitype=="1"){//type 1字 2 图片
                        messageObj.text = message;
                    }else if(val.uitype=="2"){
                        messageObj.picture = Constants.file_url+val.file[0].fileurl;
                    }
                    messageObj.isMy = false;
                    messageObj.inserttime = val.inserttime;
                    messageObj.insertusername = val.insertusername;
                    obj.textlist.push(messageObj);
                    this.chatPanelList.push(obj);
                    
                    //查看是否在列表中
                    var inGroupList = false;
                    for(var i=0;i<this.groupList.length;i++){
                        if(id==this.groupList[i].id){
                            inGroupList = true;
                            break;
                        }
                    }
                    if(!inGroupList){//不在列表中，加入列表
                        var groupObj = {};
                        groupObj.id = id;
                        groupObj.name = name;
                        groupObj.state = "1";
                        this.groupList.push(groupObj);
                    }
                    
                }
                //若不是当前，则出提示消息
                if(id!=this.curPanelId){
                    var unredObj = Object.assign({},this.unReadMap);
                    if(unredObj[id]){
                        unredObj[id] = unredObj[id]+1;
                    }else{
                        unredObj[id] = 1;
                    }
                    this.$store.dispatch('putChildState',{"key":"chat","childkey":"unReadMap","value":unredObj});
                }
            }
        }else{//ren
            usercode = val.usercode;
            var find = false;
            if(this.userInfo.usercode == usercode){//推送自己的
                for(var i=0;i<this.chatPanelList.length;i++){
                    if(this.chatPanelList[i].id==insertusercode){
                        find = true;
                        var textlist = this.chatPanelList[i].textlist;
                        var obj = {};
                        obj.id = insertusercode;
                        obj.type = val.uitype; 
                        if(val.uitype=="1"){//type 1字 2 图片
                            obj.text = message;
                        }else if(val.uitype=="2"){
                            obj.picture = Constants.file_url+val.file[0].fileurl;
                        }
                        obj.isMy = false;
                        obj.inserttime = val.inserttime;
                        obj.insertusername = val.insertusername;
                        textlist.push(obj);

                        //滚动条到最下面
                        var that = this;
                        setTimeout(function(){
                            var myDiv =  $(that.$refs.chatLeftPanel).find(".wrapClass"+id)[0];
                            myDiv.scrollTop = myDiv.scrollHeight;
                        }, 100);
                        break;
                    }
                }
                if(!find){//不存在现有的人里
                    var obj = {};
                    obj.id = insertusercode;
                    obj.textlist = [];
                    var messageObj = {};
                    messageObj.id = insertusercode;
                    messageObj.type = val.uitype; 
                    if(val.uitype=="1"){//type 1字 2 图片
                        messageObj.text = message;
                    }else if(val.uitype=="2"){
                        messageObj.picture = Constants.file_url+val.file[0].fileurl;
                    }
                    messageObj.isMy = false;
                    messageObj.inserttime = val.inserttime;
                    messageObj.insertusername = val.insertusername;
                    obj.textlist.push(messageObj);
                    this.chatPanelList.push(obj);
                    
                    //查看是否在列表中
                    var inGroupList = false;
                    for(var i=0;i<this.groupList.length;i++){
                        if(insertusercode==this.groupList[i].id){
                            inGroupList = true;
                            break;
                        }
                    }
                    if(!inGroupList){//不在列表中，加入列表
                        var groupObj = {};
                        groupObj.id = insertusercode;
                        groupObj.name = name;
                        groupObj.state = "2";
                        this.groupList.push(groupObj);
                    }
                }
                //若不是当前，则出提示消息
                if(insertusercode!=this.curPanelId){
                    var unredObj = Object.assign({},this.unReadMap);
                    if(unredObj[insertusercode]){
                        unredObj[insertusercode] = unredObj[insertusercode]+1;
                    }else{
                        unredObj[insertusercode] = 1;
                    }
                    this.$store.dispatch('putChildState',{"key":"chat","childkey":"unReadMap","value":unredObj});
                }
            }
        }
      }
  }
}
</script>
<style scoped>
.chatPanel{
    position: relative;
    height: 100%;
    width: 100%;
    padding: 6px;
}
.herder{
    width: 100%;
    height: 28px;
    line-height: 28px;
    background: black;
    border-radius: 5px;
    position: relative;
    top:10px;
    color: white;
}
.herder_name{
    font-size: 15px;
    font-weight: 700;
    margin-left: 10px;
}
.herder_manage{
    color: white;
    position:absolute;
    right: 50px;
    font-size: 20px;
    top:3px;
    cursor: pointer;
}
.herder_add{
    color: white;
    position:absolute;
    right: 20px;
    font-size: 20px;
    top:3px;
    cursor: pointer;
}
.chatcontent{
    width: 100%;
    height: calc(100% - 38px);
    margin-top: 10px;
    position: relative;
}
.chatLeftPanel{
    height: 100%;
    width: calc(100% - 180px);
    border-right: solid 1px rgba(255, 255, 255, 0.2);
}
.chatLeftUpPanel{
    width: 100%;
    height: calc(75% - 30px);
    border-left: solid 1px rgba(255, 255, 255, 0.2);
}
.chatLeftMiddlePanel{
    width: 100%;
    height: 30px;
    font-size:12px;
    color: white;
    line-height:30px;
    padding-left: 15px;
    background: black;
    border-left: solid 1px rgba(255, 255, 255, 0.3);
    border-top: solid 1px rgba(255, 255, 255, 0.3);
}
.chatLeftDownPanel{
    width: 100%;
    height: 25%;
    position: relative;
}
.chatRightPanel{
    height: 100%;
    width: 180px;
    background: rgba(16, 17, 23, 0.5);
    position:absolute;
    top:0px;
    right: 0px;
}
.chatRightUpPanel{
    width: 100%;
    height: calc(75% - 30px);
    border-bottom: solid 1px rgba(255, 255, 255, 0.2);
    position: relative;
}
.chatRightMiddlePanel{
    width: 100%;
    height: 30px;
    font-size:12px;
    color: white;
    line-height:30px;
    padding-left: 15px;
}
.chatRightDownPanel{
    width: 100%;
    height: 25%;
    border-top: solid 1px rgba(255, 255, 255, 0.2);
    padding: 10px 0px;
}
.sendtextarea{
    width:100%;
    height: calc(100% - 24px);
    color:white;
    background:transparent;
    resize:none;
    border: solid 1px rgba(255, 255, 255, 0.2);
}
.sendBar{
    position:absolute;
    width:100%;
    height: 24px;
    background: rgba(0, 0, 0, 0.7);
    bottom: 0px;
}
.sendButton{
    position:absolute;
    right: 0px;
}
.seachbar_InputSearch{
  height: 24px;
  width: 80%;
  margin: auto;
  top:10px;
}
.groupPanel{
    margin-top: 10px;
    height: calc(100% - 34px);
    padding: 10px;
}
.groupSearchPanel{
    margin-top: 10px;
    height: calc(100% - 34px);
    padding: 10px;
}
.modal_style{
    display: flex;
    align-items: center;
    justify-content: center;
}
.inputClass{
    width: 200px;
    height: 30px;
    background-color:rgba(0, 0, 0, 0);
    color: white;
    border: 1px solid #5b6b72;
    border-radius: 5px;
    margin-left:15px;
}
.chat{
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.5); */
  position: relative;
  overflow-y:auto;
  overflow-x: hidden;
  padding: 10px;
  box-sizing:border-box;
}
.chatGroupActive{
    background: rgba(0, 0, 0, 0.4);
}
.uploadPicture{
    line-height: 30px;
    display:inline-block;
}
.uploadPictureIcon{
    cursor: pointer;
    font-size:20px;
}
.msgHistoryIcon{
    cursor: pointer;
    font-size:21px;
    margin-left: 10px;
    margin-bottom:3px;
}
.seachbar_InputSearch{
  height: 22px;
  width: 100%;
  margin: auto;
}
.historyPanel{
    position: relative;
    height: 500px;
    width: 100%;
    margin-top:20px;
}
.pagebar{
  height: 23px;
}
</style>

