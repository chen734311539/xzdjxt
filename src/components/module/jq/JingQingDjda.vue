<template>
    <Modal title="盯警盯案单位选择" class-name="djda-panel" v-model="show" :draggable="true">
          <div slot="close" @click="closePanel"><div class="hfx-modal-close"/></div>
          <Divider v-show="jdjadeptlist.length>0" orientation="center" class="line">选择部门</Divider>
          <CheckboxGroup v-show="jdjadeptlist.length>0" v-model="jdjadeptselect">
            <Checkbox v-for="(obj,index) in jdjadeptlist" :key="index" :label="obj.deptcode">{{obj.deptname}}</Checkbox>
          </CheckboxGroup>
          <div slot="footer">
            <HfxButton  @click="closePanel" name="取消"/>
            <HfxButton  @click="submitDjdaDept" />
          </div>
        </Modal>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"

export default {
  name: 'JingQingDjda',
  props: ['jqdata','show'],
  components: {},
  data () {
    return {
        jdjadeptlist:[],
        jdjadeptselect:[],
    }
  },
  computed: mapState({
  }),
  methods:{
      closePanel(){
        this.$emit('on-close');
      },
      submitDjdaDept(){
          var param = {};
          param.jqid = this.jqdata.id;
          param.deptcodes = this.jdjadeptselect.join(",");
          this.http.get("/djda/setAlarmDjdaDept",param,this.setAlarmDjdaDeptCallBack,this,false);
      },
      setAlarmDjdaDeptCallBack(){
          this.$Message.success("派发盯警盯案成功！");
          this.closePanel();
      },
      getDjdaSelectDept(jqobj){
        this.http.get("/djda/getDjdaSelectDept",{jqid:jqobj.id},this.getDjdaSelectDeptCallBack,this,false);
      },
      getDjdaSelectDeptCallBack(data){
         this.jdjadeptlist = data.list;
         for(var i in data.selectdept){
          this.jdjadeptselect.push(data.selectdept[i].deptcode);
         }
      }
  },
  created(){
     
  },
  mounted(){
      
  },
  watch: {
      jqdata:function(val){
          this.jdjadeptselect = [];
          this.getDjdaSelectDept(val);
      }
  }
}
</script>

<style scoped>
.djda-panel{
    height: 100%;
    width: 260px;
    float: left;
    border: 1px solid #2c6daf;
}
</style>
<style>
.djda-panel .ivu-modal .ivu-modal-content{
  left: 1310px;
  top: 164px;
  width: 430px !important;
}
.djda-panel .ivu-modal .ivu-modal-header{
  height: 45px !important;
}
.djda-panel .ivu-checkbox-group-item{
    width: 40%;
    height: 30px;
    line-height: 30px;
    text-align: left;
    position: relative;
    margin-left: 30px;
}
</style>
