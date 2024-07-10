const {DateTime} = require("luxon");
const error = require('../../../utils/error');

module.exports = async (schedule) => {
    const start = schedule.start;
    const now = DateTime.now();
    if(start < now){
        throw  await error([{msg: "Não é possível alterar para horário passado"}]);
    }

    if(!schedule.historic){
       return;
    }

    const historicStart = DateTime.fromISO(schedule.historic.start);
    const historicEnd = DateTime.fromISO(schedule.historic.end);

    if(now >= historicStart && now <= historicEnd ){
        throw  await error([{msg: "Não é possível alterar para a linha do tempo que já está ocorrendo"}]);
    }

    if(historicEnd <= now){
        throw  await error([{msg: "O agendamento já ocorreu, não é possível realizar a alteração"}]);
    }
}


