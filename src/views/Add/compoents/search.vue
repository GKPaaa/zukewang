<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @cancel="$router.back()"
    />
    <ul v-if="value !== ''">
      <li
        v-for="(item, index) in searchResultList"
        :key="index"
        @click="jump(item)"
      >
        {{ item.communityName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { searchCommunity } from '@/api/community'
export default {
  created () {
  },
  data () {
    return {
      area: '',
      value: '',
      searchResultList: [],
      needInfo: []
    }
  },
  methods: {
    async searchCommunity () {
      const res = await searchCommunity({ name: this.area, id: 'AREA|88cff55c-aaa4-e2e0' })
      this.searchResultList = res.data.body
      console.log(this.searchResultList)
    },
    jump (text) {
      console.log(text)
      this.$router.push({ path: `/rent/add?name=${text.communityName}&community=${text.community}` })
    }
  },
  computed: {},
  watch: {
    value: {
      handler (newVal) {
        this.area = newVal
        this.searchCommunity()
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
ul {
  li {
    font-size: 14px;
    border-bottom: 1px solid #000;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    width: 100%;
  }
}
</style>
