var express = require('express');
const { createUser, login, logOut } = require('./controller/UserController');
const bcrypt = require('bcryptjs')
var router = express.Router();

/* GET users listing. */
router.post('/createUser', createUser);
router.post('/login', login);
router.get('/logOut', logOut)

module.exports = router;