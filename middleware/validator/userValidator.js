const {body} = require('express-validator')
const validate = require('./errorBack')
const User = require('../../modules/users/usersModel.js')
const register = validate([
    body('username').notEmpty().withMessage('用户名不能为空').isLength({min: 3}).withMessage('用户名长度不能小于6位'),
    body('password').notEmpty().withMessage('密码不能为空').isLength({min: 3}).withMessage('密码长度不能小于6位'),
    body('email')
        .notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式不正确').bail()
        .custom(async email => {
            const user = await User.findOne({email})
            if(user){
                return Promise.reject('邮箱已经存在')
            }
        }).bail(),
    
    body('phone')
        .notEmpty().withMessage('手机号不能为空').bail()
        .isMobilePhone('zh-CN').withMessage('手机号格式不正确').bail()
        .custom(async phone => {
            const user = await User.findOne({phone})
            if(user){
                return Promise.reject('手机号已经存在')
            }
        }).bail()
])

module.exports = {
    register
}