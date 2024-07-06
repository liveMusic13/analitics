import axios from 'axios';
import Cookies from 'js-cookie';
import { TOKEN } from '../app.constants';

export const authService = {
	login: async (email, password, setIsAuth) => {
		try {
			// const { data } = await axios.post(
			// 	'http://194.146.113.124:8005/auth/jwt/login',
			// 	`grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
			// );
			const { data } = await axios.post(
				'https://tsapi.headsmade.com/auth/jwt/login',
				`grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
			);

			console.log(data);

			if (data.access_token) {
				Cookies.set(TOKEN, data.access_token);
				setIsAuth(true);
			}
		} catch (error) {
			console.log(error);
		}
	},
};
