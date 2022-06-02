const express = require("express")
const router = express.Router()
const HttpsClient = require("../models/httpsClient")


// Goto: www.manga2022.com 
// Host: [req.query.mangaHost]
router.get('/network', (req, res) => {
    // console.log(req.query)
    let port = req.query.mangaPort * 1
    let path = '/api/v3/system/network2?platform=1'
    HttpsClient.get({
        host: req.query.mangaHost,
        port,
        path,
        headers: {},
        rejectUnauthorized: false
    }).then(data => {
        res.send(data)
    })
})

// Goto: 
// Host: 
router.get('/index', (req, res) => {

    // HttpsClient.get({
    //     host: 'api.lolicon.app',
    //     path,
    //     headers: {},
    // }).then(data => {
    //     res.send(data)
    // })
})


module.exports = router