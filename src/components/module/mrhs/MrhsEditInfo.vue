<template>
    <Modal v-model="showdata.showmodal" :draggable = "true" :footer-hide="true" title="修改每日会商主题" class-name="mrhsEditItem-panel">
      <div slot="close"><div class="hfx-modal-close"/></div>
        <div style="display:block;" v-loading="loading" element-loading-text="主题生成中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,0.5)">
            <div style="height: 455px;">
                <div class="mrhsEditPanel">
                    <div class="modal-div">
                        <div>一、总体情况</div>
                        <div>（一）接警统计</div>
                        <div style="width: 420px;left: 36px;position: relative;"> 
                              今日，情指联勤中心共接警<input class="number_input" v-model="jjtja"/>起，
                              有效接警<input class="number_input" v-model="jjtjb"/>起，
                              指令处警<input class="number_input" v-model="jjtjc"/>起。
                              实发刑事警情<input class="number_input" v-model="jjtjd"/>起
                              （盗窃<input class="number_input" v-model="jjtje"/>起、
                              诈骗<input class="number_input" v-model="jjtjf"/>起）；
                              治安警情<input class="number_input" v-model="jjtjg"/>起
                              （其中打架斗殴<input class="number_input" v-model="jjtjh"/>起、
                              损坏公私财物<input class="number_input" v-model="jjtji"/>起、
                              家庭暴力<input class="number_input" v-model="jjtjj"/>起、
                              偷盗<input class="number_input" v-model="jjtjk"/>起、
                              涉毒<input class="number_input" v-model="jjtjl"/>起、
                              涉黄<input class="number_input" v-model="jjtjm"/>起、
                              纠纷<input class="number_input" v-model="jjtjn"/>起）；
                              交通警情<input class="number_input" v-model="jjtjo"/>起；
                              火警<input class="number_input" v-model="jjtjp"/>起；
                              群众求助<input class="number_input" v-model="jjtjq"/>起;
                              社会联动<input class="number_input" v-model="jjtjr"/>起。
                        </div>
                        <div style="position: relative;top: 10px;text-align: center;">今日各派出所辖区警情数一览表</div>
                        <div style="position: relative;top: 10px;left: 33px;">
                            <table border="1" cellspacing="0" cellpadding="0" class="jqtjtab">
                                <thead>
                                    <tr>
                                        <th>辖区</th><th>武原</th><th>沈荡</th><th>澉浦</th><th>西塘</th>
                                        <th>秦山</th><th>通元</th><th>百步</th><th>于城</th><th>望海</th>
                                      </tr>
                                </thead>
                                <tbody>
                                      <tr>
                                          <td style="display:inline-block;width:70px;">警情总数</td>
                                          <td><input v-model="jqtjdata.code16" type="text"></td><td><input v-model="jqtjdata.code21" type="text"></td><td><input v-model="jqtjdata.code26" type="text"></td><td><input v-model="jqtjdata.code31" type="text"></td><td><input v-model="jqtjdata.code36" type="text"></td>
                                          <td><input v-model="jqtjdata.code41" type="text"></td><td><input v-model="jqtjdata.code46" type="text"></td><td><input v-model="jqtjdata.code51" type="text"></td><td><input v-model="jqtjdata.code56" type="text"></td>
                                      </tr>
                                      <tr>
                                          <td style="display:inline-block;width:30px;border-bottom: 0px;">刑事</td>
                                          <td style="display:inline-block;width:40px;">盗窃</td>
                                          <td><input v-model="jqtjdata.code17" type="text"></td><td><input v-model="jqtjdata.code22" type="text"></td><td><input v-model="jqtjdata.code27" type="text"></td><td><input v-model="jqtjdata.code32" type="text"></td><td><input v-model="jqtjdata.code37" type="text"></td>
                                          <td><input v-model="jqtjdata.code42" type="text"></td><td><input v-model="jqtjdata.code47" type="text"></td><td><input v-model="jqtjdata.code52" type="text"></td><td><input v-model="jqtjdata.code57" type="text"></td>
                                      </tr>
                                      <tr>
                                          <td style="display:inline-block;width:30px;border: 0px;"></td>
                                          <td style="display:inline-block;width:40px;">诈骗</td>
                                          <td><input v-model="jqtjdata.code18" type="text"></td><td><input v-model="jqtjdata.code23" type="text"></td><td><input v-model="jqtjdata.code28" type="text"></td><td><input v-model="jqtjdata.code33" type="text"></td><td><input v-model="jqtjdata.code38" type="text"></td>
                                          <td><input v-model="jqtjdata.code43" type="text"></td><td><input v-model="jqtjdata.code48" type="text"></td><td><input v-model="jqtjdata.code53" type="text"></td><td><input v-model="jqtjdata.code58" type="text"></td>
                                      </tr>
                                      <tr>
                                          <td style="display:inline-block;width:30px;border-bottom: 0px;">治安</td>
                                          <td style="display:inline-block;width:40px;">警情数</td>
                                          <td><input v-model="jqtjdata.code19" type="text"></td><td><input v-model="jqtjdata.code24" type="text"></td><td><input v-model="jqtjdata.code29" type="text"></td><td><input v-model="jqtjdata.code34" type="text"></td><td><input v-model="jqtjdata.code39" type="text"></td>
                                          <td><input v-model="jqtjdata.code44" type="text"></td><td><input v-model="jqtjdata.code49" type="text"></td><td><input v-model="jqtjdata.code54" type="text"></td><td><input v-model="jqtjdata.code59" type="text"></td>
                                      </tr>
                                      <tr>
                                          <td style="display:inline-block;width:30px;border: 0px;"></td>
                                          <td style="display:inline-block;width:40px;">打架</td>
                                          <td><input v-model="jqtjdata.code20" type="text"></td><td><input v-model="jqtjdata.code25" type="text"></td><td><input v-model="jqtjdata.code30" type="text"></td><td><input v-model="jqtjdata.code35" type="text"></td><td><input v-model="jqtjdata.code40" type="text"></td>
                                          <td><input v-model="jqtjdata.code45" type="text"></td><td><input v-model="jqtjdata.code50" type="text"></td><td><input v-model="jqtjdata.code55" type="text"></td><td><input v-model="jqtjdata.code60" type="text"></td>
                                      </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="position: relative;top: 10px;">（二）重大警情</div>
                        <Input style="position: relative;top: 10px;" class="deptnameInput" v-model="zdjq" type="textarea" :autosize="true" />
                        <div style="position: relative;top: 10px;">（三）前科重点人员预警</div>
                        <div style="width: 420px;left: 36px;position: relative;top: 10px;">
                              情指联勤中心共接预警<input class="number_input" v-model="qkyja"/>起，
                              其中在逃人员<input class="number_input" v-model="qkyjb"/>起，
                              涉恐人员<input class="number_input" v-model="qkyjc"/>起，
                              涉毒人员<input class="number_input" v-model="qkyjd"/>起，
                              前科人员<input class="number_input" v-model="qkyje"/>起，
                              精神病人员<input class="number_input" v-model="qkyjf"/>起，
                              部、省、市临控人员<input class="number_input" v-model="qkyjg"/>起。
                        </div>
                        <div style="position: relative;top: 10px;left: 33px;">
                            <table border="1" cellspacing="0" cellpadding="0" class="jqtjtab">
                                <thead>
                                    <tr>
                                        <th>辖区</th><th>县局</th><th>武原</th><th>沈荡</th><th>澉浦</th><th>西塘</th>
                                        <th>秦山</th><th>通元</th><th>百步</th><th>于城</th><th>望海</th>
                                      </tr>
                                </thead>
                                <tbody>
                                      <tr>
                                          <td style="display:inline-block;width:70px;">预警数</td>
                                          <td><input v-model="yjtjdata.yjb1" type="text"></td><td><input v-model="yjtjdata.yjb2" type="text"></td><td><input v-model="yjtjdata.yjb3" type="text"></td><td><input v-model="yjtjdata.yjb4" type="text"></td><td><input v-model="yjtjdata.yjb5" type="text"></td>
                                          <td><input v-model="yjtjdata.yjb6" type="text"></td><td><input v-model="yjtjdata.yjb7" type="text"></td><td><input v-model="yjtjdata.yjb8" type="text"></td><td><input v-model="yjtjdata.yjb9" type="text"></td><td><input v-model="yjtjdata.yjb10" type="text"></td>
                                      </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="mrhsEditContentPanel">
                    <div class="modal-div">
                        <div>二、信息质量</div>
                        <div>（一）重点人员预警处置信息</div>
                        <Input class="deptnameInput" v-model="zdryyjczxx" type="textarea" :autosize="true" />
                        <div>（二）警综平台采录模块信息</div>
                        <Input class="deptnameInput" v-model="jzptclmkxx" type="textarea" :autosize="true" />
                    </div>
                    <div class="modal-div">
                        <div>三、维稳情况</div>
                        <div>（一）指令单情况</div>
                        <Input class="deptnameInput" v-model="zldqk" type="textarea" :autosize="true" />
                        <div>（二）不安定因素</div>
                        <Input class="deptnameInput" v-model="badys" type="textarea" :autosize="true" />
                        <div>（三）其他</div>
                        <Input class="deptnameInput" v-model="qt" type="textarea" :autosize="true" />
                    </div>
                    <div class="modal-div">
                        <div>四、合成作战</div>
                        <Input class="hczzInput" v-model="hczz" type="textarea" :autosize="true" />
                    </div>
                </div>
            </div>
            <div class="mrhsEditBtn">
                <HfxButton  @click="addMrhsItem" />
                <HfxButton @click="closeMrhs" name="取消"  />
            </div>
        </div>
    </Modal>
</template>

<script>

import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import UserTransfer from '@/components/base/UserTransfer'


export default {
  name: 'MrhsEditInfo',
  props:['showdata'],
  inject:['reflashItem'],//接收父页面的方法
  components: {UserTransfer},
  data () {
    return {
        jjtja:"",jjtjb:"",jjtjc:"",jjtjd:"",jjtje:"",jjtjf:"",//接警统计字段
        jjtjg:"",jjtjh:"",jjtji:"",jjtjj:"",jjtjk:"",jjtjl:"",//接警统计字段
        jjtjm:"",jjtjn:"",jjtjo:"",jjtjp:"",jjtjq:"",jjtjr:"",//接警统计字段
        jqtjdata:{},//接警表数据
        zdjq:"",
        qkyja:"",qkyjb:"",qkyjc:"",qkyjd:"",qkyje:"",qkyjf:"",qkyjg:"",//前科重点人员预警字段
        yjtjdata:{},//预警表数据
        zdryyjczxx:"",
        jzptclmkxx:"",
        zldqk:"",
        badys:"",
        qt:"",
        hczz:"",
        loading:false,
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
  }),
  methods:{
      addMrhsItem(){
          var jjtjParamObj = {};
          var qkyjParamObj = {};
          var updateItemParamObj = {};
          updateItemParamObj.id = this.data.id;//主题的id
          jjtjParamObj.jjtja = this.jjtja;jjtjParamObj.jjtjb = this.jjtjb;
          jjtjParamObj.jjtjc = this.jjtjc;jjtjParamObj.jjtjd = this.jjtjd;
          jjtjParamObj.jjtje = this.jjtje;jjtjParamObj.jjtjf = this.jjtjf;
          jjtjParamObj.jjtjg = this.jjtjg;jjtjParamObj.jjtjh = this.jjtjh;
          jjtjParamObj.jjtji = this.jjtji;jjtjParamObj.jjtjj = this.jjtjj;
          jjtjParamObj.jjtjk = this.jjtjk;jjtjParamObj.jjtjl = this.jjtjl;
          jjtjParamObj.jjtjm = this.jjtjm;jjtjParamObj.jjtjn = this.jjtjn;
          jjtjParamObj.jjtjo = this.jjtjo;jjtjParamObj.jjtjp = this.jjtjp;
          jjtjParamObj.jjtjq = this.jjtjq;jjtjParamObj.jjtjr = this.jjtjr;
          
          qkyjParamObj.qkyja = this.qkyja;qkyjParamObj.qkyjb = this.qkyjb;qkyjParamObj.qkyjc = this.qkyjc;
          qkyjParamObj.qkyjd = this.qkyjd;qkyjParamObj.qkyje = this.qkyje;
          qkyjParamObj.qkyjf = this.qkyjf;qkyjParamObj.qkyjg = this.qkyjg;

          updateItemParamObj.jjtj = jjtjParamObj;
          updateItemParamObj.jjb = this.jqtjdata;;
          updateItemParamObj.zdjq = this.zdjq;
          updateItemParamObj.qkyj = qkyjParamObj;
          updateItemParamObj.yjb = this.yjtjdata;
          updateItemParamObj.zdryyjczxx = this.zdryyjczxx;
          updateItemParamObj.jzptclmkxx = this.jzptclmkxx;
          updateItemParamObj.zldqk = this.zldqk;
          updateItemParamObj.badys = this.badys;
          updateItemParamObj.qt = this.qt;
          updateItemParamObj.hczz = this.hczz;
          this.loading = true;
          this.http.post("/qzlq/updateMrhsItem",updateItemParamObj,this.updateMrhsItemCallBack,this,false);
      },
      updateMrhsItemCallBack(result){
          this.loading = false;
          this.showdata.showmodal = false;
          this.reflashItem();
      },
      closeMrhs(){
          this.showdata.showmodal = false;
      },
      initEditValues(){//初始化修改的值
        var paramObj = {};
        paramObj.itemid = this.data.id;
        this.http.get("/qzlq/getMrhsItemDetailByid",paramObj,this.getMrhsItemDetailByIdCallBack,this,false);
      },
      getMrhsItemDetailByIdCallBack(result){
          var itemdata = result.item;
          var jjtjObj = JSON.parse(itemdata.jjtj);
          var qkyjObj = JSON.parse(itemdata.qkyj);
          this.jqtjdata = JSON.parse(itemdata.jjb);
          this.yjtjdata = JSON.parse(itemdata.yjb);
          this.jjtja = jjtjObj.jjtja;this.jjtjb = jjtjObj.jjtjb;this.jjtjc = jjtjObj.jjtjc;this.jjtjd = jjtjObj.jjtjd;this.jjtje = jjtjObj.jjtje;this.jjtjf = jjtjObj.jjtjf;
          this.jjtjg = jjtjObj.jjtjg;this.jjtjh = jjtjObj.jjtjh;this.jjtji = jjtjObj.jjtji;this.jjtjj = jjtjObj.jjtjj;this.jjtjk = jjtjObj.jjtjk;this.jjtjl = jjtjObj.jjtjl;
          this.jjtjm = jjtjObj.jjtjm;this.jjtjn = jjtjObj.jjtjn;this.jjtjo = jjtjObj.jjtjo;this.jjtjp = jjtjObj.jjtjp;this.jjtjq = jjtjObj.jjtjq;this.jjtjr = jjtjObj.jjtjr;
          this.zdjq = itemdata.zdjq;
          this.qkyja = qkyjObj.qkyja;this.qkyjb = qkyjObj.qkyjb;this.qkyjc = qkyjObj.qkyjc;this.qkyjd = qkyjObj.qkyjd;this.qkyje = qkyjObj.qkyje;this.qkyjf = qkyjObj.qkyjf;this.qkyjg = qkyjObj.qkyjg;
          this.zdryyjczxx = itemdata.zdryyjczxx;
          this.jzptclmkxx = itemdata.jzptclmkxx;
          this.zldqk = itemdata.zldqk;
          this.badys = itemdata.badys;
          this.qt = itemdata.qt;
          this.hczz = itemdata.hczz;
      }
  },
  created(){

  }
}
</script>
<style scoped>
.mrhsEditPanel{
    width: 480px;
    height: 510px;
    float: left;
}
.mrhsEditBtn{
    text-align: center;
}
.mrhsEditContentPanel{
    float: left;
    width: 480px;
    height: 510px;
    margin-left: 22px;
}
.modal-div{
  margin: 0 0 10px 0;
}
.modal-div span{
  float: left;
  width: 85px;
  text-align: right;
  margin-right: 10px;
}
.inputclass{
  border: 0px;
  background-color: #2e3136;
  color: #d8d8d8;
  border-radius: 4px;
  width:180px;
  height: 28px;
}
.number_input{
    border: 0px;
    outline: none;
    background-color: transparent;
    color: #ed4014;
    border-radius: 0px;
    width: 27px;
    height: 13px;
    text-align: center;
    border-bottom: 1px solid #b6f6ff;
}
.jqtjtab{
  border-color: #b6f6ff;
}
.jqtjtab td input{
    width: 35px;
    padding: 0 2px;
    background: transparent;
    color: #ed4014;
    height: 100%;
    outline: 0px;
    border: 0px;
    text-align: center;
}
.deptnameInput{
  width:410px;
  left: 34px;
}
.deptnameInput >>> textarea{
  width: 410px;
  min-height: 56px;
  font-size: 12px;
  padding: 0 10px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.hczzInput{
  width:410px;
  left: 34px;
}
.hczzInput >>> textarea{
    width: 410px;
  min-height: 60px;
  font-size: 12px;
  padding: 0 10px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
</style>
<style>
.mrhsEditItem-panel .ivu-modal .ivu-modal-content{
  top:180px;
  left:495px;
  width: 1015px !important;
}
</style>

