const { Video } = require('../../model')
const list = async (req,res) => {
    const data = await Video.find().catch(err => {
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
            total: data.length
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