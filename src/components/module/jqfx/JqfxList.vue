<template>
    <div class="jqfxListPanel">
        <div class="headerPanel">
            <div class="header2">警情类别</div>
            <select v-model="jqlbcode" style="width:85px;" @on-change="searchJq">
                  <option value="">请选择</option>
                  <option :value="jjlbObj.code" v-for="jjlbObj in jjlbList" :key="jjlbObj.code">{{jjlbObj.name}}</option>
            </select>
            <div class="header2">警情状态</div>
            <Select v-model="state" style="width:100px;" @on-change="searchJq">
              <Option value="">请选择</Option>
              <Option value="jqbq">警情标签</Option>
              <Option value="sjry">涉警人员</Option>
              <Option value="rybq">人员标签</Option>
            </Select>
            <div class="header2">开始时间</div>
            <el-date-picker v-model="starttime" @change="searchJq" style="width:173px;" type="datetime" placeholder="选择起始时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <div class="header2">结束时间</div>
            <el-date-picker v-model="endtime" @change="searchJq" style="width:173px;" type="datetime" placeholder="选择结束时间" size="mini" class="date-picker" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <div class="header2">关键字</div>
            <InputSearchNew class="seachbar_InputSearch" @on-click="searchJq" v-model="name"/>
            <HfxButton style="margin-left: 5px;" @click="clearSearch" name="重置" />
            <Button type="info" size="small" style="margin-left: 5px;" @click="showJqbqInfo">标签管理</Button>
        </div>
        <div class="contentPanel">
          <HfxTable ref="table" :data="jqList" :columns="columns"  class="tableclass" :stripe="true">
            <!-- <template #formartjjdw="{row,index}">
                  <span  :title="[row.gxdwmc]">{{common.cutstr(row.gxdwmc,16)}}</span>
            </template>
            <template #formartafdd="{row,index}">
                  <span  :title="[row.afdd]">{{common.cutstr(row.afdd,30)}}</span>
            </template>
            <template #formartbjnr="{row,index}">
                  <span  :title="[row.bjnr]">{{common.cutstr(row.bjnr,60)}}</span>
            </template> -->
            <template #option="{row,index}">
                <Button size="small" type="warning" @click="showoOption(row)">警情标签</Button>
                <Button size="small" type="success" @click="showSjry(row)">涉警人员</Button>
                <Button size="small" type="info" @click="showoRybqOption(row)">人员标签</Button>
            </template>
          </HfxTable>
        </div>
        <PagerNew class="pagePanel" :totalSize="totalSize" :pageSize="pageSize" @on-change="pageChange" :nowPage="page"/>
        <!-- 警情标签管理页面 -->
        <Modal v-model="showJqbq" :footer-hide="false" title="标签管理页" class-name="jqbq_panel">
            <div slot="close"><div class="hfx-modal-close"/></div>
            <div style="width:100%;height:500px;">
              <div style="width:100%;height:30px;line-height:30px;">警情标签管理</div>
              <div style="width:100%;height:calc(50% - 30px);" class="flexr">
                <div style="width:33%;height:100%;text-align:center;padding:0 5px;">
                  <div style="width:100%;height:30px;line-height:30px;">一级标签</div>
                  <div style="width:100%;height:calc(100% - 60px);overflow-y: auto;">
                    <div v-for="item in jqbqonelist" :key="item.code" :class="[selectjqbq1==item.code?'bqtext_click':'bqtext']"
                         @click="clickjqbq(item,2)">{{item.name}}<span @click="deletejqbq(item)">删除</span></div>
                  </div>
                  <div style="width:100%;height:30px;" class="flexr">
                    <Input size="small" v-model="jqbq1"/>
                    <Button size="small" type="warning" @click="saveAlarmJqbq(1)">添加</Button>
                  </div>
                </div>
                <div style="width:33%;height:100%;text-align:center;padding:0 5px;">
                  <div style="width:100%;height:30px;line-height:30px;">二级标签</div>
                  <div style="width:100%;height:calc(100% - 60px);overflow-y: auto;">
                      <div v-for="item in jqbqtwolist" :key="item.code" :class="[selectjqbq2==item.code?'bqtext_click':'bqtext']"
                           @click="clickjqbq(item,3)">{{item.name}}<span @click="deletejqbq(item)">删除</span></div>
                  </div>
                  <div style="width:100%;height:30px;" class="flexr">
                    <Input size="small" v-model="jqbq2"/>
                    <Button size="small" type="warning" @click="saveAlarmJqbq(2)">添加</Button>
                  </div>
                </div>
                <div style="width:33%;height:100%;text-align:center;padding:0 5px;">
                  <div style="width:100%;height:30px;line-height:30px;">三级标签</div>
                  <div style="width:100%;height:calc(100% - 60px);overflow-y: auto;">
                      <div v-for="item in jqbqthreelist" :key="item.code" class="bqtext">{{item.name}}<span @click="deletejqbq(item)">删除</span></div>
                  </div>
                  <div style="width:100%;height:30px;" class="flexr">
                    <Input size="small" v-model="jqbq3"/>
                    <Button size="small" type="warning" @click="saveAlarmJqbq(3)">添加</Button>
                  </div>
                </div>
              </div>
              <div style="width:100%;height:30px;line-height:30px;">人员标签管理</div>
              <div style="width:100%;height:calc(50% - 30px);" class="flexr">
                <div style="width:50%;height:100%;text-align:center;padding:0 5px;">
                  <div style="width:100%;height:30px;line-height:30px;">一级标签</div>
                  <div style="width:100%;height:calc(100% - 60px);overflow-y: auto;">
                    <div v-for="item in rybqonelist" :key="item.code" :class="[selectrybq1==item.code?'bqtext_click':'bqtext']"
                         @click="clickrybq(item,2)">{{item.name}}<span @click="deleterybq(item)">删除</span></div>
                  </div>
                  <div style="width:100%;height:30px;" class="flexr">
                    <Input size="small" v-model="rybq1"/>
                    <Button size="small" type="warning" @click="saveAlarmRybq(1)">添加</Button>
                  </div>
                </div>
                <div style="width:50%;height:100%;text-align:center;padding:0 5px;">
                  <div style="width:100%;height:30px;line-height:30px;">二级标签</div>
                  <div style="width:100%;height:calc(100% - 60px);overflow-y: auto;">
                      <div v-for="item in rybqtwolist" :key="item.code" class="bqtext">{{item.name}}<span @click="deleterybq(item)">删除</span></div>
                  </div>
                  <div style="width:100%;height:30px;" class="flexr">
                    <Input size="small" v-model="rybq2"/>
                    <Button size="small" type="warning" @click="saveAlarmRybq(2)">添加</Button>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer">
            </div>
          </Modal>
          <!-- 设置警情标签页 -->
          <Modal v-model="showBqOption" :footer-hide="false" title="设置警情标签页" class-name="jqbq_panel">
            <div slot="close"><div class="hfx-modal-close"/></div>
            <div style="width:100%;height:500px;">
              <div style="width:100%;height:40%;">
                 <div style="margin-bottom:15px;">选择标签</div>
                 <div class="modal-div">
                  <span class="detailsspan">警情标签一级：</span>
                  <Select class="inputclass2" style="width:300px;" :label-in-value="true" v-model="addjqbqcode1" @on-change="clickOption($event,1)">
                    <Option value="">请选择</Option>
                    <Option v-for="item in jqbqonelist" :key="item.code" :value="item.code">{{item.name}}</Option>
                  </Select>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">警情标签二级：</span>
                  <Select class="inputclass2" style="width:300px;" :label-in-value="true" v-model="addjqbqcode2" @on-change="clickOption($event,2)">
                    <Option v-for="item in jqbqtwolist" :key="item.code" :value="item.code">{{item.name}}</Option> 
                  </Select>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">警情标签三级：</span>
                  <Select class="inputclass2" style="width:300px;" :label-in-value="true" v-model="addjqbqcode3" @on-change="clickOption($event,3)">
                    <Option v-for="item in jqbqthreelist" :key="item.code" :value="item.code">{{item.name}}</Option>  
                  </Select>
                </div>
                <div class="modal-div" style="margin: 20px 0 20px 0;">
                  <Button type="info" size="small" style="position: relative;left: 28%;" @click="addJqbqByAlarmid">添加标签</Button>
                </div>
              </div>
              <div style="width:100%;height:60%;">
                 <div style="height:40px;line-height:40px;">已添加标签</div>
                 <div class="flexr" style="height:30px;width:100%;background: #2979cd;text-align: center;">
                    <div style="width:33%;">一级标签</div>
                    <div style="width:33%;">二级标签</div>
                    <div style="width:33%;">三级标签</div>
                 </div>
                 <div v-for="item in alarmjqbqlist" :key="item.jqbqcode3" class="bqrow flexr">
                    <div style="width:33%;">{{item.jqbqname1}}</div>
                    <div style="width:33%;">{{item.jqbqname2}}</div>
                    <div style="width:33%;">{{item.jqbqname3}}<span @click="deleteJqbqByAlarmid(item)">删除</span></div>
                 </div>
              </div>
            </div>
            <div slot="footer">
            </div>
          </Modal>
          <!-- 添加涉警人员页 -->
          <Modal v-model="showSjryOption" :footer-hide="false" title="添加涉警人员页" class-name="jqbq_panel">
            <div slot="close"><div class="hfx-modal-close"/></div>
            <div style="width:100%;height:500px;">
              <div style="width:100%;height:70%;">
                  <div style="margin-bottom:15px;">填写人员信息</div>
                  <div class="modal-div">
                    <span class="detailsspan">警情编号：</span>
                    <input class="inputclass" v-model="selectjqobj.jjdbh"/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">姓名：</span>
                    <input class="inputclass" v-model="sjry_xm"/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">性别：</span>
                    <Select class="inputclass2" style="width:300px;" v-model="sjry_xb">
                      <Option value="男">男</Option>  
                      <Option value="女">女</Option>  
                      <Option value="未知">未知</Option>
                    </Select>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">身份证号：</span>
                    <input class="inputclass" v-model="sjry_sfzh"/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">联系电话：</span>
                    <input class="inputclass" v-model="sjry_lxdh"/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">现住地：</span>
                    <input class="inputclass" v-model="sjry_xzd"/>
                  </div>
                  <div class="modal-div">
                    <span class="detailsspan">户籍地：</span>
                    <input class="inputclass" v-model="sjry_hjd"/>
                  </div>
                  <div class="modal-div" style="margin: 20px 0 20px 0;">
                    <Button type="info" size="small" style="position: relative;left: 28%;" @click="addSjryByAlarmid">添加人员</Button>
                  </div>
              </div>
              <div style="width:100%;height:30%;">
                 <div style="height:40px;line-height:40px;">已添加人员</div>
                 <div class="flexr" style="height:30px;width:100%;background: #2979cd;text-align: center;">
                    <div style="width:10%;">姓名</div>
                    <div style="width:10%;">性别</div>
                    <div style="width:30%;">身份证号</div>
                    <div style="width:20%;">联系电话</div>
                    <div style="width:30%;">人员标签</div>
                 </div>
                 <div v-for="item in alarmsjrylist" :key="item.ryid" class="bqrow flexr">
                    <div style="width:10%;">{{item.xm}}</div>
                    <div style="width:10%;">{{item.xb}}</div>
                    <div style="width:30%;">{{item.sfzh}}</div>
                    <div style="width:20%;">{{item.lxdh}}</div>
                    <div style="width:30%;">{{item.rybq}}<span @click="deleteSjryByRyid(item)">删除</span></div>
                 </div>
              </div>
            </div>
            <div slot="footer">
            </div>
          </Modal>
          <!-- 人员标签添加页 -->
          <Modal v-model="showRybqOption" :footer-hide="false" title="设置人员标签页" class-name="jqbq_panel">
            <div slot="close"><div class="hfx-modal-close"/></div>
            <div style="width:100%;height:500px;">
              <div style="width:100%;height:37%;">
                 <div style="height:40px;line-height:40px;">涉警人员</div>
                 <div class="flexr" style="height:30px;width:100%;background: #2979cd;text-align: center;">
                    <div style="width:10%;">姓名</div>
                    <div style="width:10%;">性别</div>
                    <div style="width:30%;">身份证号</div>
                    <div style="width:20%;">联系电话</div>
                    <div style="width:30%;">人员标签</div>
                 </div>
                 <div v-for="(item,index) in alarmsjrylist" :key="index" class="flexr" :class="[item.ryid==selectryid?'sjryrow_click':'sjryrow']" @click="chooseSjry(item)">
                    <div style="width:10%;">{{item.xm}}</div>
                    <div style="width:10%;">{{item.xb}}</div>
                    <div style="width:30%;">{{item.sfzh}}</div>
                    <div style="width:20%;">{{item.lxdh}}</div>
                    <div style="width:30%;">{{item.rybq}}<span @click="deleteSjryByRyid(item)">删除</span></div>
                 </div>
              </div>
              <div style="width:100%;height:30%;">
                 <div style="margin-bottom:15px;">选择标签（选择标签前请先选择要添加标签的涉警人员）</div>
                 <div class="modal-div">
                  <span class="detailsspan">人员标签一级：</span>
                  <Select class="inputclass2" style="width:300px;" :label-in-value="true" v-model="addrybqcode1" @on-change="clickSjrybqOption($event,1)">
                    <Option value="">请选择</Option>
                    <Option v-for="item in rybqonelist" :key="item.code" :value="item.code">{{item.name}}</Option>
                  </Select>
                </div>
                <div class="modal-div">
                  <span class="detailsspan">人员标签二级：</span>
                  <Select class="inputclass2" style="width:300px;" :label-in-value="true" v-model="addrybqcode2" @on-change="clickSjrybqOption($event,2)">
                    <Option v-for="item in rybqtwolist" :key="item.code" :value="item.code">{{item.name}}</Option> 
                  </Select>
                </div>
                <div class="modal-div" style="margin: 20px 0 20px 0;">
                  <Button type="info" size="small" style="position: relative;left: 28%;" @click="addSjrybqByRyid">添加标签</Button>
                </div>
              </div>
              <div style="width:100%;height:33%;">
                 <div style="height:40px;line-height:40px;">已添加标签</div>
                 <div class="flexr" style="height:30px;width:100%;background: #2979cd;text-align: center;">
                    <div style="width:50%;">一级标签</div>
                    <div style="width:50%;">二级标签</div>
                 </div>
                 <div v-for="item in alarmrybqlist" :key="item.jqbqcode3" class="bqrow flexr">
                    <div style="width:50%;">{{item.rybqname1}}</div>
                    <div style="width:50%;">{{item.rybqname2}}<span @click="deleteSjrybqByRyidAndBq(item)">删除</span></div>
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
import Constants from '@/constants/Constants'
import PagerNew from '@/components/base/PagerNew'
import InputSearchNew from '@/components/base/InputSearchNew'
import HfxTable from '@/components/base/HfxTable'

export default {
  name: 'JqfxList',
  components: {PagerNew,InputSearchNew,HfxTable},
  data () {
    return {
      showJqbq:false,
      starttime:"",
      endtime:"",
      jqlbcode:"",
      state:"",
      name:"",
      deptcode:"",
      columns: [
            {
                title: '序号',
                width:3,
                key: 'xh',
            },
            {
                title: '接警单编号',
                key: 'jjdbh',
                width:12,
            },
            {
                title: '接警单位',
                key: 'gxdwmc',
                width:12,
                // slot:'formartjjdw',
            },
            {
                title: '报警时间',
                key: 'bjsj',
                width:10,
            },
            {
                title: '报警电话',
                key: 'bjdh',
                width:8,
            },
            {
                title: '警情标签',
                key: 'jqbq',
                width:8,
            },
            {
                title: '涉警人员',
                key: 'sjry',
                width:8,
            },
            {
                title: '人员标签',
                key: 'rybq',
                width:8,
            },
            {
                title: '案发地点',
                key: 'afdd',
                width:12,
                // slot:'formartafdd',
            },
            {
                title: '报警内容',
                key: 'bjnr',
                width:14,
                // slot:'formartbjnr',
            },
            {
                title: '报警类别',
                key: 'bjlbmc',
                width:8,
            },
            {
                title: '操作',
                key: 'option',
                width:20,
                slot:'option',
            }
       ],
      jqList:[],
      totalSize:0,
      pageSize:40,
      page:1,
      jjlbList:[],

      jqbqonelist:[],//警情一级标签
      jqbqtwolist:[],//警情二级标签
      jqbqthreelist:[],//警情三级标签
      jqbq1:'',
      jqbq2:'',
      jqbq3:'',
      selectjqbq1:'',
      selectjqbq2:'',

      rybqonelist:[],
      rybqtwolist:[],
      rybq1:'',
      rybq2:'',
      selectrybq1:'',
      
      showBqOption:false,
      addjqbqcode1:'',
      addjqbqname1:'',
      addjqbqcode2:'',
      addjqbqname2:'',
      addjqbqcode3:'',
      addjqbqname3:'',
      selectalarmid:'',
      alarmjqbqlist:[],

      showSjryOption:false,
      selectjqobj:{},
      sjry_xm:'',
      sjry_xb:'',
      sjry_sfzh:'',
      sjry_lxdh:'',
      sjry_xzd:'',
      sjry_hjd:'',
      alarmsjrylist:[],

      showRybqOption:false,
      addrybqcode1:'',
      addrybqname1:'',
      addrybqcode2:'',
      addrybqname2:'',
      alarmrybqlist:[],
      selectryid:'',
    }
  },
  computed: mapState({
     userInfo:state => state.userInfo,
     currentDept: state => state.jqfx.currentDept,
  }),
  methods:{
      // 添加涉警人员标签部分方法
      showoRybqOption(obj){
        this.selectalarmid = obj.id;
        this.selectjqobj = obj;
        this.addrybqcode1 = "";
        this.addrybqname1 = "";
        this.addrybqcode2 = "";
        this.addrybqname2 = "";
        this.getSjryByAlarmid();
        this.showRybqOption = true;
      },
      chooseSjry(obj){
        this.selectryid = obj.ryid;
        this.getSjrybqByRyid();
      },
      getSjrybqByRyid(){
        this.http.get("/ssjq/getSjrybqByRyid",{ryid:this.selectryid},this.getSjrybqByRyidCallBack,this,false);
      },
      getSjrybqByRyidCallBack(data){
          this.alarmrybqlist = data;
      },
      addSjrybqByRyid(){
        if(!this.addrybqname2&&this.addrybqname2==''){
            this.$Message.error("必须选到第二级标签");
            return;
        }
        if(this.selectryid==''){
            this.$Message.error("参数不能为空");
            return;
        }
        var paramObj = {};
        paramObj.ryid = this.selectryid;
        paramObj.rybqcode1 = this.addrybqcode1;
        paramObj.rybqname1 = this.addrybqname1;
        paramObj.rybqcode2 = this.addrybqcode2;
        paramObj.rybqname2 = this.addrybqname2;
        this.http.get("/ssjq/addSjrybqByRyid",paramObj,this.addSjrybqByRyidCallBack,this,false);
      },
      addSjrybqByRyidCallBack(data){
        this.$Message.success(data);
        this.getSjrybqByRyid();
        this.searchJq();
      },
      deleteSjrybqByRyidAndBq(item){
        var h = this.$createElement;
        this.$msgbox({
          title: '信息提示',
          message: h('p', null, [
            h('span', null, '是删除此标签？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              this.http.get("/ssjq/deleteSjrybqByRyidAndBq",item,this.addSjrybqByRyidCallBack,this,false);
            } else {
              done();
            }
          }
        }).catch();
      },
      clickSjrybqOption(obj,level){
        if(level==1){
          this.addrybqcode1 = obj.value;
          this.addrybqname1 = obj.label;
          this.getAlarmRybq(obj.value,level+1);
        }
        if(level==2){
          this.addrybqcode2 = obj.value;
          this.addrybqname2 = obj.label;
        }
      },
      //添加涉警人员部分代码
      showSjry(obj){
        this.selectjqobj = obj;
        this.sjry_xm = "";
        this.sjry_xb = "";
        this.sjry_sfzh = "";
        this.sjry_lxdh = "";
        this.sjry_xzd = "";
        this.sjry_hjd = "";
        this.showSjryOption = true;
        this.getSjryByAlarmid();
      },
      addSjryByAlarmid(){
        if(!this.selectjqobj.id){
            this.$Message.error("参数错误");
            return;
        }
        if(this.sjry_xm==''||this.sjry_xb==''||this.sjry_sfzh==''||this.sjry_lxdh==''||this.sjry_xzd==''||this.sjry_hjd==''){
            this.$Message.error("人员信息需填写完整");
            return;
        }
        var paramObj = {};
        paramObj.alarmid = this.selectjqobj.id;
        paramObj.jjdbh = this.selectjqobj.jjdbh;
        paramObj.xm = this.sjry_xm;
        paramObj.xb = this.sjry_xb;
        paramObj.sfzh = this.sjry_sfzh;
        paramObj.lxdh = this.sjry_lxdh;
        paramObj.xzd = this.sjry_xzd;
        paramObj.hjd = this.sjry_hjd;
        this.http.get("/ssjq/addSjryByAlarmid",paramObj,this.addSjryByAlarmidCallBack,this,false);
      },
      addSjryByAlarmidCallBack(data){
        this.$Message.success(data);
        this.getSjryByAlarmid();
        this.searchJq();
      },
      getSjryByAlarmid(){
        this.http.get("/ssjq/getSjryByAlarmid",{alarmid:this.selectjqobj.id},this.getSjryByAlarmidCallBack,this,false);
      },
      getSjryByAlarmidCallBack(data){
          this.alarmsjrylist = data;
      },
      deleteSjryByRyid(item){
        var h = this.$createElement;
        this.$msgbox({
          title: '信息提示',
          message: h('p', null, [
            h('span', null, '是删除此涉警人员？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              this.http.get("/ssjq/deleteSjryByRyid",item,this.addSjryByAlarmidCallBack,this,false);
            } else {
              done();
            }
          }
        }).catch();
      },
      //警情标签部分方法
      clickOption(obj,level){
        if(level==1){
          this.addjqbqcode1 = obj.value;
          this.addjqbqname1 = obj.label;
          this.getAlarmJqbq(obj.value,level+1);
        }
        if(level==2){
          this.addjqbqcode2 = obj.value;
          this.addjqbqname2 = obj.label;
          this.getAlarmJqbq(obj.value,level+1);
        }
        if(level==3){
          this.addjqbqcode3 = obj.value;
          this.addjqbqname3 = obj.label;
        }
      },
      addJqbqByAlarmid(){
        if(!this.addjqbqname3&&this.addjqbqname3==''){
            this.$Message.error("必须选到第三级标签");
            return;
        }
        if(this.selectalarmid==''){
            this.$Message.error("参数不能为空");
            return;
        }
        var paramObj = {};
        paramObj.alarmid = this.selectalarmid;
        paramObj.jqbqcode1 = this.addjqbqcode1;
        paramObj.jqbqname1 = this.addjqbqname1;
        paramObj.jqbqcode2 = this.addjqbqcode2;
        paramObj.jqbqname2 = this.addjqbqname2;
        paramObj.jqbqcode3 = this.addjqbqcode3;
        paramObj.jqbqname3 = this.addjqbqname3;
        this.http.get("/ssjq/addJqbqByAlarmid",paramObj,this.addJqbqByAlarmidCallBack,this,false);
      },
      addJqbqByAlarmidCallBack(data){
        this.$Message.success(data);
        this.getJqbqByAlarmid();
        this.searchJq();
      },
      showoOption(obj){
        this.selectalarmid = obj.id;
        this.addjqbqcode1 = "";
        this.addjqbqname1 = "";
        this.addjqbqcode2 = "";
        this.addjqbqname2 = "";
        this.addjqbqcode3 = "";
        this.addjqbqname3 = "";
        this.showBqOption = true;
        this.getJqbqByAlarmid();
      },
      getJqbqByAlarmid(){
        this.http.get("/ssjq/getJqbqByAlarmid",{alarmid:this.selectalarmid},this.getJqbqByAlarmidCallBack,this,false);
      },
      getJqbqByAlarmidCallBack(data){
          this.alarmjqbqlist = data;
      },
      deleteJqbqByAlarmid(item){
        var h = this.$createElement;
        this.$msgbox({
          title: '信息提示',
          message: h('p', null, [
            h('span', null, '是删除此标签？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              this.http.get("/ssjq/deleteJqbqByAlarmidAndBq",item,this.addJqbqByAlarmidCallBack,this,false);
            } else {
              done();
            }
          }
        }).catch();
      },
      showJqbqInfo(){
         this.showJqbq = true;
        //初始化警情标签一级标签
        this.getAlarmJqbq("-1",1);
        //初始化人员标签一级标签
        this.getAlarmRybq("-1",1);
        this.jqbq1 = "";
        this.jqbq2 = "";
        this.jqbq3 = "";
        this.selectjqbq1 = "";
        this.selectjqbq2 = "";
        this.rybq1 = "";
        this.rybq2 = "";
        this.selectrybq1 = "";
      },
      pageChange(page){
        this.page = page;
        this.searchJq();
      },
      getSsjqLbCallBack(data){
        this.jjlbList = data;
      },
      getSsjqCallBack(data){
        this.totalSize = data.count;
        for(var i=0;i<data.data.length;i++){
            data.data[i].xh = (this.page-1)*this.pageSize+1+i;
        }
        this.jqList = data.data;
      },
      clearSearch(){
          this.name = "";
          this.jqlbcode = "";
          this.state = "";
          this.starttime = "";
          this.endtime = "";
          this.deptcode = "";
      },
      searchJq(){
        var param = {};
        param.name=this.name;
        param.deptcode=this.deptcode;
        param.jqlbcode=this.jqlbcode;
        param.bqcx = this.state;
        param.starttime=this.starttime;
        param.endtime=this.endtime;
        param.page = this.page;
        param.pagesize = this.pageSize;
        this.http.get("/tjfx/getJqFxForm",param,this.getSsjqCallBack,this,false);
      },
      //标签管理部分方法
      clickjqbq(item,level){
        if(item.level==1){
          this.selectjqbq1 = item.code;
        }
        if(item.level==2){
          this.selectjqbq2 = item.code;
        }
        this.getAlarmJqbq(item.code,level);
      },
      deletejqbq(item){
        var h = this.$createElement;
        this.$msgbox({
          title: '信息提示',
          message: h('p', null, [
            h('span', null, '是删除标签【'+item.name+'】？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              this.http.get("/ssjq/deleteAlarmJqbq",{code:item.code},this.deleteAlarmJqbqCallBack,this,false,item);
            } else {
              done();
            }
          }
        }).catch();
      },
      deleteAlarmJqbqCallBack(data,obj){
          this.$Message.success(data);
          this.getAlarmJqbq(obj.parentcode,obj.level);
      },
      saveAlarmJqbq(level){
        var paramObj = {};
        paramObj.level = level;
        if(level==1){
          if(this.jqbq1==''){
            this.$Message.error("请先填写警情标签");
            return;
          }
          paramObj.name = this.jqbq1;
          paramObj.parentcode = '-1';
        }
        if(level==2){
          if(this.jqbq2==''){
            this.$Message.error("请先填写警情标签");
            return;
          }
          if(this.selectjqbq1==''){
            this.$Message.error("请先选择上级标签");
            return;
          }
          paramObj.name = this.jqbq2;
          paramObj.parentcode = this.selectjqbq1;
        }
        if(level==3){
          if(this.jqbq3==''){
            this.$Message.error("请先填写警情标签");
            return;
          }
          if(this.selectjqbq2==''){
            this.$Message.error("请先选择上级标签");
            return;
          }
          paramObj.name = this.jqbq3;
          paramObj.parentcode = this.selectjqbq2;
        }
        this.http.get("/ssjq/addAlarmJqbq",paramObj,this.addAlarmJqbqCallBack,this,false,paramObj);
      },
      addAlarmJqbqCallBack(data,obj){
          this.$Message.success(data);
          this.getAlarmJqbq(obj.parentcode,obj.level);
      },
      getAlarmJqbq(parentcode,level){
        this.http.get("/ssjq/getAlarmJqbq",{parentcode:parentcode},this.getAlarmJqbqCallBack,this,false,level);
      },
      getAlarmJqbqCallBack(data,level){
        if(level == 1){
          this.jqbqonelist = data;
          this.jqbqtwolist = [];
          this.jqbqthreelist = [];
        }
        if(level == 2){
          this.jqbqtwolist = data;
          this.jqbqthreelist = [];
        }
        if(level == 3){
          this.jqbqthreelist = data;
        }
      },
      // 人员标签管理
      clickrybq(item,level){
        if(item.level==1){
          this.selectrybq1 = item.code;
        }
        this.getAlarmRybq(item.code,level);
      },
      deleterybq(item){
        var h = this.$createElement;
        this.$msgbox({
          title: '信息提示',
          message: h('p', null, [
            h('span', null, '是删除标签【'+item.name+'】？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              this.http.get("/ssjq/deleteAlarmRybq",{code:item.code},this.deleteAlarmRybqCallBack,this,false,item);
            } else {
              done();
            }
          }
        }).catch();
      },
      deleteAlarmRybqCallBack(data,obj){
          this.$Message.success(data);
          this.getAlarmRybq(obj.parentcode,obj.level);
      },
      saveAlarmRybq(level){
        var paramObj = {};
        paramObj.level = level;
        if(level==1){
          if(this.rybq1==''){
            this.$Message.error("请先填写人员标签");
            return;
          }
          paramObj.name = this.rybq1;
          paramObj.parentcode = '-1';
        }
        if(level==2){
          if(this.rybq2==''){
            this.$Message.error("请先填写人员标签");
            return;
          }
          if(this.selectrybq1==''){
            this.$Message.error("请先选择上级标签");
            return;
          }
          paramObj.name = this.rybq2;
          paramObj.parentcode = this.selectrybq1;
        }
        this.http.get("/ssjq/addAlarmRybq",paramObj,this.addAlarmRybqCallBack,this,false,paramObj);
      },
      addAlarmRybqCallBack(data,obj){
        this.$Message.success(data);
        this.getAlarmRybq(obj.parentcode,obj.level);
      },
      getAlarmRybq(parentcode,level){
        this.http.get("/ssjq/getAlarmRybq",{parentcode:parentcode},this.getAlarmRybqCallBack,this,false,level);
      },
      getAlarmRybqCallBack(data,level){
        if(level == 1){
          this.rybqonelist = data;
          this.rybqtwolist = [];
        }
        if(level == 2){
          this.rybqtwolist = data;
        }
      }
  },
  created(){
    //获取警情类别
    this.http.get("/ssjq/getSsjqLb",null,this.getSsjqLbCallBack,this,false);
    //获取警情
    var param = {};
    param.page = this.page;
    param.pagesize = this.pageSize;
    this.http.get("/tjfx/getJqFxForm",param,this.getSsjqCallBack,this,false);
    //初始化警情标签一级标签
    this.getAlarmJqbq("-1",1);
    //初始化人员标签一级标签
    this.getAlarmRybq("-1",1);
  },
  mounted(){
    
  },
  watch : {
      currentDept:function(val) {
        this.deptcode = val.deptcode;
        this.searchJq();
      },
  }
}
</script>

<style scoped>
.jqfxListPanel{
  height: 100%;
  width: 100%;
  position: relative;
  padding: 0px;
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
.header2{
  padding:20px;
  color: #b6f6ff;
  font-size: 14px;
}
.contentPanel{
  width: 100%;
  height: calc(100% - 40px - 60px);
  overflow: auto;
}
.pagePanel{
  margin-top: 10px;
  height: 25px;
  line-height: 25px;
  text-align:center;
  /* background-color: #002029; */
}
.table{
  width: 100%;
}
.tbody{
  width: 100%;
}
.tbody tr td{
  display:inline;
  padding: 5px 0px;
  text-align: left;
  color: #848484;
} 
.textClass{
  margin-left: 35px;
}
.spanClass{
  word-break: break-all;
  background-color: #333;
  display:table-cell;
  padding: 2px 3px;
  width: 165px;
  color: #c8c8c8;
}
.spanClass2{
  word-break: break-all;
  background-color: #333;
  display:table-cell;
  padding: 2px 3px;
  width: 425px;
  color: #c8c8c8;
}
.spantd{
  margin-left: 5px;
  display:inline;
}
.upload{
  margin-left: 10px;
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
.seachbar_InputSearch{
  height: 26px;
  width: 150px;
}
.seachbar_InputSearch>>>.iconclass{
  right: 5px;
  top: 0px;
}
.seachbar_InputSearch>>>.iconclass:hover{
  right: 5px;
  top: 0px;
}
.seachbar_InputSearch>>>.clearclass{
  right: 28px;
  top: -2px;
}
.seachbar_InputSearch>>>.clearclass:hover{
  right: 28px;
  top: -2px;
}
.tableclass{
  height: 100%;
}
.bqtext{
  position: relative;
  height: 25px;
  line-height: 25px;
  background: #1f65af;
  margin: 2px;
  cursor: pointer;
}
.bqtext span{
  display: none;
}
.bqtext_click{
  position: relative;
  height: 25px;
  line-height: 25px;
  background: #359ab1;
  margin: 2px;
  cursor: pointer;
}
.bqtext_click span{
  position: absolute;
  top: 0px;
  right: 0px;
  color: #eb8484;
  display: block;
}
.bqtext:hover span{
  position: absolute;
  top: 0px;
  right: 0px;
  color: #eb8484;
  display: block;
}
.modal-div{
  margin: 0 0 10px 0;
}
.modal-div span{
  float: left;
  width: 120px;
  text-align: right;
  margin-right: 10px;
}
.bqrow{
  position: relative;
  height:30px;
  width:100%;
  text-align: center;
  border-bottom: 1px solid #3f81bb;
}
.bqrow span{
  display: none;
}
.bqrow:hover span{
  position: absolute;
  top: 5px;
  right: 0px;
  color: #eb8484;
  display: block;
  cursor: pointer;
}
.sjryrow{
  position: relative;
  height:30px;
  width:100%;
  text-align: center;
  border-bottom: 1px solid #3f81bb;
  cursor: pointer;
}
.sjryrow span{
  display: none;
}
.sjryrow_click{
  position: relative;
  height:30px;
  width:100%;
  text-align: center;
  background: #3f81bb;
  cursor: pointer;
}
.sjryrow_click span{
  position: absolute;
  top: 5px;
  right: 0px;
  color: #eb8484;
  display: block;
  cursor: pointer;
}
.inputclass{
  width:300px;
  height: 30px;
  padding: 0 10px;
  outline: none;
  color: white;
  background-color: transparent;
  border: 1px solid #0188fb;
}
</style>
<style>
.ivu-table .table-row-yello td:nth-last-child(2){
    background:rgba(255, 255, 0,1) !important; 
    color: #000;
}
.ivu-table .table-row-blue td:nth-last-child(2){
    background-color:rgba(11, 73, 245,1) !important;
    color: #fff;
}
.ivu-table .table-row-orange td:nth-last-child(2){
    background-color:rgba(233, 143, 111,1) !important;
    color: #fff;
}
.ivu-table .table-row-red td:nth-last-child(2){
    background-color:rgba(245, 11, 11,1) !important;
    color: #fff;
}
.ivu-table-cell{
    padding-left: 0px;
    padding-right: 0px;
}
.ivu-table td, .ivu-table th{
    height: 23px;
}
.jqbq_panel .ivu-modal .ivu-modal-content{
  top:200px;
  left: 750px;
  width: 500px !important;
}
/*********下拉框样式 分割线**************/
.jqbq_panel .ivu-select-selection{
    background: #d4d4d400;
    border-radius: 0px;
    border: 1px solid #0188fb;
}
.jqbq_panel .ivu-select-dropdown{
    background: #105194;
}
.jqbq_panel .ivu-select-item{
    color: #fff;
}
.jqbq_panel .ivu-select-item-selected{
    color: #0188fb;
}
.ivu-select-item-focus{
    background: #a7aab1;
}
.jqbq_panel .ivu-select-item:hover{
    background: #a7aab1;
}
.jqbq_panel .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
    color: #a7aab1;
}
.jqbq_panel .ivu-input{
    background: #d4d4d400;
    border-radius: 0px;
    border: 1px solid #0188fb;
    color: #fff;
}
</style>

