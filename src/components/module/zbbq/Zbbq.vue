<template>
    <div class="zbbqpanel">
      <LeftContentNameBar :isshowshaixuan="false"  :isshowclose="true" />
        <div class="zbuserpanel">
            <div style="height:30px;width:100%;background: #2a5b89;">
                <div class="tips_class">领导</div>
            </div>
            <div class="zbuserbtn">
                <span v-for="userobj in zbleaders" :key="userobj.usercode" 
                :data-usercode="userobj.usercode" :data-deptcode="userobj.deptcode" :data-isleader="userobj.isleader"
                style="background:#01b9c1;cursor: pointer;padding:2px 7px;margin:5px 8px;display:inline-block;font-size:14px;" class="fc-event">
                <Icon custom="iconfont iconlingdao"/>{{userobj.username}}</span>
            </div>
        </div>
        <div class="zbuserpanel">
             <div style="height:30px;width:100%;background: #2a5b89;">
                <div class="tips_class">指挥</div>
             </div>
             <div class="zbuserbtn">
              <span v-for="userobj in zbusers" :key="userobj.usercode" 
              :data-usercode="userobj.usercode" :data-deptcode="userobj.deptcode" :data-isleader="0"
              style="background:#d57712;cursor: pointer;padding:2px 7px;margin:5px 8px;display:inline-block;font-size:14px;z-index:10000" class="fc-event">
              <Icon custom="iconfont iconzhihuiyuan"/>{{userobj.username}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import 'fullcalendar/dist/fullcalendar.css'
import $ from 'jquery'
require('webpack-jquery-ui')
require('webpack-jquery-ui/css')
export default {
  name: 'Zbbq',
  components: {LeftContentNameBar},
  data () {
    return {
     zbusers:[],
     zbleaders:[],
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo
  }),
  methods:{
      getDeptUsersCallBack(data){
         this.zbusers = data;
         for(var i=0;i<data.length;i++){
          //  if(data[i].isleader=='1'){
          //    this.zbleaders.push(data[i]);
          //  }
           this.zbleaders.push(data[i]);
         }
         //下面是给准备拖拽的人员的数据格式渲染和添加jquery-ui的拖拽事件
         setTimeout(function() {
              $('.fc-event').each(function() {
                  $(this).data('event', {
                      title: $.trim($(this).text()), // use the element's text as the event title
                      stick: true, // maintain when user navigates (see docs on the renderEvent method)
                      usercode: $(this).attr("data-usercode"),
                      deptcode: $(this).attr("data-deptcode"),
                      isleader: $(this).attr("data-isleader"),
                      zbzt: 0,
                  });
                  $(this).draggable({
                      cursor: 'pointer',
                      // helper: 'original',
                      zIndex: 10000000,
                      // containment:"#app",
                      revert: true, // will cause the event to go back to its
                      revertDuration: 0 //  original position after the drag
                  });
                });
          },100);
      }
  },
  created(){
    // 获取值班人员
    this.http.get("/zbbq/getDeptUsers",null,this.getDeptUsersCallBack,this,false);
  }
}
</script>

<style scoped>
.zbbqpanel{
  width: 100%;
  height: 100%;
}
.zbuserpanel{
  border-radius: 0px;
  margin-bottom: 13px;
  width: 100%;
  color: #b6f6ff;
  border: 1px solid #5ce4ff;
}
.tips_class{
  position: relative;
  height: 30px;
  line-height: 30px;
  width: 80px;
  left: 50%;
  text-align: center;
  transform: translate(-50%,0);
  background: url("./../../../assets/zbbq/img_leder_bg.png") center no-repeat;
}
.zbuserbtn{
  padding: 5px;
}
.ldbtn{
  cursor: pointer;
  padding: 2px 7px;
  margin: 5px 8px;
  display: inline-block;
  background-color: #1250ad;
}
.ldbtnmousedown{
  cursor: pointer;
  padding: 2px 7px;
  margin: 5px 8px;
  display: inline-block;
  background-color: #1250ad;
}
.zhbtn{
  cursor: pointer;
  padding: 2px 7px;
  margin: 5px 8px;
  display: inline-block;
  background-color: #cc880c;
}
</style>

