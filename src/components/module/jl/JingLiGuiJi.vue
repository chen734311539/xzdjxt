<template>
    <div class="ssjl-gjcx-cont">
        <div class="ssjl-gjcx-left">
            <table>
                      <tr class="gj-search">
                        <td><span>设备编号 :</span></td>
                        <td>
                          <div>
                            <input type="text" v-model="gpsname" class="gjsearch-sb">
                              <!-- <Button type="primary" size="small" style="width:64px;margin-left:10px;" @click="getJlGj">查询</Button> -->
                              <HfxButton @click="getJlGj" name="查询" />
                          </div>
                        </td>
                      </tr>
                      <tr class="gj-hftime">
                        <td><span>回放时间 :</span></td>
                        <td>
                          <div>
                            <span v-for="timeObj in selectitem" :key="timeObj.index" :data="timeObj" :class="{hftimeActive:timeObj.isClick}" @click="changetime(timeObj.index,timeObj.time)">{{timeObj.item}}</span>
                          </div>
                        </td>
                      </tr>
                      <tr class="gj-hftime-show ">
                        <td></td>
                        <td style="position:relative;left:-60px;">
                          <div>
                            <DatePicker v-model="initTime" @on-change="timechange" type="datetimerange" class="gj-timeselect" size="small" placeholder="选择起止时间" format="yyyy-MM-dd HH:mm:ss" style="width: 276px"></DatePicker>
                          </div>
                        </td>
                      </tr>
                      <tr class="gj-hfspeed">
                        <td><span>回放速度 :</span></td>
                        <td>
                          <div class="speedsele">
                            <RadioGroup v-model="disabledNum" @on-change="changePlayspeed">
                                <Radio label="1" >1倍</Radio>
                                <Radio label="2">2倍</Radio>
                                <Radio label="4">4倍</Radio>
                                <Radio label="8">8倍</Radio>
                                <Radio label="16">16倍</Radio>
                            </RadioGroup>
                          </div>
                        </td>
                      </tr>
                      <tr class="gj-hfspeed-show">
                        <td><span>回放进度 :</span></td>
                        <td>
                          <div>
                              <el-slider v-model="gjslider" :max="gjslidermax" :show-tooltip="false" @change="changeSlider" class="jlgj_slider"></el-slider>
                              <!-- <HfxButton v-show="showgjplay"  @click="playJlGj" name="播放" />
                              <HfxButton  v-show="showgjstop" @click="stopJlGj" name="停止"/> -->
                          </div>
                        </td>
                      </tr>                      
                      <tr class="gj-drivenspeed" id="gjspeedinput">
                        <td><span>操作 :</span></td>
                        <td>
                            <!-- <HfxButton v-show="showgjplay"  @click="test3dGj" name="播放" /> -->
                            <HfxButton v-show="showgjplay"  @click="playJlGj" name="播放" />
                            <HfxButton  v-show="showgjstop" @click="stopJlGj" name="停止"/>
                        </td>    
                      </tr>
                      <tr class="gj-drivenspeed" id="gjspeedinput">
                        <td><span>行驶速度 :</span></td>
                        <td>
                          <div><span id="gjdrspeed">{{speed}}</span></div>
                        </td>
                      </tr>
                      <tr class="gj-drivenspeed" >
                        <td><span>轨迹长度 :</span></td>
                        <td>
                          <div><span id="gjdistance">{{distance}}</span></div>
                        </td>
                      </tr>
        </table>
        </div>
        <div class="ssjl-gjcx-right">
            <div class="tableclass">
            <HfxTable ref="table" :data="jlgjlist" :columns="columns" >
                <template #formartxh="{row,index}">
                    <span>{{index+1}}</span>
                </template>
            </HfxTable>
            </div>
        </div>
    </div>
</template>

<script>
//iconfont iconzhaopian
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import HfxTable from '@/components/base/HfxTable'

export default {
  name: 'JingLiGuiJi',
  props:['gpsdata'],
  components: {HfxTable},
  data () {
    return {
        starttime:"",
        endtime:"",
        selectitem:[
            {index:0,time:1,isClick:true,item:'1小时'},
            {index:1,time:3,isClick:false,item:'3小时'},
            {index:2,time:6,isClick:false,item:'6小时'},
            {index:3,time:24,isClick:false,item:'1天'}
        ],
        initTime:[],
        disabledNum:"4",
        gjslider:0,
        gjslidermax:100,
        gjindex:0,
        showgjplay:true,
        showgjstop:false,
        distance:"",
        speed:"",
        jlgjlist:[],
        columns: [
            {
                title: '序号',
                key: 'gpsid',
                width:20,
                slot:'formartxh',
            },
            {
                title: '时间',
                key: 'uptime',
                 width:60,
            },
            {
                title: '速度',
                key: 'speed',
                 width:20,
            },
        ],
      }
  },
  computed: {
    gpsname: function () {
      return this.gpsdata.gpsname;
    }
  },
  methods:{
    getJlGj(){
        var paramObj = {};
        paramObj.starttime = this.starttime;
        paramObj.endtime = this.endtime;
        paramObj.gpsid = this.gpsdata.gpsid;
        this.http.get("/ssjl/getSsjlGuijiByGpsid",paramObj,this.getSsjlGuijiByGpsidCallBack,this,false);
    },
    getSsjlGuijiByGpsidCallBack(result){
       markUtil.clearLayer("ssjlgjlayer",this);//清除轨迹所有图层
       markUtil.clearLayer("ssjlgjlinelayer",this);//清除轨迹所有图层
       clearInterval(this.gjtimer);//清除定时器
       this.gjtimer = null;
       this.distance = result.distance/1000+"千米";
       this.jlgjlist = result.gpslist;
       this.gjslidermax = result.gpslist.length-1;
       this.gjslider = 0;
       yewuMarkUtil.addSingleMark(this.jlgjlist[0],"ssjlgjlayer",require("./../../../assets/jl/ssjl_gj_start.png"),"starting",this);
       markUtil.moveMap(this.jlgjlist[0].xpos,this.jlgjlist[0].ypos,this);
       yewuMarkUtil.addSingleMark(this.jlgjlist[this.jlgjlist.length-1],"ssjlgjlayer",require("./../../../assets/jl/ssjl_gj_end.png"),"endding",this);
    },
    timechange(date){
        this.starttime = date[0];
        this.endtime = date[1];
    },
    changePlayspeed(value){
      this.playspeed = 500/value;
      this.playJlGj(this.gjindex);
    },
    changeSlider(value){
      if(this.jlgjlist.length == 0){
        this.gjslider = 0;
        return;
      }
      if(value==null){
        return;
      }
      markUtil.clearLayer("ssjlgjlinelayer",this);//清除轨迹所有图层
      clearInterval(this.gjtimer);//清除定时器
      this.gjtimer = null;
      this.gjindex = value;
      this.playJlGj(value);
    },
    playJlGj(){
        if(this.jlgjlist.length==0){
          return;
        }
        var index = this.gjindex;
        this.showgjplay = false;
        this.showgjstop = true;
        clearInterval(this.gjtimer);
        this.gjtimer=null;
        this.map.map.infoWindow.hide();
        var that = this;
        if(this.gjtimer==null){
            this.gjtimer = setInterval(function (){//轨迹的定时器
            if (index <= that.jlgjlist.length-1) {
                        that.jlgjlist[index].id  = that.jlgjlist[index].gpsid;
                        markUtil.clearMark("ssjlgjlayer",that.jlgjlist[index].gpsid + "loading",that);//清除正在打点的点位
                        yewuMarkUtil.addSingleMark(that.jlgjlist[index],"ssjlgjlayer",require("./../../../assets/jl/guiji.png"),"loading",that);
                        // markUtil.moveMap(that.jlgjlist[index].xpos,that.jlgjlist[index].ypos,that);
                        yewuMarkUtil.addTraceLine(that.jlgjlist[index],"ssjlgjlinelayer",that);//画轨迹
                        that.speed = that.jlgjlist[index].speed+"km/h  "+ that.jlgjlist[index].uptime;
                        that.gjslider = index;
                        index++;
                        that.gjindex = index;
            } else {
              clearInterval(that.gjtimer);
              that.gjindex = 0;
              that.showgjplay = true;
              that.showgjstop = false;
            }
          }, that.playspeed);
        }
    },
    test3dGj(){
       if(this.jlgjlist.length==0){
            return;
       }
       this.$emit('replay',this.jlgjlist);
      //  map3DUtil.rePlayTrailLine(this.jlgjlist);
    },
    stopJlGj(){
      this.showgjstop = false;
      this.showgjplay = true;
      clearInterval(this.gjtimer);
    },
    changetime(index,time){
        for(var x=0;x<this.selectitem.length;x++){
            if(x==index){
                this.selectitem[x].isClick = true;
            }else{
                this.selectitem[x].isClick = false;
            }
        }
        var start = new Date();
        var end = new Date();
        start.setTime(start.getTime()-3600*1000*time);
        this.initTime = [start,end];
        this.starttime = this.formartDate(start);
        this.endtime = this.formartDate(end);
    },
    formartDate(param){
      var date = new Date(param);
       var Y = date.getFullYear() + '-';
       var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
       var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
       var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
       var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
       var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      var time = Y + M + D + h + m + s;
       return time;
    },
  },
  created(){
  },
    mounted(){
        var start = new Date();
        var end = new Date();
        start.setTime(start.getTime()-3600*1000*1);
        this.initTime = [start,end];
        this.starttime = this.formartDate(start);
        this.endtime = this.formartDate(end);
  },
  destroyed: function(){
      //离开页面时清除定时器
      clearInterval(this.gjtimer);
      this.gjtimer = null;
  }
}
</script>

<style scoped>
.ssjl-gjcx-cont {
    padding: 10px 5px 5px 10px;
    height: 330px;
    display: flex;
}
.ssjl-gjcx-left table tr{
    height: 36px;
}
.ssjl-gjcx-right {
    width: 314px;
}
.gj-hftime-show .gj-showdate {
    display: none;
    width: 260px;
    height: 46px;
    margin: 6px 0px;
    position: relative;
    left: 0px;
}
.gj-hftime-show div span {
    display: inline-block;
    width: 114px;
    vertical-align: middle;
    padding: 8px 2px;
    margin: 2px 0px;
}
.gj-hftime-show div b {
    margin-right: 6px;
}
.gj-hftime div span {
    display: inline-block;
    width: 46px;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    text-align: center;
    border-radius: 3px;
    margin: 3px;
}
.gj-hftime div span:hover {
    background: #b0b0b0;
    color: #333;
}
.gj-hftime div .hftime-active {
    background: #b0b0b0;
    color: #333;
}
.gj-hfspeed div span {
    display: inline-block;
    width: 43px;
    height: 24px;
    line-height: 24px;
    text-align: center;
}
.gj-hfspeed span input {
    position: relative;
    top: 2px;
}
.gj-hfspeed-show div,
.gj-drivenspeed div {
    height: 32px;
    line-height: 32px;
    position: relative;
}
.gj-hfspeed-show p {
    position: relative;
    height: 10px;
    width: 120px;
    border-radius: 10px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    top: 12px;
    margin-left: 10px;
}
.gj-hfspeed-show #gjspeed {
    width: 120px;
    border-radius: 3px;
    height: 10px;
    position: relative;
}
.gj-drivenspeed div {
    margin-left: 6px;
    top: -3px;
}
.gj-drivenspeed div span {
    display: inline-block;
    vertical-align: middle;
}
#gjdrspeed {
    max-width: 160px;
    overflow: hidden;
}
.gj-hfspeed div {
    margin: 3px 0 3px 4px;
}
.ssjl-gjcx-left table tr td:nth-child(1) {
    text-align: right;
    padding-right: 3px;
}
.gj-info {
    height: 200px;
    overflow-y: auto;
    float: left;
    padding: 0;
    margin: 0;
    color: #2C2929;
}
.gj-info .tbody {
    float: left;
    cursor: pointer;
}
.gj-info .tbody:hover {
    background: #4e4e4e;
}
.gj-play {
    display: inline-block;
    position: absolute;
    left: 169px;
    top: 3px;
    width: 28px;
    height: 26px;
    background-color: #059921;
    border-radius: 6px;
    cursor: pointer;
}
.gj-play i {
    display: inline-block;
    position: absolute;
    left: 10px;
    top: 7px;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 11px solid #fff;
}
.gj-stop::before,
.gj-stop::after {
    display: inline-block;
    position: absolute;
    top: 6px;
    width: 5px;
    height: 14px;
    background: #fff;
    content: "";
}
.gj-stop::before {
    left: 7px;
}
.gj-stop::after {
    left: 16px;
}
.gjsearch-sb{
  width: 187px;
  height: 26px;
  outline: none;
  color: #b6f6ff;
  padding: 0 5px;
  margin-right: 3px;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.gj-timeselect >>> .ivu-input{
    background-color: transparent;
    color: #b6f6ff;
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    border-radius:0px;
    font-size: 12px;
    border: 1px solid #b6f6ff;
    background-image: none;
    position: relative;
    cursor: text;
}
/* 修改placehoder的字体大小和颜色 */
.gj-timeselect >>>  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #b6f6ff;
  font-size: 14px;
}
.gj-timeselect >>> .ivu-select-dropdown{
    background-color: #08385a;
    color: #b6f6ff;
}
.hftimeActive {
    background: #b0b0b0 !important;
    color: #333 !important;
}
.tableclass{
    height: 100%;
    overflow: auto;
}
</style>
<style>
.jlgj_slider{
    width: 238px;
    position: relative;
    top: -6px;
    left: 9px;
}
.gj-timeselect  .ivu-input-prefix  i, .ivu-input-suffix  i {
    font-size: 16px;
    line-height: 32px;
    color: #b6f6ff;
}
.el-slider__button-wrapper {
    z-index: 0 !important;
}
</style>