import axios from 'axios';
import Cookies from 'js-cookie';
import { TOKEN } from './app.constants';

// const API_URL = 'http://194.146.113.124:8005';
const API_URL = 'https://tsapi.headsmade.com';

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

$axios.interceptors.request.use(
	config => {
		const token = Cookies.get(TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);
