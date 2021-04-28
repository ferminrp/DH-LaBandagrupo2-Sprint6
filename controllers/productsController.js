


let productController = {
    
    
    //Muestra el Formulario de creacion de producto
    create: (req, res) => {
        console.log('Entre a create')
        res.render('productos/createProduct');
    }
}

module.exports = productController;