<template>
    <div class="showitemfollow"  @mouseover="mouseOver" @mouseout="mouseOut">
            <div class="floorleft">
              <div class="followuserimg">
                <img style="width:100%;height:100%;border-radius:50%;" :src="userimg" />
              </div>
              <div class="floorDeptnameAndUsername">
                <div class="floorusername">
                  <span>{{contentObj.insertusername}}</span>
                </div>
                <div class="floordeptname">
                  <span>{{contentObj.insertdeptname}}</span>
                </div>
              </div>
            </div>
             <div class="floormiddle">
               <div class="contenthtml">
                  <div v-html="contentObj.content" style="position:relative;padding:10px 10px;">{{contentObj.content}}</div>
                </div>
            </div>
             <div class="floorright">
               <div class="floornum">
               <em>{{contentObj.seq-1}}楼</em>
               </div>
                <div v-show="isshoweditbtn" class="editbutton">
                  <!-- <HfxButton name="删除" />
                  <HfxButton name="回复" /> -->
                  <a @click="commentReply(JSON.stringify(contentObj))">回复</a>
                  <a  @click="editReply(JSON.stringify(contentObj))">编辑</a>
                  <a  @click="deleteReply(JSON.stringify(contentObj))" v-show="contentObj.seq!='1'" >删除</a>
                </div>
               <div class="floorinfotime">
                  <span>发表于:{{contentObj.inserttime}}</span>
               </div> 
                <div class="floorinfoip">
                  <span>IP：{{contentObj.insertip}}</span> 
               </div> 
            </div>
    </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'

export default {
  name: 'HfxFloorTemplate',
  props:['contentObj'],
  data () {
    return { 
        isshoweditbtn:false,
    }
  },
  computed: { 
    userimg:function(){
      var img = this.contentObj.avatar;
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
    mouseOver(){
      this.isshoweditbtn=true;

    },
    mouseOut(){
      this.isshoweditbtn=false;
    },
  },
  created(){
    
  },
  mounted(){
  }
}
</script>
<style scoped>
.showitemfollow{
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
  color: #b6f6ff;
}
.floorright{
width: 12%;
position: relative;
margin: 5px 5px 10px 10px;
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
  color: #b6f6ff;
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
  color: #b6f6ff;
}
.floorinfoip{
  position: absolute;
  right: 10px;
  bottom: 20px;
  font-size: 12px;
  color: #b6f6ff;
}
</style>
