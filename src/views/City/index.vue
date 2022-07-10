<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="$router.back()" />
    <div class="inter">
      <div class="local">
        <p>当前城市</p>
        <h6>北京</h6>
      </div>
      <div class="hot">
        <p>热门城市</p>
        <h6 v-for="(item, index) in hotCity" :key="index">{{ item.label }}</h6>
      </div>
      <van-index-bar>
        <div v-for="(item, index) in words" :key="index">
          <van-index-anchor :index="item">{{ item }}</van-index-anchor>
          <van-cell
            @click="fn"
            :title="item1.label"
            v-for="(item1, index) in allcitys[item]"
            :key="index"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>...

<script>
import { allCityAPI, hotCityAPI } from '@/api/city'
import { Toast } from 'vant'
export default {
  created () {
    // console.log(this.$router)
    // console.log(this.$store.state.words)
    this.allCity()
    this.hotCityAPI()
  },
  data () {
    return {
      cityList: [],
      hotCity: [],
      word: [],
      words: [],
      allcitys: ''
    }
  },
  methods: {
    onClick () {
      // this.$router.replace('/home')
    },
    async allCity () {
      const citys = {}
      const res = await allCityAPI()

      this.cityList = res.data.body

      this.cityList.forEach(item => this.word.push(item.short[0].toUpperCase()))
      this.words = [...new Set(this.word)]
      this.words.forEach(item => {
        citys[item] = []
        this.cityList.forEach(item1 => {
          const first = item1.short[0].toUpperCase()
          if (first === item) {
            citys[item].push(item1)
          }
        })
        this.allcitys = citys
      })
      this.words = this.words.sort()
    },
    async hotCityAPI () {
      const res = await hotCityAPI()
      this.hotCity = res.data.body
    },
    fn () {
      Toast('该城市没有房源')
    }
  },
  computed: {

  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.inter {
  margin-top: 60px;
}
.van-nav-bar {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
}
.local {
  padding-left: 15px;
  p {
    font-size: 14px;
  }
  h6 {
    font-weight: normal;
    color: black;
    font-size: 16px;
  }
}
.hot {
  padding-left: 15px;
  p {
    font-size: 14px;
  }
  h6 {
    font-weight: normal;
    color: black;
    font-size: 16px;
  }
}
</style>
