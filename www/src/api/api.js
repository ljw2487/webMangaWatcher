import requests from "./request";

export const api_network = (data) => {
    console.log('开始执行api_network')
    return requests({
        url: '/manga/network',
        method: 'GET',
        params: {
            mangaHost: data[0],
            mangaPort: data[1]
        },
        headers: { }
    })
}

export const api_homepage = (data) => {
    return requests({
        url: '',
        method: 'POST',
        data: data,
        headers: { }
    })
}