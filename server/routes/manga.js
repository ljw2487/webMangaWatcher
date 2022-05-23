const express = require("express")
const router = express.Router()
const HttpsClient = require("../models/httpsClient")


// From: 
// Host: 
router.get('/network', (req, res) => {

    // HttpsClient.get({
    //     host: 'api.huisq.site',
    //     path,
    //     headers: {},
    // }).then(data => {
    //     res.send(data)
    // })
})

// From: 
// Host: 
router.get('/lolicon', (req, res) => {

    // HttpsClient.get({
    //     host: 'api.lolicon.app',
    //     path,
    //     headers: {},
    // }).then(data => {
    //     res.send(data)
    // })
})


module.exports = router