const mongoose = require('mongoose');
const config = require('../config');
const  main = async () => {
    await mongoose.connect(config.DBURL)
}

main()
.then(resp => {
    console.log('链接成功！')
})
.catch(err => {
    console.log('链接失败！')
})

