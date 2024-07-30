import AiAnalytics from '../components/screens/ai-analytics/AiAnalytics';
import Auth from '../components/screens/auth/Auth';
import Competitive from '../components/screens/competitive/Competitive';
import DataSet from '../components/screens/data-set/DataSet';
import Faq from '../components/screens/faq/Faq';
import Home from '../components/screens/home/Home';
import InformationGraf from '../components/screens/information-graf/InformationGraf';
import MediaRating from '../components/screens/media-rating/MediaRating';
import TopicAnalysis from '../components/screens/topic-analysis/TopicAnalysis';
import UserTonality from '../components/screens/user-tonality/UserTonality';
import VoiceOfCustomer from '../components/screens/voice-of-customer/VoiceOfCustomer';

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
	{
		path: '/voice-of-customer',
		component: VoiceOfCustomer,
		isAuth: true,
	},
	{
		path: '/media-rating',
		component: MediaRating,
		isAuth: true,
	},
	{
		path: '/ai-analytics',
		component: AiAnalytics,
		isAuth: true,
	},
	{
		path: '/faq',
		component: Faq,
		isAuth: true,
	},
	{
		path: '/competitive',
		component: Competitive,
		isAuth: true,
	},
	{
		path: '/data-set',
		component: DataSet,
		isAuth: true,
	},
	{
		path: '/data-set/:id',
		component: DataSet,
		isAuth: true,
	},
	{
		path: '/data-set/processed/:id',
		component: DataSet,
		isAuth: true,
	},
];
