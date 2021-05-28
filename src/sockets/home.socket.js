const lobby = require('../lobby')
module.exports = io => {
    io.of('/home').on('connection', socket => {
        console.log('home User Connected...')
        socket.on('getUsers', (data, resp) => {
            console.log(data)
            resp(lobby.getPlayersIdsAndUsernames())
        })
        socket.emit('message', {data: 'test'})
        socket.emit('saveUser', lobby.getPlayersIdsAndUsernames())
        socket.on('saveUser', data => {
            console.log('socket.on(saveUser => ', data)
        })
        socket.on('disconnect', reason => {
            lobby.removePlayer(socket.user.getId())
            console.log(`home ${socket.user.getUsername()} is disconnected: ${reason}`)
        })
    })
}