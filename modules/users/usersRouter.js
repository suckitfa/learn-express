const express = require('express');
const router = express.Router();
const {list} = require("./usersController")

/* GET users listing. */
router.get('/', list);

router.get('/:id', async (req, res) => {
    const params = req.params
    res.send("get user by id" + params.id)
})


module.exports = router;