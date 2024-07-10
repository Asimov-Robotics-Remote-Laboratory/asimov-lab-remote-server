const User = require('../model/User');
const role = require('../enums/role');
const error = require('../../../utils/error');
const cryptoJS = require("crypto-js");
const config = require("config");

module.exports = async (userReq, data) => {
    let user = await User.findById(data._id).select();

    if (!user) {
        throw await error([{msg: 'Usuario não encontrado!'}]);
    }

    if (userReq.role == role.ADMINISTRATOR || userReq.id == data._id) {
        if (user.name != data.name) {
            user.name = data.name
        }

        if (user.email != data.email) {
            user.email = data.email
        }


        if (user.email != data.email) {
            user.email = data.email
        }

        if (userReq.role == role.ADMINISTRATOR) {
            if (user.role != data.role) {
                user.role = data.role
            }

            const decryptedPassword = await cryptoJS.AES.decrypt(user.password, config.get('cryptoJSSecret')).toString(cryptoJS.enc.Utf8);

            if (data.password && decryptedPassword != data.password) {
                user.password = await cryptoJS.AES.encrypt(data.password, config.get('cryptoJSSecret'));
            }
        }

        return user.save();
    }else{
        throw await error([{msg: 'Usuario não autorizado!'}]);
    }
};