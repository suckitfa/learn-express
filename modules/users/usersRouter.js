const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator')
const {list,deleteUser,registerUser,login} = require("./usersController")
const validator = require('../../middleware/validator/userValidator')

router
    .get('/', list)
    .delete('/',deleteUser)
    .post(
        '/register',
        // 加载中间件
        validator.register,
        // 错误处理中间件
        (req,res,next) => {
            const errors = validationResult(req)
            console.log('errors = ',errors)
            if(!errors.isEmpty()){
                res.json({
                    code: 500,
                    data: errors.array(),
                    success: false
                })
            }
            next()
        },
        registerUser)
    .post('/login',validator.login,login)

module.exports = router;