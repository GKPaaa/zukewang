<template>
  <div>
    <van-nav-bar title="收藏列表" left-arrow @click-left="$router.back()" />
    <div>
      <van-card
        :desc="item.desc"
        :title="item.title"
        :thumb="'http://liufusong.top:8080' + item.houseImg"
        v-for="(item, index) in favorateHouse"
        :key="index"
        @click="details(item.houseCode)"
      >
        <template #tags>
          <van-tag
            plain
            type="danger"
            v-for="(obj, index) in item.tags"
            :key="index"
            >{{ obj }}</van-tag
          >
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { favorate } from '@/api/house'
export default {
  created () {
    this.favorate()
  },
  data () {
    return {
      favorateHouse: []
    }
  },
  methods: {
    async favorate () {
      try {
        const res = await favorate()
        this.favorateHouse = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    details (houseCode) {
      console.log(houseCode)
      this.$router.push(`/detail/${houseCode}`)
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
