const Laboratory = require('../model/Laboratory');

module.exports = async () => {
    const laboratories = await Laboratory
        .find({active:true})
        .sort({
            orderLab: 'asc'
        });
    return laboratories;
};