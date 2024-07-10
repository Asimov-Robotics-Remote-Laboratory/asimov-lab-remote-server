const Laboratory = require('../model/Laboratory');
const error = require('../../../utils/error');
const cryptoJS = require('crypto-js');
const config = require('config');

module.exports = async (id, token) => {
    const laboratory = await Laboratory.findOne({_id: id, active: true});

    if (!laboratory) {
        throw await error([{msg: 'Laboratório não encontrado não encontrado.'}]);
    }

    const decryptedPassword = await cryptoJS.AES.decrypt(laboratory.password, config.get('cryptoJSSecret'));
    laboratory.password = decryptedPassword.toString(cryptoJS.enc.Utf8);
    
    return laboratory;
};