<template>
  <div class="type">
    <span class="check" v-for="(item, index) in floor" :key="index">{{
      item.label
    }}</span>
  </div>
</template>

<script>
import { conditionAPI } from '@/api/house.js'

export default {

  created () {
    this.conditionAPI()
  },
  data () {
    return {
      floor: []
    }
  },
  methods: {
    fn () {
      console.log('32')
    },
    //  获取租房条件的信息
    async conditionAPI () {
      const res = await conditionAPI('AREA|88cff55c-aaa4-e2e0')
      console.log(res)
      this.floor = res.data.body.floor
    }
  },
  computed: {},
  watch: {

  },
  filters: {},
  components: {},
  mounted () {

  }
}
</script>

<style scoped lang='less'>
.type {
  display: flex;
  flex-wrap: wrap;

  .check {
    display: block;
    text-align: center;
    line-height: 35px;
    margin-left: 15px;
    margin-right: 30px;
    margin-bottom: 10px;
    width: 80px;
    height: 35px;
    border: 1px solid black;
    font-size: 14px;
    // background-color: pink;
  }
}
</style>
