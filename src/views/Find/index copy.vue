<template>
  <div>
    <div class="top">
      <van-search
        v-model="value"
        show-action
        label="地址"
        background="#4fc08d"
        placeholder="请输入搜索关键词"
      >
        <template #action>
          <van-icon name="location-o" size="20px" />
        </template>
        <template #label>
          <div @click="$router.push('/city')">
            {{ area }} <van-icon name="map-marked" /> |
          </div>
        </template>
        <template #left>
          <van-icon name="arrow-left" style="margin-right: 10px" />
        </template>
      </van-search>
    </div>

    <div class="search">
      <van-dropdown-menu active-color="green" duration="0">
        <van-col span="6">
          <van-dropdown-item title="区域" ref="item">
            <van-picker title="标题" :columns="columns" />
            <div class="btn">
              <van-button type="default" size="large">取消</van-button>
              <van-button type="primary" size="large">确认</van-button>
            </div>
          </van-dropdown-item>
        </van-col>
        <van-col span="6">
          <van-dropdown-item title="方式" ref="item">
            <van-picker title="标题" :columns="columnsManner" />
            <div class="btn">
              <van-button type="default" size="large">取消</van-button>
              <van-button type="primary" size="large">确认</van-button>
            </div>
          </van-dropdown-item></van-col
        >
        <van-col span="6">
          <van-dropdown-item title="租金" ref="item">
            <van-picker title="标题" :columns="columnsDollar" />
            <div class="btn">
              <van-button type="default" size="large">取消</van-button>
              <van-button type="primary" size="large">确认</van-button>
            </div></van-dropdown-item
          ></van-col
        >

        <van-col span="6"
          ><van-dropdown-item title="筛选">
            <template #title>
              <div class="tit" @click.stop="fn"><p>筛选</p></div>
            </template>
          </van-dropdown-item></van-col
        >
        <van-popup
          v-model="show"
          position="right"
          :style="{ height: '100%', width: '80%' }"
          get-container="body"
          duration="0"
        >
          <div>
            <h5>户型</h5>
          </div>
          <div><h5>朝向</h5></div>
          <div><h5>楼层</h5></div>
          <div><h5>房屋亮点</h5></div>
        </van-popup>
      </van-dropdown-menu>
    </div>

    <!-- <house></house> -->
  </div>
</template>

<script>
import { conditionAPI } from '@/api/house.js'
import { cityInfoAPI } from '@/api/city'
// import house from './compoent/house.vue'
export default {
  created () {
    this.cityInfoAPI()
  },
  data () {
    return {
      show: false,
      area: '北京',
      arr: [],
      areaValue: '',

      // 租房的区域数组
      areaInfo: [],
      columns: [
        {
          text: '区域',
          children: [
            {}
          ]
        },
        {
          text: '地铁',
          children: [
          ]
        }
      ],
      // 租房的方式数组
      columnsManner: [],
      // 租房的租金
      columnsDollar: [],
      // 进行筛选的选项
      // columnsSift: [],
      value: ''
    }
  },
  methods: {
    onConfirm () {
      this.showPicker = false
    },
    // 获取城市的基本信息 并存储在vuex里面
    async cityInfoAPI () {
      try {
        const res1 = await cityInfoAPI(this.area)
        this.areaValue = res1.data.body.value
        this.$store.commit('setareaId', this.areaValue)
        try {
          const res = await conditionAPI(this.areaValue)
          console.log(res)
          this.areaInfo = res.data.body
          // console.log(this.areaInfo)
          // console.log(this.columns[0].children)
          // this.columns[0].children.push()
          // 将区域里面的数据渲染到childeren数组里面让他自己进行渲染，比较麻烦，后期可以一个封装来简化（注：采用push方法）这次渲染的区域
          this.areaInfo.area.children.forEach((item) => { this.columns[0].children.push({ text: item.label }) })
          // 下面和上面方法同样，这侧渲染的是地铁
          this.areaInfo.subway.children.forEach(item => { this.columns[1].children.push({ text: item.label }) })
          // 这只是区域部分的渲染，麻烦，后面还要再封装三个，先使用最麻烦的给不同的选择项新建数组并一点一点push，后面进行一次组将封装，该页面组件只负责渲染数组。
          // 这是想租房方式里添加数据
          this.areaInfo.rentType.forEach(item => { this.columnsManner.push({ text: item.label }) })
          // 租房的租金添加信息
          this.areaInfo.price.forEach(item => { this.columnsDollar.push({ text: item.label }) })
          // 租房进行筛选
          // this.areaInfo.price.forEach(item => { this.columnsDollar.push({ text: item.label }) })
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err)
      }
    },
    getContainer () {
      return document.querySelector('.search')
    },

    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    },
    fn () {
      this.show = true
    }
  },

  computed: {},
  watch: {},
  filters: {},
  components: {
    // house
  }

}
</script>

<style scoped lang='less'>
.top {
  position: fixed;
  z-index: 8;
  top: 0;
  width: 100%;
}
.search {
  position: fixed;
  top: 50px;
  width: 100%;
  z-index: 5;
  .btn {
    display: flex;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  float: right;
  width: 80%;
  height: 100%;
  background-color: #fff;
  z-index: 9999;
}
.list {
  margin-top: 120px;
}
.tit {
  position: absolute;
  top: -20px;
  right: -38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  line-height: 15px;
  text-align: center;
  height: 43px;
  // background-color: transparent;
  background-color: pink;
  overflow: hidden;
  p {
    margin-left: 25px;
    font-size: 16px;
  }
}
</style>
