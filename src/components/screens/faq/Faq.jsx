import { useSelector } from 'react-redux';
import Content from '../../content/Content';
import FaqContent from '../../content/faq-content/FaqContent';
import Layout from '../../layout/Layout';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';
import LeftMenu from '../../left-menu/LeftMenu';

const Faq = () => {
	const isActiveMenu = useSelector(store => store.isActiveMenu);

	return (
		<Layout justifyContent='space-between'>
			<LeftMenu />
			{isActiveMenu.isActiveMenu && <LeftMenuActive />}
			<Content>
				<FaqContent />
			</Content>
		</Layout>
	);
};

export default Faq;
