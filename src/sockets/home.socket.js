const lobby = require('../lobby')
module.exports = homeIo => {
    homeIo.on('connection', socket => {
        console.log('home User Connected...')
        socket.on('getUsers', (data, resp) => {
            console.log(data)
            resp(lobby.getOnlinePlayersIdsAndUsernames())
        })
        socket.emit('message', {data: 'test'})
        socket.emit('saveUser', lobby.getOnlinePlayersIdsAndUsernames())
        socket.on('saveUser', data => {
            console.log('socket.on(saveUser => ', data)
        })
        socket.on('disconnect', reason => {
            lobby.removeOnlinePlayer(socket.user.getId())
            console.log(`home ${socket.user.getUsername()} is disconnected: ${reason}`)
        })
    })
}