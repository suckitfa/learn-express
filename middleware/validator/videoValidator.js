const {body} = require('express-validator')
const validate = require('./errorBack')
const {Video} = require('../../model/index')

const createvideo = validate([
    body('title')
        .notEmpty().withMessage('标题不能为空').bail()
        .isLength({min: 1}).withMessage('标题长度不能小于1位').bail(),
    body('vodvideoId').notEmpty().withMessage('视频vod不能为空').bail(),
    body('cover').notEmpty().withMessage('封面不能为空').bail(),
])

module.exports = {
    createvideo
}