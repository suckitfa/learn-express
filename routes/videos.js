const express = require('express')
const router = express.Router()

router.get('/',async (req,res) =>{
    res.send('get videos')
})

module.exports = router