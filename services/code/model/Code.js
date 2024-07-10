const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    laboratoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Laboratory',
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }} );

module.exports = Laboratory = mongoose.model('code', schema);