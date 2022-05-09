const config = require('./config')
const express = require('express')
const cors = require('cors')
const md5 = require('md5')

// const request = require('request')
// const http = require("http")
const https = require("https")
// const axios = require('axios')

const mysql = require('mysql')
const pool = mysql.createPool( config.mysqlPool )
const jwt = require('jsonwebtoken')
const key = 'my key'
const app = express()

let network = require('./routes/network')
// let thirdparty = require('./routes/thirdparty')

// 方法
app.use(cors( config.allowCORS ))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.use('/', network)
// app.use('/', thirdparty)

// JWT //////////////////////
app.get('/gettoken', (req, res) => {
    let  payload = {
        name: 'Alpha',
        userId: 1001,
        exp: Date.now()/1000 + 3600*24
    }
    let token = jwt.sign(payload, key)
    res.send({
        result: 'OK',
        token
    })
})

app.get('/verifytoken', (req, res) => {
    let token = req.headers.authorization
    console.log(token)
    let payload = jwt.verify(token, key)
    console.log(payload)
})

// API ////////////////////

// app.get('/homepage', (req, res) => {
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
//             console.log('123321avc')
//             res.send(data)
//         })
//     })
//     .on('error', (e) => {
//         // console.error(e)
//         res.send('请求超时', e)
//     })
//     .end()
// })







app.listen(config.port, () => {
    console.log( 
         '=============================================================================\n'
        + config.logo.mangaV2
        +'\n============================================================================='
        +'\nServer is Running at LocalPort --> [[ ' + config.port + ' ]]'
        +'\n============================================================================='
    )
})
module.exports = app