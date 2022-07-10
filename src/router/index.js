import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import My from '@/views/My'
import Home from '@/views/Home'
import Find from '@/views/Find'
import News from '@/views/News'
import City from '@/views/City'
import Favorate from '@/views/Favorate'
import Rent from '@/views/Rent'
import Add from '@/views/Add'
const Search = () => import('@/views/Add/compoents/search.vue')
const Detail = () => import('@/views/Detail')
const Map = () => import('@/views/Map')
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'my',
        component: My
      }, {
        path: 'news',
        component: News
      }, {
        path: 'home',
        component: Home

      }, {
        path: 'find',
        component: Find
      },
      {
        path: '/login',
        component: Login,
        name: 'login'
      }, {
        path: '/city',
        component: City
      },
      {
        path: '/favorate',
        component: Favorate
      }
    ]
  },
  {
    path: '/rent',
    component: Rent,
    children: [
      {
        path: 'add',
        component: Add
      }, {
        path: 'search',
        component: Search,
        name: 'search'
      }
    ]
  },
  {
    path: '/detail/:houseID',
    component: Detail,
    name: 'article'
  }, {
    path: '/map',
    component: Map,
    name: 'map',
    prop: true
  }
]

const router = new VueRouter({
  routes
})

export default router
