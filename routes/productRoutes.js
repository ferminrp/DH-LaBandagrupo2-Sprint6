const express = require('express');
const router = express.Router();
const path = require('path');

const productController = require('../controllers/productsController');

/*--Multer--*/
const multer = require('multer');
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });




router.get('/', productController.show1);
router.get('/create', productController.create);
router.get('/cart', productController.cart);
router.get('/:id', productController.show);
router.get('/search', productController.search);
router.get('/:id/edit', productController.edit);

router.post('/store', upload.single('image'), productController.store);
router.put('/:id', upload.single('image'), productController.update);

router.delete('/:id', productController.destroy);

module.exports = router;

