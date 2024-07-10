const createSchedule = require('./createSchedule');
const removeSchedule = require('./removeSchedule');
const removeAllSchedule = require('./removeAllSchedule');
const updateSchedule = require('./updateSchedule');
const listAllSchedules= require('./listAllSchedules');
const listLaboratorySchedules= require('./listLaboratorySchedules');
const listUserSchedules= require('./listUserSchedules');
const listUserSchedulesByLaboratoryId = require('./listUserSchedulesByLaboratoryId');
module.exports = [
	createSchedule,
	removeSchedule,
	removeAllSchedule,
	updateSchedule,
	listAllSchedules,
	listLaboratorySchedules,
	listUserSchedules,
	listUserSchedulesByLaboratoryId
]