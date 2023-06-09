const express = require('express')
const router = express.Router()
const videosController = require('../../controller/videos/videosController')
const videoValidator = require('../../middleware/validator/videoValidator')
const { verifyToken } = require('../../utils/jwt')
router
    .get('/',verifyToken(false),videosController.list)
    .post(
            '/createvideo',
            verifyToken(),
            videoValidator.createvideo,
            videosController.createvideo
    )
    .get('/video/:videoid', verifyToken(false) ,videosController.getvideo)

module.exports = router