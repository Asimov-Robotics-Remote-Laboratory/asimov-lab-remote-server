const Laboratory = require('../model/Laboratory');
const error = require("../../../utils/error");

module.exports = async (data) => {
    //await Laboratory.findOneAndUpdate({active:true, _id: data._id}, data);
    let laboratory = await Laboratory.findById(data._id).select();

    if (!laboratory) {
        throw await error([{msg: 'Laboratório não encontrado!'}]);
    }

    if(laboratory.name !== data.name){
        laboratory.name = data.name;
    }

    if(laboratory.description !== data.description){
        laboratory.description = data.description;
    }

    if(laboratory.orderLab !== data.orderLab){
        laboratory.orderLab = data.orderLab;
    }

    if(laboratory.imageLink !== data.imageLink){
        laboratory.imageLink = data.imageLink;
    }

    if(laboratory.defaultCode !== data.defaultCode){
        laboratory.defaultCode = data.defaultCode;
    }

    return await laboratory.save();
};