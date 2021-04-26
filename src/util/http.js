// util主要用于封装公共的库  封装axios库
// 引入axios
import axios from 'axios'

import { Toast } from 'vant'

const http = axios.create({
    baseURL: 'https://m.maizuo.com',
    timeout: 5000,
    headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16184501213235970094727169","bc":"310100"}'
    }
})

// axios拦截器如何理解,请求之前和之后的拦截，
// 会用axios拦截器吗？拦截器有什么作用：使用axios拦截器在发送请求前让loading框弹出来，在axios拦截器之后让loading消失

// 拦截器

// 请求之前拦截器
http.interceptors.request.use(function(config) {
    //  配置请求参数
    // 启动loading
    // 显示一个正在加载中的loading
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay: true,
        duration: 1000,
    });
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 请求成功，响应返回时的拦截器 
http.interceptors.response.use(function(response) {
    // 清除loading
    Toast.clear()
    return response;
}, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

// 导出http模块
export default http