<template>
<div>
    <Modal v-model="isShowJqMdy" :draggable = "true" title="修改每日通报-警情" class-name="mrtbjqmdy-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="MrtbAddPanel" style="position: reative;">
            <span >选择修改的日期：</span>
            <span>{{currentdate}}</span>
            <div class="jqcount">   
              <h6>有效警情</h6>
              <table border="1">
                <thead>
                  <tr ref="yxjq_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="yxjq_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr  ref="yxjq_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr  ref="yxjq_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                </tbody>
            </table>
          </div>
          <div class="jqcount" style ="position:absolute;left:750px;top:107px;">   
              <h6>刑事警情</h6>
              <table border="1">
                <thead>
                  <tr ref="xsjq_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsjq_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsjq_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsjq_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                </tbody>
            </table>
          </div>
          <div class="jqcount" style="margin-top: 50px;">   
              <h6>电诈警情</h6>
              <table border="1">
                <thead>
                  <tr ref="dzjq_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="dzjq_today_fas">
                    <td style="display:inline-block;width:44px;">当日发案数</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="dzjq_today_sss">
                    <td style="display:inline-block;width:44px;">当日损失数</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="dzjq_total_fas">
                    <td style="display:inline-block;width:44px;">累计发案数</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="dzjq_total_sss">
                    <td style="display:inline-block;width:44px;">累计损失数</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="dzjq_growth">
                    <td style="display:inline-block;width:44px;">发案数同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                </tbody>
            </table>
          </div>
          <div class="jqcount" style ="position:absolute;left:750px;top:234px;">   
              <h6>案件类警情</h6>
              <table border="1">
                <thead>
                  <tr ref="ajjq_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="ajjq_ma">
                    <td style="display:inline-block;width:44px;">命案</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="ajjq_zp">
                    <td style="display:inline-block;width:44px;">诈骗</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="ajjq_lq">
                    <td style="display:inline-block;width:44px;">两抢</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="ajjq_dq">
                    <td style="display:inline-block;width:44px;">盗窃</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="ajjq_rsdq">
                    <td style="display:inline-block;width:44px;">入室盗窃</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="ajjq_djdo">
                    <td style="display:inline-block;width:44px;">打架斗殴</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="ajjq_shcw">
                    <td style="display:inline-block;width:44px;">损坏财物</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="ajjq_qt">
                    <td style="display:inline-block;width:44px;">其他</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                </tbody>
            </table>
          </div>
          </div>
          <div slot="footer">
            <!-- <HfxButton @click="clearPtJqinsertform" name="重置" /> -->
            <HfxButton @click="submitJqMdy" name="修改" />
          </div>
    </Modal>
    <Modal v-model="isShowJtMdy" :draggable = "true" title="修改每日通报-交通" class-name="mrtbmdy-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="MrtbAddPanel">
            <span >选择修改的日期：</span>
            <span>{{currentdate}}</span>
          <div class="jqcount">   
              <h6>交通警情</h6>
              <table border="1">
                <thead>
                  <tr ref="jtsg_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="jtsg_today_jqs">
                    <td style="display:inline-block;width:44px;">当日警情数</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="jtsg_today_wrs">
                    <td style="display:inline-block;width:44px;">当日亡人数</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="jtsg_total_jqs">
                    <td style="display:inline-block;width:44px;">累计警情数</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="jtsg_total_wrs">
                    <td style="display:inline-block;width:44px;">累计亡人数</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="jtsg_growth">
                    <td style="display:inline-block;width:44px;">死亡数同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                </tbody>
            </table>
          </div>
          </div>
          <div slot="footer">
            <!-- <HfxButton @click="clearJtinsertform" name="重置" /> -->
            <HfxButton @click="submitJtMdy" name="修改" />
          </div>
    </Modal>
    <Modal v-model="isShowDcMdy" :draggable = "true" title="修改每日通报-打处" class-name="mrtbxsmdy-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="MrtbAddPanel">
            <span >选择修改的日期：</span>
            <span>{{currentdate}}</span>
          <div class="jqcount">   
              <h6>刑事案件-刑事拘留</h6>
              <table border="1">
                <thead>
                  <tr ref="xsaj_xsjl_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsaj_xsjl_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsaj_xsjl_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xsaj_xsjl_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount">   
              <h6>刑事案件-取保候审</h6>
              <table border="1">
                <thead>
                  <tr ref="xsaj_qbhs_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsaj_qbhs_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsaj_qbhs_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xsaj_qbhs_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount">   
              <h6>刑事案件-移送起诉</h6>
              <table border="1">
                <thead>
                  <tr ref="xsaj_ysqs_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsaj_ysqs_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsaj_ysqs_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xsaj_ysqs_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount">   
              <h6>刑事案件-侵财类</h6>
              <table border="1">
                <thead>
                  <tr ref="xsaj_qcl_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsaj_qcl_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsaj_qcl_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xsaj_qcl_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount">   
              <h6>刑事案件-涉黄</h6>
              <table border="1">
                <thead>
                  <tr ref="xsaj_sh_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsaj_sh_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsaj_sh_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xsaj_sh_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount">   
              <h6>刑事案件-涉赌</h6>
              <table border="1">
                <thead>
                  <tr ref="xsaj_dubo_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsaj_dubo_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsaj_dubo_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xsaj_dubo_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount">   
              <h6>刑事案件-涉毒</h6>
              <table border="1">
                <thead>
                  <tr ref="xsaj_dupin_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsaj_dupin_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsaj_dupin_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xsaj_dupin_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount" style ="position:absolute;left:750px;top:107px;">   
              <h6>刑事案件-经济</h6>
              <table border="1">
                <thead>
                  <tr ref="xsaj_jj_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsaj_jj_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsaj_jj_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xsaj_jj_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount" style ="position:absolute;left:750px;top:206px;">   
              <h6>刑事案件-食药环</h6>
              <table border="1">
                <thead>
                  <tr ref="xsaj_syh_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsaj_syh_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsaj_syh_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xsaj_syh_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount" style ="position:absolute;left:750px;top:305px;">   
              <h6>行政处罚-涉黄</h6>
              <table border="1">
                <thead>
                  <tr ref="xzcf_sh_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xzcf_sh_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xzcf_sh_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xzcf_sh_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount" style ="position:absolute;left:750px;top:404px;">   
              <h6>行政处罚-涉赌</h6>
              <table border="1">
                <thead>
                  <tr ref="xzcf_dubo_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xzcf_dubo_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xzcf_dubo_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xzcf_dubo_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount" style ="position:absolute;left:750px;top:503px;">   
              <h6>行政处罚-涉毒</h6>
              <table border="1">
                <thead>
                  <tr ref="xzcf_dupin_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xzcf_dupin_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xzcf_dupin_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="xzcf_dupin_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount" style ="position:absolute;left:750px;top:602px;">   
              <h6>违法嫌疑人抓获数</h6>
              <table border="1">
                <thead>
                  <tr ref="wfxyrzhs_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="wfxyrzhs_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="wfxyrzhs_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <!-- <tr ref="wfxyrzhs_growth">
                    <td style="display:inline-block;width:44px;">同比</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr> -->
                </tbody>
            </table>
          </div>
          <div class="jqcount" >   
              <h6>刑事打击</h6>
              <table border="1">
                <thead>
                  <tr ref="xsdj_dept">
                    <th></th>
                    <th v-for="Obj in deptArr" :key="Obj.deptcode">{{Obj.deptname}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ref="xsdj_today">
                    <td style="display:inline-block;width:44px;">当日</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                  <tr ref="xsdj_total">
                    <td style="display:inline-block;width:44px;">累计</td>
                    <td v-for="Obj in deptArr" :key="Obj.deptcode"><input type="text" ></td>
                  </tr>
                </tbody>
            </table>
          </div>
          </div>
          <div slot="footer">
            <!-- <HfxButton @click="clearDcinsertform" name="重置" /> -->
            <HfxButton @click="submitXsDcMdy" name="修改" />
          </div>
    </Modal>
</div>
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
export default {
  name: 'MrtbEditInfo',
  props:['showdata'],
  components: {},
  data () {
    return {
        deptArr:[],//展示部门列表
        ptjqarr:[],//普通警情数据
        jtsgarr:[],//交通警情数据
        xsdcarr:[],//刑事打处数据
    }
  },
  computed:{ ...mapState({
    userInfo: state => state.userInfo,
    }),
    isShowJqMdy:{
      get:function(){
        var deptcode=this.userInfo.deptcode;
        var usercode=this.userInfo.usercode;
        var b=false;
        if(this.showdata.showmodal&&"admin"==usercode){
            b=true;
        }else if(this.showdata.showmodal&&"330424090000"==deptcode){
            b=true;
        }
        return b;
      },
      set:function(){
        this.showdata.showmodal=false;
      }
    },
    isShowJtMdy:{
      get:function(){
        var deptcode=this.userInfo.deptcode;
        var usercode=this.userInfo.usercode;
        var b=false;
        if(this.showdata.showmodal&&"admin"==usercode){
            b=true;
        }else if(this.showdata.showmodal&&"330424170000"==deptcode){
            b=true;
        }
        return b;  
      },
      set:function(){
        this.showdata.showmodal=false;
      }
    },
    isShowDcMdy:{
      get:function(){
        var deptcode=this.userInfo.deptcode;
        var usercode=this.userInfo.usercode;
        var b=false;
        if(this.showdata.showmodal&&"admin"==usercode){
            b=true;
        }else if(this.showdata.showmodal&&"330424050000"==deptcode){
            b=true;
        }
        return b;
      },
      set:function(){
        this.showdata.showmodal=false;
      }
    },    
    currentdate:function(){
    return this.showdata.currentdate;
    },
  },
  methods:{
    getMrtbDeptCallBack(data){
      this.deptArr=data;
    },
    getMrtbByDateCallBack(data){
      var datearr=data;

      //有效警情
      var yxjq_today=this.$refs.yxjq_today.children;
      var yxjq_total=this.$refs.yxjq_total.children;
      var yxjq_growth=this.$refs.yxjq_growth.children;

       //刑事警情
      var xsjq_today=this.$refs.xsjq_today.children;
      var xsjq_total=this.$refs.xsjq_total.children;
      var xsjq_growth=this.$refs.xsjq_growth.children;

      //电诈警情
      var dzjq_today_fas=this.$refs.dzjq_today_fas.children;
      var dzjq_today_sss=this.$refs.dzjq_today_sss.children;
      var dzjq_total_fas=this.$refs.dzjq_total_fas.children;
      var dzjq_total_sss=this.$refs.dzjq_total_sss.children;
      var dzjq_growth=this.$refs.dzjq_growth.children;

      //案件类警情
      var ajjq_ma=this.$refs.ajjq_ma.children;
      var ajjq_zp=this.$refs.ajjq_zp.children;
      var ajjq_lq=this.$refs.ajjq_lq.children;
      var ajjq_dq=this.$refs.ajjq_dq.children;
      var ajjq_rsdq=this.$refs.ajjq_rsdq.children;
      var ajjq_djdo=this.$refs.ajjq_djdo.children;
      var ajjq_shcw=this.$refs.ajjq_shcw.children;
      var ajjq_qt=this.$refs.ajjq_qt.children;

      //交通事故
      var jtsg_today_jqs=this.$refs.jtsg_today_jqs.children;
      var jtsg_today_wrs=this.$refs.jtsg_today_wrs.children;
      var jtsg_total_jqs=this.$refs.jtsg_total_jqs.children;
      var jtsg_total_wrs=this.$refs.jtsg_total_wrs.children;
      var jtsg_growth=this.$refs.jtsg_growth.children;

      //刑事案件-刑事拘留
      var xsaj_xsjl_today=this.$refs.xsaj_xsjl_today.children;
      var xsaj_xsjl_total=this.$refs.xsaj_xsjl_total.children;
      // var xsaj_xsjl_growth=this.$refs.xsaj_xsjl_growth.children;
      //刑事案件-取保候审
      var xsaj_qbhs_today=this.$refs.xsaj_qbhs_today.children;
      var xsaj_qbhs_total=this.$refs.xsaj_qbhs_total.children;
      // var xsaj_qbhs_growth=this.$refs.xsaj_qbhs_growth.children;
      //刑事案件-移送起诉
      var xsaj_ysqs_today=this.$refs.xsaj_ysqs_today.children;
      var xsaj_ysqs_total=this.$refs.xsaj_ysqs_total.children;
      // var xsaj_ysqs_growth=this.$refs.xsaj_ysqs_growth.children;
      //刑事案件-侵财类
      var xsaj_qcl_today=this.$refs.xsaj_qcl_today.children;
      var xsaj_qcl_total=this.$refs.xsaj_qcl_total.children;
      // var xsaj_qcl_growth=this.$refs.xsaj_qcl_growth.children;
      //刑事案件-涉黄
      var xsaj_sh_today=this.$refs.xsaj_sh_today.children;
      var xsaj_sh_total=this.$refs.xsaj_sh_total.children;
      // var xsaj_sh_growth=this.$refs.xsaj_sh_growth.children;
      //刑事案件-涉赌
      var xsaj_dubo_today=this.$refs.xsaj_dubo_today.children;
      var xsaj_dubo_total=this.$refs.xsaj_dubo_total.children;
      // var xsaj_dubo_growth=this.$refs.xsaj_dubo_growth.children;
      //刑事案件-涉毒
      var xsaj_dupin_today=this.$refs.xsaj_dupin_today.children;
      var xsaj_dupin_total=this.$refs.xsaj_dupin_total.children;
      // var xsaj_dupin_growth=this.$refs.xsaj_dupin_growth.children;
      //刑事案件-经济
      var xsaj_jj_today=this.$refs.xsaj_jj_today.children;
      var xsaj_jj_total=this.$refs.xsaj_jj_total.children;
      // var xsaj_jj_growth=this.$refs.xsaj_jj_growth.children;
      //刑事案件-食药环
      var xsaj_syh_today=this.$refs.xsaj_syh_today.children;
      var xsaj_syh_total=this.$refs.xsaj_syh_total.children;
      // var xsaj_syh_growth=this.$refs.xsaj_syh_growth.children;
      //行政处罚-涉黄
      var xzcf_sh_today=this.$refs.xzcf_sh_today.children;
      var xzcf_sh_total=this.$refs.xzcf_sh_total.children;
      // var xzcf_sh_growth=this.$refs.xzcf_sh_growth.children;
      //行政处罚-涉赌
      var xzcf_dubo_today=this.$refs.xzcf_dubo_today.children;
      var xzcf_dubo_total=this.$refs.xzcf_dubo_total.children;
      // var xzcf_dubo_growth=this.$refs.xzcf_dubo_growth.children;
      //行政处罚-涉毒
      var xzcf_dupin_today=this.$refs.xzcf_dupin_today.children;
      var xzcf_dupin_total=this.$refs.xzcf_dupin_total.children;
      // var xzcf_dupin_growth=this.$refs.xzcf_dupin_growth.children;
      //违法嫌疑人抓获数
      var wfxyrzhs_today=this.$refs.wfxyrzhs_today.children;
      var wfxyrzhs_total=this.$refs.wfxyrzhs_total.children;
      // var wfxyrzhs_growth=this.$refs.wfxyrzhs_growth.children;
      //刑事打击
      var xsdj_today=this.$refs.xsdj_today.children;
      var xsdj_total=this.$refs.xsdj_total.children;

      for(var i=0;i<datearr.length;i++){

        yxjq_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].yxjq_today);
        yxjq_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].yxjq_total);
        yxjq_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].yxjq_growth);

        xsjq_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsjq_today);
        xsjq_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsjq_total);
        xsjq_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsjq_growth);

        dzjq_today_fas[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].dzjq_today_fas);
        dzjq_today_sss[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].dzjq_today_sss);
        dzjq_total_fas[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].dzjq_total_fas);
        dzjq_total_sss[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].dzjq_total_sss);
        dzjq_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].dzjq_growth);

        ajjq_ma[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].ajjq_ma);
        ajjq_zp[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].ajjq_zp);
        ajjq_lq[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].ajjq_lq);
        ajjq_dq[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].ajjq_dq);
        ajjq_rsdq[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].ajjq_rsdq);
        ajjq_djdo[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].ajjq_djdo);
        ajjq_shcw[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].ajjq_shcw);
        ajjq_qt[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].ajjq_qt);

        jtsg_today_jqs[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].jtsg_today_jqs);
        jtsg_today_wrs[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].jtsg_today_wrs);
        jtsg_total_jqs[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].jtsg_total_jqs);
        jtsg_total_wrs[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].jtsg_total_wrs);
        jtsg_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].jtsg_growth);

        xsaj_xsjl_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_xsjl_today);
        xsaj_xsjl_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_xsjl_total);
        // xsaj_xsjl_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_xsjl_growth);

        xsaj_qbhs_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_qbhs_today);
        xsaj_qbhs_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_qbhs_total);
        // xsaj_qbhs_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_qbhs_growth);

        xsaj_ysqs_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_ysqs_today);
        xsaj_ysqs_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_ysqs_total);
        // xsaj_ysqs_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_ysqs_growth);

        xsaj_qcl_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_qcl_today);
        xsaj_qcl_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_qcl_total);
        // xsaj_qcl_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_qcl_growth);

        xsaj_sh_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_sh_today);
        xsaj_sh_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_sh_total);
        // xsaj_sh_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_sh_growth);
        
        xsaj_dubo_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_dubo_today);
        xsaj_dubo_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_dubo_total);
        // xsaj_dubo_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_dubo_growth);

        xsaj_dupin_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_dupin_today);
        xsaj_dupin_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_dupin_total);
        // xsaj_dupin_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_dupin_growth);

        xsaj_jj_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_jj_today);
        xsaj_jj_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_jj_total);
        // xsaj_jj_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_jj_growth);

        xsaj_syh_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_syh_today);
        xsaj_syh_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_syh_total);
        // xsaj_syh_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsaj_syh_growth);

        xzcf_sh_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xzcf_sh_today);
        xzcf_sh_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xzcf_sh_total);
        // xzcf_sh_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xzcf_sh_growth);

        xzcf_dubo_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xzcf_dubo_today);
        xzcf_dubo_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xzcf_dubo_total);
        // xzcf_dubo_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xzcf_dubo_growth);

        xzcf_dupin_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xzcf_dupin_today);
        xzcf_dupin_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xzcf_dupin_total);
        // xzcf_dupin_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xzcf_dupin_growth);

        wfxyrzhs_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].wfxyrzhs_today);
        wfxyrzhs_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].wfxyrzhs_total);
        // wfxyrzhs_growth[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].wfxyrzhs_growth);

        xsdj_today[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsdj_today);
        xsdj_total[i+1].children[0].value=this.getUndefinedToZreo(datearr[i].xsdj_total);
      }

    },
 submitJqMdy(){
      if(this.currentdate==null||this.currentdate==""){
        this.$Message.error("请选择修改日期");
        return;
      }

      //部门
      var ptjqdept=this.deptArr;

       //有效警情
      var yxjq_today=this.$refs.yxjq_today.children;
      var yxjq_total=this.$refs.yxjq_total.children;
      var yxjq_growth=this.$refs.yxjq_growth.children;

       //刑事警情
      var xsjq_today=this.$refs.xsjq_today.children;
      var xsjq_total=this.$refs.xsjq_total.children;
      var xsjq_growth=this.$refs.xsjq_growth.children;

      //电诈警情
      var dzjq_today_fas=this.$refs.dzjq_today_fas.children;
      var dzjq_today_sss=this.$refs.dzjq_today_sss.children;
      var dzjq_total_fas=this.$refs.dzjq_total_fas.children;
      var dzjq_total_sss=this.$refs.dzjq_total_sss.children;
      var dzjq_growth=this.$refs.dzjq_growth.children;

      //案件类警情
      var ajjq_ma=this.$refs.ajjq_ma.children;
      var ajjq_zp=this.$refs.ajjq_zp.children;
      var ajjq_lq=this.$refs.ajjq_lq.children;
      var ajjq_dq=this.$refs.ajjq_dq.children;
      var ajjq_rsdq=this.$refs.ajjq_rsdq.children;
      var ajjq_djdo=this.$refs.ajjq_djdo.children;
      var ajjq_shcw=this.$refs.ajjq_shcw.children;
      var ajjq_qt=this.$refs.ajjq_qt.children;
      


      for(var i=0;i<ptjqdept.length;i++){
        var ptjqvalueObj = {};

        ptjqvalueObj.yxjq_today = yxjq_today[i+1].children[0].value==""?"0":yxjq_today[i+1].children[0].value;
        ptjqvalueObj.yxjq_total = yxjq_total[i+1].children[0].value==""?"0":yxjq_total[i+1].children[0].value;
        ptjqvalueObj.yxjq_growth = yxjq_growth[i+1].children[0].value==""?"0":yxjq_growth[i+1].children[0].value;

        ptjqvalueObj.xsjq_today = xsjq_today[i+1].children[0].value==""?"0":xsjq_today[i+1].children[0].value;
        ptjqvalueObj.xsjq_total = xsjq_total[i+1].children[0].value==""?"0":xsjq_total[i+1].children[0].value;
        ptjqvalueObj.xsjq_growth = xsjq_growth[i+1].children[0].value==""?"0":xsjq_growth[i+1].children[0].value;

        ptjqvalueObj.dzjq_today_fas = dzjq_today_fas[i+1].children[0].value==""?"0":dzjq_today_fas[i+1].children[0].value;
        ptjqvalueObj.dzjq_today_sss = dzjq_today_sss[i+1].children[0].value==""?"0":dzjq_today_sss[i+1].children[0].value;
        ptjqvalueObj.dzjq_total_fas = dzjq_total_fas[i+1].children[0].value==""?"0":dzjq_total_fas[i+1].children[0].value;
        ptjqvalueObj.dzjq_total_sss = dzjq_total_sss[i+1].children[0].value==""?"0":dzjq_total_sss[i+1].children[0].value;
        ptjqvalueObj.dzjq_growth = dzjq_growth[i+1].children[0].value==""?"0":dzjq_growth[i+1].children[0].value;

        ptjqvalueObj.ajjq_ma = ajjq_ma[i+1].children[0].value==""?"0":ajjq_ma[i+1].children[0].value;
        ptjqvalueObj.ajjq_zp = ajjq_zp[i+1].children[0].value==""?"0":ajjq_zp[i+1].children[0].value;
        ptjqvalueObj.ajjq_lq = ajjq_lq[i+1].children[0].value==""?"0":ajjq_lq[i+1].children[0].value;
        ptjqvalueObj.ajjq_dq = ajjq_dq[i+1].children[0].value==""?"0":ajjq_dq[i+1].children[0].value;
        ptjqvalueObj.ajjq_rsdq = ajjq_rsdq[i+1].children[0].value==""?"0":ajjq_rsdq[i+1].children[0].value;
        ptjqvalueObj.ajjq_djdo = ajjq_djdo[i+1].children[0].value==""?"0":ajjq_djdo[i+1].children[0].value;
        ptjqvalueObj.ajjq_shcw = ajjq_shcw[i+1].children[0].value==""?"0":ajjq_shcw[i+1].children[0].value;
        ptjqvalueObj.ajjq_qt = ajjq_qt[i+1].children[0].value==""?"0":ajjq_qt[i+1].children[0].value;

        ptjqvalueObj.deptcode = this.deptArr[i].deptcode;
        ptjqvalueObj.date = this.currentdate;
        this.ptjqarr.push(ptjqvalueObj);
      }
      var paramObj = {};
      paramObj.date = this.currentdate;
      paramObj.ptjq = this.ptjqarr;
      // console.log(this.ptjqarr);
      // console.log(paramObj);
      this.http.post("/mrtb/addMrtbPtJq",paramObj,this.addMrtbPtJqCallBack,this,false); 
    },
    addMrtbPtJqCallBack(data){
      this.clearPtJqinsertform();
      this.showdata.currentdate="";
      this.showdata.showmodal=false;
      this.$Message.success("修改成功");
    },
    submitJtMdy(){
      if(this.currentdate==null||this.currentdate==""){
        this.$Message.error("请选择修改日期");
        return;
      }
      //交通事故
      var jtsgdept=this.$refs.jtsg_dept.children;
      var jtsg_today_jqs=this.$refs.jtsg_today_jqs.children;
      var jtsg_today_wrs=this.$refs.jtsg_today_wrs.children;
      var jtsg_total_jqs=this.$refs.jtsg_total_jqs.children;
      var jtsg_total_wrs=this.$refs.jtsg_total_wrs.children;
      var jtsg_growth=this.$refs.jtsg_growth.children;
      for(var i=1;i<jtsgdept.length;i++){
        var jtsgvalueObj = {};
        jtsgvalueObj.jtsg_today_jqs = jtsg_today_jqs[i].children[0].value==""?"0":jtsg_today_jqs[i].children[0].value;
        jtsgvalueObj.jtsg_today_wrs = jtsg_today_wrs[i].children[0].value==""?"0":jtsg_today_wrs[i].children[0].value;
        jtsgvalueObj.jtsg_total_jqs = jtsg_total_jqs[i].children[0].value==""?"0":jtsg_total_jqs[i].children[0].value;
        jtsgvalueObj.jtsg_total_wrs = jtsg_total_wrs[i].children[0].value==""?"0":jtsg_total_wrs[i].children[0].value;
        jtsgvalueObj.jtsg_growth = jtsg_growth[i].children[0].value==""?"0":jtsg_growth[i].children[0].value;
        jtsgvalueObj.deptcode = this.deptArr[i-1].deptcode;
        jtsgvalueObj.date = this.currentdate;
        this.jtsgarr.push(jtsgvalueObj);
      }
      var paramObj = {};
      paramObj.date = this.currentdate;
      paramObj.jtjq = this.jtsgarr;
      // console.log(this.jtsgarr);
      // console.log(paramObj);
      this.http.post("/mrtb/addMrtbJtJq",paramObj,this.addMrtbJtJqCallBack,this,false); 
    },
    addMrtbJtJqCallBack(data){
      this.clearJtinsertform();
      this.showdata.currentdate="";
      this.showdata.showmodal=false;
      this.$Message.success("修改成功");
    },
    submitXsDcMdy(){
      if(this.currentdate==null||this.currentdate==""){
        this.$Message.error("请选择修改日期");
        return;
      }
      //部门
      var ptjqdept=this.deptArr;

      //刑事案件-刑事拘留
      var xsaj_xsjl_today=this.$refs.xsaj_xsjl_today.children;
      var xsaj_xsjl_total=this.$refs.xsaj_xsjl_total.children;
      // var xsaj_xsjl_growth=this.$refs.xsaj_xsjl_growth.children;
      //刑事案件-取保候审
      var xsaj_qbhs_today=this.$refs.xsaj_qbhs_today.children;
      var xsaj_qbhs_total=this.$refs.xsaj_qbhs_total.children;
      // var xsaj_qbhs_growth=this.$refs.xsaj_qbhs_growth.children;
      //刑事案件-移送起诉
      var xsaj_ysqs_today=this.$refs.xsaj_ysqs_today.children;
      var xsaj_ysqs_total=this.$refs.xsaj_ysqs_total.children;
      // var xsaj_ysqs_growth=this.$refs.xsaj_ysqs_growth.children;
      //刑事案件-侵财类
      var xsaj_qcl_today=this.$refs.xsaj_qcl_today.children;
      var xsaj_qcl_total=this.$refs.xsaj_qcl_total.children;
      // var xsaj_qcl_growth=this.$refs.xsaj_qcl_growth.children;
      //刑事案件-涉黄
      var xsaj_sh_today=this.$refs.xsaj_sh_today.children;
      var xsaj_sh_total=this.$refs.xsaj_sh_total.children;
      // var xsaj_sh_growth=this.$refs.xsaj_sh_growth.children;
      //刑事案件-涉赌
      var xsaj_dubo_today=this.$refs.xsaj_dubo_today.children;
      var xsaj_dubo_total=this.$refs.xsaj_dubo_total.children;
      // var xsaj_dubo_growth=this.$refs.xsaj_dubo_growth.children;
      //刑事案件-涉毒
      var xsaj_dupin_today=this.$refs.xsaj_dupin_today.children;
      var xsaj_dupin_total=this.$refs.xsaj_dupin_total.children;
      // var xsaj_dupin_growth=this.$refs.xsaj_dupin_growth.children;
      //刑事案件-经济
      var xsaj_jj_today=this.$refs.xsaj_jj_today.children;
      var xsaj_jj_total=this.$refs.xsaj_jj_total.children;
      // var xsaj_jj_growth=this.$refs.xsaj_jj_growth.children;
      //刑事案件-食药环
      var xsaj_syh_today=this.$refs.xsaj_syh_today.children;
      var xsaj_syh_total=this.$refs.xsaj_syh_total.children;
      // var xsaj_syh_growth=this.$refs.xsaj_syh_growth.children;
      //行政处罚-涉黄
      var xzcf_sh_today=this.$refs.xzcf_sh_today.children;
      var xzcf_sh_total=this.$refs.xzcf_sh_total.children;
      // var xzcf_sh_growth=this.$refs.xzcf_sh_growth.children;
      //行政处罚-涉赌
      var xzcf_dubo_today=this.$refs.xzcf_dubo_today.children;
      var xzcf_dubo_total=this.$refs.xzcf_dubo_total.children;
      // var xzcf_dubo_growth=this.$refs.xzcf_dubo_growth.children;
      //行政处罚-涉毒
      var xzcf_dupin_today=this.$refs.xzcf_dupin_today.children;
      var xzcf_dupin_total=this.$refs.xzcf_dupin_total.children;
      // var xzcf_dupin_growth=this.$refs.xzcf_dupin_growth.children;
      //违法嫌疑人抓获数
      var wfxyrzhs_today=this.$refs.wfxyrzhs_today.children;
      var wfxyrzhs_total=this.$refs.wfxyrzhs_total.children;
      // var wfxyrzhs_growth=this.$refs.wfxyrzhs_growth.children;
      //刑事打击
      var xsdj_today=this.$refs.xsdj_today.children;
      var xsdj_total=this.$refs.xsdj_total.children;

      for(var i=0;i<ptjqdept.length;i++){
        var xsdcvalueObj = {};

        xsdcvalueObj.xsaj_xsjl_today = xsaj_xsjl_today[i+1].children[0].value==""?"0":xsaj_xsjl_today[i+1].children[0].value;
        xsdcvalueObj.xsaj_xsjl_total = xsaj_xsjl_total[i+1].children[0].value==""?"0":xsaj_xsjl_total[i+1].children[0].value;
        // xsdcvalueObj.xsaj_xsjl_growth = xsaj_xsjl_growth[i+1].children[0].value==""?"0":xsaj_xsjl_growth[i+1].children[0].value;

        xsdcvalueObj.xsaj_qbhs_today = xsaj_qbhs_today[i+1].children[0].value==""?"0":xsaj_qbhs_today[i+1].children[0].value;
        xsdcvalueObj.xsaj_qbhs_total = xsaj_qbhs_total[i+1].children[0].value==""?"0":xsaj_qbhs_total[i+1].children[0].value;
        // xsdcvalueObj.xsaj_qbhs_growth = xsaj_qbhs_growth[i+1].children[0].value==""?"0":xsaj_qbhs_growth[i+1].children[0].value;

        xsdcvalueObj.xsaj_ysqs_today = xsaj_ysqs_today[i+1].children[0].value==""?"0":xsaj_ysqs_today[i+1].children[0].value;
        xsdcvalueObj.xsaj_ysqs_total = xsaj_ysqs_total[i+1].children[0].value==""?"0":xsaj_ysqs_total[i+1].children[0].value;
        // xsdcvalueObj.xsaj_ysqs_growth = xsaj_ysqs_growth[i+1].children[0].value==""?"0":xsaj_ysqs_growth[i+1].children[0].value;

        xsdcvalueObj.xsaj_qcl_today = xsaj_qcl_today[i+1].children[0].value==""?"0":xsaj_qcl_today[i+1].children[0].value;
        xsdcvalueObj.xsaj_qcl_total = xsaj_qcl_total[i+1].children[0].value==""?"0":xsaj_qcl_total[i+1].children[0].value;
        // xsdcvalueObj.xsaj_qcl_growth = xsaj_qcl_growth[i+1].children[0].value==""?"0":xsaj_qcl_growth[i+1].children[0].value;

        xsdcvalueObj.xsaj_sh_today = xsaj_sh_today[i+1].children[0].value==""?"0":xsaj_sh_today[i+1].children[0].value;
        xsdcvalueObj.xsaj_sh_total = xsaj_sh_total[i+1].children[0].value==""?"0":xsaj_sh_total[i+1].children[0].value;
        // xsdcvalueObj.xsaj_sh_growth = xsaj_sh_growth[i+1].children[0].value==""?"0":xsaj_sh_growth[i+1].children[0].value;
        
        xsdcvalueObj.xsaj_dubo_today = xsaj_dubo_today[i+1].children[0].value==""?"0":xsaj_dubo_today[i+1].children[0].value;
        xsdcvalueObj.xsaj_dubo_total = xsaj_dubo_total[i+1].children[0].value==""?"0":xsaj_dubo_total[i+1].children[0].value;
        // xsdcvalueObj.xsaj_dubo_growth = xsaj_dubo_growth[i+1].children[0].value==""?"0":xsaj_dubo_growth[i+1].children[0].value;

        xsdcvalueObj.xsaj_dupin_today = xsaj_dupin_today[i+1].children[0].value==""?"0":xsaj_dupin_today[i+1].children[0].value;
        xsdcvalueObj.xsaj_dupin_total = xsaj_dupin_total[i+1].children[0].value==""?"0":xsaj_dupin_total[i+1].children[0].value;
        // xsdcvalueObj.xsaj_dupin_growth = xsaj_dupin_growth[i+1].children[0].value==""?"0":xsaj_dupin_growth[i+1].children[0].value;

        xsdcvalueObj.xsaj_jj_today = xsaj_jj_today[i+1].children[0].value==""?"0":xsaj_jj_today[i+1].children[0].value;
        xsdcvalueObj.xsaj_jj_total = xsaj_jj_total[i+1].children[0].value==""?"0":xsaj_jj_total[i+1].children[0].value;
        // xsdcvalueObj.xsaj_jj_growth = xsaj_jj_growth[i+1].children[0].value==""?"0":xsaj_jj_growth[i+1].children[0].value;

        xsdcvalueObj.xsaj_syh_today = xsaj_syh_today[i+1].children[0].value==""?"0":xsaj_syh_today[i+1].children[0].value;
        xsdcvalueObj.xsaj_syh_total = xsaj_syh_total[i+1].children[0].value==""?"0":xsaj_syh_total[i+1].children[0].value;
        // xsdcvalueObj.xsaj_syh_growth = xsaj_syh_growth[i+1].children[0].value==""?"0":xsaj_syh_growth[i+1].children[0].value;

        xsdcvalueObj.xzcf_sh_today = xzcf_sh_today[i+1].children[0].value==""?"0":xzcf_sh_today[i+1].children[0].value;
        xsdcvalueObj.xzcf_sh_total = xzcf_sh_total[i+1].children[0].value==""?"0":xzcf_sh_total[i+1].children[0].value;
        // xsdcvalueObj.xzcf_sh_growth = xzcf_sh_growth[i+1].children[0].value==""?"0":xzcf_sh_growth[i+1].children[0].value;

        xsdcvalueObj.xzcf_dubo_today = xzcf_dubo_today[i+1].children[0].value==""?"0":xzcf_dubo_today[i+1].children[0].value;
        xsdcvalueObj.xzcf_dubo_total = xzcf_dubo_total[i+1].children[0].value==""?"0":xzcf_dubo_total[i+1].children[0].value;
        // xsdcvalueObj.xzcf_dubo_growth = xzcf_dubo_growth[i+1].children[0].value==""?"0":xzcf_dubo_growth[i+1].children[0].value;

        xsdcvalueObj.xzcf_dupin_today = xzcf_dupin_today[i+1].children[0].value==""?"0":xzcf_dupin_today[i+1].children[0].value;
        xsdcvalueObj.xzcf_dupin_total = xzcf_dupin_total[i+1].children[0].value==""?"0":xzcf_dupin_total[i+1].children[0].value;
        // xsdcvalueObj.xzcf_dupin_growth = xzcf_dupin_growth[i+1].children[0].value==""?"0":xzcf_dupin_growth[i+1].children[0].value;

        xsdcvalueObj.wfxyrzhs_today = wfxyrzhs_today[i+1].children[0].value==""?"0":wfxyrzhs_today[i+1].children[0].value;
        xsdcvalueObj.wfxyrzhs_total = wfxyrzhs_total[i+1].children[0].value==""?"0":wfxyrzhs_total[i+1].children[0].value;
        // xsdcvalueObj.wfxyrzhs_growth = wfxyrzhs_growth[i+1].children[0].value==""?"0":wfxyrzhs_growth[i+1].children[0].value;

        xsdcvalueObj.xsdj_today = xsdj_today[i+1].children[0].value==""?"0":xsdj_today[i+1].children[0].value;
        xsdcvalueObj.xsdj_total = xsdj_total[i+1].children[0].value==""?"0":xsdj_total[i+1].children[0].value;

        xsdcvalueObj.deptcode = this.deptArr[i].deptcode;
        xsdcvalueObj.date = this.currentdate;
        this.xsdcarr.push(xsdcvalueObj);
      }
      var paramObj = {};
      paramObj.date = this.currentdate;
      paramObj.xsdc = this.xsdcarr;
      // console.log(this.xsdcarr);
      // console.log(this.paramObj);
      this.http.post("/mrtb/addMrtbXsDc",paramObj,this.addMrtbXsDcCallBack,this,false); 
    },
    addMrtbXsDcCallBack(data){
      this.clearDcinsertform();
      this.showdata.currentdate="";
      this.showdata.showmodal=false;
      this.$Message.success("修改成功");
    },
    clearPtJqinsertform(){
      //部门
      var ptjqdept=this.deptArr;

       //有效警情
      var yxjq_today=this.$refs.yxjq_today.children;
      var yxjq_total=this.$refs.yxjq_total.children;
      var yxjq_growth=this.$refs.yxjq_growth.children;

       //刑事警情
      var xsjq_today=this.$refs.xsjq_today.children;
      var xsjq_total=this.$refs.xsjq_total.children;
      var xsjq_growth=this.$refs.xsjq_growth.children;

      //电诈警情
      var dzjq_today_fas=this.$refs.dzjq_today_fas.children;
      var dzjq_today_sss=this.$refs.dzjq_today_sss.children;
      var dzjq_total_fas=this.$refs.dzjq_total_fas.children;
      var dzjq_total_sss=this.$refs.dzjq_total_sss.children;
      var dzjq_growth=this.$refs.dzjq_growth.children;

      //案件类警情
      var ajjq_ma=this.$refs.ajjq_ma.children;
      var ajjq_zp=this.$refs.ajjq_zp.children;
      var ajjq_lq=this.$refs.ajjq_lq.children;
      var ajjq_dq=this.$refs.ajjq_dq.children;
      var ajjq_rsdq=this.$refs.ajjq_rsdq.children;
      var ajjq_djdo=this.$refs.ajjq_djdo.children;
      var ajjq_shcw=this.$refs.ajjq_shcw.children;
      var ajjq_qt=this.$refs.ajjq_qt.children;

      for(var i=0;i<ptjqdept.length;i++){
        yxjq_today[i+1].children[0].value="";
        yxjq_total[i+1].children[0].value="";
        yxjq_growth[i+1].children[0].value="";

        xsjq_today[i+1].children[0].value="";
        xsjq_total[i+1].children[0].value="";
        xsjq_growth[i+1].children[0].value="";

        dzjq_today_fas[i+1].children[0].value="";
        dzjq_today_sss[i+1].children[0].value="";
        dzjq_total_fas[i+1].children[0].value="";
        dzjq_total_sss[i+1].children[0].value="";
        dzjq_growth[i+1].children[0].value="";

        ajjq_ma[i+1].children[0].value="";
        ajjq_zp[i+1].children[0].value="";
        ajjq_lq[i+1].children[0].value="";
        ajjq_dq[i+1].children[0].value="";
        ajjq_rsdq[i+1].children[0].value="";
        ajjq_djdo[i+1].children[0].value="";
        ajjq_shcw[i+1].children[0].value="";
        ajjq_qt[i+1].children[0].value="";
      }
      this.ptjqarr=[];
    },
    clearJtinsertform(){
      //交通事故
      var jtsgdept=this.$refs.jtsg_dept.children;
      var jtsg_today_jqs=this.$refs.jtsg_today_jqs.children;
      var jtsg_today_wrs=this.$refs.jtsg_today_wrs.children;
      var jtsg_total_jqs=this.$refs.jtsg_total_jqs.children;
      var jtsg_total_wrs=this.$refs.jtsg_total_wrs.children;
      var jtsg_growth=this.$refs.jtsg_growth.children;
      for(var i=1;i<jtsgdept.length;i++){
       jtsg_today_jqs[i].children[0].value="";
       jtsg_today_wrs[i].children[0].value="";
       jtsg_total_jqs[i].children[0].value="";
       jtsg_total_wrs[i].children[0].value="";
       jtsg_growth[i].children[0].value="";
      }
      this.jtsgarr=[];
    },
    clearDcinsertform(){
      //部门
      var ptjqdept=this.deptArr;

      //刑事案件-刑事拘留
      var xsaj_xsjl_today=this.$refs.xsaj_xsjl_today.children;
      var xsaj_xsjl_total=this.$refs.xsaj_xsjl_total.children;
      // var xsaj_xsjl_growth=this.$refs.xsaj_xsjl_growth.children;
      //刑事案件-取保候审
      var xsaj_qbhs_today=this.$refs.xsaj_qbhs_today.children;
      var xsaj_qbhs_total=this.$refs.xsaj_qbhs_total.children;
      // var xsaj_qbhs_growth=this.$refs.xsaj_qbhs_growth.children;
      //刑事案件-移送起诉
      var xsaj_ysqs_today=this.$refs.xsaj_ysqs_today.children;
      var xsaj_ysqs_total=this.$refs.xsaj_ysqs_total.children;
      // var xsaj_ysqs_growth=this.$refs.xsaj_ysqs_growth.children;
      //刑事案件-侵财类
      var xsaj_qcl_today=this.$refs.xsaj_qcl_today.children;
      var xsaj_qcl_total=this.$refs.xsaj_qcl_total.children;
      // var xsaj_qcl_growth=this.$refs.xsaj_qcl_growth.children;
      //刑事案件-涉黄
      var xsaj_sh_today=this.$refs.xsaj_sh_today.children;
      var xsaj_sh_total=this.$refs.xsaj_sh_total.children;
      // var xsaj_sh_growth=this.$refs.xsaj_sh_growth.children;
      //刑事案件-涉赌
      var xsaj_dubo_today=this.$refs.xsaj_dubo_today.children;
      var xsaj_dubo_total=this.$refs.xsaj_dubo_total.children;
      // var xsaj_dubo_growth=this.$refs.xsaj_dubo_growth.children;
      //刑事案件-涉毒
      var xsaj_dupin_today=this.$refs.xsaj_dupin_today.children;
      var xsaj_dupin_total=this.$refs.xsaj_dupin_total.children;
      // var xsaj_dupin_growth=this.$refs.xsaj_dupin_growth.children;
      //刑事案件-经济
      var xsaj_jj_today=this.$refs.xsaj_jj_today.children;
      var xsaj_jj_total=this.$refs.xsaj_jj_total.children;
      // var xsaj_jj_growth=this.$refs.xsaj_jj_growth.children;
      //刑事案件-食药环
      var xsaj_syh_today=this.$refs.xsaj_syh_today.children;
      var xsaj_syh_total=this.$refs.xsaj_syh_total.children;
      // var xsaj_syh_growth=this.$refs.xsaj_syh_growth.children;
      //行政处罚-涉黄
      var xzcf_sh_today=this.$refs.xzcf_sh_today.children;
      var xzcf_sh_total=this.$refs.xzcf_sh_total.children;
      // var xzcf_sh_growth=this.$refs.xzcf_sh_growth.children;
      //行政处罚-涉赌
      var xzcf_dubo_today=this.$refs.xzcf_dubo_today.children;
      var xzcf_dubo_total=this.$refs.xzcf_dubo_total.children;
      // var xzcf_dubo_growth=this.$refs.xzcf_dubo_growth.children;
      //行政处罚-涉毒
      var xzcf_dupin_today=this.$refs.xzcf_dupin_today.children;
      var xzcf_dupin_total=this.$refs.xzcf_dupin_total.children;
      // var xzcf_dupin_growth=this.$refs.xzcf_dupin_growth.children;
      //违法嫌疑人抓获数
      var wfxyrzhs_today=this.$refs.wfxyrzhs_today.children;
      var wfxyrzhs_total=this.$refs.wfxyrzhs_total.children;
      // var wfxyrzhs_growth=this.$refs.wfxyrzhs_growth.children;
      //刑事打击
      var xsdj_today=this.$refs.xsdj_today.children;
      var xsdj_total=this.$refs.xsdj_total.children;

      for(var i=0;i<ptjqdept.length;i++){
        var xsdcvalueObj = {};

        xsaj_xsjl_today[i+1].children[0].value="";
        xsaj_xsjl_total[i+1].children[0].value="";
        // xsaj_xsjl_growth[i+1].children[0].value="";

        xsaj_qbhs_today[i+1].children[0].value="";
        xsaj_qbhs_total[i+1].children[0].value="";
        // xsaj_qbhs_growth[i+1].children[0].value="";

        xsaj_ysqs_today[i+1].children[0].value="";
        xsaj_ysqs_total[i+1].children[0].value=""
        // xsaj_ysqs_growth[i+1].children[0].value="";

        xsaj_qcl_today[i+1].children[0].value="";
        xsaj_qcl_total[i+1].children[0].value="";
        // xsaj_qcl_growth[i+1].children[0].value="";

        xsaj_sh_today[i+1].children[0].value="";
        xsaj_sh_total[i+1].children[0].value="";
        // xsaj_sh_growth[i+1].children[0].value="";
        
        xsaj_dubo_today[i+1].children[0].value="";
        xsaj_dubo_total[i+1].children[0].value="";
        // xsaj_dubo_growth[i+1].children[0].value="";

        xsaj_dupin_today[i+1].children[0].value="";
        xsaj_dupin_total[i+1].children[0].value="";
        // xsaj_dupin_growth[i+1].children[0].value="";

        xsaj_jj_today[i+1].children[0].value="";
        xsaj_jj_total[i+1].children[0].value="";
        // xsaj_jj_growth[i+1].children[0].value="";

        xsaj_syh_today[i+1].children[0].value="";
        xsaj_syh_total[i+1].children[0].value="";
        // xsaj_syh_growth[i+1].children[0].value="";

        xzcf_sh_today[i+1].children[0].value="";
        xzcf_sh_total[i+1].children[0].value="";
        // xzcf_sh_growth[i+1].children[0].value="";

        xzcf_dubo_today[i+1].children[0].value="";
        xzcf_dubo_total[i+1].children[0].value="";
        // xzcf_dubo_growth[i+1].children[0].value="";

        xzcf_dupin_today[i+1].children[0].value="";
        xzcf_dupin_total[i+1].children[0].value="";
        // xzcf_dupin_growth[i+1].children[0].value="";

        wfxyrzhs_today[i+1].children[0].value="";
        wfxyrzhs_total[i+1].children[0].value="";
        // wfxyrzhs_growth[i+1].children[0].value="";

        xsdj_today[i+1].children[0].value="";
        xsdj_total[i+1].children[0].value="";
      }
      this.xsdcarr=[];
    },
    getUndefinedToZreo(str){
      var formatstr="0";
      if(str&&str!=undefined){
        formatstr=str;
      }
      return formatstr;
    },
  },
  created(){
    this.http.get("/mrtb/getMrtbDept",null,this.getMrtbDeptCallBack,this,false);
  },
    watch:{
    currentdate:{
      handler(val){
        if(""!=val){
        this.http.get("/mrtb/getMrtbByDate",{"date":val},this.getMrtbByDateCallBack,this,false); 
        }
      },
    }
  }
}
</script>
<style scoped>
.ajzcEditPanel{
    width: 480px;
    height: 570px;
    float: left;
}
.ajzcEditBtn{
    text-align: center;
}
.ajzcEditContentPanel{
    float: left;
    width: 580px;
    height: 570px;
    margin-left: 22px;
}
.modal-div{
  margin: 0 0 20px 0;
}
.modal-div span{
  float: left;
  width: 85px;
  text-align: right;
  margin-right: 10px;
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
.date-picker{
  border: 0px;
  background-color: #2e3136;
  color: #d8d8d8;
  border-radius: 4px;
  width:180px;
  height: 28px;
}
.deptnameInput{
  width:256px;
}
.deptnameInput >>> textarea{
  width: 250px;
  min-height: 56px;
  font-size: 12px;
  padding: 0 10px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.editor-container{
    height: 570px;
}
.uespanel{
    overflow: visible;
    max-height: 475px;
    max-width: 578px;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-popper{
  z-index: 2000;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-inner{
  background-color: rgba(8, 56, 90, 0.90);
  box-shadow: 0 0 3px 0 #1234ac;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-arrow:after{
  background-color: rgba(8, 56, 90, 0.90);
}
.deptpanel_treePanel{
  height: calc(100% - 24px - 5px);
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
</style>
<style>
.mrtbjqmdy-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left: 387px;
  width: 1500px !important;
}
.mrtbxsmdy-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left: 387px;
  width: 1500px !important;
}
.mrtbmdy-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left: 387px;
  width: 750px !important;
}
</style>

