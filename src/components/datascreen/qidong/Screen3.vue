<template>
  <div class="panel">
      <div class="mapclass">
            <MapCreate :mapid="mapid"/>
            <div class="bjpanel"></div>
            <div class="flexr bj2div"><div class="bjpanel2"></div></div>
            <div class="flexr bj3div"><div class="bjpanel3"></div></div>
            <div class="bg_title">
              <div class="title">
                {{title}}
              </div>
            </div>
      </div>
      <div class="leftpannel">
        <div class="lefttopclass">
            <div class="leftkuang1"></div>
            <div class="leftkuang2"></div>
            <div class="rightkuang1"></div>
            <div class="rightkuang2"></div>
            <div class="flexr titlepanel">
                <div class="titlediv flexr">
                  <!-- <div class="lefttitlekuang1"></div>
                  <div class="lefttitlekuang2"></div>
                  <div class="righttitlekuang1"></div>
                  <div class="righttitlekuang2"></div> -->
                  【勤务安保】
                </div>
                <img src="./../../../assets/datascreen/qidong/new/icon_more.png" class="optionIcon" style="width:18px;height:17px" @click="showQwabModal"/>
                <!-- <Icon custom="iconfont icontiaojian" class="optionIcon" @click="showQwabModal"/> -->
            </div>
            <div class="flexr">
                <div style="width:130px;border-right:2px solid black;">
                    <div style="font-size:12px;" class="border_box"><span style="color:white;padding: 6px 6px;">总值班:</span><span style="color:#02FFF1;padding: 6px 3px;">{{qwabObj.sjld}}</span></div>
                    <div style="font-size:12px;margin-top:5px;" class="border_box"><span style="color:white;padding: 6px 6px;">主班领导:</span><span style="color:#02FFF1;padding: 6px 3px;">{{qwabObj.zbz}}</span></div>
                    <div style="font-size:12px;margin-top:5px;" class="border_box"><span style="color:white;padding: 6px 6px;">副班领导:</span><span style="color:#02FFF1;padding: 6px 3px;">{{qwabObj.zzb}}</span></div>
                    <div style="font-size:12px;margin-top:5px;" class="border_box"><span style="color:white;padding: 6px 6px;">指挥长:</span><span style="color:#02FFF1;padding: 6px 3px;">{{qwabObj.jjzhz}}</span></div>
                    <div style="font-size:12px;margin-top:5px;" class="border_box"><span style="color:white;padding: 6px 6px;">交警指挥长:</span><span style="color:#02FFF1;padding: 6px 3px;">{{qwabObj.fzb}}</span></div>
                </div>
                <div style="width:calc(100% - 125px);margin-left:5px;" class="flexc">
                    <div style="width:100%;height:62px;" class="flexc">
                        <div style="color:#02FFF1;font-size:30px;" class="numberFomat">9:00-18:00</div>
                        <div style="color:#02FFF1;font-size:24px;">二级勤务</div>
                    </div>
                    <div style="width:100%;height:95px;margin-top: 15px;" class="flexr">
                        <div style="height:90px;width:58px;position: relative;overflow:hidden;" class="flexc jlbg">
                            <!-- <div class="jiaobiao"></div> -->
                            <div style="color:#02FFF1;font-size:24px;font-family: Digitalt;">{{qwabObj.cj}}</div>
                            <div style="color:white;font-size:12px;position: relative;top: 14px;">出警</div>
                        </div>
                        <div style="margin-left:5px;height:90px;width:58px;position: relative;overflow:hidden;" class="flexc jlbg">
                            <!-- <div class="jiaobiao"></div> -->
                            <div style="color:#02FFF1;font-size:24px;font-family: Digitalt;">{{qwabObj.zb}}</div>
                            <div style="color:white;font-size:12px;position: relative;top: 14px;">值班</div>
                        </div>
                        <div style="margin-left:5px;height:90px;width:58px;position: relative;overflow:hidden;" class="flexc jlbg">
                            <!-- <div class="jiaobiao"></div> -->
                            <div style="color:#02FFF1;font-size:24px;font-family: Digitalt;">{{qwabObj.bq}}</div>
                            <div style="color:white;font-size:12px;position: relative;top: 14px;">备勤</div>
                        </div>
                    </div>
                </div>
            </div>
          <!-- <Divider class="Divider">【重点安保活动】</Divider>
          <div class="huodongpanel">
            <div v-for="item in zdabhdList" :key="item.id" class="huodongdiv flexr" style="justify-content: flex-start;" >
                <div style="margin-left:10px;height:43px;width:100px;position: relative;" class="flexc rqbg"> 
                      <div style="color:#22f2ee;font-size:24px;">{{item.day}}</div>
                      <div style="color:#22f2ee;font-size:12px;margin-top:-5px;">{{item.month}}月</div>
                </div>
                <Icon type="md-arrow-dropright" style="color:#22f2ee;font-size:14px;"/>
                <div class="flexc" style="margin-left:5px;justify-content: flex-start;width:calc(100% - 80px);">
                    <div style="color:white;font-size:16px;width:100%;">{{item.title}}</div>
                    <div style="width:100%;">
                        <img src="./../../../assets/datascreen/qidong/new/icon_adress.png" style="color: #c2c2c2;height: 11px;"/>
                        <span style="color: #33B0E3;font-size:14px;">{{item.unit}}</span>
                    </div>
                </div>
              </div>
          </div> -->
          <div class="flexr titlepanel">
                <div class="titlediv flexr" style="margin-bottom:7px;margin-top:15px;height: 20px;">
                  <!-- <div class="lefttitlekuang1"></div>
                  <div class="lefttitlekuang2"></div>
                  <div class="righttitlekuang1"></div>
                  <div class="righttitlekuang2"></div> -->
                  【实时警情】
                </div>
            </div>
          <div class="huodongpanel">
            <div v-for="item in threejqlist" :key="item.afdd" class="huodongdiv flexr" style="justify-content: flex-start;" >
                <div style="margin-left:10px;height:43px;width:100px;position: relative;" class="flexc rqbg"> 
                      <!-- <div style="color:#22f2ee;font-size:24px;">{{item.minutes}}</div> -->
                      <div style="color:#22f2ee;font-size:12px;margin-top:-5px;">{{item.hours}}时{{item.minutes}}分</div>
                </div>
                <Icon type="md-arrow-dropright" style="color:#22f2ee;font-size:14px;"/>
                <div class="flexc" style="margin-left:5px;justify-content: flex-start;width:calc(100% - 80px);">
                    <div style="color:white;font-size:16px;width:100%;">{{item.bjlbmc}}</div>
                    <div style="width:100%;">
                        <!-- <Icon custom="iconfont icondingwei" style="color: #c2c2c2;font-size:16px;"/> -->
                        <img src="./../../../assets/datascreen/qidong/new/icon_adress.png" style="color: #c2c2c2;height: 11px;"/>
                        <span style="color: #33B0E3;font-size:14px;">{{formatAfdd(item.afdd)}}</span>
                    </div>
                </div>
              </div>
          </div>
        </div>
        <div class="leftbottomclass">
            <div class="leftkuang1"></div>
            <div class="leftkuang2"></div>
            <div class="rightkuang1"></div>
            <div class="rightkuang2"></div>
            <div class="flexr titlepanel">
                <div class="titlediv flexr">
                  <!-- <div class="lefttitlekuang1"></div>
                  <div class="lefttitlekuang2"></div>
                  <div class="righttitlekuang1"></div>
                  <div class="righttitlekuang2"></div> -->
                  【辖区概况】
                </div>
            </div>
            <div style="height:calc(100% - 15px);width:100%;overflow: hidden;">
                <div style="height:calc(50% - 5px);width:100%;margin-bottom:10px;" class="flexr">
                    <div style="height:100%;width:calc(50% - 5px);margin-right:10px;">
                      <!-- <Divider class="Divider" style="margin-top:0px;">实有人口</Divider> -->
                      <div class="xiaqugaikuangdiv">
                          <div style="color:#02FFF1;font-size:24px;font-family: Digitalt;width:100%;" class="flexr">1191463</div>
                          <div style="width:100%;height:calc(100% - 60px);position:relative;top: 15px;">
                            <div style="height:71%;width:100%;position:absolute;top:0px;left:0px;" class="flexr">
                              <img src="@/assets/datascreen/circle3.png" style="height:156%;"/>
                            </div>
                            <div ref="syrk" style="height:100%;width:100%"></div>
                          </div>
                      </div>
                    </div>
                    <div style="height:100%;width:calc(50% - 5px);">
                      <!-- <Divider class="Divider" style="margin-top:0px;">实有房屋</Divider> -->
                      <div class="xiaqugaikuangdiv">
                          <div style="color:#02FFF1;font-size:24px;font-family: Digitalt;width:100%;" class="flexr">348472</div>
                          <div style="width:100%;height:calc(100% - 60px);position:relative;top: 15px;">
                            <div style="height:71%;width:100%;position:absolute;top:0px;left:0px;" class="flexr">
                              <img src="@/assets/datascreen/circle3.png" style="height:156%;"/>
                            </div>
                            <div ref="syfw" style="height:100%;width:100%"></div>
                          </div>
                      </div>
                    </div>
                </div>
                <div style="height:calc(50% - 5px);width:100%;" class="flexr">
                    <div style="height:100%;width:calc(50% - 5px);margin-right:10px;">
                      <!-- <Divider class="Divider" style="margin-top:0px;">治安力量</Divider> -->
                      <div class="xiaqugaikuangdiv">
                          <div style="color:#02FFF1;font-size:24px;font-family: Digitalt;width:100%;" class="flexr">2244</div>
                          <div style="width:100%;height:calc(100% - 60px);position:relative;top: 15px;">
                            <div style="height:71%;width:100%;position:absolute;top:0px;left:0px;" class="flexr">
                              <img src="@/assets/datascreen/circle3.png" style="height:156%;"/>
                            </div>
                            <div ref="zall" style="height:100%;width:100%"></div>
                          </div>
                      </div>
                    </div>
                    <div style="height:100%;width:calc(50% - 5px);">
                      <!-- <Divider class="Divider" style="margin-top:0px;">安防设备</Divider> -->
                      <div class="xiaqugaikuangdiv">
                          <div style="color:#02FFF1;font-size:24px;font-family: Digitalt;width:100%;" class="flexr">359</div>
                          <div style="width:100%;height:calc(100% - 60px);position:relative;top: 15px;">
                            <div style="height:71%;width:100%;position:absolute;top:0px;left:0px;" class="flexr">
                              <img src="@/assets/datascreen/circle3.png" style="height:156%;"/>
                            </div>
                            <div ref="afsb" style="height:100%;width:100%"></div>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="rightpannel">
        <div class="righttopclass ">
            <div class="leftkuang1"></div>
            <div class="leftkuang2"></div>
            <div class="rightkuang1"></div>
            <div class="rightkuang2"></div>
            <div class="tongzhititle">
                {{tzObj.title}}
            </div>
            <div class="tongzhicontent">
                {{tzObj.content}}
            </div>
            <!-- <Icon custom="iconfont icontiaojian" class="optionIcon" @click="showTzModal"/> -->
            <img src="./../../../assets/datascreen/qidong/new/icon_more.png" class="optionIcon" style="width:18px;height:17px" @click="showTzModal"/>
        </div>
        <div class="rightbottomclass">
            <div class="leftkuang1"></div>
            <div class="leftkuang2"></div>
            <div class="rightkuang1"></div>
            <div class="rightkuang2"></div>
            <div class="flexr titlepanel">
                <div class="titlediv flexr">
                  <!-- <div class="lefttitlekuang1"></div>
                  <div class="lefttitlekuang2"></div>
                  <div class="righttitlekuang1"></div>
                  <div class="righttitlekuang2"></div> -->
                  【今日警情统计】
                </div>
            </div>
            <div class="jqtitle flexr">
                <div style="width:50%;height:100%;border-right:2px solid black;" class="border-jianbian flexr">
                    <div style="position:relative;height:50px;width:50px;">
                      <img src="@/assets/datascreen/qidong/new/imgbg_aa.png" style="height:50px;width:50px;position:absolute;top:0px;left:0px;"/>
                      <!-- <Icon custom="iconfont iconUI_icon_jingqing" style="color: #0ccffd;font-size:16px;position:absolute;top:15px;left:16px;"/> -->
                    </div>
                    <div class="flexc" style="margin-left: 10px;">
                        <div style="color:#02FFF1;font-size:24px;font-family: Digitalt;">{{jqtjObj.jrjqcount}}</div>
                        <div style="color:white;font-size:12px;">今日接警</div>
                    </div>
                    <div style="color:#02FFF1;font-size:12px;margin-left:5px;margin-right:5px;">起</div>
                </div>
                <div style="width:50%;height:100%;" class="flexr">
                  <div style="position:relative;height:50px;width:50px;">
                      <img src="@/assets/datascreen/qidong/new/imgbg_aa.png" style="height:50px;width:50px;position:absolute;top:0px;left:0px;"/>
                      <!-- <Icon custom="iconfont iconUI_icon_jingqing" style="color: #0ccffd;font-size:16px;position:absolute;top:15px;left:16px;"/> -->
                    </div>
                    <div class="flexc" style="margin-left: 10px;">
                        <div style="color:#02FFF1;font-size:24px;font-family: Digitalt;">{{jqtjObj.jrcjcount}}</div>
                        <div style="color:white;font-size:12px;">今日处警</div>
                    </div>
                    <div style="color:#02FFF1;font-size:12px;margin-left:5px;">起</div>
                </div>
            </div>
            <div class="jqtb flexr">
                <div class="flexc">
                  <div style="height:80px;width:80px;line-height:80px;position:relative;text-align:center;">
                    <img src="@/assets/datascreen/qidong/new/img_jqred.png" style="height:60px;width:60px;position:absolute;left:10px;top:8px;"/>
                    <div style="color: white;font-size:24px;">{{jqtjObj.jqjbcount1}}</div>
                  </div>
                  <div style="color: #ff0000;font-size:12px;margin-top:-10px;">交通警情</div>
                </div>
                <div class="flexc">
                  <div style="height:80px;width:80px;line-height:80px;position:relative;text-align:center;">
                    <img src="@/assets/datascreen/qidong/new/img_jqorange.png" style="height:60px;width:60px;position:absolute;left:10px;top:8px;"/>
                    <div style="color: white;font-size:24px;">{{jqtjObj.jqjbcount2}}</div>
                  </div>
                  <div style="color: #ff8100;font-size:12px;margin-top:-10px;">求助警情</div>
                </div>
                <div class="flexc">
                  <div style="height:80px;width:80px;line-height:80px;position:relative;text-align:center;">
                    <img src="@/assets/datascreen/qidong/new/img_jqyellow.png" style="height:60px;width:60px;position:absolute;left:10px;top:8px;"/>
                    <div style="color: white;font-size:24px;">{{jqtjObj.jqjbcount3}}</div>
                  </div>
                  <div style="color: #ffff00;font-size:12px;margin-top:-10px;">纠纷警情</div>
                </div>
                <div class="flexc">
                  <div style="height:80px;width:80px;line-height:80px;position:relative;text-align:center;">
                    <img src="@/assets/datascreen/qidong/new/img_jqgreen.png" style="height:60px;width:60px;position:absolute;left:10px;top:8px;"/>
                    <div style="color: white;font-size:24px;">{{jqtjObj.jqjbcount4}}</div>
                  </div>
                  <div style="color: rgb(93, 232, 164);font-size:12px;margin-top:-10px;">火灾警情</div>
                </div>
            </div>
            <div class="jqchartpanel">
                <div style="height:60%;width:100%;position:absolute;top:0px;left:0px;" class="flexr">
                  <img src="@/assets/datascreen/circle2.png" style="height:90%;"/>
                </div>
                <div ref="jqpcs" style="height:60%;width:95%;">
                </div>
                
                <div ref="jqlb" style="height:40%;width:100%;margin-top: 15px;"></div>
            </div>
        </div>
      </div>
      <div class="bottom_bg">
        <img src="./../../../assets/datascreen/qidong/new/bg_bottom.png"/>
        <img class="xianqi" src="./../../../assets/datascreen/qidong/new/xianqinew.png"/>
        <div class="timeclass">{{time}}</div>
      </div>
      <!-- <div v-show="showxqmap" class="centermap_bg">
        <div  v-for="Obj in jqCountAndDeptList" :key="Obj.deptcode" :style="{'width':'177px','height':'95px','position':'absolute','left':Obj.left+'%','top':Obj.top+'%'}" >
          <div class="mapdeptname flexr" style="color:white;height:26px;justify-content:flex-start;">
            <span class="flexr" style="margin-right:10px;font-size:14px;height: 26px;background: #ff8100;width: 26px;">{{Obj.count}}</span>{{Obj.gxdwmc}}
          </div>
          <div v-if="Obj.lbcount.length>0" style="color:white;justify-content:flex-start;background:rgb(107, 72, 8);height:26px" class="flexr">
             <span  v-for="(lbcountObj,index) in Obj.lbcount" :key="index" style="margin-left:5px;font-size:14px;">{{getTwoWord(lbcountObj.bjlbmc)}}({{lbcountObj.count}})</span>
          </div>
          <div class="maptc"></div>
        </div>
        <img src="./../../../assets/datascreen/qidong/new/img_centermap.png"/>
      </div> -->
      <div class="bottomclass flexr" style="justify-content:flex-start;">
        <!-- <img src="@/assets/datascreen/circlebj.png" style="position:absolute;top:0px;left:0px;"/> -->
        <div style="height:80px;width:80px;position:relative;cursor:pointer;" title="显示警情点位" class="flexr" @click="showJq">
            <img src="@/assets/datascreen/circle4.png" style="height:100%;position:absolute;top:0px;left:0px;"/>
            <Icon custom="iconfont iconUI_icon_jingqing" style="color: #0ccffd;font-size:24px;"/>
        </div>
        <div style="height:80px;width:80px;position:relative;cursor:pointer;" title="显示警力点位" class="flexr" @click="showJl">
            <img src="@/assets/datascreen/circle4.png" style="height:100%;position:absolute;top:0px;left:0px;"/>
            <Icon custom="iconfont iconpolice-default-01" style="color: #0ccffd;font-size:24px;"/>
        </div>
      </div>
      <div class="bottom_rightclass flexr" title="显示警情热力图" style="justify-content:flex-start;">
        <!-- <img src="@/assets/datascreen/circlebj.png" style="position:absolute;top:0px;left:0px;"/> -->
        <div style="height:80px;width:80px;position:relative;cursor:pointer;" class="flexr" @click="showJqRl">
            <img src="@/assets/datascreen/circle4.png" style="height:100%;position:absolute;top:0px;left:0px;"/>
            <Icon custom="iconfont iconUI_icon_jingqing" style="color: #0ccffd;font-size:24px;"/>
        </div>
        <div style="height:80px;width:80px;position:relative;cursor:pointer;" title="进入主系统" class="flexr" @click="showXqMap">
            <!-- <img src="@/assets/header/homepage_navbar_close.png" style="height:100%;position:absolute;top:0px;left:0px;"/> -->
            <img src="@/assets/datascreen/circle4.png" style="height:100%;position:absolute;top:0px;left:0px;"/>
            <img src="@/assets/header/homepage_navbar_close.png" style="width:28px;height:28px;position:absolute;top:26px;left:26px;"/>
            <!-- <Icon custom="iconfont iconpolice-default-01" style="color: #0ccffd;font-size:24px;"/> -->
        </div>
      </div>
      <Modal title="信息发布" v-model="isTzModalShow" :draggable="true" width="600" class="ModalClass">
        <div>
            <div style="margin-bottom:10px;">
                <Input v-model="tzUpdateObj.title" type="text" style="width: 565px;"/>
            </div>
            <div>
                <Input v-model="tzUpdateObj.content" type="textarea" style="width: 565px;" :rows="10"/>
            </div>
        </div>
        <div slot="footer">
            <Button v-show="!tzObj.id" type="primary" size="large" @click="insertTz">保存</Button>
            <Button v-show="tzObj.id" type="primary" size="large" @click="updateTz">修改</Button>
            <Button type="primary" size="large" @click="hideTzModal">取消</Button>
        </div>
      </Modal>
      <Modal title="勤务安保" v-model="isQwabModalShow" :draggable="true" width="750" class="ModalClass">
        <div>
            <el-tabs type="border-card" class="tabs" v-model="qwabtabname">
              <el-tab-pane label="勤务安保" class="tabs_pane" name="1">
                  <div class="flexr" style="justify-content:flex-start;margin-bottom:10px;">
                      <span style="width:75px;text-align:right;">总值班:</span><input v-model="qwabUpdateObj.sjld" class="inputClass"/>
                      <span style="width:75px;margin-left:10px;text-align:right;">主班领导:</span><input v-model="qwabUpdateObj.zbz" class="inputClass"/>
                  </div>
                  <div class="flexr" style="justify-content:flex-start;margin-bottom:10px;">
                      <span style="width:75px;text-align:right;">副班领导:</span><input v-model="qwabUpdateObj.zzb" class="inputClass"/>
                      <span style="width:75px;margin-left:10px;text-align:right;">指挥长:</span><input v-model="qwabUpdateObj.jjzhz" class="inputClass"/>
                  </div>
                  <div class="flexr" style="justify-content:flex-start;margin-bottom:10px;">
                      <span style="width:75px;text-align:right;">交警指挥长:</span><input v-model="qwabUpdateObj.fzb" class="inputClass"/>
                  </div>
                  <div class="flexr" style="justify-content:flex-start;margin-bottom:10px;">
                      <span style="width:75px;text-align:right;">出警:</span><input v-model="qwabUpdateObj.cj" type="number" class="inputClass" style="width:100px;"/>
                      <span style="width:75px;text-align:right;">值班:</span><input v-model="qwabUpdateObj.zb" type="number" class="inputClass" style="width:100px;"/>
                      <span style="width:75px;text-align:right;">备勤:</span><input v-model="qwabUpdateObj.bq" type="number" class="inputClass" style="width:100px;"/>
                  </div>
              </el-tab-pane>
              <!-- <el-tab-pane label="重点安保活动" class="tabs_pane" name="2">
                  <div v-for="item in zdabhdUpdateList" :key="item.id" style="margin-top:10px;">
                    <label>时间:</label>
                    <el-date-picker v-model="item.time" type="date" placeholder="选择日期" size="mini" style="width:125px;" value-format="yyyy-MM-dd"></el-date-picker>
                    <label>内容:</label>
                    <Input v-model="item.title" :maxlength="250" type="textarea" style="width: 200px" :rows="3"/>
                    <label>地址:</label>
                    <Input v-model="item.unit" :maxlength="250" type="textarea" style="width: 100px" :rows="3"/>
                    <Button v-show="!item.id" type="primary" size="small" style="width:50px;margin-left:10px;" @click="insertZdabhd(item)">保存</Button>
                    <Button v-show="item.id" type="primary" size="small" style="width:50px;margin-left:10px;" @click="updateZdabhd(item)">修改</Button>
                    <Button type="primary" size="small" style="width:50px;margin-left:10px;" @click="deleteZdabhd(item)">删除</Button>
                </div>
              </el-tab-pane> -->
            </el-tabs>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="hideQwabModal">取消</Button>
            <Button v-show="qwabtabname=='1'&&(!qwabObj.id)" type="primary" size="large" @click="insertQwab">保存</Button>
            <Button v-show="qwabtabname=='1'&&(qwabObj.id)" type="primary" size="large" @click="updateQwab">保存</Button>
            <Button v-show="qwabtabname=='2'" type="primary" size="large" @click="addZdabhd">新增</Button>
        </div>
      </Modal>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
import MapCreate from '@/components/map/MapCreate'
import yewuMarkCreateUtil from '@/components/map/js/yewuMarkCreateUtil'
import markCreateUtil from '@/components/map/js/markCreateUtil'
import common from "@/common.js"

export default {
  name: 'Screen2',
  components:{MapCreate},
  props:['page','curpage'],
  data () {
    return {
      mapid:"datascreenmap",
      title:Constants.project_name,
      syrkchart:null,
      syfwchart:null,
      zallchart:null,
      afsbchart:null,
      jqpcschart:null,
      jqlbchart:null,
      isJqShow:false,
      isJqRlShow:false,
      isJlShow:false,
      jqtjObj:{},//今日警情统计的对象
      isTzModalShow:false,
      tzObj:{},
      tzUpdateObj:{},
      isQwabModalShow:false,
      qwabtabname:"1",//默认为第一个选项卡
      zdabhdList:[],
      zdabhdUpdateList:[],
      qwabObj:{},
      qwabUpdateObj:{},
      time:"",
      jqMarkType:'point',
      showxqmap:true,
      jqCountAndDeptList:[
        {"count":"45","gxdwmc":"汇龙镇派出所","deptcode":"320681530000","left":"60","top":"50","lbcount":""},
        {"count":"45","gxdwmc":"城区一中队","deptcode":"320681176100","left":"50","top":"45",
        "lbcount":""},
        {"count":"45","gxdwmc":"吕四派出所","deptcode":"320681870000","left":"45","top":"0",
        "lbcount":""},
        {"count":"45","gxdwmc":"城西派出所","deptcode":"320681550000","left":"35","top":"35",
        "lbcount":""},
        {"count":"45","gxdwmc":"北新派出所","deptcode":"320681660000","left":"30","top":"66",
        "lbcount":""},
        {"count":"45","gxdwmc":"王鲍派出所","deptcode":"320681720000","left":"45","top":"25",
        "lbcount":""},
        {"count":"45","gxdwmc":"启隆派出所","deptcode":"320681690000","left":"45","top":"75",
        "lbcount":""},
        {"count":"45","gxdwmc":"开发区派出所","deptcode":"320681640000","left":"50","top":"60",
        "lbcount":""},
        {"count":"45","gxdwmc":"寅阳派出所","deptcode":"320681750000","left":"80","top":"60",
        "lbcount":""},
        {"count":"45","gxdwmc":"近海派出所","deptcode":"320681860000","left":"60","top":"20",
        "lbcount":""},
      ],
      threejqlist:[],
    }
  },
  computed:mapState({
     userInfo: state => state.userInfo,
  }),
  methods:{
    createJqlbCharts(lbList){
        var labelList = [];
        var jrList = [];
        var zrList = [];
        for(var i=0;i<lbList.length;i++){
            labelList.push(lbList[i].name);
            jrList.push(lbList[i].count);
            zrList.push(lbList[i].count2);
        }
        var option = {
            legend: {
                data:['今日', '昨日'],
                textStyle:{
                  color:'#fff'
                }
            },
            color: ['#6442f3','#ff0000'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '20',
                right: '10',
                bottom: '5',
                top:'30',
                containLabel: true
            },
            xAxis: [
                {
                    axisLabel:{
                      color:'#fff',
                      interval:0,
                      rotate:40
                    },
                    data: labelList,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine:{
                      show:false,
                        lineStyle:{
                            color:'#093765'
                        }
                    },
                    type: 'category',
                    boundaryGap: false,
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位:起',
                    axisLine:{
                      show:false,
                        lineStyle:{
                            color:'#33c8ff'
                        }
                    },
                    splitLine:{
                      lineStyle:{
                        color:"#093765"
                      }
                    },
                    axisLabel:{
                        color:'#33c8ff'
                    },
                }
            ],
            series: [
                {
                    name: '今日',
                    type: 'bar',
                    barWidth: '30%',
                    label: {
                        show: true,
                        position: 'top',
                        color:'#fff'
                    },
                    data: jrList
                },
                {
                    name: '昨日',
                    type: 'line',
                    barWidth: '30%',
                    data: zrList
                }
            ]
        };
        this.jqlbchart.setOption(option);
     },
    createJqpcsCharts(pcsList){
        var labelList=[];
        var dataList=[];
        for(var i=0;i<pcsList.length;i++){
            labelList.push({text:pcsList[i].name});
            dataList.push(pcsList[i].count);
        }
        var option = {
            tooltip: {
            },
            radar: [
                {
                    indicator: labelList,
                    center: ['50%', '50%'],
                    radius: '75%',
                    startAngle: 90,
                    splitNumber: 8,
                    shape: 'circle',
                    name: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#18f5f7'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(41,56,87, 0.4)'],
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 9
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(10,158,166,0.6)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(10,158,166,0.6)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '雷达图',
                    type: 'radar',
                    emphasis: {
                        lineStyle: {
                            width: 4
                        }
                    },
                    data: [
                        {
                            value: dataList,
                            name: '派出所警情统计',
                            areaStyle: {
                                color: 'rgba(24,245,247, 0.5)'
                            },
                            lineStyle:{
                                color: 'rgba(24,245,247, 0.5)'
                            },
                        }
                    ]
                }
            ]
        };
        this.jqpcschart.setOption(option);
     },
     createSyrkCharts(){
        this.syrkchart = this.echarts.init(this.$refs.syrk);
        var legendList = ["户籍","流动"];
        var option = {
            color: ['#FF717A', '#33E1BE'],
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} '
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: legendList,
                itemWidth:12,
                itemHeight:12,
                textStyle:{
                  color:'#fff'
              },
            },
            series: [
                {
                    name: '半径模式',
                    type: 'pie',
                    radius: ['30%', '70%'],
                    center: ['50%', '35%'],
                    stillShowZeroSum:false,
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    },
                    data: [{value:1100320, name:'户籍'},
                      {value:91143, name:'流动'}]
                }
            ]
        };
        this.syrkchart.setOption(option);
     },
    createSyfwCharts(){
        this.syfwchart = this.echarts.init(this.$refs.syfw);
        var legendList = ["自住","出租","空置"];
        
        var option = {
            color: ['#FF717A', '#33E1BE','#308EEB'],
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} '
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: legendList,
                itemWidth:12,
                itemHeight:12,
                textStyle:{
                  color:'#fff',
              },
            },
            series: [
                {
                    name: '半径模式',
                    type: 'pie',
                    radius: ['30%', '70%'],
                    center: ['50%', '35%'],
                    stillShowZeroSum:false,
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    },
                    data: [{value:38, name:'自住'},
                      {value:62, name:'出租'},{value:2, name:'空置'}]
                }
            ]
        };
        this.syfwchart.setOption(option);
     },
     createZallCharts(){
        this.zallchart = this.echarts.init(this.$refs.zall);
        var legendList = ["民警","辅警"];
        var option = {
            color: ['#E732B5', '#7672FF'],
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} '
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: legendList,
                itemWidth:12,
                itemHeight:12,
                textStyle:{
                  color:'#fff'
              },
            },
            series: [
                {
                    name: '半径模式',
                    type: 'pie',
                    radius: ['30%', '70%'],
                    center: ['50%', '35%'],
                    stillShowZeroSum:false,
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    },
                    data: [{value:847, name:'民警'},
                      {value:1397, name:'辅警'}]
                }
            ]
        };
        this.zallchart.setOption(option);
     },
     createAfsbCharts(){
        this.afsbchart = this.echarts.init(this.$refs.afsb);
        var legendList = ["视频","卡口"];
        var option = {
            color: ['#FD5CBF', '#A4DA59'],
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} '
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: legendList,
                itemGap:5,
                itemWidth:12,
                itemHeight:12,
                textStyle:{
                  color:'#fff'
              },
            },
            series: [
                {
                    name: '半径模式',
                    type: 'pie',
                    radius: ['30%', '70%'],
                    center: ['50%', '35%'],
                    stillShowZeroSum:false,
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    },
                    data:[{value:135, name:'视频'},{value:224, name:'卡口'},]
                }
            ]
        };
        this.afsbchart.setOption(option);
     },
     getMapObj(mapid){//获取map对象，里面的值格式等同this.map中的格式,多加一个id
        for(var i=0;i<this.mapList.length;i++){
            if(this.mapList[i].id=mapid){
              return this.mapList[i];
            }
        }
        return null;
      },
     showXqMap(){
       this.$router.push({ path:'/'}); //路由跳转
        // this.showxqmap = !this.showxqmap;
     },
     showJqRl(){//显示警情热力图
        this.isJqRlShow = !this.isJqRlShow;
        this.jqMarkType = "heatLayer";
        if(this.isJqRlShow){
            this.searchJq();
        }else{
            var mapObj = this.getMapObj(this.mapid);
            if(mapObj!=null){
              var layerid = "heatmap";
              markCreateUtil.clearLayer(layerid,mapObj);
              mapObj.map.infoWindow.hide();
            }
        }
     },
     showJq(){
        this.isJqShow = !this.isJqShow;
        this.jqMarkType = 'point';
        if(this.isJqShow){
            this.searchJq();
        }else{
            var mapObj = this.getMapObj(this.mapid);
            if(mapObj!=null){
              var layerid = "ssjqLayer";
              markCreateUtil.clearLayer(layerid,mapObj);
              mapObj.map.infoWindow.hide();
            }
        }
     },
     searchJq(){
        var paramObj = {};
        //翻页
        paramObj.page = 1;
        paramObj.pagesize = 1000;
        //部门
        paramObj.deptcode = this.userInfo.directdeptcode;
        //开始时间
        paramObj.starttime = this.common.dateFormat(this.common.addDate(-3),'yyyy-MM-dd');//取3天内的警情
        //状态
        // paramObj.state = this.state;
        this.http.get("/ssjq/getSsjq",paramObj,this.getSsjqCallBack,this,false);
     },
     getSsjqCallBack(data){
        if(this.jqMarkType=='point'){
          yewuMarkCreateUtil.addJqMarks(data.data,null,this,this.mapid);//打点
        }
        if(this.jqMarkType=='heatLayer'){
          yewuMarkCreateUtil.addHeatMapMark(data.data,this,this.mapid);//打点
        }
      },
     showJl(){
        this.isJlShow = !this.isJlShow;
        if(this.isJlShow){
            this.searchJl();
        }else{
            var mapObj = this.getMapObj(this.mapid);
            if(mapObj!=null){
              var layerid = "ssjlLayer";
              markCreateUtil.clearLayer(layerid,mapObj);
              mapObj.map.infoWindow.hide();
            }
        }
     },
     searchJl(){
        var paramObj = {};
        //翻页
        paramObj.page = 1;
        paramObj.pagesize = 1000;
        //部门
        paramObj.deptcode = this.userInfo.directdeptcode;
        //是否在线
        paramObj.online = '1';
        this.http.get("/ssjl/getSsjl",paramObj,this.getSsjlCallBack,this,false);
     },
     getSsjlCallBack(data){
        yewuMarkCreateUtil.addJlMarks(data.data,this,this.mapid);//打点
     },
     getJrJqTongji(){
        this.http.get("/datascreen/getJrJqTongji",null,this.getJrJqTongjiCallBack,this,false);
     },
     getJrJqTongjiCallBack(data){
        this.jqtjObj = data;
        this.createJqpcsCharts(data.pcsList)
        this.createJqlbCharts(data.lbList);
     },
     getJqCountAndDept(){
       this.http.get("/datascreen/getJqCountGroupByDept",null,this.getJqCountGroupByDeptCallBack,this,false);
     },
     getJqCountGroupByDeptCallBack(data){
       console.log(data);
      //  this.jqCountAndDeptList=data;
       var dataMap = [];
       for(var i=0;i<data.length;i++){
            dataMap[data[i].deptcode] = data[i];
       }
       for(var i=0;i<this.jqCountAndDeptList.length;i++){
            var deptcode = this.jqCountAndDeptList[i].deptcode;
            var dataObj = dataMap[deptcode];
            if(dataObj){
               this.jqCountAndDeptList[i].count=dataObj.count;
               if(dataObj.lbcount.length>0){
                 this.jqCountAndDeptList[i].lbcount=dataObj.lbcount;
               }
            }
       }
            // debugger;
     },
     setIntervalChart(){
        var that = this;
        setInterval(function(){
          that.getJrJqTongji();
          that.getRecentJq();
          if(that.isJqShow){//如果警情开着就搜索警情
            that.searchJq();
          }
          if(that.isJlShow){//如果警力开着就搜索警力
            that.searchJl();
          }
        }, 1000*60*1);//1分钟
     },
     //---------------------------------------通知-------------------------------------
     showTzModal(){
       this.isTzModalShow = true;
     },
     hideTzModal(){
       this.isTzModalShow = false;
     },
     getTz(){
        var paramObj={};
        paramObj.type="tz";
        paramObj.bitime="1";
        this.http.get("/tzgg/getTzgg",paramObj,this.getTzCallBack,this,false);
      },
      getTzCallBack(data){
        if(data.data.length>0){
          this.tzObj = data.data[0];
          this.tzUpdateObj = Object.assign({},this.tzObj);
        }
      },
      insertTz(){
        if(this.tzUpdateObj.title==""||this.tzUpdateObj.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(this.tzUpdateObj.content==""||this.tzUpdateObj.content==null){
          this.$Message.error("内容不能为空");
          return;
        }
        var paramObj={};
        paramObj.title = this.tzUpdateObj.title;
        paramObj.content = this.tzUpdateObj.content;
        paramObj.type="tz";
        this.http.get("/tzgg/saveTzgg",paramObj,this.insertTzCallBack,this,false);
      },
      insertTzCallBack(data){
        this.getTz();
        this.$Message.success("新增成功");
      },
      updateTz(){
        if(this.tzUpdateObj.title==""||this.tzUpdateObj.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(this.tzUpdateObj.content==""||this.tzUpdateObj.content==null){
          this.$Message.error("内容不能为空");
          return;
        }
        var paramObj={};
        paramObj.id = this.tzUpdateObj.id;
        paramObj.content = this.tzUpdateObj.content;
        paramObj.title = this.tzUpdateObj.title;
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateTzCallBack,this,false);
      },
      updateTzCallBack(data){
        this.getTz();
        this.$Message.success("修改成功");
      },
      //---------------------------------------勤务安保-------------------------------------
      showQwabModal(){
        this.isQwabModalShow = true;
      },
      hideQwabModal(){
        this.isQwabModalShow = false;
      },
      getZdabhd(){//获取重点安保活动
        var paramObj={};
        paramObj.type="zdabhd";
        this.http.get("/tzgg/getTzgg",paramObj,this.getZdabhdCallBack,this,false);
      },
      getZdabhdCallBack(data){
        this.zdabhdUpdateList = [];
        for(var i=1;i<=data.data.length;i++){
          data.data[i-1].xh = i;
          var day = data.data[i-1].time.split("-")[2];
          var month = data.data[i-1].time.split("-")[1];
          data.data[i-1].day=day;
          data.data[i-1].month=month;
          this.zdabhdUpdateList.push(Object.assign({},data.data[i-1]));
        }
        this.zdabhdList = data.data;
      },
      addZdabhd(){
        var obj={};
        this.zdabhdUpdateList.unshift(obj);
      },
      insertZdabhd(item){
        if(item.title==""||item.title==null){
          this.$Message.error("活动内容不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.unit==""||item.unit==null){
          this.$Message.error("地址不能为空");
          return;
        }
        var paramObj={};
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.unit = item.unit;
        paramObj.type="zdabhd";
        this.http.get("/tzgg/saveTzgg",paramObj,this.insertZdabhdCallBack,this,false);
      },
      insertZdabhdCallBack(data){
        this.getZdabhd();
        this.$Message.success("新增成功");
      },
      updateZdabhd(item){
        if(item.title==""||item.title==null){
          this.$Message.error("活动内容不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.unit==""||item.unit==null){
          this.$Message.error("地址不能为空");
          return;
        }
        var paramObj={};
        paramObj.id = item.id;
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.unit = item.unit;
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateZdabhdCallBack,this,false);
      },
      updateZdabhdCallBack(data){
        this.getZdabhd();
        this.$Message.success("修改成功");
      },
      deleteZdabhd(item){
        if(item.id){
          var paramObj={};
          paramObj.id = item.id;
          if(confirm('确定要删除吗')==true){
            this.http.get("/tzgg/delTzgg",paramObj,this.deleteZdabhdCallBack,this,false);
          }
        }else{//新增进去的框
          var title=(item.title==null?"":item.title);
          var time=(item.time==null?"":item.time);
          var unit=(item.unit==null?"":item.unit);
          for(var i=0;i<this.zdabhdUpdateList.length;i++){
              if(this.zdabhdUpdateList[i].id){
                continue;
              }
              var title2=(this.zdabhdUpdateList[i].title==null?"":this.zdabhdUpdateList[i].title);
              var time2=(this.zdabhdUpdateList[i].time==null?"":this.zdabhdUpdateList[i].time);
              var unit2=(this.zdabhdUpdateList[i].unit==null?"":this.zdabhdUpdateList[i].unit);
              if(title==title2&&time==time2&&unit==unit2){
                this.zdabhdUpdateList.splice(i, 1);
                break;
              }
          }
        }
      },
      deleteZdabhdCallBack(data){
        this.getZdabhd();
        this.$Message.success("删除成功");
      },
      getQwab(){
        var paramObj={};
        paramObj.type="qwab";
        paramObj.bitime="1";
        this.http.get("/tzgg/getTzgg",paramObj,this.getQwabCallBack,this,false);
      },
      getQwabCallBack(data){
        if(data.data.length>0){
          this.qwabObj = JSON.parse(data.data[0].content);
          this.qwabUpdateObj = Object.assign({},this.qwabObj);
          this.qwabObj.id = data.data[0].id;
        }
      },
      insertQwab(){
        var paramObj={};
        paramObj.content = JSON.stringify(this.qwabUpdateObj);
        paramObj.type="qwab";
        this.http.get("/tzgg/saveTzgg",paramObj,this.insertQwabCallBack,this,false);
      },
      insertQwabCallBack(data){
        this.getQwab();
        this.$Message.success("新增成功");
      },
      updateQwab(){
        var paramObj={};
        paramObj.id = this.qwabObj.id;
        paramObj.content = JSON.stringify(this.qwabUpdateObj);
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateQwabCallBack,this,false);
      },
      updateQwabCallBack(data){
        this.getQwab();
        this.$Message.success("修改成功");
      },
     
  //---------------------------------------最近的警情-------------------------------------
    getRecentJq(){
      this.http.get("/datascreen/getRecentJq",null,this.getRecentJqCallBack,this,false);
    },
    getRecentJqCallBack(data){
      this.threejqlist=data;
    },
   //---------------------------------------common-------------------------------------
    getTwoWord(str){
        if(str !=null){
          return str.substr(0,2);
        }
      },
    formatAfdd(afdd){
      return this.common.cutstr(afdd,20);
    },


  },
  mounted(){
    this.createSyrkCharts();
    this.chartList.push(this.syrkchart);
    this.createSyfwCharts();
    this.chartList.push(this.syfwchart);
    this.createZallCharts();
    this.chartList.push(this.zallchart);
    this.createAfsbCharts();
    this.chartList.push(this.afsbchart);
    this.jqpcschart = this.echarts.init(this.$refs.jqpcs);
    this.chartList.push(this.jqpcschart);
    this.jqlbchart = this.echarts.init(this.$refs.jqlb);
    this.chartList.push(this.jqlbchart);
    this.getJrJqTongji();
    this.setIntervalChart();
    this.getTz();
    this.getZdabhd();
    this.getQwab();
    this.getJqCountAndDept();
    this.getRecentJq();
    var _this = this;
    this.timer = setInterval(() => {
      var date = new Date();
//       _this.date = _this.common.dateFormat("YYYY/mm/dd", date); // 修改数据date
      _this.time = _this.common.dateFormat(date, "HH:mm:ss");
    }, 1000);
  },
  beforeDestroy(){
  },
  watch : {
      curpage:function(val) {
          if(this.page==val){
              this.syrkchart.resize();
              this.syfwchart.resize();
              this.zallchart.resize();
              this.afsbchart.resize();
              this.jqpcschart.resize();
              this.jqlbchart.resize();
          }
      }
  }
}
</script>

<style scoped>
.panel{
  position: relative;
  width: 100%;
  height: 100%;
  overflow:visible;
}
.mapclass{
  position:absolute;
  top: -80px;
  left: 0px;
  object-fit: fill;
  width: 100%;
  height: calc(100% + 80px);
  z-index: 0;
}
.bjpanel{
  left: 0px;
  top:0px;
  position:absolute;
  width: 100%;
  height: 58px;
  background:url(./../../../assets/datascreen/qidong/bg.jpg) no-repeat;
}
.bj2div{
  width: 100%;
  left: 0px;
  top:50px;
  position:absolute;
  margin-left:6.5%;
}
.bjpanel2{
  width: 20%;
  height: 30px;
  background:url(./../../../assets/datascreen/qidong/bg.jpg) no-repeat;
  transform: skewX(-45deg);
}
.bj3div{
  width: 100%;
  left: 0px;
  top:50px;
  position:absolute;
  margin-left:-6.7%;
}
.bjpanel3{
  width: 20%;
  height: 30px;
  background:url(./../../../assets/datascreen/qidong/bg.jpg) no-repeat;
  transform: skewX(45deg);
}
.bg_title{
  position:absolute;
  left: 0px;
  top:0px;
  width:100%;
  height: 80px;
  background:url(./../../../assets/datascreen/qidong/logo_img.png) no-repeat;
  background-size:100% 100%;
}
.title{
  width: 100%;
  height: 100%;
  text-align:center;
  font-size:29px;
  line-height:72px;
  color:#fff;
  user-select: none;
}
.lefttopclass{
  position:absolute;
  /* top:-15px; */
  left:5px;
  height: 48%;
  width: 350px;
  /* z-index: 5; */
  border:1px solid#2b9bd2;
  background: #071530;
  opacity: 0.9;
  padding: 10px;
}
.leftbottomclass{
  position:absolute;
  bottom:5px;
  left:5px;
  height: 50%;
  width: 350px;
  /* z-index: 5; */
  border:1px solid#2b9bd2;
  background: #071530;
  opacity: 0.9;
  padding: 10px;
}
.righttopclass{
  position:absolute;
  /* top:3%; */
  right:5px;
  height: 143px;
  width: 350px;
  z-index: 5;
  border:1px solid#2b9bd2;
  background: #071530;
  opacity: 0.9;
  padding: 10px;
  background-image: url(./../../../assets/datascreen/qidong/new/img_line_gaog.png);
  background-repeat: no-repeat;
  background-position: bottom;
}
.rightbottomclass{
  position:absolute;
  bottom:5px;
  right:5px;
  height: calc(100% - 160px);
  width: 350px;
  z-index: 5;
  border:1px solid#2b9bd2;
  background: #071530;
  opacity: 0.9;
  padding: 10px;
}
.bottomclass{
  position:absolute;
  bottom:65px;
  left:360px;
  /* right:360px; */
  height: 80px;
  z-index: 5;
  /* border:1px solid#2b9bd2; */
  /* background: #071530; */
  /* background-image:url(./../../../assets/datascreen/circlebj.png); */
  opacity: 1;
  /* padding: 10px; */
}
.bottom_rightclass{
  position:absolute;
  bottom:65px;
  /* left:360px; */
  right:360px;
  height: 80px;
  z-index: 5;
  /* border:1px solid#2b9bd2; */
  /* background: #071530; */
  /* background-image:url(./../../../assets/datascreen/circlebj.png); */
  opacity: 1;
  /* padding: 10px; */
}
.lefttitlekuang1{
  position:absolute;
  height: 10px;
  width: 10px;
  left: -1px;
  top: -1px;
  border-left: 1px solid #00c3ff;
  border-top: 1px solid #00c3ff;
}
.lefttitlekuang2{
  position:absolute;
  height: 10px;
  width: 10px;
  left: -1px;
  bottom: -1px;
  border-left: 1px solid #00c3ff;
  border-bottom: 1px solid #00c3ff;
}
.righttitlekuang1{
  position:absolute;
  height: 10px;
  width: 10px;
  right: -1px;
  top: -1px;
  border-right: 1px solid #00c3ff;
  border-top: 1px solid #00c3ff;
}
.righttitlekuang2{
  position:absolute;
  height: 10px;
  width: 10px;
  right: -1px;
  bottom: -1px;
  border-right: 1px solid #00c3ff;
  border-bottom: 1px solid #00c3ff;
}
.leftkuang1{
  position:absolute;
  height: 20px;
  width: 20px;
  left: -3px;
  top: -3px;
  border-left: 3px solid #00c3ff;
  border-top: 3px solid #00c3ff;
}
.leftkuang2{
  position:absolute;
  height: 20px;
  width: 20px;
  left: -3px;
  bottom: -3px;
  border-left: 3px solid #00c3ff;
  border-bottom: 3px solid #00c3ff;
}
.rightkuang1{
  position:absolute;
  height: 20px;
  width: 20px;
  right: -3px;
  top: -3px;
  border-right: 3px solid #00c3ff;
  border-top: 3px solid #00c3ff;
}
.rightkuang2{
  position:absolute;
  height: 20px;
  width: 20px;
  right: -3px;
  bottom: -3px;
  border-right: 3px solid #00c3ff;
  border-bottom: 3px solid #00c3ff;
}
.border_box{
  background:url(./../../../assets/datascreen/qidong/new/imgbg_left_top.png) no-repeat;
  background-size:100% 100%;
  height: 30px;
  display: flex;
  /* justify-content: center; */
}
.jlbg{
  background:url(./../../../assets/datascreen/qidong/new/imgbg_left_topright.png) no-repeat;
  background-size:100% 100%;
}
.rqbg{
  background:url(./../../../assets/datascreen/qidong/new/imgbg_aaaa.png) no-repeat;
  background-size:100% 100%;
}
.titlepanel{
  height: 30px;
  position: relative;
  margin-bottom: 10px;
}
.titlediv{
  position: relative;
  width: 150px;
  height: 40px;
  /* background: #293c5a; */
  color: #02FFF1;
  font-size: 18px;
}
.titlediv span{
  background: linear-gradient(to bottom, white, rgb(101, 180, 233));
  -webkit-background-clip: text;
  color: transparent;
}
.border-jianbian{
  /* border-image: linear-gradient(to bottom, #071530,#00c3ff, #071530) 0 1 0 0 stretch; */
  background-image: url(./../../../assets/datascreen/qidong/new/img_right_line.png);
  background-repeat: no-repeat;
  background-position: right;
}
.xuxian{
  width: 100%;
  height: 1px;
  background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
  background-size: 40px 1px;
  background-repeat: repeat-x;
}
.jiaobiao{
    position:absolute;
    width: 10px;
    height: 10px;
    background: #00c3ff;
    top:-5px;
    left:-5px;
    transform:rotate(45deg);
}
.Divider{
  color:#02FFF1;
  font-size: 18px;
  margin: 15px 0px 0px 0px;
}
.Divider.ivu-divider-horizontal.ivu-divider-with-text-center:before,.Divider.ivu-divider-horizontal.ivu-divider-with-text-center:after{
  border-top:1px solid#2b9bd2;
}
.huodongpanel{
  height: calc(100% - 246px);
  width: 100%;
  overflow: hidden;
  /* background: #2a2f42; */
}
.huodongdiv{
  height: 33%;
  width: 100%;
  min-height: 49px;
  background-image: url(./../../../assets/datascreen/qidong/new/img_left_line.png);
  background-repeat: no-repeat;
  background-position: bottom;
}
.xiaqugaikuangdiv{
  width: 100%;
  height: calc(100% - 21px);
  /* background: #2a2f42; */
  overflow:hidden;
}
.tongzhititle{
  color: #FFE409;
  font-size: 16px;
  margin-bottom: 10px;
  padding-left: 10px;
  height:24px;
}
.tongzhicontent{
  color:white;
  font-size: 14px;
  height: calc(100% - 34px);
  /* background: #2a2f42; */
  padding: 10px;
}
.jqtitle{
  width: 100%;
  height:65px;
  /* background: #09254c; */
  margin-bottom: 10px;
}
.jqtb{
  width: 100%;
  height:88px;
  margin-bottom: 10px;
}
.jqchartpanel{
  width: 100%;
  position: relative;
  height: calc(100% - 55px - 75px - 98px);
}
.optionIcon{
  color: #0ccffd;
  font-size:18px;
  position:absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.ModalClass >>> .ivu-modal-content{
  border: rgb(91, 107, 114) 1px solid;
}
 .tabs{
  border: 1px solid rgb(91, 107, 114);
  height: calc(100% - 45px);
}
.tabs >>> .el-tabs__content{
  background-color:rgba(0, 0, 0, 0.95);
  height:calc(100% - 40px);
}

.tabs >>> .el-tabs__nav-scroll{
  background-color: #262b2e;
  border-bottom: 1px solid rgb(91, 107, 114);
}
.tabs >>> .el-tabs__item{
  border: 1px solid rgb(91, 107, 114);
  color: white;
} 

.tabs >>> .el-tabs__item.is-active{
  background-color: #515a6e;
  border-left: 1px solid rgb(91, 107, 114);
  border-right: 1px solid rgb(91, 107, 114);
} 
.tabs_pane{
  height: 100%;
}
.inputClass{
    width: 200px;
    height: 30px;
    background-color:rgba(0, 0, 0, 0);
    color: white;
    border: 1px solid #5b6b72;
    border-radius: 5px;
    margin-left:15px;
}
.numberFomat{
  font-family: "Digitalt";
}
.leftpannel{
  width: 350px;
  height: 97%;
  z-index: 5;
  float: left;
  transform: perspective(0.99em) rotatey(0.24deg) translate(3.5%);
}
.rightpannel{
  position: absolute;
  width: 350px;
  height: 97%;
  z-index: 5;
  right: 0px;
  transform: perspective(0.99em) rotatey(-0.24deg) translate(-4.5%);
}
.bottom_bg{
  width: 100%;
  height: 110px;
  position: absolute;
  bottom: -14px;
}
.centermap_bg{
  width: 990px;
  height: 485px;
  position: absolute;
  left: calc(50% - 495px);
  top: calc(50% - 300px);
}
.mapdeptname{
  background:url(./../../../assets/datascreen/qidong/new/imgbg_jb.png) no-repeat;
  background-size:100% 100%;
}
.maptc{
  width: 29px;
  height: 42px;
  background:url(./../../../assets/datascreen/qidong/new/map_zhiyin.png) no-repeat;
  background-size:100% 100%;
  padding: 5px;
}
.xianqi{
  position: absolute;
  top: -58px;
  left: calc(50% - 475px);
}
.timeclass{
  position: absolute;
  top: 10px;
  width: 152px;
  height: 50px;
  color: #02FFF1;
  font-size: 30px;
  font-family: "Digitalt";
  left: calc(50% - 76px);
}
</style>
