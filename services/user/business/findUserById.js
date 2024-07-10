const User = require('../model/User');
const role = require('../enums/role');
const error = require('../../../utils/error');

module.exports = async (userReq, id) => {
    let user = await User.findById(id).select('-password');

    if (!user) {
        throw await error([{msg: 'Usuario não encontrado!'}]);
    }

    if (userReq.role !== role.ADMINISTRATOR && userReq.id !== id) {
        throw await error([{msg: 'Usuario não autorizado!'}]);
    }
    return user;
};