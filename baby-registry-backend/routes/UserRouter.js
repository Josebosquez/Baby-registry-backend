var express = require('express');
const { createUser, login } = require('./controller/UserController');
const bcrypt = require('bcryptjs')
var router = express.Router();

/* GET users listing. */
router.post('/createUser', createUser);
router.post('/login', login);

module.exports = router;