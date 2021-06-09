const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { check, body } = require('express-validator');
const isAuth = require('../middleware/is-auth');

router.get('/', authController.getLogin);

router.post('/login', [
    body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
    body('password', 'Please enter a valid password')
    .isLength({min: 6})
    .isAlphanumeric()
    .trim()
],authController.postLogin);

router.post('/logout', isAuth, authController.postLogout);

module.exports = router;