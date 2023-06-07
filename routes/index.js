var express = require('express');
var router = express.Router();

var usersRouter = require('./user/usersRouter');
var videosRouter = require('./video/videosRouter');

router.use('/users', usersRouter);
router.use('/videos',videosRouter);

module.exports = router;
