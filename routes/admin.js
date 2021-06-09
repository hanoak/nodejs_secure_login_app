const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

router.get('/admin', isAuth, adminController.getIndex);


module.exports = router;