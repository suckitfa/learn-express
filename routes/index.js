var express = require('express');
var router = express.Router();

var usersRouter = require('./users');
const postRouter = require("./posts");
const videoRouter = require("./videos");

router.use('/users', usersRouter);
router.use("/posts",postRouter);
router.use('/videos',videoRouter);

module.exports = router;
