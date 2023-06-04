const {body} = require('express-validator')
const validate = require('./errorBack')
const User = require('../../modules/users/usersModel.js')
const register = validate([
    body('username').notEmpty().withMessage('用户名不能为空').isLength({min: 1}).withMessage('用户名长度不能小于1位'),
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

const login = validate([
    body('password')
        .notEmpty().withMessage('密码不能为空')
        .isLength({min: 3}).withMessage('密码长度不能小于3位'),
    body('email')
        .notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式不正确').bail()
        .custom(async email => {
            const user = await User.findOne({email})
            if(!user){
                return Promise.reject('邮箱不存在')
            }
        }),
])

const update = validate([
    body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail()
    .custom(async email => {
        const emailValidate = await User.findOne({email})
        if(emailValidate){
            return Promise.reject('邮箱已经存在')
        }
    }).bail(),
    body('username')
        .notEmpty().withMessage('用户名不能为空')
        .isLength({min: 1}).withMessage('用户名长度不能小于1位')
        .custom(async username => {
            const usernameValidate = await User.findOne({username})
            if(usernameValidate){
                return Promise.reject('用户名已经存在')
            }
        }),
    body('phone')
        .notEmpty().withMessage('手机号不能为空').bail()
        .isMobilePhone('zh-CN').withMessage('手机号格式不正确').bail()
        .custom(async phone => {
            const phoneValidate = await User.findOne({phone})
            if(phoneValidate){
                return Promise.reject('手机号已经存在')
            }
        })
])

module.exports = {
    register,
    login,
    update
}