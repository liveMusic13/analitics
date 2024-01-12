import Auth from '../components/screens/auth/Auth';
import Home from '../components/screens/home/Home';

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
