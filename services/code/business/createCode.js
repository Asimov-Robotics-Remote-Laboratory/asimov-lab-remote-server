const Code = require('../model/Code');
const error = require('../../../utils/error');
const cryptoJS = require('crypto-js');
const config = require('config');

module.exports = async (data, userId) => {
    let exists = await Code.exists({
        userId: userId,
        name: data.name,
        active: true
    });

    if (exists) {
        throw await error([{msg: 'Já existe um Código cadastrado com este nome.'}]);
    }
    let fileData = {
        userId: userId,
        content: data.content,
        laboratoryId: data.laboratoryId,
        name: data.name,
        active: true
    }

    const file = new Code(fileData);
    file.save();

    return file;
};
