<template>
    <div class="hctjpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
      <div class="hctjformpanel">
        <div class="form">
          <div class="header">案件侦查</div>
          <!-- <div class="content">
             <div class="row">
                <div class="cell">初查</div>
                <div class="cell">在侦</div>
                <div class="cell">已破</div>
              </div>
              <div  class="row">
                <div class="cell">{{countObj.ajzc.state0}}</div>
                <div class="cell">{{countObj.ajzc.state2}}</div>
                <div class="cell">{{countObj.ajzc.state3}}</div>
              </div>
              <div  class="row">
                <div class="cell">{{countObj.ajzc.state0p}}</div>
                <div class="cell">{{countObj.ajzc.state2p}}</div>
                <div class="cell">{{countObj.ajzc.state3p}}</div>
              </div>
           </div> -->
            <table class="datatable">
              <tr>
                <td>初查</td>
                <td>在侦</td>
                <td>已破</td>
              </tr>
              <tr v-if="countObj.ajzc">
                <td>{{countObj.ajzc.state0}}</td>
                <td>{{countObj.ajzc.state2}}</td>
                <td>{{countObj.ajzc.state3}}</td>
              </tr>
              <tr v-if="countObj.ajzc">
                <td>{{countObj.ajzc.state0p}}</td>
                <td>{{countObj.ajzc.state2p}}</td>
                <td>{{countObj.ajzc.state3p}}</td>
              </tr>
            </table>
        </div>
        <div class="form">
          <div class="header">请求服务</div>
          <!-- <div class="content">
             <div class="row">
                <div class="cell">新增</div>
                <div class="cell">研判</div>
                <div class="cell">完成</div>
              </div>
              <div  class="row">
                <div class="cell">{{countObj.qqfw.state1}}</div>
                <div class="cell">{{countObj.qqfw.state2}}</div>
                <div class="cell">{{countObj.qqfw.state3}}</div>
              </div>
              <div  class="row">
                <div class="cell">{{countObj.qqfw.state1p}}</div>
                <div class="cell">{{countObj.qqfw.state2p}}</div>
                <div class="cell">{{countObj.qqfw.state3p}}</div>
              </div>
          </div> -->
          <table class="datatable">
              <tr>
                <td>新增</td>
                <td>研判</td>
                <td>完成</td>
              </tr>
              <tr v-if="countObj.qqfw">
                <td>{{countObj.qqfw.state1}}</td>
                <td>{{countObj.qqfw.state2}}</td>
                <td>{{countObj.qqfw.state3}}</td>
              </tr>
              <tr v-if="countObj.qqfw">
                <td>{{countObj.qqfw.state1p}}</td>
                <td>{{countObj.qqfw.state2p}}</td>
                <td>{{countObj.qqfw.state3p}}</td>
              </tr>
            </table>
        </div>
        <div class="form">
          <div class="header">指令核查</div>
          <!-- <div class="content">
             <div class="row">
                <div class="cell">未签收</div>
                <div class="cell">已签收</div>
                <div class="cell">超时</div>
              </div>
              <div  class="row">
                <div class="cell">{{countObj.zlhc.state0}}</div>
                <div class="cell">{{countObj.zlhc.state1}}</div>
                <div class="cell">{{countObj.zlhc.state2}}</div>
              </div>
              <div  class="row">
                <div class="cell">{{countObj.zlhc.state0p}}</div>
                <div class="cell">{{countObj.zlhc.state1p}}</div>
                <div class="cell">{{countObj.zlhc.state2p}}</div>
              </div>
          </div> -->
          <table class="datatable">
              <tr>
                <td>未签收</td>
                <td>已签收</td>
                <td>超时</td>
              </tr>
              <tr v-if="countObj.zlhc">
                <td >{{countObj.zlhc.state0}}</td>
                <td>{{countObj.zlhc.state1}}</td>
                <td>{{countObj.zlhc.state2}}</td>
              </tr>
              <tr v-if="countObj.zlhc">
                <td>{{countObj.zlhc.state0p}}</td>
                <td>{{countObj.zlhc.state1p}}</td>
                <td>{{countObj.zlhc.state2p}}</td>
              </tr>
            </table>
        </div>
        <div class="form" style="height:80px;">
           <div class="header">人员核查</div>
           <!-- <div  class="row">
                <div class="cell">数量</div>
                <div class="cell">{{countObj.ryhc.total}}</div>
              </div> -->
            <table class="datatable" style="height:50px;">
              <tr v-if="countObj.ryhc">
                <td>数量</td>
                <td>{{countObj.ryhc.total}}</td>
              </tr>
            </table>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'Hctj',
  components: {LeftContentNameBar},
  data () {
    return {
    }
  },
  computed: mapState({
    countObj: state => state.hctj.countObj,
  }),
  methods:{
  },
  created(){
    // console.log(this.countObj);
  }
}
</script>

<style scoped>
.hctjpanel{
   height: 100%;
}
.hctjformpanel{
  margin: 0 0 10px 0;
  overflow: auto;
}
.form{
  border: 1px solid #b6f6ff;
  height: 180px;
  color: #b6f6ff;
  margin-bottom: 20px;
}
.header{
  height: 30px;
  background-color: rgba(92,228,255,.1);
  text-align: center;
  line-height: 30px;
  font-size: 14px;
}
.content{
  height: calc(100% - 30px);
}
.row{
  height: 50px;
  display: flex;
  justify-content:space-around;
  /* border-bottom: 1px solid #b6f6ff; */
}
.cell{
  text-align: center;
  line-height: 50px;
  display: block;
  width: 33.3%;
  border: 0.5px solid #b6f6ff;
}
.datatable{
  width:100%;
  height:150px;
  text-align:center;
  border-collapse: collapse;
}
.datatable td{
  width: 33.3%;
  border: 1px solid #b6f6ff;
}

</style>

