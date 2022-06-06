<template>
  <div class="my-screen">
      <div class="screen">
          <div class="screen-info">
                <div class="screen-img"></div>
                <div class="screen-edit">
                    <div class="screen-button">
                        <Button type="primary" size="large" style="width:100px;">编辑</Button>
                        <div class="main-button">
                            <Tooltip content="复制" placement="bottom" delay="700">
                                <span class="button-span"><Icon custom="iconfont iconfuzhi" style="font-size:18px;"/></span>
                            </Tooltip>
                            <Tooltip content="删除" placement="bottom" delay="700">
                                <span class="button-span"><Icon custom="iconfont iconshanchu" style="font-size:18px;"/></span>
                            </Tooltip>
                        </div>
                    </div>

                    <div class="rightTopDiv">
                        <Tooltip content="预览" placement="bottom" delay="700">
                            <Icon custom="iconfont iconyulan" class="rightTopIcon" style="margin-right:5px;"/>
                        </Tooltip>
                        <Tooltip content="发布" placement="bottom" delay="700">
                            <Icon custom="iconfont iconfabu" class="rightTopIcon" style="margin-right:10px;"/>
                        </Tooltip>
                    </div>
                    
                
                    
                </div>
          </div>
          <div class="screen-main">
              <div class="main-name">
                  <div class="screen-name-input">
                      <Icon custom="iconfont iconxiugai" class="nameEditIcon" />
                      <input class="input" value="测试名称">
                  </div>
                  <div class="publish-info"><span class="name-icon name-icon-wfb"></span><span>未发布</span></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Constants from '@/constants/Constants'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  name: 'ScreenItem',
  data () {
    return {
       
    }
  },
  computed:mapState({
  }),
  methods:{

  },
  mounted(){
  },
  beforeDestroy(){
  
  }
}
</script>

<style scoped>
.my-screen{
    opacity:1;
    transform:scale(1);
    margin:16px;
}
.screen{
    display:flex;
    flex-direction:column;
    width: 258px;
    height: 184px;
    border:1px solid #3a4659;
    transition:.2s;
}
.screen:hover{
    box-shadow:0 0 10px -2px #000;
    border:1px solid #2483ff;
}
.screen-info{
    width:100%;
    position: relative;
    display:flex;
    align-items: center;
    justify-content: center;
}
.screen-img{
    background-image:url(./../../assets/datascreen/example.png);
    width:inherit;
    height:146px;
    opacity:0.6;
    background-size:100% 100%;
}
.main-name{
    width:100%;
    height: 36px;
    display:flex;
    align-items:center;
    position:relative;
    justify-content:space-between;
    color:#fff;
    background:#1d262e;
    padding:0px 10px;
}
.screen-name-input{
    cursor:pointer;
    font-size:14px;
    display:flex;
    align-items:center;
    flex:1;
}
.nameEditIcon{
    font-size:16px;
    font-style:normal;
    display:inline-block;
    vertical-align:middle;
}
.input{
    width:120px;
    color:#bcc9d4;
    background:0 0;
    padding:0 5px;
    line-height:28px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
    border:1px solid transparent;
}
.publish-info{
    align-items:center;
    display:flex;
    color:#bcc9d4;
}
.name-icon{
    margin-right:5px;
    display:inline-block;
    content:"";
    width:8px;
    height: 8px;
    border-radius:5px;
}
.name-icon-wfb{
    background-color:#576369;
}
.name-icon-yfb{
    background-color: #1fadf1;
}
.screen-edit{
    position:absolute;
    opacity:0;
    display:flex;
    width:100%;
    height: 100%;
    pointer-events:none;
    align-items:center;
    justify-content:center;
    transition:opacity .2s;
    background:rgba(0,0,0,.81);
}
.screen:hover .screen-edit{
    opacity:1;
    pointer-events:all;
}
.screen-button{
    text-align:center;
}
.main-button{
    display:flex;
    justify-content:space-around;
    font-size:19px;
    padding-top:15px;
    align-items:center;
    color:#fff;
}
.button-span{
    transition:color .2s;
    cursor:pointer;
    padding:0 10px;
    white-space:nowrap;
    color:inherit;
}
.rightTopDiv{
    position:absolute;
    top: 10px;
    right: 0px;
}
.rightTopIcon{
    position: relative;
    color: #fff;
    cursor: pointer;
    transition: color .2s;
}
</style>
