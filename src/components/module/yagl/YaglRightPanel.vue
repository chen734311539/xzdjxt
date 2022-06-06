<template>
    <div class="yaglRightPanel">
      <LeftContentNameBar :isshowshaixuan="false"  style="margin:0 0 0 0;border:0px;" />
      <div style="height: 100%;">
        <div style="height: 140px;">
            <div class="flowTitlePanel">{{currentPlan.name?currentPlan.name:'请先选着一个预案'}}</div>
            <div ref="settingPanel" class="flowSettingPanel">
                <el-form v-show="!showUpDown" class="link-base-style-form linkbasestyle_form" ref="linkBaseStyle" label-width="100px" @submit.native.prevent :model="linkBaseStyle">
                    <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="line颜色：">
                        <el-color-picker v-model="linkBaseStyle.color"></el-color-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="lineHover">
                        <el-color-picker v-model="linkBaseStyle.hover">
                        </el-color-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="line文字Color">
                        <el-color-picker v-model="linkBaseStyle.textColor">
                        </el-color-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="line文字Hover">
                        <el-color-picker v-model="linkBaseStyle.textHover">
                        </el-color-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="设置虚线：">
                        <el-switch v-model="linkBaseStyle.dotted" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="line文字背景">
                        <el-color-picker v-model="linkBaseStyle.background">
                        </el-color-picker>
                        </el-form-item>
                    </el-col>
                    </el-row>
                </el-form>
                <div v-show="currentPlan.id&&!showUpDown" class="submit_btn" @click="saveFlow">保存</div>
                <div v-show="showUpDown" class="top_jt_up" @click="showUpAndDown"></div>
                <div v-show="!showUpDown" class="top_jt_down" @click="showUpAndDown"></div>
            </div>
        </div>
        <div class="super-flow-demo1" ref="drawPanel">
            <div class="node-container" ref="leftDrawPanel">
                <div v-show="showLeftRight" class="left_jt_left" @click="showLeftAndRight"></div>
                <div v-show="!showLeftRight" class="left_jt_right" @click="showLeftAndRight"></div>
                <!-- <span class="node-item" v-for="(item,index) in nodeItemList" :key="index" @mousedown="nodeItemMouseDown($event,item.value)">{{item.label}}</span> -->
                <div v-show="!showLeftRight" style="height:35px;line-height:35px;background:#346496;color:#67c23a;font-size:16px;">流程图节点样式对照表</div>
                <span v-show="!showLeftRight" class="node-item" v-for="(item,index) in nodeItemList" :style="{width:item.value.width+'px',height:item.value.height+'px'}" :key="index" >{{item.label}}</span>
            </div>
            <div class="flow_contant" ref="contantPanel">
                <div class="flow-container" ref="flowContainer">
                    <super-flow ref="superFlow" :node-list="nodeList" :link-list="linkList" :origin="origin" :graph-menu="graphMenu" :node-menu="nodeMenu" 
                    :link-menu="linkMenu" :link-base-style="linkBaseStyle" :link-style="linkStyle" :link-desc="linkDesc">
                    <template v-slot:node="{meta}">
                        <div @mouseup="nodeMouseUp" @click="nodeClick" class="flow-node ellipsis">
                        {{meta.desc}}
                        </div>
                    </template>
                    </super-flow>
                </div>
            </div>
        </div>
    </div>
    <Modal :title="drawerConf.title" v-model="drawerConf.visible" :close-on-click-modal="false" width="500px" :draggable = "true" class-name="yagl-edit-panel">
      <el-form @keyup.native.enter="settingSubmit" @submit.native.prevent v-show="drawerConf.type === drawerType.node" ref="nodeSetting" :model="nodeSetting">
        <!-- <el-form-item label="节点名称" prop="name">
          <el-input v-model="nodeSetting.name" placeholder="请输入节点名称" maxlength="30">
          </el-input>
        </el-form-item> -->
        <el-form-item label="节点描述" style="color:#fff;" prop="desc">
          <el-input type="textarea" v-model="nodeSetting.desc" placeholder="请输入节点描述">
          </el-input>
        </el-form-item>
      </el-form>
      <el-form @keyup.native.enter="settingSubmit" @submit.native.prevent v-show="drawerConf.type === drawerType.link" ref="linkSetting" :model="linkSetting">
        <el-form-item label="连线描述" style="color:#fff;" prop="desc">
          <el-input type="textarea" v-model="linkSetting.desc" placeholder="请输入连线描述">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="drawerConf.cancel">取 消</el-button>
        <el-button type="primary" @click="settingSubmit">确 定</el-button>
      </span>
    </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import common from "@/common.js"
import Constants from '@/constants/Constants'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
const drawerType = {
    node: 0,
    link: 1
}
export default {
  name: 'YaglRightPanel',
  components: {LeftContentNameBar},
  data() {
      return {
        drawerType,
        drawerConf: {
            title: '',
            visible: false,
            type: null,
            info: null,
            open: (type, info) => {
            const conf = this.drawerConf
            conf.visible = true
            conf.type = type
            conf.info = info
            if (conf.type === drawerType.node) {
                conf.title = '节点'
                if (this.$refs.nodeSetting) this.$refs.nodeSetting.resetFields()
                this.$set(this.nodeSetting, 'name', info.meta.name)
                this.$set(this.nodeSetting, 'desc', info.meta.desc)
            } else {
                conf.title = '连线'
                if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields()
                this.$set(this.linkSetting, 'desc', info.meta ? info.meta.desc : '')
            }
            },
            cancel: () => {
            this.drawerConf.visible = false
            if (this.drawerConf.type === drawerType.node) {
                this.$refs.nodeSetting.clearValidate()
            } else {
                this.$refs.linkSetting.clearValidate()
            }
            }
        },
        linkSetting: {
            desc: ''
        },
        nodeSetting: {
            name: '',
            prop:'',
            desc: ''
        },
        dragConf: {
            isDown: false,
            isMove: false,
            offsetTop: 0,
            offsetLeft: 0,
            clientX: 0,
            clientY: 0,
            ele: null,
            info: null
        },
        nodeItemList: [
            {
            label: '开始节点样式',
            value: {
                width: 120,
                height: 40,
                meta: {
                    prop: 'start',
                    name: '开始节点'
                }
            }
            },
            {
            label: '节点样式1',
            value: {
                width: 190,
                height: 100,
                meta: {
                    prop: 'approval',
                    name: '自由节点'
                }
            }
            },
            {
            label: '节点样式2',
            value: {
                width: 40,
                height: 200,
                meta: {
                    prop: 'approval',
                    name: '自由节点'
                }
            }
            },
            {
            label: '节点样式3',
            value: {
                width: 80,
                height: 150,
                meta: {
                    prop: 'approval',
                    name: '自由节点'
                }
            }
            },
            {
            label: '节点样式4',
            value: {
                width: 80,
                height: 40,
                meta: {
                    prop: 'approval',
                    name: '自由节点'
                }
            }
            },
            {
            label: '节点样式5',
            value: {
                width: 100,
                height: 60,
                meta: {
                    prop: 'approval',
                    name: '自由节点'
                }
            }
            },
            {
            label: '结束节点样式',
            value: {
                width: 120,
                height: 40,
                meta: {
                    prop: 'end',
                    name: '结束节点'
                }
            }
            }
        ],
        origin: [681, 465],
        nodeList: [],
        linkList: [],
        graphMenu: [
          [
            {
              label: '开始节点',
              disable(graph) {
                return !!graph.nodeList.find(node => node.meta.prop === 'start')
              },
              selected: (graph, coordinate) => {
                const start = graph.nodeList.find(node => node.meta.prop === 'start')
                if (!start) {
                  graph.addNode({
                    width: 120,
                    height: 40,
                    coordinate: coordinate,
                    meta: {
                      prop: 'start',
                      name: '自由节点',
                      desc: '开始节点'
                    }
                  })
                }
              }
            },
            {
              label: '节点1',
              disable: false,
              selected: (graph, coordinate) => {
                graph.addNode({
                  width: 280,
                  height: 150,
                  coordinate: coordinate,
                  meta: {
                    prop: 'approval',
                    name: '自由节点',
                    desc: '节点1'
                  }
                })
              }
            },
            {
              label: '节点2',
              disable: false,
              selected: (graph, coordinate) => {
                graph.addNode({
                  width: 40,
                  height: 200,
                  coordinate: coordinate,
                  meta: {
                    prop: 'approval',
                    name: '自由节点',
                    desc: '节点2'
                  }
                })
              }
            },
            {
              label: '节点3',
              disable: false,
              selected: (graph, coordinate) => {
                graph.addNode({
                  width: 80,
                  height: 150,
                  coordinate: coordinate,
                  meta: {
                    prop: 'approval',
                    name: '自由节点',
                    desc: '节点3'
                  }
                })
              }
            },
            {
              label: '节点4',
              disable: false,
              selected: (graph, coordinate) => {
                graph.addNode({
                  width: 80,
                  height: 40,
                  coordinate: coordinate,
                  meta: {
                    prop: 'approval',
                    name: '自由节点',
                    desc: '节点4'
                  }
                })
              }
            },
            {
              label: '节点5',
              disable: false,
              selected: (graph, coordinate) => {
                graph.addNode({
                  width: 100,
                  height: 60,
                  coordinate: coordinate,
                  meta: {
                    prop: 'approval',
                    name: '自由节点',
                    desc: '节点5'
                  }
                })
              }
            },
            {
              label: '结束节点',
              disable(graph) {
                return !!graph.nodeList.find(point => point.meta.prop === 'end')
              },
              selected: (graph, coordinate) => {
                graph.addNode({
                  width: 120,
                  height: 40,
                  coordinate: coordinate,
                  meta: {
                    prop: 'end',
                    name: '自由节点',
                    desc: '结束节点'
                  }
                })
              }
            }
          ],
          [
            // {
            //   label: '打印数据',
            //   selected: (graph, coordinate) => {
            //     console.log(JSON.stringify(graph.toJSON(), null, 2))
            //   }
            // },
            {
              label: '全选',
              selected: (graph, coordinate) => {
                graph.selectAll();
                this.origin = graph.origin;
                this.linkList = [];
                this.nodeList = [];
                for(var x in graph.linkList){
                    var obj = {};
                    obj.id = graph.linkList[x].id;
                    obj.startId = graph.linkList[x].start.id;
                    obj.endId = graph.linkList[x].end.id;
                    obj.startAt = graph.linkList[x].startAt;
                    obj.endAt = graph.linkList[x].endAt;
                    obj.meta = graph.linkList[x].meta;
                    this.linkList.push(obj);
                }
                for(var x in graph.nodeList){
                    var obj = {};
                    graph.nodeList[x].meta.id = obj.id = graph.nodeList[x].id; 
                    obj.id = graph.nodeList[x].id;
                    obj.width = graph.nodeList[x].width;
                    obj.height = graph.nodeList[x].height;
                    obj.coordinate = graph.nodeList[x].coordinate;
                    obj.meta = graph.nodeList[x].meta;
                    this.nodeList.push(obj);
                }
              }
            }
          ]
        ],
        nodeMenu: [
            [
            {
                label: '删除',
                selected: node => {
                node.remove()
                }
            },
            {
                label: '编辑',
                selected: node => {
                this.drawerConf.open(drawerType.node, node);
                }
            }
            ]
        ],
        linkMenu: [
            [
            {
                label: '删除',
                selected: link => {
                link.remove()
                }
            },
            {
                label: '编辑',
                selected: link => {
                this.drawerConf.open(drawerType.link, link)
                }
            }
            ]
        ],
        linkBaseStyle: {
            color: '#1D9346',           // line 颜色
            hover: '#D34F4F',           // line hover 的颜色
            textColor: '#D34F4F',       // line 描述文字颜色
            textHover: '#D34F4F',       // line 描述文字 hover 颜色
            font: '14px Arial',         // line 描述文字 字体设置 参考 canvas font
            dotted: false,              // 是否是虚线
            lineDash: [4, 4],           // 虚线时生效
            background: 'rgba(255,255,255,0.6)'    // 描述文字背景色
        },
        fontList: [
            '14px Arial',
            'italic small-caps bold 12px arial'
        ],
        currentFlowId:'',
        currentNode:{},
        showUpDown:false,
        showLeftRight:false,
      }
    },
  computed: {...mapState({
     userInfo:state => state.userInfo,
     currentPlan: state => state.yagl.currentPlan,
  })
  },
  mounted() {
    document.addEventListener('mousemove', this.docMousemove)
    document.addEventListener('mouseup', this.docMouseup)
    this.$once('hook:beforeDestroy', () => {
    document.removeEventListener('mousemove', this.docMousemove)
    document.removeEventListener('mouseup', this.docMouseup)
    })
  },
  methods: {
    showUpAndDown(){
      this.showUpDown = !this.showUpDown;
      if(this.showUpDown){
        this.$refs.settingPanel.style.height='0px';
        this.$refs.drawPanel.style.top='-130px';
        this.$refs.drawPanel.style.height='calc(100% - 38px)';
      }else{
        this.$refs.settingPanel.style.height='110px';
        this.$refs.drawPanel.style.top='0px';
        this.$refs.drawPanel.style.height='calc(100% - 172px)';
      }
    },
    showLeftAndRight(){
      this.showLeftRight = !this.showLeftRight;
      if(this.showLeftRight){
        this.$refs.contantPanel.style.width='100%';
        this.$refs.leftDrawPanel.style.left='-200px';
        this.$refs.leftDrawPanel.style.width='0px';
      }else{
        this.$refs.contantPanel.style.width='calc(100% - 200px)';
        this.$refs.leftDrawPanel.style.left='0px';
        this.$refs.leftDrawPanel.style.width='200px';
      }
    },
      saveFlow(){
        var paramObj = {};
        if(this.currentFlowId!=''){
            paramObj.id = this.currentFlowId;
        }
        if(this.nodeList.length==0){
            this.$Message.error("请在流程图绘制框内点击右键，选择全选后再点击保存");
            return;
        }
        paramObj.yaid = this.currentPlan.id;
        paramObj.nodelist = this.nodeList;
        paramObj.linklist = this.linkList;
        paramObj.origin = this.origin;
        paramObj.linkbasestyle = this.linkBaseStyle;
        this.http.post("/znfk/addPlanFlow",paramObj,this.addPlanFlowCallBack,this,false);
      },
      addPlanFlowCallBack(data){
         this.$Message.success("保存成功");
      },
      getPlanFlow(){
       var paramObj = {};
       paramObj.yaid = this.currentPlan.id;
       this.http.get("/znfk/getPlanFlow",paramObj,this.getPlanFlowCallBack,this,false);
      },
      getPlanFlowCallBack(data){
        if(data.length==0){
            this.currentFlowId = "";
            setTimeout(() => {
                this.nodeList = [];
                this.linkList = [];
            }, 100);
            return;
        }
        var obj = data[0];
        this.currentFlowId = obj.id;
        var nodeList = JSON.parse(obj.nodelist);
        var linkList = JSON.parse(obj.linklist);
        var linkBaseStyle = JSON.parse(obj.linkbasestyle);
        var origin = JSON.parse(obj.origin);

        setTimeout(() => {
            this.nodeList = nodeList
            this.linkList = linkList
            this.linkBaseStyle = linkBaseStyle
            this.origin = origin
        }, 100);
      },
      flowNodeClick(meta) {
        console.log(this.$refs.superFlow.graph)
      },
      linkStyle(link) {
        return {
        //   hover: '#FF00FF'
        }
      },
      linkDesc(link) {
        return link.meta ? link.meta.desc : ''
      },
      settingSubmit() {
        const conf = this.drawerConf
        if (this.drawerConf.type === drawerType.node) {
          if (!conf.info.meta) conf.info.meta = {}
          Object.keys(this.nodeSetting).forEach(key => {
            this.$set(conf.info.meta, key, this.nodeSetting[key])
          })
          this.$refs.nodeSetting.resetFields()
        } else {
          if (!conf.info.meta) conf.info.meta = {}
          Object.keys(this.linkSetting).forEach(key => {
            this.$set(conf.info.meta, key, this.linkSetting[key])
          })
          this.$refs.linkSetting.resetFields()
        }
        conf.visible = false
      },
      nodeMouseUp(evt) {
        evt.preventDefault()
      },
      nodeClick(evt) {
        //   debugger;
        // this.currentNode = evt.target.parentNode;
        // var htmltext = this.currentNode.innerText;
        // var width = this.currentNode.offsetWidth;
        // var left = this.currentNode.offsetLeft;
        // var height = this.currentNode.offsetHeight;
        // this.currentNode.style.width = "100px";
        // this.currentNode.style.height = "100px";
        // this.currentNode.style.left = (left+90)+"px";
      },
      docMousemove({clientX, clientY}) {
        const conf = this.dragConf
        if (conf.isMove) {
          conf.ele.style.top = clientY - conf.offsetTop + 'px'
          conf.ele.style.left = clientX - conf.offsetLeft + 'px'
        } else if (conf.isDown) {
          // 鼠标移动量大于 5 时 移动状态生效
          conf.isMove =
            Math.abs(clientX - conf.clientX) > 5
            || Math.abs(clientY - conf.clientY) > 5
        }
      },
      docMouseup({clientX, clientY}) {
        const conf = this.dragConf
        conf.isDown = false
        if (conf.isMove) {
          const {
            top,
            right,
            bottom,
            left
          } = this.$refs.flowContainer.getBoundingClientRect()
          // 判断鼠标是否进入 flow container
          if (
            clientX > left
            && clientX < right
            && clientY > top
            && clientY < bottom
          ) {
            // 获取拖动元素左上角相对 super flow 区域原点坐标
            const coordinate = this.$refs.superFlow.getMouseCoordinate(
              clientX - conf.offsetLeft,
              clientY - conf.offsetTop
            )
            // 添加节点
            this.$refs.superFlow.addNode({
              coordinate,
              ...conf.info
            })
          }
          conf.isMove = false
        }
        if (conf.ele) {
          conf.ele.remove()
          conf.ele = null
        }
      },
      nodeItemMouseDown(evt, info) {
        const {
          clientX,
          clientY,
          currentTarget
        } = evt
        const {
          top,
          left
        } = evt.currentTarget.getBoundingClientRect()
        const conf = this.dragConf
        const ele = currentTarget.cloneNode(true)
        Object.assign(this.dragConf, {
          offsetLeft: clientX - left,
          offsetTop: clientY - top,
          clientX: clientX,
          clientY: clientY,
          info,
          ele,
          isDown: true
        })
        ele.style.position = 'fixed'
        ele.style.margin = '0'
        ele.style.top = clientY - conf.offsetTop + 'px'
        ele.style.left = clientX - conf.offsetLeft + 'px'
        this.$el.appendChild(this.dragConf.ele)
      }
  },
  created(){
    
  },
  watch : {
      currentPlan:function(val) {
          this.getPlanFlow();
      },
  }
}
</script>

<style scoped>
.yaglRightPanel{
  height: 100%;
  width: 100%;
  position: relative;
  padding: 0px;
}
.yaglRightPanel >>>label{
    color: #58f5ff;
}
.flowPanel{
  position: relative;
  width: 100%;
  height: 98%;
  background: url(./../../../assets/yagl/bgbgbg.png)  no-repeat;
  background-size: 100% 100%;
}
.flowTitlePanel{
  position: absolute;
  color: #ecd76e;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 12px;
  text-align: center;
  font-size: 14px;
  word-wrap: break-word;
  width: 412px;
  height: 61px;
  top: 5px;
  left: 50%;
  transform: translate(-50%,0);
  background: url(./../../../assets/yagl/lc_titlebg.png)  no-repeat;
  background-size: 100% 100%; 
}
.flowSettingPanel{
  position: relative;
  width: 100%;
  height: 110px;
  top: 25px;
  background: url(./../../../assets/yagl/lc_topbg.png)  no-repeat;
  background-size: 100% 100%; 
}
.linkbasestyle_form{
    width: 60%;
    top: 50%;
    transform: translate(0, -50%);
    position: relative;
}
.el-form-item {
    margin-bottom : 12px;
}
.super-flow-demo1{
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: calc(100% - 190px);
}
.super-flow{
   background-color: #fff0; 
   overflow: auto;
   position: relative;
   margin: 12px;
   width: calc(100% - 22px);
   height: calc(100% - 28px);
   max-height: 200%;
}
.node-container {
    position: relative;
    width: 200px;
    float: left;
    height: 100%;
    text-align: center;
    background-color : #2f7fa6;
}
.flow-container {
    width: 100%;
    height: 100%;
}
.flow_contant{
    float: left;
    width: calc(100% - 200px);
    height: 100%;
    background: url(./../../../assets/yagl/cent_bg.png) no-repeat;
    background-size: 100% 100%; 
}
.super-flow__node .flow-node {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 3px;
    font-size: 12px;
    word-wrap: break-word;
    border: 1px solid #40afdd;
    color: #fff;
    vertical-align: top;
    text-align: center;
    background: #40afdd;
    background-repeat: no-repeat;
    background-position: bottom;
    box-shadow:inset 0px 0px 21px 0px #40afdd;
}
.node-item {
    font-size: 14px;
    display: inline-block;
    height: 30px;
    width: 120px;
    margin-top: 20px;
    margin-left: 5px;
    cursor: pointer;
    user-select: none;
    z-index: 6;
    border: 1px solid #40afdd;
    color: #fff;
    vertical-align: top;
    text-align: center;
    background: #40afdd;
    background-repeat: no-repeat;
    background-position: bottom;
    box-shadow:inset 0px 0px 21px 0px #40afdd;
}
.node-item:hover {
    box-shadow : 1px 1px 8px rgba(0, 0, 0, 0.4);
}
.el-col-12{
    width: 16.6%;
    height: 40px;
    margin-top: 5px;
}
.submit_btn{
    position: relative;
    cursor: pointer;
    right: 33%;
    width: 80px;
    float: right;
    text-align: center;
    height: 24px;
    line-height: 24px;
    color: #fff;
    box-shadow: inset 0px 0px 21px 0px #40afdd;
}
.top_jt_up{
  position: absolute;
  width: 48px;
  height: 9px;
  bottom: -5px;
  cursor: pointer;
  left: 50%;
  transform: translate(-50%, 0);
  background: url(./../../../assets/yagl/top_jt_bot.png) no-repeat;
  background-size: 100% 100%; 
}
.top_jt_down{
  position: absolute;
  width: 48px;
  height: 9px;
  bottom: -5px;
  cursor: pointer;
  left: 50%;
  transform: translate(-50%, 0);
  background: url(./../../../assets/yagl/top_jt_top.png) no-repeat;
  background-size: 100% 100%; 
}
.left_jt_left{
  position: relative;
  width: 9px;
  height: 48px;
  left: 200px;
  cursor: pointer;
  top: 50%;
  transform: translate(0, -50%);
  background: url(./../../../assets/yagl/left_jt_right.png) no-repeat;
  background-size: 100% 100%; 
}
.left_jt_right{
  position: relative;
  width: 9px;
  height: 48px;
  left: 200px;
  cursor: pointer;
  top: 50%;
  transform: translate(0, -50%);
  background: url(./../../../assets/yagl/left_jt_left.png) no-repeat;
  background-size: 100% 100%; 
}
</style>
<style>
.yagl-edit-panel .ivu-modal .ivu-modal-content{
  top: 333px;
  left: 800px;
  width: 500px !important;
}
.yagl-edit-panel .el-form-item__label{
    color: #58f5ff;
}
.yagl-edit-panel .el-textarea__inner{
    background: #40afdd;
    outline: 0px;
    height: 80px;
    border: 0px;
    color: #fff;
}
.yagl-edit-panel .el-button{
    padding: 5px 12px;
}
</style>

