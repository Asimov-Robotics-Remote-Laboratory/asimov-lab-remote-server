const error = require('../utils/error');
const role = require('../services/user/enums/role');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (request, response, next) => {
    try {
        const user = request.user;
        if (role.ADMINISTRATOR !== user.role) {
            throw await error([{msg: 'Acesso não autorizado.'}]);
        }
        next();
    } catch (e) {
        response
            .status(400)
            .send(e)
    }
};