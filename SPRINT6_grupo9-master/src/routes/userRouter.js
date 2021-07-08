const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
// const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware')

router.get('/register', guestMiddleware, userController.register);

router.post('/register',  uploadFile.single("avatar"), validations, userController.processRegister);

router.get('/billing', userController.billing);

router.get('/login', guestMiddleware, userController.login);

router.post('/login', validations,userController.loginProcess);

router.get('/productCart', userController.cart);

router.get('/productDetail', userController.detail);

router.get('/profile/edit/:id', userController.profileEdit)
router.post('/profile/edit/:id', uploadFile.single("avatar"), validations, userController.updateProfile)
router.get('/profile', authMiddleware, userController.profile);


router.get('/logout', userController.logout);

module.exports = router;