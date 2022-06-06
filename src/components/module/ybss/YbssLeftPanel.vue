<template>
  <div class="ybss_leftpenel">
       <div class="change_bar" @click="changeTab">切换</div>
       <div class="box_panel" style="height:35%;" v-show="showLayer">
          <div class="header_bg">图层展示</div>
          <div class="content_panel">
              <div style="width:100%;height:100%;padding:10px">
                  <div class="flexr" :class="[barMap.indexOf(1)>-1?'tc_bar_active':'tc_bar']" @click="clickBar(1)">
                      <img src="@/assets/ybss/hsjcd.png"/>
                      <div>核酸检测点</div>
                  </div>
                  <div class="flexr" :class="[barMap.indexOf(9)>-1?'tc_bar_active':'tc_bar']" @click="clickBar(9)">
                      <img src="@/assets/ybss/hsjcd.png"/>
                      <div>核酸检测医院</div>
                  </div>
                  <div class="flexr" :class="[barMap.indexOf(2)>-1?'tc_bar_active':'tc_bar']" @click="clickBar(2)">
                      <img src="@/assets/ybss/syry.png"/>
                      <div>涉疫人员分布</div>
                  </div>
                  <div class="flexr" :class="[barMap.indexOf(3)>-1?'tc_bar_active':'tc_bar']" @click="clickBar(3)">
                      <img src="@/assets/ybss/jlfbtc.png"/>
                      <div>转运车分布&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  </div>
                  <div class="flexr" :class="[barMap.indexOf(10)>-1?'tc_bar_active':'tc_bar']" @click="clickBar(10)">
                      <img src="@/assets/ybss/wst.png"/>
                      <div>五色图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  </div>
                  <div class="flexr" :class="[barMap.indexOf(4)>-1?'tc_bar_active':'tc_bar']" @click="clickBar(4)">
                      <img src="@/assets/ybss/lk.png"/>
                      <div>路&nbsp;&nbsp;&nbsp;&nbsp;况&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  </div>
                  <!-- <div class="flexr" :class="[barMap.indexOf(5)>-1?'tc_bar_active':'tc_bar']" @click="clickBar(5)">
                      <img src="@/assets/ybss/xq.png"/>
                      <div>辖&nbsp;&nbsp;&nbsp;&nbsp;区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  </div> -->
                  <div class="flexr" :class="[barMap.indexOf(11)>-1?'tc_bar_active':'tc_bar']" @click="clickBar(11)">
                      <img src="@/assets/ybss/xq.png"/>
                      <div>县域封控圈</div>
                  </div>
                  <div class="flexr" :class="[barMap.indexOf(12)>-1?'tc_bar_active':'tc_bar']" @click="clickBar(12)">
                      <img src="@/assets/ybss/xq.png"/>
                      <div>城区封控圈</div>
                  </div>
                  <div class="flexr" :class="[barMap.indexOf(13)>-1?'tc_bar_active':'tc_bar']" @click="clickBar(13)">
                      <img src="@/assets/ybss/xq.png"/>
                      <div>境内外隔离点</div>
                  </div>

              </div>
          </div>
       </div>
       <div class="box_panel" style="height:24%;" v-show="showLayer">
          <div class="header_bg">三区图</div>
          <div class="content_panel">
              <div style="width:100%;height:100%;padding:10px;position: relative;">
                  <div class="flexr" :class="[barMap.indexOf(7)>-1?'sqt_tc_bar_active':'sqt_tc_bar']" @click="clickBar(7)">
                      <img src="@/assets/ybss/fengkq.png"/>
                      <div>&nbsp;&nbsp;封控区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  </div>
                  <div class="flexr" :class="[barMap.indexOf(8)>-1?'sqt_tc_bar_active':'sqt_tc_bar']" @click="clickBar(8)">
                      <img src="@/assets/ybss/guankq.png"/>
                      <div>&nbsp;&nbsp;管控区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  </div>
                  <div class="flexr" :class="[barMap.indexOf(6)>-1?'sqt_tc_bar_active':'sqt_tc_bar']" @click="clickBar(6)">
                      <img src="@/assets/ybss/fangkq.png"/>
                      <div>&nbsp;&nbsp;防控区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  </div>
                  <div class="flexr" style="position: absolute;top: 25px;left: 150px;">
                        <Button type="primary" size="small" @click="drawFq('fengkq')">划区域</Button>
                        <!-- <div style="color:#b6f6ff;margin-left:10px;">
                            颜色选择:
                            <ColorPicker v-model="addColor"/>
                        </div> -->
                  </div>
                  <div class="flexr" style="position: absolute;top: 70px;left: 150px;">
                        <Button type="primary" size="small" @click="drawFq('guankq')">划区域</Button>
                        <!-- <div style="color:#b6f6ff;margin-left:10px;">
                            颜色选择:
                            <ColorPicker v-model="addColor"/>
                        </div> -->
                  </div>
                  <div class="flexr" style="position: absolute;top: 115px;left: 150px;">
                        <Button type="primary" size="small" @click="drawFq('fangkq')">划区域</Button>
                        <!-- <div style="color:#b6f6ff;margin-left:10px;">
                            颜色选择:
                            <ColorPicker v-model="addColor"/>
                        </div> -->
                  </div>
              </div>
          </div>
       </div>
       <div class="box_panel" style="height:41%;" v-show="showLayer">
           <div class="change_bar" @click="closeSyry">添加</div>
          <div class="header_bg">涉疫人员</div>
          <div class="content_panel" style="overflow-y: auto;">
              <div class="flexr syryItem" v-for="(item,index) in syrylist" :key="index" @click="clickSyryButton(item)" style="border: 1px solid #67a8e4;border-radius: 10px;margin: 5px;height:52px;">
                    <div style="width: 20%;text-align: center;">
                        <img v-show="item.sylx=='1'" src="@/assets/ybss/syry_qz.png"/>
                        <img v-show="item.sylx=='2'" src="@/assets/ybss/syry_mj.png"/>
                        <img v-show="item.sylx!='1'&&item.sylx!='2'" src="@/assets/ybss/syry_cmj.png"/>
                    </div>
                    <div style="width: 15%;">
                        <div>{{item.xm}}</div>
                        <div style="color: #f3e41a;">{{item.xb=='1'?'男':'女'}}</div>
                    </div>
                    <div style="width: 40%;">
                        <div>{{item.sfzh.replace(/^(.{6})(?:\w+)(.{4})$/, "\$1********\$2")}}</div>
                        <div>{{item.lxdh.replace(/^(.{4})(?:\w+)(.{4})$/, "\$1***\$2")}}</div>
                    </div>
                    <div  class="syry_del" style="width: 5%;" @click="delSyry(item.sfzh)"> 
                        <img  src="@/assets/ybss/syry_del.png"/>
                    </div>
                    <div class="flexr" style="width: 30%;">
                        <div :class="[item.sylx=='1'?'red_line':item.sylx=='2'?'orange_line':'green_line']"></div>
                        <div>{{item.sylx=='1'?'确诊':item.sylx=='2'?'密接':'次密接'}}</div>
                    </div>
               </div>
          </div>
       </div>
       <div class="box_panel" style="height: 53%;" v-show="!showLayer">
          <div class="header_bg">资源分布</div>
          <div class="content_panel">
              <div class="flexr" style="border: 1px solid #67a8e4;border-radius: 10px;margin: 5px;height:52px;">
                <div style="width: 20%;text-align: center;">
                    <img src="@/assets/ybss/ldz.png"/>
                </div>
                <div style="width: 25%;">
                    <div>流调组人数</div>
                    <div style="color: #f3e41a;">{{leftData.ldzrs}}</div>
                </div>
                <div style="width: 30%;">
                    <div>流调能力</div>
                    <div>{{leftData.ldznl}}人/24小时</div>
                </div>
                <div class="flexr" style="width: 30%;">
                    <div   :class="[leftData.ldzstate=='预警'?'red_line':leftData.ldzstate=='紧张'?'orange_line':'green_line']" ></div>
                    <div>{{leftData.ldzstate}}</div>
                </div>
              </div>
              <div class="flexr" style="border: 1px solid #67a8e4;border-radius: 10px;margin: 5px;height:52px;">
                <div style="width: 20%;text-align: center;">
                    <img src="@/assets/ybss/zycl.png"/>
                </div>
                <div style="width: 25%;">
                    <div>转运车辆数</div>
                    <div style="color: #f3e41a;">{{leftData.zycls}}</div>
                </div>
                <div style="width: 30%;">
                    <div>转运能力</div>
                    <div>{{leftData.zynl}}人/24小时</div>
                </div>
                <div class="flexr" style="width: 30%;">
                    <div :class="[leftData.zystate=='预警'?'red_line':leftData.zystate=='紧张'?'orange_line':'green_line']"></div>
                    <div>{{leftData.zystate}}</div>
                </div>
              </div>
              <div class="flexr" style="border: 1px solid #67a8e4;border-radius: 10px;margin: 5px;height:52px;">
                <div style="width: 20%;text-align: center;">
                    <img src="@/assets/ybss/yys.png"/>
                </div>
                <div style="width: 25%;">
                    <div>核酸检测医院数</div>
                    <div style="color: #f3e41a;">{{leftData.yys}}</div>
                </div>
                <div style="width: 30%;">
                    <div>核酸检测能力</div>
                    <div>{{leftData.yynl}}人/24小时</div>
                </div>
                <div class="flexr" style="width: 30%;">
                    <div :class="[leftData.yystate=='预警'?'red_line':leftData.yystate=='紧张'?'orange_line':'green_line']"></div>
                    <div>{{leftData.yystate}}</div>
                </div>
              </div>
              <div class="flexr" style="border: 1px solid #67a8e4;border-radius: 10px;margin: 5px;height:52px;">
                <div style="width: 20%;text-align: center;">
                    <img src="@/assets/ybss/hsjc.png"/>
                </div>
                <div style="width: 25%;">
                    <div>核酸采集点数</div>
                    <div style="color: #f3e41a;">{{leftData.hscjds}}</div>
                </div>
                <div style="width: 30%;">
                    <div>核酸检测能力</div>
                    <div>{{leftData.hscjdnl}}人/24小时</div>
                </div>
                <div class="flexr" style="width: 30%;">
                    <div :class="[leftData.hscjdstate=='预警'?'red_line':leftData.hscjdstate=='紧张'?'orange_line':'green_line']"></div>
                    <div>{{leftData.hscjdstate}}</div>
                </div>
              </div>
              <div class="flexr" style="border: 1px solid #67a8e4;border-radius: 10px;margin: 5px;height:52px;">
                <div style="width: 20%;text-align: center;">
                    <img src="@/assets/ybss/cws.png"/>
                </div>
                <div style="width: 25%;">
                    <div>床位数量</div>
                    <div style="color: #f3e41a;">{{leftData.cws}}</div>
                </div>
                <div style="width: 30%;">
                    <div>床位能力</div>
                    <div>余{{leftData.cwnl}}个</div>
                </div>
                <div class="flexr" style="width: 30%;">
                    <div :class="[leftData.cwstate=='预警'?'red_line':leftData.cwstate=='紧张'?'orange_line':'green_line']"></div>
                    <div>{{leftData.cwstate}}</div>
                </div>
              </div>
              <div class="flexr" style="border: 1px solid #67a8e4;border-radius: 10px;margin: 5px;height:52px;">
                <div style="width: 20%;text-align: center;">
                    <img src="@/assets/ybss/jxy.png"/>
                </div>
                <div style="width: 25%;">
                    <div>接线员数量</div>
                    <div style="color: #f3e41a;">{{leftData.jxys}}</div>
                </div>
                <div style="width: 30%;">
                    <div>接线能力</div>
                    <div>{{leftData.jxynl}}次/24小时</div>
                </div>
                <div class="flexr" style="width: 30%;">
                    <div :class="[leftData.jxystate=='预警'?'red_line':leftData.jxystate=='紧张'?'orange_line':'green_line']"></div>
                    <div>{{leftData.jxystate}}</div>
                </div>
              </div>
              <div class="flexr" style="border: 1px solid #67a8e4;border-radius: 10px;margin: 5px;height:52px;">
                <div style="width: 20%;text-align: center;">
                    <img src="@/assets/ybss/jyxc.png"/>
                </div>
                <div style="width: 25%;">
                    <div>局域协查人数</div>
                    <div style="color: #f3e41a;">{{leftData.jyxcrs}}</div>
                </div>
                <div style="width: 30%;">
                    <div>协查能力</div>
                    <div>{{leftData.jyxcnl}}人/24小时</div>
                </div>
                <div class="flexr" style="width: 30%;">
                    <div :class="[leftData.jyxcstate=='预警'?'red_line':leftData.jyxcstate=='紧张'?'orange_line':'green_line']"></div>
                    <div>{{leftData.jyxcstate}}</div>
                </div>
              </div>
          </div>
       </div>
       <div class="box_panel" style="height: 47%;" v-show="!showLayer">
          <div class="header_bg">五快分析</div>
          <div class="content_panel">
              <div class="flexc" style="width:100%;margin: 10px;height:60px;">
                <div class="flexr" style="height: 50%;">
                    <div style="width: 150px;">快检测</div>
                    <div style="width: 190px;">{{leftData.kjcnla}}/{{leftData.kjcnlb}}人</div>
                </div>
                <div class="flexr" style="height: 50%;">
                    <div class="jc_line">
                        <div class="jc_in_line"  :style="{width:leftData.kjcnla/leftData.kjcnlb*290+'px'}"></div>
                    </div>
                    <div style="width: 50px;">{{toPercent(leftData.kjcnla,leftData.kjcnlb)}}</div>
                </div>
              </div>
              <div class="flexc" style="width:100%;margin: 10px;height:60px;">
                <div class="flexr" style="height: 50%;">
                    <div style="width: 150px;">快流调</div>
                    <div style="width: 190px;">{{leftData.kldnla}}/{{leftData.kldnlb}}人</div>
                </div>
                <div class="flexr" style="height: 50%;">
                    <div class="jc_line">
                        <div class="jc_in_line" :style="{width:leftData.kldnla/leftData.kldnlb*290+'px'}"></div>
                    </div>
                    <div style="width: 50px;">{{toPercent(leftData.kldnla,leftData.kldnlb)}}</div>
                </div>
              </div>
              <div class="flexc" style="width:100%;margin: 10px;height:60px;">
                <div class="flexr" style="height: 50%;">
                    <div style="width: 150px;">快编组</div>
                    <div style="width: 190px;">{{leftData.kbznla}}/{{leftData.kbznlb}}人</div>
                </div>
                <div class="flexr" style="height: 50%;">
                    <div class="jc_line">
                        <div class="jc_in_line" :style="{width:leftData.kbznla/leftData.kbznlb*290+'px'}"></div>
                    </div>
                    <div style="width: 50px;">{{toPercent(leftData.kbznla,leftData.kbznlb)}}</div>
                </div>
              </div>
              <div class="flexc" style="width:100%;margin: 10px;height:60px;">
                <div class="flexr" style="height: 50%;">
                    <div style="width: 150px;">快转运</div>
                    <div style="width: 190px;">{{leftData.kzynla}}/{{leftData.kzynlb}}人</div>
                </div>
                <div class="flexr" style="height: 50%;">
                    <div class="jc_line">
                        <div class="jc_in_line" :style="{width:leftData.kzynla/leftData.kzynlb*290+'px'}"></div>
                    </div>
                    <div style="width: 50px;">{{toPercent(leftData.kzynla,leftData.kzynlb)}}</div>
                </div>
              </div>
              <div class="flexc" style="width:100%;margin: 10px;height:60px;">
                <div class="flexr" style="height: 50%;">
                    <div style="width: 150px;">快隔离</div>
                    <div style="width: 190px;">{{leftData.kglnla}}/{{leftData.kglnlb}}人</div>
                </div>
                <div class="flexr" style="height: 50%;">
                    <div class="jc_line">
                        <div class="jc_in_line" :style="{width:leftData.kglnla/leftData.kglnlb*290+'px'}"></div>
                    </div>
                    <div style="width: 50px;">{{toPercent(leftData.kglnla,leftData.kglnlb)}}</div>
                </div>
              </div>
          </div>
       </div>
       <div class="syryadd_panel" v-show="showAddSyry">
            <div class="header_div">
               <div class="header_text">添加涉疫人员</div>
               <img src="@/assets/ybss/close.png" style="position: absolute;right: 12px;top: 9px;cursor: pointer;" @click="closeSyry"/>
           </div>
           <div style="position: relative;width:100%;height:calc(100% - 40px);">
               <div class="flexr" style="margin-top:10px;">
                  <div style="color:#fff;width:70px;">身份证号：</div>
                  <div style="color:#fff;width:calc(100% - 205px);"><Input v-model="syry_sfzh"/></div>
                  <Button type="primary" size="small" style="margin-left:15px;" @click="getSfxx">查询</Button>
               </div>
               <div class="flexr" style="margin-top:10px;">
                  <div style="color:#fff;width:70px;">姓名：</div>
                  <div style="color:#fff;width:calc(100% - 150px);"><Input v-model="syry_xm"/></div>
               </div>
               <div class="flexr" style="margin-top:10px;">
                  <div style="color:#fff;width:70px;">联系电话：</div>
                  <div style="color:#fff;width:calc(100% - 150px);"><Input v-model="syry_lxdh"/></div>
               </div>
               <div class="flexr" style="margin-top:10px;">
                  <div style="color:#fff;width:70px;">性别：</div>
                  <div style="color:#fff;width:calc(100% - 150px);">
                      <select class="inputclass" v-model="syry_xb">
                        <option value="1">男</option>
                        <option value="2">女</option>
                      </select>
                  </div>
               </div>
               <div class="flexr" style="margin-top:10px;">
                  <div style="color:#fff;width:70px;">涉疫类型：</div>
                  <div style="color:#fff;width:calc(100% - 150px);">
                      <select class="inputclass" v-model="syry_sylx" @change="getSyryByType">
                        <option value="1">确诊病例</option>
                        <option value="2">密接者</option>
                        <option value="3">次密接者</option>
                      </select>
                  </div>
               </div>
               <div class="flexr" style="margin-top:10px;" v-show="this.syry_sylx=='2'||this.syry_sylx=='3'">
                  <div style="color:#fff;width:70px;">{{this.syry_sylx=="2"?"确诊人员：":this.syry_sylx=="3"?"密接者：":""}}</div>
                  <div style="color:#fff;width:calc(100% - 150px);">
                      <select class="inputclass" v-model="syry_rel" @change="setSyryrel">
                        <option value="">无法确定</option>
                        <option v-for="obj in syryListForSelect" :key="obj.sfzh" :value="obj.sfzh+','+obj.xm">{{obj.xm}}</option>
                      </select>
                  </div>
               </div>
               <div class="flexr" style="margin-top:10px;">
                  <div style="color:#fff;width:70px;">地址名称：</div>
                  <div style="color:#fff;width:calc(100% - 150px);">
                      <el-select style="width: 100%;" v-model="syry_dzmc" @change="changeDz"  filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="searchDz">
                            <el-option v-for="item in dzlist" :key="item.roomcode" :label="item.dz" :value="item.roomcode"></el-option> 
                      </el-select>
                  </div>
               </div>
               <div class="flexr" style="margin-top:10px;">
                  <Button type="warning" @click="closeSyry">取消</Button>
                  <Button type="primary" style="margin-left:15px;" @click="addSyry">新增</Button>
               </div>
           </div>
       </div>
       <div class="wsttlpanel" v-show="isShowWstTl" >
           <div style="display:flex;width:100%;height:24px;line-height:24px;margin-top:8px;"><div style="width:16px;height:16px;margin:4px 4px 0 10px;background-color:rgba(0,255,0,0.5);"></div>&nbsp;&nbsp;累计确诊0例</div>
           <div style="display:flex;width:100%;height:24px;line-height:24px;"><div style="width:16px;height:16px;margin:4px 4px 0 10px;background-color:rgba(30,144,255,0.5);"></div>&nbsp;&nbsp;累计确诊1例</div>
           <div style="display:flex;width:100%;height:24px;line-height:24px;"><div style="width:16px;height:16px;margin:4px 4px 0 10px;background-color:rgba(255,255,0,0.5);"></div>&nbsp;&nbsp;累计确诊2-3例</div>
           <div style="display:flex;width:100%;height:24px;line-height:24px;"><div style="width:16px;height:16px;margin:4px 4px 0 10px;background-color:rgba(255,165,0,0.5);"></div>&nbsp;&nbsp;累计确诊4-9例</div>
           <div style="display:flex;width:100%;height:24px;line-height:24px;"><div style="width:16px;height:16px;margin:4px 4px 0 10px;background-color:rgba(255,0,0,0.5);"></div>&nbsp;&nbsp;累计确诊10例以上</div>
       </div>
       <div style="position: absolute;top: 315px;left: 400px;">
            <div class="fkqtjpanel" v-show="barMap.indexOf(7)>-1">
                <div style="background: #d87e61;">封控区</div>
                <div>地址数：{{fengcount}}</div>
                <div>总人数：{{fengckcount+fengzkcount+fengrhflcount+fengldrhflcount}}</div>
                <div>常住人口：{{fengckcount}}</div>
                <div>暂住人口：{{fengzkcount}}</div>
                <div>人户分离：{{fengrhflcount}}</div>
                <div>流动人户分离：{{fengldrhflcount}}</div>
            </div>
            <div class="fkqtjpanel" v-show="barMap.indexOf(8)>-1">
                <div style="background: #fab352;">管控区</div>
                <div>地址数：{{guancount}}</div>
                <div>总人数：{{guanckcount+guanzkcount+guanrhflcount+guanldrhflcount}}</div>
                <div>常住人口：{{guanckcount}}</div>
                <div>暂住人口：{{guanzkcount}}</div>
                <div>人户分离：{{guanrhflcount}}</div>
                <div>流动人户分离：{{guanldrhflcount}}</div>
            </div>
            <div class="fkqtjpanel" v-show="barMap.indexOf(6)>-1">
                <div style="background: #61e8f5;">防控区</div>
                <div>地址数：{{fangcount}}</div>
                <div>总人数：{{fangckcount+fangzkcount+fangrhflcount+fangldrhflcount}}</div>
                <div>常住人口：{{fangckcount}}</div>
                <div>暂住人口：{{fangzkcount}}</div>
                <div>人户分离：{{fangrhflcount}}</div>
                <div>流动人户分离：{{fangldrhflcount}}</div>
            </div>
       </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import YbssFqMap from '@/components/module/ybss/YbssFqMap'

import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import map3DUtil from '@/components/map/js/map3DUtil'
import LayerMapDetail from '@/components/module/dztc/LayerMapDetail'

export default {
    name: 'YbssLeftPanel',
    components: {LayerMapDetail},
    props:['isshow'],
    data() {
        return {
            syry_xb:'',
            syry_sfzh:'',
            syry_xm:'',
            syry_lxdh:'',
            syry_dzmc:'',
            syry_sylx:'',
            syry_roomcode:'',
            syry_dzsx:'',
            syry_xpos:'',
            syry_ypos:'',
            syry_xzjddm:'',
            syry_rel:'',
            syry_relsfzh:'',
            syry_relxm:'',
            syrylist:[],
            syryListForSelect:[],
            dzlist:[],
            dzMap:{},

            showAddSyry:false,
            addColor:"#1559A0",
            showLayer: false,
            barMap:[],
            leftData:{
                // ldzrs:"64",
                // ldznl:"64",
                // ldzstate:"预警",

                // zycls:"10",
                // zynl:"500",
                // zystate:"紧张",

                // yys:"3",
                // yynl:"50000",
                // yystate:"正常",

                // hscjds:"2",
                // hscjdnl:"7200",
                // hscjdstate:"正常",

                // cws:"1342",
                // cwnl:"742",
                // cwstate:"正常",

                // jxys:"12",
                // jxynl:"600",
                // jxystate:"正常",

                // jyxcrs:"23",
                // jyxcnl:"2300",
                // jyxcstate:"正常",

                // kjcnla:"3000",
                // kjcnlb:"5000",

                // kldnla:"1",
                // kldnlb:"3",

                // kbznla:"30",
                // kbznlb:"40",

                // kzynla:"20",
                // kzynlb:"25",

                // kglnla:"10",
                // kglnlb:"25",
            },
            hsjcdlayername:"",//核酸监测点图层名称
            hsjcyylayername:"",//核酸监测点图层名称
            xyfkqlayername:"",//县封控圈图层名称
            chengqufkqlayername:"",//城区封控圈图层名称
            jngldlayername:"",//境内隔离点图层名称
            jwgldlayername:"",//境外隔离点图层名称
            isShowWstTl:false,

            fkqtype:'',
            fengcount:0,
            fengckcount:0,
            fengzkcount:0,
            fengrhflcount:0,
            fengldrhflcount:0,

            guancount:0,
            guanckcount:0,
            guanzkcount:0,
            guanrhflcount:0,
            guanldrhflcount:0,

            fangcount:0,
            fangckcount:0,
            fangzkcount:0,
            fangrhflcount:0,
            fangldrhflcount:0,
        }
    },
    computed: mapState({
        userInfo: state => state.userInfo,
        currentMapType:state => state.currentMapType,
    }),
    methods:{
        clickBar(barindex){
            var index = this.barMap.indexOf(barindex);
            if(index>-1){
                this.barMap.splice(index,1);
                if(barindex==1){
                    markUtil.clearLayer(this.hsjcdlayername,this);
                    this.map.map.infoWindow.hide();
                }
                if(barindex==2){
                    markUtil.clearLayer("syryLayer",this);
                    this.map.map.infoWindow.hide();
                }
                if(barindex==3){
                }
                if(barindex==6){
                    markUtil.clearLayer("fangkq",this);
                    this.map.map.infoWindow.hide();
                }
                if(barindex==7){
                   markUtil.clearLayer("fengkq",this);
                   this.map.map.infoWindow.hide();
                }
                if(barindex==8){
                   markUtil.clearLayer("guankq",this);
                   this.map.map.infoWindow.hide();
                }
                if(barindex==9){
                   markUtil.clearLayer(this.hsjcyylayername,this);
                   this.map.map.infoWindow.hide();
                }
                if(barindex==10){
                   markUtil.clearLayer("wstLayer",this);
                   this.map.map.infoWindow.hide();
                   this.isShowWstTl=false;
                }
                if(barindex==11){
                   markUtil.clearLayer(this.xyfkqlayername,this);
                   this.map.map.infoWindow.hide();
                }
                if(barindex==12){
                   markUtil.clearLayer(this.chengqufkqlayername,this);
                   this.map.map.infoWindow.hide();
                }
                if(barindex==13){
                   markUtil.clearLayer(this.jngldlayername,this);
                   markUtil.clearLayer(this.jwgldlayername,this);
                   this.map.map.infoWindow.hide();
                }
            }else{
                this.barMap.push(barindex);
                if(barindex==1){
                  this.getHsjcd();
                }
                if(barindex==2){
                  this.getSyryMap();
                }
                if(barindex==6){
                  this.getFkq('fangkq');
                }
                if(barindex==7){
                  this.getFkq('fengkq');
                }
                if(barindex==8){
                  this.getFkq('guankq');
                }
                if(barindex==9){
                  this.getHsjjyy();
                }
                if(barindex==10){
                  this.getWst();
                  this.isShowWstTl=true;
                }
                if(barindex==11){
                  this.getXyfkq();
                }
                if(barindex==12){
                  this.getCqfkq();
                }
                if(barindex==13){
                  this.getJnwGld();
                }
            }
            if(barindex==3){
               this.$emit("handler", "mapEvent", "zyc");
            }
            if(barindex==4){
               this.$emit("handler", "mapEvent", "lk");
            }
            if(barindex==5){
               markUtil.moveMapAndLevel(120.8834,30.5374,8,this);
               this.$emit("handler", "mapEvent", "xq");
            }
        },
        changeTab(){
            this.showLayer = !this.showLayer;
        },
        drawFq(qycode){
            if(qycode=='fengkq'){
               this.addColor = '#ff0000';
            }
            if(qycode=='guankq'){
               this.addColor = '#ffff00';
            }
            if(qycode=='fangkq'){
               this.addColor = '#1e90ff';
            }
            if(this.addColor==""){
                this.$Message.error("请选择区域面的颜色");
                return;
            }
            var c = this.common.color16ToRGB(this.addColor);
            var cs = c.split(",");
            var linecolor="rgb("+cs[0]+","+cs[1]+","+cs[2]+")";
            var polygoncolor="rgba("+cs[0]+","+cs[1]+","+cs[2]+",0.5)";
            var param = {};
            param.qycode = qycode;
            param.linecolor = linecolor;
            param.polygoncolor = polygoncolor;
            var templateobj =  new Object();
            templateobj.type = "fkqtc";
            var detailHandler = this.fqDetailHandler;
            var Profile = Vue.extend({
            template: '<YbssFqMap :data="data" @handler="fqDetailHandler"/>',
            components: {YbssFqMap},
            data: function () {
                return {
                data:param
                }
            },
            methods:{
                fqDetailHandler(data,state){
                  detailHandler(data,state);
                }
            }
            })
            templateobj.cp = new Profile();
            markUtil.drawAndEit("tempLayer",linecolor,polygoncolor,templateobj,this);
        },
        fqDetailHandler(data,state){
            if(state=="edit"){
                this.editData = data;
                this.editColor = this.common.colorRGBto16(data.linecolor)
            }else if(state=="save"){
                this.getFkq(data.qycode);
            }else if(state=="close"){

            }else if(state=="delete"){
                this.getFkq(data.qycode);
            }
        },
        getFkq(qycode){
           this.fkqtype = qycode;
           this.http.post("/ybss/getFqById",{qycode:qycode},this.getFqByIdCallBack,this,false);
        },
        getFqByIdCallBack(result){
            if(this.fkqtype=='fengkq'){
               this.fengcount = result.count;
               this.fengckcount = result.ckcount;
               this.fengzkcount = result.zkcount;
               this.fengrhflcount = result.rhflcount;
               this.fengldrhflcount = result.ldrhflcount;
            }
            if(this.fkqtype=='guankq'){
               this.guancount = result.count;
               this.guanckcount = result.ckcount;
               this.guanzkcount = result.zkcount;
               this.guanrhflcount = result.rhflcount;
               this.guanldrhflcount = result.ldrhflcount;
            }
            if(this.fkqtype=='fangkq'){
               this.fangcount = result.count;
               this.fangckcount = result.ckcount;
               this.fangzkcount = result.zkcount;
               this.fangrhflcount = result.rhflcount;
               this.fangldrhflcount = result.ldrhflcount;
            }
            var data = result.marklist;
            for(var i=0;i<data.length;i++){
                var param = {};
                param.markid = data[i].markid;
                param.qycode = data[i].qycode;
                param.qyname = data[i].markname;
                param.linecolor = data[i].linecolor;
                param.polygoncolor = data[i].polygoncolor;
                var detailHandler = this.fqDetailHandler;
                var Profile = Vue.extend({
                    template: '<YbssFqMap :data="data" @handler="fqDetailHandler"/>',
                    components: {YbssFqMap},
                    data: function () {
                        return {
                            data:param
                        }
                        },
                        methods:{
                            fqDetailHandler(data,state){
                                detailHandler(data,state);
                            }
                        }
                });
                data[i].cp = new Profile();
                data[i].type = "fkqtc";
                markUtil.addPolygonMark(data[i].qycode,data[i],this);
            }
        },
        getHsjcd(){
            this.http.get("/tczy/getMarks",{"layerid":"E4EFE5C15E92417E9812D2374548DA31","name":""},this.getHsjcdCallBack,this,false); 
        },
        getHsjcdCallBack(data){
            var layerid = data.templateObj.layerid;
            var groupmodule = data.groupmodule;
            this.hsjcdlayername="dztc"+groupmodule+layerid+"Layer";
            this.getDztcCallBack(data);
        },
        getHsjjyy(){
             this.http.get("/tczy/getMarks",{"layerid":"AF37AECBD43F49F59E1918BE864378A2","name":""},this.getHsjjyyCallBack,this,false); 
        },
        getHsjjyyCallBack(data){
            var layerid = data.templateObj.layerid;
            var groupmodule = data.groupmodule;
            this.hsjcyylayername="dztc"+groupmodule+layerid+"Layer";
            this.getDztcCallBack(data);
        },
        getXyfkq(){
             this.http.get("/tczy/getMarks",{"layerid":"2A8B8ABCEC2B4EBD97100DFADE9278DA","name":""},this.getXyfkqCallBack,this,false);
        },
        getXyfkqCallBack(data){
            var layerid = data.templateObj.layerid;
            var groupmodule = data.groupmodule;
            this.xyfkqlayername="dztc"+groupmodule+layerid+"Layer";
            this.getDztcCallBack(data); 
        },
        getCqfkq(){
            this.http.get("/tczy/getMarks",{"layerid":"A1BE572995A44ABBB5C7E7B2E8549EB2","name":""},this.getCqfkqCallBack,this,false);
        },
        getCqfkqCallBack(data){
            var layerid = data.templateObj.layerid;
            var groupmodule = data.groupmodule;
            this.chengqufkqlayername="dztc"+groupmodule+layerid+"Layer";
            this.getDztcCallBack(data); 
        },
        getJnwGld(){
            //境内
            this.http.get("/tczy/getMarks",{"layerid":"D63CFE73300949B4838B46B2EF8B114E","name":""},this.getJwGldCallBack,this,false);
            //境外
            this.http.get("/tczy/getMarks",{"layerid":"AD78C7C22491497E8D24751737123E29","name":""},this.getJnGldCallBack,this,false);
        },
        getJwGldCallBack(data){
            var layerid = data.templateObj.layerid;
            var groupmodule = data.groupmodule;
            this.jwgldlayername="dztc"+groupmodule+layerid+"Layer";
            this.getDztcCallBack(data); 
        },
        getJnGldCallBack(data){
            var layerid = data.templateObj.layerid;
            var groupmodule = data.groupmodule;
            this.jngldlayername="dztc"+groupmodule+layerid+"Layer";
            this.getDztcCallBack(data); 
        },
        getDztcCallBack(data){
        var layerid = data.templateObj.layerid;
        var groupmodule = data.groupmodule;
        markUtil.clearLayer("dztc"+groupmodule+layerid+"Layer",this);
        for(var i=0;i<data.markList.length;i++){
            var markObj = data.markList[i];
            var attributes =  new Object();
            attributes.type = "dztc";
            var Profile = Vue.extend({
            template: '<LayerMapDetail :templateObj="templateObj" :markObj="markObj"/>',
            components: {LayerMapDetail},
            data: function () {
                return {
                    templateObj:data.templateObj,
                    markObj:markObj
                }
            },
            methods:{
            }
            })
            attributes.cp = new Profile();
            //设置打在地图上的图片的大小
            attributes.size_x = data.templateObj.sizex;
			attributes.size_y = data.templateObj.sizey;
            markUtil.addDztcLayerMark("dztc"+groupmodule+layerid+"Layer",data.templateObj,markObj,attributes,this);
            }
        },
        closeSyry(){
           this.showAddSyry = !this.showAddSyry;
        },
        changeDz(code){
           var dzObj = this.dzMap[code];
           this.syry_dzsx = dzObj.dzsx;
           this.syry_dzmc = dzObj.dz;
           this.syry_xpos = dzObj.xpos;
           this.syry_ypos = dzObj.ypos;
           this.syry_xzjddm = dzObj.xzjddm;
           this.syry_roomcode = dzObj.roomcode;
        },
        searchDz(name){
          var paramObj = {};
          paramObj.name = name;
          this.http.get("/ybss/getDzByName",paramObj,this.getDzByNameCallBack,this,false);
        },
        getDzByNameCallBack(data){
           this.dzlist = data;
           for(var i in data){
              this.dzMap[data[i].roomcode] = data[i];
           }
        },
        getSfxx(){
          if(this.syry_sfzh=="" || this.syry_sfzh==null){
            this.$Message.error("身份证号不能为空");
            return;
          }
          var idname = /^\d{15}(\d\d[0-9xX])?$/;
          if(!idname.test(this.syry_sfzh)){
            this.$Message.error("身份证号不符合标准");
            return;
          }
          var paramObj = {};
          paramObj.idnumber = this.syry_sfzh;
          this.http.get("/ybss/getRyDetailByIdnumber",paramObj,this.getRyDetailByIdnumberCallBack,this,false);
        },
        getRyDetailByIdnumberCallBack(data){
            this.syry_xb = data.xb;
            this.syry_sfzh = data.sfzh;
            this.syry_xm = data.xm;
            this.syry_lxdh = data.dhhm;
            this.syry_dzmc = data.dzmc;
            this.syry_roomcode = data.roomcode;
            this.syry_dzsx = data.dzsx;
            this.syry_xpos = data.xpos;
            this.syry_ypos = data.ypos;
            this.syry_xzjddm = data.xzjddm;
        },
        addSyry(){
          if(this.syry_sfzh=="" || this.syry_sfzh==null){
            this.$Message.error("身份证号不能为空");
            return;
          }
          var idname = /^\d{15}(\d\d[0-9xX])?$/;
          if(!idname.test(this.syry_sfzh)){
            this.$Message.error("身份证号不符合标准");
            return;
          }
          if(this.syry_xm=="" || this.syry_xm==null){
            this.$Message.error("姓名不能为空");
            return;
          }
          if(this.syry_xb=="" || this.syry_xb==null){
            this.$Message.error("性别不能为空");
            return;
          }
          if(this.syry_lxdh=="" || this.syry_lxdh==null){
            this.$Message.error("联系电话不能为空");
            return;
          }
          if(this.syry_dzmc=="" || this.syry_dzmc==null){
            this.$Message.error("地址名称不能为空");
            return;
          }
          if(this.syry_sylx=="" || this.syry_sylx==null){
            this.$Message.error("涉疫类型不能为空");
            return;
          }
          var paramObj = {};
          if(!this.syry_xpos==""){
              paramObj.lx = this.syry_xpos;
          }
          if(!this.syry_ypos==""){
              paramObj.ly = this.syry_ypos;
          }
          paramObj.sfzh = this.syry_sfzh;
          paramObj.xm = this.syry_xm;
          paramObj.xb = this.syry_xb;
          paramObj.lxdh = this.syry_lxdh;
          paramObj.dzmc = this.syry_dzmc;
          paramObj.sylx = this.syry_sylx;
          paramObj.roomcode = this.syry_roomcode;
          paramObj.dzsx = this.syry_dzsx;
          paramObj.sfzh = this.syry_sfzh;
          paramObj.xzjddm = this.syry_xzjddm;
          paramObj.relsfzh=this.syry_relsfzh;
          paramObj.relxm=this.syry_relxm;
          this.http.get("/ybss/addSyry",paramObj,this.addSyryCallBack,this,false);
        },
        addSyryCallBack(data){
            this.syry_xb = "";
            this.syry_sfzh = "";
            this.syry_xm = "";
            this.syry_lxdh = "";
            this.syry_dzmc = "";
            this.syry_roomcode = "";
            this.syry_dzsx = "";
            this.syry_xpos = "";
            this.syry_ypos = "";
            this.syry_rel="",
            this.syry_relsfzh="";
            this.syry_relxm="";
            this.getSyry();
        },
        delSyry(sfzh){
            if(confirm("删除该设疫人员?")){
            var paramObj={};
            paramObj.sfzh=sfzh;
            this.http.get("/ybss/delSyry",paramObj,this.delSyryCallBack,this,false);
            }           
        },
        delSyryCallBack(result){
            this.$Message.success(result);
            this.getSyry();
        },
        getSyry(){
            this.http.get("/ybss/getSyryList",{},this.getSyryListCallBack,this,false);
        },
        getSyryListCallBack(data){
           this.syrylist = data;
        },
        getSyryMap(){
            this.http.get("/ybss/getSyryList",{},this.getSyryMapListCallBack,this,false);
        },
        getSyryMapListCallBack(data){
           yewuMarkUtil.addSyryMarks(data,this,null);
        },
        clickSyryButton(data){
            if(data.loc&&data.loc.x){//地图上显示
                if(this.barMap.indexOf(2)<=-1){
                    this.barMap.push(2);
                    this.getSyryMap();
                    var that=this;
                    setTimeout(function(){
                         markUtil.centerAndShow("syryLayer",data.sfzh,that);
                    },1000);
                }else{
                    markUtil.centerAndShow("syryLayer",data.sfzh,this);
                }
            }else{//没有坐标，不在地图上显示
            
            }
        },
        getWst(){
            this.http.get("/ybss/getXzjd5syj",{},this.getXzjd5syjCallBack,this,false);
        },
        getXzjd5syjCallBack(data){
            for(var i=0;i<data.length;i++){
                if(!data[i].markid){
                  continue;
                }
                var param = {};
                param.markid = data[i].markid;
                param.deptcode = data[i].deptcode;
                param.deptname = data[i].markname;
                param.linecolor = data[i].linecolor;
                param.polygoncolor = data[i].polygoncolor;
                param.isMap = true;
                data[i].type = "wst";
                markUtil.moveMapAndLevel(120.8834,30.5374,8,this);
                markUtil.addPolygonMark("wstLayer",data[i],this);

            }
        },
        toPercent(a,b){
            if(a==0||b==0){
                return '0%';
            }
            var str=Number(a/b*100).toFixed();
            str+="%";
            return str;
        },
        getLeftData(){
          this.http.get("/ybss/getLeftData",null,this.getLeftDataCallBack,this,false);
        },
        getLeftDataCallBack(result){
            this.leftData=result;
        },
        getSyryByType(){
            if(this.syry_sylx=="2"||this.syry_sylx=="3"){
                var paramObj={};
                paramObj.sylx=this.syry_sylx-1;
                this.http.get("/ybss/getSyryListByType",paramObj,this.getSyryListByTypeCallBack,this,false);
            }else{
            }
        },
        getSyryListByTypeCallBack(result){
            this.syryListForSelect=result;
            this.syry_rel="";
        },
        setSyryrel(){
            if(""==this.syry_rel){
            }else{
               var relarr= this.syry_rel.split(",");
               this.syry_relsfzh=relarr[0];
               this.syry_relxm=relarr[1];
            }
        },
    },
    created(){
        this.getSyry();
        this.getLeftData();
    },
    watch : {
      
    }
}
</script>

<style scoped>
.ybss_leftpenel{
    position: absolute;
    width: 385px;
    height: calc(100% - 94px);
    top: 84px;
    left: 5px;
    background: rgba(13,64,108,0.76);
    border: 1px solid #0d406c;
    box-shadow: inset 0px 0px 10px 0px rgba(8, 132, 228, 0.6),0px 0px 17px 0px rgba(8, 132, 228, 0.6);
}
.change_bar{
    position: absolute;
    color: #19e1cc;
    top: 10px;
    right: 20px;
    z-index: 10;
    cursor: pointer;
}
.box_panel{
    position: relative;
    width: 100%;
    height: 50%;
}
.header_bg{
    width: 100%;
    height: 40px;
    color: #dfeef3;
    line-height: 40px;
    padding-left: 40px;
    background:url(./../../../assets/ybss/header.png)  center  no-repeat;
    background-size: 100% 100%;
}
.content_panel{
    width: 100%;
    height: calc(100% - 40px);
    color: #dfeef3;
}
.tc_bar{
    float: left;
    margin: 0 25px;
    width: 126px;
    height: 35px;
    color: #dfeef3;
    border: 1px solid #67a8e4;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
}
.tc_bar_active{
    float: left;
    margin: 0 25px;
    width: 126px;
    height: 35px;
    color: #dfeef3;
    border: 1px solid #67a8e4;
    border-radius: 10px;
    background: #3C84F4;
    box-shadow: 0px 0px 7px 0px #02FCF9;
    margin-top: 10px;
    cursor: pointer;
}
.sqt_tc_bar{
    width: 126px;
    height: 35px;
    color: #dfeef3;
    border: 1px solid #67a8e4;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
}
.sqt_tc_bar_active{
    width: 126px;
    height: 35px;
    color: #dfeef3;
    border: 1px solid #67a8e4;
    border-radius: 10px;
    background: #3C84F4;
    box-shadow: 0px 0px 7px 0px #02FCF9;
    margin-top: 10px;
    cursor: pointer;
}
.red_line{
    width: 56px;
    height: 8px;
    border-radius: 4px;
    margin-right: 5px;
    background: linear-gradient(266deg, #F7765D 0%, #F93A47 99%);
}
.orange_line{
    width: 56px;
    height: 8px;
    border-radius: 4px;
    margin-right: 5px;
    background: linear-gradient(266deg, #FFFFFF 0%, #FFFFFF 0%, #F7E35D 0%, #F9A63A 98%);
}
.green_line{
    width: 56px;
    height: 8px;
    border-radius: 4px;
    margin-right: 5px;
    background: linear-gradient(103deg, #F7E35D 0%, #FFFFFF 0%, #2EEAB7 0%, #70FBE3 98%);
}
.jc_line{
    width: 290px;
    height: 15px;
    border-radius: 10px;
    margin-right: 5px;
    background: #14457d;
}
.jc_in_line{
    width: 250px;
    height: 15px;
    border-radius: 10px;
    margin-right: 5px;
    background: linear-gradient(268deg, #3A99FA 0%, #1068FB 100%);
}
.syryadd_panel{
    position: absolute;
    width: 400px;
    height: 400px;
    top: 72%;
    left: 154%;
    transform: translate(-50%, -50%);
    background: rgba(13,64,108,0.76);
    border: 1px solid #0d406c;
    box-shadow: inset 0px 0px 10px 0px rgba(8, 132, 228, 0.6),0px 0px 17px 0px rgba(8, 132, 228, 0.6);
}
.header_div{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgba(46,153,247,0.54);
}
.header_text{
    position: absolute;
    color: #fff;
    width: calc(100% - 42px);
    height: 26px;
    line-height: 26px;
    padding-left: 10px;
    margin: 7px 3px;
    background: #0f75a9;
    /* border: 1px solid #25a9f4; */
}
.inputclass{
  width: 100%;
  height: 30px;
  outline: none;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
select {
  height:30px;
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
.wsttlpanel{
    width: 160px;
    height: 140px;
    position: absolute;
    top: 160px;
    left: 400px;
    background: rgba(13,64,108,0.76);
    border: 1px solid #0d406c;
    box-shadow: inset 0px 0px 10px 0px rgba(8, 132, 228, 0.6),0px 0px 17px 0px rgba(8, 132, 228, 0.6);
    color: #fff;
}
.fkqtjpanel{
    width: 160px;
    height: 150px;
    margin-top: 5px;
    padding: 5px;
    background: rgba(13,64,108,0.76);
    border: 1px solid #0d406c;
    box-shadow: inset 0px 0px 10px 0px rgba(8, 132, 228, 0.6),0px 0px 17px 0px rgba(8, 132, 228, 0.6);
    color: #fff;
}
.fkqtjpanel div{
   height: 20px;
   line-height: 20px;
   padding-left: 5px;
}
.syryItem{
    cursor: pointer;
}
.syryItem:hover .syry_del{
    display: block;
}
.syryItem .syry_del{
    display: none;
    cursor: pointer;
}
</style>