const lobby = require('../lobby')
const {rooms} = require('../lobby/rooms.lobby')
module.exports = playIo => {
    /*
    * await io.of("/play").in(rooms.GAME_WAITING).fetchSockets() instance of sockets in play namespace and GAME_WAITING room
    * io.of("/play").adapter.rooms.get(rooms.GAME_WAITING).size number of sockets in play namespace and GAME_WAITING room
    * */

    playIo.on('connection', async socket => {
        console.log('-------------------------------------------------------------')
        console.log('new player connected', socket.user.getId(), socket.user.getUsername(), socket.user.getSocketId())
        let timeWaitingId = require('../lobby/timeWaiting')(socket)
        socket.timeWaitingId = timeWaitingId
        socket.join(rooms.GAME_WAITING)
        await require('../lobby/selectChar')(playIo, socket)
        console.log('-------------------------------------------------------------')
        socket.on('charSelected', data => {
            require('../game/startGame')(playIo, data)
        })
        socket.on('disconnect', reason => {
            clearInterval(timeWaitingId)
            lobby.removeOnlinePlayer(socket.user.getId())
            console.log(`play ${socket.user.getUsername()} is disconnected: ${reason}`)
        })
    })
}
