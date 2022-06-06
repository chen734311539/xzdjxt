<template>
    <Modal v-model="showdata.showmodal" :draggable = "true" :footer-hide="true" :title="title" class-name="fkqEditItem-panel">
        <div style="display:block;">
            <div style="height: 430px;">
                <div class="fkqEditPanel">
                    <div class="modal-div">
                        <span>防控内容：</span>
                        <Input type="textarea" :autosize="true" class="fkqtextarea" v-model="fknr"/>
                    </div>
                    <div class="modal-div">
                        <span>防控要求：</span>
                        <Input type="textarea" :autosize="true" class="fkqtextarea" v-model="fkyq"/>
                    </div>
                    <!-- <div class="modal-div">
                        <span>一级范围：</span>
                        <el-input-number v-model="firstradius" class="numberinput" size="small" controls-position="right" :step="50" :min="50" :max="10000"/>
                    </div>
                    <div class="modal-div">
                        <span>二级范围：</span>
                        <el-input-number v-model="secondradius" class="numberinput" size="small" controls-position="right" :step="50" :min="50" :max="10000"/>
                    </div>
                    <div class="modal-div">
                        <span>三级范围：</span>
                        <el-input-number v-model="thirdradius" class="numberinput" size="small" controls-position="right" :step="50" :min="50" :max="10000"/>
                    </div> -->
                </div>
            </div>
            <div class="fkqEditBtn">
                <!-- <Button type="primary" size="small" @click="editFkqItem">确定</Button>
                <Button type="text" size="small" @click="closeFkq">取消</Button> -->
            </div>
        </div>
    </Modal>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'

export default {
  name: 'FkqShowInfo',
  inject:['reflashItem'],//接收父页面的方法
  props:['showdata'],
  components: {},
  data () {
    return {
        title:"",
        fknr:"",
        fkyq:"",
        firstradius:"50",
        secondradius:"100",
        thirdradius:"200",
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo,
  }),
  methods:{
      initEditValues(){//初始化修改的值
        var paramObj = {};
        paramObj.id = this.data.id;
        this.http.get("/znfk/getFkqItemByid",paramObj,this.getFkqItemByidCallBack,this,false);
      },
      getFkqItemByidCallBack(result){
          this.title = result.title;
          this.fknr = result.fknr;
          this.fkyq = result.fkyq;
          this.firstradius = result.firstradius;
          this.secondradius = result.secondradius;
          this.thirdradius = result.thirdradius;
          this.showThreeCircle(result);
      },
      showThreeCircle(data){
        markUtil.drawThreeCircle(data.loc.x,data.loc.y,data,this);
      }
      
  },
  created(){
    
  }
}
</script>
<style scoped>
.fkqEditPanel{
    width: 480px;
    height: 430px;
    float: left;
}
.fkqEditBtn{
    text-align: center;
}
.modal-div{
  margin: 0 0 6px 0;
}
.modal-div span{
  float: left;
  width: 60px;
  text-align: right;
  margin-right: 0px;
}
.inputclass{
  border: 0px;
  background-color: #2e3136;
  color: #d8d8d8;
  border-radius: 4px;
  width:180px;
  height: 28px;
}
.fkqtextarea{
  width:360px;
}
.fkqtextarea >>> textarea{
  background-color: #000000d4;
  color: #d8d8d8;
  border: 0px;
  width: 360px;
  min-height: 100px;
  font-size: 12px;
}
.numberinput >>> .el-input__inner{
  background-color: #2e3136;
  color: #d8d8d8;
  border: 0px;
}
</style>
<style>
.fkqEditItem-panel .ivu-modal .ivu-modal-content{
  width: 510px !important;
  /* background-color: #000000d4 !important; */
}
</style>

