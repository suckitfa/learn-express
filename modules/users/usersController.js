// 处理业务逻辑
const usersModel = require('./usersModel')
const list = async (req, res) => {
    const data = [
        {
            id: 1,
            name: "zhangsan"
        }
    ]

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
module.exports = {
    list,
    deleteUser,
    registerUser
}