import Home from '../components/screens/Home/Home';
import Auth from '../components/screens/auth/Auth';

export const routes = [
	{
		path: '/',
		component: Home,
		isAuth: false,
	},
	{
		path: '/auth',
		component: Auth,
		isAuth: false,
	},
];
