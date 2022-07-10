<template>
  <div>
    <van-uploader v-model="fileList" multiple :after-read="afterRead" />
  </div>
</template>

<script>
import { imgUp } from '@/api/imgUp'
export default {
  created () {

  },
  data () {
    return {
      fileList: [
      ],
      imgList: []
    }
  },
  methods: {
    async afterRead (file) {
      console.log(file.file)
      // console.log(this.fileList)
      const formData = new FormData()
      formData.append('file', file.file)
      console.log(formData)
      const res = await imgUp(formData)
      console.log(res)
      this.imgList.push(`http://liufusong.top:8080${res.data.body}`)
      // console.log(this.imgList)
      this.$emit('imgSrc', this.imgList)
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
