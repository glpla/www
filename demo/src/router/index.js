import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Option from '@/components/option/Option'
import About from '@/components/about/About'
import Admin from '@/components/Admin'
import Login from '@/components/Login'
import Register from '@/components/Register'
// import Game from '@/components/option/Game'
// import Translate from '@/components/option/Translate'
// import Gallery from '@/components/option/Gallery'
// import Scroll from '@/components/Scroll'
// import Phone from '@/components/about/contact/Phone'
// import Mail from '@/components/about/contact/Mail'
// sub router
import Contact from '@/components/about/Contact'
import Delivery from '@/components/about/Delivery'
import Info from '@/components/about/Info'
import Order from '@/components/about/Order'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  scrollBehavior(to, from, savedPosition) {
    // scroll到指定位置
    // return { x: 0, y: 100 }
    // scroll到指定类的元素
    // return { selector: '.btn' }
    // scroll到保存的位置:需要借助浏览器的前进后退实现.意义并不大.且浏览器支持不是很广泛.
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
      path: '/',
      name: 'homeLink',
      component: Home
    },
    {
      path: '/option',
      name: 'optionLink',
      component: Option
    },
    {
      path: '/admin',
      name: 'adminLink',
      component: Admin
    },
    {
      path: '/about',
      name: 'aboutLink',
      component: About,
      // redirect: '/info',
      redirect: {
        name: 'InfoLink'
      },
      children: [{
        path: 'contact',
        name: 'ContactLink',
        component: Contact
      }, {
        path: 'delivery',
        name: 'DeliveryLink',
        component: Delivery
      }, {
        path: 'info',
        name: 'InfoLink',
        component: Info
      }, {
        path: 'order',
        name: 'OrderLink',
        component: Order
      }]
    },
    {
      path: '/login',
      name: 'loginLink',
      component: Login
    },
    {
      path: '/register',
      name: 'registerLink',
      component: Register
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
