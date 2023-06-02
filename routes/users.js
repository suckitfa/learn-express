var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // throw new Error('BROKEN'); // Express will catch this on its own.
  res.send('respond with a resource');
});

module.exports = router;
