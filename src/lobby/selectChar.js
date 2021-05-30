const {rooms, addGameRoom, getGameRoomName} = require('./rooms.lobby')
const {v4: uuidV4} = require('uuid');
module.exports = async (playIo, socket) => {
    if (playIo.adapter.rooms.get(rooms.GAME_WAITING).size > 1) {
        socket.leave(rooms.GAME_WAITING)
        const sockets = await playIo.in(rooms.GAME_WAITING).fetchSockets()
        sockets[0].leave(rooms.GAME_WAITING)
        const gameInfo = createGameRoomInfo(sockets[0], socket)
        socket.join(gameInfo.gameRoomName)
        sockets[0].join(gameInfo.gameRoomName)
        playIo.to(gameInfo.gameRoomName).emit('selectChar', gameInfoTemplate(gameInfo))
        clearInterval(socket.timeWaitingId)
        clearInterval(sockets[0].timeWaitingId)
        return true
    } else {
        return false
    }
}

function createGameRoomInfo(socket1, socket2) {
    let players = [], roomName = uuidV4(),
        chooserPlayer = require('./charChooser')(socket1, socket2)
    players.push({id: socket1.user.getId(), username: socket1.user.getUsername()})
    players.push({id: socket2.user.getId(), username: socket2.user.getUsername()})
    return addGameRoom(players, roomName, chooserPlayer)
}

function gameInfoTemplate(gameInfo) {
    return {
        players: gameInfo.players,
        gameRoomName: gameInfo.gameRoomName,
        charChoosers: gameInfo.charChoosers
    }
}