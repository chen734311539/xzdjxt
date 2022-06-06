<template>
    <div class="czlogRightPanel">
      <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
        <div class="option-panel">
           <span>设备类别</span>
            <select v-model="type" style="width:200px;margin-left:10px;margin-right:20px;">
              <option v-for="item in typeList" :value="item.typecode" :key="item.typecode">{{ item.type }}</option>
            </select>
            <span>警员</span>
            <input v-model="user" class="inputClass"/>
             <!-- <Button type="primary" style="width:64px;margin-left:10px;" @click="clickSearchButton">查询</Button>
              <Button type="primary" style="width:64px;margin-left:10px;" @click="clickResetButton">重置</Button> -->
            <div class="buttonpanel">
              <HfxButton style="margin-left:20px;" @click="clickSearchButton" name="查询" :height=28 />
              <HfxButton style="margin-left:10px;" @click="clickResetButton" name="重置" :height=28  />
            </div>
          </div>
        <!-- <div class="tableheader">
          <div class="tableheader-div" style="width:5%;">序号</div>
          <div class="tableheader-div" style="width:10%;">类型</div>
          <div class="tableheader-div" style="width:10%;">部门</div>
          <div class="tableheader-div" style="width:10%;">警员</div>
          <div class="tableheader-div" style="width:15%;">登录IP</div>
          <div class="tableheader-div" style="width:20%;">操作时间</div><
          <div class="tableheader-div" style="width:30%;">操作日志</div>
        </div>
        <div class="tablebody">
          <el-scrollbar>
             <div class="row" v-for="data in czList" :key="data.id">
                <div class="row-div" style="width:5%;">{{data.xh}}</div>
                <div class="row-div" style="width:10%;">{{data.type}}</div>
                <div class="row-div" style="width:10%;">{{data.deptname}}</div>
                <div class="row-div" style="width:10%;">{{data.username}}</div>
                <div class="row-div" style="width:15%;">{{data.ip}}</div>
                <div class="row-div" style="width:20%;">{{data.operatetime}}</div>
                <div class="row-div" style="width:30%;">{{data.remark}}</div>
            </div>
          </el-scrollbar>
        </div>   -->
        <HfxTable :data="czList" :columns="columns"  class="tableclass" />
        <div class="pagePanel">
            <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
        </div>  
    </div>
</template>

<script>
import { mapState } from 'vuex'
import PagerNew from '@/components/base/PagerNew'
import HfxTable from '@/components/base/HfxTable'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'

export default {
  name: 'CzlogRightPanel',
  components: {PagerNew,LeftContentNameBar,HfxTable},
  data () {
    return {
      type:"",
      typeList:[],
      user:"",
      page:1,
      pageSize:20,
      totalSize:1,
      czList:[],
      columns:[
        {
          key:'xh',
          title:"序号",
          width:5,
        },
        {
          key:'type',
          title:"类型",
          width:10,
        },
         {
          key:'deptname',
          title:"部门",
          width:10,
        },
         {
          key:'username',
          title:"警员",
          width:10,
        },
         {
          key:'ip',
          title:"登录ip",
          width:15,
        },
         {
          key:'operatetime',
          title:"操作时间",
          width:20,
        },
         {
          key:'remark',
          title:"操作日志",
          width:30,
        },
      ],
    }
  },
  computed: mapState({
     currentDept: state => state.czlog.currentDept
  }),
  methods:{
    getCzrzListCallBack(data){
      this.totalSize = data.count;
      for(var i = 0;i<data.data.length;i++){
        data.data[i].xh = i+1;
      }
      this.czList = data.data;
    },
    getCzTypeCallBack(data){
      var obj = {id:0,typecode:"",type:"请选择"};
      data.unshift(obj);
      this.typeList = data;
    },
    pageChange(page){
        this.page = page;
        this.searchCz();
    },
    searchCz(){
      var paramObj = {};
      paramObj.deptcode = this.currentDept.deptcode;
      paramObj.page = this.page;
      paramObj.pagesize = this.pageSize;
      paramObj.typecode = this.type;
      paramObj.user = this.user;
      this.http.get("/czrz/getCzrzList",paramObj,this.getCzrzListCallBack,this,false);
    },
    clickSearchButton(){
      this.page = 1;
      this.searchCz();
    },
    clickResetButton(){
      this.page = 1;
      this.type="";
      this.user="";
      this.searchCz();
    }
  },
  created(){
        this.http.get("/czrz/getCzType",null,this.getCzTypeCallBack,this,false);
  },
  watch : {
      currentDept:function(val) {
        this.page = 1;
        this.http.get("/czrz/getCzrzList",{deptcode:this.currentDept.deptcode,page:this.page,pagesize:this.pageSize},this.getCzrzListCallBack,this,false);
      }
  }
}
</script>

<style scoped>
.czlogRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
  color: #b6f6ff;
}
.option-panel{
  height:40px;
  width:100%;
  position: relative;
  padding: 0px 10px;
  display: inline-flex;
  align-items: center;
  margin: 10px 0 10px 0;
  background-color: rgba(88,245,255, 0.1);
  /* border: 1px solid #b6f6ff; */
}
.inputClass{
    width: 200px;
    height: 28px;
    background-color: transparent;
    outline: 0;
    color: #b6f6ff;
    border: 1px solid #b6f6ff;
    margin-left:15px;
}
.tableheader{
  color: white;
  margin-top: 10px;
  height:30px;
  width:100%;
  background:rgba(250, 250, 250, 0.06);
  position: relative;
  line-height: 30px;
}
.tableheader-div{
  display: inline-block;
  text-align: center;
}
.tablebody{
  height:calc(100% - 32px - 40px - 30px - 30px);
}
.pagePanel{
  height: 30px;
  text-align: center;
  position:absolute;
  /* 左移一半少自身宽度一半为中间 */
  left:calc(50% - 125px);
  bottom: 0;
}
.pagebar{
  height: 23px;
}
.row{
  color: white;
  background: rgba(255, 255, 255, 0.1);
  min-height: 25px;
  margin-bottom: 5px;
}
.row-div{
  position: relative;
  display: inline-block;
  text-align: center;
  word-wrap:break-word;
  word-break:break-all;
  min-height: 25px;
  line-height: 25px;
}
.buttonpanel{
  display: flex;
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
.tableclass{
  height:calc(100% - 135px) !important;
}
</style>