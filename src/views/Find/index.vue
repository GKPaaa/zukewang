<template>
  <div>
    <!-- 顶部区域 开始-->
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
            北京 <van-icon name="map-marked" /> |
          </div>
        </template>
        <template #left>
          <van-icon name="arrow-left" style="margin-right: 10px" />
        </template>
      </van-search>
    </div>
    <!-- 顶部区域 结束-->

    <!-- 中间选择条件区域，！重构！开始 -->
    <div class="search">
      <van-dropdown-menu active-color="green" duration="0">
        <van-dropdown-item title="区域">
          <template #default>
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="getName"
              toolbar-position="bottom"
            >
              <template #confirm
                ><van-button type="primary" block class="sure">确定</van-button>
              </template>
              <template #cancel
                ><van-button type="default" block class="cancel"
                  >取消</van-button
                >
              </template>
            </van-picker>
          </template>
        </van-dropdown-item>
        <van-dropdown-item title="方式">
          <template #default>
            <van-picker
              show-toolbar
              :columns="rentManner"
              @confirm="getManner"
              toolbar-position="bottom"
            />
          </template>
        </van-dropdown-item>
        <van-dropdown-item title="租金">
          <template #default>
            <van-picker
              show-toolbar
              :columns="rentPrice"
              @confirm="getPrice"
              toolbar-position="bottom"
            />
          </template>
        </van-dropdown-item>
        <van-dropdown-item>
          <template #title>
            <div class="tit" @click.stop="fn"><p>筛选</p></div>
          </template>
        </van-dropdown-item>
        <van-popup
          v-model="show"
          position="right"
          :style="{ height: '100%', width: '80%' }"
          get-container="body"
          duration="0"
        >
          <div class="type">
            <h6>户型</h6>
            <SiftHouses></SiftHouses>
          </div>
          <van-divider>户型</van-divider>
          <div class="direction">
            <h6>朝向</h6>
            <DirectionHouses></DirectionHouses>
          </div>
          <van-divider>朝向</van-divider>
          <div class="floor">
            <h6>楼层</h6>
            <FloorHouses></FloorHouses>
          </div>
          <van-divider>楼层</van-divider>
          <div class="light">
            <h6>房屋亮点</h6>
            <HousesLight></HousesLight>
          </div>
          <van-divider>房屋亮点</van-divider></van-popup
        >
      </van-dropdown-menu>
    </div>
    <!-- 中间选择条件区域，！重构！结束 -->

    <!-- 下面的房屋基本信息区域，采用组件来写 -->
    <house :areaKeycode="areaKeycode" :rentType="rentType"></house>
  </div>
</template>

<script>
import SiftHouses from './compoent/SiftHouses.vue'
import DirectionHouses from './compoent/DirectionHouse.vue'
import FloorHouses from './compoent/FloorHouses.vue'
import HousesLight from './compoent/HousesLight.vue'
import { conditionAPI } from '@/api/house.js'
import house from '@/views/Find/compoent/house.vue'
export default {
  created () {
    this.condition()
    this.price()
  },
  data () {
    return {

      show: false,
      rentType: false,
      value: '',
      areaValue: [],
      areaKeycode: '', // 城市的id
      // regionList: [],
      // 获取到的区域的数组
      areaList: [],
      areaRawList: [],
      // 获取到的地铁数据数组
      // detailAreaList: [],
      subwayList: [],
      rentPrice: [],
      columns: [
        {
          text: '区域',
          children: [
            {
              text: '',
              children: [{ text: '' }]
            }
          ]
        },
        {
          text: '地铁',
          children: [
            {
              text: '',
              children: [{ text: '' }]
            }
          ]
        }
      ],
      rentManner: [
        { text: '不限' },
        { text: '整租' },
        { text: '合租' }
      ]
    }
  },
  methods: {
    async condition () {
      try {
        const res = await conditionAPI('AREA|88cff55c-aaa4-e2e0')
        console.log(res)
        this.roomType = res.data.body.roomType // 获取房屋的房间类型（一室、二室、三室、四室）
        this.directionType = res.data.body.oriented // 获取房屋的方向类型 并渲染

        this.rentPrice = res.data.body.price
        this.rentPrice = this.rentPrice.map(item => ({ text: item.label, value: item.value }))
        console.log(this.rentPrice)

        this.areaList = res.data.body.area.children
        this.areaRawList = res.data.body.area.children
        this.subwayList = res.data.body.subway.children
        this.areaList = this.areaList.map(item => {
          // 目的：将得到的数据改成与vant组件库一样的格式，让它自己去渲染
          // 注：因为还需要城市的id值所以还要另外声明一个不改变的数组进行遍历并获取id值
          return ({ text: item.label, children: item.children })
        })
        this.areaList.forEach(item => {
          if (item.children) {
            item.children = item.children.map(item1 => ({ text: item1.label }))
          }
        })
        this.columns[0].children.push(...this.areaList)
        // 地铁渲染 开始
        this.subwayList = this.subwayList.map(item => {
          // 原理同上
          return ({ text: item.label, children: item.children })
        })
        this.subwayList.forEach(item => {
          if (item.children) {
            item.children = item.children.map(item1 => ({ text: item1.label }))
          }
        })
        this.columns[1].children.push(...this.subwayList)
        // 地铁渲染 结束
      } catch (err) {
        console.log(err)
      }
    },
    getName (value) {
      this.areaValue = value
      // console.log(this.areaValue[2])
      this.areaRawList.forEach(item => {
        // 目的：获取对应的区域的value值，方法：便利原数组的每一个children，与选择好的进行对比，相等就将该value赋值给 areakeycode用来充当获取城市列表的形参
        if (item.children) {
          item.children.forEach(item1 => { if (item1.label === this.areaValue[2]) { this.areaKeycode = item1.value } })
          // 上面这一步就是把选择的城市的id值传给了areaKeyCOde 可以通过父向子传值，将该id传过去，就获得了查询城市的id值条件
        }
      })
      // console.log(this.areaKeycode)
    },
    // 获取租房的方式
    getManner (value) {
      if (value === '整租') {
        this.rentType = true
      }
    },
    fn () {
      this.show = true
    },
    // 改变租金的数组形式自动渲染并再点击后自动获取value值
    price () {

    },
    getPrice () { }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    house,
    SiftHouses,
    DirectionHouses,
    FloorHouses,
    HousesLight
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
  margin-top: 55px;
}
.sure {
  position: absolute;
  width: 70%;
  right: 0;
  bottom: 0;
}
.cancel {
  position: absolute;
  width: 30%;
  left: 0;
  bottom: 0;
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
.filterType {
  display: block;
  width: 60px;
  height: 30px;
  border: 1px solid gray;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  margin-bottom: 12px;
}
</style>
