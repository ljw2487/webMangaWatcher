import axios from 'axios'
const requests = axios.create({
    baseURL: 'http://localhost:8088',
    timeout: 3000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    }
})

// 请求拦截器
requests.interceptors.request.use(config => {
    // config.headers.Authorization = window.localStorage.getItem('token')
    // console.log('触发请求拦截器')
    return config
}, (err) => {
    return Promise.reject('fail', err)
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // console.log('触发响应拦截器')
    if (res.status === 200) {
        return Promise.resolve(res.data)
    } else {
        return Promise.reject(res)
    }
}, (err) => {
    return Promise.reject('fail', err)
})

export default requests