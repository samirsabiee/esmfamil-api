module.exports = (socket1, socket2) => {
    let num = Math.round(Math.random())
    return (num === 0) ?
        {id: socket1.user.getId(), username: socket1.user.getUsername()}
        :
        {id: socket2.user.getId(), username: socket2.user.getUsername()}
}