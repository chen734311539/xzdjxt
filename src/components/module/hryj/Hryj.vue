<template>
    <div class="Hryjpanel">
    <LeftContentNameBar :isshowshaixuan="false" />
    </div>
</template>

<script>
import InputSearch from '@/components/base/InputSearch'
import AllDeptTree from '@/components/base/AllDeptTree'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import { mapState } from 'vuex'
export default {
  name: 'Hryj',
  components: {LeftContentNameBar},
  data () {
    return {
        
    }
  },
  computed: mapState({
  }),
  methods:{
    
  },
  created(){
    
  },
  mounted(){
    
  }
}
</script>

<style scoped>
.Hryjpanel{
   height: 100%;
   width: 100%;
}
</style>

