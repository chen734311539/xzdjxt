<template>
    <div class="sywwpanel">
      <LeftContentNameBar :isshowshaixuan="false" />
    </div>
</template>

<script>
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
import { mapState } from 'vuex'
export default {
  name: 'Syww',
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

  },
}
</script>

<style scoped>
.sywwpanel{
   height: 100%;
   width: 100%;
}
</style>
