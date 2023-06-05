const mongoose = require('mongoose');
const config = require('../config');
const  main = async () => {
    await mongoose.connect(config.DBURL)
}

// 链接数据库
main()
.then(resp => {
    console.log('链接成功！')
})
.catch(err => {
    console.log(err)
    console.log('链接失败！')
})

module.exports = mongoose;
