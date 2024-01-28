import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { $axios } from '../../../api';
import { useAuth } from '../../../hooks/useAuth';
import { actions as dataUserAction } from '../../../store/data-user/dataUser.slice';
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

	return (
		<Layout justifyContent='space-between'>
			<LeftMenu />
			{isActiveMenu.isActiveMenu && <LeftMenuActive />}
			<Content>
				<SectionSelection />
			</Content>
		</Layout>
	);
};

export default Home;
