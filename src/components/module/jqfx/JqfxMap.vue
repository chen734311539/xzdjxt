<template>
    <div class="jqfxMapPanel">
        <div class="leftPanel">
          <div class="modal-div" style="padding-top: 23px;">
              <span class="div-span">当前单位：</span>
              <input class="inputclass" readonly="readonly" v-model="deptname"/>
              <Button style="margin-left: 10px;" type="primary" size="small" @click="clearYjLayer">清空图层</Button>
          </div>
          <div class="modal-div">
              <span class="div-span">警情数量：</span>
              <input class="inputclass" readonly="readonly" v-model="jqcount"/>
          </div>
          <div class="modal-div">
              <span class="div-span">警情类别：</span>
              <Select :multiple="true" v-model="jqlbcode" style="width:calc(100% - 90px)" :clearable="true">
                <Option :value="jjlbObj.code" v-for="jjlbObj in jjlbList" :key="jjlbObj.code">{{jjlbObj.name}}</Option>
              </Select>
          </div>
          <div class="modal-div">
              <span class="div-span">开始时间：</span>
              <el-date-picker v-model="startdate" style="width:130px" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptionsStart"  placeholder="选择日期" size="mini"></el-date-picker>
          </div>
          <div class="modal-div">
              <span class="div-span">结束时间：</span>
              <el-date-picker v-model="enddate" style="width:130px" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptionsEnd"  placeholder="选择日期" size="mini"></el-date-picker>
              <Button style="margin-left: 10px;" type="warning" size="small" @click="showJuhe">点位展示</Button>
          </div>
          <div class="modal-div">
              <Button style="margin-left: 12px;" type="primary" size="small" @click="showLayer(-30)">近一月</Button>
              <Button style="margin-left: 12px;" type="primary" size="small" @click="showLayer(-90)">近三月</Button>
              <Button style="margin-left: 12px;" type="primary" size="small" @click="showLayer(-180)">近半年</Button>
              <Button style="margin-left: 12px;" type="primary" size="small" @click="showLayer(-365)">近一年</Button>
          </div>
        </div>
        <div class="rightPanel">
            <MapCreate :mapid="mapid"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import MapCreate from '@/components/map/MapCreate'
import markCreateUtil from '@/components/map/js/markCreateUtil'
export default {
  name: 'JqfxMap',
  components: {MapCreate},
  data () {
    return {
      mapid:"jqfxmap",
      deptcode:'',
      deptname:'',
      jqcount:'',
      inputred:'30',
      inputyellow:'20',
      inputgreen:'10',
      startdate:'',
      enddate:'',
      jjlbList:[],
      jqlbcode:[],
    }
  },
  computed: {
    ...mapState({
      userInfo:state => state.userInfo,
      currentDept: state => state.jqfx.currentDept,
    }),
    pickerOptionsEnd:function(){
      var that = this;
      return {
        disabledDate(time){
          if(that.startdate==""||that.startdate==null){
             return false;
          }
          return time.getTime() <= new Date(that.startdate.replace(/-/g,"/")).getTime();
        }
      }
    },
    pickerOptionsStart:function(){
      var that = this;
      return {
        disabledDate(time){
          if(that.enddate==""||that.enddate==null){
             return false;
          }
          return time.getTime() >= new Date(that.enddate.replace(/-/g,"/")).getTime();
        }
      }
    },
  },
  methods:{
      getMapObj(mapid){//获取map对象，里面的值格式等同this.map中的格式,多加一个id
        for(var i=0;i<this.mapList.length;i++){
            if(this.mapList[i].id=mapid){
              return this.mapList[i];
            }
        }
        return null;
      },
      showLayer(day){
        this.enddate = "";
        this.startdate = this.$moment(this.common.addDate(day)).format("YYYY-MM-DD");
        this.showJuhe();
      },
      showJuhe(){
        if(this.startdate==""){
           this.$Message.error("请选择开始时间");
           return;
        }
        this.http.get("/tjfx/getJqPoints",{startdate:this.startdate,enddate:this.enddate,jqlbcode:this.jqlbcode,deptcode:this.deptcode},this.getJqPointsCallBack,this,false);
      },
      getJqPointsCallBack(data){
         this.jqcount = data.length;
         markCreateUtil.addClusterPoints("jqfx_layer",data,this.getMapObj(this.mapid));//聚合图层
      },
      searchCount(val){
        if(this.deptcode=="" || this.deptcode==null){
          this.$Message.error("请选择部门");
          return;
        }
        var param = {};
        param.deptcode = this.deptcode;
        param.type = val;
        this.http.get("/tjfx/getJqfxYjCount",param,this.getJqfxYjCountCallBack,this,false);
      },
      getJqfxYjCountCallBack(result){
        var hasxq = result.hasxq;
        if(hasxq=='0'){
          this.$Message.error("该部门还没有辖区范围，请先在辖区管理模块画辖区");
          return;
        }
        this.jqcount = result.jqcount;
        var red = 'rgba(255,0,0,0.5)';
        var yellow = 'rgba(255,255,0,0.5)';
        var green = 'rgba(0,128,0,0.5)';
        if(result.jqcount<this.inputyellow){
           result.polygoncolor = green;
        }
        if(result.jqcount>this.inputyellow&&result.jqcount<this.inputred){
           result.polygoncolor = yellow;
        }
        if(result.jqcount>this.inputred){
           result.polygoncolor = red;
        }
        result.type = "jqfx";
        markCreateUtil.addPolygonMark("jqfx_layer",result,this.getMapObj(this.mapid));//打点
      },
      clearYjLayer(){
        markCreateUtil.clearLayer("jqfx_layer",this.getMapObj(this.mapid));
      },
      getSsjqLbCallBack(data){
        this.jjlbList = data;
      },
  },
  created(){
      //获取警情类别
     this.http.get("/ssjq/getSsjqLb",null,this.getSsjqLbCallBack,this,false);
  },
  mounted(){
    
  },
  watch : {
      currentDept:function(val) {
        this.deptname = val.deptname;
        this.deptcode = val.deptcode;
      },
  }
}
</script>

<style scoped>
.jqfxMapPanel{
  height: 100%;
  width: 100%;
}
.leftPanel{
  width: 20%;
  height: 100%;
  float: left;
  border-right: 1px solid #2d8cf0;
  overflow: hidden;
}
.modal-div{
  margin: 0 0 20px 0;
}
.div-span{
  float: left;
  width: 85px;
  font-size: 14px;
  text-align: right;
  margin-right: 0px;
  color: #409eff;
  padding-top: 5px;
}
.inputclass{
  width:130px;
  height: 28px;
  outline: none;
  color: #b6f6ff;
  padding: 0 10px;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.numberinput >>> .el-input__inner{
  background-color: #08385a;
  color: #b6f6ff;
  border: 0px;
  border-radius: 0px;
}
.rightPanel{
  width:80%;
  height:100%;
  float: left;
  background: #fff;
  overflow: hidden;
}
</style>
<style>
/*********下拉框样式 分割线**************/
.jqfxMapPanel .ivu-select-selection{
    background: #d4d4d400;
    border-radius: 0px;
    border: 1px solid #0188fb;
}
.jqfxMapPanel .ivu-select-dropdown{
    background: #105194;
}
.jqfxMapPanel .ivu-select-item{
    color: #fff;
}
.jqfxMapPanel .ivu-select-item-selected{
    color: #0188fb;
}
.ivu-select-item-focus{
    background: #a7aab1;
}
.jqfxMapPanel .ivu-select-item:hover{
    background: #a7aab1;
}
.jqfxMapPanel .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
    color: #a7aab1;
}
.jqfxMapPanel .ivu-input{
    background: #d4d4d400;
    border-radius: 0px;
    border: 1px solid #0188fb;
    color: #fff;
}
</style>

