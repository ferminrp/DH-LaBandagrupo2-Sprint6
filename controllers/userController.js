// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/userModel');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const userModel = jsonDB('../data/user');



let userController = {
	

		show: (req, res) => {

				res.render('users/login');
			
		},

		showRegister: (req, res) => {

			res.render('users/register');
		
		},


		store: (req, res) => {
			console.log(req.files);
			// Atrapa los contenidos del formulario... Ponele
			const user = req.body;
			// Verificar si viene un archivo, para nombrarlo.
			product.imagen = req.file ? req.file.filename : '';
			console.log(product.imagen);
			console.log(product);
			// Cuidado sólo mando el cuerpo del FORM, el Id me lo asigna el Modelo  
			userModel.create(user);
			res.redirect('/');
		},

		editUserScreen : (req, res) => {
			let userId = req.params.id;
			res.render('users/editUser',
			userId : userId
			);

		}
		
		
}


module.exports = userController
