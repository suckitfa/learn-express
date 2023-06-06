
const list = async (req,res) => {
    res.json({message: 'list',data:[{id:1,name:'video1'},{id:2,name:'video2'}]})
}

const getvod = async (req,res) => {
    res.json({
        message: 'getvod',
    })
}

const createvideo = async (req,res) => {
    res.json({
        message: 'createvideo',
    })
}
module.exports = {
    list,
    getvod,
    createvideo
}