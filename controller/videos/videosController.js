
const list = async (req,res) => {
    res.json({message: 'list',data:[{id:1,name:'video1'},{id:2,name:'video2'}]})
}

const getvod = async (req,res) => {
    res.json({
        message: 'getvod',
    })
}

const createvideo = async (req,res) => {
    const videoInfo = req.body
    res.json({
        message: 'createvideo',
        video: {
            ...videoInfo
        }
    })
}
module.exports = {
    list,
    getvod,
    createvideo
}