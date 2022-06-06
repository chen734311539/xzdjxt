<template>
 <div class="yqsjRightPanel">
   <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
    <div class="headerdatapanel">
      <div class="modal-div">
        <span>新增确诊：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.xzqzcount" />
      </div>

      <div class="modal-div">
        <span>现存确诊：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.xcqzcount" />
      </div>
      <div class="modal-div">
        <span>累计确诊：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.ljqzcount" />
      </div>
      <div class="modal-div">
        <span>待流调人员：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.dldcount" />
      </div>
      <div class="modal-div">
        <span>待区域协查人员：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.dqyxccount" />
      </div>
      <div class="modal-div">
        <span>待核酸检测人员：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.djccount" />
      </div>
      <div class="modal-div">
        <span>待转运人员：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.dzycount" />
      </div>
      <div class="modal-div">
        <span>待隔离人员：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.dglcount" />
      </div>
      <div class="modal-div">
        <span>剩余床位：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.sycwcount" />
      </div>
      <div class="modal-div">
        <span>人员储备：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.rycb" />
      </div>
      <div class="modal-div">
        <span>物资储备：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.wzcb" />
      </div>
      <div class="modal-div">
        <span>社区阳性：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.yxql" />
      </div>
      <div class="modal-div"> 
        <span>隔离点阳性：</span>
        <input style="width: 180px;" class="inputclass" v-model="headerData.gldql" />
      </div>
    </div>
    <div class="leftdatapanel_one">
      <div class="modal-div"> 
        <span>流调组人数：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.ldzrs" />
      </div>
      <div class="modal-div"> 
        <span>流调能力：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.ldznl"  />
      </div>
      <div class="modal-div"> 
        <span>流调状态：</span>
        <!-- <input style="width: 180px;" class="inputclass" v-model="leftData.ldzstate"  /> -->
        <select class="inputclass" v-model="leftData.ldzstate" >
          <option value="正常">正常</option>
          <option value="紧张">紧张</option>
          <option value="预警">预警</option>
        </select>
      </div>

      <div class="modal-div"> 
        <span>转运车辆数：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.zycls"  />
      </div>
      <div class="modal-div"> 
        <span>转运能力：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.zynl"  />
      </div>
      <div class="modal-div"> 
        <span>转运状态：</span>
        <!-- <input style="width: 180px;" class="inputclass" v-model="leftData.zystate"  /> -->
        <select class="inputclass" v-model="leftData.zystate" >
          <option value="正常">正常</option>
          <option value="紧张">紧张</option>
          <option value="预警">预警</option>
        </select>
      </div>

      <div class="modal-div"> 
        <span>核酸检测医院数：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.yys"  />
      </div>
      <div class="modal-div"> 
        <span>医院核酸检测能力：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.yynl"  />
      </div>
      <div class="modal-div"> 
        <span>医院核酸状态：</span>
        <!-- <input style="width: 180px;" class="inputclass" v-model="leftData.yystate"  /> -->
        <select class="inputclass" v-model="leftData.yystate" >
          <option value="正常">正常</option>
          <option value="紧张">紧张</option>
          <option value="预警">预警</option>
        </select>
      </div>


      <div class="modal-div"> 
        <span>核酸采集点数：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.hscjds"  />
      </div>
      <div class="modal-div"> 
        <span>核酸采集能力：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.hscjdnl"  />
      </div>
      <div class="modal-div"> 
        <span>采集状态：</span>
        <!-- <input style="width: 180px;" class="inputclass" v-model="leftData.hscjdstate"  /> -->
        <select class="inputclass" v-model="leftData.hscjdstate" >
          <option value="正常">正常</option>
          <option value="紧张">紧张</option>
          <option value="预警">预警</option>
        </select>
      </div>


      <div class="modal-div"> 
        <span>床位数量：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.cws"  />
      </div>
      <div class="modal-div"> 
        <span>床位能力：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.cwnl"  />
      </div>
      <div class="modal-div"> 
        <span>床位状态：</span>
        <!-- <input style="width: 180px;" class="inputclass" v-model="leftData.cwstate"  /> -->
        <select class="inputclass" v-model="leftData.cwstate" >
          <option value="正常">正常</option>
          <option value="紧张">紧张</option>
          <option value="预警">预警</option>
        </select>
      </div>

    </div>
    <div class="leftdatapanel_two">

      <div class="modal-div"> 
        <span>接线员数量：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.jxys" />
      </div>
      <div class="modal-div"> 
        <span>接线能力：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.jxynl" />
      </div>
      <div class="modal-div"> 
        <span>接线状态：</span>
        <!-- <input style="width: 180px;" class="inputclass" v-model="leftData.jxystate" /> -->
        <select class="inputclass" v-model="leftData.jxystate" >
          <option value="正常">正常</option>
          <option value="紧张">紧张</option>
          <option value="预警">预警</option>
        </select>
      </div>


      <div class="modal-div"> 
        <span>局域协查人数：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.jyxcrs" />
      </div>
      <div class="modal-div"> 
        <span>协查能力：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.jyxcnl" />
      </div>
      <div class="modal-div"> 
        <span>协查状态：</span>
        <!-- <input style="width: 180px;" class="inputclass" v-model="leftData.jyxcstate" /> -->
        <select class="inputclass" v-model="leftData.jyxcstate" >
          <option value="正常">正常</option>
          <option value="紧张">紧张</option>
          <option value="预警">预警</option>
        </select>
      </div>

      <div class="modal-div"> 
        <span>快检测剩余：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.kldnla"  />
      </div>
      <div class="modal-div"> 
        <span>快检测总量：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.kldnlb" />
      </div>
      
      <div class="modal-div"> 
        <span>快流调剩余：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.kldnla" />
      </div>
      <div class="modal-div"> 
        <span>快流调总量：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.kldnlb"  />
      </div>

      <div class="modal-div"> 
        <span>快编组剩余：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.kbznla"  />
      </div>
      <div class="modal-div"> 
        <span>快编组总量：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.kbznlb"  />
      </div>

      <div class="modal-div"> 
        <span>快转运剩余：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.kzynla"  />
      </div>
      <div class="modal-div"> 
        <span>快转运总量：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.kzynlb"  />
      </div>

      <div class="modal-div"> 
        <span>快隔离剩余：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.kglnla"  />
      </div>
      <div class="modal-div"> 
        <span>快隔离总量：</span>
        <input style="width: 180px;" class="inputclass" v-model="leftData.kglnlb"  />
      </div>
    </div>
    <HfxButton  :width="180"  class="updatebutton" @click="updateYqsj"  name="更新数据" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'DjdaRightPanel',
  components: {LeftContentNameBar},
  data () {
    return {
        headerData:{

        },
        leftData:{

        },
    }
  },
  computed: {...mapState({
      userInfo: state => state.userInfo,
    }),
  },
  methods:{
    getLeftData(){
      this.http.get("/ybss/getLeftData",null,this.getLeftDataCallBack,this,false);
    },
    getLeftDataCallBack(result){
      this.leftData=result;
    },
    getHeaderData(){
      this.http.get("/ybss/getHeaderData",null,this.getHeaderDataCallBack,this,false);
    },
    getHeaderDataCallBack(result){
      this.headerData=result;
    },
    updateYqsj(){
      var paramObj={};
      paramObj.headerdata=this.headerData;
      paramObj.leftdata=this.leftData;
      this.http.get("/ybss/mdyYqfkData",paramObj,this.mdyYqfkDataCallBack,this,false);
    },
    mdyYqfkDataCallBack(result){
      this.$Message.success(result);
      this.getHeaderData();
      this.getLeftData();     
    },
  },
  created(){
    this.getHeaderData();
    this.getLeftData();
  },
  watch : {
  }
}
</script>

<style scoped>
.yqsjRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
  padding: 4px;
}
.modal-div{
  margin: 10px 0 10px 0;
  line-height: 28px;
}
.modal-div span{
  float: left;
  width: 120px;
  text-align: right;
  margin-right: 10px;
  color: #b6f6ff;
}
.inputclass{
  width:180px;
  height: 28px;
  padding: 0 10px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
select {
  height:25px;
  width:111px;
  color: white;
  border: 1px solid white;
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
  border: 1px solid white;
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
.headerdatapanel{
  position: absolute;
  width: 340px;
  height: 60%;
  left: 250px;
  top: 50px;
}
.leftdatapanel_one{
  position: absolute;
  width: 340px;
  height: 60%;
  left: 590px;
  top: 50px;
}
.leftdatapanel_two{
  position: absolute;
  width: 340px;
  height: 60%;
  left: 900px;
  top: 50px;
}
.updatebutton{
  position: absolute;
  left: calc( 50% - 90px );
  bottom:100px;
}
</style>

