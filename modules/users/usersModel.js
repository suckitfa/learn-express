// 数据库交互
const mongoose = require('mongoose');
const db = require('../../db');
const md5 = require('../../utils/md5');
const baseModel = require('../../model/baseModel');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // 加密md5
        set: (val) => md5(val),
        select:false, // 查询时不显示
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    // 删除标记
    delFlag: {
        type: Boolean,
        default: false,
    },
    // 解构赋值
    ...baseModel
})

module.exports = mongoose.model('user', userSchema)