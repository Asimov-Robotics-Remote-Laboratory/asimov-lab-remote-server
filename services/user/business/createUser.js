const User = require('../model/User');
const config = require('config');
const cryptoJS = require('crypto-js');
const error = require('../../../utils/error');
const sendEmail = require('../../../utils/sendEmail');

module.exports = async (data) => {
    let exists = await User.exists({email: data.email});

    if (exists) {
        throw  await error([{msg: 'E-mail já registrado.'}]);
    }

    user = new User(data);

    const cleanPassword = data.password;

    //Criptografando a senha
    user.password = await cryptoJS.AES.encrypt(data.password, config.get('cryptoJSSecret'));
    await user.save();
    await sendEmail(user.email, "Novo cadastro - Asimov Lab.", "Sua senha de acesso ao sistema Asimov Lab é "+cleanPassword);
};