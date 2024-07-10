const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageLink: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    orderLab:{
        type: Number
    },
    lock:{
        type: Boolean,
        default: false
    },
    lockStart:{
        type: Date
    },
    lockEnd:{
        type: Date
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    defaultCode:{
        type: String
    }
});

module.exports = Laboratory = mongoose.model('laboratory', schema);