const Laboratory = require('../model/Laboratory');

module.exports = async (page, quantityPerPage) => {
    const laboratories = await Laboratory
        .find({active:true})
        .limit(quantityPerPage)
        .skip(quantityPerPage * (page - 1))
        .sort({
            orderLab: 'asc'
        });
    return laboratories;
};