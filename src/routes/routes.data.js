import Auth from '../components/screens/auth/Auth';
import Home from '../components/screens/home/Home';
import InformationGraf from '../components/screens/information-graf/InformationGraf';
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
	{
		path: '/information-graf',
		component: InformationGraf,
		isAuth: true,
	},
];
