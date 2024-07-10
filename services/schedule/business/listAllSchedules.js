const Schedule = require('../model/Schedule');

module.exports = async () => {
    return Schedule
        .find({active: true})
        .sort({start:'asc'});
};