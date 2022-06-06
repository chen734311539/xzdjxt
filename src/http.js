import Vue from "vue"
import vueResource from "vue-resource"
import Constants from '@/constants/Constants'
import common from "./common.js"
Vue.use(vueResource)
export default{
  get(url,data,successFun,vm,islogin=false,that){
    if(!islogin){
      var sessionId = common.getSessionId();
      if(sessionId==null||sessionId==undefined||sessionId==""){
        // vm.$router.push({ path:'/login'}); //路由跳转
        return;
      }
    }
    url = Constants.url_prefix+url;
    var param = {"param":"{}"};
    if(data!=null){
      param = {"param" :JSON.stringify(data)};
    }
    if(!islogin){// add sessionId
      param.sessionId = sessionId;
    }
      Vue.http.get(url,{params:param}) 
          .then((response) => {
              if(islogin){
                if(successFun!=null){
                  successFun(response.data,that);
                }
              }else{
                if(response.data.code==1){
                  if(successFun!=null){
                    successFun(response.data.data,that);
                  }
                }else if(response.data.code==-1){//需要登录
                  sessionStorage.clear();
                  vm.$store.dispatch('initState');
                  vm.$router.push({ path:'/login'}); //路由跳转
                }else if(response.data.code==0){//出错
                  vm.$Message.error(response.data.data);
                }
              }
              
          })
          .catch(function(response) {
              console.log(response)
          })
  },
  post(url,data,successFun,vm,islogin=false,that){
    if(!islogin){
      var sessionId = common.getSessionId();
      if(sessionId==null||sessionId==undefined||sessionId==""){
        vm.$router.push({ path:'/login'}); //路由跳转
        return;
      }
    }
    url = Constants.url_prefix+url;
    var param = {"param":"{}"};
    if(data!=null){
      param = {"param" :JSON.stringify(data)};
    }
    if(!islogin){// add sessionId
      param.sessionId = sessionId;
    }
      Vue.http.post(url,param,{emulateJSON:true}) 
          .then((response) => {
              if(islogin){
                if(successFun!=null){
                  successFun(response.data,vm,that);
                }
              }else{
                if(response.data.code==1){
                  if(successFun!=null){
                    successFun(response.data.data,vm,that);
                  }
                }else if(response.data.code==-1){//需要登录
                  sessionStorage.clear();
                  vm.$store.dispatch('initState');
                  vm.$router.push({ path:'/login'}); //路由跳转
                }else if(response.data.code==0){//出错
                  vm.$Message.error(response.data.data);
                }
              }
              
          })
          .catch(function(response) {
              console.log(response)
          })
  },
  filePost(url,formData,data,successFun,vm,islogin=false,that){
    if(!islogin){
      var sessionId = common.getSessionId();
      if(sessionId==null||sessionId==undefined||sessionId==""){
        vm.$router.push({ path:'/login'}); //路由跳转
        return;
      }
    }
    url = Constants.url_prefix+url;
    if(data!=null){
      formData.append("param",JSON.stringify(data))
    }
    if(!islogin){// add sessionId
      formData.append("sessionId",sessionId)
    }
    $.ajax({
          type:"POST",
          url:url,
          dataType:'json', 
          data:formData,
          cache:false,
          contentType:false,
          processData:false,
          async:true,
          beforeSend:function(){
          },
          complete:function(){
          },
          error:function(){
          },
          success:function(data){
            if(data.code==-1){ 
              sessionStorage.clear();
              vm.$store.dispatch('initState');
              vm.$router.push({ path:'/login'}); //路由跳转
            }else if(data.code==0){
              vm.$Message.error(data.data);
            }else if(data.code=1){
              if(successFun!=null){
                successFun(data.data,vm,that);
              }
            }
          }
        });
  },
  getsfzp(url,data,successFun,vm,islogin=false,that){
    if(!islogin){
      var sessionId = common.getSessionId();
      if(sessionId==null||sessionId==undefined||sessionId==""){
        vm.$router.push({ path:'/login'}); //路由跳转
        return;
      }
    }
    //url=this.timestamp(url);
    url = Constants.sfzp_url+url;
    var param = {"param":"{}"};
    if(data!=null){
      param = {"param" :JSON.stringify(data)};
    }
    if(!islogin){// add sessionId
      param.sessionId = sessionId;
    }
      Vue.http.get(url,{params:param}) 
          .then((response) => {
              if(islogin){
                if(successFun!=null){
                  successFun(response.data,that);
                }
              }else{
                if(response.data.code==1){
                  if(successFun!=null){
                    successFun(response.data.data,that);
                  }
                }else if(response.data.code==-1){//需要登录
                  sessionStorage.clear();
                  vm.$store.dispatch('initState');
                  vm.$router.push({ path:'/login'}); //路由跳转
                }else if(response.data.code==0){//出错
                  vm.$Message.error(response.data.data);
                }
              }
              
          })
          .catch(function(response) {
              console.log(response)
          })
  },
  getRequest(url,cb) {
    return new Promise((resolve, reject) => {
      Vue.http.get(
        url,
        {emulateJSON: true}
      )
        .then(cb)
        .catch((err) => {
          reject(err);
        });
    });
  },
postRequest(url, params,cb) {
  return new Promise((resolve, reject) => {
    Vue.http.post(
      url,
      params,
      {emulateJSON: true}
    )
      .then(cb)
      .catch((err) => {
        reject(err);
      });
  });
},
timestamp(url){
  var getTimestamp=new Date().getTime();
   if(url.indexOf("?")>-1){
     url=url+"&timestamp="+getTimestamp
   }else{
     url=url+"?timestamp="+getTimestamp
   }
   return url;
 },
 download(url,data){
    var sessionId = common.getSessionId();
    url = Constants.url_prefix+url;
    if(data==null){
      data={};
    }
    var a = document.createElement("a");
    a.href=url+'?param='+JSON.stringify(data)+'&sessionId='+sessionId;
    a.click();
  },
}
