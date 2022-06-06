<template>
    <div class="ldryRightPanel">
      <LeftContentNameBar :isshowshaixuan="false"  style="margin:0 0 0 0;" />
        <div class="headerPanel">
            <div class="header">登记状态</div>
            <select v-model="ppzt" style="width:200px;margin-left:10px;" @on-change="changePpzt">
                  <option value="" >请选择</option>
                  <option value="已登记" >已登记</option>
                  <option value="未登记" >未登记</option>
            </select>
            <div class="header2">搜索内容</div>
            <div><input v-model="searchname" class="inputClass"/></div>
            <!-- <Button type="primary" @click="searchDateByName()" style="margin-left:10px;">搜索</Button> -->
            <HfxButton @click="searchDateByName()" style="margin-left:10px;" name="搜索" />
            <Upload class="upload" :action="uploadCjxxUrl" :on-success="uploadCjxxSuccess" :on-error="uploadCjxxError">
                <!-- <Button  type="primary" icon="ios-cloud-upload-outline">上传处警信息</Button> -->
                <HfxButton  name="上传处警信息" :width=100 />
            </Upload>
            <Upload class="upload" :action="uploadSjryUrl" :on-success="uploadSjrySuccess" :on-error="uploadSjryError">
                <!-- <Button  type="primary" icon="ios-cloud-upload-outline">上传涉警人员</Button> -->
                <HfxButton name="上传涉警人员" :width=100 />
            </Upload>
        </div>
        <div class="contentPanel" ref="contentPanel">
          <!-- <Table ref="table" stripe :columns="columns" :data="data" :row-class-name="getRowClassName">
              <template slot-scope="{ row, index }" slot="action">
                  <Button type="primary" size="small" style="margin-right: 5px" @click="selectLdryDetail(row)">详情</Button>
              </template>
          </Table> -->
          <HfxTable ref="table" :data="data" :columns="columns"  class="tableclass" >
            <template #formartsfdd="{row,index}">
                  <span  :title="[row.sfdd]">{{common.cutstr(row.sfdd,30)}}</span>
            </template>
            <template #formartcljg="{row,index}">
                  <span  :title="[row.cljg]">{{common.cutstr(row.cljg,40)}}</span>
            </template>
            <template slot-scope="{ row,index }" slot="action">
              <div class="tablebutton">
                <HfxButton style="margin-right: 5px" @click="selectLdryDetail(row)" name="详情" />
              </div>
            </template>
          </HfxTable>
        </div>
        <PagerNew class="pagePanel" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
        <Modal title="人员详情" v-model="showLdryDetail" :draggable="true"  class="ldryinfo-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
           <el-tabs  class="tabs">
              <el-tab-pane label="人员信息" v-if="ldryDetailObj.jzzry">
                  <table class="table">
                    <tbody class="tbody">
                        <tr>
                          <td class="textClass">姓名:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.xm==null||ldryDetailObj.jzzry.xm=="")?"&nbsp;":ldryDetailObj.jzzry.xm}}</span></td>
                          <td class="textClass">身份证号:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.sfzh==null||ldryDetailObj.jzzry.sfzh=="")?"&nbsp;":ldryDetailObj.jzzry.sfzh}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass">性别:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.xb==null||ldryDetailObj.jzzry.xb=="")?"&nbsp;":ldryDetailObj.jzzry.xb}}</span></td>
                          <td class="textClass">出生日期:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.csrq==null||ldryDetailObj.jzzry.csrq=="")?"&nbsp;":ldryDetailObj.jzzry.csrq}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass">民族:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.mz==null||ldryDetailObj.jzzry.mz=="")?"&nbsp;":ldryDetailObj.jzzry.mz}}</span></td>
                          <td class="textClass">文化程度:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.whcd==null||ldryDetailObj.jzzry.whcd=="")?"&nbsp;":ldryDetailObj.jzzry.whcd}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">婚姻状况:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.hyzk==null||ldryDetailObj.jzzry.hyzk=="")?"&nbsp;":ldryDetailObj.jzzry.hyzk}}</span></td>
                          <td class="textClass">政治面貌:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.zzmm==null||ldryDetailObj.jzzry.zzmm=="")?"&nbsp;":ldryDetailObj.jzzry.zzmm}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">联系电话:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.lxdh==null||ldryDetailObj.jzzry.lxdh=="")?"&nbsp;":ldryDetailObj.jzzry.lxdh}}</span></td>
                          <td class="textClass">户籍地址:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.hjdz==null||ldryDetailObj.jzzry.hjdz=="")?"&nbsp;":ldryDetailObj.jzzry.hjdz}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">暂住地址:</td><td class="spantd"><span class="spanClass2">{{(ldryDetailObj.jzzry.zzdz==null||ldryDetailObj.jzzry.zzdz=="")?"&nbsp;":ldryDetailObj.jzzry.zzdz}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">户主姓名:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.hzxm==null||ldryDetailObj.jzzry.hzxm=="")?"&nbsp;":ldryDetailObj.jzzry.hzxm}}</span></td>
                          <td class="textClass">户主电话:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.hzdh==null||ldryDetailObj.jzzry.hzdh=="")?"&nbsp;":ldryDetailObj.jzzry.hzdh}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">服务处所:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.fwcs==null||ldryDetailObj.jzzry.fwcs=="")?"&nbsp;":ldryDetailObj.jzzry.fwcs}}</span></td>
                          <td class="textClass">职业名称:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.zymc==null||ldryDetailObj.jzzry.zymc=="")?"&nbsp;":ldryDetailObj.jzzry.zymc}}</span></td>
                        </tr>
                        <!-- <tr>
                          <td class="textClass" style="margin-left:11px;">行政区划:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.xzqh==null||ldryDetailObj.jzzry.xzqh=="")?"&nbsp;":ldryDetailObj.jzzry.xzqh}}</span></td>
                          <td class="textClass">社区代码:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.sqdm==null||ldryDetailObj.jzzry.sqdm=="")?"&nbsp;":ldryDetailObj.jzzry.sqdm}}</span></td>
                        </tr> -->
                        <tr>
                          <td class="textClass" style="margin-left:11px;">暂住事由:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.zzsy==null||ldryDetailObj.jzzry.zzsy=="")?"&nbsp;":ldryDetailObj.jzzry.zzsy}}</span></td>
                          <td class="textClass">产业类型:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.cylx==null||ldryDetailObj.jzzry.cylx=="")?"&nbsp;":ldryDetailObj.jzzry.cylx}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">居住类型:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.jzlx==null||ldryDetailObj.jzzry.jzlx=="")?"&nbsp;":ldryDetailObj.jzzry.jzlx}}</span></td>
                          <td class="textClass" style="margin-left:23px;">拟居住时间:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.njzsj==null||ldryDetailObj.jzzry.njzsj=="")?"&nbsp;":ldryDetailObj.jzzry.njzsj}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">是否注销:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.iszx==null||ldryDetailObj.jzzry.iszx=="")?"&nbsp;":ldryDetailObj.jzzry.iszx}}</span></td>
                          <td class="textClass">到期日期:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.dqrq==null||ldryDetailObj.jzzry.dqrq=="")?"&nbsp;":ldryDetailObj.jzzry.dqrq}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">户主关系:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.hzgx==null||ldryDetailObj.jzzry.hzgx=="")?"&nbsp;":ldryDetailObj.jzzry.hzgx}}</span></td>
                          <td class="textClass">社区名称:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.sqmc==null||ldryDetailObj.jzzry.sqmc=="")?"&nbsp;":ldryDetailObj.jzzry.sqmc}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:23px;">派出所:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.pcs==null||ldryDetailObj.jzzry.pcs=="")?"&nbsp;":ldryDetailObj.jzzry.pcs}}</span></td>
                          <td class="textClass" style="margin-left:47px;">录入人:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.jzzry.lrr==null||ldryDetailObj.jzzry.lrr=="")?"&nbsp;":ldryDetailObj.jzzry.lrr}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">更新时间:</td><td class="spantd"><span class="spanClass2">{{(ldryDetailObj.jzzry.gxsj==null||ldryDetailObj.jzzry.gxsj=="")?"&nbsp;":ldryDetailObj.jzzry.gxsj}}</span></td>
                        </tr>
                    </tbody>
                  </table>
              </el-tab-pane>
              <el-tab-pane label="涉警信息" v-if="ldryDetailObj.sjry">
                  <table class="table">
                    <tbody class="tbody">
                        <tr>
                          <td class="textClass">姓名:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.sjry.xm==null||ldryDetailObj.sjry.xm=="")?"&nbsp;":ldryDetailObj.sjry.xm}}</span></td>
                          <td class="textClass">身份证号:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.sjry.sfzh==null||ldryDetailObj.sjry.sfzh=="")?"&nbsp;":ldryDetailObj.sjry.sfzh}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">接警编号:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.sjry.jjbh==null||ldryDetailObj.sjry.jjbh=="")?"&nbsp;":ldryDetailObj.sjry.jjbh}}</span></td>
                          <td class="textClass">涉警类别:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.sjry.sjlb==null||ldryDetailObj.sjry.sjlb=="")?"&nbsp;":ldryDetailObj.sjry.sjlb}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">人员类别:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.sjry.rylb==null||ldryDetailObj.sjry.rylb=="")?"&nbsp;":ldryDetailObj.sjry.rylb}}</span></td>
                          <td class="textClass">服务处所:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.sjry.fwcs==null||ldryDetailObj.sjry.fwcs=="")?"&nbsp;":ldryDetailObj.sjry.fwcs}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">户籍地址:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.sjry.hjdz==null||ldryDetailObj.sjry.hjdz=="")?"&nbsp;":ldryDetailObj.sjry.hjdz}}</span></td>
                          <td class="textClass">现住地址:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.sjry.xzdz==null||ldryDetailObj.sjry.xzdz=="")?"&nbsp;":ldryDetailObj.sjry.xzdz}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:23px;">登记人:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.sjry.djr==null||ldryDetailObj.sjry.djr=="")?"&nbsp;":ldryDetailObj.sjry.djr}}</span></td>
                          <td class="textClass">登记单位:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.sjry.djdw==null||ldryDetailObj.sjry.djdw=="")?"&nbsp;":ldryDetailObj.sjry.djdw}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">登记时间:</td><td class="spantd"><span class="spanClass2">{{(ldryDetailObj.sjry.djsj==null||ldryDetailObj.sjry.djsj=="")?"&nbsp;":ldryDetailObj.sjry.djsj}}</span></td>
                        </tr>
                    </tbody>
                </table>  
              </el-tab-pane>
              <el-tab-pane label="处警信息" v-if="ldryDetailObj.cjxx">
                <table class="table">
                    <tbody class="tbody">
                        <tr>
                          <td class="textClass" style="margin-left:11px;">接警编号:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.cjxx.jjbh==null||ldryDetailObj.cjxx.jjbh=="")?"&nbsp;":ldryDetailObj.cjxx.jjbh}}</span></td>
                          <td class="textClass">接警时间:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.cjxx.jjsj==null||ldryDetailObj.cjxx.jjsj=="")?"&nbsp;":ldryDetailObj.cjxx.jjsj}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">处理结果:</td><td class="spantd"><span class="spanClass2">{{(ldryDetailObj.cjxx.cljg==null||ldryDetailObj.cjxx.cljg=="")?"&nbsp;":ldryDetailObj.cjxx.cljg}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">发生地点:</td><td class="spantd"><span class="spanClass2">{{(ldryDetailObj.cjxx.sfdd==null||ldryDetailObj.cjxx.sfdd=="")?"&nbsp;":ldryDetailObj.cjxx.sfdd}}</span></td>
                        </tr>
                        <tr>
                          <td class="textClass" style="margin-left:11px;">处警单位:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.cjxx.cjdw==null||ldryDetailObj.cjxx.cjdw=="")?"&nbsp;":ldryDetailObj.cjxx.cjdw}}</span></td>
                          <td class="textClass" style="margin-left:47px;">处警人:</td><td class="spantd"><span class="spanClass">{{(ldryDetailObj.cjxx.cjr==null||ldryDetailObj.cjxx.cjr=="")?"&nbsp;":ldryDetailObj.cjxx.cjr}}</span></td>
                        </tr>
                    </tbody>
                </table>
              </el-tab-pane>
           </el-tabs>
           <div slot="footer">
            <!-- <Button type="primary" size="large" @click="hideLdryDetailModal">取消</Button> -->
            <HfxButton @click="hideLdryDetailModal" name="取消" />
           </div>
         </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import PagerNew from '@/components/base/PagerNew'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTable from '@/components/base/HfxTable'
export default {
  name: 'ZdryRightPanel',
  components: {PagerNew,LeftContentNameBar,HfxTable},
  data () {
    return {
      showLdryDetail:false,
      selectrow:null,//详情的行
      ldryDetailObj:{},//流动人员详情
      ppzt:"",
      searchname:"",
      columns: [
            {
                title: '序号',
                key: 'xh',
                width:5,
            },
            {
                title: '姓名',
                key: 'xm',
                width:10,
            },
            {
                title: '身份证号',
                key: 'sfzh',
                width:15,
            },
            {
                title: '性别',
                key: 'xb',
                width:5,
            },
            {
                title: '涉警类别',
                key: 'sjlb',
                width:10,
            },
            {
                title: '联系电话',
                key: 'lxdh',
                 width:10,
            },
            {
                title: '接警编号',
                key: 'jjbh',
                 width:15,
            },
            {
                title: '发生地点',
                key: 'sfdd',
                width:20,
                slot:'formartsfdd',
            },
            {
                title: '处理结果',
                key: 'cljg',
                width:20,
                slot:'formartcljg',
            },
            {
                title: '登记状态',
                key: 'ppzt',
                 width:5,
            },
            {
                title: '操作',
                slot: 'action',
                width:5,
             }
       ],
      data:[],
      totalSize:1,
      pageSize:25,
      page:1,
      uploadCjxxUrl:"",
      uploadSjryUrl:""
    }
  },
  computed: mapState({
   
  }),
  methods:{
      getLdrkDjxxCallBack(data){
        for(var i = 0;i<data.data.length;i++){
          data.data[i].xh = i+1;
        }
        this.data = data.data;
        this.totalSize = data.count;
      },
      pageChange(page){
        this.page = page;
        this.searchData();
      },
      searchData(){
        var paramObj = {};
        paramObj.page = this.page;
        paramObj.pagesize = this.pageSize;
        paramObj.ppzt = this.ppzt;
        paramObj.name = this.searchname;
        this.http.get("/ldrk/getLdrkDjxx",paramObj,this.getLdrkDjxxCallBack,this,false);
      },
      searchDateByName(){
        this.page =1;
        this.searchData();
      },
      changePpzt(val){
        this.page =1;
        this.searchData();
      },
      getRowClassName(row, index){
        return "";
      },
      selectLdryDetail(row){
        this.selectrow = row;
        this.showLdryDetailModal();
      },
      showLdryDetailModal(){
        this.showLdryDetail = true;
        var jjbh = this.selectrow.jjbh;
        if(jjbh=="无"){
          jjbh="";
        }
        this.http.get("/ldrk/getLdrkDetail",{jjbh:jjbh,sfzh:this.selectrow.sfzh},this.getLdrkDetailCallBack,this,false);
      },
      getLdrkDetailCallBack(data){
        this.ldryDetailObj = data;
      },
      hideLdryDetailModal(){
        this.showLdryDetail = false;
      },
      uploadCjxxSuccess(response, file, fileList){
          if(response.code==1){
              this.$Message.success("上传处警信息成功");
              this.page = 1;
              this.searchData();
          }else if(response.code==0){
              this.$Message.error(response.data);
          } 
      },
      uploadCjxxError(error, file, fileList){
          this.$Message.error("上传处警信息失败");
      },
      uploadSjrySuccess(response, file, fileList){
        if(response.code==1){
            this.$Message.success("上传涉警人员成功");
            this.page = 1;
            this.searchData();
        }else if(response.code==0){
            this.$Message.error(response.data);
        } 
      },
      uploadSjryError(error, file, fileList){
          this.$Message.error("上传涉警人员失败");
      }
  },
  created(){
    
  },
  mounted(){
    this.searchData();
    var sessionId = this.common.getSessionId();
    this.uploadCjxxUrl = Constants.url_prefix+'/ldrk/importLdrkExcel?param={table:"ldrk_cjxx"}&sessionId='+sessionId;
    this.uploadSjryUrl = Constants.url_prefix+'/ldrk/importLdrkExcel?param={table:"ldrk_sjry"}&sessionId='+sessionId;
  }
}
</script>

<style scoped>
.ldryRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
}
.headerPanel{
  height:40px;
  width:100%;
  position: relative;
  padding: 0px 10px;
  display: inline-flex;
  align-items: center;
  margin: 10px 0 10px 0;
  background-color: rgba(88,245,255, 0.1);
}
.header{
  padding:20px;
  color: #b6f6ff;
  font-size: 14px;
}
.header2{
  padding-left:20px;
  padding:20px;
  color: #b6f6ff;
  font-size: 14px;
}
.contentPanel{
  width: 100%;
  height: calc(100% - 125px);
}
.pagePanel{
  position: absolute;
  bottom: 0px;
  left: calc(50% - 125px);
  height: 25px;
  line-height: 25px;
  text-align:center;
}
.spantd{
  margin-left: 5px;
  display:inline;
}
.upload{
  margin-left: 10px;
}
.inputClass{
  width:180px;
  height: 28px;
  padding:0 10px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
select {
  height:28px;
  color: #b6f6ff;
  border: 1px solid #b6f6ff;
  outline: none;
  /*很关键：将默认的select选择框样式清除*/
  /* appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none; */
  /*将背景改为红色*/
  background:transparent;
  /*加padding防止文字覆盖*/
   padding-right: .14rem;
}
option {
  color: #b6f6ff;
  height:28px;
  border: 1px solid #b6f6ff;
  outline: none;
  /*很关键：将默认的select选择框样式清除*/
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  /*将背景改为项目颜色*/
  background-color:rgba(8, 56, 90, 0.90);
  /*加padding防止文字覆盖*/
   padding-right: .14rem;
}
.tablebutton{
  line-height: 26px;
  margin: 4px 0 0 0;
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
</style>
<style>
.ldryinfo-panel .ivu-modal .ivu-modal-content{
  position: absolute;
  top: 200px;
  left:750px;
  width: 600px !important;
}
/* .ivu-table .table-row-yello td:nth-last-child(2){
    background:rgba(255, 255, 0,1) !important; 
    color: #000;
}
.ivu-table .table-row-blue td:nth-last-child(2){
    background-color:rgba(11, 73, 245,1) !important;
    color: #fff;
}
.ivu-table .table-row-orange td:nth-last-child(2){
    background-color:rgba(233, 143, 111,1) !important;
    color: #fff;
}
.ivu-table .table-row-red td:nth-last-child(2){
    background-color:rgba(245, 11, 11,1) !important;
    color: #fff;
} */
</style>

