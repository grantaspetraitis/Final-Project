const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const user = require('../controllers/user');

router.post('/register', auth.createUser);
router.get('/questions', user.getQuestions);
router.post('/questions', user.addQuestion);
router.get('/questions/:id', user.getQuestion);
router.patch('/questions/:id', user.editQuestion);
router.delete('/questions/:id', user.adminDeletePost);
router.patch('/questions/:id', user.deleteQuestion);
router.get('/profile', user.getProfile);
router.post('/login', auth.loginUser);
router.post('/questions/:id/rate', user.rating);
router.post('/questions/:id/answers', user.addAnswer);
router.get('/questions/:id/answers', user.getAnswers);
router.patch('/questions/:id/answers/:id', user.editAnswer);
router.post('/questions/:id/rateanswer', user.answerRating);

module.exports = router;