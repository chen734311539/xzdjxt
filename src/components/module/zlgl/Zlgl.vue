<template>
    <div class="zlglpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
        <div class="seachbar">
            <InputSearchNew class="seachbar_InputSearch" @on-click="inputSearch" @on-clear="fanhuisearch" v-model="message"/>
        </div>
        <div class="zlgllist-panel"> 
          <CmdButton v-for="CmdObj in CmdList" :key="CmdObj.id" :data="CmdObj" @on-change="showCmdDetailsByid"></CmdButton>
        </div>
        <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>

         <Modal v-model="showdetails" :draggable = "true" title="指令详情" class-name="zlgl-panel">
           <div slot="close"><div class="hfx-modal-close"/></div>
             <div class="zlglDetailsPanel">
                    <div class="modal-div" style="margin: 0 0 15px -30px">
                        <span>指令内容：</span>
                        <Input  class="messageInput" v-model="CmdInfo.message" readonly="readonly" type="textarea" :autosize="true"/>
                    </div>
                     <div class="modal-div">
                        <span>指令文件：</span>
                    <div class="fileContent">
                      <div v-if="showimage" class="multimedia">
                        <el-image style="width: 100px; height: 50px;" :src="imgurl" :preview-src-list="imgurllist"></el-image>
                      </div>
                      <div v-if="showsound" class="multimedia">
                      <Amr :src="soundObj.fileurl"></Amr>
                      </div>
                      <div v-if="showvideo" class="multimedia">
                        <Mp4 :data="videoObj" width="100px" height="50px"></Mp4>
                      </div>
                      <div v-if="showNone">
                        无
                      </div>
                    </div>
                    </div>
                    <div class="display:inline;">
                       <span>发送人：{{CmdInfo.insertusername}}</span>
                       <span style="margin-left:60px;">发送时间： {{CmdInfo.inserttime}}</span>   
                    </div>
                    <div class="showtable">
                    <el-tabs class="tabs" ref="tab">
                     <el-tab-pane label="接收状态" class="tabs_pane">
                        <!-- <Table ref="receivetable" max-height="200" border :columns="receivecolumns" :data="CmdReceiveList"></Table> -->
                        <HfxTable ref="table" :data="CmdReceiveList" :columns="receivecolumns"  class="tableclass" />
                     </el-tab-pane>
                     <el-tab-pane label="签收状态" class="tabs_pane">
                        <!-- <Table ref="signtable" max-height="200" border :columns="signcolumns" :data="CmdSignList"></Table> -->
                        <HfxTable ref="table" :data="CmdSignList" :columns="signcolumns"  class="tableclass" />
                     </el-tab-pane>
                    </el-tabs>
                    </div>
             </div>
          <div slot="footer"></div> 
        </Modal>
    </div>      
</template>

<script>
import Vue from 'vue'
import Constants from '@/constants/Constants'
import InputSearchNew from '@/components/base/InputSearchNew'
import PagerNew from '@/components/base/PagerNew'
import Mp4 from '@/components/base/Mp4'
import Amr from '@/components/base/Amr'
import common from "@/common.js"
import CmdButton from '@/components/module/zlgl/CommandButton'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTable from '@/components/base/HfxTable'
export default {
  name: 'Zlgl',
  components: {InputSearchNew,PagerNew,CmdButton,Amr,Mp4,LeftContentNameBar,HfxTable},
  data () {
    return {
      message:"",
      showdetails:false,
      showimage: false,
      showsound: false,
      showvideo: false,
      showNone: true,
      imgurl:"",//显示的图片地址
      imgurllist:[],//全部图片
      soundObj:{},//显示的amr
      videoObj:{},//显示的视频
      page:1,
      pageSize:10,
      isfanhuishow:false, 
      totalSize:0,
      CmdList:[],
      CmdInfo:{},
      CmdFiles:[],
      CmdSignList:[],
      CmdReceiveList:[],
      imageFiles:[],
      soundFiles:[],
      videoFiles:[],
      otherFiles:[],
      receivecolumns: [
            {
                title: '序号',
                width:10,
                key: 'xh',
            },
            {
                title: '所属部门',
                width:20,
                key: 'deptname',
              //   render: (h, params) => {
              //     let texts = params.row.deptname;
              //     if (params.row.deptname != null) {
              //       if (params.row.deptname.length > 6) {
              //         texts = params.row.deptname.slice(0, 6) + '...' // 进行数字截取
              //       } else {
              //         texts = params.row.deptname
              //       }
              //     }
              //      return h('div', [h('Tooltip', 
              //       {
              //         props: {placement: 'top',transfer: true}
              //       }, 
              //       [texts, h('span', {slot: 'content',style: {whiteSpace: 'normal'}}, params.row.deptname)]
              //       )]
              //     );
              //  }
            },
            {
                title: '警员姓名',
                width:20,
                key: 'username',
            },
            {
                title: '警员编号',
                width:20,
                key: 'usercode',
            },
            {
                title: '是否接收',
                width:12,
                key: 'received',
                // render: (h, params) => {
                // let text = '';
                // if(params.row.received=="1") {
                //   text = '已接收'
                // }else if(params.row.received=="0"){
                //   text = '未接收'
                // }else{
                //   text = '未知'
                // }
                // return h('div', {props: {},}, text)
                // }
            },
            {
                title: '接收时间',
                width:30,
                key: 'receivedtime',
                // render: (h, params) => {
                // let text = '';
                // if(typeof params.row.receivedtime == "undefined" || params.row.receivedtime == null || params.row.receivedtime == ""){
                //     text='';
                // }else{
                //     text=params.row.receivedtime.substr(5);
                // }
                // return h('div', {props: {},}, text)
                // }
            } 
      ],
      signcolumns: [
            {
                title: '序号',
                width:10,
                key: 'xh',
            },
            {
                title: '所属部门',
                width:20,
                key: 'deptname',
              //   render: (h, params) => {
              //     let texts = params.row.deptname;
              //     if (params.row.deptname != null) {
              //       if (params.row.deptname.length > 6) {
              //         texts = params.row.deptname.slice(0, 6) + '...'; // 进行数字截取
              //       } else {
              //         texts = params.row.deptname;
              //       }
              //     }
              //     return h('div', [h('Tooltip', 
              //       {
              //         props: {placement: 'top',transfer: true}
              //       }, 
              //       [texts, h('span', {slot: 'content',style: {whiteSpace: 'normal'}}, params.row.deptname)]
              //       )]
              //     );
              //  }  
            },
            {
                title: '警员姓名',
                width:20,
                key: 'username',
            },
            {
                title: '警员编号',
                width:20,
                key: 'usercode',
            },
            {
                title: '是否签收',
                width:12,
                key: 'signed',
                // render: (h, params) => {
                // let text = '';
                // if(params.row.signed=="1") {
                //   text = '已签收'
                // }else if(params.row.signed=="0"){
                //   text = '未签收'
                // }else{
                //   text = '未知'
                // }
                // return h('div', {props: {},}, text)
                // }
            },
            {
                title: '签收时间',
                width:30,
                key: 'signedtime',
                // render: (h, params) => {
                // let text = '';
                // if(typeof params.row.signedtime == "undefined" || params.row.signedtime == null || params.row.signedtime == ""){
                //     text='';
                // }else{
                //     text=params.row.signedtime.substr(5);
                // }
                // return h('div', {props: {},}, text)
                // }
            } 
      ]
    }
  },
  methods:{
    inputSearch(value){
      this.page=1;
      this.searchCmd();
      this.isfanhuishow = true;
    },
    fanhuisearch(){
      this.page = 1;
      this.reset();
      this.isfanhuishow = false;
      this.searchCmd();
    },
    pageChange(page){
      this.page = page;
      this.searchCmd();
    },
    reset(){
      this.message="";
    },
    searchCmd(){
      var paramObj = {};
      //翻页
      paramObj.page = this.page;
      paramObj.pagesize = this.pageSize;
      //指令信息关键字
      paramObj.message = this.message;
      this.http.get("/zlgl/getCommandListByMsg",paramObj,this.getCommandListByMsgCallBack,this,false);
    },
    getCommandListByMsgCallBack(data){
      this.totalSize = data.count;
      this.CmdList = data.data;
    },
    clearFileDetails(){
      this.imgurl="";
      this.imgurllist=[];
      this.soundObj={};
      this.videoObj={};
      this.imageFiles=[];
      this.soundFiles=[];
      this.videoFiles=[];
      this.otherFiles=[];
      this.showimage=false;
      this.showsound=false;
      this.showvideo=false;
      this.showNone=true;
    },
    showCmdDetailsByid(val){
      var paramObj = {};
      paramObj.cmdid=val;
      this.clearFileDetails();
      this.http.get("/zlgl/getCommandDetailsById",paramObj,this.getCommandDetailsByIdCallBack,this,false);
    },
    getCommandDetailsByIdCallBack(data){
      this.CmdInfo=data.info;
      if(data.files.length>0){
        this.CmdFiles=data.files;
        this.processfiles();
      }
      for(let i=0;i<data.receivelist.length;i++){
        data.receivelist[i].xh=i+1;
      }
      this.CmdReceiveList=data.receivelist;
      for(let i=0;i<data.signlist.length;i++){
        data.signlist[i].xh=i+1;
      }
      this.CmdSignList=data.signlist;
      if(data.info.haspicture=="1"){
        this.showimagefiles();
       }
      if(data.info.hassound=="1"){
        this.showsoundfiles();
       }
      if(data.info.hasvideo=="1"){
        this.showvideofiles();
      }
      this.showdetails=true;
    },
    showimagefiles(){
      for(var i=0;i<this.imageFiles.length;i++){
        this.imgurllist.push(this.imageFiles[i].fileurl);
      }
      this.imgurl=this.imageFiles[0].fileurl;
      this.showNone=false;
      this.showimage=true;
    },
    showsoundfiles(){
      this.soundObj=this.soundFiles[0];
      this.showNone=false;
      this.showsound=true;
    },
    showvideofiles(){
      this.videoObj=this.videoFiles[0];
      this.showNone=false;
      this.showvideo=true;
    },
    processfiles(){
       for(var i=0;i<this.CmdFiles.length;i++){
        if(this.CmdFiles[i].filetype=="1"){
          this.CmdFiles[i].fileurl=Constants.file_url+this.CmdFiles[i].fileurl;
          this.imageFiles.push(this.CmdFiles[i]);
        }else if(this.CmdFiles[i].filetype=="2"){
          this.CmdFiles[i].fileurl=Constants.file_url+this.CmdFiles[i].fileurl;
          this.CmdFiles[i].slturl=Constants.file_url+this.CmdFiles[i].slturl;
          this.soundFiles.push(this.CmdFiles[i]);
        }else if(this.CmdFiles[i].filetype=="3"){
          this.CmdFiles[i].fileurl=Constants.file_url+this.CmdFiles[i].fileurl;
          this.CmdFiles[i].slturl=Constants.file_url+this.CmdFiles[i].slturl;
          this.videoFiles.push(this.CmdFiles[i]);
        }else if(this.CmdFiles[i].filetype=="4"){
           this.CmdFiles[i].fileurl=Constants.file_url+this.CmdFiles[i].fileurl;
          this.otherFiles.push(this.CmdFiles[i]);
        }
       }
    }
  },
  created(){
      this.searchCmd();
  }
}
</script>
<style scoped>
.zlglpanel{
  height: 100%;
  position: relative;
}
.seachbar{
  height: 53px;
}
.seachbar_InputSearch{
  height: 36px;
  margin: 0px 0 17px 0;
}
.seachbar_fanhui{
  position:absolute;
  left: 311px;
  color: white;
  top:2px;
  font-size: 20px;
  cursor: pointer;
}
.zlgllist-panel{
  height: calc(100% - 120px);
  overflow: auto;
}
.pagebar{
  height: 24px;
  position: absolute;
  left: 11px;
  bottom: -20px;
}
.showtable{
  width: 100%;
}
.modal-div{
  margin: 10px 0 10px -30px;
}
.modal-div span{
  float: left;
  width: 85px;
  text-align: right;
  margin-right: 10px;
}
 .tabs{
  height: calc(100% - 32px);
}
.tabs >>> .el-tabs__content{
  height:calc(100% - 50px);
}
.tabs >>> .el-tabs__item{
  color: #b6f6ff;
} 
.tabs >>>.el-tabs__active-bar{
  display: none;
}
.tabs>>>.el-tabs__nav-wrap::after{
  background-color: #b6f6ff;
}
/* 无效 处理tabs标签左右两个一个靠左一个靠右 */
.tabs>>> .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: none !important;
}
.tabs>>> .el-tabs--bottom .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--top .el-tabs__item.is-top:last-child {
  padding-right: none !important;
}
.tabs >>> .el-tabs__item.is-active{
  color: white;
  /* background-color: #b6f6ff; */
  border-bottom: 3px solid white;
} 
.tabs_pane{
  height: 100%;
}
.zlglDetailsPanel{
  height: auto;
}
.fileContent{
  margin-left: 100px;
  height: 60px;
}
.multimedia{
  float: left;
  margin: 0px 10px 0px 10px;
}
.messageInput{
  width:380px;
}
.messageInput >>> textarea{
  min-height: 48px;
  font-size: 12px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.ivu-table {
  background-color: #d8d8d8;
}
.tableclass{
  /* height: 400px !important; */
}
</style>
<style>
.zlgl-panel .ivu-modal .ivu-modal-content{
  top: 82px;
  left:387px;
  width: 480px !important;
}
.ivu-table-cell{
  padding-left: 0px;
  padding-right: 0px;
}
.ivu-table td, .ivu-table th{
  height: 23px;
}
</style>