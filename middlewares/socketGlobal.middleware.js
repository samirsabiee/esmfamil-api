const connectedUserValidator = require('../validation/connecting.validation')
const player = require('../src/player')
const lobby = require('../src/lobby')
module.exports = async (socket, next) => {
    socket.user = await player.buildPlayer(socket, connectedUserValidator)
    lobby.addOnlinePlayer(socket.user)
    next()
}