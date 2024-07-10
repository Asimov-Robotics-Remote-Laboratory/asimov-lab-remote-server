const Code = require('../model/Code');
const error = require('../../../utils/error');
const config = require('config');

module.exports = async (user, codeId) => {
    const code = await Code.findOne({_id: codeId, active: true, userId: user.id});

    if (!code) {
        throw await error([{msg: 'Código não encontrado.'}]);
    }

    return code;
};