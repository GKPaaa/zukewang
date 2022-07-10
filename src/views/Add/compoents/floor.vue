<template>
  <div>
    <van-cell
      title="所在楼层"
      is-link
      :value="value"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { housesParams } from '@/api/house'
export default {
  props: {

  },
  created () {
    this.params()
  },
  data () {
    return {
      value: '请选择',
      showPicker: false,
      columns: ['低楼层', '中楼层', '高楼层'],
      val: ''
    }
  },
  methods: {
    async params () {
      await housesParams()
    },
    onConfirm (value) {
      this.value = value
      this.showPicker = false
      if (this.value === '低楼层') {
        this.val = 1
      } else if (this.value === '中楼层') {
        this.val = 2
      } else {
        this.val = 3
      }
      this.$emit('floor', this.val)
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
