const baseModel = require('../base/baseModel');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribeSchema = new Schema({
    user: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    subscribe: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    ...baseModel
})

module.exports = subscribeSchema;