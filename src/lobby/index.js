let players = []

module.exports.addPlayer = player => {
    players.push(player)
}
module.exports.getPlayer = id => {
    return players.filter(player => player.getId() === id)
}
module.exports.getPlayers = () => players

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