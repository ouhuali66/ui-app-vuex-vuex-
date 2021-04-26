const module = {
    // 设置命名空间
    namespaced: true, //开启命名空间
    state: {
        cityId: "310100",
        cityName: "上海",
    },
    mutations: {
        changeCityName(state, name) {
            state.cityName = name

        },
        changeCityId(state, cityId) {
            state.cityId = cityId
        },
    },
    actions: {

    }
}

// 导出该模块
export default module