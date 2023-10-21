import jwt_decode from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
	try {
		const decoded: any = jwt_decode(token);

		if (!decoded || typeof decoded.exp !== 'number') {
			return true;
		}

		const currentTime: number = Math.floor(Date.now() / 1000);
		if (decoded.exp < currentTime) {
			return true;
		}

		return false;
	} catch (error) {
		return true;
	}
};

export const extractToken = (): string | null => {
	const jwtToken = localStorage.getItem('jwtToken');
	return jwtToken;
};

export const writeToken = (token: string) => {
	try {
		const decoded: any = jwt_decode(token);
		if (decoded !== null) {
			localStorage.setItem('jwtToken', token);
			localStorage.setItem('name', decoded.name);
			localStorage.setItem('email', decoded.email);
		}
	} catch (error) {
		return;
	}
	return;
};
