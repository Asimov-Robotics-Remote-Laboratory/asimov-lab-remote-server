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

    if(userDate >= laboratory.lockStart && userDate <= laboratory.lockEnd && !userId.equals(laboratory.userId)){
        throw await error([{msg: 'Laboratório em uso'}]);
    }

    if(laboratory.lock && userId.equals(laboratory.userId)){
        throw await error([{msg: 'Você possui uma sessão aberta.'}]);
    };

    laboratory.lockStart = userDate;

    if(userDate > laboratory.lockEnd || !laboratory.lockEnd) {
        laboratory.lockEnd = new Date();
        laboratory.lockEnd.setTime(userDate.getTime() + 60*60000);
    }

    laboratory.userId = userId;
    laboratory.lock = true;
    laboratory.save();

    return laboratory;
};