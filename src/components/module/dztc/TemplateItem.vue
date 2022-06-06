<template>
    <div class="TemplateItem" :class="[data.isused==1?'checkedBg':'notcheckedBg']" > 
      <!-- @mouseover="mouseover" @mouseout="mouseout" -->
            <!-- <img src="@/assets/dztc/used.png" style="margin-right:10px;" v-show="data.isused=='1'" />
            <div  style="margin-right:20px;" v-show="data.isused=='0'" ></div> -->
            <div class="ischeckedpanel come-in-to-be-pointer" @click="setDefault">
              <div :class="[data.isused==1?'checkedIcon':'notcheckedIcon']"></div>
            </div>
            <div class="xhandnamepanel">
            <div style="width:35px;" class="templateshowclass"><span>{{data.xh}}</span></div>
            <div style="width:200px;" class="templateshowclass come-in-to-be-pointer"  @click="setDefault" title="点击修改"><span>{{data.templatename}}</span></div>
            </div>
            <div  class="caozuopanel">
                <div v-show="isEditIconShow" class="xiugaiClass"   @click="updateTemplate(data)" title="修改模板"></div>
                <div v-show="isEditIconShow" class="shanchuClass"  @click="deleteTemplate" title="删除模板"></div>
            </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import TemplateItemUpdate from '@/components/module/dztc/TemplateItemUpdate'

export default {
  name: 'TemplateItem',
  components: {TemplateItemUpdate },
  props:['data'],
  data () {
    return {
      isEditIconShow:true,
    }
  },
  computed: mapState({
  }),
  methods:{
      setDefault(){
          var paramobj = {};
          paramobj.templateid = this.data.templateid;
          paramobj.layerid = this.data.layerid;
          this.http.get("/tczy/updateTemplateUsed",paramobj,this.updateTemplateUsedCallBack,this,false);
      },
      updateTemplateUsedCallBack(data){
          this.$Message.success("保存成功");
          this.$emit('on-save');	
      },
      deleteTemplate(){
          if(this.data.isused=='1'){
              this.$Message.warning("使用中的模板无法删除");
              return;
          }
          var h = this.$createElement;
          var templatename= this.data.templatename;
        this.$msgbox({
          title: '删除模板',
          message: h('p', null, [
            h('span', null, '是否删除此模板（'+templatename+'）？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              var param = {};
              param.templateid = this.data.templateid;
              this.http.get("/tczy/deleteTemplate",param,this.deleteTemplateCallBack,this,false);
            } else {
              done();
            }
          }
        }).catch();
      },
      deleteTemplateCallBack(data){
          this.$Message.success("删除成功");
          this.$emit('on-save');	
      },
      updateTemplate(data){
          // this.isshowtemplatemodalif=true;
          // this.isshowtemplatemodal=true;
          this.$emit("on-update",data);
      },
      saveTemplateSuccess(){
        // this.isshowtemplatemodal=false;
        this.$emit('on-save');
      },
      mouseover(){
        this.isEditIconShow=true;
      },
      mouseout(){
        this.isEditIconShow=false;
      },
  },
  created(){
    
  }
}
</script>

<style scoped>
.TemplateItem{
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom:3px;
  height: 34px;
}
.checkedBg{
  background-color: rgba(88,245,255, 0.3);
}
.notcheckedBg{
  background-color: rgba(88,245,255, 0.1);
}
.iconClass{
    color: block;
    font-size: 18px;
    cursor: pointer;
}
.checkedIcon{
    width: 12px;
    height: 12px;
        margin: 9px 0 0 25px;
    background: 
    url(./../../../assets/dztc/dztc_checked.png)  no-repeat;
}
.notcheckedIcon{
    width: 12px;
    height: 12px;
    margin: 9px 0 0 25px;
    background: 
    url(./../../../assets/dztc/dztc_notchecked.png)  no-repeat;
}
.ischeckedpanel{
}
.xhandnamepanel{
  display: inline-flex;
  line-height: 34px;
  text-align: center;
}
.caozuopanel{
    display: flex;
    position: absolute;
    right: 20px;
}
.xiugaiClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin: 9px 15px 0 0;
    background: 
    url(./../../../assets/dztc/dztc_mdy.png)  no-repeat;
}
.shanchuClass{
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin: 9px 15px 0 0;
    background: 
    url(./../../../assets/dztc/dztc_del.png)  no-repeat;
}
</style>

