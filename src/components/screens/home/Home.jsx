import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { $axios } from '../../../api';
import { useAuth } from '../../../hooks/useAuth';
import { actions as dataUserAction } from '../../../store/data-user/dataUser.slice';
import { actions as isActiveMenuAction } from '../../../store/is-active-menu/isActiveMenu.slice';
import Content from '../../content/Content';
import SectionSelection from '../../content/section-selection/SectionSelection';
import Layout from '../../layout/Layout';
import LeftMenu from '../../left-menu/LeftMenu';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';

const Home = () => {
	const isActiveMenu = useSelector(store => store.isActiveMenu);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuth } = useAuth();

	const getDataUser = async () => {
		const responce = await $axios.get('/data-users');
		dispatch(dataUserAction.addData(responce.data.values));
		console.log(responce);
	};

	useEffect(() => {
		if (!isAuth) navigate('/auth');
		if (isAuth) getDataUser();
	}, [isAuth]);

	useEffect(() => {
		if (isActiveMenu) dispatch(isActiveMenuAction.defaultActiveMenu(''));
	}, []);

	const test = async () => {
		try {
			const response = await $axios.post('/ai-analytics', {
				index: 1,
				min_date: 1706760780,
				max_date: 1707218189,
				promt: 'Какая тематика этого текста?',
				texts_ids: [1, 2, 3],
			});
			// const response = await $axios.post(
			// 	'/ai-analytics',
			// 	`index=1&min_date=1706760780&max_date=1707218189&texts_ids=[1, 2, 3]&promt=Какая тематика этого текста?`,
			// );
			// const response = await $axios.get(
			// 	'http://194.146.113.124:8005/ai-analytics?index=1&min_date=1706760780&max_date=1707218189&promt=Какая тематика этого текста?&texts_ids=[1,3,4]',
			// );

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout justifyContent='space-between'>
			<LeftMenu />
			{isActiveMenu.isActiveMenu && <LeftMenuActive />}
			<Content>
				<button onClick={test}>test</button>
				<SectionSelection />
			</Content>
		</Layout>
	);
};

export default Home;
