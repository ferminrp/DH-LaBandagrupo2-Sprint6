const fs = require('fs');

const userModel =

	{
	fileName: './data/users.json',

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

	// Este metodo trae el nuevo id para nuestra alta de usuario
	generateId: function () {
		// Traigo todos los usuarios
		let allUsers = this.findAll();
		// Extraigo el ultimo de la lista
		let lastUser = allUsers.pop();
		if (lastUser) {
			// El nuevo id va a ser uno mas, que el ultimo de la lista
			return lastUser.id + 1;
		}
		return 1;
	},

	// Metodo que trae un listado de todos los usuarios
	findAll: function () {
		return this.getData();
	},

	findByPk: function (id) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser.id === id);
		return userFound;
	},

	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},

	create: function (userData) {
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData
		}
		allUsers.push(newUser);
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},

	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
		return true;
	}
}


module.exports = userModel;

