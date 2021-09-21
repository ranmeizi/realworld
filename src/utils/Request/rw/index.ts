import axios from 'axios'
import hosts from '@/config/hosts'
import LoadingStack from '../LoadingStack'

const baseURL = hosts.realWorldServer

const instance = axios.create({
    baseURL: baseURL,
    // timeout: 60000
});

// 请求拦截
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    LoadingStack.whenRequest(config)

    return config;
}, function (error) {
    // 对请求错误做些什么
    LoadingStack.whenResponse(error?.config)
    return Promise.reject(error);
})

// 响应拦截
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    LoadingStack.whenResponse(response?.config)

    return response;
}, function (error) {
    // 对响应错误做点什么
    LoadingStack.whenResponse(error?.config)
    return Promise.reject(error);
})

export default instance
