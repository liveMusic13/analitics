import Auth from '../components/screens/auth/Auth';
import Home from '../components/screens/home/Home';
import InformationGraf from '../components/screens/information-graf/InformationGraf';
import TopicAnalysis from '../components/screens/topic-analysis/TopicAnalysis';
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
	{
		path: '/topic-analysis',
		component: TopicAnalysis,
		isAuth: true,
	},
];
