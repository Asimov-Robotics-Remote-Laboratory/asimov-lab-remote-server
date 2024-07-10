const Laboratory = require('../model/Laboratory');

module.exports = async (id) => {
   await Laboratory.findOneAndDelete({ _id: id });
};