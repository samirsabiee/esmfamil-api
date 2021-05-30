const timer = require('./timer')
module.exports = (playIo, {gameRoomName, char}) => {
    playIo.to(gameRoomName).emit('startGame', char)
    timer(playIo, gameRoomName, 120)
}