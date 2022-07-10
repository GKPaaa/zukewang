<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow @click-left="fn" />

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit" size="large"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getLogin } from '@/api/login'
import { Toast } from 'vant'
export default {
  created () {
  },
  data () {
    return {
      username: 'itheima',
      password: '123456'
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      // console.log(values)
      try {
        const res = await getLogin(values)
        Toast.success('登陆成功')
        // console.log(res.data.body)
        // Notify({ type: 'success', message: '登录成功' })
        this.$store.commit('setUser', res.data.body)
        this.$router.push('/my')
      } catch (err) {
        console.log(err)
      }
    },
    fn () {
      this.$router.back()
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
