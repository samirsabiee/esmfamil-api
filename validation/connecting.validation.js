const Joi = require('joi')
const connectedUser = Joi.object().keys({
    id: Joi.string().required().label('ID'),
    username: Joi.string().required().label('username'),
    socketId: Joi.string().required().label('socketId'),
    namespace: Joi.string().required().label('namespace'),
    ip: Joi.string().required().label('IP')
}).unknown(true)
module.exports = connectedUser