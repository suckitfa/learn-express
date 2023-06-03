const {body} = require('express-validator')
const validate = require('./errorBack')

const register = validate([
    body('username').notEmpty().withMessage('用户名不能为空').isLength({min: 6}).withMessage('用户名长度不能小于6位'),
    body('password').notEmpty().withMessage('密码不能为空').isLength({min: 6}).withMessage('密码长度不能小于6位'),
    body('email').notEmpty().withMessage('邮箱不能为空').isEmail().withMessage('邮箱格式不正确'),
])

module.exports = {
    register
}