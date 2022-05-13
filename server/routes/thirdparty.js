const express = require("express")
const https = require("https")
const router = express.Router()

router.get('/setutime', (req, res) => {
    // console.log(req)
    let tag = encodeURI(req.query.tag)
    let size = req.query.size
    console.log(tag, size)
    let options = {
        hostname: 'api.lolicon.app',
        port: 443,
        path: `/setu/v2?tag=${tag}&size=${size}`,
        method: 'GET',
    }
    https.request(options, (r) => {
        r.on('data', (d) => {
            // let data = d.toString('utf8')
            // data = JSON.parse(data)
            console.log(d)
            res.send(d)
        })
    })
    .on('error', (e) => {
        res.send('请求超时', e)
    })
    .end()
})

// router.get('/testsetu', (req, res) => {
//     // console.log(req)
//     // let tag = encodeURI(req.query.tag)
//     // let size = req.query.size
//     // console.log(tag, size)
//     let options = {
//         hostname: 'pixiviz-api-tc.pwp.link',
//         port: 443,
//         path: `/v1/illust/rank?mode=week&date=2022-05-11&page=1`,
//         method: 'GET',
//         headers: {
//             'content-type': 'application/json; charset=utf-8',
//             'Referer': 'https://pixiviz.pwp.app/',
//         }
//     }
//     let httpsRequest = https.request(options, (r) => {
//         console.log(r.statusCode)
//         console.log(r.headers)
//         r.on('data', (d) => {
//             // let data = d.toString('utf8')
//             // data = JSON.parse(d)
//             // console.log(d)
//             return res.send(d)
//         })
//     })
//     httpsRequest.on('error', (e) => {
//         console.error(e)
//         // return res.send('请求超时', e)
//     })
//     httpsRequest.end()
// })


module.exports = router