let onlinePlayers = []

module.exports.addOnlinePlayer = player => {
    onlinePlayers.push(player)
}
module.exports.getOnlinePlayer = id => {
    return onlinePlayers.filter(player => player.getId() === id)
}
module.exports.getOnlinePlayers = () => onlinePlayers
module.exports.getOnlinePlayersIdsAndUsernames = () => {
    let onlinePlayersInfo = []
    onlinePlayers.forEach(player => {
        onlinePlayersInfo.push({
            id: player.getId(),
            username: player.getUsername()
        })
    })
    return onlinePlayersInfo
}
module.exports.removeOnlinePlayer = playerId => {
    onlinePlayers = onlinePlayers.filter(player => player.getId() !== playerId)
}
