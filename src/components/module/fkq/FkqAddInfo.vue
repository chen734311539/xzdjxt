<template>
    <Modal v-model="showdata.showmodal" :draggable = "true" :footer-hide="true" title="新增防控圈主题" class-name="fkqEditItem-panel">
      <div slot="close"><div class="hfx-modal-close"/></div>
        <div style="display:block;">
            <div style="height: 430px;">
                <div class="fkqEditPanel">
                    <div class="modal-div">
                        <span>主题标题：</span>
                        <input style="width: 360px;" class="inputclass" v-model="title"/>
                    </div>
                    <div class="modal-div">
                        <span>防控内容：</span>
                        <Input type="textarea" :autosize="true" class="fkqtextarea" v-model="fknr"/>
                    </div>
                    <div class="modal-div">
                        <span>防控要求：</span>
                        <Input type="textarea" :autosize="true" class="fkqtextarea" v-model="fkyq"/>
                    </div>
                    <div class="modal-div">
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
                    </div>
                </div>
            </div>
            <div class="fkqEditBtn">
                <!-- <Button type="primary" size="small" @click="addFkqItem">确定</Button>
                <Button type="text" size="small" @click="closeFkq">取消</Button> -->
                <HfxButton @click="addFkqItem" />
                <HfxButton @click="closeFkq" name="取消" />
            </div>
        </div>
    </Modal>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'FkqAddInfo',
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
      addFkqItem(){
          if(this.title=="" || this.title==null){
            this.$Message.error("主题不能为空");
            return;
          }
          if(this.fknr=="" || this.fknr==null){
            this.$Message.error("防控内容不能为空");
            return;
          }
          var addItemParamObj = {};
          addItemParamObj.title = this.title;
          addItemParamObj.fknr = this.fknr;
          addItemParamObj.fkyq = this.fkyq;
          addItemParamObj.firstradius = this.firstradius;
          addItemParamObj.secondradius = this.secondradius;
          addItemParamObj.thirdradius = this.thirdradius;
          this.http.post("/znfk/insertFkqItem",addItemParamObj,this.insertFkqItemCallBack,this,false);
      },
      insertFkqItemCallBack(result){
          this.showdata.showmodal = false;
          this.clearInput();
          this.$emit('handler',result,"reflash");
      },
      closeFkq(){
          this.showdata.showmodal = false;
      },
      clearInput(){
          this.title = "";
          this.fknr = "";
          this.fkyq = ""
          this.firstradius = "";
          this.secondradius = "";
          this.thirdradius = "";
      },
      
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
  margin-top: 10px;
}
.modal-div{
  margin: 0 0 20px 0;
}
.modal-div span{
  float: left;
  width: 85px;
  text-align: right;
  margin-right: 10px;
}
.inputclass{
  width:180px;
  height: 28px;
  outline: none;
  color: #b6f6ff;
  padding:0 10px;
  background-color: transparent;
  border: 1px solid #b6f6ff;
}
.fkqtextarea{
  width:360px;
}
.fkqtextarea >>> textarea{
  width: 360px;
  min-height: 100px;
  font-size: 12px;
  padding: 2px 10px;
  color: #b6f6ff;
  background-color: transparent;
  border: 1px solid #b6f6ff;
  border-radius: 0px;
}
.numberinput >>> .el-input__inner{
  background-color: #2e8cb8;
  color: #b6f6ff;
  border: 0px;
}
.el-input-number--small {
  width: 360px;
}
</style>
<style>
.fkqEditItem-panel .ivu-modal .ivu-modal-content{
  top: 200px;
  left: 750px;
  width: 510px !important;
}
</style>

