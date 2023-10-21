const jwt = require('jsonwebtoken');

const validateToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const currentTime = Math.floor(Date.now() / 1000);
		if (decoded.exp < currentTime) {
			return false;
		}

		return true;
	} catch (error) {
		return false;
	}
};

module.exports = {validateToken};
