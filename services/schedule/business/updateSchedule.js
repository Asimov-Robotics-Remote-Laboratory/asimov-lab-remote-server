const Schedule = require('../model/Schedule');
const error = require("../../../utils/error");
const role = require("../../user/enums/role");
const validateTime = require('./validateTime');
const validateDate = require('./validateDate');
const validateConflict = require('./validateConflict');
const validateLimitOfSchedules = require('./validateLimitOfSchedules');
const listLaboratorySchedules = require('./listLaboratorySchedules');
const {DateTime} = require("luxon");

module.exports = async (user, data) => {
    let schedule = await Schedule.findById(data._id).select();

    if (!schedule) {
        throw await error([{msg: 'Agendamento não encontrado!'}]);
    }

    if (user.role === role.ADMINISTRATOR || user._id.toString() === schedule.userId.toString()) {
        if(data.time){
            delete data.time;
        }
        data.start = DateTime.fromISO(data.start);
        data.end = DateTime.fromISO(data.end);
        await validateTime(data);
        await validateDate(data);
        const schedules = await listLaboratorySchedules(schedule.laboratoryId);
        await validateLimitOfSchedules(data, schedules);
        await validateConflict(data ,schedules);

        schedule.start = data.start;
        schedule.end = data.end;

        return await schedule.save();
    }else{
        throw await error([{msg: 'Usuario não autorizado!'}]);
    }
};