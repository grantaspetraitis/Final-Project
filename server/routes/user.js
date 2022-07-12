const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const user = require('../controllers/user');

router.post('/register', auth.createUser);
router.get('/questions', user.getQuestions);
router.post('/questions', user.addQuestion);
router.get('/questions/:id', user.getQuestion);
router.patch('/questions/:id', user.editQuestion);
router.get('/profile', user.getProfile);
router.post('/login', auth.loginUser);

module.exports = router;