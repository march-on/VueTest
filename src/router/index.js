import Vue from 'vue'
import Router from 'vue-router'
//-------------一级路由---------------------
import HelloWorld from '@/components/HelloWorld'
//-------------------二级路由------------------
import Login from '@/components/Login'
import Reg from '@/components/reg'
import Home from '@/components/home'
//-------------------三级路由----------------
import LoginSystem from '@/components/LoginSystem'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'login',
          component: Login,
         
        },
        {
          path: 'reg',
          component: Reg
        },
        {
          path: 'home',
          component: Home,
          children:[
            {
              path:'system',
              component:LoginSystem
            }
          ]
        },

      ]
    }  
  ]
})
