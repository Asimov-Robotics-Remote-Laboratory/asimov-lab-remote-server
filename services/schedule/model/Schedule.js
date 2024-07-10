const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    laboratoryId: {
        type: mongoose.Schema.Types.ObjectId
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = User = mongoose.model('schedule', schema);