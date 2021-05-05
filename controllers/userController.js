const bcryptjs = require('bcryptjs');
const {
	validationResult
} = require('express-validator');

const User = require('../model/User');