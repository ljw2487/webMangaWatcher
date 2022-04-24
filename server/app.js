const config = require('./config')
const express = require('express')
const cors = require('cors')
const md5 = require('md5')

// const request = require('request')
// const http = require("http")
// const https = require("https")
// const axios = require('axios')

const mysql = require('mysql')
const pool = mysql.createPool( config.mysqlPool )
const jwt = require('jsonwebtoken')
const key = 'my key'
const app = express()

const network = require('./routes/network')

// 方法
app.use(cors( config.allowCORS ))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use('/', network);

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