const express = require('express');
const router = express.Router();

const habitController = require('../controllers/habit_controller');

router.post('/create',habitController.create);
router.get('/destroy/:id',habitController.destroy);

module.exports = router;