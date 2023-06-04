const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const tojwt = promisify(jwt.sign)
const verify = promisify(jwt.verify)
const tokenEncrypKey = require('../config').tokenEncrypKey

const createToken = async userInfo => await tojwt(userInfo, tokenEncrypKey, { expiresIn: '1h' })

// const testToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWxGbGFnIjpmYWxzZSwiY29udmVyIjpudWxsLCJjaGFubmVsZGVzIjpudWxsLCJfaWQiOiI2NDdiMDM5MTRhOWI5NTM4ZDg5NGNiYjUiLCJ1c2VybmFtZSI6Ium-meS4vSIsImVtYWlsIjoiaS5jbXd1c3VAcXEuY29tIiwicGFzc3dvcmQiOiJhZGJkNTkwY2MwNmRkY2M5ODQxYWVjZjVjN2VhNjBhOCIsInBob25lIjoiMTMyNzA4NzIxMjgiLCJpbWFnZSI6Imh0dHA6Ly9kdW1teWltYWdlLmNvbS80MDB4NDAwIiwiY3JlYXRlVGltZSI6IjIwMjMtMDYtMDNUMDk6MTA6NDEuOTAyWiIsInVwZGF0ZVRpbWUiOiIyMDIzLTA2LTAzVDA5OjEwOjQxLjkwMloiLCJfX3YiOjAsImlhdCI6MTY4NTg2OTU2OSwiZXhwIjoxNjg1ODczMTY5fQ.fyJY8ScSLCxoUtiG70MSu-vPnYD0rmGMmf7zpgOuHlU`
// const testTokenParts = testToken.split('.')
// console.log("testTokenParts = ",testTokenParts)
// verify(testToekn, tokenEncrypKey)
//     .then(res => {
//         console.log('testResult =', res)
//     })
//     .catch(err => {
//         console.log('testErr = ', err)
//     })

// 封装成中间件，对接口进行鉴权
const verifyToken = async (req, res, next) => {
    const token = req.headers.accesstoken
    console.log('token = ', token)
    if (!token) {
        res.json({ code: 401, message: '没有权限', data: null, success: false })
    }
    try {
        // debugger
        let userInfo = await verify(token, tokenEncrypKey)
        req.user = userInfo
        next()
    } catch (err) {
        res
            .status(402)
            .json({ code: 402, message: 'token失效', data: null, success: false })
    }
}

module.exports = {
    createToken,
    verifyToken
}