module.exports = (io, seconds) => {
    let clearId = setInterval(() => {
        seconds--
        if (seconds >= 0) {
            io.emit('message', seconds)
        } else {
            clearInterval(clearId)
        }
    }, 1000)
}