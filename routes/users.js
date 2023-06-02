var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  // throw new Error('BROKEN'); // Express will catch this on its own.
  res.send('respond with a resource');
});

router.get('/:id',async (req,res) => {
  const params = req.params
  console.log('params = ',params)
  res.send("get user by id")
})

router.get('/name?:name',async (req,res) => {
  const query = req.query
  console.log('query = ',query)
  res.send("get user by name")
})

module.exports = router;
