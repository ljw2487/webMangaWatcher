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

// 用于生成图片base64传到前端
router.post('/imgurl', (req, res) => {
    let host = req.body.host
    let path = (req.body.url).split('i.pixiv.cat')[1]
    console.log(host, path)

    HttpsClient.get({
        host,
        path,
        headers: {
            // 'content-type': 'application/json; charset=utf-8',
            'access-control-allow-origin': 'pixiviz.pwp.app',
            'Referer': 'https://pixiviz.pwp.app/',
        },
    }).then(data => {
        // console.log(data)
        res.send(data)
    })

    // res.send('ok')
})


module.exports = router