require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const option = require('./config/socketOption.config')
const io = require('socket.io')(server, option)
io.of('/home').use(require('./middlewares/socketGlobal.middleware'))
io.of('/play').use(require('./middlewares/socketGlobal.middleware'))

require('./src/sockets/home.socket')(io)

require('./src/sockets/play.socket')(io)

server.listen(process.env.PORT, () => console.log(`Server Run on http://localhost:${process.env.PORT}`))