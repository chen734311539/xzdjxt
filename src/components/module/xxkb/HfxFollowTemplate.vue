<template>
    <div class="itemfollowpanel">
        <div class="titlepanel">
          <div class="tilte">
          <span style="color:#b6f6ff;font-size:20px;">主题：</span><span style="color:white;font-size:20px;">{{itemdata.title}}</span>
          <!-- <span style="color:#b6f6ff;margin-left:10px;">[{{itemdata.deptnames}}]</span> -->
          </div>
          <div class="title-rightpanel">
            <div class="titlebutton">
              <!-- 顶部按钮模板 -->
             <slot  name="titlebutton" :data="itemdata"></slot>
            </div>
          </div>
        </div>
        <div class="followpanel">
          <div class="maincontent">
            <div class="floorleft">
              <div class="followuserimg" >
                <!-- :style="{'background':'url('+maincontent.avatar+') no-repeat center center','background-size':'100%'}" -->
                <img style="width:100%;height:100%;border-radius:50%;" :src="userimg" />
              </div>
              <div class="floorDeptnameAndUsername">
                <div class="floorusername">
                  <span>{{maincontent.insertusername}}</span>
                </div>
                <div class="floordeptname">
                  <span>{{maincontent.insertdeptname}}</span>
                </div>
              </div>
            </div>
             <div class="floormiddle">
               <div class="contenthtml">
                  <!-- <div v-html="maincontent.content" style="position:relative;padding-left:15px;padding-top:15px;">{{maincontent.content}}</div> -->
                  <slot  name="pdfpanel"></slot>
                </div>
            </div>
             <div class="floorright">
               <div class="floornum">
               <em>主题内容</em>
               </div>
               <div class="floorinfotime">
                  <span>发表于:{{maincontent.inserttime}}</span>
               </div> 
                <div class="floorinfoip">
                  <span>IP：{{maincontent.insertip}}</span> 
               </div> 
            </div>
          </div>
          <Divider orientation="center" class="line">回复 / 评论</Divider>
          <HfxFloorTemplate v-for="contentObj in replylist" :contentObj="contentObj" :key="contentObj.contentlist" 
              @on-commentreply="commentReply(JSON.stringify(contentObj))" 
              @on-editreply="editReply(JSON.stringify(contentObj))" 
              @on-deletereply="deleteReply(JSON.stringify(contentObj))" />
        </div>
        <div class="editfollowpanel">
          <slot  name="editfollowpanel" :data="itemdata"></slot>
        </div>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import HfxFloorTemplate from '@/components/module/xxkb/HfxFloorTemplate'

export default {
  name: 'HfxFollowTemplate',
  components: {HfxFloorTemplate},
  props:{
      //数据   
      itemdata:{
          type:Object,
          default:() => {
                            return {}
                        }
      },
      page:{
        type:Number,
        default:1
      },
      pageSize:{
        type:Number,
        default:1
      },
      totalSize:{
        type:Number,
        default:0
      },
       contentlist:{
          type:Array,
          default:() => {
                            return []
                        }
      },
  },
  data () {
    return { 
    }
  },
  computed: {
    replylist:function(){
      var arr=[];
       if(this.contentlist.length>=2){
         for(var i=1;i<this.contentlist.length;i++){
            arr.push(this.contentlist[i]);
         }
      }
      return arr;
    },
    maincontent:function(){
      if(this.contentlist.length>=1){
        return this.contentlist[0];
      }else{
        return {};
      }
    },
    userimg:function(){
      var img = this.maincontent.avatar;
      if(img==null||img==""){
        return require("@/assets/xxkb/defaultavatar.png");
      }else{
        return img;
      }
    },
  },
  methods:{
    commentReply(val){
      this.$emit("on-commentreply",val);
    },
    editReply(val){
      this.$emit("on-editreply",val);
    },    
    deleteReply(val){
      this.$emit("on-deletereply",val);
    },
  },
  created(){
    
  },
  mounted(){
  }
}
</script>
<style scoped>
.itemfollowpanel{
    height: 100%;
    width: 100%;
    position: relative;
}
.titlepanel{
  height:60px;
  width:100%;
  position: relative;
  padding: 0px 10px;
  display: inline-flex;
  align-items: center;
  margin: 10px 0 10px 0;
  background-color: rgba(88,245,255, 0.2);
  align-items: center;
}
.title-rightpanel{
  position:absolute;
  right: 0px;
  display: flex;
  margin: 0 10px 0 0;
}
.guanzhunums{
  color: white;
  margin: 25px 10px 0 0;
}
.titlebutton{
}
.followpanel{
  width: 100%;
  height: calc(100% - 320px);
  /* max-height: calc(100% - 370px); */
  overflow: auto;
}
.maincontent{
  width: 100%;
  background-color: rgba(88,245,255, 0.2);
  margin:0 0 10px 0;
  display: flex;
  min-height: 105px;
}
.floorleft{
  width: 10%;
  height:50px;
  position: relative;
  margin: 5px 0 0 0;
}
.floormiddle{
width: 78%;
position: relative;
/* margin: 5px 5px 10px 10px; */
border-left: 1px solid gray;
/* box-shadow: 3px 3px 3px #0f2a4d; */
}
.contenthtml{
  color: white;
}
.floorright{
width: 12%;
position: relative;
margin: 5px 0 0 0;
}
.followuserimg{
  width: 50px;
  height: 50px;
  border-radius: 25px;
  position: absolute;
  left: calc(50% - 25px);
  border: 1px solid white;
}
.floorDeptnameAndUsername{
  color: white;
  position: absolute;
  top: 55px;
  text-align: center;
  width: 100%;
}
.floorusername{
  font-size: 14px;
}
.floordeptname{
  color: #ffa749;
}
.floornum{
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 16px;
  color: white;
}
.editbutton{
  position: absolute;
  right: 45px;
  top: 8px;
}
.floorinfotime{
  position: absolute;
  right: 10px;
  bottom: 0px;
  font-size: 12px;
  color: white;
}
.floorinfoip{
  position: absolute;
  right: 10px;
  bottom: 20px;
  font-size: 12px;
  color: white;
}
.line{
  color: #b6f6ff;
  font-size:14px;
}
</style>

