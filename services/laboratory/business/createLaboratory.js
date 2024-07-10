const Laboratory = require('../model/Laboratory');
const error = require('../../../utils/error');
const cryptoJS = require('crypto-js');
const config = require('config');

module.exports = async (data) => {
    let exists = await Laboratory.exists({
        name: data.name,
        active: true
    });

    if (exists) {
        throw await error([{msg: 'Já existe um laboratório cadastrado com este nome.'}]);
    }

    const laboratory = new Laboratory(data);

    laboratory.orderLab = await Laboratory.countDocuments();

    const password = Math.random().toString(36).slice(-10);
    laboratory.password = await cryptoJS.AES.encrypt(password, config.get('cryptoJSSecret'));
    
    laboratory.save();
};
