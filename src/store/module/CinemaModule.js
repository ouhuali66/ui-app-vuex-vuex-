import http from '@/util/http'
const module = {
    // 设置命名空间
    namespaced: true, //开启命名空间
    state: {
        cinemaList: []
    },
    mutations: {
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
}

// 导出该模块
export default module