let players = []
    , waitingPlayers = []
    , inGamePlayers = []
module.exports.addPlayer = player => {
    if (player.getNameSpace() === '/home') {
        players.push(player)
    } else if (player.getNameSpace() === '/play' && player.getStatus() === 'waiting') {
        waitingPlayers.push(player)
    } else {
        players.push(player)
    }
}
module.exports.getPlayer = id => {
    return players.filter(player => player.getId() === id)
}
module.exports.getPlayers = () => players
module.exports.getWaitingPlayers = () => waitingPlayers
module.exports.getPlayersIdsAndUsernames = () => {
    let playersInfo = []
    players.forEach(player => {
        playersInfo.push({
            id: player.getId(),
            username: player.getUsername()
        })
    })
    return playersInfo
}
module.exports.removePlayer = playerId => {
    players = players.filter(player => player.getId() !== playerId)
}

module.exports.removeWaitingPlayer = playerId => {
    waitingPlayers = waitingPlayers.filter(player => player.getId() !== playerId)
}
module.exports.getWaitingPlayer = id => {
    return waitingPlayers.filter(player => player.getId() === id)
}

module.exports.getSuitablePlayers = (waitingId, countOfPlayers) => {
    let suitablePlayers = []
    waitingPlayers.forEach(player => {
        console.log('====> ',waitingId,countOfPlayers,suitablePlayer(waitingId, player))
        if (suitablePlayer(waitingId, player)) {
            suitablePlayers.push(player)
            inGamePlayers.push(player)
            this.removeWaitingPlayer(player.getId())
            if (suitablePlayers.length === countOfPlayers) {
                let askedPlayer = this.getWaitingPlayer(waitingId)[0]
                this.removeWaitingPlayer(waitingId)
                suitablePlayers.push(askedPlayer)
                inGamePlayers.push(askedPlayer)
                return suitablePlayers
            }
        }
    })
    return suitablePlayers
}

function suitablePlayer(waitingId, player) {
    return waitingId !== player.getId()
}