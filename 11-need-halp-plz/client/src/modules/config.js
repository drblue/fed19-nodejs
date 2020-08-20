/**
 * Config
 */

const API_HOST = 'http://localhost:3001';
const SOCKET_HOST = 'http://localhost:3001';

const getToken = () => {
	return sessionStorage.getItem('access_token');
}

const setToken = (access_token) => {
	return sessionStorage.setItem('access_token', access_token);
}

module.exports = {
	API_HOST,
	SOCKET_HOST,

	getToken,
	setToken,
}
