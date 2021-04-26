import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        cityId: '310100',
        cityName: '上海',
        isTabbarShow: true,
        cinemaList: []
    },
    mutations: {
        changeCityName(state, name) {
            state.cityName = name
        },
        changeCityId(state, cityId) {
            state.cityId = cityId
        },
        hideTabbar(state) {
            state.isTabbarShow = false
        },
        showTabbar(state) {
            state.isTabbarShow = true
        },
        //3-4、修改cinemaList的状态
        setCinemaList(state, cinemaList) {
            state.cinemaList = cinemaList
        },
        clearCinemaList(state) {
            state.cinemaList = []
        }
    },
    actions: {
        getCinemaList(store, cityId) {
            // 返回promise对象
            return http({
                url: `/gateway?cityId=${cityId}&ticketFlag=1&k=1682950`,
                headers: {
                    'X-Host': 'mall.film-ticket.cinema.list'
                }
            }).then(res => {
                console.log(res.data)
                    // 将拿到的数据提交到setCinemaList中在mutations中修改状态
                store.commit("setCinemaList", res.data.data.cinemas)
            })
        }
    }
})



