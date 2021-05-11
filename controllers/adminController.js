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
        res.render('backoffice/admin', {products});
    }
};