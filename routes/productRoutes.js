const express = require('express');
const router = express.Router();
const path = require('path');

const productController = require('../controllers/productsController');

router.get('/create', productController.create);
//router.post('/', productController.store);
//router.get('/:id/edit', productController.edit);
//router.put('/', productController.update);


/* ESTO ES UN EJEMPLO HAY QUE CREAR LAS RUTAS

router.get('/', productController.list);
router.get('/search', productController.search);

router.get('/:id', productController.detail);
router.delete('/:id', productController.destroy);
*/

module.exports = router;

