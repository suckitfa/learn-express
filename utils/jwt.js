const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const tojwt = promisify(jwt.sign)
const verify = promisify(jwt.verify)
const tokenEncrypKey = require('../config').tokenEncrypKey

const createToken = async userInfo => await tojwt(userInfo, tokenEncrypKey, { expiresIn: '1h' })


// 封装成中间件，对接口进行鉴权
const verifyToken = (required = true) => {
    return  async (req, res, next) => {
        const token = req.headers.accesstoken
        if (token) {
            try {
                let userInfo = await verify(token, tokenEncrypKey)
                req.user = userInfo
                next()
            } catch (err) {
                res
                    .status(402)
                    .json({ code: 402, message: 'token失效', data: null, success: false })
            }
        } else if(required){
            res.json({ code: 401, message: '请传入token', data: null, success: false })
        } else {
            // 意思是不用校验token，但是如果有token，就把用户信息挂载到req上
            next()
        }
    }
}

module.exports = {
    createToken,
    verifyToken
}