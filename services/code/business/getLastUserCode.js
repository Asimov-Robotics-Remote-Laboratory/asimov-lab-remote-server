const Code = require('../model/Code');
const error = require('../../../utils/error');
const config = require('config');

module.exports = async (user, laboratoryId) => {
    const code = await Code.findOne({active: true, userId: user.id, laboratoryId: laboratoryId},{},{ sort: { 'updated_at' : -1 } });

    if (!code) {
        throw await error([{msg: 'Código não encontrado.'}]);
    }

    return code;
};