const { Video } = require('../../model')
const list = async (req,res) => {
    const {pageSize = 10,pageNum  = 1} = req.query
    const total = await Video.countDocuments() // 获取文档总数
    const data = await Video.find()
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .populate('user')
        .catch(err => {
        console.log('err = ',err)
        res.json({
            code: 500,
            error:err
        })
    })
    res.json({
        code: 200,
        data: {
            rows:[...data],
            total
        }
    })
}

const getvod = async (req,res) => {
    res.json({
        message: 'getvod',
    })
}

const createvideo = async (req,res) => {
    const newVideo = new Video({
        ...req.body,
        user: req.user._id
    })
    await newVideo.save().catch(err => {
        res.status(500).json({
            message: 'createvideo error',
            error: err
        })
    })
    res.json({
        message: 'createvideo',
        video: {
            ...req.body
        }
    })
}
module.exports = {
    list,
    getvod,
    createvideo
}