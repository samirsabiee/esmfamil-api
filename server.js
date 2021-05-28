require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const option = require('./config/socketOption.config')
const io = require('socket.io')(server, option)
const lobby = require('./src/lobby')
io.of('/home').use(require('./middlewares/socketGlobal.middleware'))
io.of('/play').use(require('./middlewares/socketGlobal.middleware'))

io.of('/home').on('connection', socket => {
    console.log('home User Connected...')
    socket.on('getUsers', (data, resp) => {
        // {data: lobby.getPlayersIdsAndUsernames()}
        console.log(data)
        resp(lobby.getPlayersIdsAndUsernames())
    })
    socket.emit('message', {data: 'test'})
    socket.emit('saveUser', lobby.getPlayersIdsAndUsernames())
    socket.on('saveUser', data => {
        console.log('socket.on(saveUser => ', data)
    })
    socket.on('disconnect', reason => {
        lobby.removePlayer(socket.user.getId())
        console.log(`home ${socket.user.getUsername()} is disconnected: ${reason}`)
    })
})

io.of('/play').on('connection', socket => {
    console.log('new user connected', socket.user.getUsername(), socket.user.getIp(), socket.user.getId())
    console.log(lobby.getPlayersIdsAndUsernames())
    socket.emit('connection', {data: lobby.getPlayersIdsAndUsernames()})
    socket.on('message', data => {
        console.log(data)
    })
    socket.on('disconnect', reason => {
        lobby.removePlayer(socket.user.getId())
        console.log(`play ${socket.user.getUsername()} is disconnected: ${reason}`)
    })

    /*let roomName = require('./src/game/roomName')*/
    //require('./src/game/timer')(io, 120)
})

server.listen(process.env.PORT, () => console.log(`Server Run on http://localhost:${process.env.PORT}`))