const Schedule = require('../model/Schedule');

module.exports = async () => {
   return Schedule.remove();
};