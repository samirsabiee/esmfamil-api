module.exports = users => {
    if (users !== undefined && Array.isArray(users)) {
        let roomName = '*'
        users.forEach(user => {
            roomName += user.id + '*'
        })
        return roomName
    } else return null
}