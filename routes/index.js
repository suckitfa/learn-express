var express = require('express');
var router = express.Router();

var usersRouter = require('../modules/users/usersRouter');
var videosRouter = require('../modules/videos/videosRouter');
// const postRouter = require("./posts");
// const videoRouter = require("./videos");

router.use('/users', usersRouter);
// router.use("/posts",postRouter);
router.use('/videos',videosRouter);

module.exports = router;
