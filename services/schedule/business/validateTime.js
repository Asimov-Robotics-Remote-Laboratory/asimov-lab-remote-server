const error = require('../../../utils/error');

module.exports = async (schedule) => {
    const start = schedule.start;
    const end = schedule.end;
    const diff = end.diff(start,'minutes').toObject();
    if(diff.minutes > 60){
        throw  await error([{msg: "Não é possível alterar o tempo para mais de 60 minuto."}]);
    }
    if(diff.minutes < 30){
        throw  await error([{msg: "Não é possível alterar o tempo para menos de 30 minuto."}]);
    }
}


