import Auth from '../components/screens/auth/Auth';
import Home from '../components/screens/home/Home';
import UserTonality from '../components/screens/user-tonality/UserTonality';

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
	{
		path: '/user-tonality',
		component: UserTonality,
		isAuth: true,
	},
];
