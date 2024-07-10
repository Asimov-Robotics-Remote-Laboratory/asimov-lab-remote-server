const Schedule = require('../model/Schedule');

module.exports = async (userId, laboratoryId) => {
    return Schedule
        .find({active: true, userId: userId, laboratoryId: laboratoryId})
        .sort({start:'asc'});
};