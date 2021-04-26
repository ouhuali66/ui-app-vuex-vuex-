const module = {
    // 设置命名空间
    namespaced: true, //开启命名空间
    state: {
        isTabbarShow: true,
    },
    mutations: {
        hideTabbar(state) {
            state.isTabbarShow = false
        },
        showTabbar(state) {
            state.isTabbarShow = true
        },
    },
    actions: {

    }
}

// 导出该模块
export default module