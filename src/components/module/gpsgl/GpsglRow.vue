<template>
    <div class="row" @click="clickRow">
        <div class="row-div" style="width:5%;">{{data.xh}}</div><div class="row-div" style="width:12.5%;">{{data.gpsid}}</div><!--
          --><div class="row-div" style="width:12.5%;">{{data.gpscode}}</div><div class="row-div" style="width:12.5%;">{{data.gpsname}}</div><!--
          --><div class="row-div" style="width:12.5%;">{{data.typename}}</div><div class="row-div" style="width:12.5%;">{{data.groupnames}}</div><!--
          --><div class="row-div" style="width:16.5%;">{{data.usernames}}</div><div class="row-div" style="width:16%;">{{data.mobiles}}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'GpsglRow',
  components: { },
  props:['data'],
  data () {
    return {
     
    }
  },
  computed: mapState({
  }),
  methods:{
    clickRow(){
      this.$emit("on-click",this.data);
    }
  },
  created(){
    
  }
}
</script>

<style scoped>
.row{
  color: white;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  min-height: 25px;
  margin-bottom: 5px;
}
.row:hover{
  background: rgba(255, 255, 255, 0.4);
}
.row-div{
  position: relative;
  display: inline-block;
  text-align: center;
  word-wrap:break-word;
  word-break:break-all;
  min-height: 25px;
  line-height: 25px;
}
</style>

