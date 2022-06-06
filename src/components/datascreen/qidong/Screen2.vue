<template>
  <div class="panel">
      <div class="gonganrili box">
        <div class="titleDiv">公安日历
          <Icon custom="iconfont iconshanchu" class="configClass" style="right:40px;" @click="deleteGarl"/>
          <Icon custom="iconfont iconpeizhi" class="configClass" @click="showgonganriliModal"/>
        </div>
        <div class="contentDiv gonganriliContent">
            <div style="height:100%;width:calc(100% - 150px);float:left;">
                <Calendar :refresh="refreshGarlFlag" @on-click="selectDateItem"/>
            </div>
            <div style="height:100%;width:150px;float:left;border-left:3px solid rgba(49,86,128);background:rgba(16,37,66,0.5);" class="flexc">
                <div style="font-size: 18px;color:yellow;width:100%;text-align:center;" v-show="garlRecent.title">距{{garlRecent.title}}</div>
                <div style="font-size: 18px;color:yellow;width:100%;text-align:center;" v-show="garlRecent.title">（下一个）</div>
                <div style="font-size: 18px;color:yellow;width:100%;text-align:center;" v-show="garlRecent.title">还有{{garlRecent.day}}天</div>
            </div>
        </div>
      </div>
      <div class="jinrizhongdianguanzhu box">
        <div class="titleDiv">今日重点关注<Icon custom="iconfont iconpeizhi" class="configClass" @click="showjinrizhongdianguanzhuModal"/></div>
        <div class="contentDiv">
             <div class="jinrizhongdianguanzhuItem" v-for="item in jrzdgzList" :key="item.id">
                <div class="jinrizhongdianguanzhuItemNum">{{item.xh}}</div>
                <div class="jinrizhongdianguanzhuItemDesc">{{item.title}}</div>
            </div>
        </div>
      </div>
      <div class="xinxishishifabu box">
        <div class="titleDiv">信息实时发布<Icon custom="iconfont iconpeizhi" class="configClass" @click="showxinxishishifabuModal"/></div>
        <div class="contentDiv">
          <div class="xinxishishifabuTimeDiv">
            <!-- <img src="@/assets/datascreen/qidong/tongzhigonggao/num.png" style="border-radius:50%;margin-left:20px"/> -->
            <span>{{xxssfbObj.inserttimeDate}}</span>
            <span>{{xxssfbObj.inserttimeTime}}</span>
          </div>
          <div class="xinxishishifabuContent">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              {{xxssfbObj.content}}
          </div>
        </div>
      </div>

      <div class="jinriwendianfabu box">
        <div class="titleDiv">今日文电发布<Icon custom="iconfont iconpeizhi" class="configClass" @click="showjinriwendianfabuModal"/></div>
        <div class="contentDiv">
            <div class="jinriwendianfabuTitleDiv">
              <span>接收时间</span>
              <span>标题</span>
              <span>来文来电单位</span>
            </div>
            <div class="jinriwendianfabuContent">
                <div v-for="item in jrwdfbList" :key="item.id">
                  <div class="jinriwendianfabuContent-time">{{item.time}}</div>
                  <div class="jinriwendianfabuContent-desc">{{item.title}}</div>
                  <div class="jinriwendianfabuContent-dw">{{item.unit}}</div>
                </div>
            </div>
        </div>
      </div>
      <div class="zhongjian2">
          <div class="jinrijiebaoxinxi box">
            <div class="titleDiv">今日接报信息<Icon custom="iconfont iconpeizhi" class="configClass" @click="showjinrijiebaoxinxiModal"/></div>
            <div class="contentDiv">
                <div class="jinrijiebaoxinxiTitleDiv">
                  <span>发布日期</span>
                  <span>信息标题</span>
                  <span>单位</span>
                </div>
                <div class="jinrijiebaoxinxiContent">
                    <div v-for="item in jrjbxxList" :key="item.id">
                      <div class="jinrijiebaoxinxiContent-time">{{item.time}}</div>
                      <div class="jinrijiebaoxinxiContent-desc">{{item.title}}</div>
                      <div class="jinrijiebaoxinxiContent-dw">{{item.unit}}</div>
                   </div>
                </div>
            </div>
          </div>
          <div class="xinwenyuqinbobao box">
            <div class="titleDiv">新闻舆情播报<Icon custom="iconfont iconpeizhi" class="configClass" @click="showxinwenyuqinbobaoModal"/></div>
            <div class="contentDiv">
                <div class="xinwenyuqinbobaoItem" v-for="item in xwyqbbList" :key="item.id">
                    <span></span>
                    <div class="xinwenyuqinbobaoItemNum">{{item.xh}}</div>
                    <div class="xinwenyuqinbobaoItemDesc">{{item.title}}</div>
                </div>
            </div>
          </div>
      </div>
      <div class="wangluoyuqingfenxi box">
        <div class="titleDiv">网络舆情分析<Icon custom="iconfont iconpeizhi" class="configClass" @click="showwangluoyuqingfenxiModal"/></div>
        <div class="contentDiv">
            <div class="wangluoyuqingfenxiContentDiv"  v-for="item in wlyqfxList" :key="item.id">
              <div class="wangluoyuqingfenxiContentDiv_num">{{item.xh}}</div>
              <div class="wangluoyuqingfenxiContentDiv_desc">{{item.title}}</div>
            </div>
        </div>
      </div>

      <div class="datingyujingzhiling box">
        <div class="titleDiv">大厅预警指令<Icon custom="iconfont iconpeizhi" class="configClass" @click="showdatingyujingzhilingModal"/></div>
        <div class="contentDiv contentborder">
          <div class="datingyujingzhilingContent_title">
            <div class="flexr" style="height:100%;width:25%;">时间</div><div class="flexr" style="height:100%;width:40%;">标题</div><div class="flexr" style="height:100%;width:25%;">紧急程度</div>
          </div>
          <div class="datingyujingzhilingContent">
            <div class="datingyujingzhilingContentDiv" v-for="item in dtyjzlList" :key="item.id" :class="{rowone:(item.xh==1)}">
                <div class="datingyujingzhilingContentDiv_time">{{item.time}}</div>
                <div class="datingyujingzhilingContentDiv_title">{{item.title}}</div>
                <div class="datingyujingzhilingContentDiv_jjcd">
                   <img v-show="item.level==1" src="@/assets/datascreen/qidong/tongzhigonggao/jingji1.png" style="height:25px;width:30px;"/>
                   <img v-show="item.level==2" src="@/assets/datascreen/qidong/tongzhigonggao/jingji2.png" style="height:25px;width:30px;"/>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bumenyujingzhiling box">
        <div class="titleDiv">部门预警指令<Icon custom="iconfont iconpeizhi" class="configClass" @click="showbumenyujingzhilingModal"/></div>
        <div class="contentDiv contentborder">
          <div class="datingyujingzhilingContent_title">
            <div class="flexr" style="height:100%;width:25%;">时间</div><div class="flexr" style="height:100%;width:40%;">标题</div><div class="flexr" style="height:100%;width:25%;">单位</div>
          </div>
          <div class="datingyujingzhilingContent">
            <div class="datingyujingzhilingContentDiv" v-for="item in bmyjzlList" :key="item.id" :class="{rowone:(item.xh==1)}">
                <div class="datingyujingzhilingContentDiv_time">{{item.time}}</div>
                <div class="datingyujingzhilingContentDiv_title">{{item.title}}</div>
                <div class="datingyujingzhilingContentDiv_jjcd">{{item.unit}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="geshiyujingzhiling box">
        <div class="titleDiv">各市预警指令<Icon custom="iconfont iconpeizhi" class="configClass" @click="showgeshiyujingzhilingModal"/></div>
        <div class="contentDiv contentborder">
          <div class="datingyujingzhilingContent_title">
            <div class="flexr" style="height:100%;width:25%;">时间</div><div class="flexr" style="height:100%;width:40%;">标题</div><div class="flexr" style="height:100%;width:25%;">单位</div>
          </div>
          <div class="datingyujingzhilingContent">
            <div class="datingyujingzhilingContentDiv" v-for="item in gsyjzlList" :key="item.id" :class="{rowone:(item.xh==1)}">
                <div class="datingyujingzhilingContentDiv_time">{{item.time}}</div>
                <div class="datingyujingzhilingContentDiv_title">{{item.title}}</div>
                <div class="datingyujingzhilingContentDiv_jjcd">{{item.unit}}</div>
            </div>
          </div>
        </div>
      </div>
      <Modal title="今日重点关注" v-model="showjinrizhongdianguanzhu" :draggable="true" width="600" class="ModalClass">
        <div>
            <div  v-for="item in jrzdgzUpdateList" :key="item.id" style="margin-top:10px;">
                <Input v-model="item.title" :maxlength="250" type="textarea" style="width: 400px" />
                <Button v-show="!item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="insertJrzdgz(item)">保存</Button>
                <Button v-show="item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="updateJrzdgz(item)">修改</Button>
                <Button type="primary" size="small" style="width:64px;margin-left:10px;" @click="deleteJrzdgz(item)">删除</Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="addJrzdgz">新增</Button>
            <Button type="primary" size="large" @click="hidejinrizhongdianguanzhuModal">取消</Button>
        </div>
      </Modal>
      <Modal title="信息实时发布" v-model="showxinxishishifabu" :draggable="true" width="600" class="ModalClass">
        <div>
            <div>
                <Input v-model="xxssfbUpdateObj.content" type="textarea" style="width: 565px;" :rows="10"/>
            </div>
        </div>
        <div slot="footer">
            <Button v-show="!xxssfbObj.id" type="primary" size="large" @click="insertXxssfb">保存</Button>
            <Button v-show="xxssfbObj.id" type="primary" size="large" @click="updateXxssfb">修改</Button>
            <Button type="primary" size="large" @click="hidexinxishishifabuModal">取消</Button>
        </div>
      </Modal>
      <Modal title="今日文电发布" v-model="showjinriwendianfabu" :draggable="true" width="715" class="ModalClass">
        <div>
            <div v-for="item in jrwdfbUpdateList" :key="item.id" style="margin-top:10px;">
                <label>接收时间:</label>
                <Input v-model="item.time" :maxlength="15" style="width: 100px" />
                <label>标题:</label>
                <Input v-model="item.title" :maxlength="250" type="textarea" style="width: 200px" :rows="3"/>
                <label>单位:</label>
                <Input v-model="item.unit" :maxlength="250" type="textarea" style="width: 100px" :rows="3"/>
                <Button v-show="!item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="insertJrwdfb(item)">保存</Button>
                <Button v-show="item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="updateJrwdfb(item)">修改</Button>
                <Button type="primary" size="small" style="width:64px;margin-left:10px;" @click="deleteJrwdfb(item)">删除</Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="addJrwdfb">新增</Button>
            <Button type="primary" size="large" @click="hidejinriwendianfabuModal">取消</Button>
        </div>
      </Modal>
      <Modal title="今日接报信息" v-model="showjinrijiebaoxinxi" :draggable="true" width="715" class="ModalClass">
        <div>
            <div v-for="item in jrjbxxUpdateList" :key="item.id" style="margin-top:10px;">
                <label>发布日期:</label>
                <Input v-model="item.time" :maxlength="15" style="width: 100px" />
                <label>标题:</label>
                <Input v-model="item.title" :maxlength="250" type="textarea" style="width: 200px" :rows="3"/>
                <label>单位:</label>
                <Input v-model="item.unit" :maxlength="250" type="textarea" style="width: 100px" :rows="3"/>
                <Button v-show="!item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="insertJrjbxx(item)">保存</Button>
                <Button v-show="item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="updateJrjbxx(item)">修改</Button>
                <Button type="primary" size="small" style="width:64px;margin-left:10px;" @click="deleteJrjbxx(item)">删除</Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="addJrjbxx">新增</Button>
            <Button type="primary" size="large" @click="hidejinrijiebaoxinxiModal">取消</Button>
        </div>
      </Modal>
      <Modal title="新闻舆情播报" v-model="showxinwenyuqinbobao" :draggable="true" width="600" class="ModalClass">
        <div>
            <div  v-for="item in xwyqbbUpdateList" :key="item.id" style="margin-top:10px;">
                <Input v-model="item.title" :maxlength="250" type="textarea" style="width: 400px" />
                <Button v-show="!item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="insertXwyqbb(item)">保存</Button>
                <Button v-show="item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="updateXwyqbb(item)">修改</Button>
                <Button type="primary" size="small" style="width:64px;margin-left:10px;" @click="deleteXwyqbb(item)">删除</Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="addXwyqbb">新增</Button>
            <Button type="primary" size="large" @click="hidexinwenyuqinbobaoModal">取消</Button>
        </div>
      </Modal>
      <Modal title="网络舆情分析" v-model="showwangluoyuqingfenxi" :draggable="true" width="600" class="ModalClass">
        <div>
            <div  v-for="item in wlyqfxUpdateList" :key="item.id" style="margin-top:10px;">
                <Input v-model="item.title" :maxlength="250" type="textarea" style="width: 400px" />
                <Button v-show="!item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="insertWlyqfx(item)">保存</Button>
                <Button v-show="item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="updateWlyqfx(item)">修改</Button>
                <Button type="primary" size="small" style="width:64px;margin-left:10px;" @click="deleteWlyqfx(item)">删除</Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="addWlyqfx">新增</Button>
            <Button type="primary" size="large" @click="hidewangluoyuqingfenxiModal">取消</Button>
        </div>
      </Modal>
      <Modal title="大厅预警指令" v-model="showdatingyujingzhiling" :draggable="true" width="715" class="ModalClass">
        <div>
            <div v-for="item in dtyjzlUpdateList" :key="item.id" style="margin-top:10px;">
                <label>时间:</label>
                <Input v-model="item.time" :maxlength="15" style="width: 100px" />
                <label>标题:</label>
                <Input v-model="item.title" :maxlength="250" type="textarea" style="width: 200px" :rows="3"/>
                <label>紧急程度:</label>
                <RadioGroup v-model="item.level">
                  <Radio label="1">紧急</Radio>
                  <Radio label="2">一般</Radio>
                </RadioGroup>
                <Button v-show="!item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="insertDtyjzl(item)">保存</Button>
                <Button v-show="item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="updateDtyjzl(item)">修改</Button>
                <Button type="primary" size="small" style="width:64px;margin-left:10px;" @click="deleteDtyjzl(item)">删除</Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="addDtyjzl">新增</Button>
            <Button type="primary" size="large" @click="hidedatingyujingzhilingModal">取消</Button>
        </div>
      </Modal>
      <Modal title="部门预警指令" v-model="showbumenyujingzhiling" :draggable="true" width="715" class="ModalClass">
        <div>
            <div v-for="item in bmyjzlUpdateList" :key="item.id" style="margin-top:10px;">
                <label>时间:</label>
                <Input v-model="item.time" :maxlength="15" style="width: 100px" />
                <label>标题:</label>
                <Input v-model="item.title" :maxlength="250" type="textarea" style="width: 200px" :rows="3"/>
                <label>单位:</label>
                <Input v-model="item.unit" :maxlength="250" type="textarea" style="width: 100px" :rows="3"/>
                <Button v-show="!item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="insertBmyjzl(item)">保存</Button>
                <Button v-show="item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="updateBmyjzl(item)">修改</Button>
                <Button type="primary" size="small" style="width:64px;margin-left:10px;" @click="deleteBmyjzl(item)">删除</Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="addBmyjzl">新增</Button>
            <Button type="primary" size="large" @click="hidebumenyujingzhilingModal">取消</Button>
        </div>
      </Modal>
      <Modal title="各市预警指令" v-model="showgeshiyujingzhiling" :draggable="true" width="715" class="ModalClass">
        <div>
            <div v-for="item in gsyjzlUpdateList" :key="item.id" style="margin-top:10px;">
                <label>时间:</label>
                <Input v-model="item.time" :maxlength="15" style="width: 100px" />
                <label>标题:</label>
                <Input v-model="item.title" :maxlength="250" type="textarea" style="width: 200px" :rows="3"/>
                <label>单位:</label>
                <Input v-model="item.unit" :maxlength="250" type="textarea" style="width: 100px" :rows="3"/>
                <Button v-show="!item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="insertGsyjzl(item)">保存</Button>
                <Button v-show="item.id" type="primary" size="small" style="width:64px;margin-left:10px;" @click="updateGsyjzl(item)">修改</Button>
                <Button type="primary" size="small" style="width:64px;margin-left:10px;" @click="deleteGsyjzl(item)">删除</Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="addGsyjzl">新增</Button>
            <Button type="primary" size="large" @click="hidegeshiyujingzhilingModal">取消</Button>
        </div>
      </Modal>
      <Modal title="公安日历" v-model="showgonganrili" :draggable="true" width="280" class="ModalClass">
            <div>
                <div><label>日期：</label><label style="margin-left:10px;">{{selectDate}}</label></div>
                <div style="margin-top:20px;"><label>事件：</label><Input v-model="selectTitle" :maxlength="10" style="width: 200px;margin-left:10px;" /></div>
            </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="hidegonganriliModal">取消</Button>
            <Button type="primary" size="large" @click="saveGarl">保存</Button>
        </div>
      </Modal>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
import Calendar from '@/components/base/Calendar'

export default {
  name: 'Screen2',
  components:{Calendar},
  data () {
    return {
      showjinrizhongdianguanzhu:false,
      jrzdgzList:[],
      jrzdgzUpdateList:[],
      //----------信息实时发布-----------
      showxinxishishifabu:false,
      xxssfbObj:{},
      xxssfbUpdateObj:{},
      //----------今日文电发布-----------
      showjinriwendianfabu:false,
      jrwdfbList:[],
      jrwdfbUpdateList:[],
      //----------今日接报信息-----------
      showjinrijiebaoxinxi:false,
      jrjbxxList:[],
      jrjbxxUpdateList:[],
      //----------新闻舆情播报-----------
      showxinwenyuqinbobao:false,
      xwyqbbList:[],
      xwyqbbUpdateList:[],
      //----------网络舆情分析-----------
      showwangluoyuqingfenxi:false,
      wlyqfxList:[],
      wlyqfxUpdateList:[],
      //----------大厅预警指令-----------
      showdatingyujingzhiling:false,
      dtyjzlList:[],
      dtyjzlUpdateList:[],
      //----------部门预警指令-----------
      showbumenyujingzhiling:false,
      bmyjzlList:[],
      bmyjzlUpdateList:[],
      //----------各市预警指令-----------
      showgeshiyujingzhiling:false,
      gsyjzlList:[],
      gsyjzlUpdateList:[],
      //----------公安日历---------------
      selectDate:"",
      selectTitle:"",
      showgonganrili:false,
      refreshGarlFlag:false,
      garlRecent:{},
    }
  },
  computed:mapState({
  }),
  methods:{
      //---------------------------------------今日重点关注-------------------------------------
      showjinrizhongdianguanzhuModal(){
        this.showjinrizhongdianguanzhu= true;
      },
      hidejinrizhongdianguanzhuModal(){
        this.showjinrizhongdianguanzhu= false;
      },
      getJrzdgz(){//获取今日重点关注
        var paramObj={};
        paramObj.type="jrzdgz";
        paramObj.bitime="1";
        this.http.get("/tzgg/getTzgg",paramObj,this.getTzggCallBack,this,false);
      },
      getTzggCallBack(data){
        this.jrzdgzUpdateList = [];
        for(var i=1;i<=data.data.length;i++){
          data.data[i-1].xh = i;
          this.jrzdgzUpdateList.push(Object.assign({},data.data[i-1]));
        }
        this.jrzdgzList = data.data;
      },
      updateJrzdgz(item){
        if(item.title==""||item.title==null){
          this.$Message.error("内容不能为空");
          return;
        }
        var paramObj={};
        paramObj.id = item.id;
        paramObj.title = item.title;
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateTzggCallBack,this,false);
      },
      updateTzggCallBack(data){
        this.getJrzdgz();
        this.$Message.success("修改成功");
      },
      deleteJrzdgz(item){
        if(item.id){
          var paramObj={};
          paramObj.id = item.id;
          if(confirm('确定要删除吗')==true){
            this.http.get("/tzgg/delTzgg",paramObj,this.deleteTzggCallBack,this,false);
          }
        }else{//新增进去的框
          var title=(item.title==null?"":item.title);
          for(var i=0;i<this.jrzdgzUpdateList.length;i++){
              if(this.jrzdgzUpdateList[i].id){
                continue;
              }
              var title2=(this.jrzdgzUpdateList[i].title==null?"":this.jrzdgzUpdateList[i].title);
              if(title==title2){
                var item = this.jrzdgzUpdateList.splice(i, 1);
                break;
              }
          }
        }
      },
      deleteTzggCallBack(data){
        this.getJrzdgz();
        this.$Message.success("删除成功");
      },
      addJrzdgz(){
        var obj={};
        this.jrzdgzUpdateList.unshift(obj);
      },
      insertJrzdgz(item){
        if(item.title==""||item.title==null){
          this.$Message.error("内容不能为空");
          return;
        }
        var paramObj={};
        paramObj.title = item.title;
        paramObj.type="jrzdgz";
        this.http.get("/tzgg/saveTzgg",paramObj,this.saveTzggCallBack,this,false);
      },
      saveTzggCallBack(data){
        this.getJrzdgz();
        this.$Message.success("新增成功");
      },
      //---------------------------------------信息实时发布-------------------------------------
      showxinxishishifabuModal(){
        this.showxinxishishifabu= true;
      },
      hidexinxishishifabuModal(){
        this.showxinxishishifabu= false;
      },
      getXxssfb(){
        var paramObj={};
        paramObj.type="xxssfb";
        paramObj.bitime="1";
        this.http.get("/tzgg/getTzgg",paramObj,this.getXxssfbCallBack,this,false);
      },
      getXxssfbCallBack(data){
        if(data.data.length>0){
          this.xxssfbObj = data.data[0];
          this.xxssfbObj.inserttimeDate = this.xxssfbObj.inserttime.substr(0,this.xxssfbObj.inserttime.indexOf(" "));
          this.xxssfbObj.inserttimeTime = this.xxssfbObj.inserttime.substr(this.xxssfbObj.inserttime.indexOf(" ")+1,this.xxssfbObj.inserttime.length);
          this.xxssfbUpdateObj = Object.assign({},this.xxssfbObj);
        }
      },
      updateXxssfb(){
        if(this.xxssfbUpdateObj.content==""||this.xxssfbUpdateObj.content==null){
          this.$Message.error("内容不能为空");
          return;
        }
        var paramObj={};
        paramObj.id = this.xxssfbUpdateObj.id;
        paramObj.content = this.xxssfbUpdateObj.content;
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateXxssfbCallBack,this,false);
      },
      updateXxssfbCallBack(data){
        this.getXxssfb();
        this.$Message.success("修改成功");
      },
      insertXxssfb(){
        if(this.xxssfbUpdateObj.content==""||this.xxssfbUpdateObj.content==null){
          this.$Message.error("内容不能为空");
          return;
        }
        var paramObj={};
        paramObj.content = this.xxssfbUpdateObj.content;
        paramObj.type="xxssfb";
        this.http.get("/tzgg/saveTzgg",paramObj,this.insertXxssfbCallBack,this,false);
      },
      insertXxssfbCallBack(data){
        this.getXxssfb();
        this.$Message.success("新增成功");
      },
      //---------------------------------------今日文电发布-------------------------------------
      hidejinriwendianfabuModal(){
        this.showjinriwendianfabu = false;
      },
      showjinriwendianfabuModal(){
        this.showjinriwendianfabu = true;
      },
      getJrwdfb(){//获取今日文电发布
        var paramObj={};
        paramObj.type="jrwdfb";
        this.http.get("/tzgg/getTzgg",paramObj,this.getJrwdfbCallBack,this,false);
      },
      getJrwdfbCallBack(data){
        this.jrwdfbUpdateList = [];
        for(var i=1;i<=data.data.length;i++){
          data.data[i-1].xh = i;
          this.jrwdfbUpdateList.push(Object.assign({},data.data[i-1]));
        }
        this.jrwdfbList = data.data;
      },
      updateJrwdfb(item){
        if(item.title==""||item.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.unit==""||item.unit==null){
          this.$Message.error("单位不能为空");
          return;
        }
        var paramObj={};
        paramObj.id = item.id;
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.unit = item.unit;
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateJrwdfbCallBack,this,false);
      },
      updateJrwdfbCallBack(data){
        this.getJrwdfb();
        this.$Message.success("修改成功");
      },
      deleteJrwdfb(item){
        if(item.id){
          var paramObj={};
          paramObj.id = item.id;
          if(confirm('确定要删除吗')==true){
            this.http.get("/tzgg/delTzgg",paramObj,this.deleteJrwdfbCallBack,this,false);
          }
        }else{//新增进去的框
          var title=(item.title==null?"":item.title);
          var time=(item.time==null?"":item.time);
          var unit=(item.unit==null?"":item.unit);
          for(var i=0;i<this.jrwdfbUpdateList.length;i++){
              if(this.jrwdfbUpdateList[i].id){
                continue;
              }
              var title2=(this.jrwdfbUpdateList[i].title==null?"":this.jrwdfbUpdateList[i].title);
              var time2=(this.jrwdfbUpdateList[i].time==null?"":this.jrwdfbUpdateList[i].time);
              var unit2=(this.jrwdfbUpdateList[i].unit==null?"":this.jrwdfbUpdateList[i].unit);
              if(title==title2&&time==time2&&unit==unit2){
                this.jrwdfbUpdateList.splice(i, 1);
                break;
              }
          }
        }
      },
      deleteJrwdfbCallBack(data){
        this.getJrwdfb();
        this.$Message.success("删除成功");
      },
      addJrwdfb(){
        var obj={};
        this.jrwdfbUpdateList.unshift(obj);
      },
      insertJrwdfb(item){
        if(item.title==""||item.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.unit==""||item.unit==null){
          this.$Message.error("单位不能为空");
          return;
        }
        var paramObj={};
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.unit = item.unit;
        paramObj.type="jrwdfb";
        this.http.get("/tzgg/saveTzgg",paramObj,this.insertJrwdfbCallBack,this,false);
      },
      insertJrwdfbCallBack(data){
        this.getJrwdfb();
        this.$Message.success("新增成功");
      },
      //---------------------------------------今日接报信息-------------------------------------
      hidejinrijiebaoxinxiModal(){
        this.showjinrijiebaoxinxi = false;
      },
      showjinrijiebaoxinxiModal(){
        this.showjinrijiebaoxinxi = true;
      },
      getJrjbxx(){//获取今日接报
        var paramObj={};
        paramObj.type="jrjbxx";
        this.http.get("/tzgg/getTzgg",paramObj,this.getJrjbxxCallBack,this,false);
      },
      getJrjbxxCallBack(data){
        this.jrjbxxUpdateList = [];
        for(var i=1;i<=data.data.length;i++){
          data.data[i-1].xh = i;
          this.jrjbxxUpdateList.push(Object.assign({},data.data[i-1]));
        }
        this.jrjbxxList = data.data;
      },
      updateJrjbxx(item){
        if(item.title==""||item.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.unit==""||item.unit==null){
          this.$Message.error("单位不能为空");
          return;
        }
        var paramObj={};
        paramObj.id = item.id;
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.unit = item.unit;
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateJrjbxxCallBack,this,false);
      },
      updateJrjbxxCallBack(data){
        this.getJrjbxx();
        this.$Message.success("修改成功");
      },
      deleteJrjbxx(item){
        if(item.id){
          var paramObj={};
          paramObj.id = item.id;
          if(confirm('确定要删除吗')==true){
            this.http.get("/tzgg/delTzgg",paramObj,this.deleteJrjbxxCallBack,this,false);
          }
        }else{//新增进去的框
          var title=(item.title==null?"":item.title);
          var time=(item.time==null?"":item.time);
          var unit=(item.unit==null?"":item.unit);
          for(var i=0;i<this.jrjbxxUpdateList.length;i++){
              if(this.jrjbxxUpdateList[i].id){
                continue;
              }
              var title2=(this.jrjbxxUpdateList[i].title==null?"":this.jrjbxxUpdateList[i].title);
              var time2=(this.jrjbxxUpdateList[i].time==null?"":this.jrjbxxUpdateList[i].time);
              var unit2=(this.jrjbxxUpdateList[i].unit==null?"":this.jrjbxxUpdateList[i].unit);
              if(title==title2&&time==time2&&unit==unit2){
                this.jrjbxxUpdateList.splice(i, 1);
                break;
              }
          }
        }
      },
      deleteJrjbxxCallBack(data){
        this.getJrjbxx();
        this.$Message.success("删除成功");
      },
      addJrjbxx(){
        var obj={};
        this.jrjbxxUpdateList.unshift(obj);
      },
      insertJrjbxx(item){
        if(item.title==""||item.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.unit==""||item.unit==null){
          this.$Message.error("单位不能为空");
          return;
        }
        var paramObj={};
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.unit = item.unit;
        paramObj.type="jrjbxx";
        this.http.get("/tzgg/saveTzgg",paramObj,this.insertJrjbxxCallBack,this,false);
      },
      insertJrjbxxCallBack(data){
        this.getJrjbxx();
        this.$Message.success("新增成功");
      },
      //---------------------------------------新闻舆情播报-------------------------------------
      showxinwenyuqinbobaoModal(){
        this.showxinwenyuqinbobao= true;
      },
      hidexinwenyuqinbobaoModal(){
        this.showxinwenyuqinbobao= false;
      },
      getXwyqbb(){
        var paramObj={};
        paramObj.type="xwyqbb";
        paramObj.bitime="1";
        this.http.get("/tzgg/getTzgg",paramObj,this.getXwyqbbCallBack,this,false);
      },
      getXwyqbbCallBack(data){
        this.xwyqbbUpdateList = [];
        for(var i=1;i<=data.data.length;i++){
          data.data[i-1].xh = i;
          this.xwyqbbUpdateList.push(Object.assign({},data.data[i-1]));
        }
        this.xwyqbbList = data.data;
      },
      updateXwyqbb(item){
        if(item.title==""||item.title==null){
          this.$Message.error("内容不能为空");
          return;
        }
        var paramObj={};
        paramObj.id = item.id;
        paramObj.title = item.title;
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateXwyqbbCallBack,this,false);
      },
      updateXwyqbbCallBack(data){
        this.getXwyqbb();
        this.$Message.success("修改成功");
      },
      deleteXwyqbb(item){
        if(item.id){
          var paramObj={};
          paramObj.id = item.id;
          if(confirm('确定要删除吗')==true){
            this.http.get("/tzgg/delTzgg",paramObj,this.deleteXwyqbbCallBack,this,false);
          }
        }else{//新增进去的框
          var title=(item.title==null?"":item.title);
          for(var i=0;i<this.xwyqbbUpdateList.length;i++){
              if(this.xwyqbbUpdateList[i].id){
                continue;
              }
              var title2=(this.xwyqbbUpdateList[i].title==null?"":this.xwyqbbUpdateList[i].title);
              if(title==title2){
                var item = this.xwyqbbUpdateList.splice(i, 1);
                break;
              }
          }
        }
      },
      deleteXwyqbbCallBack(data){
        this.getXwyqbb();
        this.$Message.success("删除成功");
      },
      addXwyqbb(){
        var obj={};
        this.xwyqbbUpdateList.unshift(obj);
      },
      insertXwyqbb(item){
        if(item.title==""||item.title==null){
          this.$Message.error("内容不能为空");
          return;
        }
        var paramObj={};
        paramObj.title = item.title;
        paramObj.type="xwyqbb";
        this.http.get("/tzgg/saveTzgg",paramObj,this.insertXwyqbbCallBack,this,false);
      },
      insertXwyqbbCallBack(data){
        this.getXwyqbb();
        this.$Message.success("新增成功");
      },
      //---------------------------------------网络舆情分析-------------------------------------
      showwangluoyuqingfenxiModal(){
        this.showwangluoyuqingfenxi= true;
      },
      hidewangluoyuqingfenxiModal(){
        this.showwangluoyuqingfenxi= false;
      },
      getWlyqfx(){
        var paramObj={};
        paramObj.type="wlyqfx";
        paramObj.bitime="1";
        this.http.get("/tzgg/getTzgg",paramObj,this.getWlyqfxCallBack,this,false);
      },
      getWlyqfxCallBack(data){
        this.wlyqfxUpdateList = [];
        for(var i=1;i<=data.data.length;i++){
          data.data[i-1].xh = i;
          this.wlyqfxUpdateList.push(Object.assign({},data.data[i-1]));
        }
        this.wlyqfxList = data.data;
      },
      updateWlyqfx(item){
        if(item.title==""||item.title==null){
          this.$Message.error("内容不能为空");
          return;
        }
        var paramObj={};
        paramObj.id = item.id;
        paramObj.title = item.title;
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateWlyqfxCallBack,this,false);
      },
      updateWlyqfxCallBack(data){
        this.getWlyqfx();
        this.$Message.success("修改成功");
      },
      deleteWlyqfx(item){
        if(item.id){
          var paramObj={};
          paramObj.id = item.id;
          if(confirm('确定要删除吗')==true){
            this.http.get("/tzgg/delTzgg",paramObj,this.deleteWlyqfxCallBack,this,false);
          }
        }else{//新增进去的框
          var title=(item.title==null?"":item.title);
          for(var i=0;i<this.wlyqfxUpdateList.length;i++){
              if(this.wlyqfxUpdateList[i].id){
                continue;
              }
              var title2=(this.wlyqfxUpdateList[i].title==null?"":this.wlyqfxUpdateList[i].title);
              if(title==title2){
                var item = this.wlyqfxUpdateList.splice(i, 1);
                break;
              }
          }
        }
      },
      deleteWlyqfxCallBack(data){
        this.getWlyqfx();
        this.$Message.success("删除成功");
      },
      addWlyqfx(){
        var obj={};
        this.wlyqfxUpdateList.unshift(obj);
      },
      insertWlyqfx(item){
        if(item.title==""||item.title==null){
          this.$Message.error("内容不能为空");
          return;
        }
        var paramObj={};
        paramObj.title = item.title;
        paramObj.type="wlyqfx";
        this.http.get("/tzgg/saveTzgg",paramObj,this.insertWlyqfxCallBack,this,false);
      },
      insertWlyqfxCallBack(data){
        this.getWlyqfx();
        this.$Message.success("新增成功");
      },
      //---------------------------------------大厅预警指令-------------------------------------
      hidedatingyujingzhilingModal(){
        this.showdatingyujingzhiling = false;
      },
      showdatingyujingzhilingModal(){
        this.showdatingyujingzhiling = true;
      },
      getDtyjzl(){
        var paramObj={};
        paramObj.type="dtyjzl";
        this.http.get("/tzgg/getTzgg",paramObj,this.getDtyjzlCallBack,this,false);
      },
      getDtyjzlCallBack(data){
        this.dtyjzlUpdateList = [];
        for(var i=1;i<=data.data.length;i++){
          data.data[i-1].xh = i;
          this.dtyjzlUpdateList.push(Object.assign({},data.data[i-1]));
        }
        this.dtyjzlList = data.data;
      },
      updateDtyjzl(item){
        if(item.title==""||item.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.level==""||item.level==null){
          this.$Message.error("紧急程度不能为空");
          return;
        }
        var paramObj={};
        paramObj.id = item.id;
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.level = item.level;
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateDtyjzlCallBack,this,false);
      },
      updateDtyjzlCallBack(data){
        this.getDtyjzl();
        this.$Message.success("修改成功");
      },
      deleteDtyjzl(item){
        if(item.id){
          var paramObj={};
          paramObj.id = item.id;
          if(confirm('确定要删除吗')==true){
            this.http.get("/tzgg/delTzgg",paramObj,this.deleteDtyjzlCallBack,this,false);
          }
        }else{//新增进去的框
          var title=(item.title==null?"":item.title);
          var time=(item.time==null?"":item.time);
          var level=(item.level==null?"":item.level);
          for(var i=0;i<this.dtyjzlUpdateList.length;i++){
              if(this.dtyjzlUpdateList[i].id){
                continue;
              }
              var title2=(this.dtyjzlUpdateList[i].title==null?"":this.dtyjzlUpdateList[i].title);
              var time2=(this.dtyjzlUpdateList[i].time==null?"":this.dtyjzlUpdateList[i].time);
              var level2=(this.dtyjzlUpdateList[i].level==null?"":this.dtyjzlUpdateList[i].level);
              if(title==title2&&time==time2&&level==level2){
                this.dtyjzlUpdateList.splice(i, 1);
                break;
              }
          }
        }
      },
      deleteDtyjzlCallBack(data){
        this.getDtyjzl();
        this.$Message.success("删除成功");
      },
      addDtyjzl(){
        var obj={};
        this.dtyjzlUpdateList.unshift(obj);
      },
      insertDtyjzl(item){
        if(item.title==""||item.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.level==""||item.level==null){
          this.$Message.error("紧急程度不能为空");
          return;
        }
        var paramObj={};
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.level = item.level;
        paramObj.type="dtyjzl";
        this.http.get("/tzgg/saveTzgg",paramObj,this.insertDtyjzlCallBack,this,false);
      },
      insertDtyjzlCallBack(data){
        this.getDtyjzl();
        this.$Message.success("新增成功");
      },
      //---------------------------------------部门预警指令-------------------------------------
      hidebumenyujingzhilingModal(){
        this.showbumenyujingzhiling = false;
      },
      showbumenyujingzhilingModal(){
        this.showbumenyujingzhiling = true;
      },
      getBmyjzl(){//获取今日接报
        var paramObj={};
        paramObj.type="bmyjzl";
        this.http.get("/tzgg/getTzgg",paramObj,this.getBmyjzlCallBack,this,false);
      },
      getBmyjzlCallBack(data){
        this.bmyjzlUpdateList = [];
        for(var i=1;i<=data.data.length;i++){
          data.data[i-1].xh = i;
          this.bmyjzlUpdateList.push(Object.assign({},data.data[i-1]));
        }
        this.bmyjzlList = data.data;
      },
      updateBmyjzl(item){
        if(item.title==""||item.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.unit==""||item.unit==null){
          this.$Message.error("单位不能为空");
          return;
        }
        var paramObj={};
        paramObj.id = item.id;
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.unit = item.unit;
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateBmyjzlCallBack,this,false);
      },
      updateBmyjzlCallBack(data){
        this.getBmyjzl();
        this.$Message.success("修改成功");
      },
      deleteBmyjzl(item){
        if(item.id){
          var paramObj={};
          paramObj.id = item.id;
          if(confirm('确定要删除吗')==true){
            this.http.get("/tzgg/delTzgg",paramObj,this.deleteBmyjzlCallBack,this,false);
          }
        }else{//新增进去的框
          var title=(item.title==null?"":item.title);
          var time=(item.time==null?"":item.time);
          var unit=(item.unit==null?"":item.unit);
          for(var i=0;i<this.bmyjzlUpdateList.length;i++){
              if(this.bmyjzlUpdateList[i].id){
                continue;
              }
              var title2=(this.bmyjzlUpdateList[i].title==null?"":this.bmyjzlUpdateList[i].title);
              var time2=(this.bmyjzlUpdateList[i].time==null?"":this.bmyjzlUpdateList[i].time);
              var unit2=(this.bmyjzlUpdateList[i].unit==null?"":this.bmyjzlUpdateList[i].unit);
              if(title==title2&&time==time2&&unit==unit2){
                this.bmyjzlUpdateList.splice(i, 1);
                break;
              }
          }
        }
      },
      deleteBmyjzlCallBack(data){
        this.getBmyjzl();
        this.$Message.success("删除成功");
      },
      addBmyjzl(){
        var obj={};
        this.bmyjzlUpdateList.unshift(obj);
      },
      insertBmyjzl(item){
        if(item.title==""||item.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.unit==""||item.unit==null){
          this.$Message.error("单位不能为空");
          return;
        }
        var paramObj={};
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.unit = item.unit;
        paramObj.type="bmyjzl";
        this.http.get("/tzgg/saveTzgg",paramObj,this.insertBmyjzlCallBack,this,false);
      },
      insertBmyjzlCallBack(data){
        this.getBmyjzl();
        this.$Message.success("新增成功");
      },
      //---------------------------------------各市预警指令-------------------------------------
      hidegeshiyujingzhilingModal(){
        this.showgeshiyujingzhiling = false;
      },
      showgeshiyujingzhilingModal(){
        this.showgeshiyujingzhiling = true;
      },
      getGsyjzl(){//获取今日接报
        var paramObj={};
        paramObj.type="gsyjzl";
        this.http.get("/tzgg/getTzgg",paramObj,this.getGsyjzlCallBack,this,false);
      },
      getGsyjzlCallBack(data){
        this.gsyjzlUpdateList = [];
        for(var i=1;i<=data.data.length;i++){
          data.data[i-1].xh = i;
          this.gsyjzlUpdateList.push(Object.assign({},data.data[i-1]));
        }
        this.gsyjzlList = data.data;
      },
      updateGsyjzl(item){
        if(item.title==""||item.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.unit==""||item.unit==null){
          this.$Message.error("单位不能为空");
          return;
        }
        var paramObj={};
        paramObj.id = item.id;
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.unit = item.unit;
        this.http.get("/tzgg/updateTzgg",paramObj,this.updateGsyjzlCallBack,this,false);
      },
      updateGsyjzlCallBack(data){
        this.getGsyjzl();
        this.$Message.success("修改成功");
      },
      deleteGsyjzl(item){
        if(item.id){
          var paramObj={};
          paramObj.id = item.id;
          if(confirm('确定要删除吗')==true){
            this.http.get("/tzgg/delTzgg",paramObj,this.deleteGsyjzlCallBack,this,false);
          }
        }else{//新增进去的框
          var title=(item.title==null?"":item.title);
          var time=(item.time==null?"":item.time);
          var unit=(item.unit==null?"":item.unit);
          for(var i=0;i<this.gsyjzlUpdateList.length;i++){
              if(this.gsyjzlUpdateList[i].id){
                continue;
              }
              var title2=(this.gsyjzlUpdateList[i].title==null?"":this.gsyjzlUpdateList[i].title);
              var time2=(this.gsyjzlUpdateList[i].time==null?"":this.gsyjzlUpdateList[i].time);
              var unit2=(this.gsyjzlUpdateList[i].unit==null?"":this.gsyjzlUpdateList[i].unit);
              if(title==title2&&time==time2&&unit==unit2){
                this.gsyjzlUpdateList.splice(i, 1);
                break;
              }
          }
        }
      },
      deleteGsyjzlCallBack(data){
        this.getGsyjzl();
        this.$Message.success("删除成功");
      },
      addGsyjzl(){
        var obj={};
        this.gsyjzlUpdateList.unshift(obj);
      },
      insertGsyjzl(item){
        if(item.title==""||item.title==null){
          this.$Message.error("标题不能为空");
          return;
        }
        if(item.time==""||item.time==null){
          this.$Message.error("时间不能为空");
          return;
        }
        if(item.unit==""||item.unit==null){
          this.$Message.error("单位不能为空");
          return;
        }
        var paramObj={};
        paramObj.title = item.title;
        paramObj.time = item.time;
        paramObj.unit = item.unit;
        paramObj.type="gsyjzl";
        this.http.get("/tzgg/saveTzgg",paramObj,this.insertGsyjzlCallBack,this,false);
      },
      insertGsyjzlCallBack(data){
        this.getGsyjzl();
        this.$Message.success("新增成功");
      },
      //-----------------------------公安日历------------------------
      selectDateItem(val,title){
        this.selectDate=val;
        this.selectTitle=title;
      },
      showgonganriliModal(){
        if(this.selectDate==""){
          this.$Message.error("请选择日历上的日期");
          return;
        }
        this.showgonganrili = true;
      },
      hidegonganriliModal(){
        this.showgonganrili = false;
      },
      saveGarl(){
        if(this.selectTitle==""||this.selectTitle==null){
          this.$Message.error("内容不能为空");
          return;
        }
        if(this.selectDate==""||this.selectDate==null){
          this.$Message.error("日期不能为空");
          return;
        }
        var paramObj={};
        paramObj.title = this.selectTitle;
        paramObj.time = this.selectDate;
        paramObj.type="garl";
        this.http.get("/tzgg/saveTzgg",paramObj,this.saveGarlCallBack,this,false);
      },
      saveGarlCallBack(data){
        this.$Message.success("添加成功");
        this.showgonganrili = false;
        this.refreshGarlFlag = !this.refreshGarlFlag;
        this.getGarlRecent();
      },
      deleteGarl(){
        if(this.selectDate==""){
          this.$Message.error("请选择日历上的日期");
          return;
        }
        var paramObj={};
        paramObj.time = this.selectDate;
        if(confirm('确定要删除吗')==true){
          this.http.get("/tzgg/delTzggGarl",paramObj,this.deleteGarlCallBack,this,false);
        }
      },
      deleteGarlCallBack(){
        this.refreshGarlFlag = !this.refreshGarlFlag;
        this.$Message.success("删除成功");
        this.getGarlRecent();
      },
      getGarlRecent(){
        this.http.get("/tzgg/getGarlRecent",null,this.getGarlRecentCallBack,this,false);
      },
      getGarlRecentCallBack(data){
        this.garlRecent={};
        if(data.data!=null){
          this.garlRecent = data.data;
        }
      }
  },
  mounted(){
    this.getJrzdgz();
    this.getXxssfb();
    this.getJrwdfb();
    this.getJrjbxx();
    this.getXwyqbb();
    this.getWlyqfx();
    this.getDtyjzl();
    this.getBmyjzl();
    this.getGsyjzl();
    this.getGarlRecent();
  },
  beforeDestroy(){
  }
}
</script>

<style scoped>
.panel{
  position: relative;
  width: 100%;
  height: 100%;
}
.gonganrili{
  position:absolute;
  left: 5px;
  top: 0px;
  width: 32%;
  height: 32%;
}
.xinxishishifabu{
  position:absolute;
  right: 5px;
  top: 0px;
  width: 32%;
  height: 32%;
}
.jinrizhongdianguanzhu{
  position:absolute;
  right: calc(32% + 10px);
  left:calc(32% + 10px);
  top: 0px;
  height: 32%;
}

.jinriwendianfabu{
  position:absolute;
  left: 5px;
  top: calc(32% + 5px);
  bottom: calc(32% + 10px);
  width: 24%;
}
.wangluoyuqingfenxi{
  position:absolute;
  right: 5px;
  top: calc(32% + 5px);
  bottom: calc(32% + 10px);
  width: 24%;
}
.zhongjian2{
  position:absolute;
  left: calc(24% + 10px);
  right: calc(24% + 10px);
  top: calc(32% + 5px);
  bottom: calc(32% + 10px);
}
.jinrijiebaoxinxi{
  position:absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: calc(50% - 2.5px);
}
.xinwenyuqinbobao{
  position:absolute;
  right: 0px;
  top: 0px;
  height: 100%;
  width: calc(50% - 2.5px);
}


.datingyujingzhiling{
  position:absolute;
  left: 5px;
  bottom: 5px;
  width: 32%;
  height: 32%;
}
.geshiyujingzhiling{
  position:absolute;
  right: 5px;
  bottom: 5px;
  width: 32%;
  height: 32%;
}
.bumenyujingzhiling{
  position:absolute;
  right: calc(32% + 10px);
  left:calc(32% + 10px);
  bottom: 5px;
  height: 32%;
}

.titleDiv{
  height: 35px;
  width: 100%;
  line-height: 35px;
  color: white;
  text-align: center;
  font-size:18px;
  background:url(./../../../assets/datascreen/qidong/tongzhigonggao/titlebj.jpg) center no-repeat;
  background-size:110% 110%;
  user-select: none;
}
.box{
  border: 3px solid rgba(21,68,112);
  border-radius: 5px;
}
.contentDiv{
  width: calc(100% - 6px);
  height: calc(100% - 35px - 6px);
  margin: 3px;
  overflow: hidden;
}

.gonganriliContent{
  clear: both;
  border: 2px solid rgba(49,86,128);
}

.jinrizhongdianguanzhuItem{
  position: relative;
  width: calc(100% - 20px);
  height:calc(25% - 12.5px);
  background:rgba(16,37,66,0.7);
  margin: 10px;
  border: 1px solid rgba(49,86,128);
  padding: 5px 5px 5px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
}
.jinrizhongdianguanzhuItemNum{
  height: 100%;
  width: 50px;
  color: yellow;
  font-size: 20px;
  border-right: 3px solid rgba(49,86,128);
  display: flex;
  align-items: center;
  justify-content: center;
}
.jinrizhongdianguanzhuItemDesc{
  height: 100%;
  width: calc(100% - 50px);
  color: rgb(114,191,211);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 20px;
}
.xinxishishifabuTimeDiv{
  height: 25px;
  background: linear-gradient(90deg,rgba(2, 58, 241,0) 0,rgba(2, 58, 241,0.5) 50%,rgba(2, 58, 241,0) 100%);
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.xinxishishifabuTimeDiv span{
  color: yellow;
  font-size: 15px;
  margin-left: 10%;
}
.xinxishishifabuContent{
  background: linear-gradient(90deg,rgba(0, 0, 0,0.1) 0,rgba(0, 0, 0,0.8) 50%,rgba(0, 0, 0,0.5) 100%);
  height: calc(100% - 35px);
  color: rgb(114,191,211);
  font-size: 15px;
  padding: 20px;
}
.jinriwendianfabuTitleDiv{
  height: 25px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
  padding-left: 25px;
  padding-right: 10px;
}
.jinriwendianfabuTitleDiv span{
  color: #539ff5;
  font-size: 14px;
}
.jinriwendianfabuContent{
   height: calc(100% - 35px);
   position: relative;
}
.jinriwendianfabuContent > div{
    background:url(./../../../assets/datascreen/qidong/tongzhigonggao/kuang1.png) center no-repeat;
    background-size:100% 100%;
    height: 30%;
    margin-bottom: 2%;
    display:flex;
    align-items: center;
    justify-content: flex-start;
}
.jinriwendianfabuContent-time{
  color: white;
  height: 100%;
  width: 30%;
  display:flex;
  align-items: center;
  justify-content:center;
  font-size: 12px;
}
.jinriwendianfabuContent-desc{
  color: white;
  height: 100%;
  width: 52%;
  display:flex;
  align-items: center;
  justify-content:flex-start;
  font-size: 12px;
  padding-left:10px;
  padding-right: 10px;
}
.jinriwendianfabuContent-dw{
  color: white;
  height: 100%;
  width: 18%;
  display:flex;
  align-items: center;
  justify-content:center;
  font-size: 12px;
}
.jinrijiebaoxinxiTitleDiv{
  height: 25px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
  padding-left: 25px;
  padding-right: 10px;
}
.jinrijiebaoxinxiTitleDiv span{
  color: #539ff5;
  font-size: 14px;
}
.jinrijiebaoxinxiContent{
   height: calc(100% - 35px);
}
.jinrijiebaoxinxiContent > div{
    background:url(./../../../assets/datascreen/qidong/tongzhigonggao/kuang2.png) center no-repeat;
    background-size:100% 100%;
    height: 32%;
    margin-bottom: 1.5%;
    display:flex;
    align-items:start;
    justify-content: flex-start;
}
.jinrijiebaoxinxiContent-time{
  color: white;
  height: 68%;
  width: 25%;
  display:flex;
  align-items: center;
  justify-content:center;
  font-size: 12px;
}
.jinrijiebaoxinxiContent-desc{
  color: white;
  margin-top: 2.9%;
  height: 71%;
  width: 57%;
  display:flex;
  align-items: center;
  justify-content:flex-start;
  font-size: 12px;
  padding-left:10px;
  padding-right: 10px;
}
.jinrijiebaoxinxiContent-dw{
  color: white;
  margin-top: 2.9%;
  height: 71%;
  width: 18%;
  display:flex;
  align-items: center;
  justify-content:center;
  font-size: 12px;
  text-align:center;
  padding-left: 2px;
  padding-right: 5px;
}
.xinwenyuqinbobaoItem{
  position: relative;
  width: calc(100% - 20px);
  height:50px;
  background:rgba(16,37,66,0.7);
  margin: 10px;
  border: 1px solid rgba(49,86,128);
  padding: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
}
.xinwenyuqinbobaoItemNum{
  height: 100%;
  width: 30px;
  color: yellow;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.xinwenyuqinbobaoItemDesc{
  height: 100%;
  width: calc(100% - 30px);
  color: rgb(114,191,211);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 10px;
}
.xinwenyuqinbobaoItem > span{
  display: block;
  width: 50px;
  height: 100%;
  border-radius: 50%;
  margin-left: -18px;
  background: #1597E2;
  z-index:1;
  position:absolute;
}
.wangluoyuqingfenxiContentDiv{
    background:url(./../../../assets/datascreen/qidong/tongzhigonggao/kuang3.png) center no-repeat;
    background-size:100% 100%;
    height: 32%;
    margin-bottom: 1.5%;
    display:flex;
    align-items:start;
    justify-content: flex-start;
}
.wangluoyuqingfenxiContentDiv_num{
  height: 57%;
  width: 13%;
  display:flex;
  align-items:center;
  justify-content:center;
  color: white;
  font-size: 20px;
}
.wangluoyuqingfenxiContentDiv_desc{
  height: 89%;
  width: 87%;
  display:flex;
  align-items:center;
  justify-content:flex-start;
  color: white;
  font-size: 12px;
}
.contentborder{
  border: 1px solid rgb(113, 114, 117);
  margin: 7px;
  width: calc(100% - 14px);
  height: calc(100% - 35px - 14px);
  background:rgba(43, 124, 216, 0.3);
}
.datingyujingzhilingContent_title{
  height:30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 14px;
}
.datingyujingzhilingContent{
  width: 100%;
  height:calc(100% - 30px);
}
.datingyujingzhilingContentDiv{
  width: 100%;
  height: 33%;
  display: flex; 
  align-items: center;
  justify-content: space-between;
  border-image:linear-gradient(90deg,rgba(75, 136, 177, 0) 0,rgba(75, 136, 177, 0.7) 50%,rgba(75, 136, 177, 0) 100%) 1 0;
  border-top: 3px solid rgba(75, 136, 177, 0.7);
  color: white;
  font-size: 14px;
}
.datingyujingzhilingContentDiv_time{
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.datingyujingzhilingContentDiv_title{
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content:flex-start;
}
.datingyujingzhilingContentDiv_jjcd{
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content:center;
  text-align: center;
}
.rowone{
  color: yellow;
  background: linear-gradient(90deg,rgba(1,100,131, 0) 0,rgba(1,100,131, 0.8) 20%,rgba(1,100,131, 0.8) 80%,rgba(1,100,131, 0) 100%);
}

.configClass{
  position:absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  display: none;
}
.titleDiv:hover .configClass{
   display:block;
}
.ModalClass >>> .ivu-modal-content{
  border: rgb(91, 107, 114) 1px solid;
}
</style>
