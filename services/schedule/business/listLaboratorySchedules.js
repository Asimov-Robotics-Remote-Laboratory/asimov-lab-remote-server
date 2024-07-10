const Schedule = require('../model/Schedule');

module.exports = async (laboratoryId) => {
    return Schedule
        .find({active: true, laboratoryId: laboratoryId})
        .sort({start:'asc'});
};