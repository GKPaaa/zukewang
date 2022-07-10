<template>
  <div>
    <van-cell title="户型" is-link :value="value" @click="showPicker = true" />
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
export default {
  created () {
  },
  data () {
    return {
      value: '请选择',
      showPicker: false,
      columns: ['一室', '二室', '三室', '四室', '四室+'],
      col: [
        {
          label: '三室',
          value: 'ROOM|20903ae0-c7bc-f2e2'
        },
        {
          label: '四室',
          value: 'ROOM|ce2a5daa-811d-2f49'
        },
        {
          label: '一室',
          value: 'ROOM|d4a692e4-a177-37fd'
        },
        {
          label: '二室',
          value: 'ROOM|d1a00384-5801-d5cd'
        },
        {
          label: '四室+',
          value: 'ROOM|2731c38c-5b19-ff7f'
        }
      ],
      val: ''
    }
  },
  methods: {
    onConfirm (value) {
      this.value = value
      this.showPicker = false
      // console.log(this.value)
      this.col.forEach(item => { if (this.value === item.label) this.val = item.value })
      // console.log(this.val)
      this.$emit('type', this.val)
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
