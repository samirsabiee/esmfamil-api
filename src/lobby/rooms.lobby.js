let gameRoomsInfo = []
module.exports.rooms = {
    GAME_WAITING: 'GAME_WAITING'
}
module.exports.addGameRoom = (playersIds, roomName) => {
    gameRoomsInfo.push({
        playersIds,
        gameRoomName: roomName
    })
}

module.exports.getGameRoomName = playerId => {
    return gameRoomsInfo.map(game => {
        const player = game.playersIds.filter(id => id === playerId)
        if (player !== []) return game.gameRoomName
    })[0]
}