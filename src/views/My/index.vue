<template>
  <div>
    <div
      class="loginOk"
      v-if="this.$store.state.user && this.$store.state.user.token"
    >
      <div class="login">
        <van-image
          round
          width="2rem"
          height="2rem"
          :src="'http://liufusong.top:8080' + userInfo.avatar"
        />
        <p>{{ userInfo.nickname }}</p>
        <van-button type="primary" size="mini" @click="sure">退出</van-button>
        <a href="#" class="selfinfo"
          >编辑个人资料
          <van-icon name="play" />
        </a>
      </div>
      <div>
        <van-grid clickable :column-num="3">
          <van-grid-item icon="star-o" text="我的收藏" to="/favorate" />
          <van-grid-item icon="wap-home-o" text="我的出租" to="/rent" />
          <van-grid-item icon="underway-o" text="看房记录" />
          <van-grid-item icon="shop-collect-o" text="成为房主" />
          <van-grid-item icon="manager-o" text="个人资料" />
          <van-grid-item icon="service-o" text="联系我们" />
        </van-grid>
      </div>
    </div>
    <div class="notlogin" v-else>
      <div class="login">
        <van-image round width="2rem" height="2rem" src="" />

        <p>游客</p>
        <van-button type="primary" size="small" @click="fn">去登陆</van-button>
      </div>
      <div>
        <van-grid clickable :column-num="3">
          <van-grid-item icon="star-o" text="我的收藏" to="/login" />
          <van-grid-item icon="wap-home-o" text="我的出租" to="/login" />
          <van-grid-item icon="underway-o" text="看房记录" />
          <van-grid-item icon="shop-collect-o" text="成为房主" />
          <van-grid-item icon="manager-o" text="个人资料" />
          <van-grid-item icon="service-o" text="联系我们" />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/login.js'
import { Dialog } from 'vant'
export default {
  created () {
    // 判断是否包含token，有token就显示已经登陆的界面，吧未登录的界面隐藏，采用v-if的方法。

    this.getInfo()
    // console.log(this.$store.state.user)
  },
  data () {
    return {
      show: false,
      userInfo: {}
    }
  },
  methods: {
    fn () {
      this.$router.push('/login')
    },
    token () {
      if (this.res) {
        return false
      } else {
        return true
      }
    },
    sure () {
      Dialog.confirm({
        title: '提示',
        message: '是否确定退出？',
        confirmButtonText: '退出',
        confirmButtonColor: 'blue',
        width: '260px'
      })
        .then(() => {
          // on confirm
          this.$router.push({ path: 'login' })
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    async getInfo () {
      const res = await getInfo()
      // console.log('res', res)
      this.userInfo = res.data.body
      // console.log(this.userInfo)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 100px;
  left: 50%;
  margin-left: -152px;
  margin-bottom: 110px;
  width: 305px;
  height: 165px;
  // background-color: pink;
  box-shadow: 0 0 4px 4px pink;
  .van-image {
    position: absolute;
    top: -30px;
  }
  p {
    font-size: 12px;
  }
  .van-button {
    border-radius: 10px;
    width: 70px;
  }
}
.selfinfo {
  margin-top: 15px;
  font-size: 12px;
  color: gray;
}
</style>
