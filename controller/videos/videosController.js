const { Video } = require('../../model')
const list = async (req,res) => {
    res.json({message: 'list',data:[{id:1,name:'video1'},{id:2,name:'video2'}]})
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