const {rooms, addGameRoom, getGameRoomName} = require('./rooms.lobby')
const {v4: uuidV4} = require('uuid');
module.exports = async (io, socket) => {
    if (io.of("/play").adapter.rooms.get(rooms.GAME_WAITING).size > 1) {
        socket.leave(rooms.GAME_WAITING)
        const sockets = await io.of("/play").in(rooms.GAME_WAITING).fetchSockets()
        sockets[0].leave(rooms.GAME_WAITING)
        createGameRoomInfo(socket, sockets[0])
        let gameRoomName = getGameRoomName(socket.user.getId())
        socket.join(gameRoomName)
        sockets[0].join(gameRoomName)
        io.of('/play').to(gameRoomName).emit('selectChar', {data: 'select char data'})
    }
}

function createGameRoomInfo(socket1, socket2) {
    let playersId = [], roomName = uuidV4()
    playersId.push(socket1.user.getId())
    playersId.push(socket2.user.getId())
    addGameRoom(playersId, roomName)
}