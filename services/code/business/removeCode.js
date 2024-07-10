const Code = require('../model/Code');

module.exports = async (id) => {
   await Code.findOneAndDelete({ _id: id })
};