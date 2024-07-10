const User = require('../model/User');
const config = require('config');
const cryptoJS = require('crypto-js');
const error = require('../../../utils/error');
const sendEmail = require('../../../utils/sendEmail');
const emailUtils = require('../../../utils/emailUtils');

module.exports = async (data) => {
    const user = await User.findOne({email:data.email});

    if (!user) {
        throw  await error([{msg: 'Usuário não encontrado.'}]);
    }

    const password = await Math.random().toString(36).slice(-10);
    user.password = await cryptoJS.AES.encrypt(password, config.get('cryptoJSSecret'));
    user.forcePasswordChange = true;
    await user.save();

    const template = await emailUtils.getTemplate('./resources/email-template/index.html');
    const content = await emailUtils.setValues(template,{
        subtitle:'Olá '+user.name+'!',
        message:'Sua senha provisória é: '+password}
    );
    await sendEmail(user.email, "Senha provisória", content);
};