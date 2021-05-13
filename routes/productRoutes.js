const express = require('express');
const router = express.Router();
const path = require('path');

const productController = require('../controllers/productsController');
// Traigo el Middleware de multer
const upload = require('../middlewares/multerProductsMiddleware')





router.get('/', productController.show1);
router.get('/create', productController.create);
router.get('/cart', productController.cart);
router.get('/:id', productController.show);
router.get('/search', productController.search);
router.get('/:id/edit', productController.edit);

router.post('/create', upload.single('imagen'), productController.store);
router.put('/:id', upload.single('imagen'), productController.update);

router.delete('/:id', productController.destroy);

module.exports = router;

