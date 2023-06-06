const { default: mongoose } = require('mongoose')
const baseModel = require('../base/baseModel')

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    vodvideoId: {
        type: String,
        required: true,
    },
    user: {
        type:mongoose.ObjectId,
        required: true,
        // 引用
        ref: 'user'
    },
    ...baseModel
})
module.exports = videoSchema