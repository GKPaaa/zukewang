<template>
  <div>
    <div class="nav">
      <van-nav-bar
        :title="houseInfo.community"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="pic">
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in houseInfo.houseImg"
          :key="index"
        >
          <img
            :src="'http://liufusong.top:8080' + houseInfo.houseImg[index]"
            style="height: 200px; width: 100%"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="title">
      <span class="des"> {{ houseInfo.title }} </span> <br />
      <van-tag
        color="skyblue"
        text-color="cyan"
        v-for="(item, index) in houseInfo.tags"
        :key="index"
        >{{ houseInfo.tags[index] }}</van-tag
      >
    </div>
    <div class="price">
      <van-row type="flex" justify="space-around">
        <van-col span="6">
          <span>{{ houseInfo.price }}/月</span> <br />
          <span>租金</span>
        </van-col>
        <van-col span="6">
          <span>{{ houseInfo.roomType }}</span> <br />
          <span>房型</span>
        </van-col>
        <van-col span="6">
          <span>{{ houseInfo.size }}平米</span> <br />
          <span>面积</span>
        </van-col>
      </van-row>
    </div>

    <div class="assort">
      <p>房间配套</p>
      <van-grid square :border="false" :column-num="5">
        <van-grid-item
          v-for="(item, index) in houseInfo.supporting"
          :key="index"
          icon="photo-o"
          :text="houseInfo.supporting[index]"
        />
      </van-grid>
    </div>

    <div class="over">
      <p>房源概括</p>
      <hr />
      <div class="master">
        <img src="@/assets/1.jpg" alt="" />
        <div>
          <p>王女士</p>
          <p style="color: red">
            <van-icon name="chat-o" color="#ee0a24" />&nbsp; 已认证房主
          </p>
        </div>

        <van-button plain type="primary" class="btn" size="small"
          >发消息</van-button
        >
      </div>
    </div>

    <div class="txt">
      <p>
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </p>
    </div>

    <div class="like">
      <p>猜你喜欢</p>
      <hr />
      <van-card
        price="4500 元/月"
        desc="72.32㎡/南 北/低楼层"
        :title="item.title"
        :thumb="`http://liufusong.top:8080${item.imgSrc}`"
        v-for="item in likeList"
        :key="item.id"
      >
        <template #tags>
          <van-tag plain type="danger">随时看房</van-tag>
        </template>
      </van-card>
    </div>

    <div class="call">
      <van-row>
        <van-col span="8">
          <van-button type="default" size="large" @click="collection">
            <van-icon name="star" :color="isFavorite ? 'red' : ''" />收藏
          </van-button></van-col
        >
        <van-col span="8">
          <van-button type="default" size="large">在线咨询</van-button>
        </van-col>
        <van-col span="8">
          <van-button type="primary" size="large">电话预约</van-button>
        </van-col>
      </van-row>
      <van-dialog
        v-model="show"
        title="好客租房"
        confirmButtonColor="blue"
        show-cancel-button
        confirmButtonText="跳转"
        @confirm="fn"
        message="您还为登录，是否跳转登录页面?"
        width="7rem"
      >
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { collect, detailAPI } from '@/api/detail'
import { newsAPI, collectionAPI, isCollection, delCollectionAPI } from '@/api/house'

export default {
  async created () {
    this.detail()
    this.newsAPI()
    // 看房屋是否是已经添加
    console.log(this.$route.params.houseID)
    const res = await isCollection(this.houseCode)
    console.log(res)
    this.isFavorite = res.data.body.isFavorite
    // console.log(this.isFavorite)
  },
  data () {
    return {
      houseCode: this.$route.params.houseID,
      houseInfo: {},
      likeList: [],
      show: false,
      isFavorite: false
    }
  },
  methods: {
    // 用户未登录 跳转功能
    fn () {
      this.$router.push({ name: 'login' })
    },
    // 房屋的添加功能
    async collectionAPI () {
      const res = await collectionAPI(this.houseCode)
      console.log(res)
    },

    // 把猜你喜欢的图片渲染到里面
    async newsAPI () {
      const res = await newsAPI('AREA|88cff55c-aaa4-e2e0')
      this.likeList = res.data.body
    },
    async detail () {
      try {
        const res = await detailAPI(this.houseCode)
        this.houseInfo = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    // 点击收藏该房间 或者取消收藏该房间
    async collection () {
      if (this.$store.state.user && this.$store.state.user.token) {
        try {
          if (this.isFavorite) {
            const res = await delCollectionAPI(this.houseCode) // 取消收藏
            console.log(res)
            this.isFavorite = false
            Toast.success('取消收藏')
          } else {
            await collect(this.houseCode) // 功能添加房屋收藏
            const res = await isCollection(this.houseCode)
            res.data.body.isFavorite = true
            Toast.success('收藏成功')
            this.isFavorite = true
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        console.log('用户未登录')
      }
    }
  },
  computed: {},
  watch: {

  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.my-swipe .van-swipe-item {
  margin: 0;
  color: #fff;
}
.title {
  padding-left: 15px;
  .des {
    font-size: 14px;
  }
  .van-tag {
    padding: 2px 8px;
    margin-right: 10px;
  }
}
.price {
  margin-top: 20px;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  .van-col {
    span {
      &:nth-child(1) {
        color: red;
        font-size: 18px;
      }
      &:nth-child(3) {
        font-size: 14px;
        color: gray;
      }
    }
  }
}
.assort {
  margin-bottom: 40px;
  margin-bottom: 20px;
  p {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border-bottom: 1px solid #000;
    margin: 0;
  }
}
.over {
  width: 100%;
  height: 120px;
  p {
    font-size: 16px;
  }
  .master {
    padding-left: 15px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    img {
      height: 100%;
      border-radius: 50%;
      margin-right: 15px;
    }
    p {
      font-size: 14px;
      margin: 3px;
    }
    .btn {
      margin-left: 110px;
      padding: 10px 10px;
    }
  }
}
.txt {
  padding: 0 10px;
  font-size: 14px;
  margin-top: 5px;
  line-height: 20px;
}
.like {
  p {
    font-size: 16px;
    padding-left: 15px;
  }
}
</style>
