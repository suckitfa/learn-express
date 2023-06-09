const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator')
const validator = require('../../middleware/validator/userValidator')
const {verifyToken} = require('../../utils/jwt')
const {list,deleteUser,registerUser,login,updateUser,unSubscribeUser,headImg,subscribeUser} = require("../../controller/users/usersController")
const multer = require('multer')
const upload = multer({dest: 'public/'})
router
    .get('/subscribe/:userId',verifyToken(),subscribeUser)
    .get('/unsubscribe/:userId',verifyToken(),unSubscribeUser)
    .put('/',verifyToken(),validator.update,updateUser)
    .post('/headimg',verifyToken(),upload.single('headimg'),headImg)
    .get('/', list)
    .delete('/',verifyToken(),deleteUser)
    .post(
        '/register',
        // 加载中间件
        validator.register,
        // 错误处理中间件
        (req,res,next) => {
            const errors = validationResult(req)
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