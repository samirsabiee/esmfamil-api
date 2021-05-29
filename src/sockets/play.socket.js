const lobby = require('../lobby')
const {rooms} = require('../lobby/rooms.lobby')
module.exports = io => {
    /*
    * await io.of("/play").in(rooms.GAME_WAITING).fetchSockets() instance of sockets in play namespace and GAME_WAITING room
    * io.of("/play").adapter.rooms.get(rooms.GAME_WAITING).size number of sockets in play namespace and GAME_WAITING room
    * */

    io.of('/play').on('connection', async socket => {
        console.log('-------------------------------------------------------------')
        console.log('new player connected', socket.user.getUsername(), socket.user.getIp(), socket.user.getStatus())
        let timeWaitingId = require('../lobby/timeWaiting')(socket)
        socket.join(rooms.GAME_WAITING)
        await require('../lobby/selectChar')(io,socket)
        /* console.log('Not Waiting ', lobby.getPlayers())
         console.log('Waiting ', lobby.getWaitingPlayers())
         console.log('getPlayersIdsAndUsernames ', lobby.getPlayersIdsAndUsernames())
         let suitablePlayers = lobby.getSuitablePlayers(socket.user.getId(), 1)
         console.log('getSuitablePlayers ', suitablePlayers)
         require('../lobby/selectChar')(suitablePlayers, socket)
         console.log('Waiting2 ', lobby.getWaitingPlayers())*/
        console.log('-------------------------------------------------------------')
        socket.emit('connection', {data: lobby.getPlayersIdsAndUsernames()})
        socket.on('message', data => {
            console.log(data)
        })
        socket.on('disconnect', reason => {
            clearInterval(timeWaitingId)
            lobby.removePlayer(socket.user.getId())
            console.log(`play ${socket.user.getUsername()} is disconnected: ${reason}`)
        })
    })
}
