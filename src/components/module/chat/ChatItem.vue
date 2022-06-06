<template>
   <div class="chatItem">
      <div style="width:100%;height:10px;"></div>
       <div style="position:relative;clear: both;">
           <div :class="{nametime_right:data.isMy,nametime_left:!data.isMy}">
               <span v-show="!data.isMy">{{data.insertusername}}</span>
               <span>{{data.inserttime}}</span>
               <!-- <img src="@/11.jpg" :class="{img_right:data.isMy,img_left:!data.isMy}"/> -->
               <Icon  custom="iconfont icondanren" :class="{img_right:data.isMy,img_left:!data.isMy}"/>
           </div>
       </div>
       <div style="position:relative;clear: both;">
           <div v-if="data.type=='1'" :class="{chatItem_right:data.isMy,chatItem_left:!data.isMy}">
                {{data.text}}
           </div>
           <div v-if="data.type=='2'" :class="{chatPicture_right:data.isMy,chatPicture_left:!data.isMy}">
               <!-- <img :src="data.picture" height="200" width="200" /> -->
               <el-image style="max-width: 200px; max-height: 200px;" :src="data.picture" :preview-src-list="[data.picture]"></el-image>
           </div>
       </div>
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ChatItem',
  props:['data'],
  components: {  },
  data () {
   return {
    }
  },
  computed: mapState({
  }),
  created() {
  },
  methods: {  
  }

}
</script>

<style scoped>

.chatItem_right{
  max-width:45%;
  background: green;
  border-radius: 5px;
  position:relative;
  word-wrap:break-word;
  word-break:break-all;
  width:fit-content;
  float: right;
  right: 40px;
  color: black;
  font-family:宋体;
  font-size: 13px;
} 
.chatItem_left{
  max-width:45%;
  background: white;
 border-radius: 5px;
  position:relative;
  word-wrap:break-word;
  word-break:break-all;
  left:40px;
  width:fit-content;
  display:inline-block;
  color: black;
  font-family:宋体;
  font-size: 13px;
}
.chatItem{
   width: 100%;
   position: relative;
   clear: both;/**清除float对父元素的高度影响**/
}

.nametime_right{
  position:relative;
  float: right;
  right: 40px;
}
.nametime_left{
  position:relative;
  left:40px;
  display:inline-block;
}
.img_right{
   position:absolute;
   right:-35px;
   color: black;
   background: white;
   font-size: 22px;
   top: 9px;
}
.img_left{
  position:absolute;
  left: -35px;
  color: black;
  background: white;
  font-size: 22px;
  top: 9px;
}
.chatPicture_right{
  position:relative;
  /* display:inline-block; */
  float: right;
  right: 40px;
}
.chatPicture_left{
  position:relative;
  left:40px;
}
</style>

 

 