// 处理业务逻辑
const list = async (req,res) => {
    const data =  [
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

const deleteUser = async (req,res) => {
    res.send("delete user")
}

const registerUser = async (req,res) => {
    console.log('body = ',req.body)
    res.send("register user")
}
module.exports = {
    list,
    deleteUser,
    registerUser
}