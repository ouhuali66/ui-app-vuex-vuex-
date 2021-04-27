import Vue from 'vue'
import Vuex from 'vuex'

//导入模块
import CityModule from './module/CityModule.js'
import TabbarModule from './module/TabbarModule.js'
import CinemaModule from './module/CinemaModule.js'

import createPersistedState from 'vuex-persistedState'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    // 导出vue中state中的对象 - 在state中设置初始状态值
    state: {},
    // 集中式修改状态
    mutations: {},
    // actions是专门用来做异步操作处理的
    actions: {},
    // 在modules中存放各个模块
    modules: {
        CityModule,
        TabbarModule,
        CinemaModule
    }
})