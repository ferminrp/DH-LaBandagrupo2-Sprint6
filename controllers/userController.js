// ESTO SERIA EL GESTOR DEL MODELO
const userDB = require('../model/User');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const userModel = userDB('../data/users');

// const bcryptjs = require('bcryptjs');

const {
	validationResult
} = require('express-validator');


const model2 = function (name) {
	console.log('entre al modelo de user')
	console.log(name)
	return {
		tablePath: path.resolve(__dirname, '../data/', `${name}.json`),

		show: (req, res) => {

				res.render('users/login');
			
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

}