const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');


/*--Multer--*/
const multer = require('multer');
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images/usuarios'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });



router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});


module.exports = router;