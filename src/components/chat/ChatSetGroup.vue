<template>
    <div class="createpanel">
        <div class="panel_title">
            <div class="chat_info_right_header">
              <div class="chat_object_name">设置</div>
              <div class="chat_info_right_topbar_close" @click="changePanel(0)">
                  <img src="@/assets/chat/chat_close.png"/>
              </div>
            </div>
        </div>
        <div class="panel_search">
            <div>
                <span style="position: relative;top: 10px;margin-left: 25px;color: #fff;">搜索群组：</span>
                <div style="float:left;">
                    <input class="select_input" v-model="groupname" placeholder="    搜索群组"/>
                    <div class="select_icon" @click="searchGroup"></div>
                </div>
            </div>
            <div class="group_list">
                <div class="chat_table_list">
                    <div v-for=" groupObj in  grouplist" :key="groupObj.id" class="chat_list_groupinfo" @mouseover="mouseOver($event)" @mouseout="mouseOut($event)" @click="changeGroupusers(groupObj)">
                        <div class="chat_list_group_icon">
                           <img :src="groupIcon" style="border-radius: 50%;width:41px;height:41px;"/>
                        </div>
                        <div class="chat_list_groupname">
                            <span :title="groupObj.name">{{common.cutstr(groupObj.name,50)}}</span>
                        </div>
                        <div class="shanchuClass" @click="deleteGroup(groupObj)"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel_content">
           <div style="color:#fff" :title="currentGroupname">{{common.cutstr(currentGroupname,30)}}<span style="position: absolute;right: 28px;color: #e6a23c;">成员数：{{userlist.length}}</span></div>
           <Poptip v-model="showUsers" ref="pop" placement="right-start" width="420" zIndex="2000" class="selectdeptsGroupPoptip" title="选择民警" >
                <div style="width: 252px;height: 30px;background: #10487e;text-align: center;">
                  <img style="cursor: pointer;position: relative;top: 4px;" width="25px" height="21px" src="./../../assets/chat/insert01.png" />
                </div>
                <div slot="title" style="color:#fff">选择民警</div>
                <div slot="content" style="height:370px;">
                    <UserTransfer @on-change="userTransferChange"/>
                    <div style="width:100%;text-align:end;">
                        <HfxButton @click="selectedUsers" :width=40 />
                    </div>
                </div>
           </Poptip>
           <div style="width:90%;overflow: auto;position: relative;height: 88%;margin-top: 10px;">
                <div v-for=" userObj in  userlist" :key="userObj.id" class="chat_list_userinfo"  @mouseover="mouseOver($event)" @mouseout="mouseOut($event)">
                    <div class="chat_list_user_icon">
                       <img :src="getChatInfoIcon(userObj)" style="border-radius: 50%;width:23px;height:23px;"/>
                    </div>
                    <div class="chat_list_username">
                        <span>{{userObj.username}}</span>
                    </div>
                    <div class="chat_left_list_close_icon" @click="deleteUser(userObj)">
                        <img src="@/assets/chat/chat_left_close.png" style="top:6px;position: absolute;"/>
                    </div>
                </div>
           </div>
        </div>
        <div class="panel_btn">
           <button class="chat_info_right_closecontent" @click="changePanel(0)">关闭</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import UserTransfer from '@/components/base/UserTransfer'
export default {
  name: 'ChatSetGroup',
  props:['show'],
  components: {UserTransfer},
  data () {
    return {
      groupname:"",
      grouplist:[],
      userlist:[],
      usersMap:{},
      selectusers:[],
      showUsers: false,
      currentgroupid:"",
      currentGroupname:"请选择要编辑的分组",
      groupIcon: require("@/assets/chat/chat_group.png"),
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
  }),
  methods:{
      mouseOver(e){
        var el = e.currentTarget;
        $(el).children()[2].style.display='block';
      },
      mouseOut(e){
        var el = e.currentTarget;
        $(el).children()[2].style.display='none';
      },
      getChatInfoIcon(obj){//获取列表聊天对象图标
        if(obj.newavatar){
            return Constants.file_url+obj.newavatar;
        }else{
            return require("@/assets/chat/chat_user.png");
        }
    },
    deleteGroup(obj){
        var h = this.$createElement;
        this.$msgbox({
          title: '删除小组',
          message: h('p', null, [
            h('span', null, '是否删除此小组('+obj.name+')？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
                var paramObj = {};
                paramObj.groupid = this.currentgroupid;
                this.http.get("/chat/deleteChatGroup",paramObj,this.deleteChatGroupCallBack,this,false);
            } else {
              done();
            }
          }
        }).catch();
    },
    deleteChatGroupCallBack(data){
        this.$Message.success("删除小组成功");
        this.getGroupList();
        this.changePanel(1);
        this.userlist=[];
        this.usersMap={};
        this.selectusers=[];
        this.currentgroupid="";
        this.currentGroupname="请选择要编辑的分组";
    },
    searchGroup(){
        this.http.get("/chat/findSelfChatGroupByName",{name:this.groupname},this.findSelfChatGroupCallBack,this,false);
    },
     getGroupList(){
        this.http.get("/chat/findSelfChatGroup",null,this.findSelfChatGroupCallBack,this,false);
     }, 
     findSelfChatGroupCallBack(data){
         this.grouplist = data
     },
     changeGroupusers(obj){
        this.currentgroupid = obj.id;
        this.currentGroupname = obj.name;
        var paramObj = {};
        paramObj.groupid = obj.id;
        this.http.get("/chat/getChatGroupUserByGroupid",paramObj,this.getChatGroupUserByGroupidCallBack,this,false);
     },
     getChatGroupUserByGroupidCallBack(result){
        this.userlist = result;
        this.usersMap = {};
        for(var i=0;i<this.userlist.length;i++){
             this.usersMap[this.userlist[i].usercode] = true;
        }
     },
     userTransferChange(userList){
          this.selectusers = userList;
     },
     selectedUsers(){
        if(this.selectusers.length==0){
            this.$Message.error("请选择要添加的人");
            return;
        }
        this.showUsers = false;
        var addusercodearr = [];
        for(var i=0;i<this.selectusers.length;i++){
           if(!this.usersMap[this.selectusers[i].usercode]){
              addusercodearr.push(this.selectusers[i].usercode);
           }
        }
        if(addusercodearr.length==0){
            this.$Message.error("选择的人已存在，请重新选择");
            return;
        }
        var paramObj = {};
        paramObj.groupid = this.currentgroupid;
        paramObj.addusercodearr = addusercodearr;
        this.http.get("/chat/addGroupUser",paramObj,this.addGroupUserCallBack,this,false);
     },
     addGroupUserCallBack(data){
        this.$Message.success("添加人员成功");
        this.getCurrentGroupUsers();
     },
     deleteUser(obj){
        var h = this.$createElement;
        this.$msgbox({
          title: '删除小组成员',
          message: h('p', null, [
            h('span', null, '是否删除此人员('+obj.username+')？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
                var paramObj = {};
                paramObj.groupid = this.currentgroupid;
                paramObj.usercode = obj.usercode;
                this.http.get("/chat/deleteGroupUser",paramObj,this.deleteGroupUserCallBack,this,false);
            } else {
              done();
            }
          }
        }).catch();
     },
     deleteGroupUserCallBack(data){
        this.$Message.success("删除人员成功");
        this.getCurrentGroupUsers();
     },
     getCurrentGroupUsers(){
        var paramObj = {};
        paramObj.groupid = this.currentgroupid;
        this.http.get("/chat/getChatGroupUserByGroupid",paramObj,this.getChatGroupUserByGroupidCallBack,this,false);
     },
     changePanel(val){
        var obj = {};
        obj.state = val;
        this.$emit("close-chatCreatePanel",obj);
      },
  },
  created(){
     this.getGroupList();
  },
  watch: {
    show:function(val){
      if(val){
         this.getGroupList();
      }
    }
  }
}
</script>

<style scoped>
.createpanel{
   position: absolute;
   bottom: 10%;
   left: -400%;
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
    height: calc(100% - 110px);
    width: 55%;
    float: left;
    position: relative;
    top: 20px; 
}
.select_input{
    height: 36px;
    color: #8ddbe8;
    background-color: #10487e;
    border: 0px;
    width: 76%;
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
    right: 5px;
    top: 4px;
    background:url(./../../assets/leftcontent/leftcontent_search.png)  center  no-repeat;
}
.select_icon:hover{
    background:url(./../../assets/leftcontent/leftcontent_search_hov.png)  center  no-repeat;
}
.panel_content{
    height: calc(100% - 120px);
    width: 45%;
    float: left;
    padding-left: 30px;
    position: relative;
    top: 30px;
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
    width: 110px;
    position: absolute;
    bottom: 10px;
    right: 0;
}
.group_list{
    width: 75%;
    position: absolute;
    top: 50px;
    right: 0px;
    height: calc(100% - 40px);
}
.chat_table_list{
  height: 94%;
  width: 100%;
  overflow: auto;
  position: relative;
}
.chat_list_groupinfo{
    width: 100%;
    height: 57px;
    border: 1px solid #0a5bb1;
    margin-bottom: 3px;
}
.chat_list_groupinfo:hover{
    cursor: pointer;
    background-color: #10487e;
}
.chat_list_userinfo{
    width: 100%;
    height: 30px;
    border: 1px solid #0a5bb1;
    margin-bottom: 3px;
}
.chat_list_userinfo:hover{
    cursor: pointer;
    background-color: #10487e;
}
.chat_list_group_icon{
  width: 57px;
  height: 57px;
  left: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.chat_list_groupname{
  left: 70px;
  width: 65%;
  margin-top: 18px;
  position: absolute;
  color: white;
  font-size: 12px;
}
.chat_list_user_icon{
  width: 30px;
  height: 30px;
  left: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.chat_list_username{
  left: 50px;
  margin-top: 6px;
  position: absolute;
  color: white;
  font-size: 12px;
}
.shanchuClass{
    position:relative;
    top: 23px;
    display: inline-block;
    width: 15px;
    height: 15px;
    cursor: pointer;
    display: none;
    left:250px;
    background: url(./../../assets/dztc/dztc_del.png)  no-repeat;
}
.chat_left_list_close_icon{
    position: relative;
    width: 18px;
    left: 220px;
    height: 100%;
    display: none;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-popper{
  z-index: 2000;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-inner{
  background-color: rgba(8, 56, 90, 0.90);
  box-shadow: 0 0 3px 0 #1234ac;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-arrow:after{
  background-color: rgba(8, 56, 90, 0.90);
}
</style>

