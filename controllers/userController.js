// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/User');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const userModel = jsonDB('../data/user');


// const bcryptjs = require('bcryptjs');

// const {
// 	validationResult
// } = require('express-validator');


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
		}
		
		
}


module.exports = userController
