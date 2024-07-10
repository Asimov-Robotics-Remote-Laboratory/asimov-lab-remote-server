const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../model/User');
const role = require('../../../utils/enums/role');
const error = require('../../../utils/error');

module.exports = async (data) => {
    let user = await User.findOne({email: data.email});
    
    if (!user) {
        throw await error([{msg: 'Usuário não encontrado.'}]);
    }

    if (!user.active) {
        throw await error([{msg: 'Conta desativada.'}]);
    }
    
    const decryptedPassword = await cryptoJS.AES.decrypt(user.password, config.get('cryptoJSSecret')).toString(cryptoJS.enc.Utf8);       
    if (decryptedPassword !== data.password) {
        throw await error([{msg: 'Senha inválida.'}]);
    }

    const payload = {
        role: role.USER,
        user: {
            id: user.id,
            role:user.role
        }
    };

    const options = {
        //  expiresIn: 86400
    };

    const token = await jwt.sign(payload, config.get('jwtSecret'), options);

    const credentials = {
        token: token,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role:user.role,
            forcePasswordChange: user.forcePasswordChange
        }
    };

    return credentials;
};