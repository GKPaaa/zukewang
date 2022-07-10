<template>
  <div>
    <div>
      <van-search
        v-model="value"
        left-icon
        show-action
        background="transparent"
        placeholder="请输入小区或地区"
      >
        <template #label>
          <div @click="$router.push('/city')">
            北京 <van-icon name="map-marked" /> |
          </div></template
        >

        <template #action>
          <van-icon name="location-o" size="20px" />
        </template>
      </van-search>

      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swiperList" :key="item.id">
          <img
            :src="`http://liufusong.top:8080${item.imgSrc}`"
            style="width: 100%; height: 100%"
          />
        </van-swipe-item>
      </van-swipe>
      <div>
        <van-grid clickable :column-num="4">
          <van-grid-item icon="home-o" text="整租" />
          <van-grid-item icon="friends-o" text="合租" />
          <van-grid-item icon="location-o" text="地图找房" />
          <van-grid-item icon="shop-collect-o" text="去出租" to="/rent/add" />
        </van-grid>
      </div>
      <div class="helper">
        租房小组
        <a href="#">更多</a>
      </div>
      <div>
        <van-grid direction="horizontal" :column-num="2" :gutter="10">
          <van-grid-item
            v-for="item in groupsList"
            :key="item.id"
            style="font-size: 0.35rem"
          >
            <template #text>
              {{ item.title }}
              <br />
              {{ item.desc }}
            </template>
            <template #icon>
              <img
                :src="`http://liufusong.top:8080${item.imgSrc}`"
                alt=""
                style="width: 1rem"
              />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { getSwiperAPI, groupsAPI } from '@/api/swiper'
export default {
  created () {
    this.getSwiper()
    this.groups()
  },
  data () {
    return {
      value: '',
      show: false,
      swiperList: [],
      groupsList: []
    }
  },
  methods: {
    fn () {
      alert('21')
    },
    async getSwiper () {
      const res = await getSwiperAPI()
      this.swiperList = res.data.body
      // console.log(res)
      // console.log(this.swiperList)
    },
    async groups () {
      const res1 = await groupsAPI()
      // console.log(res1)
      this.groupsList = res1.data.body
    }

  },
  computed: {

  },
  watch: {},
  filters: {},
  components: {

  }
}
</script>

<style scoped lang='less'>
.helper {
  width: 100%;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  font-size: 16px;
  a {
    margin-right: 10px;
    font-size: 14px;
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  height: 212px;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-search {
  width: 100%;
  position: fixed;
  top: 5px;
  z-index: 999;
}

.van-grid {
  padding: 10px 0;
}
</style>
