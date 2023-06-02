const express = require('express');
const router = express.Router();
const {list,deleteUser,registerUser} = require("./usersController")

/* GET users listing. */
router
    .get('/', list)
    .delete('/',deleteUser)
    .post('/register',registerUser)

module.exports = router;