const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/multerUserMiddleware')


router.get('/login', userController.show);

router.post('/login', /*upload.single('imagen'),*/ userController.store);

router.get('/register', userController.showRegister);

router.get('/users/edit/:id', userController.editUserScreen);




module.exports = router;