module.exports = (socket) => {
    let counter = 0
    return setInterval(() => {
        counter++
        socket.emit('timeWaiting', counter)
    }, 1000)
}