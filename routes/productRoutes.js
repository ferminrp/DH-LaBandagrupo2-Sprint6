const express = require('express');
const router = express.Router();
const path = require('path');

const productController = require('../controllers/productsController');




router.get('/', productController.show1);
router.get('/create', productController.create);
router.get('/cart', productController.cart);
router.get('/:id', productController.show);
router.get('/:id/edit', productController.edit);


//router.post('/store', productController.store);
//router.put('/:id', productController.update);

//router.delete('/:id', productController.destroy);


/* ESTO ES UN EJEMPLO HAY QUE CREAR LAS RUTAS

router.get('/', productController.list);
router.get('/search', productController.search);
*/

module.exports = router;

