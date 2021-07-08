const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middlewares
const upload = require('../middlewares/productMulterMiddleware');
const validations = require('../middlewares/validateEditMiddleware');
const validaciones = require('../middlewares/validateCreateProductMiddleware');


router.get('/', adminController.adminHome);

router.get('/stock', adminController.stock);
router.get('/stock', adminController.search);

router.get('/stock/edit/:id', adminController.edit);
router.put('/stock/edit/:id', upload.single('image'), validations, adminController.update);

router.get('/create', adminController.create);
router.post('/create', upload.single('image'), validaciones, adminController.add);


router.get('/stock/edit/delete/:id', adminController.delete); 
router.delete('/stock/edit/delete/:id', adminController.destroy); 




module.exports = router;