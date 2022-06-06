<template>
    <div class="ssyjRightPanel">
      <LeftContentNameBar :isshowshaixuan="false" :isshowclose="true"  style="margin:0 0 0 0;" />
        <div class="headerPanel">
          <div class="ssyjtabletitle">
            <span v-if="yxjqList.length>0">{{yxjqList[0].date.replace("-","年")}}月{{yxjqList[0].label}}全县接报警三色预警情况</span>
          </div>
        </div>
        <div class="contentPanel" ref="contentPanel">
          <div v-show="yxjqList.length>0" style="height:160px;margin-bottom:20px;">
            <div  style="height:32px;" class="tabletype">
              有效警情
            </div>
            <div class="tablecontent">
              <div class="tableColumn" style="width:8.4%;">
                <div>地区</div> <div>今年</div> <div>去年同期</div> <div>同比</div>
              </div>
              <div class="tableColumn"  style="width:8.4%;"  v-for="Obj in yxjqList" :key="Obj.deptname">
                <div>{{Obj.deptname}}</div> <div>{{Obj.thisyear}}</div> <div>{{Obj.lastyear}}</div> <div :class="getClassByScale(Obj.scale)" >{{Obj.scale}}</div>
              </div>
            </div>
          </div>
          <div v-show="xsjqList.length>0" style="height:160px;margin-bottom:20px;">
            <div  style="height:32px;" class="tabletype">
              刑事警情
            </div>
            <div class="tablecontent">
              <div class="tableColumn" style="width:9.1%;">
                <div>地区</div> <div>今年</div> <div>去年同期</div> <div>同比</div>
              </div>
              <div class="tableColumn"  style="width:9.1%;"  v-for="Obj in xsjqList" :key="Obj.deptname">
                <div>{{Obj.deptname}}</div> <div>{{Obj.thisyear}}</div> <div>{{Obj.lastyear}}</div> <div :class="getClassByScale(Obj.scale)" >{{Obj.scale}}</div>
              </div>
            </div>
          </div>
          <div v-show="zajqList.length>0" style="height:160px;margin-bottom:20px;">
            <div  style="height:32px;" class="tabletype">
              治安警情
            </div>
            <div class="tablecontent">
              <div class="tableColumn" style="width:9.1%;">
                <div>地区</div> <div>今年</div> <div>去年同期</div> <div>同比</div>
              </div>
              <div class="tableColumn"  style="width:9.1%;"  v-for="Obj in zajqList" :key="Obj.deptname">
                <div>{{Obj.deptname}}</div> <div>{{Obj.thisyear}}</div> <div>{{Obj.lastyear}}</div> <div :class="getClassByScale(Obj.scale)" >{{Obj.scale}}</div>
              </div>
            </div>
          </div>
          <div v-show="twzpjqList.length>0" style="height:160px;margin-bottom:20px;">
            <div  style="height:32px;" class="tabletype">
              通讯网络诈骗
            </div>
            <div class="tablecontent">
              <div class="tableColumn" style="width:9.1%;">
                <div>地区</div> <div>今年</div> <div>去年同期</div> <div>同比</div>
              </div>
              <div class="tableColumn"  style="width:9.1%;"  v-for="Obj in twzpjqList" :key="Obj.deptname">
                <div>{{Obj.deptname}}</div> <div>{{Obj.thisyear}}</div> <div>{{Obj.lastyear}}</div> <div :class="getClassByScale(Obj.scale)" >{{Obj.scale}}</div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'SsyjRightPanel',
  components: {LeftContentNameBar},
  data () {
    return {
      yxjqObj:[],
    }
  },
  computed: mapState({
    yxjqList: state => state.ssyj.yxjqList,
    xsjqList: state => state.ssyj.xsjqList,
    zajqList: state => state.ssyj.zajqList,
    twzpjqList: state => state.ssyj.twzpjqList,
  }),
  methods:{
    getClassByScale(scale){
       var scalenumber = Number(scale.replace("%","").replace(",",""));
        var classname = "table-cell-green";
        if(scalenumber>=10&&scalenumber<=15){
          classname = "table-cell-yellow";
        }
        if(scalenumber>15){
          classname = "table-cell-red";
        }
        return classname;
    },
  },
  created(){
    
  },
  mounted(){
  }
}
</script>

<style scoped>
.ssyjRightPanel{
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
    width: 100%;
    line-height: 40px;
    left: 50%;
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
</style>

