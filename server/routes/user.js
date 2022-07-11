const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const user = require('../controllers/user');

router.post('/register', auth.createUser);
router.get('/questions', user.getQuestions);

module.exports = router;