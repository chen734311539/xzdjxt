<template>
      <el-tabs class="tabs">
        <el-tab-pane label="人员信息" class="tabs_jqnr">
          <table v-if="infoObj">
				  <tbody>				  
					<tr>
						 <td>姓名 :</td><td><div><input class="inputClass" v-model="infoObj.xm" type="text" readonly="readonly"></div></td>
						 <td>证件号码 :</td><td><div><input class="inputClass" v-model="infoObj.zjhm" type="text" readonly="readonly"></div></td>
					</tr>
          <tr>
					    <td>手机号码:</td>
					    <td><div><input class="inputClass" v-model="infoObj.lxdh" type="text" readonly="readonly"></div></td>
              <td>QQ号:</td>
					    <td><div><input class="inputClass" v-model="infoObj.qqh" type="text" readonly="readonly"></div></td>
					</tr>
          <tr>
					    <td>人员类别:</td>
					    <td><div><input class="inputClass" v-model="infoObj.zdrylb" type="text" readonly="readonly"></div></td>
					</tr>
          <tr>
					    <td>微信号:</td>
					    <td><div><input class="inputClass" v-model="infoObj.wxh" type="text" readonly="readonly"></div></td>
              <td>在用车牌号:</td>
					    <td><div><input class="inputClass" v-model="infoObj.zycph" type="text" readonly="readonly"></div></td>
					</tr>
					<tr>			 
					    <td>责任单位 :</td>
						<td><div><input  class="inputClass" v-model="infoObj.zrdw" type="text" readonly="readonly"></div></td>				 
					 	<td>评定等级 :</td>
					 	<td><div><input  class="inputClass" v-model="infoObj.level" type="text" readonly="readonly"></div></td>
					</tr>	
					<tr>
					  <td>管控责任人:</td>
					  <td><div><input  class="inputClass" v-model="infoObj.gkzrr" type="text" readonly="readonly"></div></td>
            <td>责任人联系方式:</td>
					  <td><div><input  class="inputClass" v-model="infoObj.gkzrrlxfs" type="text" readonly="readonly"></div></td>
					</tr>
				</tbody>
			</table>
			  <div v-if="infoObj"><span>户籍地址 :</span><div><Input class="TextareaInput" v-model="infoObj.hjdz" readonly="readonly" type="textarea" :autosize="true" /></div></div>
        <div v-if="infoObj"><span>现住地址 :</span><div><Input class="TextareaInput" v-model="infoObj.xzdz" readonly="readonly" type="textarea" :autosize="true" /></div></div>
        <div v-if="infoObj"><span>管控详情 :</span><div><Input class="TextareaInput" v-model="infoObj.gkremark" readonly="readonly" type="textarea" :autosize="true" /></div></div>	
        </el-tab-pane>
        <el-tab-pane label="反馈信息" v-if="infoObj">
          <div v-for="Obj in infoObj.hcxxlist" :key="Obj.id" style="margin-bottom:8px;">
            <div style="display: flex;justify-content: space-around;">
              <span>录入人:</span>{{Obj.lrr}}
              <span>录入时间 :</span>{{Obj.lrsj}}
              <span>录入单位 :</span>{{Obj.lrdw}}
            </div>
            <div>
              <Input class="FanKuiInput" v-model="Obj.remark" readonly="readonly" type="textarea" :autosize="true" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'ZdryDetailInfo',
  props:['infoObj'],
  components: {},
  data () {
    return {
    }
  },
  computed: {
  },
  methods:{
  },
  created(){
  },
  watch : {
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
.inputClass{
    width: 150px;
    height: 28px;
    background-color: transparent;
    outline: 0;
    padding: 5px;
    color: #b6f6ff;
    border: 1px solid #b6f6ff;
}
.TextareaInput{
  width:480px;
}
.TextareaInput >>> textarea{
  width: 460px;
  min-height: 56px;
  font-size: 12px;
  padding: 0 10px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.FanKuiInput{
  width:480px;
}
.FanKuiInput >>> textarea{
  width: 460px;
  min-height: 40px;
  font-size: 12px;
  padding: 0 10px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
</style>