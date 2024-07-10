const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const config = require('config');
const Laboratory = require('../model/Laboratory');
const error = require('../../../utils/error');
const role = require('../../../utils/enums/role');

const lab_roles = [
    role.LOCAL_SERVER,
    role.DEVICE,
    role.CAMERA
]

module.exports = async (data) => {
    let laboratory = await Laboratory.findOne({_id: data.laboratoryId});
    
    if (!laboratory) {
        throw await error([{msg: 'Laboratório não encontrado.'}]);
    }

    if (!laboratory.active) {
        throw await error([{msg: 'Laboratório desativado.'}]);
    }

    if(!lab_roles.includes(data.role)){
        throw await error([{msg: 'Papel inválido'}]);
    }

    const decryptedBDPassword = await cryptoJS.AES.decrypt(laboratory.password, config.get('cryptoJSSecret')).toString(cryptoJS.enc.Utf8);

    if (decryptedBDPassword !== data.password) {
        throw await error([{msg: 'Senha inválida.'}]);
    }

    const payload = {
        role: data.role,
        laboratory: {
            id: laboratory._id
        }
    };

    const options = {
        //  expiresIn: 86400
    };

    const token = await jwt.sign(payload, config.get('jwtSecret'), options);

    const credentials = {
        token: token,
        laboratory: {
            id: laboratory._id,
            role:data.role
        }
    };

    return credentials;
};