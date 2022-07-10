<template>
  <div>
    <van-cell title="朝向" is-link :value="value" @click="showPicker = true" />
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
  created () { },
  data () {
    return {
      value: '请选择',
      showPicker: false,
      columns: ['东', '南', '西', '北', '东南', '东西', '东北', '西北', '西南'],
      col: [
        {
          label: '东',
          value: 'ORIEN|141b98bf-1ad0-11e3'
        },
        {
          label: '南',
          value: 'ORIEN|61e99445-e95e-7f37'
        },
        {
          label: '东南',
          value: 'ORIEN|dfb1b36b-e0d1-0977'
        },
        {
          label: '北',
          value: 'ORIEN|caa6f80b-b764-c2df'
        },
        {
          label: '西北',
          value: 'ORIEN|80795f1a-e32f-feb9'
        },
        {
          label: '西',
          value: 'ORIEN|103fb3aa-e8b4-de0e'
        },
        {
          label: '东北',
          value: 'ORIEN|67ac2205-7e0f-c057'
        },
        {
          label: '西南',
          value: 'ORIEN|2354e89e-3918-9cef'
        }
      ],
      val: ''
    }
  },
  methods: {
    onConfirm (value) {
      this.value = value
      this.showPicker = false
      this.col.forEach(item => { if (this.value === item.label) this.val = item.value })
      // console.log(this.val)
      this.$emit('houseDirection', this.val)
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
