const error = require("../../../utils/error");
const {DateTime} = require("luxon");

module.exports = async (schedule, schedules) => {
    const start = schedule.start;
    let total = schedule.end.diff(schedule.start,'minutes').toObject().minutes;
    for(let i in schedules) {
        const anotherSchedule = schedules[i];
        const anotherScheduleStart = DateTime.fromJSDate(anotherSchedule.start);
        const anotherScheduleEnd = DateTime.fromJSDate(anotherSchedule.end);
        if (anotherSchedule.userId.toString() !== schedule.userId.toString()) {
            continue;
        }

        if(anotherSchedule._id.toString() === schedule.id){
            continue;
        }

        if (start.hasSame(anotherScheduleStart, 'day') || start.hasSame(anotherScheduleEnd, 'day')) {
            total = total + anotherScheduleEnd.diff(anotherScheduleStart,'minutes').toObject().minutes;
        }
    }

    if(total > 60){
        const ajustDiff = total-60
        schedule.end = schedule.end.minus({minutes:ajustDiff});
        total = total - ajustDiff;
    }

    if(total > 60 || schedule.end.diff(start,'minutes').toObject().minutes < 30){
        throw  await error([{msg: "O tempo total de seus agendamentos não pode ultrapassar 1 hora por dia."}]);
    }
};