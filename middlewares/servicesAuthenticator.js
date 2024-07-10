const jwt = require('jsonwebtoken');
const error = require('../utils/error');
const findUserById = require('../services/user/business/findUserById');
const config = require('config');
const User = require('../services/user/model/User');
const Laboratory = require('../services/laboratory/model/Laboratory');
const role = require('../utils/enums/role');

module.exports = async (request, response, next) => {
    const token = request.header('x-auth-token');
    try {
        if (!token) {
            throw await error([{msg: 'Token inválido.'}]);
        }
        const decodedToken = await jwt.verify(token, config.get('jwtSecret'));

        if(decodedToken.role == role.USER){
            const user = await User.findById(decodedToken.user.id);
            if (!user.active) {
                throw await error([{msg: 'Conta desativada.'}]);
            }
            request.user = user;
        }

        if(decodedToken.role == role.LOCAL_SERVER || decodedToken.role == role.DEVICE){
            const laboratory = await Laboratory.findById(decodedToken.laboratory.id);
            if (!user.active) {
                throw await error([{msg: 'Laboratório desativado.'}]);
            }
            request.laboratory = laboratory;
        }

        next();
    } catch (e) {
        response
            .status(400)
            .send(e)
    }
};