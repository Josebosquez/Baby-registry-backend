var express = require('express');
const { createUser } = require('./controller/UserController');
const bcrypt = require('bcryptjs')
var router = express.Router();

/* GET users listing. */
router.post('/createUser', createUser);

module.exports = router;

