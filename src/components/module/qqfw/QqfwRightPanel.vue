<template>
    <div class="qqfwRightPanel">
    <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
    <div v-if="contentlist.length>0"  class="qqfwfollowpanel">
        <HfxFollowTemplate  :itemdata="itemdata" :contentlist="contentlist" @on-commentreply="commentReply" @on-editreply="editReply" @on-deletereply="deleteReply" >
            <template #titlebutton="{data}">
                <HfxButton v-show="data.isfollow=='0'" name="设置关注" style="line-height:0;" :width=70 @click="setItemFollow(1)" />
                <HfxButton v-show="data.isfollow=='1'" name="取消关注" style="line-height:0;" class="cancelguanzhu" :width=70 @click="setItemFollow(0)" />
                <Poptip v-model="showPop" zIndex="2000" placement="bottom" class="item_option_btn">
                    <HfxButton name="主题管理" style="line-height:0;" :width=70 />
                   <div slot="content" style="calc(100% - 10px);color:#2d8cf0;min-width:60px">
                        <div v-show="itemdata.istop=='0'" class="itemoption" @click="setItemTop(1)">设置置顶</div>
                        <div v-show="itemdata.istop=='1'" class="itemoption" @click="setItemTop(0)">取消置顶</div>
                        <div class="itemoption" @click="deleteItem">删除主题</div>
                        <div v-show="itemdata.state!='3'" class="itemoption" @click="updateItemstate(3)">完成工作</div>
                        <div v-show="itemdata.state!='2'" class="itemoption" @click="updateItemstate(2)">已研判</div>
                    </div>
                  </Poptip>
            </template>
            <template #editfollowpanel="{data}">
                <div class="addueditor">
                    <UE :defaultMsg="defaultMsg" :config="config" ref="ue" ueid="qqfwaddfollow"></UE>
                </div>
                <div class="submitedit">
                    <div v-if="selectusers.length>0" style="display: inline-block;color: #fff;">当前已选择：<span style="color: red;">{{selectusers.length}}人</span></div>
                    <Poptip v-model="showUsers" ref="pop" placement="right-end" width="420" zIndex="2000" class="selectdeptsGroupPoptip" title="选择民警" >
                        <HfxButton style="margin-top: 31px;" name="选择民警" :width=70 />
                        <div slot="title">选择民警</div>
                        <div slot="content" style="height:370px;">
                            <UserTransfer @on-change="userTransferChange"/>
                            <div style="width:100%;text-align:end;">
                                <HfxButton @click="selectedUsers" :width=40 />
                            </div>
                        </div>
                    </Poptip>
                    <HfxButton v-show="showsubmitbtn=='1'" @click="submitEditContent" name ="发表" />
                    <HfxButton v-show="showsubmitbtn!='1'" @click="replaysubmitEditContent" name ="编辑" />
                    <HfxButton v-show="showsubmitbtn!='1'" @click="cancelsubmitEditContent" name ="撤销" />
                </div>
            </template>
        </HfxFollowTemplate>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import UE from '@/components/base/UEditor'
import PagerNew from '@/components/base/PagerNew'
import UserTransfer from '@/components/base/UserTransfer'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxFollowTemplate from '@/components/module/ajzc/HfxFollowTemplate'
export default {
  name: 'QqfwRightPanel',
  components: {UE,PagerNew,UserTransfer,LeftContentNameBar,HfxFollowTemplate,},
  data () {
    return {
        showPop:false,
        config: {
            initialFrameHeight: 200,
            autoHeightEnabled: false,
            zIndex: 0
        },
        defaultMsg: '',
        deptnames:"",
        follownum:"0",
        title:"",
        content:"",
        page:1,
        pageSize:10,
        totalSize:0,  //总共页数
        showsubmitbtn:"1",
        replaycontentid:"",
        itemdata:{},
        contentlist:[],
        showUsers:false,
        selectusers:[],
    }
  },
  computed: {...mapState({
     
  })
  },
  methods:{
      initEditValues(val){//初始化修改的值
        this.page = 1;
        var paramObj = {};
        paramObj.page = 1;
        paramObj.pagesize = this.pageSize
        paramObj.itemid = val;
        this.http.get("/qzlq/getQqfwItemDetailById",paramObj,this.getQqfwItemDetailByIdCallBack,this,false);
      },
      reflashItem(val){//初始化修改的值
        var paramObj = {};
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize
        paramObj.itemid = val;
        this.http.get("/qzlq/getQqfwItemDetailById",paramObj,this.getQqfwItemDetailByIdCallBack,this,false);
      },
      getQqfwItemDetailByIdCallBack(result){
          this.totalSize = result.count;
          this.itemdata = result.item;
          this.contentlist = result.data;
      },
      submitEditContent(){//发表评论
        var paramObj = {};
        paramObj.content = this.$refs.ue.getUEContent();
        paramObj.itemid = this.itemdata.id;

        if(this.selectusers.length==0){
            this.http.post("/qzlq/insertQqfwItemContent",paramObj,this.insertQqfwItemContentCallBack,this,false);
        }else{
            var h = this.$createElement;
            this.$msgbox({
              title: '信息提示',
              message: h('p', null, [
                h('span', null, '是否短信提示已选择的'+this.selectusers.length+'人？')
              ]),
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  done();
                  paramObj.selectusers = this.selectusers;
                  paramObj.msg = "请求服务["+this.itemdata.title+"]主题下添加了关于您的新的信息，请注意查看！";
                  this.http.post("/qzlq/insertQqfwItemContent",paramObj,this.insertQqfwItemContentCallBack,this,false);
                } else {
                  done();
                }
              }
            }).catch();
        }
      },
      insertQqfwItemContentCallBack(){
          this.reflashItem(this.itemdata.id);
          this.$refs.ue.setUEContent("");//重置编辑器
      },
      deleteReply(val){
          var obj=JSON.parse(val);
          var paramObj = {};
          paramObj.contentid = obj.contentid;
          this.http.get("/qzlq/deleteQqfwItemContent",paramObj,this.deleteQqfwItemContentCallBack,this,false);
      },
      deleteQqfwItemContentCallBack(reslut){
          this.reflashItem(this.itemdata.id);
      },
      editReply(val){
          var obj=JSON.parse(val);
          this.$refs.ue.setUEContent(obj.content);
          this.showsubmitbtn = "0";
          this.replaycontentid = obj.contentid;
          this.isshowEditPanel = true;
      },
      cancelsubmitEditContent(){
          this.showsubmitbtn = "1";
          this.$refs.ue.setUEContent("");//重置编辑器
      },
      replaysubmitEditContent(){
          if(this.replaycontentid==""){
              return;
          }
          var paramObj = {};
          paramObj.content = this.$refs.ue.getUEContent();
          paramObj.contentid = this.replaycontentid;
          this.http.post("/qzlq/updateQqfwItemContent",paramObj,this.updateQqfwItemContentCallBack,this,false);
      },
      updateQqfwItemContentCallBack(result){
          this.showsubmitbtn = "1";
          this.reflashItem(this.itemdata.id);
          this.$refs.ue.setUEContent("");//重置编辑器
      },
      commentReply(val){
            var obj=JSON.parse(val);
          var myseq = this.contentlist.length;
          var content = "引用"+(obj.seq-1)+"楼"+obj.insertusername+"的回复："+obj.content+"<p>"+myseq+"楼回复：</p>";
          this.$refs.ue.setUEContent(content);
          this.isshowEditPanel = true;
      },
      setItemTop(val){
          var paramObj = {};
          paramObj.itemid = this.itemdata.id;
          if(val==1){
              this.http.get("/qzlq/updateQqfwItemTop",paramObj,this.updateQqfwItemCallBack,this,false);
          }else{
              this.http.get("/qzlq/cancelQqfwItemTop",paramObj,this.updateQqfwItemCallBack,this,false);
          }
      },
      setItemFollow(val){
          var paramObj = {};
          paramObj.itemid = this.itemdata.id;
          if(val==1){
              this.http.get("/qzlq/updateQqfwItemFollow",paramObj,this.updateQqfwItemCallBack,this,false);
          }else{
              this.http.get("/qzlq/cancelQqfwItemFollow",paramObj,this.updateQqfwItemCallBack,this,false);
          }
      },
      deleteItem(){
          var paramObj = {};
          paramObj.itemid = this.itemdata.id;
          this.http.get("/qzlq/deleteQqfwItem",paramObj,this.deleteQqfwItemCallBack,this,false);
      },
      deleteQqfwItemCallBack(){
          this.itemdata = {};
          this.contentlist = [];
          this.page = 1;
          this.totalSize = 0;
          this.showPop = false;
      },
      updateItemstate(val){
          var paramObj = {};
          paramObj.itemid = this.itemdata.id;
          paramObj.state = val;
          this.http.get("/qzlq/updateQqfwItemState",paramObj,this.updateQqfwItemCallBack,this,false);
      },
      updateQqfwItemCallBack(result){
          this.showPop = false;
          this.reflashItem(this.itemdata.id);
      },
      pageChange(page){
          this.page = page;
          this.reflashItem(this.itemdata.id);
      },
      showEdit(){
          this.isshowEditPanel = !this.isshowEditPanel;
      },
      selectedUsers(){
          this.showUsers = false;
      },
      userTransferChange(userList){
          this.selectusers = userList;
      },
  },
  created(){

  },
}
</script>

<style scoped>
.qqfwRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
}
.itemheader{
    width: 100%;
    height: 100%;
}
.qqfw_header_panel{
  width: 100%;
  background: #262b2e;
  height: 18%;
  border: 1px solid rgb(91, 107, 114);
  position: relative;
  margin-bottom: 5px;
  color:white;
}
.item_option_btn >>> .ivu-poptip-popper{
  min-width: 60px;
  z-index: 2000;
}
.item_option_btn >>> .ivu-poptip-inner{
  min-width: 60px;
  background:#171616;
  box-shadow: 0px 1px 7px -1px #C0C0C0;
}
.item_option_btn >>> .ivu-poptip-arrow:after{
  border-left-color:#171616;
}
.itemtitle{
    height: 44px;
    background: #080821e3;
}
.titlename{
    position: absolute;
    height: 20px;
    top: 10px;
}
.titlebtn{
    position: absolute;
    top: 19px;
    right: 20px;
}
.pagebar{
  height: 23px;
  text-align: right;
}
.additemfollow{
    width: 100%;
    height: 295px;
    background: #120c29;
}
.addheader{
    position: relative;
    top: 8px;
    left: 10px;
}
.addueditor{
    position: relative;
    margin-right: 5px;
    height: 260px;
}
.followscoller{
    height: calc(100% - 61px);
}
.showitemfollow{
    width: 100%;
    min-height: 280px;
    height: auto;
    background: #ddd;
}
.followheader{
    height: 30px;
    background: #120c29;
}
.followusername{
    float: left;
    width: 26%;
    position: relative;
    padding-top: 6px;
    padding-left: 5px;
    height: 28px;
}
.followinfo{
    float: left;
    width: 73%;
    position: relative;
    padding-top: 6px;
    padding-left: 5px;
    height: 28px;
}
.followcontentpanel{
    background: #ddd;
    min-height: 250px;
    color: black;
}
.followuserimg{
    float: left;
    width: 18%;
    height: 250px;
    min-height: 250px;
}
.img-user{
    margin: 0px auto 10px;
    height: 152px;
    width: 128px;
    position: relative;
    left: 13%;
    top: 50px;
}
.dept-user{
    margin: 0px auto 10px;
    width: 128px;
    position: relative;
    top: 50px;
}
.followcontent{
    float: left;
    width: 82%;
    height: auto;
    min-height: 250px;
}
.contenthtml{
    height: calc(100% - 34px);
    min-height: 216px;
    width: 100%;
    border-bottom: 1px solid rgb(91, 107, 114);
    border-left: 1px solid rgb(91, 107, 114);
}
.contentbottom{
    position: relative;
    height: 34px;
    width: 100%;
    border-left: 1px solid rgb(91, 107, 114);
}
.editbtn{
    width: 116px;
    right: 10px;
    top: 10px;
    position: absolute;
}
.optionbtnspan{
    color: #2d8cf0;
    cursor: pointer;
    margin-right: 10px;
}
.submitedit{
    position: absolute;
    bottom: 3px;
    right: 10px;
}
.itemoption{
    margin-bottom: 5px;
    cursor: pointer;
}
.qqfwfollowpanel{
    width: 100%;
    height: calc(100% - 2px);
}
.cancelguanzhu{
  background-color: red !important;
  border: 1px solid red !important;
  color: white !important;
}
.qqfwfollowpanel >>> .edui-default .edui-editor {
    background-color: #d2eaff;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
}
.showEditPanel{
    width: 60px;
    height: 26px;
    position: absolute;
    bottom: -14px;
    right: -12px;
    background: #ed4014;
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

