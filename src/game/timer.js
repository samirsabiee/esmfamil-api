module.exports = (io, gameRoomName, seconds) => {
    let clearId = setInterval(() => {
        seconds--
        if (seconds >= 0) {
            io.to(gameRoomName).emit('timer', seconds)
        } else {
            clearInterval(clearId)
            io.to(gameRoomName).emit('timesUp', 0)
        }
    }, 1000)
}