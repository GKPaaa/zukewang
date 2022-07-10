<template>
  <div>
    <div class="info">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-card
          :price="`${item.price}/月`"
          :desc="item.desc"
          :title="item.title"
          :thumb="`http://liufusong.top:8080${item.houseImg}`"
          v-for="(item, index) in houseList"
          :key="index"
          @click="$router.push(`/detail/${item.houseCode}`)"
        >
          <template #tags>
            <van-tag
              plain
              type="danger"
              v-for="(item1, index) in item.tags"
              :key="index"
              >{{ item1 }}</van-tag
            >
          </template>
        </van-card>
      </van-list>
    </div>
  </div>
</template>

<script>
import { housesAPI } from '@/api/house.js'
export default {
  props: {
    areaKeycode: {
      type: String,
      required: true
    },
    rentType: {
      type: Boolean,
      required: true
    }
  },
  created () {
    this.getHousesAPI(this.params)
    // console.log(this.areaKeycode)
  },
  data () {
    return {
      loading: false,
      finished: false,
      houseList: [],
      // 这是筛选房间的条件封装在一个params对象里面，其中的数据通过父向子来穿
      params: {
        start: 1,
        end: 50,
        cityId: this.areaKeycode,
        subway: '',
        rentType: '',
        price: null,
        more: '',
        roomType: '',
        oriented: '',
        characteristic: '',
        floor: ''
      }
    }
  },
  methods: {

    // 获取所有城市的信息并渲染再下方
    async getHousesAPI (params) {
      try {
        const res = await housesAPI(params)
        // console.log(res)
        this.houseList.push(...res.data.body.list)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },

    onLoad () {
      this.params.start = this.params.end
      this.params.end += 10
      // // this.houseList.push(this.getHousesAPI(this.params))
      // // const res1 = await housesAPI(this.params)
      this.getHousesAPI(this.params)
    }

  },
  computed: {
  },
  watch: {
    areaKeycode: {
      handler () {
        this.houseList = []
        this.getHousesAPI(this.params)
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
