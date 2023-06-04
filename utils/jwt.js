const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const tojwt = promisify(jwt.sign)
const verify = promisify(jwt.verify)
const tokenEncrypKey = require('../config').tokenEncrypKey

const createToken = async userInfo => await tojwt(userInfo, tokenEncrypKey, { expiresIn: '1h' })

// 封装成中间件，对接口进行鉴权
const verifyToken = async (req, res, next) => {
    // 头部默认是小写 accessToken => accesstoken
    const token = req.headers.accesstoken
    console.log('token = ', token)
    if (!token) {
        res.json({ code: 500, message: '请重新登入', data: null, success: false })
        return
    }
    const userInfo = await verify(token, tokenEncrypKey)
        .catch(err => {
            console.log('err = ', err)
            // res.json({ code: 500, message: '请重新登入', data: err, success: false })
        })
    console.log('userInfo = ', userInfo)
    next()
}

module.exports = {
    createToken,
    verifyToken
}