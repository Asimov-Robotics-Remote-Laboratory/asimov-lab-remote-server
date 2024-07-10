const User = require('../model/User');
const Laboratory = require("../../laboratory/model/Laboratory");

module.exports = async (page, quantityPerPage, searchParam) => {
    const users = await User
        .find({
                $or: [
                    {
                        'name': {$regex: '.*' + searchParam + '.*'}
                    },
                    {
                        'email': {$regex: '.*' + searchParam + '.*'}
                    }
                ]
            }
        )
        .limit(quantityPerPage)
        .skip(quantityPerPage * (page - 1))
        .select('-password')
        .sort({
            date: 'asc'
        });
    const data= {
        users: users,
        totalItems: users.length
    }

    return data;
};