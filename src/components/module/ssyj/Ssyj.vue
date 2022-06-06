<template>
    <div class="ssyjpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
      <div class="seachbar">
            <div class="seachbar_caozuo">
              <div class="seachbar_shuaxin"  @click="flushItems" title="刷新" ></div>
              <div class="seachbar_add"  title="添加" @click="showAddSsyj" ></div>
            </div>
      </div>
      <div class="ssyjlist-panel">
         <SsyjButton v-for="ssyjObj in ssyjList" :key="ssyjObj.id" :data="ssyjObj"  @on-click="showRight" @on-del="delAndFlush" />
      </div>
      <PagerNew class="pagebar" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
      <Modal v-model="isShowAdd" :draggable = "true" title="新增三色预警" class-name="ssyjadd-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="SsyjAddPanel">
            <span >选择月份：</span>
            <DatePicker type="month" v-model="date" class="date-picker" placeholder="请选择月份" formart="yyyy-dd"  ></DatePicker>
            <span >选择上、中、下旬：</span>
            <select v-model="label" >
              <option value="">请选择</option>
              <option value="上旬">上旬(1-10号)</option>
              <option value="中旬">中旬(11-20号)</option>
              <option value="下旬">下旬(21-31号)</option>
            </select>
            <div class="jqcount">   
              <h6>一、有效警情</h6>
              <table border="1">
                <thead>
                  <tr ref="yxjq_dept">
                    <th></th><th>武原</th><th>西塘</th><th>望海</th><th>秦山</th><th>沈荡</th><th>百步</th><th>于城</th><th>澉浦</th><th>通元</th><th>交警</th><th>全县</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="yxjq_thisyear">
                    <td style="display:inline-block;width:44px;">今年</td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                  </tr>
                  <tr  ref="yxjq_lastyear">
                    <td style="display:inline-block;width:44px;">去年</td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div class="jqcount">   
              <h6>2、刑事警情</h6>
              <table border="1">
                <thead>
                  <tr ref="xsjq_dept">
                    <th></th><th>武原</th><th>西塘</th><th>望海</th><th>秦山</th><th>沈荡</th><th>百步</th><th>于城</th><th>澉浦</th><th>通元</th><th>全县</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsjq_thisyear">
                    <td style="display:inline-block;width:44px;">今年</td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                  </tr>
                  <tr ref="xsjq_lastyear">
                    <td style="display:inline-block;width:44px;">去年</td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div class="jqcount">   
              <h6>三、治安警情</h6>
              <table border="1">
                <thead>
                  <tr ref="zajq_dept">
                    <th></th><th>武原</th><th>西塘</th><th>望海</th><th>秦山</th><th>沈荡</th><th>百步</th><th>于城</th><th>澉浦</th><th>通元</th><th>全县</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="zajq_thisyear">
                    <td style="display:inline-block;width:44px;">今年</td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                  </tr>
                  <tr ref="zajq_lastyear">
                    <td style="display:inline-block;width:44px;">去年</td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div class="jqcount">   
              <h6>四、通讯网络诈骗</h6>
              <table border="1">
                <thead>
                  <tr ref="twzpjq_dept">
                    <th></th><th>武原</th><th>西塘</th><th>望海</th><th>秦山</th><th>沈荡</th><th>百步</th><th>于城</th><th>澉浦</th><th>通元</th><th>全县</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="twzpjq_thisyear">
                    <td style="display:inline-block;width:44px;">今年</td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                  </tr>
                  <tr ref="twzpjq_lastyear">
                    <td style="display:inline-block;width:44px;">去年</td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    <td><input type="text" ></td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div slot="footer">
            <HfxButton @click="clearinsertform" name="重置" />
             <HfxButton@click="submitAdd" />
          </div>
        </Modal>
    </div>
</template>

<script>
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import { mapState } from 'vuex'
import PagerNew from '@/components/base/PagerNew'
import SsyjButton from '@/components/module/ssyj/SsyjButton'
export default {
  name: 'Ssyj',
  components: {LeftContentNameBar,PagerNew,SsyjButton},
  data () {
    return {
      ssyjList:[],
      page:1,
      pageSize:10,
      totalSize:0,  //总共页数
      isShowAdd:false,
      date:"",
      label:"",
      yxjqarr:[],
      xsjqarr:[],
      zajqarr:[],
      twzpjqarr:[],
    }
  },
  computed: mapState({
  }),
  methods:{
    pageChange(page){
      this.page = page;
      this.getSsyjItem();
    },
    getSsyjItem(){
     var paramObj = {}; 
     paramObj.page = this.page;
     paramObj.pagesize = this.pageSize;
     this.http.get("/tjfx/getSsyjItem",paramObj,this.getSsyjItemCallBack,this,false);
    },
    getSsyjItemCallBack(data){
      this.totalSize=data.count;
      this.ssyjList=data.list;
      this.getSsyjForm(this.ssyjList[0].id);
    },
    showRight(data){
      // console.log(data);
      this.getSsyjForm(data.id);
    },
    delAndFlush(data){
      if(confirm("确认删除该条三色预警信息？")){
        var paramObj={};
        paramObj.id=data.id;
        this.http.get("/tjfx/deleteSsyjItem",paramObj,this.deleteSsyjItemCallBack,this,false);
      }
    },
    deleteSsyjItemCallBack(data){
      this.flushItems();
      this.$Message.success(data);
    },
    getSsyjForm(id){
      var paramObj = {}; 
      paramObj.id=id;
      this.http.get("/tjfx/getSsyjForm",paramObj,this.getSsyjFormCallBack,this,false);
    },
    getSsyjFormCallBack(data){
      var yxjqList=[];
      var xsjqList=[];
      var zajqList=[];
      var twzpjqList=[];
      for(var i = 0;i<data.length;i++){
        if(data[i].jqlx=='1'){
          yxjqList.push(data[i]);
        }else if(data[i].jqlx=='2'){
          xsjqList.push(data[i]);
        }else if(data[i].jqlx=='3'){
          zajqList.push(data[i]);
        }else if(data[i].jqlx=='4'){
          twzpjqList.push(data[i]);
        }
      }
      this.$store.dispatch('putChildState',{"key":"ssyj","childkey":"yxjqList","value":yxjqList});
      this.$store.dispatch('putChildState',{"key":"ssyj","childkey":"xsjqList","value":xsjqList});
      this.$store.dispatch('putChildState',{"key":"ssyj","childkey":"zajqList","value":zajqList});
      this.$store.dispatch('putChildState',{"key":"ssyj","childkey":"twzpjqList","value":twzpjqList});
    },
    showAddSsyj(){
      this.isShowAdd=true;
    },
    submitAdd(){
      if(this.date==null||this.date==""){
        this.$Message.error("请选择月份");
        return;
      }
      if(this.label==null||this.label==""){
        this.$Message.error("请选择上、中、下旬");
        return;
      }
      //有效警情
      var yxjqdept=this.$refs.yxjq_dept.children;
      var yxjqthisyear=this.$refs.yxjq_thisyear.children;
      var yxjqlastyear=this.$refs.yxjq_lastyear.children;
      for(var i=1;i<yxjqdept.length;i++){
        var yxjqvalueObj = {};
        yxjqvalueObj.deptname = yxjqdept[i].innerText;
        yxjqvalueObj.thisyear = yxjqthisyear[i].children[0].value==""?"0":yxjqthisyear[i].children[0].value;
        yxjqvalueObj.lastyear = yxjqlastyear[i].children[0].value==""?"0":yxjqlastyear[i].children[0].value;
        yxjqvalueObj.jqlx = '1';
        this.yxjqarr.push(yxjqvalueObj);
      }
      //刑事警情
      var xsjqdept=this.$refs.xsjq_dept.children;
      var xsjqthisyear=this.$refs.xsjq_thisyear.children;
      var xsjqlastyear=this.$refs.xsjq_lastyear.children;
      for(var i=1;i<xsjqdept.length;i++){
        var xsjqvalueObj = {};
        xsjqvalueObj.deptname = xsjqdept[i].innerText;
        xsjqvalueObj.thisyear = xsjqthisyear[i].children[0].value==""?"0":xsjqthisyear[i].children[0].value;
        xsjqvalueObj.lastyear = xsjqlastyear[i].children[0].value==""?"0":xsjqlastyear[i].children[0].value;
        xsjqvalueObj.jqlx = '2';
        this.xsjqarr.push(xsjqvalueObj);
      }
      //治安警情
      var zajqdept=this.$refs.zajq_dept.children;
      var zajqthisyear=this.$refs.zajq_thisyear.children;
      var zajqlastyear=this.$refs.zajq_lastyear.children;
      for(var i=1;i<zajqdept.length;i++){
        var zajqvalueObj = {};
        zajqvalueObj.deptname = zajqdept[i].innerText;
        zajqvalueObj.thisyear = zajqthisyear[i].children[0].value==""?"0":zajqthisyear[i].children[0].value;
        zajqvalueObj.lastyear = zajqlastyear[i].children[0].value==""?"0":zajqlastyear[i].children[0].value;
        zajqvalueObj.jqlx = '3';
        this.zajqarr.push(zajqvalueObj);
      }
      //通网诈骗警情
      var twzpjqdept=this.$refs.twzpjq_dept.children;
      var twzpjqthisyear=this.$refs.twzpjq_thisyear.children;
      var twzpjqlastyear=this.$refs.twzpjq_lastyear.children;
      for(var i=1;i<twzpjqdept.length;i++){
        var twzpjqvalueObj = {};
        twzpjqvalueObj.deptname = twzpjqdept[i].innerText;
        twzpjqvalueObj.thisyear = twzpjqthisyear[i].children[0].value==""?"0":twzpjqthisyear[i].children[0].value;
        twzpjqvalueObj.lastyear = twzpjqlastyear[i].children[0].value==""?"0":twzpjqlastyear[i].children[0].value;
        twzpjqvalueObj.jqlx = '4';
        this.twzpjqarr.push(twzpjqvalueObj);
      }

      var paramObj = {};
      paramObj.yxjq = this.yxjqarr;
      paramObj.xsjq = this.xsjqarr;
      paramObj.zajq = this.zajqarr;
      paramObj.twzpjq = this.twzpjqarr;
      paramObj.date = this.$moment(this.date).format("YYYY-MM");
      paramObj.label = this.label;
      this.http.post("/tjfx/insertSSyj",paramObj,this.insertSSyjCallBack,this,false);
    },
    insertSSyjCallBack(data){
      this.clearinsertform();
      this.isShowAdd=false;
      this.flushItems();
      this.$Message.success(data);
    },
    clearinsertform(){
      //有效警情
      var yxjqdept=this.$refs.yxjq_dept.children;
      var yxjqthisyear=this.$refs.yxjq_thisyear.children;
      var yxjqlastyear=this.$refs.yxjq_lastyear.children;
      for(var i=1;i<yxjqdept.length;i++){
       yxjqthisyear[i].children[0].value="";
       yxjqlastyear[i].children[0].value="";
      }
      //刑事警情
      var xsjqdept=this.$refs.xsjq_dept.children;
      var xsjqthisyear=this.$refs.xsjq_thisyear.children;
      var xsjqlastyear=this.$refs.xsjq_lastyear.children;
      for(var i=1;i<xsjqdept.length;i++){
        xsjqthisyear[i].children[0].value="";
        xsjqlastyear[i].children[0].value="";
      }
      //治安警情
      var zajqdept=this.$refs.zajq_dept.children;
      var zajqthisyear=this.$refs.zajq_thisyear.children;
      var zajqlastyear=this.$refs.zajq_lastyear.children;
      for(var i=1;i<zajqdept.length;i++){
        zajqthisyear[i].children[0].value="";
        zajqlastyear[i].children[0].value="";
      }
      //通网诈骗警情
      var twzpjqdept=this.$refs.twzpjq_dept.children;
      var twzpjqthisyear=this.$refs.twzpjq_thisyear.children;
      var twzpjqlastyear=this.$refs.twzpjq_lastyear.children;
      for(var i=1;i<twzpjqdept.length;i++){
        twzpjqthisyear[i].children[0].value="";
        twzpjqlastyear[i].children[0].value="";
      }
      this.yxjqarr=[];
      this.xsjqarr=[];
      this.zajqarr=[];
      this.twzpjqarr=[];
      this.date="";
      this.label="";
    },
    flushItems(){
      this.page = 1;
      this.getSsyjItem();
    },
  },
  created(){
    this.getSsyjItem();
  },
  mounted(){
    
  }
}
</script>

<style scoped>
.ssyjpanel{
   height: 100%;
   width: 100%;
}
.seachbar{
  height: 39px;
} 
.seachbar_caozuo{
  position: relative;
  height: 39px;
  right: 0px;
}
.seachbar_add{
 position:absolute;
  cursor: pointer;
  right: 0px;
  top: 0px;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/ajzc/ajzc_add.png)  no-repeat;
}
.seachbar_shuaxin{
  position:absolute;
  right: 30px;
  top: 0px;
  cursor: pointer;
  width: 19px;
  height: 20px;
  background: 
    url(./../../../assets/ajzc/ajzc_refresh.png)  no-repeat;
}
.ssyjlist-panel{
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
</style>
<style>
.ssyjadd-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left: 387px;
  width: 600px !important;
}

</style>
