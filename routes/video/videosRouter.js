const express = require('express')
const router = express.Router()
const videosController = require('../../controller/videos/videosController')
const videoValidator = require('../../middleware/validator/videoValidator')
const { verifyToken } = require('../../utils/jwt')
router
    .get('/', videosController.list)
    .get('/getvod', videosController.getvod)
    .post(
            '/createvideo',
            verifyToken,
            videoValidator.createvideo,
            videosController.createvideo
    )

module.exports = router