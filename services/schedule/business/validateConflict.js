const {DateTime} = require("luxon");
const error = require('../../../utils/error');

module.exports = async (schedule, schedules) => {
    const start = schedule.start;
    const end = schedule.end
    for(let i in schedules){
        const anotherSchedule = schedules[i];
        const anotherScheduleStart = anotherSchedule.start;
        const anotherScheduleEnd = anotherSchedule.end;

        if(anotherSchedule._id.toString() === schedule.id){
            continue;
        }

        if(!start.hasSame(anotherScheduleStart, 'day') && !start.hasSame(anotherScheduleEnd, 'day')){
            continue;
        }

        if(start.equals(anotherScheduleStart) || end.equals(anotherScheduleEnd)){
            throw  await error([{msg: "Horário escolhido entra em conflito com horário já agendado"}]);
        }

        if(start < anotherScheduleEnd && start > anotherScheduleStart){
            throw  await error([{msg: "Horário escolhido entra em conflito com horário já agendado"}]);
        }

        if(end < anotherScheduleEnd && end > anotherScheduleStart){
            throw  await error([{msg: "Horário escolhido entra em conflito com horário já agendado"}]);
        }
    }
}


