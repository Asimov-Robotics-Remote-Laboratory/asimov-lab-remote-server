const User = require('../model/User');
const error = require('../../../utils/error');

module.exports = async (id) => {
    await User.findOneAndDelete({ _id: id });
};