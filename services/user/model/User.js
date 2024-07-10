const mongoose = require('mongoose');
const role = require('../enums/role');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        required: true,
        default: role.USER,
        enum: Object.values(role)
    },
    forcePasswordChange:{
        type: Boolean,
        required: true,
        default: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = User = mongoose.model('user', schema);