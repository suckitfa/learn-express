// 处理业务逻辑
const usersModel = require('./usersModel')
const md5 = require('../../utils/md5')
const list = async (req, res) => {
    const dbBack = await usersModel.find()
    console.log('dbBack =', dbBack)
    const data =  {
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
    // const dbBack = await usersModel.deleteOne({ : req.params.id })
    console.log('req.params = ',req.params)
    console.log('req.query = ',req.query)
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
    const user = await usersModel.findOne({email})
    console.log('user lgoin....= ',user)
     // 前面经过 validator 验证，这里不会为空
     console.log(`email = ${email}, password = ${encryptPassword}`)
    if(!user){
        res.json({ code: 500, message: "密码错误", data:null,sucess: false })
    } else {
        res.json({ code: 200, message: "登录成功",
        data: {...user._doc,
        }, sucess: true })
    }
}
module.exports = {
    list,
    deleteUser,
    registerUser,
    login
}