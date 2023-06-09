// 处理业务逻辑
const usersModel = require('../../model/index').User
const subscribeModel = require('../../model/index').Subscribe
const md5 = require('../../utils/md5')
const fs = require('fs')
const promisify = require('util').promisify
const rename = promisify(fs.rename)
const { createToken } = require('../../utils/jwt')
const _ = require('lodash')
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

const subscribeUser = async (req, res) => {
    const userId = req.user._id
    // 2. 被关注者id
    const channelId = req.params.userId
    if(userId === channelId){ 
        return res.status(400).json({code:400,message:"不能关注自己"})
    }
    // 查看当前用户是否在数据库中
    const user = await usersModel.findById(userId).catch(err => {
        return res.status(400).json({code:400,message:"用户不存在",err})
    })
    if(!user){
        return res.status(400).json({code:400,message:"用户不存在"})
    }
    // 查看被关注者是否在数据库中，校验被关注者是否存在
    const subscribes = await subscribeModel.findOne({user:userId,channel:channelId}).catch(err => {
        return res.status(400).json({code:400,message:"关注失败",err})
    })
    if(subscribes?.length > 0){
        return res.status(400).json({code:400,message:"已经关注"})
    }
    const newSubscribe = new subscribeModel({userId,channelId})
    const newRes = await newSubscribe.save().catch(err => {
        return res.status(400).json({code:400,message:"关注失败",err})
    })
    // 被关注者
    const channelUser = usersModel.findById(channelId)
    channelUser.channelCount += 1
    await channelUser.save().catch(err => {
        return res.status(400).json({code:400,message:"关注失败",err})
    })
    res.json({
        code: 200,
        message: "关注成功",
        user,
        data: {
            ...newSubscribe
        }
    })
}

const unSubscribeUser = async (req, res) => {
    // 1. 获取用户id jwt解析之后获取
    const userId = req.user._id
    // 2. 获取被关注者id 路径参数
    const channelId = req.params.userId
    if(userId === channelId){
        return res.status(400).json({code:400,message:"不能取消关注自己",})
    }
    // 3. 删除关注记录
    const dbBack = await subscribeModel.findOneAndDelete({user:userId,channel:channelId}).catch(err => {
        return res.json({code:400,message:"取消关注失败",err})
    })
    if(!dbBack){
        return res.status(400).json({code:400,message:"取消关注失败",dbBack})
    }
    // 4. 被关注者的关注数减一
    dbBack.channel.channelCount -= 1
    await dbBack.channel.save().catch(err => {
        return res.status(400).json({code:400,message:"取消关注失败",err})
    })
    // 5. 返回数据
    return res.json({
        code: 200,
        message:"取消关注成功",
        data: {...dbBack}
    })
}

// 获取订阅频道的信息
const getSubScribeInfo = async (req, res) => {
    const id = req.user._id
    const dbBack = await subscribeModel
                            .find({user:id})
                            .populate('user').catch(err => {
                                return res.json({code:400,message:"获取关注信息失败",err})
                            })
    if(!dbBack){
        return res.json({code:400,message:"获取关注信息失败",dbBack})
    }
    return res.json({
        code: 200,
        message: "获取关注信息成功",
        data: dbBack
    })
} 
module.exports = {
    list,
    deleteUser,
    registerUser,
    login,
    updateUser,
    getUserByEmail,
    headImg,
    subscribeUser,
    unSubscribeUser,
    getSubScribeInfo
}