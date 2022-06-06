<template>
  <div class="ybss_headerpenel flexr">
       <div style="width:60%;height:calc(100% - 20px)">
           <div class="flexr" style="height: 30px;">
               <img src="@/assets/ybss/icon.png"/>
               <div style="width: calc(100% - 60px);margin-left: 10px;">核心数据</div>
           </div>
           <div class="flexr content_div">
               <div style="width: 16.7%;text-align: center;">
                   <div>新增确诊</div>
                   <div style="color: #f3e41a;font-size: 16px;">{{headerData.xzqzcount}}</div>
               </div>
               <div style="width: 12.7%;text-align: center;">
                   <div>现存确诊</div>
                   <div style="color: #1dd5fc;font-size: 16px;">{{headerData.xzqzcount}}</div>
               </div>
               <div style="width: 12.7%;text-align: center;">
                   <div>累计确诊</div>
                   <div style="color: #10fa9e;font-size: 16px;">{{headerData.xzqzcount}}</div>
               </div>
               <div style="width: 20.7%;">
                   <div>待流调人员&nbsp;&nbsp;<span style="color:#f3e41a">{{headerData.dldcount}}</span></div>
                   <div>待区域协查人员&nbsp;&nbsp;<span style="color:#f3e41a">{{headerData.dqyxccount}}</span></div>
               </div>
               <div style="width: 20.7%;">
                   <div>待核酸检测人员&nbsp;&nbsp;<span style="color:#f3e41a">{{headerData.djccount}}</span></div>
                   <div>待转运人员&nbsp;&nbsp;<span style="color:#f3e41a">{{headerData.dzycount}}</span></div>
               </div>
               <div style="width: 16.7%;">
                   <div>待隔离人员&nbsp;&nbsp;<span style="color:#f3e41a">{{headerData.dglcount}}</span></div>
                   <div>剩余床位&nbsp;&nbsp;<span style="color:#f3e41a">{{headerData.sycwcount}}</span></div>
               </div>
           </div>
       </div>
       <div style="width:40%;height:calc(100% - 20px)">
           <div style="width:100%;height:100%;" class="flexr">
               <div style="width:40%;height:100%;">
                    <div class="flexr" style="height: 30px;">
                        <img src="@/assets/ybss/icon.png"/>
                        <div style="width: calc(100% - 60px);margin-left: 10px;">资源储备</div>
                    </div>
                    <div class="flexr content_div">
                        <div style="width: 50%;text-align: center;">
                            <div>人员储备</div>
                            <div style="color: #10fa9e;font-size: 16px;">{{headerData.rycb}}</div>
                        </div>
                        <div style="width: 50%;text-align: center;">
                            <div>物资储备</div>
                            <div style="color: #10fa9e;font-size: 16px;">{{headerData.wzcb}}</div>
                        </div>
                    </div>
               </div>
               <div style="width:60%;height:100%;">
                   <div class="flexr" style="height: 30px;">
                       <div style="width:50%;height:100%;" class="flexr">
                            <img src="@/assets/ybss/icon.png"/>
                            <div style="width: calc(100% - 50px);margin-left: 10px;">社区清零倒计时</div>
                       </div>
                       <div style="width:50%;height:100%;" class="flexr">
                            <img src="@/assets/ybss/icon.png"/>
                            <div style="width: calc(100% - 50px);margin-left: 10px;">隔离点清零</div>
                       </div>
                    </div>
                    <div class="flexr content_div">
                        <div style="width: 50%;text-align: center;">
                            <div>社区阳性</div>
                            <div style="color: #10fa9e;font-size: 16px;">{{headerData.yxql}}</div>
                        </div>
                        <div style="width: 50%;text-align: center;">
                            <div>隔离点阳性</div>
                            <div style="color: #10fa9e;font-size: 16px;">{{headerData.gldql}}</div>
                        </div>
                    </div>
               </div>
           </div>
           <!-- <div style="width:100%;height:20px" class="flexr">
               <img width="13px" height="16px" src="@/assets/ybss/jyxc.png"/>
               <div style="color:#dfeef3;width: 83%;margin-left: 10px;">1471人核酸检测全部阴性</div>
               <div style="color:#dfeef3;width: 20%;">2022-01-18</div>
           </div> -->
       </div>
       <div style="width:100%;height:20px; position: absolute;bottom:5px;" >
            <div style="height: 20px;" class="flexr">
                <img width="13px" height="16px" src="@/assets/ybss/jyxc.png"/>
                <div style="color:#dfeef3;width: 83%;margin-left: 10px;">秀洲密切接处者XX某首次核酸检测结果为阴性</div>
                <div style="color:#dfeef3;width: 10%;">2022-02-25</div>
            </div>
       </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import markUtil from '@/components/map/js/markUtil'
import yewuMarkUtil from '@/components/map/js/yewuMarkUtil'
import map3DUtil from '@/components/map/js/map3DUtil'
export default {
    name: 'YbssHeaderPanel',
    props:['isshow'],
    data() {
        return {
            barMap:[],
            headerData:{
                // xzqzcount:"0",
                // xcqzcount:"0",
                // ljqzcount:"0",
                // dldcount:"NaN",
                // dqyxccount:"NaN",
                // djccount:"NaN",
                // dzycount:"NaN",
                // dglcount:"NaN",
                // sycwcount:"NaN",
                // rycb:"250",
                // wzcb:"NaN",
                // yxql:"0",
                // gldql:"0"
            },
        };
    },
    computed: mapState({
        userInfo: state => state.userInfo,
        currentMapType:state => state.currentMapType,
    }),
    methods:{
        getHeaderData(){
          this.http.get("/ybss/getHeaderData",null,this.getHeaderDataCallBack,this,false);
        },
        getHeaderDataCallBack(result){
            this.headerData=result;
        },
       
    },
    created(){
        this.getHeaderData();
    },
    watch : {
      
    }
}
</script>

<style scoped>
.ybss_headerpenel{
    position: absolute;
    width: calc(100% - 800px);
    height: 150px;
    top: 84px;
    left: 50%;
    color: #fff;
    transform: translate(-50%, 0);
    background: rgba(13,64,108,0.76);
    border: 1px solid #0d406c;
}
.content_div{
    height: calc(100% - 60px);
    width: calc(100% - 20px);
    margin: 0px 10px 10px 10px;
    background: linear-gradient(0deg, rgba(16, 126, 251, 0.34) 0%, rgba(13, 160, 254, 0.34) 99%);
}
</style>