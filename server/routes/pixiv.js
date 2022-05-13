const express = require("express")
const router = express.Router()
const HttpsClient = require("../models/httpsClient")


// From: https://pixivic.com/
// Host: https://api.huisq.site/ranks?page=1&date=2022-05-13&mode=day&pageSize=30
router.get('/rank', (req, res) => {
    let queryData = req.query
    let path = '/ranks?'
    let length = Object.keys(queryData).length
    for (let key in queryData) {
        length --
        path += `${key}=${queryData[key]}`
        if (length > 0) path += '&'
    }
    // console.log(path)

    HttpsClient.get({
        host: 'api.huisq.site',
        path,
        headers: {},
    }).then(data => {
        res.send(data)
    })
})

// From: https://api.lolicon.app/#/setu
// Host: https://api.lolicon.app/setu/v2?size=original&size=regular
router.get('/lolicon', (req, res) => {
    let tag = encodeURI(req.query.tag).split(',')
    let size = req.query.size
    let path = '/setu/v2?'
    tag.forEach(item => {
        path += `tag=${item}&`
    })
    path += `size=${size}`
    // console.log(path)

    HttpsClient.get({
        host: 'api.lolicon.app',
        path,
        headers: {},
    }).then(data => {
        res.send(data)
    })
})


module.exports = router