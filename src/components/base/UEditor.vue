<template>
  <div>
    <script :id="ueId" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UEditor',
    data () {
      return {
        editor: null,
        ueId: `J_ueditorBox_${new Date().getTime()}`
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object,
      },
      ueid: {
        type:String
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor(this.ueId, this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      setUEContent(content) { // 获取内容方法
        return this.editor.setContent(content)
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>