import requests from "./request";

export const api_network = (data) => {
    return requests({
        url: '',
        method: 'GET',
        params: {

        }
    })
}

export const api_homepage = (data) => {
    return requests({
        url: '',
        method: 'POST',
        data: data,
    })
}