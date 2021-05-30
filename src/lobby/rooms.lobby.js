let gameRoomsInfo = []
module.exports.rooms = {
    GAME_WAITING: 'GAME_WAITING'
}
module.exports.addGameRoom = (players, roomName, chooserPlayer) => {
    let gameInfo = {
        players,
        gameRoomName: roomName,
        charChoosers: [chooserPlayer]
    }
    gameRoomsInfo.push(gameInfo)
    return gameInfo
}

module.exports.addPlayerIdCharChooser = (roomName, player) => {
    gameRoomsInfo.forEach(game => {
        if (game.gameRoomName === roomName) {
            game.charChoosers.push(player)
            return true
        }
        return false
    })
}

module.exports.getGameRoomName = playerId => {
    return gameRoomsInfo.map(game => {
        const player = game.players.filter(player => player.id === playerId)
        if (player !== []) return game.gameRoomName
    })[0]
}