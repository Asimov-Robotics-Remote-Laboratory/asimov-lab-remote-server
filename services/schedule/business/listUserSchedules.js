const Schedule = require('../model/Schedule');

module.exports = async (userId) => {
    return Schedule
        .find({active: true, userId: userId})
        .sort({start:'asc'});
};