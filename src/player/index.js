module.exports.buildPlayer = async (socket, validator) => {
    try {
        const player = {
            id: socket.handshake.auth.user.id.toString(),
            username: socket.handshake.auth.user.username,
            socketId: socket.id,
            namespace: socket.nsp.name,
            ip: socket.handshake.address,
            validator
        }
        await validator.validateAsync(player)
        return Object.freeze({
            getId: () => player.id,
            getSocketId: () => player.socketId,
            getUsername: () => player.username,
            getNameSpace: () => player.namespace,
            getIp: () => player.ip
        })
    } catch (e) {
        throw e
    }
}