<template>
    <div>
        <ul class="HfxTreePanel-ul" ref="HfxTree">
     	    <li>
	     	    <div @click="clickDiv($event,hfxTreelListObj)" style="position: relative;">
              <i v-if="hfxTreelListObj.children" @click="clickIcon($event)" class="icon plus" :style="isExpand?HideStyle:''"></i>
              <i v-if="hfxTreelListObj.children" @click="clickIcon($event)" class="icon minus" :style="isExpand?'':HideStyle"></i>
              <i v-if="!hfxTreelListObj.children" :class="customicon" style="margin-left:14px;"></i>
              <!-- 处理一下名字过长 超过15个子就省略 title显示全部 -->
             <h5 :title="[hfxTreelListObj[showname]]">{{hfxTreelListObj[showname]!=null&&hfxTreelListObj[showname].length &lt;= 15?hfxTreelListObj[showname]:(hfxTreelListObj[showname]==null?'':hfxTreelListObj[showname].substr(0,15)+"……")}}</h5>
	     	    </div>
              <HfxTreeItem v-if="hfxTreelListObj.children" :datalist="hfxTreelListObj.children" :level="1" :uniquekey="uniquekey" :showname="showname"  :isExpand="isExpand" :customicon="customicon" @on-clickDiv="clickDiv" @on-clickIcon="clickIcon">
                <i v-if="customicon"  slot="customicon" :class="customicon" style="margin-left:14px;"></i>
              </HfxTreeItem>
     		</li>
     	</ul> 
    </div>
</template>
<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import common from "@/common.js"
import HfxTreeItem from '@/components/base/HfxTreeItem'

export default {
  name: 'HfxTree',
  components: {HfxTreeItem},
  props:['hfxTreelListObj','showname','uniquekey','isExpand','customicon'],
  data () {
    return {
      HideStyle:{"display":"none"},
    }
  },
  computed: mapState({
  }),
  methods:{
   clickDiv(e,data){
        var el = e.currentTarget;
        if(!$(el).hasClass("activediv")){
          $(this.$refs.HfxTree).find("div").removeClass("activediv");
          $(el).addClass("activediv");
          this.$emit('on-click',data);		
        }
      },
      clickIcon(e){
        var el = e.currentTarget;
        common.stopEvent(e);
        $(el).parent().siblings("ul").toggle();
        $(el).siblings(".icon").show();
        $(el).hide();
      }
  },
  created(){
    
  }
}
</script>

<style scoped>
/**树 */
.HfxTreePanel-ul >>> h5{
  color: #b6f6ff;
  font-size: 12px;
  font-weight: 400;
  height: 28px;
  float: left;
}
.HfxTreePanel-ul >>> li{
  list-style:none;
}
.HfxTreePanel-ul >>> div{
  background-color: rgba(137,156,255, 0.1);
  margin-bottom: 2px;
  width:100%;
  height: 28px;
  text-align:center;
  line-height: 28px;
  cursor: pointer;
}
.HfxTreePanel-ul >>> div.activediv{
  background-color: rgba(137,156,255, 0.2);
}
.plus{
    float: left;
    width: 11px;
    height: 11px;
    margin: 8px 6px;
    background: 
    url(../../assets/tree/tree_plus.png)  no-repeat;
}
.minus{
    float: left;
    width: 11px;
    height: 11px;
    margin: 8px 6px;
    background: 
    url(../../assets/tree/tree_minus.png)  no-repeat;
}
</style>
