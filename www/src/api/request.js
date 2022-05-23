import axios from 'axios'
const requests = axios.create({
    baseURL: 'http://localhost:8088',
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    }
})

// 请求拦截器
requests.interceptors.request.use(config => {
    // config.headers.Authorization = window.localStorage.getItem('token')
    return config
}, (err) => {
    return Promise.reject('fail', err)
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    if (response.status === 200) {
        return Promise.resolve(res.data)
    } else {
        return Promise.reject(res)
    }
}, (err) => {
    return Promise.reject('fail', err)
})

export default requests