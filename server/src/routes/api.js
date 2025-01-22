const express = require('express');
const userRoute = require('./usersRoute');

const router = express.Router();

router.use('/user', userRoute);

module.exports = router;