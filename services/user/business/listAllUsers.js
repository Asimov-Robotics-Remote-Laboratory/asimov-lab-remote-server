const User = require('../model/User');
const Laboratory = require("../../laboratory/model/Laboratory");

module.exports = async (page, quantityPerPage) => {
    const users = await User
        .find()
        .limit(quantityPerPage)
        .skip(quantityPerPage * (page - 1))
        .select('-password')
        .sort({
            date: 'asc'
        });

    const totalItems = await User.countDocuments();

    const data= {
        users:users,
        totalItems: totalItems
    }

    return data;
};