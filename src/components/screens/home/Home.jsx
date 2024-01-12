import { useSelector } from 'react-redux';
import Content from '../../content/Content';
import Layout from '../../layout/Layout';
import LeftMenu from '../../left-menu/LeftMenu';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';

const Home = () => {
	const isActiveMenu = useSelector(store => store.isActiveMenu);
	console.log(isActiveMenu);

	return (
		<Layout justifyContent='space-between'>
			<LeftMenu />
			{isActiveMenu.isActiveMenu && <LeftMenuActive />}
			<Content />
		</Layout>
	);
};

export default Home;
