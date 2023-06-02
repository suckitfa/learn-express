// 处理业务逻辑
const list = async (req,res) => {
    const data =  [
        {
            id: 1,
            name: "zhangsan"
        }
    ]

    res.json({
        code: 200,
        data,
        sucess: true
    })
}

module.exports = {
    list,
}