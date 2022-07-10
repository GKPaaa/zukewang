<template>
  <div class="publish">
    <van-nav-bar title="发布房源" left-arrow @click-left="$router.back()" />
    <p class="title">房源信息</p>

    <van-cell
      title="小区名称"
      is-link
      value="请输入小区名称"
      :border="true"
      @click="$router.push('/rent/search')"
    >
      <template #default>{{ areaName.name }}</template></van-cell
    >
    <van-cell-group>
      <van-field v-model="val" label="租金" placeholder="请输入租金/月">
        <template #right-icon>￥/月</template>
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="area" label="建筑面积" placeholder="请输入建筑面积">
        <template #right-icon>㎡</template>
      </van-field>
    </van-cell-group>

    <houseType @type="houseTypes"></houseType>

    <floor @floor="layer"></floor>

    <direction @houseDirection="dirHouse"></direction>

    <p class="title" style="color: black">房源信息</p>
    <van-field
      v-model="houseInfoval"
      label=""
      placeholder="请输入标题，（例如：整租 小区名 2室 5000元）"
    />

    <p class="title" style="color: black">房源图像</p>
    <ImgUp @imgSrc="imgList"></ImgUp>

    <p class="title" style="color: black">房源配置</p>
    <div class="houseinfo">
      <van-checkbox-group v-model="result" direction="horizontal">
        <van-checkbox name="a" class="check">
          <template #icon><van-icon name="location-o" /> </template>
          衣柜</van-checkbox
        >
        <van-checkbox name="b" class="check">
          <template #icon><van-icon name="location-o" /> </template>
          洗衣机</van-checkbox
        >
        <van-checkbox name="c" class="check">
          <template #icon><van-icon name="location-o" /> </template>
          空调</van-checkbox
        >
        <van-checkbox name="d" class="check">
          <template #icon><van-icon name="location-o" /> </template>
          天然气</van-checkbox
        >
        <van-checkbox name="e" class="check">
          <template #icon><van-icon name="location-o" /> </template>
          冰箱</van-checkbox
        >
        <van-checkbox name="f" class="check">
          <template #icon><van-icon name="location-o" /> </template>
          暖气</van-checkbox
        >
        <van-checkbox name="g" class="check">
          <template #icon><van-icon name="location-o" /> </template>
          电视</van-checkbox
        >
        <van-checkbox name="h" class="check">
          <template #icon><van-icon name="location-o" /> </template>
          热水器</van-checkbox
        >
        <van-checkbox name="i" class="check">
          <template #icon><van-icon name="location-o" /> </template>
          宽带</van-checkbox
        >
        <van-checkbox name="j" class="check">
          <template #icon><van-icon name="location-o" /> </template>
          沙发</van-checkbox
        >
      </van-checkbox-group>

      <!-- <van-grid :column-num="5">
        <van-grid-item
          v-for="(item, index) in houseInfo.supporting"
          :key="index"
          icon="photo-o"
        >
          <template #text>
            <p style="font-size: 14px" :class="isColor ? 'green' : ''">
              {{ item.label }}
            </p>
          </template>
        </van-grid-item>
      </van-grid> -->
    </div>

    <p class="title description" style="color: black">房源描述</p>
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <div class="btn">
      <van-button type="default" size="large">取消</van-button>
      <van-button type="primary" size="large" @click="addHouse"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import houseType from './compoents/houseType.vue'
import floor from './compoents/floor.vue'
import ImgUp from './compoents/imgup.vue'
import direction from './compoents/direction.vue'
import { publishAPI } from '@/api/house'
import { addHouse } from '@/api/addHouse'
export default {
  created () {
    this.publish()
    this.areaName = this.$route.query
    // console.log(this.areaName)
  },

  data () {
    return {
      result: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
      imgUpList: [],
      areaName: [],
      houseInfo: {},
      isColor: false,
      searchResult: [],
      val: '',
      area: '',
      houseInfoval: '',
      message: '',
      changeColor: false,
      houseFloor: '',
      houseType: '',
      dirHouses: ''
    }
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    async publish () {
      const res = await publishAPI()
      // console.log(res)
      this.houseInfo = res.data.body
      // console.log(this.houseInfo)
    },
    async addHouse () {
      const res = await addHouse({
        title: this.areaName.name,
        description: this.message,
        houseImg: this.imgUpList,
        oriented: `${this.dirHouses}`,
        supporting: '空调|洗衣机',
        price: this.val,
        roomType: `${this.houseType}`,
        size: this.area,
        floor: `FLOOR|${this.houseFloor}`,
        community: this.areaName.community
      })
      console.log(res)
    },
    fn () {
      this.isColor = !this.isColor
    },
    layer (val) {
      this.houseFloor = val
    },
    houseTypes (val) {
      this.houseType = val
    },
    dirHouse (val) {
      this.dirHouses = val
    },
    imgList (val) {
      this.imgUpList = val.join('|')
    }

  },
  components: {
    houseType,
    floor,
    direction,
    ImgUp
  }
}
</script>

<style scoped lang='less'>
.title {
  background-color: #fff;
  margin-top: 0;
  margin-bottom: 0;
  height: 40px;
  font-size: 15px;
  color: green;
  padding-left: 14px;
  line-height: 40px;
  border-bottom: 1px solid #000;
}
.description {
  margin-top: 20px;
}
.van-checkbox-group {
  background-color: #fff;
  .check {
    margin: 0;
    width: 20%;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
  }
}
.green {
  color: red;
}
.btn {
  display: flex;
}
</style>
