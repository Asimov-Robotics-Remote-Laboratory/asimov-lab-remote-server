const {DateTime} = require("luxon");
const listUserSchedulesByLaboratoryId = require("./listUserSchedulesByLaboratoryId");

module.exports = async (user, laboratoryId) =>{
    const now = DateTime.now();
    const userSchedules = await listUserSchedulesByLaboratoryId(user.id, laboratoryId);
    for(let i in userSchedules){
        const userSchedule = userSchedules[i];
        const start = userSchedule.start;
        const end = userSchedule.end;
        if(now >= start && now < end){
            return  userSchedule;
        }
    }
    return null;
}