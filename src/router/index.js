import Vue from 'vue'
import VueRouter from 'vue-router'
import Center from '../views/Center.vue'
import Cinema from '../views/Cinema.vue'
import Film from '../views/Film.vue'

import Comingsoon from '../views/film/Comingsoon.vue'
import Nowplaying from '../views/film/Nowplaying.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/center',
        component: Center
    },
    {
        path: '/cinema',
        component: Cinema
    },
    {
        path: '/film',
        component: Film,
        children: [{
                path: '/film/comingsoon',
                component: Comingsoon
            },
            {
                path: '/film/nowplaying',
                component: Nowplaying
            },
            // 二级路由重定向
            {
                path: '',
                redirect: '/film/comingsoon'
            }
        ]
    },
    // 一级路由重定向
    {
        path: '',
        redirect: '/center'
    },
    // 路由懒加载
    {
        path: '/login',
        component: () =>
            import ('../views/Login.vue')
    },
    // 懒加载实现路由跳转 - 动态添加路由方式1
    // {
    //     path: '/detail',
    //     component: () =>
    //         import ('../views/Detail.vue')
    // },
    //
    // 懒加载实现路由跳转 - 动态添加路由方式2
    {
        path: '/detail/:myid', // 绑定动态二级路由
        component: () =>
            import ('../views/Detail.vue'),
        name: 'demoDetail' // 给路由命名
    },
    {
        path: '/city',
        component: () =>
            import ('../views/City.vue')
    },
    {
        path: '/search',
        component: () =>
            import ('../views/Search.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//  设置全局路由守卫 —— 路由拦截
router.beforeEach((to, from, next) => {
    // 设置一个路径数组
    const auth = ['/center', '/order', '/money', 'card']
        // 判断to中的路径，
    if (auth.includes(to.fullPath)) {
        // 验证token
        // console.log('验证token')
        if (!localStorage.getItem('token')) {
            next('/login')
        } else {
            next()
        }
    } else {
        // 放行
        next()
    }
})

export default router