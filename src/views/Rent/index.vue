<template>
  <div>
    <div v-if="$route.path === '/rent'">
      <van-nav-bar title="房屋管理" left-arrow @click-left="$router.back()" />
      <div>
        <van-card
          :price="item.price"
          :desc="item.desc"
          :title="item.title"
          :thumb="'http://liufusong.top:8080' + item.houseImg"
          v-for="(item, index) in rentHouse"
          :key="index"
          @click="details(item.houseCode)"
        >
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
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { rent } from '@/api/house'
export default {
  created () {
    this.rent()
  },
  data () {
    return {
      rentHouse: []
    }
  },
  methods: {
    async rent () {
      try {
        const res = await rent()
        // console.log(res)
        this.rentHouse = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    details (houseCode) {
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
