let players = []

module.exports.addPlayer = player => {
    players.push(player)
}
module.exports.getPlayer = id => {
    return players.filter(player => player.getId() === id)
}
module.exports.getPlayers = () => players