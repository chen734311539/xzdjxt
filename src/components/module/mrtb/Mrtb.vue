<template>
    <div class="mrtbpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
      <div class="seachbar">
            <div class="seachbar_caozuo">
              <span style="color:#b6f6ff;" >选择日期：</span>
              <el-date-picker type="date" v-model="selecteddate" style="width:220px;" :clearable="false"  value-format="yyyy-MM-dd" @change="changeselectedDate" placeholder="选择日期" />
              <div v-show="isShowAdd" class="seachbar_add"  title="添加" @click="showAddMrtb" ></div>
            </div>
      </div>
      <div class="mrtblist-panel">
        <MrtbButton v-for="Obj in dateList" :key="Obj" :data="Obj"  @on-click="changeDate" @show-edit="showEditPanel(Obj)" />
      </div>
      <Modal v-model="isShowJqAdd" :draggable = "true" title="新增每日通报-警情" class-name="mrtbjqadd-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="MrtbAddPanel" style="position: reative;">
            <span >选择日期：</span>
            <el-date-picker type="date" v-model="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
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
            <HfxButton @click="clearPtJqinsertform" name="重置" />
            <HfxButton @click="submitJqAdd" />
          </div>
        </Modal>
      <Modal v-model="isShowJtAdd" :draggable = "true" title="新增每日通报-交通" class-name="mrtbadd-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="MrtbAddPanel">
            <span >选择日期：</span>
            <el-date-picker type="date" v-model="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
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
            <HfxButton @click="clearJtinsertform" name="重置" />
            <HfxButton @click="submitJtAdd" />
          </div>
        </Modal>
      <Modal v-model="isShowDcAdd" :draggable = "true" title="新增每日通报-打处" class-name="mrtbxsadd-panel">
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div class="MrtbAddPanel">
            <span >选择日期：</span>
            <el-date-picker type="date" v-model="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
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
            <HfxButton @click="clearDcinsertform" name="重置" />
            <HfxButton @click="submitXsDcAdd" />
          </div>
        </Modal>
      <MrtbEditInfo :show="showEditObj.showmodal" :showdata="showEditObj"  />
    </div>
</template>

<script>
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import { mapState } from 'vuex'
import PagerNew from '@/components/base/PagerNew'
import MrtbButton from '@/components/module/mrtb/MrtbButton'
import MrtbEditInfo from '@/components/module/mrtb/MrtbEditInfo'
export default {
  name: 'Mrtb',
  components: {LeftContentNameBar,MrtbButton,MrtbEditInfo},
  data () {
    return {
      isShowJqAdd:false,//警情
      isShowJtAdd:false,//交通事故
      isShowDcAdd:false,//刑事打处
      selecteddate:"",//右侧展示选择的日期
      date:"",//新增选择的日期
      deptArr:[],//展示部门列表
      ptjqarr:[],//普通警情数据
      jtsgarr:[],//交通警情数据
      xsdcarr:[],//刑事打处数据
      dateList:[],//日期数组
      showEditObj:{showmodal:false,currentdate:""},
    }
  },
  computed: {...mapState({
     userInfo: state => state.userInfo,
    }),
    isShowAdd:function(){
      var deptcode=this.userInfo.deptcode;
      if("330424090000"==deptcode||"330424170000"==deptcode||"330424050000"==deptcode){
        return true;
      }else{
        return false;
      }
    },
  },
  methods:{
    showAddMrtb(){
      var deptcode=this.userInfo.deptcode;
      var usercode=this.userInfo.usercode;
      if("admin"==usercode){
        this.isShowJqAdd=true;
        this.isShowJtAdd=true;
        this.isShowDcAdd=true;
        return;
      }
      //交通
      if("330424170000"==deptcode){
         this.isShowJtAdd=true;
        return;
      //刑事侦查
      }else if("330424050000"==deptcode){
        this.isShowDcAdd=true;
        return;
      //警情
      }else{
        this.isShowJqAdd=true;
      }
    },
    submitJqAdd(){
      if(this.date==null||this.date==""){
        this.$Message.error("请选择日期");
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
        ptjqvalueObj.date = this.date;
        this.ptjqarr.push(ptjqvalueObj);
      }
      console.log(this.ptjqarr);
      var paramObj = {};
      paramObj.date = this.date;
      paramObj.ptjq = this.ptjqarr;
      this.http.post("/mrtb/addMrtbPtJq",paramObj,this.addMrtbPtJqCallBack,this,false); 
    },
    addMrtbPtJqCallBack(data){
      this.clearPtJqinsertform();
      this.isShowJqAdd=false;
      this.$Message.success(data);
    },
    submitJtAdd(){
      if(this.date==null||this.date==""){
        this.$Message.error("请选择日期");
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
        jtsgvalueObj.date = this.date;
        this.jtsgarr.push(jtsgvalueObj);
      }
      // console.log(this.jtsgarr);
      var paramObj = {};
      paramObj.date = this.date;
      paramObj.jtjq = this.jtsgarr;
      this.http.post("/mrtb/addMrtbJtJq",paramObj,this.addMrtbJtJqCallBack,this,false); 
    },
    addMrtbJtJqCallBack(data){
      this.clearJtinsertform();
      this.isShowJtAdd=false;
      this.$Message.success(data);
    },
    submitXsDcAdd(){
      if(this.date==null||this.date==""){
        this.$Message.error("请选择日期");
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
        xsdcvalueObj.date = this.date;
        this.xsdcarr.push(xsdcvalueObj);
      }
      // console.log(this.xsdcarr);
      var paramObj = {};
      paramObj.date = this.date;
      paramObj.xsdc = this.xsdcarr;
      this.http.post("/mrtb/addMrtbXsDc",paramObj,this.addMrtbXsDcCallBack,this,false); 
    },
    addMrtbXsDcCallBack(data){
      this.clearDcinsertform();
      this.isShowDcAdd=false;
      this.$Message.success(data);
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
      this.date="";
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
      this.date="";
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
      this.date="";
    },
    getMrtbDeptCallBack(data){
      this.deptArr=data;
    },
    changeDate(val){
      this.$store.dispatch('putChildState',{"key":"mrtb","childkey":"currentDate","value":val});
      this.selecteddate=val;
    },
    getDateArr(){
      var datearr=[];
      for(var i=1;i<=10;i++){
        var date=this.common.dateFormat(this.common.addDate(0-i),"yyyy-MM-dd");
        datearr.push(date);
      }
      this.dateList=datearr;
    },
    changeselectedDate(val){
      this.$store.dispatch('putChildState',{"key":"mrtb","childkey":"currentDate","value":val});
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
    getUndefinedToZreo(str){
      var formatstr="0";
      if(str&&str!=undefined){
        formatstr=str;
      }
      return formatstr;
    },
    showEditPanel(val){
        this.showEditObj.currentdate=val;
        console.log(val);
        this.showEditObj.showmodal = true;
      },

  },
  created(){
    this.http.get("/mrtb/getMrtbDept",null,this.getMrtbDeptCallBack,this,false);
    this.getDateArr();
    var strdate=this.common.dateFormat(this.common.addDate(-1),"yyyy-MM-dd");
    this.http.get("/mrtb/getMrtbByDate",{"date":strdate},this.getMrtbByDateCallBack,this,false); 
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
</style>
<style>
.mrtbjqadd-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left: 387px;
  width: 1500px !important;
}
.mrtbxsadd-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left: 387px;
  width: 1500px !important;
}
.mrtbadd-panel .ivu-modal .ivu-modal-content{
  top:82px;
  left: 387px;
  width: 750px !important;
}
</style>
