<template style="width:100%;height:100%;">
  <div class="login">
      <!--------------------------------------左侧------------------------------>
      <!-- <div class="login_left">
        <img src="./../../assets/login/login_left_dachilun.png" class="login_left_chilun"/>

        <img src="./../../assets/login/login_left_chilun.png" class="login_left_xcl" />
        
      </div> -->
      <!---------------------------------左侧 end--------------------------------->

      <!----------------------------------右侧------------------------------>
      <div class="login_title"></div>
      <div class="login_right">

          <p class="logo_txt">用户登录</p>
          <p class="logo_txt01"></p>

          <div class="login_userdiv flexr">
            <img src="./../../assets/login/login_02.png" width="17" height="18" /> 
            <input name="" type="text" v-model="userid" placeholder="请输入登录账号"/>
          </div>

          <div class="login_userdiv flexr" style="margin-top:40px;">
            <img src="./../../assets/login/login_01.png" width="17" height="18" /> 
            <input name="" type="password" v-model="password" placeholder="请输入登录密码"/>
          </div>

          <div class="login_userbtndiv hvr-bounce-in" @click="login">登 录</div>
          <!-- <div class="login_userbtnmiyao hvr-bounce-in" @click="szzsLogin">秘钥登录</div> -->
      </div>
      <!-----------------------------右侧 end----------------------------->

      <div class="login_foot">无锡慧风行信息科技有限公司技术支持</div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
export default {
  name: 'LoginPage',
  data () {
    return {
      projectname:Constants.project_name,
      userid: '',
      password: '',
    }
  },
  created(){
      var sessionId = this.common.getSessionId();
      if(sessionId==null||sessionId==undefined||sessionId==""){
        //this.login();
        var idcard = this.$route.query.idcard;
        if(idcard){
            var paramObj = {};
            paramObj.idcard = idcard;
            this.http.get("/user/login",paramObj,this.loginCallBack,this,true);
        }
      }else{
        this.http.get("/user/isLogin",{"sessionId":sessionId},this.isloginCallBack,this,true);
      }
  },
  methods:{
    szzsLogin(){
        window.location.href = "https://41.226.0.149:9443/jczh/authentication.jsp?module=zhddxt";
    },
    login () {
      if(this.userid==null || this.userid==""){
        this.$Message.error("用户名不能为空");
        return;
      }
      if(this.password==null || this.password==""){
        this.$Message.error("密码不能为空");
        return;
      }
      
      this.http.get("/user/login",{usercode:this.userid,psw:this.password},this.loginCallBack,this,true);
    },
    loginCallBack(result){
      if(result.code=="0"){
        this.$Message.error(result.data);
      }else if(result.code=="1"){
        if(result.data.newavatar){
          result.data.newavatar = Constants.file_url+result.data.newavatar;
        }
        this.common.putSessionData("userInfo",result.data);
        this.$store.dispatch('putState',{"key":"userInfo","value":result.data});
        //this.$store.dispatch('putChildState',{"key":"jq","childkey":"search","value":{"deptcode":result.data.directdeptcode,"deptname":result.data.directdeptname}});
        this.$router.push({ path:'/'}); //路由跳转
      }
    },
    isloginCallBack(result){
       if(result.code=="1"){//已经登录
         this.$router.push({ path:'/'}); //路由跳转
       }else{
         //this.login();
       }
    }
  }
}
</script>

<style scoped>
.login{
  min-width:1280px;
  height: 100%;
  font-family:"经典雅黑";
  background:url(./../../assets/login/login.png) no-repeat;
  background-size: 100% 100%;
}
.login_title{
  position: absolute;
  top: 60px;
  width: 581px;
  height: 74px;
  background:url(./../../assets/login/logo.png) no-repeat;
  background-size: 100% 100%;
  transform:translate(-50%,0%);
  left: 20%;
}
.login_left{ 
  background:url(./../../assets/login/login_left_bg.png) no-repeat;
  background-size:cover; width:498px;
  height:346px; float:left;
  margin:17% 0px 0px 15%;
  position:relative;
 }
.login_left_chilun{
	 width:35%;
	 height:51%;
	 position:absolute;
	 top:64px;
	 left:166px;
	 animation:dcl 8s linear infinite;
}
@keyframes dcl{
	0%{
		transform:rotate(0deg);
		}
	100%{
		transform:rotate(360deg);
		}	
	}	
.login_left_xcl{position:absolute; width:23px; height:23px; bottom:22%; left:13%; animation:xcl 4s linear infinite;}
@keyframes xcl{
	0%{
		transform:rotate(0deg)
		}
	100%{
		transform:rotate(-360deg)
		}
	}
.login_right{
	background:url(./../../assets/login/login_bg.png) no-repeat;
	background-size:cover;
	width: 490px;
  height: 460px;
	float:right;
	position: absolute;
  right: 30%;
  top: 35%;
  background-size: 100% 100%;
}
.logo_txt{
  font-size:20px;
  letter-spacing:3px;
  color:#20d4ea;
  width:300px;
  margin:auto;
  text-align:center;
  margin-top:50px;
  color:#fff;
  /* background-image:-webkit-linear-gradient(bottom,#00aeff,#00ffff); 
  -webkit-background-clip:text; 
  -webkit-text-fill-color:transparent; */
}
	
.logo_txt01{ color:#20d4ea; width:300px; margin:auto; text-align:center; font-size:12px;height: 5px;}
.login_userdiv{
  width: 290px;
  height: 40px;
  margin: auto;
  margin-top: 40px;
  border: 1px solid #11cefd;
  border-radius: 5px;
}
.login_userdiv img{ float:left; margin-right:10px;}
.login_userdiv input{ 
  float: left;
  width: 240px;
  height: 30px;
  border: none;
  color: #20d4ea;
  font-size: 14px;
  background: none;
  outline: none;
  letter-spacing: 2px;
}
/* 设置登录自动填充的样式 */
.login_userdiv >>> input:-webkit-autofill{
  -webkit-text-fill-color: #20d4ea !important;
  caret-color: #20d4ea !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
/* 修改placehoder的字体大小和颜色 */
.login_userdiv >>> input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #20d4ea;
  font-size: 16px;
}
input::-webkit-input-placeholder {
  color: #20d4ea;
  letter-spacing:2px
}
input::-moz-input-placeholder {
  color: #20d4ea;
  letter-spacing:2px
}
input::-ms-input-placeholder {
  color: #20d4ea;
  letter-spacing:2px
}
.login_userbtndiv{
  width: 290px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  background: linear-gradient(246deg,#11cefd 0%,#3bc6f4 100%);
  border-radius: 5px;
  margin:auto;
  color:white; text-align:center; 
  margin-top:60px;
}
.login_userbtndiv:hover{ cursor:pointer}
/* Bounce In */
.hvr-bounce-in{
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
}
.hvr-bounce-in:hover, .hvr-bounce-in:focus, .hvr-bounce-in:active {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
  transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}

.login_userbtnmiyao{width:243px; height:32px; margin:auto;text-align:center; line-height:32px; margin-top:10px; border:1px solid #20d4ea; color:#20d4ea; border-radius:100px;}
.login_userbtnmiyao:hover{ cursor:pointer; background:#20d4ea; color:white;}
.login_foot{ width:100%; position:absolute; bottom:0px; text-align:center; height:50px; line-height:50px; font-size:14px; color:#20d4ea; letter-spacing:2px;}
</style>
