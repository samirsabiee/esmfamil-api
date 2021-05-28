const lobby = require('../lobby')
module.exports = io => {
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
}
