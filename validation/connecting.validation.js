const Joi = require('joi')
const connectedUser = Joi.object().keys({
    id: Joi.string().required().label('ID'),
    username: Joi.string().required().label('username'),
    socketId: Joi.string().required().label('socketId'),
    ip: Joi.string().required().label('IP')
}).unknown(true)
module.exports = connectedUser