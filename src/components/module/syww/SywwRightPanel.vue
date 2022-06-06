<template>
    <div class="sywwRightPanel">
      <LeftContentNameBar :isshowshaixuan="false"  style="margin:0 0 0 0;" />
        <div class="contentPanel">
          <iframe  :src="iframeurl" width="100%" height="100%;" frameborder="0"  ></iframe>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'SywwRightPanel',
  components: {LeftContentNameBar},
  data () {
    return {
    }
  },
  computed: {
    iframeurl:function(){
      var userinfo=this.common.getSessionUserInfo();
      var loginusercode=userinfo.usercode;
      var url="http://41.226.0.11/eye/s.asp?s=loginremote&jamusername="+loginusercode+"&jampassword=888888";
      return url;
    }
  },
  methods:{
  },
  created(){
    
  },
  mounted(){

  },
}
</script>

<style scoped>
.sywwRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
}
.headerPanel{
  height:40px;
  width:100%;
  position: relative;
  padding: 0px 10px;
  display: inline-flex;
  align-items: center;
  margin: 10px 0 10px 0;
  background-color: rgba(88,245,255, 0.1);
}
.header{
  padding:20px;
  color: #58f5ff;
  font-size: 14px;
}
.contentPanel{
  width: 100%;
  height: calc(100% - 32px);
}
</style>

