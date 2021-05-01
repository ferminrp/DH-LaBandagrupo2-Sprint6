// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('../data/products01');

let productController = {

    home: (req, res) => {
        console.log('entro al home del produt controller y redirijo')

        res.redirect('/')

    },

    // Función que muestra el detalle del producto, cuando hacemos click en la foto
    show: (req, res) => {

        // Le delego al modelo la responsabilidad
        // que la busque por ID del registro seleccionado
        // es por ello que atrapo em parámetro id
        const product = productModel.find(req.params.id);
        console.log(product)
        if (product) {
            res.render('productos/detailProduct', {product});
        } else {
            res.render('not-found');
        }
    },

    // Función que muestra el formulario de crear Productos
    create: (req, res) => {
        console.log('Entre a create')
        res.render('productos/createProduct');
    },
    // Función que simula el almacenamiento, en este caso en array

    store: (req, res) => {
        const body = req.body;
        let products = productModel.readFile();
        const maxIdProduct = products.reduce((curr, next) => curr.id >= next.id ? curr : next);
        const newProduct = {
            id: maxIdProduct.id + 1,
            name: body.name,
            brand: body.brand,
            price: Number(body.price)
            // Completar resto de propiedades para que todos los productos queden iguales.
        }
        products.push(newProduct);
        const isCreated = productModel.writeFile(products);
        if (isCreated) 
            return res.redirect('/products/' + newProduct.id);
         // Luego lo podemos mandar a la pagin del nuevo producto // Si se cre'o, redirijo a listado (/products/)
        return res.send('Error inesperado al crear el producto'); // Si no se borró, muestro error inesperado
    },

    // FUnción que muestra el formulario de edición
    edit: (req, res) => { // Delego al modelo que busque el producto
        let product = productModel.find(req.params.id);

        console.log(product)
        if (product) {
            res.render('productos/editProduct', {product});
        } else {
            res.render('error404');
        }
    },

    // Función que realiza cambios en el producto seleccionado
    update: (req, res) => {
        console.log("Entré al update")
        // Armo la estructura del registro auxiliar (product)
  
        let  product = req.body;
      
 
        console.log(' soy la nueva: ' +req.body.image)
        console.log('soy la vieja '+ req.body.oldImage)
        product.id = req.params.id;

     
          product.image = req.file ? req.file.filename : req.body.oldImagen;
        
          if (req.body.image===undefined) {
            product.image = product.oldImage
        }
        
          console.log('.......MOSTRA LA IMAGEN.......')
        console.log(product.image)
        console.log(product)
       
       
      // Elimino de la estructura auxiliar, porque no existe en Json 
        delete product.oldImage;


        // Delego la responsabilidad al modelo que actualice
        productModel.update(product);
          

        res.redirect('/')
    },

    // Función que elimina del Array visitados ek producto seleccionado
    destroy: (req, res) => {
        console.log('entre destroy')
        productModel.delete(req.params.id);

        // Ahora se mostrará todo porque los productos los varga de un archivo
        res.redirect('/')
    },


    cart: (req, res) => {
        res.render('productos/carrito');
    },

    search: (req, res) => {

        let dataABuscar = req.query
        res.sed(dataABuscar)
    },

    show1: (req, res) => {

        const products = productModel.all();

        res.render('productos/listProduct', {products});


    }

}


module.exports = productController
