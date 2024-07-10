const User = require('../model/User');
const config = require('config');
const cryptoJS = require('crypto-js');
const error = require('../../../utils/error');

module.exports = async (data, userId) => {
    const user = await User.findOne({_id:userId});

    if (!user) {
        throw  await error([{msg: 'Usuário não encontrado.'}]);
    }

    user.password = await cryptoJS.AES.encrypt(data.password, config.get('cryptoJSSecret'));
    user.forcePasswordChange = false;
    await user.save();
};