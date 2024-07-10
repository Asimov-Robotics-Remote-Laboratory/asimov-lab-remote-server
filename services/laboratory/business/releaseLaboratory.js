const Laboratory = require('../model/Laboratory');
const error = require('../../../utils/error');
const cryptoJS = require('crypto-js');
const config = require('config');

module.exports = async (laboratoryId, userId) => {
    const laboratory = await Laboratory.findOne({_id: laboratoryId, active: true});

    if (!laboratory) {
        throw await error([{msg: 'Laboratório não encontrado'}]);
    }

    const userDate = new Date();

    if(laboratory.userId && !laboratory.userId.equals(userId)){
        throw await error([{msg: 'Laboratório em uso por outro usuário'}]);
    }

    laboratory.lockEnd = userDate;
    laboratory.lock = false;
    laboratory.userId = null;

    laboratory.save();
};