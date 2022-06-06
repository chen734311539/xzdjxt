<template>
  <div class="muli-tags" @click='focus'>
    <div class="taglabel" style="margin: 0 0 10px 0px;display:inline-flex;">
    <span style="margin-right: 8px">匹配标签：</span>
    <input class='inputclass' type="text"
      ref='input'
      @keyup.enter="add"
      @keydown.delete="del"
      @keydown.188='split'
      v-model='current'>
    <HfxButton @click="addTag" :height=24 :width=40  style="margin:-5px 0 0 5px;" />
    </div>
    <div class="tagsContent">
    <button class='btn' v-for='(tag, index) in tags' :key='index' @click='delTag(index)'>{{tag}} <span>×</span></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  props:['tagspro'],
  methods: {
    focus () {
      this.$refs.input.focus()
    },
    split (e) {
      e.preventDefault()
      this.add(e)
    },
    add (e) {
      const val = e.target.value
      if (!val) return
      if (this.tags.indexOf(val) > -1) return
      this.tags.push(val)
      this.$emit('input', this.tags)
      this.current = ''
    },
    addTag(){
      const val = this.$refs.input.value;
      if (!val) return
      if (this.tags.indexOf(val) > -1) return
      this.tags.push(val)
      this.$emit('input', this.tags)
      this.current = ''
    },
    del (e) {
      if (!e.target.value.length) {
        this.tags.pop()
        this.$emit('input', this.tags)
      }
    },
    delTag (index) {
      this.tags.splice(index, 1)
      this.$emit('input', this.tags)
    }
  },
  computed: {
    
  },
  data () {
    return {
      current: '',
      tags:[],
    }
  },
  watch : {
      tagspro:function(val) {
          debugger;
          this.tags = this.tagspro;
      },
  }
}
</script>

<style scoped>
.muli-tags{
  padding: 5px 0px;
  display: block;
  /* border: 1px solid #ccc; */
}
.muli-tags .input{
  background: transparent;
}
.muli-tags .btn{
  border: 0px;
  background-color: #2d8cf0;
  color: #fff;
  padding: 4px 7px;
  margin: 5px 5px 0 0;
  padding: 3px 3px;
}
.inputclass{
  width: 200px;
  height: 24px;
  margin: -5px 0 0 3px;
  padding: 0 10px;
  outline: none;
  color: #58f5ff;
  background-color: transparent;
  border: 1px solid #58f5ff;
}
.subbtn{
  margin-left: 5px;
  margin-top: -5px;
}
.tagsContent{
    display: block;
    width: 100%;
    height: auto;
    padding-left: 72px;
}
</style>