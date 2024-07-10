const jwt = require('jsonwebtoken');
const config = require('config');
const role = require('../utils/enums/role');
const findLaboratoryById = require('../services/laboratory/business/findLaboratoryById');
const User = require('../services/user/model/User');
const error = require("../utils/error");

module.exports = {
    tokenValidate: async (token)=> {
        try {
            if (!token) {
                throw {
                    messageType:'ERROR_MESSAGE',
                    message: 'Token inválido'
                }
            }

            const decodedToken = await jwt.verify(token, config.get('jwtSecret'));

            let entity;

            switch (decodedToken.role) {
                case role.LOCAL_SERVER:
                    entity = await findLaboratoryById(decodedToken.laboratory.id);
                    break;
                case role.DEVICE:
                    entity = await findLaboratoryById(decodedToken.laboratory.id);
                    break;
                case role.CAMERA:
                    entity = await findLaboratoryById(decodedToken.laboratory.id);
                    break;
                case role.USER:
                    entity = await User.findById(decodedToken.user.id);
                    break;

            }

            if (!entity.active) {
                throw await error([{msg: 'Conta desativada.'}]);
            }

            return decodedToken;
        }catch(e){
            throw e;
        };
    }
};