const express = require("express")
const https = require("https")
const router = express.Router()

router.get('/network', (req, res) => {
    // console.log(req.query)
    let host = req.query.currentHost
    let port = host.split(':')[1]*1
    if(port) host = host.split(':')[0]
    else port = 443
    // console.log(host, port)
    let options = {
        hostname: host,
        port,
        path: '/api/v3/system/network2?platform=1',
        method: 'GET',
        rejectUnauthorized: false
    }
    let request = https.request(options, (r) => {
        // console.log(res.statusCode)
        // console.log(res.headers)
        r.on('data', (d) => {
            let data = JSON.parse(d)
            res.send(data)
            // process.stdout.write(d)
        })
    })
    request.on('error', (e) => {
        // console.error(e)
        res.send('请求超时', e)
    })
    request.end()
})




module.exports = router