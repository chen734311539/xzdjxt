<template>
    <div class="bookbutton" @mouseover="mouseOver" @mouseout="mouseOut">
      <div class="bookbuttonTX" :class="bookbuttonBorder">
      </div>
        <div class="content">
          <span class="title">{{data.title.length &lt;= 15? data.title:(data.title.substr(0,15)+"……")}}</span>
          <span class="groupname">文件类型：{{data.groupname}}</span>
          <span class="deptname">创建部门：{{data.deptname}}</span>
        </div>
        <div v-show="showButton" class="bookbuttoncaozuo">
          <!-- <Button type="primary" size="small" @click="readBook">阅读</Button>&nbsp;&nbsp;
          <Button type="primary" size="small" @click="modifyBook">修改</Button>&nbsp;&nbsp;
          <Button type="primary" size="small" @click="showDeleteModal">删除</Button> -->
          <div class="readIcon" @click="readBook" ></div>
          <div class="mdyIcon" @click="modifyBook" ></div>
          <div class="delIcon" @click="showDeleteModal" ></div>
        </div>
        <Modal title="删除文件" v-model="showdelmodal" class-name="kdzlDelBookModal" :draggable="true" >
          <div slot="close"><div class="hfx-modal-close"/></div>
          <div style="width:100%;text-align:center;">是否删除该文件?</div>
          <div slot="footer">
            <!-- <Button type="text" size="large" @click="hideDeleteModal">取消</Button>
            <Button type="primary" size="large" @click="deleteBook">确定</Button> -->
            <HfxButton @click="hideDeleteModal" name="取消" />
            <HfxButton @click="deleteBook" />
          </div>
        </Modal>
    </div>
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'BookButton',
  props:['data'],
  components: {},
  data () {
    return {
      showdelmodal:false,
      showButton:false,
      bookbuttonBorder:"bookbuttonBorder_leave",
    }
  },
  methods:{
    readBook(){
      this.changeBook("read");
    },
    modifyBook(){
      this.changeBook("mdy");
    },
     deleteBook(){
      this.showdelmodal=false;
      this.changeBook("del");
    },
    changeBook(value){
      this.$emit("on-change",value, this.data.bookid);
    },
    hideDeleteModal(){
      this.showdelmodal=false;
    },
    showDeleteModal(){
      this.showdelmodal=true;
    },
    mouseOver(){
      this.showButton=true;
      this.bookbuttonBorder="bookbuttonBorder_enter";
    },
    mouseOut(){
      this.showButton=false;
      this.bookbuttonBorder="bookbuttonBorder_leave";
    }
  },
  created(){
  }
}
</script>
<style scoped>
.bookbutton{
  width: 94%;
  height: 70px;
  margin: 8px 0 0 6px;
  position: relative;
  padding: 13px 0px;
  cursor: pointer;
}
.content{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
}
.title{
  position: absolute;
  color: #fff;
  font-size: 14px;
  top: -8px;
  left: 10px;
}
.deptname{
  position: absolute;
  top: 35px;
  left: 10px;
  color: #ffa20f;
}
.groupname{
  position: absolute;
  top: 15px;
  left: 10px;
  color: #b6f6ff;
}
.modal-div{
  margin: 0 0 20px -30px;
}
.modal-div span{
  float: left;
  width: 85px;
  text-align: right;
  margin-right: 10px;
}
.modal_style{
    display: flex;
    align-items: center;
    justify-content: center;
}
.readIcon{
  width: 19px;
  height: 15px;
  cursor: pointer;
  margin-right:10px;
  background: 
  url(./../../../assets/kdzl/kdzl_see.png)  no-repeat;

}
.mdyIcon{
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-right:10px;
  background: 
  url(./../../../assets/kdzl/kdzl_mdy.png)  no-repeat;
}
.delIcon{
  width: 15px;
  height: 15px;
  cursor: pointer;
  background: 
  url(./../../../assets/kdzl/kdzl_del.png)  no-repeat;
  
}
.bookbuttoncaozuo{
  position: absolute;
  display: inline-flex;
  right: 5px;
  bottom: 5px;
}
.bookbuttonBorder_leave{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #2e8cb8;
  border-bottom: 1px solid #b6f6ff;
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.bookbuttonBorder_enter{
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  border: 1px solid #b6f6ff;  
  background-color: #08385a;
  box-shadow: 0 0 7px#0f2a4d;
}
.bookbuttonTX{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
.bookbuttonTX:hover, .bookbuttonTX:focus, .bookbuttonTX:active {
    cursor: pointer;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
</style>
<style>
.kdzlDelBookModal .ivu-modal .ivu-modal-content{
  top:293px;
  left:300px;
  width: 400px !important;
}
</style>