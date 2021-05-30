module.exports.buildPlayer = async (socket, validator) => {
    try {
        const player = {
            id: socket.handshake.auth.user.id.toString(),
            username: socket.handshake.auth.user.username,
            socketId: socket.id
        }
        await validator.validateAsync(player)
        return Object.freeze({
            getId: () => player.id,
            getUsername: () => player.username,
            getSocketId: () => player.socketId
        })
    } catch (e) {
        throw e
    }
}