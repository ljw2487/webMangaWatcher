const express = require("express")
const https = require("https")
const router = express.Router()

// router.get('/homepage', (req, res) => {
//     let host = req.query.currentHost
//     let port = host.split(':')[1]*1
//     if(port) host = host.split(':')[0]
//     else port = 443
//     // 轮播图
//     let options = {
//         hostname: host,
//         port,
//         path: '/api/v3/h5/discoverIndex/freeComic?platform=1&_update=true',
//         method: 'GET',
//         rejectUnauthorized: false
//     }
//     https.request(options, (r) => {
//         r.on('data', (d) => {
//             let data = d.toString('utf8')
//             // data = JSON.parse(data)
//             // console.log(data)
//             res.send(data)
//         })
//     })
//     .on('error', (e) => {
//         // console.error(e)
//         res.send('请求超时', e)
//     })
//     .end()
// })

module.exports = router