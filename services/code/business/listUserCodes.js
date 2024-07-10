const Code = require('../model/Code');

module.exports = async (userId) => {
    const codes = await Code
        .find({active:true, userId:userId})
        .sort({
            date: 'asc'
        });
    return codes;
};