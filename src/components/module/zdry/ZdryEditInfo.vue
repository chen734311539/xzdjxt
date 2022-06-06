<template>
    <Modal title="修改重点人员" v-model="showEditZdry" :draggable="true" class="zdryinfo-panel">
        <div slot="close"><div @click="close" class="hfx-modal-close"/></div>
          <table class="table-input">
				  <tbody>				  
					<tr>
						 <td>姓名 :</td><td><div><input class="inputClass" v-model="editObj.xm" type="text" ></div></td>
						 <td>证件号码 :</td><td><div><input class="inputClass" v-model="editObj.zjhm" type="text" readonly="readonly"></div></td>
					</tr>
          <tr>
					    <td>手机号码:</td>
					    <td><div><input class="inputClass" v-model="editObj.lxdh" type="text" ></div></td>
              <td>QQ号:</td>
					    <td><div><input class="inputClass" v-model="editObj.qqh" type="text" ></div></td>
					</tr>
          <tr>
					    <td>人员类别:</td>
					    <td><div>
                <select  v-model="editObj.zdrylb" style="width:150px;">
                  <option value="" >请选择人员类别</option>
                  <option value="基督教小群派">基督教小群派</option>
                  <option value="三峡移民">三峡移民</option>
                  <option value="涉警信访人员">涉警信访人员</option>
                  <option value="征地拆迁">征地拆迁</option>
                  <option value="涉军">涉军</option>
                  <option value="信访重点人员">信访重点人员</option>
                  <option value="法轮功">法轮功</option>
                  <option value="涉众型经济案件投资人">涉众型经济案件投资人</option>
                </select>
                </div></td>
					</tr>
          <tr>
					    <td>微信号:</td>
					    <td><div><input class="inputClass" v-model="editObj.wxh" type="text" ></div></td>
              <td>在用车牌号:</td>
					    <td><div><input class="inputClass" v-model="editObj.zycph" type="text" ></div></td>
					</tr>
					<tr>			 
					    <td>责任单位 :</td>
						<td><div>
              <DropdownTreeNew class="seachbar_dropdown" :deptListObj="deptListObj" :choiceDept="choiceDept" :orideptname="editObj.zrdw"/>
              </div></td>				 
					 	<td>评定等级 :</td>
					 	<td><div>
              <select v-model="editObj.level">
                <option value="黄色" selected="selected">黄色</option>
                <option value="橙色">橙色</option>
                <option value="红色">红色</option>
              </select>
            </div></td>
					</tr>	
					<tr>
					  <td>管控责任人:</td>
					  <td><div><input  class="inputClass" v-model="editObj.gkzrr" type="text"></div></td>
            <td>责任人联系方式:</td>
					  <td><div><input  class="inputClass" v-model="editObj.gkzrrlxfs" type="text" ></div></td>
					</tr>
				</tbody>
			</table>
			  <div><span>户籍地址 :</span><div><Input class="TextareaInput" v-model="editObj.hjdz"  type="textarea" :autosize="true" /></div></div>
        <div><span>现住地址 :</span><div><Input class="TextareaInput" v-model="editObj.xzdz"  type="textarea" :autosize="true" /></div></div>
        <div><span>管控详情 :</span><div><Input class="TextareaInput" v-model="editObj.gkremark" type="textarea" :autosize="true" /></div></div>   
        <div slot="footer">
          <HfxButton name="修改" :width=80 :height=28   @click="editZdry" /> 
        </div>
  </Modal>

</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import DropdownTreeNew from '@/components/base/DropdownTreeNew'

export default {
  name: 'ZdryEditInfo',
  props:['showEditZdry','infoObj'],
  components: {DropdownTreeNew},
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
    userInfo: state => state.userInfo,
    deptListObj: state => state.zdry.allDeptListObj
    }),
    editObj:function(){
      return this.infoObj;
    }
  },
  methods:{
    editZdry(){
      if(this.editObj.zjhm==null||this.editObj.zjhm==""){
        this.$Message.error("请填写重点人员证件号码");
        return;
      }
      if(this.editObj.deptcode==null||this.editObj.deptcode==""){
        this.$Message.error("请选择责任单位");
        return;
      }
      this.editObj['inserttime']= undefined;
      this.editObj['insertusercode']= undefined;
      this.editObj['insertusername'] = undefined;
      this.editObj['updatetime']= undefined;
      this.editObj['updateusercode']= undefined;
      this.editObj['updateusername'] = undefined;
      this.editObj['isdelete']= undefined;
      this.http.get("/zdry/updateZdry",this.editObj,this.updateZdryCallBack,this,false);
    },
    updateZdryCallBack(data){
      this.$Message.success("修改成功");
      this.$emit('on-fresh');	
      this.$emit('on-click');	
    },
    close(){
      this.$emit('on-click');	
    },
    choiceDept(data){
        this.editObj.deptcode = data.deptcode;
        this.editObj.zrdw=data.deptname;
      },
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
select{
  height:28px;
  color: #b6f6ff;
  border: 1px solid #b6f6ff;
  outline: none;
  background:transparent;
   padding-right: .14rem;
}
option{
  color: #b6f6ff;
  height:28px;
  border: 1px solid #b6f6ff;
  outline: none;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  background-color:rgba(8, 56, 90, 0.90);
   padding-right: .14rem;
}
.seachbar_dropdown{
  height: 28px;
  width: 150px;
  /* margin: 0px 0 17px 0; */
}
</style>