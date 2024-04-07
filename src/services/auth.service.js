const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { decryptData } = require('../utils/auth');
const { http } = require('winston');

async function loginUserWithEmailAndPassword(req) {
	const { email, password } = req.body;
	console.log(email, password)
	const user = await userService.getUserByEmail(email);
	if(!user){
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Email or Password')
	}
	const isPasswordMatch = await decryptData(password, user.password);

	if (!user || !isPasswordMatch) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Invalid email or password'
		);
	}

	delete user.password;

	return user;
}

module.exports = {
	loginUserWithEmailAndPassword,
};
