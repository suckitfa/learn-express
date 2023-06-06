var express = require('express');
var router = express.Router();

var usersRouter = require('../controller/users/usersRouter');
var videosRouter = require('../controller/videos/videosRouter');
// const postRouter = require("./posts");
// const videoRouter = require("./videos");

router.use('/users', usersRouter);
// router.use("/posts",postRouter);
router.use('/videos',videosRouter);

module.exports = router;
