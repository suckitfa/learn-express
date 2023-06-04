const {validationResult} = require('express-validator')
module.exports = validator => {
    return async (req,res,next) => {
        // parell processing all validator 同步执行所有的验证器
        await Promise.all(validator.map(validation => validation.run(req)))
        .catch(err => {
            res.json({code: 500, data: err, success: false})
        })
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({
                code: 500,
                data: errors.array(),
                success: false
            })
            return
        }
        next()
    }
}