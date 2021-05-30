const Joi = require('joi')
const connectedUser = Joi.object().keys({
    id: Joi.string().required().label('ID'),
    username: Joi.string().required().label('username')
}).unknown(true)
module.exports = connectedUser