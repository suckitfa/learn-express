// 数据库交互
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    emamil: {
        type: String,
        required: true,
    },
    passsord: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default:null,
    },
    createTime: {
        type: Date,
        required: Date.now,
    },
    updateTime: {
        type: Date,
        required: Date.now,
    }
})

module.exports = mongoose.model('user', userSchema)