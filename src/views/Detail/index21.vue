<template>
  <div><h1>123</h1></div>
</template>

<script>
import { detailAPI } from '@/api/detail'
export default {

  created () {
    this.detail()
  },
  data () {
    return {
      id: ''
    }
  },
  methods: {
    async detail () {
      try {
        const res = await detailAPI('5cc4494549926d0e2b94c816')
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
