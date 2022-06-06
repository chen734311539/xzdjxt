<template>
    <div class="zbbq_table">
        <div class="zbbq_title">
            <div v-drag class="zbbq_text">签到信息</div>
            <div class="zbbq_close" @click="hideDiv">
                <img src="@/assets/chat/chat_close.png"/>
            </div>
        </div>
        <div style="position:relative;width:calc(100% - 30px);height:calc(100% - 70px);margin:15px;">
            <div style="position:relative;width:100%;height:30px;background:#077cb6;">
                <Cascader :data="treeData"></Cascader>
            </div>
            <div style="position:relative;width:100%;height:calc(100% - 50px);margin-top: 5px;">
                <div class="yqd_user_top" :class="[showtab==1?'wqd_user_top':'']" @click="showTabel(1)">已签到人员</div>
                <div class="yqd_user_top" :class="[showtab==2?'wqd_user_top':'']" @click="showTabel(2)">已签退人员</div>
                <div class="yqd_user_top" :class="[showtab==3?'wqd_user_top':'']" @click="showTabel(3)">未签到人员</div>
               <div v-if="showtab==1" class="zbbq_user_div" style="margin-right: 14px;">
                   <div class="yqd_user" v-for=" obj in signinlist" :key="obj.usercode">
                       <span style="position:relative;margin-left:10px;">{{obj.username}}</span>
                       <span v-show="obj.mobile">({{obj.mobile}})</span>
                       <span>{{obj.signedintime}}</span>
                   </div>
               </div>
               <div v-if="showtab==2" class="zbbq_user_div">
                   <div class="yqd_user" v-for=" obj in signoutlist" :key="obj.usercode">
                       <span style="position:relative;margin-left:10px;">{{obj.username}}</span>
                       <span v-show="obj.mobile">({{obj.mobile}})</span>
                       <span>{{obj.signedouttime}}</span>
                    </div>
               </div>
               <div v-if="showtab==3" class="zbbq_user_div">
                   <div class="wqd_user" v-for=" obj in nosignlist" :key="obj.usercode">
                       <span style="position:relative;margin-left:10px;">{{obj.username}}</span>
                       <span v-show="obj.mobile">({{obj.mobile}})</span>
                    </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ZbbqPage',
    props:['isshow'],
    data() {
        return {
            treeData:[],
            showtab:1,
            signinlist:[],
            signoutlist:[],
            nosignlist:[],
        };
    },
    methods:{
        showTabel(num){
            this.showtab = num;
        },
        hideDiv(){
           this.isshow.show = false;
        },
        getDeptTreeCallBack(data){
            var obj = Object.assign({},data);
            obj.label = obj.deptname;
            obj.value = obj.deptcode;
            if(obj.children){
                this.hasChildren(obj.children);
            }
            this.treeData.push(obj);
        },
        hasChildren(list){
            if(list==null || list==undefined){
                return;
            }
            for(var i=0;i<list.length;i++){
                list[i].label = list[i].deptname;
                list[i].value = list[i].deptcode;
                if(list[i].children){
                    this.hasChildren(list[i].children);
                }
            }
        },
        getZbsign(){
            this.http.get("/zbbq/getZbSignedTab",null,this.getZbSignedTabCallBack,this,false);
        },
        getZbSignedTabCallBack(data){
            this.signinlist = data.signin;
            this.signoutlist = data.signout;
            this.nosignlist = data.nosign;
        }
    },
    created(){
        this.http.get("/zzry/getDeptTreeByUserDept",null,this.getDeptTreeCallBack,this,false);
        this.getZbsign();
    },
    directives:{//拖拽div
        drag(elment,bindings){
            if(!elment.parentNode){
              return;
            }
            var el = elment.parentNode.parentNode;
            elment.onmousedown = function(e){
                var disx = e.pageX - el.offsetLeft;
                var disy = e.pageY - el.offsetTop;
                document.onmousemove = function (e){
                    el.style.left = e.pageX - disx+'px';
                    el.style.top = e.pageY - disy+'px';
                }
                document.onmouseup = function(){
                    document.onmousemove = document.onmouseup = null;
                }
                document.onmouseup = function(){
                    document.onmousemove = document.onmouseup = null;
                }
            }
        },
  },
}
  
  
</script>

<style scoped>
.zbbq_table{
    position: absolute;
    width: 500px;
    height: 440px;
    background: #0e396d;
    box-shadow: 0 0 5px 0 #0a1e65;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 10;
}
.zbbq_title{
    height: 40px;
    width: 100%;
}
.zbbq_text{
    color: #fff;
    text-align: center;
    line-height: 40px;
    height: 40px;
    float: left;
    width: calc(100% - 40px);
    cursor: move;
    font-size: 14px;
    background: #166bb3; 
}
.zbbq_close{
  cursor: pointer;
  width: 40px;
  height: 40px;
  float: right;
  display: flex;
  background: #155286;
  justify-content: center;
  align-items: center;
  position: relative;
}
.zbbq_close:hover{
  background-color: #f94747;
}
.zbbq_user_div{
    position: relative;
    width: calc(100% - 7px);
    height: 320px;
    float: left;
    overflow-x: hidden;
    overflow-y: auto;
    background: #166bb3;
}
.yqd_user_top{
    width: 111px;
    height: 26px; 
    float: left;
    text-align: center;
    line-height: 26px;
    color: #fff;
    cursor: pointer;
    background: url("./../../assets/zbbq/bq01.png") center no-repeat;
    background-size: 100% 100%;
}
.wqd_user_top{
    width: 111px;
    height: 26px; 
    text-align: center;
    line-height: 26px;
    cursor: pointer;
    color: #fff;
    background: url("./../../assets/zbbq/bq02.png") center no-repeat;
    background-size: 100% 100%;  
}
.yqd_user{
    width: 444px ;
    height: 26px; 
    line-height: 26px;
    color: #fff;
    margin: 10px 10px;
    background: url("./../../assets/zbbq/bq01_bg.png") center no-repeat;
    background-size: 100% 100%;  
}
.wqd_user{
    width: 444px ;
    height: 26px;  
    line-height: 26px;
    color: #fff;
    margin: 10px 10px;
    background: url("./../../assets/zbbq/bq02_bg.png") center no-repeat;
    background-size: 100% 100%;  
}
</style>