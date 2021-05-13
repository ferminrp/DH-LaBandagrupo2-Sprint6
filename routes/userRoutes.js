const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/multerUserMiddleware')





router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});


module.exports = router;