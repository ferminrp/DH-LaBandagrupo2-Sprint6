// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');
// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('../data/products01');

module.exports = {
    admin: (req, res) => {
        res.redirect('/admin/products')
    },
    adminProducts: (req, res) => {
        const products = productModel.all();
        const productsAmount = products.length
        res.render('backoffice/admin', {
            products: products,
            productsAmount: productsAmount
        });
    }
};