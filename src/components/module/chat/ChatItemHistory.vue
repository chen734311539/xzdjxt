<template>
   <div class="ChatItemHistory">
      <div class="leftPanel">
        <div class="username">{{data.insertusername}}</div>
        <div class="message" v-if="data.type=='1'">{{data.text}}</div>
        <div v-if="data.type=='2'">
          <el-image style="max-width: 200px; max-height: 200px;" :src="data.picture" :preview-src-list="[data.picture]"></el-image>
        </div>
      </div><!--去掉中间空格不能删除
      --><div class="rightPanel">
        {{data.inserttime}}
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ChatItemHistory',
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

.ChatItemHistory{
   width: 100%;
   position: relative;
   padding: 15px 5px 20px 5px;
   border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.leftPanel{
  width: calc(100% - 115px);
  display:inline-block;
}
.rightPanel{
  position:absolute;
  width: 115px;
  display:inline-block;
  color: rgb(153, 153, 153);
}
.username{
  color: rgb(153, 153, 153);
}
.message{
   word-wrap:break-word;
  word-break:break-all;
}
</style>

 

 