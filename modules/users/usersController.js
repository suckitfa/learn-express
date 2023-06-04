// 处理业务逻辑
const usersModel = require('./usersModel')
const md5 = require('../../utils/md5')
const fs = require('fs')
const promisify = require('util').promisify
const rename = promisify(fs.rename)
// const jwt  = require('jsonwebtoken')
const { createToken } = require('../../utils/jwt')
const list = async (req, res) => {
    const dbBack = await usersModel.find()
    const data = {
        rows: dbBack.map(item => {
            return {
                ...item._doc,
                password: null
            }
        }),
        total: dbBack.length
    }
    res.json({
        code: 200,
        data,
        sucess: true
    })
}

const deleteUser = async (req, res) => {
    res.send("delete user")
}

const registerUser = async (req, res) => {
    try {
        const newUser = new usersModel(req.body)
        const dbBack = await newUser.save().catch(err => {
            res.json({ code: 500, data: err, sucess: false })
        })
        res.json({ code: 200, data: dbBack, sucess: true })
    } catch (err) {
        res.json({ code: 500, data: err, sucess: false })
    }
}

const login = async (req, res) => {
    // 1. 客户端数据验证
    // 2. 数据库查询
    // 3. 返回数据
    const { email, password } = req.body
    const encryptPassword = md5(password)
    const user = await usersModel.findOne({ email })
    const userData = JSON.parse(JSON.stringify(user))
    // 前面经过 validator 验证，这里不会为空
    if (userData.password !== encryptPassword || userData.email !== email) {
        res.json({ code: 500, message: "密码或者邮箱错误", data: null, sucess: false })
    }
    const token = await createToken(userData)
    // res.json('测试中')
    res.json({ code: 200, message: "登录成功", data: { ...userData, accessToken: token }, sucess: true })
}

// 更新用户信息
const updateUser = async (req, res) => {
    const newUserInfo = req.body // 更新的数据
    const userInfo = req.user // 从jwt中解析出来的用户信息
    // You should set the new option to true to return the document after update was applied.
    // new：true 返回更新后的数据
    const dbBack = await usersModel.findByIdAndUpdate(userInfo._id, newUserInfo, { new: true })
    res.json({ code: 200, data: dbBack, sucess: true })
}

const getUserByEmail = async (req, res) => {
    const dbBack = await usersModel.findOne({ email: req.params.email })
    res.json({ code: 200, data: dbBack, sucess: true })
}

const headImg = async (req, res) => {
    const userInfo = req.user
    const fileInfo = req.file
    const newFileName = fileInfo.filename + '.' + fileInfo.originalname.split('.')[1]
    try {
        const dbBack = await usersModel.findByIdAndUpdate(userInfo._id, { image: newFileName }, { new: true })
    } catch (error) {
        res.status(500).json({ error })
    }
    try {
        await rename(
            './' + fileInfo.destination + fileInfo.filename,
            './' + fileInfo.destination + newFileName,
        )
        res.status(201).json({ filepath: newFileName })
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = {
    list,
    deleteUser,
    registerUser,
    login,
    updateUser,
    getUserByEmail,
    headImg
}