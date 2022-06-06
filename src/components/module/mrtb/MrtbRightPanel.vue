<template>
    <div class="mrtbRightPanel">
      <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
        <div class="headerPanel">
          <HfxButton style="margin-left:5px;" :width=180  @click="changeShowTable(1)"  name="重点工作数据统计表" />
          <HfxButton style="margin-left:5px;" :width=150  @click="changeShowTable(2)"  name="警情数据统计表" />
          <HfxButton style="margin-left:5px;" :width=150  @click="changeShowTable(3)"  name="打处情况统计表" />
          <div class="ssyjtabletitle">
            <span v-show="isShowTableOne" >{{currentDate}}重点工作数据统计表</span>
            <span v-show="isShowTableTwo" >{{currentDate}}警情数据统计表</span>
            <span v-show="isShowTableThree" >{{currentDate}}打处情况统计表</span>
          </div>
        </div>
        <div class="contentPanel" ref="contentPanel"> 
          <table v-show="isShowTableOne" class="zdsjtable"   cellpadding='0' cellspacing='0' >
          <tbody></tbody>
          <tr>
            <td rowspan="3" >辖区</td>
            <td rowspan="1" colspan="3" >有效警情</td>
            <td rowspan="1" colspan="3" >刑事警情</td>
            <td rowspan="1" colspan="5" >电诈警情</td>
            <td rowspan="1" colspan="5" >交通警情</td>
            <td rowspan="1" colspan="2" >违法嫌疑人抓获数</td>
            <td rowspan="1" colspan="2" >刑事打击</td>
          </tr>
          <tr>
            <td rowspan="2"  >当日</td>
            <td rowspan="2"  >累计</td>
            <td rowspan="2"  >同比</td>
            <td rowspan="2"  >当日</td>
            <td rowspan="2"  >累计</td>
            <td rowspan="2"  >同比</td>
            <td rowspan="1" colspan="2" >当日</td>
            <td rowspan="1" colspan="2" >累计</td>
            <td rowspan="2"  >发案数同比</td>
            <td rowspan="1" colspan="2" >当日</td>
            <td rowspan="1" colspan="2" >累计</td>
            <td rowspan="2"  >死亡数同比</td>
            <td rowspan="2"  >当日</td>
            <td rowspan="2"  >累计</td>
            <!-- <td rowspan="2"  >同比</td> -->
            <td rowspan="2"  >当日</td>
            <td rowspan="2"  >累计</td>
          </tr>
          <tr>
            <td rowspan="1"  >发案数</td>
            <td rowspan="1"  >损失数</td>
            <td rowspan="1"  >发案数</td>
            <td rowspan="1"  >损失数</td>
            <td rowspan="1"  >警情数</td>
            <td rowspan="1"  >亡人数</td>
            <td rowspan="1"  >警情数</td>
            <td rowspan="1"  >亡人数</td>
          </tr>
          <tr v-for="Obj in mrtbObj" :key="Obj.deptname">
            <td>{{Obj.deptname}}</td>
            <td>{{getUndefinedToZreo(Obj.yxjq_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.yxjq_total)}}</td>
            <td>{{getUndefinedToZreo(Obj.yxjq_growth)+"%"}}</td>

            <td>{{getUndefinedToZreo(Obj.xsjq_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsjq_total)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsjq_growth)+"%"}}</td>

            <td>{{getUndefinedToZreo(Obj.dzjq_today_fas)}}</td>
            <td>{{getUndefinedToZreo(Obj.dzjq_today_sss)}}</td>
            <td>{{getUndefinedToZreo(Obj.dzjq_total_fas)}}</td>
            <td>{{getUndefinedToZreo(Obj.dzjq_total_sss)}}</td>
            <td>{{getUndefinedToZreo(Obj.dzjq_growth)+"%"}}</td>

            <td>{{getUndefinedToZreo(Obj.jtsg_today_jqs)}}</td>
            <td>{{getUndefinedToZreo(Obj.jtsg_today_wrs)}}</td>
            <td>{{getUndefinedToZreo(Obj.jtsg_total_jqs)}}</td>            
            <td>{{getUndefinedToZreo(Obj.jtsg_total_wrs)}}</td>
            <td>{{getUndefinedToZreo(Obj.jtsg_growth)+"%"}}</td>

            <td>{{getUndefinedToZreo(Obj.wfxyrzhs_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.wfxyrzhs_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.wfxyrzhs_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xsdj_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsdj_total)}}</td>
          </tr>
          </table>
          <table v-show="isShowTableTwo" class="zdsjtable"   cellpadding='0' cellspacing='0' >
          <tbody></tbody>
          <tr>
            <td rowspan="2" >辖区</td>
            <td rowspan="1" colspan="3" >有效警情</td>
            <td rowspan="1" colspan="3" >刑事警情</td>
            <td rowspan="1" colspan="3" >电诈警情</td>
            <td rowspan="1" colspan="3" >交通警情</td>
            <td rowspan="1" colspan="8" >案件类警情</td>
          </tr>
          <tr>
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <td rowspan="1"  >同比</td>

            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <td rowspan="1"  >同比</td>

            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <td rowspan="1"  >同比</td>

            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <td rowspan="1"  >同比</td>

            <td rowspan="1"  >命案</td>
            <td rowspan="1"  >诈骗</td>
            <td rowspan="1"  >两抢</td>
            <td rowspan="1"  >盗窃</td>
            <td rowspan="1"  >入室盗窃</td>
            <td rowspan="1"  >打架斗殴</td>
            <td rowspan="1"  >损坏财物</td>
            <td rowspan="1"  >其他</td>
          </tr> 
          <tr v-for="Obj in mrtbObj" :key="Obj.deptname">
            <td>{{Obj.deptname}}</td>
            <td>{{getUndefinedToZreo(Obj.yxjq_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.yxjq_total)}}</td>
            <td>{{getUndefinedToZreo(Obj.yxjq_growth)+"%"}}</td>

            <td>{{getUndefinedToZreo(Obj.xsjq_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsjq_total)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsjq_growth)+"%"}}</td>

            <td>{{getUndefinedToZreo(Obj.dzjq_today_fas)}}</td>
            <td>{{getUndefinedToZreo(Obj.dzjq_total_fas)}}</td>
            <td>{{getUndefinedToZreo(Obj.dzjq_growth)+"%"}}</td>

            <td>{{getUndefinedToZreo(Obj.jtsg_today_jqs)}}</td>
            <td>{{getUndefinedToZreo(Obj.jtsg_total_jqs)}}</td>            
            <td>{{getUndefinedToZreo(Obj.jtsg_growth)+"%"}}</td>

            <td>{{getUndefinedToZreo(Obj.ajjq_ma)}}</td>
            <td>{{getUndefinedToZreo(Obj.ajjq_zp)}}</td>
            <td>{{getUndefinedToZreo(Obj.ajjq_lq)}}</td>
            <td>{{getUndefinedToZreo(Obj.ajjq_dq)}}</td>
            <td>{{getUndefinedToZreo(Obj.ajjq_rsdq)}}</td>
            <td>{{getUndefinedToZreo(Obj.ajjq_djdo)}}</td>
            <td>{{getUndefinedToZreo(Obj.ajjq_shcw)}}</td>
            <td>{{getUndefinedToZreo(Obj.ajjq_qt)}}</td>
          </tr>
          </table>
        <table v-show="isShowTableThree" class="zdsjtable"   cellpadding='0' cellspacing='0' >
          <tbody></tbody>
          <tr>
            <td rowspan="3" >辖区</td>
            <td rowspan="1" colspan="18" >刑事案件</td>
            <td rowspan="1" colspan="6" >行政处罚</td>
          </tr>
          <tr>
            <td rowspan="1" colspan="2"  >刑事拘留</td>
            <td rowspan="1" colspan="2"  >取保候审</td>
            <td rowspan="1" colspan="2"  >移送起诉</td>
            <td rowspan="1" colspan="2"  >侵财类</td>
            <td rowspan="1" colspan="2"  >涉黄</td>
            <td rowspan="1" colspan="2"  >涉赌</td>
            <td rowspan="1" colspan="2"  >涉毒</td>
            <td rowspan="1" colspan="2"  >经济</td>
            <td rowspan="1" colspan="2"  >食药环</td>
            <td rowspan="1" colspan="2"  >涉黄</td>
            <td rowspan="1" colspan="2"  >涉赌</td>
            <td rowspan="1" colspan="2"  >涉毒</td>
          </tr>
          <tr>
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
            <td rowspan="1"  >当日</td>
            <td rowspan="1"  >累计</td>
            <!-- <td rowspan="1"  >同比</td> -->
          </tr>
          <tr v-for="Obj in mrtbObj" :key="Obj.deptname">
            <td>{{Obj.deptname}}</td>

            <td>{{getUndefinedToZreo(Obj.xsaj_xsjl_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsaj_xsjl_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xsaj_xsjl_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xsaj_qbhs_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsaj_qbhs_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xsaj_qbhs_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xsaj_ysqs_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsaj_ysqs_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xsaj_ysqs_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xsaj_qcl_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsaj_qcl_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xsaj_qcl_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xsaj_sh_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsaj_sh_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xsaj_sh_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xsaj_dubo_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsaj_dubo_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xsaj_dubo_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xsaj_dupin_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsaj_dupin_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xsaj_dupin_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xsaj_jj_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsaj_jj_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xsaj_jj_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xsaj_syh_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xsaj_syh_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xsaj_syh_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xzcf_sh_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xzcf_sh_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xzcf_sh_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xzcf_dubo_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xzcf_dubo_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xzcf_dubo_growth)+"%"}}</td> -->

            <td>{{getUndefinedToZreo(Obj.xzcf_dupin_today)}}</td>
            <td>{{getUndefinedToZreo(Obj.xzcf_dupin_total)}}</td>
            <!-- <td>{{getUndefinedToZreo(Obj.xzcf_dupin_growth)+"%"}}</td> -->

          </tr>
          </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'mrtbRightPanel',
  components: {LeftContentNameBar},
  data () {
    return {
      mrtbObj:[
        {
        "deptname":"武原",

        "yxjq_today":"0",
        "yxjq_total":"0",
        "yxjq_growth":"-37.50%",

        "xsjq_today":"1",
        "xsjq_total":"1",
        "xsjq_growth":"-37.50%",

        "dzjq_today_fas":"12",
        "dzjq_today_sss":"14",
        "dzjq_total_fas":"14",
        "dzjq_total_sss":"4.5",
        "dzjq_growth":"120.00%",

        "jtsg_today_jqs":"12",
        "jtsg_today_wrs":"14",
        "jtsg_total_jqs":"14",
        "jtsg_total_wrs":"4.5",
        "jtsg_growth":"120.00%",

        "xsdc_zhs_today":"12",
        "xsdc_zhs_total":"14",
        "xsdc_xsqz_today":"14",
        "xsdc_xsqz_total":"4.5",
        "xsdc_yss_today":"12",
        "xsdc_yss_total":"14",
        },
        {
        "deptname":"西塘",

        "yxjq_today":"0",
        "yxjq_total":"0",
        "yxjq_growth":"-37.50%",

        "xsjq_today":"1",
        "xsjq_total":"1",
        "xsjq_growth":"-37.50%",

        "dzjq_today_fas":"12",
        "dzjq_today_sss":"14",
        "dzjq_total_fas":"14",
        "dzjq_total_sss":"4.5",
        "dzjq_growth":"120.00%",

        "jtsg_today_jqs":"12",
        "jtsg_today_wrs":"14",
        "jtsg_total_jqs":"14",
        "jtsg_total_wrs":"4.5",
        "jtsg_growth":"120.00%",

        "xsdc_zhs_today":"12",
        "xsdc_zhs_total":"14",
        "xsdc_xsqz_today":"14",
        "xsdc_xsqz_total":"4.5",
        "xsdc_yss_today":"12",
        "xsdc_yss_total":"14",
        },
        {
        "deptname":"望海",

        "yxjq_today":"0",
        "yxjq_total":"0",
        "yxjq_growth":"-37.50%",

        "xsjq_today":"1",
        "xsjq_total":"1",
        "xsjq_growth":"-37.50%",

        "dzjq_today_fas":"12",
        "dzjq_today_sss":"14",
        "dzjq_total_fas":"14",
        "dzjq_total_sss":"4.5",
        "dzjq_growth":"120.00%",

        "jtsg_today_jqs":"12",
        "jtsg_today_wrs":"14",
        "jtsg_total_jqs":"14",
        "jtsg_total_wrs":"4.5",
        "jtsg_growth":"120.00%",

        "xsdc_zhs_today":"12",
        "xsdc_zhs_total":"14",
        "xsdc_xsqz_today":"14",
        "xsdc_xsqz_total":"4.5",
        "xsdc_yss_today":"12",
        "xsdc_yss_total":"14",
        },
        {
        "deptname":"秦山",

        "yxjq_today":"0",
        "yxjq_total":"0",
        "yxjq_growth":"-37.50%",

        "xsjq_today":"1",
        "xsjq_total":"1",
        "xsjq_growth":"-37.50%",

        "dzjq_today_fas":"12",
        "dzjq_today_sss":"14",
        "dzjq_total_fas":"14",
        "dzjq_total_sss":"4.5",
        "dzjq_growth":"120.00%",

        "jtsg_today_jqs":"12",
        "jtsg_today_wrs":"14",
        "jtsg_total_jqs":"14",
        "jtsg_total_wrs":"4.5",
        "jtsg_growth":"120.00%",

        "xsdc_zhs_today":"12",
        "xsdc_zhs_total":"14",
        "xsdc_xsqz_today":"14",
        "xsdc_xsqz_total":"4.5",
        "xsdc_yss_today":"12",
        "xsdc_yss_total":"14",
        },
        {
        "deptname":"澉浦",

        "yxjq_today":"0",
        "yxjq_total":"0",
        "yxjq_growth":"-37.50%",

        "xsjq_today":"1",
        "xsjq_total":"1",
        "xsjq_growth":"-37.50%",

        "dzjq_today_fas":"12",
        "dzjq_today_sss":"14",
        "dzjq_total_fas":"14",
        "dzjq_total_sss":"4.5",
        "dzjq_growth":"120.00%",

        "jtsg_today_jqs":"12",
        "jtsg_today_wrs":"14",
        "jtsg_total_jqs":"14",
        "jtsg_total_wrs":"4.5",
        "jtsg_growth":"120.00%",

        "xsdc_zhs_today":"12",
        "xsdc_zhs_total":"14",
        "xsdc_xsqz_today":"14",
        "xsdc_xsqz_total":"4.5",
        "xsdc_yss_today":"12",
        "xsdc_yss_total":"14",
        },
        {
        "deptname":"沈荡",

        "yxjq_today":"0",
        "yxjq_total":"0",
        "yxjq_growth":"-37.50%",

        "xsjq_today":"1",
        "xsjq_total":"1",
        "xsjq_growth":"-37.50%",

        "dzjq_today_fas":"12",
        "dzjq_today_sss":"14",
        "dzjq_total_fas":"14",
        "dzjq_total_sss":"4.5",
        "dzjq_growth":"120.00%",

        "jtsg_today_jqs":"12",
        "jtsg_today_wrs":"14",
        "jtsg_total_jqs":"14",
        "jtsg_total_wrs":"4.5",
        "jtsg_growth":"120.00%",

        "xsdc_zhs_today":"12",
        "xsdc_zhs_total":"14",
        "xsdc_xsqz_today":"14",
        "xsdc_xsqz_total":"4.5",
        "xsdc_yss_today":"12",
        "xsdc_yss_total":"14",
        },
        {
        "deptname":"通元",

        "yxjq_today":"0",
        "yxjq_total":"0",
        "yxjq_growth":"-37.50%",

        "xsjq_today":"1",
        "xsjq_total":"1",
        "xsjq_growth":"-37.50%",

        "dzjq_today_fas":"12",
        "dzjq_today_sss":"14",
        "dzjq_total_fas":"14",
        "dzjq_total_sss":"4.5",
        "dzjq_growth":"120.00%",

        "jtsg_today_jqs":"12",
        "jtsg_today_wrs":"14",
        "jtsg_total_jqs":"14",
        "jtsg_total_wrs":"4.5",
        "jtsg_growth":"120.00%",

        "xsdc_zhs_today":"12",
        "xsdc_zhs_total":"14",
        "xsdc_xsqz_today":"14",
        "xsdc_xsqz_total":"4.5",
        "xsdc_yss_today":"12",
        "xsdc_yss_total":"14",
        },
        {
        "deptname":"于城",

        "yxjq_today":"0",
        "yxjq_total":"0",
        "yxjq_growth":"-37.50%",

        "xsjq_today":"1",
        "xsjq_total":"1",
        "xsjq_growth":"-37.50%",

        "dzjq_today_fas":"12",
        "dzjq_today_sss":"14",
        "dzjq_total_fas":"14",
        "dzjq_total_sss":"4.5",
        "dzjq_growth":"120.00%",

        "jtsg_today_jqs":"12",
        "jtsg_today_wrs":"14",
        "jtsg_total_jqs":"14",
        "jtsg_total_wrs":"4.5",
        "jtsg_growth":"120.00%",

        "xsdc_zhs_today":"12",
        "xsdc_zhs_total":"14",
        "xsdc_xsqz_today":"14",
        "xsdc_xsqz_total":"4.5",
        "xsdc_yss_today":"12",
        "xsdc_yss_total":"14",
        },
        {
        "deptname":"百步",

        "yxjq_today":"0",
        "yxjq_total":"0",
        "yxjq_growth":"-37.50%",

        "xsjq_today":"1",
        "xsjq_total":"1",
        "xsjq_growth":"-37.50%",

        "dzjq_today_fas":"12",
        "dzjq_today_sss":"14",
        "dzjq_total_fas":"14",
        "dzjq_total_sss":"4.5",
        "dzjq_growth":"120.00%",

        "jtsg_today_jqs":"12",
        "jtsg_today_wrs":"14",
        "jtsg_total_jqs":"14",
        "jtsg_total_wrs":"4.5",
        "jtsg_growth":"120.00%",

        "xsdc_zhs_today":"12",
        "xsdc_zhs_total":"14",
        "xsdc_xsqz_today":"14",
        "xsdc_xsqz_total":"4.5",
        "xsdc_yss_today":"12",
        "xsdc_yss_total":"14",
        },
        {
        "deptname":"全县",

        "yxjq_today":"0",
        "yxjq_total":"0",
        "yxjq_growth":"-37.50%",

        "xsjq_today":"1",
        "xsjq_total":"1",
        "xsjq_growth":"-37.50%",

        "dzjq_today_fas":"12",
        "dzjq_today_sss":"14",
        "dzjq_total_fas":"14",
        "dzjq_total_sss":"4.5",
        "dzjq_growth":"120.00%",

        "jtsg_today_jqs":"12",
        "jtsg_today_wrs":"14",
        "jtsg_total_jqs":"14",
        "jtsg_total_wrs":"4.5",
        "jtsg_growth":"120.00%",

        "xsdc_zhs_today":"12",
        "xsdc_zhs_total":"14",
        "xsdc_xsqz_today":"14",
        "xsdc_xsqz_total":"4.5",
        "xsdc_yss_today":"12",
        "xsdc_yss_total":"14",
        },
      ],
      isShowTableOne:true,
      isShowTableTwo:false,
      isShowTableThree:false,

    }
  },
  computed: mapState({
    currentDate: state => state.mrtb.currentDate,
  }),
  methods:{
    getMrtbByDateCallBack(data){
      this.mrtbObj=data;
    },
    getUndefinedToZreo(str){
      var formatstr="0";
      if(str&&str!=undefined){
        formatstr=str;
      }
      return formatstr;
    },
    getMrtbByDate(val){
      this.http.get("/mrtb/getMrtbByDate",{"date":val},this.getMrtbByDateCallBack,this,false); 
    },
    changeShowTable(index){
      if(index==1){
        this.isShowTableOne=true;
        this.isShowTableTwo=false;
        this.isShowTableThree=false;
      }else if(index==2){
        this.isShowTableOne=false;
        this.isShowTableTwo=true;
        this.isShowTableThree=false;
      }else if(index==3){
        this.isShowTableOne=false;
        this.isShowTableTwo=false;
        this.isShowTableThree=true;
      }else{

      }
    }
  },
  created(){
    var strdate=this.common.dateFormat(this.common.addDate(-1),"yyyy-MM-dd");
    this.$store.dispatch('putChildState',{"key":"mrtb","childkey":"currentDate","value":strdate});
  },
  mounted(){
  },
    watch:{
    currentDate:{
      handler(val){
        if(""!=val){
        this.getMrtbByDate(val);
        }
      },
    }
  }
}
</script>

<style scoped>
.mrtbRightPanel{
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
.contentPanel{
  width: 100%;
  height: calc(100% - 125px);
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
.ssyjtabletitle {
    text-align: center;
    color: #b6f6ff;
    line-height: 40px;
    position: absolute;
    left: 45%;
    height: 40px;
    font-size: 16px;
}
.tabletype{
  width: 129px;
  height: 32px;
  color: #b6f6ff;
  text-align: center;
  line-height: 32px;
  background: 
  url(./../../../assets/ssyj/ssyj_type.png)  no-repeat;
}
.tablecontent{
  display: flex;
  justify-content: space-around;
}
.tableColumn{
  height: 128px;
}
.tableColumn div{
   text-align: center;
   height: 32px;
   line-height: 32px;
   color: #b6f6ff;
   border: 1px solid #b6f6ff;
}
.table-cell-yellow{
   color:rgba(255, 255, 0,1) !important; 
}
.table-cell-green{
    color:rgba(103, 194, 58,1) !important;
}
.table-cell-red{
    color:rgba(237, 64, 20,1) !important;
}
.zdsjtable{
  border: 1px solid #255c95;
  text-align: center;
  color: white;
  height: 100%;
  width: 100%;
}
.zdsjtable tr{
 height: 40px;
}
.zdsjtable td{
  border: 1px solid #255c95;
 height: 40px;
 width: 30px;
}
</style>

