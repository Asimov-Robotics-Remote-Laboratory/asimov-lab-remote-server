const Code = require('../model/Code');

module.exports = async (data, userId) => {
    const file = await Code.findOneAndUpdate({active:true, userId:userId, _id: data._id}, data);
    return file;
};