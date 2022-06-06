<template>
    <div class="mrtbpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
      <div class="seachbar">
            <div class="seachbar_caozuo">
              <span style="color:#b6f6ff;" >选择月份：</span>
              <el-date-picker type="month" v-model="selectedmonth" style="width:220px;" :clearable="false"  value-format="yyyy-MM" @change="changeselectedMonth" placeholder="选择月份" />
              <div  class="seachbar_add"  title="添加" @click="showAddBxgc" ></div>
            </div>
      </div>
      <div class="mrtblist-panel">
        <BxgcButton v-for="Obj in monthList" :key="Obj" :data="Obj"  @on-click="changeDate" />
      </div>
      <Modal v-model="isShowAdd" :draggable = "true" title="新增比学赶超" class-name="bxgcadd-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="BxgcAddPanel" style="position: reative;">
            <span >选择月份：</span>
            <el-date-picker type="month" v-model="month" value-format="yyyy-MM" placeholder="选择月份" />
            <div class="jqcount">   
              <h6>比学赶超评比第一部分</h6>
              <table border="1">
                <thead>
                  <tr ref="hqwn_dept">
                    <th></th>
                    <th v-for="Obj in deptArr1" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="dept1_fzkfa">
                    <td style="display:inline-block;width:65px;">反诈控方案</td>
                    <td v-for="Obj in deptArr1" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept1_jcgz">
                    <td style="display:inline-block;width:65px;">基础工作</td>
                    <td v-for="Obj in deptArr1" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept1_xsdj">
                    <td style="display:inline-block;width:65px;">刑事打击</td>
                    <td v-for="Obj in deptArr1" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept1_zxgz">
                    <td style="display:inline-block;width:65px;">专项工作</td>
                    <td v-for="Obj in deptArr1" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept1_zxcy">
                    <td style="display:inline-block;width:65px;">争先创优</td>
                    <td v-for="Obj in deptArr1" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept1_dwjs">
                    <td style="display:inline-block;width:65px;">队伍建设</td>
                    <td v-for="Obj in deptArr1" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept1_zfgf">
                    <td style="display:inline-block;width:65px;">执法规范</td>
                    <td v-for="Obj in deptArr1" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr> 
                  <tr ref="dept1_hqtotal">
                    <td style="display:inline-block;width:65px;">红旗累计数</td>
                    <td v-for="Obj in deptArr1" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="dept1_wntotal">
                    <td style="display:inline-block;width:65px;">蜗牛累计数</td>
                    <td v-for="Obj in deptArr1" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>                 
                </tbody>
            </table>
          </div>
            <div class="jqcount" style="margin-top:20px;">   
              <h6>比学赶超评比第二部分</h6>
              <table border="1">
                <thead>
                  <tr ref="yxjq_dept">
                    <th></th>
                    <th v-for="Obj in deptArr2" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="dept2_fzkfa">
                    <td style="display:inline-block;width:65px;">反诈控方案</td>
                    <td v-for="Obj in deptArr2" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept2_jcgz">
                    <td style="display:inline-block;width:65px;">基础工作</td>
                    <td v-for="Obj in deptArr2" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept2_xsdj">
                    <td style="display:inline-block;width:65px;">刑事打击</td>
                    <td v-for="Obj in deptArr2" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept2_zxgz">
                    <td style="display:inline-block;width:65px;">专项工作</td>
                    <td v-for="Obj in deptArr2" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept2_zxcy">
                    <td style="display:inline-block;width:65px;">争先创优</td>
                    <td v-for="Obj in deptArr2" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept2_dwjs">
                    <td style="display:inline-block;width:65px;">队伍建设</td>
                    <td v-for="Obj in deptArr2" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr>
                  <tr ref="dept2_zfgf">
                    <td style="display:inline-block;width:65px;">执法规范</td>
                    <td v-for="Obj in deptArr2" :key="Obj.deptcode">
                      <select class="inputclass" >
                        <option value="10">红旗</option>
                        <option value="20">蜗牛</option>
                        <option value="30" selected></option>
                      </select>
                    </td>
                  </tr> 
                  <tr ref="dept2_hqtotal">
                    <td style="display:inline-block;width:65px;">红旗累计数</td>
                    <td v-for="Obj in deptArr2" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="dept2_wntotal">
                    <td style="display:inline-block;width:65px;">蜗牛累计数</td>
                    <td v-for="Obj in deptArr2" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>               
                </tbody>
            </table>
          </div>
          </div>
          <div slot="footer">
            <HfxButton @click="clearBxgcInsertform" name="重置" />
            <HfxButton @click="submitBxgcAdd" />
          </div>
        </Modal>
    </div>
</template>

<script>
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import { mapState } from 'vuex'
import PagerNew from '@/components/base/PagerNew'
import BxgcButton from '@/components/module/bxgc/BxgcButton'
import common from "@/common.js"
export default {
  name: 'Mrtb',
  components: {LeftContentNameBar,BxgcButton},
  data () {
    return {
      isShowAdd:false,//警情
      selectedmonth:"",//右侧展示选择的月份
      month:"",//新增选择的月份
      deptArr1:[],//展示部门列表1
      deptArr2:[],//展示部门列表2
      hqwnarr:[],//红旗蜗牛数据
      monthList:[],//日期数组
    }
  },
  computed: {...mapState({
     userInfo: state => state.userInfo,
    }),
  },
  methods:{
    showAddBxgc(){
      this.isShowAdd=true;
    },
    submitBxgcAdd(){
      if(this.month==null||this.month==""){
        this.$Message.error("请选择月份");
        return;
      }
      //部门
      var hqwndept1=this.deptArr1;
       //第一部分
      var dept1_fzkfa=this.$refs.dept1_fzkfa.children;
      var dept1_jcgz=this.$refs.dept1_jcgz.children;
      var dept1_xsdj=this.$refs.dept1_xsdj.children;
      var dept1_zxgz=this.$refs.dept1_zxgz.children;
      var dept1_zxcy=this.$refs.dept1_zxcy.children;
      var dept1_dwjs=this.$refs.dept1_dwjs.children;
      var dept1_zfgf=this.$refs.dept1_zfgf.children;
      var dept1_hqtotal=this.$refs.dept1_hqtotal.children;
      var dept1_wntotal=this.$refs.dept1_wntotal.children;
  
      for(var i=0;i<hqwndept1.length;i++){
        var hqwnvalueObj = {};
        hqwnvalueObj.fzkfa = dept1_fzkfa[i+1].children[0].value;
        hqwnvalueObj.jcgz = dept1_jcgz[i+1].children[0].value;
        hqwnvalueObj.xsdj = dept1_xsdj[i+1].children[0].value;
        hqwnvalueObj.zxgz = dept1_zxgz[i+1].children[0].value;
        hqwnvalueObj.zxcy = dept1_zxcy[i+1].children[0].value;
        hqwnvalueObj.dwjs = dept1_dwjs[i+1].children[0].value;
        hqwnvalueObj.zfgf = dept1_zfgf[i+1].children[0].value;
        hqwnvalueObj.hqtotal = dept1_hqtotal[i+1].children[0].value==""?"0":dept1_hqtotal[i+1].children[0].value;
        hqwnvalueObj.wntotal = dept1_wntotal[i+1].children[0].value==""?"0":dept1_wntotal[i+1].children[0].value;

        hqwnvalueObj.deptcode = hqwndept1[i].deptcode;
        hqwnvalueObj.month = this.month;
        this.hqwnarr.push(hqwnvalueObj);
      }

      //部门
      var hqwndept2=this.deptArr2;
       //第二部分
      var dept2_fzkfa=this.$refs.dept2_fzkfa.children;
      var dept2_jcgz=this.$refs.dept2_jcgz.children;
      var dept2_xsdj=this.$refs.dept2_xsdj.children;
      var dept2_zxgz=this.$refs.dept2_zxgz.children;
      var dept2_zxcy=this.$refs.dept2_zxcy.children;
      var dept2_dwjs=this.$refs.dept2_dwjs.children;
      var dept2_zfgf=this.$refs.dept2_zfgf.children;
      var dept2_hqtotal=this.$refs.dept2_hqtotal.children;
      var dept2_wntotal=this.$refs.dept2_wntotal.children;
  
      for(var i=0;i<hqwndept2.length;i++){
        var hqwnvalueObj = {};
        hqwnvalueObj.fzkfa = dept2_fzkfa[i+1].children[0].value;
        hqwnvalueObj.jcgz = dept2_jcgz[i+1].children[0].value;
        hqwnvalueObj.xsdj = dept2_xsdj[i+1].children[0].value;
        hqwnvalueObj.zxgz = dept2_zxgz[i+1].children[0].value;
        hqwnvalueObj.zxcy = dept2_zxcy[i+1].children[0].value;
        hqwnvalueObj.dwjs = dept2_dwjs[i+1].children[0].value;
        hqwnvalueObj.zfgf = dept2_zfgf[i+1].children[0].value;
        hqwnvalueObj.hqtotal = dept2_hqtotal[i+1].children[0].value==""?"0":dept2_hqtotal[i+1].children[0].value;
        hqwnvalueObj.wntotal = dept2_wntotal[i+1].children[0].value==""?"0":dept2_wntotal[i+1].children[0].value;
        hqwnvalueObj.deptcode = hqwndept2[i].deptcode;
        hqwnvalueObj.month = this.month;
        this.hqwnarr.push(hqwnvalueObj);
      }
      //统计每个部门的蜗牛和红旗
      for(var i=0;i<this.hqwnarr.length;i++){
        var hqwnObj=this.hqwnarr[i];
        var hqcount=0;
        var wncount=0;
        if(hqwnObj.fzkfa=='10'){hqcount++;}else if(hqwnObj.fzkfa=='20'){wncount++;}else{};
        if(hqwnObj.jcgz=='10'){hqcount++;}else if(hqwnObj.jcgz=='20'){wncount++;}else{};
        if(hqwnObj.xsdj=='10'){hqcount++;}else if(hqwnObj.xsdj=='20'){wncount++;}else{};
        if(hqwnObj.zxgz=='10'){hqcount++;}else if(hqwnObj.zxgz=='20'){wncount++;}else{};
        if(hqwnObj.zxcy=='10'){hqcount++;}else if(hqwnObj.zxcy=='20'){wncount++;}else{};
        if(hqwnObj.dwjs=='10'){hqcount++;}else if(hqwnObj.dwjs=='20'){wncount++;}else{};
        if(hqwnObj.zfgf=='10'){hqcount++;}else if(hqwnObj.zfgf=='20'){wncount++;}else{};
        this.hqwnarr[i].hqcount=hqcount;
        this.hqwnarr[i].wncount=wncount;
      }
      console.log(this.hqwnarr);
      var paramObj = {};
      paramObj.month = this.month;
      paramObj.hqwn = this.hqwnarr;
      this.http.post("/mrtb/addHqwn",paramObj,this.addHqwnCallBack,this,false); 

    },
    addHqwnCallBack(data){
      // this.isShowAdd=false;
      this.clearBxgcInsertform();
      this.$Message.success(data);
    },
    clearBxgcInsertform(){
      //部门
      var hqwndept1=this.deptArr1;
       //第一部分
      var dept1_fzkfa=this.$refs.dept1_fzkfa.children;
      var dept1_jcgz=this.$refs.dept1_jcgz.children;
      var dept1_xsdj=this.$refs.dept1_xsdj.children;
      var dept1_zxgz=this.$refs.dept1_zxgz.children;
      var dept1_zxcy=this.$refs.dept1_zxcy.children;
      var dept1_dwjs=this.$refs.dept1_dwjs.children;
      var dept1_zfgf=this.$refs.dept1_zfgf.children;
      var dept1_hqtotal=this.$refs.dept1_hqtotal.children;
      var dept1_wntotal=this.$refs.dept1_wntotal.children;
  
      for(var i=0;i<hqwndept1.length;i++){

        dept1_fzkfa[i+1].children[0].value='30';
        dept1_jcgz[i+1].children[0].value='30';
        dept1_xsdj[i+1].children[0].value='30';
        dept1_zxgz[i+1].children[0].value='30';
        dept1_zxcy[i+1].children[0].value='30';
        dept1_dwjs[i+1].children[0].value='30';
        dept1_zfgf[i+1].children[0].value='30';
        dept1_hqtotal[i+1].children[0].value="";
        dept1_wntotal[i+1].children[0].value="";


      }

      //部门
      var hqwndept2=this.deptArr2;
       //第二部分
      var dept2_fzkfa=this.$refs.dept2_fzkfa.children;
      var dept2_jcgz=this.$refs.dept2_jcgz.children;
      var dept2_xsdj=this.$refs.dept2_xsdj.children;
      var dept2_zxgz=this.$refs.dept2_zxgz.children;
      var dept2_zxcy=this.$refs.dept2_zxcy.children;
      var dept2_dwjs=this.$refs.dept2_dwjs.children;
      var dept2_zfgf=this.$refs.dept2_zfgf.children;
      var dept2_hqtotal=this.$refs.dept2_hqtotal.children;
      var dept2_wntotal=this.$refs.dept2_wntotal.children;
  
      for(var i=0;i<hqwndept2.length;i++){
        dept2_fzkfa[i+1].children[0].value='30';
        dept2_jcgz[i+1].children[0].value='30';
        dept2_xsdj[i+1].children[0].value='30';
        dept2_zxgz[i+1].children[0].value='30';
        dept2_zxcy[i+1].children[0].value='30';
        dept2_dwjs[i+1].children[0].value='30';
        dept2_zfgf[i+1].children[0].value='30';
        dept2_hqtotal[i+1].children[0].value="";
        dept2_wntotal[i+1].children[0].value="";
      }
      this.hqwnarr=[];
      this.month="";
    },
    getHqwnDeptCallBack(data){
      for(var i=0;i<data.length;i++){
        if(i<data.length/2){
          this.deptArr1.push(data[i]);
        }else{
          this.deptArr2.push(data[i]);
        }
      }
    },
    changeDate(val){
      this.$store.dispatch('putChildState',{"key":"bxgc","childkey":"currentMonth","value":val});
      this.selectedmonth=val;
    },
    getDateArr(){
      var datearr=[];
      for(var i=1;i<=10;i++){
        var date=this.common.dateFormat(this.common.addDate(0-i*30),"yyyy-MM");
        datearr.push(date);
      }
      this.monthList=datearr;
    },
    changeselectedMonth(val){
      this.$store.dispatch('putChildState',{"key":"bxgc","childkey":"currentMonth","value":val});
    },
    getBxgcByMonthCallBack(data){
      console.log(data);
      var deptArr1=[];
      var deptArr2=[];
      for(var i=0;i<data.length;i++){
        if(i<data.length/2){
          deptArr1.push(data[i]);
        }else{
          deptArr2.push(data[i]);
        }
      }

      //第一部分
      var dept1_hqtotal=this.$refs.dept1_hqtotal.children;
      var dept1_wntotal=this.$refs.dept1_wntotal.children;
      for(var i=0;i<deptArr1.length;i++){
        dept1_hqtotal[i+1].children[0].value=deptArr1[i].hqtotal;
        dept1_wntotal[i+1].children[0].value=deptArr1[i].wntotal;
      }
       //第二部分
      var dept2_hqtotal=this.$refs.dept2_hqtotal.children;
      var dept2_wntotal=this.$refs.dept2_wntotal.children;
  
      for(var i=0;i<deptArr2.length;i++){
        dept2_hqtotal[i+1].children[0].value=deptArr2[i].hqtotal;
        dept2_wntotal[i+1].children[0].value=deptArr2[i].wntotal;
      }

    },

  },
  created(){
    this.http.get("/mrtb/getHqwnDept",null,this.getHqwnDeptCallBack,this,false);
    var lastmonth=this.common.dateFormat(this.common.addDate(-30),'yyyy-MM');
    console.log(lastmonth);
    this.http.get("/mrtb/getHqwnByMonth",{"month":lastmonth},this.getBxgcByMonthCallBack,this,false); 
    this.getDateArr();
  },
  mounted(){
    
  }
}
</script>

<style scoped>
.mrtbpanel{
   height: 100%;
   width: 100%;
}
.seachbar{
  height: 50px;
} 
.seachbar_caozuo{
  position: relative;
  height: 40px;
  right: 0px;
  /* margin-bottom: 10px; */
}
.seachbar_add{
 position:absolute;
  cursor: pointer;
  right: 0px;
  top: 10px;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/ajzc/ajzc_add.png)  no-repeat;
}
.seachbar_shuaxin{
  position:absolute;
  right: 30px;
  top: 10px;
  cursor: pointer;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/ajzc/ajzc_refresh.png)  no-repeat;
}
.seachbar_datepicker{
  position: relative;
  height: 40px;
  right: 0px;
}
.mrtblist-panel{
  height: calc(100% - 100px);
  overflow: auto;
}
.jqcount table{
    border-spacing: 0;
    border-collapse: collapse;
    background-color: transparent;
    box-sizing: border-box;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    display: table;
    border-color: #b6f6ff;
}
.jqcount table td input{
    outline: none;
    width: 44px;
    background: transparent;
    color: #b6f6ff;
    height: 100%;
    text-align: center; 
    border: none;
}
select {
  height:25px;
  width:111px;
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
  height:30px;
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
.inputclass{
  width:100%;
  height: 28px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.woniu{
    width: 26px;
    height: 20px;
    background:url(./../../../assets/bxgc/woniu.png) no-repeat;
    background-size:100% 100%;
}
.hongqi{
    width: 26px;
    height: 20px;
    background:url(./../../../assets/bxgc/hongqi.png) no-repeat;
    background-size:100% 100%;
}
</style>
<style>
.bxgcadd-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left: 387px;
  width: 900px !important;
}
</style>
