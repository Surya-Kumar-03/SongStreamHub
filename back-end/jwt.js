const jwt = require('jsonwebtoken');

const validateToken = (token) => {
	try {
		if (token === null) {
			return {userId: null, isValid: false};
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const currentTime = Math.floor(Date.now() / 1000);
		if (decoded.exp < currentTime) {
			return {userId: null, isValid: false};
		}

		return {userId: decoded.googleId, isValid: true};
	} catch (error) {
		return {userId: null, isValid: false};
	}
};

module.exports = {validateToken};
