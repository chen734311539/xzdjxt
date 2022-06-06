<template>
 <div class="jqtjRightPanel">
       <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
            <div class="headerPanel">
              <div class="header">开始时间</div>
              <el-date-picker v-model="starttime"  type="datetime" placeholder="选择起始时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              <div class="header">结束时间</div>
              <el-date-picker v-model="endtime"   type="datetime" placeholder="选择结束时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              <div class="header">警情类别</div>
              <select v-model="jqlbcode" style="width:85px;">
                  <option value="">请选择</option>
                  <option :value="jjlbObj.code" v-for="jjlbObj in jjlbcodeList" :key="jjlbObj.code">{{jjlbObj.name}}</option>
              </select>
               <div class="header">是否可视化</div>
              <select v-model="isksh" style="width:85px;">
                  <option value="">请选择</option>
                  <option value="1">是</option>
                  <option value="2">否</option>
                  <option value="0">未知</option>   
              </Select>
              <div class="header_button">
                <!-- <Button type="primary" style="margin-left: 5px;" size="small" @click="searchJqtj">查询</Button>
                <Button type="primary" style="margin-left: 5px;" size="small" @click="downloadJqtj">下载excel</Button> -->
                <HfxButton style="margin-left:5px;"  @click="searchJqtj" name="查询" />
                <HfxButton style="margin-left:5px;" @click="downloadJqtj" name="下载excel" :width=70 />
              </div>
            </div>
            <div class="contentPanel">
              <HfxTable ref="table" :data="jqtjList" :columns="columns"  class="tableclass" :stripe="true" >
                <template #formartgxdw="{row,index}">
                  <span  :title="[row.gxdwmc]">{{common.cutstr(row.gxdwmc,16)}}</span>
                </template>
                <template #formartafdd="{row,index}">
                  <span  :title="[row.afdd]">{{common.cutstr(row.afdd,24)}}</span>
                </template>
                <template #formartbjnr="{row,index}">
                  <span  :title="[row.bjnr]">{{common.cutstr(row.bjnr,60)}}</span>
                </template>
                <template #caozuo="{row,index}">
                    <div class="tablebutton">
                      <HfxButton @click="register(index)" name="登记" />
                      <HfxButton @click="showJqInfo(index)" name="详情" />
                    </div>
                </template>
              </HfxTable>
            </div>
            <PagerNew class="pagePanel" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>

            <Modal v-model="showRegister" :draggable = "true" title="可视化指挥" class-name="register-panel">
              <div slot="close"><div class="hfx-modal-close"/></div>
              <div class="registerPanel">
                <div class="modal-div">
                  <span class="detailsspan">执法记录仪：</span>
                  <input style="width: 250px;" class="inputclass" v-model="reg_zfy_name" readonly/>
                  <Poptip v-model="showZfys" ref="pop" placement="right" width="420" zIndex="2000" class="selectdeptsGroupPoptip" title="选择执法仪" >
                    <!-- <Button  type="primary" size="small">选择执法仪</Button> -->
                    <HfxButton name="选择执法仪" :width=75 :height=22 />
                      <div slot="title">选择执法仪</div>
                      <div slot="content" style="height:370px;">
                        <ItemTransfer v-if="showzfyspjkdata" @on-change="zfysTransferChange" :all-items="zfydata" ref="zfyTransfer" />
                        <div style="width:98%;text-align:end;">
                          <input style="width:205px;" class="inputclass" v-model="reg_zfy_add"/>
                          <!-- <Button type="primary" @click="addZfys" size="small">手动增加</Button>
                          <Button type="primary" @click="clearZfys" size="small">清除</Button>
                          <Button type="primary" @click="closeZfys" size="small">关闭</Button> -->
                          <HfxButton @click="addZfys" name="手动增加" :width=58 :height=22 />
                          <HfxButton @click="clearZfys" name="清除" :width=42 :height=22 />                 
                          <HfxButton @click="closeZfys" name="关闭" :width=42 :height=22 />    
                        </div>
                      </div>
                  </Poptip>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">佩戴人：</span>
                  <input style="width: 250px;" class="inputclass" v-model="reg_pdr_name" readonly/>
                  <Poptip v-model="showPdrs" ref="pop" placement="right" width="420" zIndex="2000" class="selectdeptsGroupPoptip" title="选择佩戴人" >
                    <!-- <Button  type="primary" size="small">选择佩戴人</Button> -->
                    <HfxButton name="选择佩戴人" :width=75 :height=22 />
                      <div slot="title">选择佩戴人</div>
                      <div slot="content" style="height:370px;">
                        <UserTransfer @on-change="pdrsTransferChange" ref="pdrTransfer" />
                          <div style="width:98%;text-align:end;">
                            <input style="width:205px;" class="inputclass" v-model="reg_pdr_add"/>
                            <!-- <Button type="primary" @click="addPdrs" size="small">手动增加</Button>
                            <Button type="primary" @click="clearPdrs" size="small">清除</Button>
                            <Button type="primary" @click="closePdrs" size="small">关闭</Button> -->
                          <HfxButton @click="addPdrs" name="手动增加" :width=58 :height=22 />
                          <HfxButton @click="clearPdrs" name="清除" :width=42 :height=22 />                 
                          <HfxButton @click="closePdrs" name="关闭" :width=42 :height=22 />               
                          </div>
                      </div>
                  </Poptip>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">调度周边监控名称：</span>
                  <Input  class="messageInput" v-model="reg_spjk_name"  type="textarea" :autosize="true" readonly="readonly"/> 
                  <Poptip v-model="showSpjks" ref="pop" placement="right" width="420" zIndex="2000" class="selectdeptsGroupPoptip" title="选择监控" >
                    <!-- <Button  type="primary" size="small">选择监控</Button> -->
                    <HfxButton name="选择监控" :width=75 :height=22 />
                      <div slot="title">选择监控</div>
                      <div slot="content" style="height:370px;">
                        <ItemTransfer v-if="showzfyspjkdata" @on-change="spjksTransferChange" :all-items="spjkdata" ref="spjkTransfer"/>
                        <div style="width:98%;text-align:end;">
                          <input style="width:205px;" class="inputclass" v-model="reg_spjk_add"/>
                          <!-- <Button type="primary" @click="addSpjks" size="small">手动增加</Button>
                          <Button type="primary" @click="clearSpjks" size="small">清除</Button>
                          <Button type="primary" @click="closeSpjks" size="small">关闭</Button>   -->
                          <HfxButton @click="addSpjks" name="手动增加" :width=58 :height=22 />
                          <HfxButton @click="clearSpjks" name="清除" :width=42 :height=22 />                 
                          <HfxButton @click="closeSpjks" name="关闭" :width=42 :height=22 />        
                        </div>
                      </div>
                  </Poptip>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">调度周边监控时间：</span>
                  <el-date-picker v-model="reg_ddjksj"   type="datetime" placeholder="选择时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">登记人：</span>
                  <input style="width: 250px;" class="inputclass" v-model="reg_djr_name" readonly />
                  <Poptip v-model="showDjrs" ref="pop" placement="right" width="420" zIndex="2000" class="selectdeptsGroupPoptip" title="选择登记人" >
                    <!-- <Button  type="primary" size="small">选择登记人</Button> -->
                    <HfxButton name="选择登记人" :width=75 :height=22 />
                      <div slot="title">选择登记人</div>
                      <div slot="content" style="height:370px;">
                        <UserTransfer @on-change="djrsTransferChange" ref="djrTransfer" />
                          <div style="width:98%;text-align:end;">
                            <input style="width:205px;" class="inputclass" v-model="reg_djr_add"/>
                            <!-- <Button type="primary" @click="addDjrs" size="small">手动增加</Button>
                            <Button type="primary" @click="clearDjrs" size="small">清除</Button>
                            <Button type="primary" @click="closeDjrs" size="small">关闭</Button>  -->
                            <HfxButton @click="addDjrs" name="手动增加" :width=58 :height=22 />
                            <HfxButton @click="clearDjrs" name="清除" :width=42 :height=22 />                 
                            <HfxButton @click="closeDjrs" name="关闭" :width=42 :height=22 />             
                          </div>
                      </div>
                  </Poptip>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">情况说明：</span>
                  <Input  class="messageInput" v-model="reg_qksm" type="textarea" :autosize="true"/>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">是否可视：</span>
                  <select v-model="reg_isksh"  class="inputclass2" style="width:250px;">
                    <option value="">请选择</option>
                    <option value="1">是</option>
                    <option value="2">否</option>
                    <option value="0">未知</option>   
                  </select>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">是否有现场：</span>
                  <select v-model="reg_ishasxc"  class="inputclass2" style="width:250px;">
                    <option value="">请选择</option>
                    <option value="1">是</option>
                    <option value="2">否</option>
                    <option value="0">未知</option>   
                  </select>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">是否调度监控：</span>
                  <select v-model="reg_isddjk"  class="inputclass2" style="width:250px;">
                    <option value="">请选择</option>
                    <option value="1">是</option>
                    <option value="2">否</option>
                    <option value="0">未知</option>   
                  </select>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">是否正常开展可视化：</span>
                  <select v-model="reg_iszckz"  class="inputclass2" style="width:250px;">
                    <option value="">请选择</option>
                    <option value="1">是</option>
                    <option value="2">否</option>
                    <option value="0">未知</option>   
                  </select>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">证据上传是否规范：</span>
                  <select v-model="reg_isgf"  class="inputclass2" style="width:250px;">
                    <option value="">请选择</option>
                    <option value="1">是</option>
                    <option value="2">否</option>
                    <option value="0">未知</option>   
                  </select>
                </div>
              </div>
              <div slot="footer">
                <!-- <Button type="text" size="large" @click="cancelRegister">取消</Button>
                <Button type="primary" size="large" @click="submitRegister">登记</Button> -->
                <HfxButton @click="cancelRegister" name="取消" />
                <HfxButton @click="submitRegister" name="登记" />
              </div>
            </Modal>

            <Modal v-model="showDetails" :draggable = "true" title="详情" class-name="details-panel">
              <div slot="close"><div class="hfx-modal-close"/></div>
              <div class="detailsPanel">
                <div class="detailsLeftPanel">
                  <div class="modal-div">
                    <span class="detailsspan">序号：</span>
                    <input style="width: 150px;" class="inputclass" v-model="details.xh" readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">报警时间：</span>
                    <input style="width: 150px;" class="inputclass" v-model="details.bjsj" readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">警单编号：</span>
                    <input style="width: 150px;" class="inputclass" v-model="details.jjdbh" readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">报警类别：</span>
                    <input style="width: 150px;" class="inputclass" v-model="details.bjlbmc" readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">警情类型：</span>
                    <input style="width: 150px;" class="inputclass" v-model="details.bjlxmc" readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">反馈警情类别：</span>
                    <input style="width: 150px;" class="inputclass"  readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">反馈警情大类：</span>
                    <input style="width: 150px;" class="inputclass"  readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">是否可视化：</span>
                    <select v-model="details.isksh"  class="inputclass2" style="width:150px;" disabled="false">
                      <option value="">未填写</option>
                      <option value="1">是</option>
                      <option value="2">否</option>
                      <option value="0">未知</option>   
                    </select>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">是否正常开展可视化：</span>
                    <select v-model="details.iszckz"  class="inputclass2" style="width:150px;" disabled="false">
                      <option value="">未填写</option>
                      <option value="1">是</option>
                      <option value="2">否</option>
                      <option value="0">未知</option>   
                    </select>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">是否有现场：</span>
                    <select v-model="details.ishasxc"  class="inputclass2" style="width:150px;" disabled="false">
                      <option value="">未填写</option>
                      <option value="1">是</option>
                      <option value="2">否</option>
                      <option value="0">未知</option>
                    </select>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">是否调度监控：</span>
                    <select v-model="details.isddjk"  class="inputclass2" style="width:150px;" disabled="false">
                      <option value="">未填写</option>
                      <option value="1">是</option>
                      <option value="2">否</option>
                      <option value="0">未知</option>
                    </select>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">证据上传是否规范：</span>
                    <select v-model="details.isgf"  class="inputclass2" style="width:150px;" disabled="false">
                      <option value="">未填写</option>
                      <option value="1">是</option>
                      <option value="2">否</option>
                      <option value="0">未知</option>
                    </select>
                  </div> 
                </div>
                <div class="detailsRightPanel">
                  <div class="modal-div">
                    <span class="detailsspan">管辖单位：</span>
                    <input style="width: 250px;" class="inputclass" v-model="details.gxdwmc" readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">处警民警：</span>
                    <input style="width: 250px;" class="inputclass" v-model="details.cjyxm" readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">执法记录仪：</span>
                    <input style="width: 250px;" class="inputclass" v-model="details.zfyname" readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">佩戴人：</span>
                    <input style="width: 250px;" class="inputclass" v-model="details.pdrname" readonly/>
                  </div>
                   <div class="modal-div">
                    <span class="detailsspan">调度周边监控名称：</span>
                    <Input  class="detailsInput" v-model="details.spjkname"  type="textarea" :autosize="true" readonly="readonly"/> 
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">调度周边监控时间：</span>
                    <input style="width: 250px;" class="inputclass" v-model="details.ddjksj" readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">登记人：</span>
                    <input style="width: 250px;" class="inputclass" v-model="details.djrname" readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">警情地址：</span>
                    <input style="width: 250px;" class="inputclass" v-model="details.afdd" readonly/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">报警内容：</span>
                    <Input  class="detailsInput" v-model="details.bjnr"  type="textarea" :autosize="true" readonly="readonly"/> 
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">情况说明：</span>
                    <Input  class="detailsInput" v-model="details.qksm"  type="textarea" :autosize="true" readonly="readonly"/>
                  </div>
                </div>
              </div>
              <div slot="footer">
              </div>
            </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import PagerNew from '@/components/base/PagerNew'
import Constants from '@/constants/Constants'
import UserTransfer from '@/components/module/jqtj/UserTransfer'
import ItemTransfer from '@/components/module/jqtj/ItemTransfer'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import HfxTable from '@/components/base/HfxTable'
export default {
  name: 'JqbbRightPanel',
  components: {PagerNew,UserTransfer,ItemTransfer,LeftContentNameBar,HfxTable},
  data () {
    return {
        self: this,
        starttime:"",
        endtime:"", 
        jqlbcode:"",
        isksh:"",
        deptcode:"",
        jjlbcodeList:[],
        jqtjList:[],
        totalSize:0,
        pageSize:30,
        page:1,
        showRegister:false,
        reg_jqid:"",
        reg_jjdbh:"",
        reg_isksh:"",
        reg_ishasxc:"",
        reg_isddjk:"",
        reg_iszckz:"",
        reg_isgf:"",
        reg_zfy:[],
        reg_pdr:[],
        reg_spjk:[],
        reg_djr:[],
        reg_ddjksj:"",
        reg_qksm:"",
        reg_zfy_add:"",
        reg_pdr_add:"",
        reg_spjk_add:"",
        reg_djr_add:"",
        showPdrs:false,
        showDjrs:false,
        showSpjks:false,
        showZfys:false,
        zfydata:[],
        spjkdata:[],
        showzfyspjkdata:false,
        showDetails:false,
        details:{},
        columns: [
            {
              title: '序号',
              key: 'xh',
              width: 5,
            },
            {
              title: '报警时间',
              key: 'bjsj',
              width: 10,
            },
            {
              title: '警单编号',
              key: 'jjdbh',
              width: 10,
            },
            {
              title: '警情地址',
              key: 'afdd',
              width: 15,
              slot:'formartafdd',
              // render: (h, params) => {
              //   let texts = params.row.afdd;
              //   if (params.row.afdd != null) {
              //     if (params.row.afdd.length > 15) {
              //       texts = params.row.afdd.slice(0, 15) + '...'; // 进行数字截取
              //     } else {
              //       texts = params.row.afdd;
              //     }
              //   }
              //   return h('div', [h('Tooltip', 
              //     {
              //       props: {placement: 'top',transfer: true}
              //     }, 
              //     [texts, h('span', {slot: 'content',style: {whiteSpace: 'normal'}}, params.row.afdd)]
              //     )]
              //   );
              // }
            },
            {
                title: '报警内容',
                key: 'bjnr',
                width: 30,
                slot:'formartbjnr',
              //   render: (h, params) => {
              //     let texts = params.row.bjnr;
              //     if (params.row.bjnr != null) {
              //       if (params.row.bjnr.length > 20) {
              //         texts = params.row.bjnr.slice(0, 20) + '...'; // 进行数字截取
              //       } else {
              //         texts = params.row.bjnr;
              //       }
              //     }
              //     return h('div', [h('Tooltip', 
              //       {
              //         props: {placement: 'top',transfer: true}
              //       }, 
              //       [texts, h('span', {slot: 'content',style: {whiteSpace: 'normal'}}, params.row.bjnr)]
              //       )]
              //     );
              //  }
            },
            {
                title: '报警类别',
                key: 'bjlbmc',
                width: 8,
            },
            {
                title: '警情类型',
                key: 'bjlxmc',
                width: 8,
            },
            {
                title: '处警民警',
                key: 'cjyxm',
                width: 5,
              //   render: (h, params) => {
              //     let texts = params.row.cjyxm;
              //     if (params.row.cjyxm != null) {
              //       if (params.row.cjyxm.length > 5) {
              //         texts = params.row.cjyxm.slice(0, 5) + '...'; // 进行数字截取
              //       } else {
              //         texts = params.row.cjyxm;
              //       }
              //     }
              //     return h('div', [h('Tooltip', 
              //       {
              //         props: {placement: 'top',transfer: true}
              //       }, 
              //       [texts, h('span', {slot: 'content',style: {whiteSpace: 'normal'}}, params.row.cjyxm)]
              //       )]
              //     );
              //  }
            },
             {
                title: '管辖单位',
                key: 'gxdwmc',
                width: 10,
                slot:'formartgxdw',
              //   render: (h, params) => {
              //     let texts = params.row.gxdwmc;
              //     if (params.row.gxdwmc != null) {
              //       if (params.row.gxdwmc.length > 6) {
              //         texts = params.row.gxdwmc.slice(0, 6) + '...' // 进行数字截取
              //       } else {
              //         texts = params.row.gxdwmc
              //       }
              //     }
              //      return h('div', [h('Tooltip', 
              //       {
              //         props: {placement: 'top',transfer: true}
              //       }, 
              //       [texts, h('span', {slot: 'content',style: {whiteSpace: 'normal'}}, params.row.gxdwmc)]
              //       )]
              //     );
              //  }
            },
            {
                title: '操作',
                key: 'xh',
                width: 10,
                slot:"caozuo",
              //   render: (h, params) => {
              //      return h('div', [
              //        h('Button', 
              //         {
              //           props: {
              //             type:'primary',
              //             size:'small'
              //           },
              //           style:{
              //             'margin-right':'2px',
              //           },
              //           on: {
              //             click: () => {
              //               this.register(params.index);
              //             }
              //           }
              //         },'登记'),
              //         h('Button', 
              //         {
              //           props: {
              //             type:'primary',
              //             size:'small'
              //           },
              //           on: {
              //             click: () => {
              //               this.showJqInfo(params.index);
              //             }
              //           }
              //         },'详情')
              //     ]
              //     );
              //  }
            },
        ],
    }
  },
  computed: {...mapState({
    userInfo: state => state.userInfo,
    currentDept: state => state.jqtj.currentDept,
  }),
  reg_zfy_name:function(){
    var str="";
    if(this.reg_zfy.length==0){
    }else{
      for(var i=0;i<this.reg_zfy.length-1;i++){
        str+=this.reg_zfy[i].name+','
      }
      str+=this.reg_zfy[this.reg_zfy.length-1].name;
    }
    return str;
  },
    reg_pdr_name:function(){
    var str="";
    if(this.reg_pdr.length==0){
    }else{
      for(var i=0;i<this.reg_pdr.length-1;i++){
        str+=this.reg_pdr[i].name+','
      }
      str+=this.reg_pdr[this.reg_pdr.length-1].name;
    }
    return str;
  },
    reg_spjk_name:function(){
    var str="";
    if(this.reg_spjk.length==0){
    }else{
      for(var i=0;i<this.reg_spjk.length-1;i++){
        str+=this.reg_spjk[i].name+','
      }
      str+=this.reg_spjk[this.reg_spjk.length-1].name;
    }
    return str;
  },
    reg_djr_name:function(){
    var str="";
    if(this.reg_djr.length==0){
    }else{
      for(var i=0;i<this.reg_djr.length-1;i++){
        str+=this.reg_djr[i].name+','
      }
      str+=this.reg_djr[this.reg_djr.length-1].name;
    }
    return str;
  },
  },
  methods:{
    textFun(index,row){
      alert("111");
      console.log(index);
      console.log(row);
    },
      pageChange(page){
        this.page = page;
        this.searchJqtj();
      },
      register(index){
        var data=this.jqtjList[index];
        this.reg_jqid=data.id;
        this.reg_jjdbh=data.jjdbh;
        //获取info
        var paramObj={};
        paramObj.jqid=this.reg_jqid;
        this.http.get("/jqtj/getKshInfo",paramObj,this.getKshInfoCallBack,this,false);
        //根据警情管辖单位及坐标获取可选择的执法仪和视频监控 
        var zfyspjkObj={};
        zfyspjkObj.deptcode=data.gxdwdm;
        zfyspjkObj.x=data.xpos;
        zfyspjkObj.y=data.ypos;
        //取消加载执法仪和视频监控数据
        this.showzfyspjkdata=false;
        this.http.get("/jqtj/getZfySpjkInfo",zfyspjkObj,this.getZfySpjkInfoCallBack,this,false); 
      },
      clearRegister(){
        this.reg_isksh="";
        this.reg_ishasxc="";
        this.reg_isddjk="";
        this.reg_iszckz="";
        this.reg_isgf="";
        this.reg_ddjksj="";
        this.reg_qksm="";
        this.reg_zfy=[];
        this.reg_pdr=[];
        this.reg_spjk=[];
        this.reg_djr=[];
      },
      getKshInfoCallBack(data){
        this.clearRegister();
        this.reg_isksh=data.ksh.isksh;
        this.reg_ishasxc=data.ksh.ishasxc;
        this.reg_isddjk=data.ksh.isddjk;
        this.reg_iszckz=data.ksh.iszckz;
        this.reg_isgf=data.ksh.isgf;
        this.reg_ddjksj=data.ksh.ddjksj;
        this.reg_qksm=data.ksh.qksm;
        if(data.kshinfo.length!==0){
          for(let i=0;i<data.kshinfo.length;i++){
            if(data.kshinfo[i].type=='zfy'){
              this.reg_zfy.push(data.kshinfo[i]);
            }else if(data.kshinfo[i].type=='pdr'){
              this.reg_pdr.push(data.kshinfo[i]);
            }else if(data.kshinfo[i].type=='spjk'){
              this.reg_spjk.push(data.kshinfo[i]);
            }else if(data.kshinfo[i].type=='djr'){
            this.reg_djr.push(data.kshinfo[i]);
            }
          }
        }
        this.showRegister=true;
      },
      getZfySpjkInfoCallBack(data){
        this.zfydata=data.zfys;
        this.spjkdata=data.spjks;
        //加载执法仪和视频监控数据
        this.showzfyspjkdata=true;
      },
      cancelRegister(){
        this.showRegister=false;
      },
      submitRegister(){
        var paramObj={};
        paramObj.jqid=this.reg_jqid;
        paramObj.jjdbh=this.reg_jjdbh;
        paramObj.isksh=this.reg_isksh;
        paramObj.ishasxc=this.reg_ishasxc;
        paramObj.isddjk=this.reg_isddjk;
        paramObj.iszckz=this.reg_iszckz;
        paramObj.isgf=this.reg_isgf;
        paramObj.ddjksj=this.reg_ddjksj;
        paramObj.qksm=this.reg_qksm;
        paramObj.zfy=JSON.stringify(this.reg_zfy);
        paramObj.pdr=JSON.stringify(this.reg_pdr);
        paramObj.spjk=JSON.stringify(this.reg_spjk);
        paramObj.djr=JSON.stringify(this.reg_djr);
        this.http.get("/jqtj/addKshInfo",paramObj,this.addKshInfoCallBack,this,false);
      },
      addKshInfoCallBack(data){
        this.searchJqtj();
        this.$Message.success("登记成功");
        this.showRegister=false;
      },
      searchJqtj(){
        var paramObj={};
        if(this.deptcode==null||this.deptcode==""){
          this.$Message.error("请选择部门");
          return;
        }
        paramObj.deptcode=this.deptcode;
        if(this.starttime==null||this.starttime==""){
          this.$Message.error("请选择起始时间");
          return;
        }
        paramObj.starttime=this.starttime;
        if(this.endtime==null||this.endtime==""){
          this.$Message.error("请选择结束时间");
          return;
        }
        paramObj.endtime=this.endtime;
        paramObj.jqlbcode=this.jqlbcode;
        paramObj.isksh=this.isksh;
        paramObj.pagesize=this.pageSize;
        paramObj.page=this.page;
        this.http.get("/jqtj/getJqtjForm",paramObj,this.getJqtjFormCallBack,this,false);
      },
      getJqtjFormCallBack(data){
        this.jqtjList=data.data;
        this.totalSize=data.count;
      },
      downloadJqtj(){
        var paramObj={};
        if(this.deptcode==null||this.deptcode==""){
          this.$Message.error("请选择部门");
          return;
        }
        paramObj.deptcode=this.deptcode;
        if(this.starttime==null||this.starttime==""){
          this.$Message.error("请选择起始时间");
          return;
        }
        paramObj.starttime=this.starttime;
        if(this.endtime==null||this.endtime==""){
          this.$Message.error("请选择结束时间");
          return;
        }
        paramObj.endtime=this.endtime;
        paramObj.jqlbcode=this.jqlbcode;
        paramObj.isksh=this.isksh;
        paramObj.pagesize=this.pageSize;
        paramObj.page=this.page;
        this.http.download("/jqtj/downloadexcelJqtjForm",paramObj);
      },
      formartDate(time) {
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
      },
      add0(m){
        return m<10?'0'+m:m;
      },
      getSsjqLbCallBack(data){
        this.jjlbcodeList = data;
      },
      pdrsTransferChange(userList){
        var arr=[];
        for(var i=0;i<userList.length;i++){
          var user={};
          user.code=userList[i].usercode;
          user.name=userList[i].username;
          arr.push(user);
        }
        this.reg_pdr = arr;
      },
      addPdrs(){
        this.$refs.pdrTransfer.addUser(this.reg_pdr_add);
        this.reg_pdr_add="";
      },
      clearPdrs(){
        this.$refs.pdrTransfer.clearSelectUsers();
      },
      closePdrs(){
        this.showPdrs = false;
      },
      djrsTransferChange(userList){
        var arr=[];
        for(var i=0;i<userList.length;i++){
          var user={};
          user.code=userList[i].usercode;
          user.name=userList[i].username;
          arr.push(user);
        }
        this.reg_djr = arr;
      },
      addDjrs(){
        this.$refs.djrTransfer.addUser(this.reg_djr_add);
        this.reg_djr_add="";
      },
      clearDjrs(){
        this.$refs.djrTransfer.clearSelectUsers();
      },
      closeDjrs(){
        this.showDjrs = false;
      },
      zfysTransferChange(userList){
        var arr=[];
        for(var i=0;i<userList.length;i++){
          var user={};
          user.code=userList[i].code;
          user.name=userList[i].name;
          arr.push(user);
        }
        this.reg_zfy = arr;
      },
      addZfys(){
        this.$refs.zfyTransfer.addItem(this.reg_zfy_add);
        this.reg_zfy_add="";
      },
      clearZfys(){
         this.$refs.zfyTransfer.clearSelectItems();
      },
      closeZfys(){
        this.showZfys = false;
      },
      spjksTransferChange(userList){
        var arr=[];
        for(var i=0;i<userList.length;i++){
          var user={};
          user.code=userList[i].code;
          user.name=userList[i].name;
          arr.push(user);
        }
        this.reg_spjk = arr;
      },
      addSpjks(){
        this.$refs.spjkTransfer.addItem(this.reg_spjk_add);
        this.reg_spjk_add="";
      },
      clearSpjks(){
         this.$refs.spjkTransfer.clearSelectItems();
      },
      closeSpjks(){
        this.showSpjks = false;
      },
      showJqInfo(index){
        this.details=this.jqtjList[index];
        this.showDetails=true;
      }
  },
  created(){
    //获取警情类别
    this.http.get("/ssjq/getSsjqLb",null,this.getSsjqLbCallBack,this,false);
    //默认当前时间前一天
    this.endtime=this.formartDate(new Date());
    this.starttime=this.formartDate(new Date(new Date().setDate(new Date().getDate()-1)));
    //测试用数据
    //this.endtime=this.formartDate(new Date("2019-03-31 08:24:30"));
    //this.starttime=this.formartDate(new Date("2019-03-01 08:24:30"));
    this.deptcode=this.userInfo.directdeptcode;
    this.searchJqtj();
  },
  watch : {
      currentDept:function(val) {
        this.deptcode = val.deptcode;
        this.searchJqtj();
      },
  }
}
</script>

<style scoped>
.jqtjRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
  padding: 4px;
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
.header_button{
  padding:20px;
}
.modal-div{
  margin: 0 0 10px 0;
}
.inputclass{
  width:100px;
  height: 24px;
  padding: 0 10px;
  outline: none;
  color: white;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.inputclass2{
  width: 140px;
  height: 24px;
  outline: none;
  color: white;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.detailsspan{
  margin-right:8px;
}
.modal-div span{
    float: left;
    width: 120px;
    text-align: right;
    margin-right: 10px;
}
.contentPanel{
  height: calc(100% - 120px);
  width: 100%;
  overflow: auto;
}
.tableclass{
  height : 100%;
}
.pagePanel{
  position: absolute;
  bottom: 0px;
  left: calc(50% - 125px);
  height: 25px;
  line-height: 25px;
  text-align:center;
}
.messageInput{
  width:250px;
}
.messageInput >>> textarea{
  width: 250px;
  min-height: 26px;
  font-size: 12px;
  color: white;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.detailsInput{
  width:250px;
}
.detailsInput >>> textarea{
  width: 250px;
  min-height: 48px;
  font-size: 12px;
  color: white;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-popper{
  z-index: 2000;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-inner{
  background-color: rgba(8, 56, 90, 0.90);
  box-shadow: 0 0 3px 0 #1234ac;
}
.selectdeptsGroupPoptip >>> .ivu-poptip-arrow:after{
  border-left-color:rgba(14, 31, 98, 0.90)
}
.detailsPanel{
  display: flex;
}
.detailsLeftPanel{
  width:43%;
}
.detailsRightPanel{
  width:57%;
}
.date-picker{
  width: 180px !important;
  height: 28px !important;
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
.tablebutton{
  line-height: 26px;
  margin: 4px 0 0 0;
}
</style>
<style>
.register-panel .ivu-modal .ivu-modal-content{
  top:200px;
  left: 750px;
  width: 500px !important;
}
.details-panel .ivu-modal .ivu-modal-content{
  top:200px;
  left: 750px;
  width: 720px !important;
}
</style>

