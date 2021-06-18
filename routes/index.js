const express = require('express');

const router = express.Router();

const UserController = require('../controller/user');

router.post('/user', UserController.createUser);

module.exports = router;