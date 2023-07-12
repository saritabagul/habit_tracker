const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit_controller');

router.get('/',habitController.home);

router.use('/habit',require('./habit'));

module.exports = router;