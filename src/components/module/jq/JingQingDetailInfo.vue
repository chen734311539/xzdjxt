<template>
      <el-tabs class="tabs">
        <el-tab-pane label="警情内容" class="tabs_jqnr">
          <table class="table">
            <tbody class="tbody">
                <tr>
                  <td class="textClass">接警单号:</td><td class="spantd"><span class="spanClass">{{(jqdata.jjdbh==null||jqdata.jjdbh=="")?"&nbsp;":jqdata.jjdbh}}</span></td>
                  <td class="textClass">接警单位:</td><td class="spantd"><span class="spanClass">{{(jqdata.jjdwmc==null||jqdata.jjdwmc=="")?"&nbsp;":jqdata.jjdwmc}}</span></td>
                </tr>
                <tr>
                  <td class="textClass">接警时间:</td><td class="spantd"><span class="spanClass">{{(jqdata.jjsj==null||jqdata.jjsj=="")?"&nbsp;":jqdata.jjsj}}</span></td>
                  <td class="textClass">报警方式:</td><td class="spantd"><span class="spanClass">{{(jqdata.bjfsmc==null||jqdata.bjfsmc=="")?"&nbsp;":jqdata.bjfsmc}}</span></td>
                </tr>
                <tr>
                  <td class="textClass">报警电话:</td><td class="spantd" style="margin-right:12px;"><span class="spanClass">{{(jqdata.bjdh==null||jqdata.bjdh=="")?"&nbsp;":jqdata.bjdh}}</span></td>
                  <td class="textClass" style="text-align: right;">报警人:</td><td class="spantd"><span class="spanClass">{{(jqdata.bjrxm==null||jqdata.bjrxm=="")?"&nbsp;":jqdata.bjrxm}}</span></td>
                </tr>
                <tr>
                  <td class="textClass">联系电话:</td><td class="spantd"><span class="spanClass">{{(jqdata.lxdh==null||jqdata.lxdh=="")?"&nbsp;":jqdata.lxdh}}</span></td>
                  <td class="textClass">联系地址:</td><td class="spantd"><span class="spanClass">{{(jqdata.yhdz==null||jqdata.yhdz=="")?"&nbsp;":jqdata.yhdz}}</span></td>
                </tr>
                <tr>
                  <td class="textClass">管辖单位:</td><td class="spantd"><span class="spanClass">{{(jqdata.gxdwmc==null||jqdata.gxdwmc=="")?"&nbsp;":jqdata.gxdwmc}}</span></td>
                  <td class="textClass">报警类别:</td><td class="spantd"><span class="spanClass">{{(jqdata.bjlbmc==null||jqdata.bjlbmc=="")?"&nbsp;":jqdata.bjlbmc}}</span></td>
                </tr>
                <tr>
                  <td class="textClass">警情级别:</td><td class="spantd"><span class="spanClass">{{(jqdata.jqjb==null||jqdata.jqjb=="")?"&nbsp;":jqdata.jqjb}}</span></td>
                  <td class="textClass">机主姓名:</td><td class="spantd"><span class="spanClass">{{(jqdata.jzxm==null||jqdata.jzxm=="")?"&nbsp;":jqdata.jzxm}}</span></td>
                </tr>
                <tr>
                  <td class="textClass">报警类型:</td><td class="spantd"><span class="spanClass">{{(jqdata.bjlxmc==null||jqdata.bjlxmc=="")?"&nbsp;":jqdata.bjlxmc}}</span></td>
                  <td class="textClass">报警细类:</td><td class="spantd"><span class="spanClass">{{(jqdata.bjxlmc==null||jqdata.bjxlmc=="")?"&nbsp;":jqdata.bjxlmc}}</span></td>
                </tr>
                  <tr>
                  <td class="textClass">案发地址:</td><td class="spantd"><span class="spanClass2">{{(jqdata.afdd==null||jqdata.afdd=="")?"&nbsp;":jqdata.afdd}}</span></td>
                </tr>
                <tr>
                  <td class="textClass">报警内容:</td><td class="spantd"><span class="spanClass2">{{(jqdata.bjnr==null||jqdata.bjnr=="")?"&nbsp;":jqdata.bjnr}}</span></td>
                </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="处警单">
          <table class="table">
            <tbody class="tbody">
                <tr>
                  <td class="textClass">处警单号:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.cjdbh==null||jqcjfk.cjdbh=="")?"&nbsp;":jqcjfk.cjdbh}}</span></td>
                  <td class="textClass">处警单位:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.cjdwmc==null||jqcjfk.cjdwmc=="")?"&nbsp;":jqcjfk.cjdwmc}}</span></td>
                </tr>
                <tr>
                  <td class="textClass" style="margin-left:47px;">处警员:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.cjyxm==null||jqcjfk.cjyxm=="")?"&nbsp;":jqcjfk.cjyxm}}</span></td>
                  <td class="textClass" style="margin-left:23px;">处警员编号:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.cjybh==null||jqcjfk.cjybh=="")?"&nbsp;":jqcjfk.cjybh}}</span></td>
                </tr>
                <tr>
                  <td class="textClass" style="margin-left:23px;">处警台编号:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.cjtbh==null||jqcjfk.cjtbh=="")?"&nbsp;":jqcjfk.cjtbh}}</span></td>
                  <td class="textClass" style="margin-left:36px;">处警台IP:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.cjtip==null||jqcjfk.cjtip=="")?"&nbsp;":jqcjfk.cjtip}}</span></td>
                </tr>
                <tr>
                  <td class="textClass">处警时间:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.cjsj==null||jqcjfk.cjsj=="")?"&nbsp;":jqcjfk.cjsj}}</span></td>
                  <td class="textClass">受警单位:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.sjdwmc==null||jqcjfk.sjdwmc=="")?"&nbsp;":jqcjfk.sjdwmc}}</span></td>
                </tr>
                 <tr>
                  <td class="textClass" style="margin-left:23px;">受警单位IP:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.sjdwip==null||jqcjfk.sjdwip=="")?"&nbsp;":jqcjfk.sjdwip}}</span></td>
                  <td class="textClass" style="margin-left:24px;">受警员编号:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.sjybh==null||jqcjfk.sjybh=="")?"&nbsp;":jqcjfk.sjybh}}</span></td>
                </tr>
                <tr>
                  <td class="textClass" style="margin-left:23px;">受警员姓名:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.sjyxm==null||jqcjfk.sjyxm=="")?"&nbsp;":jqcjfk.sjyxm}}</span></td>
                  <td class="textClass" style="margin-left:11px;">派单到达时间:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.pdddsj==null||jqcjfk.pdddsj=="")?"&nbsp;":jqcjfk.pdddsj}}</span></td>
                </tr>
                <tr>
                  <td class="textClass" style="margin-left:11px;">派单接收时间:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.pdjssj==null||jqcjfk.pdjssj=="")?"&nbsp;":jqcjfk.pdjssj}}</span></td>
                  <td class="textClass" style="margin-left:11px;">到达现场时间:</td><td class="spantd"><span class="spanClass">{{(jqcjfk.ddxcsj==null||jqcjfk.ddxcsj=="")?"&nbsp;":jqcjfk.ddxcsj}}</span></td>
                </tr>
                <tr>
                  <td class="textClass" style="margin-left:11px;">处警完毕时间:</td><td class="spantd"><span class="spanClass2">{{(jqcjfk.cjwbsj==null||jqcjfk.cjwbsj=="")?"&nbsp;":jqcjfk.cjwbsj}}</span></td>
                </tr>
                <tr>
                  <td class="textClass">处警情况:</td><td class="spantd"><span class="spanClass2">{{(jqcjfk.cjqk==null||jqcjfk.cjqk=="")?"&nbsp;":jqcjfk.cjqk}}</span></td>
                </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="处警反馈">
            <table class="table">
            <tbody class="tbody">
                <tr>
                  <td class="textClass">签收警员:</td><td class="spantd"><span class="spanClass">{{(jqdata.signedusername==null||jqdata.signedusername=="")?"&nbsp;":jqdata.signedusername}}</span></td>
                  <td class="textClass">签收时间:</td><td class="spantd"><span class="spanClass">{{(jqdata.signedtime==null||jqdata.signedtime=="")?"&nbsp;":jqdata.signedtime}}</span></td>
                </tr>
                <tr>
                  <td class="textClass">到达警员:</td><td class="spantd"><span class="spanClass">{{(jqdata.arrivedusername==null||jqdata.arrivedusername=="")?"&nbsp;":jqdata.arrivedusername}}</span></td>
                  <td class="textClass">到达时间:</td><td class="spantd"><span class="spanClass">{{(jqdata.arrivedtime==null||jqdata.arrivedtime=="")?"&nbsp;":jqdata.arrivedtime}}</span></td>
                </tr>
                <tr>
                  <td class="textClass">完成警员:</td><td class="spantd"><span class="spanClass">{{(jqdata.finishedusername==null||jqdata.finishedusername=="")?"&nbsp;":jqdata.finishedusername}}</span></td>
                  <td class="textClass">完成时间:</td><td class="spantd"><span class="spanClass">{{(jqdata.finishedtime==null||jqdata.finishedtime=="")?"&nbsp;":jqdata.finishedtime}}</span></td>
                </tr>
                <tr>
                  <td class="textClass" style="margin-left:11px;">无需出警理由:</td><td class="spantd"><span class="spanClass2">{{(wxcj==null||wxcj=="")?"&nbsp;":wxcj}}</span></td>
                </tr>
                <tr v-for="record in contentRecords" :key="record.id">
                  <td class="textClass">处警记录:</td><td class="spantd"><span class="spanClass2">{{record.content+" ["+record.inserttime+"]"}}</span></td>
                </tr>
                <tr v-if="pictureRecords.length>0">
                    <Divider orientation="center" class="line">图片</Divider>
                    <div style="max-height: 105px;overflow: auto;">
                      <el-image v-for="record in pictureRecords" :key="record.id" style="width: 100px; height: 100px;margin:0px 5px;" :src="record.fileurl" :preview-src-list="pictureUrlRecords" @click="clickPicture(record.id)"></el-image>
                    </div>
                </tr>
                <tr v-if="soundRecords.length>0">
                  <Divider orientation="center" class="line">声音</Divider>
                  <div style="float:left;max-height: 105px;overflow: auto;">
                    <Audio v-for="record in soundRecords" :key="record.id" :src="record.fileurl"></Audio>
                  </div>
                </tr>
                <tr v-if="mp4Records.length>0">
                  <Divider orientation="center" class="line">视频</Divider>
                  <div style="float:left;max-height: 105px;overflow: auto;">
                    <!-- <video-player style="width: 100px; height: 100px;margin:0px 5px;float:left;" class="video-player vjs-custom-skin mp4" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)"></video-player> -->
                    <Mp4 v-for="record in mp4Records" :key="record.id" :data="record" width="100px" height="100px"></Mp4>
                  </div>
                </tr> 
            </tbody>
          </table>
        </el-tab-pane>
      </el-tabs>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Mp4 from '@/components/base/Mp4'
import Audio from '@/components/base/Audio'

export default {
  name: 'JingQingDetailInfo',
  props:['jqid'],
  components: {Mp4,Audio},
  data () {
    return {
      data:{},
      contentRecords:[],
      pictureRecords:[],
      pictureUrlRecords:[],
      soundRecords:[],
      mp4Records:[]
    }
  },
  computed: {
    jqdata: function () {
      if(!this.data.jqdata){
        return {};
      }
      return this.data.jqdata;
    },
    wxcj: function(){
      var notneedcjstate = this.jqdata.notneedcjstate;
      if(notneedcjstate==null||notneedcjstate==""){
        return null;
      }
      if(notneedcjstate=="99"){
        return this.jqdata.notneedcjstateremark;
      }
      for(var i=0;i<this.jqObj.wxcjList.length;i++){
        if(this.jqObj.wxcjList[i].code==notneedcjstate){
          return this.jqObj.wxcjList[i].name;
        }
      }
      return null;
    },
    jqcjfk:function(){
      if(!this.data.jqcjfk){
        return {};
      }
      if(!this.data.jqcjfk[0]){
        return {};
      }
      return this.data.jqcjfk[0];
    }
  },
  methods:{
    getSsjqDetailCallBack(data){
      this.data = data;
      if(this.data.jqrecord&&this.data.jqrecord.length>0){
        for(var i=0;i<this.data.jqrecord.length;i++){
          var record = this.data.jqrecord[i];
          if(record.fileurl!=null&&record.fileurl!=""){
            record.fileurl=Constants.file_url+record.fileurl;
          }
          if(record.slturl!=null&&record.slturl!=""){
            record.slturl=Constants.file_url+record.slturl;
          }
          if(record.datatype=="0"){ //0是文字，1是图片，2是录音，3是视频
              this.contentRecords.push(record);
          }else if(record.datatype=="1"){
              this.pictureRecords.push(record);
          }else if(record.datatype=="2"){
              this.soundRecords.push(record);
          }else if(record.datatype=="3"){
              this.mp4Records.push(record);
          }
        }
      }
    },
    clickPicture(id){//处理图片预览的顺序，把点击的图放第一张
      this.pictureUrlRecords=[];
      var num = 0;
      for(var i = 0;i<this.pictureRecords.length;i++){
        if(this.pictureRecords[i].id==id){
          num = i;
          break;
        }
      }
      for(var i = num;i<this.pictureRecords.length;i++){
        this.pictureUrlRecords.push(this.pictureRecords[i].fileurl);
      }
      for(var i = 0;i<num;i++){
        this.pictureUrlRecords.push(this.pictureRecords[i].fileurl);
      }
    },
    onPlayerPlay(player) {
        alert()
    }
  },
  created(){
  },
  watch : {
      jqid:function(val) {
          this.http.get("/ssjq/getSsjqDetail",{"jqid":val},this.getSsjqDetailCallBack,this,false);
      }
  }
}
</script>

<style scoped>
.header{
  height: 40px;
  width: 100%;
}
.tabs{
  /* border: 1px solid #b6f6ff; */
}
.tabs >>> .el-tabs__content{
  /* background-color:#0b3c61; */
}

.tabs >>> .el-tabs__nav-scroll{
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
.tabs_jqnr{
  padding: 0;
}
.table{
  width: 100%;
}
.tbody{
  width: 100%;
}
.tbody tr td{
  display:inline;
  padding: 5px 0px;
  text-align: left;
  color: #b6f6ff;
} 
.textClass{
  margin-left: 35px;
}
.spanClass{
  word-break: break-all;
  /* background-color: #333; */
  display:table-cell;
  padding: 2px 3px;
  width: 165px;
  color: white;
}
.spanClass2{
  word-break: break-all;
  /* background-color: #333; */
  display:table-cell;
  padding: 2px 3px;
  width: 425px;
  color: white;
}
.spantd{
  margin-left: 5px;
  display:inline;
}
.line{
  margin: 10px;
  color: #b6f6ff;
  font-size:14px;
}
</style>