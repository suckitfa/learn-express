const express = require('express')
const router = express.Router()
const videosController = require('../../controller/videos/videosController')
router
    .get('/', videosController.list)
    .get('/getvod', videosController.getvod)
    .post('/createvideo', videosController.createvideo)

module.exports = router