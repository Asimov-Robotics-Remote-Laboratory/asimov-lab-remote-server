const Schedule = require('../model/Schedule');
const error = require('../../../utils/error');
const findLaboratoryById = require('../../laboratory/business/findLaboratoryById');
const validateTime = require('./validateTime');
const validateDate = require('./validateDate');
const validateConflict = require('./validateConflict');
const validateLimitOfSchedules = require('./validateLimitOfSchedules');
const listLaboratorySchedules = require('./listLaboratorySchedules');
const {DateTime} = require("luxon");

module.exports = async (user, data) => {
    try {
        if(data.time){
            delete data.time;
        }
        data.start = DateTime.fromISO(data.start);
        data.end = DateTime.fromISO(data.end);

        await validateTime(data);
        await validateDate(data);

        const laboratory = await findLaboratoryById(data.laboratoryId);
        const schedules = await listLaboratorySchedules(laboratory._id);

        await validateLimitOfSchedules(data, schedules);
        await validateConflict(data ,schedules);

        const schedule = new Schedule(data);
        schedule.userId = user.id;
        schedule.title = `${laboratory.name} - ${user.name}`;
        await schedule.save();
    }catch (e) {
        throw e;
    }
};
