const express = require('express')
const router = express.Router()
const videosController = require('../../controller/videos/videosController')
const videoValidator = require('../../middleware/validator/videoValidator')
const { verifyToken } = require('../../utils/jwt')
router
    .get('/', videosController.list)
    .post(
            '/createvideo',
            verifyToken,
            videoValidator.createvideo,
            videosController.createvideo
    )
    .get('/video/:videoid', videosController.getvideo)

module.exports = router